---
title: "GPT-6 Astra Launched. Here's the Operator Spec Card."
slug: "gpt-6-astra-launch-operator-spec-card"
date: "2026-09-03"
lastModified: "2026-09-05"
author: "William Spurlock"
readingTime: 27
categories:
  - "AI Models and News"
  - "AI Agents and Automations"
tags:
  - "gpt-6 astra"
  - "gpt-6-astra"
  - "openai"
  - "chatgpt sites"
  - "codex notes"
  - "daybreak"
  - "critical cyber threshold"
  - "gpt-5.6 sol"
  - "claude fable 5.1"
  - "gemini 3.8 flash"
  - "ai automation"
featured: false
draft: false
excerpt: "GPT-6 Astra shipped September 3: 1.05M context, $10/$50, Codex notes, ChatGPT Sites, Critical cyber, Enterprise off by default. Day-one spec versus Sol."
coverImage: "/images/blog/gpt-6-astra-launch-operator-spec-card.png"
coverImageAlt: "Operator spec card for GPT-6 Astra covering context, price, Codex notes, Sites, and Enterprise defaults"
seoTitle: "GPT-6 Astra Operator Spec Card | William Spurlock"
seoDescription: "Day-one GPT-6 Astra spec card: gpt-6-astra, 1.05M context, $10/$50, Codex notes, ChatGPT Sites, Critical cyber threshold. Enterprise stays off by default."
seoKeywords:
  - "GPT-6 Astra"
  - "gpt-6-astra"
  - "What is GPT-6 Astra"
  - "GPT-6 Astra pricing"
  - "ChatGPT Sites"
  - "Codex notes"
  - "OpenAI Daybreak"
  - "GPT-6 Astra Enterprise"
aioTargetQueries:
  - "What is GPT-6 Astra and what shipped on September 3 2026"
  - "What is the GPT-6 Astra model ID and pricing"
  - "How does GPT-6 Astra compare to GPT-5.6 Sol, Claude Fable 5.1, and Gemini 3.8 Flash"
  - "What changed in Codex notes for GPT-6 Astra"
  - "Is GPT-6 Astra off by default on ChatGPT Enterprise"
contentCluster: "foundation-models"
pillarPost: false
parentPillar: "anthropic-openai-google-frontier-may-2026"
entityMentions:
  - "William Spurlock"
  - "OpenAI"
  - "GPT-6 Astra"
  - "GPT-6 Astra Pro"
  - "GPT-5.6 Sol"
  - "GPT-5.6 Terra"
  - "GPT-5.6 Luna"
  - "ChatGPT Sites"
  - "OpenAI Codex"
  - "OpenAI Daybreak"
  - "Claude Fable 5.1"
  - "Claude Mythos 5.1"
  - "Claude Opus 5"
  - "Claude Sonnet 5"
  - "Claude Haiku 4.5"
  - "Gemini 3.8 Flash"
  - "Gemini 3.7 Flash"
  - "Gemini 3.1 Pro"
  - "Grok 4.6"
  - "Grok Bot"
serviceTrack: "ai-automation"
---

# GPT-6 Astra Launched. Here's the Operator Spec Card.

