---
title: "Building an AI Visibility Dashboard for Your Business"
slug: "building-an-ai-visibility-dashboard-for-your-business"
date: "2026-08-14"
lastModified: "2026-08-14"
author: "William Spurlock"
readingTime: 19
categories:
  - "AI Visibility"
tags:
  - "ai visibility"
  - "analytics"
  - "attribution"
  - "citation tracking"
  - "ga4"
  - "share of voice"
  - "ai search reporting"
featured: false
draft: false
excerpt: "A practical build guide for an AI visibility dashboard: the metrics that matter, GA4 AI referral tracking, self-reported attribution, tool stack from $29 to $499, and how to report it."
coverImage: "/images/blog/building-an-ai-visibility-dashboard-for-your-business.png"
seoTitle: "AI Visibility Dashboard: Build Guide 2026 | William Spurlock"
seoDescription: "Build an AI visibility dashboard for your business: attribution from AI search, the metrics that matter, GA4 setup, citation tracking tools compared, and stakeholder reporting templates."
seoKeywords:
  - "AI visibility dashboard"
  - "AI search attribution"
  - "track ChatGPT referrals GA4"
  - "AI citation tracking tools"
  - "share of voice AI"
  - "AI visibility ROI"
  - "AI visibility report"
  - "AI visibility metrics"
aioTargetQueries:
  - "How do I attribute leads and revenue to AI visibility efforts?"
  - "What should my AI visibility dashboard include?"
  - "How do I report AI visibility results to a client or stakeholder?"
contentCluster: "ai-visibility-measurement-analytics"
pillarPost: false
parentPillar: "generative-engine-optimization-geo-the-2026-playbook-for-business-owners"
entityMentions:
  - "William Spurlock"
  - "Google Analytics 4"
  - "ChatGPT"
  - "Perplexity"
  - "Google AI Overviews"
  - "Semrush"
  - "Ahrefs"
  - "Looker Studio"
serviceTrack: "ai-visibility"
---

# Building an AI Visibility Dashboard for Your Business

**An AI visibility dashboard tracks four things: how often AI engines cite you (citation share), how much traffic those citations send (AI referrals), how often buyers say AI sent them (self-reported attribution), and how all three move against competitors (share of voice).** You can build a working version in a spreadsheet this week, graduate to Looker Studio when the data earns it, and plug in a paid tracker when you need daily prompt monitoring across engines.

I'm William Spurlock — AI Solutions Architect,
Fractional AI CTO. I build AI-visibility systems
for businesses, and every engagement ends with a
measurement layer like this one, because
visibility work without numbers is astrology.
This post is the companion to yesterday's [GEO
2026
playbook](/blog/generative-engine-optimization-geo-the-2026-playbook-for-business-owners)
— that one earns the citations, this one proves
it. It sits in the measurement cluster alongside
[how to measure AI visibility: the metrics that
actually
matter](/blog/how-to-measure-ai-visibility-the-metrics-that-actually-matter-in-2026).

One honest frame before the build: AirOps' 2026
attribution research found AI platforms drove
1.13 billion referral visits in June 2025 — yet
roughly 70% of AI-influenced sessions show up as
"Direct" in analytics, and last-click
attribution captures only about 2% of AI
search's true revenue contribution. Your
dashboard is a triangulation instrument, not a
courtroom exhibit. Build it to be directionally
right, reviewed monthly, and impossible to game.

---

## How do I attribute leads and revenue to AI visibility efforts?

**Attribute AI-sourced leads with three lenses running in parallel: software tracking (a dedicated AI channel in GA4 plus CRM source fields), self-reported attribution ("How did you hear about us?" with AI as an explicit option), and correlation signals (branded search lift after citation gains).** No single lens is accurate; the intersection of all three is.

### Lens 1 — Software tracking

**GA4 custom AI channel.** AI referrals currently dump into generic Referral or Direct. Fix it in ten minutes: GA4 → Admin → Data Display → Channel Groups → copy the Default group → add a channel called "AI Referrals" placed above Referral, with condition *Session source matches regex*:




`chatgpt\.com|chat\.openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|deepseek\.com|grok\.com|meta\.ai|you\.com`

GA4 uses RE2 regex — escape every dot, and give
it 24 hours to populate. ChatGPT dominates this
channel; Conductor's research puts it at roughly
87% of all AI referral traffic, so consider
splitting ChatGPT into its own channel once
volume justifies it.

**CRM source field.** Add "AI assistant (ChatGPT, Perplexity, etc.)" as a first-class lead source value in your CRM — not a free-text "Other." Revenue attribution dies in free text.

**UTM discipline.** Any link you place inside AI-readable surfaces (community posts, partner pages, docs) gets tagged `utm_source=ai&utm_medium=answer`. Imperfect coverage, but it hardens the data you do have.

### Lens 2 — Self-reported attribution

