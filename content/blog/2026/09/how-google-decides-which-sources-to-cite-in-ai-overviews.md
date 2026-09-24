---
title: "How Google Decides Which Sources to Cite in AI Overviews"
slug: "how-google-decides-which-sources-to-cite-in-ai-overviews"
date: "2026-09-20"
lastModified: "2026-09-20"
author: "William Spurlock"
readingTime: 24
categories:
  - "AI Visibility"
tags:
  - "google ai overviews"
  - "AI Overview citations"
  - "source selection"
  - "query fan-out"
  - "aio"
  - "aeo"
  - "page authority"
  - "knowledge panel"
featured: false
draft: false
excerpt: "Google cites AI Overview sources from indexed, snippet-eligible pages retrieved through core Search and query fan-out. Here is how that selection works."
coverImage: "/images/blog/how-google-decides-which-sources-to-cite-in-ai-overviews.png"
coverImageAlt: "Dark abstract scene of gold light rays connecting source document plates to a frosted generative answer panel"
seoTitle: "How Google Cites AI Overview Sources | William Spurlock"
seoDescription: "How does Google decide which sources to cite in AI Overviews? Indexed, snippet-eligible pages, core Search retrieval, query fan-out, and extractable proof."
seoKeywords:
  - "How does Google decide which sources to cite in AI Overviews?"
  - "Google AI Overviews citation sources"
  - "AI Overview source selection"
  - "query fan-out AI Overviews"
  - "page authority AI Overviews"
  - "AI Overview vs knowledge panel"
  - "how long for new content AI Overviews"
aioTargetQueries:
  - "How does Google decide which sources to cite in AI Overviews?"
  - "Does page authority affect whether Google cites you in AI Overviews?"
  - "How long does it take for new content to get pulled into AI Overviews?"
  - "What's the difference between a Google AI Overview and a knowledge panel?"
contentCluster: "google-ai-overviews"
pillarPost: false
parentPillar: "google-ai-overviews-the-complete-playbook-for-getting-your-site-cited"
entityMentions:
  - "William Spurlock"
  - "Spurlock Studios LLC"
  - "Google AI Overviews"
  - "Google AI Mode"
  - "Google Search"
  - "Google Search Central"
  - "Google Knowledge Graph"
  - "Google Search Console"
serviceTrack: "ai-visibility"
---

# How Google Decides Which Sources to Cite in AI Overviews

**Google decides which sources to cite in AI Overviews by retrieving indexed, snippet-eligible pages through its core Search ranking and quality systems, expanding that retrieval with query fan-out across related subtopics, then attaching supporting links to a generated snapshot.** There is no public citation scorecard. There is no special schema type that buys you a chip. If your page cannot appear as a normal Search result with a snippet, it is not in the pool.

I am **William Spurlock**, founder, AI Systems Architect, and Fractional AI CTO at Spurlock Studios LLC. SEO-certified since 2021. The work now sits under AEO, AIO, and GEO. I have shipped **600+ automations** with **500+ live**, logged **20,000+ hours** inside agentic systems, and deleted **35,000+ hours** of client busywork. I do not invent Overview click-through rates, secret ranking formulas, or client names to dress up a claim Google has not published.

This spoke owns source selection. The July [Google AI Overviews playbook](/blog/google-ai-overviews-the-complete-playbook-for-getting-your-site-cited) owns eligibility, entities, measurement, and traffic-drop forensics. For the extractable block Google actually lifts, use [the content format that gets pulled into Google AI Overviews](/blog/the-content-format-that-gets-pulled-into-google-ai-overviews). Featured snippets are a different product. That split lives on [featured snippet vs AI Overview](/blog/featured-snippet-vs-ai-overview-what-changed-and-what-to-do-about-it). Here I am answering how a URL becomes a supporting source, not how to format every paragraph.

---

## How does Google decide which sources to cite in AI Overviews?

**Google starts with the same eligibility floor as classic Search, retrieves candidates with core ranking and quality systems (often via query fan-out), then cites a subset of supporting pages under a generated answer.** Ranking first for the exact query does not guarantee a citation. Meeting the floor does not guarantee one either. Citation is selection inside a retrieval set, not a second blue-link contest.

Google Search Central's [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) page, last updated December 10, 2025, is the owner-facing floor:

