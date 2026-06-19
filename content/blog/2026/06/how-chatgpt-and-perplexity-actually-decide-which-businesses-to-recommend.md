---
title: "How ChatGPT and Perplexity Actually Decide Which Businesses to Recommend"
slug: "how-chatgpt-and-perplexity-actually-decide-which-businesses-to-recommend"
date: "2026-06-10"
lastModified: "2026-06-10"
author: "William Spurlock"
readingTime: 12
categories:
  - "AI Visibility"
tags:
  - "ai visibility"
  - "chatgpt recommendations"
  - "perplexity ai"
  - "geo"
  - "aeo"
  - "ai search"
  - "business recommendations"
  - "ai citations"
featured: false
draft: false
excerpt: "ChatGPT draws from training data and optional live search. Perplexity retrieves live sources every time. Here's how each engine decides who to recommend."
coverImage: "/images/blog/how-chatgpt-and-perplexity-actually-decide-which-businesses-to-recommend.png"
seoTitle: "How ChatGPT & Perplexity Recommend Businesses | William Spurlock"
seoDescription: "ChatGPT and Perplexity recommend businesses differently. Here are the exact signals—reviews, structured data, and third-party coverage—that move the needle."
seoKeywords:
  - "how does chatgpt decide which businesses to recommend"
  - "how does perplexity rank businesses"
  - "ai business recommendations"
  - "get your business in chatgpt"
  - "appear in perplexity results"
  - "geo for business"
  - "aeo strategy"
aioTargetQueries:
  - "How ChatGPT Decides Which Businesses to Recommend"
  - "How Perplexity Ranks and Cites Sources Differently Than ChatGPT"
  - "The Signals Both Engines Share: What Actually Moves the Needle"
  - "How to Get Your Business Into AI Recommendations"
contentCluster: "ai-visibility-fundamentals"
pillarPost: false
entityMentions:
  - "William Spurlock"
  - "ChatGPT"
  - "Perplexity"
  - "OpenAI"
  - "GPT-4o"
  - "Google AI Mode"
  - "schema.org"
  - "JSON-LD"
  - "retrieval-augmented generation"
  - "Bing"
  - "Sonar"
serviceTrack: "ai-visibility"
---

# How ChatGPT and Perplexity Actually Decide Which Businesses to Recommend

Neither ChatGPT nor Perplexity operates like a business directory you submit your listing to. ChatGPT draws from a training corpus with a knowledge cutoff, supplemented by optional live web search. Perplexity retrieves live sources on every single query and cites them inline. The two systems are different enough that a strategy built for one won't automatically work on the other — and most businesses have optimized for neither.

I'm William Spurlock — AI Solutions Architect and the operator businesses call when their leads are quietly evaporating as AI answer engines absorb the search queries that used to find them. Over the past year I've audited business visibility across ChatGPT, Perplexity, Google AI Mode, and Claude for clients in B2B services, local trades, and SaaS. The gap between who gets recommended and who doesn't comes down to a handful of concrete signals — and the mechanisms behind each engine are distinct enough to warrant different tactics.

The primary query here is direct: how do ChatGPT and Perplexity decide which businesses to recommend? The answer isn't a simple ranking-factors list. It's two different retrieval architectures with overlapping but distinct quality signals.

The same principles apply whether you're a local service business (plumber, HVAC tech, law firm), a B2B consultancy, or a SaaS company — the signal types are identical, but the specific platforms where those signals live differ by category. Local businesses lean on Google, Yelp, and local directories. B2B firms lean on G2, Clutch, LinkedIn, and industry publications. SaaS companies lean on G2, Product Hunt, and software review directories. The playbook is the same; the execution targets different platforms.

Why this matters for your lead pipeline: estimates vary widely, but as of mid-2026 a growing fraction of early-stage buyer research happens in AI assistants rather than traditional search. When a prospect asks Perplexity "who should I hire for [your service] in [your city]?" and your competitor appears and you don't, that's a lead that never reached you. The businesses building AI visibility today are compounding an advantage that will be significantly harder to close 18 months from now.

---

## How ChatGPT Decides Which Businesses to Recommend

**ChatGPT recommends businesses through two distinct pipelines: its static training corpus, and — when web search is active — live retrieval from Bing and indexed sources.** Which pipeline fires depends on the user's subscription tier and whether the query triggers a search. Most business-recommendation queries, especially those with local or comparative intent, will trigger search in accounts where it's enabled.

### The Training Data Pipeline

The base GPT-4o model has a knowledge cutoff — as of mid-2026, that sits at approximately early 2025, though OpenAI updates this with each major release cycle. For that training corpus, OpenAI ingested a broad cross-section of the public web: websites, forums, review platforms, business directories, industry publications, and social platforms.

When ChatGPT answers "who are the best [service] providers in [city]?" from training data alone, it synthesizes mentions it encountered across that corpus. A business mentioned frequently in positive contexts across multiple credible sources has a higher probability of surfacing. A business that existed only on its own website — no third-party write-ups, no review platform presence, no directory citations — has almost no training signal to pull from.

