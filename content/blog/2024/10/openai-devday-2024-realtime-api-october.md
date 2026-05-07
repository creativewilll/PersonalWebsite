---
title: "OpenAI DevDay 2024: Realtime API, Prompt Caching, and Model Distillation Explained"
slug: "openai-devday-2024-realtime-api-october"
date: "2024-10-11"
lastModified: "2024-10-11"
author: "William Spurlock"
readingTime: 8
categories:
  - "AI Models and News"
tags:
  - "openai"
  - "realtime-api"
  - "prompt-caching"
  - "model-distillation"
  - "devday-2024"
  - "gpt-4o"
  - "fine-tuning"
featured: false
draft: false
excerpt: "OpenAI DevDay 2024 introduces the Realtime API for voice apps, automatic Prompt Caching with 50% discounts, and Model Distillation for creating efficient small models from frontier outputs."
coverImage: "/images/blog/openai-devday-2024-oct.png"
seoTitle: "OpenAI DevDay 2024: Realtime API & Model Distillation | William Spurlock"
seoDescription: "Complete breakdown of OpenAI DevDay 2024 announcements: Realtime API for voice apps, automatic Prompt Caching, Model Distillation tools, and Vision Fine-Tuning."
seoKeywords:
  - "openai devday 2024"
  - "realtime api"
  - "prompt caching"
  - "model distillation"
  - "gpt-4o fine-tuning"
  - "openai voice api"
  - "ai developer tools"

# AIO/AEO Fields
aioTargetQueries:
  - "what is openai realtime api"
  - "how does prompt caching work"
  - "openai model distillation explained"
  - "openai devday 2024 announcements"
contentCluster: "foundation-models"
pillarPost: false
parentPillar: "choosing-the-right-llm-2024"
entityMentions:
  - "William Spurlock"
  - "OpenAI"
  - "GPT-4o"
  - "GPT-4o mini"
  - "o1-preview"
  - "Sam Altman"
  - "Kevin Weil"

# Service Track Routing
serviceTrack: "ai-automation"
---

# OpenAI DevDay 2024: Realtime API, Prompt Caching, and Model Distillation Explained

OpenAI DevDay 2024 kicks off today in Singapore, San Francisco, and London with a wave of developer-focused announcements that fundamentally change how we build voice applications, optimize API costs, and create efficient AI models. The Realtime API delivers the first true speech-to-speech pipeline, Prompt Caching automatically cuts costs by 50% on repeated context, and Model Distillation lets you compress frontier model intelligence into smaller, cheaper deployments.

## Table of Contents

