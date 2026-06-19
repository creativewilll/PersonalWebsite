#!/usr/bin/env node
// Scheduled blog post publication workflow (cloud-native).
//
// Runs in a fresh Cloud Agent VM with NO local cache — it talks to the live
// Airtable API directly. Requires AIRTABLE_PAT and AIRTABLE_BASE_ID, supplied
// either via repo-root .env (local runs) or Cloud Agent secrets (cloud runs).
//
// Commands:
//   find-due                     Refresh the local Airtable cache and list posts
//                                scheduled for today (America/New_York). Prints
//                                "Found N due scheduled post(s)".
//   schedule --spec=<file.json>  Create the Posts + Questions + Schedule rows for
//                                a planned post so a later run picks it up.
//                                Use --date=YYYY-MM-DD to override (default: today ET).
//   gate --slug=<slug>           Lint a post's frontmatter + prose before publish.
//   publish --slug=<slug>        Sync Airtable, flip questions, mark schedule,
//                                stage the .md + .png, commit, and push to main.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CACHE_DIR = path.join(__dirname, 'airtable-cache');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const PUBLIC_DIR = path.join(ROOT, 'public');

const TABLES = ['Posts', 'Questions', 'Categories', 'Clusters', 'Claims', 'Schedule', 'Ideas', 'Authors'];

// ---------------------------------------------------------------------------
// Credentials + Airtable client (lazy: only commands that need it pay the cost)
// ---------------------------------------------------------------------------
let _client = null;
function airtable() {
  if (_client) return _client;
  const envPath = path.join(ROOT, '.env');
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!pat || !baseId) {
    console.error('Missing AIRTABLE_PAT / AIRTABLE_BASE_ID.');
    console.error('  - Local run: add them to .env at the repo root.');
    console.error('  - Cloud run: add them in Cursor Dashboard > Cloud Agents > Secrets.');
    process.exit(1);
  }
  const API = `https://api.airtable.com/v0/${baseId}`;
  const headers = { Authorization: `Bearer ${pat}`, 'Content-Type': 'application/json' };

  async function api(p, opts = {}) {
    const res = await fetch(`${API}/${p}`, { ...opts, headers });
    if (!res.ok) throw new Error(`Airtable ${opts.method || 'GET'} ${p} -> ${res.status}: ${await res.text()}`);
    return res.json();
  }
  async function listAll(table) {
    const out = [];
    let offset;
    do {
      const qs = new URLSearchParams({ pageSize: '100' });
      if (offset) qs.set('offset', offset);
      const d = await api(`${encodeURIComponent(table)}?${qs}`);
      out.push(...d.records);
      offset = d.offset;
    } while (offset);
    return out;
  }
  async function createBatch(table, records) {
    const created = [];
    for (let i = 0; i < records.length; i += 10) {
      const chunk = records.slice(i, i + 10).map((fields) => ({ fields }));
      const d = await api(encodeURIComponent(table), {
        method: 'POST',
        body: JSON.stringify({ records: chunk, typecast: true }),
      });
      created.push(...d.records);
      await new Promise((r) => setTimeout(r, 220));
    }
    return created;
  }
  async function patchBatch(table, updates) {
    for (let i = 0; i < updates.length; i += 10) {
      const chunk = updates.slice(i, i + 10);
      await api(encodeURIComponent(table), {
        method: 'PATCH',
        body: JSON.stringify({ records: chunk, typecast: true }),
      });
      await new Promise((r) => setTimeout(r, 220));
    }
  }
  _client = { api, listAll, createBatch, patchBatch };
  return _client;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getArg(name) {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.split('=').slice(1).join('=') : undefined;
}

function todayInEastern() {
  const parts = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'America/New_York',
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

function walkMd(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkMd(full));
    else if (entry.name.endsWith('.md') && entry.name !== 'template.md') files.push(full);
  }
  return files;
}

function findMdBySlug(slug) {
  for (const file of walkMd(BLOG_DIR)) {
    if (path.basename(file, '.md') === slug) return file;
    try {
      if (matter(fs.readFileSync(file, 'utf8')).data.slug === slug) return file;
    } catch { /* ignore */ }
  }
  return null;
}

function wordCount(body) {
  return body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
}

