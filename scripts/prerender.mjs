#!/usr/bin/env node
/**
 * Prerender every route from the sitemap into static HTML.
 *
 * Speed strategy:
 *  1. Content-addressed cache at `.prerender-cache/`. Each route's HTML is
 *     keyed by:
 *       - appShellHash: hash of the built JS/CSS asset filenames in
 *         `dist/assets/` (Vite content-hashes these, so any app-code change
 *         changes the filenames and busts the cache).
 *       - sourceHash:   for `/blog/<slug>`, the md5 of the source markdown
 *         file. Static routes (`/`, `/about`, ...) have no source hash —
 *         they rely on appShellHash alone.
 *     If both hashes match a previous build, we reuse the cached HTML and
 *     skip the browser entirely.
 *
 *  2. Parallel rendering via a pool of N concurrent Playwright pages
 *     (default 6, override with PRERENDER_CONCURRENCY env var).
 *
 *  3. `--skip` / PRERENDER_SKIP=1 short-circuits the whole step (SPA still
 *     works, just without per-route prerendered HTML).
 *
 * Flags:
 *   --no-cache              Ignore cache, re-render everything.
 *   --skip                  Skip prerender entirely.
 *   --only=/blog/foo,/bar   Restrict to specific routes (comma separated).
 *   --concurrency=N         Override parallel page count.
 */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
  statSync,
  copyFileSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { chromium } from '@playwright/test';
import { preview } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const ASSETS_DIR = join(DIST, 'assets');
const SITEMAP_PATH = join(DIST, 'sitemap.xml');
const BLOG_DIR = join(ROOT, 'content/blog');
const CACHE_DIR = join(ROOT, '.prerender-cache');

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// ---------- args ----------
const argv = process.argv.slice(2);
const argMap = Object.fromEntries(
  argv
    .map((a) => {
      if (a.startsWith('--')) {
        const [k, v] = a.slice(2).split('=');
        return [k, v ?? true];
      }
      return null;
    })
    .filter(Boolean)
);
const NO_CACHE = !!argMap['no-cache'] || process.env.PRERENDER_NO_CACHE === '1';
const SKIP = !!argMap['skip'] || process.env.PRERENDER_SKIP === '1';
const ONLY = (argMap['only'] && typeof argMap['only'] === 'string'
  ? argMap['only'].split(',').map((s) => s.trim()).filter(Boolean)
  : null);
const CONCURRENCY = Number(
  argMap['concurrency'] || process.env.PRERENDER_CONCURRENCY || 6
);

if (SKIP) {
  console.log('[prerender] --skip set, leaving SPA index.html untouched');
  process.exit(0);
}

// ---------- helpers ----------
function md5(s) {
  return createHash('md5').update(s).digest('hex');
}

function sha1(s) {
  return createHash('sha1').update(s).digest('hex').slice(0, 16);
}

function safeKeyFromRoute(route) {
  if (route === '/' || route === '') return 'root';
  return route.replace(/^\//, '').replace(/\//g, '__');
}

// Compute hash of all built JS/CSS asset filenames. Vite content-hashes these,
// so a meaningful app change rotates the filenames and invalidates the cache.
function computeAppShellHash() {
  if (!existsSync(ASSETS_DIR)) return 'no-assets';
  const names = readdirSync(ASSETS_DIR).filter((n) => /\.(js|css)$/.test(n));
  names.sort();
  return sha1(names.join('\n'));
}

// Walk content/blog and build slug -> markdown source hash map.
function buildBlogHashMap() {
  const map = new Map();
  if (!existsSync(BLOG_DIR)) return map;

  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      const s = statSync(full);
      if (s.isDirectory()) {
        walk(full);
      } else if (name.endsWith('.md') && name !== 'template.md') {
        const raw = readFileSync(full, 'utf8');
        const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---/);
        const fm = fmMatch ? fmMatch[1] : raw.slice(0, 4000);
        const slugMatch = fm.match(/^slug:\s*"?([^"\n]+?)"?\s*$/m);
        const slug = slugMatch
          ? slugMatch[1].trim()
          : name.replace(/\.md$/, '');
        map.set(slug, md5(raw));
      }
    }
  }
  walk(BLOG_DIR);
  return map;
}

