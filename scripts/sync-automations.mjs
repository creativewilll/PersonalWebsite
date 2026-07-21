#!/usr/bin/env node
/**
 * Sync n8n automation portfolio from Airtable Done table → local JSON snapshot.
 * Output: src/data/automationsData/automations.json (sanitized, no secrets).
 *
 * Env (from .env):
 *   N8N_AIRTABLE_PAT
 *   N8N_AIRTABLE_BASE_ID
 *   N8N_AIRTABLE_DONE_TABLE_ID
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from './airtable-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'src/data/automationsData');
const OUT_FILE = path.join(OUT_DIR, 'automations.json');

const FIELDS = [
  'Workflow Name',
  'Brief',
  'Most Valuable Angle',
  'Workflow Tags',
  'Workflow Created',
  'Workflow ID',
];

const CATEGORY_MAP = [
  { match: /marketing/i, slug: 'marketing' },
  { match: /operations/i, slug: 'operations' },
  { match: /sales/i, slug: 'sales' },
  { match: /customer\s*service/i, slug: 'customer-service' },
  { match: /accounting|finance/i, slug: 'finance' },
  { match: /leadership/i, slug: 'leadership' },
  { match: /people|hr/i, slug: 'hr' },
];

const DROP_TAGS = new Set([
  'DONE',
  '🚀🤑🫰',
  'downloaded ⬇️',
  'Examples 📝',
  'Personal',
  'SMO 🚀',
  '⚙️Tool',
  '⚙️ Operations & Systems',
  'Marketing Automations 📸',
]);

// Broad emoji / pictograph coverage (incl. misc technical like ⏳)
const EMOJI_RE =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu;

const CATEGORIES = [
  'marketing',
  'operations',
  'sales',
  'customer-service',
  'finance',
  'leadership',
  'hr',
];

function die(msg, code = 1) {
  console.error(`Error: ${msg}`);
  process.exit(code);
}

function stripMarkdown(text) {
  if (!text) return '';
  let s = String(text);
  // Links: [text](url) → text
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // Images: ![alt](url) → alt
  s = s.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
  // Bold / italic / code
  s = s.replace(/\*\*/g, '');
  s = s.replace(/(?<!\w)\*(?!\s)/g, '').replace(/(?<!\s)\*(?!\w)/g, '');
  s = s.replace(/`+/g, '');
  // Collapse whitespace
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

// Brand voice: replace AI-tell words that appear in Airtable-generated briefs
const VOICE_REWRITES = [
  [/\bleverages\b/gi, 'uses'],
  [/\bleveraging\b/gi, 'using'],
  [/\bleverage\b/gi, 'use'],
  [/\brobustly\b/gi, 'reliably'],
  [/\brobust\b/gi, 'reliable'],
  [/\bmeticulous(ly)?\b/gi, 'careful$1'],
  [/\borchestrates\b/gi, 'coordinates'],
  [/\borchestrating\b/gi, 'coordinating'],
  [/\borchestrate\b/gi, 'coordinate'],
  [/\bseamless(ly)?\b/gi, 'smooth$1'],
  [/\bcutting-edge\b/gi, 'modern'],
  [/\bstate-of-the-art\b/gi, 'modern'],
  [/\bholistic\b/gi, 'complete'],
  [/\bdelves? into\b/gi, 'covers'],
];

function applyVoiceRewrites(text) {
  let s = text;
  for (const [re, replacement] of VOICE_REWRITES) {
    s = s.replace(re, (m, g1) => {
      let out = replacement.replace('$1', g1 || '');
      // Preserve leading capitalization
      if (m[0] === m[0].toUpperCase()) out = out[0].toUpperCase() + out.slice(1);
      return out;
    });
  }
  return s;
}

function truncateBrief(text, max = 280) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const base = lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : cut;
  return `${base.trimEnd()}…`;
}

function normalizeCategory(raw) {
  if (!raw || typeof raw !== 'string') return 'operations';
  const cleaned = raw.replace(EMOJI_RE, '').trim();
  for (const { match, slug } of CATEGORY_MAP) {
    if (match.test(cleaned)) return slug;
  }
  return 'operations';
}

function isOnlyEmoji(s) {
  const without = s.replace(EMOJI_RE, '').replace(/\s+/g, '');
  return without.length === 0;
}

function stripEdgeEmoji(s) {
  // Peel emoji + spaces from both ends until stable
  let t = s;
  for (;;) {
    const next = t
      .replace(/^\s+/u, '')
      .replace(/\s+$/u, '')
      .replace(new RegExp(`^${EMOJI_RE.source}`, 'u'), '')
      .replace(new RegExp(`${EMOJI_RE.source}$`, 'u'), '');
    if (next === t) return t.trim();
    t = next;
  }
}

function cleanTag(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let t = raw.trim();
  if (!t) return null;
  if (DROP_TAGS.has(t)) return null;
  if (isOnlyEmoji(t)) return null;
  t = stripEdgeEmoji(t);
  if (!t || DROP_TAGS.has(t) || isOnlyEmoji(t)) return null;
  return t;
}

function parseTags(raw) {
  let parts = [];
  if (Array.isArray(raw)) {
    parts = raw.map(String);
  } else if (typeof raw === 'string') {
    parts = raw.split(',').map((s) => s.trim()).filter(Boolean);
  }
  const cleaned = [];
  const seen = new Set();
  for (const p of parts) {
    const c = cleanTag(p);
    if (!c) continue;
    const key = c.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    cleaned.push(c);
    if (cleaned.length >= 6) break;
  }
  return cleaned;
}

function toYearMonth(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  // Already YYYY-MM or ISO date
  const m = s.match(/^(\d{4})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}`;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${mo}`;
}

function createdSortKey(raw) {
  if (!raw) return 0;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}

async function fetchAllRecords(pat, baseId, tableId) {
  const all = [];
  let offset = null;
  let page = 0;
  do {
    const params = new URLSearchParams();
    if (offset) params.set('offset', offset);
    for (const f of FIELDS) params.append('fields[]', f);
    const url = `https://api.airtable.com/v0/${baseId}/${tableId}?${params.toString()}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${pat}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      die(`Airtable API error ${res.status}: ${JSON.stringify(data)}`);
    }
    all.push(...(data.records || []));
    offset = data.offset || null;
    page += 1;
    process.stdout.write(`  fetched page ${page} (${all.length} records)\n`);
  } while (offset);
  return all;
}

