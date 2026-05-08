#!/usr/bin/env node
// Validate every blog post's frontmatter against the canonical schema.
// Catches the issues that silently broke posts in the past:
//   1. Missing closing `---` delimiter (body fuses into YAML)
//   2. snake_case / alt-schema field names (silently dropped by loader)
//   3. coverImage paths that don't exist on disk
//   4. Required fields missing
// Exit code 1 on any blocking error so this can gate `npm run build`.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'content/blog');
const PUBLIC_DIR = join(ROOT, 'public');

// Fields the loader actually reads (camelCase canonical) and the wrong
// alternates that silently drop data.
const FORBIDDEN_FIELDS = {
  cover_image: 'coverImage',
  seo_title: 'seoTitle',
  seo_description: 'seoDescription',
  seo_keywords: 'seoKeywords',
  last_updated: 'lastModified',
  reading_time: 'readingTime',
  service_track: 'serviceTrack',
  aioEntityMentions: 'entityMentions',
  // `description` and `keywords` at the top level are also alt-schema;
  // accept them with a warning rather than a hard fail since the loader's
  // schema-tolerance layer normalizes them — but flag for cleanup.
};

const SOFT_FORBIDDEN = {
  description: 'seoDescription',
  keywords: 'seoKeywords',
  published: 'draft',
  cluster: 'contentCluster',
  track: 'serviceTrack',
  cover_alt: '(remove — not rendered)',
};

const REQUIRED_FIELDS = ['title', 'slug', 'date', 'author'];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else if (name.endsWith('.md') && name !== 'template.md') out.push(full);
  }
  return out;
}

function validateFile(file) {
  const raw = readFileSync(file, 'utf8');
  const errors = [];
  const warnings = [];
  const rel = relative(ROOT, file);

  // 1. Frontmatter must open and close. Within YAML, `# foo` is a comment,
  //    not a markdown H1 — so the only correct check is "does a `---`
  //    delimiter line appear before the body content begins?". The loader
  //    uses the regex `/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/`, which
  //    fails iff the file never has a second `---` line.
  if (!raw.startsWith('---\n')) {
    errors.push('frontmatter does not start with `---`');
    return { errors, warnings, rel };
  }
  const lines = raw.split('\n');
  let closeIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      closeIdx = i;
      break;
    }
  }
  if (closeIdx === -1) {
    errors.push('frontmatter never closes (no `---` delimiter found)');
    return { errors, warnings, rel };
  }

  const fm = lines.slice(1, closeIdx).join('\n');

  // 2. Forbidden snake_case / alt-schema keys (top-level only)
  const topLevelKeys = [];
  for (const line of fm.split('\n')) {
    const m = line.match(/^([a-zA-Z_][\w-]*)\s*:/);
    if (m) topLevelKeys.push(m[1]);
  }

  for (const key of topLevelKeys) {
    if (FORBIDDEN_FIELDS[key]) {
      errors.push(
        `forbidden field \`${key}\` — use \`${FORBIDDEN_FIELDS[key]}\` instead`
      );
    } else if (SOFT_FORBIDDEN[key]) {
      warnings.push(
        `legacy field \`${key}\` — prefer \`${SOFT_FORBIDDEN[key]}\``
      );
    }
  }

  // 3. Required fields present
  for (const req of REQUIRED_FIELDS) {
    if (!topLevelKeys.includes(req)) {
      errors.push(`required field \`${req}\` missing`);
    }
  }

  // 4. coverImage path actually exists
  const coverMatch = fm.match(/^coverImage:\s*"?([^"\n]+?)"?\s*$/m);
  if (coverMatch) {
    const coverPath = coverMatch[1].trim();
    if (coverPath.startsWith('/')) {
      const resolved = join(PUBLIC_DIR, coverPath);
      if (!existsSync(resolved)) {
        errors.push(`coverImage \`${coverPath}\` does not exist on disk`);
      }
    }
  }

  return { errors, warnings, rel };
}

function main() {
  const files = walk(BLOG_DIR);
  let totalErrors = 0;
  let totalWarnings = 0;
  const errorReports = [];
  const warningReports = [];

  for (const f of files) {
    const { errors, warnings, rel } = validateFile(f);
    if (errors.length) {
      totalErrors += errors.length;
      errorReports.push({ rel, errors });
    }
    if (warnings.length) {
      totalWarnings += warnings.length;
      warningReports.push({ rel, warnings });
    }
  }

  if (warningReports.length) {
    console.log('\n[blog-validate] WARNINGS:');
    for (const { rel, warnings } of warningReports) {
      console.log(`  ${rel}`);
      for (const w of warnings) console.log(`    - ${w}`);
    }
  }

  if (errorReports.length) {
    console.log('\n[blog-validate] ERRORS:');
    for (const { rel, errors } of errorReports) {
      console.log(`  ${rel}`);
      for (const e of errors) console.log(`    - ${e}`);
    }
    console.log(
      `\n[blog-validate] FAILED — ${totalErrors} error(s), ${totalWarnings} warning(s) across ${files.length} posts`
    );
    process.exit(1);
  }

  console.log(
    `[blog-validate] OK — ${files.length} posts, ${totalWarnings} warning(s)`
  );
}

main();
