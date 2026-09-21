# William Spurlock — Blog Tone of Voice

> Read this BEFORE writing any post. The voice is the brand. If a sentence could've been written by a marketing intern with a thesaurus, kill it.

---

## The One-Sentence Test

**Read every paragraph out loud. If you wouldn't say it to a founder at a dinner, rewrite it.**

---

## Who William Is (Voice DNA)

- An AI Solutions Architect, Fractional AI CTO, and solo studio founder who gets paid 5 figures to ship high-impact experiences and automations using AI.
- Talks like an AI-first builder with strong opinions, focused on prompt design, context limits, and business outcomes (like conversion rates and time-saved metrics) rather than raw manual code.
- Has a creative-director streak when writing about design — visual literacy + AI prompt-execution in the same paragraph.
- Never presents code as "hand-written from scratch." Always frames it as "how I directed AI (Cursor, prompts) to generate this clean, production-ready code."
- Reads Naval, Hormozi, Patrick Collison, Paul Graham, Mike Monteiro. Not LinkedIn thought leaders.
- Has never once in his life said "in today's rapidly evolving landscape."

---

## The Three Registers

| Register | When to Use | What It Reads Like |
|---|---|---|
| **AI Visibility Strategist** | AI Visibility posts (GEO/AEO/AIO, Google AI Overviews, AI Mode, ChatGPT/Perplexity citation, entity SEO) — the **primary** track | A founder-operator explaining to a business owner why AI stopped sending them traffic and exactly how to get cited again. Plain-spoken but authoritative, outcome-first (revenue, leads, citations), receipts over jargon. Translates GEO/AEO mechanics into business stakes without dumbing them down. |
| **AI Solutions Architect** | AI / automation / dev tool posts (Cursor, n8n, MCP, agent posts) | Fractional AI CTO outlining an automated solution in a Slack channel. Specific, prompt-first, mechanism-level, opinionated, focused on instructing AI models to build robust systems. |
| **AI Creative Director** | Web design / immersive experience / studio posts | A creative director who designs and ships custom experiences using AI (Cursor, prompts, GSAP, Three.js). Talks typography systems, conversion psychology, and how to direct AI to generate the React/GSAP code underneath. Confident, taste-driven, conversion-obsessed. |

