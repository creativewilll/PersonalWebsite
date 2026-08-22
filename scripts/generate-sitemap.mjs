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
const PROJECTS_DIR = join(ROOT, 'content/projects');
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

const SHOWCASE_SITES = join(ROOT, 'src/data/showcaseData/showcase-sites.ts');
const CATEGORIES_FILE = join(ROOT, 'src/data/blogData/categories.ts');

// Must match src/pages/BlogPage.tsx categoryToSlug
function categoryToSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
}

function tagToSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
}

function parseShowcaseSlugs() {
  const raw = readFileSync(SHOWCASE_SITES, 'utf8');
  const slugs = [];
  const re = /^\s+slug:\s*'([^']+)'/gm;
  let m;
  while ((m = re.exec(raw)) !== null) slugs.push(m[1]);
  return [...new Set(slugs)];
}

function parseInitialCategories() {
  const raw = readFileSync(CATEGORIES_FILE, 'utf8');
  const block = raw.match(/export const INITIAL_CATEGORIES = \[([\s\S]*?)\];/);
  if (!block) return [];
  return [...block[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

function parseTagList(fm) {
  const tags = [];
  const block = fm.match(/^tags:\s*\n((?:[ \t]+-[ \t]+.+\n?)*)/m);
  if (block) {
    for (const line of block[1].split('\n')) {
      const item = line.match(/^[ \t]+-[ \t]+"?(.+?)"?\s*$/);
      if (item) tags.push(item[1].replace(/^["']|["']$/g, '').trim());
    }
    return tags.filter(Boolean);
  }
  const inline = fm.match(/^tags:\s*\[(.*)\]\s*$/m);
  if (inline) {
    return inline[1]
      .split(',')
      .map((item) => item.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  }
  return tags;
}

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

function walkProjects(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.md')) continue;
    if (name === 'template.md' || name.startsWith('_')) continue;
    out.push(join(dir, name));
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
  const tags = parseTagList(fm);
  return { slug, lastmod: lastModified, draft: draft || published, tags };
}

function parseProject(file) {
  const raw = readFileSync(file, 'utf8');
  const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  const fm = fmMatch ? fmMatch[1] : raw.slice(0, 4000);
  const slug =
    pickLine(fm, 'slug') ||
    file
      .split('/')
      .pop()
      .replace(/\.md$/, '');
  const mtime = statSync(file).mtime.toISOString().slice(0, 10);
  return { slug, lastmod: mtime };
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

  const projects = walkProjects(PROJECTS_DIR)
    .map(parseProject)
    .sort((a, b) => (a.slug < b.slug ? -1 : 1));

  const today = new Date().toISOString().slice(0, 10);
  const showcaseSlugs = parseShowcaseSlugs();
  const categories = parseInitialCategories();
  const tagMap = new Map();
  for (const p of posts) {
    for (const tag of p.tags) {
      const slug = tagToSlug(tag);
      if (!slug) continue;
      const prev = tagMap.get(slug);
      const lastmod = fmtDate(p.lastmod) || today;
      if (!prev || lastmod > prev.lastmod) {
        tagMap.set(slug, { slug, lastmod });
      }
    }
  }
  const tags = [...tagMap.values()].sort((a, b) => a.slug.localeCompare(b.slug));

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  function withSlash(loc) {
    if (!loc || loc === '/') return '/';
    return loc.endsWith('/') ? loc : `${loc}/`;
  }

  function pushUrl(loc, lastmod, changefreq, priority) {
    lines.push('  <url>');
    lines.push(`    <loc>${SITE}${withSlash(loc)}</loc>`);
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    lines.push(`    <changefreq>${changefreq}</changefreq>`);
    lines.push(`    <priority>${priority}</priority>`);
    lines.push('  </url>');
  }

  for (const r of STATIC_ROUTES) {
    pushUrl(r.loc, today, r.changefreq, r.priority);
  }

  for (const slug of showcaseSlugs) {
    pushUrl(`/websites/${slug}`, today, 'monthly', '0.7');
  }

  for (const name of categories) {
    pushUrl(`/blog/category/${categoryToSlug(name)}`, today, 'weekly', '0.6');
  }

  for (const t of tags) {
    pushUrl(`/blog/tag/${t.slug}`, t.lastmod, 'weekly', '0.5');
  }

  for (const p of posts) {
    const lastmod = fmtDate(p.lastmod) || today;
    pushUrl(`/blog/${p.slug}`, lastmod, 'monthly', '0.7');
  }

  for (const p of projects) {
    pushUrl(`/projects/${p.slug}`, p.lastmod, 'monthly', '0.7');
  }

  lines.push('</urlset>');
  writeFileSync(OUT, lines.join('\n') + '\n', 'utf8');
  const total =
    STATIC_ROUTES.length +
    showcaseSlugs.length +
    categories.length +
    tags.length +
    posts.length +
    projects.length;
  console.log(
    `[sitemap] wrote ${relative(ROOT, OUT)} with ${total} URLs ` +
      `(${posts.length} posts, ${projects.length} projects, ` +
      `${showcaseSlugs.length} websites, ${categories.length} categories, ${tags.length} tags)`
  );
}

build();
