---
name: ws-aeo-ticket
description: How to unfreeze src/ on williamspurlock.com for a named AEO or conversion ticket. Use only when William names the ticket.
---

# Named AEO ticket

`src/` stays frozen until William names the ticket in the Project chat. One concern per PR.

## Before editing

1. Repeat the ticket name in your plan (entity lock, prerender verify, or a specific TD-217–241 item).
2. Read `~/Projects/agent-memory/notes/williamspurlock/blog-seo-aeo-cross-site-audit-2026-09.md` and `notes/craft/aeo-seo-rubric-v1.md`.
3. Touch only the files that ticket needs.

## Known WS gaps (do not freelance beyond the named one)

- `build:fast` can ship an unprerendered SPA — port DT `verify-head-tags` / prerender-coverage if that is the ticket
- Committed sitemap/RSS can sit stale
- Entity drift on machine surfaces (not a bulk blog rewrite)
- No Speakable / SearchAction; `?q=` not noindexed
- Dead share buttons; `aioTargetQueries` unused in the UI; excerpt-only RSS

## Hard limits

- Never-browser-verify unless William asks.
- Playwright Chromium is not in the default Cloud install. For `build:cf` / prerender: `npx playwright install --with-deps chromium`.
- Do not merge, deploy, or call the branch live.
- Do not invent IndexNow / GSC / Bing verification IDs.
