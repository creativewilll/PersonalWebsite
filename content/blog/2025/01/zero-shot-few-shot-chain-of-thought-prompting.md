---
title: "Zero-Shot, Few-Shot, and Chain-of-Thought Prompting Explained"
slug: "zero-shot-few-shot-chain-of-thought-prompting"
date: "2025-01-30"
lastModified: "2025-01-30"
author: "William Spurlock"
readingTime: 18
categories:
  - "AI Prompting"
tags:
  - "zero-shot prompting"
  - "few-shot prompting"
  - "chain of thought"
  - "prompt engineering"
  - "AI reasoning"
  - "o1 reasoning models"
  - "GPT-4o"
  - "Claude 3.5 Sonnet"
featured: false
draft: false
excerpt: "Learn zero-shot, few-shot, and chain-of-thought prompting with concrete examples. Master when to use each technique for better AI reasoning and output quality."
coverImage: "/images/blog/zero-shot-few-shot-chain-of-thought-prompting.png"
seoTitle: "Zero-Shot vs Few-Shot vs Chain-of-Thought Prompting | William Spurlock"
seoDescription: "Master zero-shot, few-shot, and chain-of-thought prompting techniques. Learn concrete examples, when to use each, and how to combine them for expert AI output."
seoKeywords:
  - "zero shot prompting"
  - "few shot prompting"
  - "chain of thought prompting"
  - "prompt engineering techniques"
  - "AI reasoning methods"
  - "few shot learning"

aioTargetQueries:
  - "what is few-shot prompting"
  - "chain of thought prompting explained"
  - "zero shot vs few shot prompting"
  - "what is zero shot prompting"
  - "chain of thought vs few shot"
  - "how to use chain of thought prompting"
  - "few shot prompting examples"
  - "when to use chain of thought"
contentCluster: "prompt-engineering"
pillarPost: false
parentPillar: "how-to-talk-to-ai-prompt-engineering-guide"
entityMentions:
  - "William Spurlock"
  - "Zero-Shot Prompting"
  - "Few-Shot Prompting"
  - "Chain-of-Thought Prompting"
  - "Claude 3.5 Sonnet"
  - "GPT-4o"
  - "OpenAI o1"
  - "Gemini 1.5 Pro"
  - "DeepSeek R1"

serviceTrack: "ai-automation"
---

# Zero-Shot, Few-Shot, and Chain-of-Thought Prompting Explained

## Table of Contents