This means businesses that earned coverage between roughly 2020 and early 2025 — through PR, client testimonials published on third-party sites, industry round-ups, or review platforms — carry a concrete training-signal advantage over those that didn't.

The volume of sources matters, but so does the type. Mentions in established industry-specific directories (Houzz, Angi, G2, Avvo), editorial outlets, and major review platforms carry more weight in the synthesis than a single comment in a niche forum. A business mentioned in 40 distinct third-party sources has a materially different training presence than one mentioned in the same single source 40 times.

### How ChatGPT Builds a "Business Reputation" from Training

When a business-recommendation query fires against ChatGPT's training data, the model isn't retrieving a single record — it's aggregating signals across everything it read during training. Think of it as a distributed reputation built from overlapping source types:

- **Editorial mentions** — news articles, industry blog posts, and trade publications
- **Review summaries** — aggregated ratings and written reviews from Yelp, Google, and similar platforms
- **Directory descriptions** — how your business is described on Houzz, G2, Angi, and category-specific sites
- **Forum and social discussion** — Reddit threads, LinkedIn posts, and Quora answers that reference your business by name
- **Your own website content** — service pages, about pages, and FAQ content that describes what you do and who you serve

Each source type is weighted by the credibility and reach of the platform it came from. A detailed review on Yelp contributes more signal than a brief mention on a low-traffic personal blog. An editorial mention in a regional newspaper contributes differently than a press release on a distribution wire. The model weighs everything it encountered about your business against everything it encountered about your category — and surfaces the entities with the strongest, most consistent cross-source presence.

### The Live Search Pipeline (ChatGPT Search)

ChatGPT Search, available in GPT-4o with browsing enabled, changes the equation significantly. When search triggers — typically on queries with local, recent, or comparative intent — ChatGPT fetches live results and synthesizes them into an answer. The sources it draws from closely mirror Bing's index, though OpenAI does not publish a definitive source list.

For businesses, this matters because a strong Bing presence — including a completed Bing Places for Business listing, current reviews on indexed review platforms, and freshly-dated service pages — all feed directly into this pipeline.

Key signals ChatGPT's live search pipeline weights, based on observed behavior across client accounts:

- **Bing Places for Business** — Claims and verifies local business data that feeds ChatGPT Search local results directly
- **Indexed review mentions** — Google Reviews, Yelp, and category-specific platforms that Bing has indexed
- **Third-party editorial coverage** — Press articles, industry directories, podcast transcripts, and guest-authored pieces
- **Your own site's content** — Especially FAQ pages and service pages with explicit entity data (business name, location, services, credentials)
- **Social mentions** — Discussions on Reddit, LinkedIn, and forums that Bing surfaces are part of ChatGPT's synthesis

One important distinction: ChatGPT does not show citations in its standard conversational interface. Recommendations surface as synthesized prose, which makes it harder for users to trace the source — and harder for businesses to audit why they were included or excluded.

### Which System Should You Optimize for First?

My recommendation, in order: Perplexity first, then ChatGPT Search, then training data influence.

Perplexity gives you the fastest feedback loop. You can publish a new page or earn a new citation and see it appear in Perplexity results within days. ChatGPT Search responds quickly when browsing is active, but the Bing indexing lag adds a week or two. Influencing ChatGPT's base training data is the longest game — you're building for the next model update, not next week.

The good news: the actions that move Perplexity (reviews, structured pages, third-party coverage) are the same ones that move ChatGPT Search. You're not running two separate campaigns. You're running one, with the fastest results appearing on Perplexity and the compound effects showing up in ChatGPT over time.

### What Makes a Query Trigger Live Search vs. Training Data

Not every ChatGPT query activates web search even when it's enabled. From observed behavior, the following query patterns reliably trigger live retrieval:

- Queries that include a city name, neighborhood, or "near me" phrasing
- Queries with explicit recency markers ("best in 2026," "currently accepting clients")
- Comparison queries ("who's better for X vs Y")
- Queries for businesses in fast-moving categories (technology, restaurants, healthcare)

Static queries — "what is a general contractor" or "how does plumbing work" — are more likely to pull from training data without triggering a search. Business recommendation queries almost always trigger live search when browsing is active, because location-specific information requires current data.

---

## How Perplexity Ranks and Cites Sources Differently Than ChatGPT

**Perplexity retrieves live web sources on every single query and builds its answer directly from those retrieved documents — making it far more responsive to fresh content and structured pages than ChatGPT's static training data.** The citation model is also fundamentally different: Perplexity shows numbered source links inline, so users can verify every claim and click through to the original source.

### The Sonar Retrieval Architecture

Perplexity's underlying model family is Sonar (Sonar and Sonar Pro as of mid-2026), purpose-built for retrieval-augmented generation. **Retrieval-augmented generation (RAG)** is the architecture at play: instead of relying solely on what the model learned during training, the system searches the web, retrieves documents, and generates an answer grounded in those retrieved sources. This is why Perplexity can accurately recommend a business that launched three months ago — the training cutoff problem doesn't apply the same way it does to ChatGPT's base model.

