---
title: "Microsoft Phi-3.5 Family: MIT-Licensed Multilingual SLMs Challenge Llama 3.1"
slug: "microsoft-phi-3-5-family-mit-slms-llama-3-1"
date: "2024-08-21"
lastModified: "2024-08-21"
author: "William Spurlock"
readingTime: 16
categories:
  - "AI Models and News"
tags:
  - "Phi-3.5"
  - "Microsoft"
  - "small language models"
  - "MIT license"
  - "Llama 3.1"
  - "open weights"
  - "multilingual LLM"
  - "mixture of experts"
featured: false
draft: false
excerpt: "Phi-3.5-mini, MoE, and vision ship under MIT with 128K context—Microsoft’s SLMs benchmark beside Llama-3.1-8B on multilingual and long-context suites."
coverImage: "/images/blog/microsoft-phi-3-5-family-mit-slms.png"
seoTitle: "Phi-3.5: MIT SLMs vs Llama 3.1 | William Spurlock"
seoDescription: "Phi-3.5-mini (3.8B), MoE (6.6B active), and vision (4.2B) ship August 2024 under MIT. Benchmarks vs Llama-3.1-8B, licensing, and when to deploy each variant."
seoKeywords:
  - "Phi-3.5 mini"
  - "Phi-3.5 MoE"
  - "Phi-3.5 vs Llama 3.1"
  - "MIT license LLM"
  - "multilingual small language model"
aioTargetQueries:
  - "Phi-3.5 vs Llama 3.1 8B"
  - "is Phi-3.5 MIT licensed"
  - "Phi-3.5 MoE parameters"
  - "best small multilingual LLM August 2024"
  - "Phi-3.5 vision benchmarks"
contentCluster: "foundation-models"
pillarPost: false
parentPillar: "llama-3-1-405b-frontier-open-weights"
entityMentions:
  - "William Spurlock"
  - "Microsoft"
  - "Phi-3.5-mini-instruct"
  - "Phi-3.5-MoE-instruct"
  - "Phi-3.5-vision-instruct"
  - "Llama 3.1 8B"
  - "Hugging Face"
  - "Transformers"
serviceTrack: "both"
---

# Microsoft Phi-3.5 Family: MIT-Licensed Multilingual SLMs Challenge Llama 3.1

**Microsoft is shipping three new Phi-3.5 checkpoints this week — and every one of them is on Hugging Face under the MIT license.** That matters in the same month Meta’s [Llama 3.1](/blog/llama-3-1-405b-frontier-open-weights) family is defining the open-weights conversation: Phi-3.5-mini-instruct (3.8B dense), Phi-3.5-MoE-instruct (16×3.8B experts, 6.6B active), and Phi-3.5-vision-instruct (4.2B multimodal) all advertise 128K token context for the text stack, heavy multilingual training, and benchmark tables where Microsoft explicitly lines up against **Llama-3.1-8B-Instruct**.

This is not a vague “small model” refresh. It is a direct positioning play: *permissive licensing* plus *SLM footprint* plus *numbers that land on or past Meta’s 8B tier* on several public leaderboards.

---

## Table of Contents

