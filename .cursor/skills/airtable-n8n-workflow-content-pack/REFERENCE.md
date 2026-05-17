# Reference: templates, density checks, image prompts

## Blog body minimums (all must pass before ship)

| Gate | Minimum |
|------|---------|
| Body lines (non-empty, excluding `---` frontmatter) | **220** |
| Body word count | **3,000** |
| Top-level `##` sections | **14** (include FAQ as one section with **8** `###` questions) |
| `aioTargetQueries` in frontmatter | **12** distinct questions |
| `seoKeywords` | **10** |
| Internal links to related williamspurlock.com posts | **3** where relevant |
| Tables OR diagrams | **≥ 1** (comparison table, node map, or mermaid) |

Verify with:

```bash
# words (body only — strip frontmatter manually or use script)
python3 -c "
import pathlib, re
p = pathlib.Path('content/blog/YYYY/MM/slug.md')
raw = p.read_text(encoding='utf-8')
body = re.split(r'^---\s*$', raw, maxsplit=2)[-1]
print('words', len(body.split()))
print('h2', len(re.findall(r'^##\\s', body, re.M)))
"
```

## Project page minimums (magnet standard)

| Gate | Minimum |
|------|---------|
| Body `##` sections | **12** |
| Body word count | **900** |
| `features` | **7** bullets |
| `tags` | **5** |
| `seoKeywords` | **10** |
| FAQ `###` under one `##` | **6** |
| Comparison or stack **table** | **≥ 1** |

Author against `content/projects/_project-page-magnet-template.md` and `.cursor/rules/project-page-magnet-standard.mdc`. Do **not** copy legacy thin project stubs. `_*.md` files are excluded from the catalog.

**Section substance (H2 titles may vary):** who it is for; manual pain; shipped deliverables; architecture; integrations; AI vs rules; reliability; security; deployment; commercial framing; manual vs automated table; FAQ; CTA.

## Extended project frontmatter (camelCase; matches `projectLoader`)

```yaml
---
title: "Human Title"
slug: "kebab-slug"
type: "automation"
description: "155–165 chars: dense keywords + outcome."
image: "/projects/{slug}-cover.png"
timeline: "Typical build: X–Y weeks" 
featured: false
priority: 5
tags: ["n8n", "..."]   # ≥5
features:              # ≥7 bullets
  - "..."
seoTitle: "Primary Keyword + Secondary | William Spurlock"
seoDescription: "155–165 chars. Answer-engine friendly first sentence."
seoKeywords:           # ≥10
  - "primary"
---
```

## Cover images (two files)

| Asset | Path pattern | Aspect |
|-------|----------------|--------|
| Blog | `/public/images/blog/{slug}-cover.png` | Wide hero, readable at card size |
| Project | `/public/projects/{slug}-cover.png` | Consistent with grid thumbnails |

**Generation:** Use the IDE **Generate image** action twice (blog + project)—the same image pipeline you use for other covers.  
**Prompt rules:**

- Describe **subject, lighting, composition, style** only (e.g. *isometric n8n node diagram, dark UI, cyan accents, professional tech illustration, no text logos*).
- **Do not** name the image tool, vendor codenames, or in-jokes inside the prompt—only describe the picture.
- Differentiate: blog = editorial/hero; project = productized “sellable automation” look.

## Data fields to mine from CSV (selected row)

Use the full row for the chosen workflow:

- `Workflow Name` → titles, slugs (sanitize)  
- `Brief` → Ledes, meta  
- `Overview` → deep body, architecture truth  
- `Most Valuable Angle` → differentiation, outbound copy  
- `Workflow Tags` → tags, clusters  
- `Upwork Project` → buyer-facing angles (do not duplicate verbatim if duplicative—synthesize)  
- `Blog Article` → if empty, fill after publish with `/blog/{slug}` for next Airtable sync  

Do **not** paste multi-megabyte `JSON` into markdown; summarize node categories only.

## AIO/AEO / SEO (must read)

Before drafting, read:

- `~/.cursor/skills/authoring-blog-posts/AIO_AEO_STRATEGY.md`  
- `~/.cursor/skills/authoring-blog-posts/SEO_STRATEGY.md`  
- `~/.cursor/skills/authoring-blog-posts/SKILL.md` (frontmatter contract + `serviceTrack`)

Blog `serviceTrack`: **always** `"ai-automation"` for this pack unless the workflow is explicitly web-only.
