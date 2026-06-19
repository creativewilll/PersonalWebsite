#!/usr/bin/env node
// Enriches the WS Blog base from existing blog content:
//  - creates missing builder Clusters (from frontmatter contentCluster) + content Categories (from frontmatter categories)
//  - links every migrated published Post to its Cluster + Category (only if currently empty)
//  - backfills Questions.FunnelStage where empty (derived from wording)
//  - adds a few example Claims linked to real posts
// Idempotent. Usage: node scripts/enrich-from-content.mjs [--dry]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
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
async function createBatch(table, records) {
  const created = [];
  for (let i = 0; i < records.length; i += 10) {
    const chunk = records.slice(i, i + 10).map((fields) => ({ fields }));
    const d = await api(encodeURIComponent(table), { method: 'POST', body: JSON.stringify({ records: chunk, typecast: true }) });
    created.push(...d.records); await new Promise((r) => setTimeout(r, 220));
  }
  return created;
}
async function patchBatch(table, updates) {
  for (let i = 0; i < updates.length; i += 10) {
    await api(encodeURIComponent(table), { method: 'PATCH', body: JSON.stringify({ records: updates.slice(i, i + 10), typecast: true }) });
    await new Promise((r) => setTimeout(r, 220));
  }
}
function walk(d) { let o = []; if (!fs.existsSync(d)) return o; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) o = o.concat(walk(f)); else if (e.name.endsWith('.md')) o.push(f); } return o; }

