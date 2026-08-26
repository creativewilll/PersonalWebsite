## About — `/about`

**AEO 2.5/10 · SEO 5/10**

The Person page for the whole site is 513 words of slogan copy, a doubled-brand 69-character title, BreadcrumbList-only schema, and zero internal links in the body. Social `rel="me"`, `mailto`, and `tel` exist, but the only image is an unoptimized JPEG and the served head is the homepage's. Prerender, a unique description, one H1, and a real 200 are the SEO passes that hold.

### Where the points went

| Dim | Pass | Evidence |
|-----|------|----------|
| A1 | ❌ | H1 is a slogan (`src/pages/AboutPage.tsx:108`); first paragraph is an offer line, not a who-is capsule (`src/pages/AboutPage.tsx:112`) |
| A2 | ⚠️ | One H2 is a question (`src/pages/AboutPage.tsx:134`); H1 and the other H2s are slogans (`src/pages/AboutPage.tsx:108`, `src/pages/AboutPage.tsx:142`, `src/pages/AboutPage.tsx:150`) |
| A3 | ❌ | No FAQ block on the page (`src/pages/AboutPage.tsx:102`) |
| A4 | ❌ | JsonLd is BreadcrumbList only (`src/pages/AboutPage.tsx:11`) |
| A5 | ❌ | No AboutPage or Person schema (`src/pages/AboutPage.tsx:37`) |
| A6 | ❌ | No Person `@id`, no `sameAs` in JSON-LD, no link to `#organization` (`src/pages/AboutPage.tsx:11`); `sameAs` URLs exist only as `rel="me"` anchors (`src/pages/AboutPage.tsx:68`) |
| A7 | ✅ | Names n8n, MCP, Make.com, AIO/AEO/GEO, ChatGPT, Perplexity, Google AI Overviews (`src/pages/AboutPage.tsx:136`, `src/pages/AboutPage.tsx:147`) |
| A8 | ❌ | 500+, 20k+, 35k+, and 500M impressions have no paired date and source (`src/pages/AboutPage.tsx:118`, `src/pages/AboutPage.tsx:155`) |
| A9 | ❌ | No `dateModified`; no visible reviewed date (`src/pages/AboutPage.tsx:11`) |
| A10 | ✅ | `/about` is prerendered (~513 words); text is in the DOM (`src/pages/AboutPage.tsx:30`, `src/App.tsx:264`) |
| S1 | ❌ | Passed title 53 chars becomes 69-char "…Consultant \| Will Spurlock" double brand (`src/pages/AboutPage.tsx:33`, `src/components/seo/MetaTags.tsx:19`) |
| S2 | ✅ | Unique ~156-char description, not the home string (`src/pages/AboutPage.tsx:34`) |
| S3 | ❌ | Canonical absent on `/about` (`src/components/seo/MetaTags.tsx:22`, `src/pages/AboutPage.tsx:32`) |
| S4 | ✅ | Real `/about` route, HTTP 200 is correct (`src/App.tsx:264`) |
| S5 | ✅ | Listed with lastmod (`public/sitemap.xml:10`) |
| S6 | ✅ | Sitemap-driven prerender includes `/about` (`public/sitemap.xml:10`, `src/App.tsx:264`) |
| S7 | ✅ | One H1, then H2, then H3 (`src/pages/AboutPage.tsx:108`, `src/pages/AboutPage.tsx:134`, `src/pages/AboutPage.tsx:160`) |
| S8 | ❌ | Zero internal links in the page body; `Link` is imported and unused (`src/pages/AboutPage.tsx:5`, `src/pages/AboutPage.tsx:102`) |
| S9 | ❌ | Single 139KB JPEG, no width/height/loading (`src/pages/AboutPage.tsx:50`) |
| S10 | ❌ | Hardcoded `index.html` head + Helmet; scrapers take homepage values (`index.html:17`, `src/pages/AboutPage.tsx:32`) |

### 20-25 fixes to reach 9/10

