#!/usr/bin/env node
// One-time migration of 2025-2026 PUBLISHED posts (draft:false) into the WS Blog
// Airtable Posts table. Idempotent: skips posts whose Slug already exists.
// Does NOT create Question rows (those come from import-question-bank.mjs).
//
// Usage: node scripts/migrate-posts-to-airtable.mjs [--dry]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const YEARS = ['2025', '2026'];
const DRY = process.argv.includes('--dry');

function loadEnv() {
  const envPath = path.join(ROOT, '.env');
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  if (!process.env.AIRTABLE_PAT || !process.env.AIRTABLE_BASE_ID) {
    console.error('Missing AIRTABLE_PAT or AIRTABLE_BASE_ID in .env'); process.exit(1);
  }
  return { pat: process.env.AIRTABLE_PAT, base: process.env.AIRTABLE_BASE_ID };
}
const { pat, base } = loadEnv();
const API = `https://api.airtable.com/v0/${base}`;
const headers = { Authorization: `Bearer ${pat}`, 'Content-Type': 'application/json' };

async function api(p, opts = {}) {
  const res = await fetch(`${API}/${p}`, { ...opts, headers });
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${p} -> ${res.status}: ${await res.text()}`);
  return res.json();
}
async function listAll(table) {
  const out = []; let offset;
  do {
    const qs = new URLSearchParams({ pageSize: '100' }); if (offset) qs.set('offset', offset);
    const d = await api(`${encodeURIComponent(table)}?${qs}`); out.push(...d.records); offset = d.offset;
  } while (offset);
  return out;
}
async function createBatch(table, records) {
  const created = [];
  for (let i = 0; i < records.length; i += 10) {
    const chunk = records.slice(i, i + 10).map((fields) => ({ fields }));
    const d = await api(encodeURIComponent(table), { method: 'POST', body: JSON.stringify({ records: chunk, typecast: true }) });
    created.push(...d.records);
    await new Promise((r) => setTimeout(r, 220));
  }
  return created;
}

function walkMd(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walkMd(full));
    else if (e.name.endsWith('.md')) files.push(full);
  }
  return files;
}
const PART_BY_TRACK = { 'ai-visibility': 'AI Visibility', 'ai-automation': 'AI Automation', 'web-design': 'Web Design' };
const VALID_TRACKS = new Set(['ai-visibility', 'ai-automation', 'web-design', 'both']);
function normTrack(t) {
  if (!t) return undefined;
  const s = String(t).trim();
  if (VALID_TRACKS.has(s)) return s;
  const l = s.toLowerCase();
  if (l.includes('automation')) return 'ai-automation';
  if (l.includes('web') || l.includes('design')) return 'web-design';
  if (l.includes('visibility')) return 'ai-visibility';
  return undefined; // unknown: leave blank rather than polluting the select
}
function wordCount(body) { return body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length; }

(async () => {
  const files = YEARS.flatMap((y) => walkMd(path.join(ROOT, 'content', 'blog', y)));
  const rows = [];
  let skippedDraft = 0;
  const parseErrors = [];
  for (const file of files) {
    let fm, content;
    try { ({ data: fm, content } = matter(fs.readFileSync(file, 'utf8'))); }
    catch (e) { parseErrors.push(`${path.relative(ROOT, file)} :: ${e.message.split('\n')[0]}`); continue; }
    if (fm.draft === true) { skippedDraft++; continue; }
    const slug = fm.slug || path.basename(file, '.md');
    const wc = wordCount(content);
    const track = normTrack(fm.serviceTrack);
    rows.push({
      Title: fm.title || slug,
      Slug: slug,
      Status: 'Published',
      Date: fm.date || undefined,
      LastModified: fm.lastModified || fm.date || undefined,
      Part: PART_BY_TRACK[track] || undefined,
      ServiceTrack: track || undefined,
      PillarPost: !!fm.pillarPost,
      PrimaryQuery: Array.isArray(fm.aioTargetQueries) ? fm.aioTargetQueries[0] : undefined,
      FilePath: path.relative(ROOT, file),
      CoverImage: fm.coverImage || undefined,
      WordCount: wc,
      ReadingTime: fm.readingTime || Math.max(1, Math.round(wc / 200)),
      Excerpt: fm.excerpt || undefined,
    });
  }
  rows.forEach((r) => Object.keys(r).forEach((k) => r[k] === undefined && delete r[k]));
  console.log(`2025-2026 markdown files: ${files.length}. Published to migrate: ${rows.length}. Skipped drafts: ${skippedDraft}. Parse errors: ${parseErrors.length}.`);
  if (parseErrors.length) parseErrors.forEach((e) => console.warn('  YAML ERROR ' + e));
  const trackCounts = {};
  rows.forEach((r) => { trackCounts[r.ServiceTrack || 'unset'] = (trackCounts[r.ServiceTrack || 'unset'] || 0) + 1; });
  console.log('By serviceTrack:', trackCounts);
  if (DRY) { console.log('--dry: no writes.'); return; }

  const existing = await listAll('Posts');
  const haveSlug = new Set(existing.map((r) => r.fields.Slug).filter(Boolean));
  const toCreate = rows.filter((r) => !haveSlug.has(r.Slug));
  console.log(`Already in Airtable: ${rows.length - toCreate.length}. Creating: ${toCreate.length}.`);
  if (toCreate.length) {
    const created = await createBatch('Posts', toCreate);
    console.log(`Created ${created.length} Post rows.`);
  }
  console.log('Migration complete.');
})().catch((e) => { console.error(e.message); process.exit(1); });