Ask every inbound lead, verbatim: **"How did you
hear about us?"** Make "An AI assistant
recommended you" a selectable option on forms,
and train whoever answers the phone to log it
the same way. Self-reported attribution
consistently surfaces 3–8x more AI influence
than referrer data alone, because buyers
research in chat and arrive via branded search
or direct entry.

The failure mode is treating HDYHAU as
decoration: free text that nobody reads, or a
field buried after the submit button. Put it on
the brief form, the booking flow, and the first
sales call script. Same question, same options,
every surface.

### Lens 3 — Correlation signals

Watch branded search volume (Search Console),
direct traffic trends, and close rates on leads
who mention AI. When citation share climbs and
branded search climbs with it two to six weeks
later, you have a defensible influence story
even where session-level tracking fails.
Otterly.ai published a 2026 case study walking
through exactly this gap — their self-reported
numbers dwarfed what GA4 last-click ever showed.

---

## What should my AI visibility dashboard include?

**Six panels, in priority order: citation share, mention sentiment, AI referral traffic, self-reported AI leads, engine coverage, and competitive share of voice.** Everything else is garnish.

| Panel | Metric | Source | Cadence |
| --- | --- | --- | --- |
| Citation share | % of tracked prompts where you are cited | Prompt panel (manual or tool) | Monthly |
| Mention sentiment | Positive / neutral / negative framing in answers | Prompt panel review | Monthly |
| AI referral traffic | Sessions + conversions from AI channel | GA4 custom channel group | Weekly |
| Self-reported AI leads | Count + % of inbound crediting AI | Intake form + CRM field | Weekly |
| Engine coverage | Which engines cite you (ChatGPT / Perplexity / AIO / Gemini) | Prompt panel per engine | Monthly |
| Share of voice | Your citations ÷ all brand citations per prompt set | Prompt panel or tracker tool | Monthly |

### The prompt panel — your ground truth

The core instrument is a fixed set of **25–50
prompts your buyers actually ask** — category
queries, comparison queries, local queries,
"best X for Y" queries — run against ChatGPT,
Perplexity, and Google AI Overviews on a
schedule. For each prompt, log four columns:
were you cited, who was cited instead, which
sources the engine pulled from, and the
sentiment of the mention.

A spreadsheet runs this fine at 25 prompts and a
monthly cadence. The version that breaks is 200
prompts across four engines, checked weekly —
that is where paid trackers earn their fee.

### Tool stack, by budget

| Tool | Entry price (2026) | What it is best at |
| --- | --- | --- |
| Spreadsheet + manual prompt runs | $0 | Baseline truth; 25–50 prompts; forces you to read real answers |
| Otterly.ai | From ~$29/mo | Accessible brand + citation monitoring for small teams |
| Peec AI | From ~€89/mo | Agency-friendly multi-brand, multi-engine tracking |
| Profound | ~$499/mo | Enterprise depth, large prompt sets, governance |
| Semrush AI Visibility Toolkit | Add-on to Semrush | Prompt discovery + benchmarks inside your existing SEO stack |
| Ahrefs Brand Radar | Included in Ahrefs plans | Coverage across 240M+ real user prompts; strong data, fewer LLMs |

Pricing and feature notes per vendor pages and
2026 roundups (Discovered Labs, Surmado, Frase)
— treat as directional, vendors reprice this
category quarterly. Selection rule: a tool
diagnoses; it does not fix. If the budget forces
a choice between monitoring and the content work
that earns citations, fund the content work.

### Panels that look impressive and lie

- **Raw mention counts without a fixed prompt set.** Engines personalize; unfixed prompts make trends meaningless.
- ** vanity "AI traffic" as % of sessions.** AI referrals will read 0.5–3% for most sites and still drive outsized revenue, because AI-influenced buyers arrive pre-sold. Report conversions and pipeline, not just sessions.
- **Daily fluctuation charts.** Citation share is lumpy at small prompt counts. Monthly trend lines beat daily noise.

---

## How do I report AI visibility results to a client or stakeholder?

**Report three numbers up top — citation share, AI-attributed leads, and share of voice vs. the top competitor — then one page of evidence (what changed, what shipped, what is next).** Stakeholders fund trajectories, not dashboards.

A structure that survives CFO review:

1. **Scorecard row.** Citation share this month vs. last; self-reported + GA4 AI leads; share of voice delta vs. named competitor. Green/red arrows, no paragraphs.
2. **Proof strip.** Two or three verbatim screenshots of real AI answers citing the brand — one win, one competitive gap. Screenshots beat charts in every review meeting I have run.
3. **Activity ledger.** Pages retrofitted, posts shipped, schema deployed. Ties spend to output.
4. **Next lever.** The one thing being done next month and the metric it should move.

