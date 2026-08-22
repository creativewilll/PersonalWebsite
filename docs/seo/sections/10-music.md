## Music landing page — `/music`

**AEO 2.5/10 · SEO 3/10**

`/music` is a real, prerendered commercial page with six priced tiers, a 7-step process, a 13-question FAQ whose answers stay in the DOM, and a dense named-entity corpus — then it publishes as a second site. The static file at `dist/music/index.html` locks `html { overflow: hidden }`, paints a full-screen “Loading your stage” overlay, ships homepage-first description/OG tags, and a body-level canonical to `music.williamspurlock.com` while the sitemap and the live host are `williamspurlock.com/music`. Keep this URL as an indexed subdirectory; do not move it to a subdomain and do not noindex it.

### Where the points went

| Dim | Pass | Evidence |
|-----|------|----------|
| A1 | ❌ | First screen is a slogan h1 plus a feature run-on, not a who/what/for-whom capsule (`src/music/sections/Hero.tsx:59`, `src/music/sections/Hero.tsx:98`) |
| A2 | ❌ | Headings are slogans: “Your Music Deserves…”, “The Full Stack. Nothing Left Out.”, “Nobody else comes close…” (`src/music/sections/Hero.tsx:59`, `src/music/sections/Services.tsx:116`, `src/music/sections/ComparisonTable.tsx:66`) |
| A3 | ✅ | Visible 13-question FAQ; answers stay mounted via `maxHeight`/`opacity`, not unmount (`src/music/sections/FAQAndGuarantee.tsx:65`, `src/music/sections/FAQAndGuarantee.tsx:148`) |
| A4 | ❌ | FAQPage has 6 questions that do not match the 13 on the page — a structured-data violation, not a miss (`src/music/MusicLandingPage.tsx:95` vs `src/music/sections/FAQAndGuarantee.tsx:65`) |
| A5 | ⚠️ | Service + six Offer nodes is the right type (`src/music/MusicLandingPage.tsx:69`); half point only — `@id`/`url` sit on `music.williamspurlock.com` and `src/App.tsx:143` still injects global ProfessionalService |
| A6 | ❌ | `provider.@id` points at `#organization` (`src/music/MusicLandingPage.tsx:74`) but the music graph has no Person with `sameAs` |
| A7 | ✅ | Named entities in body copy: ChatGPT, Gemini, Google AI Overviews, Shopify, DistroKid, Bandzoogle, Laylo, Stripe, PayPal, Siri, Alexa, Solana (`src/music/sections/Hero.tsx:98`, `src/music/sections/Problem.tsx:9`, `src/music/sections/DeepDiveSEO.tsx:12`) |
| A8 | ❌ | 317%, 2.4x, 48 hrs, 100% have no calendar date and no source; quotes are `[Artist Name]` (`src/music/sections/Results.tsx:5`, `src/music/sections/Results.tsx:15`) |
| A9 | ❌ | Music `@graph` has no `dateModified`/`datePublished`; footer year is display-only (`src/music/MusicLandingPage.tsx:64`, `src/music/sections/Footer.tsx:55`) |
| A10 | ❌ | `dist/music/index.html` snapshots `<html style="overflow: hidden">`, the loader copy “Loading your stage”, and the homepage description as the first `<meta name="description">` (`src/music/components/LoadingScreen.tsx:8`, `src/music/MusicLandingPage.tsx:28`) |
| S1 | ❌ | Title prop is 81 chars; `MetaTags` suffixes ` \| Will Spurlock` → 97 chars, doubled brand (`src/music/MusicLandingPage.tsx:162`, `src/components/seo/MetaTags.tsx:19`) |
| S2 | ❌ | Description is 286 chars; prerender also keeps the homepage description first (`src/music/MusicLandingPage.tsx:163`, `index.html:18`) |
| S3 | ❌ | `url` and body `<link rel="canonical">` are `https://music.williamspurlock.com/` — wrong host, not in `<head>` (`src/music/MusicLandingPage.tsx:164`, `src/music/MusicLandingPage.tsx:167`) |
| S4 | ✅ | Dedicated `/music` route, prerendered, not a soft-404 (`src/App.tsx:148`, `dist/music/index.html`) |
| S5 | ✅ | Sitemap lists `https://williamspurlock.com/music` with `lastmod` (`scripts/generate-sitemap.mjs:24`) |
| S6 | ✅ | `dist/music/index.html` is the music page (h1, FAQ, pricing present), not the homepage shell |
| S7 | ❌ | One h1, then skipped levels: Problem `h3` with no `h2`; Comparison `h2`→`h4`; Results metrics as `h3` (`src/music/sections/Problem.tsx:54`, `src/music/sections/ComparisonTable.tsx:79`, `src/music/sections/Results.tsx:65`) |
| S8 | ❌ | Nav is hash-only; only main-site outbound is `https://williamspurlock.com`; Privacy/Terms are `href="#"` (`src/music/sections/Navigation.tsx:8`, `src/music/MusicLandingPage.tsx:45`, `src/music/sections/Footer.tsx:57`) |
| S9 | ❌ | Hero webp has `alt=""`, no `width`/`height`; default OG is the portrait JPEG (`src/music/sections/Hero.tsx:27`, `src/components/seo/MetaTags.tsx:15`) |
| S10 | ❌ | Hardcoded homepage title/description/og/twitter plus Helmet duplicates; scrapers take the first (`index.html:17`, `src/components/seo/MetaTags.tsx:22`) |

