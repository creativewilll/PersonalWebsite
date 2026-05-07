Querying perplexity using sonar-pro for: Anthropic constitutional classifiers paper January 2025 safety research CBRN content filtering with maxTokens: 8000
### Anthropic's Constitutional Classifiers: January 2025 Paper on CBRN Safety Research

The primary paper you're referring to is **"Constitutional Classifiers: Defending against Universal Jailbreaks across Thousands of Hours of Red Teaming"**, published on arXiv on January 31, 2025 (arXiv:2501.18837v1 [cs.CL]). This work from Anthropic's Safeguards Research Team introduces **Constitutional Classifiers**, a framework for training input/output classifiers to defend large language models (LLMs) like Claude 3.5 Sonnet against jailbreaks, with a strong focus on filtering **CBRN (chemical, biological, radiological, nuclear) harms**.

#### Key Details from the Paper
- **Core Method**: 
  - Builds on **Constitutional AI** principles, using a **constitution**—a set of natural language rules defining permissible vs. restricted content (e.g., "recipes for mustard are allowed, but recipes for mustard gas are not").
  - **Stage I**: Synthetic data generation. A "helpful-only" model creates diverse queries spanning constitutional categories, including jailbreak-style prompts in various languages and formats.
  - **Stage II**: Train classifiers (e.g., fine-tuned from Claude 3.5 Sonnet) on this data to detect/block harmful inputs/outputs. Includes input classifiers (pre-model), output classifiers (streaming token-by-token), and linear probes for efficiency.
  - Advantages: Rapid adaptation to new threats by updating the constitution; low over-refusal (e.g., 0.38% increase in next-gen version); moderate compute overhead.

- **CBRN Focus**:
  - Prototype classifiers targeted **scientific knowledge related to CBRN harms** (e.g., blocking synthesis instructions for Schedule 1 chemicals or bioweapons).
  - Constitution explicitly categorizes CBRN content: Allowed (e.g., college chemistry homework); Disallowed (e.g., weapon production recipes).

- **Evaluation and Red Teaming**:
  - **Human Red Teaming**: Bug bounty with independent jailbreakers (thousands of hours). Goal: Universal jailbreak succeeding on *all 10 forbidden CBRN queries*. **Result**: No universal jailbreaks found; >95% of attempts blocked (reduced success rate from ~high baseline to 4.4%).
  - **Synthetic Benchmarks**: Robust against known jailbreaks; next-gen "Constitutional Classifiers++" (Jan 2026 paper) further improved efficiency.
  - Public red teaming ran at claude.ai/constitutional-classifiers (ended Feb 10, 2025).

- **Limitations**:
  - High over-refusal/compute in prototype; partial jailbreaks possible on subsets of queries.
  - Not foolproof—requires ongoing updates.

#### Access the Paper
- **Full PDF**: [arXiv:2501.18837](https://arxiv.org/pdf/2501.18837)
- **Anthropic Announcement**: [anthropic.com/research/constitutional-classifiers](https://www.anthropic.com/research/constitutional-classifiers) (Feb 3, 2025)
- **Follow-up (Jan 2026)**: [Next-generation Constitutional Classifiers](https://www.anthropic.com/research/next-generation-constitutional-classifiers)

This approach aligns with Anthropic's Responsible Scaling Policy, emphasizing proactive CBRN misuse mitigation. For implementation details, see Figure 1 in the paper (synthetic data pipeline and classifier deployment). If you need code excerpts, excerpts, or analysis of the constitution rules, let me know!