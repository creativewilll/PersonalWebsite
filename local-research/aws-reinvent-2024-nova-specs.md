Querying perplexity using sonar-pro for: AWS re:Invent 2024 Amazon Nova family models specs pricing benchmarks comparison with Claude GPT with maxTokens: 8000
# Amazon Nova Family of Models: Specs, Pricing, Benchmarks, and Comparisons

Amazon announced the **Amazon Nova family of foundation models** at **AWS re:Invent 2024** (December 2024). These are state-of-the-art (SOTA) models available **exclusively on Amazon Bedrock**, emphasizing frontier intelligence, multimodal capabilities (text, images, video), high speed, and industry-leading price-performance (claimed **at least 75% lower costs** than comparable Bedrock models like Claude or GPT equivalents).

The family includes **understanding models** (text/image/video input → text output) and **creative models** (text/image input → image/video output). Micro, Lite, and Pro launched generally available in Dec 2024; **Premier** (higher intelligence) arrived Q1 2025.

## Model Lineup and Key Specs
| Model          | Modality                  | Context Length          | Key Strengths                          | Speed (Output Tokens/sec) | Availability |
|----------------|---------------------------|-------------------------|----------------------------------------|---------------------------|--------------|
| **Nova Micro** | Text-only                | 128K input tokens      | Summarization, translation, classification, chat, math/coding. Fine-tuning/distillation supported. | 210 t/s                  | GA (Dec 2024) |
| **Nova Lite**  | Multimodal (text/img/video) | 300K tokens or 30 min video | Real-time interactions, doc analysis, VQA. Processes multiple images/30 min video. Fine-tuning supported. | Lightning fast (tier-leading) | GA (Dec 2024) |
| **Nova Pro**   | Multimodal (text/img/video) | 300K tokens            | Agentic workflows, API/tool calling, financial docs, codebases (15K+ lines). SOTA on TextVQA/VATEX. | Tier-leading latency     | GA (Dec 2024) |
| **Nova Premier**| Multimodal (upcoming details sparse) | >2M tokens planned (early 2025) | Highest intelligence tier             | Fast                     | Q1 2025     |
| **Nova Canvas**| Text/image → Image gen   | N/A                    | Image generation at scale              | N/A                      | Announced   |
| **Nova Reel**  | Text/image → Video gen   | N/A                    | Video generation                       | N/A                      | Announced   |

- **Languages**: 200+ supported.
- **Customization**: Fine-tuning, distillation (e.g., Pro as teacher for Micro/Lite), RAG integration with Bedrock Knowledge Bases.
- **Future**: 2M+ token context by early 2025; latency-optimized inference SKUs.

## Pricing
Exact per-token pricing isn't detailed in public sources (varies by region/usage; check Bedrock console for latest). Key claims:
- **75%+ lower cost** than comparable Bedrock models (e.g., vs. Claude 3.5 Sonnet, GPT-4o).
- Nova Micro: Lowest cost/latency in family.
- Nova Lite: "Very low-cost" for multimodal.
- Optimized for enterprise scale; use Bedrock's model evaluation tools to compare.

## Benchmarks and Comparisons
Nova models were benchmarked against public leaders (Claude, GPT/Gemini, Llama). They claim **competitive or superior** performance, especially in multimodal (e.g., #1-2 on ChartQA, VATEX), math/reasoning, and agentic tasks. Results from Amazon's technical report (arXiv) and re:Invent.

### Core Capabilities (Text/Reasoning/Math)
| Benchmark          | Nova Micro | Nova Lite | Nova Pro | GPT-4o mini | Gemini 1.5 Flash-8B | Llama 3.1 8B | Claude (e.g., 3.5 Sonnet) |
|--------------------|------------|-----------|----------|-------------|---------------------|--------------|---------------------------|
| **MMLU** (Knowledge) | =/> Llama/Gemini | Competitive | Strong  | -           | -                   | =/>         | Competitive              |
| **GPQA** (Reasoning) | Strong    | -         | Strong  | -           | -                   | -           | -                        |
| **MATH**           | Strong    | Strong    | -       | -           | -                   | -           | -                        |
| Overall (select)   | =/> on all applicable | =/> 17/19 vs GPT-4o mini; 17/21 vs Gemini Flash | =/> GPT-4o (17/20); Gemini 1.5 Pro (16/21) | -         | -                   | =/> Micro  | Competitive (Nova claims edge in price/perf) |

### Multimodal (Image/Video/Docs)
| Benchmark    | Nova Lite | Nova Pro | GPT-4o | Gemini 1.5 Pro | Notes |
|--------------|-----------|----------|--------|----------------|-------|
| **TextVQA** (Visual QA) | High     | SOTA    | -      | -              | Pro excels |
| **VATEX** (Video) | High     | SOTA    | -      | -              | #1-2 |
| **ChartQA**  | High     | High    | -      | -              | #1-2 |
| **DocVQA**   | Strong   | Strong  | Competitive | Competitive   | Nova edges in docs/charts |

- **Agentic**: Pro/Lite/Micro excel in multi-step tasks, tool-calling, RAG.
- **Speed**: Fastest in tiers (e.g., Micro at 210 t/s; low latency on optimized SKUs).
- Sources: Amazon technical report (arXiv 2506.12103), Bedrock benchmarks (updated Apr 2025). Nova often matches/surpasses on 16-21/20-21 benchmarks vs. GPT-4o/Gemini Pro, with better cost/speed.

## Key Differentiators vs. Competitors
- **vs. Claude (Anthropic)**: Nova Pro matches 3.5 Sonnet/Gemini Pro on intelligence but **75% cheaper/faster** on Bedrock. Stronger multimodal agents.
- **vs. GPT-4o (OpenAI)**: Pro =/> on 17/20 benchmarks; Lite > GPT-4o mini (17/19). Lower cost, longer video context (30 min).
- **vs. Gemini (Google)**: Edges in video/charts; Pro > 1.5 Pro (16/21); Micro > Flash-8B.
- **Enterprise Focus**: Bedrock-exclusive, easy fine-tuning, massive context, optimized for AWS workflows (e.g., SageMaker HyperPod training).

For latest pricing/benchmarks, query Bedrock console or AWS docs—models evolve (e.g., Premier post-Q1 2025). Sources: AWS blogs, arXiv report, re:Invent keynotes (Dec 2024).