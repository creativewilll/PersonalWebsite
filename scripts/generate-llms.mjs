#!/usr/bin/env node
// Rebuild public/llms.txt and public/llms-full.txt from blog frontmatter.
// Per-post index: slug, title, date, one-line excerpt, absolute URL.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'content/blog');
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

function oneLine(s) {
  return String(s || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parsePost(file) {
  const raw = readFileSync(file, 'utf8');
  const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  const fm = fmMatch ? fmMatch[1] : raw.slice(0, 4000);
  const body = fmMatch ? raw.slice(fmMatch[0].length) : '';
  const slug =
    pickLine(fm, 'slug') ||
    file.split('/').pop().replace(/\.md$/, '');
  const title = pickLine(fm, 'title') || slug;
  const date = pickLine(fm, 'date') || '';
  const excerpt =
    pickLine(fm, 'excerpt', 'seoDescription') ||
    oneLine(body).slice(0, 180);
  const draft = /^draft:\s*true\s*$/m.test(fm);
  const published = /^published:\s*false\s*$/m.test(fm);
  return { slug, title, date, excerpt: oneLine(excerpt), draft: draft || published };
}

function formatEntry(p) {
  const url = `${SITE}/blog/${p.slug}/`;
  return `- ${p.date} | ${p.slug} | ${p.title}\n  ${p.excerpt}\n  ${url}`;
}

function build() {
  const posts = walk(BLOG_DIR)
    .map(parsePost)
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const header = [
    '# Will Spurlock',
    '',
    '> Will Spurlock builds premium, custom-coded websites engineered for AI Visibility, plus custom AI agents and automations. Legal entity: Spurlock Studios LLC. Based in Oakland County, MI.',
    '',
    '## Contact',
    '- Site: https://williamspurlock.com/',
    '- Studio: https://spurlockstudios.com/',
    '- Email: william@spurlockstudios.com',
    '- Phone: +1-248-824-3309',
    '- X: https://x.com/creativewill02',
    '- LinkedIn: https://www.linkedin.com/in/william-spurlock/',
    '',
    '## Pages',
    '- Home: https://williamspurlock.com/',
    '- About: https://williamspurlock.com/about/',
    '- Blog: https://williamspurlock.com/blog/',
    '- Projects: https://williamspurlock.com/projects/',
    '- Websites: https://williamspurlock.com/websites/',
    '- Music: https://williamspurlock.com/music/',
    '- Feed: https://williamspurlock.com/feed.xml',
    '',
  ];

  const indexHeader = [
    `## Blog index (${posts.length} posts)`,
    '',
  ];

  const shortIndex = posts.slice(0, 40).map(formatEntry);
  const fullIndex = posts.map(formatEntry);

  const llms = [
    ...header,
    ...indexHeader,
    ...shortIndex,
    '',
    `Full post index: ${SITE}/llms-full.txt`,
    '',
  ].join('\n');

  const llmsFull = [
    ...header,
    ...indexHeader,
    ...fullIndex,
    '',
  ].join('\n');

  writeFileSync(join(ROOT, 'public/llms.txt'), llms, 'utf8');
  writeFileSync(join(ROOT, 'public/llms-full.txt'), llmsFull, 'utf8');
  console.log(
    `[llms] wrote public/llms.txt (${shortIndex.length} recent) and public/llms-full.txt (${posts.length} posts)`
  );
}

build();
