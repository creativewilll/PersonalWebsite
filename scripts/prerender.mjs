#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { preview } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SITEMAP_PATH = join(DIST, 'sitemap.xml');

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

async function prerender() {
  if (!existsSync(DIST)) {
    console.error('dist/ directory not found. Did you run vite build?');
    process.exit(1);
  }

  // Parse sitemap to get routes
  let sitemap;
  try {
    sitemap = readFileSync(SITEMAP_PATH, 'utf8');
  } catch (err) {
    console.error(`Could not read sitemap at ${SITEMAP_PATH}. Make sure generate-sitemap.mjs ran successfully.`);
    process.exit(1);
  }

  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(sitemap)) !== null) {
    const urlStr = match[1];
    try {
      const urlObj = new URL(urlStr);
      urls.push(urlObj.pathname);
    } catch (e) {
      // ignore invalid URLs
    }
  }

  console.log(`[prerender] Found ${urls.length} routes to prerender`);

  // Start Vite Preview Server
  console.log('[prerender] Starting preview server...');
  const previewServer = await preview({
    preview: { port: PORT, strictPort: true },
  });

  console.log('[prerender] Launching headless browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const urlPath of urls) {
    const localUrl = `${BASE_URL}${urlPath}`;
    console.log(`[prerender] Prerendering ${urlPath}...`);

    try {
      await page.goto(localUrl, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait a tiny bit extra for animations/suspense to settle
      await page.waitForTimeout(500);

      let html = await page.content();

      // We only want the outerHTML. But since it's a SPA, the scripts will still be there.
      // Netlify will serve this static HTML, and React will hydrate it!

      // Determine the output path
      let outPath;
      if (urlPath === '/' || urlPath === '') {
        outPath = join(DIST, 'index.html');
      } else {
        const dir = join(DIST, urlPath);
        if (!existsSync(dir)) {
          mkdirSync(dir, { recursive: true });
        }
        outPath = join(dir, 'index.html');
      }

      writeFileSync(outPath, html, 'utf8');
      console.log(`[prerender] Saved ${outPath.replace(ROOT, '')}`);

    } catch (err) {
      console.error(`[prerender] Failed to prerender ${urlPath}:`, err.message);
    }
  }

  console.log('[prerender] Closing browser and server...');
  await browser.close();
  // Ensure the server closes
  await new Promise((resolve) => {
    previewServer.httpServer.close(resolve);
  });
  console.log('[prerender] Prerendering complete!');
}

prerender().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
