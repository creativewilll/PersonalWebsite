#!/usr/bin/env node
// Seeds the no-code pillar wave into Airtable:
//  - reads scripts/new-pillars-data.json (19 new Categories 28–46 + 3 posts for existing Category 26)
//  - creates Categories (Name / Part / Priority) where existingCategory is false
//  - creates Clusters (Cluster / Label / Part / Priority / Categories link) where clusterSlug is set
//  - creates Idea-stage Posts (no Date) with Category / Cluster / PillarPost / ParentPillar links
//  - for each new pillar: creates the pillarPost first, then spokes with ParentPillar → that record
// Idempotent by Category Name, Cluster slug, and Post Slug.
// Usage: node scripts/seed-nocode-pillars.mjs [--dry]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(__dirname, 'new-pillars-data.json');
const DRY = process.argv.includes('--dry');

function loadEnv() {
  for (const line of fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return { pat: process.env.AIRTABLE_PAT, base: process.env.AIRTABLE_BASE_ID };
}
const { pat, base } = loadEnv();
const API = `https://api.airtable.com/v0/${base}`;
const headers = { Authorization: `Bearer ${pat}`, 'Content-Type': 'application/json' };
async function api(p, opts = {}) {
  const res = await fetch(`${API}/${p}`, { ...opts, headers });
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${p} -> ${res.status}: ${await res.text()}`);
  return res.json();
}
async function listAll(table) {
  const out = []; let offset;
  do { const qs = new URLSearchParams({ pageSize: '100' }); if (offset) qs.set('offset', offset);
    const d = await api(`${encodeURIComponent(table)}?${qs}`); out.push(...d.records); offset = d.offset; } while (offset);
  return out;
}
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

(async () => {
  const data = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  const pillars = data.pillars || [];
  const totalPosts = pillars.reduce((n, p) => n + (p.posts?.length || 0), 0);
  console.log(`No-code pillar wave: ${pillars.length} pillars / ${totalPosts} posts.${DRY ? ' (--dry)' : ''}`);
  console.log(`Meta: ${data.meta?.wave || ''} (${data.meta?.created || ''})`);

  console.log('Loading Categories, Clusters, Posts…');
  const categories = await listAll('Categories');
  const clusters = await listAll('Clusters');
  const posts = await listAll('Posts');

  const catByName = new Map(categories.map((r) => [r.fields.Name, r]));
  const clusterBySlug = new Map(clusters.map((r) => [r.fields.Cluster, r]));
  const haveSlug = new Set(posts.map((r) => r.fields.Slug).filter(Boolean));

  let catsCreated = 0, catsReused = 0;
  let clustersCreated = 0, clustersReused = 0;
  let postsCreated = 0, postsSkipped = 0;
  let hadError = false;

  for (const pillar of pillars) {
    console.log(`\n── Pillar ${pillar.number}: ${pillar.categoryName}`);

    // ── Category ──────────────────────────────────────────────────────────
    let cat = catByName.get(pillar.categoryName);
    if (pillar.existingCategory) {
      if (!cat) {
        console.error(`ERROR: existingCategory=true but Category not found: "${pillar.categoryName}". Skipping this pillar's posts.`);
        hadError = true;
        continue;
      }
      catsReused++;
      console.log(`  Category reused (existing): ${cat.id}`);
    } else if (cat) {
      catsReused++;
      console.log(`  Category reused: ${cat.id}`);
    } else if (DRY) {
      catsCreated++;
      console.log(`  [dry] would create Category: Name="${pillar.categoryName}" Part="${pillar.part}" Priority="${pillar.priority}"`);
      cat = { id: `dry-cat-${pillar.number}`, fields: { Name: pillar.categoryName } };
      catByName.set(pillar.categoryName, cat);
    } else {
      const created = await api(encodeURIComponent('Categories'), {
        method: 'POST',
        body: JSON.stringify({
          fields: { Name: pillar.categoryName, Part: pillar.part, Priority: pillar.priority },
          typecast: true,
        }),
      });
      await sleep(220);
      cat = created;
      catByName.set(pillar.categoryName, cat);
      catsCreated++;
      console.log(`  Category created: ${cat.id}`);
    }

    // ── Cluster ───────────────────────────────────────────────────────────
    let cluster = null;
    if (pillar.clusterSlug != null) {
      cluster = clusterBySlug.get(pillar.clusterSlug);
      if (cluster) {
        clustersReused++;
        console.log(`  Cluster reused: ${cluster.id} (${pillar.clusterSlug})`);
      } else if (DRY) {
        clustersCreated++;
        console.log(`  [dry] would create Cluster: Cluster="${pillar.clusterSlug}" Label="${pillar.clusterLabel}" Part="${pillar.part}" Priority="${pillar.priority}" Categories=[${cat.id}]`);
        cluster = { id: `dry-cluster-${pillar.number}`, fields: { Cluster: pillar.clusterSlug } };
        clusterBySlug.set(pillar.clusterSlug, cluster);
      } else {
        const created = await api(encodeURIComponent('Clusters'), {
          method: 'POST',
          body: JSON.stringify({
            fields: {
              Cluster: pillar.clusterSlug,
              Label: pillar.clusterLabel,
              Part: pillar.part,
              Priority: pillar.priority,
              Categories: [cat.id],
            },
            typecast: true,
          }),
        });
        await sleep(220);
        cluster = created;
        clusterBySlug.set(pillar.clusterSlug, cluster);
        clustersCreated++;
        console.log(`  Cluster created: ${cluster.id}`);
      }
    } else {
      console.log('  Cluster: none (clusterSlug is null)');
    }

    // ── Posts: pillar first, then spokes ──────────────────────────────────
    const ordered = [
      ...pillar.posts.filter((p) => p.pillarPost),
      ...pillar.posts.filter((p) => !p.pillarPost),
    ];
    let pillarRecordId = null;

    for (const post of ordered) {
      const slug = slugify(post.title);
      const role = post.pillarPost ? 'pillar' : 'spoke';

      if (haveSlug.has(slug)) {
        postsSkipped++;
        console.log(`  skip post (${role}): already exists slug=${slug}`);
        // If the pillar already exists, resolve its id for ParentPillar on spokes
        if (post.pillarPost && !pillarRecordId) {
          const existing = posts.find((r) => r.fields.Slug === slug);
          if (existing) pillarRecordId = existing.id;
        }
        continue;
      }

      if (DRY) {
        postsCreated++;
        haveSlug.add(slug);
        if (post.pillarPost) pillarRecordId = `dry-post-${slug}`;
        const parentNote = !post.pillarPost && pillarRecordId
          ? ` ParentPillar=${pillarRecordId}`
          : (!post.pillarPost ? ' ParentPillar=(none)' : '');
        const clusterNote = cluster ? ` Cluster=${cluster.id}` : ' Cluster=(omit)';
        console.log(`  [dry] would create Post (${role}): "${post.title}" → slug=${slug}${clusterNote}${parentNote}`);
        continue;
      }

      const fields = {
        Title: post.title,
        Slug: slug,
        Status: 'Idea',
        Part: pillar.part,
        ServiceTrack: pillar.serviceTrack,
        Category: [cat.id],
        PillarPost: !!post.pillarPost,
        PrimaryQuery: post.primaryQuery,
        Notes: post.notes,
      };
      if (cluster) fields.Cluster = [cluster.id];
      if (!post.pillarPost && pillarRecordId) fields.ParentPillar = [pillarRecordId];

      const created = await api(encodeURIComponent('Posts'), {
        method: 'POST',
        body: JSON.stringify({ fields, typecast: true }),
      });
      await sleep(220);
      haveSlug.add(slug);
      posts.push(created);
      postsCreated++;
      if (post.pillarPost) pillarRecordId = created.id;
      console.log(`  Post created (${role}): ${created.id} slug=${slug}`);
    }
  }

  console.log('\n══ Summary ══');
  console.log(`Categories: ${catsCreated} created, ${catsReused} reused`);
  console.log(`Clusters:   ${clustersCreated} created, ${clustersReused} reused`);
  console.log(`Posts:      ${postsCreated} created, ${postsSkipped} skipped`);
  console.log(`Total ops:  ${catsCreated + clustersCreated + postsCreated} created / ${catsReused + clustersReused + postsSkipped} reused-or-skipped`);
  if (DRY) console.log('--dry: no writes.');
  else console.log('No-code pillar seed complete.');

  if (hadError) process.exit(1);
})().catch((e) => { console.error(e.message); process.exit(1); });
