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
import {
  estimateDepartments,
  estimateHoursPerWeek,
  parseWorkflowJson,
  pickRelated,
  slugifyName,
} from './lib/n8n-workflow-parse.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'src/data/automationsData');
const OUT_FILE = path.join(OUT_DIR, 'automations.json');

const HOURS_FIELD = 'Hours Saved / Week';
const DEPTS_FIELD = 'Departments';

const FIELDS = [
  'Workflow Name',
  'Brief',
  'Overview',
  'Most Valuable Angle',
  'Workflow Tags',
  'Workflow Created',
  'Workflow ID',
  'JSON',
  HOURS_FIELD,
  DEPTS_FIELD,
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

function die(msg, code = 1) {
  console.error(`Error: ${msg}`);
  process.exit(code);
}

function stripMarkdown(text, { preserveParagraphs = false } = {}) {
  if (!text) return '';
  let s = String(text);
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  s = s.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
  s = s.replace(/\*\*/g, '');
  s = s.replace(/(?<!\w)\*(?!\s)/g, '').replace(/(?<!\s)\*(?!\w)/g, '');
  s = s.replace(/`+/g, '');
  s = s.replace(/^#{1,6}\s+/gm, '');
  if (preserveParagraphs) {
    // Normalize to paragraph blocks separated by blank lines
    s = s.replace(/\r\n/g, '\n');
    s = s
      .split(/\n\s*\n/)
      .map((block) => block.replace(/[ \t]*\n[ \t]*/g, ' ').replace(/[ \t]+/g, ' ').trim())
      .filter(Boolean)
      .join('\n\n');
    return s.trim();
  }
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function applyVoiceRewrites(text) {
  let s = text;
  for (const [re, replacement] of VOICE_REWRITES) {
    s = s.replace(re, (m, g1) => {
      let out = replacement.replace('$1', g1 || '');
      if (m[0] === m[0].toUpperCase()) out = out[0].toUpperCase() + out.slice(1);
      return out;
    });
  }
  return s;
}

function truncateText(text, max, { preferSentence = false } = {}) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  if (preferSentence) {
    // Prefer ending on a sentence boundary in the last 40% of the window
    const windowStart = Math.floor(max * 0.6);
    const window = cut.slice(windowStart);
    const sentenceEnds = [...window.matchAll(/[.!?]["']?\s/g)];
    if (sentenceEnds.length) {
      const last = sentenceEnds[sentenceEnds.length - 1];
      const end = windowStart + last.index + last[0].trimEnd().length;
      return cut.slice(0, end).trimEnd();
    }
    // Fall back to paragraph break
    const para = cut.lastIndexOf('\n\n');
    if (para > max * 0.5) return cut.slice(0, para).trimEnd();
  }
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

function parseHours(raw) {
  if (raw === undefined || raw === null || raw === '') return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.round(n * 2) / 2;
}

function parseDepartments(raw) {
  let parts = [];
  if (Array.isArray(raw)) parts = raw.map(String);
  else if (typeof raw === 'string') parts = raw.split(',').map((s) => s.trim()).filter(Boolean);
  const valid = new Set([
    'Marketing',
    'Sales',
    'Operations',
    'Customer Service',
    'Finance',
    'HR',
    'Leadership',
  ]);
  const out = [];
  const seen = new Set();
  for (const p of parts) {
    if (!valid.has(p) || seen.has(p)) continue;
    seen.add(p);
    out.push(p);
  }
  return out;
}

async function probeValueFields(pat, baseId, tableId) {
  const params = new URLSearchParams();
  params.set('maxRecords', '1');
  params.append('fields[]', 'Workflow Name');
  params.append('fields[]', HOURS_FIELD);
  params.append('fields[]', DEPTS_FIELD);
  const url = `https://api.airtable.com/v0/${baseId}/${tableId}?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${pat}`,
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) return true;
  const data = await res.json().catch(() => ({}));
  const msg = JSON.stringify(data);
  if (/UNKNOWN_FIELD/i.test(msg) || msg.includes(HOURS_FIELD) || msg.includes(DEPTS_FIELD)) {
    console.warn(
      `  note: "${HOURS_FIELD}" / "${DEPTS_FIELD}" not on table yet — using local heuristics.`
    );
    console.warn(
      '  Create them in Airtable, run backfill-automation-value.mjs, then re-sync to prefer Airtable values.'
    );
    return false;
  }
  die(`Airtable probe error ${res.status}: ${msg}`);
}

async function fetchAllRecords(pat, baseId, tableId) {
  const valueFieldsAvailable = await probeValueFields(pat, baseId, tableId);
  const fields = valueFieldsAvailable
    ? FIELDS
    : FIELDS.filter((f) => f !== HOURS_FIELD && f !== DEPTS_FIELD);

  const all = [];
  let offset = null;
  let page = 0;
  do {
    const params = new URLSearchParams();
    if (offset) params.set('offset', offset);
    for (const f of fields) params.append('fields[]', f);
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
  return { records: all, valueFieldsAvailable };
}

function buildSnapshot(records) {
  const normalizationIssues = [];
  const entries = [];
  let jsonOk = 0;
  let jsonMissing = 0;
  let jsonBad = 0;
  let hoursFromAirtable = 0;
  let hoursFromHeuristic = 0;

  for (const rec of records) {
    const f = rec.fields || {};
    const name = String(f['Workflow Name'] || '').trim();
    if (!name) {
      normalizationIssues.push({ id: rec.id, reason: 'missing Workflow Name' });
      continue;
    }

    const brief = truncateText(
      applyVoiceRewrites(stripMarkdown(f['Brief'] || '')),
      280
    );
    const overviewSrc = f['Overview'] || f['Brief'] || '';
    // Keep enough prose for a readable modal (~p50 cleaned length); UI adds Show more.
    const overview = truncateText(
      applyVoiceRewrites(stripMarkdown(overviewSrc, { preserveParagraphs: true })),
      2200,
      { preferSentence: true }
    );
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

    const workflowId = String(f['Workflow ID'] || '').trim() || null;
    const parsed = parseWorkflowJson(f['JSON']);
    if (!f['JSON']) jsonMissing += 1;
    else if (parsed.ok) jsonOk += 1;
    else jsonBad += 1;

    const airtableHours = parseHours(f[HOURS_FIELD]);
    const airtableDepts = parseDepartments(f[DEPTS_FIELD]);
    const hoursSavedPerWeek =
      airtableHours ??
      estimateHoursPerWeek({
        category,
        nodeCount: parsed.nodeCount,
        integrations: parsed.integrations,
        triggerType: parsed.triggerType,
        tags,
      });
    if (airtableHours != null) hoursFromAirtable += 1;
    else hoursFromHeuristic += 1;

    const departments =
      airtableDepts.length > 0
        ? airtableDepts
        : estimateDepartments({ category, tags });

    entries.push({
      id: rec.id,
      name,
      brief,
      overview,
      category,
      tags,
      built,
      workflowId,
      nodeCount: parsed.ok ? parsed.nodeCount : null,
      triggerType: parsed.ok ? parsed.triggerType : null,
      integrations: parsed.ok ? parsed.integrations : [],
      hoursSavedPerWeek,
      departments,
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

  // Assign unique slugs
  const slugCounts = new Map();
  for (const e of deduped) {
    const base = slugifyName(e.name);
    const n = (slugCounts.get(base) || 0) + 1;
    slugCounts.set(base, n);
    e.slug = n === 1 ? base : `${base}-${n}`;
  }

  // Related workflows (precompute before stripping internals)
  for (const e of deduped) {
    e.related = pickRelated(e, deduped, 4);
  }

  const automations = deduped.map(({ _createdMs, workflowId, ...rest }) => ({
    ...rest,
    // Keep workflowId out of public bundle — not needed client-side
  }));

  const categories = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
  const tagCounts = new Map();
  let firstBuilt = null;
  let lastBuilt = null;
  let totalHoursPerWeek = 0;

  for (const a of automations) {
    categories[a.category] = (categories[a.category] || 0) + 1;
    for (const t of a.tags) {
      tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
    }
    if (a.built && a.built !== '1970-01') {
      if (!firstBuilt || a.built < firstBuilt) firstBuilt = a.built;
      if (!lastBuilt || a.built > lastBuilt) lastBuilt = a.built;
    }
    totalHoursPerWeek += a.hoursSavedPerWeek || 0;
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
      totalHoursPerWeek: Math.round(totalHoursPerWeek),
      automations,
    },
    normalizationIssues,
    rawCount: records.length,
    dedupedAway: entries.length - automations.length,
    stats: { jsonOk, jsonMissing, jsonBad, hoursFromAirtable, hoursFromHeuristic },
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
  const { records } = await fetchAllRecords(pat, baseId, tableId);
  console.log(`Fetched ${records.length} raw records.`);

  const { snapshot, normalizationIssues, rawCount, dedupedAway, stats } =
    buildSnapshot(records);

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
  console.log(`totalHrs/week:   ${snapshot.totalHoursPerWeek}`);
  console.log(
    `JSON parse:      ok=${stats.jsonOk} missing=${stats.jsonMissing} bad=${stats.jsonBad}`
  );
  console.log(
    `Hours source:    airtable=${stats.hoursFromAirtable} heuristic=${stats.hoursFromHeuristic}`
  );
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
