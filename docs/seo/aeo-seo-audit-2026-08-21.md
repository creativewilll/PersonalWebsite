# AEO / SEO Audit — williamspurlock.com

**Audited 2026-08-21.** Stack: Vite + React 18 SPA, react-router-dom v6, react-helmet-async, Tailwind, framer-motion, build-time Playwright prerender, Cloudflare Workers.

Every finding in this document was verified against either the source on disk or a live HTTP response, and carries a `file:line` citation. Nothing here is inferred from convention.

---

## The one finding that caps everything else

`scripts/prerender.mjs` builds its render list by parsing `<loc>` entries out of `public/sitemap.xml`:

```150:152:scripts/prerender.mjs
      urls.push(new URL(m[1]).pathname);
```

`wrangler.jsonc` then sets `not_found_handling: "single-page-application"`. Together those two lines mean: **any URL missing from the sitemap is not prerendered, and Cloudflare answers it with `dist/index.html` at HTTP 200.** Not a redirect, not a 404 — the homepage, served under the wrong URL, to every crawler and answer engine.

Counts reconciled exactly:

- 382 blog `.md` files on disk excluding `template.md`
- 364 blog URLs in `public/sitemap.xml`
- 364 prerendered post directories in `dist/blog`

What is currently serving homepage HTML at HTTP 200, verified live:

| Surface | Count | Verified example |
|---|---|---|
| Newest blog posts (all of `content/blog/2026/08/`) | 18 | `/blog/introducing-spurlock-studios-llc` |
| Website case studies (`src/data/showcaseData`) | 25 | `/websites/arkayla/` |
| Blog category pages | all | `/blog/category/ai-visibility/` |
| Blog tag pages | all | `/blog/tag/aeo/` |
| Any nonexistent URL | ∞ | `/this-page-definitely-does-not-exist-12345` → 200 |

The 18 invisible posts are the highest-commercial-intent writing on the site: the Spurlock Studios LLC launch announcement, the GEO 2026 playbook, the GEO vs AEO vs AIO explainer, the AI automation cost breakdown, the local-business AI recommendations guide, and the MCP explainer.

The leverage point is that sitemap coverage and prerender coverage are the same lever. Fixing `scripts/generate-sitemap.mjs` to enumerate every route fixes both at once — that is fix **G1**, and it is the highest-value change on this list.

---

## How to read the scores

Each surface is scored on two independent axes, **AEO** (answer/AI-engine optimization) and **SEO**, out of 10. Each axis is ten binary dimensions worth one point each. Half points appear only where a dimension is partially satisfied and the reasoning is written out.

This structure is deliberate: a 4/10 is not a vibe, it is a specific list of six named failures, and "get this to 9" reduces to "flip these five dimensions."

**AEO dimensions**

| ID | Dimension |
|---|---|
| A1 | Answer capsule — a direct, self-contained answer or definition inside the first two paragraphs |
| A2 | Question-shaped headings — H2/H3s phrased as real user queries rather than slogans |
| A3 | Visible FAQ block present on the page |
| A4 | FAQPage schema present **and matching** the visible FAQ |
| A5 | Correct primary-entity schema for the page type, beyond the site-wide ProfessionalService |
| A6 | Entity graph linkage — page schema joined by `@id` to `#organization` and a Person node with `sameAs` |
| A7 | Named concrete entities (specific models, tools, platforms, clients) rather than generic claims |
| A8 | Quantified claims carrying both a date and a source |
| A9 | Machine-readable freshness — `dateModified` in schema and/or a visible reviewed date |
| A10 | Extractable in the static HTML actually served at that URL |

**SEO dimensions**

| ID | Dimension |
|---|---|
| S1 | Unique title, roughly 50–60 chars, no doubled brand, no `undefined` |
| S2 | Unique meta description roughly 140–160 chars, not duplicated from another page |
| S3 | Canonical present, absolute, self-referential, matching the served URL form |
| S4 | Correct HTTP semantics — not a soft-404, not serving another page's content |
| S5 | Present in `sitemap.xml` with an accurate `lastmod` |
| S6 | Prerendered HTML exists so crawlers get the page, not the homepage shell |
| S7 | Exactly one H1, no skipped heading levels |
| S8 | Crawlable `<a href>` links out, with descriptive anchor text |
| S9 | Images carry descriptive alt, explicit width/height, modern format, correct loading |
| S10 | No duplicate or conflicting head tags |

### Global fixes are stated once

The shared machinery is audited as its own surface with fix IDs **G1–G25**. Page sections reference those by ID as `Depends: G7` rather than repeating them, so each per-page list stays specific to that page. Read the global section first; it is the prerequisite layer for everything after it.

The global layer is scored on the dimensions shared machinery actually controls and is **excluded from the page-score averages** — dimensions like A1, A2, and A3 are page-content properties that infrastructure cannot satisfy on its own, so folding its score into a blended average would misrepresent both.

---

## Summary scorecard

| Surface | Route | AEO | SEO | Fixes |
|---|---|---:|---:|---:|
| Global layer | shared machinery | 1.0 | 1.0 | 25 |
| Home | `/` | 2.0 | 6.0 | 25 |
| About | `/about` | 2.5 | 5.0 | 24 |
| Automation Library | `/projects` | 3.5 | 4.5 | 23 |
| Project case study | `/projects/:slug` | 4.5 | 5.0 | 24 |
| Websites index | `/websites` | 4.0 | 5.5 | 23 |
| Website case study | `/websites/:slug` | 1.0 | **0.0** | 24 |
| Blog index | `/blog` | 1.5 | 5.5 | 22 |
| Blog post template | `/blog/:slug` | **7.5** | 4.0 | 23 |
| Category + tag archives | `/blog/category/*`, `/blog/tag/*` | **0.0** | **0.0** | 22 |
| Music landing | `/music` | 2.5 | 3.0 | 23 |
| Pillar posts (top 20, set average) | content layer | **8.1** | 5.75 | 24 |

**Page-route average across the ten routes: AEO 2.90/10 · SEO 3.85/10.** 282 fixes total.

### What the shape of that table means

**AEO is worse than SEO on almost every surface, and that is the actual diagnosis.** The site is broadly findable and largely unquotable. The same four failures repeat nearly everywhere: a slogan H1 where a question belongs, no FAQ marked up as `FAQPage`, no page-level entity schema beyond the site-wide `ProfessionalService`, and quantified claims with neither a date nor a source.

Two numbers carry the good news. The blog post template scores **7.5 on AEO** — answer-first openings, question-shaped H2s, `### …?` headings that feed a real `FAQPage`, `entityMentions` becoming schema `mentions`, and heading `id`s for passage-level linking. The top-20 pillar set averages **8.1**. The writing is already doing the work; the delivery layer is what fails it.

Three surfaces score 0. `/websites/:slug` and the category/tag archives are zero for the same reason — their URLs return the homepage, so nothing the component does is ever seen. Those are not content problems.

### Start here — the ten highest-leverage fixes

Ordered by how many dimensions they flip across how many surfaces, not by effort.

1. **G1** — make `scripts/generate-sitemap.mjs` enumerate every route. One change unhides 18 posts, 25 case studies, and every taxonomy page, because prerender reads the sitemap. Flips S4, S5, S6, A10 on four surfaces.
2. **G2** — strip the hardcoded head block from `index.html`. Ends the duplicate/conflicting `og:*` and `description` tags on every page, so posts stop unfurling as the homepage.
3. **G3** — add canonical support to `MetaTags.tsx` and pass it everywhere. S3 is currently failing site-wide.
4. **G8** — add a real 404 route and switch Cloudflare off SPA fallback, so missing URLs stop answering 200.
5. **G22** — make `/blog/tag/:tagSlug` actually filter. `tagSlug` is destructured at `src/pages/BlogPage.tsx:84` and never used, so every tag URL renders the full unfiltered list.
6. **Mark up the FAQs that already exist.** The 12 project case studies contain real "Frequently asked questions" sections in markdown with no `FAQPage` schema, and `/websites` has a visible 3-question FAQ with none either.
7. **Add page-level schema to both detail templates.** `/projects/:slug` and `/websites/:slug` emit no page schema at all despite being the deepest content on the site.
8. **Kill the double H1.** 359 of 382 posts open their body with a markdown `# ` that collides with the template H1.
9. **G7** — fix the CSP. GA4 and both webfonts are blocked in production right now, so analytics and typography are silently broken.
10. **Fix `/music` delivery.** The prerendered file ships the "Loading your stage" overlay with `overflow: hidden` and a body-level canonical pointing at a different hostname.

Immediate one-line cleanup, unranked because it is trivial: `content/blog/2026/06/did-google-ai-overviews-cause-your-traffic-drop-how-to-tell.md` has three literal `## [Question-shaped H2 #N]` placeholder headings live at lines 366, 369, and 372. That post has 21 inbound links.

---

## Global layer — every URL inherits this

**AEO 1/10 · SEO 1/10**

The shared head, schema, and Cloudflare delivery pipeline publish homepage tags and homepage HTML under the wrong URLs, so scrapers and answer engines read Will-the-homepage on almost every miss. Helmet cannot override the hardcoded `index.html` block, the sitemap-driven prerender omits websites, categories, tags, and the newest posts, and SPA fallback then answers those paths with HTTP 200. Until G1–G10 land, every other page score is capped by machinery it does not control.

### Where the points went

