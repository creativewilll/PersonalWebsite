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