// ---------------------------------------------------------------------------
// find-due
// ---------------------------------------------------------------------------
async function cmdFindDue() {
  const { listAll } = airtable();
  fs.mkdirSync(CACHE_DIR, { recursive: true });

  console.log('Refreshing Airtable cache...');
  const cache = {};
  for (const table of TABLES) {
    try {
      const records = await listAll(table);
      cache[table] = records;
      fs.writeFileSync(path.join(CACHE_DIR, `${table}.json`), JSON.stringify(records, null, 2));
      console.log(`  ${records.length.toString().padStart(4)}  ${table}`);
    } catch (e) {
      console.warn(`  skip ${table}: ${e.message.split('\n')[0]}`);
    }
  }

  const today = todayInEastern();
  console.log(`\nSearching for scheduled posts due on ${today} (America/New_York)...`);

  const schedule = cache.Schedule || [];
  const postById = new Map((cache.Posts || []).map((r) => [r.id, r.fields]));

  const due = [];
  for (const row of schedule) {
    if (row.fields.Date !== today) continue;
    for (const pid of row.fields.Post || []) {
      const p = postById.get(pid);
      if (!p || !p.Slug) continue;
      if (p.Status === 'Published') continue; // already done
      due.push({ slug: p.Slug, title: p.Title || p.Slug, status: p.Status || '(none)' });
    }
  }

  if (due.length === 0) {
    console.log('Found 0 due scheduled post(s)');
    return;
  }
  console.log(`Found ${due.length} due scheduled post(s):`);
  for (const d of due) console.log(`  - ${d.title}  [${d.status}]  (${d.slug})`);
}

// ---------------------------------------------------------------------------
// schedule  — create Posts + Questions + Schedule rows from a spec file
// ---------------------------------------------------------------------------
async function cmdSchedule() {
  const specPath = getArg('spec');
  if (!specPath) {
    console.error('schedule requires --spec=<path-to-spec.json>');
    process.exit(1);
  }
  const spec = JSON.parse(fs.readFileSync(path.resolve(ROOT, specPath), 'utf8'));
  const date = getArg('date') || spec.date || todayInEastern();
  const title = spec.title;
  const slug = spec.slug || slugify(title);
  if (!title) { console.error('spec.title is required'); process.exit(1); }

  const { api, listAll, createBatch, patchBatch } = airtable();

  // Idempotency: don't double-create a Post with this slug.
  const posts = await listAll('Posts');
  if (posts.some((r) => r.fields.Slug === slug)) {
    console.log(`Post with slug "${slug}" already exists in Airtable — nothing to do.`);
    return;
  }

  // Resolve / create the Category.
  let categoryId;
  if (spec.category) {
    const cats = await listAll('Categories');
    const cat = cats.find((c) => (c.fields.Name || '') === spec.category)
      || cats.find((c) => (c.fields.Name || '').toLowerCase().includes(spec.category.toLowerCase()));
    if (cat) categoryId = cat.id;
    else {
      const created = await api(encodeURIComponent('Categories'), {
        method: 'POST',
        body: JSON.stringify({ fields: { Name: spec.category, Part: spec.part || 'AI Automation', Priority: 'Secondary' }, typecast: true }),
      });
      categoryId = created.id;
      console.log(`Created Category "${spec.category}" (${categoryId})`);
    }
  }

  // Resolve / create the Cluster.
  let clusterId;
  if (spec.cluster) {
    const clusters = await listAll('Clusters');
    const cl = clusters.find((c) => (c.fields.Cluster || '') === spec.cluster);
    if (cl) clusterId = cl.id;
    else {
      const fields = {
        Cluster: spec.cluster,
        Label: spec.clusterLabel || spec.cluster,
        Part: spec.part || 'AI Automation',
        Priority: 'Secondary',
      };
      if (categoryId) fields.Categories = [categoryId];
      const created = await api(encodeURIComponent('Clusters'), { method: 'POST', body: JSON.stringify({ fields, typecast: true }) });
      clusterId = created.id;
      console.log(`Created Cluster "${spec.cluster}" (${clusterId})`);
    }
  }

  // Create the target + FAQ Questions for this post.
  const targetQ = (spec.targetQuestions || []).map((q) => {
    const f = { Question: q, Status: 'Assigned' };
    if (categoryId) f.Category = [categoryId];
    return f;
  });
  const faqQ = (spec.faqQuestions || []).map((q) => {
    const f = { Question: q, Status: 'FAQ' };
    if (categoryId) f.Category = [categoryId];
    return f;
  });
  const createdTargets = targetQ.length ? await createBatch('Questions', targetQ) : [];
  const createdFaqs = faqQ.length ? await createBatch('Questions', faqQ) : [];
  console.log(`Created ${createdTargets.length} target + ${createdFaqs.length} FAQ Questions`);

  // Create the Post (Queued = scheduled but unwritten).
  const postFields = {
    Title: title,
    Slug: slug,
    Status: 'Queued',
    Date: date,
    Part: spec.part || 'AI Automation',
    ServiceTrack: spec.serviceTrack || 'ai-automation',
    PillarPost: !!spec.pillar,
    Notes: spec.notes || 'Scheduled via publish-scheduled-posts.mjs',
  };
  if (spec.excerpt) postFields.Excerpt = spec.excerpt;
  if (categoryId) postFields.Category = [categoryId];
  if (clusterId) postFields.Cluster = [clusterId];
  if (createdTargets.length) {
    postFields.TargetQuestions = createdTargets.map((r) => r.id);
    postFields.PrimaryQuery = spec.primaryQuery || createdTargets[0].fields.Question;
  } else if (spec.primaryQuery) {
    postFields.PrimaryQuery = spec.primaryQuery;
  }
  if (createdFaqs.length) postFields.FAQQuestions = createdFaqs.map((r) => r.id);

  const post = await api(encodeURIComponent('Posts'), { method: 'POST', body: JSON.stringify({ fields: postFields, typecast: true }) });
  console.log(`Created Post "${title}" (${post.id}) -> Queued for ${date}`);

  // Create the Schedule row.
  await createBatch('Schedule', [{ Date: date, Post: [post.id], Notes: spec.notes || 'Scheduled via publish-scheduled-posts.mjs' }]);
  console.log(`Created Schedule row for ${date} -> ${post.id}`);

  // Optional Ideas trail (best-effort).
  try {
    await createBatch('Ideas', [{ RawIdea: `[SCHEDULED] ${title}`, Status: 'Approved', Tags: `${spec.serviceTrack || 'ai-automation'}, scheduled` }]);
  } catch { /* Ideas table optional */ }

  console.log(`\nScheduled "${title}" for ${date}. Re-run find-due on that day to pick it up.`);
}

