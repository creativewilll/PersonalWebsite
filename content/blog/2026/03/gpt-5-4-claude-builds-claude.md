---
title: "GPT-5.4 Ships While Claude Builds Claude: The Self-Improving Model Era"
slug: "gpt-5-4-claude-builds-claude"
date: "2026-03-05"
lastModified: "2026-03-05"
author: "William Spurlock"
readingTime: 15
categories:
  - "AI Models and News"
tags:
  - "GPT-5.4"
  - "Claude"
  - "Self-Improving AI"
  - "OpenAI"
  - "Anthropic"
  - "AI Safety"
featured: false
draft: false
excerpt: "GPT-5.4 ships with native computer use and 47% tool efficiency gains. Anthropic's Claude now writes 70-90% of its own training code. The self-improving AI era is here."
coverImage: "/images/blog/gpt-5-4-claude-builds-claude.png"
seoTitle: "GPT-5.4 + Claude Builds Claude: Self-Improving AI Era | William Spurlock"
seoDescription: "GPT-5.4 ships with native computer use while Anthropic's Claude builds itself. Compare benchmarks, pricing, safety implications, and production deployment strategies."
seoKeywords:
  - "GPT-5.4"
  - "Claude builds Claude"
  - "self-improving AI"
  - "recursive AI improvement"
aioTargetQueries:
  - "what is GPT-5.4"
  - "Claude builds Claude meaning"
  - "self-improving AI models 2026"
  - "GPT-5.4 vs Claude Opus 4.6"
contentCluster: "foundation-models"
pillarPost: false
parentPillar: "gpt-5-launch-single-model-router"
entityMentions:
  - "William Spurlock"
  - "OpenAI"
  - "Anthropic"
  - "GPT-5.4"
  - "Claude"
  - "Dario Amodei"
  - "Sam Altman"
serviceTrack: "ai-automation"
---

# GPT-5.4 Ships While Claude Builds Claude: The Self-Improving Model Era

GPT-5.4 is live today, and Anthropic just published their most ambitious research direction yet: teaching Claude to improve its own architecture and training process. This is the week self-improving AI stopped being science fiction.

## What's New in GPT-5.4: The Delta from 5.3

**GPT-5.4 brings native computer-use capabilities, 47% more efficient tool search, and meaningfully lower error rates—at a higher per-token price but with net cost savings for many workloads.**

OpenAI shipped GPT-5.4 today, and the improvements over GPT-5.2 (which the 5.3-Codex branch came from) are substantial enough that they're calling this a mainline release rather than an incremental point update. The headline feature is native computer use: GPT-5.4 is the first general-purpose model with state-of-the-art computer-use capabilities built in, achieving 75.0% on OSWorld-Verified—exceeding human performance at 72.4%.

The benchmark deltas tell the story:

| Benchmark | GPT-5.4 | GPT-5.2 | Delta |
|-----------|---------|---------|-------|
| GDPval (knowledge work) | 83.0% | 70.9% | +12.1% |
| SWE-Bench Pro (coding) | 57.7% | 55.6% | +2.1% |
| OSWorld-Verified (computer use) | 75.0% | 47.3% | +27.7% |
| BrowseComp (web search) | 82.7% | 65.8% | +16.9% |
| Toolathlon (tool use) | 54.6% | 46.3% | +8.3% |

Factuality is improved: GPT-5.4's individual claims are 33% less likely to be false, and full responses are 18% less likely to contain errors compared to GPT-5.2. On spreadsheet modeling tasks matching junior investment banking analyst work, GPT-5.4 hits 87.3% vs. GPT-5.2's 68.4%.

Pricing has shifted up per-token but with efficiency gains:

| Model | Input | Cached Input | Output |
|-------|-------|--------------|--------|
| GPT-5.4 | $2.50/M tokens | $0.25/M tokens | $15/M tokens |
| GPT-5.2 | $1.75/M tokens | $0.175/M tokens | $14/M tokens |