| Dim | Pass | Evidence |
|-----|------|----------|
| A1 | ❌ | No shared answer-capsule component in `src/App.tsx` / Header / Footer; `src/components/Hero.tsx:105` is homepage marketing only |
| A2 | ❌ | Chrome headings are slogans (`src/components/Header.tsx:23`, `src/components/Footer.tsx:26`), not user queries |
| A3 | ❌ | No global FAQ in `src/components/Header.tsx`, `src/components/Footer.tsx`, or `src/App.tsx` |
| A4 | ❌ | Global JSON-LD is ProfessionalService only (`src/App.tsx:84`); `src/components/seo/JsonLd.tsx:10` never emits FAQPage |
| A5 | ❌ | `src/App.tsx:143` mounts ProfessionalService on every route; no page-type switch beyond that block |
| A6 | ❌ | Founder Person has no `@id` and no `sameAs` (`src/App.tsx:93`); `sameAs` sits on ProfessionalService (`src/App.tsx:105`) |
| A7 | ✅ | Global schema names Will Spurlock, Spurlock Studios LLC, 3 profiles, 8 `knowsAbout` topics (`src/App.tsx:88`) |
| A8 | ❌ | Organization node has no dated, sourced quantities (`src/App.tsx:84`); `public/llms.txt:19` lists counts with neither |
| A9 | ❌ | No `dateModified` on the global graph (`src/App.tsx:84`); Header/Footer show no reviewed date |
| A10 | ❌ | Prerender route list is sitemap `<loc>` only (`scripts/prerender.mjs:147`); misses SPA-200 via `wrangler.jsonc:7` |
| S1 | ❌ | `src/components/seo/MetaTags.tsx:19` always appends `\| Will Spurlock`; `src/pages/AboutPage.tsx:33` already contains the brand |
| S2 | ❌ | `index.html:18` plus `src/components/seo/MetaTags.tsx:24` emit two descriptions; unsitemap'd URLs keep the homepage copy |
| S3 | ❌ | `src/components/seo/MetaTags.tsx:12` has no canonical prop; prerender writes slash dirs (`scripts/prerender.mjs:267`) against non-slash locs (`public/sitemap.xml:40`) |
| S4 | ❌ | No `path="*"` in `src/App.tsx:145`; `wrangler.jsonc:7` `not_found_handling: "single-page-application"` soft-200s misses |
| S5 | ❌ | `scripts/generate-sitemap.mjs:18` STATIC_ROUTES omit `/websites/:slug`, `/blog/category/*`, `/blog/tag/*` |
| S6 | ❌ | `scripts/prerender.mjs:48` reads `dist/sitemap.xml`; absent loc = homepage shell |
| S7 | ❌ | Template `<h1>` at `src/components/Blog/BlogPost.tsx:293` plus markdown `# ` rendered as `<h1>` (`src/components/Blog/BlogPost.tsx:68`) |
| S8 | ✅ | Header/Footer emit real `<Link to>` with labels (`src/components/Header.tsx:154`, `src/components/Footer.tsx:29`) |
| S9 | ❌ | Default OG is a 1522×1874 portrait JPEG (`src/components/seo/MetaTags.tsx:15`); cover `<img>` has no width/height (`src/components/Blog/BlogPost.tsx:268`) |
| S10 | ❌ | Hardcoded head in `index.html:17` plus Helmet (`src/components/seo/MetaTags.tsx:22`); blog/project pages add a third set (`src/pages/BlogPostPage.tsx:99`, `src/components/Blog/BlogPost.tsx:226`) |

### 20-25 fixes to reach 9/10

G1. **Enumerate every crawlable route in the sitemap generator** — Extend `scripts/generate-sitemap.mjs` STATIC_ROUTES (`scripts/generate-sitemap.mjs:18`) to emit all 25 slugs from `src/data/showcaseData/showcase-sites.ts`, all six `INITIAL_CATEGORIES` slugs from `src/data/blogData/categories.ts:4` as `/blog/category/<slug>`, every distinct tag as `/blog/tag/<slug>` (add `getAllTags()` to `src/data/blogData/BlogManager.ts`), and every non-draft file under `content/blog/` including `content/blog/2026/08/` (the generator already walks posts at `scripts/generate-sitemap.mjs:96` — regenerate so the 18 newest leave `public/sitemap.xml`). Keep project slugs from `content/projects/*.md` (skip `_` prefixes, already at `scripts/generate-sitemap.mjs:41`). `scripts/prerender.mjs:147` copies `<loc>` into the render list, so this is the prerender coverage fix. Flips: A10, S4, S5, S6. Effort: M.

G2. **Strip the hardcoded head block from index.html** — Delete the title, description, Open Graph, and Twitter tags in `index.html:17-32` so `src/components/seo/MetaTags.tsx` (via `react-helmet-async` in `src/main.tsx:9`) is the only head source. Keep charset, viewport, preconnects, and on-demand scripts. Helmet cannot remove the static tags, so scrapers keep the homepage values today. Flips: S1, S2, S10. Effort: S.

G3. **Add canonical support to MetaTags and pass it on every route** — Add an absolute `canonical` prop to `src/components/seo/MetaTags.tsx` and emit `<link rel="canonical" href={canonical \|\| url} />`. Pass a self-referential URL (same slash form as the served file) from `src/App.tsx:162`, `src/pages/AboutPage.tsx:32`, `src/pages/BlogPage.tsx:133`, `src/pages/AllProjects.tsx`, `src/pages/WebsitesPage.tsx:89`, `src/music/MusicLandingPage.tsx:161`, and retire the one-off canonicals in `src/components/Blog/BlogPost.tsx:255`, `src/components/Projects/ProjectDetails.tsx:89`, `src/components/Showcase/ShowcaseDetail.tsx:33`. Flips: S3. Effort: S.

G4. **Add robots / max-image-preview:large to MetaTags** — Emit `<meta name="robots" content="index, follow, max-image-preview:large" />` from `src/components/seo/MetaTags.tsx` by default, and a `robots` override for the G8 404 (`noindex, follow`). `_headers` currently has no `X-Robots-Tag`. Flips: S4. Effort: S.

G5. **Complete the social meta set in MetaTags** — Add `og:site_name` (Will Spurlock), `og:locale` (en_US), `og:image:width` / `og:image:height` / `og:image:alt`, `twitter:site`, and `twitter:creator` to `src/components/seo/MetaTags.tsx`. Pick one X handle (`@creativewill02` to match `src/App.tsx:107` and `src/data/links.ts:12`, not `@williamspurlock` in `src/components/Blog/BlogPost.tsx:254`). `index.html:25` already has `og:site_name` but G2 removes it. Flips: S1, S9, S10. Effort: S.

G6. **Replace the default OG image with a 1200×630 card** — Stop defaulting `src/components/seo/MetaTags.tsx:15` and `index.html:26` to `/projects/Professional%20Headshot%20Hero.jpeg`. Add a purpose-built `public/og/default-1200x630.webp` (and jpg fallback), pass width 1200 / height 630 / alt, and point `src/App.tsx:91` `logo` at a square mark instead of the same portrait. Flips: S9. Effort: M.

G7. **Fix the CSP so GA4 and fonts load, or self-host the fonts** — Update `_headers:12` `script-src` to allow `https://www.googletagmanager.com` and `https://www.google-analytics.com` (required by `index.html:4`), `style-src` to allow `https://rsms.me` and `https://fonts.googleapis.com` (`index.html:43-47`), and `font-src` to allow `https://fonts.gstatic.com` and `https://rsms.me`. Better: vendor Inter and Space Grotesk under `public/fonts/`, drop the remote stylesheets, and keep CSP on `'self'`. Flips: A10. Effort: M.

G8. **Add a real 404 and turn off SPA fallback** — Create `src/pages/NotFoundPage.tsx` with `MetaTags` title/description, `robots=noindex`, and a single H1. Register `<Route path="*" element={<NotFoundPage />} />` in `src/App.tsx:145`. Write `public/404.html` (or prerender `/*` into `dist/404.html`) and set `wrangler.jsonc:7` `not_found_handling` to `"404-page"` (not `"single-page-application"`). Flips: S4, A10. Effort: M.

G9. **Normalize trailing slashes to one form, 301, and agree everywhere** — Pick slash or no-slash. `scripts/prerender.mjs:267` writes `dist/<route>/index.html`, which is what produces the live 307 from `/blog/<slug>` to `/blog/<slug>/`. Emit sitemap `<loc>` (`scripts/generate-sitemap.mjs:123`) and Helmet canonicals in that same form. Add Cloudflare 301s (Workers `run_worker_first` / `_redirects`, not 307) so the hop is permanent and self-referential. Flips: S3, S5. Effort: M.

G10. **Ship a real favicon set, apple-touch-icon, theme-color, and webmanifest** — `index.html:15` points at `/vite.svg`, which is absent from `public/` and `dist/`. Add `public/favicon.ico`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`, `public/site.webmanifest`, and `<meta name="theme-color">` in `index.html` / `src/components/seo/MetaTags.tsx`. Flips: S9. Effort: S.

G11. **Resolve identity conflicts and add address + telephone to Organization** — One display name (Will Spurlock) and one legal name (Spurlock Studios LLC) in `src/App.tsx:88` and `src/components/Blog/BlogPost.tsx:148` (publisher must not say "William Spurlock"). One X URL (`https://x.com/creativewill02` in `src/App.tsx:107`, `src/data/links.ts:12`; drop `@williamspurlock` in `src/components/Blog/BlogPost.tsx:254`). One location (Oakland County, MI in `src/components/Contact.tsx:96` vs Troy, Michigan in `src/music/sections/Footer.tsx:25`). Add `telephone` `+1-248-824-3309` (already on `src/pages/AboutPage.tsx:84` and `public/llms.txt:27`) and a PostalAddress. Put "Spurlock Studios LLC" in visible Footer copy if it stays in JSON-LD. Flips: A5, A6, A7. Effort: S.

G12. **Wrap per-page schema in one @graph linked to #organization and a Person node** — Change `src/components/seo/JsonLd.tsx` (or a new `src/components/seo/GraphLd.tsx`) to emit a single `@graph` per route. Give Person `@id` `https://williamspurlock.com/#person` with `sameAs` (currently missing on `src/App.tsx:93`). Keep ProfessionalService `@id` `#organization`. Page types (WebSite in `src/App.tsx:167`, BlogPosting in `src/components/Blog/BlogPost.tsx:133`, BreadcrumbList in `src/pages/BlogPostPage.tsx:72`) join via `@id` instead of extra `<script>` tags. Do not mount the org graph outside `<Routes>` (`src/App.tsx:143`) so `/music` can carry its own graph. Flips: A5, A6. Effort: M.

G13. **Remove the dead SearchAction or build /search** — `src/App.tsx:175` targets `https://williamspurlock.com/search?q={search_term_string}` but `src/App.tsx:145` has no `/search` route. Either delete `potentialAction` or add `src/pages/SearchPage.tsx` that queries `BlogManager` and list `/search` in `scripts/generate-sitemap.mjs` only if it is indexable. Flips: A5, S4. Effort: S.

