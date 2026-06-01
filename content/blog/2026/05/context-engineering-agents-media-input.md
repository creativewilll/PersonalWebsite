---
title: "Context Engineering for Agents: Feeding Claude Code PDFs, Screenshots, and Video So It Builds the Right Thing"
slug: "context-engineering-agents-media-input"
date: "2026-05-26"
lastModified: "2026-05-26"
author: "William Spurlock"
readingTime: 15
categories:
  - "AI Agents and Automations"
tags:
  - "claude code"
  - "context engineering"
  - "ai agents"
  - "pdf input"
  - "multimodal ai"
  - "agent prompts"
  - "mcp"
featured: false
draft: false
excerpt: "The difference between an agent that builds what you want and one that hallucinates a wrong turn often comes down to how you feed it context. Here's the craft of pointing Claude Code at media instead of describing it."
coverImage: "/images/blog/context-engineering-agents-media-input-cover.png"
seoTitle: "Context Engineering for Agents: Media Input Guide | William Spurlock"
seoDescription: "Learn how to feed Claude Code PDFs, screenshots, and video for accurate builds. Master context engineering: when to point vs paste, scoping strategies, and the context manifest pattern."
seoKeywords:
  - "context engineering ai agents"
  - "claude code pdf input"
  - "ai agent screenshots context"
  - "multimodal agent prompting"
  - "context manifest pattern"
  - "claude code video input"
  - "agent context provisioning"

# AIO/AEO Fields
aioTargetQueries:
  - "how to feed pdfs to claude code"
  - "can ai agents use screenshots as context"
  - "how much context can claude code handle"
  - "best way to give agent context for coding"
  - "claude code vs cursor for image input"
  - "how to scope context for ai agents"
  - "what is context engineering"
  - "agent context manifest template"
contentCluster: "ai-agents-mcp"
pillarPost: false
parentPillar: "mcp-architecture-guide"
entityMentions:
  - "William Spurlock"
  - "Claude Code"
  - "Anthropic"
  - "Cursor"
  - "Claude Opus 4.7"
  - "MCP"
  - "Google AI Studio"
  - "Antigravity"

# Service Track Routing
serviceTrack: "ai-automation"
---

# Context Engineering for Agents: Feeding Claude Code PDFs, Screenshots, and Video So It Builds the Right Thing

## Pointing vs Pasting: The Core Decision Framework

**When you paste a description of a design into Claude Code, you get Claude's interpretation of your interpretation.** When you attach the actual screenshot, PDF, or screen recording, you get Claude's interpretation of the source. The delta between those two outcomes is often the difference between shipping and revising.

I learned this the hard way on a client rebuild last quarter. I described a "clean, minimal hero with a subtle gradient" to Claude Code. What I got was technically correct—a linear gradient from slate-100 to slate-200—but it missed the nuance entirely. The actual reference had a noise texture overlay, a barely-there border treatment, and type that sat exactly 8px lower than standard centering. That description gap cost me two revision cycles.

The next build, I attached the actual Figma export as a PNG. Claude Code spotted the noise layer, the border, and the optical alignment in one pass. No revisions. The lesson: **descriptions are lossy compression. Media is lossless context.**

| Approach | Token Cost | Accuracy | Best For |
|----------|-----------|----------|----------|
| Text description | ~50-200 tokens | Low-moderate | Simple layouts, existing design systems |
| Screenshot attachment | ~1,300-4,800 tokens | High | UI replication, bug fixes, visual QA |
| PDF spec | ~1,500-5,000 tokens/page | Very high | Full builds, complex interactions, documentation |
| Video screen recording | ~500-2,000 tokens/frame sampled | High | Animations, transitions, interaction flows |

The decision isn't always "attach everything." A 50-line description of an API schema is more precise than a screenshot of Swagger UI. But for visual work—layouts, color treatments, typography, spacing—**direct media attachment beats description every time**.

**When to paste:** Structured data, code logic, configuration values, anything where precision matters more than visual fidelity.

**When to point:** Visual designs, existing UI implementations, bug reproductions, motion studies, anything where the exact rendering carries information your words will miss.

## When to Hand Agents Media Directly vs Pointing Them at Repos

**Handing an agent a file directly—pasting content, attaching media, or inline code blocks—creates immediate, immutable context. Pointing an agent at a repo path or URL creates referential context that the agent must fetch and interpret.** The choice shapes both accuracy and cost in ways that aren't immediately obvious.

Claude Code excels at this distinction. When I point it at `src/components/Hero.tsx`, Claude reads the file through its tool-use layer, ingests the actual content, and holds it in context. This is different from me pasting the same component into the chat—when I paste, I'm pre-filtering, and Claude knows I'm pre-filtering. Pointing preserves the file's relationship to the codebase; the agent sees imports, relative paths, and surrounding structure.

**Direct handoff works best when:**

- The context is singular and self-contained (one spec PDF, one design mock)
- You need the agent to see exactly what you see, not what it might find in a codebase
- The source material isn't in the repo yet (Figma exports, client briefs, competitor screenshots)
- You want to prevent the agent from "helpfully" finding related files and overcomplicating

**Pointing works best when:**

- The context already lives in the repo and has established relationships to other files
- You want the agent to understand imports, types, and dependencies
- The task requires cross-file reasoning (refactors, architecture changes)
- You need the agent to respect existing patterns it can discover organically

