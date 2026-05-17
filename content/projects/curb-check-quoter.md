---
title: "Curb Check Quoter AI👀"
slug: "curb-check-quoter"
type: "automation"
description: "Microservice-style n8n workflow invoked by parent automations or UI: parses unstructured project descriptions, applies OpenRouter-hosted domain model for hardscaping/curb estimates, updates CRM records for same-day follow-up."
image: "/projects/curb-check-quoter.jpg"
timeline: "Active"
featured: true
priority: 9
tags: ["Home Services", "Instant Quoter", "AI", "n8n", "Lead Gen", "OpenRouter", "CRM"]
features:
  - "Execute Workflow trigger pattern for modular quoting separated from marketing site capture."
  - "Field extraction from messy homeowner prose: dimensions, materials, access constraints, timeline hints."
  - "OpenRouter-routed specialist prompt encodes labor/material heuristics tuned to curb and hardscape verticals."
  - "CRM upsert writes estimate range, confidence flag, and narrative summary for sales prep."
  - "Guardrails on absurd inputs (negative feet, missing units) with user-facing clarification request path."
  - "Logging node stores raw prompt hash for disputed quote audits without PII-heavy transcripts in logs."
  - "Idempotent record updates keyed on lead id + quote version to prevent duplicate rows on retries."
seoTitle: "Instant Hardscape Quote Automation: n8n + OpenRouter | William Spurlock"
seoDescription: "Active home-services lead magnet: unstructured scope text becomes structured CRM estimate fields via n8n microservice and LLM-assisted quantity logic—built for curb and concrete contractors."
seoKeywords:
  - "instant quote automation home services"
  - "n8n CRM estimate workflow"
  - "OpenRouter LLM pricing assistant"
  - "hardscaping lead capture AI"
  - "curb installation quote bot"
  - "field service quoting automation"
  - "microservice workflow n8n"
  - "same day contractor follow up"
  - "structured extraction from text"
  - "sales enablement automation"
---

# Curb Check Quoter: compress “measure and callback” into seconds

**This active n8n microservice listens for a structured call from your site, chatbot, or parent workflow: homeowner describes the job in messy natural language, the graph extracts quantities and constraints, an OpenRouter-routed model applies curb/hardscape heuristics, and CRM fields update so your estimator calls with numbers already on screen—while intent is hottest.**

## Who is this automation built for?

- **Concrete and hardscape shops** quoting linear footage projects daily.
- **Home services GTM teams** pairing landing pages with **instant** triage, not fantasy “AI replaces humans.”
- **Operators** who will **still** field-verify site conditions—this is pre-qualification + prep, not a permit packet.

## What goes wrong when quoting stays “call you back Tuesday”?

- **Lead decay:** High-intent browsers hire whoever answers with numbers first.
- **Estimator overload:** Senior people re-type measurements from voicemail hell.
- **CRM emptiness:** Sales dial without context; close rates suffer.

## What you receive at handoff

1. **`Execute Workflow` entry** pattern + example payload contract.
2. **Prompt pack** encoding material + labor assumptions with explicit revision notes.
3. **CRM field map** for ranges, confidence, disclaimers.
4. **Clarification branch** templates when measures ambiguous.
5. **Observability**: Slack on high-value leads crossing dollar threshold rules.

## Architecture at a glance

| Layer | Role | Stack |
|-------|------|-------|
| Entry | Scoped trigger | n8n sub-workflow call |
| Parse | Structure | LLM JSON + validator |
| Price | Heuristics | Domain prompt |
| Persist | Sales truth | CRM update node |
| Orchestration | Reliability | **n8n** |

## End-to-end execution flow

1. **Parent system** passes `lead_id`, `raw_description`, optional geo.
2. **Extraction LLM** returns JSON measures; **validate** numeric fields.
3. If **missing** critical measurements → return `needs_clarification` to UI.
4. **Quote LLM** computes line-item rationales + range; attach confidence score.
5. **CRM upsert** non-destructively merges into opportunity/contact.
6. **Notify** reps on Slack with deeplink + summary.
7. **Audit** row stores model id + prompt version, not homeowner address in logs if policy forbids.

## Stack, APIs, and orchestration

- **OpenRouter** for model choice (cost vs reasoning) per quote class.
- **n8n** keeps vendor HTTP retries consistent.

## AI: where models help—and where they do not

**Models parse language and sketch quantity reasoning.** **Final binding quotes, contracts, and field measures** stay human unless your insurance and legal team explicitly disagree.

## Errors, retries, and human checkpoints

- **Schema validation failure** returns safe copy: “We’ll call to confirm.”
- **CRM 429:** queue with BullMQ-style pattern external to n8n if volume extreme—or subworkflow retry caps.

## Security, privacy, and data boundaries

Addresses and gate codes are PII—**minimize log retention**, encrypt at rest, restrict Slack channels.

## Deployment and environments

- **Separate staging CRM** for prompt hacking experiments.

## Engagement models

- **Per-market tuning** for material cost tables and seasonal labor factors.

## Manual phone tag vs instant structured quote

| Dimension | Callback | Quoter microservice |
|-----------|----------|---------------------|
| Speed | Slow | Seconds |
| CRM quality | Low | Structured |
| Legal risk if overstated | Lower | Requires disclaimers |

## Frequently asked questions

### Will homeowners trust an AI range?

**When framed as preliminary and verified on-site—**copy matters more than model choice.

### Can this attach photos later?

**Yes** via second webhook including image URLs for vision-assisted adjustments.

### Integrations besides generic CRM?

**Salesforce, HubSpot, JobNimbus-style tools** if APIs exist—pattern identical.

### How often do prompts need retuning?

**When supplier pricing or crews change materially—**budget quarterly review.

### Does it support Spanish prompts?

**Yes** with bilingual schema outputs.

### What about permits?

**Explicitly out of scope** unless you add ruleset + engineer sign-off workflow.

## Next step

**[Book an AI automation strategy call](https://williamspurlock.com/contact)** with sample scope blurbs and your CRM schema—I’ll map extraction keys honestly before you promise dollars on the website.
