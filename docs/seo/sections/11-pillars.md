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