G14. **Add an RSS/Atom feed and generate llms.txt / llms-full.txt at build** — Create `scripts/generate-feed.mjs` writing `public/feed.xml` (RSS 2.0 or Atom) from `content/blog/**/*.md`. Create `scripts/generate-llms.mjs` that rebuilds `public/llms.txt` and `public/llms-full.txt` with a per-post index (slug, title, date, one-line excerpt, absolute URL) instead of the hand-written bios at `public/llms.txt` and `public/llms-full.txt`. Wire both into `package.json` `prebuild` (`package.json:11`). Add `Sitemap:` stays; add `llms.txt` and the feed as `Link:` / `rel="alternate"` from `public/robots.txt` and `src/components/seo/MetaTags.tsx`. Flips: A9, S5. Effort: M.

G15. **Delete the six zero-byte placeholder JPEGs in public/blog/** — Remove the empty `.jpg`/`.jpeg` placeholders under `public/blog/` so they cannot ship as `coverImage` 200s. Point any leftover frontmatter at real files under `public/images/blog/` and keep `scripts/validate-blog-frontmatter.mjs:170` as the existence check. Flips: S9. Effort: S.

G16. **Make npm run build prerender, and wait for Helmet instead of networkidle + 300ms** — `package.json:12` `build` is `vite build` only (`prebuild` at `package.json:11` already validates and writes the sitemap). Append `node scripts/prerender.mjs` to `build`. In `scripts/prerender.mjs:219` replace `waitUntil: 'networkidle'` plus `waitForTimeout(300)` (`scripts/prerender.mjs:224`) with a wait for `meta[data-rh="true"]` (Helmet) and for `#root` to contain the route H1, not `src/components/ui/SkeletonLoaders` from the `Suspense` fallbacks in `src/App.tsx:204`. Flips: A10, S6, S10. Effort: M.

G17. **Add cache and X-Robots-Tag for prerendered HTML, and stop CORS * on HTML** — `_headers:8-11` sends `Access-Control-Allow-Origin: *` on `/*`. Restrict CORS to APIs, not HTML. `_headers:14` sets `Cache-Control` only for `/index.html`; add `Cache-Control: public, max-age=0, must-revalidate` (or short SWR) for prerendered `/*/index.html` and `X-Robots-Tag: index, follow, max-image-preview:large` on those HTML responses. Keep `/assets/*` immutable (`_headers:17`). Flips: S4, A10. Effort: S.

G18. **Tighten blog frontmatter validation** — Extend `scripts/validate-blog-frontmatter.mjs`: require `lastModified` in `REQUIRED_FIELDS` (`scripts/validate-blog-frontmatter.mjs:44`); enforce slug kebab-case and uniqueness across `content/blog/**/*.md`; reject unknown top-level keys (today it only flags `FORBIDDEN_FIELDS` / `SOFT_FORBIDDEN` at `scripts/validate-blog-frontmatter.mjs:151`); reject `canonicalUrl` / `canonical_url` because `src/data/blogData/blogLoader.ts:220` overwrites them. Flips: S3, A9. Effort: M.

G19. **Point /music canonical and og:url at this host** — `src/music/MusicLandingPage.tsx:164` sets MetaTags `url` to `https://music.williamspurlock.com/` and `src/music/MusicLandingPage.tsx:167` drops a body-level `<link rel="canonical">` (invalid, wrong host). Use `https://williamspurlock.com/music` via G3 MetaTags and delete the body tag. Flips: S3, S10. Effort: S.

G20. **One Helmet writer per route** — `src/pages/BlogPostPage.tsx:99` MetaTags plus `src/components/Blog/BlogPost.tsx:226` Helmet plus `index.html:17` is three title/description/og sets. Same stack on `src/pages/ProjectDetailsPage.tsx:34` + `src/components/Projects/ProjectDetails.tsx:78`. Delete the page-level MetaTags or the inner Helmet, not both. Flips: S1, S2, S10. Effort: S.

G21. **Make the header mark a real home link** — `src/components/Header.tsx:127` is `href="#"` on the WS wordmark. Change it to `<Link to="/">` with accessible text. Flips: S8. Effort: S.

G22. **Actually filter /blog/tag/:tagSlug** — `src/App.tsx:272` routes tags to `BlogPage type="tag"`, but `src/pages/BlogPage.tsx:84` reads `tagSlug` and never filters (no `getBlogPostsByTag` on `src/data/blogData/BlogManager.ts`). Implement tag filter + MetaTags url `/blog/tag/<slug>`, then sitemap those URLs in G1. Flips: S4, S6, A10. Effort: M.

G23. **Stop mounting ProfessionalService outside Routes** — `src/App.tsx:143` injects the studio graph on `/music` and every other path. Move it into the main-site layout (`src/App.tsx:124`) or the homepage `@graph` (`src/App.tsx:167`) so the music funnel can keep its own FAQPage graph (`src/music/MusicLandingPage.tsx:166`). Flips: A5, A6. Effort: S.

G24. **Unknown slugs must 404, not client-navigate to an index** — `src/pages/BlogPostPage.tsx:44` `navigate('/blog')` and `src/pages/ProjectDetailsPage.tsx:16` `navigate('/projects')` turn missing slugs into HTTP 200 indexes after G8 is live. Render `<NotFoundPage />` (or `Navigate` to a dedicated 404) instead. Flips: S4. Effort: S.

G25. **Stamp sitemap lastmod from content, not the build clock** — `scripts/generate-sitemap.mjs:105` sets `today` on every STATIC_ROUTE (`scripts/generate-sitemap.mjs:114`); committed `public/sitemap.xml:4` still reads `2026-08-07`. Use frontmatter `lastModified` for posts (already `scripts/generate-sitemap.mjs:121`) and file mtime / a hand-set date for `/`, `/about`, `/blog`, `/projects`, `/websites`, `/music`. Flips: A9, S5. Effort: S.

---

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

---

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

---

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

---

## Project case study — `/projects/:slug`

**AEO 4.5/10 · SEO 5/10**

These 12 prerendered case studies are the deepest pages in this scope (roughly 1,800–2,500 words) and the markdown already reads like an answer-engine magnet — then the chrome undoes it. Every MetaTags title is `{title} | undefined | Will Spurlock`, OG falls back to the portrait headshot because `coverImage` is not on the type, a second Helmet writes a relative `og:image` and the only canonical, and there is no page-level JSON-LD even though each file ships six `###` FAQ questions. The 479-library gap lives on `/projects`; this surface needs one title, one H1, and schema that matches the body.

### Where the points went

| Dim | Pass | Evidence |
|-----|------|----------|
| A1 | ✅ | Markdown lead is an inverted-pyramid capsule (`ai-twitter-influencer.md:36`; `automated-meeting-assistant.md:36`) |
| A2 | ⚠️ | Several `##` are questions (`ai-twitter-influencer.md:38,44`); template H1 is a product name (`ProjectDetails.tsx:116`) and other `##` are slogans (`ai-twitter-influencer.md:58,70`) |
| A3 | ✅ | Visible FAQ block with six `###` questions (`ai-twitter-influencer.md:119-141`; `automated-meeting-assistant.md:124-148`) |
| A4 | ❌ | No page JSON-LD at all (`ProjectDetailsPage.tsx:32-45`) |
| A5 | ❌ | No Article/TechArticle beyond the global ProfessionalService (`ProjectDetailsPage.tsx:32-45`) |
| A6 | ❌ | No page `@graph`, no `@id` link to `#organization`, no Person/`sameAs` (`ProjectDetailsPage.tsx:32-45`) |
| A7 | ✅ | Body names n8n, PostgreSQL, FastAPI, X (`ai-twitter-influencer.md:36,90-92`) |
| A8 | ❌ | No dated+sourced metric; FAQ refuses performance promises (`ai-twitter-influencer.md:141-143`); `timeline` "2 Weeks" unsourced (`ai-twitter-influencer.md:7`) |
| A9 | ❌ | Loader writes `new Date().toISOString()` for published/modified (`projectLoader.ts:131-132`) and never emits it |
| A10 | ✅ | Eager glob + `dangerouslySetInnerHTML` of full markdown (`projectLoader.ts:6-10,161-172`; `ProjectDetails.tsx:189-193`) |
| S1 | ❌ | `` `${project.title} \| ${project.client}` `` — `Project` has no `client` (`ProjectDetailsPage.tsx:35`; `types/index.ts:17-34`) |
| S2 | ⚠️ | Unique per slug; `description` 218/222 chars, `seoDescription` 182 (`ai-twitter-influencer.md:4,20`; `automated-meeting-assistant.md:4,20`) |
| S3 | ✅ | Absolute self-referential canonical (`ProjectDetails.tsx:89`) |
| S4 | ✅ | Twelve published slugs are real 200s in the sitemap (`sitemap.xml:2224-2293`) |
| S5 | ⚠️ | All 12 share `lastmod` 2026-05-17 (`sitemap.xml:2225`); not per-file |
| S6 | ✅ | Those 12 locs are prerendered (`prerender.mjs:3,48`; `sitemap.xml:2224-2293`) |
| S7 | ❌ | Template H1 (`ProjectDetails.tsx:116`) plus markdown `# ` H1 (`ai-twitter-influencer.md:34`; renderer `ProjectDetails.tsx:41`); sidebar H3 before H2 (`ProjectDetails.tsx:141,163`) |
| S8 | ⚠️ | Back `<Link>` + hash TOC (`ProjectDetails.tsx:128,166-168`); CTA and "Next step" hit `/contact` (`ProjectDetails.tsx:209`; `ai-twitter-influencer.md:147`) |
| S9 | ⚠️ | Hero `alt={title}`, no width/height/loading (`ProjectDetails.tsx:94-97`); PNG/JPEG covers |
| S10 | ❌ | `MetaTags` + second `Helmet` + homepage `index.html` (`ProjectDetailsPage.tsx:34-40`; `ProjectDetails.tsx:78-90`) |

Half-points: A2 — question H2s exist beside slogan H2s and a product H1. S2 — unique copy, both lengths miss 140–160. S5 — listed, stamp is identical on every slug. S8 — some crawlable anchors; the conversion link is a homepage soft-404. S9 — alt only.

### 20-25 fixes to reach 9/10

