---
title: "Google Gemma 2 9B + 27B: The Best Open Model Under 30B at Launch"
slug: "google-gemma-2-9b-27b-open-model-launch"
date: "2024-06-27"
lastModified: "2024-06-27"
author: "William Spurlock"
readingTime: 0
categories:
  - "AI Models and News"
tags:
  - "Google Gemma 2"
  - "Gemma 2 9B"
  - "Gemma 2 27B"
  - "open source LLM"
  - "Google AI"
  - "Llama 3 competitor"
  - "open weights"
featured: false
draft: false
excerpt: "Google Gemma 2 launches today with 9B and 27B variants that outperform Llama 3 and Mistral. Here's why this might be the new default for open AI."
coverImage: "/images/blog/google-gemma-2-9b-27b-open-model-launch.png"
seoTitle: "Google Gemma 2 9B + 27B Launch: Open Model Leader | William Spurlock"
seoDescription: "Google Gemma 2 9B and 27B launch with best-in-class performance under 30B parameters. Open weights, commercial license, and benchmark dominance."
seoKeywords:
  - "Gemma 2 launch"
  - "Google Gemma 2 9B"
  - "Gemma 2 27B performance"
  - "best open LLM 2024"
  - "Gemma 2 vs Llama 3"

aioTargetQueries:
  - "what is Google Gemma 2"
  - "Gemma 2 vs Llama 3"
  - "best open source LLM under 30B"
  - "Gemma 2 benchmarks"
contentCluster: "foundation-models"
pillarPost: false
entityMentions:
  - "William Spurlock"
  - "Google"
  - "Gemma 2"
  - "Llama 3"
  - "Mistral"
serviceTrack: "ai-automation"
---

# Google Gemma 2 9B + 27B: The Best Open Model Under 30B at Launch

Google DeepMind releases Gemma 2 today — and it's immediately challenging everything we thought we knew about efficient open models.

## Table of Contents

