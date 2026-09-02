---
title: "When an AI Agent Pays for Itself — and When It Quietly Burns Cash"
slug: "when-an-ai-agent-pays-for-itself-and-when-it-quietly-burns-cash"
date: "2026-08-25"
lastModified: "2026-08-25"
author: "William Spurlock"
readingTime: 31
categories:
  - "AI Agents and Automations"
tags:
  - "ai agent roi"
  - "ai agent payback"
  - "agent token cost"
  - "ai agent retries"
  - "human in the loop cost"
  - "agent economics"
  - "claude sonnet 5"
  - "gpt-5.4 mini"
featured: false
draft: false
excerpt: "An AI agent pays for itself when recovered hours beat tokens, retries, babysitting, and cleanup. It burns cash when those hidden lines stay unmetered."
coverImage: "/images/blog/when-an-ai-agent-pays-for-itself-and-when-it-quietly-burns-cash.png"
seoTitle: "When an AI Agent Pays for Itself | William Spurlock"
seoDescription: "An AI agent pays for itself when recovered hours beat tokens, retries, babysitting, and cleanup. It burns cash when those hidden lines stay unmetered."
seoKeywords:
  - "when does an ai agent pay for itself"
  - "ai agent waste money"
  - "ai agent token cost"
  - "ai agent retry cost"
  - "human cleanup ai agent"
  - "ai agent babysitting hours"
  - "agent payback period"
  - "claude sonnet 5 vs opus 4.8 cost"
aioTargetQueries:
  - "When does an AI agent pay for itself and when does it waste money?"
  - "How is agent payback different from workflow automation ROI?"
  - "Where do tokens go on a live AI agent?"
  - "Why do retries and failed sends make an AI agent expensive?"
  - "How much does human cleanup after an AI agent cost?"
  - "Which AI agent jobs pay back in 30 to 90 days?"
  - "When should I shut off an AI agent?"
  - "How should I route models so an agent stays cheap?"
contentCluster: "agent-economics"
pillarPost: false
parentPillar: "how-to-calculate-the-roi-of-ai-automation-before-you-build-anything"
entityMentions:
  - "William Spurlock"
  - "n8n"
  - "Claude Opus 4.8"
  - "Claude Sonnet 5"
  - "GPT-5.5"
  - "GPT-5.4 mini"
  - "Gemini 3.1 Pro"
  - "Gemini 3.5 Flash"
  - "Llama 4"
  - "Anthropic"
  - "OpenAI"
  - "Google Gemini"
  - "Bureau of Labor Statistics"
  - "Model Context Protocol"
serviceTrack: "ai-automation"
---

# When an AI Agent Pays for Itself — and When It Quietly Burns Cash

**An AI agent pays for itself when the hours and errors it actually removes beat the full run cost: tokens, retries, failed sends, babysitting, and the human cleanup after a bad write.** If you only watch the API invoice, a losing agent looks cheap for months.

I am William Spurlock, an AI Solutions Architect and Fractional AI CTO. I have built **500+ automations**, spent **20,000+ hours** architecting agentic systems, and tracked **35,000+ hours saved for clients** — that last number is aggregate busywork deleted across the book of work, not my personal hours. I hold the Make.com AI Automation certifications and have worked directly with the n8n team. None of that lets me invent a client payback number for this post. I will not.

The Aug 16 pillar — [how to calculate the ROI of AI automation before you build anything](/blog/how-to-calculate-the-roi-of-ai-automation-before-you-build-anything) — owns the **workflow** spreadsheet: hours saved × loaded labor, minus stack, build, and maintenance. This spoke owns a different ledger. An agent is not a 12-node n8n graph with a fixed bill per execution. It is a model in a loop. Every tool call resends history. Every retry resends history plus the error. Every "I'll just check Slack" minute is labor you never put on the invoice.

If you still need the category definition, start with [what an AI agent is](/blog/what-is-an-ai-agent-a-business-owner-s-guide-to-autonomous-ai). If you already run ops agents, keep [AI agents for operations](/blog/ai-agents-for-operations-replacing-the-repetitive-tasks-that-drain-your-team) next to this page — that post is the job list. This one is the money test.

Vendor list prices move. Every dollar below is a **published rate I checked on August 25, 2026**, a **dated government series**, or a **hedged planning range**. Re-open the vendor page the week you budget.

---

## When does an AI agent pay for itself?

**An AI agent pays for itself when recovered labor and avoided misses exceed the run cost for 30 consecutive days, with retries and cleanup counted, and with a human still owning every irreversible send.** A pretty demo week does not count. A week where you babysit every draft does not count.

