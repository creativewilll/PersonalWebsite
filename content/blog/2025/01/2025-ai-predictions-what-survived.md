---
title: "2025 AI Predictions: What Survived from 2024 and What Didn't"
slug: 2025-ai-predictions-what-survived
date: 2025-01-02
lastModified: 2025-01-02
author: William Spurlock
readingTime: 18
categories:
  - Conferences & Industry
  - AI Strategy
tags:
  - AI Predictions
  - GPT-5
  - Claude 4
  - AI Agents
  - 2025 Forecast
  - OpenAI
  - Anthropic
  - Gemini
  - AI Hardware
  - Enterprise AI
featured: true
draft: false
excerpt: As 2025 begins, I analyze which late-2024 AI predictions held up and which missed the mark. From GPT-5 timelines to agent adoption curves, here's what actually survived the transition.
coverImage: /images/blog/2025-ai-predictions-what-survived.png
seoTitle: "2025 AI Predictions: What Survived from 2024 | William Spurlock"
seoDescription: Analysis of AI predictions made in late 2024 for 2025. Which forecasts about GPT-5, Claude 4, AI agents, and hardware trends actually held up? January 2025 reality check.
seoKeywords:
  - 2025 AI predictions
  - GPT-5 release date
  - Claude 4 release
  - AI agents 2025
  - OpenAI 2025 roadmap
  - Anthropic 2025
  - AI hardware 2025
  - enterprise AI adoption
  - AI reasoning models
  - multimodal AI 2025
aioTargetQueries:
  - What are the major AI predictions for 2025?
  - When will GPT-5 be released in 2025?
  - What happened to AI agent predictions for 2025?
  - Which AI predictions from 2024 came true?
  - What AI trends survived from 2024 to 2025?
contentCluster: Conferences & Industry
pillarPost: false
entityMentions:
  - name: OpenAI
    type: Organization
  - name: Anthropic
    type: Organization
  - name: Google DeepMind
    type: Organization
  - name: Meta
    type: Organization
  - name: Cerebras
    type: Organization
  - name: Groq
    type: Organization
  - name: GPT-5
    type: Product
  - name: Claude 4
    type: Product
  - name: Gemini 2.5
    type: Product
  - name: o3
    type: Product
  - name: ARC-AGI
    type: TechnicalConcept
serviceTrack: both
---

# 2025 AI Predictions: What Survived from 2024 and What Didn't

We're two days into 2025. The hangover from New Year's predictions is wearing off, and it's time for a reality check. Late last year, the AI industry was drowning in forecasts—GPT-5 was "just weeks away," Claude 4 was "coming soon," agents were going to automate every business process by March, and custom AI chips were supposed to dethrone NVIDIA.

I tracked these predictions closely. Not because I enjoy watching people be wrong—though there's some schadenfreude in that—but because the gap between forecast and reality tells you more about the industry than the forecasts themselves. It reveals what we collectively want to believe, what we're afraid of, and where the actual engineering constraints are.

Here's what I found: some predictions survived the transition intact. Others didn't make it past January 1st. And a few flipped from confident predictions to quiet embarrassments.

---

## The GPT-5 Timeline Prediction: Partially Survived But Slipping

**Most analysts predicted a GPT-5 announcement by early 2025, and they weren't wrong—but the timeline is stretching in ways that matter.**

In late December 2024, Sam Altman announced o3, the successor to o1, with record-breaking ARC-AGI scores (87.5% on low-efficiency settings). The announcement included a roadmap: o3-mini in "late January 2025," followed by o3 "shortly after." But here's where it gets complicated—Altman also confirmed that GPT-5 would arrive "in the coming weeks and months," not days.

Let me break down what we know versus what was predicted:

| Prediction Made in Late 2024 | Current Status (Jan 2, 2025) | Reality Gap |
|------------------------------|------------------------------|-------------|
| GPT-5 "before mid-2025" | Still plausible, but vague | Altman's "weeks/months" is intentionally non-committal |
| GPT-4.5 as stopgap | Not mentioned in o3 announcement | The o-series seems to be the priority |
| Unified model picker elimination | Confirmed | This prediction survived—GPT-5 will merge o-series and GPT-series |
| Free tier access to GPT-5 | Planned but undefined | Altman promised "unlimited access" at a standard intelligence setting |