1. **Stop interpolating missing `client`** — `src/pages/ProjectDetailsPage.tsx` must pass `project.seo.title` or `project.title` only; `src/types/index.ts` has no `client`. Flips: S1. Effort: S.
2. **Strip brand from `seoTitle` before the MetaTags suffix** — trim `| William Spurlock` in `src/data/projectData/projectLoader.ts:127` and in each `content/projects/*.md` `seoTitle`. Flips: S1. Effort: S.
3. **Delete the second Helmet** — remove `src/components/Projects/ProjectDetails.tsx:78-90` so title/description/og are not overwritten (relative `og:image` included). Flips: S1, S10. Effort: S.
4. **Depends: G3** — move the canonical now at `ProjectDetails.tsx:89` into `src/components/seo/MetaTags.tsx` before the second Helmet is deleted. Flips: S10. Effort: S.
5. **Depends: G2** — strip the hardcoded homepage head block so this route's tags win. Flips: S10. Effort: S.
6. **Pass `project.image` as an absolute OG URL** — `src/pages/ProjectDetailsPage.tsx` (`coverImage` is not on `src/types/index.ts`; today OG falls back to the headshot). Flips: S10. Effort: S.
7. **Emit FAQPage from the markdown FAQ** — parse `## Frequently asked questions` / `###` pairs in `src/components/Projects/ProjectDetails.tsx` (see `content/projects/ai-twitter-influencer.md:119-141` and `content/projects/automated-meeting-assistant.md:124-148`). Flips: A4. Effort: M.
8. **Add TechArticle JSON-LD on the page** — `src/pages/ProjectDetailsPage.tsx` with headline, image, dates, and the markdown FAQ as `mainEntity`. Flips: A5. Effort: M.
9. **`@id`-link that Article to `#organization` plus a Person with `sameAs`** — same graph in `src/pages/ProjectDetailsPage.tsx`. Flips: A6. Effort: M.
10. **Depends: G12** — fold the case-study graph into the single route `@graph`. Flips: A6. Effort: M.
11. **Drop the leading markdown `# ` H1** — strip the first ATX H1 in `src/data/projectData/projectLoader.ts` or skip `depth === 1` in `ProjectDetails.tsx` `renderMarkdown`. Flips: S7. Effort: S.
12. **Fix sidebar heading rank** — change "Project Brief" / "Core Capabilities" from `h3` to `h2` (or demote the TOC `h2`) in `src/components/Projects/ProjectDetails.tsx`. Flips: S7. Effort: S.
13. **Retarget the CTA off `/contact`** — `Link to="/#contact"` in `src/components/Projects/ProjectDetails.tsx:209`. Flips: S8. Effort: S.
14. **Rewrite markdown "Next step" links off `/contact`** — every published file under `content/projects/` (e.g. `ai-twitter-influencer.md:147`, `automated-meeting-assistant.md:152`). Flips: S8. Effort: S.
15. **Render `relatedProjects` as `<Link>`s** — `src/components/Projects/ProjectDetails.tsx` using slugs already parsed in `src/data/projectData/projectLoader.ts:152`. Flips: S8. Effort: M.
16. **Rewrite `seoDescription` to 140–160 chars** — `content/projects/*.md` (today 182) and pass `project.seo.description` from `src/pages/ProjectDetailsPage.tsx`. Flips: S2. Effort: M.
17. **Stop stamping `new Date()` as published/modified** — `src/data/projectData/projectLoader.ts:131-132`; add real `published` / `updated` frontmatter on `content/projects/*.md`. Flips: A9. Effort: M.
18. **Emit `<time>` plus `dateModified` in schema** — `src/components/Projects/ProjectDetails.tsx` and the TechArticle graph in `src/pages/ProjectDetailsPage.tsx`. Flips: A9. Effort: S.
19. **Per-slug sitemap lastmod from frontmatter** — replace the shared 2026-05-17 stamp in `public/sitemap.xml` (lines 2224–2293). Flips: S5. Effort: S.
20. **Add width, height, and `loading` on the hero `<img>`** — `src/components/Projects/ProjectDetails.tsx:94-97`. Flips: S9. Effort: S.
21. **Convert hero covers to WebP/AVIF** — files under `public/projects/` and the `image:` field in `content/projects/*.md`. Flips: S9. Effort: M.
22. **Put one dated, sourced metric in the lead** — `content/projects/*.md`; cite `built` from `src/data/automationsData/automations.json` when the slug matches, or a real `firstShipped` frontmatter field. Flips: A8. Effort: M.
23. **Turn remaining slogan H2s into questions** — `content/projects/*.md` ("Architecture at a glance", "End-to-end execution flow", "Stack, APIs, and orchestration"). Flips: A2. Effort: M.
24. **Wrap the route in one `<main>` and drop the nested one** — `src/pages/ProjectDetailsPage.tsx` (plain `div` today) and `src/components/Projects/ProjectDetails.tsx:188`. Flips: S7. Effort: S.

---

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

---

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

---

## Blog index — `/blog`

**AEO 1.5/10 · SEO 5.5/10**

`/blog` is a real prerendered hub, not a homepage soft-404, but it is a thin card grid (~699 words) with slogan headings and no Blog or CollectionPage schema. Category pills and pagination are `<button>`s, so crawlers see nine cards plus six category blurbs and cannot walk the rest of the 382-post library from this URL. Title and description are unique but short; `index.html` still ships homepage `og:*` and description tags first.

### Where the points went

| Dim | Pass | Evidence |
|-----|------|----------|
| A1 | ❌ | Hero is a slogan plus generic blurb, not an answer capsule (`src/pages/BlogPage.tsx:177`, `src/pages/BlogPage.tsx:186`) |
| A2 | ❌ | H1 is "Insights & Innovations"; H2 is "Latest Articles" (`src/pages/BlogPage.tsx:177`, `src/pages/BlogPage.tsx:294`) |
| A3 | ❌ | No visible FAQ on the hub (`src/pages/BlogPage.tsx:162-381`) |
| A4 | ❌ | JSON-LD is BreadcrumbList only (`src/pages/BlogPage.tsx:138-160`) |
| A5 | ❌ | No Blog / CollectionPage / ItemList; global ProfessionalService only (`src/pages/BlogPage.tsx:138`, `src/App.tsx:143`) |
| A6 | ❌ | Breadcrumb items are plain URLs, not `@id`-linked to `#organization` or a Person with sameAs (`src/pages/BlogPage.tsx:141-159`) |
| A7 | ⚠️ | Half: CATEGORY_META names n8n, MCP, Cursor, Claude Code; the hero does not (`src/pages/BlogPage.tsx:30-38`, `src/pages/BlogPage.tsx:186`) |
| A8 | ❌ | No dated, sourced claim; counts are unattributed badges (`src/pages/BlogPage.tsx:210`, `src/pages/BlogPage.tsx:276`) |
| A9 | ❌ | No `dateModified` in schema; `/blog` lastmod is generate-time `today` (`src/pages/BlogPage.tsx:138-160`, `scripts/generate-sitemap.mjs:111-114`) |
| A10 | ✅ | Live `/blog` HTML is the hub (~699 words), not the homepage shell (`src/pages/BlogPage.tsx:123`, `public/sitemap.xml:22`) |
| S1 | ⚠️ | Half: unique `AI & Automation Blog \| Will Spurlock` is ~36 chars (`src/pages/BlogPage.tsx:134`, `src/components/seo/MetaTags.tsx:19`) |
| S2 | ⚠️ | Half: unique description ~131 chars, under the 140–160 band (`src/pages/BlogPage.tsx:135`) |
| S3 | ❌ | MetaTags emits no canonical (`src/components/seo/MetaTags.tsx:22-38`, `src/pages/BlogPage.tsx:133-137`) |
| S4 | ✅ | `/blog` is in the sitemap and returns hub HTML, not a homepage 200 (`public/sitemap.xml:22`, `src/App.tsx:278`) |
| S5 | ⚠️ | Half: listed with lastmod `2026-08-07`, stale vs later August posts (`public/sitemap.xml:22-25`, `scripts/generate-sitemap.mjs:105-114`) |
| S6 | ✅ | `/blog` is prerendered from the sitemap (`scripts/prerender.mjs:147-152`, `public/sitemap.xml:22`) |
| S7 | ✅ | One H1, then H2 / H3 / H4 in order (`src/pages/BlogPage.tsx:170`, `src/pages/BlogPage.tsx:293`, `src/pages/BlogPage.tsx:333`) |
| S8 | ⚠️ | Half: category cards are `<Link>`; pills and pagination are `<button>` (`src/pages/BlogPage.tsx:197`, `src/pages/BlogPage.tsx:350`, `src/components/Blog/BlogGrid.tsx:272`) |
| S9 | ⚠️ | Half: card `alt={post.title}`; no width, height, or loading (`src/components/Blog/BlogGrid.tsx:213-217`) |
| S10 | ❌ | `index.html` homepage description/og/twitter remain first (`index.html:17-32`, `src/pages/BlogPage.tsx:133`) |

### 20-25 fixes to reach 9/10

