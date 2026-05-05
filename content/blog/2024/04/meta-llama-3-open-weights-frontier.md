---
title: "Meta Llama 3 8B + 70B: The First Frontier-Grade Open Weights From a US Lab"
slug: "meta-llama-3-open-weights-frontier"
date: "2024-04-18"
lastModified: "2026-05-05"
author: "William Spurlock"
readingTime: 14
categories:
  - "AI Models and News"
tags:
  - "Llama 3"
  - "Meta AI"
  - "open weights"
  - "open source LLM"
  - "frontier models"
featured: false
draft: false
excerpt: "Meta just released Llama 3 8B and 70B — the first open-weight models from a major US lab that genuinely compete with GPT-3.5 and Claude Haiku on benchmarks. Here's what changed, what it means, and where it's going."
coverImage: "/images/blog/meta-llama-3-open-weights-frontier.png"
seoTitle: "Meta Llama 3 8B + 70B: Frontier Open Weights | William Spurlock"
seoDescription: "Meta released Llama 3 8B and 70B today — the first open-weight models from a major US lab genuinely competitive with GPT-3.5 and Claude Haiku. Full breakdown."
seoKeywords:
  - "Llama 3 release"
  - "Meta Llama 3 benchmarks"
  - "open weight frontier model"
  - "Llama 3 vs GPT-3.5"
  - "Llama 3 architecture"
aioTargetQueries:
  - "what is Meta Llama 3"
  - "Llama 3 8B vs 70B comparison"
  - "how does Llama 3 compare to GPT-3.5"
  - "Llama 3 architecture improvements"
  - "best open source LLM 2024"
contentCluster: "foundation-models"
pillarPost: true
parentPillar: ""
entityMentions:
  - "William Spurlock"
  - "Meta AI"
  - "Llama 3"
  - "GPT-3.5"
  - "Claude Haiku"
  - "Gemini Pro"
  - "Mistral 7B"
  - "Gemma 7B"
serviceTrack: "ai-automation"
---

# Meta Llama 3 8B + 70B: The First Frontier-Grade Open Weights From a US Lab

**Today, April 18, 2024, Meta just shipped Llama 3 — and it's the most significant moment in the open-weights story since the original Llama release.** The 8B and 70B models are live right now on Hugging Face, Ollama, and Meta's own platform, and the early benchmark numbers put them squarely in competition with GPT-3.5 and Claude 3 Haiku. Not "good for open source" good — actually good.

I've been watching this space closely. Llama 2 was a step, but it was never a real threat to the frontier closed-source models. Llama 3 changes that calculus. Let me break down exactly what changed, what the numbers say, and what this moment means for every builder running AI in production today.

---

## Table of Contents

