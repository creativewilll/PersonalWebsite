import fs from 'node:fs';
const C = './scripts/airtable-cache';
const j = f => JSON.parse(fs.readFileSync(`${C}/${f}`, 'utf8'));
const sched = j('Schedule.json'), posts = j('Posts.json'), qs = j('Questions.json'),
      cats = j('Categories.json'), clusters = j('Clusters.json');
const postById = new Map(posts.map(r => [r.id, r.fields]));
const qById = new Map(qs.map(r => [r.id, r.fields]));
const catById = new Map(cats.map(r => [r.id, r.fields]));
const clById = new Map(clusters.map(r => [r.id, r.fields]));

const want = [];
for (let d = 2; d <= 18; d++) {
  if (d === 14) continue; // published
  want.push(`2026-06-${String(d).padStart(2,'0')}`);
}
const out = [];
for (const row of sched) {
  const date = row.fields.Date;
  if (!want.includes(date)) continue;
  const pid = (row.fields.Post||[])[0];
  const p = postById.get(pid);
  if (!p) continue;
  const targets = (p.TargetQuestions||[]).map(id => qById.get(id)?.Question).filter(Boolean);
  const faqs = (p.FAQQuestions||[]).map(id => qById.get(id)?.Question).filter(Boolean);
  const catName = (p.Category||[]).map(id => catById.get(id)?.Name).filter(Boolean)[0] || '';
  const clusterSlug = (p.Cluster||[]).map(id => clById.get(id)?.Cluster).filter(Boolean)[0] || '';
  out.push({
    date, postId: pid, title: p.Title, slug: p.Slug, part: p.Part,
    serviceTrack: p.ServiceTrack, pillar: !!p.PillarPost, primaryQuery: p.PrimaryQuery,
    category: catName, cluster: clusterSlug, targetQuestions: targets, faqQuestions: faqs,
  });
}
out.sort((a,b)=>a.date.localeCompare(b.date));
fs.writeFileSync('./scripts/june-specs.json', JSON.stringify(out, null, 2));
console.log(`Wrote ${out.length} specs to scripts/june-specs.json`);
out.forEach(o => console.log(`${o.date}  [${o.part}] pillar=${o.pillar}  ${o.title}\n        slug: ${o.slug}\n        Q: ${o.targetQuestions.length} target / ${o.faqQuestions.length} faq | cat: ${o.category}`));
