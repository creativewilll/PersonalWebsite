# williamspurlock.com

Personal site for William Spurlock — AI Systems Architect and Fractional AI CTO. Live at [williamspurlock.com](https://williamspurlock.com) on Cloudflare Worker `williamspurlock-portfolio`.

## Stack

Vite 6 + React 18 + React Router 6 SPA, markdown-first blog and project catalog, prerendered for crawlers. Node 22.13. Dev server is `localhost:3000`.

## Run

```bash
npm ci
npm run dev
```

Useful gates:

```bash
npm run validate-blog
node scripts/audit-blog-links.mjs
```

`npm run build:cf` is the production path (validate, sitemap, optimize images, Vite build, Playwright prerender). `npm run build:fast` skips prerender and must not be treated as a ship signal.

Deploys run on push to `main`. Do not `wrangler deploy` unless William asks.

## Agents

Read [AGENTS.md](AGENTS.md) before editing. Cursor Project: **williamspurlock.com Inbound Garden**. First message: [.cursor/COORDINATOR_BRIEF.md](.cursor/COORDINATOR_BRIEF.md).
