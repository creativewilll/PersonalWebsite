## Websites portfolio index — `/websites`

**AEO 4.0/10 · SEO 5.5/10**

This is the only website surface crawlers actually receive: it is in the sitemap, it is prerendered, and the live HTML has ~4,642 words. They still inherit the homepage `<head>`, get no canonical, cannot follow 24 of 25 case studies from the grid, and read a CollectionPage whose ItemList stops at 10. A visible FAQ and named clients keep it from collapsing; missing FAQPage, undated stats, and slogan headings cap the answer score at 4.

### Where the points went

| Dim | Pass | Evidence |
|-----|------|----------|
| A1 | ❌ | Hero opens with a slogan pair, not an answer, at `src/components/Showcase/ShowcaseHero.tsx:114` |
| A2 | ⚠️ | H1/H2s are slogans (`ShowcaseHero.tsx:114`, `WebsitesPage.tsx:111`); only FAQ H3s are questions (`WebsitesPage.tsx:251`) |
| A3 | ✅ | Visible 3-question FAQ block at `src/pages/WebsitesPage.tsx:242` |
| A4 | ❌ | FAQ at `WebsitesPage.tsx:249` has no matching FAQPage node in `WebsitesPage.tsx:38` |
| A5 | ⚠️ | Raw Helmet array emits CollectionPage + BreadcrumbList (`WebsitesPage.tsx:38`) but ItemList is `slice(0, 10)` (`WebsitesPage.tsx:53`) |
| A6 | ❌ | CollectionPage author Person has no `@id` or sameAs (`WebsitesPage.tsx:45`); not linked to `#organization` |
| A7 | ✅ | Grid/carousel name real clients from `src/data/showcaseData/showcase-sites.ts:55` via `ShowcaseCard.tsx:161` |
| A8 | ❌ | StatsStrip claims 25/4/3+/100% with no date or source (`src/components/Showcase/StatsStrip.tsx:6`) |
| A9 | ❌ | CollectionPage has no dateModified (`WebsitesPage.tsx:38`); `uploadDate` is sort-only (`WebsitesPage.tsx:29`) |
| A10 | ✅ | Route is prerendered from `public/sitemap.xml:28`; copy stays in the DOM at `WebsitesPage.tsx:98` |
| S1 | ⚠️ | Title "Websites — Premium Web Design" is unique and clean but 45 chars with suffix (`WebsitesPage.tsx:90`, `MetaTags.tsx:19`) |
| S2 | ✅ | Unique 143-char description naming 25 sites and $10K quality (`WebsitesPage.tsx:91`) |
| S3 | ❌ | MetaTags emits no canonical (`src/components/seo/MetaTags.tsx:22`) |
| S4 | ✅ | `/websites` is a real prerendered document, not a soft-404 (`public/sitemap.xml:28`, `scripts/prerender.mjs:3`) |
| S5 | ✅ | Listed at `public/sitemap.xml:28` with lastmod `2026-08-07` |
| S6 | ✅ | Prerender reads this loc from the sitemap (`scripts/prerender.mjs:3`, `public/sitemap.xml:28`) |
| S7 | ✅ | Single H1 then H2/H3 (`ShowcaseHero.tsx:114`, `WebsitesPage.tsx:111`, `WebsitesPage.tsx:136`) |
| S8 | ❌ | Grid cards `onClick`+`navigate` with `role="link"` (`ShowcaseCard.tsx:52`); only the active hero "View Project" is a `<Link>` (`ShowcaseHero.tsx:209`) |
| S9 | ❌ | PNG screenshots have alt but no width/height (`ShowcaseHero.tsx:178`, `ShowcaseCard.tsx:106`) |
| S10 | ❌ | Hardcoded homepage title/description/og/twitter in `index.html:17` ship beside MetaTags (`WebsitesPage.tsx:89`) |

### 20-25 fixes to reach 9/10