**The hybrid move—most common in my workflow:** Attach the visual reference directly (screenshot, PDF), then point at the relevant code paths. Claude Code handles both simultaneously. The screenshot gives it the target state; the repo files give it the existing implementation. The agent bridges the gap without you describing either side exhaustively.

| Method | Accuracy | Context Window Impact | Use Case |
|--------|----------|---------------------|----------|
| Direct paste | High for pasted content, low for surrounding context | Immediate, fixed cost | Isolated snippets, quick fixes |
| File pointer (`@filename`) | High, with relationship context | Fetched on demand, cached | Most coding tasks |
| Media attachment | Very high for visual fidelity | 1,300-4,800 tokens per image | UI work, design replication |
| Directory glob (`src/**/*.ts`) | Moderate, can overwhelm | Scales with file count | Large refactors, audits |

**A warning on glob patterns:** Handing Claude Code `src/**/*` on a 200-file project is a context window death sentence. As of May 2026, Claude Opus 4.7 and Sonnet 4.6 ship with a 1M token context window on paid plans—up from the prior 200K limit—but that doesn't mean you should fill it. The [compaction buffer](https://claudefa.st/blog/guide/mechanics/context-buffer-management) reserves ~33K tokens for automatic summarization, and autocompact triggers at roughly 83.5% usage. Fill the window with undifferentiated globs and you'll trigger early compaction, lose critical context, and watch the agent start hallucinating.

**My rule:** Point at specific files. Use media attachments for external context. Never glob unless I've already scoped the target set with `find` or `rg` and confirmed the file count is under 20.

## The PDF-to-Build Pipeline: From Spec Document to Working Code

**PDFs are the most underrated context source for agent-driven development.** When you feed Claude Code a 12-page product spec, you're not just handing it requirements—you're giving it structure, hierarchy, visual emphasis, and the implicit prioritization encoded in layout. Claude Opus 4.7 processes PDFs by converting each page into an image, which means it sees the document exactly as a human reader would: headings, bullet density, callout boxes, all of it.

Here's a workflow I've standardized for PDF-to-build handoffs:

**1. The Pre-Flight Check**

Before attaching, run through the PDF mentally. Does it have:
- Clear H1/H2 hierarchy that maps to components or routes?
- Screenshot/mockup pages that show target states?
- Data models or API contracts in structured tables?
- User flows as diagrams or numbered steps?

If the PDF is dense, I add a cover prompt: *"Focus on Sections 2-4 (Design System) and Section 7 (API Contracts). Deprioritize the marketing overview in Section 1."* This scopes the context before the agent ingests it.

**2. The Attachment Strategy**

Claude Code accepts PDFs via drag-and-drop or the file picker. The agent ingests the full document—there's no native "only pages 3-5" flag, so scope with your prompt instead. For Claude Opus 4.7, PDF processing carries a token cost of approximately **1,500-5,000 tokens per page**, depending on visual density. A 10-page spec with screenshots runs ~25,000-40,000 tokens—well within the 1M window, but not free.

**3. The Build Prompt Template**

I use a consistent prompt structure for PDF builds:

```markdown
I've attached [product-spec-v2.pdf]. Build the components described in Section 3 
(Design System) as React + TypeScript + Tailwind components in src/components/ui/.

Key constraints from the spec:
- Use the color palette defined in Section 3.2
- Match the spacing scale in Section 3.4 exactly
- The Button component has 4 variants: primary, secondary, ghost, destructive
- Include the loading state shown in the mockup on page 8

Point at the existing src/components/ui/ folder first to understand current patterns, 
then implement new components that integrate cleanly.
```

Notice what this does: it attaches the spec (full context), scopes via section references (prevents drift), and points at existing code (preserves consistency). The agent gets the target, the constraints, and the current state in one prompt.

**4. Handling Multi-Page PDFs with Mixed Content**

Not every PDF page matters equally. A spec might have 3 pages of user research, 5 pages of wireframes, and 4 pages of API documentation. When you need surgical focus, add explicit scoping:

```markdown
Use pages 4-8 (wireframes) as the visual reference for the Dashboard component. 
Use pages 9-11 (API docs) for the data types. Ignore the research summary in 
pages 1-3 for this implementation task.
```

Claude Code can't natively "skip" pages during ingestion, but it can deprioritize them in reasoning. The explicit instruction shapes what survives compaction if the session runs long.

**Token Math for PDF Builds:**

| Document Type | Pages | Est. Tokens | % of 200K Window | % of 1M Window |
|---------------|-------|-------------|------------------|----------------|
| 1-pager feature brief | 1 | ~2,000 | 1% | 0.2% |
| Product spec (text-heavy) | 10 | ~20,000 | 10% | 2% |
| Design system (screenshot-heavy) | 15 | ~50,000 | 25% | 5% |
| Full PRD + API docs | 25 | ~75,000 | 37.5% | 7.5% |

On the 200K window (older sessions or Haiku 4.5), a heavy PDF risks compaction. On the 1M window (Opus 4.7, Sonnet 4.6), you have headroom—but I still scope tightly. **Context abundance isn't accuracy.** Too much undifferentiated content dilutes the signal.

## Screenshots as Architecture: Letting Agents See Before They Code

**A screenshot is worth a thousand lines of description.** This is the single highest-leverage move in context engineering: instead of describing a UI, you show it. Claude Opus 4.7 ships with a high-resolution vision encoder supporting up to **2,576 pixels on the long edge**—roughly 3.75 megapixels, more than 3x the resolution of prior Claude models. For text-dense UIs, small icons, and fine spacing details, this upgrade matters.

