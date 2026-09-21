# William Spurlock SEO Strategy

> Traditional search engine optimization rules for the William Spurlock blog.
> Works IN CONJUNCTION with the [AIO/AEO Strategy](./AIO_AEO_STRATEGY.md) — AIO/AEO is the primary focus, SEO supports it.

> [!NOTE]
> **Authoritative source split (read alongside [`AIO_AEO_STRATEGY.md`](./AIO_AEO_STRATEGY.md)):**
> - **This file owns:** keyword tier targeting, on-page mechanics (titles/meta/URL/headings), image SEO, technical SEO checklist, the keyword master list.
> - **`AIO_AEO_STRATEGY.md` owns:** FAQ structure, content cluster strategy, entity-first writing, citation-worthy phrasing, freshness signals.
> - When the two overlap (FAQ requirement, internal linking, freshness), AIO/AEO's specification wins.

---

## Core SEO Framework

### Target Keyword Architecture

Every post targets ONE primary keyword and 3–5 secondary keywords.

**Keyword Tiers:**

| Tier | Type | Example | Monthly Search Volume |
|------|------|---------|-----------------------|
| 1 | Head term (pillar posts) | "ai coding assistant" / "custom website design" | 1K–10K |
| 2 | Long-tail (spoke posts) | "cursor vs claude code" / "gsap scrolltrigger tutorial" | 100–1K |
| 3 | Question-based (FAQ/AIO) | "how does mcp work" / "how much does a custom website cost" | 50–500 |
| 4 | Niche / branded | "william spurlock n8n masterclass" / "antigravity skills" | 10–200 |

**Priority:** Tier 2 and 3 keywords are where the William Spurlock blog wins. Don't compete with TechCrunch, The Verge, or CSS-Tricks on head terms — own the specific, technical, builder-focused long-tail space.

---

## On-Page SEO Rules

### Title Tags

- **Format:** `[Descriptive Title] | William Spurlock`
- **Length:** Under 60 characters
- Primary keyword in first half of title
- Use power words: Guide, Masterclass, Blueprint, Complete, How, Why, Best, vs

### Meta Descriptions

- **Length:** 150–160 characters
- Include primary keyword naturally
- Include a value proposition or hook
- End with implicit CTA ("Learn how..." / "See the full architecture..." / "Get the production patterns...")

### URL Structure

- `content/blog/YYYY/MM/keyword-rich-slug.md`
- Slugs: lowercase, hyphens, 3–6 words max
- Include primary keyword in slug
- Never change a published slug (breaks links)

### Heading Hierarchy

```
H1: Post title (ONE per page, contains primary keyword)
  H2: Major sections (contain secondary keywords)
    H3: Subsections (contain long-tail/question keywords)
```

### Keyword Placement Checklist

- [ ] Primary keyword in H1 title
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in at least 2 H2 headings
- [ ] Primary keyword in meta description
- [ ] Primary keyword in URL slug
- [ ] Primary keyword in image alt text (at least one image)
- [ ] Secondary keywords distributed across H2/H3 headings
- [ ] Natural keyword density: 1–2% (do NOT keyword stuff)

---

## Content Length Guidelines

| Post Type | Word Count | Reading Time | Use Case |
|-----------|------------|--------------|----------|
| Pillar Post | 2,500–4,500 | 12–22 min | Comprehensive masterclasses, blueprint posts, topical authority |
| Spoke Post | 1,200–2,000 | 6–10 min | Focused subtopics, specific tool deep-dives |
| News/Release Coverage | 800–1,200 | 4–6 min | Model releases, version updates, industry news |
| Quick Guide | 600–1,000 | 3–5 min | How-tos, cheat sheets, focused tutorials |
| Case Study | 1,500–2,500 | 8–12 min | Client builds, ROI breakdowns, project teardowns |

**Every post, regardless of length, must have a FAQ section with minimum 8 questions** (per AIO/AEO strategy).

---

## Internal Linking Strategy

### Link Density

- **Minimum 3 internal links** per post
- **Pillar posts** should link to ALL their spoke posts
- **Spoke posts** must link back to their pillar AND at least 1 sibling spoke
- **Every post** should link to the relevant **service-track CTA page** at least once (AI automation services or custom web design services, depending on `serviceTrack`)

### Anchor Text Rules

- Use **descriptive anchor text** with keywords: `[the n8n + MCP integration guide](/blog/2026/05/n8n-mcp-integration-guide)`
- Never use "click here" or "read more"
- Vary anchor text — don't use the exact same phrase every time
- Link to relevant case studies and service pages where natural

### Cross-Cluster Linking

When a topic touches multiple clusters, link across them:

- An **AI agent** post that automates a website workflow → link to **immersive web design** if relevant
- A **growth engineering** post → link to **workflow automation** and to **studio operations**
- A **studio operations** post about pricing → link to **case studies** and to **immersive web design** pillars
- A **foundation models** release post → link to whichever **coding assistant** or **agent** post is downstream affected

This cross-track linking is critical because William Spurlock owns the *intersection* of AI and premium web design — most posts naturally bridge both worlds.

---

