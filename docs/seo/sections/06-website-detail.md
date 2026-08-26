## Website case study — `/websites/:slug`

**AEO 1.0/10 · SEO 0/10**

None of the 25 case-study URLs are in the sitemap, so none are prerendered, so every slug — including `/websites/arkayla/` — returns HTTP 200 with homepage HTML and the homepage title. Until that is fixed, S4, S5, S6, and A10 are zeros no matter how complete `ShowcaseDetail.tsx` looks. The template itself is still the thinnest on the site: no page JSON-LD, h1 jumping to h3, a live third-party iframe, and 200–350 words of unsourced blurbs.

### Where the points went

| Dim | Pass | Evidence |
|-----|------|----------|
| A1 | ❌ | Opens with a slogan tagline plus a pitch, not an answer capsule (`ShowcaseDetail.tsx:163`, `showcase-sites.ts:61`) |
| A2 | ❌ | Headings are labels ("The Challenge", "Quick Facts"), not questions (`ShowcaseDetail.tsx:118`, `ShowcaseDetail.tsx:179`) |
| A3 | ❌ | No FAQ block on `src/pages/WebsiteDetailPage.tsx` or `src/components/Showcase/ShowcaseDetail.tsx` |
| A4 | ❌ | No FAQPage anywhere; Helmet at `ShowcaseDetail.tsx:22` emits no JSON-LD |
| A5 | ❌ | No page-level CreativeWork/WebSite/BreadcrumbList; `WebsiteDetailPage.tsx` has no JsonLd |
| A6 | ❌ | No `@id` graph; global ProfessionalService at `src/App.tsx:143` is the only schema on the served shell |
| A7 | ✅ | Template names the client, industry, year, and stack (`ShowcaseDetail.tsx:162`, `showcase-sites.ts:3`) |
| A8 | ❌ | `result` strings are adjectives with no date or source (`showcase-sites.ts:78`, `showcase-sites.ts:104`) |
| A9 | ❌ | `uploadDate` exists (`showcase-sites.ts:11`) but is never rendered; no dateModified |
| A10 | ❌ | Slugs absent from `public/sitemap.xml`; live HTML is the homepage shell (`scripts/prerender.mjs:3`) |
| S1 | ❌ | Crawlers get `index.html:17`; template title `{name} — Website by Will Spurlock` at `ShowcaseDetail.tsx:23` is never served |
| S2 | ❌ | Crawlers get `index.html:18`; `site.description` at `ShowcaseDetail.tsx:24` is unseen and often under 140 chars |
| S3 | ❌ | Canonical at `ShowcaseDetail.tsx:33` never reaches the document scrapers fetch |
| S4 | ❌ | HTTP 200 with homepage HTML — a soft-404 for every slug (`src/App.tsx:256`, SPA fallback) |
| S5 | ❌ | Zero of 25 slugs in `public/sitemap.xml` (only `/websites` at line 28) |
| S6 | ❌ | Prerender enumerates sitemap locs only (`scripts/prerender.mjs:3`); these URLs are omitted |
| S7 | ❌ | H1 then H3, no H2 (`ShowcaseDetail.tsx:160`, `ShowcaseDetail.tsx:179`); related cards use H4 (`ShowcaseDetail.tsx:296`) |
| S8 | ❌ | Served homepage has none of this template's `<Link>`s (`ShowcaseDetail.tsx:39`, `ShowcaseDetail.tsx:271`) |
| S9 | ❌ | Gallery PNGs have generic alt, no width/height (`ShowcaseDetail.tsx:210`); lightbox alt is "Expanded view" (`ShowcaseDetail.tsx:243`) |
| S10 | ❌ | Served head is the homepage pair in `index.html:17-32`; if JS hydrates, Helmet at `ShowcaseDetail.tsx:22` doubles it |

### 20-25 fixes to reach 9/10

