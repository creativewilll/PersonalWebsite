#!/usr/bin/env node
/**
 * Backfill heuristic "Hours Saved / Week" + "Departments" on the Airtable Done table.
 *
 * Only writes when a field is empty — manual corrections always win.
 *
 * Prerequisites: create these two fields on the Done table (PAT lacks schema.write):
 *   - Hours Saved / Week  (Number, precision 1)
 *   - Departments         (Multiple select)
 *       choices: Marketing, Sales, Operations, Customer Service, Finance, HR, Leadership
 *
 * Env (from .env):
 *   N8N_AIRTABLE_PAT
 *   N8N_AIRTABLE_BASE_ID
 *   N8N_AIRTABLE_DONE_TABLE_ID
 *
 * Flags:
 *   --dry-run   Report what would change without writing.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from './airtable-utils.mjs';
import {
  DEPARTMENT_OPTIONS,
  estimateDepartments,
  estimateHoursPerWeek,
  parseWorkflowJson,
} from './lib/n8n-workflow-parse.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const HOURS_FIELD = 'Hours Saved / Week';
const DEPTS_FIELD = 'Departments';

const CATEGORY_MAP = [
  { match: /marketing/i, slug: 'marketing' },
  { match: /operations/i, slug: 'operations' },
  { match: /sales/i, slug: 'sales' },
  { match: /customer\s*service/i, slug: 'customer-service' },
  { match: /accounting|finance/i, slug: 'finance' },
  { match: /leadership/i, slug: 'leadership' },
  { match: /people|hr/i, slug: 'hr' },
];

const EMOJI_RE =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu;

const DRY_RUN = process.argv.includes('--dry-run');

function die(msg, code = 1) {
  console.error(`Error: ${msg}`);
  process.exit(code);
}

function normalizeCategory(raw) {
  if (!raw || typeof raw !== 'string') return 'operations';
  const cleaned = raw.replace(EMOJI_RE, '').trim();
  for (const { match, slug } of CATEGORY_MAP) {
    if (match.test(cleaned)) return slug;
  }
  return 'operations';
}

function parseTags(raw) {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === 'string') return raw.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

async function fetchAll(pat, baseId, tableId) {
  const fields = [
    'Workflow Name',
    'Most Valuable Angle',
    'Workflow Tags',
    'JSON',
    HOURS_FIELD,
    DEPTS_FIELD,
  ];
  const all = [];
  let offset = null;
  do {
    const params = new URLSearchParams();
    if (offset) params.set('offset', offset);
    for (const f of fields) params.append('fields[]', f);
    const url = `https://api.airtable.com/v0/${baseId}/${tableId}?${params.toString()}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${pat}`, 'Content-Type': 'application/json' },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = JSON.stringify(data);
      if (/UNKNOWN_FIELD_NAME|Invalid permissions|INVALID_REQUEST/i.test(msg) || res.status === 422) {
        die(
          [
            `Airtable rejected the request — the value fields are probably missing.`,
            ``,
            `Create these two fields on the Done table, then re-run:`,
            `  1. "${HOURS_FIELD}"  → Number (precision 1)`,
            `  2. "${DEPTS_FIELD}"  → Multiple select with choices:`,
            `       ${DEPARTMENT_OPTIONS.join(', ')}`,
            ``,
            `Table: https://airtable.com/${baseId}/${tableId}`,
            `API detail: ${msg}`,
          ].join('\n')
        );
      }
      die(`Airtable API error ${res.status}: ${msg}`);
    }
    all.push(...(data.records || []));
    offset = data.offset || null;
  } while (offset);
  return all;
}

async function patchBatch(pat, baseId, tableId, records) {
  const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${pat}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ records }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    die(`Airtable PATCH error ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function main() {
  const env = loadEnv(path.join(ROOT, '.env'));
  const pat = env.N8N_AIRTABLE_PAT;
  const baseId = env.N8N_AIRTABLE_BASE_ID;
  const tableId = env.N8N_AIRTABLE_DONE_TABLE_ID;
  if (!pat || !baseId || !tableId) {
    die('Missing N8N_AIRTABLE_PAT / N8N_AIRTABLE_BASE_ID / N8N_AIRTABLE_DONE_TABLE_ID');
  }

  console.log(DRY_RUN ? 'Dry run — no writes.' : 'Backfilling empty value fields…');
  const records = await fetchAll(pat, baseId, tableId);
  console.log(`Fetched ${records.length} records.`);

  const updates = [];
  let skippedHours = 0;
  let skippedDepts = 0;

  for (const rec of records) {
    const f = rec.fields || {};
    const name = String(f['Workflow Name'] || '').trim();
    if (!name) continue;

    const category = normalizeCategory(f['Most Valuable Angle']);
    const tags = parseTags(f['Workflow Tags']);
    const parsed = parseWorkflowJson(f['JSON']);
    const hours = estimateHoursPerWeek({
      category,
      nodeCount: parsed.nodeCount,
      integrations: parsed.integrations,
      triggerType: parsed.triggerType,
      tags,
    });
    const departments = estimateDepartments({ category, tags });

    const fields = {};
    const hasHours =
      f[HOURS_FIELD] !== undefined && f[HOURS_FIELD] !== null && f[HOURS_FIELD] !== '';
    const hasDepts = Array.isArray(f[DEPTS_FIELD])
      ? f[DEPTS_FIELD].length > 0
      : Boolean(f[DEPTS_FIELD]);

    if (!hasHours) fields[HOURS_FIELD] = hours;
    else skippedHours += 1;
    if (!hasDepts) fields[DEPTS_FIELD] = departments;
    else skippedDepts += 1;

    if (Object.keys(fields).length) {
      updates.push({ id: rec.id, fields });
    }
  }

  console.log(`Would update: ${updates.length} records`);
  console.log(`Skipped (already set): hours=${skippedHours}, departments=${skippedDepts}`);

  if (DRY_RUN) {
    for (const u of updates.slice(0, 8)) {
      console.log(`  ${u.id}`, u.fields);
    }
    if (updates.length > 8) console.log(`  … +${updates.length - 8} more`);
    return;
  }

  let written = 0;
  for (let i = 0; i < updates.length; i += 10) {
    const batch = updates.slice(i, i + 10);
    await patchBatch(pat, baseId, tableId, batch);
    written += batch.length;
    process.stdout.write(`  patched ${written}/${updates.length}\n`);
    if (i + 10 < updates.length) await new Promise((r) => setTimeout(r, 220));
  }

  console.log(`\nDone. Wrote estimates to ${written} records.`);
  console.log('Correct any values in Airtable; re-run sync:automations to pull them into the site.');
}

main().catch((err) => die(err?.message || String(err)));