function buildSnapshot(records) {
  const normalizationIssues = [];
  const entries = [];

  for (const rec of records) {
    const f = rec.fields || {};
    const name = String(f['Workflow Name'] || '').trim();
    if (!name) {
      normalizationIssues.push({ id: rec.id, reason: 'missing Workflow Name' });
      continue;
    }

    const brief = truncateBrief(applyVoiceRewrites(stripMarkdown(f['Brief'] || '')));
    const category = normalizeCategory(f['Most Valuable Angle']);
    const rawAngle = f['Most Valuable Angle'];
    if (rawAngle && category === 'operations') {
      const cleaned = String(rawAngle).replace(EMOJI_RE, '').trim();
      if (!/operations/i.test(cleaned)) {
        normalizationIssues.push({
          id: rec.id,
          name,
          reason: `unmatched Most Valuable Angle → operations: ${JSON.stringify(rawAngle)}`,
        });
      }
    }

    const tags = parseTags(f['Workflow Tags']);
    const built = toYearMonth(f['Workflow Created']) || '1970-01';
    if (!f['Workflow Created']) {
      normalizationIssues.push({ id: rec.id, name, reason: 'missing Workflow Created' });
    }

    entries.push({
      id: rec.id,
      name,
      brief,
      category,
      tags,
      built,
      _createdMs: createdSortKey(f['Workflow Created']),
    });
  }

  // Dedupe exact-duplicate names, keep most recently created
  const byName = new Map();
  for (const e of entries) {
    const key = e.name;
    const prev = byName.get(key);
    if (!prev || e._createdMs > prev._createdMs) {
      byName.set(key, e);
    }
  }

  const deduped = [...byName.values()];
  deduped.sort((a, b) => b._createdMs - a._createdMs || a.name.localeCompare(b.name));

  const automations = deduped.map(({ _createdMs, ...rest }) => rest);

  const categories = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
  const tagCounts = new Map();
  let firstBuilt = null;
  let lastBuilt = null;

  for (const a of automations) {
    categories[a.category] = (categories[a.category] || 0) + 1;
    for (const t of a.tags) {
      tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
    }
    if (a.built && a.built !== '1970-01') {
      if (!firstBuilt || a.built < firstBuilt) firstBuilt = a.built;
      if (!lastBuilt || a.built > lastBuilt) lastBuilt = a.built;
    }
  }

  const topTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 20)
    .map(([tag, count]) => ({ tag, count }));

  return {
    snapshot: {
      generatedAt: new Date().toISOString(),
      total: automations.length,
      categories,
      topTags,
      firstBuilt: firstBuilt || '',
      lastBuilt: lastBuilt || '',
      automations,
    },
    normalizationIssues,
    rawCount: records.length,
    dedupedAway: entries.length - automations.length,
  };
}

