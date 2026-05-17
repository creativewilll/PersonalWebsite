#!/usr/bin/env node
// Generate a complete sitemap.xml that includes every published blog post
// alongside the static site routes. Runs as part of `npm run build` so the
// generated file ships in `public/` (and therefore `dist/`) for crawlers.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'content/blog');
const OUT = join(ROOT, 'public/sitemap.xml');
const SITE = 'https://williamspurlock.com';

const STATIC_ROUTES = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/projects', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog', changefreq: 'daily', priority: '0.9' },
  { loc: '/websites', changefreq: 'monthly', priority: '0.8' },
  { loc: '/music', changefreq: 'monthly', priority: '0.9' },
];

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

function pickLine(text, ...keys) {
  for (const k of keys) {
    const re = new RegExp(`^${k}:\\s*"?([^"\\n]+?)"?\\s*$`, 'm');
    const m = text.match(re);
    if (m) return m[1].trim();
  }
  return null;
}

function parsePost(file) {
  const raw = readFileSync(file, 'utf8');
  const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  const fm = fmMatch ? fmMatch[1] : raw.slice(0, 4000);
  const slug =
    pickLine(fm, 'slug') ||
    file
      .split('/')
      .pop()
      .replace(/\.md$/, '');
  const date = pickLine(fm, 'date');
  const lastModified = pickLine(fm, 'lastModified', 'last_updated') || date;
  const draft = /^draft:\s*true\s*$/m.test(fm);
  const published = /^published:\s*false\s*$/m.test(fm);
  return { slug, lastmod: lastModified, draft: draft || published };
}

function fmtDate(d) {
  if (!d) return null;
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return null;
  return dt.toISOString().slice(0, 10);
}

function build() {
  const posts = walk(BLOG_DIR)
    .map(parsePost)
    .filter((p) => !p.draft)
    .sort((a, b) => (a.lastmod < b.lastmod ? 1 : -1));

  const today = new Date().toISOString().slice(0, 10);
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const r of STATIC_ROUTES) {
    lines.push('  <url>');
    lines.push(`    <loc>${SITE}${r.loc}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push(`    <changefreq>${r.changefreq}</changefreq>`);
    lines.push(`    <priority>${r.priority}</priority>`);
    lines.push('  </url>');
  }

  for (const p of posts) {
    const lastmod = fmtDate(p.lastmod) || today;
    lines.push('  <url>');
    lines.push(`    <loc>${SITE}/blog/${p.slug}</loc>`);
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    lines.push('    <changefreq>monthly</changefreq>');
    lines.push('    <priority>0.7</priority>');
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  writeFileSync(OUT, lines.join('\n') + '\n', 'utf8');
  console.log(
    `[sitemap] wrote ${relative(ROOT, OUT)} with ${
      STATIC_ROUTES.length + posts.length
    } URLs (${posts.length} posts)`
  );
}

build();