## Image SEO

### Alt Text

- Descriptive, keyword-inclusive, 8–15 words
- Format: `"[What it shows] — [keyword context]"`
- Examples:
  - `"Cursor Composer multi-file edit interface — ai coding assistant"`
  - `"GSAP ScrollTrigger timeline diagram — scroll storytelling website"`
  - `"n8n workflow with MCP server node — ai workflow automation"`

### File Naming

- Lowercase, hyphens: `claude-code-skills-architecture.png`
- Include primary keyword in filename
- Avoid generic names: ❌ `image1.jpg` ✅ `n8n-mcp-integration-diagram.png`

### Cover Images

- Every post gets a unique generated cover image (nanobanana 2 style, see [SKILL.md](./SKILL.md))
- Store at: `public/images/blog/[descriptive-name].png`
- Reference in frontmatter: `coverImage: "/images/blog/[name].png"`

---

## Technical SEO Checklist

- [ ] Every post has unique `seoTitle` (under 60 chars)
- [ ] Every post has unique `seoDescription` (150–160 chars)
- [ ] Every post has `seoKeywords` array (5–8 keywords)
- [ ] All images have descriptive alt text
- [ ] All internal links use relative paths and work
- [ ] URL slugs contain primary keyword
- [ ] No duplicate slugs across all posts
- [ ] `date` and `lastModified` fields are accurate
- [ ] `readingTime` is calculated (~200 words/min)
- [ ] `excerpt` is unique and compelling (150–160 chars)

---

## William Spurlock SEO Keyword Master List

### Brand Keywords (Own These)

- william spurlock
- william spurlock ai
- william spurlock n8n
- william spurlock blog
- ai automation expert
- n8n consultant
- ai agent builder
- custom website designer
- immersive web designer
- full-stack web designer
- 5 figure web design
- premium web design studio

---

### AI Automation + Growth Track — Category Keywords

| Category | Primary Keywords |
|----------|------------------|
| AI Coding Assistants | cursor ai, claude code, google antigravity, openai codex, ai pair programming, ai code editor |
| Workflow Automation | n8n, n8n masterclass, n8n vs make, n8n vs zapier, self-hosted n8n, ai workflow automation |
| AI Agents & MCP | mcp, model context protocol, ai agents, multi-agent orchestration, agent skills, ai subagents |
| Foundation Models | claude opus, gpt-5, gemini 3, grok, best llm 2026, ai model comparison, llm release news |
| Growth Engineering | ai seo automation, programmatic seo, lead generation automation, ai sales agent, ai content pipeline |
| AI Security | prompt injection, ai security risks, agent governance, openclaw, ai compliance |

---

### Custom Web Design + Digital Experiences Track — Category Keywords

| Category | Primary Keywords |
|----------|------------------|
| Immersive Web Design | immersive website design, scroll storytelling website, gsap scrolltrigger, three.js website, framer motion, premium web design |
| Full-Stack Architecture | next.js website, astro framework, headless cms 2026, shadcn ui, tailwind design system, vercel vs netlify |
| Brand & UX | brand website design, conversion focused web design, premium landing page, custom web experiences, award-winning website design |
| Performance | core web vitals, lcp optimization, image optimization web, edge functions website |
| Studio Operations | web design pricing, 5 figure website cost, custom website project, design studio business |

---

### Long-Tail Gold (Low Competition, High Intent)

**AI Automation + Growth:**

- "how to wire n8n to claude with mcp"
- "cursor vs claude code 2026"
- "is google antigravity worth it"
- "best mcp servers for developers"
- "self-host n8n on hetzner"
- "claude code subagents tutorial"
- "ai sales agent with vapi and n8n"
- "programmatic seo with n8n and gpt"
- "how to build a self-healing ai workflow"
- "claude opus 4.7 vs gpt-5.5 for coding"

**Custom Web Design + Digital Experiences:**

- "how much does a custom website cost in 2026"
- "best framework for premium web design"
- "gsap scrolltrigger react integration"
- "framer motion vs gsap performance"
- "three.js website examples 2026"
- "next.js vs astro for marketing site"
- "shadcn ui premium website"
- "headless cms for design agencies"
- "how to price a 5 figure web project"
- "discovery call template for web design clients"

---

## Monthly SEO Maintenance

1. **Refresh top-performing posts** — update model versions, prices, benchmarks; bump `lastModified`
2. **Check for broken internal links** across all blog posts
3. **Review search console data** (if connected) for new keyword opportunities
4. **Add new internal links** from older posts to newer content (especially when a new pillar post lands)
5. **Update FAQ sections** with new questions from Google "People Also Ask"
6. **Re-screenshot any UI shots** that show outdated tool versions (Cursor, Claude Code, Antigravity, n8n, Vercel dashboards)
7. **Audit cluster completeness** against [PUBLISHING_CALENDAR.md](./PUBLISHING_CALENDAR.md) (active queue) and [HISTORICAL_BACKFILL_REFERENCE.md](./HISTORICAL_BACKFILL_REFERENCE.md) (backfill candidates) — identify and queue spoke posts for under-served pillars