async function main() {
  const env = loadEnv(path.join(ROOT, '.env'));
  const pat = env.N8N_AIRTABLE_PAT;
  const baseId = env.N8N_AIRTABLE_BASE_ID;
  const tableId = env.N8N_AIRTABLE_DONE_TABLE_ID;

  const missing = [];
  if (!pat) missing.push('N8N_AIRTABLE_PAT');
  if (!baseId) missing.push('N8N_AIRTABLE_BASE_ID');
  if (!tableId) missing.push('N8N_AIRTABLE_DONE_TABLE_ID');
  if (missing.length) {
    die(`Missing required env vars: ${missing.join(', ')}`);
  }

  console.log('Fetching Done table from Airtable…');
  const records = await fetchAllRecords(pat, baseId, tableId);
  console.log(`Fetched ${records.length} raw records.`);

  const { snapshot, normalizationIssues, rawCount, dedupedAway } = buildSnapshot(records);

  mkdirSync(OUT_DIR, { recursive: true });
  const json = JSON.stringify(snapshot, null, 2) + '\n';
  writeFileSync(OUT_FILE, json, 'utf8');
  const sizeKb = (Buffer.byteLength(json, 'utf8') / 1024).toFixed(1);

  console.log('\n=== Sync summary ===');
  console.log(`Raw records:     ${rawCount}`);
  console.log(`After dedupe:    ${snapshot.total} (−${dedupedAway} exact name dupes)`);
  console.log(`Categories:`);
  for (const c of CATEGORIES) {
    console.log(`  ${c.padEnd(18)} ${snapshot.categories[c]}`);
  }
  console.log(`firstBuilt:      ${snapshot.firstBuilt}`);
  console.log(`lastBuilt:       ${snapshot.lastBuilt}`);
  console.log(`topTags (20):    ${snapshot.topTags.map((t) => `${t.tag}(${t.count})`).join(', ')}`);
  console.log(`Output:          ${OUT_FILE}`);
  console.log(`File size:       ${sizeKb} KB`);

  if (normalizationIssues.length) {
    console.log(`\nNormalization notes (${normalizationIssues.length}):`);
    for (const issue of normalizationIssues.slice(0, 50)) {
      console.log(`  - ${issue.id}${issue.name ? ` "${issue.name}"` : ''}: ${issue.reason}`);
    }
    if (normalizationIssues.length > 50) {
      console.log(`  … and ${normalizationIssues.length - 50} more`);
    }
  } else {
    console.log('\nNo normalization issues.');
  }
}

main().catch((err) => {
  die(err?.message || String(err));
});
