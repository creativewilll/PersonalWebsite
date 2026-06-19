#!/usr/bin/env node
// Seeds the legacy ("OLD") editorial plan into Airtable:
//  - parses the QUEUED June 2026 rows from the old skill's PUBLISHING_CALENDAR.md
//  - creates a draft Post (Status=Queued, no live date) per item
//  - creates an Ideas row per item
//  - creates an "Old Schedule" table row per item (with the original planned date), linked to the Post
// Idempotent by Slug. Usage: node scripts/seed-old-schedule.mjs [--dry]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CAL = '/Users/creativewill/.cursor/skills/authoring-blog-posts/PUBLISHING_CALENDAR.md';
const DRY = process.argv.includes('--dry');
const OLD_SCHEDULE_TABLE = 'Old Schedule';

function loadEnv() {
  for (const line of fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
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
  do { const qs = new URLSearchParams({ pageSize: '100' }); if (offset) qs.set('offset', offset);
    const d = await api(`${encodeURIComponent(table)}?${qs}`); out.push(...d.records); offset = d.offset; } while (offset);
  return out;
}
async function createBatch(table, records) {
  const created = [];
  for (let i = 0; i < records.length; i += 10) {
    const chunk = records.slice(i, i + 10).map((fields) => ({ fields }));
    const d = await api(encodeURIComponent(table), { method: 'POST', body: JSON.stringify({ records: chunk, typecast: true }) });
    created.push(...d.records); await new Promise((r) => setTimeout(r, 220));
  }
  return created;
}
const slugify = (s) => s.toLowerCase().replace(/`/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
const clean = (s) => s.replace(/\*\*/g, '').replace(/`/g, '').trim();
const MONTHS = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
function toDate(cell) {
  const m = clean(cell).match(/([A-Z][a-z]{2})\s+(\d{1,2})/);
  if (!m) return undefined;
  return `2026-${MONTHS[m[1]]}-${String(m[2]).padStart(2, '0')}`;
}
const VALID_TRACKS = new Set(['ai-visibility', 'ai-automation', 'web-design', 'both']);
const PART_BY_TRACK = { 'ai-automation': 'AI Automation', 'web-design': 'Web Design', 'ai-visibility': 'AI Visibility' };

function parseJuneQueue() {
  const text = fs.readFileSync(CAL, 'utf8');
  const start = text.indexOf('## June 2026');
  const end = text.indexOf('## July 2026');
  const section = text.slice(start, end);
  const items = [];
  for (const line of section.split('\n')) {
    if (!line.trim().startsWith('|')) continue;
    const cells = line.split('|').map((c) => c.trim());
    // leading/trailing empty from | ... |
    const cols = cells.slice(1, -1);
    if (cols.length < 6) continue;
    const [dateCell, cluster, title, angle, track, status] = cols;
    if (!/QUEUED/i.test(status)) continue;
    if (/^Date/.test(dateCell) || /^-+$/.test(dateCell)) continue;
    const t = clean(title);
    if (!t) continue;
    items.push({
      date: toDate(dateCell),
      dayLabel: clean(dateCell),
      cluster: clean(cluster),
      title: t,
      angle: clean(angle),
      track: clean(track),
    });
  }
  return items;
}

(async () => {
  const items = parseJuneQueue();
  console.log(`Parsed ${items.length} OLD queued posts from June 2026.`);
  if (DRY) { items.forEach((i) => console.log(`  ${i.date}  [${i.cluster}]  ${i.title}`)); return; }

  const existing = await listAll('Posts');
  const haveSlug = new Set(existing.map((r) => r.fields.Slug).filter(Boolean));

  let createdPosts = 0, skipped = 0;
  const oldRows = [], ideaRows = [];
  for (const it of items) {
    const slug = slugify(it.title);
    if (haveSlug.has(slug)) { skipped++; continue; }
    haveSlug.add(slug);
    const track = VALID_TRACKS.has(it.track) ? it.track : undefined;
    const postFields = {
      Title: it.title, Slug: slug, Status: 'Queued',
      Notes: `OLD SCHEDULE — legacy agentic/music/design plan (superseded by AI Visibility pivot). Cluster: ${it.cluster}. Planned ${it.date}.`,
    };
    if (track) { postFields.ServiceTrack = track; if (PART_BY_TRACK[track]) postFields.Part = PART_BY_TRACK[track]; }
    const post = await api(encodeURIComponent('Posts'), { method: 'POST', body: JSON.stringify({ fields: postFields }) });
    createdPosts++;
    await new Promise((r) => setTimeout(r, 210));

    oldRows.push({
      Title: it.title, PlannedDate: it.date, DayLabel: it.dayLabel, Cluster: it.cluster,
      CoreAngle: it.angle, Track: it.track, OriginalStatus: 'QUEUED', Post: [post.id],
    });
    ideaRows.push({
      RawIdea: `[OLD SCHEDULE] ${it.title} — ${it.angle}`, Status: 'Approved', Tags: `old-schedule, ${it.cluster}`,
    });
  }
  console.log(`Created ${createdPosts} draft Posts. Skipped (existing slug): ${skipped}.`);
  if (oldRows.length) { await createBatch(OLD_SCHEDULE_TABLE, oldRows); console.log(`Created ${oldRows.length} Old Schedule rows.`); }
  if (ideaRows.length) { await createBatch('Ideas', ideaRows); console.log(`Created ${ideaRows.length} Ideas rows.`); }
  console.log('OLD schedule seed complete.');
})().catch((e) => { console.error(e.message); process.exit(1); });
