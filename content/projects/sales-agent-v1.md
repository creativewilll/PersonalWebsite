---
title: "Self-Improving AI Sales Agent v1"
slug: "sales-agent-v1"
type: "agent"
description: "Database-first outbound engine: enrich domains with Apollo-style data, research pass condenses public facts, GPT-class email composer enforces anti-spam constraints, Supabase logs replies for script weighting—BullMQ-friendly batch processing."
image: "/projects/sales-agent-v1.png"
timeline: "10 Days"
featured: false
priority: 5
tags: ["Sales Automation", "Lead Gen", "Personalized Outreach", "CRM", "Supabase", "GPT", "BullMQ"]
features:
  - "Lead ingestion supports CSV domains or account lists with dedupe on normalized domain keys."
  - "Enrichment connectors pull titles, seniority, and public bios where APIs allow."
  - "Research agent condenses recent news into 3 bullet cues max to ground email openers."
  - "Email composer enforces length caps, unsubscribe honoring, and variant templates per industry cluster."
  - "Supabase tables track sends, opens (if pixel policy allows), replies, and qualitative reply tags."
  - "Queue workers (BullMQ pattern) pace delivery to protect domain reputation."
  - "Feedback hook increases weight on message angles correlated with positive replies—human validated before auto-promotion."
seoTitle: "AI Sales Agent v1: Research-First Outbound System | William Spurlock"
seoDescription: "Sellable precision outbound stack: enrich leads, summarize public context, compose short personalized emails, log outcomes in Supabase, pace sends with queues—built for lean BDR teams."
seoKeywords:
  - "AI sales automation"
  - "personalized cold email system"
  - "Supabase outbound logging"
  - "Apollo enrichment workflow"
  - "BullMQ email pacing"
  - "BDR automation architecture"
  - "research based outreach"
  - "reply rate optimization"
  - "sales psychology prompting"
  - "domain reputation email sends"
---

# AI sales agent v1: research-grounded email without spray-and-pray

**v1 is intentionally narrower than “omni-god-bot”: it ingests target accounts, enriches contacts, gathers a tight public-research memo per lead, asks an LLM to write a short personalized email that cites real facts, queues sends through rate-limited workers, and logs replies so humans can promote message angles that actually work—nobody ships thousand-row mail merges without throttling.** Domain health matters more than cleverness. **The sellable story for search and RFPs is not “magic AI,” it is observable outbound: idempotent lead keys, bounce-aware workers, and prompts that refuse to invent citations when sources are thin.**

## Who is this automation built for?

- **Founding AEs** at early SaaS with defined ICP lists.
- **Outbound agencies** willing to respect CAN-SPAM/GDPR-style process gates.
- **Teams** that already differentiate “personalization” from stalking.

## What goes wrong with naive automated email?

- **Burned domains:** ISPs kill you when bursts look botty.
- **Creepy copy:** Mentioning irrelevant personal trivia destroys trust.
- **No feedback loop:** You never know which angles resonate.

## What you receive at handoff

1. **Node services** for queue + worker with health endpoints.
2. **Supabase schema** migrations for leads, sends, events.
3. **Prompt library** with compliance checklist.
4. **Throughput calculator** sheet to pick safe daily caps.
5. **Runbook** for pausing campaigns instantly.

## Architecture at a glance

| Stage | Role | Stack |
|-------|------|-------|
| Intake | Targets | CSV/API |
| Enrich | Identity | Apollo/Lusha-class |
| Research | Context | LLM + HTTP |
| Compose | Email | GPT-class |
| Queue | Pacing | **BullMQ** |
| Store | Truth | **Supabase** |
| Learn | Angles | Human-approved weighting |

## End-to-end execution flow

1. **Import** leads; normalize domain + persona key.
2. **Skip** if unsubscribed or competitor domain in blocklist.
3. **Enrich** missing emails/titles; abort if cannot compliant-find address.
4. **Research** 3 bullets from public pages/news; refuse if empty.
5. **Draft** email ≤ 120 words with CTA; run profanity/spam heuristic linter.
6. **Enqueue** with randomized jitter; record attempt ids.
7. **Ingest** webhook events; tag replies for weekly review.

## Deliverability and observability (the real product)

Foundation work means your operators can answer: **what sent, to whom, with which template version, and what bounced.** Wire **event webhooks** (or polling) from your ESP into the same Supabase `sends` / `events` shape so reply tagging is not a separate spreadsheet cult. Track **hard vs soft bounces** and auto-pause lanes when thresholds trip. For AIO/SEO-facing docs, the honest headline is **controlled throughput + logged outcomes**—not guaranteed reply rates.

## Queues, idempotency, and campaign keys

**BullMQ** (or equivalent) owns pacing: jitter between messages, per-domain caps, and “do not send twice” enforced by a stable key (`campaign_id + lead_id + message_variant`). Retries belong in the queue layer with visibility timeouts, not infinite `setTimeout` chains. If you later add **n8n** for ops playbooks (pause campaign, inject suppression CSV), treat it as orchestration around the same APIs—single source of truth stays Postgres/Supabase.

## Stack, APIs, and orchestration

- **Node.js + TypeScript** workers + API surface; n8n optional for non-engineer playbooks against the same HTTP contract.
- **Supabase** (or any Postgres) for leads, events, and prompt version metadata—queryable, backup-friendly.
- **Structured LLM outputs** validated before enqueue so bad JSON never becomes a sent email.

## AI: where models help—and where they do not

**Research distillation + drafting.** **List purchasing legality** and **cold email policy** remain your counsel’s problem.

## Errors, retries, and human checkpoints

- **SMTP failures:** exponential backoff; alert if bounce % spikes.

## Security, privacy, and data boundaries

Store **minimal** PII; delete stale leads and suppression rows on a published TTL. Restrict service accounts so workers cannot export whole tables to Slack. OAuth/API keys for enrichment vendors live in a secrets store with rotation; never log full email bodies in application logs by default.

## Deployment and environments

- **Warmup domains** before high volume—document in handoff.

## Engagement models

- **Build + transfer** with training.
- **Managed outbound ops** retainer.

## Spray automation vs v1 architecture

| Dimension | Spray | v1 |
|-----------|-------|-----|
| Personalization | Fake | Evidence-capped |
| Deliverability | Risky | Paced |
| Learning | None | Tagged replies |
| Engineering | Cheap scripts | Observable system |

## Frequently asked questions

### Expected performance?

**Highly variable by list quality and offer—**we benchmark after controlled pilots; I do not quote universal reply rates.

### LinkedIn automation?

**Out of scope for v1**—different risk profile.

### CRM instead of Supabase?

**Port schema** to Postgres-compatible CRM facades or sync via HTTP.

### Multichannel later?

**Architected as modules**; start email-stable first.

### GDPR implications?

**Legal review required** for EU leads; tooling supports suppression flags.

### Human approvals?

**Toggle** `requires_approval` per campaign batch.

## Next step

**[Book an AI automation strategy call](https://williamspurlock.com/contact)** with a 50-row pilot list and your offer—I’ll tell you if email is even the right channel before we talk agents.