- [What Are Zero-Shot, Few-Shot, and Chain-of-Thought?](#what-are-zero-shot-few-shot-and-chain-of-thought)
- [Zero-Shot Prompting: Instructions Only](#zero-shot-prompting-instructions-only)
- [One-Shot Prompting: A Single Example](#one-shot-prompting-a-single-example)
- [Few-Shot Prompting: Learning from Examples](#few-shot-prompting-learning-from-examples)
- [Why Showing Beats Telling in AI Prompting](#why-showing-beats-telling-in-ai-prompting)
- [Crafting Effective Few-Shot Examples](#crafting-effective-few-shot-examples)
- [Chain-of-Thought Prompting: Think Step by Step](#chain-of-thought-prompting-think-step-by-step)
- [The 2025 Reasoning Model Wrinkle](#the-2025-reasoning-model-wrinkle)
- [Combining Few-Shot with Chain-of-Thought](#combining-few-shot-with-chain-of-thought)
- [Self-Consistency: Sampling Multiple Paths](#self-consistency-sampling-multiple-paths)
- [Decision Table: Which Technique for Which Task](#decision-table-which-technique-for-which-task)
- [Putting It All Together](#putting-it-all-together)
- [Frequently Asked Questions](#frequently-asked-questions)

## What Are Zero-Shot, Few-Shot, and Chain-of-Thought?

**These three prompting techniques form a progression: zero-shot relies on the model's pre-trained knowledge, few-shot teaches patterns through examples, and chain-of-thought forces explicit reasoning before answering.** Together they cover 90% of prompting scenarios you'll encounter. Understanding when to deploy each — and how to combine them — separates casual AI users from engineers who get reliable, expert-grade output every time.

The progression looks like this:

| Technique | What you provide | What the model does | Best for |
|---|---|---|---|
| **Zero-shot** | Instructions only | Uses pre-trained knowledge | Simple, well-defined tasks the model already understands |
| **One-shot** | One example | Mimics the example's pattern | Format-specific output where one clear sample suffices |
| **Few-shot** | Multiple examples | Learns the underlying pattern | Style, tone, classification, or any task with consistent rules |
| **Chain-of-thought** | Reasoning instruction | Works through steps explicitly | Logic, math, multi-step analysis, complex reasoning |

Think of it as increasing guidance: zero-shot trusts the model's training, few-shot teaches it your specific variant, chain-of-thought forces it to show its work. Most production prompts use some combination.

## Zero-Shot Prompting: Instructions Only

**Zero-shot prompting means giving the model an instruction with no examples — relying entirely on its pre-trained knowledge to understand and execute the task.** This is how most people interact with AI by default, and it works surprisingly well for straightforward, common tasks.

A zero-shot prompt looks like this:

```
Classify this customer review as positive, negative, or neutral:

"The product arrived two days late, but the quality exceeded my expectations."
```

The model recognizes "classify" + sentiment categories because this exact task appeared thousands of times in its training data. It doesn't need a demonstration — it already knows what sentiment analysis looks like.

Zero-shot shines when:

- The task is common and well-defined (classification, translation, summarization)
- The output format is simple and widely understood
- You're testing baseline model capability before investing in examples
- Speed matters more than perfection

The limitations become obvious quickly. For unusual formats, niche domains, or idiosyncratic style requirements, zero-shot often misses the mark. The model defaults to its training average — which means generic output for anything outside common patterns.

## One-Shot Prompting: A Single Example

**One-shot prompting adds a single input-output example before the real task, giving the model a concrete pattern to follow.** This minimal addition often fixes format issues that zero-shot can't resolve.

Here's a one-shot prompt for extracting structured data:

```
Extract the name, date, and location from each event description.

Example:
Input: "Join us for the Annual Tech Summit on March 15th at the San Francisco Convention Center."
Output: {"name": "Annual Tech Summit", "date": "March 15th", "location": "San Francisco Convention Center"}

Now extract from:
"The Midwest Developer Conference returns on September 22nd to the Chicago Marriott Downtown."
```

The single example establishes three things simultaneously: the extraction targets (name/date/location), the output format (JSON with specific keys), and how to handle variations (Conference vs Summit, returns vs join us).

One-shot is the sweet spot when:

- The output format matters more than the content style
- One clear example captures the pattern completely
- You want minimal token overhead (few-shot can get expensive)
- The task is simple enough that one demonstration suffices

For anything stylistic — tone, voice, creative format — one-shot often isn't enough. The model needs multiple samples to lock onto a consistent pattern.

## Few-Shot Prompting: Learning from Examples

**Few-shot prompting provides multiple examples (typically 3–5) that demonstrate a consistent pattern, letting the model infer the underlying rules from the demonstrations.** This is where prompting becomes genuinely powerful — examples compress complex instructions into dense, unambiguous demonstrations.

A few-shot classification prompt:

```
Classify customer support tickets by urgency (low/medium/high).

Ticket: "How do I reset my password?" → low
Ticket: "The checkout page is showing an error when I try to pay." → medium
Ticket: "URGENT: Our entire team is locked out of the account before a client presentation in 10 minutes." → high
Ticket: "Can you add a feature to export reports as CSV?" → low
Ticket: "The API is returning 500 errors for all requests since 9 AM." → high

Ticket: "I need help setting up two-factor authentication." →
```

The model now has a calibrated sense of your urgency scale — far better than the word "urgency" alone could convey. Notice how the examples include edge cases (the feature request is low despite being a business need; the API failure is high despite being technical rather than user-facing).

Few-shot prompting dominates when:

- Tone, style, or voice matters (creative writing, brand copy)
- Classification rules have nuance that resists verbal description
- You need consistent formatting across varied inputs
- The task is domain-specific with conventions the model wasn't explicitly trained on

The cost is token count. Each example consumes context window, and on large tasks this adds up. But for quality-critical output, examples are the highest-ROI addition you can make.

## Why Showing Beats Telling in AI Prompting

**Examples demonstrate patterns more effectively than descriptions because they compress ambiguity into concrete demonstrations.** You can spend a paragraph describing the exact tone you want and still get it wrong; paste two samples of that tone and the model locks on instantly.

Consider trying to teach a classification model what "sarcastic positive" looks like:

**Telling (verbal description):**
> Classify reviews as positive, negative, or sarcastic-positive. Sarcastic-positive means the reviewer is technically praising the product but doing so in a way that implies criticism or irony.

**Showing (few-shot):**
> "This coffee maker is amazing if you enjoy waiting 20 minutes for lukewarm water." → sarcastic-positive
> "Love how this 'smart' bulb requires an app, account, and 2FA just to turn on." → sarcastic-positive
> "Best purchase ever — now I get to buy replacement filters every month!" → sarcastic-positive

The examples contain information density no verbal description achieves. The model extracts tone from word choice, sentence structure, and the gap between literal and intended meaning — subtle patterns difficult to articulate but easy to demonstrate.

This principle applies everywhere:

- **Style transfer**: Describe your brand voice, get generic; show three samples, get consistency
- **Format extraction**: "Get the date" is ambiguous; three examples show date formats, locations, edge cases
- **Tone calibration**: "Be professional" varies wildly; examples anchor what "professional" means to you

The mechanism: language models are pattern-completion engines. Examples present complete patterns; descriptions present incomplete abstractions. Feed the model complete patterns, it completes new ones correctly. Feed abstractions, it hallucinates the gaps.

## Crafting Effective Few-Shot Examples

**Good few-shot examples share three properties: consistency, coverage of edge cases, and representative distribution.** Bad examples confuse the model more than no examples at all.

### Consistency

Every example must follow the same underlying rule. If you classify "I love this product" as positive in example 1 but "This product is great" as neutral in example 2, the model can't determine what "positive" actually means. The pattern must be unambiguous.

### Edge Case Coverage

Include examples that sit near decision boundaries — the ambiguous cases where classification could go either way. For urgency classification, include:

- A routine question that is clearly low
- A business-critical issue that is clearly high
- A technical problem with unclear user impact (edge case)
- An urgent-sounding message that is actually routine (edge case)

Edge case examples teach the model your actual decision criteria, not just the obvious cases.

### Representative Distribution

Match your example distribution to your real input distribution. If 80% of your tickets are actually low urgency, don't give the model 3 high and 2 medium examples — it'll learn to over-predict urgency.

| Example Set | Real Distribution | Problem |
|---|---|---|
| 2 low, 1 medium, 2 high | 80% low, 15% medium, 5% high | Model over-predicts urgency |
| 4 low, 1 medium, 0 high | 80% low, 15% medium, 5% high | Model never predicts high when it should |
| 4 low, 1 medium, 1 high | 80% low, 15% medium, 5% high | Reasonable approximation |

A practical template for building few-shot sets:

1. **Start with 2–3 obvious cases** — establish the clear pattern
2. **Add 1–2 edge cases** — define the boundaries
3. **Include 1 counter-example** if the pattern has known failure modes
4. **Order by complexity** — simple to complex helps the model build the pattern progressively
5. **End with a representative case** — the final example before the real input should prime the right pattern

## Chain-of-Thought Prompting: Think Step by Step

**Chain-of-thought (CoT) prompting instructs the model to reason step-by-step before giving its final answer, dramatically improving accuracy on logic, math, and multi-step analysis.** The technique is simple — append "think through this step by step" or "explain your reasoning before answering" — but the effect is profound.

Consider a classic word problem:

**Without CoT (zero-shot):**
> A store has 23 apples. They sell 17 apples. Then a delivery of 30 apples arrives. Finally, they sell half their remaining stock. How many apples are left?
>
> Model answer: 18 (often wrong — the model tries to leap to the answer)

**With CoT:**
> A store has 23 apples. They sell 17 apples. Then a delivery of 30 apples arrives. Finally, they sell half their remaining stock. How many apples are left? Think through this step by step.
>
> Model reasoning:
> - Starting amount: 23 apples
> - After selling 17: 23 - 17 = 6 apples
> - After delivery: 6 + 30 = 36 apples
> - After selling half: 36 / 2 = 18 apples remaining
> - Final answer: 18

The explicit reasoning catches errors. If the model had miscalculated "23 - 17" as 7 instead of 6, the subsequent steps would expose the error in the working. The intermediate tokens act as scaffolding — each correct step supports the next.

CoT excels for:

| Task Type | Why CoT Helps |
|---|---|
| **Math problems** | Forces explicit calculation steps, catches arithmetic errors |
| **Logic puzzles** | Surfaces hidden assumptions, validates inference chains |
| **Multi-step analysis** | Prevents skipping steps, maintains coherent reasoning |
| **Cause-effect reasoning** | Makes causal chains explicit rather than implied |
| **Comparison tasks** | Ensures consistent criteria across comparisons |

The mechanism: language models generate one token at a time, and each generated token becomes part of the context for the next. When the model lays out intermediate steps explicitly, those steps become available as context for generating the final answer. Skip the steps and the model tries to compress multi-step reasoning into a single leap — and on hard problems, it often stumbles.

## The 2025 Reasoning Model Wrinkle

**A new class of reasoning models — OpenAI's o1 and o1-mini, plus DeepSeek's R1 — performs chain-of-thought internally, which changes how you prompt them.** With standard models (GPT-4o, Claude 3.5 Sonnet, Gemini), you should explicitly prompt for step-by-step reasoning. With reasoning models, you generally should not.

Here's the breakdown as of January 2025:

| Model Class | Chain-of-Thought Instruction? | Why |
|---|---|---|
| **Standard LLMs** (GPT-4o, Claude 3.5, Gemini 1.5/2.0) | **Yes — add explicitly** | These models don't reason internally; you must prompt them to show work |
| **Reasoning models** (OpenAI o1/o1-mini, o3-mini, DeepSeek R1) | **No — let them think** | These models run internal reasoning chains; adding "think step by step" can interfere |
| **Gemini 2.0 Flash Thinking** | Optional | Supports explicit CoT but doesn't require it |

The o1 models, released to general availability in December 2024, use a separate reasoning stage before generating the visible response. When you ask o1 a math problem, it internally works through steps similar to what you'd force with CoT on GPT-4o — but adding "think step by step" to your o1 prompt can actually degrade performance by over-constraining the model's native reasoning process.

**The practical rule:**

- **For GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro/2.0 Flash**: Add "explain your reasoning step by step" or "work through this carefully before answering"
- **For o1, o1-mini, o3-mini (released ~January 31, 2025), DeepSeek R1**: State the problem clearly and directly. Let the model's internal reasoning handle the steps.

DeepSeek R1, released in late January 2025, is particularly interesting — it was trained with reinforcement learning to develop reasoning capabilities and made its weights openly available. For self-hosted R1 or API access, the same rule applies: direct prompts, no explicit CoT instruction needed.

Knowing which model you're using is itself a prompting skill in 2025.

## Combining Few-Shot with Chain-of-Thought

**The most powerful production prompts often combine few-shot examples with chain-of-thought reasoning — teaching the pattern through examples and enforcing rigor through explicit steps.** This is where you get both consistency and accuracy.

A combined prompt for mathematical word problems:

```
Solve these word problems. Show your step-by-step reasoning, then give the final answer.

Example 1:
Problem: A train travels 120 miles in 2 hours. How far will it travel in 5 hours at the same speed?
Reasoning: First, find the speed: 120 miles / 2 hours = 60 miles per hour. Then calculate distance for 5 hours: 60 mph × 5 hours = 300 miles.
Answer: 300 miles

Example 2:
Problem: A baker makes 48 cookies and packs them into boxes of 6. After selling 3 boxes, how many cookies remain?
Reasoning: First, find total boxes: 48 cookies / 6 per box = 8 boxes. Then subtract sold boxes: 8 - 3 = 5 boxes remaining. Convert back to cookies: 5 boxes × 6 cookies = 30 cookies.
Answer: 30 cookies

Now solve:
Problem: A garden has 15 rows of plants with 8 plants in each row. If 12 plants die and the rest are replanted into rows of 10, how many complete rows can be made?
```

The examples demonstrate both the reasoning format (step-by-step working) and the final answer format. The model learns to structure its thinking and where to place the final answer.

When combining techniques:

1. **Include reasoning in your examples** — show the model what "step by step" looks like for your task
2. **Keep example reasoning concise** — verbose examples teach verbosity
3. **End examples with clear answer markers** — "Answer: X" makes extraction easier
4. **Use 2–3 examples** — enough to establish the pattern, not so many that reasoning becomes templated

This combination shines for tasks that are both pattern-based (needing few-shot) and reasoning-heavy (needing CoT): complex classification with nuanced criteria, multi-step data extraction, analytical comparisons, and structured problem-solving.

## Self-Consistency: Sampling Multiple Paths

**Self-consistency improves reliability by generating multiple chain-of-thought reasoning paths and taking the most frequent answer.** One reasoning chain can go wrong; five independent chains voting on the answer filters out random errors.

The technique:

1. **Generate N completions** (typically 3–5) using the same CoT prompt
2. **Extract the final answer** from each completion
3. **Select the majority answer** — the one that appears most frequently

Example with a logic puzzle:

| Sample | Reasoning Summary | Final Answer |
|---|---|---|
| 1 | Correct inference chain | B |
| 2 | Correct inference chain | B |
| 3 | Makes error on step 2 | C |
| 4 | Correct inference chain | B |
| 5 | Makes error on step 4 | B (by luck) |

Majority vote: B (4/5 samples). The single error in sample 3 is outvoted.

Self-consistency costs more — you're paying for multiple completions — but for high-stakes decisions it's often worth the reliability gain. It's particularly valuable when:

- Answers must be highly reliable (medical, financial, legal analysis)
- The problem has clear right/wrong answers that can be voted on
- You have budget for multiple API calls per query
- You're already using CoT and want to add a reliability layer

In practice, I use self-consistency for code review prompts, contract analysis, and any classification where mistakes are expensive. For routine tasks, a single well-crafted CoT prompt usually suffices.

## Decision Table: Which Technique for Which Task

**Match the prompting technique to the task's requirements for style consistency, reasoning complexity, and output format rigidity.**

| If your task is... | Use | Example |
|---|---|---|
| Simple and well-understood | **Zero-shot** | "Summarize this article in 3 bullet points" |
| Format-specific, one example suffices | **One-shot** | "Extract these fields into JSON" |
| Style/tone matters, needs consistency | **Few-shot (3–5)** | "Write product descriptions in our brand voice" |
| Classification with nuanced rules | **Few-shot** | "Classify support tickets by urgency" |
| Math, logic, or multi-step | **Chain-of-thought** | "Calculate this step by step" |
| High-stakes, needs reliability | **CoT + Self-consistency** | "Analyze this contract for risks" |
| Complex reasoning + specific format | **Few-shot + CoT** | "Solve these problems showing work, then format as specified" |
| Using OpenAI o1/o3-mini or DeepSeek R1 | **Direct prompt (no CoT)** | "Solve this problem" (model reasons internally) |
| Using GPT-4o, Claude 3.5, Gemini | **CoT explicitly** | "Think step by step" |

The progression from zero-shot to few-shot to CoT maps naturally onto task complexity:

- **Zero-shot**: "Do what you know"
- **One-shot**: "Do it like this"
- **Few-shot**: "Learn this pattern"
- **CoT**: "Show your work"
- **Combined**: "Learn this pattern, then show your work using it"

Start simple. If zero-shot works, use it. Add examples when the output drifts. Add CoT when reasoning fails. Combine when you need both consistency and rigor.

## Putting It All Together

**These techniques aren't mutually exclusive — they're tools that combine to solve increasingly complex prompting challenges.** The skill is knowing which to deploy when.

A real-world example: extracting structured data from messy invoices. This needs:

1. **Few-shot examples** — showing the model how different invoice formats map to the same output structure
2. **Chain-of-thought** — forcing the model to locate each field explicitly before extracting (reduces hallucination)
3. **Structured output format** — defining the exact JSON schema to return

Combined prompt:

```
Extract invoice data into JSON with keys: vendor, date, total, line_items (array of {description, amount}).

Example 1:
Invoice text: "ABC Corp | Invoice #123 | Date: Jan 15, 2024 | Web Design Services $5,000 | Hosting $1,200 | Total: $6,200"
Reasoning: Vendor is "ABC Corp". Date is "Jan 15, 2024". Line items are "Web Design Services" at $5,000 and "Hosting" at $1,200. Total is $6,200.
Output: {"vendor": "ABC Corp", "date": "2024-01-15", "total": 6200, "line_items": [{"description": "Web Design Services", "amount": 5000}, {"description": "Hosting", "amount": 1200}]}

[Additional 2 examples showing different formats]

Now extract:
Invoice text: [messy real invoice here]
```

The examples teach the pattern. The reasoning instruction forces careful extraction. The output format removes ambiguity about structure. Together they produce reliable, parseable results from unstructured input.

That's the power of combining techniques: each addresses a different failure mode, and together they cover the common ways AI output goes wrong.

## Frequently Asked Questions

### What is zero-shot prompting?

**Zero-shot prompting means giving an AI model an instruction without any examples, relying entirely on its pre-trained knowledge.** The model uses what it learned during training to understand and execute the task. It works well for common tasks like classification, translation, and summarization where the model has seen similar instructions many times before.

### What is few-shot prompting?

**Few-shot prompting provides 3–5 examples of input-output pairs that demonstrate the pattern you want the model to follow.** The model learns the underlying rule from these examples and applies it to new inputs. This technique is powerful for teaching style, tone, classification criteria, and formatting that would be hard to describe in words alone.

### What is chain-of-thought prompting?

**Chain-of-thought prompting instructs the model to show its reasoning step-by-step before giving the final answer.** Adding phrases like "think step by step" or "explain your reasoning" forces the model to work through intermediate steps explicitly. **This dramatically improves accuracy on math problems, logic puzzles, and multi-step analysis** because each correct step provides scaffolding for the next.

### Should I use chain-of-thought with OpenAI o1?

**No — with reasoning models like OpenAI o1, o1-mini, o3-mini, and DeepSeek R1, you should not add chain-of-thought instructions.** These models perform internal reasoning automatically before generating their response. Adding "think step by step" can actually interfere with their native reasoning process. Use direct prompts and let the model handle the internal thinking.

### When should I combine few-shot with chain-of-thought?

**Combine few-shot and chain-of-thought when you need both consistent formatting and rigorous reasoning.** Use few-shot examples to teach the model your specific style or output format, and add chain-of-thought instructions to force explicit reasoning. This combination works well for complex classification tasks, structured data extraction from messy sources, and multi-step analytical problems where both the reasoning process and final format matter.

### How many examples do I need for few-shot prompting?

**Typically 3–5 examples provide the best balance of pattern clarity and token efficiency.** Two examples might not establish the pattern firmly, especially for subtle distinctions. More than five rarely improves results and consumes valuable context window. For simple format demonstrations, 2–3 examples often suffice. For nuanced style or classification tasks, 4–5 examples with edge case coverage work better.

### What is self-consistency prompting?

**Self-consistency prompting generates multiple chain-of-thought reasoning paths for the same problem and selects the answer that appears most frequently.** You run the same prompt 3–5 times, extract the final answer from each completion, and take the majority vote. **This filters out random reasoning errors** and improves reliability for high-stakes decisions, though it costs more since you're paying for multiple completions.

### Should I use zero-shot or few-shot for my task?

**Start with zero-shot for simple, well-defined tasks. Add few-shot examples when the output needs style consistency, handles edge cases, or follows idiosyncratic rules.** If zero-shot produces generic or slightly-off results, few-shot examples usually fix it. The decision table: zero-shot for common tasks the model already understands; few-shot for anything requiring consistent tone, format, or nuanced classification.

### Does chain-of-thought work with all AI models?

**Chain-of-thought works with standard language models like GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro/2.0 Flash.** With these models, you must explicitly prompt for step-by-step reasoning. **It does not work with reasoning models like OpenAI o1, o3-mini, or DeepSeek R1** — not because they can't reason, but because they already do internal reasoning and explicit CoT instructions can interfere. Know your model class before choosing your technique.

### What's the difference between one-shot and few-shot prompting?

**One-shot prompting uses a single example to demonstrate the desired pattern; few-shot uses multiple examples (typically 3–5).** One-shot works when one clear demonstration captures the pattern completely — often for format-specific output. Few-shot is needed for stylistic tasks, nuanced classification, or any pattern that requires multiple data points to establish consistency and edge case handling.

---

These three prompting techniques — zero-shot, few-shot, and chain-of-thought — form the foundation of reliable AI interaction. Master when to use each, how to combine them, and the 2025 reasoning-model wrinkle, and you'll extract expert-grade output from any frontier model.

This post is part of the prompt engineering cluster. Continue with the pillar guide or explore related techniques:

- [How to Talk to AI: The Complete Prompt Engineering Guide for 2025](/blog/how-to-talk-to-ai-prompt-engineering-guide) — the comprehensive foundation
- [Context Engineering: The Skill That Beats Prompt Engineering in 2025](/blog/context-engineering-vs-prompt-engineering) — why what you feed the model matters more than how you word the request
- [Role and Persona Prompting: How to Get Expert-Level Answers](/blog/role-persona-prompting-expert-answers) — using identity to pull better output from the model

**Ready to turn these prompting techniques into automated systems?** I build custom AI agents and n8n automation pipelines that take the prompts you've perfected and put them to work on autopilot — classifying support tickets, extracting data from documents, running analysis pipelines, and saving teams real hours every week.

**If you've got a workflow that's begging to be automated, [book an AI automation strategy call](/contact).** Bring the repetitive task; I'll show you what an engineered, automated version looks like.