1. [What Just Shipped: Llama 3 at a Glance](#what-just-shipped)
2. [Architecture Deep Dive: GQA, Tokenizer, and Context Window](#architecture-deep-dive)
3. [Benchmark Results: The Actual Numbers](#benchmark-results)
4. [Llama 3 8B vs 70B: Which One Do You Need?](#8b-vs-70b)
5. [Llama 3 vs GPT-3.5 Turbo vs Claude 3 Haiku](#llama3-vs-gpt35-vs-haiku)
6. [Training at Scale: 15 Trillion Tokens](#training-at-scale)
7. [Meta AI Assistant Integration: Consumer Reach](#meta-ai-integration)
8. [The Road to Llama 3 400B](#road-to-400b)
9. [What This Means for the Open-Weights Ecosystem](#open-weights-ecosystem)
10. [Running Llama 3 Today: Quickstart](#running-llama3-today)
11. [Risks, Limitations, and What's Still Missing](#risks-limitations)
12. [What Builders Should Do Right Now](#what-builders-should-do)

---

## What Just Shipped: Llama 3 at a Glance {#what-just-shipped}

**Llama 3 is available today in two sizes — 8B and 70B — both in base and instruction-tuned variants.** Meta is distributing the weights openly through Hugging Face and the model is already integrated into Ollama for local inference.

Here's the release summary in one table:

| Model | Params | Context | Instruction-Tuned | Available |
|-------|--------|---------|-------------------|-----------|
| Llama 3 8B | 8B | 8,192 tokens | Yes (llama-3-8b-instruct) | ✅ Now |
| Llama 3 70B | 70B | 8,192 tokens | Yes (llama-3-70b-instruct) | ✅ Now |
| Llama 3 400B | 400B+ | TBD | In training | 🔜 Coming |

Both models are released under Meta's custom open license. The license is more permissive than Llama 2's but still restricts commercial use above 700 million monthly active users — a threshold essentially no one but the hyperscalers will hit.

The instruct-tuned variants are trained using a combination of supervised fine-tuning (SFT) and reinforcement learning from human feedback (RLHF). Meta used their own internal human rater infrastructure for the preference data — not a third-party annotation shop.

**Why this matters today:** Until now, every open-weight model competitive with the frontier has come from European labs (Mistral) or Chinese labs (Qwen, DeepSeek). This is the first time a major US hyperscaler has put frontier-competitive weights in the public domain. The geopolitical and ecosystem implications alone make this worth studying.

---

## Architecture Deep Dive: GQA, Tokenizer, and Context Window {#architecture-deep-dive}

**The biggest architectural changes in Llama 3 are Grouped Query Attention (GQA), a dramatically expanded vocabulary, and a new tokenizer delivering 15% better token efficiency.** These aren't cosmetic changes — they materially improve inference speed and multilingual capability.

### Grouped Query Attention (GQA)

GQA was first introduced in the Llama 2 70B model but was absent from the 7B. Llama 3 brings GQA to the 8B model as well. Here's why that matters:

Standard multi-head attention (MHA) maintains separate key-value (KV) caches for every attention head. At inference time, the KV cache becomes the primary memory bottleneck — especially for long sequences. GQA groups multiple query heads to share a single key-value head pair, reducing KV cache size by a factor proportional to the number of groups.

In practice, GQA means:
- **Lower VRAM requirements** for a given context length
- **Higher throughput** at batch sizes above 1
- **Better multi-user serving** on shared inference infrastructure

The 8B model with GQA actually has comparable inference efficiency to the old Llama 2 7B despite having ~1B more parameters. Meta absorbed the parameter cost and came out with better quality at the same speed.

### New Tokenizer: 128K Vocabulary

Llama 2 used a 32,000-token vocabulary. **Llama 3 ships with a 128,256-token vocabulary — a 4x expansion.** This is a significant quality-of-life improvement for non-English languages and code.

A larger vocabulary means:
- Fewer tokens needed to represent the same text (Meta claims ~15% efficiency improvement)
- Better handling of code, math notation, and non-Latin scripts
- Improved multilingual reasoning because the model can represent concepts in one token vs. many subword pieces

The 15% efficiency gain isn't trivial. On a 1,000-token document, you're saving ~150 tokens — which is meaningful for both context utilization and inference cost when calling APIs at scale.

### Context Window: 8,192 Tokens

Llama 3 doubles the context window from Llama 2's 4,096 to **8,192 tokens**. Training was done on 8,192-token sequences with attention masking that prevents cross-document attention — meaning the model was trained on real multi-turn conversations and documents at this length, not just padded to fill the window.

That said, 8,192 tokens is behind the frontier. GPT-4 Turbo supports 128K, Claude 3 goes to 200K, and Gemini Pro 1.5 hits 1 million. The 8K window is functional but limiting for document-heavy workflows. The 400B model, currently in training, may address this — but no commitment has been made on context extension.

### Training Data: 15 Trillion Tokens

**Llama 3 was trained on 15 trillion tokens — 7x more data than Llama 2's 2 trillion.** This is a massive compute investment. To put it in perspective: training Llama 2 on 2T tokens required approximately 3.3 million GPU-hours on A100s. Llama 3's 15T token training run is in a different cost tier entirely.

The training data was curated with:
- More code (unspecified proportion but noticeably improved on HumanEval)
- Better multilingual coverage
- Improved data quality filtering pipelines

Meta hasn't published the full data card, but the benchmark improvements on code and reasoning tasks suggest the data mix was deliberately optimized for those capabilities.

---

## Benchmark Results: The Actual Numbers {#benchmark-results}

**Llama 3 8B outperforms Mistral 7B and Gemma 7B across every major benchmark. Llama 3 70B beats Gemini Pro 1.5 and Claude 3 Sonnet on several key tasks.** Here are the numbers Meta has published:

### Llama 3 8B Instruct vs Competitors

| Benchmark | Llama 3 8B | Mistral 7B Instruct | Gemma 7B-IT |
|-----------|------------|---------------------|-------------|
| MMLU | **68.4** | 60.1 | 64.3 |
| HumanEval | **62.2** | 40.2 | 34.2 |
| GSM-8K | **79.6** | 52.2 | 59.0 |
| GPQA | **34.2** | 28.8 | 32.6 |
| MATH | **30.0** | 13.1 | 22.0 |

The HumanEval gap is the most striking: Llama 3 8B at 62.2 vs Mistral 7B at 40.2 is a 22-point jump in Python code generation. This is not a marginal improvement — it represents a fundamentally different capability level for coding workflows.

### Llama 3 70B Instruct vs Frontier Models

| Benchmark | Llama 3 70B | Gemini Pro 1.5 | Claude 3 Sonnet |
|-----------|-------------|----------------|-----------------|
| MMLU | **82.0** | 81.9 | 79.0 |
| HumanEval | **81.7** | 71.9 | 73.0 |
| GSM-8K | **93.0** | 91.7 | 92.3 |
| GPQA | 39.5 | **41.9** | 38.5 |
| MATH | 50.4 | **58.5** | 40.5 |

The 70B model beats Gemini Pro 1.5 and Claude 3 Sonnet on coding (HumanEval) and matches or beats on general language understanding (MMLU) and math word problems (GSM-8K). It trails on graduate-level science questions (GPQA) and competition math (MATH) — tasks that typically require deeper reasoning than pattern matching.

**The honest interpretation:** Llama 3 70B is not GPT-4 Turbo. It's not Claude 3 Opus. But it's firmly in the same tier as Claude 3 Sonnet and Gemini Pro 1.5 on the tasks that most production applications actually use. If you're running a coding assistant, a document summarizer, or a customer-facing chatbot — the 70B gives you frontier capability at open-weight flexibility.

---

## Llama 3 8B vs 70B: Which One Do You Need? {#8b-vs-70b}

**The 8B is the workhorse; the 70B is the closer.** Use the 8B for high-volume tasks where speed and cost matter. Use the 70B when quality is the priority and the task is complex.

| Factor | Llama 3 8B | Llama 3 70B |
|--------|------------|-------------|
| VRAM Required | ~6.1 GB (Q4) | ~40 GB (Q4) |
| Speed (RTX 4090) | ~85–95 tok/s | ~20–30 tok/s |
| Speed (M3 Max) | ~60–70 tok/s | ~10–15 tok/s |
| Cost (API, approx.) | ~$0.20/M tokens | ~$0.90/M tokens |
| Best For | Classification, extraction, summarization, quick Q&A | Complex reasoning, multi-step coding, nuanced writing |
| Fine-Tuning | Cheap, fast | Expensive, slower |

**My take:** For production automation workflows — the kind I build for clients — the 8B is where I start. It's fast enough to run in a tight n8n loop, cheap enough to call at scale, and capable enough for 80% of the tasks I throw at it. I reach for the 70B when the task involves multi-step reasoning, complex code generation, or content that needs to actually be *good* rather than just *good enough*.

---

## Llama 3 vs GPT-3.5 Turbo vs Claude 3 Haiku {#llama3-vs-gpt35-vs-haiku}

**Llama 3 8B matches or beats GPT-3.5 Turbo on coding benchmarks and comes close on general language tasks. It beats Claude 3 Haiku on HumanEval.** This is the comparison that matters for builders trying to replace API-dependent workflows with open alternatives.

| Benchmark | Llama 3 8B Instruct | GPT-3.5 Turbo | Claude 3 Haiku |
|-----------|---------------------|----------------|-----------------|
| MMLU | 68.4 | 70.0 | 75.2 |
| HumanEval | **62.2** | 48.1 | 75.9 |
| GSM-8K | **79.6** | 57.1 | 88.9 |
| ARC-Challenge | **78.6** | ~85 | ~89 |

A few honest caveats:
- Benchmarks don't capture everything. Real-world instruction following, refusals, formatting reliability, and context coherence all matter and aren't fully reflected here.
- GPT-3.5 Turbo is an API-only product with OpenAI's guardrails, fine-tuning options, and reliability SLAs. Llama 3 gives you the weights but you own the ops.
- Claude 3 Haiku outperforms Llama 3 8B on several benchmarks. The comparison is closer than the gap suggests once you weight task distributions that matter in production.

**The practical bottom line:** If you're currently calling GPT-3.5 Turbo for extraction, classification, or summarization tasks at high volume, Llama 3 8B is a credible swap. You gain: no per-token cost at steady state (self-hosted), no data leaving your infrastructure, and the flexibility to fine-tune. You lose: OpenAI's operational polish, function-calling reliability, and the convenience of managed APIs.

---

## Training at Scale: 15 Trillion Tokens {#training-at-scale}

**Meta trained Llama 3 on 15 trillion tokens — 7x the scale of Llama 2 and one of the largest training runs ever published for an open-weight model.** This is a meaningful commitment that signals Meta's intent to stay competitive with the frontier labs.

The training data composition isn't fully disclosed, but Meta has noted:
- More high-quality web data with improved filtering
- Substantially more code (the HumanEval improvements confirm this)
- Better multilingual coverage than Llama 2
- Careful deduplication to avoid repetition artifacts

The training hardware isn't disclosed either, but at 15T tokens with 70B parameters, this is a multi-thousand A100/H100 cluster run. The fact that Meta is willing to release the weights of a training run this expensive is the actual story. It's not altruism — it's a strategic bet that open-sourcing the model accelerates the ecosystem in ways that ultimately benefit Meta's platform business. But the outcome for builders is the same: you get a frontier-class model for free.

### Post-Training: SFT + RLHF

The instruct-tuned variants went through:
1. **Supervised Fine-Tuning (SFT)** — on a curated set of instruction-response pairs
2. **Rejection Sampling** — generating multiple responses per prompt, scoring them with a reward model, keeping the best
3. **Proximal Policy Optimization (PPO)** — the reinforcement learning phase that teaches the model to prefer high-reward outputs

Meta describes this as an iterative process — each round of post-training was used to generate better synthetic data for the next round. This is the same general pipeline that produces ChatGPT and Claude, executed in-house at Meta's scale.

---

## Meta AI Assistant Integration: Consumer Reach {#meta-ai-integration}

**Meta didn't just release the weights — they simultaneously shipped Llama 3 as the backend of Meta AI, their assistant embedded across WhatsApp, Instagram, Messenger, and Facebook.** This is a distribution play at a scale no other AI lab can match.

Meta AI is now appearing in:
- **WhatsApp:** Available in individual and group chats, accessible via `@MetaAI`
- **Instagram:** Integrated into DMs and the search bar
- **Messenger:** In-chat assistant with real-time web search via Google and Bing
- **Facebook:** Feed-level integration for contextual suggestions
- **meta.ai:** A standalone web interface

The capabilities as of today's launch:
- General Q&A and reasoning (Llama 3 powered)
- Real-time web search results via Google/Bing integration
- Image generation via "Imagine" prompt (an internal image model, not Llama 3)
- Creative writing, recipe generation, travel planning

The distribution is staggering. WhatsApp alone has 2 billion+ monthly active users. Even with minimal adoption rates, Meta AI will accumulate interaction data at a scale that will inform future model training runs. This is the strategic flywheel: open weights attract developers and improve the ecosystem → better ecosystem builds tooling that Meta benefits from → massive consumer distribution generates preference data → better future models.

---

## The Road to Llama 3 400B {#road-to-400b}

**Meta has confirmed a Llama 3 400B+ model is currently in training.** No release date, no specs beyond "400B+" — but the signal is clear: today's release is not the ceiling.

What we might expect from a 400B model:
- Benchmark performance in the GPT-4 tier
- Likely improved reasoning on GPQA and MATH (the current gap areas)
- Potentially longer context windows — though Meta hasn't committed to this
- The same open licensing, or a variant of it

The 400B model would represent the first time open weights definitively challenge GPT-4 / Claude 3 Opus at their own game. If that happens, the "pay for the frontier" argument starts to break down for every use case that doesn't require OpenAI-specific features or Anthropic's safety profile.

**What I'm watching:** Whether Meta extends the context window beyond 8K in the 400B. Without that, RAG remains essential for document workflows. With a 128K+ window, many RAG pipelines become optional overhead.

---

## What This Means for the Open-Weights Ecosystem {#open-weights-ecosystem}

**Llama 3 is the clearest signal yet that open weights are not a secondary ecosystem — they're becoming the primary one for infrastructure builders.** Here's what shifts today:

### For Fine-Tuners

Llama 3's architecture is clean, well-documented, and widely supported. LoRA and QLoRA fine-tuning work on both 8B and 70B. With 15T tokens of pre-training behind it, you're starting from a stronger base than any previous open model. Domain-specific fine-tuning on top of Llama 3 8B is now a credible production strategy for specialized tasks.

### For Inference Infrastructure

The open-weights community — Ollama, llama.cpp, vLLM, Together AI, Replicate, Groq — all had Llama 3 support live within hours of release. The infrastructure ecosystem around Llama is now mature enough that new model releases are production-ready on day one.

### For API-Dependent Builders

If you're currently spending $5K+/month on OpenAI APIs for tasks in the 8B's capability range, today is the day to audit that. Llama 3 8B on a self-hosted vLLM instance on a single A100 can process inference cheaper than any API at sufficient volume. The math changes at scale.

### For the Closed-Source Labs

OpenAI and Anthropic are now competing against a well-funded hyperscaler that distributes its models for free. The pressure on pricing and capability isn't going away. This is good for everyone who pays for API access.

---

## Running Llama 3 Today: Quickstart {#running-llama3-today}

**The fastest path to Llama 3 locally is Ollama.** You can have it running in under 5 minutes:

```bash
# Install Ollama (macOS/Linux)
curl -fsSL https://ollama.com/install.sh | sh

# Pull Llama 3 8B instruct
ollama pull llama3

# Run it interactively
ollama run llama3
```

Once it's running, the REST API is available at `localhost:11434`:

```bash
curl http://localhost:11434/api/generate \
  -d '{
    "model": "llama3",
    "prompt": "Explain grouped query attention in one paragraph.",
    "stream": false
  }'
```

**For the 70B model** — you'll need at least 40GB of VRAM in Q4 quantization, or 48GB+ for comfortable inference. M2 Ultra / M3 Max with 128GB unified memory works well via Ollama's Metal backend. Otherwise, you're looking at multi-GPU setups or cloud instances.

```bash
ollama pull llama3:70b
ollama run llama3:70b
```

For production use, vLLM is the better choice — it gives you OpenAI-compatible API endpoints, continuous batching, and significantly better throughput:

```bash
pip install vllm
python -m vllm.entrypoints.openai.api_server \
  --model meta-llama/Meta-Llama-3-8B-Instruct \
  --served-model-name llama3 \
  --port 8000
```

I'll have a full n8n integration tutorial up tomorrow — [Running Llama 3 Locally: Ollama Setup, n8n Integration, and First-Day Benchmarks](/blog/2024/04/running-llama-3-locally-ollama-n8n).

---

## Risks, Limitations, and What's Still Missing {#risks-limitations}

**Llama 3 is a major leap — but it's not perfect.** Here's what to be aware of before dropping it into production:

### Context Window (8K)

8,192 tokens is limiting for document-heavy workflows. Compared to Claude 3's 200K and GPT-4 Turbo's 128K, you'll need RAG or chunking strategies for anything beyond a few pages of content. There are community attempts to extend via RoPE scaling, but they introduce quality degradation at the extended range.

### Safety and Refusals

The instruct-tuned model has safety training but it's not as hardened as Claude 3 or GPT-4. For consumer-facing applications, you'll want to layer additional guardrails. Llama Guard 2 (also released by Meta today) is the recommended solution — a classifier model that can screen both inputs and outputs.

### Multilingual Coverage

The 128K vocabulary helps, but Meta's training data is still English-heavy. Performance in Spanish, French, German, and Portuguese is solid. Performance in Arabic, Chinese, Japanese, and other non-Latin script languages is improved from Llama 2 but not at parity with models specifically optimized for those languages.

### Function Calling

Llama 3 doesn't have native function calling in the way GPT-4 Turbo or Claude 3 does. Tool use is possible through prompt engineering, but it's not as reliable or structured. This is one area where the closed-source models still have a practical advantage for agent workflows.

---

## What Builders Should Do Right Now {#what-builders-should-do}

**The action items from today's release are clear:**

1. **Pull Llama 3 8B with Ollama and benchmark it against your actual tasks.** Don't trust my benchmarks or Meta's — test it on the prompts you actually run in production. The delta between benchmark performance and task-specific performance can be significant.

2. **Audit your current API spend.** If you're paying for GPT-3.5 Turbo volume, price out Llama 3 8B on Together AI or Replicate today. The API prices from these providers are already competitive, and self-hosting gets cheaper at 10M+ tokens/month.

3. **Watch the fine-tuning ecosystem.** LoRA adapters for Llama 3 will drop in the next few days. If you have a specialized domain — legal, medical, technical — fine-tuning on top of Llama 3 8B is now a viable production strategy.

4. **Plan for the 400B.** If your product roadmap includes a "switch to a frontier open model" milestone, set a calendar reminder. The 400B is coming. When it drops, the competitive calculus changes again.

---

## Frequently Asked Questions

**What is Llama 3?**
Llama 3 is Meta's latest family of open-weight large language models, released April 18, 2024. It comes in two sizes — 8B and 70B parameters — both in base and instruction-tuned variants. The weights are available publicly on Hugging Face under Meta's custom open license.

**How does Llama 3 8B compare to GPT-3.5 Turbo?**
Llama 3 8B instruction-tuned beats GPT-3.5 Turbo on HumanEval (62.2 vs 48.1) and GSM-8K (79.6 vs 57.1). GPT-3.5 Turbo has a slight edge on MMLU (70.0 vs 68.4). For code generation and math word problems, Llama 3 8B is the stronger model today.

**What is Grouped Query Attention (GQA) in Llama 3?**
GQA is an attention mechanism that allows multiple query heads to share a single key-value cache, reducing memory usage and improving inference throughput. Llama 3 extends GQA to the 8B model (previously only in the Llama 2 70B), enabling faster inference with lower VRAM requirements.

**How many parameters does Llama 3 have?**
Llama 3 is available in 8B and 70B parameter sizes today. Meta has confirmed a 400B+ model is currently in training, with no specified release date.

**What is the context window for Llama 3?**
Both the 8B and 70B models support 8,192 tokens — double Llama 2's 4,096. This is functional but behind closed-source frontier models (GPT-4 Turbo: 128K, Claude 3: 200K, Gemini Pro 1.5: 1M).

**How much data was Llama 3 trained on?**
Llama 3 was trained on 15 trillion tokens — 7x more than Llama 2's 2 trillion. The dataset includes improved code coverage, better multilingual data, and more rigorous quality filtering than its predecessor.

**Can I run Llama 3 locally?**
Yes. The 8B model runs on consumer hardware — a GPU with 8GB VRAM (RTX 3060 and above) or Apple Silicon with 16GB+ unified memory. The quickest path is Ollama: `ollama pull llama3 && ollama run llama3`. The 70B requires 40GB+ VRAM in Q4 quantization.

**Is Llama 3 free to use commercially?**
Llama 3 uses Meta's custom license that permits commercial use for most organizations. The restriction kicks in at products with more than 700 million monthly active users, a threshold that only the largest tech companies exceed. For the vast majority of commercial applications, it's effectively free.

**What does the Llama 3 vocabulary expansion mean?**
Llama 3 uses a 128,256-token vocabulary compared to Llama 2's 32,000. This delivers ~15% better token efficiency, improved multilingual coverage, and better representation of code and special characters. Fewer tokens per document means lower inference cost and better use of the 8K context window.

**When will Llama 3 400B be released?**
Meta has not announced a release date. They confirmed the model is in training as of today. Based on the pace of development, I'd expect an announcement in Q3 or Q4 2024, but nothing is confirmed.

---

## Start Building With Open Weights Today

Llama 3 is the clearest signal yet that the open-weights ecosystem is not a compromise — it's a genuine strategic option for builders. The combination of frontier-competitive benchmarks, open weights, and Meta's commitment to the 400B makes this the most important open-source AI release since the original Llama.

If you're running AI workflows in production and want to explore whether Llama 3 fits your stack — or if you want help architecting a self-hosted inference pipeline that actually scales — let's talk. I build custom AI automations and inference infrastructure for founders and ops teams who want frontier capability without the frontier API bill.

**[Book an AI automation strategy call →](/contact)**

---

*Related reading:*
- *[Running Llama 3 Locally: Ollama Setup, n8n Integration, and First-Day Benchmarks](/blog/2024/04/running-llama-3-locally-ollama-n8n)*
- *[Mistral 8x22B Drops via Torrent: The Open-Weights Escalation](/blog/2024/04/mistral-8x22b-torrent-drop)*
- *[n8n vs Make: The Non-Code AI Workflow Showdown](/blog/2024/04/n8n-vs-make-non-code-ai-workflow-showdown)*
