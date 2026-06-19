#!/usr/bin/env node
// Reshuffles the entire NEW schedule (all Queued posts) with interleaved parts,
// extends to 90 days (Jun 2 – Sep 16 2026), and seeds any new extended posts.
// Usage: node scripts/reshuffle-schedule.mjs [--dry]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry');

function loadEnv() {
  for (const line of fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return { pat: process.env.AIRTABLE_PAT, base: process.env.AIRTABLE_BASE_ID };
}
const { pat, base } = loadEnv();
const HDR = { Authorization: `Bearer ${pat}`, 'Content-Type': 'application/json' };
const API = `https://api.airtable.com/v0/${base}`;
async function req(p, opts = {}) {
  const r = await fetch(`${API}/${p}`, { ...opts, headers: HDR });
  if (!r.ok) throw new Error(`${opts.method||'GET'} ${p} -> ${r.status}: ${await r.text()}`);
  return r.json();
}
async function all(t) {
  const out = []; let off;
  do { const q = new URLSearchParams({ pageSize: '100' }); if (off) q.set('offset', off);
    const d = await req(`${encodeURIComponent(t)}?${q}`); out.push(...d.records); off = d.offset; } while (off);
  return out;
}
async function createBatch(t, recs) {
  const out = [];
  for (let i = 0; i < recs.length; i += 10) {
    const d = await req(encodeURIComponent(t), { method: 'POST', body: JSON.stringify({ records: recs.slice(i,i+10).map(f=>({fields:f})), typecast: true }) });
    out.push(...d.records); await sleep(220);
  }
  return out;
}
async function patchBatch(t, updates) {
  for (let i = 0; i < updates.length; i += 10) {
    await req(encodeURIComponent(t), { method: 'PATCH', body: JSON.stringify({ records: updates.slice(i,i+10), typecast: true }) });
    await sleep(220);
  }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80);

// Build every date Jun 2 – Sep 16 2026, excluding Jun 1 & Jun 14 (published)
function buildAllDates() {
  const dates = [];
  const SKIP = new Set(['2026-06-01','2026-06-14']);
  let d = new Date('2026-06-02');
  const end = new Date('2026-09-16');
  while (d <= end) {
    const s = d.toISOString().slice(0,10);
    if (!SKIP.has(s)) dates.push(s);
    d.setDate(d.getDate()+1);
  }
  return dates;
}

// Interleave by part: ~57% AV, ~29% AA, ~14% AG
function interleave(entries) {
  const av = entries.filter(e => e.part === 'AI Visibility');
  const aa = entries.filter(e => e.part === 'AI Automation');
  const ag = entries.filter(e => e.part === 'AI Agents');
  const out = [];
  let ai=0, bi=0, ci=0;
  const total = entries.length;
  for (let i = 0; i < total; i++) {
    const slot = i % 7;
    if (slot < 4 && ai < av.length) { out.push(av[ai++]); }
    else if (slot < 6 && bi < aa.length) { out.push(aa[bi++]); }
    else if (ci < ag.length) { out.push(ag[ci++]); }
    else if (ai < av.length) { out.push(av[ai++]); }
    else if (bi < aa.length) { out.push(aa[bi++]); }
    else if (ci < ag.length) { out.push(ag[ci++]); }
  }
  // append any stragglers
  while (ai < av.length) out.push(av[ai++]);
  while (bi < aa.length) out.push(aa[bi++]);
  while (ci < ag.length) out.push(ag[ci++]);
  return out;
}

(async () => {
  const [schedRecs, postRecs, catRecs, clusterRecs, qRecs] =
    await Promise.all([all('Schedule'), all('Posts'), all('Categories'), all('Clusters'), all('Questions')]);

  const postById = new Map(postRecs.map(r => [r.id, r.fields]));
  const catIdByName = new Map(catRecs.map(r => [r.fields.Name, r.id]));
  const clusterIdBySlug = new Map(clusterRecs.map(r => [r.fields.Cluster, r.id]));

  // Map category name -> number prefix for question pool lookup
  const catNumByName = new Map();
  catRecs.forEach(r => { const m = r.fields.Name?.match(/^(\d+)\./); if(m) catNumByName.set(r.fields.Name, parseInt(m[1])); });

  // Existing NEW schedule: only Queued posts (not Published/Old Schedule)
  const existingSched = schedRecs.filter(r => {
    const pid = (r.fields.Post||[])[0];
    if (!pid) return false;
    const p = postById.get(pid);
    return p && p.Status === 'Queued' && (r.fields.Notes||'').includes('AI Visibility (NEW');
  });

  // Build existing entries with their part
  const existing = existingSched.map(r => {
    const pid = (r.fields.Post||[])[0];
    const p = postById.get(pid);
    return { schedId: r.id, postId: pid, title: p?.Title||'', part: p?.Part||'AI Visibility', slug: p?.Slug||'', catId: (p?.Category||[])[0] };
  });

  // New extended posts from data file
  const extData = JSON.parse(fs.readFileSync(path.join(__dirname,'extended-schedule-data.json'),'utf8'));
  const haveSlug = new Set(postRecs.map(r => r.fields.Slug).filter(Boolean));

  // Unused questions pool by catName
  const unusedByCatId = new Map();
  qRecs.filter(r => r.fields.Status === 'Unused').forEach(r => {
    const cid = (r.fields.Category||[])[0]; if (!cid) return;
    if (!unusedByCatId.has(cid)) unusedByCatId.set(cid, []);
    unusedByCatId.get(cid).push(r);
  });
  unusedByCatId.forEach(arr => arr.sort((a,b) => (a.fields.Number||0)-(b.fields.Number||0)));

  // Create new posts for extended data (skip if slug exists)
  const newEntries = [];
  const newPostFields = [];
  const qUpdates = [];
  for (const it of extData) {
    const slug = slugify(it.title);
    if (haveSlug.has(slug)) { // already exists, just grab its postId for scheduling
      const p = postRecs.find(r => r.fields.Slug === slug);
      if (p) newEntries.push({ postId: p.id, title: it.title, part: it.part, slug, catId: catIdByName.get(it.catName) });
      continue;
    }
    haveSlug.add(slug);
    const cid = catIdByName.get(it.catName);
    const pool = (cid && unusedByCatId.get(cid)) || [];
    const targets = pool.splice(0,3);
    const faqs = pool.splice(0,4);
    const fields = {
      Title: it.title, Slug: slug, Status: 'Queued',
      Part: it.part, ServiceTrack: it.track, PillarPost: !!it.pillar,
      Notes: 'NEW SCHEDULE — AI Visibility pivot',
    };
    if (cid) fields.Category = [cid];
    const cslug = it.catName.replace(/^\d+\.\s*/,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
    if (clusterIdBySlug.get(cslug)) fields.Cluster = [clusterIdBySlug.get(cslug)];
    if (targets.length) { fields.TargetQuestions = targets.map(q=>q.id); fields.PrimaryQuery = targets[0].fields.Question; }
    if (faqs.length) fields.FAQQuestions = faqs.map(q=>q.id);
    targets.forEach(q => qUpdates.push({id:q.id,fields:{Status:'Assigned'}}));
    faqs.forEach(q => qUpdates.push({id:q.id,fields:{Status:'FAQ'}}));
    newPostFields.push(fields);
    newEntries.push({ postId: null, title: it.title, part: it.part, slug, catId: cid, _idx: newPostFields.length-1 });
  }

  const allDates = buildAllDates(); // Jun 2 – Sep 16, 106 dates
  const allEntries = [...existing, ...newEntries]; // up to 106
  const interleaved = interleave(allEntries);
  const n = Math.min(interleaved.length, allDates.length);

  console.log(`Total dates available: ${allDates.length}`);
  console.log(`Existing scheduled posts: ${existing.length}`);
  console.log(`New posts to create: ${newPostFields.length}`);
  console.log(`Total after interleave: ${interleaved.length} -> filling ${n} slots`);
  const partTally = {};
  interleaved.slice(0,n).forEach(e => { partTally[e.part] = (partTally[e.part]||0)+1; });
  console.log('Distribution:', JSON.stringify(partTally));

  if (DRY) { interleaved.slice(0,n).forEach((e,i)=>console.log(`  ${allDates[i]}  [${e.part}]  ${e.title}`)); console.log('--dry'); return; }

  // Create new posts
  if (newPostFields.length) {
    const created = await createBatch('Posts', newPostFields);
    created.forEach((r,i) => {
      const entry = newEntries.find(e => e._idx === i);
      if (entry) entry.postId = r.id;
    });
    console.log(`Created ${created.length} new Posts.`);
  }
  if (qUpdates.length) { await patchBatch('Questions', qUpdates); console.log(`Updated ${qUpdates.length} questions.`); }

  // Delete all existing Schedule rows for NEW posts
  const toDelete = existingSched.map(r => r.id);
  for (let i = 0; i < toDelete.length; i += 10) {
    const ids = toDelete.slice(i,i+10).map(id=>`records[]=${id}`).join('&');
    await req(`${encodeURIComponent('Schedule')}?${ids}`, { method: 'DELETE' });
    await sleep(220);
  }
  console.log(`Deleted ${toDelete.length} old Schedule rows.`);

  // Create fresh Schedule rows in interleaved order
  const newSchedRows = interleaved.slice(0,n).map((e,i) => ({
    Date: allDates[i],
    Post: [e.postId],
    Notes: 'AI Visibility (NEW schedule)',
  })).filter(r => r.Post[0]);
  await createBatch('Schedule', newSchedRows);
  console.log(`Created ${newSchedRows.length} new Schedule rows.`);

  // Update Post.Date to match new schedule date
  const dateUpdates = interleaved.slice(0,n).map((e,i) => ({ id: e.postId, fields: { Date: allDates[i] } })).filter(u => u.id);
  await patchBatch('Posts', dateUpdates);
  console.log(`Updated ${dateUpdates.length} Post dates.`);

  console.log('Reshuffle complete. Schedule now runs', allDates[0], '->', allDates[n-1]);
})().catch(e => { console.error(e.message); process.exit(1); });
