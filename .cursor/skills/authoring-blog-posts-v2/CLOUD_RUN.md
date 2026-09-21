# Cloud-run standing rules

Cloud Agents do not see `~/Projects/agent-memory` or a local `.env`. They also do **not** see `~/.cursor/skills` unless Sync Skills is on — do not depend on that. Authoring files live in this repo:

- `.cursor/skills/authoring-blog-posts-v2/` (this folder)
- `.cursor/skills/de-ai-slop/`

Read this file instead of the vault. Daily lessons go to Automation Memories. Do not fail a run because the vault path or `~/.cursor/skills` is missing. Never write secrets into Memories.

## Startup (do this before the file check)

Cloud Builds reuse a disk snapshot of `main`. That snapshot can be hours behind GitHub (the 2026-09-21 test booted `2d56413`, the commit before this pack). Do not treat a missing skill path as a hard stop until you have fast-forwarded.

From the repo root, before reading anything:

```bash
git fetch origin main
git checkout main
git reset --hard origin/main
```

Then confirm `git rev-parse HEAD` is at least `52c36ac` (the pack commit) or any later `main` commit. Only if the paths below are still missing after that reset, stop and write the miss to Memories.

## File checklist (refuse to publish if unread)

Resolve every path from the **repo root**. `~/.cursor/skills/...` is optional local overlay only.

- [ ] `.cursor/skills/authoring-blog-posts-v2/CLOUD_RUN.md` (this file)
- [ ] `.cursor/skills/authoring-blog-posts-v2/SKILL.md`
- [ ] `.cursor/skills/authoring-blog-posts-v2/TONE_OF_VOICE.md`
- [ ] `.cursor/skills/authoring-blog-posts-v2/AIO_AEO_STRATEGY.md`
- [ ] `.cursor/skills/authoring-blog-posts-v2/SEO_STRATEGY.md`
- [ ] `.cursor/skills/authoring-blog-posts-v2/AIRTABLE_SCHEMA.md`
- [ ] `.cursor/skills/de-ai-slop/SKILL.md`
- [ ] `.cursor/skills/de-ai-slop/scripts/deslop.py`

Do not treat `.cursor/skills/ws-blog-v2-contract/SKILL.md` as a substitute. If the files above are still missing after `git reset --hard origin/main`, stop — the pack is not on GitHub `main` yet.

Airtable questions live in the pulled cache (`node scripts/blog-sync.mjs pull`). Use `AI_VISIBILITY_QUESTION_BANK.md` in this same folder only if the cache is empty.

## Additive-only (hard)

This run may **create** exactly two new files, nothing else:

1. `content/blog/YYYY/MM/<slug>.md` — today's post. The file must not already exist.
2. `public/images/blog/<slug>.png` — today's cover / X preview. The file must not already exist.

You may **read** the rest of the repo. You may **run** existing scripts (`blog-sync.mjs`, `publish-scheduled-posts.mjs`, `validate-blog-frontmatter.mjs`, `audit-blog-links.mjs`, `de-ai-slop/scripts/deslop.py`). You may **update Airtable** for this slug only.

Never edit, overwrite, delete, rename, or restage:

- `src/`, loaders, `wrangler.jsonc`, `package.json`, lockfiles, Cloudflare / build config
- `public/og/**`, favicons, `public/images/blog/<any-other-slug>.png`, or any existing image
- other posts under `content/blog/**`
- `scripts/**` themselves, `.env`, `scripts/airtable-cache/**`

If today's markdown or PNG already exists, stop. Do not "fix" an old post. Do not patch deploy.

## Stop on first error (no retry)

Any error ends the run. Write the error to Automation Memories and exit.

That includes: missing Schedule row, missing secrets, Airtable failure, image generation failure, de-slop below 5/5, frontmatter/link/model gate fail, `git push` rejected, unexpected extra files dirty.

Do **not** retry the same command. Do **not** try a second approach that touches more files. Do **not** open a PR as a fallback. Do **not** `wrangler deploy`.

## Receipts lock

- Automations: **600+ built / 500+ live**. Never flatten to "500+ built".
- Title: **AI Systems Architect & Fractional AI CTO**. Not "AI Solutions Architect". "AI Visibility Engineer" is LinkedIn Featured only.
- Personal hours: **20,000+**. Never the stale 10k.
- Client hours saved: **35,000+**. Separate from personal hours.
- Org: **Spurlock Studios LLC** (public: Spurlock Studios). Never "Spurlock Solutions AI".
- Email: `william@spurlockstudios.com`.
- Never invent client names, ROI, or testimonials.