1. [What Shipped: Three Phi-3.5 Models Under MIT](#what-shipped)
2. [MIT vs Meta’s License: Why Enterprise Legal Teams Care](#mit-vs-llama-license)
3. [Phi-3.5-Mini-Instruct: 3.8B Dense, 128K, Multilingual](#phi-35-mini)
4. [Phi-3.5-MoE-Instruct: 6.6B Active Parameters](#phi-35-moe)
5. [Phi-3.5-Vision-Instruct: 4.2B Multimodal](#phi-35-vision)
6. [Benchmark Receipts: Phi-3.5 vs Llama-3.1-8B-Instruct](#benchmarks)
7. [Long Context and Code Repos: RULER and RepoQA](#long-context)
8. [Running Phi-3.5 Today: Transformers, Flash Attention, Azure](#running-today)
9. [What This Week Means Next to Llama 3.1](#landscape)
10. [Pick a Variant: Decision Matrix for Builders](#decision-matrix)
11. [Frequently Asked Questions](#faq)
12. [Closing](#closing)

---

## What Shipped: Three Phi-3.5 Models Under MIT {#what-shipped}

**The Phi-3.5 drop is a coordinated trio: two high-context multilingual text models and one multimodal model — all documented on Hugging Face with MIT `LICENSE` files and explicit comparisons to Llama-3.1-8B.** Microsoft lists **August 2024** as the release window on the model cards, with training timelines spanning roughly **June–August 2024** for Phi-3.5-mini, **April–August 2024** for the MoE, and **July–August 2024** for vision.

| Model card | Role | Parameters (as stated) | Context | License |
|------------|------|------------------------|---------|---------|
| `microsoft/Phi-3.5-mini-instruct` | Dense instruct SLM | 3.8B | 128K | [MIT](https://huggingface.co/microsoft/Phi-3.5-mini-instruct/blob/main/LICENSE) |
| `microsoft/Phi-3.5-MoE-instruct` | MoE instruct | 16×3.8B total, **6.6B active** (2 routed experts) | 128K | [MIT](https://huggingface.co/microsoft/Phi-3.5-MoE-instruct/blob/main/LICENSE) |
| `microsoft/Phi-3.5-vision-instruct` | Image+text instruct | **4.2B** (encoder + connector + projector + Phi-3 Mini LM) | 128K | [MIT](https://huggingface.co/microsoft/Phi-3.5-vision-instruct/blob/main/LICENSE) |

**Azure AI Studio** endpoints are live for each variant (`aka.ms/try-phi3.5mini`, `try-phi3.5moe`, `try-phi3.5vision` per the cards), which matters if you want managed inference without wrangling Flash Attention builds yourself.

**Why I am tying this immediately to Llama 3.1:** Meta’s 8B instruct tier is the default self-hosting reference this summer — it is the realistic comparison point for memory-bound deployments, not the 405B flagship. Microsoft’s own published tables put **Llama-3.1-8B-Instruct** next to Phi-3.5 across multilingual, reasoning, code, and long-context suites. That is the fight worth watching.

---

## MIT vs Meta’s License: Why Enterprise Legal Teams Care {#mit-vs-llama-license}

**MIT is the simplest commercial story in open software: reuse, modify, ship in products, and — unlike Meta’s Llama family license — no “Built with Llama” branding requirement, no user-count threshold, and no special rider about naming derived models.** I am not giving you legal advice; I am telling you why procurement teams perk up when they read “MIT” on a weights card.

Meta’s [Llama 3.1 release](/blog/llama-3-1-405b-frontier-open-weights) is enormously capable, but it ships under the **Llama 3.1 Community License** — a custom commercial license with compliance steps that many enterprises already track in third-party risk spreadsheets. Phi-3.5’s Hugging Face pages link straight to a canonical `LICENSE` file in-repo and describe the release as MIT-licensed in plain language.

| Concern | MIT (Phi-3.5 on HF) | Llama Community License (typical friction points) |
|---------|---------------------|--------------------------------------------------|
| Commercial redistribution | Allowed with minimal conditions | Allowed with Meta’s conditions and acceptance flow |
| Branding / attribution | Standard MIT notice | “Llama” naming + “Built with Llama” display rules |
| High-MAU products | No special threshold in MIT itself | Meta defines thresholds requiring a separate license |
| Derivative naming | No “must include Phi in name” rule | Derived models must include “Llama” per Meta terms |

**Practical builder takeaway today:** if your product roadmap includes white-label SLMs, on-device bundles, or downstream distillation workflows, the license column can matter as much as the MMLU row. Phi-3.5 is Microsoft’s bet that **permissive beats custom** for adoption velocity — especially in multilingual markets where Hugging Face is already the distribution layer.

---

---

## Phi-3.5-Mini-Instruct: 3.8B Dense, 128K, Multilingual {#phi-35-mini}

**Phi-3.5-mini is the dense workhorse — a 3.8B decoder-only Transformer on the same tokenizer family as Phi-3 Mini, trained on ~3.4T tokens with Microsoft reporting ~10 days on 512× H100-80G GPUs.** The model card positions it as “reasoning dense” synthetic data plus heavily filtered web corpora, with a **publicly available data cutoff around October 2023** for the text slice (static checkpoint, not a live-updating model).

**Multilingual coverage (as listed on the card today):** Arabic, Chinese, Czech, Danish, Dutch, English, Finnish, French, German, Hebrew, Hungarian, Italian, Japanese, Korean, Norwegian, Polish, Portuguese, Russian, Spanish, Swedish, Thai, Turkish, Ukrainian.

**Chat template:** Microsoft standardizes on the Phi chat markup — `<|system|>…<|end|>` / `<|user|>…<|end|>` / `<|assistant|>` — which matters if you are piping prompts from tools that assume ChatML or Llama-3 chat templates. Swap the template, not just the weights.

**Integration note:** Phi-3.5-mini is wired into **`transformers` ≥ 4.43.0** on the card, alongside `torch==2.3.1`, `accelerate==0.31.0`, and `flash_attn==2.5.8` for the happy path.

---

## Phi-3.5-MoE-Instruct: 6.6B Active Parameters {#phi-35-moe}

**Phi-3.5-MoE is the “small shell, big routing” play: 16 experts sized at 3.8B each, with 6.6B active parameters when two experts fire per token.** Microsoft trained it on **4.9T tokens** (including **~10% multilingual** token share per the card) across **23 days on 512× H100-80G** — a noticeably heavier data budget than the dense mini, which shows up in reasoning and math rows.

Microsoft’s own summary sentence on the MoE card is blunt: **6.6B active params lands “similar” language understanding and math to much larger models, beats bigger open weights on some reasoning columns, and sits behind GPT-4o-mini on the closed-model references they publish.** That is exactly the competitive lane open-source weights fight in this summer: *not* beating GPT-4o on everything, but **punching above parameter parity** against Llama-3.1-8B and Mistral-Nemo-12B on selected suites.

**Tooling requirement:** MoE routing needs **`transformers` ≥ 4.46.0** — newer than the mini — so don’t assume one dependency pin covers the whole family.

---

## Phi-3.5-Vision-Instruct: 4.2B Multimodal {#phi-35-vision}

**Phi-3.5-vision stacks an image encoder, connector, projector, and the Phi-3 Mini language backbone into a 4.2B-parameter multimodal model with the same 128K token multimodal context story Microsoft advertises for this generation.** Training is listed at **500B multimodal text+vision tokens** over **6 days on 256× A100-80G**, with alignment finishing **July–August 2024** on the card timeline.

**What is new in the release notes (verbatim emphasis):** multi-frame understanding — “detailed image comparison, multi-image summarization/storytelling and video summarization” — pitched squarely at document and Office-style workloads. They cite **MMMU** moving **40.2 → 43.0**, **MMBench (dev-en)** **80.5 → 81.9**, and **TextVQA** **70.9 → 72.0** versus their stated prior checkpoint baselines on the same card.

**Prompting pattern:** images inject as `<|image_1|>` tokens inside `<|user|>` blocks; multi-image prompts stack multiple placeholders before the user text. The processor exposes a `num_crops` knob — **4** for multi-frame, **16** for single-frame — which is the kind of deployment detail that separates demo-quality from production-quality vision pipelines.

**Language scope:** the vision card’s primary commercial positioning is **English-first**, even though the text siblings lean multilingual. If you need non-English OCR-heavy flows, validate in-language before you bake assumptions into UX.

**Package stack on the card:** `transformers==4.43.0`, `torch==2.3.0`, `torchvision==0.18.0`, `accelerate==0.30.0`, `Pillow==10.3.0`, plus Flash Attention where available.

---

---

## Benchmark Receipts: Phi-3.5 vs Llama-3.1-8B-Instruct {#benchmarks}

**On Microsoft’s unified evaluation harness (temperature 0, few-shot where noted), Phi-3.5-mini-instruct and Llama-3.1-8B-instruct trade wins — but the averages show Microsoft’s 3.8B model “sitting at the table” with Meta’s 8B tier, not getting blown out.** Treat these as vendor-reported, same-pipeline numbers — still useful for relative ordering when you don’t have time to reproduce every suite yourself this week.

**Headline English-centric scores (from the Phi-3.5-mini model card):**

| Benchmark | Phi-3.5 Mini-Ins | Llama-3.1-8B-Ins |
|-----------|------------------:|-----------------:|
| MMLU (5-shot) | **69.0** | 68.1 |
| MMLU-Pro (0-shot CoT) | **47.4** | 44.0 |
| Arena Hard | **37.0** | 25.7 |
| GSM8K (8-shot CoT) | **86.2** | 82.4 |
| HumanEval (0-shot) | 62.8 | **66.5** |
| MBPP (3-shot) | 69.6 | **69.4** |

**Multilingual MMLU (5-shot)** lists **55.4** vs **56.2** — essentially a tie inside measurement noise, with both trailing Gemini 1.5 Flash / GPT-4o-mini references on the same table.

**Category averages Microsoft publishes for Phi-3.5-mini vs Llama-3.1-8B:**

| Category (averaged suites) | Phi-3.5 Mini | Llama-3.1 8B |
|----------------------------|-------------:|-------------:|
| Reasoning | 70.1 | 70.5 |
| Math | **67.4** | 65.0 |
| Code generation | 62.0 | **65.8** |
| Multilingual | **55.2** | 47.5 |
| Long context | **26.1** | 24.5 |

**MoE snapshot:** Phi-3.5-MoE posts **Multilingual MMLU 69.9** vs **56.2** for Llama-3.1-8B on the MoE card — the largest multilingual gap Microsoft claims in this release wave. That is the variant to reach for if non-English instruct quality is the gating metric.

---

## Long Context and Code Repos: RULER and RepoQA {#long-context}

**Microsoft is explicit that Phi-3.5-mini targets long-document QA, retrieval-style tasks, and meeting summarization because the architecture is trained for 128K tokens end-to-end — not bolted on as an afterthought.** The long-context tables are where the story gets nuanced: **Llama-3.1-8B-instruct still wins the RULER average in Microsoft’s published run** (88.3 vs 84.1), which measures needle-style retrieval behavior across 4K→128K spans.

| RULER average | Phi-3.5-mini | Llama-3.1-8B |
|---------------|-------------:|-------------:|
| **Overall** | 84.1 | **88.3** |

**RepoQA (code repo long context)** flips the advantage: Phi-3.5-mini reports **77** average vs **71** for Llama-3.1-8B — useful if your automation stack ingests entire repository snapshots for RAG or offline summarization.

**Practical read:** if your workload is *pure retrieval accuracy at extreme span lengths*, Meta’s 8B instruct still shows stronger RULER scores in Microsoft’s table. If your workload is *multilingual mix + code corpora + mid-weight deployment*, Phi-3.5’s RepoQA lead and MIT license may matter more than RULER’s last-mile gap.

---

## Running Phi-3.5 Today: Transformers, Flash Attention, Azure {#running-today}

**You can run Phi-3.5 locally today if you treat Flash Attention and dependency pins as first-class requirements — not optional nice-to-haves.** Microsoft’s cards list A100 / A6000 / H100 validation for the default `flash_attention_2` path; older NVIDIA stacks need `attn_implementation="eager"` to avoid hard failures.

**Minimal `transformers` load (mini, from the official card, abbreviated):**

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

torch.random.manual_seed(0)

model = AutoModelForCausalLM.from_pretrained(
    "microsoft/Phi-3.5-mini-instruct",
    device_map="cuda",
    torch_dtype="auto",
    trust_remote_code=True,
)
tokenizer = AutoTokenizer.from_pretrained("microsoft/Phi-3.5-mini-instruct")

messages = [
    {"role": "system", "content": "You are a helpful AI assistant."},
    {"role": "user", "content": "Summarize why MIT licensing matters for on-device SLMs."},
]

pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)
out = pipe(
    messages,
    max_new_tokens=400,
    return_full_text=False,
    temperature=0.0,
    do_sample=False,
)
print(out[0]["generated_text"])
```

**MoE change:** `Phi-3.5-MoE-instruct` sets `trust_remote_code=False` in Microsoft’s sample — mirror that unless your tooling explicitly requires remote modules.

**Managed path:** if you do not want to own GPU kernels this month, start from Azure AI Studio’s hosted endpoints and only move weights onto your metal once latency and data residency tests pass.

---

## What This Week Means Next to Llama 3.1 {#landscape}

**Llama 3.1 moved the open-weights window to 128K + tool use + a full ladder from 8B to 405B — it redefined what “self-hosted frontier” meant in July.** Phi-3.5 answers a different question Microsoft cares about: **can a *permissively licensed* SLM family sit at the same negotiating table as Meta’s 8B tier for multilingual + reasoning + multimodal bundles — without asking legal for a Meta addendum every quarter?**

This is cumulative with Microsoft’s broader Phi strategy from Build season: **small models that run on NPUs, sit beside Copilot stacks, and now publish receipts against the same Llama-3.1-8B reference implementation everyone is already downloading.** For builders, competition between **MIT Phi** and **Llama Community License Llama** is healthy: it pushes both sides to keep publishing eval tables instead of hand-wavy blog claims.

Cross-read: my [Llama 3.1 405B launch breakdown](/blog/llama-3-1-405b-frontier-open-weights) for Meta’s July context ladder, and the earlier [Meta Llama 3 pillar](/blog/meta-llama-3-open-weights-frontier) if you want the full arc from April’s 8B/70B drop to today’s Phi-3.5 comparison point.

---

## Pick a Variant: Decision Matrix for Builders {#decision-matrix}

**Use this as a shipping heuristic, not a replacement for your own evals on *your* prompts.**

| If you need… | Reach for… | Llama-3.1-8B angle |
|--------------|------------|--------------------|
| Dense 3.8B footprint + MIT + balanced English benchmarks | `Phi-3.5-mini-instruct` | Still wins some code + RULER rows |
| Stronger multilingual MMLU + MoE latency tradeoffs | `Phi-3.5-MoE-instruct` | MoE tables claim larger multilingual gap |
| Multimodal, multi-image / light video summarization | `Phi-3.5-vision-instruct` | Text-only Llama instruct won’t compete without a vision head |
| Maximum ecosystem third-party quants + llama.cpp saturation today | — | Llama still has broader community packaging *this week* |
| Apache-2.0 only (no MIT, no Meta custom license) | — | Also scan [Gemma 2](/blog/google-gemma-2-9b-27b-open-model-launch) if Google’s terms fit your policy better than either |

**Operational caveats:**

- Match **chat templates** to each model family — silent quality regressions come from template mismatches, not tokenizer bugs.
- Pin **`transformers`** per model: **4.43.0** for mini + vision, **4.46.0+** for MoE.
- Treat Microsoft’s multilingual gains as **real but uneven** — Phi cards themselves warn about non-English safety and capability gaps.

---

---

## Frequently Asked Questions {#faq}

### What is the Phi-3.5 family?

**Phi-3.5 is Microsoft’s August 2024 refresh of the Phi-3 line: three MIT-licensed checkpoints on Hugging Face — `Phi-3.5-mini-instruct` (3.8B dense), `Phi-3.5-MoE-instruct` (16×3.8B experts, 6.6B active), and `Phi-3.5-vision-instruct` (4.2B multimodal).** All three target 128K-token contexts in their model cards and publish head-to-head tables with Llama-3.1-8B-Instruct.

### Are all Phi-3.5 models released under the MIT license?

**Yes on the official Hugging Face repos: each model card links to an in-repo MIT `LICENSE` file for mini, MoE, and vision.** Always re-check the license file in your pinned revision before commercial redistribution — standard third-party diligence still applies.

### How does Phi-3.5-mini compare to Llama-3.1-8B-Instruct on MMLU?

**Microsoft reports 69.0 (Phi-3.5 Mini) vs 68.1 (Llama-3.1-8B) on 5-shot MMLU in the Phi-3.5-mini model card — a narrow lead inside typical eval variance.** Pair it with MMLU-Pro and multilingual suites before you declare a winner for *your* workload.

### What is the parameter count of Phi-3.5-MoE-instruct?

**The MoE card lists 16×3.8B expert blocks with 6.6B active parameters when two experts route per token.** Total parameter storage is much larger than 6.6B even though activated FLOPs track the smaller active count.

### What transformers version do I need for Phi-3.5-MoE?

**Microsoft specifies `transformers` 4.46.0 or newer for Phi-3.5-MoE-instruct**, whereas Phi-3.5-mini and Phi-3.5-vision cite the 4.43.x line in their requirement blocks. Pin versions per model, not once for the whole family.

### Does Phi-3.5-vision support multiple images in one prompt?

**Yes — the vision card documents `<|image_1|>`, `<|image_2|>`, … placeholders in the user turn for multi-image and multi-frame workflows**, including presentation decks and short video clip summarization in the examples.

### What context lengths do Phi-3.5 text models support?

**Both Phi-3.5-mini-instruct and Phi-3.5-MoE-instruct advertise 128K-token context windows on their Hugging Face model cards**, with long-bench tables (GovReport, QMSum, Qasper, etc.) published alongside RULER drill-downs.

### Which Phi-3.5 model is best for Korean or multilingual benchmarks?

**Phi-3.5-MoE-instruct shows the largest multilingual MMLU delta Microsoft publishes against Llama-3.1-8B in this release (69.9 vs 56.2 on the MoE card).** For Korean specifically, the MoE appendix includes CLIcK / HAERAE / KMMLU tables benchmarking against Llama-3.1-8B and GPT-family references.

### Can I use Phi-3.5 outputs to train another model under the license?

**MIT is broadly permissive for derivative work compared to many custom model licenses, but this FAQ is not legal advice — have counsel review your exact fine-tuning, distillation, and redistribution plan against the shipped `LICENSE` text.** The model cards explicitly warn that nothing in the card overrides the license terms.

### How does Phi-3.5-mini perform on long-document benchmarks versus Llama 3.1 8B?

**Microsoft’s bundled long-context average favors Phi-3.5-mini (26.1 vs 24.5) in the category averages table, but RULER’s aggregated retrieval drill shows Llama-3.1-8B ahead (88.3 vs 84.1).** Decide based on whether your app behaves more like structured retrieval needles or repository-scale code/document understanding.

### What GPUs does Microsoft recommend for Phi-3.5 inference?

**The text model cards list A100, A6000, and H100 validation for Flash Attention–accelerated inference; vision references the same class of hardware in its notes.** On older NVIDIA stacks, use eager attention modes to trade speed for compatibility.

### Where can I try Phi-3.5 without self-hosting?

**Microsoft links Azure AI Studio “Try It” experiences for each model (`aka.ms/try-phi3.5mini`, `try-phi3.5moe`, `try-phi3.5vision`) from the Hugging Face model cards released this month.**

---

## Closing {#closing}

**Phi-3.5 is the clearest proof yet that MIT-licensed SLMs can publish benchmark tables in the same row as Llama-3.1-8B — and win some of the cells outright — without waiting for a frontier-scale parameter count.** If you ship agents, automations, or on-device copilots, spend time this week reproducing *your* evals on multilingual prompts, long documents, and vision-conditioned tasks; the vendor tables are a map, not the territory.

If you want help wiring SLMs into production workflows (RAG, tool use, MCP, governance) or you need a flagship web experience built around the product story, that is what I build — AI Automation + Growth alongside custom immersive web work.

**Next reads:**

- [Llama 3.1 405B: The Day GPT-4-Class Became Free for Builders](/blog/llama-3-1-405b-frontier-open-weights)
- [Meta Llama 3 8B + 70B: The First Frontier-Grade Open Weights From a US Lab](/blog/meta-llama-3-open-weights-frontier)
- [Google Gemma 2 9B + 27B: The Best Open Model Under 30B at Launch](/blog/google-gemma-2-9b-27b-open-model-launch)

---
