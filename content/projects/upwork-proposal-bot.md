---
title: "Master Assistant: Automatic Upwork Proposals"
slug: "upwork-proposal-bot"
type: "automation"
description: "Webhook-triggered n8n + LLM system that ingests Upwork job posts, keeps bidding context in memory, drafts high-context proposals, and generates Google Docs with Mermaid architecture diagrams."
image: "/projects/upwork-proposal-bot.jpg"
timeline: "Inactive (Archived)"
featured: false
priority: 7
tags: ["Upwork", "Freelance", "AI Agent", "Proposals", "LLM", "n8n", "OpenRouter", "Google Docs"]
features:
  - "Webhook or feed listener ingests new job payloads and normalizes requirements text for scoring."
  - "Window-buffer memory preserves tone, stack focus, and rate-floor rules across sequential agent turns."
  - "OpenRouter-routed chat model produces proposal copy aligned to job stack (e.g., n8n, backend, AI agents)."
  - "Automated Google Doc assembly with structured sections: hook, scope, milestones, and risk callouts."
  - "Mermaid diagram generation for solution architecture visuals embedded or linked from the doc."
  - "Retry-safe HTTP branches and logging so a bad LLM response never blanks your CRM row silently."
  - "Human review gate before any auto-submit path—marketplaces punish low-quality bulk apply."
seoTitle: "Upwork Proposal Automation: n8n + LLM + Google Docs | William Spurlock"
seoDescription: "Sellable automation: capture freelance job posts, draft contextual proposals with architecture diagrams, and route outputs to Google Docs—built for agency and independent engineers on Upwork."
seoKeywords:
  - "Upwork proposal automation"
  - "n8n freelance bidding workflow"
  - "AI proposal writing Upwork"
  - "OpenRouter n8n integration"
  - "automated cover letter B2B"
  - "Google Docs API automation"
  - "Mermaid diagram generation workflow"
  - "LLM memory buffer proposals"
  - "freelance lead response automation"
  - "webhook triggered proposal agent"
---

# Master Assistant: automatic Upwork proposals from job webhook to Google Doc

**This is a sellable n8n automation for freelance engineers and small agencies: new Upwork opportunities hit a webhook, an LLM with structured memory drafts a proposal that sounds like you, and the workflow materializes a Google Doc—often with a generated architecture diagram—so you review once and send.** Speed and specificity beat generic templates; the system encodes your stack vocabulary (n8n, APIs, agents) instead of spamming hiring managers with buzzwords.

## Who is this automation built for?

- **Independent consultants** bidding n8n, backend, or AI automation work who lose hours rewriting the same scaffolding.
- **Small dev shops** with a partner-approved tone of voice and minimum engagement rules.
- **Operators** who already filter jobs upstream and need **downstream** document generation only—not cold spam to every RSS item.

## What goes wrong when proposal workflows are fully manual?

- **Latency:** Top freelancers win on early, sharp replies; manual copy means you answer after the window where clients still read every applicant summary or cover note.
- **Inconsistency:** Different proposals promise different delivery models; you cannot enforce margin, SLAs, or tech stack focus without templated logic.
- **No artifact:** Clients asking “show me how you’d architect this” get paragraphs instead of a diagram—Mermaid closes that gap when wired correctly.

## What you receive at handoff

1. **Production n8n workflow(s)** with documented triggers (webhook / polled feed surrogate).
2. **Credential pattern** for Upwork-adjacent inputs, OpenRouter (or primary LLM API), and Google Docs.
3. **Prompt + memory contract** so edits happen in versioned text, not scattered node fields.
4. **Runbook** for failure cases: empty model output, doc API 429, malformed job JSON.
5. Optional **staging** workflow duplicate for prompt QA without touching live credentials.

## Architecture at a glance

| Layer | Role | Typical implementation |
|-------|------|------------------------|
| Ingest | Receive job payload | Webhook / scheduled pull / forwarded JSON |
| Orchestration | Branching, retries, storage | **n8n** |
| Reasoning | Requirement parsing, drafting | LLM via **OpenRouter** or direct provider |
| Memory | Session / template continuity | Window or summary memory node pattern |
| Artifacts | Human-readable deliverable | **Google Docs** API |
| Visualization | Architecture proof | **Mermaid** text → image or embedded block |

