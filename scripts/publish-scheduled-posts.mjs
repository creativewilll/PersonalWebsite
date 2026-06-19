#!/usr/bin/env node
// Automated scheduled post publication workflow.
//
// Usage:
//   node scripts/publish-scheduled-posts.mjs find-due
//   node scripts/publish-scheduled-posts.mjs gate --slug=<slug>
//   node scripts/publish-scheduled-posts.mjs publish --slug=<slug>

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CACHE_DIR = path.join(__dirname, 'airtable-cache');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const PUBLIC_DIR = path.join(ROOT, 'public', 'images', 'blog');

function loadEnv() {
  const envPath = path.join(ROOT, '.env');
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  const pat = process.env.AIRTABLE_PAT;
  const base = process.env.AIRTABLE_BASE_ID;
  if (!pat || !base) {
    console.error('Missing AIRTABLE_PAT or AIRTABLE_BASE_ID. Add them to .env at the repo root.');
    process.exit(1);
  }
  return { pat, base };
}

const { pat, base } = loadEnv();
const API = `https://api.airtable.com/v0/${base}`;
const headers = { Authorization: `Bearer ${pat}`, 'Content-Type': 'application/json' };

async function api(pathPart, opts = {}) {
  const res = await fetch(`${API}/${pathPart}`, { ...opts, headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable ${opts.method || 'GET'} ${pathPart} -> ${res.status}: ${body}`);
  }
  return res.json();
}

async function listAll(table) {
  const out = [];
  let offset;
  do {
    const qs = new URLSearchParams({ pageSize: '100' });
    if (offset) qs.set('offset', offset);
    const data = await api(`${encodeURIComponent(table)}?${qs}`);
    out.push(...data.records);
    offset = data.offset;
  } while (offset);
  return out;
}

async function updateRecord(tableId, recordId, fields) {
  const data = await api(`${encodeURIComponent(tableId)}/${recordId}`, {
    method: 'PATCH',
    body: JSON.stringify({ fields }),
  });
  return data;
}

function getArg(name) {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.split('=').slice(1).join('=') : undefined;
}

function getDateInTimezone(timezone) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timezone,
  });
  const parts = formatter.formatToParts(now);
  const year = parts.find((p) => p.type === 'year').value;
  const month = parts.find((p) => p.type === 'month').value;
  const day = parts.find((p) => p.type === 'day').value;
  return `${year}-${month}-${day}`;
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
  for (const file of walkMd(BLOG_DIR)) {
    const stem = path.basename(file, '.md');
    if (stem === slug) return file;
    try {
      const fm = matter(fs.readFileSync(file, 'utf8')).data;
      if (fm.slug === slug) return file;
    } catch { /* ignore */ }
  }
  return null;
}

function wordCount(body) {
  return body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
}

async function cmdFindDue() {
  // Refresh cache and find posts due today in Eastern time
  fs.mkdirSync(CACHE_DIR, { recursive: true });

  console.log('Refreshing Airtable cache...');
  const tables = ['Posts', 'Questions', 'Categories', 'Clusters', 'Claims', 'Schedule', 'Ideas', 'Authors', 'Old Schedule'];
  for (const table of tables) {
    try {
      const records = await listAll(table);
      fs.writeFileSync(path.join(CACHE_DIR, `${table.toLowerCase()}.json`), JSON.stringify(records, null, 2));
      console.log(`  ${records.length.toString().padStart(3)} records in ${table}`);
    } catch (e) {
      console.warn(`  skip ${table}: ${e.message.split('\n')[0]}`);
    }
  }

  // Get today's date in Eastern time
  const todayEastern = getDateInTimezone('America/New_York');
  console.log(`\nSearching for posts due on ${todayEastern} (Eastern)...`);

  // Load Schedule and Posts tables
  const schedule = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, 'schedule.json'), 'utf8'));
  const posts = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, 'posts.json'), 'utf8'));

  // Find due posts
  const due = [];
  for (const sched of schedule) {
    const date = sched.fields.Date;
    if (date === todayEastern) {
      const postLinks = sched.fields.Post || [];
      for (const postId of postLinks) {
        const post = posts.find((p) => p.id === postId);
        if (post && post.fields.Slug) {
          due.push({ schedId: sched.id, postId, slug: post.fields.Slug, title: post.fields.Title || post.fields.Slug });
        }
      }
    }
  }

  if (due.length === 0) {
    console.log('Found 0 due scheduled post(s)');
    return;
  }

  console.log(`Found ${due.length} due scheduled post(s):`);
  for (const item of due) {
    console.log(`  - ${item.title} (${item.slug})`);
  }
}

async function cmdGate() {
  const slug = getArg('slug');
  if (!slug) {
    console.error('gate requires --slug=<slug>');
    process.exit(1);
  }

  const file = findMdBySlug(slug);
  if (!file) {
    console.error(`No markdown found for slug "${slug}" under content/blog/`);
    process.exit(1);
  }

  const raw = fs.readFileSync(file, 'utf8');
  const { data: fm, content } = matter(raw);

  console.log(`Validating ${slug}...`);

  // Frontmatter checks
  const errors = [];

  if (!fm.title) errors.push('  - Missing: title');
  if (!fm.slug) errors.push('  - Missing: slug');
  if (!fm.date) errors.push('  - Missing: date');
  if (fm.draft !== false) errors.push('  - Error: draft must be false');
  if (!fm.coverImage) errors.push('  - Missing: coverImage');
  if (!fm.seoTitle) errors.push('  - Missing: seoTitle');
  if (!fm.seoDescription) errors.push('  - Missing: seoDescription');
  if (!Array.isArray(fm.aioTargetQueries) || fm.aioTargetQueries.length === 0) {
    errors.push('  - Missing or empty: aioTargetQueries');
  }
  if (!Array.isArray(fm.seoKeywords) || fm.seoKeywords.length < 5) {
    errors.push('  - Missing or too few: seoKeywords (need ≥ 5)');
  }

  // Content checks
  const wc = wordCount(content);
  if (wc < 1500) errors.push(`  - Content too short: ${wc} words (need ≥ 1500)`);

  const h2Count = (content.match(/^##\s+/gm) || []).length;
  if (h2Count < 5) errors.push(`  - Too few H2 sections: ${h2Count} (need ≥ 5)`);

  // Cover image check
  const coverPath = path.join(PUBLIC_DIR, `${slug}.png`);
  if (!fs.existsSync(coverPath)) {
    errors.push(`  - Missing cover image: ${path.relative(ROOT, coverPath)}`);
  }

  if (errors.length > 0) {
    console.log('Validation failed:');
    console.log(errors.join('\n'));
    process.exit(1);
  }

  console.log(`✓ ${slug} passes all gates`);
  console.log(`  - Title: ${fm.title}`);
  console.log(`  - Word count: ${wc}`);
  console.log(`  - H2 sections: ${h2Count}`);
  console.log(`  - Cover image: ${fm.coverImage}`);
}

async function cmdPublish() {
  const slug = getArg('slug');
  if (!slug) {
    console.error('publish requires --slug=<slug>');
    process.exit(1);
  }

  const file = findMdBySlug(slug);
  if (!file) {
    console.error(`No markdown found for slug "${slug}" under content/blog/`);
    process.exit(1);
  }

  const raw = fs.readFileSync(file, 'utf8');
  const { data: fm, content } = matter(raw);
  const wc = wordCount(content);
  const rt = fm.readingTime || Math.max(1, Math.round(wc / 200));

  console.log(`Publishing ${slug}...`);

  // Find the post in Airtable
  const formula = encodeURIComponent(`{Slug}='${slug.replace(/'/g, "\\'")}'`);
  const postsData = await api(`${encodeURIComponent('Posts')}?filterByFormula=${formula}&maxRecords=1`);
  const post = postsData.records[0];

  if (!post) {
    console.error(`Post not found in Airtable: ${slug}`);
    process.exit(1);
  }

  // Update post metadata in Airtable
  const postFields = {
    Status: 'Published',
    FilePath: path.relative(ROOT, file),
    CoverImage: fm.coverImage || undefined,
    ReadingTime: rt,
    WordCount: wc,
    Excerpt: fm.excerpt || undefined,
  };
  Object.keys(postFields).forEach((k) => postFields[k] === undefined && delete postFields[k]);

  await updateRecord('Posts', post.id, postFields);
  console.log(`✓ Updated post in Airtable: ${post.id}`);

  // Update linked questions to Published
  const linkedQuestions = post.fields.Questions || [];
  for (const qId of linkedQuestions) {
    await updateRecord('Questions', qId, { Status: 'Published' });
  }
  if (linkedQuestions.length > 0) {
    console.log(`✓ Updated ${linkedQuestions.length} linked questions to Published`);
  }

  // Find and update the schedule record
  const schedule = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, 'schedule.json'), 'utf8'));
  const schedRecord = schedule.find((s) => (s.fields.Post || []).includes(post.id));
  if (schedRecord) {
    const pubMarkers = schedRecord.fields.PublicationMarkers || [];
    pubMarkers.push(`${new Date().toISOString()}`);
    await updateRecord('Schedule', schedRecord.id, { PublicationMarkers: pubMarkers });
    console.log(`✓ Appended publication marker to schedule: ${schedRecord.id}`);
  }

  // Commit and push
  const coverImage = path.join(PUBLIC_DIR, `${slug}.png`);
  const filesToStage = [file];
  if (fs.existsSync(coverImage)) {
    filesToStage.push(coverImage);
  }

  const relativeFiles = filesToStage.map((f) => path.relative(ROOT, f));
  const dateStr = fm.date || new Date().toISOString().split('T')[0];
  const title = fm.title || slug;
  const commitMsg = `publish scheduled post: ${title} (${dateStr})`;

  try {
    execSync(`git add ${relativeFiles.map((f) => `"${f}"`).join(' ')}`, { cwd: ROOT });
    console.log(`✓ Staged files: ${relativeFiles.join(', ')}`);

    execSync(`git commit -m "${commitMsg}"`, { cwd: ROOT });
    console.log(`✓ Committed: ${commitMsg}`);

    execSync(`git push -u origin main`, { cwd: ROOT, stdio: 'inherit' });
    console.log(`✓ Pushed to origin main`);
  } catch (e) {
    console.error(`Git operation failed: ${e.message}`);
    process.exit(1);
  }

  console.log(`\n✓ Successfully published: ${slug}`);
}

const cmd = process.argv[2];
const map = { 'find-due': cmdFindDue, gate: cmdGate, publish: cmdPublish };
if (!map[cmd]) {
  console.error('Commands: find-due | gate --slug=<slug> | publish --slug=<slug>');
  process.exit(1);
}
map[cmd]().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
