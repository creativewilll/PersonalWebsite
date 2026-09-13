#!/usr/bin/env node
/**
 * Assert routing behaviour that a build cannot catch: static files must be served,
 * HTML routes must redirect permanently, and misses must 404.
 *
 * Guards the G9 regression where a `_redirects` `:slug` placeholder matched image
 * filenames (a period is not a path delimiter), 301ing every binary under
 * /projects/ into a trailing-slash URL that does not exist.
 *
 * Usage:
 *   node scripts/audit-redirects.mjs                       # production
 *   node scripts/audit-redirects.mjs --base=http://localhost:8787
 *   node scripts/audit-redirects.mjs --skip-privacy        # dist/ predates the sitemap change
 */
import { readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arg = (name) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
};
const BASE = (arg('base') || 'https://williamspurlock.com').replace(/\/+$/, '');
const SKIP_PRIVACY = argv.includes('--skip-privacy');

let passed = 0;
const failures = [];

function record(ok, label, detail) {
  if (ok) {
    passed += 1;
    return;
  }
  failures.push(`${label}\n      ${detail}`);
}

async function head(path) {
  const res = await fetch(`${BASE}${path}`, { method: 'HEAD', redirect: 'manual' });
  const location = res.headers.get('location');
  return {
    status: res.status,
    location,
    // Location may be absolute (Worker `Response.redirect`) or relative (assets
    // layer). Both are valid, so compare the resolved path, not the raw header.
    target: location ? new URL(location, BASE).pathname : null,
    type: res.headers.get('content-type') || '',
  };
}

/** A served file: 200, an image content-type, and crucially no redirect. */
async function expectImage(path) {
  const { status, location, type } = await head(path);
  record(
    status === 200 && !location && type.startsWith('image/'),
    `image should be served: ${path}`,
    `got ${status}${location ? ` -> ${location}` : ''} (${type || 'no content-type'})`
  );
}

/** Slashless HTML: one permanent hop to the trailing-slash form, landing on a 200. */
async function expectPermanentSlashRedirect(path) {
  const { status, location, target } = await head(path);
  if (status !== 301) {
    record(
      false,
      `should 301 (not 307) to trailing slash: ${path}`,
      `got ${status}${location ? ` -> ${location}` : ''}${status === 307 ? '  [307 is temporary — the worker 301 is not running]' : ''}`
    );
    return;
  }
  if (target !== `${path}/`) {
    record(false, `301 target should be ${path}/`, `got ${target}`);
    return;
  }
  const next = await head(target);
  record(
    next.status === 200,
    `redirect destination should be 200, not another hop: ${target}`,
    `got ${next.status}${next.location ? ` -> ${next.location}` : ''}`
  );
}

async function expectStatus(path, want) {
  const { status, location } = await head(path);
  record(
    status === want,
    `${path} should be ${want}`,
    `got ${status}${location ? ` -> ${location}` : ''}`
  );
}

/** Every legacy privacy form collapses to /privacy/ in a single permanent hop. */
async function expectSingleHopTo(path, want) {
  const { status, location, target } = await head(path);
  record(
    status === 301 && target === want,
    `${path} should 301 straight to ${want}`,
    `got ${status}${location ? ` -> ${location}` : ''}`
  );
}

const run = async () => {
  console.log(`[audit-redirects] base ${BASE}\n`);

  // The outage itself: every binary under a route prefix must still be a file.
  const projectsDir = join(ROOT, 'public/projects');
  const binaries = existsSync(projectsDir)
    ? readdirSync(projectsDir).filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f))
    : [];
  console.log(`  ${binaries.length} binaries under /projects/`);
  for (const file of binaries) await expectImage(`/projects/${encodeURIComponent(file)}`);

  // Prefixes that never had a :slug rule — regression canaries.
  for (const p of [
    '/work/eminem-shady-97/home.png',
    '/images/profile.jpg',
    '/images/profile.webp',
    '/og/default-1200x630.webp',
  ]) {
    await expectImage(p);
  }

  // Permanence. 307 here means the worker redirect is not running.
  for (const p of [
    '/about',
    '/projects',
    '/blog',
    '/websites',
    '/projects/ai-twitter-influencer',
    '/websites/eminem-shady-97',
    '/blog/abacus-ai-research-writing-seat',
  ]) {
    await expectPermanentSlashRedirect(p);
  }

  // G8: a miss is a 404, never a 200 homepage.
  for (const p of ['/projects/zzz-does-not-exist/', '/blog/zzz-does-not-exist/']) {
    await expectStatus(p, 404);
  }

  // Canonical privacy page plus the legacy forms folding into it.
  if (!SKIP_PRIVACY) await expectStatus('/privacy/', 200);
  for (const p of ['/legal/privacy', '/legal/privacy/', '/legal/privacy.html']) {
    await expectSingleHopTo(p, '/privacy/');
  }

  // Terms has no React route; /legal/terms/ stays the real page.
  await expectStatus('/legal/terms/', 200);

  console.log(`\n[audit-redirects] ${passed} passed, ${failures.length} failed`);
  if (failures.length) {
    console.error('\nFailures:');
    for (const f of failures) console.error(`  ✗ ${f}`);
    process.exit(1);
  }
  console.log('[audit-redirects] OK');
};

run().catch((err) => {
  console.error(`[audit-redirects] ${err.message}`);
  process.exit(1);
});
