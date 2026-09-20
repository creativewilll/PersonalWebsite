---
title: "Featured Snippet vs AI Overview: What Changed and What to Do About It"
slug: "featured-snippet-vs-ai-overview-what-changed-and-what-to-do-about-it"
date: "2026-09-10"
lastModified: "2026-09-10"
author: "William Spurlock"
readingTime: 21
categories:
  - "AI Visibility"
tags:
  - "featured snippet vs AI Overview"
  - "google ai overviews"
  - "featured snippets"
  - "position zero"
  - "aio"
  - "aeo"
  - "google search"
featured: false
draft: false
excerpt: "A featured snippet boxes one passage from one URL. An AI Overview generates an answer and cites several sources. Here's what changed, and what to do now."
coverImage: "/images/blog/featured-snippet-vs-ai-overview-what-changed-and-what-to-do-about-it.png"
coverImageAlt: "Abstract dark editorial visualization of a featured snippet card splitting away from a generated AI Overview panel"
seoTitle: "Featured Snippet vs AI Overview | William Spurlock"
seoDescription: "A featured snippet boxes one passage from one URL. An AI Overview generates an answer and cites several sources. Here's what changed, and what to do now."
seoKeywords:
  - "What's the difference between a featured snippet and an AI Overview?"
  - "featured snippet vs AI Overview"
  - "featured snippets 2026"
  - "Google AI Overviews"
  - "position zero vs AI Overview"
  - "featured snippet optimization"
aioTargetQueries:
  - "What's the difference between a featured snippet and an AI Overview?"
  - "Did Google replace featured snippets with AI Overviews?"
  - "Does winning a featured snippet get you cited in an AI Overview?"
  - "Can a featured snippet and an AI Overview appear on the same query?"
  - "Should I still optimize for featured snippets in 2026?"
contentCluster: "google-ai-overviews"
pillarPost: false
parentPillar: "google-ai-overviews-the-complete-playbook-for-getting-your-site-cited"
entityMentions:
  - "William Spurlock"
  - "Google AI Overviews"
  - "Featured snippets"
  - "Google Search Central"
  - "Google Search Console"
  - "AI Mode"
  - "Search Generative Experience"
  - "Google Search"
serviceTrack: "ai-visibility"
---

# Featured Snippet vs AI Overview: What Changed and What to Do About It

**A featured snippet is a classic blue-link box that lifts one passage from one URL. An AI Overview is a generated answer that sits on the same results page, rewrites the story, and cites several supporting links.** They are not two names for position zero. They are two products. The snippet playbook still teaches extractability. It does not win the Overview by itself.

I am **William Spurlock**, founder, AI Systems Architect, and Fractional AI CTO. I have been SEO-certified since 2021; the work now sits under AEO, AIO, and GEO. I have shipped **600+ automations** with **500+ live**, logged **20,000+ hours** inside agentic systems, and deleted **35,000+ hours** of client busywork across that book of work. I do not invent click-through rates, Overview coverage percentages, or client names.

This spoke owns one question: **What's the difference between a featured snippet and an AI Overview?** The July
[Google AI Overviews playbook](/blog/google-ai-overviews-the-complete-playbook-for-getting-your-site-cited)
owns how to get cited inside the generated block. This page stops at the split — what changed, what still works, and what to stop chasing.