- A page must be **indexed** and **eligible to appear in Google Search with a snippet**.
- It must meet the Search technical requirements.
- **There are no additional technical requirements** for AI Overviews or AI Mode.
- Foundational SEO still applies: crawlable pages, findable internal links, important content in text, structured data that matches visible copy.
- You do **not** need `llms.txt`, a special AI markup file, or a unique schema.org type for these features.

The same page states that both AI Overviews and AI Mode **may use a "query fan-out" technique**: issuing multiple related searches across subtopics and data sources while advanced models identify more supporting web pages. That is why a citation can come from a URL that never sat in the classic top ten for the words the user typed. The system searched adjacent questions, then attached links that support pieces of the generated answer.

Google's [guide to optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), last updated July 10, 2026, goes one layer deeper on mechanism. It says generative AI features on Search are **rooted in core Search ranking and quality systems**. It describes retrieval-augmented generation (RAG / grounding) as relying on those systems to retrieve relevant, up-to-date pages, review specific information inside them, then generate a response with clickable supporting links. Query fan-out is defined there as concurrent related queries the model issues to fetch more results. Example fan-out queries for "how to fix a lawn that's full of weeds" include herbicide options, chemical-free removal, and prevention. Your page can win a sub-query without owning the parent query.

I treat selection as a three-gate machine:

<table>
  <thead>
    <tr>
      <th>Gate</th>
      <th>What Google has published</th>
      <th>What it means for your page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Eligibility</strong></td>
      <td>Indexed and snippet-eligible. Search technical requirements. No extra AI-only tech.</td>
      <td>Fix crawl blocks, `noindex`, empty snippets, and text locked behind broken JS before you chase "AIO hacks."</td>
    </tr>
    <tr>
      <td><strong>Retrieval</strong></td>
      <td>Core ranking and quality systems, optional query fan-out, and RAG grounding.</td>
      <td>Be relevant to the parent question and the sub-questions the model is likely to spawn.</td>
    </tr>
    <tr>
      <td><strong>Attribution</strong></td>
      <td>Supporting links shown with a generated snapshot. Overviews appear only when additive.</td>
      <td>Win a passage worth citing when the box appears. You cannot force the Overview itself.</td>
    </tr>
  </tbody>
</table>

AI Overviews, per the December 10, 2025 AI features doc, **only show when Google's systems decide a generated snapshot is additive to classic Search**, and they often do not trigger. Source selection only matters on queries where the box appears. On those queries, the machine still needs a rectangular fact: a lead answer, a table row, a short list, a dated definition. Foggy essays lose to clean blocks even when the domain looks strong on paper.

### What "cited" means in practice

A supporting link is the chip or URL Google attaches under (or beside) the generated text. That is the outcome operators usually mean by "cited."

Three quieter outcomes also happen, and they confuse dashboards:

1. **Used but unnamed.** A passage may influence the synthesis without your brand getting a chip.
2. **Cited for a sub-claim.** Fan-out may pull your page for one bullet inside the Overview while a competitor owns the opening sentence.
3. **Ranked in classic results, absent from the Overview.** Blue-link position and Overview attribution are related sports, not the same scoreboard.

I optimize for the supporting-link outcome I can observe. I do not invent a metric for "we were used silently."

### Fan-out as an operator diagram

Take a service query like "how do I cut HVAC no-shows." A classic SERP fights for that exact string. Fan-out, if it runs, can also retrieve pages about reminder timing, deposit policies, confirmation SMS copy, and seasonal booking spikes. Google's own lawn-weeds example in the July 10, 2026 guide shows that pattern with herbicide, chemical-free removal, and prevention sub-queries.

So when I map a money query, I write two lists:

<table>
  <thead>
    <tr>
      <th>List</th>
      <th>Examples for the HVAC no-show parent</th>
      <th>Why it matters for citation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Parent query answers</strong></td>
      <td>Definition of no-show cost, primary process, primary CTA</td>
      <td>Wins if the Overview opens on the parent question</td>
    </tr>
    <tr>
      <td><strong>Likely fan-out children</strong></td>
      <td>Reminder cadence, deposit rules, SMS templates, seasonal spikes</td>
      <td>Wins chips for supporting bullets even when you are not #1 on the parent</td>
    </tr>
  </tbody>
</table>

