#!/usr/bin/env node
// Two-way sync between the WS Blog Airtable base and content/blog markdown.
// Airtable is the source of truth for planning/status; markdown is the published artifact.
//
// Usage:
//   node scripts/blog-sync.mjs pull
//   node scripts/blog-sync.mjs push --slug=<slug>
//   node scripts/blog-sync.mjs create-post --slug=<slug> [--title="..."] [--part="AI Visibility"]
//   node scripts/blog-sync.mjs test-post            (creates then deletes a probe row)
//   node scripts/blog-sync.mjs validate

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CACHE_DIR = path.join(__dirname, 'airtable-cache');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');

const TABLES = ['Posts', 'Questions', 'Categories', 'Clusters', 'Claims', 'Schedule', 'Ideas', 'Authors', 'Old Schedule'];

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

function getArg(name) {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.split('=').slice(1).join('=') : undefined;
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

async function cmdPull() {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  for (const table of TABLES) {
    try {
      const records = await listAll(table);
      fs.writeFileSync(path.join(CACHE_DIR, `${table.toLowerCase()}.json`), JSON.stringify(records, null, 2));
      console.log(`pulled ${records.length.toString().padStart(4)}  ${table}`);
    } catch (e) {
      console.warn(`skip ${table}: ${e.message.split('\n')[0]}`);
    }
  }
  console.log(`Cache written to ${path.relative(ROOT, CACHE_DIR)}/`);
}

async function findPostBySlug(slug) {
  const formula = encodeURIComponent(`{Slug}='${slug.replace(/'/g, "\\'")}'`);
  const data = await api(`${encodeURIComponent('Posts')}?filterByFormula=${formula}&maxRecords=1`);
  return data.records[0] || null;
}

async function cmdPush() {
  const slug = getArg('slug');
  if (!slug) { console.error('push requires --slug=<slug>'); process.exit(1); }
  const file = findMdBySlug(slug);
  if (!file) { console.error(`No markdown found for slug "${slug}" under content/blog/`); process.exit(1); }
  const raw = fs.readFileSync(file, 'utf8');
  const { data: fm, content } = matter(raw);
  const wc = wordCount(content);
  const fields = {
    Title: fm.title || slug,
    Slug: fm.slug || slug,
    Status: fm.draft ? 'In Progress' : 'Published',
    Date: fm.date || undefined,
    LastModified: fm.lastModified || fm.date || undefined,
    FilePath: path.relative(ROOT, file),
    CoverImage: fm.coverImage || undefined,
    WordCount: wc,
    ReadingTime: fm.readingTime || Math.max(1, Math.round(wc / 200)),
    Excerpt: fm.excerpt || undefined,
    PrimaryQuery: fm.aioTargetQueries?.[0] || undefined,
    PillarPost: !!fm.pillarPost,
    ServiceTrack: fm.serviceTrack || undefined,
  };
  Object.keys(fields).forEach((k) => fields[k] === undefined && delete fields[k]);

  const existing = await findPostBySlug(slug);
  if (existing) {
    await api(`${encodeURIComponent('Posts')}/${existing.id}`, { method: 'PATCH', body: JSON.stringify({ fields }) });
    console.log(`updated Post ${existing.id} (${slug}) -> ${fields.Status}`);
  } else {
    const created = await api(encodeURIComponent('Posts'), { method: 'POST', body: JSON.stringify({ fields }) });
    console.log(`created Post ${created.id} (${slug}) -> ${fields.Status}`);
  }
}

async function cmdCreatePost() {
  const slug = getArg('slug');
  if (!slug) { console.error('create-post requires --slug=<slug>'); process.exit(1); }
  const existing = await findPostBySlug(slug);
  if (existing) { console.log(`Post already exists: ${existing.id} (${slug})`); return; }
  const fields = {
    Title: getArg('title') || slug,
    Slug: slug,
    Status: 'In Progress',
    Part: getArg('part') || 'AI Visibility',
    ServiceTrack: getArg('track') || 'ai-visibility',
  };
  const created = await api(encodeURIComponent('Posts'), { method: 'POST', body: JSON.stringify({ fields }) });
  console.log(`created Post ${created.id} (${slug}) -> In Progress`);
}

async function cmdTestPost() {
  const slug = `__synctest-${Date.now()}`;
  const fields = {
    Title: 'SYNC TEST — safe to delete',
    Slug: slug,
    Status: 'Idea',
    Part: 'AI Visibility',
    ServiceTrack: 'ai-visibility',
    Excerpt: 'Automated connectivity probe from blog-sync.mjs. Two lines. Safe to delete.',
    Notes: 'Created by `node scripts/blog-sync.mjs test-post` to verify Airtable write access.',
  };
  const created = await api(encodeURIComponent('Posts'), { method: 'POST', body: JSON.stringify({ fields }) });
  console.log(`WRITE OK — created probe Post ${created.id} (${slug})`);
  const keep = process.argv.includes('--keep');
  if (keep) { console.log('Kept (per --keep). Delete it manually in Airtable when done.'); return; }
  await api(`${encodeURIComponent('Posts')}/${created.id}`, { method: 'DELETE' });
  console.log(`DELETE OK — removed probe Post ${created.id}. Round-trip verified.`);
}

async function cmdValidate() {
  const posts = await listAll('Posts');
  const published = posts.filter((p) => p.fields.Status === 'Published');
  let missing = 0;
  for (const p of published) {
    const slug = p.fields.Slug;
    if (slug && !findMdBySlug(slug)) { console.warn(`Published in Airtable but no markdown: ${slug}`); missing++; }
  }
  const mdFiles = walkMd(BLOG_DIR);
  console.log(`Posts in Airtable: ${posts.length} (published ${published.length}). Markdown files: ${mdFiles.length}. Missing markdown: ${missing}.`);
}

const cmd = process.argv[2];
const map = { pull: cmdPull, push: cmdPush, 'create-post': cmdCreatePost, 'test-post': cmdTestPost, validate: cmdValidate };
if (!map[cmd]) {
  console.error('Commands: pull | push --slug=<slug> | create-post --slug=<slug> | test-post [--keep] | validate');
  process.exit(1);
}
map[cmd]().catch((e) => { console.error(e.message); process.exit(1); });