const CLUSTER_ALIAS = { 'immersive-web-design': 'immersive-web', 'ai-agents': 'ai-agents-mcp', 'AI in Apps': 'foundation-models', 'Conferences & Industry': 'foundation-models', 'AI Models & Benchmarks': 'foundation-models', 'Open Source & Weights': 'foundation-models' };
const CLUSTER_META = {
  'foundation-models': ['AI Automation', 'Secondary', 'Foundation Models & Industry'],
  'prompt-engineering': ['AI Automation', 'Secondary', 'Prompt Engineering'],
  'ai-coding-assistants': ['AI Automation', 'Secondary', 'AI Coding Assistants & Dev Tools'],
  'ai-agents-mcp': ['AI Agents', 'Tertiary', 'AI Agents & MCP'],
  'workflow-automation': ['AI Automation', 'Secondary', 'Workflow Automation'],
  'ai-automation': ['AI Automation', 'Secondary', 'AI Automation'],
  'growth-engineering': ['AI Automation', 'Secondary', 'Growth Engineering'],
  'ai-safety-policy': ['AI Automation', 'Secondary', 'AI Safety & Policy'],
  'studio-operations': ['Studio', 'Secondary', 'Studio Operations'],
  'immersive-web': ['Web Design', 'Secondary', 'Immersive Web Design'],
  'full-stack-architecture': ['Web Design', 'Secondary', 'Full-Stack Architecture'],
};
const CATEGORY_PART = {
  'AI Agents and Automations': 'AI Agents', 'AI Models and News': 'AI Automation', 'AI Prompting': 'AI Automation',
  'Development Tools': 'AI Automation', 'Web Design and Digital Experiences': 'Web Design', 'Growth and Operations': 'AI Automation',
  'Studio and Business': 'Studio', 'AI Safety and Policy': 'AI Automation', 'AI Industry News': 'AI Automation', 'Conferences & Industry': 'AI Automation',
};
function funnelStage(q) {
  const s = q.toLowerCase();
  if (/(measure|track|audit|check if|how do i know|roi|report|analytics|dashboard)/.test(s)) return 'Proof';
  if (/^what\b|^what's\b|difference between|^is \w|^are \w|^does \w|^can \w/.test(s)) return 'Definition';
  if (/^why\b/.test(s)) return 'Stakes';
  if (/^how\b/.test(s)) return 'Method';
  return 'Method';
}
const EXAMPLE_CLAIMS = [
  { slug: 'mcp-architecture-guide', claim: 'Anthropic introduced the Model Context Protocol (MCP) as an open standard in November 2024.', url: 'https://www.anthropic.com/news/model-context-protocol', date: '2024-11-25', confidence: 'High', category: 'Other' },
  { slug: 'n8n-production-playbook-self-hosting', claim: 'n8n is fair-code licensed and can be fully self-hosted, including on Docker.', url: 'https://docs.n8n.io/hosting/', date: '2026-05-19', confidence: 'High', category: 'Other' },
  { slug: 'deepseek-r1-nvidia-market-crash', claim: 'NVIDIA lost roughly $589 billion in market value on January 27, 2025 amid the DeepSeek R1 reaction, a record one-day U.S. market-cap loss.', url: 'https://www.reuters.com/', date: '2025-01-27', confidence: 'Medium', category: 'MarketShare' },
  { slug: 'google-ai-overviews-the-complete-playbook-for-getting-your-site-cited', claim: 'Google AI Overviews surface AI-generated answers above traditional results for a large and growing share of queries as of 2026.', url: 'https://blog.google/products/search/', date: '2026-06-01', confidence: 'Estimate', category: 'Stat' },
  { slug: 'how-to-measure-ai-visibility-the-metrics-that-actually-matter-in-2026', claim: 'Zero-click behavior means a meaningful share of AI-surfaced answers result in no website visit, shifting value toward citation and brand mention.', url: 'https://www.semrush.com/', date: '2026-01-01', confidence: 'Estimate', category: 'Stat' },
  { slug: 'complete-ai-coding-assistant-showdown', claim: 'Cursor is built by Anysphere and reached a multi-billion-dollar valuation across its 2025 funding rounds.', url: 'https://www.cursor.com/', date: '2025-11-13', confidence: 'Medium', category: 'Other' },
];

(async () => {
  // parse published frontmatter
  const files = [...walk(path.join(ROOT, 'content/blog/2025')), ...walk(path.join(ROOT, 'content/blog/2026'))];
  const fmBySlug = new Map();
  for (const f of files) {
    let data; try { ({ data } = matter(fs.readFileSync(f, 'utf8'))); } catch { continue; }
    if (data.draft === true) continue;
    const slug = data.slug || path.basename(f, '.md');
    const cc = data.contentCluster && CLUSTER_META[CLUSTER_ALIAS[data.contentCluster] || data.contentCluster] ? (CLUSTER_ALIAS[data.contentCluster] || data.contentCluster) : null;
    const cat = Array.isArray(data.categories) ? data.categories[0] : data.categories;
    fmBySlug.set(slug, { cluster: cc, category: CATEGORY_PART[cat] ? cat : null });
  }

  const [categories, clusters, posts, questions] = await Promise.all([listAll('Categories'), listAll('Clusters'), listAll('Posts'), listAll('Questions')]);
  const catIdByName = new Map(categories.map((r) => [r.fields.Name, r.id]));
  const clusterIdBySlug = new Map(clusters.map((r) => [r.fields.Cluster, r.id]));

  // create missing clusters
  const neededClusters = new Set([...fmBySlug.values()].map((v) => v.cluster).filter(Boolean));
  const newClusters = [...neededClusters].filter((c) => !clusterIdBySlug.has(c)).map((c) => ({ Cluster: c, Label: CLUSTER_META[c][2], Part: CLUSTER_META[c][0], Priority: CLUSTER_META[c][1] }));
  // create missing content categories
  const neededCats = new Set([...fmBySlug.values()].map((v) => v.category).filter(Boolean));
  const newCats = [...neededCats].filter((c) => !catIdByName.has(c)).map((c) => ({ Name: c, Part: CATEGORY_PART[c], Priority: 'Secondary' }));

  console.log(`Clusters to create: ${newClusters.length} -> ${newClusters.map((c) => c.Cluster).join(', ') || '(none)'}`);
  console.log(`Categories to create: ${newCats.length} -> ${newCats.map((c) => c.Name).join(', ') || '(none)'}`);

  // FunnelStage backfill plan
  const fsUpdates = questions.filter((q) => !q.fields.FunnelStage && q.fields.Question).map((q) => ({ id: q.id, fields: { FunnelStage: funnelStage(q.fields.Question) } }));
  console.log(`Questions needing FunnelStage: ${fsUpdates.length}`);

  // Post link plan
  const postBySlug = new Map(posts.map((p) => [p.fields.Slug, p]));
  let postLinkPlan = 0;
  for (const [slug, fm] of fmBySlug) { const p = postBySlug.get(slug); if (!p) continue; const need = (fm.cluster && !(p.fields.Cluster || []).length) || (fm.category && !(p.fields.Category || []).length); if (need) postLinkPlan++; }
  console.log(`Posts to link (cluster/category): ${postLinkPlan}`);
  console.log(`Example Claims to add: ${EXAMPLE_CLAIMS.length}`);

  if (DRY) { console.log('--dry: no writes.'); return; }

  if (newClusters.length) { const c = await createBatch('Clusters', newClusters); c.forEach((r) => clusterIdBySlug.set(r.fields.Cluster, r.id)); console.log(`Created ${c.length} clusters.`); }
  if (newCats.length) { const c = await createBatch('Categories', newCats); c.forEach((r) => catIdByName.set(r.fields.Name, r.id)); console.log(`Created ${c.length} categories.`); }

  if (fsUpdates.length) { await patchBatch('Questions', fsUpdates); console.log(`Set FunnelStage on ${fsUpdates.length} questions.`); }

  const postUpdates = [];
  for (const [slug, fm] of fmBySlug) {
    const p = postBySlug.get(slug); if (!p) continue;
    const fields = {};
    if (fm.cluster && !(p.fields.Cluster || []).length && clusterIdBySlug.get(fm.cluster)) fields.Cluster = [clusterIdBySlug.get(fm.cluster)];
    if (fm.category && !(p.fields.Category || []).length && catIdByName.get(fm.category)) fields.Category = [catIdByName.get(fm.category)];
    if (Object.keys(fields).length) postUpdates.push({ id: p.id, fields });
  }
  if (postUpdates.length) { await patchBatch('Posts', postUpdates); console.log(`Linked ${postUpdates.length} posts to cluster/category.`); }

  // Claims (idempotent-ish: skip if a claim with same text already exists)
  const existingClaims = new Set((await listAll('Claims')).map((c) => c.fields.Claim));
  const claimRows = [];
  for (const c of EXAMPLE_CLAIMS) {
    if (existingClaims.has(c.claim)) continue;
    const p = postBySlug.get(c.slug);
    const fields = { Claim: c.claim, SourceURL: c.url, SourceDate: c.date, Confidence: c.confidence, Category: c.category };
    if (p) fields.Post = [p.id];
    claimRows.push(fields);
  }
  if (claimRows.length) { await createBatch('Claims', claimRows); console.log(`Created ${claimRows.length} example Claims (${claimRows.filter((c) => c.Post).length} linked to posts).`); }
  console.log('Enrichment complete.');
})().catch((e) => { console.error(e.message); process.exit(1); });
