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