I do not publish a separate thin URL for every child. Google's generative AI guide, July 10, 2026, warns that creating a separate page for each query variation mainly to steer rankings or generative responses violates scaled content abuse policy. One strong page can cover parent plus children with clear H2s. Many weak pages cannot.

### What I refuse to pretend Google published

Google has **not** published a weighted formula that says authority is 40 percent, freshness is 25 percent, and links are 20 percent. Third-party tools that sell an "AI Overview citation score" are inferring from SERP scrapes. Infer is fine. Sell as Google's formula is not.

On audits I still score pages the same way:

1. Googlebot can see the answer in HTML text.
2. A stranger can screenshot the H2 plus the next two sentences and leave with something usable.
3. The page adds first-hand or expert detail Google's July 10, 2026 generative AI guide calls non-commodity, not a tips roundup anyone could paste.

If those three fail, fan-out will not save you. If they pass, you are at least eligible when retrieval hits your URL.

### Practical selection checklist

Use this when you are deciding whether a URL is even in the fight:

- Indexed in Search Console URL Inspection, not stuck in "Discovered - currently not indexed"
- Eligible for a normal snippet (no `nosnippet` / `noindex` surprise)
- Important claims visible as text, not only inside images or canvas
- Internal links from real related pages, not an orphan blog dump
- Structured data matches what humans see (Google lists this under SEO best practices for AI features as of December 10, 2025)
- One extractable block that answers a buyer question without a six-paragraph wind-up
- Claims that can be checked against a dated source or first-hand receipt on the same page

That is the decision path Google has actually documented. Everything after that is competitive relevance inside Search's existing systems.

### Operator walkthrough I use on a stuck URL

When a founder says "we never get cited," I run this sequence before touching brand design:

1. Confirm the Overview even appears for the money query in the markets that matter.
2. Confirm the candidate URL is indexed and snippet-eligible.
3. Read the page as a retrieval model would: first H2, first two sentences, first table.
4. List three fan-out children and check whether any page on the site answers them in extractable form.
5. Compare one competitor chip page side by side for extractability, not for adjective density.
6. Fix the page. Re-request crawl only after the HTML changed.

I do not start with link buying. I do not start with a new `llms.txt`. Google's December 10, 2025 AI features doc already told you those files are not required.

---

## Does page authority affect whether Google cites you in AI Overviews?

**Yes, indirectly, because AI Overviews pull from core Search ranking and quality systems, and those systems already weigh trust, usefulness, and experience signals.** No, if by "page authority" you mean a third-party DA number or a belief that a high-authority homepage automatically wins every Overview citation. Google has not said "highest Domain Authority chip wins." It has said generative features are rooted in the same ranking and quality stack that already prefers helpful, reliable pages.

The July 10, 2026 [generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) states that SEO best practices remain relevant **because generative AI features are rooted in core Search ranking and quality systems**. Retrieval-augmented generation uses those systems to fetch relevant, up-to-date pages before generating the answer. If classic Search already treats your page as thin, duplicate, or untrustworthy for a query family, you should not expect the Overview layer to rescue it.

Google's [creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) guidance still frames the quality bar: who created the content, what evidence they bring, and whether the page exists mainly to manipulate rankings. The generative AI guide sharpens that into a commodity vs non-commodity split. A generic "7 tips" list is commodity. A first-hand account with specifics only you could write is the kind of unique viewpoint Google says its AI systems look across sources to find.

Here is how I translate "authority" for Overview work:

<table>
  <thead>
    <tr>
      <th>Signal people call "authority"</th>
      <th>How it actually shows up in Overview candidacy</th>
      <th>What I do on a site</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Domain reputation / link graph</td>
      <td>Feeds classic ranking. Ranking feeds retrieval.</td>
      <td>Earn real mentions and links. Skip fake "AI mention" outreach Google called out as low-value in the July 10, 2026 guide.</td>
    </tr>
    <tr>
      <td>Author / org entity clarity</td>
      <td>Helps systems attribute who said what.</td>
      <td>Consistent Person / Organization facts, same name everywhere, contactable operator.</td>
    </tr>
    <tr>
      <td>First-hand experience</td>
      <td>Non-commodity content Google explicitly prefers for generative features.</td>
      <td>Process details, measurements you took, failure modes you saw. Not recycled tip lists.</td>
    </tr>
    <tr>
      <td>Topical depth on the site</td>
      <td>Supports relevance across fan-out sub-queries.</td>
      <td>Cluster of answer pages, not one orphan post.</td>
    </tr>
    <tr>
      <td>Third-party "DA" tools</td>
      <td>Not a Google ranking factor Google publishes.</td>
      <td>Use as a rough peer map. Never as a citation KPI.</td>
    </tr>
  </tbody>