But screenshots carry a token cost that can surprise you. A single 1920x1080 screenshot consumes approximately **2,765 tokens** when processed by Opus 4.7. Push to the max resolution (2,576px on the long edge) and you're looking at **up to 4,784 tokens per image**. Three full-screen mockups can burn 12,000+ tokens—still manageable in a 1M window, but significant in a 200K context.

**The Screenshot Workflow I Use:**

**1. Capture at the Right Resolution**

Don't upload 4K screenshots unless the UI detail demands it. For most web builds:
- **1440px width** captures full desktop layouts with readable text
- **1000px width** is sufficient for component-level work
- **600px width** works for isolated elements (buttons, inputs, cards)

Every pixel costs tokens. Resize before attaching.

**2. Annotate When Necessary**

A raw screenshot shows everything; the agent may not know what "everything" means. For complex UIs, I drop into Figma or use CleanShot to add simple annotations:
- Red boxes around the elements I'm asking the agent to build
- Numbered callouts that match my prompt ("Implement the component labeled #1")
- Arrows showing interaction flows

This is pre-filtering for the agent's benefit—like pointing at a specific file instead of handing over the whole repo.

**3. The Screenshot-to-Code Prompt Pattern**

```markdown
I've attached [dashboard-mockup.png]. Build this dashboard view as a React 
component using Tailwind CSS.

Specifically:
- The layout uses a 3-column grid (see the red annotations)
- The "Active Users" card (#1) has a sparkline chart—use recharts
- Match the color values exactly; I've included a reference swatch in the top-right
- The sidebar is collapsible on mobile (see the hamburger icon in the mobile mockup)

Point at src/app/dashboard/page.tsx to see the current implementation, then 
replace it with this new layout.
```

This prompt combines: attached visual target (screenshot), scoped focus (annotations), functional requirements (sparkline, collapsible), and codebase context (point at existing file). The agent has everything it needs to match the visual exactly while respecting the existing codebase.

**4. Handling Screenshot Clusters**

Multi-screen flows need multiple screenshots. Here's how I handle it:

| Scenario | Approach | Token Cost |
|----------|----------|------------|
| 2-3 related screens (desktop, tablet, mobile) | Attach all, label in prompt | ~6,000-12,000 |
| 5+ screen flow (onboarding, checkout) | Attach key states only (start, decision, end) | ~8,000-12,000 |
| Full app audit (20+ screens) | Break into sessions; one per major flow | Per-session cost |

