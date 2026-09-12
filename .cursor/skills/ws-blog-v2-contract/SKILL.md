---
name: ws-blog-v2-contract
description: Condensed Airtable-native blog contract for williamspurlock.com. Use when writing or planning a post and authoring-blog-posts-v2 is missing, or as the Cloud-visible fallback.
---

# WS blog v2 contract

If `~/.cursor/skills/authoring-blog-posts-v2/SKILL.md` exists, **follow that skill** (plus its TONE / AIO / SEO files). This file is the Cloud fallback.

## Airtable first

Base `appQA9UR7KiKscbG5`. Live Posts: `tblfOqqLYXLjFtBl0`. If it is not in Airtable, it is not the plan.

```bash
node scripts/blog-sync.mjs pull
node scripts/blog-sync.mjs create-post --slug=<slug>
node scripts/blog-sync.mjs push --slug=<slug>
```

## Question cluster

Every post is 3–5 questions that form an arc (Definition → Stakes → Method → Proof). Those become H2s. Pull ~8 adjacent questions into FAQ as `### Question?`. Default track: `serviceTrack: "ai-visibility"`.

## Frontmatter (camelCase only)

Required: `title`, `slug`, `date`, `lastModified`, `author`. Also set `coverImage`, `seoTitle`, `seoDescription`, `seoKeywords`, `excerpt`, `categories`, `tags`, `aioTargetQueries`, `contentCluster`, `entityMentions`, `pillarPost`, `parentPillar`, `draft: false`.

Cover: `/images/blog/<slug>.png` → `public/images/blog/<slug>.png`.

Forbidden keys: `cover_image`, `seo_title`, `seo_description`, `last_updated`, `aioEntityMentions`.

## Write

- Path: `content/blog/YYYY/MM/<slug>.md`
- Lead with the answer. 2–4 sentence grafs. First person. No banned AI-tell words.
- Disk-verify every `(/blog/<slug>)` link.
- No fabricated clients, ROI, or model specs. Current mid-2026 names only (Claude Opus 4.8 / Sonnet 5, Gemini 3.1 Pro / 3.5 Flash, GPT-5.5 / 5.4 mini, Llama 4).
- Closing CTA matches `serviceTrack`.

## Gate

```bash
npm run validate-blog
node scripts/audit-blog-links.mjs
```

Grep the file for `GPT-4`, `Claude 3`, `Gemini 1`, `Gemini 2`, `Llama 3` — zero hits.