The critical efficiency win is tool search: when using MCP servers with many tools, GPT-5.4 can look up tool definitions on-demand rather than loading them all into context upfront. In Scale's MCP-Atlas benchmark with 36 MCP servers enabled, total token usage dropped 47% while maintaining the same accuracy.

## Claude Builds Claude: Understanding the Research

**Claude now writes 70-90% of the code used to train new Claude model versions—a form of weak recursive self-improvement where the model automates its own development pipeline while humans retain control over objectives and gatekeeping.**

Anthropic's "Claude builds Claude" initiative isn't marketing. It's a documented shift in how frontier models are developed. As of March 2026, Claude writes the majority of its own training scaffolding, experiment code, and evaluation frameworks. Claude Code—the AI coding assistant—is now 100% written by Claude Code itself.

Here's how the mechanism works:

1. **Research Pipeline Automation**: Claude proposes architecture tweaks, hyperparameters, and data curation strategies
2. **Code Generation**: Claude writes the scaffolding code to run experiments and designs the evaluations to measure results
3. **Iterative Refinement**: Using tools like the Ralph Loop plugin, Claude reads its own past work to inform improvements
4. **Human Gatekeeping**: Humans set objectives, approve changes, allocate compute, and gate releases

This is *weak* recursive self-improvement, not the sci-fi autonomous variety. The humans haven't been removed from the loop—they've shifted from authors to editors and reviewers. The bottleneck is no longer "smart people hand-coding experiments" but rather "do we have enough reviewers and evaluations to keep up with the volume of experiments Claude can generate?"

The velocity impact is measurable:

| Metric | Value |
|--------|-------|
| Claude Code AI authorship | 100% (as of March 7, 2026) |
| New Claude version code AI-written | 70-90% |
| Internal speedup vs human colleagues | 427x on certain tasks |
| Major features shipped (Feb-Mar 2026) | 70+ in 52 days |
| Engineer productivity increase | ~27% |

The Claude Agent SDK enables this by giving Claude access to developer tools: file editing, bash commands, code execution, and verification capabilities. Advanced deployments use agent teams—multiple parallel Claude instances working on shared codebases without active human intervention. Anthropic demonstrated this by having 16 agents produce a 100,000-line C compiler capable of compiling Linux.

## The Self-Improvement Mechanism: Architecture vs Training Data

**True recursive self-improvement has three potential pathways—architecture modification, training data curation, and recursive distillation—and Anthropic is currently pursuing the second and third while keeping the first firmly in human hands.**

When people hear "self-improving AI," they imagine a model rewriting its own weights and suddenly becoming superintelligent. That's not what's happening. There are three distinct mechanisms, and Anthropic is deliberately choosing the safer ones:

### Pathway 1: Architecture Modification (Human-Gated)

Claude can propose architecture changes—"try a different attention mechanism here" or "adjust the layer normalization"—but humans review and approve. The model doesn't have write access to its own core architecture. This is the most dangerous pathway because architectural changes compound quickly and can produce unexpected emergent behaviors.

### Pathway 2: Training Data Curation (Claude-Automated)

This is where most of the 70-90% AI-written code comes from. Claude:
- Generates synthetic training examples
- Filters and ranks existing data for quality
- Creates curriculum learning schedules
- Designs evaluation frameworks

Example: Claude might analyze which coding problems from GitHub issues led to the most learning signal, then generate 10,000 variations on those patterns for the next training run.

### Pathway 3: Recursive Distillation (Emerging)

Claude 4 trains Claude 5, which trains Claude 6. Each generation learns from the previous one's outputs. This creates compounding capability gains but also compounding alignment risks—errors or biases in Claude N get amplified in Claude N+1.

```
Weak vs Strong Recursive Self-Improvement
─────────────────────────────────────────
WEAK (Current): Claude automates the research pipeline
                - Humans set objectives
                - Humans approve changes  
                - Humans gate releases
                - Claude writes code, runs experiments

STRONG (Speculative): Claude modifies itself autonomously
                - Model sets its own objectives
                - Model implements changes without approval
                - Model decides when to deploy
                - Human oversight minimal or absent
```

