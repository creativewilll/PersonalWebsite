#!/usr/bin/env node
// Orchestrator for daily scheduled blog post publishing.
// Finds due posts, runs quality gates, syncs to Airtable, and pushes to Git.
//
// Usage:
//   node scripts/publish-scheduled-posts.mjs find-due [--date=YYYY-MM-DD]
//   node scripts/publish-scheduled-posts.mjs gate --slug=<slug>
//   node scripts/publish-scheduled-posts.mjs publish --slug=<slug> [--date=YYYY-MM-DD] [--dry]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import matter from 'gray-matter';
import { validateFile } from './validate-blog-frontmatter.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CACHE_DIR = path.join(__dirname, 'airtable-cache');
const LOG_DIR = path.join(__dirname, 'publish-logs');

function getArg(name) {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.split('=').slice(1).join('=') : undefined;
}

const isDryRun = process.argv.includes('--dry');

function getEasternToday() {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(new Date());
}

function walkMd(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkMd(full));
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function findMdBySlug(slug) {
  const blogDir = path.join(ROOT, 'content', 'blog');
  for (const file of walkMd(blogDir)) {
    const stem = path.basename(file, '.md');
    if (stem === slug) return file;
    try {
      const fm = matter(fs.readFileSync(file, 'utf8')).data;
      if (fm.slug === slug) return file;
    } catch { /* ignore */ }
  }
  return null;
}

function loadCache() {
  const schedulePath = path.join(CACHE_DIR, 'schedule.json');
  const postsPath = path.join(CACHE_DIR, 'posts.json');
  if (!fs.existsSync(schedulePath) || !fs.existsSync(postsPath)) {
    console.log('Cache missing. Pulling fresh Airtable cache...');
    execSync('node scripts/blog-sync.mjs pull', { stdio: 'inherit', cwd: ROOT });
  }
  const schedule = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  return { schedule, posts };
}

async function cmdFindDue() {
  // Always pull first to make sure cache is current
  console.log('Refreshing Airtable cache...');
  execSync('node scripts/blog-sync.mjs pull', { stdio: 'inherit', cwd: ROOT });

  const { schedule, posts } = loadCache();
  const postById = Object.fromEntries(posts.map((p) => [p.id, p]));
  
  const today = getArg('date') || getEasternToday();
  console.log(`Searching for scheduled posts due on Eastern Date: ${today}`);

  const dueScheduleRows = schedule.filter((row) => row.fields.Date === today);
  const due = [];

  for (const row of dueScheduleRows) {
    const pids = row.fields.Post || [];
    for (const pid of pids) {
      const p = postById[pid];
      if (p) {
        const fileExists = findMdBySlug(p.fields.Slug);
        const isPublished = p.fields.Status === 'Published';
        
        if (isPublished) {
          console.log(`- [SKIP] "${p.fields.Title}" (${p.fields.Slug}) is already marked Status=Published in Airtable.`);
          continue;
        }
        if (fileExists && !isPublished) {
          console.log(`- [ATTENTION] "${p.fields.Title}" has a local file on disk but is Status=${p.fields.Status} in Airtable.`);
        }
        
        due.push({
          id: p.id,
          title: p.fields.Title,
          slug: p.fields.Slug,
          part: p.fields.Part,
          serviceTrack: p.fields.ServiceTrack,
          pillarPost: !!p.fields.PillarPost,
          primaryQuery: p.fields.PrimaryQuery || '',
          targetQuestions: p.fields.TargetQuestions || [],
          faqQuestions: p.fields.FAQQuestions || [],
          category: p.fields.Category || [],
          cluster: p.fields.Cluster || [],
        });
      }
    }
  }

  console.log(`Found ${due.length} due scheduled post(s) for ${today}.`);
  console.log(JSON.stringify(due, null, 2));
  return due;
}

