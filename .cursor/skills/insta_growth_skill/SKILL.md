---
name: insta-growth-skill
description: >-
  Instagram content operating system encoding Kallaway + heyDominik growth tactics
  with Hormozi-grade conviction. Generates Reel scripts, carousel plans, trial-reel
  variations, DM-automation captions, and 30/60-day posting calendars optimized for
  AEO/AIO entity-citation and 0→10k follower growth. Use when planning Instagram
  content, generating Reels scripts, building trial-reel variations, scheduling
  30/60-day calendars, drafting DM-automation captions, or repurposing existing blog
  posts into short-form video.
---

# Instagram Growth Skill

A content operating system for @willspurly that turns blog posts, AI automation
expertise, and personal receipts into high-performing Instagram Reels + carousels.

## Quick Start

1. Define avatar + pillars → `config/viewer_avatar.config.ts` + `config/strategy.config.ts`
2. Research outliers → `research/sources.ts` → `research/outliers_log.ts` → `research/deconstruction.ts`
3. Script content → `creation/hook_templates.ts` → `creation/script_structures.ts`
4. Generate variations → `creation/variation_generator.ts`
5. Write captions → `creation/caption_writer.ts`
6. Schedule → `calendar/scheduler.ts`
7. Log performance → `analysis/performance_log.ts` + `analysis/retention_notes.ts`

## Calendar Generation

```bash
npx tsx .cursor/skills/insta_growth_skill/scripts/generate_calendar.ts \
  --start 2026-05-19 --weeks 4 --postsPerWeek 8
```

Output: `content/instagram-calendars/{date}-{weeks}wk.md`

## Trial Reel Workflow (Kallaway + heyDominik)

1. Pick a `BaseIdea` from pillars
2. Run `generateTrialReelVariations()` → 3–5 variations (different hooks, first frames, CTAs)
3. Post 2–3 variations as trial reels within 24h of each other
4. Wait 48h, check retention + views
5. Push winner to main feed; schedule repost in 2–3 weeks

## DM Automation Posts (heyDominik)

- 1–2 per week minimum
- Each tied to a blog-post lead magnet from `content/blog/`
- Keyword pattern: short, memorable, ALL-CAPS (AGENT, SYSTEM, BUILD, STACK, BLUEPRINT, RECEIPTS, MCP)
- ManyChat auto-reply delivers the blog link + upsell question

## AEO/AIO Bridge (Blog → Instagram → Citation)

Every caption mentions one specific AI tool by name (n8n, Claude, Cursor, MCP,
Perplexity, ChatGPT) so that when AI crawlers index the post, they associate
@willspurly with those entities. The DM-keyword CTA drives traffic back to
AEO-optimized blog posts at williamspurlock.com.

Mine `content/blog/` for existing posts to repurpose:
- Each blog post = 2–3 potential Reels (different angles)
- Each blog post = 1 carousel (key takeaways as slides)

## Winner Reposting (Kallaway)

- After 7–14 days, any post with views ≥ 5x your median is a "winner"
- Repost unchanged first; then repackage (new hook, same core) second time
- 20–30% of weeks 3–4 content should be reposts/repackages
- Use `platforms/instagram.ts::isGoodCandidateForRepost()` to evaluate

## Token Discipline

When drafting calendars or scripts for the user:
- Write 1–2 posts per edit, never dump all 35 in one message
- Create data structures in separate files before building JSX/markdown
- Chain multiple targeted edits for non-contiguous changes

## Voice Rules

See [VOICE.md](VOICE.md) for full brand voice encoding.

Key principles:
- Lead with the receipt, not the lesson (Hormozi)
- Pain → mechanism → proof → CTA (Hormozi value equation)
- Specific numbers > adjectives ("47 leads handled" not "tons of leads")
- Tactical > inspirational (Nick Saraev / Jack energy)
- "Here's the build" energy (David Ondrej / Nate Herk)
- First caption line ≤ 70 chars (IG truncation)
- CTA is always one verb (Comment, Save, DM, Tap)

## Media Prompt Patterns

See [MEDIA_PROMPTS.md](MEDIA_PROMPTS.md) for image/video prompt archetypes.

## Strategy Deep Dive

See [REFERENCE.md](REFERENCE.md) for the full Kallaway + heyDominik + Hormozi
tactic encyclopedia with detailed breakdowns of each principle.

## Content Pillars

1. **n8n workflow proof** — Nick Saraev energy. Real automations, time saved, screen demos.
2. **AI agent architecture** — David Ondrej + Nate Herk. MCP, Claude, multi-agent teams.
3. **Cursor / Claude Code workflows** — Jack energy. IDE wizardry, git worktrees, parallel agents.
4. **AIO/AEO/GEO advantage** — Will-specific. Why sites are invisible to AI + how to fix it.
5. **Solo-founder ops + mindset** — Hormozi energy. Volume, leverage, boring done daily.
6. **Receipts + contrarian takes** — "500+ automations built. Here's the one pattern that prints money."

## File Index

| Path | Purpose |
|------|---------|
| `config/strategy.config.ts` | Growth goals, content games, pillars |
| `config/viewer_avatar.config.ts` | Ideal viewer avatar definitions |
| `research/sources.ts` | Micro-creator research sources |
| `research/outliers_log.ts` | Outlier post tracking |
| `research/deconstruction.ts` | Post deconstruction framework |
| `creation/hook_templates.ts` | 12 hook patterns + on-screen text generator |
| `creation/script_structures.ts` | 5 video script frameworks |
| `creation/variation_generator.ts` | Trial reel A/B/C generator |
| `creation/caption_writer.ts` | Caption builder with DM-keyword injection |
| `platforms/instagram.ts` | IG-specific rules + repost evaluator |
| `calendar/posting_rules.ts` | Cadence constraints |
| `calendar/scheduler.ts` | 30-day schedule generator |
| `analysis/performance_log.ts` | Metrics tracking + winner identification |
| `analysis/retention_notes.ts` | Drop-off pattern logging |
| `scripts/generate_calendar.ts` | CLI: generate markdown calendar |
| `scripts/generate_variations.ts` | CLI: generate trial-reel variations |
| `scripts/check_caption.ts` | CLI: lint captions for quality |