On each query, Perplexity retrieves between 5 and 15 sources, selects the most relevant, and synthesizes an answer with numbered inline citations. Users see which sources informed the answer and can click each citation directly.

This architecture means your business can go from "not recommended" to "recommended" within days of earning a single strong citation — a new Yelp listing, a news article, a directory entry that gets indexed. There's no waiting for a model training cycle. This responsiveness is Perplexity's biggest advantage over ChatGPT's base model for new or recently-changed businesses.

### What Perplexity Prioritizes in Source Selection

Perplexity does not fully document its retrieval ranking model, but from auditing answers across hundreds of business-category queries:

- **Topical relevance** — the page must directly address the specific query; generic about-pages rarely get cited
- **Content structure** — pages with clear headers, bullet lists, and FAQ sections extract more cleanly into synthesized answers
- **Domain authority** — established, frequently-cited domains appear more often than newer, less-linked sites
- **Freshness** — for time-sensitive or local queries, recently updated content gets preference
- **Review platforms** — Yelp, Google, Trustpilot, G2, and category-specific review sites appear consistently in business-recommendation answers

Unlike ChatGPT, Perplexity shows its sources, which means you can audit competitor citations immediately. Search for your business category and location in Perplexity, check which competitors appear, and look at which platforms and publications Perplexity cites. That's your gap analysis in plain view.

### The Citation Visibility Advantage

Being cited in Perplexity has a compounding effect that ChatGPT recommendations lack. When a user sees your business name attached to a numbered citation, they can click through — Perplexity surfaces your site as a trusted source, which drives direct referral traffic on top of brand recognition. This is meaningfully different from the invisible synthesis that ChatGPT delivers.

### Perplexity Pro and Sonar Pro: What Changes at Higher Tiers

Perplexity Pro (the paid tier) routes queries through Sonar Pro, which retrieves more sources per query and applies a more thorough synthesis pass. For business-recommendation queries, this generally produces longer, more nuanced answers that cite more platforms simultaneously. A business visible on five distinct platforms has better odds in a Sonar Pro response than one visible on only two.

Pro also offers deeper web research mode, which triggers more comprehensive multi-step retrieval. When a user asks Perplexity Pro to find the best [service provider] in their city and do a thorough comparison, the system may run several retrieval passes across review platforms, editorial sources, and the businesses' own sites. Being present across all of those source types matters more at this tier.

For the broader shift in how content strategy adapts to these retrieval systems, the [AI Visibility content strategy breakdown](/blog/the-ai-visibility-content-strategy-writing-for-humans-and-answer-engines) covers how to write pages that both humans and answer engines can extract answers from.

| Factor | ChatGPT | Perplexity |
|---|---|---|
| Data freshness | Training corpus (~early 2025 cutoff) + optional live search | Live retrieval on every query |
| Citation model | No inline citations — synthesized prose only | Numbered inline citations, sources visible |
| Local signals | Bing Places feeds ChatGPT Search | Web-indexed review platforms + directories |
| Schema sensitivity | Moderate (via training corpus crawls) | High (structured pages extract preferentially) |
| Speed to influence | Months for training; immediate for live search | Days to weeks (new content indexes quickly) |
| How to influence | Third-party mentions, Bing presence, review volume | Fresh structured content, review platforms, directories |
| Advertising option | None in organic recommendations | Sponsored results exist, separate from organic citations |

---

## The Signals Both Engines Share: What Actually Moves the Needle

**Third-party mentions, consistent entity data across the web, schema.org structured markup, and review velocity are the four signals that move both ChatGPT and Perplexity simultaneously.** These aren't theoretical ranking factors — they are the mechanisms both systems extract from the open web, regardless of whether the retrieval happens at training time or in real-time.

### 1. Third-Party Mentions (Digital PR)

Both systems weight third-party coverage more than first-party claims. A page on your own website saying "we're the best in the city" contributes almost nothing. A local news feature, an industry directory listing, a podcast guest appearance with a published transcript, a client case study on a third-party platform — each of these creates the external evidence that AI systems treat as independent corroboration.

This is the core mechanism behind [digital PR for AI visibility](/blog/digital-pr-for-ai-visibility-getting-mentioned-where-ai-reads): getting your business mentioned in the places AI systems crawl and weight. The goal isn't press for its own sake. It's entity recognition — AI systems build knowledge graphs from cross-referenced sources, and your business becomes a named entity in that graph through consistent third-party mentions.

The types of third-party coverage that carry the most weight, in order:

1. **Editorial coverage in indexed publications** — regional news, trade publications, industry newsletters with web archives
2. **Category-specific directory listings** — platforms built specifically for your industry (Houzz, Avvo, G2, Healthgrades, Angi, etc.)
3. **Customer case studies on third-party sites** — client blogs, partner sites, or publications featuring your work
4. **Podcast episode transcripts and show notes** — indexed podcast content gets crawled and appears in Perplexity citations more than most businesses expect
5. **Industry round-ups and "best of" lists** — aggregate posts naming multiple providers in your category
6. **Community forum discussion** — Reddit, Quora, and niche forums where your business is mentioned by real users in context