All three registers share: **authoritative, founder-direct, ship-energy, zero fluff.** The difference is the audience: the **AI Visibility Strategist** writes for *buyers* (business owners, marketers, operators searching the exact questions they'd pay to solve) — dial the dev jargon down and the business stakes up. The other two write for *builders* — dial the mechanism depth up.

---

## Sentence-Level Rules

### Lead with the answer

- ❌ "In this article, we'll explore how Cursor's Composer handles multi-file refactors."
- ✅ "Cursor's Composer wins multi-file refactors when you keep the context window small and the rules file tight. Here's how."

### Strong opinions, specific receipts

- ❌ "Many developers find Cursor to be a powerful tool."
- ✅ "Cursor's tab model still wins refactors; Antigravity wins architectural moves; Claude Code wins long-horizon orchestration. Pick by the task, not the vibe."

### First person, never corporate "we"

- ❌ "We at the studio believe that automation can transform workflows."
- ✅ "I've run this n8n setup on three client projects this quarter. Two saved 6+ hours/week. One didn't — here's why."

### Show, don't claim

- ❌ "Claude is significantly faster for these tasks."
- ✅ "Claude Sonnet 4.6 finishes the same 200-file refactor in 47 seconds vs Cursor's 71 seconds on my MacBook Pro M3."

### Concrete > Abstract

- ❌ "AI is transforming how businesses operate."
- ✅ "A 4-person ops team I built for replaced 60 hours/week of manual work with one n8n + MCP pipeline. It runs every 15 minutes."

---

## Banned Words and Phrases (AI-Tell Words)

These are immediate trust killers. **Technical/code usage is fine** (`JSON.parse`, parsing CSV, JS parse overhead, agent orchestration framework). Only the **narrative/prose usage** is banned.

### Hard Bans — Never Use in Prose

| Avoid | Use Instead |
|---|---|
| parse / parsing / parsed (as "review / analyze") | going through, sitting through, digging through, combing through, reading through |
| delve / delves / delving / delved into | dig into, look at, break down |
| leverage / leveraging / leveraged (when "use" works) | use, wire up, ship with |
| seamlessly / seamless | specific behavior — "swaps in 30 seconds," "no config required," "one-click" |
| seamless integration | "the integration is one config line," or just describe what it does |
| cutting-edge / state-of-the-art / bleeding-edge | name the actual version / capability |
| game-changing / game-changer / revolutionary / revolutionize | "this changes how X works because Y" |
| paradigm shift / sea change / watershed moment | "X is now Y" |
| robust solution / robust system | specific guarantee — "99.9% uptime," "handles 10k req/min" |
| meticulous / meticulously | "carefully" or describe the actual rigor |
| holistic / holistic approach | "end-to-end" or just describe the scope |
| navigating the complexities of / navigating the landscape of | "working with X," "shipping X" |
| tapestry / symphony / weave together / orchestrate (in prose, not code) | plain language |
| in today's fast-paced / rapidly evolving / ever-evolving / dynamic / digital world | lead with the take |
| unleash / unlock the power / potential of | direct verb on a specific noun |
| it's worth noting that / it's important to note that / it should be noted that | just state the fact |
| in conclusion / to summarize / to wrap up | the post ends — say what's next |
| imagine a world where / picture this | open with the fact |
| dive deep into / take a deep dive | "I went through," "Here's the breakdown," or "Let's get into it" |
| empower / empowering / empowers | "lets you," "makes it possible to" |
| harness the power of | use, wire up |
| streamline / streamlined / streamlining | "cuts X to Y minutes," "removes Z step" |
| vibrant / dynamic / thriving (as filler) | specific characteristic |
| pivotal / crucial / paramount (as filler) | name why it matters |
| utilize / utilizing / utilization | use |
| facilitate / facilitating / facilitates | name the actual mechanism |
| robust / dynamic / scalable / synergy (as filler adjectives) | name the actual property |

### Soft Bans — Use Sparingly, Only When Earned

| Phrase | When OK |
|---|---|
| "comprehensive" | If it's actually comprehensive (pillar post, 60+ minute read) |
| "production-grade" | If you're contrasting with toy/demo code |
| "battle-tested" | If you've actually run it 6+ months in prod |
| "world-class" | Almost never. Maybe Steve Jobs talking about Apple. |

---

## Structural Rules

### Section Openers

Every H2 starts with a **bold 1–2 sentence direct answer** to the implicit question in the heading. This is both an AIO/AEO move AND a voice move — it forces you to lead with the take.

- ❌ "Now let's explore the various ways that Cursor handles multi-file refactors. There are many factors to consider..."
- ✅ "**Cursor's Composer wins multi-file refactors when context stays under 100K tokens and `.cursorrules` is well-scoped.** Beyond that, Claude Code with subagents is the better play. Here's the threshold math:"

### Paragraph Length

- Prefer 2–4 sentence paragraphs.
- Single-sentence paragraphs are fine and often punchy.
- Anything > 6 sentences should split.

### Lists vs Prose

- Lists for parallel items (3+ comparable points).
- Prose for argument, narrative, opinion.
- Tables for any comparison with 2+ axes — they're the highest-signal AIO format and they read better than nested bullets.

### Code and Diagrams

- **🚫 CRITICAL CODE BLOCK RESTRICTION:** Never post raw manual coding block tutorials (e.g. JSX, TS, Python syntax walkthroughs) unless William verifies them first. Code blocks must exclusively display n8n configs, MCP config/schemas, or workflow JSON. Other than that, represent logic using prompt templates or high-level architecture.
- **In-sentence Facts & Citations:** Add official source citations (links to official docs, release notes, or benchmarks) right there in the sentence as you write. Cite them as necessary for AIO/AEO so AI crawlers can easily grab and verify facts.
- Mermaid diagrams for any multi-component system.
- Screenshots for UI examples.

---

## Opinion Rules

- **Have one.** Every post needs at least one "I think X" or "X wins" or "Don't use Y." If you can't take a side, you don't have a post yet.
- **Loosely held.** Hedge with "in my experience," "on my workload," "for client work like X." Never absolutes.
- **Specific.** "Cursor wins refactors" is weak. "Cursor's Composer wins refactors under 100K tokens with a tight rules file" is strong.

---

## Cliché Openers — Banned

Never open a post with:

- "In recent years..."
- "With the rise of..."
- "As AI continues to evolve..."
- "In the world of [topic]..."
- "Have you ever wondered..."
- "Imagine a world where..."
- "Picture this..."

**Open with the answer, the receipt, or the unexpected take.** Examples of good openers:

- "Cursor 1.8 just shipped a feature that quietly kills 60% of my prompts."
- "I deployed n8n for a 4-person ops team last quarter. Three months in, here's the audit."
- "The $25K brand site I shipped last week ran on three CSS tricks and one GSAP timeline. That's it."
- "Every AI coding assistant claims multi-file refactors. Only two of them actually work in production."

---

## Closing Rules

- **No "in conclusion."** Just stop, or transition to the CTA.
- **CTA matches the `serviceTrack`.** AI Visibility posts → book an AI-visibility audit / build an AIO/AEO site. AI posts → AI strategy call. Web posts → custom website discovery call. `both` posts → pick the natural lean.
- **Cross-link 2–3 related posts.** Inline links in body, not just at the bottom.

---

## Self-Edit Checklist (Before Hitting Save)

- [ ] Read the first paragraph out loud. Does it sound like a person or a press release?
- [ ] Search the post for every banned word above. Each one is either rewritten or technically justified.
- [ ] Every H2 starts with a bold direct answer (not a generic intro).
- [ ] At least one strong opinion appears in the post.
- [ ] At least one real number / version / benchmark appears in the post.
- [ ] The post has at least one table OR one allowed configuration block (n8n/MCP/prompts only, verified by user) OR one diagram per major section.
- [ ] No fabricated client names, ROIs, or testimonials.
- [ ] The closing CTA matches the `serviceTrack` frontmatter field.
- [ ] For AI Visibility posts, every statistic has a dated source or is explicitly framed as an estimate.

---

## Quick Voice Calibration — Read This Before Writing

A post is in William's voice if a reader who knows him would say "yeah, that's how he talks." A post is **not** in his voice if any of the following are true:

- It uses any banned word above without a technical/code justification.
- It hedges every claim with "many believe" or "some argue."
- It opens with a generic industry overview before getting to the point.
- It uses the word "leverage" anywhere.
- It says "comprehensive guide" without being one.
- The author could be swapped to "Sarah from Growth at HubSpot" without changing a single sentence.

If even one of those is true, the post isn't ready.