1. **Write a hub answer capsule** — Replace the slogan paragraph in `src/pages/BlogPage.tsx` with 2–3 sentences naming what the blog covers (AI visibility, automation, agents, coding tools), the live post count from `BlogManager`, and who it is for. Flips: A1. Effort: S.
2. **Make headings question-shaped** — Change the single H1 and the "Latest Articles" H2 in `src/pages/BlogPage.tsx` to questions (e.g. "What does this blog cover?"); do not add a second H1. Flips: A2. Effort: S.
3. **Add a visible FAQ block** — Render 4–6 visible Q/A pairs on `src/pages/BlogPage.tsx` (what is covered, how often it publishes, how to browse by topic, how to start). Flips: A3. Effort: M.
4. **Emit matching FAQPage JSON-LD** — Add FAQPage beside the existing BreadcrumbList in `src/pages/BlogPage.tsx`, copying the visible questions verbatim. Flips: A4. Effort: S.
5. **Add CollectionPage + ItemList** — Lift the page-1 posts out of `src/components/Blog/BlogGrid.tsx` `useEffect` into `src/pages/BlogPage.tsx` via `BlogManager.getAllBlogPosts()` and emit CollectionPage + ItemList (name, url, datePublished, position). Flips: A5. Effort: M.
6. **Depends: G12** — Collapse hub JSON-LD in `src/pages/BlogPage.tsx` into one `@graph` `@id`-linked to `https://williamspurlock.com/#organization` and a Person with sameAs. Flips: A6. Effort: M.
7. **Name concrete entities in the intro** — Put n8n, MCP, ChatGPT, Perplexity, and Cursor in the capsule in `src/pages/BlogPage.tsx`, not only inside `CATEGORY_META`. Flips: A7. Effort: S.
8. **Add one dated, sourced count** — Show "382 published posts as of YYYY-MM-DD, counted from `content/blog/`" (exclude `template.md`) in `src/pages/BlogPage.tsx`, with the date from the newest `publishedAt`. Flips: A8. Effort: S.
9. **Wire hub freshness** — Set CollectionPage `dateModified` from the newest post in `src/pages/BlogPage.tsx`; set `/blog` `<lastmod>` from that same date in `scripts/generate-sitemap.mjs` instead of generate-time `today`. Flips: A9, S5. Effort: S.
10. **Depends: G3** — Emit an absolute self-referential canonical for `https://williamspurlock.com/blog` from `src/components/seo/MetaTags.tsx` using the `url` already passed in `src/pages/BlogPage.tsx`. Flips: S3. Effort: S.
11. **Size the title to 50–60 characters** — Pass a ~40-character unique title from `src/pages/BlogPage.tsx` so `src/components/seo/MetaTags.tsx` suffix yields 50–60 chars and does not double the brand. Flips: S1. Effort: S.
12. **Resize the meta description** — Rewrite the `description` in `src/pages/BlogPage.tsx` to 140–160 characters naming topics and publish cadence. Flips: S2. Effort: S.
13. **Depends: G2** — Remove the hardcoded homepage title/description/og/twitter block from `index.html` so the hub tags are first. Flips: S10. Effort: S.
14. **Turn category pills into links** — Replace the `<button>` pills in `src/pages/BlogPage.tsx` with `<Link to={/blog/category/${categoryToSlug(category)}}>`. Flips: S8. Effort: S.
15. **Turn pagination into links** — Replace page `<button>`s in `src/components/Blog/BlogGrid.tsx` with `<Link to={`${location.pathname}?page=${n}`}>` (omit `page` on page 1). Flips: S8. Effort: S.
16. **Fix card image attributes** — Add width, height, `loading="lazy"`, and a WebP/AVIF `src` (or `srcSet`) on cover `<img>` tags in `src/components/Blog/BlogGrid.tsx`. Flips: S9. Effort: M.
17. **Align the six pills with live frontmatter** — Map `AI Visibility`, `AI Automation`, and `AI Agents` in `src/data/blogData/categories.ts` `CATEGORY_MIGRATION_MAP`, or add those buckets to `INITIAL_CATEGORIES` and `CATEGORY_META` in `src/pages/BlogPage.tsx`, so pill filters match 2026 posts. Flips: A7, S8. Effort: M.
18. **Add a crawlable recent-answers list** — Render 8–10 latest post titles as `<Link to={/blog/${slug}}>` above the grid in `src/pages/BlogPage.tsx`. Flips: S8, A1. Effort: S.
19. **Depends: G1** — Enumerate `/blog/category/*` (and tags you keep indexable) in `scripts/generate-sitemap.mjs` so hub category links stop resolving to homepage HTML. Flips: S8. Effort: M.
20. **Depends: G14** — Generate RSS in a new `scripts/generate-rss.mjs` and add `<link rel="alternate" type="application/rss+xml">` from `src/pages/BlogPage.tsx`. Flips: A9, S8. Effort: M.
21. **Replace the dead search box** — `searchQuery` in `src/pages/BlogPage.tsx` is never passed to `BlogGrid`; make it a GET form to `/blog?q=` handled in `src/components/Blog/BlogGrid.tsx`, or delete the input. Flips: S8. Effort: S.
22. **Noindex paginated hub URLs** — After page links exist, emit `noindex,follow` from `src/pages/BlogPage.tsx` when `?page=` > 1, and keep only `/blog` in `scripts/generate-sitemap.mjs`. Flips: S5. Effort: S.

---

## Blog post template — `/blog/:slug`

**AEO 7.5/10 · SEO 4.0/10**

This template is the strongest AEO surface on the site: answer-first openings, question-shaped H2s, visible `### …?` FAQ headings with matching FAQPage, BlogPosting, entity `mentions`, and heading `id`s for passage links. SEO is dragged down by a second markdown H1 on 359 posts, two Helmet blocks plus leftover `index.html` tags (scrapers unfurl the homepage), and a non-slash canonical that fights the 307. Freshness is machine-readable when `lastModified` exists; 31 posts silently reuse `datePublished`.

### Where the points went

| Dim | Pass | Evidence |
|-----|------|----------|
| A1 | ✅ | 2026 posts open with a direct answer in the first two paragraphs (`content/blog/2026/06/what-is-ai-automation-a-plain-english-guide-for-business-owners.md:57-61`, `content/blog/2026/07/how-to-get-perplexity-to-cite-your-website-as-a-source.md:58-62`) |
| A2 | ✅ | Body H2s are questions, not slogans (`content/blog/2026/07/how-to-get-perplexity-to-cite-your-website-as-a-source.md:66`, `content/blog/2026/06/what-is-ai-automation-a-plain-english-guide-for-business-owners.md:67`) |
| A3 | ✅ | FAQ-shaped `### …?` headings are visible in the article body (`src/components/Blog/BlogPost.tsx:174-178`, `content/blog/2026/07/how-to-get-perplexity-to-cite-your-website-as-a-source.md:270`) |
| A4 | ✅ | FAQPage emits when 2+ `###` questions match the visible headings (`src/components/Blog/BlogPost.tsx:194-207`) |
| A5 | ✅ | BlogPosting is the primary type beyond global ProfessionalService (`src/components/Blog/BlogPost.tsx:133-163`, `src/App.tsx:84-86`) |
| A6 | ❌ | Author/publisher are nested objects with no `@id` or sameAs; four separate scripts (`src/components/Blog/BlogPost.tsx:141-153`, `src/pages/BlogPostPage.tsx:72-106`, `src/App.tsx:143`) |
| A7 | ✅ | `entityMentions` become schema `mentions` Things (`src/data/blogData/blogLoader.ts:228`, `src/components/Blog/BlogPost.tsx:167-171`) |
| A8 | ❌ | Quantified claims lack date+source (e.g. 500 automations, 60 hours, $80/month) (`content/blog/2026/06/what-is-ai-automation-a-plain-english-guide-for-business-owners.md:59-63`) |
| A9 | ⚠️ | Half: `datePublished`/`dateModified` always emit; 31 posts have no `lastModified` so modified === published (`src/data/blogData/blogLoader.ts:178-179`, `src/components/Blog/BlogPost.tsx:139-140`) |
| A10 | ✅ | Marked+DOMPurify HTML, heading `id`s, and JSON-LD ship in prerendered post HTML (`src/components/Blog/BlogPost.tsx:68-76`, `src/components/Blog/BlogPost.tsx:394-399`) |
| S1 | ⚠️ | Half: unique titles exist, but MetaTags appends ` \| Will Spurlock` on top of `seoTitle` that already brands (`src/pages/BlogPostPage.tsx:100`, `src/components/seo/MetaTags.tsx:19`, `src/data/blogData/blogLoader.ts:212`) |
| S2 | ⚠️ | Half: `seoDescription` exists but MetaTags sends `post.excerpt` (`src/pages/BlogPostPage.tsx:101`, `src/data/blogData/blogLoader.ts:213`) |
| S3 | ❌ | Helmet canonical is the non-slash URL; the server 307s to `/blog/<slug>/` (`src/components/Blog/BlogPost.tsx:255`, `src/pages/BlogPostPage.tsx:103`) |
| S4 | ⚠️ | Half: known prerendered slugs are 200; unknown slugs `navigate('/blog')` and 18 August slugs serve homepage HTML (`src/pages/BlogPostPage.tsx:45-48`) |
| S5 | ⚠️ | Half: 364/382 slugs in `public/sitemap.xml`; lastmod from frontmatter; 18 August slugs omitted (`scripts/generate-sitemap.mjs:120-127`) |
| S6 | ⚠️ | Half: prerender route list is the sitemap, so missing slugs get the SPA homepage (`scripts/prerender.mjs:147-152`) |
| S7 | ❌ | Template H1 plus 359 bodies that open with `# ` (`src/components/Blog/BlogPost.tsx:293-304`, `src/components/Blog/BlogPost.tsx:68-76`) |
| S8 | ✅ | Category, related-post, back, and TOC `#id` anchors are crawlable `<a href>` (`src/components/Blog/BlogPost.tsx:331-337`, `src/components/Blog/BlogPost.tsx:445-447`, `src/components/Blog/BlogPost.tsx:372-375`) |
| S9 | ⚠️ | Half: cover/related/avatar have `alt`; no width, height, or loading; covers are PNG (`src/components/Blog/BlogPost.tsx:268-272`, `src/components/Blog/BlogPost.tsx:452-456`) |
| S10 | ❌ | `index.html` leftovers + MetaTags + BlogPost Helmet duplicate title, description, and og/twitter (`index.html:17-32`, `src/pages/BlogPostPage.tsx:99-105`, `src/components/Blog/BlogPost.tsx:226-264`) |

### 20-25 fixes to reach 9/10

