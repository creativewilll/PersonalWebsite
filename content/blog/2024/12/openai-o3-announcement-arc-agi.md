---
title: "OpenAI o3 + o3-Mini Announcement: 87.5% on ARC-AGI — Did OpenAI Just Hit AGI?"
slug: "openai-o3-announcement-arc-agi"
date: "2024-12-20"
lastModified: "2024-12-20"
author: "William Spurlock"
readingTime: 8
categories:
  - "AI Models and News"
tags:
  - "OpenAI o3"
  - "o3-mini"
  - "ARC-AGI"
  - "reasoning models"
  - "AGI"
  - "benchmark"
  - "12 Days of OpenAI"
  - "test-time compute"
  - "AI reasoning"
  - "frontier models"
featured: false
draft: false
excerpt: "OpenAI just announced o3 and o3-mini, achieving 87.5% on the ARC-AGI benchmark—a score that exceeds human performance. Here's what this means for the AGI timeline and what o3 actually delivers."
coverImage: "/images/blog/openai-o3-announcement-arc-agi.png"
seoTitle: "OpenAI o3 87.5% ARC-AGI Score: AGI Breakdown | William Spurlock"
seoDescription: "OpenAI's o3 model achieves 87.5% on ARC-AGI benchmark—exceeding human performance. Analysis of o3 vs o3-mini, the AGI debate, and what this means for AI development."
seoKeywords:
  - "OpenAI o3"
  - "o3 ARC-AGI score"
  - "ARC-AGI benchmark"
  - "o3 vs o3-mini"
  - "OpenAI AGI"
  - "test-time compute"
  - "reasoning models"
  - "AI benchmark 2024"

# AIO/AEO Fields
aioTargetQueries:
  - "what is OpenAI o3"
  - "o3 ARC-AGI score explained"
  - "is o3 AGI"
  - "ARC-AGI benchmark meaning"
  - "o3 vs o3-mini difference"
  - "OpenAI o3 release date"
  - "high compute vs low compute ARC-AGI"
  - "o3 reasoning model capabilities"
contentCluster: "ai-models"
pillarPost: false
parentPillar: "choosing-the-right-llm"
entityMentions:
  - "William Spurlock"
  - "OpenAI"
  - "o3"
  - "o3-mini"
  - "ARC-AGI"
  - "ARC Prize Foundation"
  - "Greg Kamradt"
  - "François Chollet"
  - "Sam Altman"

# Service Track Routing
serviceTrack: "ai-automation"
---

# OpenAI o3 + o3-Mini Announcement: 87.5% on ARC-AGI — Did OpenAI Just Hit AGI?

**OpenAI just announced o3 and o3-mini today, and the numbers are staggering.** On the ARC-AGI benchmark—a test specifically designed to measure general intelligence—o3 scored **87.5%** with high compute settings. That's not just a new high score. That's a score that exceeds human-level performance on a benchmark that has resisted solution for five years.

Here's why this matters: ARC-AGI isn't another standardized test where models memorize patterns. It's a test of **fluid intelligence**—the ability to reason about novel problems you've never seen before. From 2019 until today, no AI system had cracked 55% on the private evaluation set. o3 just blew past 75% in low-compute mode and hit 87.5% when allowed to think longer.

This is Day 12 of OpenAI's "12 Days of OpenAI" event. The company is announcing two models—**o3**, the full-capability reasoning flagship, and **o3-mini**, a cost-efficient variant that still outperforms o1 on most tasks. Neither is publicly available yet; safety researchers can apply for o3-mini preview access starting today, with a full launch expected in late January.

Let's break down what o3 actually achieved, why the ARC-AGI benchmark matters, whether this constitutes AGI, and what the high-compute vs. low-compute distinction means for practical deployment.

---

## What Is the ARC-AGI Benchmark and Why Does 87.5% Matter?

**ARC-AGI** (Abstraction and Reasoning Corpus for Artificial General Intelligence) was introduced in 2019 by François Chollet as a test specifically designed to resist memorization-based solutions. Unlike benchmarks that test domain knowledge or pattern matching, ARC-AGI tests **skill-acquisition efficiency**—how quickly a system can learn to solve entirely novel visual reasoning problems.

