#!/usr/bin/env node
// RSS 2.0 feed from content/blog/**/*.md. Runs in prebuild.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'content/blog');
const OUT = join(ROOT, 'public/feed.xml');
const SITE = 'https://williamspurlock.com';

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

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parsePost(file) {
  const raw = readFileSync(file, 'utf8');
  const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  const fm = fmMatch ? fmMatch[1] : raw.slice(0, 4000);
  const slug =
    pickLine(fm, 'slug') ||
    file.split('/').pop().replace(/\.md$/, '');
  const title = pickLine(fm, 'title') || slug;
  const date = pickLine(fm, 'date');
  const lastModified = pickLine(fm, 'lastModified', 'last_updated') || date;
  const excerpt = pickLine(fm, 'excerpt', 'seoDescription') || '';
  const draft = /^draft:\s*true\s*$/m.test(fm);
  const published = /^published:\s*false\s*$/m.test(fm);
  return { slug, title, date, lastModified, excerpt, draft: draft || published };
}

function rfc822(d) {
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return null;
  return dt.toUTCString();
}

function build() {
  const posts = walk(BLOG_DIR)
    .map(parsePost)
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const items = posts.map((p) => {
    const loc = `${SITE}/blog/${p.slug}/`;
    const pub = rfc822(p.date) || rfc822(p.lastModified) || new Date().toUTCString();
    return [
      '    <item>',
      `      <title>${xmlEscape(p.title)}</title>`,
      `      <link>${loc}</link>`,
      `      <guid isPermaLink="true">${loc}</guid>`,
      `      <pubDate>${pub}</pubDate>`,
      p.excerpt ? `      <description>${xmlEscape(p.excerpt)}</description>` : '',
      '    </item>',
    ]
      .filter(Boolean)
      .join('\n');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    '    <title>Will Spurlock</title>',
    `    <link>${SITE}/</link>`,
    '    <description>AI visibility, automation, and brand design writing from Will Spurlock.</description>',
    '    <language>en-us</language>',
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  writeFileSync(OUT, xml, 'utf8');
  console.log(`[feed] wrote ${relative(ROOT, OUT)} with ${posts.length} items`);
}

build();