1. [Gemma 2 Is Here: The Launch Breakdown](#gemma-2-is-here-the-launch-breakdown) — Google's next-generation open models drop with two powerful variants
2. [Two Sizes, Two Use Cases: 9B vs 27B](#two-sizes-two-use-cases-9b-vs-27b) — Which model fits your deployment needs
3. [Benchmark Breakdown: The Numbers Don't Lie](#benchmark-breakdown-the-numbers-dont-lie) — MMLU, GSM8K, coding, and reasoning comparisons
4. [Gemma 2 vs Llama 3 vs Mistral: Head-to-Head](#gemma-2-vs-llama-3-vs-mistral-head-to-head) — How Google's new models stack against the competition
5. [Knowledge Cutoff and Training Data](#knowledge-cutoff-and-training-data) — What Gemma 2 knows and how it learned it
6. [The Gemma License: Commercial Freedom](#the-gemma-license-commercial-freedom) — Permissive licensing for builders and businesses
7. [How to Deploy Gemma 2](#how-to-deploy-gemma-2) — Hugging Face, Kaggle, Vertex AI, and local deployment
8. [Responsible AI Built In](#responsible-ai-built-in) — Safety measures and ethical considerations
9. [Google's Open Strategy](#googles-open-strategy) — Why Google is betting big on open models
10. [What to Build with Gemma 2](#what-to-build-with-gemma-2) — Use cases and opportunities for developers

## Gemma 2 Is Here: The Launch Breakdown

**Google DeepMind just dropped Gemma 2 today — and it's immediately claiming the title of best open model under 30B parameters.** The release includes two instruction-tuned variants and two base models, all available right now on Hugging Face with permissive commercial licensing.

Google is releasing four model weights today:

| Model | Parameters | Type | Best For |
|-------|------------|------|----------|
| `gemma-2-2b-it` | 2.6B | Instruction-tuned | Edge devices, mobile apps, ultra-low latency |
| `gemma-2-9b-it` | 9B | Instruction-tuned | Consumer GPUs, production APIs, cost-efficient deployment |
| `gemma-2-27b-it` | 27B | Instruction-tuned | High-performance applications, complex reasoning tasks |
| `gemma-2-9b` / `gemma-2-27b` | 9B / 27B | Base (pre-trained) | Research, custom fine-tuning, domain adaptation |

The 9B model is the headline grabber — it outperforms Llama 3 8B Instruct across nearly every benchmark while requiring similar memory and compute. The 27B model punches even higher, delivering performance competitive with models 2-3× its size including Llama 3 70B on several key benchmarks.

What's immediately striking is the training data scale. The 27B model was trained on **13 trillion tokens** — double the data of comparable models in its class. The 9B model received 8 trillion tokens. This isn't incremental improvement; this is Google applying the lessons from Gemini 1.5 Pro to the open model ecosystem.

The models are built on the same research foundation as Google's flagship Gemini models, inheriting architectural improvements like Grouped-Query Attention (GQA) and interleaved local-global attention layers. But Gemma 2 introduces several novel techniques that explain its outsized performance: knowledge distillation for the smaller variants, logit soft-capping for training stability, and a three-stage model merging process for the instruction-tuned versions.

All models are available today with 8,192 token context windows, Hugging Face Transformers integration (requires v4.42.3+), and support for 4-bit and 8-bit quantization for reduced memory footprint.

## Two Sizes, Two Use Cases: 9B vs 27B

**Choose the 9B model for production APIs and consumer GPU deployment; choose the 27B when you need frontier-level performance without frontier-level infrastructure.** Both models share the same 8K context window and tokenizer, but their compute requirements and use cases differ significantly.

### 9B: The Production Workhorse

The 9B instruction-tuned model is designed for real-world deployment. At approximately **18GB of VRAM in bfloat16** (or ~9GB in 4-bit), it fits comfortably on a single consumer GPU like an RTX 4090 or A10G. This is the model you deploy when you need:

- **Cost-efficient API endpoints** — Run hundreds of concurrent requests on standard cloud instances
- **Local development workflows** — Fits on consumer hardware for prototyping and testing
- **Edge-adjacent deployment** — Viable for high-end workstations and on-premise servers
- **Fine-tuning accessibility** — QLoRA fine-tuning possible on single 24GB GPUs

The 9B model architecture uses 42 transformer layers with 3,584-dimensional embeddings, Grouped-Query Attention with 16 query heads and 8 key/value heads, and a vocabulary of 256,128 tokens (inherited from Gemini's multilingual tokenizer).

### 27B: The Performance Beast

The 27B model requires **~56GB of VRAM in bfloat16** or roughly **18GB in 4-bit quantization**. Google explicitly states this model "runs efficiently at full precision on a single NVIDIA H100 or A100 80GB GPU" — making it significantly cheaper to deploy than Llama 3 70B which demands multi-GPU setups.

Deployment scenarios for 27B:

- **High-stakes reasoning tasks** — Complex analysis, multi-step problem solving, research assistance
- **Code generation at scale** — Outperforms most coding-specific models on HumanEval and MBPP
- **Chatbot and conversational AI** — Ranks above Llama 3 70B on LMSYS Chatbot Arena
- **Synthetic data generation** — High-quality training data for smaller models

The 27B architecture scales to 46 layers with 4,608-dimensional embeddings and 32 query heads. Notably, it was trained **from scratch** rather than using knowledge distillation — Google reserved that technique for the smaller 2B and 9B variants.

### Memory Requirements Summary

| Precision | 9B VRAM | 27B VRAM | Typical Hardware |
|-----------|---------|----------|------------------|
| bfloat16/fp16 | ~18 GB | ~56 GB | RTX 4090 / A100 80GB |
| 8-bit | ~10 GB | ~30 GB | RTX 3090 / A10G |
| 4-bit | ~6 GB | ~18 GB | RTX 4070 / Colab Pro |

Both models support Flash Attention 2 and SDPA for efficient inference, though Google recommends using "eager" attention implementation during fine-tuning to preserve the logit soft-capping behavior that stabilized training.

## Benchmark Breakdown: The Numbers Don't Lie

**Gemma 2 9B achieves 71.3% on MMLU and 62.3% on GSM8K — crushing Llama 3 8B's 66.6% and 45.7% respectively.** The 27B model pushes even further to 75.2% MMLU and 74.0% GSM8K, competitive with models 2.5× its size.

The technical report released today includes comprehensive benchmark evaluations across knowledge, reasoning, mathematics, coding, and instruction following. Here's the breakdown:

### Academic Benchmark Comparison (Pre-trained Models)

| Benchmark | Gemma 2 9B | Llama 3 8B | Mistral 7B | Gemma 2 27B | Llama 3 70B |
|-----------|------------|------------|------------|-------------|-------------|
| **MMLU** (5-shot) | 71.3% | 66.6% | 62.5% | 75.2% | 79.2% |
| **GSM8K** (5-shot) | 68.6% | 45.7% | 39.6% | 74.0% | 76.9% |
| **ARC-C** (25-shot) | 68.4% | 59.2% | 60.5% | 71.4% | 68.8% |
| **HellaSwag** (10-shot) | 81.9% | 82.0% | 83.0% | 86.4% | 88.0% |
| **Winogrande** (5-shot) | 80.6% | 76.1% | 78.5% | 83.7% | 85.3% |
| **MATH** (4-shot) | 36.6% | — | 12.7% | 42.3% | — |
| **BBH** (3-shot CoT) | 68.2% | 61.1% | 56.0% | 74.9% | — |
| **HumanEval** | 40.2% | 32.3% | 26.2% | 51.8% | — |
| **MBPP** (3-shot) | 52.4% | 44.4% | 40.2% | 62.6% | — |

The 9B model's **17-point advantage on GSM8K** over Llama 3 8B is particularly striking — this isn't marginal improvement, it's a different class of mathematical reasoning capability. The 27B model's 51.8% on HumanEval puts it ahead of many code-specific models, demonstrating strong zero-shot coding ability.

### Chatbot Arena: Human Preference Validation

Academic benchmarks tell only part of the story. Gemma 2 models were evaluated on [LMSYS Chatbot Arena](https://chat.lmsys.org) through blind side-by-side human comparisons. The results validate the benchmark superiority:

| Model | Elo Rating | Comparison |
|-------|------------|------------|
| Gemma 2 27B IT | 1218 | Ranks **above** Llama 3 70B (1206) |
| Gemma 2 9B IT | 1187 | Equivalent to GPT-4-0314 (1186) |
| Llama 3 8B IT | 1151 | — |
| Gemma 2 2B IT | 1126 | Ranks **above** GPT-3.5-Turbo-0613 (1116) |

This is remarkable: the 27B model is preferred by human raters over a model nearly 3× its size, and the 9B model matches the performance of the original GPT-4 release. Google's post-training pipeline — combining supervised fine-tuning, RLHF with a larger reward model, and model merging via WARP — clearly produces models that humans prefer using.

### Instruction-Tuned Improvements

The instruction-tuned variants show consistent improvements over their base counterparts:

| Model | MMLU Base | MMLU IT | MBPP Base | MBPP IT |
|-------|-----------|---------|-----------|---------|
| Gemma 2 9B | 71.3% | 72.3% | 52.4% | 59.2% |
| Gemma 2 27B | 75.2% | 76.2% | 62.6% | 67.4% |

The ~7% improvement on coding benchmarks (MBPP) for the 9B model suggests the instruction tuning particularly helps with following coding instructions and producing runnable code.

## Gemma 2 vs Llama 3 vs Mistral: Head-to-Head

**Gemma 2 9B delivers better performance than Llama 3 8B on every benchmark except HellaSwag, while requiring comparable memory and compute.** The 27B model punches above its weight class, competing with Llama 3 70B despite having less than half the parameters.

### The Small Model Battle: 8B-9B Class

The 9B vs 8B comparison is what most developers care about — these are the models that run on consumer hardware and power production APIs. Here's how they stack:

**Gemma 2 9B advantages:**
- **+4.7 points** on MMLU (71.3% vs 66.6%)
- **+16.7 points** on GSM8K (68.6% vs 45.7%) — massive gap in math reasoning
- **+9.2 points** on ARC-C (68.4% vs 59.2%) — stronger reasoning
- **+7.9%** on HumanEval (40.2% vs 32.3%) — significantly better code generation

**Llama 3 8B advantages:**
- **+0.1 points** on HellaSwag (82.0% vs 81.9%) — essentially tied
- Wider ecosystem adoption (for now)
- Native tool use capabilities in the instruct variant

The GSM8K gap is the story here. Gemma 2's knowledge distillation training — using a larger teacher model's probability distributions rather than simple next-token prediction — clearly produces superior mathematical reasoning. For applications involving calculations, data analysis, or structured problem-solving, Gemma 2 9B is the better choice today.

### The Mid-Size Showdown: 27B vs 70B

Comparing Gemma 2 27B against Llama 3 70B reveals the efficiency story:

| Metric | Gemma 2 27B | Llama 3 70B | Efficiency Win |
|--------|-------------|-------------|----------------|
| Parameters | 27B | 70B | **2.6× smaller** |
| MMLU | 75.2% | 79.2% | Within 4 points |
| GSM8K | 74.0% | 76.9% | Within 3 points |
| ARC-C | 71.4% | 68.8% | **+2.6 points** |
| VRAM (fp16) | ~56GB | ~140GB | **2.5× less memory** |
| Inference Cost | Single A100 | 2× A100s | **Half the compute** |

Gemma 2 27B achieves **94-96% of Llama 3 70B's performance** on knowledge and math benchmarks while requiring **less than half the infrastructure**. For production deployments where inference cost matters, this efficiency advantage is decisive.

The LMSYS Chatbot Arena results confirm this: human raters prefer Gemma 2 27B (Elo 1218) over Llama 3 70B (Elo 1206) in blind evaluations. When humans can't tell which model is "bigger," the smaller, cheaper one wins.

### Mistral Comparison

Mistral 7B was the previous efficiency champion, but Gemma 2 9B outperforms it decisively:

- **MMLU:** 71.3% vs 62.5% (+8.8 points)
- **GSM8K:** 68.6% vs 39.6% (+29 points)
- **HumanEval:** 40.2% vs 26.2% (+14 points)

Mistral's Mixtral 8x7B (56B active parameters) remains competitive, but Gemma 2 27B's simpler architecture may be preferable for deployments where MoE routing complexity is a concern.

### When to Choose Which

| Use Case | Recommendation | Why |
|----------|----------------|-----|
| Consumer GPU, single user | Gemma 2 9B | Best performance/compute ratio |
| Production API at scale | Gemma 2 9B | Lowest cost per request |
| Complex reasoning, coding | Gemma 2 27B | Near-frontier performance |
| Maximum compatibility | Llama 3 8B | Broader ecosystem (for now) |
| Multi-GPU, research | Llama 3 70B | Slightly higher ceiling on some tasks |

## Knowledge Cutoff and Training Data

**Gemma 2 models were trained on 8 trillion tokens (9B) and 13 trillion tokens (27B) of primarily English web documents, code, and scientific articles.** Google has not disclosed exact knowledge cutoff dates, but the training data includes material current through early 2024.

### Training Scale Context

The token counts are significant:

| Model | Parameters | Training Tokens | Tokens per Parameter |
|-------|------------|-----------------|---------------------|
| Gemma 2 2B | 2.6B | 2T | ~770 |
| Gemma 2 9B | 9B | 8T | ~890 |
| Gemma 2 27B | 27B | 13T | ~480 |
| Llama 3 8B | 8B | 15T | ~1,875 |
| Llama 3 70B | 70B | 15T | ~214 |

Gemma 2 9B was trained on **50× more tokens** than the "compute-optimal" amount predicted by Chinchilla scaling laws. Google deliberately over-trained the smaller models using knowledge distillation, simulating the effect of training beyond available data quality limits.

### Knowledge Distillation: The Secret Sauce

The 2B and 9B models were trained with **knowledge distillation** — a technique where the smaller "student" model learns from the probability distributions of a larger "teacher" model rather than from raw text. This provides richer training signals than simple next-token prediction.

The specific approach used "on-policy distillation":

1. The student generates completions for prompts
2. The teacher evaluates those completions
3. KL divergence between teacher and student distributions is minimized
4. This reduces the "train-inference mismatch" common in distilled models

The result: Gemma 2 9B outperforms a hypothetical model trained from scratch on significantly more data. As shown in ablation studies, a 2B model trained with distillation from a 7B teacher outperforms one trained from scratch by **7.4 points** on averaged benchmarks — even when both use 500B tokens (10× the compute-optimal amount).

### Data Composition

Google reports the training mix includes:

- **Web documents** — Curated English web content with quality filtering
- **Code** — Public code repositories, technical documentation
- **Scientific articles** — Academic papers, scientific content
- **Mathematical content** — Proof-based and calculation-heavy text

Notably, Gemma 2 is **not multimodal** and is **not specifically trained for multilingual capabilities** — though it inherits Gemini's 256K token vocabulary designed for multiple languages. The primary focus is English language performance across reasoning, coding, and knowledge tasks.

### Data Quality Measures

Google applied several filtering techniques:

- **Safety filtering** — Reducing unwanted or unsafe content
- **PII removal** — Filtering personal information and sensitive data
- **Deduplication** — Removing duplicate and near-duplicate content
- **Decontamination** — Ensuring benchmark examples aren't in training data

The memorization evaluation shows Gemma 2 memorizes **significantly less** than comparable models — verbatim memorization rates are below 0.1%, compared to higher rates in earlier open models. This reduces privacy and copyright concerns when deploying in production.

## The Gemma License: Commercial Freedom

**The Gemma license allows commercial use, redistribution, fine-tuning, and derivative works with straightforward attribution requirements.** This is a genuinely permissive license — not the "open washing" we've seen from some model releases.

### What You Can Do

Google's Gemma Terms of Use permit:

- ✅ **Commercial use** — Build products, offer services, generate revenue
- ✅ **Redistribution** — Share the model weights, host them publicly
- ✅ **Fine-tuning** — Train on your own data, create specialized variants
- ✅ **Derivative models** — Release modified versions with appropriate naming
- ✅ **Research** — Academic study, benchmark evaluation, publication

### Key Requirements

The license requires:

1. **Attribution** — Include the license and copyright notice
2. **Acceptable Use Policy** — Don't use for illegal activities, generating misinformation at scale, or automated abuse
3. **Derived model naming** — Modified versions should use different names (not "Gemma 2")

There's no revenue cap, no usage volume restrictions, and no requirement to share your fine-tuned weights (unlike some copyleft licenses). You can build a commercial product on top of Gemma 2 and keep your modifications private.

### Comparison to Other Open Model Licenses

| License | Commercial | Redistribution | Derivatives | Key Restriction |
|---------|------------|----------------|-------------|-----------------|
| **Gemma** | ✅ Yes | ✅ Yes | ✅ Yes | Acceptable use policy |
| **Llama 3** | ✅ Yes | ✅ Yes | ✅ Yes | 700M user threshold |
| **Mistral** | ✅ Yes | ✅ Yes | ✅ Yes | Non-compete clause |
| **Apache 2.0** (Qwen) | ✅ Yes | ✅ Yes | ✅ Yes | None |
| **CC-BY-NC** (some) | ❌ No | ✅ Yes | ✅ Yes | Non-commercial only |

The Gemma license sits alongside Llama 3's as the most permissive for commercial builders. Meta's license requires additional licensing if you hit 700M monthly active users; Google's doesn't have that trigger. However, both require compliance with acceptable use policies that prohibit harmful applications.

### What This Means for Builders

For founders and developers, the Gemma license enables:

- **SaaS products** powered by Gemma 2 without per-user licensing fees
- **On-premise deployments** for enterprise clients with data privacy requirements
- **Fine-tuned specializations** you can keep proprietary or commercialize
- **Research publications** benchmarking and comparing model performance

The clarity of the license reduces legal risk compared to custom "open" licenses with ambiguous terms. Google's explicit commercial permission makes Gemma 2 suitable for production business applications without requiring legal review of novel license provisions.

## How to Deploy Gemma 2

**Gemma 2 is available today on Hugging Face, Kaggle, Google Cloud Vertex AI, and can be deployed locally with just a few lines of code.** The integration with the Hugging Face ecosystem is particularly strong, with native Transformers support and production-ready inference containers.

### Hugging Face (Recommended for Most Users)

The models are live on Hugging Face Hub right now:

```bash
pip install "transformers>=4.42.3" --upgrade
```

Basic inference example:

```python
from transformers import pipeline
import torch

pipe = pipeline(
    "text-generation",
    model="google/gemma-2-9b-it",
    model_kwargs={"torch_dtype": torch.bfloat16},
    device="cuda",
)

messages = [
    {"role": "user", "content": "Explain quantum computing in simple terms."},
]
outputs = pipe(messages, max_new_tokens=256, do_sample=False)
print(outputs[0]["generated_text"][-1]["content"])
```

Key deployment notes:

- **Use bfloat16** for the 27B instruction-tuned model — float16 produces erratic outputs
- **4-bit quantization** reduces 27B to ~18GB VRAM, fitting consumer GPUs
- **Chat template** is built-in for instruct models — use `pipe.tokenizer.apply_chat_template()`

### Hugging Face Inference Endpoints

For production APIs without managing infrastructure:

```python
from openai import OpenAI

client = OpenAI(
    base_url="<YOUR_ENDPOINT>/v1/",
    api_key="<HF_API_TOKEN>",
)

response = client.chat.completions.create(
    model="tgi",
    messages=[{"role": "user", "content": "Hello!"}],
    stream=True,
)
```

Hugging Face's Text Generation Inference (TGI) backend supports:
- Continuous batching for throughput optimization
- Token streaming for responsive UX
- Tensor parallelism for multi-GPU deployments
- OpenAI-compatible Messages API

### Google Cloud & Vertex AI

For enterprise deployments, Google Cloud offers:

- **Vertex AI Model Garden** — Managed deployment with auto-scaling
- **GKE containers** — Kubernetes-native serving
- **Cloud TPU** — Cost-efficient inference on TPU v5e/v5p

The 27B model was trained on TPU v5p, and Google is releasing optimized TPU containers for inference. For teams already on Google Cloud, this provides seamless integration with existing IAM, monitoring, and networking.

### Kaggle

Models are available as Kaggle Datasets/Models for:
- Free GPU notebooks (T4, P100)
- Competition submissions
- Research reproducibility

Kaggle's T4 instances can run the 9B model in 4-bit mode, making it accessible for experimentation without local GPU resources.

### Local Deployment Hardware Guide

| Model | Precision | Minimum VRAM | Recommended GPU | Latency (est.) |
|-------|-----------|--------------|-----------------|----------------|
| 9B | 4-bit | 6 GB | RTX 4070 | ~50 tok/sec |
| 9B | 8-bit | 10 GB | RTX 3090 | ~40 tok/sec |
| 9B | fp16 | 18 GB | RTX 4090 | ~30 tok/sec |
| 27B | 4-bit | 18 GB | RTX 4090 | ~25 tok/sec |
| 27B | 8-bit | 30 GB | A100 40GB | ~15 tok/sec |
| 27B | fp16 | 56 GB | A100 80GB | ~10 tok/sec |

CPU inference is possible but not recommended — the models are optimized for GPU attention kernels.

### Fine-Tuning with QLoRA

For domain adaptation, the TRL library supports Gemma 2 fine-tuning:

```bash
pip install trl bitsandbytes peft
```

Key fine-tuning recommendations from Google:
- Target attention layers (`q_proj`, `k_proj`, `v_proj`, `o_proj`)
- Don't target MLP layers — they're sparse and don't work well with PEFT
- Use `attn_implementation="eager"` to preserve soft-capping behavior
- 4-bit QLoRA works on single 24GB GPUs for the 9B model

## Responsible AI Built In

**Gemma 2 memorizes significantly less training data than comparable models — verbatim memorization rates are below 0.1%, and the models demonstrate safer outputs than GPT-4o on held-out safety evaluations.** Google invested heavily in pre-training and post-training safety measures.

### Memorization and Privacy Protection

Large language models can sometimes reproduce verbatim training content when prompted specifically. Gemma 2's memorization evaluation shows significant improvements:

- **Verbatim memorization:** <0.1% across all data sources (note: log scale)
- **Approximate memorization:** Still low, even with 10% edit distance tolerance
- **Code memorization:** Higher than other sources, but still reduced vs. Gemma 1

This is achieved through:

1. **Data deduplication** — Removing near-duplicate training examples
2. **Sensitive content filtering** — Reducing personally identifiable information
3. **Training techniques** — Knowledge distillation may reduce verbatim regurgitation

For production deployments, this reduces privacy and copyright risks — though Google still recommends "rigorous safety testing specific to your use case before deployment."

### Safety Evaluations

Gemma 2 models were evaluated on:

- **Toxicity generation** — Willingness to produce harmful content
- **Bias and fairness** — Performance across demographic groups
- **Truthfulness** — Tendency to hallucinate or produce misinformation
- **Instruction following safety** — Refusing harmful requests appropriately

Human evaluation results show:

| Model | Safety Win Rate vs GPT-4o |
|-------|--------------------------|
| Gemma 2 2B IT | 57.5% |
| Gemma 2 9B IT | 57.8% |
| Gemma 2 27B IT | 55.0% |
| Gemma 1.1 7B IT | 42.8% |

The Gemma 2 models produce safer, more appropriate responses than GPT-4o on the held-out safety prompt set. This is significant — smaller open models achieving better safety outcomes than a closed flagship model.

### Refusal and Hedging Improvements

Gemma 2's post-training includes data subsets that encourage:

- **Better in-context attribution** — Citing sources when appropriate
- **Hedging** — Expressing uncertainty rather than confabulating
- **Appropriate refusals** — Declining harmful or unethical requests

The instruction-following evaluations show improved adherence to complex multi-part instructions, with the 27B model achieving 37.7% on held-out instruction-following tasks (vs 24.3% for Gemma 1.1 7B).

### Post-Training Safety Pipeline

Google's post-training process specifically targets safety:

1. **SFT with safety data** — Training on filtered prompts and responses
2. **RLHF with safety-oriented reward model** — The reward model is "an order of magnitude larger than the policy" and oriented toward conversational safety
3. **Model merging** — Averaging models trained with different safety hyperparameters
4. **Data filtering** — Multiple stages removing unsafe synthetic outputs

The result is models that maintain high helpfulness while reducing harmful outputs — the classic safety-performance tradeoff handled better than previous open releases.

### What This Means for Builders

You still need to:
- Test specifically for your use case and user base
- Implement input/output filtering for production APIs
- Monitor for adversarial attacks and jailbreak attempts
- Consider fine-tuning on domain-specific safety examples

But Gemma 2's strong baseline safety performance gives you a better starting point than many open alternatives.

## Google's Open Strategy

*Section placeholder: Why Google is releasing competitive open models and what it means for the ecosystem*

## What to Build with Gemma 2

*Section placeholder: Practical use cases, fine-tuning opportunities, and production deployment ideas*

## Frequently Asked Questions

### What is Google Gemma 2?
*FAQ placeholder*

### How does Gemma 2 9B compare to Llama 3 8B?
*FAQ placeholder*

### What benchmarks does Gemma 2 lead on?
*FAQ placeholder*

### Can I use Gemma 2 commercially?
*FAQ placeholder*

### What hardware do I need to run Gemma 2 27B?
*FAQ placeholder*

### How was Gemma 2 trained?
*FAQ placeholder*

### What is knowledge distillation in Gemma 2?
*FAQ placeholder*

### Where can I download Gemma 2?
*FAQ placeholder*

### Does Gemma 2 support coding tasks?
*FAQ placeholder*

### What context length does Gemma 2 support?
*FAQ placeholder*

### How does Gemma 2 rank on Chatbot Arena?
*FAQ placeholder*

### Is Gemma 2 safer than other open models?
*FAQ placeholder*

## Bottom Line

*Section placeholder: Final summary and CTA*