1. **Emit MetaTags and JsonLd from the page, not a nested Helmet** — Add `MetaTags` + `JsonLd` in `src/pages/WebsiteDetailPage.tsx` and delete the ad-hoc `<Helmet>` at `src/components/Showcase/ShowcaseDetail.tsx:22` so title, description, and schema are owned by the route. Flips: S1, S2, A5. Effort: M.
2. **Add CreativeWork (or WebSite) schema per case study with the client as a named entity** — Build a `@graph` in `src/pages/WebsiteDetailPage.tsx` whose primary node is a CreativeWork `@id` `https://williamspurlock.com/websites/{slug}#work`, `about` a MusicGroup or Organization named from `site.name` / `site.liveUrl` in `src/data/showcaseData/showcase-sites.ts`, `creator` the Person `@id`, `isPartOf` `#organization`. Flips: A5, A6. Effort: M.
3. **Add BreadcrumbList Home → Websites → {name} and a matching visible trail** — Emit the list next to the CreativeWork in `src/pages/WebsiteDetailPage.tsx` and render the same trail above `src/components/Showcase/ShowcaseDetail.tsx:38` (no breadcrumb UI exists). Flips: A5. Effort: S.
4. **@id-link the work to #organization and a Person with sameAs** — Point `creator` / `author` at a Person `@id` that reuses the sameAs list from `src/App.tsx:105`, and `provider` / `isPartOf` at `https://williamspurlock.com/#organization`. Flips: A6. Effort: S.
5. **Add a visible 3-question FAQ and matching FAQPage** — Insert a FAQ in `src/components/Showcase/ShowcaseDetail.tsx` (who the site is for, what shipped, what it cost/earned) and mirror those exact Q/A pairs in the page `@graph` in `src/pages/WebsiteDetailPage.tsx`. Flips: A3, A4. Effort: M.
6. **Rewrite headings as questions** — Change the H1 pattern at `src/components/Showcase/ShowcaseDetail.tsx:160` and the challenge/approach/result titles at `src/components/Showcase/ShowcaseDetail.tsx:170` to question-shaped copy ("What problem did {name} have?"). Flips: A2. Effort: S.
7. **Put an answer capsule in the first two paragraphs** — Rewrite `description` + `tagline` for all 25 rows in `src/data/showcaseData/showcase-sites.ts` so the block at `src/components/Showcase/ShowcaseDetail.tsx:163-165` answers what was built, for whom, and what changed — before "The Challenge". Flips: A1. Effort: L.
8. **Insert an H2 layer and drop the H1→H3 skip** — Promote Challenge / Approach / Result / Page Showcase / Related to H2 in `src/components/Showcase/ShowcaseDetail.tsx:179`, `189`, `268`; keep sidebar labels as H3; change related card titles from H4 (`ShowcaseDetail.tsx:296`) to H3. Flips: S7. Effort: S.
9. **Replace the live iframe with a static screenshot plus a link** — Delete the always-on iframe at `src/components/Showcase/ShowcaseDetail.tsx:77` and the hover iframe at `src/components/Showcase/ShowcaseCard.tsx:78`; show `site.thumbnail` with width/height and a single `<a href={site.liveUrl}>` "Visit live site". Flips: S9, A10. Effort: M.
10. **Add real outcome metrics to challenge / approach / result** — Extend `ShowcaseSite` in `src/data/showcaseData/showcase-sites.ts:3` with dated, sourced numbers (leads, streams, launch date) and render them in the Result block at `src/components/Showcase/ShowcaseDetail.tsx:170`; stop shipping adjective-only `result` strings like `showcase-sites.ts:78`. Flips: A8. Effort: L.
11. **Expose uploadDate as machine-readable freshness** — Render `<time dateTime={site.uploadDate}>` in Quick Facts at `src/components/Showcase/ShowcaseDetail.tsx:121` and set CreativeWork `dateCreated` / `dateModified` from `year` and `uploadDate` in `src/data/showcaseData/showcase-sites.ts`. Flips: A9. Effort: S.
12. **Force unique titles onto the ~50-60 band via MetaTags** — Drive title from `src/pages/WebsiteDetailPage.tsx` through `src/components/seo/MetaTags.tsx:19` (one " \| Will Spurlock" suffix) instead of the unsuffixed pattern at `src/components/Showcase/ShowcaseDetail.tsx:23`. Flips: S1. Effort: S.
13. **Normalize every description to ~140-160 unique characters** — Audit `description` on all 25 objects in `src/data/showcaseData/showcase-sites.ts` (several sit under 140, e.g. Matt Coffey at `showcase-sites.ts:629`) and pass the string into MetaTags from `src/pages/WebsiteDetailPage.tsx`. Flips: S2. Effort: M.
14. **Fix invalid DOM nesting** — Remove the nested `<main>` at `src/components/Showcase/ShowcaseDetail.tsx:158` and the `<aside>` inside `<article>` at `src/components/Showcase/ShowcaseDetail.tsx:21` / `116`; wrap `src/pages/WebsiteDetailPage.tsx:32` in a single `<main>`. Flips: S7. Effort: S.
15. **Give gallery images real alt, width/height, and WebP** — Replace `{name} — page {n}` at `src/components/Showcase/ShowcaseDetail.tsx:212` with page-specific alt, add width/height, convert `site.media` PNGs under `public/work/{slug}/`, and change the lightbox alt at `src/components/Showcase/ShowcaseDetail.tsx:243` from "Expanded view". Flips: S9. Effort: L.
16. **Stop the invalid-slug pulse-then-redirect** — Replace the Helmet-less skeleton at `src/pages/WebsiteDetailPage.tsx:21-29` and the `navigate('/websites')` at `src/pages/WebsiteDetailPage.tsx:17` with a noindex 404 document that names the missing slug. Flips: S4. Effort: M.
17. **Thicken body copy past the 200-350-word floor** — Expand `challenge` / `approach` / `result` / `features` in `src/data/showcaseData/showcase-sites.ts` so `src/components/Showcase/ShowcaseDetail.tsx:165-184` ships extractable case-study prose, not three one-liners. Flips: A1, A10. Effort: L.
18. **Keep related work as crawlable `<a href>` with descriptive anchors** — Keep `<Link to={/websites/${related.slug}}>` at `src/components/Showcase/ShowcaseDetail.tsx:271` and set the accessible name to `{related.name} website case study`, not the card chrome alone. Flips: S8. Effort: S.
19. **Point the CTA at a real URL, not `/#contact`** — Change `src/components/Showcase/ShowcaseDetail.tsx:255` off the hash (there is no `/contact` route in `src/App.tsx`) to a crawlable destination once one exists. Flips: S8. Effort: S.
20. **Depends: G1** — Add all 25 slugs from `src/data/showcaseData/showcase-sites.ts` to `public/sitemap.xml` so `scripts/prerender.mjs` writes real HTML for each `/websites/:slug`. Flips: S5, S6, A10. Effort: M.
21. **Depends: G2** — Strip `index.html:17-32` so scrapers stop taking the homepage title/description on every case-study URL. Flips: S10. Effort: S.
22. **Depends: G8** — Drop the SPA `not_found_handling` fallback and serve a real 404 for unknown slugs (and stop 200-homepage for unlisted `/websites/:slug`). Flips: S4. Effort: M.
23. **Depends: G12** — Use the single `@graph` per route, `@id`-linked to `#organization` and a Person with sameAs, via `src/components/seo/JsonLd.tsx`. Flips: A6. Effort: M.
24. **Depends: G16** — Wait for Helmet/MetaTags during prerender in `scripts/prerender.mjs` so the tags added in `src/pages/WebsiteDetailPage.tsx` land in the static file. Flips: A10, S1, S6. Effort: M.
