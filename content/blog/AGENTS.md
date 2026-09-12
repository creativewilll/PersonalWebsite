# Blog posts — `content/blog/`

Published artifact only. Planning SoT is Airtable WS Blog (`appQA9UR7KiKscbG5`, Posts `tblfOqqLYXLjFtBl0`).

## Path and schema

- File: `content/blog/YYYY/MM/<slug>.md`. Skip `template.md` and `draft: true`.
- Frontmatter: camelCase only. Required: `title`, `slug`, `date`, `lastModified`, `author`.
- Canonical keys: `tags`, `coverImage`, `coverImageAlt`, `seoDescription`, `featured`, `readingTime`, `draft`, `seoKeywords`, `excerpt`, `seoTitle`, `categories`, `contentCluster`, `serviceTrack`, `aioTargetQueries`, `entityMentions`, `pillarPost`, `parentPillar`.
- Forbidden keys (silently dropped): `cover_image`, `seo_title`, `seo_description`, `seo_keywords`, `last_updated`, `reading_time`, `service_track`, `aioEntityMentions`, `canonicalUrl`.
- `serviceTrack`: `"ai-visibility"` | `"ai-automation"` | `"web-design"` | `"both"`. Default new posts to `ai-visibility`.
- Author: `William Spurlock`. Copy the shape in `template.md`.

## Covers

`coverImage: "/images/blog/<slug>.png"` → file at `public/images/blog/<slug>.png`. Not `{slug}-cover.png`.

## Links

Internal post links: `(/blog/<slug>)` only. Disk-verify the target `.md` exists. No `/blog/YYYY/MM/...`. Category: `/blog/category/<category-slug>` (singular). Run `node scripts/audit-blog-links.mjs`.

## Voice and gate

Banned AI-tell words are errors for posts dated `>= 2026-06-19` (`scripts/validate-blog-frontmatter.mjs`). Lead with the answer. Receipts beat adjectives. If `authoring-blog-posts-v2` is available, follow it; else `.cursor/skills/ws-blog-v2-contract/SKILL.md`.

Before calling a post ready: `npm run validate-blog` and `node scripts/audit-blog-links.mjs`.
