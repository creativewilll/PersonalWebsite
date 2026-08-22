# AEO Tracker — canonical base schema v1.0

One Airtable base per website, **identical schema in all three** so cross-site comparison works:

- `AEO Tracker — williamspurlock.com`
- `AEO Tracker — spurlockstudios.com`
- `AEO Tracker — Divine Toke`

## Why this shape

The question this base exists to answer is *"what specifically causes an AI engine to cite my site."* Answering it causally needs four things linked together, and most SEO trackers only have the first two:

1. **A stable, versioned rubric** — so a score in November is comparable to a score in August. Every scorer disagrees, so `Audits` records *who or what* scored it and on *which rubric version*. That makes scorer disagreement a measurable quantity instead of a mystery.
2. **Per-dimension results, not just totals** — `Audit Results` is one row per page per dimension. A total score can't tell you which change mattered; a dimension can.
3. **A changelog with real diffs** — `Changes` stores copy before/after and code before/after, tagged with the dimensions it flips and the commit that shipped it.
4. **An outcome variable independent of your own scoring** — `Citation Checks` records whether a real engine actually cited you for a real buyer question. This is the only ground truth that isn't self-graded.

`Experiments` joins them: a change flipped dimension A4 on eight pages on a date, and citation rate for those pages over the following 30 days moved from X to Y. That is the causal claim, and the `Learning` field is where the answer accumulates.

## Tables

### 1. Pages
The URL inventory. Primary: `URL Path`.

| Field | Type | Notes |
|---|---|---|
| URL Path | singleLineText | primary, e.g. `/blog/geo-vs-seo` |
| Full URL | url | |
| Page Type | singleSelect | Home, Service, About, Index/Hub, Blog Post, Taxonomy, Case Study, Detail, Landing, Legal, Global/Infra, Other |
| Page Title | singleLineText | as served |
| Meta Description | multilineText | as served |
| Primary Entity | singleLineText | the thing this page is about |
| Target Query | singleLineText | the query it should win |
| Word Count | number(0) | |
| In Sitemap | checkbox | |
| Prerendered | checkbox | |
| Canonical Correct | checkbox | |
| Indexable | checkbox | |
| Current AEO Score | number(2) | rollup target, set by latest audit |
| Current SEO Score | number(2) | |
| Last Audited | date(iso) | |
| Status | singleSelect | Live, Draft, Soft-404, Broken, Retired |
| Notes | multilineText | |

### 2. Rubric Dimensions
The versioned rubric. Primary: `Dim Code`. Seeded with A1–A10 and S1–S10 at v1.0.

| Field | Type | Notes |
|---|---|---|
| Dim Code | singleLineText | primary, `A1`…`S10` |
| Axis | singleSelect | AEO, SEO |
| Dimension Name | singleLineText | |
| Definition | multilineText | |
| Pass Criteria | multilineText | what counts as a full point |
| Weight | number(2) | default 1 |
| Rubric Version | singleLineText | `v1.0` |
| Active | checkbox | |

### 3. Audits
One scoring event per page per scorer per date. Primary: `Audit Key`.

| Field | Type | Notes |
|---|---|---|
| Audit Key | singleLineText | primary, `YYYY-MM-DD · /path · scorer` |
| Date | date(iso) | |
| AEO Score | number(2) | |
| SEO Score | number(2) | |
| Rubric Version | singleLineText | |
| Scorer | singleLineText | model slug or person name |
| Scorer Type | singleSelect | LLM, Human, Tool |
| Scorer Model Version | singleLineText | |
| Method | singleSelect | Manual read, Automated crawl, Live HTTP check, Lighthouse, Mixed |
| Verdict | multilineText | |
| Evidence Link | url | report file, commit, or screenshot |

### 4. Audit Results
The junction that makes per-dimension analysis possible. Primary: `Result Key`.