## End-to-end execution flow

1. **Trigger fires** when a new job record passes your filter (rate, skills, client history).
2. **Normalize** title, description, attachments metadata into a single structured object (reject if empty skills array).
3. **Memory node** loads last N turns + static “voice card” (banned phrases, preferred stack wording).
4. **LLM pass** produces proposal sections and optional clarification questions—**if** questions exist, branch to Slack or hold state rather than auto-submit.
5. **Diagram pass** requests Mermaid for the described architecture; validate syntax in a Code node before inserting into the doc.
6. **Google Docs** node creates or updates a file from a template ID; stores `documentUrl` back to your system of record.
7. **Notify** you via email/Slack with diff summary; **human** sends the Upwork message or pastes from Doc.

## Stack, APIs, and n8n orchestration

- **n8n** holds API credentials, schedules, and error workflows—avoid running long LLM chains in serverless without visibility.
- **OpenRouter** (or a single provider) centralizes model routing for cost caps.
- **Google Docs** requires OAuth2 credentials with drive/doc scopes confined to a service account or delegated user folder.
- **Idempotency:** key docs by `jobId + date` so reruns do not spawn seventeen files for one gig.

## AI: where models help—and where they do not

**Use the LLM for:** extracting requirements bullets, matching your past win patterns, drafting narrative, proposing timeline phases, emitting Mermaid. **Do not** use the LLM for: final fee math, legal terms, or **auto-clicking submit** inside Upwork without a human—platform ToS and conversion quality both suffer.

## Errors, retries, and human checkpoints

- **Retry with backoff** on Docs and LLM 429/5xx.
- **Circuit breaker:** if two consecutive generations fail schema validation, post to a “manual queue” item.
- **Trash path** for scam posts: classifier confidence threshold routes to ignore folder rather than burning tokens.

## Security, privacy, and data boundaries

Job descriptions may contain unreleased product info—treat webhook payloads as **confidential**. Use isolated Google Drive folders, rotate keys quarterly, and avoid training third-party models on raw client text unless contractually allowed.

## Deployment and environments

- **Self-hosted n8n** for webhook stability and execution volume; **n8n Cloud** acceptable if execution caps fit your bid volume.
- **Staging:** duplicate credentials with `_test` prefix jobs only.

## Engagement models (how to buy something like this)

- **Greenfield build** scoped to your voice card + one marketplace (or multi with separate classifiers).
- **Template license** of the graph JSON plus one onboarding call—lower price, you operate.
- **Retainer** for prompt tuning when your service offerings shift (common for agencies).

## Manual vs automated proposal ops

| Dimension | Manual | This stack |
|-----------|--------|------------|
| Time-to-first-draft | High variance | Minutes after trigger |
| Tone consistency | Depends on mood | Memory + voice card enforced |
| Architecture proof | Often skipped | Mermaid + Doc default |
| Platform risk | Low if careful | Low if **no** auto-submit |
| Ongoing cost | Labor | Tokens + n8n hosting |

## Frequently asked questions

### Can this auto-submit Upwork proposals without me?

**No reputable default should.** The build is designed for **draft + human send** so you retain quality control and comply with marketplace norms.

### Does it work without OpenRouter?

**Yes.** Swap the chat node for Anthropic, OpenAI, or Gemini credentials—the orchestration pattern stays the same.

### How do I stop garbage-in jobs from wasting tokens?

**Add a lightweight classifier node** (cheap model or rules) that scores title/body for your stack keywords and budget floor before the big model runs.

### What if Google Docs rate-limits?

**Batch writes**, exponential backoff, and **template duplication** instead of create-from-scratch every execution.

### Will clients know AI helped draft?

**Disclose where your ethics or contracts require it;** many technical buyers care about outcome, not whether you used assistive drafting—but never lie about human review.

### Can I white-label this for my agency?

**Yes,** with separate credential sets per brand and isolated Drive roots.

## Next step

If you want this class of system without maintaining brittle Zaps, **[book an AI automation strategy call](https://williamspurlock.com/contact)** and send a sample job JSON and your non-negotiable voice rules—I will tell you exactly what is encodable versus what still belongs in human polish.