The o3 announcement was the wildcard. Its 96.7% score on the 2024 AIME and 87.7% on GPQA Diamond suggest OpenAI achieved a reasoning breakthrough that might have delayed GPT-5's architecture. If o3 represents the reasoning layer that GPT-5 will incorporate, then the delay makes engineering sense.

What didn't survive the prediction cycle: the certainty. Late 2024 forecasts treated GPT-5 as inevitable by March 2025. Now we're looking at a sliding window that could extend into Q2.

---

## The Claude 4 Forecast: Quietly Abandoned

**Predictions for a Claude 4 release in early 2025 have gone silent, replaced by strategic positioning around Claude 3.5 Sonnet's extended capabilities.**

In October and November 2024, several analyst reports—including some I tracked from enterprise consulting firms—predicted Anthropic would release Claude 4 by Q1 2025 to compete with GPT-5. The logic was sound: Anthropic had maintained roughly 6-8 month release cadences between major versions, and Claude 3 Opus launched in March 2024.

That prediction didn't survive December. Here's what happened instead:

- **November 2024**: Anthropic released "Computer Use" in public beta—a feature that lets Claude control desktop environments
- **December 2024**: The company shipped extended thinking modes to Claude 3.5 Sonnet, effectively giving it reasoning capabilities without a version bump
- **January 2025**: All public communications focus on Computer Use adoption and enterprise integrations, not Claude 4

The pivot makes sense from an engineering standpoint. Claude 3.5 Sonnet already tops coding benchmarks (72.7% on SWE-bench in extended thinking mode). Computer Use represents a capability expansion that doesn't require a new base model. Anthropic appears to be betting that agentic functionality matters more than raw benchmark improvements.

| Claude Prediction | Status | What Actually Happened |
|-------------------|--------|------------------------|
| Claude 4 Q1 2025 | Abandoned | No public timeline; focus shifted to capabilities |
| Extended context windows | Delayed | 200K tokens standard; 1M in limited pilots |
| Computer Use enterprise adoption | Ahead of schedule | Public beta became production-ready |
| Hybrid reasoning modes | Shipped early | Released in December 2024 |

My assessment: Claude 4 will arrive, but not on the predicted timeline. Anthropic is following a capabilities-first strategy, releasing features as they're ready rather than bundling them into major version releases.

---

## The "Year of AI Agents" Prediction: Surviving But Redefined

**The prediction that 2025 would be the "year of AI agents" has survived, but the definition of "agent" has narrowed significantly from the original forecasts.**

In late 2024, BCG, McKinsey, and Deloitte all published predictions about autonomous AI agents. The consensus forecast was aggressive: 25% of enterprises would deploy autonomous agents by mid-2025, and agents would handle complex multi-step workflows without human intervention.

Two days into 2025, we can verify the trajectory:

- **Enterprise adoption**: KPMG data from Q4 2024 shows agent deployment at 11% of organizations—not 25%, but accelerating
- **Use cases**: Most production deployments are "augmented agents" (human-in-the-loop) rather than fully autonomous
- **Investment**: Enterprise spending on agentic infrastructure crossed $8.2B in Q4 2024, outpacing traditional RPA for the first time

Here's the reality gap in table form:

| Agent Prediction (Late 2024) | January 2025 Reality | Grade |
|------------------------------|----------------------|-------|
| 25% autonomous deployment by mid-2025 | 11% current, mostly augmented | C+ (wrong metric, right trend) |
| Full workflow automation | Task-level automation dominant | B (partial fulfillment) |
| Multi-agent orchestration | Single-agent deployments prevail | C (complexity underestimated) |
| Agent orchestrators as a category | Not yet; 2026 projected | D (timing off) |
| ROI demonstration required | 4.1x average ROI in back-office | A+ (accurate) |

The prediction that survived most intact: agents would need to prove ROI or face a funding reckoning. Deloitte called 2025 the "year of reckoning" for AI value demonstration, and that pressure is visibly real. Companies like Cognition (Devin) and other agent startups are already facing questions about production deployment rates versus demo capabilities.

What got redefined: "autonomous." The industry has quietly shifted to "agentic" as a spectrum rather than a binary. Claude's Computer Use, OpenAI's operator research, and enterprise tools like Salesforce's Agentforce all position agents as collaborative tools, not replacements.

---

## The Multimodal AI Standard Prediction: Fully Survived

**The prediction that multimodal AI would become the default interface in 2025 has held up completely—it's already happening faster than forecast.**