1. [What Is OpenAI DevDay 2024?](#what-is-openai-devday-2024)
2. [The Realtime API: Speech-to-Speech Without the Pipeline](#the-realtime-api-speech-to-speech-without-the-pipeline)
3. [Prompt Caching: Automatic 50% Discounts on Repeated Context](#prompt-caching-automatic-50-discounts-on-repeated-context)
4. [Model Distillation: Teaching Small Models from Frontier Outputs](#model-distillation-teaching-small-models-from-frontier-outputs)
5. [Vision Fine-Tuning: Custom Image Understanding for GPT-4o](#vision-fine-tuning-custom-image-understanding-for-gpt-4o)
6. [Stored Completions and Evals Platform](#stored-completions-and-evals-platform)
7. [o1 Rate Limit Doubling and Developer Access](#o1-rate-limit-doubling-and-developer-access)
8. [Pricing Breakdown: What These Features Cost](#pricing-breakdown-what-these-features-cost)
9. [What Developers Can Build Today](#what-developers-can-build-today)
10. [FAQ: OpenAI DevDay 2024](#faq-openai-devday-2024)
11. [Building the Next Generation of AI Applications](#building-the-next-generation-of-ai-applications)

## What Is OpenAI DevDay 2024?

**OpenAI DevDay 2024 is a multi-city developer conference running October 1–2 in San Francisco, Singapore, and London**, delivering exactly what the AI engineering community needs: practical tools for shipping production applications, not vaporware promises about artificial general intelligence. This year's announcements focus on four core capabilities that solve real problems developers face daily — voice interface latency, API cost optimization, model efficiency, and evaluation infrastructure.

The 2024 event marks a strategic shift from OpenAI's previous developer conferences. Where last year's DevDay centered on consumer ChatGPT features and the GPT Store, this year Sam Altman and the product team led with infrastructure announcements targeting builders who need to deploy AI at scale. The message is clear: OpenAI wants to own the full developer stack from prototype to production.

**Key announcements at DevDay 2024 include:**

| Feature | Status | Core Value |
|---------|--------|------------|
| **Realtime API** | Public beta | Speech-to-speech voice apps without pipeline complexity |
| **Prompt Caching** | Automatic on all supported models | 50% cost reduction on repeated context |
| **Model Distillation** | Available with free training tokens | Compress frontier model intelligence into smaller deployments |
| **Vision Fine-Tuning** | Available for GPT-4o | Custom image understanding for domain-specific applications |
| **Stored Completions** | Available today | Free dataset creation for fine-tuning workflows |
| **Evals Platform** | Beta | Built-in model evaluation without external tools |

The event also featured a fireside chat with Sam Altman and new Chief Product Officer Kevin Weil (former Twitter and Instagram product lead), who confirmed that **o1 will receive function calling and structured outputs support before the end of 2024** — addressing the biggest gap in the reasoning model's current capabilities.

## The Realtime API: Speech-to-Speech Without the Pipeline

**The Realtime API eliminates the multi-step pipeline that has historically made voice AI applications slow and brittle.** Instead of chaining Whisper for transcription, GPT-4 for processing, and a separate TTS model for output, developers can now stream audio directly to GPT-4o through a persistent WebSocket connection and receive audio responses in real time.

This architectural simplification cuts latency dramatically. In demonstrations at DevDay, the Realtime API delivered conversational responses with the same fluidity as ChatGPT's Advanced Voice Mode — because it's powered by the same underlying system. The API handles audio input, processing, and audio output as a single integrated component rather than three separate API calls.

**How the Realtime API works:**

1. **WebSocket connection** — Open a persistent connection to `wss://api.openai.com/v1/realtime`
2. **Audio streaming** — Send base64-encoded audio chunks multiple times per second
3. **Native interruption handling** — The API detects when the user starts speaking and cancels ongoing responses
4. **Function calling** — Execute external tools mid-conversation with voice confirmation
5. **Audio output** — Receive base64-encoded audio responses that play in real time

The API launches with support for **six preset voices** (alloy, echo, fable, onyx, nova, and shimmer) — the same voices available in ChatGPT's Advanced Voice Mode. Function calling is fully supported, enabling voice-controlled applications that can check calendars, place orders, or trigger external workflows while maintaining conversational flow.

**Pricing for the Realtime API** runs approximately **6¢ per minute for audio input** and **24¢ per minute for audio output**. Text input and output through the same WebSocket costs $5 per million tokens (input) and $20 per million tokens (output). The audio rates translate to roughly $100 per million audio tokens input and $200 per million audio tokens output.

OpenAI has published two reference implementations for developers: [`openai-realtime-api-beta`](https://github.com/openai/openai-realtime-api-beta) for JavaScript integration and [`openai-realtime-console`](https://github.com/openai/openai-realtime-console) for a complete React-based demo application. The Speak language learning app demonstrated at DevDay shows how production applications can integrate human handoff — using the Realtime API for AI-powered conversation practice while seamlessly escalating to human tutors when needed.

## Prompt Caching: Automatic 50% Discounts on Repeated Context

**Prompt Caching automatically reduces API costs by 50% when you reuse context the model has recently processed.** Unlike Anthropic's Claude implementation, which requires developers to manually specify caching breakpoints, OpenAI's version applies automatically to any prompt sharing a common prefix with a recent request.

The caching mechanism works on prompts longer than **1,024 tokens**, caching the longest matching prefix in **128-token increments**. If your application sends repeated requests with similar system prompts, conversation history, or document context, the API recognizes the overlap and applies the discount without any code changes.

**Supported models for Prompt Caching:**

- GPT-4o (all versions)
- GPT-4o mini
- o1-preview
- o1-mini
- Fine-tuned variants of the above

**How OpenAI Prompt Caching compares to Claude's approach:**

| Feature | OpenAI Prompt Caching | Claude Prompt Caching |
|---------|----------------------|----------------------|
| **Discount** | 50% off cached tokens | 90% off cached tokens |
| **Setup** | Automatic — no code changes | Manual — specify `cache_control` breakpoints |
| **Minimum tokens** | 1,024 tokens | 1,024 tokens (4,096 for 90% discount) |
| **Increment size** | 128 tokens | 256 tokens |
| **Cache duration** | 5–10 minutes of inactivity (max 1 hour) | 5 minutes TTL |

The trade-off is clear: OpenAI sacrifices some potential savings for zero-friction adoption. You don't need to restructure prompts or add metadata — existing applications automatically benefit. For applications with highly repetitive long-context patterns (customer service bots with extensive knowledge bases, code review tools with large file trees, analysis pipelines with consistent document sets), this delivers immediate cost reductions without engineering work.

**Cache behavior details from OpenAI's documentation:**

- Caches clear after **5–10 minutes of inactivity** and are always removed within **one hour** of last use
- The API caches the longest prefix of a prompt that matches a recently computed prompt
- Only input tokens receive the discount — output tokens remain at standard rates
- No API changes required — the discount applies automatically to eligible requests

## Model Distillation: Teaching Small Models from Frontier Outputs

**Model Distillation lets you train smaller, cost-efficient models by teaching them to replicate the outputs of larger frontier models.** GPT-4o mini costs 15× less than GPT-4o, but lacks the broad knowledge and reasoning capabilities of its larger sibling. Distillation compresses some of that frontier intelligence into the smaller model for your specific use case — delivering near-frontier performance at mini-tier pricing.

The process follows three steps that OpenAI has now made significantly easier through new platform tools:

**Step 1: Build task-specific evals**

You cannot improve what you cannot measure. Before any distillation work, define clear evaluation criteria for your use case. The new **Evals platform** (in beta) lets you create test suites directly in the OpenAI dashboard without external tools.

**Step 2: Capture high-quality examples**

Use frontier models (GPT-4o or o1-preview) to generate responses to your target tasks. The new **Stored Completions** feature — enabled by adding `store: true` to any chat completion request — permanently saves these input-output pairs with optional metadata tags for organization.

**Step 3: Fine-tune the small model**

Feed the captured examples into GPT-4o mini through the standard fine-tuning API. The smaller model learns to replicate the frontier model's response patterns for your specific domain.

**OpenAI's promotional offer for October 2024** makes experimentation nearly free:

- **2 million free training tokens daily** for GPT-4o mini distillation
- **1 million free training tokens daily** for GPT-4o distillation

This offer runs through the end of October, giving developers a full month to iterate on distilled models without training costs.

**Distillation works best for specific task types:**

| Task Characteristics | Distillation Fit | Example Use Cases |
|---------------------|------------------|-------------------|
| **Narrow domain + Low precision needs** | Excellent | Product categorization, sentiment analysis, simple extraction |
| **Narrow domain + High precision needs** | Good with more data | Medical coding, legal classification, fraud detection |
| **Broad domain + Low precision needs** | Possible but expensive | General chat, open-ended generation |
| **Broad domain + High precision needs** | Poor fit — use frontier models | Complex reasoning, multi-step analysis, creative writing |

**Critical limitations to understand:**

- **Distillation requires curated datasets** — thousands of examples, not millions, but they must represent your actual production distribution
- **Sparse or biased data creates blind spots** — rare events like fraud may be missing from small datasets
- **Iterative approach required** — start with a few hundred examples, validate with evals, then scale
- **Platform lock-in increases** — fine-tuned models are harder to migrate between providers than prompt-engineered applications

OpenAI expects applications to increasingly use **collections of distilled small models** for specific tasks, with frontier models reserved for complex reasoning that doesn't fit the narrow-domain pattern.

## Vision Fine-Tuning: Custom Image Understanding for GPT-4o

**Vision Fine-Tuning extends GPT-4o's image capabilities to domain-specific visual tasks** by allowing developers to train the model on custom image-text pairs. This unlocks production use cases that require precise visual recognition beyond what the base model provides — medical imaging analysis, autonomous vehicle perception, product recommendation systems, and industrial quality control.

The fine-tuning process accepts datasets containing images alongside text prompts and expected responses. For example, a traffic safety application might include images of road scenes paired with questions like "What traffic signs are visible?" and structured answers identifying sign types and locations.

**Demonstrated use cases at DevDay 2024:**

- **Medical imaging** — Fine-tune for radiology report generation, dermatology screening, or pathology analysis with domain-specific visual patterns
- **Autonomous vehicle perception** — Grab (Southeast Asia's ride-hailing giant) showcased traffic sign detection and lane recognition fine-tuned for local road conditions
- **Product recommendations** — Visual similarity matching for e-commerce based on custom catalog images
- **Industrial inspection** — Quality control systems that detect defects specific to manufacturing processes

Vision Fine-Tuning is available for GPT-4o and GPT-4o mini through the standard fine-tuning API. The pricing follows existing fine-tuning rates, with training costs separate from inference costs for the resulting custom model.

**Technical requirements for vision fine-tuning datasets:**

- Images must be in PNG, JPEG, or WEBP format
- Base64-encoded images embedded in JSONL training files, or image URLs
- Recommended minimum: 100–500 image-examples for specialized tasks
- Prompts should be specific to the visual extraction goal
- Evaluation must include held-out test images representing real-world variation

## Stored Completions and Evals Platform

**Stored Completions and the Evals Platform form the data infrastructure layer that makes Model Distillation practical at production scale.** These two features solve the biggest friction points in custom model development: capturing high-quality training data and measuring whether your fine-tuned model actually performs better.

**Stored Completions** enables persistent logging of API interactions without external infrastructure. Adding `store: true` to any chat completion request saves the full input-output pair to your OpenAI account with optional metadata tags for filtering:

```python
# Python example with stored completions
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a customer service classifier."},
        {"role": "user", "content": customer_inquiry}
    ],
    store=True,
    metadata={
        "tag": "customer-service-training",
        "source": "production-web",
        "confidence": "high"
    }
)
```

The platform.openai.com dashboard now includes a **Chat Completions** interface where you can browse, filter by tags, and export stored interactions. This replaces the previous workflow of manually logging completions to external databases or files.

**The Evals Platform** provides built-in model evaluation without requiring external frameworks like EleutherAI's lm-evaluation-harness or custom evaluation scripts. Through the platform interface, you can:

1. **Create evaluation criteria** — Define what "correct" means for your use case (exact match, semantic similarity, JSON schema validation)
2. **Upload test datasets** — CSV or JSONL files containing inputs and expected outputs
3. **Run evaluations against multiple models** — Compare base GPT-4o mini against your distilled variant, or against GPT-4o for baseline
4. **Track metrics over time** — Monitor performance as you iterate on training data

Together, these tools create a closed loop for model improvement: capture production examples with Stored Completions, curate them into training datasets, fine-tune a smaller model, evaluate with the Evals Platform, and deploy when metrics meet your threshold. This entire workflow now runs inside OpenAI's platform rather than requiring external MLOps infrastructure.

**Key limitations to note:**

- Stored Completions persists data within OpenAI's systems — factor this into your data residency and compliance planning
- The Evals Platform is in beta with limited availability as of launch
- Evaluation criteria must be programmatically verifiable — human preference judgments still require external tooling

## o1 Rate Limit Doubling and Developer Access

**OpenAI has doubled o1 rate limits from 5,000 RPM to 10,000 RPM**, matching GPT-4's current capacity and signaling that the reasoning model is ready for production workloads. The increase took effect immediately during DevDay announcements, with no tier upgrade required for existing API users.

More significantly, Sam Altman and Kevin Weil confirmed that **o1 will receive function calling, system prompts, and structured outputs before the end of 2024**. These three capabilities address the biggest gaps preventing o1 from replacing GPT-4o in agent workflows:

| Missing Capability | Current Workaround | Native Support Timeline |
|-------------------|-------------------|------------------------|
| **Function calling** | Manual JSON extraction from text responses | Before end of 2024 |
| **System prompts** | Embedding instructions in user messages | Before end of 2024 |
| **Structured outputs** | Parsing and validating text responses | Before end of 2024 |
| **JSON mode** | Manual prompting for JSON format | Before end of 2024 |

During the fireside chat, Altman characterized o1 as potentially **"the GPT-2 moment"** for reasoning models — meaning we should expect rapid capability improvements similar to the jump from GPT-2 to GPT-4. "We know how to get it to GPT-4," Altman noted, suggesting the research path for scaling reasoning is now established.

**When to use o1 versus GPT-4o in October 2024:**

- **Choose o1** for math-heavy problems, complex debugging, multi-step planning, and any task where additional thinking time improves results
- **Choose GPT-4o** for latency-sensitive applications, multimodal needs (vision), function calling requirements, or when cost matters more than reasoning depth

The improved rate limits make A/B testing between models practical for production systems. You can route simple queries to GPT-4o and escalate complex requests to o1 without hitting throughput constraints — a pattern that will become more powerful as o1 gains function calling and can participate in agent workflows.

## Pricing Breakdown: What These Features Cost

**Understanding the cost structure for DevDay 2024 features lets you model ROI for voice applications, high-volume automation, and distilled model deployments.** Here's the complete pricing breakdown as of October 2024:

### Realtime API Pricing

| Component | Price | Approximate Per-Minute Cost |
|-----------|-------|----------------------------|
| **Audio input** | $100 / 1M tokens | ~$0.06 / minute |
| **Audio output** | $200 / 1M tokens | ~$0.24 / minute |
| **Text input** | $5 / 1M tokens | — |
| **Text output** | $20 / 1M tokens | — |

A typical voice conversation with the Realtime API costs approximately **30¢ per minute** combined input and output. For comparison, chaining Whisper ($0.006/min), GPT-4o ($0.005–$0.015/min for typical prompts), and TTS ($0.015–$0.03/min) separately runs roughly **2–4× more expensive** with higher latency.

### Prompt Caching Discounts

| Model | Standard Input | Cached Input (50% off) |
|-------|---------------|----------------------|
| **GPT-4o** | $2.50 / 1M tokens | $1.25 / 1M tokens |
| **GPT-4o mini** | $0.15 / 1M tokens | $0.075 / 1M tokens |
| **o1-preview** | $15.00 / 1M tokens | $7.50 / 1M tokens |
| **o1-mini** | $3.00 / 1M tokens | $1.50 / 1M tokens |

**Automatic application conditions:**

- Minimum 1,024 tokens in prompt prefix
- 128-token increment matching
- Shared prefix used within 5–10 minutes of last cache
- Applies only to input tokens — output tokens billed at standard rates

### Model Distillation and Fine-Tuning

| Activity | Cost | October 2024 Promotion |
|----------|------|-------------------------|
| **GPT-4o mini training** | Standard fine-tuning rates | 2M free tokens daily |
| **GPT-4o training** | Standard fine-tuning rates | 1M free tokens daily |
| **Inference (distilled model)** | Same as base fine-tuned model | No additional cost |
| **Stored Completions** | Free | Unlimited storage |
| **Evals Platform** | Free during beta | Included |

Standard fine-tuning rates vary by base model. Fine-tuned GPT-4o mini inference costs approximately $0.60 / 1M tokens input and $2.40 / 1M tokens output — roughly 15× cheaper than GPT-4o at standard rates.

### Vision Fine-Tuning

Vision Fine-Tuning follows standard fine-tuning training rates for GPT-4o or GPT-4o mini. Inference costs match the standard fine-tuned model rates — there is no vision-specific premium beyond the base model costs.

### Cost Optimization Scenarios

**Scenario 1: Customer service bot with 1,000 conversations/day**

- Without caching: ~$50/day in context tokens
- With Prompt Caching: ~$25/day (50% savings on repeated system prompts and knowledge base context)

**Scenario 2: Voice AI assistant handling 10 hours of conversation daily**

- Legacy pipeline (Whisper + GPT-4o + TTS): ~$25–$40/day
- Realtime API: ~$18/day with lower latency

**Scenario 3: Classification task requiring 1M inference calls monthly**

- GPT-4o standard: ~$2,500
- Distilled GPT-4o mini: ~$150 (94% savings after amortizing training costs)

## What Developers Can Build Today

**The DevDay 2024 features combine into entirely new application categories** that were previously impractical due to latency, cost, or complexity constraints. Here are production-ready implementations you can ship immediately:

### Voice-Native Applications with the Realtime API

**AI Phone Agents:** Build conversational IVR systems that handle customer service calls end-to-end. The Realtime API's interruption detection and function calling enable natural conversations where users can ask questions, request transfers, or trigger backend actions without touch-tone menus.

**Live Translation Apps:** Kevin Weil demonstrated this at DevDay — real-time voice translation enabling natural business conversations across language barriers. The low latency makes turn-based translation feel conversational rather than mechanical.

**Voice-Controlled Development Environments:** Pair the Realtime API with IDE extensions for hands-free coding assistance. Voice queries about code, natural language refactor requests, and spoken explanations of complex functions.

### Cost-Optimized Automation with Prompt Caching

**Document Analysis Pipelines:** Process large document sets where each analysis shares a common knowledge base. Cache the document context once, then run multiple queries against it at 50% discount — ideal for legal discovery, medical record review, or compliance auditing.

**Multi-Turn Agent Workflows:** Build agents with extensive system prompts and tool definitions that maintain long conversations. Prompt Caching automatically optimizes costs as the conversation grows, making extended agent sessions economically viable.

### Specialized Models via Distillation

**Classification at Scale:** Distill GPT-4o into GPT-4o mini for high-volume classification tasks — sentiment analysis, spam detection, ticket routing, content moderation. The 94% cost reduction makes real-time classification of millions of items affordable.

**Domain-Specific Assistants:** Train distilled models on specialized corpora — medical terminology, legal procedures, technical documentation — creating assistants that understand domain language without paying frontier model rates for every interaction.

**Multi-Model Architectures:** Deploy collections of distilled specialists — one for classification, one for summarization, one for extraction — each optimized for its specific task, orchestrated by a lightweight routing layer.

### Vision-Enabled Applications

**Quality Control Systems:** Fine-tune GPT-4o for visual defect detection in manufacturing, matching domain-specific quality standards with explainable reasoning about why a part passes or fails.

**Medical Imaging Assistants:** Build triage and preliminary analysis tools for radiology, dermatology, or pathology that understand the visual patterns specific to your institution's equipment and patient population.

**Autonomous Vehicle Perception:** Follow Grab's example — fine-tune for local traffic sign recognition, lane detection, and hazard identification adapted to regional road conditions and signage conventions.

### Production Architecture Recommendations

**For latency-critical voice apps:** Use the Realtime API directly with a WebSocket proxy (required to protect API keys). Implement interruption handling and function calling for natural conversational flow.

**For cost-sensitive automation:** Combine Prompt Caching with distilled models. Cache the system context, route simple requests to distilled GPT-4o mini, escalate complex edge cases to GPT-4o or o1.

**For vision applications:** Start with 100–500 labeled examples, use Stored Completions to capture production edge cases, and iterate on fine-tuning datasets based on Evals Platform results.

**For multi-model systems:** Standardize on OpenAI's structured outputs for inter-model communication, ensuring type-safe handoffs between your distilled specialists and frontier models.

## FAQ: OpenAI DevDay 2024

### Q: What is the OpenAI Realtime API and how does it work?

**A:** The Realtime API is a WebSocket-based interface that enables direct speech-to-speech communication with GPT-4o without separate transcription and text-to-speech steps. **Audio streams directly to the model and audio responses stream back in real time**, cutting latency to conversational levels. It supports six preset voices, interruption detection, and function calling for tool use mid-conversation.

### Q: How much does the Realtime API cost per minute?

**A:** The Realtime API costs approximately **6¢ per minute for audio input** and **24¢ per minute for audio output** — roughly 30¢ per minute combined for a typical conversation. This compares favorably to the 50¢–$1 per minute cost of chaining Whisper + GPT-4o + TTS separately, with significantly lower latency.

### Q: What is Prompt Caching and which models support it?

**A:** Prompt Caching automatically reduces input token costs by **50% when you reuse context** the model has recently processed. It applies to prompts longer than 1,024 tokens on **GPT-4o, GPT-4o mini, o1-preview, and o1-mini** (including fine-tuned variants). The discount applies automatically with no code changes required.

### Q: How does OpenAI's automatic caching compare to Claude's manual caching?

**A:** OpenAI Prompt Caching offers a **50% discount automatically** with zero setup, while Claude provides a **90% discount but requires manual configuration** of cache breakpoints using `cache_control` headers. Claude's approach yields higher savings for optimized applications; OpenAI's approach delivers immediate benefits to existing codebases without engineering work.

### Q: What is Model Distillation and when should I use it?

**A:** Model Distillation lets you **train smaller, cheaper models to replicate frontier model outputs** for specific tasks. Use it when you have narrow-domain, high-volume tasks (classification, extraction, simple responses) where GPT-4o mini's base capabilities are insufficient but full GPT-4o costs are prohibitive. Avoid it for broad, open-ended tasks requiring general reasoning.

### Q: How many free training tokens does OpenAI offer for distillation?

**A:** Through October 31, 2024, OpenAI provides **2 million free training tokens daily for GPT-4o mini** and **1 million free tokens daily for GPT-4o** distillation. This covers most experimentation and small-to-medium production training runs without cost.

### Q: What is Vision Fine-Tuning and what are its use cases?

**A:** Vision Fine-Tuning lets you **customize GPT-4o's image understanding** with your own labeled image datasets. Primary use cases include medical imaging analysis, autonomous vehicle perception (like Grab's traffic sign detection), product recommendation systems, and industrial quality control that requires recognizing domain-specific visual patterns.

### Q: What are Stored Completions and how do they help with fine-tuning?

**A:** Stored Completions is a free feature that **persists API input-output pairs** when you add `store: true` to requests. This creates training datasets for fine-tuning without external logging infrastructure. Browse, filter by tags, and export completions through the OpenAI dashboard — streamlining the data collection step in distillation workflows.

### Q: What new evaluation tools did OpenAI announce?

**A:** The **Evals Platform** (in beta) provides built-in model evaluation without external tools. Define test criteria, upload datasets, compare model performance (base vs. fine-tuned vs. frontier), and track metrics over time — all within the OpenAI platform. This closes the loop between training data collection and model validation.

### Q: Has o1 rate limits increased and what features are coming?

**A:** **o1 rate limits doubled from 5,000 RPM to 10,000 RPM** on October 1, 2024. Sam Altman and Kevin Weil confirmed that **function calling, system prompts, and structured outputs** will arrive before the end of 2024 — enabling o1 to participate in agent workflows and return typed data for production integration.

### Q: Can the Realtime API handle interruptions and function calling?

**A:** **Yes to both.** The Realtime API includes native interruption detection that cancels ongoing responses when the user starts speaking. **Function calling is fully supported** — your voice agent can trigger external tools, check APIs, or execute workflows mid-conversation while maintaining natural dialogue flow.

### Q: What voices are available in the Realtime API?

**A:** The Realtime API supports **six preset voices**: alloy, echo, fable, onyx, nova, and shimmer. These are the same voices available in ChatGPT's Advanced Voice Mode, ensuring consistency between consumer and developer applications built on OpenAI's speech stack.

## Building the Next Generation of AI Applications

**OpenAI DevDay 2024 delivers the infrastructure layer that makes AI applications production-viable at scale.** The Realtime API removes latency barriers for voice interfaces. Prompt Caching cuts costs on the long-context applications that deliver real value. Model Distillation brings frontier performance within reach of high-volume deployment budgets. Vision Fine-Tuning extends these capabilities to the visual domain.

For builders, this means the gap between prototype and production just narrowed dramatically. You can now ship voice agents that feel natural, automation pipelines that handle millions of requests economically, and specialized models that understand your domain without maintaining custom ML infrastructure.

The tooling integration matters as much as the individual features. Stored Completions → Fine-Tuning → Evals Platform creates a complete model customization workflow without leaving OpenAI's ecosystem. The Realtime API's WebSocket architecture slots directly into existing streaming infrastructure. Prompt Caching applies automatically to code you've already written.

**What I'm building with these tools:** Voice-controlled agent interfaces for automation workflows, distilled classification models for high-volume content processing, and multimodal pipelines combining vision fine-tuning with structured output extraction. The combination of low-latency voice, cost-optimized context handling, and efficient small models opens application categories that were economically impossible six months ago.

If you're architecting AI systems for production — voice interfaces, automated workflows, or custom model deployments — these tools change the calculus on what's feasible. The question is no longer whether AI can handle your use case, but whether your implementation strategy takes full advantage of the latency, cost, and capability improvements now available.

---

**Ready to implement voice AI or production automation in your business?** [Book an AI automation strategy call](/contact) to discuss how the Realtime API, Prompt Caching, and Model Distillation can reduce your AI infrastructure costs and latency while expanding capability.

**Related reading:**
- [Anthropic Computer Use Beta: Automated GUI Control](/blog/2024/10/anthropic-computer-use-beta-october-2024) — Anthropic's competing agentic AI release from the same month
- [Claude 3.5 Sonnet for Production AI Agents](/blog/2024/06/n8n-claude-3-5-sonnet-production-agent-tutorial) — Building automation pipelines with Claude
- [Fine-tuning OpenAI models for specialized tasks](https://platform.openai.com/docs/guides/fine-tuning) — Official OpenAI documentation

---

*William Spurlock is an AI automation engineer and custom web designer building production AI workflows and premium digital experiences. He ships AI-powered automation systems using n8n, Claude, and OpenAI APIs for founders and growth teams.*
