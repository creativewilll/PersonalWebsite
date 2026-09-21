---
name: authoring-blog-posts-v2
description: Airtable-native blog engine for williamspurlock.com. Airtable is the source of truth for the schedule, pillars, posts, questions, and claims; markdown under content/blog/** is the published artifact. Leads with AI Visibility (GEO/AEO/AIO) for a business-owner audience, with AI Automation and AI Agents secondary/tertiary. Use when writing a williamspurlock.com blog post or managing that editorial pipeline. Not for Divine Toke / Jamie — that uses divinetoke-blog.
---

# William Spurlock Blog Skill (Airtable-Native)

## Agent memory

On a **local** machine, read `~/Projects/agent-memory/index/by-project.md` and open notes for **williamspurlock**. After a durable lesson, write exactly one note:

`node ~/Projects/agent-memory/scripts/new-note.mjs --id <kebab-id> --project williamspurlock --kind <kind> --title "..."`

Then `cd ~/Projects/agent-memory && node scripts/validate.mjs && node scripts/build-index.mjs`. Never write secrets or transcripts. Never delete notes — supersede.

On a **Cloud Agent**, skip the vault path. Read [CLOUD_RUN.md](./CLOUD_RUN.md) instead. Daily lessons go to Automation Memories. Do not fail the run if `~/Projects/agent-memory` is missing.

## Core Principle

**If it is not in Airtable, it is not the plan.** Airtable (`WS Blog`, base `appQA9UR7KiKscbG5`) holds the schedule, pillars, posts, questions, and claims. The website repo holds only the published artifact: `content/blog/YYYY/MM/<slug>.md`. Always `pull` from Airtable before planning and `push` after publishing.

Base: https://airtable.com/appQA9UR7KiKscbG5

## Reference Files — Read Before Writing

| File | Purpose |
|------|---------|
| [AIRTABLE_SCHEMA.md](./AIRTABLE_SCHEMA.md) | Base/table/field spec + sync contract. Source of truth for structure. |
| [AI_VISIBILITY_QUESTION_BANK.md](./AI_VISIBILITY_QUESTION_BANK.md) | The 500+ question bank (3 parts, 27 categories) — the idea bank. |
| [TONE_OF_VOICE.md](./TONE_OF_VOICE.md) | Voice rules + banned AI-tell words + the 3 registers. |
| [AIO_AEO_STRATEGY.md](./AIO_AEO_STRATEGY.md) | AI Overview & Answer Engine Optimization rules (primary optimization target). |
| [SEO_STRATEGY.md](./SEO_STRATEGY.md) | Traditional SEO rules (supporting). |
| [CLOUD_RUN.md](./CLOUD_RUN.md) | Cloud Agent standing rules (receipts, links, git, secrets). Required on daily auto-publish. |

## When to Use This Skill

- "Write a blog post" / "publish an article" on the William Spurlock site.
- "Research and draft" content, plan the editorial pipeline, or pick topics.
- Any content planning, scheduling, or question-cluster work.

**Not for Divine Toke.** Jamie posts use `~/.cursor/skills/divinetoke-blog` and `divinetoke-deslop --mode blog`. Do not run this skill or `de-ai-slop` on DT.

---

## Service Tracks (Priority Order)

| Track | Priority | Audience | Closing CTA |
|-------|----------|----------|-------------|
| AI Visibility | PRIMARY | Business owners, marketers, operators | "Get an AI-visibility-ready site built" → Premium AIO/AEO Websites offer |
| AI Automation + Growth | SECONDARY | Founders, ops/growth teams, agencies | AI automation strategy call |
| AI Agents | TERTIARY | Technical founders, builders | Custom agent build |
| Web Design + Digital Experiences | RETAINED | Premium brands, musicians, founders | Custom website discovery call |

Tag each post `serviceTrack: "ai-visibility" | "ai-automation" | "web-design" | "both"`. Default new posts to `ai-visibility` unless clearly otherwise. The loader accepts any string, so no code change is needed.

---

## The Question Bank — 3 Parts, 27 Categories

Source: [AI_VISIBILITY_QUESTION_BANK.md](./AI_VISIBILITY_QUESTION_BANK.md). Mirrored live in the Airtable `Questions` table.

- PART 1 — AI Visibility (PRIMARY), categories 1-14, ~355 questions.
- PART 2 — AI Automation (SECONDARY), categories 15-22, ~90 questions.
- PART 3 — AI Agents (TERTIARY), categories 23-27, ~80 questions.

`Part` and `Category` are first-class fields on every Question and Post. Never treat an Automation or Agent category as AI Visibility.

---

## The Question-Cluster Method

Every post is built from a cluster of **3-5 questions** that flow together — never one, never a grab-bag.

### Step 1 — Cluster by Article Arc (not topic adjacency)

Build the cluster to map to a natural arc:

| Arc slot | Question type |
|----------|---------------|
| Definition | "What is X?" |
| Stakes | "Why does it matter / what happens if I ignore it?" |
| Method | "How do I do it?" |
| Proof | "How do I measure / audit it?" |

Minimum = Definition + Method. Prefer all questions from **one category**; reach into an adjacent category only for the Stakes or Proof slot. Set each chosen Question's `FunnelStage`.

### Step 2 — Pillar vs Spoke

- Broad fundamentals cluster (Category 1, 10, 12) → pillar post (`PillarPost` checked, 600-1000+ lines).
- Narrow tactical cluster → spoke post linking back to its category pillar via `ParentPillar`.

### Step 3 — Dedupe Against Cannibalization

Each post owns one distinct `PrimaryQuery`. Before locking, confirm no existing Post row already targets it (check the pulled cache). Other cluster questions are supporting, not competing.

### Step 4 — Promote Questions to Structure

- The 3-5 chosen questions become **H2 headers** (answered in depth, lead-answer first).
- Pull ~8 more adjacent questions from the same category into the FAQ as `### Question?` H3s. One post touches ~12-15 questions; ~30 deep posts cover Part 1.

---

## Claims Validation (Mandatory)

AI Visibility is stat-heavy and the bank baits exact numbers. Before writing prose, create a `Claims` row in Airtable for every statistic, model spec, price, or market-share figure:

`Claim → SourceURL (dated primary source) → SourceDate → Confidence (High/Medium/Estimate/Unverified)`

Cite the source inline in the sentence. If no solid source exists, frame it as "estimates vary" / "as of <date>, reports suggest" — never state a hard number you cannot source. Set `Posts.ClaimsValidated` only when every claim is sourced or hedged.

---

## Airtable-First Workflow (per post)

1. **Pull** — `node scripts/blog-sync.mjs pull` writes `scripts/airtable-cache/*.json`.
2. **Pick a slot** — next empty `Schedule` date, or next `Queued` Post.
3. **Select a cluster** — 3-5 `Unused` Questions by article arc (Step 1-3 above).
4. **Create/Update the Post row** — `node scripts/blog-sync.mjs create-post --slug=<slug>` (Status=In Progress; link TargetQuestions, set PrimaryQuery, Category, Cluster, Part, ServiceTrack, Date).
5. **Validate claims** — add `Claims` rows; flip `ClaimsValidated`.
6. **Write** — follow the phased SOP below into `content/blog/YYYY/MM/<slug>.md`.
7. **Push** — `node scripts/blog-sync.mjs push --slug=<slug>` (Status=Published; fill FilePath/WordCount/ReadingTime/CoverImage/Excerpt/LastModified; flip linked Questions to Published; update Schedule).

---

## Frontmatter Contract (camelCase — STRICT)

The website loader reads only camelCase keys. Wrong casing silently drops data.

```yaml
---
title: "High-Converting Title"
slug: "kebab-case-slug"
date: "YYYY-MM-DD"
lastModified: "YYYY-MM-DD"
author: "William Spurlock"
readingTime: 0
categories:
  - "AI Visibility"
tags:
  - "keyword"
featured: false
draft: false
excerpt: "150-160 char summary."
coverImage: "/images/blog/your-cover.png"
coverImageAlt: "One sentence of what the 16:9 cover actually shows"
seoTitle: "SEO Title (<60 chars) | William Spurlock"
seoDescription: "Meta description."
seoKeywords:
  - "main keyword"
aioTargetQueries:
  - "verbatim cluster question 1"
contentCluster: "ai-visibility-fundamentals"
pillarPost: false
parentPillar: "slug-of-parent-pillar"
entityMentions:
  - "William Spurlock"
  - "Google AI Overviews"
serviceTrack: "ai-visibility"
---
```

The closing `---` MUST sit on its own line before the H1. Use `coverImage` not `cover_image`, `seoTitle` not `seo_title`, `entityMentions` not `aioEntityMentions`, `draft: false` not `published`.

The renderer auto-emits all meta tags, Open Graph, JSON-LD `BlogPosting`, and `FAQPage` (from `### Question?` H3s with 2+ Q/A pairs). Adding a real FAQ section is the highest-leverage AIO move per post.

---

## Phased Writing SOP

1. **Outline** — create the file with full frontmatter + H2 skeleton (from TargetQuestions) + FAQ placeholders (from FAQQuestions). No prose yet.
2. **Research** — gather dated sources for the claims table; check existing posts for cross-links. **CRITICAL LINKING RULE:** You must ONLY link to blog posts that are already created and present under `content/blog/`. Verify that each linked post's `.md` file actually exists on disk before adding the link (Glob the slug). NEVER link to hypothetical, planned, or uncreated posts. If a target slug contains a banned word (e.g. `leverage`), percent-encode one letter in the href (`l%65verage`) and keep the banned word out of the anchor text.
   - **MODEL CURRENCY:** Never trust a model's training-cutoff names. As of mid-2026 the current names are: Anthropic **Claude Opus 4.8** (flagship) / **Claude Sonnet 5** (workhorse), with **Claude Opus 5** confirmed as the next release; Google **Gemini 3.1 Pro** / **Gemini 3.5 Flash**; OpenAI **GPT-5.5** / **GPT-5.4 mini**; **Llama 4**. Names like "Claude 3.5 Sonnet", "Gemini 1.5 Pro", "GPT-4o", "Llama 3" are OUTDATED, and mixed-vendor inventions like "Claude 3.1 Pro" are hallucinations. When dispatching subagents, paste the current-model table into the prompt — cheap/fast models are the ones most likely to emit stale names.
3. **Section-by-section** — one H2 per edit. Lead with the answer, then expand. Each section ≥1 structured element (table, list, comparison). No unverified code blocks (only n8n/MCP config, schemas, prompts).
4. **Assembly** — FAQ answers (2-4 sentences, bold lead fact, cite sources), service-track CTA, 2-3 internal cross-links (each must be verified to exist on disk per the Critical Linking Rule above).
5. **Cover + X preview** — one new 16:9 PNG at `public/images/blog/<slug>.png`. That file is the hero **and** `og:image` / `twitter:image`. Compose it as a ~1200×630 link card: dark cinematic, on-topic, no tiny type, no watermark, no model name in the prompt. Set `coverImage` and `coverImageAlt`. Do not overwrite another slug. Do not write `public/og/**`. If generation fails, stop — no placeholder.
6. **De-slop (MANDATORY)** — follow `.cursor/skills/de-ai-slop/SKILL.md` (repo; Cloud-safe). Local overlay `~/.cursor/skills/de-ai-slop/` is optional. Score → rewrite → rival-model cleanse → rescore. Ship only at **5/5**. Command: `python3 .cursor/skills/de-ai-slop/scripts/deslop.py content/blog/YYYY/MM/<slug>.md`. The Node banned-word list is a second tripwire, not a substitute.
7. **Validation gate (MANDATORY before push)** — run the repo's own tooling and do not rely on a writer's self-certification (subagents have falsely claimed "no banned words"):
   - `node scripts/validate-blog-frontmatter.mjs` — the new post's slug must appear in NO ERROR lines. Banned words (incl. standalone `dynamic`, `to summarize`, `game-changer`) are ERRORS.
   - `node scripts/audit-blog-links.mjs` — must report `Total problem links: 0`.
   - Grep the file for stale model names (`GPT-4`, `Claude 3`, `Gemini 1`, `Gemini 2`, `Llama 3`) — zero hits.
   When delegating to subagents, put these three checks in the prompt as a completion gate, AND re-run them yourself as the orchestrator before reporting done.
8. **Push to Airtable** — `node scripts/blog-sync.mjs push --slug=<slug>`. Daily auto-publish uses `node scripts/publish-scheduled-posts.mjs publish --slug=<slug>` (Airtable + two-file git push to `main`).

### Length

- Minimum 250 body lines; 400-600 for standard spokes; 600-1000+ for pillars.

### Voice

Use the register matching the track (see [TONE_OF_VOICE.md](./TONE_OF_VOICE.md)). AI Visibility posts use the **AI Visibility Strategist** register: buyer-facing, outcome-first, lower jargon. Never fabricate client names, ROI numbers, or model specs.

---

## Scope Guardrail

Daily / Cloud runs are **additive only**: today's `content/blog/YYYY/MM/<slug>.md` and `public/images/blog/<slug>.png`. Nothing else. See [CLOUD_RUN.md](./CLOUD_RUN.md).

The website code is frozen: do not change `src/`, `content/` structure, existing `public/` files, `package.json` scripts, `wrangler.jsonc`, `tsconfig.json`, build config, or loaders. The legacy skill at `authoring-blog-posts/` is left untouched.
