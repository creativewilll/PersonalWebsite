---
name: airtable-n8n-workflow-content-pack
description: >-
  Samples random n8n workflows from the synced Airtable CSV export, lets the user choose one,
  then drafts a maximum-density AIO/AEO/SEO blog post and a sellable project page section-by-section,
  and generates separate blog and project cover images. Use when the user wants portfolio content
  from their n8n Automations base, random workflow article ideas, paired blog+project deliverables,
  or sellable automation collateral from Airtable workflow rows.
---

# Airtable → Blog + Project Content Pack (n8n workflows)

## Canonical data source

1. **Primary:** `~/Downloads/n8n Automations Airtable.csv` (UTF-8 with BOM).  
   Override via env `N8N_AIRTABLE_CSV`. Same file as `.cursor/rules/n8n-airtable-csv-source.mdc`.
2. **Optional:** Live Airtable API only if the user has provided a PAT and base/table IDs in chat or `.env`—**never** invent rows.

## Phase A — Pick three for the user

Run from repo root (or anywhere):

```bash
python3 .cursor/skills/airtable-n8n-workflow-content-pack/scripts/pick_three_workflows.py
# Reproducible:
python3 .cursor/skills/airtable-n8n-workflow-content-pack/scripts/pick_three_workflows.py --seed 42
```

Present **Option 1–3** with **Workflow Name** + trimmed **Brief**. Stop and **wait for the user to choose**.

## Phase B — Load the full row

After selection, read the CSV with `utf-8-sig` and isolate the matching `Workflow Name`. Pull at minimum:

`Brief`, `Overview`, `Most Valuable Angle`, `Workflow Tags`, `Upwork Project`, `Blog Article`, `Workflow ID`.

**Do not** embed full workflow `JSON` in markdown. Summarize triggers, node families, and integrations in prose or a compact table.

## Phase C — Planning (before any file writes)

1. Read [REFERENCE.md](REFERENCE.md) for **minimum sizes**, templates, and image rules.
2. Read `~/.cursor/skills/authoring-blog-posts/SKILL.md` (frontmatter **camelCase** contract).
3. Read `~/.cursor/skills/authoring-blog-posts/AIO_AEO_STRATEGY.md` (lead with answer, question headings, FAQ density).
4. Propose **one shared `slug`** (kebab-case) for blog + project, derived from the workflow name.
5. Show a **one-screen outline**: blog H2 list (≥14) + project H2 list (≥12).

## Phase D — Cover images (before or after draft; two separate generations)

Use the **Generate image** tool **twice**:

| File | Purpose |
|------|---------|
| `public/images/blog/{slug}-cover.png` | Blog hero: editorial, wide, on-topic abstraction of the automation domain |
| `public/projects/{slug}-cover.png` | Project card: productized “sellable system” visual |

**Image prompt constraints:**

- Professional illustration / 3D isometric / cinematic tech art only—describe **scene, palette, composition, style**.
- **Forbidden in prompts:** naming the image generator, vendor codenames, or meme meta-jokes—only describe the visual.
- **No** legible fake logos or unreadable tiny text blocks.

Match `coverImage` and `image` frontmatter paths exactly (`/images/blog/...`, `/projects/...`).

## Phase E — Blog post (section-by-section)

**Output path:** `content/blog/YYYY/MM/{slug}.md` (current calendar month/year unless user specifies).

**Hard minimums** (fail closed—expand with technical depth, FAQs, comparisons, mermaid, keyword-rich `###` subheads):

- **≥ 220** non-empty body lines after frontmatter  
- **≥ 3,000** words body  
- **≥ 14** top-level `##` sections  
- FAQ section with **≥ 8** `###` questions  
- Frontmatter: **≥ 12** `aioTargetQueries`, **≥ 10** `seoKeywords`  
- **≥ 3** internal links to relevant existing posts on this site  

**Execution style:**

1. Write complete YAML frontmatter first (all AIO fields, `entityMentions`, `serviceTrack: "ai-automation"`, `readingTime` ≈ words/200).
2. Append **one or two `##` sections per edit** until minimums met (token-limit discipline).
3. Every section: **answer in the first 1–2 sentences**, then mechanics, then takeaway.
4. **Never fabricate** client names, dollar ROI, or metrics not in the CSV/user message—use “typical for this pattern” language unless the user supplied proof points.

## Phase F — Project page (sellable SKU)

**Output path:** `content/projects/{slug}.md`

**Hard minimums** (align with `content/projects/_project-page-magnet-template.md` and `.cursor/rules/project-page-magnet-standard.mdc`; **do not** copy legacy thin stubs):

- **≥ 12** `##` sections in body  
- **≥ 900** words in body  
- **≥ 7** `features`, **≥ 5** `tags`, **≥ 10** `seoKeywords`  
- **≥ 6** FAQ questions as `###` under one `##`  
- **≥ 1** comparison or stack table  
- Heavy buyer framing: who pays, what it replaces, how it deploys  

Frontmatter must populate `seoTitle`, `seoDescription`, `seoKeywords` so `projectLoader` builds rich `seo`.

## Phase G — Validation & handoff

1. Run word/heading counts (see [REFERENCE.md](REFERENCE.md)).
2. Spot-check blog frontmatter keys against `blogLoader` contract in authoring skill (camelCase only).
3. Tell the user to update **Airtable** `Blog Article` field with `/blog/{slug}` on next sync if they track publication there.
4. Mention **cover assets** paths for any manual touch-up.

## Anti-patterns

- One-shot dumping 3k words in a single message instead of **incremental file writes**.
- Paraphrasing the entire `Overview` as one wall—**structure** for answer engines.
- Selling the **exact proprietary JSON** as downloadable IP unless the user explicitly allows it.
- Using **wrong** frontmatter keys (`seo_title`, `cover_image`, etc.)—they silently break the site.

## When CSV is missing

Ask the user to export **n8n Automations Airtable.csv** to Downloads or set `N8N_AIRTABLE_CSV`. Do not substitute fictional workflows.