1. **Open with a who-is capsule** — In `src/pages/AboutPage.tsx` set H1 to "Who is Will Spurlock?" and the first two paragraphs to: "Will Spurlock is an AI Visibility engineer and fractional AI CTO who builds custom-coded websites, n8n agents, and automations. He has shipped 500+ automations, recorded 20,000+ hours on agentic systems, and 35,000+ hours saved for clients, with SEO certification since 2021." Flips: A1. Effort: S.
2. **Make remaining H2s questions** — In `src/pages/AboutPage.tsx` change the specialization H2 to "What is Will Spurlock's AIO, AEO, and GEO work?"; the growth H2 to "What websites and growth work has Will Spurlock shipped?"; the CTA heading to "How do I hire Will Spurlock?" Flips: A2. Effort: S.
3. **Add a visible FAQ** — In `src/pages/AboutPage.tsx` after the stats grid, add five Qs: "Who is Will Spurlock?"; "What certifications does Will Spurlock hold?"; "What results has Will Spurlock published?"; "Which industries does Will Spurlock work in?"; "How do I hire Will Spurlock?" Flips: A3. Effort: M.
4. **Emit FAQPage that matches the FAQ** — Extend JsonLd in `src/pages/AboutPage.tsx` with FAQPage `mainEntity` copies of those five questions and answers. Flips: A4. Effort: S.
5. **Add AboutPage as the primary entity** — In `src/pages/AboutPage.tsx` emit `@graph` with AboutPage `@id` `https://williamspurlock.com/about#aboutpage` (`@type` `["AboutPage","ProfilePage"]`, `mainEntity` `#person`, `isPartOf` `#website`) and keep BreadcrumbList. Flips: A5. Effort: M.
6. **Add a Person node with @id and sameAs** — In the same `@graph` in `src/pages/AboutPage.tsx` add Person `@id` `https://williamspurlock.com/#person` (`name` William Spurlock, `alternateName` Will Spurlock, `sameAs` the three `rel="me"` hrefs at lines 68–78, `email`, `telephone` +1-248-824-3309, `worksFor` `#organization`, `knowsAbout` AI Visibility / AEO / AIO / GEO / n8n / MCP). Flips: A6. Effort: M.
7. **Date and source the three stat cards** — In `src/pages/AboutPage.tsx` label "500+ automations · as of August 2026 · operator book of work"; "20,000+ hours · 2022–2026 · self-logged deep work"; "35,000+ hours saved · as of August 2026 · client aggregate"; and put "SEO certified 2021 · SEO certification" on the AIO paragraph. Flips: A8. Effort: S.
8. **Cite the impressions window** — In `src/pages/AboutPage.tsx` replace "over a 5-year span" with "2019–2024 · YouTube, TikTok, Instagram · operator analytics". Flips: A8. Effort: S.
9. **Add dateModified and a reviewed line** — Set `dateModified` on the AboutPage node in `src/pages/AboutPage.tsx` and print "Reviewed August 21, 2026" under the lead. Flips: A9. Effort: S.
10. **Fix the doubled-brand title** — In `src/pages/AboutPage.tsx` pass `title="AI automation, AEO, and SEO consultant"` so MetaTags renders "AI automation, AEO, and SEO consultant | Will Spurlock" (54 chars). Flips: S1. Effort: S.
11. **Depends: G3** — Wire an absolute self-referential canonical for `https://williamspurlock.com/about` through `src/components/seo/MetaTags.tsx` as used by `src/pages/AboutPage.tsx`. Flips: S3. Effort: S.
12. **Depends: G2** — Strip the hardcoded title/description/og/twitter block from `index.html` so this page's Helmet wins. Flips: S10. Effort: S.
13. **Add internal links in the body** — Use the unused `Link` import in `src/pages/AboutPage.tsx`: "AIO vs traditional SEO" → `/blog/what-is-the-difference-between-aio-and-traditional-seo`; "AI Visibility vs traditional SEO" → `/blog/ai-visibility-vs-traditional-seo-what-to-keep-drop-and-add-in-2026`; "building AI agents in n8n" → `/blog/building-ai-agents-in-n8n`; "n8n MCP guide" → `/blog/n8n-mcp-guide`; "answer engine optimization" → `/blog/answer-engine-optimization-how-to-become-the-answer-ai-gives`; "schema and entity SEO" → `/blog/schema-structured-data-and-entity-seo-the-technical-core-of-ai-visibility`; "Spurlock Studios LLC" → `/blog/introducing-spurlock-studios-llc`; "selected websites" → `/websites`; "automation portfolio" → `/projects`; "contact" → `/#contact`. Flips: S8. Effort: M.
14. **Fix the headshot** — In `src/pages/AboutPage.tsx` reuse the hero `<picture>` webp srcset from `src/components/Hero.tsx` and set `width={800}` `height={800}` `loading="eager"` `fetchPriority="high"` `decoding="async"`. Flips: S9. Effort: S.
15. **Render visible breadcrumbs** — In `src/pages/AboutPage.tsx` add Home → About crumbs (`<Link to="/">Home</Link>`, current `/about`) matching the existing BreadcrumbList. Flips: S8. Effort: S.
16. **Expand the Person bio** — Add a ~200-word "What does Will Spurlock actually build?" section in `src/pages/AboutPage.tsx` covering n8n, MCP, React, ChatGPT, and Perplexity, with links to `/projects` and `/websites`. Flips: A1. Effort: M.
17. **Name Spurlock Studios LLC in visible copy** — In the who-is section of `src/pages/AboutPage.tsx` state that he founded Spurlock Studios LLC and link that phrase to `/blog/introducing-spurlock-studios-llc`. Flips: A6. Effort: S.
18. **Link the stat cards to proof routes** — In `src/pages/AboutPage.tsx` wrap "500+ Automations Built" in `<Link to="/projects">` and add a "See selected websites" `<Link to="/websites">` under the growth section. Flips: S8. Effort: S.
19. **Give social icons visible labels** — In `src/pages/AboutPage.tsx` show "LinkedIn", "X", and "Upwork" next to the icons so anchors are descriptive, not icon-only. Flips: S8. Effort: S.
20. **Put address and telephone on Person** — Add PostalAddress (Oakland County, MI) and `telephone` +1-248-824-3309 (already in `src/pages/AboutPage.tsx` `tel:` link) to the Person node in the same JsonLd. Flips: A6. Effort: S.
21. **Depends: G11** — Resolve Will vs William, `twitter:creator` vs `x.com/creativewill02`, and LLC-only-in-JSON-LD so this Person page is the identity source. Flips: A6. Effort: M.
22. **Depends: G12** — Make `src/pages/AboutPage.tsx` emit one `@graph` `@id`-linked to `#organization` and `#person`. Flips: A5, A6. Effort: M.
23. **Add a worksFor Organization stub on Person** — In `src/pages/AboutPage.tsx` Person set `worksFor` `{ "@id": "https://williamspurlock.com/#organization" }` and `jobTitle` "AI Visibility engineer & fractional AI CTO" so it matches the capsule, not only "Founder & Lead Consultant" on the image overlay. Flips: A5. Effort: S.
24. **Point the Book CTA at a crawlable hire path** — In `src/pages/AboutPage.tsx` add a second in-body `<Link to="/#contact">Contact Will Spurlock</Link>` beside the Calendly buttons so hiring is not Calendly-only. Flips: S8. Effort: S.
