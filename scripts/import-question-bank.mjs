#!/usr/bin/env node
// One-time import of the 27 categories and ~500 questions from the skill's
// AI_VISIBILITY_QUESTION_BANK.md into the WS Blog Airtable base.
// Idempotent: skips Categories (by Name) and Questions (by Number) that already exist.
//
// Usage: node scripts/import-question-bank.mjs [--dry]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BANK = '/Users/creativewill/.cursor/skills/authoring-blog-posts-v2/AI_VISIBILITY_QUESTION_BANK.md';
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
    await new Promise((r) => setTimeout(r, 220)); // ~5 req/s rate limit
  }
  return created;
}

function partFor(catNum) {
  if (catNum <= 14) return { part: 'AI Visibility', priority: 'Primary' };
  if (catNum <= 22) return { part: 'AI Automation', priority: 'Secondary' };
  return { part: 'AI Agents', priority: 'Tertiary' };
}

function parseBank() {
  const text = fs.readFileSync(BANK, 'utf8');
  const cats = []; // {num, name, part, priority, questions:[{number,text}]}
  let cur = null;
  for (const line of text.split('\n')) {
    const cat = line.match(/^##\s+Category\s+(\d+):\s*(.+?)\s*$/);
    if (cat) {
      const num = parseInt(cat[1], 10);
      const { part, priority } = partFor(num);
      cur = { num, name: `${String(num).padStart(2, '0')}. ${cat[2]}`, rawName: cat[2], part, priority, questions: [] };
      cats.push(cur);
      continue;
    }
    const q = line.match(/^(\d+)\.\s+(.+?)\s*$/);
    if (q && cur) cur.questions.push({ number: parseInt(q[1], 10), text: q[2] });
  }
  return cats;
}

(async () => {
  const cats = parseBank();
  const totalQ = cats.reduce((n, c) => n + c.questions.length, 0);
  console.log(`Parsed ${cats.length} categories, ${totalQ} questions.`);
  const byPart = {};
  cats.forEach((c) => { byPart[c.part] = (byPart[c.part] || 0) + c.questions.length; });
  console.log('By part:', byPart);
  if (DRY) { console.log('--dry: no writes.'); return; }

  // Categories (idempotent by Name)
  const existingCats = await listAll('Categories');
  const catIdByName = new Map(existingCats.map((r) => [r.fields.Name, r.id]));
  const newCats = cats.filter((c) => !catIdByName.has(c.name))
    .map((c) => ({ Name: c.name, Part: c.part, Priority: c.priority }));
  if (newCats.length) {
    const created = await createBatch('Categories', newCats);
    created.forEach((r) => catIdByName.set(r.fields.Name, r.id));
    console.log(`Created ${created.length} categories.`);
  } else console.log('All categories already present.');

  // Questions (idempotent by Number)
  const existingQ = await listAll('Questions');
  const haveNumbers = new Set(existingQ.map((r) => r.fields.Number).filter((n) => n != null));
  const newQ = [];
  for (const c of cats) {
    for (const q of c.questions) {
      if (haveNumbers.has(q.number)) continue;
      newQ.push({ Question: q.text, Number: q.number, Part: c.part, Status: 'Unused', Category: [catIdByName.get(c.name)] });
    }
  }
  if (newQ.length) {
    const created = await createBatch('Questions', newQ);
    console.log(`Created ${created.length} questions.`);
  } else console.log('All questions already present.');

  console.log('Import complete.');
})().catch((e) => { console.error(e.message); process.exit(1); });