I use a four-part test. Fail any one and I treat the agent as a science project, not a cost center.

| Test | Pass | Fail |
|---|---|---|
| **Job shape** | Repeatable, bounded, measurable (inbox triage, lead draft, invoice chase, ticket label) | Open-ended "run the business" with no stop condition |
| **Write surface** | Drafts and read-only first; sends go through an approval queue | Live email, refunds, inventory, or payroll on day one |
| **Meter** | Tokens, tool calls, retries, failed sends, and babysitting minutes logged per run | You only see a monthly Anthropic / OpenAI / Gemini total |
| **Payback window** | Conservative hours × your loaded rate beat the full run cost inside 30–90 days | You need a heroic close rate or a made-up "AI value" line to make the math work |

A **run** is one goal → tool loop → done or killed. A **retry** is the same run going around again because a tool failed, JSON came back dirty, or the model decided to "try another search." **Babysitting** is the time you spend prompting, approving, rewriting, or explaining the agent to your team. **Cleanup** is the time after a bad send: apology, CRM repair, refund, or a founder hour on the phone.

I do not need a finance model with twelve tabs. I need those four lines for one job. If you cannot fill them, you do not have an agent project. You have a ChatGPT tab with extra steps.

The jobs that usually pass the test first are the same ones I ship as scoped workflows: inbound lead drafts, invoice reminders, support labels. See [the first AI automation every small business should build](/blog/the-first-ai-automation-every-small-business-should-build) and [manual workflows with the highest ROI when replaced by AI agents](/blog/manual-workflows-with-the-highest-roi-when-replaced-by-ai-agents). An overnight lead desk is a good example of a bounded send surface — [how to use an AI agent to handle inbound leads while you sleep](/blog/how-to-use-an-ai-agent-to-handle-inbound-leads-while-you-sleep) — as long as booking and pricing stay behind a human gate.

My opinion, held loosely: **most small shops should not start with an agent.** Start with a fixed workflow. Promote the step to an agent only when the input is messy language and the output is a draft you can reject in under a minute.

---

## How is agent payback different from a workflow ROI spreadsheet?

**A workflow ROI spreadsheet prices a known path. Agent payback prices a loop that can grow on every turn.** Same owner, same loaded rate, different unit. If you drop an agent into the Aug 16 worksheet and treat it like a Make scenario, you will undercount the bill and overcount the hours saved.

I am not going to retell that calculator here. Use it for n8n / Make / Zapier graphs with a trigger, a few modules, and a write-back. Use this page when the model chooses the next tool.

| Line | Workflow automation | Live agent |
|---|---|---|
| **Billing unit** | Execution, credit, or task | Tokens on every model call, plus tool I/O |
| **Cost shape** | Mostly flat per run | Grows as history, tool results, and retries pile up |
| **Failure mode** | A node errors; you see a red execution | A send looks "successful" and is wrong |
| **Human time** | Build + a few maint hours / month | Babysitting + cleanup on the fat-tail runs |
| **Kill switch** | Turn the workflow off | Need a token cap, a tool-call cap, *and* an approval gate |

The hidden difference is **replay**. A workflow pays once for the run. An agent pays again for the system prompt, the tool schemas, and every prior observation each time it thinks. Anthropic's own engineering write-up on their multi-agent research system (published June 13, 2025) is blunt about the economics: in their data, **agents typically use about 4× more tokens than chat, and multi-agent systems about 15× more than chats**, and they say the task has to be valuable enough to pay for that ([How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)). That is Anthropic's production research stack, not your inbox bot — treat the 4× / 15× as a warning, not a quote you put in a board deck as *your* multiplier.

What I actually put in an agent ledger that the workflow sheet does not have:

- **Tokens per run** (input + output + cache writes, not just "API this month")
- **Tool calls per run** and **repeat-read ratio** (same CRM record fetched three times)
- **Retry count** and **retry tokens** (history replay, not one extra completion)
- **Failed-send count** (wrong email, wrong Slack, wrong CRM field)
- **Babysitting minutes** (approve, rewrite, re-prompt)
- **Cleanup hours** (the Tuesday after a bad Friday send)

Skip those and your "ROI" is the subscription plus a vibe. Hiring-vs-stack cash still belongs in [what AI automation actually costs in 2026](/blog/what-does-ai-automation-actually-cost-a-realistic-breakdown-for-2026). This page is the agent-specific burn.

---

