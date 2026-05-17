---
title: "Slack Mention Analyst + Inbox Declutter"
slug: "slack-analyst"
type: "workflow"
description: "n8n-orchestrated Slack automation: mention events fetch thread context, LLMs summarize intent and urgency, optional web augmentation, and structured DMs plus task exports reduce notification debt."
image: "/projects/slack-analyst.png"
timeline: "1 Week"
featured: true
priority: 4
tags: ["Slack Automation", "Productivity", "NLP", "Task Management", "n8n", "LLM", "Tavily"]
features:
  - "Slack Events or Socket Mode ingestion for @mentions and high-signal channels with backoff handling."
  - "Thread backfill (configurable depth) so summaries reflect decision context, not the latest ping only."
  - "LLM classification: FYI vs action vs blocker with urgency heuristics from keywords and sender role."
  - "Optional search augmentation when a mention implies external fact-check (price, release, law)."
  - "DM payload includes three-line recap: situation, ask, deadline—optimized for mobile triage."
  - "Exports actionable rows to Todoist / Linear / Notion via HTTP nodes when your stack demands."
  - "Morning digest path aggregates unread patterns into a prioritized list instead of raw firehose."
seoTitle: "Slack Mention Automation: n8n + LLM Thread Summaries | William Spurlock"
seoDescription: "Productized workflow: Slack @mentions become structured briefings with optional research, task routing, and digest mode—built for teams drowning in channel context switching."
seoKeywords:
  - "Slack mention automation"
  - "n8n Slack workflow"
  - "LLM thread summary Slack"
  - "Slack inbox declutter AI"
  - "Socket Mode n8n"
  - "Slack events API automation"
  - "team notification triage"
  - "automated standup summary Slack"
  - "Tavily Serper research node"
  - "task export from Slack"
---

# Slack Mention Analyst: turn @mentions into decision-ready briefings

**This sellable workflow treats Slack as an event bus: when someone pulls you into a thread, n8n retrieves context, an LLM compresses it into a three-part briefing (situation / ask / deadline), and optional search tools answer factual questions before you waste twenty minutes scrolling.** Deeper digest mode batches overnight noise into a ranked list—useful for leaders who cannot live inside every channel.

## Who is this automation built for?

- **Managers and IC leads** who are @mentioned across product, sales, and incidents.
- **Founders** who need situational awareness without clicking fifty unread channels.
- **Ops teams** already standardized on Slack and willing to grant a bounded bot scope.

## What goes wrong when mention triage is fully manual?

- **Context cost:** You burn calendar time reproducing conversation state that already exists in plaintext.
- **Missed urgency:** A buried @mention in a busy channel behaves like a dropped ticket.
- **Research asymmetry:** Simple factual questions (“competitor pricing changed?”) spiral into ad-hoc browser tabs.

## What you receive at handoff

1. **n8n workflows** for mention path + optional digest path.
2. **Slack app manifest** notes: OAuth scopes, event subscriptions, Socket vs HTTP tradeoffs.
3. **Prompt pack** for classification labels your culture actually uses (not generic “sentiment”).
4. **Failure runbook**: thread too large, missing parent message, API 429.
5. **Data retention guidance** for what gets logged outside Slack.

## Architecture at a glance

| Layer | Role | Implementation |
|-------|------|----------------|
| Capture | Mention + thread IDs | Slack Events API / Socket Mode |
| Orchestration | Branch, store, retry | **n8n** |
| Context assembly | Historical messages | Slack Web API pagination |
| Reasoning | Summarize + classify | GPT-4o-mini class models or equivalent |
| Augment | External facts | Tavily / Serper HTTP nodes |
| Delivery | Human-readable | Slack DM blocks + optional task HTTP |

## End-to-end execution flow

1. **Event** arrives with `channel`, `thread_ts`, `user`.
2. **Fetch** parent + replies up to N configurable messages; truncate with summarizer if over token budget.
3. **Classify** mention intent: question, approval request, FYI, blocker—set routing.
4. **If factual:** run **search tool** with strict citation requirement; refuse if confidence low.
5. **Compose** DM using block kit or plain text depending on mobile friendliness target.
6. **Optional:** POST structured item to task system with dedupe key `thread_ts`.
7. **Log** execution id + token usage row for cost review.

## Stack, APIs, and orchestration

- **Slack** tokens in n8n credentials; use least-privilege bot user, not user tokens, in production.
- **n8n** centralizes retries; push Slack rate-limit handling into a sub-workflow.
- **LLM** choice trades cost vs latency—classification can stay on mini models; rare long threads may need a larger model once summarization runs.

## AI: where models help—and where they do not

**Models summarize and route.** **They do not** approve spend, merge code, or delete channels. Any “post reply on my behalf” path belongs behind explicit human confirmation in v1.

## Errors, retries, and human checkpoints

- **Pagination loop** caps: never infinite-fetch a viral thread.
- **429 handling:** honor `Retry-After`.
- **Fallback:** if summary fails, DM raw deep link to thread—better than silence.

## Security, privacy, and data boundaries

Slack content may include customer identifiers—**restrict log destinations**, encrypt at rest if persisting, and document retention for SOC2-minded buyers.

## Deployment and environments

- **Self-hosted n8n** recommended when Socket Mode long-lived connections matter.
- **Per-workspace** Slack apps for client isolation if you operate multi-tenant.

## Engagement models

- **Internal productivity build** with your workspace only.
- **Agency rollout** cloned per client with separate Slack apps and prompt packs.

## Manual vs automated mention triage

| Dimension | Manual browsing | Mention analyst |
|-----------|-----------------|-----------------|
| Context assembly | Slow, error-prone | Automated fetch + cap |
| Consistency | Mood-dependent | Prompt-governed |
| Research | Ad hoc tabs | Optional tool branch |
| Noise | High | Digest + classification |

## Frequently asked questions

### Will this violate Slack Acceptable Use?

**Not when used for authorized workspace automation with disclosed bots and scoped permissions.**

### Can it read DMs?

**Only if you explicitly scope DM events—most builds stay in public/private channels with policy review.**

### Does it replace project management tools?

**No—it feeds them.** Think intake, not replacement for Jira state machines.

### How are hallucinations handled on research questions?

**Require citations or attach “unverified” banner** in the DM template; low confidence → ask human.

### Can we run entirely on-prem?

**Orchestration can;** Slack cloud + LLM APIs still cross network boundaries unless you self-host models.

### What is a sensible thread depth default?

**20–40 messages** balances context with token cost; tune per workspace.

## Next step

**[Book an AI automation strategy call](https://williamspurlock.com/contact)** with your Slack workspace size and top three channels causing pain—I will map mention vs digest paths to your compliance reality.
