---
title: "Your Blog Post Title"
slug: "your-blog-post-slug"
date: "YYYY-MM-DD"
lastModified: "YYYY-MM-DD"
author: "William Spurlock"
readingTime: 5
categories:
  - "AI Agents and Automations"
tags:
  - "tag1"
  - "tag2"
featured: false
draft: false
excerpt: "A compelling description (150-160 characters) that summarizes your content."
coverImage: "/images/blog/your-cover-image.png"
seoTitle: "Your SEO Title | William Spurlock"
seoDescription: "Your SEO description (140-160 chars)."
seoKeywords:
  - "primary keyword"
  - "secondary keyword"

# AIO/AEO Fields — REQUIRED, camelCase only (see SKILL.md schema contract)
aioTargetQueries:
  - "how does [topic] work"
  - "best [thing] for [use case]"
  - "[tool] vs [tool] comparison"
contentCluster: "your-cluster-slug"
pillarPost: false
parentPillar: "slug-of-parent-pillar"
entityMentions:
  - "William Spurlock"
  - "Tool Or Model Name"

# Service Track Routing
serviceTrack: "ai-automation" # "ai-automation" | "web-design" | "both"
---

# Your Blog Post Title

Lead paragraph — answer the post's core question in 1–2 sentences, then expand. The primary target keyword should appear naturally in the first 100 words.

## How Does [Topic] Actually Work?

Open with the direct answer in a single sentence. Then expand with mechanism, evidence, and a specific example. Every section needs a structured element (table, list, code block).

| Factor | Option A | Option B |
|---|---|---|
| Best for | … | … |
| Trade-off | … | … |

## When Should You Reach for [Tool]?

Direct answer first, then situations where it does/doesn't fit.

- **Reach for it when** — bulleted criteria
- **Skip it when** — bulleted criteria

## FAQ

> NOTE: Use H3 `### Question?` format. The renderer auto-extracts these into FAQPage JSON-LD when 2+ Q/A pairs are present and answers are 20+ chars.

### What is [topic] in one sentence?

**[Direct answer with the lead fact bolded.]** Then 1–2 supporting sentences with a specific data point or version number.

### How does [topic] compare to [alternative]?

**[Direct comparison with the winning condition bolded.]** Then 1–2 sentences of nuance.

### Is [topic] worth it for [use case]?

**[Yes/No/It depends — with the qualifier bolded.]** Then 1–2 sentences of reasoning.

## Closing CTA

Match the closing CTA to `serviceTrack`:
- `ai-automation` → "Book an AI automation strategy call"
- `web-design` → "Start a custom website project"
- `both` → choose the closer fit