Each ARC-AGI task presents a grid-based puzzle: you're shown 2-3 example input-output pairs that demonstrate some transformation rule, then asked to apply that rule to a new input. The tasks require concepts like objectness, topology, symmetry, and elementary arithmetic—what Chollet calls **"core knowledge priors"** that humans acquire before age four.

The significance of o3's 87.5% score becomes clear when you look at the historical progression:

| Year | Best Score | Approach |
|------|------------|----------|
| 2019 | 0% | Baseline |
| 2020 | 20% | Brute-force program search |
| 2022 | 31% | Improved DSL search |
| 2023 | 33% | LLM-guided synthesis |
| Nov 2024 | 55.5% | Test-time training (MindsAI) |
| **Dec 2024** | **87.5%** | **o3 (high compute)** |

**The human performance threshold on ARC-AGI is approximately 85%.** Greg Kamradt, President of the ARC Prize Foundation, stated during today's announcement: "When I see these results, I need to switch my worldview about what AI can do and what it is capable of."

This isn't incremental progress. This is the first time an AI system has demonstrably exceeded average human performance on a general reasoning benchmark designed specifically to be resistant to the scaling and memorization techniques that powered LLM progress from GPT-2 to GPT-4.

---

## The High Compute vs. Low Compute Distinction Explained

**o3's performance varies dramatically based on how much compute you give it at inference time.** This is a fundamental shift from traditional LLMs, where the model is frozen after training and inference cost is roughly constant regardless of task difficulty.

ARC-AGI scores for o3:

| Compute Level | Score | Cost Estimate |
|---------------|-------|---------------|
| Low compute | 75.7% | ~$10K per 100 tasks |
| High compute | 87.5% | Estimated $100K+ per 100 tasks |
| Human baseline | ~85% | N/A |

The low-compute score (75.7%) already exceeds the previous high score of 55.5% set just weeks ago by MindsAI. The high-compute score (87.5%) exceeds human-level performance—but at what appears to be a **dramatically higher cost per task**.

This "test-time compute scaling" is the core innovation of the o-series models. Unlike GPT-4, which produces tokens in a single forward pass, o3 **thinks**—running internal reasoning steps, generating and testing hypotheses, before producing a final answer. More compute equals more thinking time equals better results.

François Chollet, the benchmark's creator, emphasized this distinction: the 75.7% score was achieved within ARC Prize's public leaderboard compute constraints (under $10K per evaluation), while the 87.5% score used "aggressive test-time settings" that likely cost hundreds of thousands of dollars.

---

## o3's Performance Across Other Benchmarks

**ARC-AGI isn't the only benchmark where o3 set records.** OpenAI presented results across multiple domains showing consistent, significant improvements over o1:

| Benchmark | o1 Score | o3 Score | Improvement |
|-----------|----------|----------|-------------|
| SWE-Bench Verified | ~49% | 71.7% | +22% |
| AIME 2024 (Math) | 83.3% | 96.7% | +13% |
| GPQA Diamond (Science) | 78% | 87.7% | +10% |
| Codeforces Elo | ~1891 | ~2727 | +836 |
| Frontier Math | <2% | 25.2% | +23% |

**SWE-Bench Verified** measures real-world software engineering tasks—o3's 71.7% represents a 20% improvement over o1 and establishes a new high score for autonomous coding. Mark Chen, OpenAI's research lead, noted that o3's Codeforces Elo of 2727 exceeds both his own competitive programming rating and that of OpenAI Chief Scientist Jakub Pachocki.

**Frontier Math** is particularly notable—described by OpenAI as "the toughest mathematical benchmark out there," consisting of novel problems that take professional mathematicians hours or days to solve. The previous best score was under 2%. o3 achieved 25.2%.

These aren't cherry-picked results. They're consistent across coding, mathematics, and scientific reasoning domains.

---

## What Is o3-Mini and How Does It Compare?

**o3-mini is the efficient sibling—designed to deliver o3-class reasoning at a fraction of the cost.** It introduces a feature called **adaptive thinking time** with three selectable reasoning effort levels: low, medium, and high.

Key characteristics of o3-mini:

| Feature | o3 | o3-mini |
|---------|-----|---------|
| Reasoning effort | Fixed (automatic) | Adjustable (low/medium/high) |
| Cost | Higher | ~10% of o3 |
| Speed | Slower | Faster, especially on low |
| Coding (Codeforces) | Elo ~2727 | Elo ~2070 (high) |
| Math (AIME) | 96.7% | Comparable to o1 |
| Tool access | Full | Function calling, structured outputs |
| Vision | Yes | No |