Cadence: monthly for the full review, weekly for
a two-line pulse (AI referrals + self-reported
count). Quarterly, re-baseline the prompt panel
against new buyer language — prompts drift as
the market learns to ask better questions.

If you report to clients as an agency: show the
gap column honestly. "Competitor cited in 12 of
50 prompts, you in 9" is the slide that renews
the retainer, because it frames the work as
catch-up with a scoreboard.

---

## The three dashboard tiers — pick one and start this week

**Tier 1 is a spreadsheet, Tier 2 is Looker Studio, Tier 3 is a paid tracker piped into your BI stack.** The right tier is the smallest one you will actually maintain. Most small businesses should live at Tier 1 for a quarter before spending anything.

### Tier 1 — The spreadsheet (this week, $0)

One sheet, four tabs:

1. **Prompt panel** — columns: prompt, engine, date run, cited (Y/N), position in answer, who was cited instead, source used, sentiment. 25–50 rows of prompts, re-run monthly.
2. **AI referrals** — weekly sessions and conversions from the GA4 AI channel, pasted in every Monday.
3. **Self-reported** — weekly count of "AI assistant" answers from intake forms, plus the verbatim quotes. The quotes become sales copy later.
4. **Scorecard** — the roll-up: citation share %, AI-attributed leads, share of voice vs. top competitor, month-over-month deltas.

Fifteen minutes of upkeep per week. If you
cannot keep this alive, a paid tool will not
save you — it will just automate the neglect.

### Tier 2 — Looker Studio (when the data earns a UI)

Connect GA4 (AI channel isolated), Google Sheets
(prompt panel + self-reported tabs), and Search
Console (branded query trends). One page, six
charts matching the six panels from the metrics
table above, monthly date comparison locked in.
Shareable link for stakeholders — no more
screenshot decks.

### Tier 3 — Paid trackers (when monitoring becomes the bottleneck)

Otterly for small teams, Peec for multi-brand,
Profound for enterprise governance — per the
tool table above. The trigger to upgrade: your
prompt panel passes ~50 prompts × 3 engines and
monthly runs stop being feasible by hand, or a
competitor starts visibly out-citing you and
weekly granularity starts paying for itself.

---

## GA4 AI channel setup, step by step

**The whole job is one custom channel group and one regex — ten minutes, no developer.** The exact sequence:

1. GA4 → **Admin** → **Data Display** → **Channel Groups**.
2. Three-dot menu on **Default Channel Group** → **Copy** → name it "Default + AI".
3. **Add new channel** above Referral — order matters, first match wins. Name: `AI Referrals`.
4. Condition: **Session source** → **matches regex** → paste the pattern from the attribution section above (the one covering chatgpt.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com and friends).
5. Save, then wait up to 24 hours — new channel groups only apply going forward.

Two operating notes. First, GA4 uses RE2 regex —
every literal dot needs a backslash escape, and
there is no lookahead support, so keep the
pattern simple. Second, expect the channel to
read small: for most local and B2B sites AI
referrals land between 0.5% and 3% of sessions
in 2026. The revenue density is the story, not
the volume — AI-referred visitors arrive having
already read the comparison.

---

## Running the prompt panel — the operating procedure

**The prompt panel is the only metric in this stack that cannot be bought — it has to be run.** The procedure that keeps it honest:

1. **Fix the prompt set.** 25–50 prompts sourced from sales calls, intake forms, and People Also Ask — category queries ("best [category] for [use case]"), comparison queries ("X vs Y for small business"), local queries, and proof queries ("is X worth it"). Write them once, version them quarterly.
2. **Run identically every time.** Same engine list, same account state (logged out or fresh session — personalization skews answers), same week of the month. Log everything in the spreadsheet, including the prompts where you are absent. Absence is data.
3. **Score three things per prompt.** Cited Y/N, sentiment (positive / neutral / negative), and the source the engine pulled from. The source column is the goldmine: it tells you which page or third-party property to strengthen next.
4. **Compute share of voice.** Your citations ÷ all brand citations across the set. One number, trendable, board-ready.

Common failure: quietly editing the prompt set
after a bad month. Freeze the set; add new
prompts as a separate experimental batch.

---

## Benchmarks: what good looks like in 2026

**There are no universal AI visibility benchmarks yet — the category is too young — but directional ranges are emerging from tracker data and client work.** Use these as orientation, not targets:

| Signal | Early | Healthy | Strong |
| --- | --- | --- | --- |
| Citation share on your prompt panel | 0–10% | 15–30% | 35%+ |
| AI referral share of sessions | <0.5% | 0.5–3% | 3%+ with conversion |
| Self-reported AI leads | Occasional | Weekly | A named pipeline source |
| Share of voice vs. top competitor | <0.3x | 0.5–1x | >1x and widening |

Ranges synthesized from 2026 tracker roundups
and audit work — treat as estimates. The trend
line matters more than the absolute number:
citation share compounding two to five points a
month beats a lucky spike every time.