## Where do tokens actually go on a live agent?

**On a live agent, most of the bill is input you already paid for last turn: the system prompt, tool definitions, and the growing transcript — not the clever sentence at the end.** Output is visible. Replay is where the cash goes.

As of August 25, 2026, the list prices I use when I sketch a hot path (per million tokens, standard tier, before batch or cache discounts):

| Model | Job I give it | Input / MTok | Output / MTok | Source (checked Aug 25, 2026) |
|---|---|---|---|---|
| **Claude Sonnet 5** | Default agent loop, drafts, tool use | $2 | $10 | [Anthropic model pricing](https://platform.claude.com/docs/en/about-claude/pricing) |
| **Claude Opus 4.8** | Rare hard reasoning, ugly contracts | $5 | $25 | Same Anthropic page |
| **GPT-5.4 mini** | Labels, routing, high-volume sub-steps | $0.75 | $4.50 | [OpenAI GPT-5.4 mini](https://developers.openai.com/api/docs/models/gpt-5.4-mini) |
| **GPT-5.5** | Flagship OpenAI step, not the hot path | $5 | $30 | [OpenAI GPT-5.5](https://developers.openai.com/api/docs/models/gpt-5.5) |
| **Gemini 3.5 Flash** | Volume language jobs, grounded extract | $1.50 | $9 | [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) |
| **Gemini 3.1 Pro** | Harder reasoning when I want Google | $2 / $4 | $12 / $18 | $2/$12 at ≤200K input; $4/$18 above — [Google Cloud Agent Platform pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing) |
| **Llama 4** | Local / self-hosted batch if you already run the box | Infra + your time | Infra + your time | No API sticker; do not pretend it is free |

Anthropic's pricing page also states that the **$2 / $10 Sonnet 5 rate, first sold as an intro price through August 31, 2026, is now the standard price** and the planned September 1 jump to $3 / $15 will not happen ([same pricing page](https://platform.claude.com/docs/en/about-claude/pricing)). That is good news for a workhorse loop. It is not a reason to put Opus 4.8 on every form submit.

Where the tokens actually sit on a run I log:

| Bucket | What it is | Why it grows |
|---|---|---|
| **System + tools** | Instructions + every tool schema | MCP servers with fat descriptions can eat a five-figure token block before the user message. Anthropic's MCP code-execution note describes tool-definition bloat in the 150,000-token range collapsing to ~2,000 when the agent loads only what it needs ([Code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp), 2025). |
| **Transcript replay** | Prior thoughts + tool results | Each new call resends the pile. Ten steps is not 10× one step. |
| **Tool results** | CRM rows, PDFs, search dumps | A 2-hour call transcript pulled twice is 50,000 extra tokens in Anthropic's own MCP example on that same page. |
| **Output + "thinking"** | The visible answer | Usually the smallest slice unless you left reasoning maxed on a flagship model. |

A labeled planning example — **not a client result**. One inbound-lead agent, Claude Sonnet 5, 8 tool steps, ~4,000 new tokens of real work, ~28,000 tokens of replayed history by the last step. Rough input: 32,000 × $2 / 1M ≈ **$0.06**. Output: 1,200 × $10 / 1M ≈ **$0.01**. Call it **~$0.07** if the run is clean.

Same job on Claude Opus 4.8 is about **2.5× on input and 2.5× on output** at the published $5 / $25 vs $2 / $10. Same job with a retry that replays the full 32,000 is another $0.06+ before the model writes a word. Fifty clean runs a day is still pocket change. Fifty messy runs with three retries and a 40,000-token CRM dump is how a "cheap" agent becomes a $200 week you cannot explain.

If you wire tools through MCP, read [Model Context Protocol explained](/blog/model-context-protocol-mcp-explained-why-every-ai-agent-will-run-on-this) for the mechanism and keep the tool list short. More servers is not more value. It is more schema tax.

---

## Why do retries and failed sends turn a cheap agent into a money pit?

**Retries do not add one extra completion. They resend the whole transcript, then often take another tool swing, then fail the same way.** A failed send is worse: you pay the tokens *and* you pay a human to unsend the damage.

I watch two different failures. People mash them together and then wonder why the bill and the inbox both look cursed.

| Failure | What you see | What you pay |
|---|---|---|
| **Hard retry** | Tool 500, timeout, bad JSON, empty search | Tokens for the replayed history + the new attempt |
| **Soft loop** | Tool returns `{ "ok": true, "results": [] }` and the model tries again with a synonym | Same as a retry, except nothing is red in your logs |
| **Failed send** | Email / Slack / CRM write that went out wrong | Tokens + apology + CRM repair + trust |
| **Ghost success** | Execution marked success because HTTP was 200 | You think the agent is "working" while it writes garbage |

The mechanism is simple. Most agent frameworks retry by **replaying conversation history**, not by re-running the one broken step in a vacuum. Step 4 fails, and you pay for the system prompt, tools 1–3, and the error text again. A 20% miss rate on a 5-step agent is not a 20% surcharge. In my logs it often lands closer to **1.5×–2.5× tokens** on the messy days. That range is a **planning estimate** from how replay works, not a lab paper you should paste into a board deck.

Soft loops are the ones that quietly empty a budget. The model gets an empty result, assumes it searched wrong, searches again, and again. Nothing threw. The circuit never opened. Avraam Mavridis describes this as a semantic loop — same tool, same argument fingerprint, same empty result — and the transport breaker never trips because the HTTP layer is fine ([Agentic Patterns: Circuit breakers](https://www.avraam.dev/blog/agent-circuit-breaker)). I agree with the pattern even if you never read that post: **cap identical tool calls**, cap tokens per run, cap wall-clock.

Failed sends are where "quietly burns cash" stops being a metaphor.

| Miss | Token cost | Human cost I actually see |
|---|---|---|
| Wrong lead email | Pennies | 20–60 minutes rewriting, plus a colder lead |
| Duplicate invoice chase | Pennies | An annoyed customer and a collections mess |
| Bad CRM overwrite | Pennies | An hour reconstructing the record; sometimes a lost deal |
| Refund or inventory write | Pennies | Real money out the door |

I do not let an agent send on the first week. Draft only. Approval queue. That is slower. It is also how you avoid paying cleanup at a founder rate for a $0.08 run.

Kill rules I put in n8n / the agent loop before go-live:

- Max **N tool calls** per run (I often start at 8)
- Max **identical tool + args** (I start at 2)
- Max **tokens or USD** per run (a number you can defend in a cost review)
- **No send** if confidence is low or the tool result is empty
- Page a human, do not "try once more" into the void

If you cannot name those five, you do not have an agent. You have an unbounded tab.

---

## How much does human cleanup really cost?

**Human cleanup is usually the largest line on a losing agent, and it never appears on the model invoice.** Price it at a loaded hourly rate, not at "I just fixed it between meetings."

The U.S. Bureau of Labor Statistics [Employer Costs for Employee Compensation](https://www.bls.gov/news.release/ecec.nr0.htm) for **March 2026** puts **private-industry total compensation at $46.60 per hour worked** — $32.60 wages and $14.01 benefits. Sales-and-office loaded cost in the same ECEC occupational split sits lower than management; management, professional, and related is much higher ([ECEC Table 4](https://www.bls.gov/news.release/ecec.t04.htm), March 2026). Use **your** bookkeeper, VA, or founder rate. The BLS number is a dated public floor for "this hour was not free," not a quote for your shop.

| Cleanup event | Hours I plan (hedged) | At $46.60 (BLS private-industry, Mar 2026) | At $120 founder opportunity |
|---|---|---|---|
| Rewrite a bad outbound draft before it sends | 0.15–0.4 | ~$7–$19 | ~$18–$48 |
| Apology + correct a sent email | 0.5–1.5 | ~$23–$70 | ~$60–$180 |
| Rebuild a smashed CRM record | 0.75–2.0 | ~$35–$93 | ~$90–$240 |
| Customer call after a wrong invoice chase | 0.5–2.0 | ~$23–$93 | ~$60–$240 |
| Refund / inventory undo | 1.0–4.0 + cash | Labor plus the cash | Same, plus your night |

Those hour ranges are **planning estimates from jobs I have unwound**, not a guaranteed client case study. One ugly Friday can erase a month of token "savings."

The math that founders skip:

`Cleanup cost / month = (bad sends × hours each × loaded rate) + cash put back`

If an agent drafts 200 emails a month and 4% need a real repair at 45 minutes, that is 6 hours. At $46.60 you are at ~$280 of cleanup — already bigger than a workhorse model bill for the same volume. At a founder rate it is worse. The API invoice might still say $38.

I count a send as "bad" if a human had to touch the record after the fact. Tone edits in the approval queue are babysitting, not cleanup. Cleanup is the work after the write left the building.

Do not put "brand lift" in the savings column to offset this. If you need a fiction line to make the agent look profitable, the agent is not profitable.

---

## What babysitting hours never show up on the invoice?

**Babysitting is the standing labor of keeping the agent honest: prompt tweaks, approval clicks, "why did it do that" Slack, and the weekly log review.** If you do not meter it, you will swear the agent is free while you become its unpaid ops lead.

I split human time into three buckets so it does not all vanish into "I was already at the laptop."

| Bucket | What it is | Put it in the ledger? |
|---|---|---|
| **Build** | First prompts, tool wiring, test cases | Yes — amortize over the months you will keep the agent |
| **Babysitting** | Daily approve / reject, re-prompt, explain to staff | Yes — this is operating cost |
| **Cleanup** | After a bad write | Yes — this is the failure reserve you actually spend |

Babysitting that never hits the invoice:

- Re-reading every draft because you do not trust the agent yet (fair in week one; a smell in month three)
- Rewriting the system prompt every time a customer uses a new phrase
- Sitting in Slack answering "did the bot send this?"
- Re-running a job by hand when the tool auth expired
- Teaching a new hire the agent's quirks instead of documenting the kill switch

A labeled week — again, **not a client ROI**. Approval queue of 40 lead drafts. 45 seconds to accept, 4 minutes to rewrite. If 30% need a rewrite, that is 30 × 0.75 min + 10 × 4 min ≈ **62 minutes**. At $46.60 that is ~$48. At $120 it is ~$124. Add two 15-minute "the CRM field moved" fire drills and you have burned a token budget's worth of labor before the model bill shows up.

The pass test I use: **median approval time under 60 seconds by week three, and rewrite rate under 20%.** If you are still rewriting half the drafts, the agent is a fancy first-draft button. Keep it if the first draft still saves time. Do not call it autonomous.

If you are a solo operator, this labor is you. [Running a one-person business with AI](/blog/running-a-one-person-business-with-ai-the-stack-that-replaces-a-part-time-hire) is about replacing a part-time hire. This page is the warning: an agent that needs a part-time you to babysit it did not replace anyone. It changed the costume on the same hours.

---

## Which agent jobs pay back in the first 30 to 90 days?

**The jobs that pay back are narrow, high-frequency, and draft-first: the agent removes repeatable minutes without holding an irreversible pen.** I want volume you can count and a send I can block.

These are **planning cases**, not invoices and not named-client results. Hours are conservative. Model $ assumes a workhorse (Claude Sonnet 5, GPT-5.4 mini, or Gemini 3.5 Flash) on the hot path. Loaded rate in the "why it clears" column is illustrative — swap yours in.

| Job | Why it can pay | Silent-burn risk if you botch it | 30–90 day tell |
|---|---|---|---|
| **Inbox / lead triage + draft reply** | Same shape every day; human sends | Auto-send on day one; wrong offer in writing | Rewrite rate dropping; first-response time down |
| **Support ticket labels + suggested macros** | High volume, cheap model, human still replies | Agent closes tickets or refunds | Queue time down; reopen rate not up |
| **Invoice reminder drafts** | Recurring, templated, easy to meter | Chase the wrong invoice or a paid account | Days-sales-outstanding moves; complaint count stays flat |
| **Meeting-note → CRM fields (draft)** | Painful copy-paste; read-only source | Overwrite live fields without a diff | Minutes per meeting down; field-error rate < 2% |
| **Weekly ops digest from real systems** | Replaces a Monday status scramble | Digest invents numbers from a stale export | You stop building the slide by hand |
| **FAQ draft from your own docs** | Bounded corpus; easy reject | Agent answers from the open web | Edit time per draft keeps falling |

What those rows share:

- A **stop condition** (draft ready, label applied, digest sent to you)
- A **human gate** on anything a customer or a ledger will see
- A **log** of tokens, retries, and minutes

What I do not put in the 30-day payback column: "strategic advisor," "AI employee," "autonomous SDR that books itself," or anything that needs Claude Opus 4.8 or GPT-5.5 on every turn. Flagship is a scalpel. Volume is a workhorse.

If the work is already a clean field-to-field copy, skip the agent. A fixed n8n graph is cheaper. Agents earn their keep on messy language. Workflows earn theirs on structured clicks. That split is the whole point of [AI automation vs regular automation](/blog/the-difference-between-ai-automation-and-regular-automation-and-why-it-matters).

---

## Which agent jobs quietly lose money for months?

**The jobs that quietly lose money are unbounded, low-frequency, or allowed to write. They look impressive in a demo and then sit on a flagship model all month while you clean up the exceptions.** The invoice stays small enough that nobody investigates. The labor does not.

| Job | Why it looks smart | How it burns | Kill or shrink |
|---|---|---|---|
| **"AI employee" with Slack access and a smile** | Demo answers anything | Soft loops, tool-schema tax, founder Slack all day | Demote to one job with a cap |
| **Unbounded web research on every lead** | Feels thorough | Multi-step browse; Anthropic's 4× / 15× warning applies hard here | Cache a short dossier; do not re-research known accounts |
| **Flagship model on labels and routing** | "Best quality" | You pay Opus 4.8 / GPT-5.5 rates for work GPT-5.4 mini can do | Route the hot path down |
| **Auto-send sales email from a thin CRM** | Speed | Failed sends + cleanup at founder rate | Draft + approve; add a competitor/price gate |
| **Nightly "optimize the business" agent** | Strategy theater | Reads everything, writes a novel, no decision changes | Weekly digest, human picks one action |
| **Agent with 20 MCP servers attached** | "It can do anything" | Tool definitions eat the window before the user speaks | Three tools. Then five. Not twenty. |
| **Low-volume specialty work (one weird contract a month)** | Hard problem | Build + babysitting never amortize | Do it yourself or hire the hour |
| **Retry-with-no-cap into a flaky API** | "It will get it" | Replay tokens + duplicate writes | Circuit breaker, then page a human |

The pattern I keep seeing: the owner bought **autonomy** and received **a second inbox**. The agent produces work-shaped text. Someone still has to decide. That someone is you. If the decision time did not fall, you did not buy payback. You bought a content generator with API fees.

A quiet-burn smell test I run at 30 days:

- Token $ is "fine" but you cannot name tokens per successful job
- Retry rate is unknown
- Rewrite rate is still > 30%
- Someone on the team has a side ritual of "checking the bot"
- One bad send already happened and you called it a learning moment instead of a ledger line

If three of those are true, the agent is burning cash even if the card statement looks polite.

---

## How do I measure agent payback without a fake ROI slide?

**You measure agent payback as successful jobs minus full run cost, using logs you can audit on a Tuesday — not a vendor multiplier and not a story about "10x."** If a number has no source, it does not go in the ledger.

I keep one row per agent per week. That is the whole dashboard.

| Field | How I fill it | Cheat I reject |
|---|---|---|
| **Successful jobs** | Count of runs that hit the stop condition *and* needed no cleanup | Counting every execution as a win |
| **Hours returned** | Time study on 10 jobs, then × volume. Conservative. | "It feels like I got my mornings back" |
| **Token $** | Vendor usage export, split by agent / API key | One blended OpenAI bill for the whole company |
| **Retry $** | Tokens on runs with retry_count > 0 | Ignoring them because "that's just how agents work" |
| **Babysitting hours** | Timer or a tally in the approval tool | Founder time at $0 |
| **Cleanup hours + cash** | Ticket after each bad send | "We'll train it out" with no dollar |
| **Net** | `(hours × your loaded rate) − token − retry − babysitting − cleanup` | Adding "innovation value" |

Hours × rate is the same *idea* as the parent pillar. I am not pasting that worksheet. The extra columns are the point of this post.

A labeled arithmetic example you can replace — **not a client result**:

- 180 successful lead drafts in a month
- Time study: 4.0 minutes saved per draft after approval (you still spend 0.8 minutes approving)
- Hours returned: 180 × 4.0 / 60 = **12.0**
- Loaded rate: **$46.60** (BLS private-industry March 2026 — swap this)
- Labor value: ≈ **$559**
- Token $: **$42** (workhorse, logged)
- Babysitting beyond the 0.8 min already netted out: **1.5 hours** → ≈ $70
- Cleanup: one bad send, **1.0 hour** + $0 cash → ≈ $47
- **Net ≈ $559 − $42 − $70 − $47 = $400**

That agent is paying. Same shape with 6 minutes of rewrite per draft and three cleanup events is a different story. Do the second sheet. Do not ship the first sheet as if it were destiny.

Rules for the time study: watch the real queue, include the approval click, exclude wait time while you were in a meeting. If you cannot watch 10 jobs, you are not ready to claim hours.

I want a weekly digest more than a slide. Execution count, fail rate, token $, rewrite rate, cleanup events. If you cannot get that out of n8n or your agent host, you cannot defend the spend.

---

## When should I kill an agent instead of tuning it?

**Kill the agent when the job is wrong, the write surface is too hot, or two full prompt/tool passes did not move rewrite rate and retries.** Tuning a bad job is how silent burn becomes a personality trait.

I give a new agent **two weeks of draft-only** and **one more week of guarded sends** if the draft week was clean. After that I use a kill table, not hope.

| Signal (look at 14 days) | Tune once | Kill or demote |
|---|---|---|
| Rewrite rate | 20–35%, falling | Still > 40% after two prompt passes |
| Retry / soft-loop rate | < 10% of runs, and you added a cap | > 20% or uncapped identical tool calls |
| Cleanup events | Zero, or one with a patch | Two or more customer-facing misses |
| Babysitting | Falling toward < 1 hour / week | Still a daily ritual |
| Token $ / successful job | Stable or down | Climbing while volume is flat |
| Owner feeling | Mild annoyance | You dread the approval queue |

Demote means: strip tools, force a cheaper model, turn sends back to drafts, or replace the loop with a fixed workflow. Kill means: off. Export the logs. Keep the prompt in git if you want the scar tissue.

What I do **not** treat as a reason to keep it:

- "We already spent the build week"
- "The vendor said it learns"
- "Next month's model will fix it"
- "It's only $60 on the card" (while you spend four hours a week on it)

Sunk build hours are sunk. The parent pillar will tell you to amortize build over the life of a *working* workflow. An agent that fails the table above has no remaining life. Stop amortizing fiction.

If the job is still good and the agent is messy, I often win by deleting tools, not by adding a second agent. Two agents that retry each other's empty results is how you buy the 15× token world Anthropic warned about without getting the research benefit.

---

## How should I route models so the hot path stays cheap?

**Put a workhorse on the loop and a flagship on the exception. The hot path is labels, drafts, and tool choice. The exception is the one ugly document or the one send you cannot cheaply undo.** If every step is Claude Opus 4.8 or GPT-5.5, you are paying research-stack prices for inbox work.

Routing I use in August 2026. Re-check list prices the week you ship.

| Step | Default model | When I escalate | When I refuse |
|---|---|---|---|
| Classify / route / extract a field | GPT-5.4 mini or Gemini 3.5 Flash | Messy handwriting, mixed languages, legal-ish text | Flagship on every inbound email |
| Draft a reply in my voice | Claude Sonnet 5 | A high-value account or a complaint | Opus 4.8 for "thanks, we got your form" |
| Choose the next tool | Claude Sonnet 5 | Tool list is large *and* I already trimmed schemas | Adding more MCP servers instead of routing |
| Hard reasoning (contract clause, nasty edge) | Claude Opus 4.8, GPT-5.5, or Gemini 3.1 Pro | Once per run, after a cheap model flagged "unsure" | The whole loop |
| Local batch / private text | Llama 4 on a box you already operate | You have a person who can keep it up | "Free Llama" with no operator |

Price gaps that make this worth doing (standard list, Aug 25, 2026):

- Claude Sonnet 5 vs Claude Opus 4.8: **$2 / $10 vs $5 / $25** per MTok ([Anthropic](https://platform.claude.com/docs/en/about-claude/pricing))
- GPT-5.4 mini vs GPT-5.5: **$0.75 / $4.50 vs $5 / $30** ([OpenAI mini](https://developers.openai.com/api/docs/models/gpt-5.4-mini), [GPT-5.5](https://developers.openai.com/api/docs/models/gpt-5.5))
- Gemini 3.5 Flash vs Gemini 3.1 Pro (≤200K): **$1.50 / $9 vs $2 / $12** ([Gemini API](https://ai.google.dev/gemini-api/docs/pricing), [Google Cloud](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing))

A 5×–6× output gap on the OpenAI pair is not a rounding error when the agent retries. One flagship replay of a fat transcript can cost more than a hundred mini classifications.

Prompt caching helps when the system prompt and tool schemas are stable. Anthropic lists cache hits at **$0.20 / MTok** for Sonnet 5 and **$0.50 / MTok** for Opus 4.8 ([pricing page](https://platform.claude.com/docs/en/about-claude/pricing)). Cache writes cost extra. If you rewrite the system prompt every afternoon, you never stay warm.

Llama 4 is a cost cap, not a personality. If you do not already run inference, the "savings" show up as your weekend. I only put it in the model table for shops that already have the box.

My opinion: **Sonnet 5 or GPT-5.4 mini should be the default agent brain in 2026.** Escalate by policy, not by vibe. If you cannot write the policy in five lines, you will escalate everything.

---

## FAQ: Agent payback vs silent burn

### Is an AI agent cheaper than a part-time hire?

**Sometimes on the repeatable slice — never as a blanket swap for a person who handles exceptions.** BLS private-industry loaded cost was **$46.60 per hour** in March 2026 ([ECEC](https://www.bls.gov/news.release/ecec.nr0.htm)). A workhorse agent loop is usually tens of dollars of tokens plus your babysitting. If the hire's job is judgment and angry customers, keep the hire. If the hire's job is labeling tickets and drafting the same email, model the hours, then compare. I will not invent a payback month for your shop.

### How many tokens does a typical business agent burn per run?

**There is no honest single number. A clean 6–10 step inbox agent might sit in the low tens of thousands of tokens; a research-style loop can run far past that.** Anthropic reported that agents in their data used about **4× chat tokens**, and multi-agent systems about **15×** ([June 13, 2025](https://www.anthropic.com/engineering/multi-agent-research-system)). Log *your* p50 and p95 tokens per successful job for a week. Budget from the fat tail, not the pretty median.

### Should I put Claude Opus 4.8 on every step?

**No. Opus 4.8 is $5 / $25 per million tokens; Sonnet 5 is $2 / $10 as of August 25, 2026** ([Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)). I keep Opus 4.8, GPT-5.5, and Gemini 3.1 Pro for the rare hard step. Labels, routing, and most drafts stay on Sonnet 5, GPT-5.4 mini, or Gemini 3.5 Flash. Flagship-on-everything is how a "cheap" agent stops being cheap.

### What is a retry loop and why does it cost money?

**A retry loop is the agent calling the same tool, or the same goal, again after a miss — and paying to resend the whole transcript each time.** Soft loops are worse: the tool returns empty success and the model just tries a new query. Cap identical calls, cap tokens per run, and page a human. A 20% miss rate is not a 20% surcharge; replay makes it look more like a 1.5×–2.5× token day in my logs. That last bit is a planning estimate, not a universal constant.

### How do I know if my agent is failing silently?

**Look for success flags with empty results, climbing tokens at flat volume, and humans who "just check the bot."** HTTP 200 is not a business win. I want rewrite rate, retry count, cleanup events, and tokens per successful job in one weekly digest. If you only have a green execution list, you are flying on dashboard theater.

### Can I run agents on Llama 4 to cut cost?

**Yes, if you already operate the box and the job is batch / private text you can evaluate.** Llama 4 does not have a sticker like Sonnet 5. You pay GPU, electricity, and the person who keeps the process alive. For a 3-person shop with no inference habit, a workhorse API is usually cheaper than a new operations surface. Do not call local models free.

### What is a reasonable monthly model budget for one agent?

**I plan allowances, then replace them with a week of logs — often $25 / $60 / $120 per agent as a first sketch for small-volume workhorse loops.** High-volume support or anything that browses the web will blow that. Multi-agent research is a different sport; Anthropic's 15× note is the reason I do not put "research everything" on a $60 cap. If you cannot name the budget before go-live, you will discover it on the card.

### Do I count founder babysitting time as a cost?

**Yes. Founder hours are usually the most expensive line you have.** Price them at an opportunity rate you write down, or at least at the BLS loaded floor so the hour is not $0. Approval clicks in week one are normal. A daily rewrite ritual in month three is operating cost, and it belongs next to the token $ or the agent is lying to you.

### When is a fixed n8n workflow cheaper than an agent?

**Whenever the input is already a field and the path does not branch on language.** Copy this status to that column, send this template when a date hits, ping Slack on a failed payment — that is a workflow. I reach for an agent when the input is messy text and the output is a draft. Mixing them is fine. Pretending every workflow needs a model loop is how you buy retries you did not need.

### How long should I give an agent before I shut it off?

**Two weeks draft-only, then a kill review. If rewrite rate and retries have not moved after two prompt/tool passes, demote or kill.** One more week of guarded sends is earned, not owed. Sunk build time is not a reason to keep a babysitting hobby. Export the logs, keep the prompt, turn it off.

---

An agent that pays is boring on purpose: one job, a workhorse model, a cap, a human gate, and a Tuesday digest. An agent that burns cash is usually a demo that never got a ledger.

If you want that ledger built against your actual queue — n8n, MCP tools, model routing, kill switches — [book an AI automation strategy call](/contact). I will tell you whether you need an agent at all, or a fixed workflow that does not retry itself into a hole.

[Book an AI automation strategy call](/contact) when you are ready to meter the loop instead of hoping the invoice stays small.
