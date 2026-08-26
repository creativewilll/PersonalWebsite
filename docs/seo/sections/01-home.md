## Home — `/`

**AEO 2/10 · SEO 6/10**

The homepage is a long sales scroll with a slogan H1, a definition parked in lazy section 2, and no FAQ or Person graph, so answer engines get word count without a capsule. Chrome and blog previews use real links; featured website and project cards do not. Prerender, a 52-character title, one H1, and a real 200 are the only clean SEO wins.

### Where the points went

| Dim | Pass | Evidence |
|-----|------|----------|
| A1 | ❌ | Definition lives in lazy section 2 (`src/components/AIVisibilitySections.tsx:187`), not the hero lead (`src/components/Hero.tsx:112`) |
| A2 | ❌ | H1 is a slogan (`src/components/Hero.tsx:82`); remaining H2s are slogans except `WhoThisIsFor` (`src/components/AIVisibilitySections.tsx:741`) and three buried Qs (`src/components/About.tsx:102`) |
| A3 | ❌ | No FAQ block; About Qs are standalone h2s (`src/components/About.tsx:99`) |
| A4 | ❌ | Home `@graph` is WebSite + four Service stubs, no FAQPage (`src/App.tsx:167`) |
| A5 | ❌ | Service nodes are name + `provider` only; WebSite SearchAction targets missing `/search` (`src/App.tsx:175`) |
| A6 | ❌ | Global founder Person has no `@id`; `sameAs` sits on ProfessionalService (`src/App.tsx:93`); WebSite is not linked to `#organization` (`src/App.tsx:170`) |
| A7 | ✅ | Named ChatGPT, Perplexity, Claude, Gemini, AIO/AEO/GEO, n8n (`src/components/AIVisibilitySections.tsx:187`, `src/components/Projects/index.tsx:207`) |
| A8 | ❌ | 1B+ queries/week, 40% MoM, $500M raise, 500+, 35,000+ have no date and no source (`src/components/AIVisibilitySections.tsx:100`, `src/components/Projects/index.tsx:23`) |
| A9 | ❌ | No `dateModified` on WebSite/WebPage; footer year only (`src/App.tsx:167`, `src/components/Footer.tsx:85`) |
| A10 | ✅ | `/` is prerendered (~3,676 words); counters paint finals (`src/App.tsx:158`, `src/components/seo/CrawlerSafeCounter.tsx:14`) |
| S1 | ✅ | Helmet title is 52 chars, unique, no doubled brand (`src/App.tsx:163`, `src/components/seo/MetaTags.tsx:19`) |
| S2 | ❌ | 193-char description is byte-identical to `index.html` and `organizationSchema.description` (`src/App.tsx:164`, `index.html:18`) |
| S3 | ❌ | Canonical absent on `/` (`src/components/seo/MetaTags.tsx:22`) |
| S4 | ✅ | Real `/` route, HTTP 200 is correct (`src/App.tsx:158`) |
| S5 | ✅ | Listed with lastmod (`public/sitemap.xml:4`) |
| S6 | ✅ | Sitemap-driven prerender includes `/` (`public/sitemap.xml:4`, `src/App.tsx:158`) |
| S7 | ✅ | Single H1 then H2/H3 (`src/components/Hero.tsx:82`, `src/components/ui/Section.tsx:25`) |
| S8 | ⚠️ | Header/Footer/BlogPreview use `<Link>`/`<a>`; showcase + project cards are `onClick` + `navigate` (`src/components/Showcase/ShowcaseCard.tsx:52`, `src/components/Projects/ProjectsGrid.tsx:100`) |
| S9 | ⚠️ | Hero has webp, dims, eager (`src/components/Hero.tsx:145`); blog/project/showcase imgs omit width/height (`src/components/Blog/BlogPreview.tsx:86`, `src/components/Projects/ProjectsGrid.tsx:126`) |
| S10 | ❌ | Hardcoded `index.html` head + Helmet = two description/og/twitter sets; scrapers take the first (`index.html:17`, `src/components/seo/MetaTags.tsx:23`) |

