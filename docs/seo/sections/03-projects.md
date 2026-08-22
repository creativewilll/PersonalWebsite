## The Automation Library — `/projects`

**AEO 3.5/10 · SEO 4.5/10**

The densest indexable URL in this scope (~2,554 words, prerendered, HTTP 200) still cannot rank the thing it advertises. Four hundred seventy-nine production workflows exist only as `?workflow=` query params behind `<button>` cards and a 30-item "Load more" window, so answer engines can quote the 479 claim and one open FAQ while never fetching a single automation as a URL. Head tags are homepage-contaminated, ItemList is a 25-name stub with no urls, and first paint still races a dynamic import.

### Where the points went

| Dim | Pass | Evidence |
|-----|------|----------|
| A1 | ⚠️ | Capsule exists only after snapshot (`StatsHero.tsx:57-59`); null first paint drops count/date (`StatsHero.tsx:20,79`) |
| A2 | ❌ | H1 is a slogan (`StatsHero.tsx:50-54`); H2s are slogans (`CategoryBand.tsx:37`; `AllProjects.tsx:223`; `LibraryBrowser.tsx:92`; `PatternsSection.tsx:70`) |
| A3 | ✅ | Six question buttons mount in `FaqSection` (`FaqSection.tsx:34-64`) |
| A4 | ❌ | FAQPage emits all 6 answers (`AllProjects.tsx:155-163`); only index 0 stays in the DOM (`FaqSection.tsx:9,66-67`) |
| A5 | ⚠️ | ItemList+Breadcrumb+FAQPage exist (`AllProjects.tsx:126-165`) but 25 name-only items vs `numberOfItems` 479 (`AllProjects.tsx:114-119,151-152`) |
| A6 | ❌ | Page `@graph` has no `@id` and no Person/`sameAs` link to `#organization` (`AllProjects.tsx:126-165`) |
| A7 | ✅ | Open FAQ names n8n, William Spurlock, seven departments (`faqData.ts:8-10`) |
| A8 | ❌ | "479…since Feb 2025" has number+date, no source (`StatsHero.tsx:57-58`); hours/week unsourced (`StatsHero.tsx:21,28-31`) |
| A9 | ⚠️ | First-30 cards emit `<time dateTime>` (`AutomationCard.tsx:65-69`); `generatedAt` never reaches page/schema (`automations.json:2`) |
| A10 | ❌ | Snapshot loads in `useEffect` (`AllProjects.tsx:28,37-39`); `PAGE_SIZE` 30 (`LibraryBrowser.tsx:16,40`); FAQ 2–6 unmounted (`FaqSection.tsx:66-67`); prerender `networkidle`+300ms (`prerender.mjs:220-224`) |
| S1 | ⚠️ | Unique, no `undefined`; 55 chars becomes 71 with suffix (`AllProjects.tsx:176`; `MetaTags.tsx:19`) |
| S2 | ❌ | Snapshot description is 193 chars (`AllProjects.tsx:169-171`) |
| S3 | ❌ | `MetaTags` emits no canonical (`MetaTags.tsx:22-38`); page only passes `url` (`AllProjects.tsx:175-178`) |
| S4 | ✅ | Real `/projects` loc, prerendered, not a soft-404 (`sitemap.xml:16`; `prerender.mjs:3,48`) |
| S5 | ⚠️ | In sitemap (`sitemap.xml:16-19`) but `lastmod` 2026-08-07 is a shared stamp, not `generatedAt` 2026-07-21 (`automations.json:2`) |
| S6 | ✅ | Route is in the sitemap-driven prerender list (`prerender.mjs:3,48`; `sitemap.xml:16`) |
| S7 | ✅ | One H1 (`StatsHero.tsx:50`); H2 then H3 (`AllProjects.tsx:219`; `AutomationCard.tsx:39`) |
| S8 | ❌ | Case studies `onClick`+`navigate` (`ProjectsGrid.tsx:49-51,100`); library cards are `<button>` (`AutomationCard.tsx:23-25`) |
| S9 | ⚠️ | Case-study `<img>` has `alt`, no width/height/loading (`ProjectsGrid.tsx:126-129`) |
| S10 | ❌ | Homepage `index.html` tags plus `MetaTags` (`MetaTags.tsx:22-37`) |

Half-points: A1 — lead is an answer capsule when the snapshot resolves, not on first paint. A5 — primary-entity family is right, ItemList is a stub. A9 — card-level `datetime` exists; page-level freshness does not. S1 — unique and clean, 11 chars over the window. S5 — present, not tied to the catalog file. S9 — alt only.

### 20-25 fixes to reach 9/10

