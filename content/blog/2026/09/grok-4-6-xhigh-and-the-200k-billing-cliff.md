---
title: "Grok 4.6: Pin the ID, Watch the 200k Cliff."
slug: "grok-4-6-xhigh-and-the-200k-billing-cliff"
date: "2026-09-04"
lastModified: "2026-09-05"
author: "William Spurlock"
readingTime: 26
categories:
  - "AI Models and News"
  - "AI Agents and Automations"
  - "Development Tools"
tags:
  - "grok 4.6"
  - "grok-4.6"
  - "xhigh"
  - "200k billing cliff"
  - "xai"
  - "cursor"
  - "reasoning_effort"
  - "prompt_cache_key"
  - "grok bot"
  - "ai automation"
featured: false
draft: false
excerpt: "I missed the August 12 Grok 4.6 pin. Today I pin grok-4.6, stay under 200k unless I mean to double the whole request, and I will not invent a Fast API ID."
coverImage: "/images/blog/grok-4-6-xhigh-and-the-200k-billing-cliff.png"
coverImageAlt: "Grok 4.6 200k billing cliff card with official grok-4.6 ID"
seoTitle: "Grok 4.6: Watch the 200k Cliff | William Spurlock"
seoDescription: "Pin grok-4.6. Cross 200k prompt tokens and xAI doubles the whole request — input, cache, and output. Keep xhigh on 4.6 only. No official grok-4.6-fast API ID."
seoKeywords:
  - "Grok 4.6"
  - "grok-4.6"
  - "Grok 4.6 200k billing cliff"
  - "Grok 4.6 xhigh"
  - "Grok 4.6 Cursor"
  - "grok-4.6-fast"
  - "Grok 4.6 vs Grok Bot"
  - "xAI reasoning_effort"
aioTargetQueries:
  - "How should operators use Grok 4.6 in Cursor and the API"
  - "What is the Grok 4.6 200k billing cliff"
  - "Is xhigh available on Grok 4.5"
  - "Is there a grok-4.6-fast model ID"
  - "How is Grok 4.6 different from Grok Bot"
  - "What model ID should I pin for Grok 4.6"
contentCluster: "foundation-models"
pillarPost: false
parentPillar: "anthropic-openai-google-frontier-may-2026"
entityMentions:
  - "William Spurlock"
  - "Fractional AI CTO"
  - "AI Systems Architect"
  - "xAI"
  - "SpaceXAI"
  - "Grok 4.6"
  - "Grok 4.5"
  - "Grok Bot"
  - "Grok Build"
  - "Cursor"
  - "GPT-6 Astra"
  - "GPT-5.6 Sol"
  - "Claude Fable 5.1"
  - "Claude Mythos 5.1"
  - "Claude Opus 5"
  - "Claude Sonnet 5"
  - "Claude Haiku 4.5"
  - "Gemini 3.8 Flash"
  - "Gemini 3.7 Flash"
  - "Gemini 3.1 Pro"
serviceTrack: "ai-automation"
---

# Grok 4.6: Pin the ID, Watch the 200k Cliff.

**I missed pinning Grok 4.6 on August 12. Today I pin `grok-4.6`, I treat 200,000 prompt tokens as a cliff that doubles the whole request, I keep `xhigh` on 4.6 only, and I will not invent a `grok-4.6-fast` API ID.** This is the API and picker pin. If you want the Cursor Task default, I already wrote [Grok 4.6 Extra High Fast in Cursor](/blog/grok-4-6-extra-high-fast-in-cursor).

I'm William Spurlock — founder, AI Systems Architect, and Fractional AI CTO. I've built 600+ automations with 500+ still live, spent 20,000+ hours on agentic systems, helped clients delete 35,000+ hours of busywork, and shipped hundreds of production sites. I pay the xAI invoice. I do not collect launch adjectives.

