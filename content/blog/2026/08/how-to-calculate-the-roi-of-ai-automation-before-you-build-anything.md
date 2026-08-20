---
title: "How to Calculate the ROI of AI Automation Before You Build Anything"
slug: "how-to-calculate-the-roi-of-ai-automation-before-you-build-anything"
date: "2026-08-16"
lastModified: "2026-08-16"
author: "William Spurlock"
readingTime: 28
categories:
  - "AI Automation"
tags:
  - "ai automation roi"
  - "automation roi calculator"
  - "n8n"
  - "make.com"
  - "small business automation"
  - "time study"
  - "fully loaded labor"
  - "payback period"
featured: false
draft: false
excerpt: "Fill the ROI worksheet before you build or buy any tool: hours saved × loaded labor, minus stack, build, and the maintenance hours most vendor decks skip."
coverImage: "/images/blog/how-to-calculate-the-roi-of-ai-automation-before-you-build-anything.png"
seoTitle: "Calculate AI Automation ROI First | William Spurlock"
seoDescription: "Calculate AI automation ROI before you build: hours saved × loaded labor, minus stack, build, and maintenance. Worksheet, time study, and a labeled worked example."
seoKeywords:
  - "roi of ai automation"
  - "how to calculate automation roi"
  - "ai automation cost small business"
  - "time savings from ai automation"
  - "n8n make.com monthly cost"
  - "fully loaded labor rate"
  - "automation payback period"
  - "ai automation for service business"
aioTargetQueries:
  - "What is the ROI of AI automation for a service business?"
  - "How much does AI automation cost for a small business?"
  - "How do I calculate time savings from AI automation?"
  - "Is AI automation worth the investment for a business doing under $1M per year?"
  - "What is the monthly cost of running n8n or Make.com for business automation?"
  - "How do I budget for AI tools and automation in 2026?"
  - "What is the cheapest way to automate my business with AI?"
  - "How do I calculate payback period for an AI automation?"
contentCluster: "ai-automation-roi-costs-pricing"
pillarPost: true
entityMentions:
  - "William Spurlock"
  - "n8n"
  - "Make.com"
  - "Zapier"
  - "Claude Sonnet 5"
  - "Claude Opus 4.8"
  - "GPT-5.4 mini"
  - "Gemini 3.5 Flash"
  - "Bureau of Labor Statistics"
serviceTrack: "ai-automation"
---

# How to Calculate the ROI of AI Automation Before You Build Anything

Do not buy an automation tool until the ROI worksheet is filled. Most "ROI" decks skip maintenance hours, treat the subscription as the whole cost, and count wait time as if you were working the queue the entire time. That is how shops buy a stack, ship nothing useful, and then swear automation does not pay.

I'm William Spurlock, an AI Solutions Architect and Fractional AI CTO. I have built **500+ automations**, spent **20,000+ hours** architecting agentic systems, and tracked **35,000+ hours saved for clients** — that last number is aggregate busywork deleted across the book of work, not my personal hours. The pattern that keeps showing up: the operators who win run a time study and a cost model *before* they pick n8n, Make.com, or Zapier. The operators who lose pick a tool first and invent the math later.

This pillar owns one job: **how to calculate return before you build.** Tool prices show up as inputs, not as the article. If you still need the plain-English definition of the thing you are modeling, start with [what AI automation actually is](/blog/what-is-ai-automation-a-plain-english-guide-for-business-owners). If you already know you will build, the first process I usually ship is [intake and onboarding](/blog/the-first-ai-automation-every-small-business-should-build).

The formula is not cute. It is:

**Annual hours saved × loaded hourly cost − annual stack − annualized build − annual maintenance labor − a failure reserve.**

If that number is not clearly positive under a conservative hours assumption, you do not have an automation project. You have a hobby.

---

## How much does AI automation cost for a small business?

**For a small service business in 2026, the number that belongs in an ROI model is usually a few hundred dollars a month once you add platform + models + the labor to build and keep the thing alive — not the $20 starter tile on a pricing page.** Treat vendor list prices as dated inputs. They move. Always re-check the vendor page the week you budget.

Cost is five buckets. Skip any one of them and your "ROI" is marketing.

| Bucket | What goes in | Typical planning range (small service shop) | Recurring? |
|---|---|---|---|
| **Platform** | n8n, Make.com, Zapier, or a focused SaaS | $0–$200/mo for most first stacks; Zapier task volume can climb faster | Yes |
| **Models / API** | Claude Sonnet 5, GPT-5.4 mini, Gemini 3.5 Flash, occasional flagship | $15–$150/mo if you keep flagship calls rare | Yes |
| **Adjacent SaaS** | CRM, forms, email, sheets, booking — often already paid | $0–$150/mo incremental | Yes |
| **Build labor** | Design, mapping, testing, first prompt pass | 8–25 focused hours for v1 of one workflow | One-time, then amortize |
| **Maintenance + failure** | Auth drift, prompt drift, broken fields, exception handling | 1–4 hours/month + a cash reserve for a bad miss | Yes |

I hold Make.com AI Automation certifications and I have shipped a lot of this on n8n, including work alongside the n8n team. The receipt that matters here is not the logo. It is this: **the subscription is rarely the expensive line.** Your hours are.

### What to put in the model (and what to leave out)

Include a dollar only if it changes because of this automation, or if it is labor you will actually spend.

**Include**