Google DeepMind shipped Gemini 2.0 Flash with native image and audio output in December 2024. OpenAI's o3 handles visual reasoning (as demonstrated by its ARC-AGI performance). Anthropic's Claude processes documents, images, and code simultaneously. This wasn't supposed to peak until Q2 2025.

The acceleration matters for enterprise adoption. Here's what I'm tracking:

| Modality | Late 2024 Prediction | January 2025 Status | Survived? |
|----------|---------------------|---------------------|-----------|
| Native audio I/O | "Mainstream by mid-2025" | Available in Gemini 2.0, OpenAI realtime API | Yes, early |
| Image generation integrated | "Bundled by end of 2025" | Already standard across major models | Yes, exceeded |
| Video understanding | "Limited pilot programs" | 3+ hour video processing in Gemini 2.5 Pro | Yes, exceeded |
| Cross-modal reasoning | "Research phase" | o3 ARC-AGI scores prove viability | Yes, exceeded |

The implications for my clients are immediate. If you're building AI products in 2025, multimodal isn't a future consideration—it's the current baseline. The prediction that "text-only models will feel dated by Q3 2025" might have been conservative. They already feel dated.

---

## The OpenAI o3 Reasoning Revolution: Exceeded Predictions

**The December 20, 2024 o3 announcement destroyed most predictions about AI reasoning capabilities for 2025—its benchmark performance was not forecast by any major analyst.**

Here's what the o3 announcement revealed:

- **ARC-AGI**: 87.5% on the semi-private evaluation (low-efficiency setting), 75.7% on the high-efficiency setting
- **AIME 2024**: 96.7%—the previous best was roughly 50%
- **GPQA Diamond**: 87.7% on graduate-level science questions
- **Frontier Math**: 25.2% versus 2% for previous best models

Context matters here. ARC-AGI was specifically designed to test "novel task adaptation"—the ability to solve problems that aren't in the training data. GPT-4o scored 5%. o3's 87.5% represents a 17x improvement on a benchmark designed to resist memorization.

| Benchmark | GPT-4o (Previous Best) | o3 (Dec 2024) | Improvement Factor |
|-----------|----------------------|---------------|-------------------|
| ARC-AGI | 5% | 87.5% | 17.5x |
| AIME 2024 | ~50% | 96.7% | 1.9x |
| GPQA Diamond | ~60% | 87.7% | 1.5x |
| Frontier Math | 2% | 25.2% | 12.6x |

No analyst predicted this magnitude of jump. The consensus forecast for reasoning improvements in 2025 was incremental—maybe 15-20% gains on existing benchmarks. o3's performance suggests a qualitative change in capability, not just quantitative improvement.

What this means for 2025 predictions: o3 is scheduled for public release in "late January 2025" (o3-mini first, then full o3). If these capabilities hold up in production—not just in controlled evaluations—then every other prediction about AI capabilities becomes a lower bound.

---

## The AI Hardware Disruption Prediction: Survived But Nuanced

**Predictions that 2025 would see meaningful AI hardware competition for NVIDIA have survived, though the form of that competition shifted dramatically in December 2024.**

The original forecast focused on Cerebras, Groq, and SambaNova as challengers to NVIDIA's inference dominance. The prediction held that custom silicon would capture 15-20% of the inference market by end of 2025.

Then December happened. NVIDIA acquired Groq's LPU technology and engineering team for a reported $20 billion. This wasn't in any prediction I tracked. It fundamentally changes the competitive landscape:

| Hardware Prediction | Pre-December 2024 | Post-Acquisition Reality | Status |
|---------------------|-------------------|-------------------------|--------|
| Groq as independent challenger | Viable path | Acquired by NVIDIA | Failed |
| Cerebras growth to $500M+ | Predicted for 2025 | On track for $510M (76% YoY) | Survived |
| SambaNova enterprise traction | Expected Q1 2025 | Intel acquisition rumors | Uncertain |
| Custom silicon 15-20% share | End of 2025 | Hyperscaler chips + Cerebras = ~8% | Partial |
| Inference-first architecture | Emerging trend | Validated by NVIDIA's Groq acquisition | Survived |

Cerebras is now the clear independent alternative. Their shift from training to inference—now 30% of revenue, up from 0% in 2023—aligns with the original prediction that inference specialization would matter. But the path there included an acquisition nobody forecast.