1. **Strip the body H1** — Drop a leading `# ` heading in `src/data/blogData/blogLoader.ts` after parse (or skip `depth === 1` in the heading renderer in `src/components/Blog/BlogPost.tsx`) so the template H1 is the only one. Flips: S7. Effort: M.
2. **Delete the second Helmet** — Remove the `<Helmet>` block from `src/components/Blog/BlogPost.tsx` and keep a single `MetaTags` in `src/pages/BlogPostPage.tsx`. Flips: S10, S1. Effort: M.
3. **Pass seo fields, not excerpt** — In `src/pages/BlogPostPage.tsx`, set `title={post.seo.title}` and `description={post.seo.description \|\| post.excerpt}`. Flips: S1, S2. Effort: S.
4. **Stop double-brand titles** — In `src/components/seo/MetaTags.tsx`, skip the ` \| Will Spurlock` suffix when `title` already contains that brand; in `src/data/blogData/blogLoader.ts` stop defaulting `seo.title` to `` `${title} | William Spurlock` ``. Flips: S1. Effort: S.
5. **Depends: G2** — Strip the hardcoded homepage head from `index.html` so the first title/description/og tags are the post's. Flips: S10. Effort: S.
6. **Depends: G3** — Emit canonical from `src/components/seo/MetaTags.tsx` using the post `url` passed by `src/pages/BlogPostPage.tsx`. Flips: S3. Effort: S.
7. **Depends: G9** — 301-normalize trailing slashes so the canonical and the served URL are the same form (today Helmet points at `/blog/${slug}` while the host 307s to the slash form). Flips: S3. Effort: M.
8. **Join four JSON-LD scripts into one @graph** — Merge BlogPosting (`src/components/Blog/BlogPost.tsx:258`), FAQPage (`src/components/Blog/BlogPost.tsx:262`), BreadcrumbList (`src/pages/BlogPostPage.tsx:106`), and stop adding a fourth sibling script; output one `@graph` via `src/components/seo/JsonLd.tsx`. Flips: A6. Effort: M.
9. **Depends: G12** — `@id`-link `publisher` to `https://williamspurlock.com/#organization` and emit a Person with `sameAs` from `DEFAULT_AUTHOR.social` in `src/data/blogData/blogLoader.ts`. Flips: A6. Effort: M.
10. **Honor frontmatter canonicals** — Add `canonicalUrl` / `canonical_url` to `pick()` in `src/data/blogData/blogLoader.ts` and pass that URL into `MetaTags` (today `seo.canonicalUrl` is always computed and the two frontmatter keys are ignored). Flips: S3. Effort: S.
11. **Fill dateModified from lastModified** — Require `lastModified` in `scripts/validate-blog-frontmatter.mjs`; keep `dateModified: post.updatedAt \|\| post.publishedAt` in `src/components/Blog/BlogPost.tsx` once the 31 missing files are dated. Flips: A9. Effort: M.
12. **Keep passage IDs; stop stripping useful attrs** — Heading `id`s already survive (`src/components/Blog/BlogPost.tsx:73`, `ADD_ATTR` includes `id`). Add `loading`, `srcset`, `sizes`, `aria-label`, and `rel` to `DOMPurify.sanitize` in `src/components/Blog/BlogPost.tsx` so markdown images and permalinks stay intact. Flips: S9. Effort: S.
13. **Dimension every image** — Set width, height, and `loading` on the cover, author avatar, and related-post images in `src/components/Blog/BlogPost.tsx`. Flips: S9. Effort: M.
14. **Depends: G1** — Add the 18 missing `content/blog/2026/08/` slugs in `scripts/generate-sitemap.mjs` so `scripts/prerender.mjs` builds their HTML. Flips: S5, S6. Effort: S.
15. **Stop the soft-404 redirect** — Replace `navigate('/blog', { replace: true })` in `src/pages/BlogPostPage.tsx` with the real 404 route (unknown slugs must not 200 as the hub). Flips: S4. Effort: S.
16. **Add a visible date+source citation** — Render a small "Sources" list in `src/components/Blog/BlogPost.tsx` from a new optional `sources: [{claim, date, url}]` frontmatter field parsed in `src/data/blogData/blogLoader.ts`. Flips: A8. Effort: M.
17. **Promote Related Posts to H2** — Change the Related Posts heading in `src/components/Blog/BlogPost.tsx` from `h3` to `h2` so the outline does not skip when the body ends on an H2. Flips: S7. Effort: S.
18. **Point og:image at a 1200×630 card** — Pass a landscape derivative of `coverImage` (not the default 1522×1874 headshot) as `image` from `src/pages/BlogPostPage.tsx` into `src/components/seo/MetaTags.tsx`. Flips: S9. Effort: M.
19. **Tighten frontmatter validation** — In `scripts/validate-blog-frontmatter.mjs`, require `lastModified` and `seoDescription`, and treat unused `canonicalUrl` as valid only after `blogLoader.ts` reads it. Flips: A9, S2. Effort: S.
20. **Use `<time dateTime>`** — Wrap published and updated dates in `src/components/Blog/BlogPost.tsx` with `<time dateTime={post.publishedAt}>` / `post.updatedAt`. Flips: A9. Effort: S.
21. **Give mentions real identities** — Map known `entityMentions` in `src/components/Blog/BlogPost.tsx` to Thing/Organization entries with `sameAs` (or `@id`) instead of bare `{@type: Thing, name}`. Flips: A6. Effort: M.
22. **Keep article:* meta on the surviving head** — After deleting the BlogPost Helmet, add optional `publishedTime` / `modifiedTime` / `author` props on `src/components/seo/MetaTags.tsx` and pass them from `src/pages/BlogPostPage.tsx`. Flips: S10. Effort: S.
23. **Fail the build when lastModified is missing** — If `lastModified` is absent, do not silently omit `updatedAt` in `src/data/blogData/blogLoader.ts`; fail in `scripts/validate-blog-frontmatter.mjs` instead. Flips: A9. Effort: S.

---

## Category and tag archives — `/blog/category/:categorySlug` · `/blog/tag/:tagSlug`

**AEO 0/10 · SEO 0/10**

Both taxonomy types are routed in `src/App.tsx` and then omitted from `public/sitemap.xml`, so Cloudflare's SPA fallback serves homepage HTML (HTTP 200) with the homepage title. The category branch can filter and retitle after JavaScript runs; the tag branch destructures `tagSlug` and never uses it, so it would render the unfiltered `/blog` grid even if prerendered. Until these URLs serve their own HTML, every AEO and SEO dimension fails.

### Where the points went

| Dim | Pass | Evidence |
|-----|------|----------|
| A1 | ❌ | Served HTML is the homepage capsule, not a category/tag intro (`src/App.tsx:269-273`, `src/pages/BlogPage.tsx:186`) |
| A2 | ❌ | Homepage H1 is served; in-app category H1 is the bucket name, not a question (`src/pages/BlogPage.tsx:177`) |
| A3 | ❌ | No taxonomy FAQ; homepage FAQ is not this URL's (`src/pages/BlogPage.tsx:162-381`) |
| A4 | ❌ | No FAQPage on category/tag; only BreadcrumbList after hydrate (`src/pages/BlogPage.tsx:138-160`) |
| A5 | ❌ | No CollectionPage / ItemList; live HTML is homepage ProfessionalService + WebSite (`src/App.tsx:143`, `src/pages/BlogPage.tsx:138`) |
| A6 | ❌ | No `@id` graph for the term; breadcrumbs omit tags entirely (`src/pages/BlogPage.tsx:154-159`) |
| A7 | ❌ | Homepage entities, not term-specific names; `CATEGORY_META` never reaches static HTML (`src/pages/BlogPage.tsx:24-59`) |
| A8 | ❌ | No dated, sourced claim on the served document |
| A9 | ❌ | Category/tag URLs are absent from the sitemap, so no lastmod (`scripts/generate-sitemap.mjs:18-25`, `scripts/generate-sitemap.mjs:120-127`) |
| A10 | ❌ | Live `/blog/category/ai-visibility/` and `/blog/tag/aeo/` return homepage HTML (`scripts/prerender.mjs:147-152`) |
| S1 | ❌ | First title is the homepage title from `index.html` (`index.html:17`, `src/pages/BlogPage.tsx:134`) |
| S2 | ❌ | First description is the homepage description (`index.html:18`, `src/pages/BlogPage.tsx:135`) |
| S3 | ❌ | No canonical; MetaTags cannot emit one (`src/components/seo/MetaTags.tsx:22-38`) |
| S4 | ❌ | Soft-404: HTTP 200 homepage body for every category and tag URL |
| S5 | ❌ | Zero `/blog/category/*` or `/blog/tag/*` locs in `public/sitemap.xml` (`scripts/generate-sitemap.mjs:18-25`) |
| S6 | ❌ | Prerender reads only sitemap routes, so these URLs never get HTML (`scripts/prerender.mjs:147-152`) |
| S7 | ❌ | Served H1 is the homepage H1, not the term (`src/pages/BlogPage.tsx:177`) |
| S8 | ❌ | Served links are homepage links; in-app pills are `<button>`s (`src/pages/BlogPage.tsx:197-223`) |
| S9 | ❌ | Served images are homepage assets, not the archive grid (`src/components/Blog/BlogGrid.tsx:213-217`) |
| S10 | ❌ | Homepage head tags win; tag type reuses the all-posts title (`index.html:17-32`, `src/pages/BlogPage.tsx:84-96`) |

### 20-25 fixes to reach 9/10

