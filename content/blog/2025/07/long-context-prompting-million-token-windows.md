---
title: "Long-Context Prompting: Working with Million-Token Windows"
slug: "long-context-prompting-million-token-windows"
date: "2025-07-17"
lastModified: "2025-07-17"
author: "William Spurlock"
readingTime: 16 min read
categories:
  - "AI Prompting"
tags:
  - "long context"
  - "million token window"
  - "GPT-4.1"
  - "Gemini 2.5 Pro"
  - "context engineering"
  - "RAG alternatives"
  - "prompt caching"
  - "needle in haystack"
  - "AI architecture"
featured: false
draft: false
excerpt: "Million-token context windows change everything. Here's how to prompt effectively when your entire codebase, library, or conversation fits in a single request."
coverImage: "/images/blog/long-context-prompting-million-token-windows.png"
seoTitle: "Long-Context Prompting: Million-Token Windows"
seoDescription: "Master million-token context windows with practical prompting strategies for GPT-4.1, Gemini 2.5 Pro, and other frontier models."
seoKeywords:
  - "long context prompting"
  - "million token window"
  - "GPT-4.1 context"
  - "Gemini 2.5 Pro prompting"
  - "large context AI"
aioTargetQueries:
  - "how to use million token context window"
  - "GPT-4.1 1M token prompting tips"
  - "Gemini 2.5 Pro long context best practices"
  - "long context vs RAG which is better"
  - "needle in haystack problem AI models"
  - "prompt caching OpenAI Anthropic"
  - "how to structure documents for long context"
contentCluster: "prompt-engineering"
pillarPost: false
parentPillar: "how-to-talk-to-ai-prompt-engineering-guide"
entityMentions:
  - "William Spurlock"
  - "GPT-4.1"
  - "Gemini 2.5 Pro"
  - "Claude Sonnet 4"
  - "Grok 4"
  - "Llama 4 Scout"
  - "OpenAI"
  - "Google"
  - "Anthropic"
  - "xAI"
  - "Meta"
serviceTrack: "ai-automation"
---

# Long-Context Prompting: Working with Million-Token Windows

We crossed a threshold this year. One million tokens in a single prompt is now commercially available. GPT-4.1 offers it. Gemini 2.5 Pro offers it. Grok 4 just joined the club. The implications are enormous, but most teams are still prompting like they're working with 4K or 8K windows.

This is a mistake. Long-context prompting is a distinct discipline with its own rules, failure modes, and optimization strategies. What works at 4K tokens often fails at 1M. The "lost in the middle" problem becomes existential. Cost math changes entirely. The boundary between what belongs in-context versus what belongs in a retrieval system shifts dramatically.

I have been building with these windows since GPT-4.1's release in April 2025. I have shipped production systems that ingest entire codebases, full academic papers, and complete conversation histories in single requests. Some of these systems work beautifully. Others failed in predictable ways that I now know how to avoid.

This guide is what I wish I had six months ago. It covers the mechanics of million-token prompting, the specific techniques that improve performance at scale, and the hard trade-offs that determine when long context beats RAG and when it does not.

## Table of Contents

