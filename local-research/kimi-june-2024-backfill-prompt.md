# Blog Batch Generation: June 2024 Backfill

You are writing blog posts for williamspurlock.com — a technical blog by William Spurlock covering AI automation, developer tools, and web experiences. You are backfilling historical posts for **June 2024**. 

## CRITICAL RULES

1. **Write in present tense as if it IS June 2024.** Never say "back then," "at the time," "we now know," or reference anything after the post's date. Use "today," "this week," "just launched."
2. **Author:** William Spurlock. First-person "I". Never generic "we."
3. **Voice:** Senior staff engineer who ships in production. Precise, opinionated, zero fluff. Lead with the answer, then expand. No "in today's fast-paced world" energy.
4. **Never fabricate** benchmarks, model specs, pricing, client names, or ROI figures. If unsure, hedge with "early reports suggest."
5. **Each post must be 400–600 lines minimum** (target for spoke posts). Pillar posts target 600–800 lines.
6. **Structure:** 8–12 H2 sections, each starting with a bold 1–2 sentence direct answer. At least 1 table/code block/list per section. FAQ with 8+ questions at the end.
7. **No stock photo energy.** No emojis in prose. No filler paragraphs.

## Frontmatter Template

Every post uses this exact YAML frontmatter (copy this structure exactly, filling in the appropriate values):

---
title: "Post Title"
slug: "kebab-case-slug"
date: "2024-06-XX"
lastModified: "2024-06-XX"
author: "William Spurlock"
readingTime: 0
categories:
  - "Category Name"
tags:
  - "tag1"
  - "tag2"
featured: false
draft: false
excerpt: "150-160 char description."
coverImage: "/images/blog/slug-name.png"
seoTitle: "SEO Title Under 60 Chars | William Spurlock"
seoDescription: "Meta description for search engines."
seoKeywords:
  - "primary keyword"
  - "secondary keyword"
aioTargetQueries:
  - "how does X work"
  - "X vs Y comparison"
contentCluster: "cluster-name"
pillarPost: false
parentPillar: "parent-slug"
entityMentions:
  - "William Spurlock"
  - "Relevant Entity"
serviceTrack: "ai-automation"
---

## File Path Format

content/blog/2024/06/slug-name.md

## Posts to Generate (8 articles)

Generate each of these as a complete, standalone blog post:

### 1. Runway Gen-3 Alpha (Jun 4)
- **Title:** "Runway Gen-3 Alpha: The Text-to-Video Model That Finally Crossed the Uncanny Valley"
- **Cluster:** AI Models & Benchmarks | spoke | ai-automation
- **Angle:** Technical breakdown of Gen-3's architecture improvements over Gen-2, what "crossed the uncanny valley" means practically, pricing, API access, limitations. Compare to Sora (not yet public), Pika, Stable Video Diffusion.

### 2. Apple WWDC 2024 Deep Dive (Jun 10)
- **Title:** "Apple WWDC 2024: Apple Intelligence, Private Cloud Compute, and the ChatGPT Fallback Explained"
- **Cluster:** Conferences & Industry | pillar | both
- **Angle:** The three-tier model architecture (on-device, Private Cloud Compute, ChatGPT fallback). What "Apple Intelligence" means for developers. Siri upgrades, system-wide writing tools, Image Playground. Privacy architecture. What this means for the AI app ecosystem. This is a PILLAR post — aim for 600–800 lines.

### 3. Luma Labs Dream Machine (Jun 12)
- **Title:** "Luma Labs Dream Machine: The Free Text-to-Video Launch That Crashed the Internet"
- **Cluster:** AI Models & Benchmarks | spoke | ai-automation
- **Angle:** Dream Machine's free tier strategy, quality comparison to Runway Gen-3, the viral moment, server overwhelm, what "text-to-video for everyone" means for content creators and marketers.

### 4. Stable Diffusion 3 Medium Open Weights (Jun 13)
- **Title:** "Stable Diffusion 3 Medium 2B: The Open Weights Release That Sparked a License Backlash"
- **Cluster:** Open Source & Weights | spoke | ai-automation
- **Angle:** SD3 Medium architecture (MMDiT), the CreativeML Open RAIL-M++ license controversy, community backlash vs. Stability AI's financial pressures. Compare to SDXL and the emerging FLUX rumors.

### 5. Apple's Three-Tier Architecture (Jun 14)
- **Title:** "Apple's Three-Tier Model Architecture: On-Device, Private Cloud, and ChatGPT Explained"
- **Cluster:** AI in Apps | spoke | both
- **Angle:** Technical deep-dive into how Apple Intelligence routes requests across the three tiers. On-device models (~3B params), Private Cloud Compute security model, when/how ChatGPT gets called. Developer implications for SiriKit and App Intents.

### 6. DeepSeek-Coder-V2 (Jun 17)
- **Title:** "DeepSeek-Coder-V2 236B MoE: The First Open Code Model at GPT-4-Turbo Level"
- **Cluster:** AI Coding Tools | spoke | ai-automation
- **Angle:** Architecture (236B MoE, 21B active), benchmark performance vs GPT-4 Turbo on HumanEval/MBPP, what this means for self-hosted coding assistance, how to run it, practical limitations.

### 7. Google Gemma 2 (Jun 27)
- **Title:** "Google Gemma 2 9B + 27B: The Best Open Model Under 30B at Launch"
- **Cluster:** Open Source & Weights | spoke | ai-automation
- **Angle:** Gemma 2 architecture improvements (knowledge distillation from larger models), benchmark comparisons at the 9B and 27B size class, practical deployment with Ollama/vLLM, license (still permissive), what it replaces in the open-weights stack.

### 8. LangGraph + CrewAI Agent Frameworks (Jun 28)
- **Title:** "LangGraph 0.1 + CrewAI v0.30: The Agent Framework Wars Before MCP Existed"
- **Cluster:** AI Automation (n8n/Make) | spoke | ai-automation
- **Angle:** Compare LangGraph's graph-based orchestration vs CrewAI's role-based agents. Code examples for both. Limitations that would later be solved by MCP (but DON'T reference MCP — write as if it's June 2024 and MCP doesn't exist yet). When to use frameworks vs. raw tool-calling.

## Closing CTA Rules

- Posts with serviceTrack: "ai-automation" end with: a CTA to book an AI automation strategy call with William Spurlock.
- Posts with serviceTrack: "both" end with: whichever CTA fits the post's lean (AI automation call or custom website discovery call).
- Keep CTAs to 2–3 sentences. No hype. Direct.

## Cross-Linking

Link to these existing posts where relevant (use relative markdown links):
- /blog/claude-3-5-sonnet-artifacts-launch (Jun 20, 2024)
- /blog/n8n-beginner-guide (Jun 2024)
- /blog/apple-intelligence-wwdc-2024-unveiled (Jun 2024)
- /blog/gpt-4o-launch-openai-omni-model-free-tier (May 2024)
- /blog/google-io-2024-ai-count-project-astra (May 2024)
- /blog/cursor-secret-weapon-2024 (Apr 2024)

## Output Format

Output each post as a complete markdown file with full frontmatter + all sections written out + FAQ section with 8+ answered questions. Separate each post with a clear header like:

===FILE: content/blog/2024/06/slug-name.md===

So I can split them into individual files easily.