</table>

### Authority myths that waste a quarter

- **"We need a .edu backlink before Overviews will cite us."** Google has not published a TLD preference for AI Overview supporting links. YMYL topics demand higher care. They do not invent a secret .gov quota for every query.
- **"Homepage PageRank covers every blog URL."** Retrieval is page-level. An unlinked thin post on a strong domain still loses to a clean answer page on a smaller domain.
- **"Schema alone raises authority."** The December 10, 2025 AI features doc says structured data should match visible text and that no special schema is required for AI features. Schema helps rich results eligibility. It is not a citation cheat code.
- **"More outbound citations make us look authoritative."** Over-citing competitors without adding your own proof just hands the extractable sentence to someone else.
- **"A press release raises Overview authority overnight."** Mentions can help classic discovery. Google's July 10, 2026 guide warns against chasing inauthentic mentions as a generative-search hack. Substance still has to live on a crawlable page.

### How I score authority without a fake formula

I keep a simple internal rubric. It is not Google's. It is how I decide where to spend rewrite hours.

<table>
  <thead>
    <tr>
      <th>Score band</th>
      <th>What I see on the site</th>
      <th>Rewrite priority</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Weak</strong></td>
      <td>No clear operator, commodity tips, orphan URLs, mixed brand names</td>
      <td>Fix identity and one money page before any "AIO" tool spend</td>
    </tr>
    <tr>
      <td><strong>Adequate</strong></td>
      <td>Real business, indexed pages, thin answers buried mid-page</td>
      <td>Move lead answers up. Add one table or list per money H2.</td>
    </tr>
    <tr>
      <td><strong>Strong</strong></td>
      <td>Entity clear, clustered answers, first-hand proof, clean crawl</td>
      <td>Expand fan-out children on existing URLs. Measure chips.</td>
    </tr>
  </tbody>
</table>

My operating rule: **authority gets you into the retrieval set more often. Extractability gets you cited when you are in the set.** I have watched strong brands lose Overview chips to weaker domains that put the answer in the first two lines under a question H2. That is not a conspiracy. That is RAG preferring a usable passage.

If you are building for citations, invest in both: a site people and Search already treat as a real business, and pages that look like answers. An AI-visibility-ready site is the packaging for both.

### Entity clarity as an authority multiplier

Authority is not only links. It is whether Google can tell who is speaking.

On sites I rebuild for Spurlock Studios work, I force:

- One legal / public org name (Spurlock Studios LLC / Spurlock Studios), never a retired brand string in new copy
- One operator name and title on About and author bios
- One contact path that matches the business a buyer would hire
- Same NAP-style facts where local surfaces matter

That will not mint a citation alone. It stops the retrieval layer from treating your brand as three different companies with three different stories. Knowledge panels care about that. Overview attribution benefits too when the supporting link needs a name humans recognize.

---

## How long does it take for new content to get pulled into AI Overviews?

**There is no published SLA. A new page must be crawled, indexed, and snippet-eligible before it can become a supporting link, and Google says recrawl timing alone can run from several days to several months depending on how often its systems decide a URL needs a refresh.** After that, you still wait for a query where an Overview triggers and your passage is selected. Anyone selling "cited in 72 hours or your money back" is selling a calendar, not Google's documentation.