1. **Depends: G1** — Emit every indexable `/blog/category/{slug}` and `/blog/tag/{slug}` from `scripts/generate-sitemap.mjs` so `scripts/prerender.mjs` builds them. Flips: S5, S6, A10. Effort: M.
2. **Depends: G8** — Drop the SPA fallback and serve a real 404 for unknown category/tag slugs instead of homepage HTML. Flips: S4. Effort: M.
3. **Depends: G2** — Remove hardcoded homepage tags from `index.html` so taxonomy MetaTags can be first. Flips: S10. Effort: S.
4. **Depends: G3** — Canonical per term from `src/components/seo/MetaTags.tsx` using the `url` already branched for categories in `src/pages/BlogPage.tsx`. Flips: S3. Effort: S.
5. **Depends: G16** — Make prerender wait for Helmet so category/tag titles are in the static file, not the homepage shell. Flips: S1, S6. Effort: M.
6. **Filter the tag route** — `tagSlug` is read and discarded (`src/pages/BlogPage.tsx:84-96`). Add `getBlogPostsByTag(tag)` on `src/data/blogData/BlogManager.ts`, add a `tag` prop to `src/components/Blog/BlogGrid.tsx`, and pass `tagSlug` when `type === 'tag'`. Flips: S4, A10. Effort: M.
7. **Give tags their own title and description** — Branch `MetaTags` in `src/pages/BlogPage.tsx` on `type === 'tag'` (today only `activeCategory` changes title/description/url). Target ~50–60 char titles and 140–160 char descriptions. Flips: S1, S2. Effort: S.
8. **Write a unique intro per term** — Expand `CATEGORY_META` in `src/pages/BlogPage.tsx` to 80–120 words that answer "what is in this category?"; for tags, generate one paragraph from the tag name plus the three newest excerpts. Flips: A1. Effort: M.
9. **Question-shaped archive H1** — Change `src/pages/BlogPage.tsx` H1 from the bare category name to a question (e.g. "What is filed under AI Visibility?"). Flips: A2. Effort: S.
10. **Add a visible archive FAQ** — Three visible Qs on `src/pages/BlogPage.tsx` when `type` is `category` or `tag` (what this term means, how many posts, what to read first). Flips: A3. Effort: S.
11. **Emit matching FAQPage** — Add FAQPage JSON-LD in `src/pages/BlogPage.tsx` that copies those three questions. Flips: A4. Effort: S.
12. **Add CollectionPage + ItemList** — Schema the filtered list in `src/pages/BlogPage.tsx` (not BreadcrumbList alone) with `itemListElement` urls from `BlogManager`. Flips: A5. Effort: M.
13. **Link the archive graph to #organization** — One `@graph` in `src/pages/BlogPage.tsx` with CollectionPage `@id` pointing at `https://williamspurlock.com/#organization` and a Person with sameAs. Flips: A6. Effort: M.
14. **Name entities in the intro** — Category copy must name the tools and products in that bucket (n8n, MCP, ChatGPT, Cursor) in `src/pages/BlogPage.tsx` `CATEGORY_META`. Flips: A7. Effort: S.
15. **Date and source the post count** — Show "{n} posts as of {newest publishedAt}, counted from `content/blog` frontmatter" on `src/pages/BlogPage.tsx`. Flips: A8. Effort: S.
16. **Set dateModified from the newest post in the set** — CollectionPage `dateModified` in `src/pages/BlogPage.tsx`; matching `<lastmod>` in `scripts/generate-sitemap.mjs`. Flips: A9, S5. Effort: S.
17. **Noindex thin tags** — If `getBlogPostsByTag` returns fewer than 3 posts, set `robots` to `noindex,follow` from `src/pages/BlogPage.tsx` and omit that tag from `scripts/generate-sitemap.mjs`. Thicken a tag only when it is a real cluster (aeo, n8n, geo). Flips: S4. Effort: M.
18. **Map live categories into the six buckets** — Add `AI Visibility`, `AI Automation`, and `AI Agents` to `CATEGORY_MIGRATION_MAP` in `src/data/blogData/categories.ts` (or add them to `INITIAL_CATEGORIES`) so `/blog/category/ai-visibility/` does not title-case to "Ai Visibility" via `slugToCategoryName` in `src/pages/BlogPage.tsx`. Flips: S1, S7. Effort: M.
19. **Fix tag breadcrumbs** — `src/pages/BlogPage.tsx` only appends a third crumb when `activeCategory` is set; add a Tag crumb and a `url` of `/blog/tag/${tagSlug}`. Flips: A5, A6. Effort: S.
20. **Turn pills and pagination into links** — `<Link>` pills in `src/pages/BlogPage.tsx` and `<Link>` page controls in `src/components/Blog/BlogGrid.tsx` so archives interlink after they are prerendered. Flips: S8. Effort: S.
21. **Fix grid images on archives** — width, height, `loading="lazy"`, and WebP/AVIF on `src/components/Blog/BlogGrid.tsx` cards (same grid both archive types use). Flips: S9. Effort: M.
22. **One H1, matching the term** — Keep the template H1 as the only H1 in `src/pages/BlogPage.tsx`; demote the category hero heading (`src/pages/BlogPage.tsx:269`) from `h2` duplicate-name to a paragraph so the outline does not repeat the term. Flips: S7. Effort: S.

---

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

---

## Pillar posts — top 20 by authority

**Set average: AEO 8.1/10 · SEO 5.75/10**

Template-level schema is the same on every post, so the gap is the writing: a two-sentence answer, question-shaped H2s, and a number that carries both a date and a source URL. The weak pillars open with a hook or a resume line, keep H2s as topic labels, and leave the big numbers unsourced — `n8n-mcp-guide` earns a top-20 slot yet scores 3/10, the worst AEO in this set, because the answer capsule and the AIO frontmatter are both missing. Authority is inbound, not the `pillarPost` flag: eight of these twenty are `false` or unset. Every row already loses S3 and S10 to the shared canonical/head defects (G9 / G2 — scored once, not re-litigated below); 19 of 20 also lose S7 to a body `# ` H1 (G-blog); none of this twenty sit in the 18 unsitemapped `content/blog/2026/08/` URLs.

**Ranking commands** (382 files; body = text after the closing `---`; inbound = `](/blog/<slug>)` in other posts only; tie-break = word count, then title `/(playbook|guide|complete|ultimate|framework|handbook|explained|how to|2026)/i`):

```bash
find content/blog -name '*.md' ! -name 'template.md' | wc -l
rg -o '\]\(/blog/[a-z0-9%-]+\)' content/blog --glob '!template.md' | sed 's/](\/blog\///;s/)//' | sort | uniq -c | sort -nr
comm -12 <(find content/blog/2026/08 -name '*.md' -exec basename {} .md \; | sort) \
         <(rg -o '/blog/[a-z0-9%-]+' public/sitemap.xml | sed 's#/blog/##' | sort -u)
# plus a read-only python3 pass that splits frontmatter, counts body words with str.split(),
# tallies inbound excluding self-links, and sorts -inbound, -words, -guide
```

### Scorecard

| Rank | Slug | Words | Inbound | AEO | SEO | Weakest dims |
|------|------|------:|--------:|----:|----:|--------------|
| 1 | mcp-architecture-guide | 14728 | 38 | 7 | 5.5 | A1, A2, S8 |
| 2 | what-is-ai-automation-a-plain-english-guide-for-business-owners | 4473 | 27 | 9 | 6 | A8, S1, S7 |
| 3 | n8n-claude-3-5-sonnet-production-agent-tutorial | 3396 | 25 | 7 | 5 | A1, S8, S7 |
| 4 | complete-ai-coding-assistant-showdown | 9627 | 22 | 7 | 6.5 | A1, A5, A8 |
| 5 | claude-3-5-sonnet-artifacts-launch | 2730 | 22 | 8 | 6.5 | A2, A8, S7 |
| 6 | did-google-ai-overviews-cause-your-traffic-drop-how-to-tell | 4928 | 21 | 8.5 | 7 | A8, A2, S7 |
| 7 | n8n-mcp-guide | 3329 | 21 | 3 | 5 | A6, A10, S8 |
| 8 | geo-vs-seo-what-actually-changes-in-how-you-create-content | 4811 | 20 | 9 | 6.5 | A8, S1, S7 |
| 9 | n8n-vs-make-vs-zapier-in-2026-which-automation-tool-is-right-for-your-business | 8250 | 19 | 9 | 5 | A1, S1, S8 |
| 10 | how-to-measure-ai-visibility-the-metrics-that-actually-matter-in-2026 | 4938 | 19 | 8 | 5.5 | A1, S2, S7 |
| 11 | anthropic-mcp-launch-model-context-protocol | 6728 | 18 | 8 | 5 | A1, S1, S2 |
| 12 | how-structured-data-helps-ai-understand-and-cite-your-business | 6052 | 18 | 9 | 6 | A8, S7, S8 |
| 13 | how-to-talk-to-ai-prompt-engineering-guide | 5996 | 18 | 7.5 | 5 | A2, S1, S2 |
| 14 | is-seo-dead-what-still-works-and-what-doesn-t-in-the-ai-era | 2831 | 18 | 9 | 6.5 | A8, S1, S7 |
| 15 | immersive-web-design-manual | 13012 | 17 | 8 | 5 | A2, A8, S8 |
| 16 | what-is-an-ai-agent-a-business-owner-s-guide-to-autonomous-ai | 10719 | 17 | 10 | 5 | S1, S8, S7 |
| 17 | gpt-4o-launch-openai-omni-model-free-tier | 8184 | 17 | 8 | 5.5 | A2, A8, S1 |
| 18 | the-overlap-between-seo-and-ai-visibility-and-where-they-split | 4404 | 17 | 10 | 6 | S7, S8, S3 |
| 19 | context-engineering-vs-prompt-engineering | 5664 | 16 | 8 | 6.5 | A2, A8, S7 |
| 20 | the-ai-visibility-content-strategy-writing-for-humans-and-answer-engines | 5523 | 16 | 9 | 6 | A8, S1, S7 |

**What `Inbound` counts.** The column is **total markdown link occurrences** pointing at that slug from other posts, not unique referring posts. Independently reconciled — all 20 values match a total-occurrence count exactly. The two metrics diverge sharply on some rows, and the unique-referrer figure is the better authority signal:

| Rank | Slug | Inbound (occurrences) | Unique referring posts |
|---|---|---:|---:|
| 1 | `mcp-architecture-guide` | 38 | 29 |
| 3 | `n8n-claude-3-5-sonnet-production-agent-tutorial` | 25 | 23 |
| 6 | `did-google-ai-overviews-cause-your-traffic-drop-how-to-tell` | 21 | 12 |
| 7 | `n8n-mcp-guide` | 21 | 9 |
| 14 | `is-seo-dead-what-still-works-and-what-doesn-t-in-the-ai-era` | 18 | 8 |
| 18 | `the-overlap-between-seo-and-ai-visibility-and-where-they-split` | 17 | 10 |

Read the ranking as "most-linked-to," not "linked from the most distinct pages." Ranks 6, 7, 14, and 18 are inflated by repeat links from a handful of sources; `mcp-architecture-guide` and the n8n Claude tutorial hold up on both measures.

S1 halves: titles at 61–65 chars. S2 halves: descriptions at 137 or 162–165. A2 half on the traffic-drop post: three real question H2s plus three leftover `[Question-shaped H2 #n]` stubs. A1 half on the prompt guide: the TOC-skip opening names the problem, not the method. `mcp-architecture-guide` is the only row that passes S7 (no body `# ` H1; the `#` lines later sit inside a bash fence).

### Top 8 deep read

**mcp-architecture-guide**
> "I build AI automations for a living, and Model Context Protocol (MCP) has become my go-to standard for connecting AI agents to external tools, data sources, and workflows." "When Anthropic introduced MCP on November 25, 2024, then donated it to the Linux Foundation's Agentic AI Foundation in December 2025, it cemented itself as the interoperability layer I rely on for production AI agent ecosystems."
Verdict: does not answer the title query (how he prompted a production MCP server in 20 minutes).
Question H2s: 0 · Table: yes · Sourced-stat: yes · Outbound `/blog/`: 2

**what-is-ai-automation-a-plain-english-guide-for-business-owners**
> "AI automation is what happens when you wire an AI model — something like GPT-4o or Claude Sonnet — into a repeatable business process so it can make decisions, generate output, or take actions without a human doing the work every time." "I'm William Spurlock, an AI Solutions Architect and Fractional AI CTO."
Verdict: first sentence answers; second is identity, not the definition.
Question H2s: 4 · Table: yes · Sourced-stat: no · Outbound `/blog/`: 6

