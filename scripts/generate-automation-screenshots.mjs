#!/usr/bin/env node
/**
 * Scan public/automations/ for workflow screenshots and write a slug→path manifest.
 * Output: src/data/automationsData/screenshots.json
 *
 * Naming: public/automations/<slug>.{png,jpg,jpeg,webp}
 * Prefer .webp when both exist.
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
  readFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'public', 'automations');
const OUT = path.join(ROOT, 'src/data/automationsData/screenshots.json');
const SNAPSHOT = path.join(ROOT, 'src/data/automationsData/automations.json');

const EXT_PRIORITY = { '.webp': 3, '.png': 2, '.jpg': 1, '.jpeg': 1 };

function die(msg, code = 1) {
  console.error(`Error: ${msg}`);
  process.exit(code);
}

function main() {
  mkdirSync(DIR, { recursive: true });

  const bySlug = new Map();
  for (const file of readdirSync(DIR)) {
    if (file.startsWith('.')) continue;
    if (file.toLowerCase() === 'readme.md') continue;
    const ext = path.extname(file).toLowerCase();
    if (!EXT_PRIORITY[ext]) continue;
    const slug = path.basename(file, ext);
    if (!slug) continue;
    const prev = bySlug.get(slug);
    if (!prev || EXT_PRIORITY[ext] > prev.priority) {
      bySlug.set(slug, {
        path: `/automations/${file}`,
        priority: EXT_PRIORITY[ext],
      });
    }
  }

  const screenshots = {};
  for (const [slug, { path: p }] of [...bySlug.entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  )) {
    screenshots[slug] = p;
  }

  let knownSlugs = [];
  if (existsSync(SNAPSHOT)) {
    try {
      const snap = JSON.parse(readFileSync(SNAPSHOT, 'utf8'));
      knownSlugs = (snap.automations || []).map((a) => a.slug).filter(Boolean);
    } catch {
      /* ignore */
    }
  }

  const unmatched = Object.keys(screenshots).filter(
    (s) => knownSlugs.length && !knownSlugs.includes(s)
  );

  writeFileSync(OUT, JSON.stringify(screenshots, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${Object.keys(screenshots).length} screenshot path(s) → ${OUT}`);
  if (unmatched.length) {
    console.warn(`Warning: ${unmatched.length} file(s) don't match a known slug:`);
    for (const s of unmatched.slice(0, 20)) console.warn(`  - ${s}`);
  }
}

try {
  main();
} catch (err) {
  die(err?.message || String(err));
}
