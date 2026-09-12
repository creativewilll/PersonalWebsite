---
name: ws-publish-gate
description: Run the williamspurlock.com blog publish gate (frontmatter, banned words, internal links, cover on disk). Use before calling a post ready for review.
---

# Publish gate

Do not treat a writer's self-certification as done. Run the repo tools.

```bash
npm run validate-blog
node scripts/audit-blog-links.mjs
```

Pass only when:

- The new slug appears in **no** ERROR lines from `validate-blog-frontmatter.mjs`
- `audit-blog-links.mjs` reports `Total problem links: 0`
- Cover exists at `public/images/blog/<slug>.png` and matches `coverImage`
- Grep for stale model names (`GPT-4`, `Claude 3`, `Gemini 1`, `Gemini 2`, `Llama 3`) is empty

`npm run build:fast` is **not** a publish signal (`--skip` can emit an unprerendered SPA). Do not push Airtable or merge until William says the artifact is ready for review.

Then: `node scripts/blog-sync.mjs push --slug=<slug>` only if William wants the Airtable row updated.