o3-mini with **medium** reasoning effort matches o1's performance on math, coding, and science tasks while delivering responses faster. OpenAI showed a live demo where o3-mini high generated a complete Python code generator and executor, then evaluated itself on GPQA—all in under a minute.

**The adaptive thinking time feature is significant.** It allows developers to trade off speed against quality based on use case. Low effort for quick queries where you need instant responses; high effort for complex problems where accuracy matters more than latency.

o3-mini enters safety testing today alongside o3. OpenAI plans to launch o3-mini in late January 2025, followed by the full o3 model shortly after.

---

## Why Did OpenAI Skip o2? The Naming Mystery

**OpenAI jumped directly from o1 to o3, skipping o2 entirely.** Sam Altman explained the reasoning during today's livestream: "Out of respect to our friends at Telefónica and in the grand tradition of OpenAI being really truly bad at names, it's going to be called o3."

The reference is to **O2**, the British telecommunications provider. OpenAI wanted to avoid trademark conflicts with a major European brand. The result is a naming convention that will confuse anyone tracking model versioning—but it's the official designation.

---

## The AGI Debate: Did OpenAI Just Achieve Artificial General Intelligence?

**The short answer: no—but this is the closest any system has come.** The ARC-AGI 87.5% score sparked immediate debate about whether o3 constitutes AGI, with opinions varying dramatically across the AI research community.

### The Case For Significance

François Chollet, despite being the architect of the benchmark that would certify AGI, was explicit: **"Passing ARC-AGI does not equate to achieving AGI, and, as a matter of fact, I don't think o3 is AGI yet."** However, he also called o3 "a surprising and important step-function increase in AI capabilities, showing novel task adaptation ability never seen before in the GPT-family models."

The ARC Prize Foundation's position is that ARC-AGI measures a **necessary but not sufficient** condition for AGI. A system that cannot perform well on novel reasoning tasks cannot be considered generally intelligent. But passing ARC-AGI doesn't guarantee the system possesses other AGI characteristics like autonomous learning, real-world grounding, or transfer across entirely different domains.

### The Skeptical View

AI researcher **Gary Marcus** criticized the o3 announcement, arguing that OpenAI effectively "trained to the test" by pretraining o3 on ARC-AGI-like tasks. OpenAI has denied this, noting they didn't specifically optimize for ARC-AGI—but the broader concern about data contamination in reasoning benchmarks remains valid.

Critics also point to **inconsistent performance**: o3 fails on some "easy" ARC-AGI tasks that humans solve trivially, even while acing harder problems. This non-monotonic performance—being superhuman on some tasks and subhuman on others—suggests the reasoning is qualitatively different from human cognition, not just quantitatively better.

### The Economic Argument

Perhaps the most practical counter-argument: **cost**. If the 87.5% score required hundreds of thousands of dollars in compute per 100 tasks, is that "intelligence" in any economically meaningful sense? Sam Altman himself has predicted that "we will hit AGI much sooner than most people in the world think and it will matter much less."

The reasoning: if AGI requires $100K per task, it's not replacing human labor—it's a research curiosity. The real inflection point comes when AGI capabilities meet affordable compute costs.

---

## What o3 Gets Wrong: The Failure Modes

**o3 is not universally superhuman.** Chollet highlighted specific ARC-AGI tasks where o3 fails completely despite their simplicity for humans. These failures reveal the boundaries of current reasoning capabilities:

**Example failure mode:** Tasks requiring explicit counterfactual reasoning or physical intuition about objects and their relationships. While o3 handles abstract pattern matching at superhuman levels, it sometimes misses obvious constraints that a four-year-old would grasp immediately.

The pattern of failures suggests that o3's reasoning is **extensive** (good at exploring many solution paths) but not always **intensive** (deeply understanding the causal structure of a problem). It's breadth-first search over reasoning chains rather than grounded conceptual understanding.

---

## The Test-Time Compute Shift

**o3 represents a fundamental architectural shift in how AI systems work.** Traditional LLMs are "thoughtless" in inference—they generate tokens based on training patterns without explicit reasoning steps. o3 is the first production-oriented model built on **test-time compute scaling**:

1. **More compute at training** = better base model (GPT-3 → GPT-4)
2. **More compute at inference** = better reasoning (o1 → o3)