// ---------- main ----------
async function prerender() {
  if (!existsSync(DIST)) {
    console.error('[prerender] dist/ not found. Did you run vite build?');
    process.exit(1);
  }

  let sitemap;
  try {
    sitemap = readFileSync(SITEMAP_PATH, 'utf8');
  } catch {
    console.error(`[prerender] Could not read sitemap at ${SITEMAP_PATH}.`);
    process.exit(1);
  }

  const urls = [];
  const re = /<loc>(.*?)<\/loc>/g;
  let m;
  while ((m = re.exec(sitemap)) !== null) {
    try {
      urls.push(new URL(m[1]).pathname);
    } catch {
      /* skip */
    }
  }

  const appShellHash = computeAppShellHash();
  const blogHashes = buildBlogHashMap();
  console.log(
    `[prerender] ${urls.length} routes | appShell=${appShellHash} | blog source files=${blogHashes.size}`
  );

  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });

  // Plan: classify each route as cache-hit or needs-render.
  const plan = urls
    .filter((u) => (ONLY ? ONLY.includes(u) : true))
    .map((route) => {
      let sourceHash = 'static';
      if (route.startsWith('/blog/')) {
        const slug = route.replace(/^\/blog\//, '').replace(/\/$/, '');
        sourceHash = blogHashes.get(slug) || 'missing-source';
      }
      const cacheKey = `${appShellHash}__${sourceHash}__${safeKeyFromRoute(route)}.html`;
      const cachePath = join(CACHE_DIR, cacheKey);
      const cached = !NO_CACHE && existsSync(cachePath);
      return { route, sourceHash, cachePath, cached };
    });

  const hits = plan.filter((p) => p.cached);
  const misses = plan.filter((p) => !p.cached);
  console.log(
    `[prerender] cache: ${hits.length} hit, ${misses.length} miss${NO_CACHE ? ' (--no-cache)' : ''}`
  );

  // Cache hits: just copy bytes into dist. No browser needed.
  for (const item of hits) {
    writeOutput(item.route, readFileSync(item.cachePath));
  }
  if (hits.length) console.log(`[prerender] copied ${hits.length} from cache`);

  if (misses.length === 0) {
    console.log('[prerender] Nothing to render. Done.');
    return;
  }

  // Boot preview server + browser only when something needs rendering.
  console.log('[prerender] Starting preview server...');
  const previewServer = await preview({
    preview: { port: PORT, strictPort: true },
  });

  console.log(
    `[prerender] Launching headless browser (concurrency=${CONCURRENCY})...`
  );
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const queue = [...misses];
  let active = 0;
  let renderedCount = 0;
  let failedCount = 0;
  const total = misses.length;

  async function renderOne(page, item) {
    const localUrl = `${BASE_URL}${item.route}`;
    try {
      await page.goto(localUrl, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });
      // Settle animations / suspense boundaries.
      await page.waitForTimeout(300);
      const html = await page.content();
      writeOutput(item.route, html);
      writeFileSync(item.cachePath, html, 'utf8');
      renderedCount++;
      console.log(
        `[prerender] (${renderedCount + hits.length}/${urls.length}) rendered ${item.route}`
      );
    } catch (err) {
      failedCount++;
      console.error(
        `[prerender] FAILED ${item.route}: ${err.message}`
      );
    }
  }

  const workers = Array.from(
    { length: Math.min(CONCURRENCY, total) },
    async () => {
      const page = await context.newPage();
      while (queue.length) {
        const item = queue.shift();
        if (!item) break;
        active++;
        await renderOne(page, item);
        active--;
      }
      await page.close();
    }
  );

  await Promise.all(workers);

  console.log('[prerender] Closing browser and server...');
  await context.close();
  await browser.close();
  await new Promise((resolve) => previewServer.httpServer.close(resolve));

  console.log(
    `[prerender] Done. cached=${hits.length} rendered=${renderedCount} failed=${failedCount}`
  );
}

function writeOutput(route, htmlOrBuffer) {
  let outPath;
  if (route === '/' || route === '') {
    outPath = join(DIST, 'index.html');
  } else {
    const dir = join(DIST, route);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    outPath = join(dir, 'index.html');
  }
  writeFileSync(outPath, htmlOrBuffer);
}

prerender().catch((err) => {
  console.error('[prerender] Fatal:', err);
  process.exit(1);
});
