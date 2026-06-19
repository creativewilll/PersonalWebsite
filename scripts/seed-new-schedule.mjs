#!/usr/bin/env node
// Seeds the NEW AI Visibility editorial schedule into Airtable:
//  - reads scripts/new-schedule-data.json (curated AI Visibility post ideas)
//  - assigns dates across June 2026 (2-30, skipping published 1 & 14) then July 2026
//  - ensures a Cluster record per AI Visibility category
//  - links 3 TargetQuestions + up to 4 FAQQuestions per post from that category's Unused pool
//  - creates draft Post (Queued) + Ideas row + Schedule row per post
//  - flips consumed Questions to Assigned / FAQ
// Idempotent by Slug. Usage: node scripts/seed-new-schedule.mjs [--dry]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(__dirname, 'new-schedule-data.json');
const DRY = process.argv.includes('--dry');

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
async function patchBatch(table, updates) {
  for (let i = 0; i < updates.length; i += 10) {
    const chunk = updates.slice(i, i + 10);
    await api(encodeURIComponent(table), { method: 'PATCH', body: JSON.stringify({ records: chunk, typecast: true }) });
    await new Promise((r) => setTimeout(r, 220));
  }
}
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

function buildDates() {
  const dates = [];
  for (let d = 2; d <= 30; d++) { if (d === 14) continue; dates.push(`2026-06-${String(d).padStart(2, '0')}`); }
  for (let d = 1; d <= 31; d++) { dates.push(`2026-07-${String(d).padStart(2, '0')}`); }
  return dates;
}

(async () => {
  const ideas = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  const dates = buildDates();
  console.log(`Ideas: ${ideas.length}. Open dates (Jun 2-30 minus 1/14, + Jul): ${dates.length}.`);
  const n = Math.min(ideas.length, dates.length);

  const categories = await listAll('Categories');
  const catByNum = new Map();
  for (let num = 1; num <= 14; num++) {
    const rec = categories.find((c) => (c.fields.Name || '').startsWith(`${String(num).padStart(2, '0')}.`));
    if (rec) catByNum.set(num, rec);
  }
  const questions = await listAll('Questions');
  // pool of Unused AI Visibility questions per category id, sorted by Number
  const poolByCat = new Map();
  for (const q of questions) {
    if (q.fields.Status !== 'Unused') continue;
    const cid = (q.fields.Category || [])[0];
    if (!cid) continue;
    if (!poolByCat.has(cid)) poolByCat.set(cid, []);
    poolByCat.get(cid).push(q);
  }
  for (const arr of poolByCat.values()) arr.sort((a, b) => (a.fields.Number || 0) - (b.fields.Number || 0));

  const clusters = await listAll('Clusters');
  const posts = await listAll('Posts');
  const haveSlug = new Set(posts.map((r) => r.fields.Slug).filter(Boolean));

  // ensure a Cluster per AI Visibility category
  const clusterByNum = new Map();
  for (let num = 1; num <= 14; num++) {
    const cat = catByNum.get(num); if (!cat) continue;
    const label = cat.fields.Name.replace(/^\d+\.\s*/, '');
    const slug = slugify(label);
    let cl = clusters.find((c) => (c.fields.Cluster || '') === slug);
    if (!cl && !DRY) {
      cl = await api(encodeURIComponent('Clusters'), { method: 'POST', body: JSON.stringify({ fields: { Cluster: slug, Label: label, Part: 'AI Visibility', Priority: 'Primary', Categories: [cat.id] } }) });
      await new Promise((r) => setTimeout(r, 210));
    }
    if (cl) clusterByNum.set(num, cl.id);
  }

  if (DRY) {
    for (let i = 0; i < n; i++) console.log(`  ${dates[i]}  C${ideas[i].category}${ideas[i].pillar ? ' [PILLAR]' : ''}  ${ideas[i].title}`);
    console.log('--dry: no writes.'); return;
  }

  const scheduleRows = [], ideaRows = [], qUpdates = [];
  let created = 0, skipped = 0;
  for (let i = 0; i < n; i++) {
    const it = ideas[i]; const date = dates[i];
    const slug = slugify(it.title);
    if (haveSlug.has(slug)) { skipped++; continue; }
    haveSlug.add(slug);
    const cat = catByNum.get(it.category);
    const pool = (cat && poolByCat.get(cat.id)) || [];
    const targets = pool.splice(0, 3);
    const faqs = pool.splice(0, 4);
    const fields = {
      Title: it.title, Slug: slug, Status: 'Queued', Date: date,
      Part: 'AI Visibility', ServiceTrack: 'ai-visibility', PillarPost: !!it.pillar,
      Notes: 'NEW SCHEDULE — AI Visibility pivot',
    };
    if (cat) fields.Category = [cat.id];
    if (clusterByNum.get(it.category)) fields.Cluster = [clusterByNum.get(it.category)];
    if (targets.length) { fields.TargetQuestions = targets.map((q) => q.id); fields.PrimaryQuery = targets[0].fields.Question; }
    if (faqs.length) fields.FAQQuestions = faqs.map((q) => q.id);

    const post = await api(encodeURIComponent('Posts'), { method: 'POST', body: JSON.stringify({ fields }) });
    created++;
    await new Promise((r) => setTimeout(r, 210));

    scheduleRows.push({ Date: date, Post: [post.id], Notes: 'AI Visibility (NEW schedule)' });
    ideaRows.push({ RawIdea: `[NEW SCHEDULE] ${it.title}`, Status: 'Approved', Tags: `ai-visibility, new-schedule, ${cat ? cat.fields.Name : ''}` });
    targets.forEach((q) => qUpdates.push({ id: q.id, fields: { Status: 'Assigned' } }));
    faqs.forEach((q) => qUpdates.push({ id: q.id, fields: { Status: 'FAQ' } }));
  }
  console.log(`Created ${created} draft Posts (skipped ${skipped}).`);
  if (scheduleRows.length) { await createBatch('Schedule', scheduleRows); console.log(`Created ${scheduleRows.length} Schedule rows.`); }
  if (ideaRows.length) { await createBatch('Ideas', ideaRows); console.log(`Created ${ideaRows.length} Ideas rows.`); }
  if (qUpdates.length) { await patchBatch('Questions', qUpdates); console.log(`Updated ${qUpdates.length} Questions (Assigned/FAQ).`); }
  console.log('NEW schedule seed complete.');
})().catch((e) => { console.error(e.message); process.exit(1); });