This changes the economics of AI deployment. With GPT-4, marginal cost per query trends toward zero because inference is cheap and constant. With o3, marginal cost increases with problem difficulty because harder problems require more thinking time.

**Implications for builders:**
- Cost estimation becomes harder (depends on reasoning depth)
- Caching strategies become more important
- Query optimization (when to use low vs. high effort) becomes a skill
- Some tasks that were affordable with GPT-4 may be prohibitively expensive with o3 full reasoning

---

## When Will o3 and o3-Mini Be Available?

**Neither model is launching to the public today.** OpenAI is taking a cautious approach to release, prioritizing safety testing over speed to market.

Current timeline:

| Milestone | Date | Details |
|-----------|------|---------|
| Safety testing applications open | Today (Dec 20, 2024) | Researchers can apply for o3-mini access |
| Application deadline | January 10, 2025 | Rolling review until this date |
| o3-mini public launch | Late January 2025 | Full availability expected |
| o3 public launch | Early 2025 | Shortly after o3-mini |

OpenAI also announced **"deliberative alignment"**—a new safety technique that uses o3's reasoning capabilities to evaluate prompts for safety concerns. The model reasons about whether a request is safe before answering, achieving better tradeoffs between helpfulness and safety than previous approaches.

---

## How o3 Compares to Competitors

**As of today, o3 establishes clear dominance in reasoning benchmarks.** Here's the competitive landscape:

| Model | ARC-AGI | SWE-Bench | AIME | GPQA |
|-------|---------|-----------|------|------|
| o3 (high) | 87.5% | 71.7% | 96.7% | 87.7% |
| o3 (low) | 75.7% | — | — | — |
| o1 | — | ~49% | 83.3% | 78% |
| Claude 3.5 Sonnet | ~14% | ~50% | ~65% | ~65% |
| GPT-4o | ~5% | ~30% | ~45% | ~55% |
| DeepSeek R1 | ~15%* | ~50%* | ~80%* | ~70%* |

*Estimated based on available data

No competitor currently approaches o3's ARC-AGI performance. The gap between o3 (75.7% low compute) and the next best publicly known system (MindsAI at 55.5%) is larger than the entire progress made in the previous four years.

---

## What This Means for AI Builders

**For practitioners building with AI, o3's announcement signals several shifts:**

**1. Reasoning is the new differentiator**
The gap between "fast" models (GPT-4o) and "reasoning" models (o3) is now larger than the gap between frontier and open-weight models was a year ago. Tasks requiring multi-step reasoning should migrate to o-series models.

**2. Cost structures are changing**
Per-token pricing may become less relevant than per-task pricing as models adopt test-time compute. Budgeting for AI workflows becomes harder but more important.

**3. The safety testing precedent**
OpenAI's decision to delay public release for safety testing—while allowing researcher access—may become a template for future frontier model releases.

**4. Mini models are viable for production**
o3-mini's adaptive thinking time makes it practical to use reasoning models for everyday tasks without breaking budgets.

---

## Frequently Asked Questions

### Q: What is OpenAI o3 and when was it announced?
**A:** **o3 is OpenAI's next-generation reasoning model**, announced today (December 20, 2024) as part of the "12 Days of OpenAI" event. It achieves **87.5% on the ARC-AGI benchmark** with high compute settings—exceeding human-level performance for the first time.

### Q: What is the ARC-AGI benchmark and why is 87.5% significant?
**A:** **ARC-AGI measures general intelligence through novel visual reasoning tasks** that resist memorization. The 87.5% score is significant because it exceeds the human baseline of ~85% and represents a **32-point jump** over the previous high score of 55.5% set just weeks ago.

### Q: Is o3 actually AGI?
**A:** **No—according to François Chollet, ARC-AGI's creator, passing the benchmark does not equal AGI.** While o3 demonstrates unprecedented novel task adaptation, it lacks characteristics like autonomous learning and consistent performance across all task types. It's a major step toward AGI, not AGI itself.

### Q: What is the difference between o3 and o3-mini?
**A:** **o3 is the full-capability flagship; o3-mini is the cost-efficient variant.** o3-mini offers **adaptive thinking time** (low/medium/high settings) and delivers comparable performance to o1 at roughly 10% of o3's cost. It's ideal for production use cases where cost matters.