Today is September 4, 2026. The [Grok 4.6 launch post](https://x.ai/news/grok-4-6) is three weeks old. The [developer page](https://docs.x.ai/developers/grok-4-6) and the [model card](https://docs.x.ai/developers/models/grok-4.6) are the pin documents. If you want last spring's three-vendor snapshot, I already wrote the [May 2026 frontier comparison](/blog/anthropic-openai-google-frontier-may-2026). That post is history. This one is the catch-up I am running in Cursor and on `api.x.ai`.

---

## What did I miss when Grok 4.6 shipped on August 12?

**I missed a model pin, not a new product. xAI shipped Grok 4.6 on August 12 as the flagship brain for coding, long agent loops, and knowledge work — available that day in Cursor, Grok Build, the xAI API, and the usual gateways.** I kept spending on older Grok routes and Cursor Task slugs while the public ID sat in the docs. That is the miss.

The [launch post](https://x.ai/news/grok-4-6) is blunt about the job: stay with a complex task across many steps, whether that is research, a codebase, or turning a product idea into a first working artifact. It also published a first-week 2x usage promo inside Grok Build and Cursor. That week is over. I am not writing this as if the promo is still live.

Here is the ship card I should have pinned on day one:

| Fact | Value | Official source |
|------|-------|-----------------|
| Ship date | August 12, 2026 | [Launch post](https://x.ai/news/grok-4-6) |
| API ID | `grok-4.6` | [Developer page](https://docs.x.ai/developers/grok-4-6) |
| Context | 500,000 tokens | Same |
| Knowledge cutoff | January 2026 | Same |
| Inputs / output | Text and image in; text out | Same |
| Output cap | No text output limit | Same |
| Headline price | $2 input / $6 output per 1M | Launch post and developer page |
| Cached input under 200k | $0.50 per 1M | [Model card](https://docs.x.ai/developers/models/grok-4.6) and [release notes](https://docs.x.ai/developers/release-notes) |
| Reasoning | `low`, `medium`, `high` (default), `xhigh` | Developer page + [reasoning guide](https://docs.x.ai/docs/guides/reasoning) |
| Surfaces | xAI API, Grok Build, Cursor (all plans), OpenRouter, Vercel, Cloudflare | Developer page |

The [August release notes](https://docs.x.ai/developers/release-notes) repeat the same ID, the 500k window, the 200k price bands, and the four effort levels. If a contractor still has `grok-4.5` hard-coded "because 4.6 is just a Cursor thing," they did not read the notes.

xAI's published benches, from the [launch post](https://x.ai/news/grok-4-6), are why I bother to catch up. These are their numbers, not a bake-off I ran this morning:

| Eval (xAI table, Grok 4.6 High) | Grok 4.6 High | Grok 4.5 High | GPT-5.6 Sol Max | Fable 5 Max |
|---------------------------------|---------------|---------------|-----------------|-------------|
| AA Intelligence Index | 61 | 56 | 61 | 62 |
| GDPVal-AA v2 | 1753 | 1526 | 1728 | 1741 |
| CursorBench v3.2 | 69.9% | 66.7% | 67.2% | 70.5% |
| DeepSWE v1.1 | 65.9% | 54% | 73% | 70% |
| FrontierCode v1.1 (Extended) | 61.3% | 56.6% | 60.6% | 63.6% |
| APEX-Agents | 57.5% | 47.1% | 56.7% | 59.2% |
| Terminal-Bench v3.0 | 26% | 15.7% | 34.6% | 34.1% |

I do not promote a client route because xAI posted a 61 on a composite index. I do notice the pattern: 4.6 is a real step off 4.5 on agent and coding benches, and it is not a wipe of Sol or Fable. Terminal-Bench still sits well behind both. That is a pin fact, not a slogan.

What I missed in practice:

1. **The public API ID.** `grok-4.6` has been callable since August 12. I left nodes on 4.5.
2. **The 200k rule.** The headline $2 / $6 is the short-context band. Cross 200k and the whole request moves.
3. **`xhigh`.** That effort exists on 4.6. It does not exist as a real setting on 4.5.
4. **The Fast temptation.** The launch post mentions a fast variant at twice the price and does not hand me a public ID I will type into n8n.

If you want the daily Cursor / Claude Code rhythm this pin sits inside, I already wrote the [Cursor and Claude Code daily workflow](/blog/cursor-claude-code-daily-workflow). This post does not replace that. It replaces a stale Grok string.

---

## What model ID do I pin in Cursor and the API?

**The ID is `grok-4.6`. That is the string on the [developer page](https://docs.x.ai/developers/grok-4-6), the [model card](https://docs.x.ai/developers/models/grok-4.6), and the [release notes](https://docs.x.ai/developers/release-notes).** I pin that string in the xAI API, in Grok Build, and in any gateway that exposes the same code. I do not pin a Cursor Task slug into `api.x.ai`.

The developer page's own "at a glance" table is the card I keep next to the invoice:

| Spec | Value I pin | Source |
|------|-------------|--------|
| Model name | `grok-4.6` | [Developer page](https://docs.x.ai/developers/grok-4-6) |
| Context window | 500,000 tokens | Same |
| Knowledge cutoff | January 2026 | Same |
| Modalities | Text and image input; text output | Same |
| Output limit | None on text | Same |
| APIs | Responses API and Chat Completions | Same |
| Tools | Function calling, web search, X search, code execution | Same |
| Batch API | Not supported | [Model card](https://docs.x.ai/developers/models/grok-4.6) |
| Rate limits | 150 requests/sec, 50,000,000 tokens/min | Same |
| Regions | `us-east-1`, `us-west-2` | Same |

Where it runs, from the same developer page:

| Surface | What I do |
|---------|-----------|
| xAI API | Pin `grok-4.6`. Set `prompt_cache_key` on Responses, or `x-grok-conv-id` on Chat Completions |
| Grok Build | Accept it as the default coding-agent model. Do not invent a second Build slug |
| Cursor | Use 4.6 in the editor. Treat `cursor-grok-4.6-xhigh-fast` as a Task slug, not an API ID |
| OpenRouter / Vercel / Cloudflare | Only if the gateway's listed ID is still `grok-4.6`. I do not accept a "fast" alias from a reseller page |

Cursor is not a side channel. The [developer page](https://docs.x.ai/developers/grok-4-6) says Grok 4.6 is available on all Cursor plans. The [launch post](https://x.ai/news/grok-4-6) said the same on day one. If your team "doesn't have Grok in Cursor," that is a picker problem, not a plan problem.

The three objects I refuse to flatten:

| Object | What it is | What I type |
|--------|------------|-------------|
| Grok 4.6 | Flagship model | `grok-4.6` |
| Grok Bot | Always-on teammate product, shipped August 11 | A named bot in the Grok Bot app, not a model ID |
| Cursor Task slug | Disposable editor worker | `cursor-grok-4.6-xhigh-fast` inside a Cursor Task. Never on `api.x.ai` |

If a pull request puts `cursor-grok-4.6-xhigh-fast` in an n8n HTTP node, I send it back. That slug is Anysphere's Task route. It is not SpaceXAI's model name.

I also do not write "Grok" next to a raw 500k and call it a spec. I write the ID, then the integer, then the price band. The [May frontier post](/blog/anthropic-openai-google-frontier-may-2026) already taught me what happens when a studio talks in vendor nouns instead of IDs. You get a week of "we upgraded Grok" with nobody able to say which string left the building.

---

## What is the Grok 4.6 200k billing cliff?

**Once the prompt reaches 200,000 tokens, xAI bills the higher rate for every token in that request — input, cached input, and output — not just the slice above 200k.** That sentence is on the [Grok 4.6 model card](https://docs.x.ai/developers/models/grok-4.6): "Requests whose prompt reaches 200k tokens are billed at the higher rate for all tokens in the request." The [release notes](https://docs.x.ai/developers/release-notes) print the same bands.

The official price table:

| Type | Prompt under 200k (per 1M) | Prompt at or above 200k (per 1M) |
|------|----------------------------|----------------------------------|
| Input | $2.00 | $4.00 |
| Cached input | $0.50 | $1.00 |
| Output | $6.00 | $12.00 |

The [developer page](https://docs.x.ai/developers/grok-4-6) still leads with $2 / $6. That is not a contradiction. That is the short-context sticker. If you quote $2 / $6 on a 300k agent loop, you are quoting the wrong band.

The cliff is a step, not a ramp. One extra token that pushes the prompt from 199,999 to 200,000 does not add a surcharge on that token. It re-prices the whole request.

Operator math I actually use — prompt tokens only, no cache, using the published rates:

| Prompt tokens | Input band | Input cost | What changed |
|---------------|------------|------------|--------------|
| 100,000 | $2.00 / 1M | $0.20 | Safe short-context band |
| 180,000 | $2.00 / 1M | $0.36 | Still under the line |
| 199,000 | $2.00 / 1M | $0.40 | Last cheap band I will plan for |
| 200,000 | $4.00 / 1M | $0.80 | Same work, 2x input on the whole prompt |
| 350,000 | $4.00 / 1M | $1.40 | You bought the 500k window. You also bought the high band |

Output follows the same switch. A 10,000-token answer is $0.06 under the line and $0.12 over it. Cached input is $0.50 / $1.00. If you are looping a long agent, you pay the high band on the prompt, the high band on the cache read, and the high band on the tokens the model writes. That is why I say the cliff doubles the whole request.

What I do with that rule:

| Prompt size I see | Move |
|-------------------|------|
| Under 120k | Leave it. Do not compact for sport |
| 120k–180k | Watch the next tool dump. Compaction is cheaper than a surprise 200k |
| 180k–199k | Stop appending files "for context." You are one paste from the high band |
| 200k+ | Only if I meant to buy the high band for that job. Log it. Do not discover it on the invoice |

The 500,000-token window is not a dare. It is a ceiling. I already wrote [how I calculate automation ROI before I build](/blog/how-to-calculate-the-roi-of-ai-automation-before-you-build-anything). A 4.6 loop that lives at 280k because nobody compacted is not "using the context." It is paying 4.5-era work at the long-context sticker.

I do not treat 199k as a target. I treat 180k as the last comfortable working set. The extra 19k is buffer for one more tool result, not a place to store a second repo.

---

## How should I set reasoning_effort, including xhigh?

**Default is `high`. I leave most API calls there. I use `low` on latency-first tool loops, `medium` when the job is long-context analysis that is not a hard proof, and `xhigh` only on Grok 4.6 for a pass I will sit with.** The [reasoning guide](https://docs.x.ai/docs/guides/reasoning) says effort cannot be turned off on 4.6 or 4.5. If you omit the field, you get `high`.

Official effort table, from that guide:

| `reasoning_effort` | xAI's description | Where I set it |
|--------------------|-------------------|----------------|
| `low` | Some reasoning tokens, still fast | Latency-sensitive agents, simple tool calls, routers |
| `medium` | More thinking, less latency-sensitive | Long-context analysis I will not watch live |
| `high` (default) | Deeper thinking, more tokens | Default `grok-4.6` pin |
| `xhigh` | Maximum depth, higher latency | One hard planning pass on 4.6. Never a classifier |

The same guide is the `xhigh` rule I will not let a contractor blur:

> `"xhigh"` is available on `grok-4.6` and later. On models that do not support it, such as `grok-4.5`, requests with `"xhigh"` are treated as `"high"`.

That is the whole operator lesson. `xhigh` is a 4.6 feature. Send it to 4.5 and you paid for a keyword that silently became `high`. Your logs will say `xhigh`. The model will not.

| Model | Effort values that actually change behavior | What happens if I send `xhigh` |
|-------|---------------------------------------------|-------------------------------|
| `grok-4.6` | `low` / `medium` / `high` / `xhigh` | Maximum depth. You pay the thinking tokens |
| `grok-4.5` | `low` / `medium` / `high` | Treated as `high`. No extra depth |
| `grok-4.20-multi-agent` | Same four strings, different meaning | Controls agent count, not depth. I do not pretend that is 4.6 |

I do not send `presencePenalty`, `frequencyPenalty`, or `stop` on these calls. The reasoning guide says those fields error on reasoning models. Dead knobs in a payload make logs lie. Same class of mistake as leaving `thinking_budget` on a Gemini 3.8 Flash route.

Reasoning tokens are not a side meter. The guide says they are billed as part of total consumption. `xhigh` does not change the $2 / $6 or $4 / $12 sticker. It changes how many tokens you mint before the first sentence you will read. Stack that on a 210k prompt and you have the cliff and a long think on the same invoice.

My pin for September 4:

| Route | Model | Effort |
|-------|-------|--------|
| Default API / n8n Grok node | `grok-4.6` | `high` |
| Cheap router / "which folder is this" | `grok-4.6` | `low` |
| Long research I will not watch | `grok-4.6` | `medium`, and stay under 180k |
| Architecture brief I will read | `grok-4.6` | `xhigh`, one shot, then drop back |
| Anything still on 4.5 | `grok-4.5` | `high` at most. No `xhigh` theater |

If the job is "always-on teammate," that is Grok Bot, not an `xhigh` flag. If the job is a Cursor implementer hop, pin [Extra High Fast](/blog/grok-4-6-extra-high-fast-in-cursor).

---

## Is there a grok-4.6-fast ID I can pin?

**No. The [developer page](https://docs.x.ai/developers/grok-4-6) lists one model name: `grok-4.6`. I will not invent `grok-4.6-fast`.** The [launch post](https://x.ai/news/grok-4-6) says there is a fast variant at twice the price and does not publish a public code I will type into production.

That is the whole Fast rule. A sentence in a launch post is not an ID. A Cursor Task slug is not an ID. A reseller dropdown labeled "Grok 4.6 Fast" is not an ID until SpaceXAI prints it on the developer page the same way they printed `grok-4.6`.

| String someone will try | What it actually is | What I do |
|-------------------------|---------------------|-----------|
| `grok-4.6` | Official API ID | Pin it |
| `grok-4.6-fast` | Not on the developer page | Reject the PR |
| `grok-4.6-latest` | Not a documented 4.6 alias | Reject it |
| `cursor-grok-4.6-xhigh-fast` | Cursor Task slug | Keep it inside Cursor Tasks |
| Older `grok-4-fast-reasoning` / `grok-4-1-fast-reasoning` | Retired 4.x Fast slugs that redirect toward `grok-4.3` | Do not "upgrade" those to a made-up 4.6 Fast |

The [May 15 retirement note](https://docs.x.ai/developers/migration/may-15-retirement) is why people still have Fast in their muscle memory. Those old Fast IDs were real. They are not a template for 4.6. If a node still says `grok-4-fast-reasoning`, the fix is a documented current ID — `grok-4.6` with an explicit `reasoning_effort`, or `grok-4.3` if you still want that cheaper, faster stack — not a hyphen you invented because the launch post said "fast variant."

Latency I actually control on 4.6:

1. **Set `reasoning_effort` to `low`.** That is the documented fast-ish setting on this model.
2. **Keep the prompt under 180k.** The cliff is slower in the only way that matters: it costs more for the same tokens.
3. **Set `prompt_cache_key`.** A cache-cold 150k prompt feels "slow" and bills like a first visit.
4. **Do not type a Fast ID.** There is nothing to pin.

If a gateway shows a 4.6 Fast SKU at 2x, I treat that as their product name until I can see `grok-4.6` plus a second official code on [docs.x.ai](https://docs.x.ai/developers/grok-4-6). I have been burned by hyphen folklore before. I am not doing it on a model I already missed for three weeks.

---

## How is Grok 4.6 different from Grok Bot?

**Grok 4.6 is the model ID `grok-4.6`. Grok Bot is the always-on teammate product xAI shipped on August 11.** One is a brain you call. The other is a seat you staff. I use both. I do not buy a token price and expect a coworker, and I do not buy a named bot and expect a 200k price band.

xAI put them one day apart on purpose. [Grok Bot launched August 11](https://x.ai/news/introducing-grok-bot). [Grok 4.6 launched August 12](https://x.ai/news/grok-4-6). People have been flattening those two nouns for three weeks. That flatten is how you ask a cloud VM for a cached-input rate, or ask `grok-4.6` to text you overnight.

| Axis | Grok 4.6 | Grok Bot |
|------|----------|----------|
| What it is | Flagship model | Named teammate on a shared cloud computer |
| Ship date | August 12, 2026 | August 11, 2026 |
| How I call it | `grok-4.6` in API, Cursor, Grok Build | A bot in the Grok Bot app |
| Billing I care about | Per-million tokens, 200k cliff, cache | Product usage, separate from Cursor and Grok plan tokens |
| Effort knob | `reasoning_effort` including `xhigh` | Not a model card |
| Memory | Whatever I put in the prompt / cache key | The thread and the computer persist when I close the lid |

The Cursor implementer hop lives in [Grok 4.6 Extra High Fast in Cursor](/blog/grok-4-6-extra-high-fast-in-cursor). This post does not restaff a bot roster. If you want the broader definition of agentic software, start with [what agentic AI is in 2026](/blog/what-is-agentic-ai-and-why-are-businesses-excited-about-it-in-2026). If you want the day-to-day OS, read [what an agentic OS means](/blog/what-an-agentic-os-means-for-running-your-business-day-to-day).

The only sentence I need here: pin the model in the editor and the API; staff the bot in the bot app.

---

## How do I keep cache hits and stay off the cliff?

**Set a `prompt_cache_key` on the Responses API (or `x-grok-conv-id` on Chat Completions), only append to the thread, and compact before you cross 180k.** The [developer page](https://docs.x.ai/developers/grok-4-6) says that without the key you often pay full input on a cache-cold server. The [caching best-practices page](https://docs.x.ai/developers/advanced-api-usage/prompt-caching/best-practices) makes the key the first rule.

Cached input on 4.6 is $0.50 / 1M under 200k and $1.00 / 1M at or above 200k, per the [model card](https://docs.x.ai/developers/models/grok-4.6). That is still a discount. It is not a reason to drag a 240k prompt because "cache will save it." Cache at the high band is $1.00, not $0.50. The cliff hits the cache line too.

What the [What Breaks Caching](https://docs.x.ai/developers/advanced-api-usage/prompt-caching/multi-turn) page will punish:

| Mistake | Result | Operator fix |
|---------|--------|--------------|
| No `prompt_cache_key` / no `x-grok-conv-id` | Requests land on a cold server | Set a stable conversation ID |
| Edit an earlier message | Prefix match dies | Append only |
| Delete a turn to "clean the thread" | Prefix match dies | Compact with the API, do not hand-edit history |
| Reorder system / user / tool turns | Prefix match dies | Front-load static context once |
| Drop `reasoning_content` on a later turn | Top miss on reasoning models | Keep the reasoning payload the docs ask for |

The developer page also points long agent loops at context compaction. That is the other half of the cliff. Compaction is how I stay in the $2 / $0.50 / $6 band without pretending a 500k window is free.

My loop hygiene on 4.6:

1. **One cache key per job, not per HTTP call.** A UUID or the workflow run ID is enough.
2. **Static rules and schemas at the front.** If the system prompt changes every turn, you paid for a new prefix.
3. **Tool results get summarized before they age.** A 40k log dump is how you walk from 160k to 210k in one node.
4. **Watch `cached_tokens`.** The best-practices page says if that number stays 0, the key or the order is wrong.
5. **Do not compact for sport under 120k.** Compaction is a cliff tool, not a style choice.

If you run this inside a standing ops layer, the OS still owns the budget. I already said that in [the agentic OS post](/blog/what-an-agentic-os-means-for-running-your-business-day-to-day). A 4.6 node that appends forever is not an agent. It is an unbounded invoice.

---

## Where does Grok 4.6 sit on the September 2026 board?

**Grok 4.6 is xAI's flagship model. It is not GPT-6 Astra, not Claude Fable 5.1, not Gemini 3.8 Flash, and not Grok Bot.** I catch up the pin. I do not convert the studio to one vendor because I was three weeks late.

The board I am running this week:

| Vendor | Use this | Role | Do not flatten into |
|--------|----------|------|---------------------|
| OpenAI | **GPT-6 Astra** (`gpt-6-astra`) | Flagship, September 3 | GPT-5.6 Sol / Terra / Luna stay the cheaper stack |
| Anthropic | **Claude Fable 5.1** (`claude-fable-5-1`) | GA Mythos-class, September 1 | Not a replacement for Opus |
| Anthropic | **Claude Mythos 5.1** (`claude-mythos-5-1`) | Same weights, invite-only | Not a public default |
| Anthropic | **Claude Opus 5** / **Sonnet 5** / **Haiku 4.5** | Default complex / volume / cheap | Opus 4.8 is a Fable fallback, not the flagship |
| Google | **Gemini 3.8 Flash** (`gemini-3.8-flash`) | Current Flash, September 2 | 3.7 Flash = efficiency fallback; 3.1 Pro = preview |
| xAI | **Grok 4.6** (`grok-4.6`) | Flagship model, August 12 | Not Grok Bot |
| xAI | **Grok Bot** (Mac app 0.43.0) | Always-on agent product, August 11 | Not Cursor `cursor-grok-4.6-xhigh-fast` |

Where 4.6 goes on my stack after this pin:

| Job | Model I call | Why |
|-----|--------------|-----|
| Cursor coding pass I will read | `grok-4.6` at `high` | Launch pitch is long-running agents and first-pass apps |
| Hard planning brief | `grok-4.6` at `xhigh`, once | 4.6-only effort. Then drop back |
| Cheap classification | Not 4.6 at `xhigh` | `low` on 4.6, or a cheaper ID |
| Always-on ops that must survive a closed laptop | Grok Bot | Product, not a token ID |
| OpenAI flagship / computer-use fence | GPT-6 Astra | Different vendor, different card |
| Anthropic GA Mythos-class | Claude Fable 5.1 | Not an Opus replacement |
| Google volume Flash | Gemini 3.8 Flash | Keep 3.7 on the cheap loop |

I already compared coding assistants in the [complete AI coding assistant showdown](/blog/complete-ai-coding-assistant-showdown). That post still describes the editors. This post pins one model inside Cursor. If you are looking for Antigravity recipes, those live in the [Antigravity agents blueprint](/blog/google-antigravity-agents-blueprint) and [Antigravity 2 subagent recipes](/blog/antigravity-2-subagent-recipes-day-one). I do not route those through a Grok ID.

---

## What Cursor prompt do I use to pin this stack?

**I paste a pin, not a rewrite. The job is to change strings, effort, and cache keys — not to invent a Fast ID or merge Grok Bot into the API.**

```
Catch-up pin for Grok 4.6. Today is September 4, 2026. Do not invent architecture.

For every xAI / Grok route that should move:
1. Set model to grok-4.6. That is the only official ID.
2. Do not add grok-4.6-fast, grok-4.6-latest, or any Fast hyphen. The launch post mentions a fast variant and does not give a public code.
3. Do not send cursor-grok-4.6-xhigh-fast to api.x.ai. That slug stays inside Cursor Tasks.
4. Set reasoning_effort to high unless I marked the route as a router (low) or a single planning pass I will read (xhigh).
5. Never send xhigh to grok-4.5. On 4.5 that string becomes high.
6. Set prompt_cache_key on Responses (or x-grok-conv-id on Chat Completions). One key per job.
7. Keep prompts under 180k unless I explicitly accept the 200k whole-request double ($4 / $1 / $12).
8. Do not flatten this into Grok Bot. Bot staffing is a different product.

Then print a table: route name, old ID, new ID, effort, cache key present, last measured prompt tokens, cliff risk.
```

That is the whole instruction. No SDK walkthrough. No "while we are here" refactor of the n8n graph.

If a route is still on a retired Fast slug from the [May 15 note](https://docs.x.ai/developers/migration/may-15-retirement), the same prompt applies: pick a current documented ID. Do not "port" Fast by adding `-fast` to 4.6.

I daily-drive Cursor. The picker gets `grok-4.6`. The Task dispatcher can keep `cursor-grok-4.6-xhigh-fast` for one-pass editor work. Those are two surfaces. One pin document.

---

## What will I not claim about the 200k cliff on September 4?

**I will not claim a bake-off I did not run, a Fast ID xAI did not publish, or a first-week promo that expired in August.** Catch-up is a pin. It is not a new benchmark blog.

Hard no list:

| Claim I will not make | Why |
|-----------------------|-----|
| "4.6 beats Astra / Fable / 3.8 Flash in my shop" | I did not publish a measured bake-off today |
| "`grok-4.6-fast` is the latency ID" | Not on the developer page |
| "The Cursor 2x promo is still on" | Launch-week offer. Ship date was August 12 |
| "Grok Bot is just 4.6 with a nicer UI" | Different product. Different bill |
| "`xhigh` on 4.5 is fine" | Docs say it becomes `high` |
| "500k means dump the repo" | 200k re-prices the whole request |
| "I independently verified the launch benches" | Those numbers are xAI's table |

I will claim the pin: `grok-4.6`, 500k window, $2 / $6 under 200k, whole-request double at 200k, `xhigh` on 4.6 only, cache key required, Fast hyphen rejected.

If a client asks "is this the new best model," the answer is "it is xAI's current flagship, and I am three weeks late pinning it." That sentence is cheaper than a weekend of hyphen folklore.

---

## Frequently asked questions

### How should operators use Grok 4.6 in Cursor and the API?

**Pin `grok-4.6`, default `reasoning_effort` to `high`, set a cache key, and stay under 180k prompt tokens unless you mean to pay the 200k whole-request double.** In Cursor, use 4.6 in the picker and keep `cursor-grok-4.6-xhigh-fast` inside Tasks. On `api.x.ai`, type the official ID only. That split is the whole operator move.

### What is the Grok 4.6 model ID?

**`grok-4.6` — that is the only model name on the [developer page](https://docs.x.ai/developers/grok-4-6), the [model card](https://docs.x.ai/developers/models/grok-4.6), and the [August release notes](https://docs.x.ai/developers/release-notes).** Do not send a Fast suffix. Do not send a Cursor Task slug. Pin the string.

### What happens when a Grok 4.6 prompt hits 200k tokens?

**The whole request moves to $4 input / $1 cached input / $12 output per million tokens.** The [model card](https://docs.x.ai/developers/models/grok-4.6) says the higher rate applies to all tokens in the request, not the slice above 200k. A 199k prompt and a 200k prompt are different invoices, not a rounding error.

### Does the 200k cliff apply only to tokens above 200k?

**No. It re-prices the entire request.** Input, cached input, and output all switch bands once the prompt reaches 200k. That is why I call it a cliff and why I compact at 180k instead of surfing 199k.

### Is xhigh available on Grok 4.5?

**No as a real setting. The [reasoning guide](https://docs.x.ai/docs/guides/reasoning) says `xhigh` is available on `grok-4.6` and later; on `grok-4.5` the same string is treated as `high`.** Your logs can still say `xhigh`. The model will not go deeper. Pin 4.6 if you want the extra depth.

### What reasoning_effort should I default to on Grok 4.6?

**`high`. That is the documented default, and reasoning cannot be disabled.** Use `low` on routers and simple tool calls. Use `medium` on long analysis you will not watch. Use `xhigh` on one planning pass you will read, then drop back. `xhigh` on a classifier is how a $2 / $6 card still hurts.

### Is there a grok-4.6-fast API ID?

**No. The [developer page](https://docs.x.ai/developers/grok-4-6) does not list one.** The [launch post](https://x.ai/news/grok-4-6) mentions a fast variant at twice the price and does not publish a public code. For latency, set `reasoning_effort` to `low` and keep the prompt short. Do not invent a hyphen.

### Should I pin cursor-grok-4.6-xhigh-fast in the xAI API?

**No. That is a Cursor Task slug, not the API ID.** I dispatch it for a one-pass editor worker. I send `grok-4.6` to `api.x.ai`. Mixing those strings is how an n8n node fails on a Saturday.

### How is Grok 4.6 different from Grok Bot?

**Grok 4.6 is the model. Grok Bot is the August 11 teammate product.** I pin `grok-4.6` on the API and picker. I pin [Extra High Fast](/blog/grok-4-6-extra-high-fast-in-cursor) on Cursor Tasks. I staff a standing bot in the Grok Bot app. Those are three surfaces.

### What is the Grok 4.6 context window and price?

**500,000 tokens. $2 input / $0.50 cached / $6 output per million under 200k prompt tokens, and $4 / $1 / $12 at or above 200k, per the [model card](https://docs.x.ai/developers/models/grok-4.6) and [release notes](https://docs.x.ai/developers/release-notes).** The [developer page](https://docs.x.ai/developers/grok-4-6) still leads with $2 / $6 because that is the short-context sticker. Quote the band you are actually in.

### How do I keep Grok 4.6 cache hits?

**Set `prompt_cache_key` on Responses or `x-grok-conv-id` on Chat Completions, only append new turns, and watch `cached_tokens`.** The [caching best-practices page](https://docs.x.ai/developers/advanced-api-usage/prompt-caching/best-practices) puts the key first. Editing, deleting, or reordering earlier messages breaks the prefix, per [What Breaks Caching](https://docs.x.ai/developers/advanced-api-usage/prompt-caching/multi-turn).

### Where can I call Grok 4.6 today?

**xAI API, Grok Build, Cursor on all plans, plus OpenRouter, Vercel, and Cloudflare, per the [developer page](https://docs.x.ai/developers/grok-4-6).** Batch API is not supported on the [model card](https://docs.x.ai/developers/models/grok-4.6). Rate limits there are 150 requests per second and 50 million tokens per minute in `us-east-1` and `us-west-2`.

### Should I dump a whole repo into the 500k window?

**No. The window is a ceiling. The bill changes at 200k.** I keep working sets under 180k and compact when a tool dump would cross the line. A 500k paste is how you buy the high band for a job that fit in the cheap band yesterday.

### Does Grok 4.6 replace GPT-6 Astra or Claude Fable 5.1?

**No. 4.6 is xAI's flagship, not a one-model shop.** Astra is the OpenAI flagship lane. Fable 5.1 is Anthropic's GA Mythos-class model and is not an Opus replacement. Gemini 3.8 Flash is Google's current Flash. I pin 4.6 on Grok routes. I do not flatten September into one vendor.

---

If a 240k prompt is doubling the whole Grok request, or someone typed `grok-4.6-fast` into production, that is the catch-up I run. Book an [AI automation strategy call](/contact) and I will pin `grok-4.6`, put the 180k compact line on the loop, and keep Fast hyphens out of n8n — or we wire a [custom agent team](/contact) that already knows the 200k cliff. I have done this across 600+ automations. Three weeks late is cheaper than a weekend of invented IDs.
