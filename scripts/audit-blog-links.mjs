#!/usr/bin/env node
// Audit all blog posts for internal /blog links that break on client navigation.
// Route contract: only /blog/:slug (single segment), /blog/category/:slug, /blog/tag/:slug exist.
// Anything like /blog/YYYY/MM/slug breaks. Also flags links to non-existent slugs.

import { readFileSync, globSync } from 'fs';
import { join, basename } from 'path';

const ROOT = join(process.cwd());
const files = globSync('content/blog/**/*.md', { cwd: ROOT, absolute: true });

function parseSlug(raw, filePath) {
  const fm = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  let slug = null;
  let draft = false;
  if (fm) {
    const sm = fm[1].match(/^slug:\s*["']?(.+?)["']?\s*$/m);
    if (sm) slug = sm[1].trim();
    if (/^draft:\s*true\s*$/m.test(fm[1])) draft = true;
    if (/^published:\s*false\s*$/m.test(fm[1])) draft = true;
  }
  if (!slug) slug = basename(filePath).replace(/\.md$/, '');
  return { slug, draft };
}

// Build valid slug set (effective slug = frontmatter slug || filename basename)
const validSlugs = new Set();        // effective slugs (the only valid URLs)
const basenameToSlug = new Map();    // filename basename -> effective slug
const meta = [];
for (const f of files) {
  if (f.endsWith('template.md')) continue;
  const raw = readFileSync(f, 'utf8');
  const { slug, draft } = parseSlug(raw, f);
  meta.push({ file: f, raw, slug, draft });
  validSlugs.add(slug);
  const base = basename(f).replace(/\.md$/, '');
  basenameToSlug.set(base, slug);
}

// Fuzzy match an unknown slug to the closest valid slug by token overlap.
function fuzzyMatch(target, threshold = 0.6) {
  const ttoks = new Set(target.split('-').filter(Boolean));
  let best = null;
  let bestScore = 0;
  const candidates = new Set([...validSlugs, ...basenameToSlug.keys()]);
  for (const s of candidates) {
    const stoks = s.split('-').filter(Boolean);
    let common = 0;
    for (const t of stoks) if (ttoks.has(t)) common++;
    const union = new Set([...ttoks, ...stoks]).size;
    const score = common / union;
    if (score > bestScore) {
      bestScore = score;
      best = s;
    }
  }
  if (bestScore < threshold) return null;
  // map basename hits to their effective slug
  return basenameToSlug.has(best) ? basenameToSlug.get(best) : best;
}

// Find all markdown links to /blog/... (relative OR absolute williamspurlock.com URLs)
// group 1 = link exactly as written (used by fixer); path is derived by stripping domain.
const linkRe = /\]\(((?:https?:\/\/(?:www\.)?williamspurlock\.com)?\/blog\/[^)\s]+)\)/g;
const problems = [];

for (const { file, raw } of meta) {
  const lines = raw.split('\n');
  lines.forEach((line, idx) => {
    let m;
    const re = new RegExp(linkRe.source, 'g');
    while ((m = re.exec(line)) !== null) {
      const full = m[1]; // exactly as written (may include domain)
      // normalize to a path for resolution
      const pathOnly = full.replace(/^https?:\/\/(www\.)?williamspurlock\.com/, '');
      const clean = pathOnly.split(/[?#]/)[0].replace(/\/$/, '');
      const rest = clean.replace(/^\/blog\//, '');
      const segs = rest.split('/').filter(Boolean);

      // valid 2-seg routes
      if (segs[0] === 'category' || segs[0] === 'tag') continue;
      // 'categories' (plural) is a broken route -> treat as needs review below

      // normalize: drop trailing .md (some links accidentally include it)
      let lastSeg = segs[segs.length - 1].replace(/\.md$/, '');
      const multiseg = segs.length > 1;
      const validCat = segs[0] === 'category' || segs[0] === 'tag';
      if (validCat) continue;

      let status, suggested, confidence;
      if (validSlugs.has(lastSeg)) {
        if (!multiseg) continue; // perfectly fine
        status = 'AUTO_FIX';
        suggested = `/blog/${lastSeg}`;
        confidence = 'exact';
      } else if (basenameToSlug.has(lastSeg)) {
        // link used the filename basename; rewrite to effective slug
        status = 'AUTO_FIX';
        suggested = `/blog/${basenameToSlug.get(lastSeg)}`;
        confidence = 'basename';
      } else {
        const match = fuzzyMatch(lastSeg);
        status = match ? 'NEEDS_REVIEW_GUESS' : 'NEEDS_REVIEW_NOMATCH';
        suggested = match ? `/blog/${match}` : null;
        confidence = match ? 'fuzzy' : 'none';
      }
      problems.push({
        file: file.replace(ROOT + '/', ''),
        line: idx + 1,
        link: full,
        lastSeg,
        multiseg,
        status,
        confidence,
        suggested,
      });
    }
  });
}

// Report
const byStatus = {};
for (const p of problems) byStatus[p.status] = (byStatus[p.status] || 0) + 1;

console.log(`\n=== BLOG LINK AUDIT ===`);
console.log(`Posts scanned: ${meta.length}`);
console.log(`Total problem links: ${problems.length}`);
console.log(`By status:`, byStatus);
console.log(`Affected files: ${new Set(problems.map((p) => p.file)).size}\n`);

// Only print the ones needing human review (auto-fix list is in JSON)
for (const p of problems) {
  if (p.status === 'AUTO_FIX') continue;
  console.log(`[${p.status}] ${p.file}:${p.line}`);
  console.log(`    ${p.link}`);
  if (p.suggested) console.log(`    -> GUESS: ${p.suggested}`);
}

// Non-zero exit when problems exist so this can guard CI / pre-deploy.
process.exit(problems.length > 0 ? 1 : 0);