### 20-25 fixes to reach 9/10

1. **Write the AI Visibility capsule in the hero** — Replace the hypothetical opener in `src/components/Hero.tsx` with two sentences: "AI Visibility is the practice of engineering a site so ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews can discover, understand, and cite the brand. Will Spurlock builds custom-coded React sites and AI agents that make that citation possible." Flips: A1. Effort: S.
2. **Turn the H1 into a question** — Change the H1 in `src/components/Hero.tsx` from "AI Visibility & Brand Design Expert" to "What is AI Visibility, and who builds it for brands?" Flips: A2. Effort: S.
3. **Rewrite homepage H2s as questions** — Set Extinction / WhatIs / Pillars / BrandFirst / VsSEO / Window / Results in `src/components/AIVisibilitySections.tsx` to "What happens if AI search replaces Google blue links?"; "What is AI Visibility?"; "What are AIO, AEO, and GEO?"; "Why do custom-coded sites beat templates in AI search?"; "How does AI Visibility differ from traditional SEO?"; "How long does the first-mover window last?"; "What AI Visibility results has Will Spurlock published?". Set `src/components/HomeFeaturedWebsites.tsx` to "Which websites has Will Spurlock designed?"; `src/components/Projects/index.tsx` to "Which AI automations has Will Spurlock shipped?"; `src/components/Blog/BlogPreview.tsx` to "What has Will Spurlock written about AI Visibility?"; `src/components/About.tsx` Section title to "Who is Will Spurlock?"; `src/components/Contact.tsx` to "How do I contact Will Spurlock?". Leave `WhoThisIsFor` as-is. Flips: A2. Effort: M.
4. **Add a visible FAQ block** — Create `src/components/HomeFaq.tsx` and mount it in `src/App.tsx` after `WhoThisIsFor` with five Qs: "What is AI Visibility?"; "How is AI Visibility different from traditional SEO?"; "What are AIO, AEO, and GEO?"; "Who should hire Will Spurlock for AI Visibility?"; "How do ChatGPT, Perplexity, and Google AI Overviews find a brand?" Answers come from `WhatIsAIVisibility`, `AIVisibilityVsSEO`, and `src/components/About.tsx`. Flips: A3. Effort: M.
5. **Emit FAQPage that matches the FAQ** — Add a FAQPage node to the home `@graph` in `src/App.tsx` whose `mainEntity` questions and accepted answers are byte-matching `src/components/HomeFaq.tsx`. Flips: A4. Effort: S.
6. **Replace stub Services with a real WebPage graph** — In `src/App.tsx` home JsonLd add WebPage `@id` `https://williamspurlock.com/#webpage` (`isPartOf` `#website`, `about` `#organization`, `description`, `dateModified`); give each Service a `description` from `src/data/offerings.ts`, plus `url` and `areaServed`; delete `potentialAction` SearchAction. Flips: A5. Effort: M.
7. **Add a Person node with @id and sameAs** — In the home `@graph` in `src/App.tsx` add Person `@id` `https://williamspurlock.com/#person` (`name` William Spurlock, `alternateName` Will Spurlock, `jobTitle`, `email`, `sameAs` LinkedIn + `https://x.com/creativewill02` + Upwork, `worksFor` `#organization`) and set WebSite `publisher` plus WebPage `author` to `#person`. Flips: A6. Effort: M.
8. **Date and source the market stats** — In `src/components/AIVisibilitySections.tsx` attach a named publisher + month/year to ChatGPT 1B+ queries/week, Perplexity 40% MoM, and the $500M raise (Extinction + Window copy). Flips: A8. Effort: M.
9. **Date and source the receipts bar** — Under the counters in `src/components/Projects/index.tsx` and `AIVisibilityResults` in `src/components/AIVisibilitySections.tsx`, print "as of August 2026 · operator book of work" on 500+ automations, 35,000+ hours saved, 500M+ impressions, and 25+ brands. Flips: A8. Effort: S.
10. **Add machine-readable and visible freshness** — Set `dateModified` on the WebPage node in `src/App.tsx` and a visible "Reviewed August 21, 2026" line under the hero lead in `src/components/Hero.tsx`. Flips: A9. Effort: S.
11. **Write a unique 140–160 character description** — In `src/App.tsx` home MetaTags replace the 193-character duplicate with: "Will Spurlock builds custom-coded websites for ChatGPT, Perplexity, and Google AI Overviews, plus n8n agents and automations that help brands get cited." (152 chars; must not match `organizationSchema.description` or `index.html`). Flips: S2. Effort: S.
12. **Depends: G3** — Wire an absolute self-referential canonical for `https://williamspurlock.com/` through `src/components/seo/MetaTags.tsx` as used by `src/App.tsx`. Flips: S3. Effort: S.
13. **Depends: G2** — Strip the hardcoded title/description/og/twitter block from `index.html` so Helmet in `src/App.tsx` is the only head. Flips: S10. Effort: S.
14. **Wrap showcase cards in real links** — In `src/components/Showcase/ShowcaseCard.tsx` replace `onClick` + `role="link"` with `<Link to={/websites/${site.slug}}>` (anchor = site name); keep the live-URL `<a>` with `stopPropagation`. Flips: S8. Effort: M.
15. **Wrap project cards in real links** — In `src/components/Projects/ProjectsGrid.tsx` replace `navigate()` with `<Link to={/projects/${project.slug}}>` using the project title as the accessible name. Flips: S8. Effort: M.
16. **Add image dimensions on blog covers** — In `src/components/Blog/BlogPreview.tsx` set `width`, `height`, and `loading="lazy"` on every cover `<img>` (first card may stay in-flow after the eager hero). Flips: S9. Effort: S.
17. **Add image dimensions on showcase thumbs** — In `src/components/Showcase/ShowcaseCard.tsx` add `width={800}` `height={500}` on the thumbnail `<img>`. Flips: S9. Effort: S.
18. **Add image dimensions on project thumbs** — In `src/components/Projects/ProjectsGrid.tsx` add `width`, `height`, `loading="lazy"`, and `decoding="async"` on `motion.img`. Flips: S9. Effort: S.
19. **Make the contact email a mailto link** — In `src/components/Contact.tsx` wrap `william@spurlockstudios.com` in `<a href="mailto:william@spurlockstudios.com">Email Will Spurlock</a>`. Flips: S8. Effort: S.
20. **Point the header mark at home** — In `src/components/Header.tsx` change the WS `href="#"` to `<Link to="/">` with accessible name "Will Spurlock home". Flips: S8. Effort: S.
21. **Collapse About Qs into the FAQ** — After `src/components/HomeFaq.tsx` ships, remove the three standalone h2 questions from `src/components/About.tsx` so one FAQ is the answer block. Flips: A3. Effort: S.
22. **Attach an Offer to each home Service** — In `src/App.tsx` home `@graph`, give every Service an `offers` node (`url` `https://spurlockstudios.com/visibility`, `name` "$500 AI Visibility Audit") matching the hero CTA in `src/components/Hero.tsx`. Flips: A5. Effort: S.
23. **Depends: G11** — Put `telephone` and a PostalAddress (Oakland County, MI — already visible in `src/components/Contact.tsx`) on the home Person in `src/App.tsx`, and use William Spurlock as `name` with Will as `alternateName`. Flips: A6. Effort: S.
24. **Depends: G12** — Make the home `@graph` in `src/App.tsx` the per-route graph that `@id`-links `#webpage` / `#website` / `#person` to `#organization`. Flips: A5, A6. Effort: M.
25. **Link the FAQ answers to existing posts** — Inside `src/components/HomeFaq.tsx` add `<Link>` anchors "AIO vs traditional SEO" → `/blog/what-is-the-difference-between-aio-and-traditional-seo`, "AI Visibility vs traditional SEO" → `/blog/ai-visibility-vs-traditional-seo-what-to-keep-drop-and-add-in-2026`, and "FAQ schema for AEO" → `/blog/faq-schema-and-aeo-the-highest-leverage-move-for-ai-citation`. Flips: S8. Effort: S.