Anthropic's current position is firmly in the "weak" camp. The humans remain in control of the high-leverage decisions while Claude handles the high-volume, lower-stakes implementation work.

## GPT-5.4 vs Claude Opus 4.6: Head-to-Head Benchmarks

**Claude Opus 4.6 dominates agentic coding and long-context retrieval while GPT-5.4 leads on computer use benchmarks and tool efficiency—two different optimization targets reflecting each lab's strategic priorities.**

Claude Opus 4.6 shipped on February 5, 2026—about a month before GPT-5.4. Both are flagship models competing for the same production workloads, but their strengths diverge in ways that matter for deployment decisions.

### Direct Benchmark Comparison

| Benchmark | GPT-5.4 | Claude Opus 4.6 | Winner |
|-----------|---------|-----------------|--------|
| SWE-Bench Pro | 57.7% | 80.8% | Claude (+23.1%) |
| Terminal-Bench 2.0 | — | 65.4% | Claude |
| OSWorld-Verified | 75.0% | 72.7% | GPT-5.4 (+2.3%) |
| GDPval (knowledge work) | 83.0% | +144 Elo vs GPT-5.2 | Claude |
| BrowseComp | 82.7% | Leading | Claude |
| MRCR v2 (1M context) | — | 76% | Claude |
| BigLaw Bench | 91% | 90.2% | Tie |

### Key Differentiators