- New platform seats or a plan upgrade you would not buy otherwise
- Model/API usage this workflow will create
- Incremental email/SMS volume if it is material
- Build hours × a real rate (yours or a contractor's)
- Monthly maintenance hours × the same rate
- A failure reserve (refund, missed lead, emergency fix hours)

**Leave out or mark as sunk**

- The CRM you already pay for and will keep either way
- Your laptop, office, and accounting software
- "Innovation" budget with no workflow attached
- Agency retainers you are not actually hiring
- Soft "brand value" from having an AI slide in the deck

If a cost exists with or without the workflow, it is not an automation cost. Putting it in the model makes the project look worse than it is, which is how good workflows die in committee.

### Platform ranges as of August 2026 (supporting inputs)

These are **supporting numbers for the worksheet**, not a buying guide. Plans change. I am citing the vendor pages as of August 2026. Re-open them before you sign.

| Platform | How they bill | Published entry / common small-biz tier (Aug 2026) | What blows the number up |
|---|---|---|---|
| **n8n Cloud** | Per **workflow execution** (one full run, not per step) | [Starter 20€/mo billed annually](https://n8n.io/pricing/) for 2,500 executions; [Pro 50€/mo billed annually](https://n8n.io/pricing/) for 10,000 | High-frequency cron (every 5 minutes) burns executions; Business is 667€/mo billed annually |
| **n8n Community (self-host)** | License $0; you pay the VPS and your time | $0 software; a small VPS is often in the high-single to low-double digits per month | Your maintenance hours, backups, updates, and the night something dies |
| **Make.com** | **Credits** — most non-AI modules spend 1 credit per module action | [Free $0 / 1,000 credits](https://www.make.com/en/pricing); Core **$12/mo**, Pro **$21/mo**, Teams **$38/mo** at the 10,000-credit tier on the annual-equivalent prices shown Aug 2026 | Iterators, pagination, and AI modules that add token-based credit burn; monthly billing is higher than annual |
| **Zapier** | **Tasks** (a step that does work) | [Professional 2,000 tasks/mo at $49/mo annual or $73.50/mo month-to-month](https://zapier.com/pricing); 10,000 tasks $129/$193.50 | Chatty multi-step Zaps; 100,000 tasks is $489/$733.50 on Professional |

n8n's own pricing page is explicit: you pay for a full execution, not each step. That is why a 12-node lead flow can be cheaper on n8n than the same graph on a per-task or per-module meter. Make bills the module clicks. Zapier bills the tasks. If you want the product comparison rather than the cost-model input, use [n8n vs Make vs Zapier in 2026](/blog/n8n-vs-make-vs-zapier-in-2026-which-automation-tool-is-right-for-your-business) and the honest Zapier check in [is Zapier still worth using in 2026](/blog/is-zapier-still-worth-using-in-2026-honest-comparison-with-n8n-and-make). For the free/self-host fork, see [is n8n free, and when self-hosting wins](/blog/is-n8n-free-what-you-get-on-the-free-plan-and-when-to-self-host).

I am not going to pretend a VPS is "free n8n." The license can be $0. The on-call is not.

### Model spend: keep flagship off the hot path

| Job | Default model I put in a cost model | Why |
|---|---|---|
| Labels, routing, invoice-reminder copy, inbox buckets | Gemini 3.5 Flash, GPT-5.4 mini, or Claude Sonnet 5 | Volume jobs; pennies matter |
| Client-facing drafts that need voice | Claude Sonnet 5 | Better control per dollar than flagship on every send |
| Rare hard reasoning (odd contract language, nasty edge cases) | Claude Opus 4.8 or GPT-5.5 | Pricey; do not put it on every form submit |
| Local / cheap batch if you already run it | Llama 4 | Only if you can operate the box; not a default for a 3-person shop |

Vendor model list prices move. For the worksheet, pick a monthly **allowance** ($25 / $60 / $120) from a week of logging, then re-forecast. Do not use a blog's 2025 token table as if it were a contract.

### Three stack scenarios (planning, not quotes)

| Scenario | Platform | Models | Incremental SaaS | Build hours | Maint hours / mo | Planning cash / mo after go-live |
|---|---|---|---|---|---|---|
| **Bootstrap** | Self-hosted n8n + existing Google/Microsoft | Workhorse only | $0 new | 12–20 | 2–3 | ~$10–$60 + your time |
| **Hosted solo / small team** | n8n Cloud Starter/Pro or Make Core/Pro | Workhorse + light Sonnet | $0–$40 | 10–18 | 1–2 | ~$50–$180 |
| **High-volume inbound** | n8n Pro or Make Pro/Teams; Zapier only if the task math still wins | More calls, still rare flagship | CRM upgrade possible | 16–30 | 2–4 | ~$150–$400 before Zapier-scale task bills |

These are ranges I use when I sit down with a founder and a spreadsheet. They are not invoices.

### Build vs hire vs "AI employee" theater

| Option | What you actually buy | Cost shape | When it loses |
|---|---|---|---|
| **One scoped workflow** | A trigger, a model step, a write-back, an alert | Days of build + a small stack | Process is still undefined |
| **Part-time hire / VA** | Judgment + messy exceptions | Monthly salary or contractor | You only needed the repeatable 70% |
| **"AI employee" product** | A seat, a chatbot, a demo | Subscription + prompt babysitting | It cannot write to your real systems of record |

If the work is "copy this field, draft that email, chase this invoice," automation usually beats a hire on the repeatable slice. If the work is "calm an angry client and renegotiate scope," a hire or you still wins. Do not put that second category in the savings column.

### The cost of doing nothing (this belongs in the model too)

A blank cell for "do nothing" is how bad projects look cheap and good projects look optional.

| Inaction | How to price it for one quarter |
|---|---|
| Slow lead reply | Leads that went cold × your close rate × average first invoice. Use your CRM, not a national average. |
| Late invoices | Average days late × (monthly collections / 30) × a conservative cost-of-cash assumption you write down |
| Onboarding rework | Hours spent rebuilding kickoff packets × loaded rate |
| Founder-as-VA | Hours you spent on admin × **your** opportunity rate, not the intern rate |

You will not have perfect numbers. You need **labeled** numbers. A wrong number with a source beats a pretty number with none.

### Mini worksheet: monthly stack only

Fill this before you touch the full ROI table in the next section.

| Input | Your number | Notes |
|---|---|---|
| Platform $ / mo | | Quote the plan you will actually sit on, not the free-trial tile |
| Model $ / mo | | Log a week, then × 4.3 |
| Incremental SaaS $ / mo | | Only new spend |
| **Stack subtotal** | `=platform+models+saas` | This is **not** ROI yet |

If this subtotal already scares you, you are either on the wrong billing unit (tasks vs executions) or you are automating a process that does not run often enough to matter. Fix the process choice first. The five workflows that usually repay first are in [AI automation for solopreneurs](/blog/ai-automation-for-solopreneurs-the-5-workflows-that-save-the-most-time).

---

## What is the ROI of AI automation for a service business?

**The ROI of AI automation for a service business is the value of hours you stop spending on repeatable work — priced at a fully loaded or opportunity rate — minus stack, amortized build, maintenance labor, and a failure reserve.** If a vendor slide skips those last two lines, it is not a model. It is a brochure.

I will give you the formula, a copy-paste worksheet, and a **worked example with every assumption labeled**. That example is not a client result. It is arithmetic you can replace with your own inputs.

### The formula I actually use

```
Annual labor value   = Annual hours saved × Loaded hourly rate
Annual operating cost = (Stack $/mo × 12) + (Maint hours/mo × 12 × Loaded hourly rate) + Failure reserve
Annualized build      = (Build hours × Builder rate) / Years you will keep the workflow
Annual net            = Annual labor value − Annual operating cost − Annualized build
ROI                   = Annual net / (Annualized build + Annual operating cost)
Payback (months)      = Build $ / Monthly net (before amortizing the build)
```

In a sheet:

- `LaborValue = HoursSavedPerWeek * WeeksPerYear * LoadedRate`
- `StackAnnual = StackMonthly * 12`
- `MaintAnnual = MaintHoursPerMonth * 12 * LoadedRate`
- `BuildCost = BuildHours * BuilderRate`
- `MonthlyNet = (HoursSavedPerWeek * 4.33 * LoadedRate) - StackMonthly - (MaintHoursPerMonth * LoadedRate)`
- `PaybackMonths = BuildCost / MonthlyNet`
- `ROI = (LaborValue - StackAnnual - MaintAnnual - FailureReserve - BuildCost) / (BuildCost + StackAnnual + MaintAnnual + FailureReserve)`

Use 4.33 weeks per month for monthly views, or 50–52 weeks for annual. Pick one and stay consistent. I use **50 weeks** when the shop actually takes time off, and I write that down.

### Loaded labor is not the wage on the offer letter

If you price saved hours at cash wage only, you understate return for employees and you overstate it when the person is you and you could have been selling.

The U.S. Bureau of Labor Statistics [Employer Costs for Employee Compensation (March 2026)](https://www.bls.gov/news.release/ecec.nr0.htm) put civilian workers at **$49.32 per hour** in total compensation: **$33.72** wages and salaries and **$15.60** benefits. Benefits were **31.6% of total compensation**. Against wages, that is a load of about **1.46** (`49.32 / 33.72`). Private industry was $46.60 total, $32.60 wages, $14.01 benefits.

That is a **national average across jobs**, not your bookkeeper and not your closer. Use it as a default load factor when you do not have a better internal number — then replace it.

| Person whose time you are freeing | Rate to use | Why |
|---|---|---|
| W-2 coordinator / VA you already employ | Cash wage × 1.30 to 1.50, or your actual burden | Benefits, payroll tax, tools, paid time off |
| Contractor you will reduce hours for | Their invoice rate | That is the cash that stops leaving |
| Founder / rainmaker | Opportunity rate (billable or a conservative close-value per hour) | Their $32 "wage" is a lie; their calendar is the P&L |
| Nobody — the task just... sits | $0 labor, but price the **delay cost** | Unworked invoices are not free |

Do not mix rates inside one line. If the coordinator does the admin and you do the build, use two rates. Write both on the sheet.

### Copy-paste ROI worksheet

Duplicate this table into Notion, Airtable, or a sheet. Fill the **Input** column before you create an n8n account.

| Line | Input (you fill) | Formula | Output |
|---|---|---|---|
| A. Hours saved / week (touch + rework only) | | From the time study in the next section | |
| B. Weeks / year | | I default to `50` | `=B` |
| C. Loaded rate of the person saved ($/hr) | | Wage × load, or opportunity rate | |
| D. Builder rate ($/hr) | | Often you; can equal C | |
| E. Build hours (v1 + first revision) | | Clock time, not "a weekend vibe" | |
| F. Maintenance hours / month | | Include prompt fixes and auth | |
| G. Stack $ / month | | Platform + models + incremental SaaS | |
| H. Failure reserve $ / year | | One miss you can live with | |
| I. Annual hours saved | | `=A*B` | |
| J. Annual labor value | | `=I*C` | |
| K. Build cost (one-time) | | `=E*D` | |
| L. Annual stack | | `=G*12` | |
| M. Annual maintenance labor | | `=F*12*C` | |
| N. Year-1 total cost | | `=K+L+M+H` | |
| O. Year-1 net | | `=J-N` | |
| P. Year-1 ROI | | `=O/N` | |
| Q. Monthly net (pre-amortization) | | `=(A*4.33*C)-G-(F*C)` | |
| R. Payback (months) | | `=K/Q` | |

**Rule I will not bend:** if row A is empty, you do not buy a tool. Guessing "eh, 10 hours" so the ROI looks pretty is how you fund a graveyard of half-built scenarios.

### Worked example — labeled assumptions, not a client result

I am going to run one hypothetical shop through the sheet. If you quote this as "William's client saved $X," you are misquoting me.

**ASSUMPTIONS (every one is a label, not a measurement from a named company)**

| ID | Assumption | Value | Why I picked it |
|---|---|---|---|
| A1 | Shop type | 3-person professional services (hypothetical) | Common shape: founder + coordinator + delivery |
| A2 | Process | Lead follow-up + invoice reminders (two workflows, one stack) | High frequency, low taste required |
| A3 | Person saved | Coordinator | They own the inbox and AR chase today |
| A4 | Cash wage | $32 / hour | A planning wage, not a salary survey claim |
| A5 | Load factor | 1.46 | Rounded from BLS March 2026 civilian total ÷ wages ([ECEC](https://www.bls.gov/news.release/ecec.nr0.htm)) |
| A6 | Loaded rate C | $46.72 / hour | `32 * 1.46` |
| A7 | Hours saved / week A | 6.5 | Touch time + rework only; wait time excluded (see time study) |
| A8 | Weeks / year B | 50 | Two weeks the shop is not operating |
| A9 | Builder | Founder | They will click the first version together |
| A10 | Builder rate D | $150 / hour | Opportunity rate: what they could bill instead. **Not** a claimed revenue figure. |
| A11 | Build hours E | 16 | Two scoped v1s + testing + one revision week |
| A12 | Maint hours / month F | 2.0 | Auth, a prompt tweak, one broken mapping |
| A13 | Stack G | $115 / month | n8n Cloud Pro-class host (~50€ list on [n8n pricing](https://n8n.io/pricing/), FX rounded) + $40 models + $20 incremental |
| A14 | Failure reserve H | $400 / year | One messy miss: a few emergency hours plus a small make-good |
| A15 | Conservative case | 50% of hours | Same costs, 3.25 hours/week saved |

**Base-case arithmetic**

| Line | Math | Result |
|---|---|---|
| Annual hours I | `6.5 × 50` | 325 |
| Annual labor value J | `325 × 46.72` | **$15,184** |
| Build cost K | `16 × 150` | **$2,400** |
| Annual stack L | `115 × 12` | **$1,380** |
| Annual maint M | `2 × 12 × 46.72` | **$1,121** |
| Year-1 cost N | `2400 + 1380 + 1121 + 400` | **$5,301** |
| Year-1 net O | `15184 − 5301` | **$9,883** |
| Year-1 ROI P | `9883 / 5301` | **~186%** |
| Monthly net Q | `(6.5 × 4.33 × 46.72) − 115 − (2 × 46.72)` | **~$1,107** |
| Payback R | `2400 / 1107` | **~2.2 months** |

Year 2 drops the $2,400 build (unless you rebuild). Same savings against `$1,380 + $1,121 + $400 = $2,901` is a much fatter net. That is why maintenance discipline matters: year 2 is where the model looks obvious, and year 2 is where neglected workflows quietly die.

**Conservative case (A15) — I run this before I let anyone get excited**

| Line | Conservative | Result |
|---|---|---|
| Hours / week | 3.25 | Half the time study |
| Annual labor value | `162.5 × 46.72` | **$7,592** |
| Year-1 cost | unchanged | **$5,301** |
| Year-1 net | `7592 − 5301` | **$2,291** |
| Year-1 ROI | `2291 / 5301` | **~43%** |
| Monthly net | `(3.25 × 4.33 × 46.72) − 115 − 93.44` | **~$449** |
| Payback | `2400 / 449` | **~5.3 months** |

Still positive. If your conservative case goes negative, you do not have a tool problem. You have a volume problem or a process that does not repeat.

### What most ROI decks skip (and why I am loud about it)

I have sat through a lot of automation pitches. The slide looks like this:

1. "Your team spends 20 hours a week on this"
2. "Our platform is $99/month"
3. "That is $4,000 of labor vs $99. 40× ROI"

Three lies hide in that:

1. **The 20 hours is calendar time, not touch time.** Half of it is waiting on the client.
2. **$99 is not the cost.** Build + maintenance + models + the first ugly failure are the cost.
3. **They use the founder's $250 rate on work a $32 coordinator does.** That inflates ROI so the close is easy.

If you catch a vendor doing this, ask them to fill rows F, H, and the touch-vs-wait split. Watch the room get quiet.

### Year 1 vs year 2 vs "we rebuilt it in month four"

| Horizon | What you should expect | How to treat it on the sheet |
|---|---|---|
| **Days 1–30** | Negative or noisy. You are paying build. Savings are partial. | Do not judge ROI here |
| **Months 2–3** | First real payback if volume is real | Compare to row R |
| **Months 4–12** | Prompt drift, API field changes, one auth outage | This is why row F exists |
| **Year 2** | Best economics if you did not rebuild | Rebuild hours go back into K |
| **Rebuild** | New tool, new CRM, new offer | New project. New worksheet. Do not glue it onto the old ROI. |

A workflow you rebuild twice a year has a fake year-1 ROI. Count the second build.

### Revenue-side ROI (optional, and I keep it conservative)

Time savings are the clean line. Revenue is dirtier. You may still add it **below** the labor model, never instead of it.

| Revenue effect | Allowed in my sheet if... | How I cap it |
|---|---|---|
| Faster first response → more closes | You have reply-time and close-rate history | Use **half** the implied lift |
| Fewer unpaid invoices → cash sooner | You can see days-sales-outstanding | Cost-of-cash only, not "we collected more forever" |
| More capacity → more projects | You are turning away work today | One extra project × contribution margin, not gross |

If you cannot point to a number in your own CRM or books, the revenue line is $0. Hope is not a cell format.

### Decision rule I use on strategy calls

| Year-1 conservative ROI | What I tell the founder |
|---|---|
| Negative | Do not build. Change the process or pick a higher-frequency workflow. |
| 0–40% and payback > 9 months | Build only if strategic (compliance, quality) and keep scope tiny |
| 40–100% and payback < 6 months | Build. Draft-only on client-facing sends until trust is earned. |
| >100% and payback < 3 months | Build now. The risk is delay, not the stack. |

Under $1M revenue, this rule still holds. Scale of the company does not excuse an empty row A. The FAQ covers that question in plain language.

### Sensitivity: the three sliders that actually move the number

| Slider | Move it | What happens |
|---|---|---|
| Hours saved | Cut A by 50% | This is the honest stress test |
| Rate | Swap founder $150 onto coordinator work | ROI explodes and becomes a lie |
| Maintenance | Set F to 0 | Brochure math. I will not sign off on it. |

If your "yes" depends on F = 0 or on pricing coordinator work at founder rate, the project is not ready.

### Where the first dollar of ROI usually comes from

I am not going to recap a tool catalog here. I am going to point at frequency.

| Process | Why the math clears | Why it fails |
|---|---|---|
| Lead follow-up | Happens all week; delay is expensive | You have no inbound |
| Onboarding / intake | Same packet every "yes" | You take two clients a year and enjoy the ritual |
| Invoice reminders | Cash, not vibes | Your terms are chaos and every invoice is custom |
| Inbox triage | Daily touch time | You refuse to use labels |
| Content repurposing | Compounds, slower cash | You do not publish |

Map those to your week, then read the tactical build order in the [solopreneur five-workflow pillar](/blog/ai-automation-for-solopreneurs-the-5-workflows-that-save-the-most-time). This post tells you whether the hours are real. That post tells you which hours to steal first.

Rule-based field moves (form → CRM) are cheap and should sit in the same model as the model calls. If you are fuzzy on that split, [AI automation vs regular automation](/blog/the-difference-between-ai-automation-and-regular-automation-and-why-it-matters) is the distinction to lock before you price "AI" as a separate miracle.

---

## How do I calculate time savings from AI automation?

**You calculate time savings with a one-week (better: two-week) time study that separates touch time, wait time, and error rework — then you only put touch + rework into row A of the worksheet.** Calendar blocks and "I feel like I spend all day in Gmail" are not inputs. They are complaints.

If you skip this section and jump to a tool trial, you will automate the wrong hour.

### The three clocks (use all three or your savings are fiction)

| Clock | Definition | Goes into row A? | Example |
|---|---|---|---|
| **Touch time** | Hands on keyboard / eyes on the record, doing the work | **Yes** | Reading the lead, typing the reply, logging the CRM, building the invoice |
| **Wait time** | Elapsed time while you are not working the item | **No** (unless you are on-call staring at it) | Client takes 3 days to send a W-9; invoice sits in "draft" overnight |
| **Error rework** | Time to fix a miss, a wrong field, a bounce, a "wait I sent the old PDF" | **Yes** | Re-issuing an invoice, apologizing, correcting the CRM stage |

Wait time can still have a **cash** cost (late payment, cold lead). That belongs in the "cost of doing nothing" or a conservative revenue line — not in hours saved. Automation does not give you back the two days the client ghosted. It gives you back the 11 minutes you spent poking the record.

### Sample-week protocol (do this before you buy)

Run this for **five full working days**. Ten is better if your week is lumpy.

1. **Pick 1–3 candidate processes**, not your whole company. Lead follow-up, invoicing, and onboarding cover most service shops.
2. **Write the start and end of each process** in one sentence. "From form submit to first human reply logged in the CRM." If you cannot, you are not ready to time it.
3. **Log every instance**, not a vibe. A row per lead, per invoice, per kickoff.
4. **Split the clocks** on every row: touch, wait, rework.
5. **Tag the trigger** (form, email, Friday ritual, Slack DM).
6. **At week's end, sum touch + rework only.** Divide by the number of instances. Multiply by a normal week's volume, not your busiest Tuesday.

| Field | What you write | Example |
|---|---|---|
| Date | Day of the sample | 2026-08-11 |
| Process | One of your 1–3 | Lead follow-up |
| Instance ID | Email or deal name | river-co-form-041 |
| Touch minutes | Active work | 14 |
| Wait hours | Elapsed, not worked | 36 |
| Rework minutes | Fixes after a miss | 0 |
| Would a rule have been enough? | Y/N | N — needed a drafted reply |
| Notes | What made it slow | Looked up old proposal first |

If you hate logging, set a 3-minute timer the moment you start the task and a 3-minute timer when you stop. Ugly data beats no data.

### What a filled week looks like (hypothetical log, not a client extract)

**ASSUMPTIONS:** 5-day sample, one coordinator, inbound leads + AR. Volume is invented for teaching.

| Process | Instances | Total touch min | Total rework min | Wait hours (ignored for A) | Touch+rework hours |
|---|---|---|---|---|---|
| Lead follow-up | 18 | 210 | 25 | 140 | 3.9 |
| Invoice reminders | 9 | 95 | 40 | 80 | 2.3 |
| Onboarding packets | 2 | 70 | 15 | 20 | 1.4 |
| **Week total** | 29 | 375 | 80 | 240 | **7.6** |

Row A is not automatically 7.6. Ask: **what share of this can a workflow take without you?** If the model drafts and you still spend 4 minutes editing, you do not save 14 minutes. You save 10. Be a grown-up about that.

A useful haircut:

| Claimed save | Haircut I apply before it hits the sheet |
|---|---|
| "The whole task disappears" | 80% if a human still approves; 60% if the input quality is messy |
| "We'll auto-send" | 90% of touch, **plus** a bigger failure reserve |
| "We'll only draft" | 50–70% of touch, smaller failure reserve |
| "We'll just sync fields" | 90%+ of the copy-paste minutes; 0% of the judgment minutes |

Draft-only is how you keep failure cost from eating the model. Auto-send is how you look fast and occasionally look reckless.

### Touch vs wait: the mistake that inflates every vendor demo

A lead arrives Monday 9:12. You reply Monday 9:26. Elapsed: 14 minutes. Touch: 6 minutes of reading and typing, 2 minutes of CRM, 1 minute of "where did they come from." Wait: the other 5 minutes you were on a call.

A vendor says "14-minute cycle time, we can do it in 30 seconds, you save 13.5 minutes × 20 leads."

No. You save **~9 minutes of touch**, and you might save **win-rate** on the elapsed time. Those are different cells.

| Metric | Use it for | Do not use it for |
|---|---|---|
| Elapsed cycle time | SLA, close-rate hypotheses | Hours saved |
| Touch time | Row A | Marketing tweets |
| Instances / week | Scaling the week to a year | Assuming next month matches this week without checking seasonality |

### Error rework is where "AI" earns a seat — or loses it

Regular automation moves a field. AI automation reads messy language and writes a draft. That is the [difference that matters](/blog/the-difference-between-ai-automation-and-regular-automation-and-why-it-matters). Rework tells you which one you need.

| Rework pattern | What it usually means | What to automate |
|---|---|---|
| Same typo / same missed field | The form is bad | Fix the form; maybe a required-field nudge |
| Wrong CRM stage every time | Humans guessing | Rules, not a model |
| Tone-deaf first replies | Your template is stale | Model draft + your edit |
| Wrong invoice line items | Offer catalog is tribal knowledge | Do **not** fully automate until the catalog is written down |
| "I had to redo the whole packet" | Process has no source of truth | Onboarding workflow after you write the packet once |

If rework is high because the process is undefined, automation will reprint the confusion faster. Time-study first. Build second. That order is the whole post.

### How to turn a sample week into row A

Use this sequence. Write the outputs on the worksheet.

1. **Sum touch + rework minutes** for the process.
2. **Convert to hours** (`minutes / 60`).
3. **Apply the haircut** for draft-vs-send and leftover human time.
4. **Sanity-check against volume.** `hours / instances` should look like a number a human would believe (2–20 minutes for a lead reply, not 3 hours unless you are writing a custom proposal).
5. **Annualize with a boring week**, not launch week.
6. **Run the 50% conservative case** before you shop for tools.

| Step | Example (lead follow-up only) |
|---|---|
| Raw touch+rework | 235 minutes = 3.92 hours |
| Haircut (draft-only, keep 4 min/lead edit) | 18 leads × 4 min = 72 min still human → save `235 − 72 = 163` min = **2.72 hours** |
| Conservative 50% | **1.36 hours/week** |
| At $46.72 loaded | Base labor value ≈ `$127/week` → ~`$6,350/year` at 50 weeks — **before** stacking invoicing |

Add processes only after each one has its own row. A blended "we save 10 hours" with no process list is how you automate Slack noise and miss invoicing.

### What not to count as saved time

- Meetings you still have to take
- Strategy work you *wish* you had time for (that is capacity, price it only if you will sell it)
- Learning the new tool (that is build, row E)
- Staring at a dashboard you built to feel modern
- Time a client spends filling a better form (that can be good UX; it is not your hours back)

Capacity only becomes money if you sell it, cut a contractor, or stop missing SLAs you already priced. Otherwise it is quality of life. Quality of life is allowed. Just do not call it 186% ROI.

### After go-live: the 30-day audit (or the model starts lying)

Week 0 numbers are a forecast. Week 4 numbers are the business.

| Check (day 30) | Pass | Fail |
|---|---|---|
| Instances processed by the workflow | Within 20% of the sample-week volume | You timed a weird week or the trigger is wrong |
| Human minutes per instance | At or below the haircut | The draft is junk; you are rewriting everything |
| Error rate | No increase vs manual | Add a human gate; shrink scope |
| Maintenance hours | ≤ F | You under-counted; update the sheet and decide if it still pays |
| Failures | Alert fired, blast radius small | Silent fail — that is a product bug in your ops |

If day-30 human minutes did not drop, you did not automate the task. You added a tool to the task. That is negative ROI with extra logins.

### A prompt I use to classify raw time-study notes

Code blocks here are prompts and n8n-shaped config only. Paste your notes; do not invent minutes the log did not record.

```text
You are classifying a service-business time study for an ROI worksheet.

Rules:
- Touch = active work by our team (minutes).
- Wait = elapsed time with no team hands on the record (hours ok).
- Rework = fix-up after a miss (minutes).
- Never move wait into touch.
- If a note is ambiguous, mark confidence low and leave minutes blank.
- Do not invent instance counts.

Return a markdown table with columns:
instance_id, process, touch_minutes, wait_hours, rework_minutes, confidence, notes_quote

Model: Claude Sonnet 5 (or GPT-5.4 mini / Gemini 3.5 Flash for cheap volume).
```

### n8n-shaped logger (pattern, not a paste-and-pray export)

If you want the sample week to happen, remind the human. A daily ping plus a form beats a forgotten spreadsheet.

```json
{
  "name": "Time-study daily logger",
  "nodes": [
    {
      "name": "Cron 4pm weekday",
      "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": { "hour": 16, "weekdayOnly": true }
    },
    {
      "name": "Slack reminder",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "text": "Log today's touch / wait / rework for lead follow-up, invoices, onboarding. Empty rows are fine. Guessed hours are not."
      }
    }
  ]
}
```

That is a reminder, not a measurement. Measurement is the table the human fills. I will not pretend a webhook "automatically knows" how long you stared at a PDF.

### Which processes deserve a time study first

Score each candidate. Build nothing until one of them clears.

| Score (1–5) | Frequency | Pain if late | Judgment required | Data already in a tool |
|---|---|---|---|---|
| High (study this week) | Daily / several times a week | Lost cash or lost lead | Low–medium | Form, CRM, Stripe, inbox |
| Medium | Weekly | Annoyance | Medium | Half in Slack folklore |
| Park it | Monthly or rarer | Low | High | Nowhere |

Onboarding often wins the "first build" argument even when weekly hours are smaller, because a blown kickoff taxes margin on every new client. That is why I wrote [the first automation a small business should build](/blog/the-first-ai-automation-every-small-business-should-build) as intake, not as a chatbot. Your time study will tell you if *your* first dollar is follow-up or kickoff. Believe the log.

### A one-page field sheet you can print

| Time | Process | Touch min | Rework min | Wait (hrs) | Done by a rule? | Notes |
|---|---|---|---|---|---|---|
| | | | | | Y/N | |
| | | | | | Y/N | |
| | | | | | Y/N | |
| | | | | | Y/N | |
| | | | | | Y/N | |

Five rows a day is enough. If you need a binder, you are over-collecting and under-deciding.

---

## How do I keep the ROI model honest after the workflow ships?

**You keep the model honest by replacing forecast hours with measured hours at day 30 and day 90, leaving maintenance on the sheet, and only converting freed time into money when you sell it, cut spend, or stop missing a priced SLA.** A worksheet you never reopen is just a prettier version of the vendor deck.

This is still ROI work. It is not a second cost catalog.

### The 30 / 90 replace-the-guess ritual

| When | What you overwrite | What you are not allowed to do |
|---|---|---|
| **Day 0** | Forecast from the time study + haircut | Buy the annual plan to "get it over with" before A is filled |
| **Day 30** | Instances/week, human minutes/instance, actual stack $ | Quietly drop row F because "it's been fine" |
| **Day 90** | Maintenance hours (now you have three months), one failure if it happened | Glue a rebuild into the old ROI and call it year-1 success |
| **Renewal** | Vendor page, current FX, current model bill | Assume August 2026 tiles still apply |

Print the day-0 sheet. Put the day-30 numbers in a second column. If you are embarrassed by the delta, good. That is the point.

### Second worked example — solo founder, labeled assumptions

Same rules: **not a client result.** A one-person shop often has no $32 coordinator. The rate is opportunity, and the hours are whatever the founder still does after dinner.

**ASSUMPTIONS**

| ID | Assumption | Value |
|---|---|---|
| S1 | Solo consultant, hypothetical | One human, no W-2 ops hire |
| S2 | Process | Invoice chase + a draft-only lead reply |
| S3 | Hours saved / week (touch + rework, haircut already applied) | 4.0 |
| S4 | Opportunity rate | $125 / hour (what they could bill; not a claimed book of business) |
| S5 | Weeks | 48 (they take more time off than the 3-person shop) |
| S6 | Build hours × rate | 12 × $125 = $1,500 |
| S7 | Maint hours / month | 1.5 (they are the maintainer) |
| S8 | Stack / month | $70 (Make Pro-class or n8n Starter-class + light workhorse models; re-check [Make](https://www.make.com/en/pricing) and [n8n](https://n8n.io/pricing/)) |
| S9 | Failure reserve / year | $250 |
| S10 | Conservative hours | 2.0 / week |

**Base case**

| Line | Math | Result |
|---|---|---|
| Annual hours | `4 × 48` | 192 |
| Annual labor value | `192 × 125` | **$24,000** |
| Year-1 cost | `1500 + (70×12) + (1.5×12×125) + 250` | `1500 + 840 + 2250 + 250` = **$4,840** |
| Year-1 net | `24000 − 4840` | **$19,160** |
| Monthly net | `(4 × 4.33 × 125) − 70 − (1.5 × 125)` | `2165 − 70 − 187.50` ≈ **$1,908** |
| Payback | `1500 / 1908` | **~0.8 months** |

That looks almost too good. It is, unless the $125 is real *and* they actually sell the four hours. If they spend the four hours on Twitter, year-1 net in cash is closer to **−$4,840** plus nicer evenings. I still count quality of life. I will not let them put $24,000 on a lender slide.

**Conservative case (2 hours/week, same costs)**

| Line | Result |
|---|---|
| Annual labor value | `96 × 125` = **$12,000** |
| Year-1 net | `12000 − 4840` = **$7,160** |
| Monthly net | `(2 × 4.33 × 125) − 70 − 187.50` ≈ **$825** |
| Payback | `1500 / 825` ≈ **1.8 months** |

Still a build — **if** the hours show up in the log. Solo founders lie to themselves about touch time more than anyone I work with. The sample week is not optional because you "already know."

### What you are allowed to do with freed hours

| Use of the hours | Counts as cash ROI? | How to record it |
|---|---|---|
| You take another paid project | Yes | Contribution margin of that project, once |
| You cut a contractor's weekly hours | Yes | Invoice dollars that stop |
| You stop missing a contractual SLA | Yes | The fee or churn you were actually risking — conservative |
| You finish work at 6 instead of 8 | No | Label it "life." Keep it off the lender sheet. |
| You start a new offer you have not sold | Not yet | $0 until a paid invoice exists |

If you cannot pick a row, default to life. Inflating ROI to impress yourself is how stacks get bloated.

### Fake ROI report vs a report I will believe

| Fake | Believable |
|---|---|
| "20 hours/week" with no instance log | A table of instances, touch minutes, rework minutes |
| Founder rate on coordinator work | Two rates, labeled |
| Stack = the free-trial tile | Stack = the plan you will sit on in month 3 + models |
| Maintenance = 0 | Maintenance ≥ 1 hour/month or I assume you will abandon it |
| "AI will close 30% more deals" | Reply-time history or $0 revenue line |
| Tool comparison as the entire memo | Tool prices as one input; process choice as the memo |
| Year-1 ROI after two silent rebuilds | Rebuild hours added back into build cost |

If your internal memo looks like the left column, do not [book a call](/contact) until you have a week of logs. I will make you do the study anyway.

### A 90-day scorecard you can copy

| Metric | Day 0 forecast | Day 30 actual | Day 90 actual |
|---|---|---|---|
| Instances / week | | | |
| Human minutes / instance | | | |
| Hours saved / week (A) | | | |
| Stack $ / month (G) | | | |
| Maint hours / month (F) | | | |
| Failures (count + $) | | | |
| Monthly net (Q) | | | |
| Still draft-only? | Y/N | Y/N | Y/N |

Three columns. That is the whole governance system. You do not need a BI tool to stop lying to yourself.

### When the honest model says stop

Kill or freeze the workflow if any of these stay true after a revision pass:

- Day-30 human minutes per instance did not drop
- Maintenance is eating more than 40% of the labor value
- Failure reserve you would now write is larger than three months of net
- The trigger fires so rarely that you forget the workflow exists
- You rebuilt it twice and still cannot explain the happy path in five nodes

Stopping is a successful use of the worksheet. The unsuccessful use is paying for year two of a tool that never beat the conservative case.

---

## FAQ: ROI, payback, and when not to automate

### Is AI automation worth the investment for a business doing under $1M per year?

**Yes when a conservative worksheet is still positive — revenue size is the wrong gate.** A $400k shop with 6 hours a week of coordinator touch time can beat a $4M shop that automates a process that happens twice a month. Under $1M, your constraint is usually founder attention, not the $50–$150 stack. Fill rows A, F, and H. If conservative payback is inside a quarter and you will actually maintain the workflow, it is worth it. If you need a "transformation" narrative to justify the seat, it is not.

### What is the monthly cost of running n8n or Make.com for business automation?

**As of August 2026, hosted n8n commonly sits at [20€/mo Starter or 50€/mo Pro, billed annually](https://n8n.io/pricing/), and Make's published annual-equivalent prices for 10,000 credits were [$12 Core / $21 Pro / $38 Teams](https://www.make.com/en/pricing) — plus model usage, plus your maintenance hours.** Self-hosted n8n can be $0 license on a cheap VPS; you then own updates and uptime. Monthly billing on both vendors is higher than the annual tiles. Zapier is a different meter; check [Zapier's task tiers](https://zapier.com/pricing) if that is the stack you already live in. The number in the ROI sheet is stack + models + maint labor, not the pretty tile alone.

### How do I budget for AI tools and automation in 2026?

**Budget in three lines: (1) a monthly stack cap, (2) a build-hour budget for one workflow, (3) a standing maintenance block — then refuse seats that are not attached to a filled worksheet.** A sane 2026 small-shop starting shape is: one platform, one workhorse model tier (Claude Sonnet 5 / GPT-5.4 mini / Gemini 3.5 Flash), no flagship on every trigger, and a 60-minute monthly review. Re-read vendor pages when you renew; I dated the ranges in this post to August 2026 on purpose. Do not pre-buy five AI SaaS tools "to experiment." Experiment inside the worksheet.

### What is the cheapest way to automate my business with AI?

**The cheapest way is a self-hosted or free-tier workflow on a process you already do weekly, using a workhorse model, with draft-only outputs, after a time study.** Cheap is not "the $0 plan." Cheap is **lowest total cost to a positive conservative ROI**: $0 n8n on a VPS that you neglect is expensive. A $21 Make Pro scenario you keep alive can be cheap. Skip flagship models, skip Zapier task blowups, skip automating a process you have not run ten times. First build: something like [form → CRM → confirmation](/blog/the-first-ai-automation-every-small-business-should-build).

### How do I calculate the payback period for an AI automation?

**Payback in months is build cost divided by monthly net: `BuildHours × BuilderRate / ((HoursSavedPerWeek × 4.33 × LoadedRate) − StackMonthly − (MaintHours × LoadedRate))`.** If monthly net is $1,107 and build is $2,400, payback is about 2.2 months — that is the worked example above, not a promise. If monthly net is ≤ 0, payback is never. I want most service-shop v1s inside 90 days on the conservative case. Strategic or compliance builds can take longer; they still need a written reason.

### When should I not automate a process even if the hours look expensive?

**Do not automate a process you cannot describe, a process that is mostly judgment or emotion, or a process whose failure costs more than a few months of projected savings without a human gate.** Also skip low-frequency work that will not recur (a one-off migration), and skip anything you are automating to avoid writing a clear offer. High hours plus high ambiguity is a training problem or a product problem. It is not row A.

### What is a fully loaded labor rate and how do I use it in an ROI model?

**A fully loaded rate is cash wage plus the employer burden — payroll taxes, benefits, paid leave, and the tools that exist because the human exists — expressed per hour.** BLS [March 2026 ECEC](https://www.bls.gov/news.release/ecec.nr0.htm) is a public benchmark: civilian benefits were $15.60 on a $33.72 wage (about a 1.46 load). Use your actual burden if you have it. In the worksheet, loaded rate multiplies **hours saved** and **maintenance hours**. It does not automatically apply to the founder; founders often need an opportunity rate instead. Write which one you used.

### How do I account for failure cost when an automation breaks or sends the wrong thing?

**Put a yearly failure reserve on the sheet: the cash and hours of one believable miss — refund, make-good, emergency fix, one lost deal — and keep a human approval step whenever that miss would exceed about one month of projected net.** Failure cost is not "AI is risky" as a vibe. It is a cell. Draft-only shrinks it. Silent auto-send on money, legal, or angry clients inflates it. If you cannot name a miss, you have not thought about the workflow. Start at a few hundred dollars for a small shop and raise it if the workflow touches billing or public email.

---

## Book an AI automation strategy call

If you want this worksheet filled against your actual hours, rates, and stack — not a generic tool tour — [book an AI automation strategy call](/contact). Bring a week of touch-time notes if you have them. If you do not, we will design the time study first. I will not sell you a platform seat so we can invent the ROI after.
)
