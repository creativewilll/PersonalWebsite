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