**n8n-claude-3-5-sonnet-production-agent-tutorial**
> "Claude 3.5 Sonnet is now available, and it's already reshaping what AI agents can accomplish." "In this tutorial, I'll show you how to build a production-ready agent template using n8n and the newly released Anthropic model — complete with error handling, tool integration, and real-world deployment patterns."
Verdict: tease, not an answer; later H2s are still `*Placeholder:*` and the top FAQ has empty `### Q:` stubs.
Question H2s: 0 · Table: yes · Sourced-stat: no · Outbound `/blog/`: 0

**complete-ai-coding-assistant-showdown**
> "Four tools dominate the AI-assisted development landscape in mid-2026." "Each has carved out distinct territory."
Verdict: does not name the four tools or pick a winner; entities appear only in sentence three.
Question H2s: 4 · Table: yes · Sourced-stat: no · Outbound `/blog/`: 4

**claude-3-5-sonnet-artifacts-launch**
> "Anthropic launched Claude 3.5 Sonnet today alongside Artifacts — a new side-panel workspace that lets Claude show, iterate, and refine its work in real time." "This isn't just a model update."
Verdict: answers the launch query; SWE-bench / MMLU figures have no source URL.
Question H2s: 0 · Table: yes · Sourced-stat: no · Outbound `/blog/`: 3

**did-google-ai-overviews-cause-your-traffic-drop-how-to-tell**
> "Yes — Google AI Overviews can cause a traffic drop even when your rankings look stable, because Google can show your content inside the overview while sending fewer clicks to your site." "The tell is not \"I lost positions.\""
Verdict: answers the implied yes/no and names the diagnostic tell.
Question H2s: 3 (plus 3 unfinished placeholder H2s) · Table: yes · Sourced-stat: no · Outbound `/blog/`: 3

**n8n-mcp-guide**
> "There is a brutal operational truth hiding in plain sight: The AI tools you use daily—Claude, Cursor, GPT—are fundamentally disconnected from the systems that actually run your business." "You can ask Claude to draft a beautiful client proposal."
Verdict: hook only; n8n MCP is not named until paragraph four. No `lastModified`, `entityMentions`, `aioTargetQueries`, or `pillarPost`.
Question H2s: 1 · Table: no · Sourced-stat: no · Outbound `/blog/`: 0

**geo-vs-seo-what-actually-changes-in-how-you-create-content**
> "GEO (Generative Engine Optimization) is the practice of structuring content so AI answer engines — Google AI Overviews, ChatGPT, Perplexity, Claude — can extract, trust, and cite your pages when they synthesize answers." "It does not replace SEO."
Verdict: answers the comparison in two sentences.
Question H2s: 3 · Table: yes · Sourced-stat: no · Outbound `/blog/`: 3

### 20-25 fixes to reach 9/10 across the pillar set

1. **Depends: G2** — Remove the hardcoded homepage `og:*` block in `index.html` so Helmet on `/blog/:slug` is the first title/url a scraper reads. Flips: S10. Effort: S.
2. **Depends: G9** — Make sitemap `<loc>`, prerender path, 301, and `canonicalUrl` in `src/data/blogData/blogLoader.ts:220` all use the same slash form. Flips: S3. Effort: M.
3. **Depends: G-blog** — Demote the leading `# ` title in every pillar file except `content/blog/2026/05/mcp-architecture-guide.md` (already H2-first) so the template `<h1>` is the only H1. Flips: S7. Effort: S.
4. **Add a 40-word how-capsule above the first H2 in mcp-architecture-guide** — In `content/blog/2026/05/mcp-architecture-guide.md`, two sentences that state the 20-minute Cursor prompt path (TypeScript MCP server, tools/resources/prompts) before "What Is Model Context Protocol". Flips: A1. Effort: S.
5. **Rewrite the 12 topic H2s in mcp-architecture-guide as questions** — e.g. "What is Model Context Protocol and why do agents need it?" / "How do you deploy an MCP server in production?". Flips: A2. Effort: M.
6. **Add a third crawlable `/blog/` link in mcp-architecture-guide** — Point descriptive anchors at `n8n-mcp-guide` and `anthropic-mcp-launch-model-context-protocol` (both exist on disk). Flips: S8. Effort: S.
7. **Trim the mcp-architecture-guide seoTitle to 50–60 characters** — Drop the `| William Spurlock` suffix already in frontmatter (`seoTitle` is 67 today). Flips: S1. Effort: S.
8. **Open n8n-claude with the finished agent, not the launch tease** — In `content/blog/2024/06/n8n-claude-3-5-sonnet-production-agent-tutorial.md`, first two sentences: what the email-classification agent does, which n8n nodes, which Claude model string. Fill or delete the empty `### Q:` block and the `*Placeholder:*` H2s at the bottom. Flips: A1, A3, A4. Effort: M.
9. **Add three descriptive `/blog/` links in n8n-claude** — `n8n-vs-make-vs-zapier-in-2026-which-automation-tool-is-right-for-your-business`, `n8n-mcp-guide`, `what-is-an-ai-agent-a-business-owner-s-guide-to-autonomous-ai`. Flips: S8. Effort: S.
10. **Name the four tools in the showdown's first two sentences** — In `content/blog/2026/05/complete-ai-coding-assistant-showdown.md`, open with Cursor / Claude Code / Google Antigravity / OpenAI Codex and the one-line split (IDE vs terminal vs multi-agent vs async). Flips: A1, A5. Effort: S.
11. **Source the $50B / $2B Anysphere line in the showdown** — Same file, Cursor H2: add a dated publisher URL next to the March 2026 valuation. Flips: A8. Effort: S.
12. **Turn artifacts H2s into questions and link the benchmark table** — In `content/blog/2024/06/claude-3-5-sonnet-artifacts-launch.md`, question-shape the six body H2s and hang SWE-bench 56.0% / MMLU 88.7% on Anthropic's 2024-06-20 announcement URL. Flips: A2, A8. Effort: S.
13. **Delete the three stub H2s and the fake H3 in the traffic-drop post** — In `content/blog/2026/06/did-google-ai-overviews-cause-your-traffic-drop-how-to-tell.md`, replace `## [Question-shaped H2 #1]`–`#3` and `### [Real PAA question 1]?` with real questions or remove them. Flips: A2. Effort: S.
14. **Source the 20–40% click-drop claim in the traffic-drop post** — Same file, diagnostic H2: attach a dated Search Console study or publisher URL to that range, or hedge it as a client-sample with a month. Flips: A8. Effort: S.
15. **Give n8n-mcp-guide a definition capsule and the missing AIO fields** — In `content/blog/2026/03/n8n-mcp-guide.md`, open with what n8n-as-MCP-server is; add `lastModified`, `entityMentions` (n8n, MCP, Claude, Cursor), `aioTargetQueries` (4+), `pillarPost: true`; fix author `William S. Purlock`. Flips: A1, A5, A6, A9, A10. Effort: M.
16. **Add three `/blog/` links and one comparison table to n8n-mcp-guide** — Link `mcp-architecture-guide`, `n8n-claude-3-5-sonnet-production-agent-tutorial`, `n8n-vs-make-vs-zapier-in-2026-which-automation-tool-is-right-for-your-business`; add an n8n-MCP vs Custom GPT Actions table. Flips: S8, A2. Effort: S.
17. **Lead n8n-vs-make-vs-zapier with the pick, not the credentials** — In `content/blog/2026/06/n8n-vs-make-vs-zapier-in-2026-which-automation-tool-is-right-for-your-business.md`, two sentences: Zapier for first zaps, Make.com for visual volume, n8n for self-host and agents; add a third unique `/blog/` spoke. Flips: A1, S8. Effort: S.
18. **Add answer capsules to how-to-measure and anthropic-mcp-launch** — `content/blog/2026/06/how-to-measure-ai-visibility-the-metrics-that-actually-matter-in-2026.md`: name Share of Model + citation rate + GSC CTR in sentence one. `content/blog/2024/11/anthropic-mcp-launch-model-context-protocol.md`: how the prompt stack produces a working server, not the launch-day vibe. Flips: A1. Effort: S.
19. **Resize titles and descriptions on the long-meta cluster** — Cut `seoTitle` to 50–60 and `seoDescription` to 140–160 on `what-is-ai-automation-a-plain-english-guide-for-business-owners` (title 83), `n8n-vs-make-vs-zapier-in-2026-which-automation-tool-is-right-for-your-business` (78), `n8n-mcp-guide` (73), `gpt-4o-launch-openai-omni-model-free-tier` (73), `how-to-talk-to-ai-prompt-engineering-guide` (title 67, desc 174), `anthropic-mcp-launch-model-context-protocol` (title 66, desc 128), `how-to-measure-ai-visibility-the-metrics-that-actually-matter-in-2026` (desc 133), `the-ai-visibility-content-strategy-writing-for-humans-and-answer-engines` (title 68). Flips: S1, S2. Effort: S.
20. **Source the 60-hour / $80 pipeline in the AI-automation guide** — In `content/blog/2026/06/what-is-ai-automation-a-plain-english-guide-for-business-owners.md`, attach a month and a public case URL, or mark it as a named client sample with a date. Flips: A8. Effort: S.
21. **Question-shape H2s on the four topic-label pillars** — `how-to-talk-to-ai-prompt-engineering-guide`, `context-engineering-vs-prompt-engineering`, `gpt-4o-launch-openai-omni-model-free-tier`, `immersive-web-design-manual`: convert at least four H2s each to real user questions. Flips: A2. Effort: M.
22. **Add a third unique `/blog/` target on the four thin-outlink pillars** — `immersive-web-design-manual` (2), `how-structured-data-helps-ai-understand-and-cite-your-business` (2 unique), `the-overlap-between-seo-and-ai-visibility-and-where-they-split` (2), `what-is-an-ai-agent-a-business-owner-s-guide-to-autonomous-ai` (2). Flips: S8. Effort: S.
23. **Source the 30% conversion claim in immersive-web-design-manual** — First paragraph of `content/blog/2026/05/immersive-web-design-manual.md`: add the month and a public before/after URL, or drop the number. Flips: A8. Effort: S.
24. **Lengthen the agent-guide seoTitle and source the GEO paper** — `what-is-an-ai-agent-a-business-owner-s-guide-to-autonomous-ai` seoTitle is 39 chars — expand to ~55. In `geo-vs-seo-what-actually-changes-in-how-you-create-content.md`, link the Princeton / Georgia Tech / IIT Delhi GEO paper (2023–2024) next to that sentence. Flips: S1, A8. Effort: S.

---