1. **Ship `/automations/:slug` pages from `automations.json`** — add `src/pages/AutomationDetailPage.tsx` and a route in `src/App.tsx`; render `name`, `brief`, `overview`, `built`, `category`, `tags`, `hoursSavedPerWeek`, `integrations`, `related` from `src/data/automationsData/automations.json` (479 slugs; query params are not URLs). Flips: A5, A10, S8. Effort: L.
2. **Turn library cards into real links** — replace the `<button onClick>` in `src/components/AutomationLibrary/AutomationCard.tsx` with `<Link to={/automations/${automation.slug}}>`. Flips: S8. Effort: S.
3. **Keep all six FAQ answers in the DOM** — stop unmounting panels in `src/components/AutomationLibrary/FaqSection.tsx` (`AnimatePresence` / `isOpen &&`); hide with CSS. Flips: A4, A10. Effort: S.
4. **Put absolute `url` on every ItemList entry** — `jsonLdGraph` in `src/pages/AllProjects.tsx` must emit `https://williamspurlock.com/automations/{slug}` (not name+position only). Flips: A5. Effort: S.
5. **Add a CollectionPage `@id` linked to `#organization`** — extend the `@graph` in `src/pages/AllProjects.tsx` with CollectionPage + a Person node that has `sameAs`. Flips: A5, A6. Effort: M.
6. **Depends: G12** — fold this page graph into the single route `@graph` in `src/pages/AllProjects.tsx` / `src/components/seo/JsonLd.tsx`. Flips: A6. Effort: M.
7. **Wrap case-study cards in `<Link>`** — delete `handleCardClick` / `navigate` in `src/components/Projects/ProjectsGrid.tsx`; use `<Link to={/projects/${project.slug}}>`. Flips: S8. Effort: S.
8. **Depends: G3** — emit a self-referential canonical for `/projects` via `src/components/seo/MetaTags.tsx` (page already passes `url` in `src/pages/AllProjects.tsx:178`). Flips: S3. Effort: S.
9. **Depends: G2** — strip the hardcoded homepage head block so scrapers read this page's tags from `src/components/seo/MetaTags.tsx`. Flips: S10. Effort: S.
10. **Shorten the title so the suffix stays ≤60** — cut `title` in `src/pages/AllProjects.tsx` to ~44 chars (today 55 → 71 with `MetaTags.tsx:19`). Flips: S1. Effort: S.
11. **Rewrite the description to 140–160 chars** — replace the 193-char string in `src/pages/AllProjects.tsx:169-171`. Flips: S2. Effort: S.
12. **Eager-import the snapshot** — static-import `automations.json` in `src/data/automationsData/index.ts`; drop `useState(null)` / `useEffect` loading in `src/pages/AllProjects.tsx`. Flips: A1, A9, A10. Effort: M.
13. **Rewrite H1/H2s as questions** — `src/components/AutomationLibrary/StatsHero.tsx`, `CategoryBand.tsx`, `LibraryBrowser.tsx`, `PatternsSection.tsx` (drop slogan heads). Flips: A2. Effort: M.
14. **Cite date and source on the 479 claim** — `src/components/AutomationLibrary/StatsHero.tsx` must name `src/data/automationsData/automations.json` and `generatedAt` `2026-07-21`. Flips: A8. Effort: S.
15. **Emit `dateModified` from `generatedAt`** — CollectionPage/`<time>` in `src/pages/AllProjects.tsx` + `src/components/AutomationLibrary/StatsHero.tsx`. Flips: A9. Effort: S.
16. **Set `/projects` lastmod to the catalog stamp** — `public/sitemap.xml` `lastmod` → `2026-07-21` from `automations.json`. Flips: S5. Effort: S.
17. **Add width, height, and `loading` on case-study images** — `src/components/Projects/ProjectsGrid.tsx` `<motion.img>`. Flips: S9. Effort: S.
18. **Serve case-study covers as WebP/AVIF** — replace JPEG/PNG under `public/projects/` and point `src` in `src/components/Projects/ProjectsGrid.tsx`. Flips: S9. Effort: M.
19. **Do not hide 449 catalog rows behind "Load more"** — raise or drop `PAGE_SIZE` in `src/components/AutomationLibrary/LibraryBrowser.tsx` so prerender HTML contains `<a>` for all 479. Flips: A10, S8. Effort: M.
20. **Hard-code the lead capsule for the empty snapshot** — `src/components/AutomationLibrary/StatsHero.tsx` always print 479 / Feb 2025, never the count-less fallback. Flips: A1. Effort: S.
21. **Make `numberOfItems` match emitted ListItems** — `src/pages/AllProjects.tsx` either emit 479 urls or stop claiming 479 items in schema. Flips: A5. Effort: S.
22. **Depends: G16** — prerender must wait for Helmet and the snapshot, not `networkidle`+300ms in `scripts/prerender.mjs`. Flips: A10. Effort: M.
23. **Sitemap the 479 automation URLs** — append `/automations/{slug}` locs to `public/sitemap.xml` from `src/data/automationsData/automations.json`. Flips: S5, S8. Effort: M.
