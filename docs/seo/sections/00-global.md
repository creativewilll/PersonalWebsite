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