**A critical warning:** Claude Code has a [documented edge case](https://github.com/anthropics/claude-code/issues/49552) where oversized screenshots can "brick" a session. A single full-screen screenshot encoded as base64 can consume ~334,000 tokens—nearly 2x the older 200K context window. The autocompact mechanism can't recover because the single message already exceeds the window. The only recovery is `/clear`, losing all context.

**To prevent this:**
- Resize screenshots to under 2,000px on the long edge before attaching
- For multi-image sessions, stay under 1200px per image to be safe
- Use tools like [claude-code-image-sanitizer](https://github.com/MussaCharles/claude-code-image-sanitizer) for batch resizing if you process many screenshots

**Screenshot vs Description: A Real Example**

I needed to replicate a competitor's pricing table. Two approaches:

| Method | Prompt Style | Result |
|--------|--------------|--------|
| Description only | "Three tiers, highlighted middle tier, checkmarks for features" | Generic table, middle tier styled but not matching, feature list incomplete |
| Screenshot attached | Same prompt + [pricing-table.png] | Exact visual match: tier highlighting, tooltip icons, spacing, typography weights |

The description approach got me 70% there. The screenshot got me 95% there in one pass. That 25% delta is the revision cycle you eliminate with proper context engineering.

## Video Context: Screen Recordings as Task Descriptions

**Video bridges the gap between static mockups and interaction requirements.** A 30-second screen recording of a user flow conveys timing, easing, hover states, and transitions in a way that no static screenshot or text description can match. Claude Code accepts video inputs through the same attachment interface as images and PDFs.

**When Video Beats Static Context:**

- **Animation specifications:** A screen recording of a modal opening shows the duration, easing curve, and backdrop fade better than "modal slides up over 300ms with ease-out"
- **Interaction flows:** A recording of a multi-step form shows validation timing, error shake patterns, and button state changes
- **Bug reproduction:** Recording the exact steps to trigger an error eliminates the "I can't reproduce this" back-and-forth
- **Complex gestures:** Swipe behaviors, drag-and-drop, pinch-to-zoom are easier to show than describe

**The Video-to-Context Workflow:**

**1. Keep It Short and Targeted**

Video frames are sampled for processing, but the total token cost scales with duration. A 30-second clip at 30fps with sampled frames might extract 5-10 key frames, costing ~2,000-5,000 tokens. A 5-minute walkthrough could extract 50+ frames and approach screenshot-level costs.

My rule: **one flow, one recording, under 60 seconds.** If a feature needs more explanation, I break it into multiple focused recordings rather than one long demo.

**2. Narrate the Recording (Or Add a Prompt)**

Silent recordings work, but narrated ones add context. When I record a bug, I narrate: *"Clicking the Submit button here triggers the error. Notice the network tab shows a 422 response before the UI updates."* Claude Code processes both the visual frames and any audio transcription, giving it two signal channels.

If the recording is silent, I add a companion prompt:

```markdown
I've attached [onboarding-flow.mp4]. Key moments to note:
- 0:05 - The form validates email format inline
- 0:12 - On successful submit, the button shows a loading spinner 
- 0:15 - Transition to dashboard uses a slide-left animation
- 0:18 - Dashboard data appears with staggered fade-in (see the cards)

Implement this exact flow in src/app/onboarding/.
```

**3. Frame Extraction and Token Math**

Claude doesn't process every video frame. The vision model samples key frames—roughly 1-2 per second for short clips, fewer for longer content. Here's the cost breakdown:

| Video Duration | Est. Frames Sampled | Token Cost (Opus 4.7) |
|----------------|---------------------|----------------------|
| 10 seconds | 10-15 | ~2,000-3,000 |
| 30 seconds | 15-30 | ~3,000-6,000 |
| 60 seconds | 25-50 | ~5,000-10,000 |
| 5 minutes | 50-100 | ~10,000-20,000 |

For comparison: a detailed text description of a 30-second animation might run 200-500 tokens. The video costs 6-12x more but carries 10x more fidelity. **For motion work, the token cost is worth the accuracy gain.**

**4. Video Format Considerations**

Claude Code accepts MP4, MOV, and WebM. I use:
- **MP4 (H.264)** for maximum compatibility
- **1080p resolution max**—4K video adds frames but not useful detail for UI work
- **30fps recording**—higher frame rates don't improve sampling

Trim ruthlessly in your recording tool (I use CleanShot or Screen Studio) before attaching. Dead air at the start of a recording wastes tokens.

**The Bug Report That Changed My Mind**

A client reported a "weird flicker" on a data table. I couldn't reproduce it from their description. They sent a 15-second screen recording. Claude Code watched the clip and immediately identified the issue: a race condition between data fetching and virtualization rendering, causing the table to flash unstyled content for ~100ms.

The fix was a 2-line Suspense boundary adjustment. Without the video, I would have added logging, tried to reproduce, and potentially shipped a patch that didn't address the actual timing. **The video gave Claude the temporal context that no amount of description could capture.**

## Voice Notes as Agent Briefs: Async Context That Actually Works

**Voice is the fastest context capture method we have.** A 2-minute voice memo describing a feature while walking to a meeting contains nuance, emphasis, and implicit prioritization that would take 15 minutes to type. Claude Code accepts audio attachments and processes them through the same multimodal pipeline as video—transcribing, then reasoning over the transcription alongside any visual or text context.

**Why Voice Works for Agent Briefing:**

- **Speed:** Speaking is 3-4x faster than typing for most people
- **Nuance:** Tone conveys urgency; pauses indicate uncertainty; emphasis signals priority
- **Context capture:** Ideas strike away from keyboards—voice lets you capture them immediately
- **Async handoff:** Record a brief, attach it, let Claude Code process while you handle other work

**The Voice-to-Build Workflow:**

**1. Record with Structure**

Unstructured voice memos ramble. I use a simple template mentally:

```
[The goal] - What we're building
[The context] - Where it fits in the existing codebase
[The constraints] - Non-negotiables (brand, tech, timeline)
[The reference] - What to look at (screenshots, URLs, files)
[The acceptance criteria] - How we'll know it's done
```

Example recording (transcribed):

> "Okay, this is the checkout flow redesign. Goal: reduce cart abandonment by simplifying the three-step process into one. Context: this is src/app/checkout/page.tsx, currently uses a wizard pattern. Constraints: must stay on Tailwind, can't add new dependencies, brand colors in tailwind.config.js. Reference: I'm attaching the Figma export and a screenshot of Stripe's new checkout—they do the accordion thing we want. Acceptance: one page, accordion sections, mobile-first, existing validation rules still apply."

That 45-second recording, attached alongside the Figma export and a screenshot, gives Claude Code everything needed to start implementation.

**2. Combine Voice with Attachments**

Voice alone is good; voice + visual reference is better. My typical pattern:

| Voice Content | Attachment | Result |
|--------------|------------|--------|
| Feature brief | Figma export or screenshot | Agent hears intent, sees target |
| Bug report | Screen recording of bug | Agent hears narration, sees reproduction |
| Refactor plan | Current code file pointers | Agent hears rationale, sees existing code |
| Content update | PDF of new copy | Agent hears placement instructions, sees text |

**3. Token Costs for Audio**

Audio is transcribed to text before processing, so the token cost is roughly equivalent to the transcript length:

| Recording Duration | Est. Word Count | Token Cost |
|-------------------|-----------------|------------|
| 1 minute | 130-150 words | ~200 tokens |
| 3 minutes | 400-450 words | ~600 tokens |
| 5 minutes | 650-750 words | ~1,000 tokens |
| 10 minutes | 1,300-1,500 words | ~2,000 tokens |

Audio is the cheapest media form per unit of information. A 3-minute voice memo costs ~600 tokens; a single screenshot costs ~1,300-4,800 tokens. **For pure information transfer, voice is efficient. For visual fidelity, screenshots win.**

**4. The Voice Brief Template I Use**

When I'm batching work for later, I record multiple voice memos and attach them with a covering prompt:

```markdown
I've attached three voice memos covering the dashboard redesign:
- memo-1-overview.mp3 - High-level goals and user research insights
- memo-2-layout.mp3 - Specific layout requirements and responsive behavior
- memo-3-data.mp3 - API contracts and data requirements

Process these in order, then build the dashboard in src/app/dashboard/page.tsx.
Also attached: [dashboard-mockup.png], [api-contracts.pdf]
```

Claude Code processes the audio, extracts the transcripts, and reasons over all three plus the attachments. The sequential instruction ensures it builds mental context before touching code.

**When Voice Doesn't Work:**

- **Visual-heavy tasks:** Describing a complex animation is harder than showing it
- **Precise data:** "Set the margin to 24px" is better typed than spoken (and then transcribed, potentially with errors)
- **Long-form reasoning:** Voice memos over 5 minutes lose structure; switch to written specs
- **Sensitive data:** Voice transcribed and sent to APIs may have different compliance implications than typed text—check your org's policies

**The 3AM Idea That Actually Shipped**

I woke up with a navigation pattern in my head at 3AM. Grabbed my phone, recorded a 90-second voice memo describing the concept, attached it to Claude Code with a Figma link, and went back to sleep. By morning, Claude had processed the audio, read the Figma file, and scaffolded the component structure. I reviewed it over coffee, made two adjustments, and merged.

**The voice memo captured the insight while it was fresh. The agent executed while I slept.** That's the promise of context engineering: your ideas don't wait for you to be at a keyboard.

## The Context Manifest Pattern: A Repeatable Briefing Structure

**A context manifest is the cleanest way to brief any serious agent because it separates the job, the source material, and the constraints into a format that survives across sessions and tools.** I use it when the task is big enough that I don't want accuracy riding on one chat message or my memory of what I attached five minutes ago.

Most failed agent runs are not prompt problems. They are briefing problems. The agent gets one screenshot but not the PDF, or it gets the PDF but not the path to the current implementation, or it gets the repo pointer but no note about which screens actually matter. A context manifest fixes that by making the brief explicit before the agent starts reasoning.

The pattern matters because agents do not all pull context the same way. Claude Code is excellent when I hand it media plus repo targets. Cursor is still my model-agnostic daily driver because I can choose the model, set subagent workflows from the prompt, and use cloud agents, but it still benefits from the same manifest discipline when I want a multimodal task to stay on rails. Antigravity is the move when parallel browser agents need to inspect a live site instead of a static export. The manifest is the portable layer between those tools.

Here is the exact shape I use:

```markdown
# Context Manifest

## Objective
- Ship:
- Success looks like:
- Deadline / urgency:

## Primary Deliverable
- Output type:
- Where it should live:
- What should NOT be changed:

## Attached Media
1. [file-name.ext] - what it is, why it matters, priority
2. [file-name.ext] - what it is, why it matters, priority

## Referenced Context
1. [relative/path/or/url] - what to inspect there
2. [relative/path/or/url] - what to inspect there

## Constraints
- Brand / UX constraints:
- Tech / platform constraints:
- Content / compliance constraints:

## Scope
- In scope:
- Out of scope:

## Execution Order
1. Read / inspect:
2. Compare against:
3. Produce:
4. Verify:

## Acceptance Criteria
- Must:
- Must not:
- Done when:
```

That structure does three things that a loose paragraph brief does not. It tells the agent what the job is, it ranks the evidence it should trust, and it names what is out of bounds. That last one matters more than most people think. If I say "update the pricing section" without saying "do not rewrite the headline system or brand voice," the agent will often help too much.

| Manifest Block | Why It Exists | Common Failure If Missing |
|---|---|---|
| Objective | Gives the agent a clean win condition | The output looks polished but solves the wrong problem |
| Attached Media | Anchors the source of truth | The agent relies on my summary instead of the actual asset |
| Referenced Context | Connects media to the working surface | The build ignores current patterns or file structure |
| Constraints | Prevents "helpful" drift | Colors, layout, copy, or stack choices wander |
| Scope | Cuts false positives | The agent edits adjacent sections I never asked for |
| Acceptance Criteria | Defines review language up front | I end up doing the reasoning the brief should have done |

When I am handing work between sessions, the manifest is even more valuable than the prompt itself. A good prompt tells the agent what to do right now. A good manifest tells any agent what this task is and what evidence counts. That is the difference between a one-off request and a repeatable operating system.

## Scoping Context for Accuracy: The Too-Much Problem

**Too much context is not safer context. It is usually worse.** Once you dump a repo, six screenshots, two PDFs, and a long voice memo into one run without telling the agent what matters most, you don't get "more complete" reasoning. You get diluted attention.

This is the part most people miss after seeing 1M-token context windows. Claude Opus 4.7 and Sonnet 4.6 can hold far more than the old 200K-era workflows, but that does not change the core problem: irrelevant context competes with relevant context. The model still has to rank what matters. If you do not rank it, you are delegating the briefing work to the agent.

I think of context scoping in three layers: primary evidence, supporting evidence, and optional background. Primary evidence is the thing the agent must match or respond to right now: the target screenshot, the current file, the spec section, the screen recording of the bug. Supporting evidence explains the edges: brand PDF, adjacent component patterns, API notes. Optional background is everything nice-to-have that should stay out unless the agent gets blocked.

| Context Tier | What Belongs There | Keep It In Session? |
|---|---|---|
| Primary evidence | The exact screenshot, PDF pages, target files, or video tied to the task | Always |
| Supporting evidence | Brand rules, neighboring patterns, secondary references | Only if they change the outcome |
| Optional background | General docs, old notes, broad repo folders, exploratory references | Usually no |

The practical move is to scope before you attach. I do not start by asking, "What can this model fit?" I start by asking, "What would make a wrong answer impossible?" That question usually cuts the brief in half.

Use this prompt template when a task starts sprawling:

```markdown
Use only the primary context for your first pass:

- Attached: [primary-reference.png]
- Attached: [target-flow.mp4]
- Referenced: [relative/path/to/current-surface]

Treat these as secondary context only if needed:
- [brand-guidelines.pdf]
- [adjacent/component/path]

Ignore everything else unless you get blocked.
Before producing the final output, tell me which source had the highest impact on your reasoning.
```

That last instruction is underrated. If the agent says the most important input was the brand PDF instead of the target mockup, I know the brief is weighted wrong. I can correct the hierarchy before it writes itself into a bad branch.

Another way I keep accuracy high is session splitting. If the job has two different reasoning modes, I split them. One session reads the design export and defines the UI target. Another session handles the implementation surface. One session watches the bug recording and isolates the trigger. Another applies the fix. Trying to make one giant run do all of it is how context turns muddy.

| Smell | What It Usually Means | Better Move |
|---|---|---|
| "I attached everything just in case" | The task is underspecified | Write the manifest first |
| Agent keeps citing the wrong file | Repo scope is too broad | Cut to the exact files |
| Agent nails visuals but misses behavior | Visual context is strong, operational context is weak | Add acceptance criteria or flow notes |
| Agent understands logic but misses layout | Text context is overweighted | Attach the actual visual target |

If an agent keeps missing, I do not immediately blame the model. I usually blame the bundle. Better models help. Better context packets help more.

## Design Exports and Figma Attachments: Visual Context at Scale

**Figma is useful because it is a design source, but the agent usually performs better when I hand it stable exports instead of an open-ended design environment.** The goal is not "let the agent into Figma." The goal is "give the agent the exact visual evidence it needs at the lowest ambiguity cost."

For most production work, I export the frames that matter and package them like a briefing set: desktop hero, tablet adaptation, mobile state, interaction annotation, and one brand reference sheet if the UI language is custom. That beats a vague "match the Figma" instruction because the agent now has fixed targets instead of an infinite canvas full of half-finished explorations.

The real win shows up at scale. A single screenshot is easy. A product redesign with ten screens is where people get sloppy. They hand over a giant PDF export or a live Figma link and assume the agent will infer priority. Sometimes it will. Often it will over-index on the prettiest frame instead of the canonical one.

| Asset Type | Best Use | Why I Use It |
|---|---|---|
| PNG frame export | Final visual matching | Stable, crisp, easy for vision models to reason over |
| JPEG screenshot | Fast reference capture | Good enough for audits and competitor teardowns |
| Annotated export | Multi-part UI instruction | Removes ambiguity about what to build first |
| PDF deck of frames | System-level review | Useful when the sequence matters more than a single screen |
| Raw Figma link | Human review or manual follow-up | Good for me, less reliable as first-pass agent context |

My default packaging pattern looks like this:

```markdown
Prompt the agent with this visual packet:

- hero-desktop.png -> canonical desktop target
- hero-mobile.png -> responsive target
- section-annotations.png -> numbered callouts for priority
- brand-reference.pdf -> type, color, spacing rules

Instruction:
"Match the exported frames first. Use the brand reference only to resolve details the screenshots do not make explicit. Do not invent layouts from unlabeled Figma pages."
```

That "do not invent layouts from unlabeled Figma pages" line saves real time. Design files are messy by nature. They contain rejected directions, exploration frames, notes to self, and spacing experiments. An export packet lets me curate the truth before the agent starts.

If I do need to reference a Figma file directly, I treat it as a second layer, not the primary instruction surface. I will say which frame names matter, which pages to ignore, and which exported PNGs override the live file if there is any mismatch. Otherwise the agent can treat draft work as shipped intent.

The broader pattern is simple: visual context scales when you package it like a system, not like a dump. That is the same idea behind [the context manifest pattern](#the-context-manifest-pattern-a-repeatable-briefing-structure). You are not just attaching images. You are curating evidence.

## Cross-Agent Context Sharing: Claude, Cursor, and Antigravity Handoffs

**Cross-agent handoffs work when the context packet is tool-agnostic and the next agent knows what kind of evidence to trust.** The trick is not copying the same long prompt between tools. The trick is preserving the job, the ranked context, and the acceptance criteria while changing the execution surface.

This matters because Claude Code, Cursor, and Antigravity do different jobs well. Claude Code is strong when I want a premium all-in-one Anthropic workflow with rich multimodal reasoning. Cursor is the tool I prefer day to day because it is model-agnostic, lets me pick each subagent's model and workflow from the prompt, and gives me cloud agents without leaving my main environment. Antigravity is where I send parallel browser agents when the task depends on a live site, live DOM state, or multi-tab observation. Those are different execution models, so the handoff has to preserve intent without pretending the tools are identical.

For media handling specifically, not overall tool ranking, I brief them like this:

| Tool | What I Hand Off | Best Use In This Chain |
|---|---|---|
| Claude Code | PDFs, screenshots, video, voice notes, scoped repo paths | Deep multimodal interpretation and first-pass plan |
| Cursor | The same manifest, chosen assets, repo targets, explicit workflow instructions | Daily execution, subagent fan-out, model-specific follow-through |
| Antigravity | Manifest + live URL + browser task breakdown | Parallel browser validation on the real site |

The cleanest handoff pattern is Claude or Cursor first for interpretation, then Cursor for daily implementation, then Antigravity for live-site browser validation when needed. I do not move tools because one "wins" everything. I move because the surface changes from media understanding to repo execution to live browser observation.

Use a handoff brief like this:

```markdown
# Agent Handoff Brief

## Job
- Recreate the target onboarding flow and verify it matches the recorded interaction.

## Source of Truth
- onboarding-flow.mp4
- onboarding-desktop.png
- context-manifest.md

## Current Surface
- [relative/path/or/repo-area]

## What The Previous Agent Already Established
- Canonical states:
- Constraints:
- Risks to watch:

## What This Agent Should Do Next
- Implement / review / validate:
- Ignore:
- Done when:
```

The important part is the middle section: "What the previous agent already established." Without it, every handoff resets the reasoning stack and forces the next tool to rediscover what was already obvious. With it, the next agent can execute from a stable summary while still checking the original assets if needed.

I also keep capability-specific language honest. If I am comparing Cursor and Claude Code inside a media-heavy workflow, I say that explicitly. Cursor remains my model-agnostic daily driver and the better day-to-day control surface for mixed-model, multi-agent work. Claude Code is still strong when I want Anthropic's bundled multimodal environment. Antigravity is not a replacement for either one; it is the specialized move for parallel browser agents on live pages. That distinction keeps tool choice practical instead of tribal.

## Building the Context-First Workflow: Tool Stack and File Organization

**A context-first workflow gets reliable when the files are organized so an agent can understand the job without you narrating the whole project every time.** The stack matters, but the file system discipline matters just as much because that is what makes your prompts short and your handoffs reusable.

I organize around evidence, not just deliverables. That means I keep the source packet near the working surface: design exports together, voice notes together, PDFs together, one manifest per task, and a clear distinction between canonical references and throwaway scratch material. If I have to remember whether `final-v2-real-final.pdf` is the right file, the system is already failing.

Here is the directory shape I like for context-heavy work:

```markdown
/context
  /project-name
    /manifests
      - context-manifest.md
      - handoff-brief.md
    /media
      /design-exports
      /screenshots
      /screen-recordings
      /voice-notes
    /docs
      - product-spec.pdf
      - brand-guidelines.pdf
    /references
      - urls.md
      - competitor-notes.md
```

That layout does two things fast. First, it gives me a stable place to point any agent. Second, it makes it obvious what kind of context each asset represents. I do not want screenshots mixed into a random downloads folder and then half-described in chat. I want a clean packet I can hand to Claude Code, Cursor, or Antigravity without translation overhead.

| Layer | Purpose | Typical Tool |
|---|---|---|
| Manifest layer | States the job, scope, and acceptance criteria | Claude Code, Cursor, Antigravity |
| Media layer | Holds the visual or audio truth | Claude Code first, then reused elsewhere |
| Repo layer | Holds the implementation surface | Cursor most often |
| Browser layer | Confirms live behavior against the target | Antigravity |

My stack is usually some mix of this: Claude Code or Cursor for the first reasoning pass, Cursor as the daily driver for implementation and subagents, Antigravity when parallel browser agents need to inspect the live site, and Codex when I want async PR review. That split matters because it keeps each tool doing the thing it is actually good at instead of pretending one interface should own the whole pipeline.

If you want the workflow to stay clean under pressure, standardize the naming too. I use names that tell the agent what the asset is without opening it: `checkout-desktop-canonical.png`, `pricing-mobile-reference.png`, `bug-repro-checkout-submit.mp4`, `context-manifest-checkout.md`. Ambiguous filenames create avoidable ambiguity in the prompt.

The broader lesson is simple: context-first systems are built before the prompt. By the time I open the chat box, the outcome should already be encoded in the folder structure, the manifest, and the asset names. Then the prompt becomes a routing layer, not a rescue mission.

## FAQ

### Can Claude Code actually see screenshots I attach to prompts?

**Yes—Claude Code processes screenshots through a vision encoder that converts images into tokens for direct reasoning.** As of May 2026, Claude Opus 4.7 and Sonnet 4.6 both ship with high-resolution vision capable of handling images up to 2,576 pixels on the long edge. The agent doesn't just "see" the screenshot; it reads text, identifies UI elements, extracts color values, and recognizes layout structure at the token level. For UI replication tasks, a single well-cropped screenshot often delivers more accurate results than a 500-word description.

### How much PDF content can I feed Claude Code at once?

**With Claude Opus 4.7's 1M token context window, a 50-page product spec consumes roughly 5-7% of available space.** PDFs process at approximately 1,500-5,000 tokens per page depending on visual density—text-heavy pages run lower, screenshot-heavy pages run higher. On older 200K token windows, that same 50-page PDF would exceed capacity, but the 1M window gives you headroom for lengthy documentation. I still recommend scoping with page references ("focus on pages 12-18") rather than dumping entire documents undifferentiated.

### What's the difference between context engineering and prompt engineering?

**Prompt engineering shapes how you ask; context engineering shapes what the agent knows before it answers.** A prompt engineer might write "extract the key insights from this document," while a context engineer attaches the document, scopes the relevant sections, and points at related files first. Prompt engineering operates on the query layer—word choice, structure, temperature. Context engineering operates on the information layer—what files, images, PDFs, and code the agent ingests before reasoning. The best results come from doing both well.

### Should I paste code snippets or point Claude at the file?

**Point at the file unless you're intentionally filtering what the agent sees.** When you paste a snippet, Claude knows you're pre-selecting and may assume that's the only relevant context. Pointing with `@filename` preserves the file's relationships—imports, relative paths, type dependencies—and lets Claude discover surrounding context organically. Paste for isolated questions about specific logic; point for refactors, architecture changes, or any work where the agent needs to understand how code connects to the broader system.

### How do I handle multi-page PDFs with mixed content types?

**Scope explicitly with page references in your prompt—Claude Code ingests the full PDF but you control what it prioritizes.** A 30-page spec might contain 5 pages of user research, 10 pages of wireframes, and 15 pages of API documentation; telling Claude to "focus on pages 8-12 for the dashboard mockups and pages 25-28 for data contracts" prevents drift. The agent can't natively skip pages during ingestion, but it can deprioritize irrelevant sections in reasoning. Explicit scoping also helps if the session triggers autocompact—your prioritized instructions survive the summarization.

### Can I feed Claude Code a video file directly?

**Yes—Claude Code accepts MP4, MOV, and WebM files and samples key frames for visual reasoning.** A 30-second screen recording at 1080p extracts roughly 15-30 frames and costs approximately 3,000-6,000 tokens depending on visual complexity. The agent processes these frames like screenshots, reading UI elements, animations, and transitions from the sampled moments. For best results, keep recordings under 60 seconds per flow and narrate the key actions if possible—audio gets transcribed and adds context without significant token cost.

### What's the token cost of attaching images vs text descriptions?

**A detailed text description runs 50-200 tokens; a 1920x1080 screenshot consumes roughly 2,765 tokens.** The image costs 10-50x more but carries 100x the fidelity for visual tasks—colors, spacing, typography weights, and subtle UI treatments that descriptions miss. For a pricing table replication I tested, the description approach got me 70% accuracy; the screenshot delivered 95% in one pass. The math flips for structured data: a 100-word API schema description beats a screenshot of Swagger UI on both token cost and precision.

### How do I scope context when my codebase is larger than the context window?

**Use targeted file pointers and pre-filter with `find` or `rg` instead of glob patterns that flood the window.** A `src/**/*.ts` glob on a 200-file project can trigger autocompact prematurely, losing critical context before the agent even starts. My rule: scope to under 20 files per session, identified by searching for specific symbols or patterns first. For large refactors, break work into vertical slices—one session for the data layer, another for components—rather than attempting horizontal cross-cutting changes that require everything at once.

### Does Cursor handle media attachments differently than Claude Code?

**Cursor Composer has limited vision capabilities compared to Claude Code's full multimodal pipeline.** This is a media-handling distinction specifically, not an overall tool ranking; Cursor remains my model-agnostic daily driver for mixed-model, multi-agent work. Cursor handles images in chat and Composer, but its primary strength is multi-file code generation rather than media-driven builds. Claude Code's tool-use architecture makes it more natural for attaching PDFs, videos, and screenshots as first-class context. I use Cursor for refactors and internal codebase work; I use Claude Code when I'm feeding external references—design exports, competitor screenshots, product specs—into the agent.

### How do I create a context manifest that works across different agents?

**A context manifest is a markdown file listing what the agent needs to know, in priority order, with explicit file pointers and attachments.** Start with the goal, then list attached media, then point at relevant code paths, then specify constraints—this structure works in Claude Code, Cursor, and Antigravity with minimal adjustment. Keep paths relative and avoid agent-specific syntax that won't transfer. The manifest becomes a reusable brief: attach it alongside your media and any agent can pick up the context without you retyping the setup.

### What file formats work best for design exports as agent context?

**PNG and JPEG exports from Figma work best—vector formats like SVG or PDF with embedded vectors lose detail in tokenization.** Claude Code's vision encoder processes raster images more reliably than it parses complex vector paths; a 1440px-wide PNG export captures every gradient, shadow, and text treatment the agent needs to replicate. For specs that combine screenshots and text, a PDF with rasterized pages works better than a native Figma PDF export with selectable text layers. Export at 1x or 2x resolution—4x adds tokens without adding useful detail for most UI work.

### Can agents use context from previous conversations, or do I need to re-attach everything?

**Context does not persist across Claude Code sessions—you must re-attach media and re-scope files for each new conversation.** The `/clear` command or starting a new session wipes all previously loaded context, including screenshots, PDFs, and pointed files. This is by design: each session starts fresh to prevent context pollution and runaway token costs. For multi-session projects, I keep a context manifest template with my standard file pointers and attachment notes, then copy-paste it into new sessions rather than retyping the setup each time.

## Related Reading

- [MCP Architecture Guide](/blog/mcp-architecture-guide) — How Model Context Protocol servers extend agent capabilities with structured tool access and cross-platform compatibility
- [Claude Code Subagents Masterclass](/blog/claude-code-subagents-masterclass) — Orchestrating long-horizon tasks with nested agent calls, parallel execution, and context isolation strategies
- [Cursor Composer Multi-File Refactor](/blog/cursor-composer-multi-file-refactor-workflow) — When to choose Cursor over Claude Code for large-scale codebase transformations and architectural moves

---

Context engineering is the skill that separates agents that hallucinate from agents that ship. The difference between describing a design and attaching the screenshot is often the difference between two revision cycles and zero. I've run this workflow across hundreds of client builds—PDF specs, screen recordings, voice memos, Figma exports—and the pattern holds: media-first context beats description-first, every time.

If you're building AI-powered workflows or want to architect context-first agent systems for your team, [book a strategy call](/contact). We'll audit your current stack, identify where context engineering gaps are costing you accuracy, and build a plan to fix them.