### Q: What is "high compute" vs "low compute" on ARC-AGI?
**A:** **These refer to how much thinking time o3 is allowed.** Low compute (~$10K per 100 tasks) yielded 75.7%. High compute (estimated $100K+ per 100 tasks) yielded 87.5%. The difference demonstrates that **o3's performance scales with inference compute**—a fundamental shift from traditional LLMs.

### Q: When will o3 and o3-mini be publicly available?
**A:** **Safety researchers can apply for o3-mini preview access starting today**, with applications closing January 10, 2025. OpenAI plans to launch **o3-mini in late January 2025** and the full **o3 model shortly after**.

### Q: How much will o3 and o3-mini cost?
**A:** **Official pricing hasn't been announced**, but estimates suggest o3 will be significantly more expensive than o1, while o3-mini targets ~10% of o3's cost. The key difference is **test-time compute scaling**—harder problems cost more to solve.

### Q: Why did OpenAI skip o2 and go straight to o3?
**A:** **Trademark avoidance.** Sam Altman explained they skipped o2 "out of respect to our friends at Telefónica" to avoid conflicts with the British telecom provider O2.

### Q: What benchmarks did o3 improve on besides ARC-AGI?
**A:** **o3 set records on multiple benchmarks:** 71.7% on SWE-Bench Verified (software engineering), 96.7% on AIME 2024 (math competition), 87.7% on GPQA Diamond (PhD-level science), and 25.2% on Frontier Math (previously best was <2%).

### Q: What are o3's limitations and failure modes?
**A:** **o3 fails on some "easy" ARC-AGI tasks** that humans solve trivially, showing inconsistent performance across different problem types. It also requires **substantial compute** for peak performance, making it expensive for many real-world applications.

### Q: What is "deliberative alignment"?
**A:** **Deliberative alignment is OpenAI's new safety technique** that uses o3's reasoning capabilities to evaluate prompts for safety concerns before answering. It achieves better helpfulness/safety tradeoffs than previous approaches by having the model explicitly reason about whether requests are safe.

### Q: How does o3 compare to Claude 3.5 Sonnet and other competitors?
**A:** **o3 significantly outperforms all current competitors on reasoning benchmarks.** Claude 3.5 Sonnet scores ~14% on ARC-AGI versus o3's 87.5%. The gap is particularly large on tasks requiring extended reasoning chains.

---

## The Bigger Picture: What o3 Tells Us About AI Progress

**Today's o3 announcement reframes the AGI timeline.** For five years, ARC-AGI resisted solution despite massive scaling of LLMs—suggesting that raw parameter count and training data wouldn't be enough. o3's breakthrough comes from **architectural innovation** (test-time reasoning) rather than just scale.

The implications extend beyond benchmarks:

1. **Reasoning is trainable.** o3 demonstrates that explicit reasoning chains can be learned and scaled, not just emergent behaviors.

2. **Intelligence has a compute cost curve.** Unlike traditional software where marginal cost trends to zero, o3 shows that better reasoning costs more per query. This changes how we think about AI economics.

3. **Benchmark saturation is coming.** ARC-AGI was designed to be the "final boss" of reasoning benchmarks. With o3 now exceeding human performance, the field needs new evaluation frameworks.

---

## Ready to Build with the Latest AI Capabilities?

**o3 represents the new frontier in AI reasoning—but most organizations haven't fully tapped into the current generation yet.** Whether you need help integrating reasoning models into production workflows, building autonomous AI agents with test-time compute, or automating complex business processes, the infrastructure now exists to do work that was impossible six months ago.

**William Spurlock** builds production-grade AI automation systems for teams that need more than chatbots. From n8n workflows that orchestrate reasoning models to custom AI agents that handle real business processes—if you need AI that delivers measurable outcomes, let's talk.

[Book an AI automation strategy call](/contact) to explore how reasoning models, workflow automation, and intelligent agents can transform your operations.

---

## Related Reading

- [OpenAI o1-Preview + o1-Mini: The Chain-of-Thought Reasoning Era Begins](../09/openai-o1-preview-reasoning-launch.md)
- [1-800-CHATGPT: OpenAI Launches a Phone Number for Voice Access](./1-800-chatgpt-phone-launch.md)
- [Claude 3.5 Sonnet + Artifacts: The Day Anthropic Beat GPT-4o Across Major Benchmarks](../06/claude-3-5-sonnet-artifacts-launch.md)