---

## The monthly report template — copy this

**Steal this structure verbatim; it fits on one page and survives executive attention spans.** Fill the brackets, delete nothing:

> **AI Visibility — [Month Year]**
>
> - **Citation share:** [X]% of [N] tracked prompts ([+/-] vs. last month)
> - **Share of voice:** [X]% vs. [top competitor] at [Y]%
> - **AI-attributed leads:** [N] (GA4 AI channel) + [N] self-reported = [total]
> - **Pipeline value:** $[N] in open deals crediting AI discovery
>
> **Evidence:** [1–2 screenshots: best citation win, biggest competitive gap]
>
> **Shipped:** [pages retrofitted, posts published, schema/fixes deployed]
>
> **Next month:** [the single lever being pulled] → expected to move [metric]

Two rules keep the report trusted. First, report
the gap month honestly — one bad month explained
beats three quiet ones discovered later. Second,
never report a metric you did not also report
last month; changing the scoreboard mid-season
is how measurement programs die.

---

## Frequently Asked Questions

### Is there an ROI formula for AI visibility investment?

**Yes: (AI-attributed pipeline value × close rate × gross margin) ÷ visibility spend.** The inputs come from the three attribution lenses — GA4 AI channel conversions, self-reported AI leads with deal values, and pipeline speed on AI-influenced deals. Because roughly 70% of AI-influenced sessions arrive as Direct, treat the output as a conservative floor, and report ROI as a range rather than a point estimate.

### What does "share of voice in AI" mean and how do I measure it?

**Share of voice in AI = your citations ÷ total brand citations across a fixed prompt set.** Run your 25–50 buyer prompts monthly, mark every brand cited in each answer, and compute your percentage. In 2026 this is the AI-era successor to rank tracking — it answers "when buyers ask, how often is the answer us?" in one number a board can trend.

### How do I set up alerts for when AI mentions my brand or competitors?

**Three layers: a paid tracker (Otterly, Peec, Profound) with alert rules on citation changes; classic mention tooling (Brand24, Google Alerts) for the web mentions that feed AI answers; and a monthly manual prompt panel pass for framing and sentiment.** Tools catch volume changes fast; only reading actual answers catches *how* you are being described.

### Does Semrush or Ahrefs have AI visibility tracking features?

**Yes — both shipped them. Semrush's AI Visibility Toolkit auto-discovers industry prompts and benchmarks visibility; Ahrefs' Brand Radar tracks brand presence across 240M+ real user prompts (Ahrefs, 2026).** Both are strongest if you already pay for the suite. Independent 2026 comparisons rate dedicated trackers deeper on engine coverage — Brand Radar notably lacks Claude — so suites are the convenient option, not always the most complete.

### What is the best tool for monitoring AI citation tracking in 2026?

**There is no single best — there is a best per budget and team size.** Small business: Otterly.ai or a manual spreadsheet panel. Agency or multi-brand: Peec AI. Enterprise with governance needs: Profound. Already paying Semrush or Ahrefs: start with their built-in toolkits before adding spend. The credible move is a one-off manual audit first, so you know what normal looks like before renting a dashboard.

### What does a good AI visibility report look like?

**One page: three headline metrics (citation share, AI-attributed leads, share of voice vs. top competitor), 2–3 screenshots of real engine answers, a shipped-work ledger, and next month's single lever.** Anything longer is written for the report writer, not the reader.

### Does Google Analytics show traffic from AI Overviews?

**No — AI Overviews and AI Mode clicks arrive as regular google/organic traffic with no distinct label (as of mid-2026).** You cannot isolate them in GA4. What you *can* isolate: referral traffic from standalone engines (ChatGPT, Perplexity, Claude, Copilot) via a custom channel group, and AI Overviews' indirect effects through CTR and branded-search trends in Search Console.

### How often should I audit my AI visibility performance?

**Monthly for the metrics, quarterly for the full audit.** Monthly: prompt panel run, citation share recomputed, GA4 AI channel reviewed. Quarterly: re-check entity consistency, refresh the prompt set against current buyer language, and re-benchmark competitor share of voice. Daily checking is noise-worship — citation share moves in weeks, not hours.

---

## The bottom line

Dashboards do not earn citations — they prove
the citations you earned and tell you where the
next one is hiding. Build the spreadsheet
version this week, wire the GA4 channel today,
and put "How did you hear about us?" on every
form by Friday. The businesses measuring AI
visibility now are the ones that will still have
a market when the measurement tools mature.

Want the fast path? My **$500 AI Visibility
Audit** includes a baseline citation-share panel
for your category, the GA4 channel setup, and a
reporting template your stakeholders will
actually read — credited toward any visibility
plan or build. One call, thirty minutes, and you
leave with the scoreboard.