1. **Rewrite the hero as an answer capsule** — Replace the slogan pair at `src/components/Showcase/ShowcaseHero.tsx:114-119` with two sentences that answer who builds what, for whom, and how many (25 sites across music, trades, cannabis). Flips: A1. Effort: S.
2. **Turn the H1 into a question** — Change "Websites I've Built" at `src/components/Showcase/ShowcaseHero.tsx:114` to a question-shaped H1 (e.g. "What websites has Will Spurlock built?"). Flips: A2. Effort: S.
3. **Turn the framework headings into questions** — Rewrite the H2 at `src/pages/WebsitesPage.tsx:111` and the three H3s at `src/pages/WebsitesPage.tsx:136`, `157`, `178` as how/what questions; leave the FAQ H3s as they are. Flips: A2. Effort: S.
4. **Emit FAQPage that matches the visible FAQ** — Add a FAQPage node to the page graph in `src/pages/WebsitesPage.tsx:38` whose three Question/acceptedAnswer pairs copy `src/pages/WebsitesPage.tsx:251-268` verbatim. Flips: A4. Effort: S.
5. **Switch the raw Helmet array to one JsonLd @graph** — Replace `src/pages/WebsitesPage.tsx:94-96` with `JsonLd` from `src/components/seo/JsonLd.tsx`, one `@graph` holding CollectionPage, BreadcrumbList, and FAQPage. Flips: A5. Effort: S.
6. **Expand ItemList to all 25 sites** — Change `allSites.slice(0, 10)` at `src/pages/WebsitesPage.tsx:53` to the full `getAllSites()` array from `src/data/showcaseData/ShowcaseManager.ts:10`. Flips: A5. Effort: S.
7. **Type each list item as a CreativeWork about the named client** — Expand the ListItem shape at `src/pages/WebsitesPage.tsx:53-59` so `item` is a CreativeWork whose `about` is the artist/brand `name` from `src/data/showcaseData/showcase-sites.ts`. Flips: A5. Effort: M.
8. **Render a visible Home → Websites breadcrumb** — Add a trail above `src/components/Showcase/ShowcaseHero.tsx:108` that matches the BreadcrumbList at `src/pages/WebsitesPage.tsx:62-79` (no breadcrumb UI exists today). Flips: A5. Effort: S.
9. **@id-link CollectionPage to #organization and a Person with sameAs** — Give CollectionPage and its author Person `@id`s in `src/pages/WebsitesPage.tsx:38-49` pointing at `https://williamspurlock.com/#organization` and a Person `@id` that reuses the sameAs list from `src/App.tsx:105`. Flips: A6. Effort: S.
10. **Date and source every StatsStrip claim** — Add an `asOf` date and a source line next to each row in `src/components/Showcase/StatsStrip.tsx:6-11` (count the 25 rows in `src/data/showcaseData/showcase-sites.ts:55`; do not leave 100% unsourced). Flips: A8. Effort: S.
11. **Put a real dollar figure in the cost FAQ** — Replace the figure-free answer at `src/pages/WebsitesPage.tsx:258-261` with the $10K / $20K range already claimed on this page, plus an as-of date. Flips: A8. Effort: S.
12. **Set CollectionPage dateModified from the newest uploadDate** — Compute `dateModified` in `src/pages/WebsitesPage.tsx:38` from `uploadDate` on `src/data/showcaseData/showcase-sites.ts:11` via `ShowcaseManager.ts`. Flips: A9. Effort: S.
13. **Show freshness in the hero and on each card** — Render a visible "Updated {date}" beside `src/components/Showcase/ShowcaseHero.tsx:117` and a `<time dateTime={site.uploadDate}>` in `src/components/Showcase/ShowcaseCard.tsx:159`. Flips: A9. Effort: S.
14. **Lengthen the title to ~50-60 characters** — Change `src/pages/WebsitesPage.tsx:90` so the MetaTags suffix at `src/components/seo/MetaTags.tsx:19` yields one unique title near 55 chars with no doubled brand. Flips: S1. Effort: S.
15. **Turn every grid card into a real `<Link>`** — Replace `navigate()` / `role="link"` in `src/components/Showcase/ShowcaseCard.tsx:20-58` with `<Link to={`/websites/${site.slug}`}>` and keep the site name as the accessible name. Flips: S8. Effort: M.
16. **Make every carousel slide a crawlable case-study link** — Wrap each card at `src/components/Showcase/ShowcaseHero.tsx:139` in `<Link to={`/websites/${s.slug}`}>`, not only the active "View Project" at `src/components/Showcase/ShowcaseHero.tsx:209`. Flips: S8. Effort: S.
17. **Add width/height and serve WebP for hero screenshots** — Set intrinsic width/height on `src/components/Showcase/ShowcaseHero.tsx:178` and convert `public/work/{slug}/home.png` to WebP. Flips: S9. Effort: L.
18. **Add width/height and serve WebP for grid screenshots** — Same treatment on `src/components/Showcase/ShowcaseCard.tsx:106`; drop the hover iframe at `src/components/Showcase/ShowcaseCard.tsx:76` so the static image is the only preview. Flips: S9. Effort: M.
19. **Depends: G1** — Enumerate all 25 `/websites/:slug` URLs so the ItemList hrefs at `src/pages/WebsitesPage.tsx:57` and the new card `<Link>`s resolve to prerendered HTML. Flips: A5, S8. Effort: M.
20. **Depends: G2** — Strip the hardcoded homepage head block at `index.html:17-32` so scrapers read this page's MetaTags at `src/pages/WebsitesPage.tsx:89`. Flips: S10. Effort: S.
21. **Depends: G3** — Add a self-referential canonical to `src/components/seo/MetaTags.tsx` so `/websites` emits `https://williamspurlock.com/websites`. Flips: S3. Effort: S.
22. **Depends: G6** — Pass a 1200×630 portfolio card into `src/pages/WebsitesPage.tsx:89` instead of the 1522×1874 portrait default at `src/components/seo/MetaTags.tsx:15`. Flips: S10. Effort: M.
23. **Depends: G12** — Build this route's graph to the shared `#organization` / Person-with-sameAs contract used by `src/components/seo/JsonLd.tsx` and `src/App.tsx:84`. Flips: A6. Effort: M.