### 20-25 fixes to reach 9/10

1. **Keep `/music` as an indexed subdirectory — do not subdomain, do not noindex** — Rewrite every `https://music.williamspurlock.com/` string in `src/music/MusicLandingPage.tsx` (`MetaTags` `url`, body canonical, Service `@id`/`url`, FAQPage `@id`) to `https://williamspurlock.com/music`. A subdomain splits equity from the host that already serves and sitemaps this page; noindex would hide a priced offer that should rank for artist-website queries. Flips: A5, S3. Effort: S.
2. **Cut the title to ~32–42 characters so the Helmet suffix lands at 50–60** — Change the `title` prop in `src/music/MusicLandingPage.tsx` to a string such as `Artist websites with merch and AEO` (no brand in the prop; `src/components/seo/MetaTags.tsx` already appends ` | Will Spurlock`). Flips: S1. Effort: S.
3. **Rewrite the meta description to 140–160 unique characters** — Replace the 286-character `description` in `src/music/MusicLandingPage.tsx` with one sentence on artist sites, merch, copyright, and AEO, plus a from-price ($3,500). Flips: S2. Effort: S.
4. **Depends: G2** — Strip the hardcoded head block in `index.html` so this route’s Helmet tags are the only description/og/twitter set. Flips: S2, S10. Effort: S.
5. **Depends: G3** — Emit canonical from `src/components/seo/MetaTags.tsx` and delete the body `<link rel="canonical">` in `src/music/MusicLandingPage.tsx`. Flips: S3. Effort: S.
6. **Skip the loader (and the overflow lock) when Playwright snapshots** — In `src/music/MusicLandingPage.tsx`, initialize `isLoading` false when `navigator.webdriver` is set or `scripts/prerender.mjs` appends `?prerender=1`; do not call `useScrollLock(true)` in that path (`src/music/components/LoadingScreen.tsx` stays for humans). Flips: A10. Effort: S.
7. **Depends: G16** — Prerender must wait for Helmet (`meta[data-rh="true"]`) and the route `h1`, not `networkidle` + 300ms in `scripts/prerender.mjs`. Flips: A10, S10. Effort: M.
8. **Build FAQPage from the visible FAQ array** — Export `faqs` from `src/music/sections/FAQAndGuarantee.tsx` and map all 13 into `buildJsonLd()` in `src/music/MusicLandingPage.tsx`; delete the six schema-only questions. Mismatched FAQPage markup is a structured-data violation. Flips: A4. Effort: S.
9. **Write a two-paragraph answer capsule in the hero** — Replace the slogan stack and feature run-on in `src/music/sections/Hero.tsx` with: who (Will Spurlock), for whom (independent artists), what (site + merch + copyright + AEO), from-price, and where (Oakland County, MI / remote). Flips: A1. Effort: S.
10. **Rewrite headings as questions buyers ask** — Change the `h1` in `src/music/sections/Hero.tsx` and the `h2`s in `src/music/sections/Solution.tsx`, `src/music/sections/Services.tsx`, `src/music/sections/HowItWorks.tsx`, `src/music/sections/ComparisonTable.tsx`, `src/music/sections/Results.tsx`, `src/music/sections/Pricing.tsx`, `src/music/sections/BrandStory.tsx`, and `src/music/sections/FinalCTA.tsx` (e.g. “What does an artist website with merch and AEO cost?”). Flips: A2. Effort: M.
11. **Repair the heading outline** — Add an `h2` above the four cards in `src/music/sections/Problem.tsx`; change the two `h4`s in `src/music/sections/ComparisonTable.tsx` to `h3`; change Results metric `h3`s in `src/music/sections/Results.tsx` to `p`. Flips: S7. Effort: S.
12. **Replace `[Artist Name]` testimonials or delete the quotes** — Put real consented names and cities in `src/music/sections/Results.tsx` (and drop the `[Your Artist Name]` mock in `src/music/sections/DeepDiveSEO.tsx`). Flips: A8. Effort: S.
13. **Give every Results metric a calendar date and a public source, or remove the number** — Annotate 317% / 2.4x / 48 hrs / 100% in `src/music/sections/Results.tsx` with a month-year and a citable URL (case study, Search Console export, or contract clause). Flips: A8. Effort: M.
14. **Add `datePublished` and `dateModified` on the Service node** — Set both ISO dates in `buildJsonLd()` in `src/music/MusicLandingPage.tsx` and print a “Updated” line in `src/music/sections/Footer.tsx`. Flips: A9. Effort: S.
15. **Depends: G12** — One `@graph` per route, `@id`-linked to `#organization`, and stop mounting ProfessionalService outside `<Routes>` in `src/App.tsx` so `/music` is not a dual-schema document. Flips: A5, A6. Effort: M.
16. **Add a Person node with `sameAs` to the music graph** — In `src/music/MusicLandingPage.tsx` `buildJsonLd()`, add `@id` `https://williamspurlock.com/#person` with `sameAs` for LinkedIn and `https://x.com/creativewill02` (not `willspurlock_`). Flips: A6. Effort: S.
17. **Depends: G11** — One location and one X URL site-wide so Troy / `willspurlock_` / `@willspurlock` on this page stop fighting Oakland County / `creativewill02`. Flips: A5, A6. Effort: S.
18. **Replace Footer Privacy/Terms `href="#"` with real documents** — Create `src/pages/LegalPrivacy.tsx` and `src/pages/LegalTerms.tsx` (or `public/legal/privacy.html` and `public/legal/terms.html`) and point the anchors in `src/music/sections/Footer.tsx`. Flips: S8. Effort: M.
19. **Add crawlable links out of the music island** — In `src/music/sections/Footer.tsx` and `src/music/sections/Navigation.tsx`, add `<a href="/">`, `/about`, `/websites`, `/projects`, `/blog`, and `/blog/geo-vs-aeo-vs-aio-what-each-one-means-and-why-your-business-needs-all-three`; change the pill in `src/music/MusicLandingPage.tsx` from `https://williamspurlock.com` to `/`. Flips: S8. Effort: S.
20. **List `/music` in the main-site Header** — Add `{ to: '/music', label: 'Music' }` to `menuItems` in `src/components/Header.tsx` so the funnel is linked in both directions. Flips: S8. Effort: S.
21. **Give the hero image intrinsic size and a real alt** — Add `width`/`height` matching the webp and a short alt on the `<img>` in `src/music/sections/Hero.tsx` (keep `fetchPriority="high"`). Flips: S9. Effort: S.
22. **Pass a 1200×630 music OG card** — Add `public/og/music-1200x630.webp` and set `image` on `MetaTags` in `src/music/MusicLandingPage.tsx` so this route stops inheriting the 1522×1874 headshot default. Flips: S9. Effort: M.
23. **Point Footer socials at the canonical sameAs set** — Change `https://x.com/willspurlock_` in `src/music/sections/Footer.tsx` to `https://x.com/creativewill02`; keep YouTube only if it stays on the Person `sameAs` list in `src/music/MusicLandingPage.tsx`. Flips: A6. Effort: S.