The December 10, 2025 [AI features](https://developers.google.com/search/docs/appearance/ai-features) page, in its preview-controls troubleshooting section, states that after a change you must **allow time for Google to recrawl and process** it, and that **crawling can take anywhere from several days to several months**, depending on refresh priority. You can request a recrawl. You cannot buy a place in line. Indexing and serving are **not guaranteed** even when requirements are met. The same page says so explicitly.

I break timing into stages operators confuse:

<table>
  <thead>
    <tr>
      <th>Stage</th>
      <th>What has to happen</th>
      <th>Rough expectation I give founders</th>
      <th>What does *not* happen</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Publish</strong></td>
      <td>HTML live, crawlable, important text not blocked</td>
      <td>Same day if deploy succeeds</td>
      <td>Instant Overview citation</td>
    </tr>
    <tr>
      <td><strong>Discover / crawl</strong></td>
      <td>Internal links or sitemap / URL Inspection request</td>
      <td>Hours to weeks for small sites. Longer for ignored orphans.</td>
      <td>Guaranteed crawl because you tweeted the URL</td>
    </tr>
    <tr>
      <td><strong>Index + snippet eligibility</strong></td>
      <td>Page enters the index and can show a snippet</td>
      <td>Days common. Not a promise.</td>
      <td>Automatic rich result or Overview</td>
    </tr>
    <tr>
      <td><strong>Retrieval candidacy</strong></td>
      <td>Page ranks or appears in fan-out sets for related queries</td>
      <td>After index. Competitive.</td>
      <td>"We published, so we rank."</td>
    </tr>
    <tr>
      <td><strong>Overview attribution</strong></td>
      <td>Overview triggers and your passage is chosen as a supporting source</td>
      <td>Unpredictable. Query-dependent.</td>
      <td>A fixed 7-day citation clock</td>
    </tr>
  </tbody>
</table>

### Freshness vs speed

Google's generative AI guide frames RAG as improving **quality, accuracy, and freshness** by retrieving up-to-date pages. That is not the same as "newest URL wins." A six-month-old page with a corrected fact and a clear last-modified signal can beat a same-day post that restates commodity tips. Freshness is "is the retrieved page current for this claim," not "was the file created this morning."

What I tell clients when they ask for a number:

1. If Search Console still says not indexed, you are not late to Overviews. You are early to Search.
2. If you are indexed but never appear under Overview chips on your money queries, check extractability and relevance before you blame crawl lag.
3. If a competitor's new post got cited in a week, copy their clarity, not their publish date. Fan-out may have pulled a sub-query they already owned.

Request indexing for important URLs. Link them from a live, related page. Put the answer above the fold in text. Then measure with Search Console's generative AI / Performance reporting rather than refreshing the SERP every hour.

Google notes on the AI features page (December 10, 2025) that sites in AI features are included in overall Search Console web traffic, and that clicks from pages with AI Overviews have been higher quality in their observations (more time on site). That is a traffic quality claim from Google, not a timing guarantee.

I will not invent a median "days to first citation." When founders need a planning number, I plan on **weeks for indexing and early retrieval on competitive topics**, and I treat Overview chips as a separate, non-deterministic outcome after that.

### A publish checklist that respects the clock

<table>
  <thead>
    <tr>
      <th>Day-of action</th>
      <th>Why it helps timing</th>
      <th>What it cannot do</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ship HTML with the lead answer visible</td>
      <td>Crawlable text is the eligibility floor</td>
      <td>Force an Overview to appear</td>
    </tr>
    <tr>
      <td>Link from a related live URL</td>
      <td>Speeds discovery vs orphan posts</td>
      <td>Guarantee a crawl this afternoon</td>
    </tr>
    <tr>
      <td>Submit / inspect the URL in Search Console</td>
      <td>Signals priority without magic</td>
      <td>Override index backlog</td>
    </tr>
    <tr>
      <td>Update sitemap lastmod honestly</td>
      <td>Helps change discovery</td>
      <td>Fake freshness with junk edits</td>
    </tr>
    <tr>
      <td>Wait for index, then sample Overview queries</td>
      <td>Separates crawl lag from citation loss</td>
      <td>Prove silent usage</td>
    </tr>
  </tbody>
</table>

Google's December 10, 2025 AI features troubleshooting note also applies in reverse: if you change preview controls or content, give the systems time. Panic-publishing three near-duplicate posts to "speed up AI" is the opposite of the July 10, 2026 guidance against scaled query-variation pages.

### How I measure without lying to myself

- Search Console Performance (Web) for overall traffic on Overview-bearing SERPs, remembering Google folds AI feature traffic into overall web reporting as described December 10, 2025
- Generative AI performance reporting in Search Console when available for the property (called out in the July 10, 2026 generative AI guide)
- Manual query samples: does the Overview appear, and which domains get chips
- On-site engagement after Overview clicks when Analytics is wired

I still will not promise a citation date on a statement of work. The honest deliverable is eligibility plus extractability plus a measurement loop.

---

## What's the difference between a Google AI Overview and a knowledge panel?

**An AI Overview is a generated, query-specific snapshot with supporting links. A knowledge panel is a structured entity card drawn from Google's Knowledge Graph about a person, place, organization, or thing.** Google's own Help Center groups AI Overviews with knowledge panels as core Search features you cannot turn off, but they answer different jobs. One synthesizes an answer for a question. The other snapshots known facts about an entity.

Google Search Help's [AI Overviews article](https://support.google.com/websearch/answer/14901683) describes AI Overviews as an AI-generated snapshot with key information and links to dig deeper, shown when systems decide generative AI is especially helpful. For example, when you want to understand information from a range of sources. The same article states that **AI Overviews are a core Google Search feature, like knowledge panels**, and that features cannot be turned off (you can use the Web filter to see text links without those features).

Google's [About knowledge panels](https://support.google.com/knowledgepanel/answer/9163198) page says knowledge panels appear when you search for entities in the Knowledge Graph. They are meant to give a quick snapshot based on Google's understanding of available web content. Information comes from various web sources and, in some cases, data partners. Entities can suggest edits. Panels update as web information changes.

<table>
  <thead>
    <tr>
      <th>Dimension</th>
      <th>AI Overview</th>
      <th>Knowledge panel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Primary job</strong></td>
      <td>Answer or summarize a query with generative AI</td>
      <td>Snapshot known facts about an entity</td>
    </tr>
    <tr>
      <td><strong>Trigger</strong></td>
      <td>Query where a generated snapshot is additive</td>
      <td>Entity-seeking query with enough Knowledge Graph data</td>
    </tr>
    <tr>
      <td><strong>Shape</strong></td>
      <td>Generated prose plus supporting source links</td>
      <td>Structured fields (title, facts, images, related entities)</td>
    </tr>
    <tr>
      <td><strong>Source model</strong></td>
      <td>Retrieved web pages via Search systems, fan-out, and RAG</td>
      <td>Knowledge Graph plus web sources (and partners), plus entity feedback</td>
    </tr>
    <tr>
      <td><strong>Your win condition</strong></td>
      <td>Become a supporting citation under the snapshot</td>
      <td>Become (or correctly describe) the entity the panel is about</td>
    </tr>
    <tr>
      <td><strong>Off switch</strong></td>
      <td>None for the feature. Web filter hides feature-heavy SERP.</td>
      <td>None for the feature. Claim / feedback flows for entities.</td>
    </tr>
  </tbody>
</table>

### Why operators mix them up

Both sit high on the results page. Both feel authoritative. Both can steal attention from blue links. The work is different:

- **Winning a knowledge panel** is mostly entity work: consistent names, authoritative corroboration, Business Profile where relevant, corrections through Google's entity tools when you qualify.
- **Winning an AI Overview citation** is mostly answer work: indexed page, extractable passage, relevance to the query and its fan-out children.

A brand can have a strong knowledge panel and still never appear as an Overview supporting link for "how do I…" questions in its category. The panel answers "who is this company." The Overview answers "what should I do / know about this problem." Build for both if both matter. Do not treat a panel edit as Overview optimization.

Business Profiles, Google notes, can look similar to knowledge panels but are a separate local surface. Do not confuse GBP packaging with either product.

### Side-by-side query examples

<table>
  <thead>
    <tr>
      <th>Query shape</th>
      <th>Surface that usually matters more</th>
      <th>What to ship</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Brand / person / org name</td>
      <td>Knowledge panel</td>
      <td>Entity consistency, corroboration, claim tools if eligible</td>
    </tr>
    <tr>
      <td>"How does X work" / "how do I…"</td>
      <td>AI Overview (when additive)</td>
      <td>Lead-answer page with extractable blocks</td>
    </tr>
    <tr>
      <td>Local "near me" service</td>
      <td>Map / Business Profile pack often dominates</td>
      <td>GBP accuracy first, then service pages</td>
    </tr>
    <tr>
      <td>Product comparison</td>
      <td>AI Overview or classic results</td>
      <td>Spec tables and first-hand criteria, not entity trivia</td>
    </tr>
  </tbody>
</table>

If your money query is definitional and entity-heavy ("Spurlock Studios"), think Knowledge Graph. If your money query is procedural or commercial investigation ("how does Google decide which sources to cite in AI Overviews"), think Overview extractability. This page is the second job.

### What not to do when you confuse the two

- Do not rewrite your entire site into a Wikipedia clone to "get a panel" when your money is in how-to queries.
- Do not ignore entity consistency because "we only care about Overviews." Attribution still needs a name.
- Do not treat a knowledge panel image change as proof your Overview strategy worked.
- Do not assume the Web filter hiding Overviews means knowledge panels vanished too. They are separate features that can both sit on a SERP.

Google's Knowledge Graph help page ([How Google's Knowledge Graph works](https://support.google.com/knowledgepanel/answer/9787176)) stresses that panels appear when systems decide entity info is useful, and that appearance can change over time without a manual switch you control. Overview triggers are similarly automatic. Your job is readiness, not a force-show toggle.

---

## FAQ

### Do I need special schema or an llms.txt file to be cited in AI Overviews?

**No. Google says there are no additional technical requirements and no special schema.org type or AI text file required for AI Overviews or AI Mode.** Search Central's AI features documentation, last updated December 10, 2025, states you do not need to create machine-readable AI files or markup to appear in these features. The July 10, 2026 generative AI guide repeats that `llms.txt` and similar files are ignored for Google Search visibility. Keep using structured data when it matches visible content for rich results. Do not invent an "AIO schema" stack.

### Can a page outside the classic top ten still get cited?

**Yes. Query fan-out can retrieve supporting pages for related subtopics that never appear in the classic top results for the exact query string.** Google's December 10, 2025 AI features page describes fan-out as issuing multiple related searches and identifying a wider, more diverse set of helpful links than classic web search alone. Ranking #1 for the parent query still helps retrieval odds. It is not the only path into the supporting-link set.

### Does blocking Googlebot stop AI Overview citations?

**Yes, for Search-grounded features that depend on Googlebot crawl: if Google cannot crawl and index the page for Search, it is not eligible as a supporting link.** The AI features doc points to robots.txt for Googlebot as the control for how sites are crawled for Search, and notes `nosnippet`, `data-nosnippet`, `max-snippet`, and `noindex` for limiting what Search can show. Google-Extended is a separate control for some other Google AI systems. Do not confuse it with AI Overviews eligibility, which rides on Search crawl and snippet rules.

### Why would Google cite my competitor's page and not mine for the same query?

**Usually because their passage was easier to retrieve, verify, and attach, or because a fan-out sub-query preferred their angle, not because they bought a secret Overview slot.** Compare extractability first: lead answer, table, list, dated proof. Then compare indexing and classic relevance. Then compare unique experience. Google's generative AI guide prefers non-commodity, first-hand content over recycled tip lists. Fix the page before you assume a conspiracy.

### Can the same URL appear in both an AI Overview and AI Mode?

**It can, but Google says AI Mode and AI Overviews may use different models and techniques, so responses and links will vary.** The December 10, 2025 AI features documentation states that explicitly. Treat them as related products with shared eligibility floors, not identical citation lists. Optimize the page for Search fundamentals once. Measure each surface in Search Console rather than assuming parity.

### Does Google prefer government or university domains for AI Overview citations?

**Google has not published a rule that .gov or .edu domains automatically win AI Overview supporting links.** On YMYL topics, higher trust and careful sourcing matter in classic Search quality systems that also feed generative features. That is not the same as a TLD quota. Earn relevance and evidence on the page. Do not wait for an academic backlink before shipping a clear answer.

---

## Build pages Google can actually cite

Source selection is not a mystery plugin. It is eligibility, retrieval, and a passage worth attaching. Get indexed. Stay snippet-eligible. Write non-commodity answers that survive fan-out. Package them on a site Search already treats as a real business.

If you want that packaging done as an AI-visibility-ready site (extractable service and explainer pages, entity clarity, and measurement wired for generative Search), that is the work I take at Spurlock Studios. Start from the [Google AI Overviews playbook](/blog/google-ai-overviews-the-complete-playbook-for-getting-your-site-cited), ship the [extractable format](/blog/the-content-format-that-gets-pulled-into-google-ai-overviews), and build the site like citations are a product requirement, not a blog afterthought.