Hyperscalers are building their own chips faster than predicted. Microsoft's Maia 200, Google's Ironwood TPU, and Meta's rumored Rivos acquisition all point to vertical integration that wasn't fully priced into 2024 predictions.

---

## The Enterprise AI "Year of Reckoning" Prediction: Surviving Under Pressure

**Multiple analysts predicted 2025 would force AI companies to prove tangible business value—a prediction that survived and is already creating market pressure.**

TIME called it a "year of reckoning." Deloitte warned of a "show me" phase. The prediction was that after $50B+ in AI investment during 2024, 2025 would demand ROI documentation or face funding contractions.

Evidence this prediction is holding:

- **Agent startups**: Devin (Cognition) is facing scrutiny about actual deployment rates versus demo virality. Their $500/month pricing is being tested against real engineering team adoption.
- **Enterprise sales**: Salesforce Agentforce and similar products are leading with ROI calculators, not just capability demos. The sales conversation shifted from "what can it do?" to "what will it save?"
- **OpenAI's pricing strategy**: The GPT-5 tiered access model (free standard, Plus enhanced, Pro maximum) suggests a revenue-optimization focus that wasn't as pronounced in 2024

| Company/Category | 2024 Approach | 2025 Shift | Reckoning Evidence |
|------------------|---------------|------------|-------------------|
| Agent startups | Demo-first | Deployment metrics required | Devin scrutiny |
| OpenAI | Capability releases | Revenue tier optimization | GPT-5 access tiers |
| Enterprise vendors | Feature expansion | ROI-focused sales | Agentforce calculators |
| AI infrastructure | Growth at all costs | Unit economics emphasis | Cerebras margin focus |

The prediction didn't specify what form the reckoning would take. We're seeing it in sales cycles (longer, more proof-of-concept requirements), pricing models (more granular tiers), and competitive positioning (efficiency claims over raw capability claims).

---

## The AI Video Generation Prediction: Partially Survived

**Predictions for major AI video generation advances in 2025 have partially survived, though the competitive landscape shifted from the OpenAI-dominant forecast many expected.**

Sora was supposed to define 2025 video generation. The original predictions assumed OpenAI would ship a public Sora release in early 2025, establishing market dominance similar to ChatGPT's 2022 launch.

Current status (January 2, 2025):

- **Sora**: Limited researcher access only. No public timeline for general availability
- **Competition**: Runway Gen-4 shipped in late 2024 with character consistency features that solve a real production problem
- **Google**: Veo 2 released with improved physics and prompt adherence
- **Meta**: Movie Gen continues in limited research release

| Video Prediction | Late 2024 Forecast | January 2025 Reality | Grade |
|------------------|-------------------|----------------------|-------|
| Sora public launch Q1 2025 | Delayed, no date | Limited access only | F (missed) |
| OpenAI dominance | Predicted | Competitive parity emerging | D (wrong) |
| Character consistency solved | "End of 2025" | Runway Gen-4 shipped it | A (exceeded) |
| Physics simulation | "Approaching realism" | Veo 2, Gen-4 both improved | B+ (partial) |
| Extended length (60s+) | Predicted | 5-10 seconds still standard | C (limited progress) |

The surprise isn't that video generation improved—it's that OpenAI didn't own the narrative. Sora's research preview generated enormous hype, but the lack of public release created space for competitors. Runway specifically targeted character consistency, which matters more to actual video production than raw generation quality.

---

## The Regulation and National Security Prediction: Survived Quietly

**Predictions that governments would increase AI regulation in 2025, particularly treating it as a national security priority, have survived without the fanfare of other forecasts.**

The EU AI Act began enforcement in 2024, but 2025 predictions focused on U.S. federal action and state-level initiatives. Here's the current state:

- **Federal**: Minimal new legislation expected. The Biden administration's executive order framework continues, but major congressional action is unlikely in an election year
- **State**: California's SB 1047 (frontier model regulation) was vetoed, but other states are introducing their own frameworks
- **National security**: The U.S. AI Safety Institute's agreements with OpenAI and Anthropic (announced August 2024) are operational. Model testing and sharing protocols are active

| Regulatory Prediction | Status | Evidence |
|-----------------------|--------|----------|
| EU AI Act enforcement expansion | Surviving | Broader application to high-risk systems |
| U.S. federal legislation | Stalled | Election year delays; executive order remains |
| State-level patchwork | Accelerating | Multiple states introducing AI bills |
| National security prioritization | Surviving | AI Safety Institute operational agreements |
| Export control expansion | Uncertain | No major changes announced yet |