| Field | Type | Notes |
|---|---|---|
| Result Key | singleLineText | primary, `YYYY-MM-DD · /path · A4` |
| Outcome | singleSelect | Pass, Half, Fail |
| Points | number(2) | 1 / 0.5 / 0 |
| Evidence | multilineText | must carry a `file:line` or URL |

### 5. Changes
Backlog and changelog in one table — a fix is `Planned` until it ships. Primary: `Change Title`.

| Field | Type | Notes |
|---|---|---|
| Change Title | singleLineText | primary |
| Fix ID | singleLineText | e.g. `G1` |
| Status | singleSelect | Planned, In Progress, Shipped, Reverted, Abandoned |
| Change Type | multipleSelects | Copy, Code, Schema/JSON-LD, Infrastructure, New content, Internal linking, Images, Meta tags, Sitemap/Robots, Performance |
| Axis Targeted | multipleSelects | AEO, SEO, AIO, GEO |
| Effort | singleSelect | S, M, L |
| Hypothesis | multilineText | what you expect to move, and why |
| What Was Done | multilineText | |
| Copy Before | multilineText | |
| Copy After | multilineText | |
| Code Before | multilineText | |
| Code After | multilineText | |
| Files Touched | multilineText | |
| Commit SHA | singleLineText | |
| Date Planned | date(iso) | |
| Date Shipped | date(iso) | |
| Deployed At | dateTime(iso, 24h, America/New_York) | |
| Reverted Reason | multilineText | |

### 6. Queries
The prompt panel — the buyer questions you want to win. Primary: `Query`.

| Field | Type | Notes |
|---|---|---|
| Query | singleLineText | primary, phrased as a person would ask it |
| Intent | singleSelect | Informational, Commercial, Transactional, Navigational, Local |
| Funnel Stage | singleSelect | Awareness, Consideration, Decision |
| Priority | singleSelect | P0, P1, P2 |
| Target Answer | multilineText | what a correct answer citing you would say |
| Engines To Test | multipleSelects | ChatGPT, Perplexity, Google AI Overviews, Google AI Mode, Claude, Gemini, Copilot, Grok |
| Active | checkbox | |

### 7. Citation Checks
The outcome variable. The only table not self-graded. Primary: `Check Key`.

| Field | Type | Notes |
|---|---|---|
| Check Key | singleLineText | primary, `YYYY-MM-DD · Engine · query` |
| Date | date(iso) | |
| Engine | singleSelect | ChatGPT, Perplexity, Google AI Overviews, Google AI Mode, Claude, Gemini, Copilot, Grok |
| Engine Model Version | singleLineText | |
| Cited | checkbox | |
| Citation Position | number(0) | 1 = first source listed |
| Mention Type | singleSelect | Linked citation, Named without link, Not mentioned |
| Framing | singleSelect | Recommended, Listed neutrally, Mentioned in passing, Negative, Absent |
| Competitors Cited | multilineText | who won instead |
| Answer Excerpt | multilineText | |
| Screenshot | multipleAttachments | |
| Tested By | singleLineText | |
| Notes | multilineText | |

### 8. Experiments
The causal layer. Primary: `Experiment`.

| Field | Type | Notes |
|---|---|---|
| Experiment | singleLineText | primary |
| Hypothesis | multilineText | |
| Status | singleSelect | Designed, Running, Measuring, Concluded, Abandoned |
| Baseline Start | date(iso) | |
| Baseline End | date(iso) | |
| Treatment Start | date(iso) | |
| Treatment End | date(iso) | |
| Primary Metric | singleSelect | Citation rate, Citation position, AEO score, SEO score, Impressions, Clicks, Avg position, AI referral sessions, Crawler hits |
| Baseline Value | number(2) | |
| Post Value | number(2) | |
| Delta | number(2) | |
| Result | singleSelect | Confirmed, Refuted, Inconclusive, Confounded |
| Confounders | multilineText | |
| Confidence | singleSelect | High, Medium, Low |
| Learning | multilineText | **the payoff field** — what this taught you about what AI rewards |

### 9. Metrics Snapshots
Hard numbers over time. Primary: `Snapshot Key`.

