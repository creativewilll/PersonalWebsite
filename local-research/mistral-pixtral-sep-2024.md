Querying perplexity using sonar-pro for: Mistral Pixtral vision model launch September 2024 specifications benchmarks capabilities open weights multimodal with maxTokens: 8000
### Mistral Pixtral 12B: Overview and Launch

**Launch Date**: Pixtral 12B was released by Mistral AI on September 10-17, 2024 (sources vary slightly on exact day, but confirmed as September 2024). It was Mistral's first multimodal vision-language model (VLM), initially distributed via torrent with open weights. A larger variant, Pixtral Large (124B parameters), followed on November 1, 2024.

### Key Specifications
Pixtral 12B is a 12-billion-parameter model optimized for efficiency:
- **Architecture**:
  - 400M-parameter vision encoder (trained from scratch) for tokenizing images at native resolution and arbitrary aspect ratios/sizes.
  - 12B-parameter multimodal transformer decoder (based on Mistral Nemo) for next-token prediction on interleaved text and images.
- **Context Window**: 128K tokens, supporting multiple images (e.g., dozens of high-res images) without fixed resolution limits.
- **Input/Output**: Text + images → text. Handles natural images, documents, charts, figures.
- **License**: Apache 2.0 (fully open-weights, permissive for commercial use).
- **Availability**: 
  - Downloadable weights (e.g., via Hugging Face or torrent).
  - Hosted on platforms like Amazon Bedrock Marketplace, Vercel AI Gateway, Mistral's API (e.g., $0.10-$0.20 per 1M tokens input/output as of 2026 assessments).
- **Training**: Natively trained on interleaved image-text data for multimodal reasoning.

**Pixtral Large (124B, Nov 2024)**: Built on Mistral Large 2 + 1B vision encoder. Similar specs but scales up performance; open-weights for academic/non-commercial use (business licensing available).

### Capabilities
- **Multimodal Strengths**:
  - Document QA, chart/figure interpretation, multimodal reasoning, instruction following.
  - Processes variable image resolutions, multiple images per prompt, long-context interleaved content.
  - Excels in vision tasks like OCR, visual math (e.g., MathVista), without compromising text performance.
- **Text-Only**: Maintains SOTA on benchmarks (e.g., rivals Mistral Nemo).
- **Languages**: Dozens supported (text generation multilingual).
- **Use Cases**: Image analysis, visual instruction-following, academic/research, cost-effective deployment (lightweight for edge/consumer hardware).
- **Limitations** (from 2026 reviews): No published speed benchmarks; intelligence scores ~26/100 in some evals; suited for lighter tasks where cost matters over peak performance.

### Benchmarks (Mistral-Reported, as of Launch)
Pixtral 12B outperforms open models of similar size (e.g., Phi-3 Vision, LLaVA-OV 7B, Qwen2-VL 7B, Llama-3.2 11B) and rivals/beats closed models like Claude 3 Haiku or GPT-4o in some areas. Key results:

| Benchmark | Pixtral 12B Score | Top Competitors |
|-----------|-------------------|-----------------|
| **MMMU** (multimodal reasoning) | 52.5% | > Llama-3.2 11B, Qwen2-VL 7B; rivals larger models |
| **DocVQA/ChartQA** | Strong (beats some closed models) | Ahead of GPT-4o, Gemini-1.5 Pro (per Mistral evals) |
| **IF-Eval/MT-Bench** (instruction following) | +20% over nearest open model | > Qwen2-VL 7B, LLaVA-OneVision 7B, Phi-3.5 Vision |
| **MathVista** | High (Pixtral Large: 69.4%) | Pixtral Large > GPT-4o in some tests |
| **LMSYS Vision Leaderboard** | Leads open-weights (Pixtral Large ~50 ELO ahead) | Competitive with Claude-3.5 Sonnet |

- **Overall**: Best-in-class open 12B VLM; text benchmarks match non-vision Mistral models. Pixtral Large extends this, topping 4/8 Mistral-tested multimodal benches vs. Llama 3.2 90B, GPT-4o.

Sources: Mistral AI official page/arXiv, IBM/AWS blogs, DeepLearning.AI, Vercel (all 2024-2026). Benchmarks are provider-reported; independent evals (e.g., LMSYS) confirm leadership among open models. For latest, check Hugging Face or Mistral Docs.