The prediction that regulation would follow a "security-first" framing has held. The discourse around AI policy increasingly treats frontier models as dual-use technologies requiring oversight, even if specific legislative mechanisms remain undefined.

---

## The Post-Training Optimization Prediction: Surviving As a Strategic Shift

**The prediction that AI development would shift from pre-training scaling to post-training optimization has survived and is visible in every major lab's current strategy.**

In late 2024, researchers noted that we were approaching limits on available high-quality training data. The prediction was that 2025 would see a strategic pivot toward:

1. Synthetic data generation
2. Reinforcement learning from human feedback (RLHF) improvements
3. Test-time compute scaling (letting models "think longer")
4. Architecture innovations beyond transformer scaling

This prediction has held completely. Evidence includes:

- **o3's test-time scaling**: The model's performance improves dramatically with increased compute during inference (the "low-efficiency" 87.5% ARC-AGI score used 172x more compute than the high-efficiency 75.7% score)
- **Anthropic's extended thinking**: Claude 3.5 Sonnet's reasoning mode is pure post-training optimization
- **Gemini 2.5's architecture**: Native multimodal support with mixture-of-experts routing represents architectural evolution, not just scale

| Pre-Training Era | Post-Training Era (2025) | What Changed |
|------------------|-------------------------|--------------|
| More data = better model | More compute at inference = better reasoning | Test-time scaling |
| Single forward pass | Chain-of-thought reasoning | Extended thinking |
| Fixed capability per model | Adjustable capability via "thinking budget" | Controllable inference |
| Training cost dominant | Inference cost increasingly significant | Economics shift |

This shift has implications for infrastructure planning. If test-time compute becomes the primary capability lever, inference hardware (Groq's LPU approach, Cerebras' wafer-scale design) matters more than training clusters.

---

## FAQ: 2025 AI Predictions Reality Check

### Did GPT-5 release in early 2025 as predicted?

**Not yet.** OpenAI's o3 announcement in December 2024 pushed GPT-5 to a "weeks and months" timeline that remains undefined. o3-mini is promised for late January 2025, with full o3 following shortly. GPT-5 is still planned but the specific Q1 2025 predictions are slipping toward Q2.

### What happened to Claude 4 predictions?

**Anthropic shifted strategy.** Rather than a version-number release, they're shipping capabilities incrementally. Computer Use went from beta to production-ready. Extended thinking shipped to Claude 3.5 Sonnet. A Claude 4 announcement may still come, but not on the original Q1 2025 timeline that analysts predicted.

### Are AI agents actually being adopted in 2025?

**Yes, but differently than predicted.** Enterprise adoption sits at roughly 11% (per KPMG Q4 2024 data), not the 25% some predicted for mid-2025. However, the form factor changed—"augmented agents" with human oversight dominate over fully autonomous systems. The ROI is real (4.1x average in back-office functions), but the deployment pattern is more conservative.

### Did NVIDIA maintain its dominance in AI chips?

**Yes, and they acquired the competition.** NVIDIA's acquisition of Groq in December 2024 wasn't predicted and significantly changes the competitive landscape. Cerebras remains the clear independent challenger, on track for $510M revenue in 2025. Hyperscalers (Google, Microsoft, Meta, Amazon) are building custom silicon faster than originally forecast.

### Was OpenAI's o3 announcement expected?

**Not at this performance level.** o3's 87.5% ARC-AGI score represented a 17.5x improvement over GPT-4o. No analyst predicted this magnitude of jump on a benchmark designed to resist memorization. The announcement timing (December 20, 2024) was within the predicted window for "major OpenAI releases," but the capabilities exceeded all forecasts.

### Is 2025 really the "year of AI agents"?

**The prediction survived but the definition changed.** Early 2025 deployments are predominantly human-in-the-loop "augmented agents," not the fully autonomous systems originally forecast. However, enterprise investment in agentic infrastructure ($8.2B in Q4 2024) suggests the category is real, just evolving differently than predicted.

### Did multimodal AI become standard as predicted?

**Yes, faster than forecast.** Google shipped Gemini 2.0 Flash with native image and audio output in December 2024. OpenAI's o3 handles visual reasoning. Claude processes documents, images, and code simultaneously. This wasn't expected to peak until Q2 2025, but it's already the baseline for new model releases.