| Field | Type | Notes |
|---|---|---|
| Snapshot Key | singleLineText | primary, `YYYY-MM-DD · scope · source` |
| Date | date(iso) | |
| Scope | singleSelect | Site, Page |
| Source | singleSelect | Google Search Console, GA4, Cloudflare Analytics, Lighthouse, Ahrefs, Semrush, Manual |
| Impressions | number(0) | |
| Clicks | number(0) | |
| CTR | percent(2) | |
| Avg Position | number(2) | |
| AI Referral Sessions | number(0) | sessions from chatgpt.com, perplexity.ai, etc. |
| Lighthouse Performance | number(0) | |
| Lighthouse SEO | number(0) | |
| Lighthouse Accessibility | number(0) | |
| LCP ms | number(0) | |
| Notes | multilineText | |

### 10. Crawler Hits
Direct evidence that AI crawlers are actually fetching pages. Primary: `Hit Key`.

| Field | Type | Notes |
|---|---|---|
| Hit Key | singleLineText | primary, `YYYY-MM-DD · Bot · /path` |
| Date | date(iso) | |
| Bot | singleSelect | GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, Googlebot, Bingbot, CCBot, Applebot-Extended, Amazonbot, Other |
| Hits | number(0) | |
| Status Codes | singleLineText | e.g. `200×14, 404×2` |
| Source | singleSelect | Cloudflare Logs, Server Logs, Manual |
| Notes | multilineText | |

## Link fields (phase 2 — added after tables exist)

| From table | Field name | Links to |
|---|---|---|
| Audits | Page | Pages |
| Audit Results | Audit | Audits |
| Audit Results | Rubric Dimension | Rubric Dimensions |
| Audit Results | Page | Pages |
| Changes | Pages Affected | Pages |
| Changes | Dimensions Flipped | Rubric Dimensions |
| Changes | Experiment | Experiments |
| Queries | Target Page | Pages |
| Citation Checks | Query | Queries |
| Citation Checks | Cited Page | Pages |
| Citation Checks | Experiment | Experiments |
| Experiments | Changes | Changes |
| Experiments | Pages | Pages |
| Metrics Snapshots | Page | Pages |
| Crawler Hits | Page | Pages |

Airtable creates the symmetric field on the target table automatically, so do not create the reverse direction manually.

## The measurement loop

1. **Audit** a page against the current rubric — one `Audits` row plus 20 `Audit Results` rows.
2. **Plan** fixes as `Changes` rows with `Status = Planned`, each tagged with the dimensions it should flip and a written `Hypothesis`.
3. **Ship** one coherent batch. Fill `Copy Before/After`, `Code Before/After`, `Commit SHA`, `Date Shipped`. Keep batches small enough to attribute.
4. **Re-audit** the same pages with the *same rubric version*. The dimension-level diff shows what actually landed.
5. **Measure the outcome** by running the `Queries` panel against each engine on a fixed cadence and logging `Citation Checks`. Same queries, same engines, same wording every time — that is what makes the series comparable.
6. **Conclude** in `Experiments`. Write the `Learning`. Over a few cycles this table becomes your own evidence base for what AI engines actually reward on your sites, rather than what any single tool or model asserts.

Two discipline rules that make the data trustworthy: never change the rubric and the content in the same cycle, and never ship two changes to the same page in one window if you want to attribute either one.

## Live base and table IDs

Three bases were built 2026-08-21, one per site, with schema parity verified across all three — identical table names, field names, and field types, zero drift.

**The base, table, and workspace IDs are deliberately not in this public repo.** They live locally at:

```
~/.cursor/migration-from-antigravity/knowledge/aeo-tracker-schema-with-ids.md
```

Base IDs are not credentials on their own — reading or writing still requires an Airtable PAT — but they are internal identifiers with no reason to be published. Any agent that needs them can read the local file, or resolve them at runtime with the Airtable MCP: `search_bases` with `searchQuery: "AEO Tracker"`, then `list_tables_for_base` for table IDs and field IDs.