If the Overview never names you, use
[why your business isn't showing up in Google AI Overviews](/blog/why-your-business-isn-t-showing-up-in-google-ai-overviews-and-how-to-fix-it).
If clicks fell while impressions held, use
[how to tell if AI Overviews caused a traffic drop](/blog/did-google-ai-overviews-cause-your-traffic-drop-how-to-tell).
Neither of those pages is this comparison.

---

## What's the difference between a featured snippet and an AI Overview?

**A featured snippet reverses a normal result: the extracted text comes first, then the source. An AI Overview writes a new snapshot from multiple pages and attaches supporting links.** Google still documents both as separate Search features. One is an extract. The other is a generated answer.

[Google Search Central's featured snippets page](https://developers.google.com/search/docs/appearance/featured-snippets) (last updated December 10, 2025) calls featured snippets "special boxes where the format of a regular search result is reversed, showing the descriptive snippet first." Those boxes can also appear inside a related-questions group (People Also Ask). You cannot mark a page as a snippet. Google's systems decide.

[Google Search Central's AI features page](https://developers.google.com/search/docs/appearance/ai-features) (also last updated December 10, 2025) treats **AI Overviews** and **AI Mode** as generative Search features. They surface supporting links. They do not ask you to upload a special AI file. They do not add a new schema type you must ship to "apply."

Google's user-facing help page, [Find information in faster and easier ways with AI Overviews](https://support.google.com/websearch/answer/14901683), describes an AI Overview as an "AI-generated snapshot with key information and links to dig deeper." It appears when Google's systems decide generative AI is especially helpful — for example when a person wants a short read across a range of sources. The same page says Overviews can and will make mistakes.

That is the product split I keep on the whiteboard:

| Axis | Featured snippet | AI Overview |
| --- | --- | --- |
| **What you see** | One boxed extract, then a source line | A generated snapshot, then supporting links |
| **How the text is built** | Lifted from one page, often close to the source wording | Written by a generative model from several retrieved passages |
| **Typical source count** | One URL | Several URLs as citation chips or supporting links |
| **Where it can sit** | Top of classic results, or inside People Also Ask | Above or inside the results as a Search feature; can hand off to AI Mode |
| **What a click does** | Google tries to scroll the user to the extracted section | The user may open a supporting link, stay in the snapshot, or continue in AI Mode |
| **Can you apply for it** | No | No |
| **Owner docs** | Featured snippets (Dec 10, 2025) | AI features (Dec 10, 2025) plus the Help Center snapshot page |

I also keep a third surface out of this fight so it does not pollute the scoreboard:

| Surface | What it is | Do not confuse it with |
| --- | --- | --- |
| **People Also Ask** | Expandable related questions; a featured snippet can live inside that group | An AI Overview |
| **Classic blue link** | A normal organic result under the features | A citation inside the Overview |
| **AI Mode** | A conversational follow-on that can start from "Show more" on an Overview | The Overview snapshot itself |
| **Ads** | Paid slots, labeled | A snippet or a citation |

### The extract versus the rewrite

A featured snippet is still a search result. The box is the snippet, promoted. The page behind it is one URL. If that URL changes the paragraph, the box can change or disappear on the next recrawl.

An AI Overview is not a promoted result. It is a generated block. Google's AI-features documentation says Overviews and AI Mode may use a **query fan-out** — several related searches across subtopics — then attach a wider set of supporting links than a classic web result. The sentence you read in the snapshot may not exist as a contiguous paragraph on any one page.

That is why "we won the snippet, so we should be in the Overview" is a bad inference. You won an extract. The Overview is a merge.

### What a supporting link actually is

Search Central is blunt about eligibility for AI features: to show as a supporting link in AI Overviews or AI Mode, a page must be **indexed** and **eligible to appear in Google Search with a snippet**. There are no extra technical requirements beyond that. Indexing is not guaranteed just because you met the checklist.

Read that twice. **Snippet eligibility is an Overview prerequisite, not a leftover 2018 trick.** If you `noindex` the page, you are not in the fight. If you `nosnippet` the page, you are telling Google it cannot show a snippet — and the same preview controls are the ones Search Central lists for limiting what AI features can show from your pages.

I will come back to opt-outs in the FAQ. The definition point is simpler: the Overview is allowed to cite you only if you still look like a normal, snippet-eligible result.

### What I refuse to call this

I do not call an AI Overview "the new featured snippet."
I do not call a featured snippet "position zero for AI."
I do not call Search Generative Experience the live product name. SGE was the Labs experiment. The public feature that rolled out in May 2024 is **AI Overviews**.

If a deck still says "SGE snippet," the deck is dating itself.

### Same query, two readouts

Take the query this page owns: "What's the difference between a featured snippet and an AI Overview?"

A featured snippet, if it fires, wants one boxed extract it can attribute to one URL. A clean lift looks like the first two sentences of this section — extract plus source line. The click tries to land on that heading.

An AI Overview, if it fires, can write a short snapshot that mixes:

- a definition of the box
- a definition of the generated snapshot
- a line about citations
- a line about what changed after May 2024
- supporting links to Search Central, a news recap, and a practitioner page

Those facts might live on five URLs. The snapshot can still read as one voice. That is the rewrite.

I keep a pocket example so the team does not argue from vibes:

| If you only read the snippet | If you only read the Overview |
| --- | --- |
| You get one page's wording | You get a generated blend |
| You know the source before you click | You see several chips and may click none |
| You can disagree with one author | You may not notice which sentence came from whom |
| A CMS edit can change the box on recrawl | A CMS edit on one URL may not move the snapshot |

Neither readout is "wrong." They are different jobs. If your content program only produces the left column, you are still playing 2022.

### What this page does not own

I am staying in the split on purpose. If I start rewriting the July playbook, this spoke cannibalizes the pillar.

- **How to get cited** — playbook, not this page.
- **Why you are missing from Overviews** — the June diagnostic.
- **Whether a traffic drop is Overview-driven** — the traffic-drop checklist.
- **The metric taxonomy** — the June 27 measurement pillar.
- **Local packs, Maps, or "near me"** — not this SERP, not this spoke.
- **ChatGPT or Perplexity citations** — useful, different engines, different scoreboard.

If a paragraph on this page starts sounding like a full AIO build guide, I cut it.

---

## What changed on the SERP — and why a snippet win is no longer the whole job?

**Featured snippets did not get deleted. A second, generated answer layer was added on top of Search, and that layer now answers a lot of the questions that used to stop at the box.** The job changed from "be the one extract" to "be extractable *and* citable inside a rewrite." Teams that still treat the box as the trophy are scoring the wrong surface.

Here is the timeline I use when a founder asks "when did this actually change":

| Date | What Google (or a dated report of Google) said | What it means for the split |
| --- | --- | --- |
| 2014–early 2020s | Featured snippets were the extractable-answer prize on classic Search | One URL, one box, one scroll-to-section click |
| 2023 | Search Labs ran the Search Generative Experience | Opt-in experiment, not the default SERP |
| May 14, 2024 | [Google's I/O Search post](https://blog.google/products-and-platforms/products/search/generative-ai-google-search-may-2024/) said AI Overviews would begin rolling out to everyone in the U.S., after Labs users had already used them | The generated snapshot left the lab |
| May 2024 | [Search Engine Roundtable](https://www.seroundtable.com/google-ai-overviews-launch-37389.html) reported Google saying featured snippets were not going away, and that we should call the new feature AI Overviews, not SGE | Two products, one results page |
| December 10, 2025 | Search Central still maintains **separate** featured-snippet and AI-features documents | Official split, not a rumor |
| June 3, 2026 | [Search Console launched dedicated Search Generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) | Impressions inside generative AI features became a first-party view |
| August 31, 2026 | The same Search Central blog note says those reports rolled out to all websites worldwide | You can finally see AI-feature impressions without a third-party panel |
| September 2026 | This page | You still need a human screenshot to tell snippet from Overview |

I am not going to invent a coverage percentage for how often Overviews replace snippets on your queries. Third-party panels disagree by month, country, and sample. Google's own AI-features page says Overviews are shown when systems decide they are additive to classic Search, "and as such, often don't trigger." Both things can be true: the feature is common on question-shaped queries, and it is not on every keyword.

### What the extra layer costs you

The snippet was a bargain with the user: Google showed your paragraph, and a click tried to land on that paragraph.

The Overview is a different bargain. The snapshot can answer the question well enough that the user never opens a source. Google Help is explicit that the snapshot is there so people can get the gist and then, maybe, dig deeper. Search Central adds that when people *do* click from pages with AI Overviews, Google has seen those clicks spend more time on the site. That is Google's claim, dated in their AI-features documentation. It is not your revenue model, and it is not a published click-through rate I can assign to your domain.

So the stake is not "snippets died." The stake is:

1. **The answer can now appear without your box.**
2. **Credit can go to several URLs, not one.**
3. **A snippet win can sit under an Overview that cites someone else.**
4. **A classic rank under both features can look healthy in an old rank tracker and still miss the conversation.**

If your 2023 dashboard only asked "do we have the featured snippet," it will lie to you in 2026. It will print a green cell on a query where the user already got a generated answer from three other domains.

### What did *not* change

I keep this list taped next to the panic list, because people throw out the writing habit when the box stops being the only prize.

- **Google still documents featured snippets.** December 10, 2025 is not a dead page.
- **You still cannot volunteer a page as a snippet.** There is no "apply" markup.
- **A click on a snippet still tries to scroll to the extracted section**, unless the browser or Google's confidence cannot do it.
- **Helpful, people-first, crawlable pages still matter.** The AI-features page says existing SEO fundamentals remain the work: crawl access, internal links, text that is actually in the HTML, structured data that matches visible text.
- **There is still no special AI schema type** you must add to appear in Overviews or AI Mode.

The surface grew. The fundamentals did not get replaced by a secret `AIOverview` JSON-LD type. Anyone selling you that file is selling you a file.

### The bad inference I hear every week

"We used to own position zero, then traffic dropped, so AI Overviews stole the snippet."

Sometimes the Overview is on that query and you are not cited. Sometimes the snippet moved to a competitor. Sometimes both features are absent and a different SERP pack ate the click. Those are three diagnoses. They need three screenshots, not one story.

The traffic-drop spoke owns the Search Console pattern when impressions and clicks diverge. This page only asks you to **name the surface** before you rewrite the site.

### What the user actually does on each surface

I walk this with operators who still think "if we are number one, they click."

On a **snippet-only** SERP:

1. The person sees a boxed paragraph.
2. If the paragraph finishes the job, some people leave. That is not new. Snippets were already a zero-click feature.
3. If they want the rest, they click and Google tries to scroll them to the extract.

On an **Overview-present** SERP:

1. The person sees a generated snapshot first.
2. They can accept the snapshot and never open a source. Google Help frames the snapshot as the gist, with links to dig deeper.
3. They can open a supporting link. Search Central says those clicks have looked higher quality in Google's own observations. That is Google's language, not a rate I will assign to you.
4. On mobile, in regions where both features are supported, they can open a deeper view and continue in **AI Mode** with the original query as context. That path is in the [Help Center AI Overviews article](https://support.google.com/websearch/answer/14901683). It is not a featured snippet behavior.

The user who used to argue with your boxed paragraph is now arguing with a blend. Your brand is in that blend only if a chip or a supporting link says so.

### Why "we still rank" is a weak consolation

A rank tracker that ignores features will print a position under the snapshot and call it a win. I have watched teams celebrate a recovered #2 while the Overview cited two competitors and a docs domain.

Rank is not unused. It is not the citation. It is not the box. Put it in a fourth column if you want. Do not let it overwrite B or D on the card.

---

## What still works from the snippet playbook, and what should you stop chasing?

**Keep the writing habits that made a passage easy to lift. Stop treating the box as the KPI, stop shipping a 50-word definition as the whole page, and stop assuming a snippet win is an Overview citation.** The overlap is craft. The split is the prize.

I sort the old snippet program into three buckets.

### Keep — extractability still pays both surfaces

These moves came from featured-snippet work. They still help a model find a passage it can trust.

- **Question-shaped headings** that match how a buyer asks, not how a brand likes to title a section.
- **A bold, direct answer in the first one or two sentences** under that heading.
- **Short definition blocks** a snippet can lift — roughly two to four sentences, self-contained, no "as I said above."
- **Lists and tables** for steps, comparisons, and requirements. Both features extract structure better than a 900-word wind-up.
- **Visible FAQ pairs** on the page, with answers that start with the fact. If you mark them up, the markup must match the visible text. Search Central repeats that on the AI-features page. The FAQ-focused spoke is
[FAQ schema and AEO](/blog/faq-schema-and-aeo-the-highest-l%65verage-move-for-ai-citation).
- **Indexed, snippet-eligible HTML.** If Google cannot show a normal snippet, it cannot show you as a supporting link in an Overview.

I also keep a "keep vs counterfeit keep" table, because vendors will try to sell you the left column as a 2026 AI product:

| Keep (real craft) | Counterfeit keep (skip it) |
| --- | --- |
| A 40–80 word definition a human would quote | A "snippet optimizer" plugin that hides a second copy of the paragraph |
| A table that states a verdict and a constraint | A table of adjectives with no dates and no sources |
| FAQ answers that match the visible text | FAQ JSON-LD for questions that do not appear on the page |
| Internal links to the real cluster URLs | A footer of invented "related posts" that 404 |
| The same entity string in the title, H1, and first paragraph | A new brand nickname every quarter "for testing" |

None of the left column is a new 2026 invention. It is the part of the snippet era that was always about being quotable.

### Stop — these were snippet tactics dressed up as strategy

| Habit | Why it fails now | What I do instead |
| --- | --- | --- |
| **Score the week by "position zero yes/no"** | The Overview can answer the query while your box is gone, shared, or sitting underneath | Score four cells: Overview present, you cited, snippet present, you boxed |
| **One 50-word definition as the entire URL** | A snippet can lift it. An Overview needs more than one passage when the query has sides | Keep the definition. Add a table, a steps list, dated sources, and a real FAQ |
| **Word-count games to "fit the box"** | Google never published a snippet character target that I will treat as a spec | Write the shortest honest answer, then the proof |
| **"We won the snippet, so we are in the Overview"** | Different selection, different rewrite, different source count | Check the chips. Do not infer |
| **`nosnippet` experiments to "force" a better feature** | Preview controls can also limit what AI features show from the page | Only `nosnippet` if you truly want no snippet and a thinner AI preview |
| **Buying the citation** | Ads are labeled paid slots. They are not a featured snippet and not an Overview source chip | Keep paid for demand you already named. Do not call a spend a citation |
| **Calling it SGE in the operating doc** | The live feature is AI Overviews; SGE was Labs | Rename the column. Stop training the team on a retired label |
| **Retiring snippets because Overviews exist** | Google still documents snippets as a live feature | Keep the box when it appears. Do not make it the only score |

I am opinionated here, and I hold it loosely: **teams that treated featured snippets as a traffic trick are late. Teams that treated snippets as practice for being extractable are already halfway into AIO.** The skill transferred. The dashboard did not.

### Start — the Overview needs more than one lift

This is the only "new work" I add on top of snippet craft, and it is still not a rewrite of the July playbook. It is the minimum the split demands.

1. **Write for a merge, not a single quote.** If the query has sides ("vs," "best for," "when to"), put the verdict and the constraints in a table. A model that fans out sub-queries will find those cells.
2. **Date the claims you want repeated.** "As of September 2026" plus a primary URL beats an undated adjective. I cite Search Central and the May 14, 2024 I/O post in this article for that reason.
3. **Keep the definition *and* the cluster.** The snippet wants the definition. The Overview wants to see that you cover the neighboring questions on real URLs. The playbook is the cluster home. This page is one spoke.
4. **Make the entity consistent.** Same organization name, same person name, same product name on the title, the H1, and the first paragraph. I put **William Spurlock** and **Spurlock Studios LLC** in public copy so a generated answer has one spelling to grab. I do not invent a second org name.
5. **Score both surfaces on the same query list.** Method below. Do not wait for Search Console to grow a "featured snippet vs AI Overview" toggle that Google has not shipped.

What I do **not** start here:

- A local-pack program. That is a different SERP. This spoke does not own Maps.
- A ChatGPT or Perplexity blended score. Those engines are useful. They are not this comparison.
- A promised click-through rate for either feature. I will not make one up.

### A one-week edit list that stays in this lane

If you have ten hours and a page that used to win the box, this is the pass I run before I touch anything else.

1. Search the target query logged out. Screenshot the full SERP, not the zoomed box.
2. Label the screenshot with the four cells in the next section.
3. Rewrite the H2 that matches the query so the first two sentences *are* the answer.
4. Add one comparison table or one numbered procedure. Not both if the page is already long. One structured block.
5. Add or tighten four to eight visible FAQ questions that a human would actually ask after the H2.
6. Confirm the page is indexable and snippet-eligible. No accidental `nosnippet` on the template.
7. Recrawl when you are done. Do not declare a win from the CMS preview.

If the page is vague after that pass, the problem is not "we need more snippet words." The problem is the URL has nothing a generated answer can credit. That is an AIO site problem, and it is why I still point people at a
[Premium AIO/AEO build](/contact)
instead of another title-tag sprint.

---

## How do you tell which surface you actually won?

**You tell by looking at the live SERP, not by reading a rank cell.** An Overview citation is a source chip or supporting link inside the generated snapshot. A featured snippet win is your URL in the reversed box. A blue-link rank under both is neither.

I use a four-cell card on every money query. It takes longer to explain than to fill.

| Cell | Yes means | No means |
| --- | --- | --- |
| **A. Overview present** | Google showed a generated snapshot on this query, this device, this session | Do not blame the Overview for a drop on this query today |
| **B. You cited** | Your brand or URL appears as a supporting source inside that snapshot | You did not win the Overview, even if you rank under it |
| **C. Snippet present** | A featured snippet box (or a PAA extract that is clearly a snippet) is on the page | There is no box to "lose" today |
| **D. You boxed** | The snippet source is your URL | Someone else owns the extract |

Those four booleans give you a readable state. I do not turn them into a fake composite score. I name the state.

| A | B | C | D | What I tell the founder |
| --- | --- | --- | --- | --- |
| No | — | Yes | Yes | You still have the classic box. Do not spend the week "fixing AI" on this query. |
| No | — | Yes | No | You lost the extract to another URL. Classic snippet fight. Rewrite the passage. |
| Yes | Yes | Yes | Yes | You are on both surfaces. Rare, and it still does not promise clicks. |
| Yes | Yes | Yes | No | Overview credit, snippet loss. Stop mourning the box. Protect the citation. |
| Yes | No | Yes | Yes | You have the box and missed the snapshot. This is the split this post exists for. |
| Yes | No | No | — | Generated answer, no box, you are invisible in the snapshot. Citation work, not snippet word-count. |
| Yes | No | Yes | No | You lost both prizes. Do not start with a title-tag debate. |
| No | — | No | — | Neither feature fired. Your rank tracker is describing classic results only. |

A worked card — invented for teaching, not a client report — looks like this:

| Query | A | B | C | D | State |
| --- | --- | --- | --- | --- | --- |
| What's the difference between a featured snippet and an AI Overview? | Yes | No | Yes | No | Overview miss + snippet miss |
| How do featured snippets work? | No | — | Yes | Yes | Box only |
| How do I get cited in Google AI Overviews? | Yes | Yes | No | — | Overview cite, no box |
| What is position zero? | Yes | No | Yes | Yes | Box under an Overview that cites someone else |

I would rather have twelve queries filled like that than a slide that says "AI visibility: 40%." I will not invent the 40%.

### What Search Console can and cannot settle

As of June 3, 2026, Google ships [Search Generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) in Search Console. The June post says the view covers impressions for URLs that appeared in generative AI features on Search (AI Overviews and AI Mode) and in Discover. It lists impressions, pages, countries, devices, and dates. The August 31, 2026 note on that same post says the reports then rolled out to all websites worldwide.

That is a real first-party signal. It is also not a featured-snippet report.

What I still cannot honestly claim from the standard reports I use, as of September 2026:

- A clean "this click came from the featured snippet box" column on every property
- A guaranteed split of Overview clicks versus classic clicks on every query
- A Search Console flag that says "you lost the snippet yesterday"

So I use GSC for **impressions in generative AI features** and for the usual query-level click/impression movement. I use the screenshot card for **which surface**. If you want the wider metric taxonomy — citation share, inclusion, brand mention versus recommendation — that lives on
[how to measure AI visibility](/blog/how-to-measure-ai-visibility-the-metrics-that-actually-matter-in-2026).
This page will not steal that taxonomy.

### How I capture the screenshot so the argument survives a meeting

1. Logged-out or fresh profile. Same country you sell in. Same device class you care about (mobile first if that is your traffic).
2. Paste the exact query. No extra words to "help" Google show the feature you wanted.
3. Full-page capture, not a crop of the box. You need to see whether the Overview and the snippet coexist.
4. Annotate A/B/C/D in the file name: `2026-09-10_featured-vs-aio_A1-B0-C1-D0.png`.
5. Repeat in two weeks before you rewrite the strategy. One SERP is a weather report.

If the Overview is absent for you and present for a colleague, do not turn that into folklore. Google Help says Overviews appear when systems decide they are helpful, and they are not a user toggle you can switch off as a site owner. The Web filter hides features for a *searcher*. It does not change your eligibility.

### A 30-minute Monday pass

This is the only recurring ritual I want on this spoke. It is not a full AI-visibility audit.

1. **Open the frozen list.** Twelve queries is enough. Use the same wording as last Monday.
2. **Search each one once.** Logged out. Same device class. No extra modifiers.
3. **Fill A/B/C/D.** Four letters per query. No essays in the sheet.
4. **Screenshot flips only.** If nothing changed, you do not need a new PNG.
5. **Pick one URL.** The query that flipped from "box under Overview, we are missing" to "still missing" for two weeks is the edit. Not all twelve.
6. **Do not open ChatGPT during the pass.** That is a different engine. It will eat the hour.

If the pass blows past 30 minutes, you are rewriting copy while you measure, or you are arguing about a rank cell. Close the CMS. Finish the card first.

I do not turn the twelve cards into a percentage I can market. A week that reads "8 Overview-present, 2 cites, 3 boxes" is already a meeting. A week that reads "we are at 37% AI visibility" is a slide I will send back.

### What I do after the card, in this lane only

- **Box only, you win:** keep the passage fresh. Do not bloat it into a pillar.
- **Box only, they win:** tighten the definition and the list. Classic extract fight.
- **Overview miss, you have the box:** add the table, the dated sources, and the FAQ. You are extractable and not yet mergeable.
- **Overview miss, no box:** you are not in the extract game *or* the citation game. Fix indexability and the first-sentence answer before you hire a designer.
- **Overview cite, no box:** do not force a snippet. Protect the passages that got credited.
- **Neither feature:** stop using this query to argue about AI Overviews.

If the card stays "Overview miss" after the writing pass, the next document is the playbook or the
[not-showing-up diagnostic](/blog/why-your-business-isn-t-showing-up-in-google-ai-overviews-and-how-to-fix-it),
not a longer version of this comparison.

---

## Frequently Asked Questions

### What's the difference between a featured snippet and an AI Overview?

**A featured snippet lifts one boxed passage from one URL. An AI Overview generates a snapshot and cites multiple supporting links.** Google documents them on two Search Central pages, both updated December 10, 2025. The snippet is a reversed search result. The Overview is a generated Search feature. Winning one is not proof of the other.

### Did Google replace featured snippets with AI Overviews?

**No. Google added AI Overviews as a separate feature and, as of the December 10, 2025 documentation, still maintains featured snippets.** [Search Engine Roundtable](https://www.seroundtable.com/google-ai-overviews-launch-37389.html) reported in May 2024 that Google said snippets were not going away. I treat that as a dated report of Google's position, not as a coverage statistic. I still see boxes on some queries and snapshots on others. Sometimes both.

### Can a featured snippet and an AI Overview appear on the same query?

**Yes. They are different features, and I have screenshots where both fire.** I have also seen queries where only one fires, and queries where neither fires. Do not write a rule that says they are mutually exclusive. Fill the four-cell card. Google's AI-features page says Overviews often do not trigger when they are not judged additive to classic Search.

### Does winning a featured snippet get you cited in an AI Overview?

**No. A snippet win means Google extracted one passage from your URL. An Overview citation means your page was used as a supporting source inside a generated answer.** The skills overlap — answer-first headings, lists, tables, snippet eligibility — but the selection is not a handoff. Check the chips. Do not infer from the box.

### How do I opt out of a featured snippet versus an AI Overview?

**There is no Overview-only checkbox.** [Featured snippets](https://developers.google.com/search/docs/appearance/featured-snippets) can be limited with `nosnippet` (blocks regular and featured snippets) or tested down with a shorter `max-snippet`. [AI features](https://developers.google.com/search/docs/appearance/ai-features) list the same preview controls — `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex` — plus robots.txt as the crawl control. `nosnippet` is a blunt instrument. It can also remove the snippet eligibility Overviews require for supporting links.

### Should I still optimize for featured snippets in 2026?

**Yes — as a writing habit, not as the only KPI.** Question headings, first-sentence answers, and short definition blocks still help a snippet fire and still help a generated answer find a passage. What I would not do in 2026 is run a program whose only win condition is "we recaptured position zero." Score the Overview on the same queries.

### Which page format wins a featured snippet versus an AI Overview?

**Snippets still like one clean extract: a definition paragraph, a short list, or a small table. Overviews like pages that can contribute more than one passage — verdict plus constraints plus dated facts.** Search Central does not publish a format spec I will pretend is official. The pattern I see: a page that is only a 50-word definition can win a box and still add nothing a merge can cite. A page with a definition, a table, and a real FAQ can feed both.

### How do I know if I lost traffic from a snippet loss or from an AI Overview?

**You do not know from rank alone.** Confirm whether the Overview is present, whether you are cited, whether a snippet is present, and whether you own that snippet. Then look at Search Console movement on that query. The diagnostic for impressions-up, clicks-down patterns is
[Did Google AI Overviews cause your traffic drop?](/blog/did-google-ai-overviews-cause-your-traffic-drop-how-to-tell).
I will not invent a click-through rate that turns either feature into a revenue forecast.

### Is a featured snippet the same thing as position zero?

**"Position zero" was the industry nickname for the snippet box sitting above the first classic result.** It was never a Google product name. An AI Overview can occupy the top of the page without being that box. If your tracker still labels every top feature "position zero," rename the columns. The nickname hides the split.

---

## Get a site that can win the extract and survive the rewrite

A featured snippet still wants a passage Google can lift. An AI Overview wants pages it can credit inside a generated snapshot. **If the site is a slogan, a contact form, and one undated paragraph, you can lose the box and miss the chips on the same Monday.**

I build **Premium AIO/AEO websites** for operators who want that extractable layer designed in: question-led headings, first-sentence answers, tables a model can lift, FAQ blocks that match the visible text, and entity names that stay spelled the same. The offer is the site. It is not a promise that Google will show a box, and it is not a promised Overview share.

If you want an AI-visibility-ready site built so the four-cell card has something to score, use [/contact](/contact). Bring the screenshots if you already have them. If you do not, we fill the first twelve queries on the call.

SEO-certified since 2021. Founder, AI Systems Architect, Fractional AI CTO. The job this week is to stop calling two products by one nickname — and to write for the extract *and* the rewrite.