### 2. Entity Consistency Across the Web

If your business appears as "Acme Plumbing" in some places, "Acme Plumbing LLC" in others, and "Acme Plumbing & Heating" on your own site, both ChatGPT and Perplexity struggle to build a confident entity match across those sources. NAP consistency — name, address, phone — matters because it gives AI systems a clear entity to match across data sources.

Entity consistency extends beyond NAP. Your category description, services list, and geographic coverage area should appear in consistent language across your Google Business Profile, Bing Places, Yelp, industry directories, and your own site's schema markup. Inconsistency creates ambiguity; AI systems default to the better-defined entity when forced to choose.

A practical test: search your business name in both Perplexity and ChatGPT. Read the description that gets generated. If it's vague, outdated, or inconsistent with how you actually describe yourself, that's a signal gap — the AI is synthesizing from whatever it found, not from a well-defined entity profile. The fix is standardizing your description across every platform and encoding it in your schema markup.

### 3. Structured Data (Schema.org JSON-LD)

Structured data in [JSON-LD format](https://schema.org/) tells AI retrieval systems precise facts about your business without requiring them to infer meaning from prose. A `LocalBusiness` schema block communicates your exact business type, location, hours, services, and review aggregate in a format designed for machine extraction.

Here's a minimal but complete example for a local service business:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Acme Plumbing",
  "url": "https://acmeplumbing.com",
  "telephone": "+1-555-123-4567",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78701"
  },
  "description": "Licensed commercial and residential plumber in Austin, TX. Emergency service, water heater installation, and pipe repair.",
  "areaServed": "Austin, TX",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "142"
  }
}
```

This goes in a `<script type="application/ld+json">` tag in your page's `<head>`. It's not visible to users, but it is the highest-precision signal you can give to any retrieval system — including Google AI Mode, which uses schema.org data to populate its own business panels. The difference this makes in how cleanly your information appears in [GEO versus traditional SEO](/blog/geo-vs-seo-what-actually-changes-in-how-you-create-content) is significant.

Beyond `LocalBusiness`, add `FAQPage` JSON-LD to any page with a question-and-answer section. `FAQPage` schema tells AI extraction systems that the following blocks are intended as definitive question-answer pairs — which is exactly the format both Perplexity and Google AI Mode extract when generating synthesized answers. A service page with `LocalBusiness` + `FAQPage` schema is one of the highest-return single-page investments a local business can make for AI visibility.

### 4. Reviews: Quantity, Recency, and Content

Both ChatGPT's training corpus and Perplexity's live retrieval pull from major review platforms. As of mid-2026, the platforms that consistently appear in AI business recommendation answers include Google Reviews, Yelp, Trustpilot, G2 (for SaaS), and Houzz (for home services).

Review signals that matter:

- **Quantity** — more reviews give AI systems more data points to synthesize a reputation signal from
- **Recency** — a cluster of recent reviews signals current customer activity; stale review counts from three years ago carry less weight
- **Owner responses** — response text appears in crawled data and adds entity richness to your business profile
- **Review content** — reviews that mention specific services, outcomes, or team members add descriptive vocabulary that AI systems incorporate into their characterization of your business
- **Platform diversity** — appearing on multiple review platforms (Google, Yelp, and one category-specific site) creates stronger cross-reference signals than a high count on a single platform

In client work, I've seen businesses go from zero AI mentions to appearing consistently in Perplexity results within 4-8 weeks after a coordinated review push combined with directory cleanup and a single strong press mention. That's not a guaranteed timeline — it varies by category and competition — but it's a real one.

### A Note on Google AI Mode

Google AI Mode — Google's AI-powered search experience that generates synthesized answers at the top of search results — operates on its own retrieval architecture, distinct from both ChatGPT and Perplexity. It draws from Google's own index, weights Google Business Profile data heavily, and incorporates Google Reviews directly. While this post focuses on ChatGPT and Perplexity, the same underlying signals — entity consistency, structured data, review volume, and third-party coverage — improve your Google AI Mode presence simultaneously.

The practical implication: a business that builds strong AI visibility in ChatGPT and Perplexity is almost certainly building it in Google AI Mode as well, because the foundational signals overlap. The differences are in the weighting and data sources. Google's system weighs its own first-party data (Business Profile, Maps, Reviews) more heavily. ChatGPT Search weighs Bing's data. Perplexity pulls from the broader open web.

Build the foundation — consistent entity data, reviews, structured markup, third-party coverage — and all three benefit. This is why AI visibility work is worth doing regardless of which specific tool your ideal customer uses. The cross-system signal overlap means a well-executed presence-building campaign moves the needle across all three simultaneously.

### 5. What Both Engines Penalize (or Ignore)

Worth knowing what won't move the needle, because a lot of businesses spend time here:

- **Social follower counts** — Neither ChatGPT nor Perplexity weights raw follower numbers. Social mentions matter only if they appear in indexed content.
- **Paid traffic** — Ad spend doesn't influence organic AI recommendations in either system.
- **Meta keywords tags** — Effectively irrelevant for AI retrieval, same as traditional SEO.
- **Thin service pages** — A page that says "We offer plumbing services in Austin" with no supporting detail gets extracted by neither system. Pages need enough specificity to answer the query they're targeting.
- **Unverified claims** — Statements like "Austin's #1 rated plumber" without a credible source carry no extraction weight. AI systems prefer verifiable, sourced facts over superlatives.

The businesses that tend to struggle most with AI visibility are those with great word-of-mouth that never made it to the indexed web — tradies with strong local reputation but no Yelp profile, B2B service firms whose case studies exist only as PDFs behind email gates, consultants whose work is known in their network but never published as third-party evidence. The signals AI systems read are all in the open web. If your reputation lives only in private channels, the engines can't see it.

This is the core shift: traditional business development built reputation through relationships. AI visibility builds reputation through indexed, publicly citable evidence. Both matter — but only one of them gets you recommended when someone asks Perplexity at 11pm which consultant to call in the morning.

| Signal | ChatGPT Impact | Perplexity Impact | Time to Effect |
|---|---|---|---|
| Third-party press mentions | High (training + live search) | High (live retrieval) | Weeks to months |
| Entity / NAP consistency | Medium-high | Medium | 2-4 weeks post-update |
| Schema.org JSON-LD | Medium (via crawl) | High (structured extraction) | Days to weeks |
| Google and Yelp reviews | High (training + live search) | High (live retrieval) | Days for new reviews |
| Bing Places listing | High (ChatGPT Search) | Low-medium | 1-2 weeks to index |
| Structured FAQ / service pages | Medium | High | Days |
| Social / forum mentions | Low-medium | Medium (if Bing-indexed) | Variable |

### Where These Two Systems Are Converging

As of mid-2026, ChatGPT and Perplexity are converging in one important direction: both are moving toward showing more source attribution. ChatGPT's web browsing mode increasingly surfaces clickable links in answers. Perplexity's citation model has been the standard since launch. The implication for businesses: the distinction between "training data" and "live retrieval" matters less than it did two years ago, because both systems are increasingly grounding answers in retrievable, citable web sources rather than pure model-generated synthesis.

The practical consequence is that the same underlying signals — third-party coverage, structured markup, review volume, entity consistency — work for both systems, and building that presence now creates a compounding advantage as both engines continue moving toward retrieval-grounded answers. Businesses that wait for AI recommendations to "sort themselves out" are watching their competition build exactly this footprint while they wait.

The convergence also matters for measurement: as both ChatGPT and Perplexity shift toward showing source attribution, tracking which publications and platforms cite your business becomes a meaningful leading indicator of recommendation health. A business that appears as a source citation in Perplexity six times per month is building the kind of entity presence that compounds across every AI recommendation system — not just Perplexity.

---

## How to Get Your Business Into AI Recommendations

**The path to appearing in ChatGPT and Perplexity recommendations requires coordinating entity establishment, third-party coverage, review velocity, and structured content — these aren't parallel tactics, they reinforce each other.** The sequence below is ordered by impact and speed-to-effect:

1. **Claim and complete every major directory listing.** Google Business Profile, Bing Places for Business, Yelp, and any category-specific directory relevant to your industry (Houzz, Avvo, G2, Angi, etc.). Name, address, phone, and service description must be identical across all of them. Variations create ambiguity.

2. **Install LocalBusiness JSON-LD on your homepage and key service pages.** Use the schema.org/LocalBusiness type with `name`, `address`, `telephone`, `description`, `areaServed`, `openingHours`, and `aggregateRating` populated. This is machine-readable entity data — the clearest signal you can give both web crawlers and AI retrieval systems about who you are and what you do.

3. **Build your review count on Google and the leading category platform.** Run a review-ask sequence after every completed project or transaction. Prioritize Google first — it feeds both Google AI Mode and ChatGPT Search via Bing's indexing — then the category-specific platform. Aim for a minimum of 50 reviews before expecting consistent AI mentions.

4. **Earn third-party coverage in your category.** Guest articles in trade publications, podcast appearances, press mentions in local outlets, inclusion in "best of" or "top providers" lists. Estimates vary, but one or two substantive third-party mentions per month moves the needle meaningfully. This is the hardest part, and also the highest-impact — AI systems treat third-party mentions as independent corroboration that self-published content can't replicate.

5. **Publish structured answer content on your own site.** FAQ pages that directly address service-category questions, comparison pages that name your category and differentiators, and how-to guides with clear header hierarchy. These are the pages Perplexity retrieves and cites. The more precisely your content answers a specific query, the higher the probability of extraction.

6. **Keep content fresh and respond to every review.** AI retrieval systems see timestamps. Recent reviews, recently updated service pages, and recent social mentions all signal that the business is currently active. A business whose last review was 14 months ago and whose website hasn't changed since 2023 loses priority to an equally-qualified competitor who's been active this week.

7. **Monitor your appearance monthly.** Run your service category and location through both Perplexity and ChatGPT Search every month. Note which competitors appear. Check which sources Perplexity cites in those answers. That citation list is your exact list of targets — the publications, directories, and review platforms you need to earn presence on.

### How to Run Your Own AI Visibility Audit Right Now

You don't need specialized software to get a baseline picture of where you stand. Here's the manual audit I run for new clients:

**Step 1 — Test your category queries in Perplexity.** Open Perplexity and run five variations of the query your ideal client would ask: "best [service] in [city]," "top-rated [service type] near [neighborhood]," "[service category] [city] reviews," "who do you recommend for [service] in [city]?" Note every business that appears and which sources Perplexity cites for each mention.

**Step 2 — Run the same queries in ChatGPT with browsing enabled.** Make sure ChatGPT Search is active (look for the search icon in the interface). Run identical queries. Note which businesses appear. Because ChatGPT doesn't show citations, you can't trace sources directly — but you can see whether your business name appears in the synthesized response.

**Step 3 — Check your entity presence on Bing.** Search your business name on Bing. Check that the Bing Places card appears with accurate information, photos, and reviews. If it doesn't — claim your Bing Places for Business listing before anything else.

**Step 4 — Audit your review profile.** Count your total reviews on Google, Yelp, and the leading category platform. Note the date of your most recent review. If your last review was more than 60 days ago, you have a recency gap.

**Step 5 — Check your schema markup.** Run your homepage through [Google's Rich Results Test](https://search.google.com/test/rich-results) to verify your JSON-LD is valid and extractable. Missing or malformed schema is a common issue that's entirely fixable in an afternoon.

This five-step audit takes about 45 minutes and gives you a clear picture of exactly where you stand relative to the competitors appearing in AI recommendations. Most businesses discover two or three high-priority gaps they can close within two to four weeks.

### Measuring Progress: What to Track Month Over Month

Once you've started building your AI visibility footprint, you need to know whether it's working. The metrics that matter:

- **Perplexity citation count** — How many times does your business name appear in Perplexity answers for your target category queries? Track this monthly across 10 standardized queries.
- **Review velocity** — New reviews per month, across all platforms. Track the trend, not just the total.
- **Third-party mention count** — New external mentions indexed in the past 30 days. Tools like Google Alerts (free) or a media monitoring tool can flag new indexed mentions automatically.
- **Direct referral traffic from AI** — Perplexity drives trackable referral traffic. In Google Analytics or your analytics platform, look for `perplexity.ai` in your referral sources. Growth here is a direct measure of citation volume.
- **Brand query volume** — Growth in branded search (people searching your business name directly) often follows AI recommendation visibility. If ChatGPT mentions your business and a user then searches your name to learn more, that shows up as branded search growth.

What you're measuring isn't ranking position — AI engines don't produce fixed rankings the way Google does. You're measuring presence frequency: how often does your business appear when someone in your service category asks AI for a recommendation?

This is not a one-time project. The businesses that compound small weekly actions — one review request batch, one structured page update, one pitch to a directory or publication — consistently outpace the ones waiting for a single big play.

### What Not to Do

A few common tactical errors I see when businesses try to "game" AI recommendations:

- **Keyword stuffing service pages** — Packing keywords into thin pages doesn't help AI retrieval and can trigger quality filters in Perplexity's source ranking. Pages need to actually answer questions, not just repeat phrases.
- **Buying fake reviews** — Both Google and Yelp actively remove these. Beyond the platform risk, fake reviews often read as hollow to AI synthesis models that pattern-match on review language quality and specificity.
- **Publishing AI-generated content farms** — Multiple thin AI-generated pages on variations of the same query don't build topical authority. One well-structured, genuinely helpful page on a specific service question outperforms ten thin variations in AI retrieval.
- **Ignoring Bing** — Most local SEO strategies focus exclusively on Google. For ChatGPT Search visibility, Bing Places for Business is a direct data input. It takes 20 minutes to claim and can produce results within two weeks.
- **Waiting for AI to "discover" you** — Neither ChatGPT nor Perplexity will find a business that has no indexed web presence. Visibility requires deliberate presence-building before any AI system can reference you.

My opinion on prioritization: if I had one week to move the needle for a local service business on zero AI presence, I'd spend it on three things in order — claim Bing Places, get five new Google reviews, and get one external mention (a guest post or directory listing). That combination creates the minimum viable entity footprint that both systems can work with.

### 30-Day Priority Table by Business Type

Different business types face different platform gaps. Here's how I'd triage the first 30 days by category:

| Business Type | Day 1-7 | Day 8-14 | Day 15-30 |
|---|---|---|---|
| **Local service (plumbing, HVAC, etc.)** | Claim Bing Places + audit Google Business Profile | Run review-ask campaign (Google first) | Submit to Houzz/Angi/Yelp + install LocalBusiness JSON-LD |
| **B2B professional services** | Claim G2 and Clutch profiles | Publish one LinkedIn article or case study | Pitch one industry directory or trade publication |
| **SaaS / software** | Claim G2, Capterra, and Product Hunt profiles | Email existing customers for G2 reviews | Publish a structured FAQ page targeting key buyer questions |
| **E-commerce / retail** | Verify Google Merchant Center and Bing Shopping | Drive Trustpilot or Google Shopping review volume | Publish structured product schema + FAQPage schema |
| **Healthcare / professional** | Verify Healthgrades and Zocdoc profiles | Run patient review-ask campaign | Publish a structured FAQ targeting common patient questions |

The platforms in the table aren't exhaustive — they're the starting points with the highest citation probability in each category based on observed Perplexity and ChatGPT behavior.

---

## Frequently Asked Questions

### Does ChatGPT use live web data or just its training data?

**ChatGPT uses both, depending on the user's plan settings and the nature of the query.** The base GPT-4o model draws from its training corpus with a knowledge cutoff of approximately early 2025. When ChatGPT Search is active (enabled by default on certain subscription tiers as of mid-2026), it fetches live results from Bing before generating its answer. Business-recommendation queries — especially those including a city, a service category, or a comparative intent like "best" or "vs" — are among the query types most likely to trigger live search.

### How does Perplexity choose which sources to cite?

**Perplexity retrieves live web sources on every query, then ranks them by topical relevance, content clarity, and domain authority before synthesizing its answer from the top results.** The Sonar model family powering Perplexity as of mid-2026 is purpose-built for retrieval-augmented generation. Pages with clear structural elements — headers, bullet lists, FAQ sections — extract more cleanly into synthesized answers. Pages from established, frequently-linked domains appear more consistently than newer or under-linked sites.

### Why does AI recommend my competitor and not me?

**Your competitor has stronger third-party evidence.** They appear in more external sources — review platforms, directories, editorial coverage, round-up lists — than your business does. Both ChatGPT and Perplexity weight external mentions as independent corroboration, which your own website can't provide. Run a Perplexity search for your service category and city, check which competitors appear, and examine the numbered citations Perplexity surfaces for those answers. Each cited source is a platform where your competitor has presence and you don't. That citation list is your exact gap analysis — the platforms and publications you need to earn presence on, in priority order.

### Do online reviews affect AI recommendations?

**Yes — directly and significantly.** Review platforms like Google, Yelp, Trustpilot, G2, and industry-specific sites are part of both ChatGPT's training corpus and Perplexity's live retrieval pool. **A business with 200 Google reviews and a 4.7-star average generates substantially more training signal and retrieval evidence than one with 14 reviews.** Review content matters too: reviews that mention specific services, outcomes, or team members add descriptive vocabulary that AI systems incorporate into their characterization of your business.

### How long does it take to start showing up in AI recommendations?

**Perplexity can reflect new citations within days to weeks once a source is indexed. ChatGPT's base model won't reflect new information until the next training update, but ChatGPT Search can surface your business immediately if you have a strong presence in the live web index.** Based on client work, a coordinated effort — directory cleanup, a structured review push, and one or two press mentions — typically produces visible Perplexity appearances within 4-8 weeks. Influencing ChatGPT's training data is a longer game measured in months and model release cycles. The fastest-moving lever is Perplexity because you can see results in real time: publish a well-structured service page, get it indexed, and search for it in Perplexity the next day.

### Can I pay to appear in ChatGPT or Perplexity recommendations?

**No paid placement exists in ChatGPT's answer interface as of mid-2026.** Perplexity does sell advertising — sponsored results that appear separately from organic citations — but the organic citations that answer most business-recommendation queries are determined by retrieval quality, not ad spend. The organic citations that carry trust with users are not purchasable. The only path to appearing in them is earning the underlying signals: third-party coverage, review velocity, structured data, and content that directly answers the queries your potential clients are asking.

### What is retrieval-augmented generation (RAG) and how does it affect AI recommendations?

**Retrieval-augmented generation (RAG) is the architecture where an AI model searches for relevant documents before generating an answer, grounding its response in retrieved evidence rather than relying solely on training memory.** Perplexity is a RAG-native system — every answer is grounded in live retrieved sources. ChatGPT's search mode also uses a form of RAG when browsing is active. For businesses, the implication is direct: the better your pages answer specific queries in a structured, extractable format, the higher the probability of retrieval and citation. A page that says "our plumbers are the best in Austin" provides no extractable fact. A page that says "we've completed 400+ residential plumbing jobs in Austin since 2018 with a 4.9 Google rating" gives the RAG system a concrete, citable claim it can include in a synthesized answer.

### Does having a Google Business Profile help with AI recommendations?

**Yes — especially for Google AI Mode and ChatGPT Search.** Google Business Profile data feeds directly into Google AI Mode's business recommendation panels. ChatGPT Search pulls from Bing's index, which does incorporate data from Google-sourced citations and review platforms. A complete, active Google Business Profile — with accurate categories, services, attributes, photos, and regular review activity — increases the volume of machine-readable entity data associated with your business in the indices that AI systems crawl. Bing Places for Business is a separate claim worth completing in parallel: it feeds ChatGPT Search directly.

### What role does structured data play in AI recommendations?

**Structured data in JSON-LD format is the highest-precision way to communicate your business's facts to AI retrieval systems.** [Schema.org](https://schema.org/) types like `LocalBusiness`, `Organization`, `Service`, and `FAQPage` give AI systems clean, structured entity data they can extract without inferring meaning from unstructured prose. Perplexity's retrieval model processes pages at scale and extracts structured data preferentially over prose. Google's AI Mode uses schema.org data to populate its business knowledge panels. Installing `LocalBusiness` JSON-LD on your homepage and `FAQPage` JSON-LD on answer-content pages is a direct input to the retrieval pipeline.

### How is AI recommendation visibility different from traditional SEO?

**Traditional SEO optimizes for a ranked list of links. AI recommendation optimization targets the synthesized answer that appears before or instead of those links.** The factors partially overlap — domain authority, content quality, inbound links — but AI systems weight structured answers, third-party entity mentions, and content that directly addresses specific queries more heavily than traditional PageRank-style signals. A page sitting at position 8 in Google's organic results can be cited by Perplexity ahead of the top-ranked page if it answers the query more precisely and clearly. This means businesses that were invisible in traditional SEO (low domain authority, few backlinks) can still surface in AI recommendations if they have strong review-platform presence and structured content — and conversely, strong traditional SEO performers can be overlooked by AI if their pages are information-sparse. The two visibility tracks diverge enough to require separate deliberate strategies.

### Do Claude and other AI assistants use the same recommendation signals?

**Claude (Anthropic's AI assistant), Microsoft Copilot, and Google Gemini all follow broadly similar patterns — they combine training data with some form of live retrieval, and they weight third-party mentions, structured content, and review platforms over first-party claims.** The specifics differ: Copilot pulls directly from Bing's index (similar to ChatGPT Search), Gemini pulls from Google's index, and Claude has a knowledge cutoff with optional tool use for web search. The signal priority is consistent across all of them: external evidence outweighs self-description, structured pages extract better than prose-only pages, and review platform presence creates the clearest entity signal. Building for ChatGPT and Perplexity builds for the others simultaneously because the foundational signals are shared.

### Does my industry affect which AI is most likely to recommend my business?

**Yes — different AI tools skew toward different platforms, and platform coverage patterns vary by industry.** In local home services (plumbing, HVAC, roofing), Yelp and Google carry the most weight across all AI systems because that's where the review volume lives. In B2B professional services, LinkedIn presence, Clutch listings, and industry publication mentions matter more than Yelp. In SaaS, G2 and Capterra reviews appear in Perplexity citations consistently. **The baseline strategy is universal; the execution is platform-specific.** Identify the two or three platforms where buyers in your specific category leave reviews and look for providers, and prioritize those over trying to be everywhere at once.

### Is there a difference between how AI recommends a business vs. recommends a product?

**Yes — business recommendations (service providers, professionals, local businesses) rely more heavily on review platforms and directory presence, while product recommendations rely more on e-commerce review signals, structured product data, and comparison content.** For services, Yelp, Google, and category directories dominate. For products, Google Shopping schema, Amazon presence (which ChatGPT's training data includes), and comparison-site listings (Wirecutter-style roundups) matter more. The underlying principle is the same — third-party evidence and structured data — but the specific platforms differ enough to require separate targeting strategies. If you sell both services and products, treat them as separate visibility tracks.

### Does social media presence influence AI recommendations?

**Indirectly, yes — but only the indexed parts.** Social platforms are part of both ChatGPT's training corpus and Bing's crawled content pool. Reddit threads, LinkedIn articles, Quora answers, and industry forum discussions that mention your business and are indexed by Bing can surface in ChatGPT Search and, occasionally, in Perplexity. The direct effect is smaller than review platforms or editorial coverage, but social mentions contribute to the volume of third-party data points both systems use to establish entity recognition. **The highest-value social signal for AI recommendations is a published, indexed piece** — a LinkedIn article, a forum answer, a guest post — rather than a timeline post that disappears from indexes within days. Reddit is notably powerful here: detailed Reddit threads about service providers frequently appear in both ChatGPT Search and Perplexity citations because they read as independent user discussion rather than brand content.

---

## Get Your Business Into AI Recommendations

If AI answer engines are starting to absorb the queries that used to send traffic and leads your way, the window to act is now — the businesses building their entity footprint today are the ones that will dominate AI recommendations over the next 12-18 months.

I run [AI-visibility audits](/contact) that map your current entity presence, identify the exact gaps in your AI recommendation footprint across ChatGPT, Perplexity, and Google AI Mode, and produce a 90-day action plan to close them. If you're ready to start appearing where your buyers are actually asking, [book an AI-visibility audit](/contact).
