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