- [What Changes at One Million Tokens](#what-changes-at-one-million-tokens)
- [Model Comparison: Context Windows as of July 2025](#model-comparison-context-windows-as-of-july-2025)
- [The Lost in the Middle Problem](#the-lost-in-the-middle-problem)
- [Instruction Placement: Front-Loading What Matters](#instruction-placement-front-loading-what-matters)
- [Restating the Task: The Sandwich Technique](#restating-the-task-the-sandwich-technique)
- [Anchoring: Reference Points in Giant Documents](#anchoring-reference-points-in-giant-documents)
- [Chunking and Ordering Strategy](#chunking-and-ordering-strategy)
- [When Long Context Beats RAG](#when-long-context-beats-rag)
- [When RAG Still Wins](#when-rag-still-wins)
- [Cost and Latency Math](#cost-and-latency-math)
- [Context Caching and Prompt Caching](#context-caching-and-prompt-caching)
- [Structuring Giant Documents](#structuring-giant-documents)
- [Multi-Document Prompts](#multi-document-prompts)
- [Needle-in-Haystack Reliability](#needle-in-haystack-reliability)
- [Degradation Patterns at Scale](#degradation-patterns-at-scale)
- [Reusable Long-Context Prompt Scaffold](#reusable-long-context-prompt-scaffold)
- [Frequently Asked Questions](#frequently-asked-questions)

## What Changes at One Million Tokens

**Everything about prompt engineering assumptions breaks at this scale.**

At 4K tokens, you can be sloppy. Drop instructions anywhere. Assume the model reads every word with equal attention. Ignore structure because the model will figure it out.

At 1M tokens, sloppiness kills performance. The model cannot attend equally to a million tokens. Attention mechanisms have finite capacity. The prompt becomes a signal-to-noise problem where your instructions compete with hundreds of thousands of tokens of context.

Here is what actually changes:

| Aspect | 4K-32K Context | 1M Context |
|--------|---------------|------------|
| **Attention distribution** | Relatively uniform | Heavily weighted to start/end |
| **Instruction location** | Flexible placement | Critical placement at boundaries |
| **Document structure** | Optional formatting | Mandatory delimiter systems |
| **Retrieval trade-off** | RAG almost always wins | Long context often beats RAG |
| **Cost model** | Linear with output | Dominated by input tokens |
| **Latency** | Fast, predictable | Slow, scales with input size |
| **Error modes** | Hallucinations, omissions | Missing middle, anchoring failures |
| **Caching value** | Minimal | Massive cost reduction |

The core insight: long-context prompting is closer to database query optimization than traditional prompt engineering. You are managing what gets loaded, in what order, with what indexing, and how the model accesses it.

## Model Comparison: Context Windows as of July 2025

Not all million-token windows are equal. Context size is one dimension. How the model uses that context is another. Here is the landscape as of July 17, 2025:

| Model | Context Window | Input Cost (per 1M) | Output Cost (per 1M) | Caching | Best For |
|-------|---------------|---------------------|----------------------|---------|----------|
| **GPT-4.1** | 1,048,576 tokens | $2.00 | $8.00 | Yes (50% discount) | Code analysis, multi-file refactoring |
| **Gemini 2.5 Pro** | 1,048,576 tokens (2M roadmap) | $1.25 | $10.00 | Context caching | Document analysis, multimodal long context |
| **Claude Sonnet 4** | 200,000 tokens | $3.00 | $15.00 | Prompt caching (90% discount) | Complex reasoning, instruction following |
| **Grok 4** | ~1,000,000 tokens | Variable | Variable | Limited | Real-time data analysis |
| **Llama 4 Scout** | Very large (10M+ in some configs) | Self-hosted cost | Self-hosted cost | Manual implementation | On-premise, privacy-critical workloads |

**Important note on Claude:** Claude Sonnet 4 and Opus 4 ship with a 200K context window as of July 2025. Anthropic has announced 1M token capabilities coming in August 2025, but that is not available yet. Do not plan production systems assuming Claude has million-token windows today.

**Gemini's roadmap:** Google has announced 2M token context windows are in preview and expected to reach general availability later in 2025. The 1M window is fully production-ready today.

**Grok 4:** xAI released Grok 4 around July 9, 2025. Context window specifications vary by deployment tier. The model is competitive on long-context tasks but pricing and availability are still stabilizing.

## The Lost in the Middle Problem

**Models struggle to retrieve and use information in the middle of very long contexts, regardless of architecture.**

This is not a bug. It is a fundamental property of how attention mechanisms scale. Research consistently shows that performance degrades on information located in the middle third of long prompts, even with advanced architectures.

The needle-in-haystack test demonstrates this clearly. Hide a specific fact in a long document and ask the model to retrieve it. Accuracy is near-perfect for facts at the start. Near-perfect for facts at the end. Often below 60% for facts in the middle.

What causes this:

1. **Attention dilution:** With a million tokens, each token gets microscopic attention weight on average
2. **Positional bias:** Transformers have inherent positional preferences for sequence boundaries
3. **Training distribution:** Most training examples are shorter, so models optimize for start/end emphasis
4. **Memory pressure:** KV cache size grows linearly with context, creating implementation pressure

The consequence for prompting: information placement is not cosmetic. It determines whether the model actually uses your content or ignores it.

## Instruction Placement: Front-Loading What Matters

**Put your most critical instructions within the first 2,000 tokens. Always.**

This rule overrides almost every other prompt engineering principle at long context. The model pays disproportionate attention to the beginning. Use that attention for what matters most.

**The hierarchy of instruction placement:**

| Priority | Token Position | Content Type |
|----------|---------------|--------------|
| **Critical** | 0-2,000 | Core task definition, output format, constraints |
| **Important** | 2,000-10,000 | Detailed instructions, examples, style guidance |
| **Reference** | 10,000-50,000 | Supporting documents, context, background |
| **Bulk** | 50,000-1M | Raw source material, logs, transcripts, codebases |

**Practical example:**

If you are asking the model to analyze a 500K token codebase, structure like this:

```
[0-500 tokens]: Task definition and output format
[500-2000 tokens]: Specific analysis instructions, constraints
[2000-5000 tokens]: Code structure overview, key file list
[5000-50K tokens]: Important files with metadata
[50K-500K tokens]: Remaining codebase
[500K-502K tokens]: Restated task, specific questions to answer
```

The middle 400K tokens are your "bulk" zone. The model will access this material when specifically directed, but do not assume it will notice something buried there without a pointer.

## Restating the Task: The Sandwich Technique

**Repeat your core task instructions at both the beginning and end of long prompts.**

This is the most reliable technique for combating lost-in-the-middle degradation. The sandwich approach ensures your instructions appear in both high-attention zones.

**Structure:**

```
=== BEGINNING (high attention) ===
You are a code reviewer. Analyze the following codebase for security vulnerabilities.
Focus on: injection risks, authentication bypasses, data exposure.
Output format: JSON with file paths and severity ratings.

=== MIDDLE (variable attention) ===
[500K tokens of source code]

=== END (high attention) ===
Task reminder: Review the codebase above for security vulnerabilities.
Focus areas: injection risks, authentication bypasses, data exposure.
Output format: JSON with file paths and severity ratings.
Specific questions:
1. Which files handle user input without sanitization?
2. Are there any hardcoded credentials or tokens?
3. Which API endpoints lack authentication checks?
```

**Why this works:**

- Beginning placement captures initial attention and sets processing frame
- End placement benefits from recency effects and final-output preparation
- Middle content is navigated via pointers from both boundaries
- Specific questions at the end guide the model to relevant middle content

**Variation: The Bookend Method**

For very structured outputs, place detailed format specifications at the start and simplified reminders at the end. This prevents the end restatement from overwhelming the output structure.

## Anchoring: Reference Points in Giant Documents

**Create explicit anchor points that the model can reference when navigating large contexts.**

Anchors are artificial high-attention markers that improve retrieval from middle content. They give the model specific tokens to "jump to" when following instructions.

**Anchor techniques:**

| Technique | Implementation | Use Case |
|-----------|---------------|----------|
| **Numbered sections** | `## SECTION 47: Authentication Module` | Documents with clear sequential structure |
| **Named markers** | `[ANCHOR: user-auth-flow]` | Key concepts referenced from multiple places |
| **Metadata headers** | `--- file: src/auth.js lines: 1-150 ---` | Code analysis, multi-file contexts |
| **Summary tables** | Up-front index of what's where | Very long documents with scattered topics |
| **Explicit pointers** | `See [ANCHOR: payment-flow] for related logic` | Cross-referencing within the context |

**Example anchor system for code analysis:**

```markdown
## INDEX
- [AUTH] Authentication system (tokens 15K-45K)
- [DB] Database layer (tokens 45K-120K)
- [API] REST endpoints (tokens 120K-200K)
- [UI] Frontend components (tokens 200K-350K)

[AUTH] Authentication System
--- file: src/auth/login.js ---
[Lines 1-50] ...

--- file: src/auth/session.js ---
[Lines 1-80] ...
```

The explicit `[AUTH]` marker creates a high-salience token sequence. When you later ask "analyze the [AUTH] section for vulnerabilities," the model has a specific anchor to locate.

## Chunking and Ordering Strategy

**Break large contexts into logical chunks and order them by relevance to the task, not by source order.**

Source order is rarely optimal for model processing. A chronological log is less useful than a log ordered by severity. A codebase in directory order is less useful than a codebase ordered by dependency flow.

**Chunking principles:**

1. **Semantic boundaries:** Chunk at natural breaks (functions, sections, documents)
2. **Relevance gradient:** Most relevant content closer to instructions
3. **Dependency order:** If B depends on A, A should appear before B
4. **Progressive disclosure:** Overview → Key details → Supporting material

**Example: Reordering a codebase for analysis**

Instead of alphabetical directory order:

```
RECOMMENDED ORDER FOR SECURITY AUDIT:
1. Entry points (main, index, server files)
2. Authentication/authorization modules
3. API route handlers
4. Database access layer
5. Utility functions
6. Configuration files
7. Tests (for understanding expected behavior)
8. Documentation
```

This puts the highest-risk code closest to the high-attention zone at the prompt's beginning.

**Chunk metadata format:**

```markdown
---
chunk_id: auth-001
source: src/auth/login.js
lines: 1-85
importance: critical
dependencies: [db-003, utils-012]
---

[code content here]

---
chunk_summary: Handles user login, password verification, session creation
key_functions: [validateCredentials, createSession, generateToken]
---
```

Metadata at both boundaries ensures the model knows what it is looking at, even if middle content is attenuated.

## When Long Context Beats RAG

**Long context wins when the task requires understanding relationships across the entire corpus.**

RAG (Retrieval-Augmented Generation) is powerful but has a critical limitation: it retrieves chunks in isolation. The model never sees the relationships between retrieved chunks unless you explicitly engineer that visibility.

**Long context is superior for:**

| Task Type | Why Long Context Wins |
|-----------|----------------------|
| **Code refactoring** | Needs to understand cross-file dependencies, call graphs, type relationships |
| **Comprehensive document analysis** | Requires synthesis across chapters, sections, arguments |
| **Conversation summarization** | Full context prevents repetition, tracks evolving positions |
| **Comparative analysis** | Comparing multiple documents requires simultaneous access |
| **Pattern detection** | Finding patterns requires seeing all instances together |
| **Consistency checking** | Verifying style, terminology, logic across large works |

**Specific example: Multi-file code refactoring**

Imagine renaming a core data structure across a 100-file codebase. With RAG:
- Retrieve chunks mentioning the structure
- Hope you got all references
- Handle false positives
- Manage multiple rounds of retrieval

With long context (1M token window):
- Load entire codebase
- Provide renaming instructions once
- Model sees all files simultaneously
- Produces complete, consistent changes in one pass

The cost difference is real but often smaller than expected when you account for RAG's multiple retrieval rounds and the coordination overhead of chunk management.

## When RAG Still Wins

**RAG remains superior when the relevant context is sparse and the total corpus is enormous.**

Even with million-token windows, you cannot load everything. A 10M document collection, a decade of logs, or a billion-token codebase requires selection. RAG is that selection mechanism.

**RAG is superior for:**

| Scenario | Why RAG Wins |
|----------|--------------|
| **Sparse retrieval** | 1% of a 100M token corpus is relevant |
| **Dynamic data** | Real-time information that changes constantly |
| **Cost optimization** | Input token costs dominate at scale |
| **Latency requirements** | Large prompts are inherently slower |
| **Multi-tenant isolation** | Different users access different subsets |
| **Curation value** | Human-selected chunks beat bulk loading |

**The hybrid approach:**

Most production systems use both. Load high-value context directly (recent conversation, critical documents, core codebase). Use RAG for the long tail (archives, reference material, peripheral content).

Example hybrid architecture:

```
PROMPT STRUCTURE:
[0-1K]: Instructions and output format
[1K-5K]: Recent conversation history (always loaded)
[5K-50K]: Core codebase files (task-specific selection)
[50K-800K]: Retrieved context from vector store
[800K-802K]: Task restatement and specific questions
```

The 750K of retrieved context is filtered by relevance. The model focuses attention on what matters while maintaining visibility of the broader picture.

## Cost and Latency Math

**Million-token prompts are expensive and slow. Plan accordingly.**

The economics of long-context prompting differ fundamentally from standard API usage. Input tokens dominate costs. Latency scales non-linearly with context size. Caching becomes essential rather than optional.

**Cost comparison (per 1M input tokens, as of July 2025):**

| Model | Input Cost | Cached Input | Output Cost | Full 1M Prompt Cost |
|-------|-----------|--------------|-------------|-------------------|
| GPT-4.1 | $2.00 | $1.00 | $8.00 | ~$18 (including output) |
| Gemini 2.5 Pro | $1.25 | ~$0.31 | $10.00 | ~$13 |
| Claude Sonnet 4 | $3.00 | $0.30 | $15.00 | ~$21 |

**Latency factors:**

| Context Size | Typical First Token Latency | Notes |
|--------------|---------------------------|-------|
| 4K tokens | 0.5-2 seconds | Near-instant |
| 32K tokens | 2-5 seconds | Standard for complex tasks |
| 128K tokens | 8-15 seconds | Noticeable delay |
| 1M tokens | 30-90 seconds | Significant delay, plan for async |

**Cost optimization strategies:**

1. **Prompt caching:** Reuse the same context prefix across multiple requests. GPT-4.1 offers 50% discount on cached tokens. Claude offers 90%.

2. **Context compression:** Summarize long documents before inclusion. A 50K token document often compresses to 5K tokens with minimal information loss.

3. **Selective loading:** Only include sections relevant to the specific query. Do not load the entire codebase for a targeted bug fix.

4. **Batched analysis:** One 1M token request is often cheaper than ten 100K token requests, especially with caching.

5. **Model tiering:** Use cheaper models for initial filtering, expensive models for final analysis.

**The caching game-changer:**

With effective prompt caching, the cost model shifts from per-request to per-context-change. If your 800K token codebase changes rarely, subsequent analysis requests cost a fraction of the initial load.

## Context Caching and Prompt Caching

**Prompt caching is the single most important optimization for long-context workflows.**

Both OpenAI and Anthropic offer prompt caching (called "context caching" by Google). The mechanics differ slightly, but the principle is identical: if you send the same long prefix repeatedly, you pay a reduced rate for the cached portion.

**Provider implementations (July 2025):**

| Provider | Feature Name | Discount | Min Cacheable | Notes |
|----------|-------------|----------|---------------|-------|
| **OpenAI** | Prompt Caching | 50% | 1,024 tokens | Automatic, no API changes needed |
| **Anthropic** | Prompt Caching | 90% | 2,048 tokens | Must mark cache points explicitly |
| **Google** | Context Caching | ~75% | Varies | Managed through separate API |

**Anthropic's explicit cache points:**

Anthropic requires you to mark where caching should occur using the `cache_control` parameter:

```json
{
  "role": "user",
  "content": [
    {
      "type": "text",
      "text": "[800K tokens of codebase]",
      "cache_control": {"type": "ephemeral"}
    }
  ]
}
```

The cache point must be at least 2,048 tokens. You can have multiple cache points in a conversation.

**Caching strategy for multi-turn conversations:**

```
TURN 1:
- Load full context (800K tokens)
- Pay full price
- Cache is populated

TURN 2-10:
- Same context prefix
- Pay 10% of input cost (Anthropic) or 50% (OpenAI)
- Only new tokens (questions) charged full rate

CONTEXT CHANGE:
- Modified files invalidate cache
- Repopulate cache (one-time cost)
- Resume discounted rate
```

**Cache hit rate optimization:**

- Keep context prefixes stable
- Append new content rather than reordering
- Use deterministic document ordering
- Separate volatile and stable content

For a typical codebase analysis workflow with 90% cache hit rates, effective costs drop by 70-85%.

## Structuring Giant Documents

**Use explicit delimiters and hierarchical markers to structure documents at scale.**

At 1M tokens, the model cannot infer structure. You must broadcast it explicitly. Every section boundary needs a clear delimiter. Every hierarchy level needs a distinct marker.

**Delimiter hierarchy:**

| Level | Delimiter | Purpose |
|-------|-----------|---------|
| **Document** | `=== DOCUMENT: filename ===` | Separate files/documents |
| **Section** | `## SECTION N: Title` | Major divisions |
| **Subsection** | `### Subsection Title` | Logical groupings |
| **Block** | `--- metadata ---` | Content boundaries |
| **Inline** | `[TAG: value]` | Specific markers |

**Recommended document template:**

```markdown
=== DOCUMENT: {filename} ===
Source: {path}
Type: {file_type}
Size: {token_count} tokens

## OVERVIEW
{1-2 paragraph summary}

## KEY COMPONENTS
- {Component A}
- {Component B}

## FULL CONTENT
```
[actual content]
```

## METADATA
Dependencies: [list]
Used_by: [list]
Last_modified: [date]
=== END DOCUMENT ===
```

**Why explicit delimiters matter:**

- Model can identify document boundaries programmatically
- Easier to reference specific sections
- Better compression of structural information
- Enables self-correction ("check the section between === markers")

**Hierarchical numbering for navigation:**

```markdown
## SECTION 1: Introduction
### 1.1 Background
#### 1.1.1 Historical Context
#### 1.1.2 Current State
### 1.2 Objectives
## SECTION 2: Methodology
...
```

Explicit numbering creates machine-readable addresses. "Refer to section 4.2.3" is unambiguous in a way that "the authentication section" is not.

## Multi-Document Prompts

**Load multiple documents with consistent formatting and clear provenance markers.**

When combining documents from different sources, the model needs to know which document is which. Source confusion is a common failure mode in multi-document prompts.

**Multi-document template:**

```markdown
# CONTEXT DOCUMENTS

## DOC-001: Product Requirements Document
Source: PRD_v3.md (internal)
Date: 2025-06-15
Author: Product Team
Relevance: Core requirements

[content...]

## DOC-002: API Documentation
Source: api-docs.external.com
Date: 2025-07-01
Author: Engineering
Relevance: Implementation details

[content...]

## DOC-003: User Research Transcripts
Source: research_sessions/ (15 files consolidated)
Date: 2025-05-20 to 2025-06-10
Author: Research Team
Relevance: User needs validation

[content...]
```

**Provenance best practices:**

| Element | Purpose |
|---------|---------|
| **Source** | Where did this content come from? |
| **Date** | How current is this information? |
| **Author** | Who created this? Credibility marker. |
| **Relevance** | Why is this in the context? |
| **Version** | Is this the latest version? |

**Cross-document references:**

When documents reference each other, make those references explicit:

```markdown
In DOC-002, the API documentation states that rate limits apply.
Cross-reference: See DOC-001 section 3.2 for business justification.
```

This creates explicit links that help the model maintain coherence across document boundaries.

## Needle-in-Haystack Reliability

**Test your prompting strategy with deliberate needle insertions before production deployment.**

Needle-in-haystack testing means hiding specific information in your context and verifying the model can retrieve it. This is essential validation for long-context systems.

**Testing protocol:**

1. **Create synthetic needles:** Insert unique, verifiable facts at specific positions
2. **Vary positions:** Test at 10%, 50%, 90% of context length
3. **Vary depths:** Test surface retrieval vs. deep inference
4. **Measure accuracy:** Track retrieval success rate by position
5. **Iterate on structure:** Adjust prompting based on failure patterns

**Example needle test:**

```markdown
[Context: 500K tokens of technical documentation]

NEEDLE INSERTION at position 250K (50%):
"The magic color is: PERIWINKLE-7X9"

QUERY:
"What is the magic color mentioned in the documentation?"

EXPECTED: "PERIWINKLE-7X9"
```

**Common failure patterns:**

| Pattern | Cause | Solution |
|---------|-------|----------|
| **Start/end bias** | Model only checks boundaries | Sandwich technique, restate task |
| **False negatives** | Needle missed entirely | Stronger anchoring, metadata |
| **False positives** | Model hallucinates answer | Unique needle format, verification |
| **Depth decay** | Deeper positions fail worse | Hierarchical markers, summaries |

**Production needle strategy:**

Do not rely on single-point needles. Use distributed verification:

```markdown
Place critical facts at:
- Position 5K (early, high attention)
- Position 500K (middle, test retrieval)
- Position 995K (end, high attention)

Query requires synthesis of all three positions.
```

If the model can synthesize across distributed needles, your structure is working.

## Degradation Patterns at Scale

**Watch for these specific failure modes as context grows beyond 100K tokens.**

Model behavior changes qualitatively at different context thresholds. Understanding these thresholds helps you set appropriate expectations and design compensating strategies.

**Degradation by scale:**

| Scale | Typical Behavior | Mitigation |
|-------|-----------------|------------|
| **0-32K** | Near-optimal attention | Standard prompting works |
| **32K-128K** | Mild middle attenuation | Basic structure helps |
| **128K-512K** | Significant middle degradation | Anchors, sandwich technique required |
| **512K-1M** | Severe middle degradation | Aggressive structure, caching essential |
| **1M+** | Experimental territory | Chunking, hybrid RAG recommended |

**Specific degradation patterns:**

1. **Instruction drift:** Model gradually loses adherence to initial instructions as context accumulates. Mitigation: Restate instructions at end.

2. **Format collapse:** Structured output degrades into prose or mixed formats. Mitigation: Stronger format enforcement, JSON schemas.

3. **Attribution failure:** Model produces correct answers but cannot cite sources. Mitigation: Require citation format, include metadata.

4. **Coherence breaks:** Long outputs lose thread or contradict earlier statements. Mitigation: Outline first, then fill, with checkpoint reviews.

5. **Specificity loss:** Answers become generic rather than grounded in context. Mitigation: Explicit grounding requirements in prompts.

**Monitoring recommendations:**

Track these metrics as you scale context:
- Instruction adherence rate
- Source citation accuracy
- Output format compliance
- Task completion rate by context size
- Latency and cost per token

## Reusable Long-Context Prompt Scaffold

**Use this scaffold as a starting point for million-token prompts.**

This template incorporates the techniques discussed above. Adapt it to your specific use case.

```markdown
=== SYSTEM CONTEXT ===
You are: [role definition]
Task: [core task, 1-2 sentences]
Output format: [format specification]
Constraints: [hard constraints]

=== INSTRUCTIONS ===
[Detailed instructions, 500-2000 tokens]
Key priorities:
1. [Priority one]
2. [Priority two]
3. [Priority three]

Failure modes to avoid:
- [Specific warning]
- [Specific warning]

=== CONTEXT OVERVIEW ===
This context contains:
- [Document/file count and types]
- [Total token count]
- [Date range if applicable]
- [Relevance to task]

=== CONTEXT INDEX ===
## [DOC-001]: [Title]
Location: tokens [start]-[end]
Summary: [2-3 sentences]
Key sections: [list]

## [DOC-002]: [Title]
...

=== FULL CONTEXT ===
## [DOC-001]: [Title]
Source: [provenance]
[Full content with internal delimiters]

## [DOC-002]: [Title]
...

=== TASK RESTATEMENT ===
Reminder: [Core task, restated]

Specific deliverables:
1. [Deliverable one]
2. [Deliverable two]

Questions to answer:
1. [Question one]
2. [Question two]

Output format reminder: [format specification]
```

**Using the scaffold:**

1. Fill in all bracketed sections
2. Keep the structure consistent across prompts
3. Adjust section sizes based on content
4. Maintain the sandwich (instructions at both ends)
5. Update the index as context changes

This structure survives scaling to 1M tokens better than unstructured approaches.

## Frequently Asked Questions

### What is the maximum context window available in July 2025?

**GPT-4.1 and Gemini 2.5 Pro both offer 1,048,576 tokens (1M).** Anthropic's Claude models currently max at 200K tokens, with 1M promised for August 2025. Grok 4 offers approximately 1M tokens. Llama 4 Scout supports very large contexts, potentially 10M+ in specialized configurations.

### Does a larger context window mean the model pays equal attention to all tokens?

**No. Attention is not uniform.** Models exhibit strong positional bias toward the beginning and end of contexts. Information in the middle receives significantly less attention, a phenomenon called "lost in the middle." Structure your prompts accordingly.

### Is long-context prompting always better than RAG?

**No. RAG remains superior for sparse retrieval from enormous corpora.** If you need 1% of a 100M token collection, RAG is cheaper and faster. Long context wins when you need relationships across the full corpus or when the relevant content is dense rather than sparse.

### How much does a million-token prompt cost?

**Between $12 and $21 for input alone, plus output costs.** GPT-4.1 charges $2 per 1M input tokens. Gemini 2.5 Pro charges $1.25. Claude Sonnet 4 charges $3. Output costs add $8-15 per 1M output tokens. Prompt caching reduces these costs by 50-90% for repeated contexts.

### What is prompt caching and why does it matter for long context?

**Prompt caching discounts repeated token sequences.** If you send the same 800K token codebase prefix ten times, you pay full price once and discounted rates (50-90% off) for the other nine requests. This makes long-context workflows economically viable for iterative analysis.

### How do I prevent the model from missing information in the middle of long documents?

**Use three techniques together:** (1) Sandwich technique—restate instructions at both beginning and end, (2) Anchoring—create explicit markers like `[SECTION: name]` for important content, and (3) Strategic placement—put the most critical content in the first and last 10% of your context.

### What are the best use cases for million-token windows?

**Codebase analysis, comprehensive document review, conversation summarization, and cross-document synthesis.** Any task requiring understanding of relationships across an entire corpus benefits from loading it whole. Single-pass refactoring of multi-file projects is a standout use case.

### How do I structure documents for optimal long-context retrieval?

**Use explicit hierarchical delimiters.** Mark document boundaries with `=== DOCUMENT: name ===`. Use numbered sections (`## SECTION 1: Title`). Include metadata at boundaries. Create an index up front. The model cannot infer structure at this scale; you must broadcast it.

### Is there a latency penalty for large contexts?

**Yes, significant.** First-token latency scales roughly linearly with context size. A 1M token prompt typically takes 30-90 seconds before output begins, compared to 0.5-2 seconds for 4K tokens. Plan for asynchronous processing or progressive loading for user-facing applications.

### Can I use long-context prompting with Claude?

**Claude Sonnet 4 and Opus 4 support 200K tokens as of July 2025.** Anthropic has announced 1M token windows coming in August 2025, but they are not available yet. For true million-token workloads today, use GPT-4.1, Gemini 2.5 Pro, or Grok 4.

### How do I test if my long-context prompt structure is working?

**Use needle-in-haystack testing.** Insert unique, verifiable facts at the beginning, middle, and end of your context. Query for these facts. If the model misses middle insertions, your structure needs stronger anchoring or sandwich technique reinforcement.

### Should I compress documents before including them in long prompts?

**Selective compression helps.** Remove boilerplate, normalize whitespace, and summarize repetitive sections. A 50K token document often compresses to 5K tokens with minimal information loss. Do not compress content where precise wording matters (contracts, code, technical specifications).

### How do multi-document prompts differ from single-document prompts?

**Provenance becomes critical.** When loading multiple documents, the model needs explicit source markers (`Source: filename.md`) to distinguish them. Without clear provenance, the model may confuse facts between documents or hallucinate sources.

### What is the "sandwich technique" in long-context prompting?

**Placing core instructions at both the beginning and end of the prompt.** This ensures instructions appear in both high-attention zones, compensating for lost-in-the-middle degradation. The beginning sets the frame; the end provides the immediate instruction before output generation.

---

Million-token context windows represent a fundamental shift in how we work with AI. The entire prompt engineering playbook—built on assumptions from 4K and 8K token eras—requires revision. What I have outlined here is the current state of that revision based on production experience through July 2025.

The techniques work. The cost is manageable with caching. The latency is acceptable for asynchronous workflows. The bigger constraint is mindset: most teams still think in chunks, retrieval, and assembly. Sometimes the right approach is simpler. Load everything. Point. Ask.

If you are building with long-context models and need help architecting reliable systems, [book an AI automation strategy call](/contact). I work with teams to implement production-grade prompting strategies, context management systems, and the infrastructure to support them.