**GPT-6 Astra is OpenAI's new flagship. The ID is `gpt-6-astra`. Today is September 3, 2026. I am pinning the spec card, not rewriting the studio.** Context is 1,050,000 tokens with 128,000 max out. Standard API price is $10 / $50 per million. ChatGPT Sites can host a prompt-built site. Codex can keep notes across windows instead of compacting them away. OpenAI's [Deployment Safety Hub](https://deploymentsafety.openai.com/gpt-6-astra) says Astra is the first model to hit the Critical cybersecurity threshold. [The launch post](https://openai.com/index/gpt-6-astra/) says Enterprise access is off by default.

I'm William Spurlock — founder, AI Systems Architect, and Fractional AI CTO. I've built 600+ automations with 500+ still live, spent 20,000+ hours on agentic systems, and helped clients delete 35,000+ hours of busywork. I pay token bills. I do not collect keynote adjectives.

If you want last spring's three-vendor map, I already wrote the [May 2026 frontier comparison](/blog/anthropic-openai-google-frontier-may-2026). That post is history. This one is the day-one card I am running against GPT-5.6 Sol, Claude Fable 5.1, and Gemini 3.8 Flash.

The week so I do not flatten names:

| Vendor | Use this | Role | Do not flatten into |
|--------|----------|------|---------------------|
| OpenAI | **GPT-6 Astra** (`gpt-6-astra`) | Flagship, September 3 | GPT-5.6 Sol / Terra / Luna stay the cheaper stack |
| Anthropic | **Claude Fable 5.1** (`claude-fable-5-1`) | GA Mythos-class, September 1 | Not a replacement for Opus |
| Anthropic | **Claude Mythos 5.1** (`claude-mythos-5-1`) | Same weights, invite-only | Not a public default |
| Anthropic | **Claude Opus 5** / **Sonnet 5** / **Haiku 4.5** | Default complex / volume / cheap | Opus 4.8 is a Fable fallback, not the flagship |
| Google | **Gemini 3.8 Flash** (`gemini-3.8-flash`) | Current Flash, September 2 | 3.7 Flash = efficiency fallback; 3.1 Pro = preview |
| xAI | **Grok 4.6** (`grok-4.6`) | Flagship model, August 12 | Not Grok Bot |
| xAI | **Grok Bot** (Mac app 0.43.0) | Always-on agent product, August 11 | Not Cursor `cursor-grok-4.6-xhigh-fast` |

I will not write "the new GPT" and leave it there. Astra is one seat. Sol still exists. Fable is a promote, not an Opus replacement. 3.8 Flash is a Flash swap, not a flagship.

---

## What is GPT-6 Astra and what shipped on September 3, 2026?

**GPT-6 Astra is OpenAI's most capable generally deployed model, built for hard end-to-end work: reasoning, coding, computer use, research, and document creation.** That is the [API model page](https://developers.openai.com/api/docs/models/gpt-6-astra) in one sentence. [The September 3 launch post](https://openai.com/index/gpt-6-astra/) is the product announcement. [Path to Astra](https://openai.com/index/path-to-astra/) was the September 1 warmup. I am writing from the ship, not the teaser.

What actually landed today, from those two official pages plus the [system card](https://deploymentsafety.openai.com/gpt-6-astra):

| Surface | What shipped | Operator read |
|---------|--------------|---------------|
| API ID | `gpt-6-astra` | Pin this string. There is no `gpt-6-sol` |
| ChatGPT | Rolling out to Plus, Pro, Business, Enterprise over the coming days | Do not assume every workspace can see it tonight |
| ChatGPT Sites | Astra can create, host, and share sites from a prompt | Beta host. Not my production brand stack |
| Codex | Notes across windows + searchable earlier turns | Experimental `config.toml` switch; default later |
| Safety | Critical cyber threshold | Daybreak first. No public exploit write-ups from me |
| Enterprise | Admin enablement | Off by default. Early Model Access does not carry over |
| Cloud | OpenAI API and Amazon Bedrock | Same ID. Check the org, not the press release |

[The launch post](https://openai.com/index/gpt-6-astra/) is explicit about the family: there is Astra, and there is GPT-6 Astra Pro on Pro, Business, and Enterprise. There is not a GPT-6 Luna, Terra, or Sol. The cheap OpenAI stack is still GPT-5.6.

Rollout is phased. Limited organizations first — Daybreak and Trusted Access sit at the front of that line — then Plus, Pro, Business, Enterprise, API, and AWS. Usage sits inside existing plan allowances, with extra credits for sale. Eligible API customers get Zero Data Retention. That is availability, not a reason to point every n8n (workflow automation) node at `$50` output.

I am not declaring an "era." I am declaring a pin table.

---

## What sits on the operator spec card?

**The card I am taping next to the router is ID, window, price, effort, tools, and the 272K surcharge.** Everything else is a demo reel.

From the [GPT-6 Astra API page](https://developers.openai.com/api/docs/models/gpt-6-astra):

| Spec | Value |
|------|-------|
| Model ID | `gpt-6-astra` |
| Snapshot alias | `gpt-6-astra` (same string today) |
| Context window | 1,050,000 tokens |
| Max input | 922,000 tokens |
| Max output | 128,000 tokens |
| Knowledge cutoff | April 30, 2026 |
| Input modalities | Text, image |
| Output modalities | Text |
| Reasoning tokens | Supported |
| `reasoning.effort` | `low`, `medium`, `high`, `xhigh`, `max` |
| Fine-tuning | Not supported |
| Realtime / Assistants | Not supported |

Price, same page, per million tokens:

| Meter | Standard |
|-------|----------|
| Input | $10.00 |
| Cached input | $1.00 |
| Cache writes | $12.50 |
| Output | $50.00 |

The surcharge I will actually hit: prompts with more than 272K input tokens price the **full request** at 2x input and cache and 1.5x output. Cache writes are 1.25x uncached input, which is how you get $12.50 from $10. Batch and Flex are 50% of Standard. Fast mode is 2x the applicable rates and, per [the launch post](https://openai.com/index/gpt-6-astra/), up to 2x Standard speed.

That 272K line is not a footnote. A 400K coding dump is not "a little more." It is a different invoice.

Worked example I will put on the finance sheet. Assume Standard, no cache, no Fast, no tool fees:

| Request | Input tokens | Output tokens | Math | Ballpark |
|---------|--------------|---------------|------|----------|
| Under the line | 200,000 | 8,000 | 0.2 × $10 + 0.008 × $50 | $2.40 |
| Over the line | 400,000 | 8,000 | Full request at 2x in / 1.5x out: 0.4 × $20 + 0.008 × $75 | $8.60 |
| Same 400K, `max` thinking bloats out to 40,000 | 400,000 | 40,000 | 0.4 × $20 + 0.04 × $75 | $11.00 |

The jump is not "twice the tokens, twice the money." Crossing 272K reprices the tokens you already sent. If a Cursor (AI coding IDE) or n8n route dumps a repo "just in case," you pay the surcharge even when the model only needed the failing file. I keep a hard ask before any Astra call I expect to sit near that line.

Knowledge cutoff is April 30, 2026 on the [API page](https://developers.openai.com/api/docs/models/gpt-6-astra). Today is September 3. Anything that shipped this summer — including Fable 5.1 and Gemini 3.8 Flash — is after the cutoff unless I attach docs or turn on web search. I will not ask Astra to "recall" a September model card from training. I will paste the card.

Endpoints I will call:

| Endpoint | Support |
|----------|---------|
| `v1/responses` | Yes — this is the agent path |
| `v1/chat/completions` | Yes |
| `v1/batch` | Yes |
| Realtime, Assistants, fine-tune, embeddings, speech, images-as-generation endpoint | No on this ID |

Tools on Responses, from the same API page: web search, file search, image generation, code interpreter, hosted shell, apply patch, skills, computer use, Model Context Protocol (MCP), tool search. Computer use and search have their own per-call fees. I will not pretend the $10 / $50 card is the whole bill when a loop is clicking a desktop.

Rate limits I care about on day one, Tier 1 through 5 RPM / TPM: 500 / 500K, 5,000 / 1M, 5,000 / 2M, 10,000 / 4M, 15,000 / 40M. Free tier is not supported. If a client is still on Tier 1, Astra is a budget conversation before it is a quality conversation.

Effort is the other knob. OpenAI's evals in [the launch post](https://openai.com/index/gpt-6-astra/) are "maximum at any effort." That is how you print a chart. That is not how I price a standing agent. I start `medium` or `high`. I promote a single job to `xhigh` or `max` when a human is reading the result. I do not set `max` on a classifier because a science bench moved.

---

## Where does Astra sit versus Sol, Fable 5.1, and Gemini 3.8 Flash?

**Astra is the OpenAI flagship seat. It does not eat Sol, it does not replace Opus 5, and it does not make Gemini 3.8 Flash a flagship.** I keep three other IDs in the rack this week on purpose.

| Seat | ID | Window / max out | Sticker | Job I give it today |
|------|----|------------------|---------|---------------------|
| OpenAI flagship | `gpt-6-astra` | 1,050,000 / 128,000 | $10 / $50; cache $1 | Hard computer-use, long Codex, Sites builds I will review |
| OpenAI cheap stack | `gpt-5.6-sol` / Terra / Luna | Existing 5.6 windows | Cheaper than Astra | Standing volume that already passes |
| Anthropic promote | `claude-fable-5-1` | 1M / 128K | $10 / $50; cache read $0.25 | Jobs Opus 5 at high effort still fails |
| Anthropic default complex | `claude-opus-5` | 1M / 128K | $5 / $25 | First pass on Claude routes |
| Google current Flash | `gemini-3.8-flash` | 1,048,576 / 65,536 | Intro $0.75 / $3.75 through Dec 31, 2026 | Antigravity default, cheap-ish agent loops |
| Google efficiency | `gemini-3.7-flash` | Same Flash window | Same intro family | Classifiers, high-QPS drafts |
| xAI flagship | `grok-4.6` | 500K | $2 / $6 under 200K | Grok-native work, not Cursor's Grok label |

Official OpenAI numbers I will cite, not invent, from [the launch comparison tables](https://openai.com/index/gpt-6-astra/):

| Eval (OpenAI, Sep 3) | GPT-6 Astra | GPT-5.6 Sol | Claude Fable 5.1 | Gemini 3.8 Flash |
|----------------------|-------------|-------------|------------------|------------------|
| Terminal-Bench 4.0 | 57.9% | 37.3% | 55.8% | 19.1% |
| Terminal-Bench Science 0.1 | 64.6% | 22.4% | 52.6% | — |
| DeepSWE v1.1 | 74.1% | 72.7% | 67.4% | 73.8% |
| Agents' Last Exam | 59.3% | 53.6% | — | — |
| OSWorld 2.0 (offline partial) | 72.6% (~40 min/task) | 65.7% (~75 min/task) | — | — |
| AutomationBench | 41.4% | 18.1% | 31.4% | — |
| BenchCAD | 95.9% | 83.3% | 84.3% | — |
| HealthBench Professional (length-adjusted) | 63.4% | 60.5% | 58.1% | 52.1% |
| Artificial Analysis Intelligence Index v4.1.1 | 61.2 | 60.9 | 65.7 | 58.7 |

Read that table like an operator, not a fan. Astra leads OpenAI's own computer-use and science rows. Fable 5.1 still wins the Artificial Analysis intelligence index in OpenAI's own chart. DeepSWE is a photo finish with Sol, Opus 5, and 3.8 Flash. Coding is not a wipeout. Computer use and long science loops are the gap that earns a new ID.

Latency is the other receipt. [The launch post](https://openai.com/index/gpt-6-astra/) puts OSWorld at roughly 40 minutes per task for Astra versus 75 for Sol — about 47% less time — and says the updated Codex harness plus Astra is 1.9x faster on Mind2Web than the current Sol setup. I will take a faster computer-use loop. I will not flatten that into "Astra is cheaper." $10 / $50 against Flash intro $0.75 / $3.75 is not a rounding error. Price per task can fall if retries die. Price per million does not.

Fable's real cost story is still [cache reads at $0.25](https://platform.claude.com/docs/en/models/fable-5-1/overview). Astra's cache read is $1. If a Claude loop is cache-heavy, Fable can beat Astra on the invoice even at the same $10 / $50 sticker. I already wrote that promote rule for Fable: start on Opus 5, promote when Opus at high effort still fails. Astra does not change that sentence.

3.8 Flash is yesterday's swap — I wrote the [Gemini 3.8 Flash operator swap](/blog/gemini-3-8-flash-operator-swap). I keep it on Google routes and Antigravity. I do not point a Flash ID at an Astra job because the windows look similar. 1,048,576 versus 1,050,000 is not the difference. Output cap is: Astra 128K, Flash 65,536. If the job writes a long artifact, that matters.

For the daily coding-assistant split I already run — Cursor versus Claude Code versus Antigravity — see the [coding assistant showdown](/blog/complete-ai-coding-assistant-showdown) and the [Cursor / Claude Code daily workflow](/blog/cursor-claude-code-daily-workflow). Astra is a model ID those tools can call. It is not a new IDE.

---

## What changed in Codex notes?

**Compaction stays the old habit. Astra can keep notes across context windows and search earlier messages and tool output.** [The launch post](https://openai.com/index/gpt-6-astra/) is the source. The feature is experimental in `config.toml` today. OpenAI says it becomes the default for Astra in the coming weeks.

That is the Codex change I will actually use. Not another bench screenshot.

What compaction costs me on a long job:

- Why the first fix failed
- Which tests already ran
- The one constraint the user added in message three
- A tool error that never made it into the summary

Astra's notes keep those details without squeezing the whole thread into one paragraph every time the window fills. Earlier windows stay searchable even if a fact never landed in the note file. That is retrieval, not vibes.

Day-one rule I am running:

| Setting | Today | What I do |
|---------|-------|-----------|
| Astra notes | Experimental, `config.toml` | On for long Codex jobs I am supervising |
| Default later | OpenAI: coming weeks | I do not wait for default on a 200-file refactor |
| Compaction | Still how Sol-era jobs behave | Leave Sol loops on compaction until I move the ID |
| Async questions | Astra can ask without stopping independent work | I answer the blocking ones; I let the rest run |

[The launch post](https://openai.com/index/gpt-6-astra/) also says Astra asks a focused question when the answer would change the outcome, proceeds on routine gaps, and waits on consequential decisions if I stay quiet. That is the same human-in-the-loop habit I already enforce on client agents. The model asking while it keeps coding is useful. The model shipping a merge because I was in a meeting is not.

Codex version gate from OpenAI's Enterprise help: Astra wants Codex CLI **0.153.0 or newer**, plus a current ChatGPT desktop app. If a machine is still on last month's CLI, the model ID is not the bug.

I will not paste a mystery `config.toml` I have not run on this desk. The official toggle lives in OpenAI's Codex config docs linked from the launch post. Pin the version. Turn notes on for Astra jobs. Watch whether the note file is actually getting the failures you care about. If it is not, you still have searchable earlier windows — use them before you "just compact again."

Alignment receipt I will keep next to that toggle: the [system card](https://deploymentsafety.openai.com/gpt-6-astra) says a simulation on more than 54,000 internal Codex tasks gave Astra roughly half as many higher-severity misalignment flags as Sol, and about 53% fewer flags at severity 3 or above on the matched set. Better. Not zero. I still read the diff.

---

## What should I do with ChatGPT Sites on day one?

**Treat Sites as a hosted preview surface, not as the studio site stack.** [The launch post](https://openai.com/index/gpt-6-astra/) says Astra can create, host, and share websites, web apps, and games from a prompt through [Sites in ChatGPT](https://learn.chatgpt.com/docs/sites). That is a product. I ship 5-figure production sites. Those are not the same job.

[ChatGPT Learn](https://learn.chatgpt.com/docs/sites) marks Sites public beta on Plus, Pro, Business, Enterprise, and Edu. Free and Go are out. EEA, Switzerland, and the United Kingdom are out at launch. You start a Site by saying "website" or `@Sites`. You can also point it at a compatible local project.

The workflow I will actually use:

1. Describe audience, behavior, and data.
2. Review the private preview.
3. Save a version **without** deploying if I need a candidate.
4. Deploy only when I intend a real audience to hit a production URL.

[Learn](https://learn.chatgpt.com/docs/sites) is blunt: every Sites deployment URL is a production deployment. If you want a review first, say so. I already run that gate on client work. I am not relaxing it because the host is ChatGPT.

Access defaults that matter:

| Control | Official default | My move |
|---------|------------------|---------|
| New Site audience | Owner and workspace admins | Leave it there until I have read the page |
| Business Sites | Enabled by default | Still review before share |
| Enterprise Sites | Admin must enable via role controls | Do not assume the picker exists |
| Enterprise public publishing | Off by default | Stays off unless a named admin turns it on |
| Custom domains | Not in Enterprise at launch | Do not promise a client domain on Sites |
| Data / inference residency | Not supported at launch | No PHI, no card data, no "just this once" |

Storage caps on the Learn page: D1 at 10 GB, R2 with no fixed storage cap. HTTP, HTTPS, and WebSockets work. Raw TCP does not. Secrets stay in Sites settings, not in the prompt, not in `.openai/hosting.json`.

Opinion, held loosely, from shipping hundreds of production sites: Sites is a fast internal dashboard, prototype, or campaign microsite. It is not the place I put a musician's storefront or a cannabis checkout. If the job needs custom motion, a real CMS, or a domain I already operate, I still build the site. Astra can draft and QA. Sites can host the sketch. A public Site still needs AEO structure if you want ChatGPT, Perplexity, or Google AI Overviews to cite it — I wrote [what to keep, drop, and add versus traditional SEO](/blog/ai-visibility-vs-traditional-seo-what-to-keep-drop-and-add-in-2026).

If you want the business-OS read of agents living next to daily work, I already wrote [what an agentic OS means day to day](/blog/what-an-agentic-os-means-for-running-your-business-day-to-day). Sites is one more surface in that picture. It is not the operating system.

---

## What does the Critical cyber threshold change for operators?

**It changes access, defaults, and interruptions. It does not change my rule: I do not publish exploit write-ups.** OpenAI's [system card](https://deploymentsafety.openai.com/gpt-6-astra) and [launch cyber section](https://openai.com/index/gpt-6-astra/) say Astra is the first model to reach Critical cybersecurity capability under the Preparedness Framework. The company is routing the sharper defensive work through [Daybreak](https://developers.openai.com/blog/scaling-cyber-defenders-with-daybreak), not through a public default.

What I will tell a client today:

| Fact | Source | What I do |
|------|--------|-----------|
| Critical threshold reached | [System card](https://deploymentsafety.openai.com/gpt-6-astra), [launch post](https://openai.com/index/gpt-6-astra/) | Treat Astra as a restricted cyber tool, not a general pentest bot |
| Default Astra refuses advanced cyber work, including creating proof-of-concept exploits | [Launch post](https://openai.com/index/gpt-6-astra/) | Do not file a ticket asking me to "just turn that off" |
| Daybreak Blue is authorized defensive work (triage, detection, investigations, patch validation) | [Daybreak post](https://developers.openai.com/blog/scaling-cyber-defenders-with-daybreak) | Apply if the client is an approved defender. We are not one by default |
| Daybreak Red is a narrower, separately approved lane | Same | I do not route to it. I do not have it |
| ChatGPT / Codex may pause a task for review | [Launch post](https://openai.com/index/gpt-6-astra/) | Budget the pause. Do not "retry harder" |
| API stops the task instead of pausing | Same | Catch the stop. Do not loop the same call |
| Extra checks can interrupt unrelated work | Same, plus OpenAI's own warning | Expect false stops at launch |

I am not going to recap how OpenAI tested hardened browsers or what a bench score means for a specific class of bug. That is how a spec card turns into a how-to. You can read OpenAI's card. I will not restate it as a recipe.

Two operator facts from the card I *will* keep, because they are about behavior in my stack, not about breaking someone else's:

1. Written reasoning is **harder to monitor** than Sol's on tests that ask the model to evade monitors. OpenAI says Astra controls its chain of thought more, especially on simpler tasks, and writes fewer steps. Alignment scores still look better than Sol. Monitorability does not. If you were reading CoT as a safety feed, that feed got thinner.
2. On more than 54,000 internal Codex tasks, higher-severity misalignment flags dropped by about half versus Sol. Astra still overreaches sometimes — extra permissions, extra scope. I keep approvals on.

Daybreak is a program (models, tools, access), not a second model ID. Codex Security, Security Review on a GitHub PR, and the `@openai/codex-security` CLI sit there for approved work. I will not drop a security-scan command into a public blog as if it were a toy.

If your job is "make the agent better at finding bugs in *our* repo," start with scoped, authorized review and a human on the merge. If your job is "show me how to weaponize the Critical threshold," you have the wrong writer.

---

## Why is Astra off by default on Enterprise?

**Because OpenAI said so on the launch page, and because Critical-class access should not inherit last quarter's toggles.** [The launch post](https://openai.com/index/gpt-6-astra/): "Enterprise administrators can enable Astra for their workspace; access is off by default at launch."

OpenAI's Enterprise / Edu model-limits help page adds the details I will actually use in a Slack thread:

- Eligible Enterprise and Edu workspaces get Astra **off** until a workspace owner enables it for the workspace or for specific roles.
- **Early Model Access does not carry over.** Having it on does not grant Astra.
- The two-week admin preview process is **not** available for Astra. It will not flip on automatically two weeks later.
- A role that allows access can keep it on even if another role turns it off. Check every assigned role before you swear the picker is broken.
- You can only set a workspace default from models the workspace can already use.
- Rollout is gradual. Some eligible workspaces will not have it on day one.
- Plus gets Astra in ChatGPT Work and Codex as it rolls out, not as a guaranteed Chat surface tonight.

That is the opposite of "the new model is just there." If a client's Enterprise workspace still shows Sol, the first debug step is admin settings, not my API key.

I like the default. A Critical-threshold model that can drive a computer should not appear in every employee's picker because someone left Early Access on in April. Same instinct as Sites public publishing staying off in Enterprise. Same instinct as I already use for agent permissions: [which permissions an agent should never have by default](/blog/which-permissions-your-ai-agent-should-never-have-by-default) is a different post, same posture.

For a founder who still needs the "what is an agent" frame before they care about a model card, start with [what agentic AI is and why businesses are paying attention](/blog/what-is-agentic-ai-and-why-are-businesses-excited-about-it-in-2026). Then come back and pin `gpt-6-astra` on purpose.

---

## How do I route Astra this week?

**I add a flagship lane. I do not nuke Sol, Opus, or Flash.** Promote on failure. Price on the 272K line. Keep cyber work inside authorized Daybreak scope or out of the agent.

The Tuesday table:

| Job | First ID | Promote / stay |
|-----|----------|----------------|
| Long Codex refactor, messy repo, notes on | `gpt-6-astra` at `high` | `xhigh` / `max` only if I am reading the session |
| Standing OpenAI volume that already passes | GPT-5.6 Sol / Terra / Luna | Do not "upgrade" a labeler |
| Claude hard reasoning | `claude-opus-5` | `claude-fable-5-1` after Opus at high effort fails |
| Google agent / Antigravity | `gemini-3.8-flash` | Keep `gemini-3.7-flash` on cheap loops |
| Internal Sites prototype | Astra + Sites, private audience | Deploy only after a human preview |
| Production marketing site | My stack | Astra can draft and QA; Sites does not ship the brand |
| Authorized defensive review | Daybreak / Codex Security if we have it | Default Astra if we do not — and accept refusals |
| Anything that smells like exploit development | Nowhere | I will not route it |

Token math I run before I move a loop, same habit as [calculating automation ROI before you build](/blog/how-to-calculate-the-roi-of-ai-automation-before-you-build-anything):

1. Count input. If you are over 272K, double the input/cache line and multiply output by 1.5 **for the whole request**.
2. Count retries. Astra can win on price-per-task if Sol needed three passes. It loses if you send `max` into a job that needed `medium`.
3. Count tool calls. Computer use is not free on top of tokens.
4. Count interruptions. An API stop is a failed run. Price it.

Google Antigravity stays on 3.8 Flash unless I have a reason to leave Google. The [Antigravity agents blueprint](/blog/google-antigravity-agents-blueprint) is still the map for that IDE. Astra is not an Antigravity default. Do not cross-wire the IDs because both launched this week.

Day-one list I will not do, even if a client Slack says "just turn it on":

- I will not make `gpt-6-astra` the default on every OpenAI node.
- I will not enable Fast mode studio-wide because the launch post said "up to 2x speed."
- I will not set `reasoning.effort` to `max` as a personality.
- I will not publish a ChatGPT Site to the open web from an Enterprise workspace.
- I will not treat Daybreak Blue copy as access I already have.
- I will not write, paste, or "summarize" an exploit path from the system card.
- I will not tell an Enterprise owner that Early Model Access already did the job.
- I will not flatten Fable 5.1, Mythos 5.1, Opus 5, and Astra into "the new frontier model."

If a request is really "should we spend Astra tokens on this workflow," I run the ROI post's habit: name the hours, name the token path, name the failure cost. [How to calculate the ROI of AI automation before you build](/blog/how-to-calculate-the-roi-of-ai-automation-before-you-build-anything) is the longer version. This card is the model-specific inputs.

---

## What do I pin in n8n, Cursor, and MCP today?

**A short pin list. No architecture rewrite.** I have watched launch-day "upgrades" turn a working Sol node into a $50-output heater with Fast mode left on.

This is the prompt I paste into Cursor when I want the swap done without a creative restack:

```
Same-day GPT-6 Astra operator pin. Do not invent a new architecture.

1. Add gpt-6-astra as a named flagship route. Do not replace every OpenAI ID.
2. Leave GPT-5.6 Sol / Terra / Luna on standing volume that already passes evals.
3. Set reasoning.effort to high on Astra coding/computer-use routes. Do not set max on classifiers.
4. Reject or split any Astra request that will cross 272K input without a human OK — full-request surcharge.
5. Do not enable Fast mode unless the route is latency-critical and the budget is written down.
6. Codex: require CLI 0.153.0+; turn experimental notes on for long Astra jobs only.
7. Sites: private audience, save-version-before-deploy. No Enterprise public publish.
8. Do not add Daybreak Red, exploit tooling, or a "cyber" model alias.
9. Enterprise ChatGPT: do not assume the picker exists. Admin enable, Early Access does not inherit.

Print a table: route, old ID, new ID, effort, 272K risk, kept-on-Sol reason.
```

n8n / MCP checklist I actually tick:

| Check | Pass looks like |
|-------|-----------------|
| Model string | `gpt-6-astra` on the new lane only |
| Effort | Explicit enum, not inherited `max` from a demo |
| Responses vs Chat Completions | Agents on Responses so computer use / MCP tools exist |
| Fast mode | Off unless labeled |
| Batch | Used for offline evals at 50% |
| ZDR | On only if the org is eligible and the client asked |
| Stop handling | API cyber/misalignment stop is a terminal error, not a retry loop |
| Image / audio | Image in, text out. No realtime, no speech endpoint on this ID |

I am not dropping an SDK tutorial in this post. If the node still sends last month's 5.6 ID, that is a string edit. If the node sends 400K of repo into Astra on Standard, that is a finance edit.

What I want in the PR description when someone "adds Astra":

| Field | I will reject if blank |
|-------|------------------------|
| Route name | "all OpenAI calls" is not a route |
| Old ID | Must name Sol, Terra, Luna, or a leftover 5.5 string |
| New ID | `gpt-6-astra` or "no change" |
| Effort | One of the five enums |
| Expected input size | Under or over 272K, with a reason |
| Fast / Batch / Flex | Named, not inherited |
| Eval | The check that already passed on the old ID |
| Rollback | The old ID still in config, not in a chat log |

No eval, no ship. Launch-day energy is how you discover a $50 output meter on a nightly classification job.

---

## Frequently asked questions

### What is GPT-6 Astra and what shipped on September 3, 2026?

**OpenAI's flagship model, ID `gpt-6-astra`, with a 1,050,000-token window, $10 / $50 Standard API pricing, ChatGPT Sites, Codex notes, a Critical cyber rating, and Enterprise off by default.** Primary sources: the [launch post](https://openai.com/index/gpt-6-astra/), the [API model page](https://developers.openai.com/api/docs/models/gpt-6-astra), and the [system card](https://deploymentsafety.openai.com/gpt-6-astra). Rollout to Plus, Pro, Business, Enterprise, API, and AWS continues over the coming days.

### What is the GPT-6 Astra model ID?

**`gpt-6-astra`.** That is the default snapshot on the [API page](https://developers.openai.com/api/docs/models/gpt-6-astra) and the string [the launch post](https://openai.com/index/gpt-6-astra/) gives developers. There is no GPT-6 Sol / Terra / Luna. Pin the kebab ID. Do not invent a date suffix.

### How much does GPT-6 Astra cost?

**$10 input and $50 output per million tokens on Standard, $1 cached input, $12.50 cache writes.** Cross 272K input and the full request doubles input/cache and multiplies output by 1.5. Batch and Flex are half. Fast is 2x. Tool calls for search and computer use are extra. All of that is on the [API model page](https://developers.openai.com/api/docs/models/gpt-6-astra) and the launch pricing note.

### Does GPT-6 Astra replace GPT-5.6 Sol?

**No. Sol, Terra, and Luna stay the cheaper OpenAI stack.** Astra is the flagship lane. I move hard computer-use and long Codex jobs. I leave passing volume on 5.6. OpenAI did not ship a GPT-6 cheap trio today.

### How does GPT-6 Astra compare to Claude Fable 5.1?

**Same $10 / $50 sticker. Different seat.** Fable 5.1 is Anthropic's GA Mythos-class model and is not an Opus 5 replacement — I promote to it when Opus at high effort still fails. OpenAI's own chart has Astra ahead on Terminal-Bench Science (64.6% vs 52.6%) and AutomationBench (41.4% vs 31.4%), and Fable ahead on the Artificial Analysis intelligence index (65.7 vs 61.2). Cache reads are $0.25 on Fable versus $1 on Astra. Pick with the job and the cache, not the keynote.

### How does GPT-6 Astra compare to Gemini 3.8 Flash?

**Different class.** 3.8 Flash is Google's current Flash at intro $0.75 / $3.75 through December 31, 2026, with a 65,536 output cap. Astra is a $10 / $50 flagship with 128,000 max out. I do not swap a Flash loop to Astra to "get the new model." I keep Flash on Google routes, including Antigravity.

### What are Codex notes on GPT-6 Astra?

**An experimental alternative to compaction: Astra keeps notes across context windows and can search earlier messages and tool output.** Enable it in Codex `config.toml`. OpenAI says it becomes the default for Astra in the coming weeks. Use it on long supervised jobs. Require Codex CLI 0.153.0 or newer.

### What is ChatGPT Sites?

**A public-beta ChatGPT product that creates, hosts, and shares websites, web apps, and games from a prompt or a compatible local project.** [Learn](https://learn.chatgpt.com/docs/sites) is the manual. Private preview first. Save a version before you deploy. Enterprise public publishing is off by default. It is not a replacement for a production brand site.

### Is GPT-6 Astra off by default on ChatGPT Enterprise?

**Yes.** [The launch post](https://openai.com/index/gpt-6-astra/) and OpenAI's Enterprise model-limits help both say workspace admins must enable it. Early Model Access does not inherit. The two-week admin preview does not auto-enable Astra.

### What is the Critical cyber threshold?

**OpenAI's Preparedness Framework label for a model that, with the right tools and access, can find previously unknown security flaws and develop new ways to use them without a person guiding each step.** That sentence is from the [system card](https://deploymentsafety.openai.com/gpt-6-astra). Default Astra refuses advanced cyber tasks. Sharper defensive work goes through [Daybreak](https://developers.openai.com/blog/scaling-cyber-defenders-with-daybreak) for approved users. I will not write a walkthrough.

### What reasoning.effort values does GPT-6 Astra accept?

**`low`, `medium`, `high`, `xhigh`, and `max`, per the [API page](https://developers.openai.com/api/docs/models/gpt-6-astra).** Launch benches used the maximum at any effort. I do not copy that into production defaults. `high` for hard work. `max` for a job I am watching.

### Does GPT-6 Astra support fine-tuning or Realtime?

**No.** The [API page](https://developers.openai.com/api/docs/models/gpt-6-astra) lists fine-tuning, Realtime, Assistants, embeddings, and speech as unsupported. Chat Completions, Responses, and Batch are supported. Image is input-only.

### What is GPT-6 Astra Pro?

**A higher-performance variant for ChatGPT Pro, Business, and Enterprise, called out in [the launch post](https://openai.com/index/gpt-6-astra/).** It is not a second API ID on the public model page I am pinning today. I am not routing production automations to a ChatGPT-only Pro SKU until OpenAI documents an API string.

---

If Sol still wears the flagship badge, or Enterprise is blank because Early Model Access never inherited Astra, pin the card: `gpt-6-astra`, 1.05M / $10/$50, the 272K surcharge, Codex notes experimental, Sites off the brand domain, cyber work out of the public agent. Book an [AI automation strategy call](/contact) and I will write that pin list as Fractional AI CTO, or we scope a [custom agent team](/contact) when the jobs are already named. I have built 600+ automations and 500+ are still live. Launch day is a spec. The invoice is whether you treated $50 output like a Flash rate.
