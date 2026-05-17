---
title: "Automatic Business Creator: Idea to Landing Page"
slug: "automatic-business-creator"
type: "automation"
description: "n8n pipeline turns a one-line concept into a structured business brief and deployment-ready HTML/CSS landing page scaffold using Gemini-class models and OpenRouter routing for strategy vs code passes."
image: "/projects/automatic-business-creator.jpg"
timeline: "Inactive (Archived)"
featured: false
priority: 7
tags: ["Micro-SaaS", "Idea Validation", "Landing Page", "Gemini 2.5", "HTML", "n8n", "OpenRouter", "rapid prototyping"]
features:
  - "Single webhook or manual trigger accepts raw idea text plus optional audience hints."
  - "Strategy LLM expands ICP, positioning, offer ladder, and objections before any code is generated."
  - "Code LLM emits semantic HTML + responsive CSS with explicit placeholder regions for hero media."
  - "Image URL mapper can attach stock or generated hero assets when a second pipeline supplies URLs."
  - "Structured outputs validated in Code nodes—reject incomplete HTML before writing to storage."
  - "Optional static hosting deploy hook (S3, Netlify, GitHub) after lint checks."
  - "Versioned prompts so pricing/positioning tweaks do not require editing a dozen n8n nodes."
seoTitle: "AI Landing Page Generator: Idea to HTML with n8n | William Spurlock"
seoDescription: "Sellable rapid validation workflow: text idea in, structured business plan + static landing scaffold out—Gemini/OpenRouter powered, n8n orchestrated, deployment-ready."
seoKeywords:
  - "AI landing page generator"
  - "n8n business idea automation"
  - "Gemini HTML generation workflow"
  - "micro SaaS validation automation"
  - "OpenRouter code generation"
  - "rapid prototype landing page"
  - "automated marketing site scaffold"
  - "LLM business plan workflow"
  - "static site generation n8n"
  - "conversion page automation"
---

# Automatic business creator: compress “idea Friday” to “publish Saturday”

**This archived workflow collapses early validation into two LLM passes inside n8n: first expand the concept into an ICP-aware brief and offer ladder, then emit a clean HTML/CSS landing scaffold with hero placeholders—so you can test demand before you name a repo.** It is a **laboratory** pattern more than a compliance-grade CMS replacement.

## Who is this automation built for?

- **Serial builders** running weekly idea experiments.
- **Agencies** packaging “concept sprint” deliverables for non-technical founders.
- **Growth engineers** who already instrument funnels and will **not** mistake static HTML for payment-grade checkout.

## What goes wrong when micro-offers start in Figma only?

- **Latency to signal:** The market learns nothing until engineering starts.
- **Over-investment:** You build billing before proving copy converts.
- **Inconsistent narrative:** Code and positioning diverge when written by different people on different days.

## What you receive at handoff

1. **n8n graph** splitting “strategy” and “codegen” with schema validation between them.
2. **Prompt + JSON schema** for business brief fields (ICP, promise, proof plan, CTA).
3. **HTML sanitization checklist** (no remote scripts without review).
4. **Deployment adapter stubs** for your actual host.
5. **Safety guidance** on claims, trademarks, and regulated verticals.

## Architecture at a glance

| Layer | Role | Tools |
|-------|------|-------|
| Input | Idea + constraints | Webhook / Form |
| Strategy | Market framing | LLM (Gemini / OpenRouter route) |
| Code | UI scaffold | Second LLM pass |
| Validate | Structural checks | n8n Code |
| Store | Artifacts | DB row / Drive / Git |
| Orchestration | Retries | **n8n** |

## End-to-end execution flow

1. **Ingest** raw text; reject empty or > token budget without chunking plan.
2. **Brief LLM** outputs JSON with mandatory sections; **parse** or fail.
3. **Codegen LLM** consumes brief only—not raw idea—to reduce hallucinated features.
4. **Lint** HTML for forbidden tags if your policy forbids inline JS.
5. **Persist** artifacts and return preview URL to operator.
6. **Optional:** open GitHub PR with files for static hosting pipelines.

## Stack, APIs, and orchestration

- **OpenRouter** simplifies swapping strategy vs codegen models by price tier.
- **Gemini-class** models often excel at long-context planning—benchmark latency vs quality for your hosting region.

## AI: where models help—and where they do not

**Plans and layouts.** **Legal review, pricing truth, and analytics correctness** remain human or deterministic systems.

## Errors, retries, and human checkpoints

- **Two-strike rule:** if codegen fails schema twice, email human with brief only.
- **No auto-dns:** domain mapping stays manual to prevent hijack patterns.

## Security, privacy, and data boundaries

Generated HTML must not silently embed third-party trackers you did not audit—strip or whitelist domains in post-process.

## Deployment and environments

- **Preview-only** environments strongly recommended before customer-facing domains.

## Engagement models

- **Internal lab** tool for your portfolio holds.
- **Workshop SKU** where clients bring ideas and receive pages same day—ops heavy but sellable at the right price.

## Manual concept sprint vs automated scaffold

| Dimension | Workshop only | Workflow |
|-----------|---------------|----------|
| Speed | Days | Minutes-hours |
| Depth | High touch | Template-bounded |
| Risk of generic output | Lower | Higher without voice card |
| Best use | Premium clients | Volume testing |

## Frequently asked questions

### Is the HTML production-grade?

**For experiments and waitlists—**not automatically for PCI or HIPAA hosting without review.

### Can we plug React instead of static HTML?

**Yes** by swapping codegen prompt and validation—but complexity rises.

### How do we keep brand voice?

**Inject voice exemplars** and “banned phrase” lists into brief stage prompts.

### Multilingual landing pages?

**Add translation node** with URL path strategy (`/es`, subdomains, etc.).

### Will Lighthouse scores be perfect?

**Not guaranteed—**optimize images, fonts, and CLS manually after scaffold.

### Who maintains prompts when models update?

**Retainer or internal owner—**models drift; regression tests on sample ideas help.

## Next step

**[Book an AI automation strategy call](https://williamspurlock.com/contact)** if you want this pattern hardened into a governed “idea ladder” for your studio—not a toy demo.