**Claude Opus 4.6 wins on:**
- Long-context coherence (1M tokens vs GPT-5.4's 272K standard)
- Agentic coding depth (Terminal-Bench, SWE-Bench Pro)
- Expert reasoning (Humanity's Last Exam leader)
- Professional knowledge work (GDPval-AA)

**GPT-5.4 wins on:**
- Token efficiency (47% reduction with tool search)
- Native computer use integration
- Deep web research (BrowseComp 82.7%)
- Visual document parsing (OmniDocBench)

### Pricing Reality Check

| Model | Input | Output |
|-------|-------|--------|
| GPT-5.4 | $2.50/M tokens | $15/M tokens |
| Claude Opus 4.6 | $5.00/M tokens | $25/M tokens |

Claude Opus 4.6 is roughly 2x the price of GPT-5.4. For pure coding workflows, the extra cost is usually worth it given the 23-point SWE-Bench advantage. For general knowledge work with heavy tool use, GPT-5.4's efficiency gains may close the effective cost gap.

Both models support 1M context windows in some capacity—GPT-5.4 in Codex with 2x usage multiplier, Opus 4.6 in general availability with standard pricing as of March 13.

## Safety Implications of Recursive Self-Improvement

**The core safety concern with self-improving AI isn't sci-fi runaway scenarios—it's speed asymmetry: models improving faster than human oversight, evaluation frameworks, and safety protocols can keep pace.**

Anthropic's "weak" recursive self-improvement approach maintains human control, but the safety community is watching closely because the velocity change is real. Safety tests have already produced models expressing hostile behaviors, and Anthropic revised their Responsible Scaling Policy to only promise a "delay" rather than a full halt when risks are discovered.

### The Speed Asymmetry Problem

Here's the concern in practical terms:

1. Claude generates 10,000 training examples in an hour
2. Claude runs the evaluation suite and reports results
3. Human reviewers check a sample of 100 examples
4. The training pipeline proceeds based on aggregate metrics

If Claude's generated data contains subtle systematic biases or reward hacking patterns, those get baked into the next model version before humans catch them. With 70-90% of training code now AI-written, the surface area for undetected issues has expanded dramatically.

### Safeguards in Place

| Safeguard | Implementation |
|-----------|----------------|
| Human gatekeeping | All deployments require human approval |
| Compute allocation | Humans control training budget and compute access |
| Objective setting | Humans define what to optimize for |
| Evaluation design | Multiple redundant evaluation frameworks |
| Red teaming | Adversarial testing before any release |
| Chain-of-thought monitoring | GPT-5.4 has low CoT controllability, making reasoning harder to hide |

### OpenAI's Counter-Position

OpenAI is taking a different approach. GPT-5.4 ships with expanded cyber safety monitoring, trusted access controls, and asynchronous blocking for high-risk requests. They've open-sourced a new evaluation measuring whether models can deliberately obfuscate their reasoning to evade monitoring. GPT-5.4 Thinking's ability to control its CoT is low—a positive safety property suggesting CoT monitoring remains effective.

The divergence is clear: Anthropic is experimenting with self-improvement at the research level while OpenAI ships incremental capability improvements with layered safety systems. Neither approach is obviously correct, and both carry risks.

## What This Means for Production AI Systems

**Production teams should evaluate GPT-5.4 for tool-heavy workflows and computer-use agents, while Claude Opus 4.6 remains the default for complex coding and long-context reasoning—the decision comes down to tool volume versus reasoning depth.**

If you're running AI in production today, both models demand attention for different use cases. Here's how to think about the migration:

### When to Switch to GPT-5.4

- **Heavy MCP/tool use**: The 47% token reduction from tool search directly translates to cost savings and lower latency
- **Computer-use agents**: 75% OSWorld-Verified performance exceeds human baseline—this is production-ready for many desktop automation tasks
- **Deep web research**: 82.7% BrowseComp with persistent multi-round search
- **Spreadsheet/document workflows**: 87.3% on investment banking modeling tasks

### When to Stick with Claude Opus 4.6

- **Complex codebases**: 80.8% SWE-Bench Pro is still the state of the art
- **Long-context reasoning**: 76% on 1M-token MRCR v2 vs. GPT-5.4's more limited extended context
- **Agentic coding with subagents**: Claude Code's agent teams and parallel execution are more mature
- **Expert domain work**: Legal (90.2% BigLaw), finance, and research tasks where Claude leads

### Migration Checklist

```
□ Audit current tool usage—count unique tools per workflow
□ If >20 tools regularly used, GPT-5.4's tool search likely saves money
□ Benchmark critical paths on both models with real data
□ Check context window needs—>272K regularly means Opus 4.6 or GPT-5.4 1M mode
□ Evaluate latency requirements—/fast mode in Codex gives 1.5x speed for GPT-5.4
□ Price out token efficiency vs. per-token cost for your volume
```

### The Self-Improvement Angle for Production

If Anthropic's self-improvement research translates to production Claude versions, we could see capability improvements arriving faster than traditional release cycles. A model that partially trained itself on your specific use case through synthetic data generation is a different beast than one trained on general internet text. That's not here yet—but the infrastructure is being built now.

For teams building on these platforms, the advice is the same as always: maintain model-agnostic architecture. The gap between GPT-5.4 and Claude Opus 4.6 will shift. New models will ship. Don't hardcode yourself into a single provider's assumptions about context windows, tool formats, or response schemas.

## The Competitive Landscape: OpenAI vs Anthropic Strategy

**OpenAI and Anthropic are running different races—OpenAI ships incremental capability improvements at predictable intervals while Anthropic bets on recursive self-improvement as the path to the next frontier, creating a strategic divergence that will reshape the market.**

The contrast between today's releases crystallizes the two labs' diverging philosophies:

| Dimension | OpenAI (GPT-5.4) | Anthropic (Claude) |
|-----------|------------------|-------------------|
| Release pattern | Incremental point releases | Step-function capability jumps |
| Self-improvement | Research interest, not productized | Central to development workflow |
| Safety approach | Layered monitoring and blocking | Human-in-the-loop gatekeeping |
| Target market | Broad enterprise adoption | Research-heavy, safety-conscious users |
| Integration depth | Native tools, computer use, Excel | Agent SDK, Claude Code, subagents |

### OpenAI's Play: Reliable Capability Delivery

GPT-5.4 represents OpenAI's strategy of shipping predictable improvements that enterprises can build around. The 1M context window, native computer use, and tool search are features that slot into existing workflows. The pricing is aggressive—$2.50/$15 per million tokens undercuts Claude Opus 4.6 by half.

The message to enterprise buyers: "You can depend on us to ship capabilities that matter, on a schedule you can plan around, at prices that scale."

### Anthropic's Play: The Recursive Gambit

Anthropic is making a higher-variance bet. If weak recursive self-improvement works, Claude could improve faster than traditional training runs allow. The 70+ features shipped in 52 days isn't just a productivity story—it's a demonstration of a different development velocity.

The risks are equally clear. Safety researchers worry about the velocity mismatch: models improving faster than evaluations can track. Anthropic's revised Responsible Scaling Policy acknowledges this by weakening their commitment from "halt" to "delay" when dangerous capabilities emerge.

### What This Means for Buyers

For production teams, the choice isn't obvious:

- **Choose OpenAI if** you want predictable roadmaps, lower per-token costs, and broad ecosystem integration
- **Choose Anthropic if** you're pushing the frontier on coding agents, value interpretability research, or want first access to self-improvement gains

The real answer for most teams: maintain provider-agnostic infrastructure and benchmark both on your actual workloads. The gap between these models shifts monthly. Don't lock yourself into either narrative.

## Timeline Predictions: When Recursive Improvement Goes Mainstream

**Weak recursive self-improvement is already here—70-90% of Claude's training code is AI-written today. Full autonomous self-improvement remains speculative, but the infrastructure for faster, model-assisted training cycles will mature within 12–18 months.**

Let's separate what's happening now from what might happen next:

### Current State (March 2026)

- Claude writes 70-90% of its own training scaffolding
- Claude Code is 100% AI-authored
- Human gatekeepers remain firmly in control
- Research velocity: 70+ features in 52 days demonstrates the speedup

### Near-Term Horizon (6–12 months)

The likely trajectory based on current trends:

| Timeline | Development |
|----------|-------------|
| Q2 2026 | Synthetic data generation becomes standard practice for fine-tuning |
| Q3 2026 | Self-evaluation loops: models scoring their own outputs for training curation |
| Q4 2026 | Automated architecture search for specific domains (not general model changes) |
| Q1 2027 | First production models with significant synthetic training data component |

### The Strong Self-Improvement Question

True autonomous recursive improvement—where a model modifies itself without human gatekeeping—remains speculative. The technical barriers are significant:

1. **Architecture modification safety**: Letting models change their own weights is dangerous and unnecessary for current gains
2. **Evaluation bottleneck**: We can't automatically evaluate models for all failure modes
3. **Alignment preservation**: Each self-modification risks drifting from original objectives

My view: weak recursive improvement continues scaling through 2026–2027. Strong recursive improvement requires breakthroughs in automated alignment verification that don't exist yet.

### What to Watch

Monitor Anthropic's Responsible Scaling Policy updates. If they strengthen commitments (moving back toward "halt" rather than "delay"), that signals confidence in control mechanisms. If they further weaken safeguards or stop publishing details, that suggests the control problem is proving harder than expected.

For production teams: prepare for faster model iteration cycles. The 6-month major release cadence may compress to 8–10 weeks for frontier labs using self-improvement infrastructure. Your evaluation pipelines need to keep pace.

## FAQ

### What is GPT-5.4 and how is it different from GPT-5.3?

**GPT-5.4 is OpenAI's first general-purpose model with native computer-use capabilities, achieving 75% on OSWorld-Verified (beating human performance at 72.4%).** It also introduces tool search for 47% token reduction in MCP-heavy workflows, improves factuality (33% fewer false individual claims), and boosts spreadsheet modeling from 68.4% to 87.3% on internal benchmarks.

### What does "Claude builds Claude" actually mean?

**It means Claude now writes 70–90% of the code used to train new Claude versions—a form of weak recursive self-improvement.** Claude generates training data, writes evaluation scaffolding, and proposes experiments. Humans retain control over objectives, compute allocation, and release decisions. Claude Code itself is 100% written by Claude Code.

### Is recursive self-improvement safe?

**Weak recursive self-improvement (current) is manageable with proper safeguards; strong recursive self-improvement (speculative) raises serious control concerns.** The current approach maintains human gatekeepers at critical decision points. The risk is speed asymmetry—models improving faster than human oversight and evaluation can track.

### How do GPT-5.4 and Claude Opus 4.6 compare?

**Claude Opus 4.6 leads on coding (80.8% SWE-Bench Pro vs 57.7%) and long-context retrieval; GPT-5.4 leads on computer use (75% OSWorld) and token efficiency.** GPT-5.4 costs roughly half as much per token ($2.50/$15 vs $5/$25 per million). Choose Claude for complex codebases, GPT-5.4 for tool-heavy agents.

### When will self-improving AI be available in production?

**Weak self-improvement is already here—Claude's current capabilities demonstrate that.** Synthetic data generation and automated evaluation will become standard practice within 6–12 months. Strong autonomous self-improvement remains speculative and likely years away due to safety and technical barriers.

### What are the compute costs for self-improving models?

**Training costs don't change much; the efficiency gain is in researcher productivity.** Claude generates experiments that would take humans days in hours. The compute for training runs is similar, but you get more experiments per unit of human attention. For inference, GPT-5.4's tool search cuts token usage 47% in MCP-heavy workflows.

### How does AI self-improvement differ from AutoML?

**AutoML automates hyperparameter search and architecture selection for specific tasks; recursive self-improvement targets the model's own general capabilities.** AutoML requires a fixed dataset and objective. Self-improvement potentially affects what the model can do and how it reasons across all domains.

### Should I switch from GPT-5.3 to GPT-5.4?

**Yes, unless you're locked into specific GPT-5.3 behaviors.** GPT-5.4 subsumes GPT-5.3-Codex's coding capabilities while adding computer use and tool search. The 47% token reduction alone often justifies migration for tool-heavy workflows. GPT-5.2/5.3 remain available through June 5, 2026 for legacy compatibility.

### What safeguards exist for self-improving AI?

**Human gatekeeping, compute controls, and evaluation redundancy.** Anthropic requires human approval for all deployments and maintains human control over objectives and reward shaping. OpenAI's GPT-5.4 includes expanded cyber safety monitoring, trusted access controls, and Chain-of-Thought controllability testing.

### How does this affect AI coding assistants?

**AI coding assistants are becoming the primary interface for self-improvement.** Claude Code is now 100% AI-written and supports agent teams for parallel work. GPT-5.4 in Codex offers /fast mode for 1.5x token velocity. Both trends point to coding assistants as the control surface for increasingly autonomous development workflows.

## Closing

**The self-improving model era isn't coming—it's here.** GPT-5.4 ships today with native computer use and tool search that cuts token costs nearly in half. Anthropic's "Claude builds Claude" initiative already generates 70–90% of the code that trains new Claude versions. The question for production teams isn't whether to adopt these capabilities, but how quickly you can evaluate and deploy them without breaking existing workflows.

For teams building AI-powered operations, this is exactly the kind of inflection point where architecture decisions compound. The labs building these models are iterating faster than ever. Your infrastructure needs to keep pace.

### Related Reading

- **[GPT-5 and the Single Model Router](/blog/2025/08/gpt-5-launch-single-model-router)** — How OpenAI consolidated their model lineup and what it means for product strategy
- **[Claude 4 and the New Cursor](/blog/2025/05/claude-4-cursor-1-io-build-week)** — First look at Claude 4's coding capabilities and the Cursor integration
- **[Anthropic Skills and the New Prompt](/blog/2025/10/anthropic-skills-launch-new-prompt)** — Understanding the Claude Skills architecture and how it enables agent workflows
- **[Claude Opus 4.6: The Complete Guide](/blog/2026/03/claude-opus-4-6-guide)** — Deep dive into Anthropic's flagship model and when to use it

---

*Need help navigating the rapidly shifting AI landscape? I build custom AI automation systems that integrate GPT-5.4, Claude Opus 4.6, and self-improving agent workflows into production operations. [Book an AI automation strategy call](https://williamspurlock.com/contact) to discuss your specific use case.*