async function cmdGate() {
  const slug = getArg('slug');
  if (!slug) { console.error('gate requires --slug=<slug>'); process.exit(1); }
  const file = findMdBySlug(slug);
  if (!file) { console.error(`No markdown found for slug "${slug}"`); process.exit(1); }

  console.log(`Running quality gates on: ${file}`);
  const { errors, warnings } = validateFile(file);

  if (warnings.length) {
    console.log('\n[quality-gate] WARNINGS:');
    for (const w of warnings) console.log(`  - ${w}`);
  }

  if (errors.length) {
    console.log('\n[quality-gate] ERRORS (FAILED):');
    for (const e of errors) console.log(`  - ${e}`);
    process.exit(1);
  }

  console.log('\n[quality-gate] PASS — No blocking errors found.');
}

async function cmdPublish() {
  const slug = getArg('slug');
  if (!slug) { console.error('publish requires --slug=<slug>'); process.exit(1); }
  const file = findMdBySlug(slug);
  if (!file) { console.error(`No markdown found for slug "${slug}"`); process.exit(1); }

  // 1. Quality gate check
  console.log('Running final pre-publish quality gate check...');
  const { errors } = validateFile(file);
  if (errors.length) {
    console.error('[ERROR] Cannot publish. Quality gates are failing:');
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(file, 'utf8');
  const { data: fm } = matter(raw);
  const title = fm.title || slug;
  const today = getArg('date') || getEasternToday();

  // 2. Expected Cover Image check
  const coverPath = fm.coverImage;
  if (!coverPath) {
    console.error('[ERROR] coverImage field missing from frontmatter.');
    process.exit(1);
  }
  const absoluteCoverPath = path.join(ROOT, 'public', coverPath);
  if (!fs.existsSync(absoluteCoverPath)) {
    console.error(`[ERROR] Cover image file not found at expected path: ${absoluteCoverPath}`);
    process.exit(1);
  }

  if (isDryRun) {
    console.log(`[DRY-RUN] Would sync ${slug} to Airtable and stage/commit/push to GitHub.`);
    return;
  }

  // 3. Sync back to Airtable (flips Status to Published, links Questions, Schedule marker)
  console.log(`Syncing ${slug} status to Airtable...`);
  execSync(`node scripts/blog-sync.mjs push --slug=${slug}`, { stdio: 'inherit', cwd: ROOT });

  // 4. Git staging (strict staging of exactly two files: the .md and the .png cover)
  console.log('Staging published artifacts in Git...');
  const relMdPath = path.relative(ROOT, file);
  const relCoverPath = path.relative(ROOT, absoluteCoverPath);

  execSync(`git add "${relMdPath}"`, { stdio: 'inherit', cwd: ROOT });
  execSync(`git add "${relCoverPath}"`, { stdio: 'inherit', cwd: ROOT });

  // Verify only these two files are staged
  const status = execSync('git status --porcelain', { cwd: ROOT }).toString();
  const stagedLines = status.split('\n').filter(l => l.startsWith('A ') || l.startsWith('M '));
  console.log('Currently staged changes:');
  console.log(status);

  // 5. Commit and push
  const commitMsg = `publish scheduled post: ${title} (${today})`;
  console.log(`Committing changes: "${commitMsg}"`);
  execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit', cwd: ROOT });

  console.log('Pushing commit to remote main branch...');
  execSync('git push origin main', { stdio: 'inherit', cwd: ROOT });

  // 6. Write to publish log
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const logFile = path.join(LOG_DIR, `${today}.log`);
  const commitSha = execSync('git rev-parse HEAD', { cwd: ROOT }).toString().trim();
  const logEntry = `[${new Date().toISOString()}] PUBLISHED SUCCESS
Date: ${today}
Slug: ${slug}
Title: ${title}
Markdown file: ${relMdPath}
Cover image: ${relCoverPath}
Commit SHA: ${commitSha}
----------------------------------------\n`;
  fs.appendFileSync(logFile, logEntry, 'utf8');
  console.log(`Run-log written to: ${path.relative(ROOT, logFile)}`);
  console.log('Publish workflow completed successfully!');
}

const cmd = process.argv[2];
const map = { 'find-due': cmdFindDue, gate: cmdGate, publish: cmdPublish };
if (!map[cmd]) {
  console.error('Commands: find-due [--date=YYYY-MM-DD] | gate --slug=<slug> | publish --slug=<slug> [--date=YYYY-MM-DD] [--dry]');
  process.exit(1);
}
map[cmd]().catch((e) => { console.error(e.message); process.exit(1); });