Note on the link fields: only 15 need explicit creation. `Experiments.Changes` is the automatic inverse of `Changes.Experiment`, so attempting to create it separately returns `DUPLICATE_OR_EMPTY_FIELD_NAME`. That error is expected and means the field already exists correctly.

## Rubric seed data v1.0

Seed all 20 rows into `Rubric Dimensions` in every base. `Weight` = 1, `Rubric Version` = `v1.0`, `Active` = true for all.

| Dim Code | Axis | Dimension Name | Definition | Pass Criteria |
|---|---|---|---|---|
| A1 | AEO | Answer capsule | A direct, self-contained answer or definition inside the first two paragraphs of main content. | First two sentences answer the query implied by the title without requiring the rest of the page. |
| A2 | AEO | Question-shaped headings | H2/H3s phrased as real user queries rather than slogans or topic labels. | A majority of H2s could be pasted into a search box verbatim. |
| A3 | AEO | Visible FAQ block | A FAQ section that a human reader can see on the page. | At least two question/answer pairs rendered in the DOM, not collapsed out of it. |
| A4 | AEO | FAQPage schema matches visible FAQ | FAQPage JSON-LD present and its questions match what is on the page. | Schema present AND every schema question appears visibly. Mismatched markup fails outright. |
| A5 | AEO | Correct primary-entity schema | The page emits schema for what it actually is, beyond a site-wide Organization node. | Page-appropriate @type present, e.g. BlogPosting, Service, CreativeWork, CollectionPage, AboutPage. |
| A6 | AEO | Entity graph linkage | Page schema joined by @id to the Organization node and to a Person node carrying sameAs. | Single @graph per route with @id references resolving internally. |
| A7 | AEO | Named concrete entities | Specific models, tools, platforms, vendors, or clients named rather than generic claims. | Named entities appear in body copy, not only in schema. |
| A8 | AEO | Sourced and dated claims | Quantified claims carry both a date and a source. | Each stat has a date and a resolvable source link or named study. |
| A9 | AEO | Machine-readable freshness | dateModified in schema and/or a visible reviewed date. | dateModified differs from datePublished when the page has actually been revised. |
| A10 | AEO | Extractable in served HTML | The content exists in the static HTML actually returned for that URL. | Correct page prerendered, text not JS-gated, no loader or skeleton captured. |
| S1 | SEO | Title quality | Unique title, roughly 50–60 characters, no doubled brand, no `undefined`. | Renders once, correct length, brand appears at most once. |
| S2 | SEO | Description quality | Unique meta description roughly 140–160 characters. | Not duplicated from another page and not truncated in SERP. |
| S3 | SEO | Canonical correctness | Canonical present, absolute, self-referential, matching the served URL form. | Canonical equals the URL that actually serves 200, including trailing-slash form. |
| S4 | SEO | HTTP semantics | The URL is not a soft-404 and does not serve another page's content. | Real pages 200 with their own content; missing pages return 404. |
| S5 | SEO | Sitemap presence | Present in sitemap.xml with an accurate lastmod. | Listed once, lastmod derived from content not build time. |
| S6 | SEO | Prerender coverage | Prerendered HTML exists so crawlers get the page rather than an app shell. | A static document for this URL contains the page's own H1 and copy. |
| S7 | SEO | Heading structure | Exactly one H1 and no skipped heading levels. | One H1 in the served DOM, hierarchy descends without gaps. |
| S8 | SEO | Crawlable internal links | Real `<a href>` links out to related pages with descriptive anchor text. | Navigation does not depend on JS click handlers; anchors describe the destination. |
| S9 | SEO | Image treatment | Descriptive alt, explicit width and height, modern format, correct loading and fetchpriority. | No layout shift, no missing alt, LCP image eager and prioritized. |
| S10 | SEO | Head tag hygiene | No duplicate or conflicting head tags. | Exactly one description, one og:title, one og:url, one og:image in the served HTML. |
