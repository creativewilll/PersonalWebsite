# Airtable Schema — WS Blog

> Airtable is the source of truth for all blog planning, status, questions, and claims. The published artifact remains the markdown files in `content/blog/YYYY/MM/<slug>.md` on the website repo.
>
> Base URL: https://airtable.com/appQA9UR7KiKscbG5/tbl3ONBuy5H3kIbqv/viwino4orKnFPSlKr  
> Base ID: `appQA9UR7KiKscbG5`

---

## Source-of-Truth Split

| Layer | Owns | Lives In |
|-------|------|----------|
| Airtable WS_Blog | Schedule, status, question ledger, pillar/clusters, claims | `appQA9UR7KiKscbG5` |
| Website repo | Final rendered content | `content/blog/YYYY/MM/<slug>.md` |
| Sync scripts | Pull/push between the two | `scripts/blog-sync.mjs` |

---

## Environment Variables

```bash
AIRTABLE_PAT=          # never commit — live value lives in ~/.cursor/skills/social-campaign-generator/.env
AIRTABLE_BASE_ID=appQA9UR7KiKscbG5
```

Store the PAT in `.env` only (repo root or `social-campaign-generator/.env`). They are read by `scripts/blog-sync.mjs`, `scripts/import-question-bank.mjs`, and `scripts/migrate-posts-to-airtable.mjs`. Do not paste tokens into this file.

---

## Table: Posts

Every post — idea, queued, in-progress, published — has one row.

| Field | Type | Notes |
|-------|------|-------|
| Title | singleLineText | Primary field |
| Slug | singleLineText | Unique; matches filename stem |
| Status | singleSelect | Idea / Queued / In Progress / Published / Archived |
| Date | date | Target or actual publication date |
| LastModified | date | Mirrors frontmatter `lastModified` |
| Part | singleSelect | AI Visibility / AI Automation / AI Agents / Web Design / Studio |
| Category | multipleRecordLinks -> Categories | Link to one category |
| Cluster | multipleRecordLinks -> Clusters | Link to one cluster |
| ServiceTrack | singleSelect | ai-visibility / ai-automation / web-design / both |
| PillarPost | checkbox | True for pillar posts |
| ParentPillar | multipleRecordLinks -> Posts | Spokes link to their pillar |
| TargetQuestions | multipleRecordLinks -> Questions | 3-5 main questions this post answers |
| FAQQuestions | multipleRecordLinks -> Questions | ~8 adjacent FAQ questions |
| PrimaryQuery | singleLineText | The one query this post owns (dedupe key) |
| FilePath | singleLineText | `content/blog/YYYY/MM/<slug>.md` |
| CoverImage | singleLineText | `/images/blog/<file>.png` |
| WordCount | number | Filled on publish |
| ReadingTime | number | minutes, ~words/200 |
| Excerpt | multilineText | 150-160 chars |
| ClaimsValidated | checkbox | True after claims table is complete |
| Notes | multilineText | Planning notes |

---

## Table: Questions

The 500+ question bank as a live ledger.

| Field | Type | Notes |
|-------|------|-------|
| Question | singleLineText | Primary field; verbatim from bank |
| Number | number | Original 1-500+ index |
| Part | singleSelect | AI Visibility / AI Automation / AI Agents |
| Category | multipleRecordLinks -> Categories | Which category |
| FunnelStage | singleSelect | Definition / Stakes / Method / Proof |
| Status | singleSelect | Unused / Assigned / FAQ / Published |
| AssignedPost | multipleRecordLinks -> Posts | Post that consumed it |
| PrimaryKeyword | singleLineText | Optional |

---

## Table: Categories

The 27 question-bank categories plus any web/studio categories.

| Field | Type | Notes |
|-------|------|-------|
| Name | singleLineText | Primary field; e.g. `1 AI Visibility Fundamentals` |
| Part | singleSelect | AI Visibility / AI Automation / AI Agents / Web Design / Studio |
| Priority | singleSelect | Primary / Secondary / Tertiary |
| Questions | multipleRecordLinks -> Questions | Linked questions |
| Posts | multipleRecordLinks -> Posts | Linked posts |
| Clusters | multipleRecordLinks -> Clusters | Linked clusters |

---

## Table: Clusters

Pillar clusters. Most categories map to one cluster.

| Field | Type | Notes |
|-------|------|-------|
| Cluster | singleLineText | Primary field; kebab slug, e.g. `ai-visibility-fundamentals` |
| Label | singleLineText | Human name |
| Part | singleSelect | AI Visibility / AI Automation / AI Agents / Web Design / Studio |
| Priority | singleSelect | Primary / Secondary / Tertiary |
| PillarPost | multipleRecordLinks -> Posts | The pillar post |
| Spokes | multipleRecordLinks -> Posts | Spoke posts |
| Categories | multipleRecordLinks -> Categories | Categories in this cluster |

---

## Table: Claims

Mandatory claims validation. One row per claim per post.

| Field | Type | Notes |
|-------|------|-------|
| Claim | multilineText | Primary field; exact wording of the claim |
| Post | multipleRecordLinks -> Posts | Which post this supports |
| SourceURL | url | Primary source link |
| SourceDate | date | When the source was published |
| Confidence | singleSelect | High / Medium / Estimate / Unverified |
| Category | singleSelect | Stat / ModelSpec / Pricing / MarketShare / Other |

---

## Table: Schedule

The publishing calendar. Replaces `PUBLISHING_CALENDAR.md`.

| Field | Type | Notes |
|-------|------|-------|
| Date | date | Primary field |
| Post | multipleRecordLinks -> Posts | Scheduled post |
| Day | formula | `WEEKDAY(Date)` derived |
| Status | lookup | From linked Post.Status |
| Part | lookup | From linked Post.Part |
| Notes | multilineText | Freeform |

---

## Required Views

- Posts: All, Published, Queued, In Progress, Ideas, Pillar Posts, AI Visibility Only, Needs Claims Validation
- Questions: All, Unused, Assigned, Published, By Part, By Category
- Categories: All, By Part
- Clusters: All, By Part
- Claims: All, Unverified, High Confidence
- Schedule: Calendar, This Month

Views missing at validation time should be reported but do not block the scripts.

---

## Sync Contract

### `scripts/blog-sync.mjs pull`

Reads the entire base and writes local cache JSON to `scripts/airtable-cache/`:

- posts.json
- questions.json
- categories.json
- clusters.json
- claims.json
- schedule.json

The skill reads these cache files when planning posts.

### `scripts/blog-sync.mjs push --slug=<slug>`

After a post is written and saved to `content/blog/YYYY/MM/<slug>.md`:

1. Parse the markdown frontmatter.
2. Find the matching `Posts` row by `Slug`.
3. Update: Status=Published, Date, LastModified, FilePath, CoverImage, WordCount, ReadingTime, Excerpt.
4. Update linked TargetQuestions and FAQQuestions to Status=Published.
5. Update the linked Schedule row status.

### `scripts/import-question-bank.mjs`

One-time import from `AI_VISIBILITY_QUESTION_BANK.md`:

- Create Categories for all 27 categories with Part and Priority.
- Create Questions for every numbered question, linked to Category, with Part.

### `scripts/migrate-posts-to-airtable.mjs`

One-time migration from `content/blog/2025/**/*.md` and `content/blog/2026/**/*.md`:

- Only posts where `draft: false`.
- Create Posts rows with Status=Published, link Category/Cluster where inferable.
- Do not create Question rows from old posts.
