# williamspurlock.com — agent contract

Personal site for William Spurlock. Cursor Project name: **williamspurlock.com Inbound Garden**.

This file is the Cloud-visible constitution. Skills hold playbooks. Project shared files are campaign memory only — not a second vault. Promote durable facts to `~/Projects/agent-memory` only after asking William.

## Stack

- Vite 6 + React 18 + React Router 6 SPA, prerendered into `dist/`
- Cloudflare Worker `williamspurlock-portfolio` (not Pages, not Netlify, not Next)
- Dev: `npm run dev` → `localhost:3000` (`strictPort: true`)
- Node `22.13.0` (see `.node-version`)
- Checkout: `/Users/creativewill/Documents/Coding/Website/williamspurlock.com`
- Live: https://williamspurlock.com
- GitHub: `BigRock12123/PersonalWebsite` (also forked as `creativewilll/PersonalWebsite`)

## Routes that exist

`/`, `/about`, `/websites`, `/websites/:slug`, `/projects`, `/projects/:slug`, `/automations/:slug`, `/blog`, `/blog/:slug`, `/blog/category/:categorySlug`, `/blog/tag/:tagSlug`, `/privacy`, `/music` (noindex).

No `/services` or `/work`. Services live on the home page (`src/data/offerings.ts`). `public/work/` is screenshot storage.

## Dual-mode file ownership

**Default (frozen).** You may write:

- `content/blog/**` (never `template.md`)
- `content/projects/**` (no `_`-prefixed drafts unless William asks)
- Covers: `public/images/blog/<slug>.png` and `public/projects/{slug}-cover.png`
- Run `scripts/blog-sync.mjs`, `validate-blog-frontmatter.mjs`, `audit-blog-links.mjs`, sitemap / feed / llms generators

**Named-ticket unfreeze.** `src/`, other `public/` machine surfaces, build scripts, and `wrangler.jsonc` only when William names the ticket in the Project chat (entity lock, prerender verify, a specific TD-217–241 item). One concern per PR.

Do not “help” the blog loader. It already accepts any `serviceTrack` string.

## Editorial source of truth

- Airtable **WS Blog** `appQA9UR7KiKscbG5`. Live Posts table: `tblfOqqLYXLjFtBl0` (not the stale Authors ID in older schema docs).
- Skill: `authoring-blog-posts-v2` (user) + repo skill `ws-blog-v2-contract`. v1 `authoring-blog-posts` is leftover — leave it untouched.
- Markdown under `content/blog/YYYY/MM/<slug>.md` is the published artifact only.
- Always `node scripts/blog-sync.mjs pull` before planning. Push after a post is ready for review.
- Default new posts to `serviceTrack: "ai-visibility"`.

## Entity packet

- Org: **Spurlock Studios LLC** (public: Spurlock Studios). Never “Spurlock Solutions AI” as the org.
- Operator: Will / William Spurlock. Title: Founder, AI Systems Architect, Fractional AI CTO. LinkedIn-only line: “AI Visibility Engineer.”
- Email: `william@spurlockstudios.com`
- Receipts: **600+ automations built / 500+ live**, **20,000+ hours** architecting agentic systems, **35,000+ hours saved for clients**, ~500M+ impressions, SEO certified since 2021 (now AEO / AIO / GEO). Never cite the stale 10k-hour figures.
- Do not bulk-rewrite old `content/blog/**` to chase title drift.
- `n8n.spurlocksolutions.ai` webhook hosts are infrastructure, not the contact mailbox.

This site is the personal / operator brand. Commercial studio is https://spurlockstudios.com.

## Hard gates

- Do not merge. Do not push `main` or `master`. Do not force-push.
- Do not deploy (`wrangler deploy`, `npm run deploy:manual`). William pushes `main`; Cloudflare deploys.
- Do not post (X, LinkedIn, email, Slack). Social is a different clock (`~/Projects/social-content`).
- Do not write Agent Todos or another agent’s Airtable records.
- Do not invent spend, revenue, or monthly USD.
- Committed ≠ merged ≠ live. Cloud branches on `origin/cursor/…` are not production. Say **ready for review**, never **shipped**, until William says it is on `main` and live.
- Never open a browser / Playwright / local server to “verify UI” unless William asks in that message.
- Never auto-commit. Never skip hooks.

## Knowledge

Before substantive work, read `~/Projects/agent-memory/index/by-project.md` and open **williamspurlock** notes. Rubric: `notes/craft/aeo-seo-rubric-v1.md`. AEO tracker: `appe7uo4R6mzG0vX0`.

After William corrects you, write the lesson into this Project’s shared files. If it is a durable OS fact, tell him and ask him to promote it into agent-memory.

## Cursor Cloud specific instructions

```bash
npm ci
npm run validate-blog
node scripts/audit-blog-links.mjs
npm run dev
```

- Secrets (`AIRTABLE_PAT`, `AIRTABLE_BASE_ID`) come from the Cloud Agents dashboard, not a committed `.env`.
- Do **not** treat `npm run build:fast` as a ship signal — `--skip` can emit an unprerendered SPA.
- Playwright Chromium is **not** in the default Cloud install. Only install it when William names a ticket that needs `build:cf` / prerender: `npx playwright install --with-deps chromium`.
- User hooks and unsynced `~/.cursor/rules` do not load here. Obey this file and `.cursor/rules`.
- If `authoring-blog-posts-v2` is present (Sync Skills), follow it. Otherwise follow `.cursor/skills/ws-blog-v2-contract/SKILL.md`.