## Internal links

Only `/blog/<slug>`. Never `/blog/YYYY/MM/...`, never absolute `https://williamspurlock.com/blog/...`. Verify the target `.md` exists under `content/blog/` before linking. Then `node scripts/audit-blog-links.mjs` must report `Total problem links: 0`.

## CTAs

Closer matches `serviceTrack`:

- `ai-visibility` → AI-visibility-ready site / AIO-AEO build
- `ai-automation` → automation strategy call
- `ai-agents` / agents lean → custom agent build
- `web-design` → custom website discovery call

No Calendly links. No "DM me".

## Model names (mid-2026)

Current: Claude Opus 4.8 / Claude Sonnet 5 (Opus 5 next); Gemini 3.1 Pro / Gemini 3.5 Flash; GPT-5.5 / GPT-5.4 mini; Llama 4.

Grep must return zero hits for `GPT-4`, `Claude 3`, `Gemini 1`, `Gemini 2`, `Llama 3`.

## Hosting and git

- Repo: `creativewilll/PersonalWebsite`, branch `main`.
- Publish with `node scripts/publish-scheduled-posts.mjs publish --slug=<slug>`.
- That command stages **only** the post markdown and cover PNG, commits, and `git push origin main`.
- Do not open a pull request. Do not `wrangler deploy`. Do not `git add -A`.
- If GitHub rejects a push to `main`, stop and write the error to Automation Memories. Do not silently open a PR.

## Secrets

`AIRTABLE_PAT` and `AIRTABLE_BASE_ID=appQA9UR7KiKscbG5` come from Cloud Agent secrets (or a local `.env`). Never print them. Never commit them.

## Cover + X / Open Graph preview (same PNG)

The loader copies `coverImage` into `og:image` and `twitter:image` (`summary_large_image`). There is no second preview file. Design this one PNG as both the in-article hero and the X / LinkedIn / iMessage link card.

Must:

- Path: `public/images/blog/<slug>.png` → frontmatter `coverImage: "/images/blog/<slug>.png"`
- `coverImageAlt`: one concrete sentence of what the picture shows (also image SEO)
- Landscape **16:9**, composed for ~1200×630. Not portrait. Not square. Not a headshot.
- Dark cinematic, abstract, on-topic. No watermarks. No tiny unreadable type. No model name in the prompt or in the pixels.
- Unique to this post. Never reuse or overwrite another slug's PNG. Never write `public/og/**`.

Subject and metaphor are yours. Keep it specific to the article, not a generic "AI brain."

If image generation fails, stop. No placeholder, no stock, no copy of an old cover.

## AEO / SEO (required fields, free phrasing)

Fill every field. The wording is yours as long as it is specific and true.

**SEO**

- One primary query. Slug is kebab-case, 3–6 words, contains that query.
- `seoTitle`: under 60 characters, ends with `| William Spurlock`
- `seoDescription` and `excerpt`: 150–160 characters, different sentences, include the primary query
- `seoKeywords`: 5–8 real phrases, not stuffing
- `categories` / `tags` / `contentCluster` / `serviceTrack` set. Default track `ai-visibility` unless the Schedule row says otherwise.

**AEO / AIO**

- `aioTargetQueries`: verbatim cluster questions (3–5 body + extras in FAQ)
- `entityMentions`: include `William Spurlock` plus real named entities in the post
- Every H2 leads with a bold 1–2 sentence answer
- FAQ is `### Question?` H3s (8+) so FAQPage JSON-LD emits
- In-sentence citations to dated official sources for every hard number
- At least one table and one list per major section
- Claims table complete before prose. `--allow-proof` on de-slop only for those rows.

Read `AIO_AEO_STRATEGY.md` and `SEO_STRATEGY.md`. Do not invent a `/services` page or change the renderer.

## Creative room

Constraints above are the fence. Inside it, pick the angle, the cover metaphor, the H2 wording, and the examples. Sound like William, not a template. Do not pad to hit length.

## Idle

Nothing due today → log "Nothing scheduled today" and exit. No empty commit.