// ---------------------------------------------------------------------------
// gate
// ---------------------------------------------------------------------------
async function cmdGate() {
  const slug = getArg('slug');
  if (!slug) { console.error('gate requires --slug=<slug>'); process.exit(1); }
  const file = findMdBySlug(slug);
  if (!file) { console.error(`No markdown found for slug "${slug}" under content/blog/`); process.exit(1); }

  const raw = fs.readFileSync(file, 'utf8');
  const { data: fm, content } = matter(raw);
  const errors = [];

  if (!raw.startsWith('---\n')) errors.push('frontmatter does not start with `---`');
  for (const req of ['title', 'slug', 'date', 'author']) {
    if (!fm[req]) errors.push(`required field \`${req}\` missing`);
  }
  if (fm.draft !== false) errors.push('`draft` must be false to publish');
  if (!fm.coverImage) errors.push('missing `coverImage`');
  if (!fm.seoTitle) errors.push('missing `seoTitle`');
  if (!fm.seoDescription) errors.push('missing `seoDescription`');
  if (!Array.isArray(fm.aioTargetQueries) || fm.aioTargetQueries.length === 0) errors.push('`aioTargetQueries` is empty');
  if (!Array.isArray(fm.seoKeywords) || fm.seoKeywords.length < 5) errors.push('`seoKeywords` needs >= 5 entries');

  if (fm.coverImage && fm.coverImage.startsWith('/') && !fs.existsSync(path.join(PUBLIC_DIR, fm.coverImage))) {
    errors.push(`coverImage \`${fm.coverImage}\` does not exist on disk`);
  }

  const wc = wordCount(content);
  if (wc < 1500) errors.push(`body too short: ${wc} words (need >= 1500)`);
  const h2 = (content.match(/^##\s+/gm) || []).length;
  if (h2 < 5) errors.push(`too few H2 sections: ${h2} (need >= 5)`);

  if (errors.length) {
    console.log(`[gate] FAILED — ${slug}`);
    for (const e of errors) console.log(`  - ${e}`);
    process.exit(1);
  }
  console.log(`[gate] OK — ${slug} (${wc} words, ${h2} H2 sections)`);
}

// ---------------------------------------------------------------------------
// publish
// ---------------------------------------------------------------------------
async function cmdPublish() {
  const slug = getArg('slug');
  if (!slug) { console.error('publish requires --slug=<slug>'); process.exit(1); }
  const file = findMdBySlug(slug);
  if (!file) { console.error(`No markdown found for slug "${slug}" under content/blog/`); process.exit(1); }

  const { api, listAll, patchBatch } = airtable();
  const raw = fs.readFileSync(file, 'utf8');
  const { data: fm, content } = matter(raw);
  const wc = wordCount(content);
  const rt = fm.readingTime || Math.max(1, Math.round(wc / 200));

  const posts = await listAll('Posts');
  const post = posts.find((r) => r.fields.Slug === slug);
  if (!post) { console.error(`Post not found in Airtable: ${slug}`); process.exit(1); }

  const fields = {
    Status: 'Published',
    FilePath: path.relative(ROOT, file),
    CoverImage: fm.coverImage || undefined,
    ReadingTime: rt,
    WordCount: wc,
    Excerpt: fm.excerpt || undefined,
  };
  Object.keys(fields).forEach((k) => fields[k] === undefined && delete fields[k]);
  await api(`${encodeURIComponent('Posts')}/${post.id}`, { method: 'PATCH', body: JSON.stringify({ fields, typecast: true }) });
  console.log(`Synced Post ${post.id} -> Published`);

  const linkedQ = [...(post.fields.TargetQuestions || []), ...(post.fields.FAQQuestions || []), ...(post.fields.Questions || [])];
  if (linkedQ.length) {
    await patchBatch('Questions', [...new Set(linkedQ)].map((id) => ({ id, fields: { Status: 'Published' } })));
    console.log(`Flipped ${linkedQ.length} linked Questions -> Published`);
  }

  const schedule = await listAll('Schedule');
  const sched = schedule.find((s) => (s.fields.Post || []).includes(post.id));
  if (sched) {
    const note = `${sched.fields.Notes ? sched.fields.Notes + ' | ' : ''}Published ${new Date().toISOString()}`;
    await api(`${encodeURIComponent('Schedule')}/${sched.id}`, { method: 'PATCH', body: JSON.stringify({ fields: { Notes: note }, typecast: true }) });
    console.log(`Marked Schedule row ${sched.id} as published`);
  }

  const cover = fm.coverImage && fm.coverImage.startsWith('/') ? path.join(PUBLIC_DIR, fm.coverImage) : null;
  const toStage = [path.relative(ROOT, file)];
  if (cover && fs.existsSync(cover)) toStage.push(path.relative(ROOT, cover));

  const dateStr = fm.date || todayInEastern();
  const msg = `publish scheduled post: ${fm.title || slug} (${dateStr})`;
  execSync(`git add ${toStage.map((f) => `"${f}"`).join(' ')}`, { cwd: ROOT });
  execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd: ROOT });
  execSync('git push -u origin main', { cwd: ROOT, stdio: 'inherit' });
  console.log(`\nPublished "${fm.title || slug}" — committed and pushed (${toStage.join(', ')}).`);
}

// ---------------------------------------------------------------------------
const cmd = process.argv[2];
const map = { 'find-due': cmdFindDue, schedule: cmdSchedule, gate: cmdGate, publish: cmdPublish };
if (!cmd || !map[cmd]) {
  console.error('Scheduled Post Publication Automation\n');
  console.error('Usage:');
  console.error('  node scripts/publish-scheduled-posts.mjs find-due');
  console.error('  node scripts/publish-scheduled-posts.mjs schedule --spec=<file.json> [--date=YYYY-MM-DD]');
  console.error('  node scripts/publish-scheduled-posts.mjs gate --slug=<slug>');
  console.error('  node scripts/publish-scheduled-posts.mjs publish --slug=<slug>');
  process.exit(1);
}
map[cmd]().catch((e) => { console.error(e.message); process.exit(1); });