### What about AI video generation in 2025?

**Competitive but not OpenAI-dominated.** Sora remains in limited research access. Runway Gen-4 shipped with character consistency that solves real production problems. Google Veo 2 improved physics simulation. The prediction that OpenAI would dominate video generation failed; competitive parity emerged instead.

### Is there a "reckoning" for AI companies in 2025?

**Yes, and it's visible in sales cycles.** Agent startups face scrutiny about deployment rates. Enterprise AI vendors lead with ROI calculators. OpenAI's tiered GPT-5 access model suggests revenue optimization. The prediction that 2025 would force tangible value demonstration is holding, though the specific mechanism (funding contractions versus sales pressure) varies by segment.

### Did AI regulation increase as predicted?

**Quietly, yes.** The EU AI Act expanded enforcement. The U.S. AI Safety Institute's agreements with OpenAI and Anthropic became operational. State-level patchwork regulation is accelerating. Federal legislation remains stalled. The prediction that AI would be treated as a national security priority survived, though the form (operational agreements versus legislation) differs from forecasts.

### What happened to predictions about custom AI chips?

**Mixed results.** NVIDIA acquired Groq, removing a predicted independent challenger. Cerebras is performing better than forecast ($510M projected 2025 revenue, 76% YoY growth). Hyperscalers are building custom silicon faster than predicted. The overall prediction—that inference specialization would matter—survived, but the competitive path there included surprises.

### Is test-time compute scaling really replacing pre-training?

**It's becoming a major capability lever.** o3's performance varies dramatically based on inference-time compute (87.5% with 172x more compute versus 75.7% with less). Claude's extended thinking mode is the same principle. The prediction that post-training optimization would become strategic has fully survived—every major lab is now investing heavily in test-time scaling.

---

## What This Means for Your 2025 AI Strategy

If you're making AI investment decisions this quarter, here's what the prediction reality check tells us:

**1. Don't wait for GPT-5.** If your strategy depends on a specific GPT-5 capability, you're already behind. o3 provides reasoning capabilities that change what's possible today. Claude 3.5 with extended thinking is production-ready now.

**2. Agent deployments should be conservative.** The 25% autonomous deployment prediction was wrong. Plan for human-in-the-loop implementations that prove ROI before removing oversight. The 4.1x ROI in back-office functions is real, but it requires careful implementation.

**3. Multimodal is baseline.** If your product roadmap doesn't include native image, audio, or video processing, you're building for 2024's market. Gemini 2.0 Flash and o3's visual reasoning are available now.

**4. Infrastructure costs are shifting.** Test-time compute scaling means inference hardware matters more than training clusters for some workloads. The NVIDIA-Groq acquisition validates this shift.

**5. Regulatory planning is essential.** Even without specific legislation, the U.S. AI Safety Institute's operational agreements set precedents for model testing and deployment that will become industry standards.

---

## Looking Ahead

The predictions that survived—multimodal as standard, post-training optimization, enterprise value demonstration, national security framing—share a characteristic: they're about operational reality, not technical possibility. The predictions that failed or slipped—GPT-5 timing, Claude 4 release, autonomous agent deployment—were about specific product launches and capability thresholds.

This suggests a maturing market. 2024 was defined by what AI *could* do. 2025, based on these first two days, is shaping up to be about what AI *reliably delivers* at scale.

The o3 announcement may have been the inflection point. When benchmark improvements jump 17x on novel task adaptation, the conversation shifts from "when will it work?" to "how do we deploy it responsibly?" That shift—from capability demonstration to operational integration—is what 2025 predictions should focus on now.

I'll be tracking the actual releases against these revised forecasts throughout the year. The gap between prediction and reality is where the real engineering happens.

---

**Related Reading:**

- [2024 AI Year in Review: The Retrospective That Changed How I Think About Progress](/blog/2024/12/2024-year-retrospective-ai)
- [Year-End League Tables 2024: Ranking the Models, Companies, and Breakthroughs That Mattered](/blog/2024/12/year-end-league-tables-2024)
- [DeepSeek-V3: The Open-Weights Model That Challenged Frontier Assumptions](/blog/2024/12/deepseek-v3-671b-open-weights-frontier)

---

*Want to discuss how these predictions affect your specific AI strategy? [Get in touch](/contact) for a consultation on agentic systems, multimodal implementations, or infrastructure planning for the test-time compute era.*
