---
title: "Prompting Claude: Anthropic's XML-Tag Playbook"
slug: "prompting-claude-anthropic-xml-playbook"
date: "2025-04-24"
lastModified: "2025-04-24"
author: "William Spurlock"
readingTime: 24
categories:
  - "AI Prompting"
tags:
  - "claude prompting"
  - "anthropic xml tags"
  - "claude 3.7 sonnet"
  - "prompt engineering"
  - "claude code"
  - "xml structured prompts"
  - "extended thinking"
  - "hybrid reasoning"
featured: false
draft: false
excerpt: "Anthropic designed Claude to respond exceptionally well to XML-structured prompts. Learn the exact XML-tag patterns, extended thinking controls, and long-context strategies that unlock Claude's full capability."
coverImage: "/images/blog/prompting-claude-anthropic-xml-playbook.png"
seoTitle: "Prompting Claude: Anthropic's XML-Tag Playbook | William Spurlock"
seoDescription: "Master Claude prompting with Anthropic's XML-tag playbook. Learn structured prompts, extended thinking mode, Claude Code patterns, and 200K context window strategies."
seoKeywords:
  - "claude prompting"
  - "anthropic xml tags"
  - "claude 3.7 sonnet"
  - "prompt engineering claude"
  - "claude extended thinking"
  - "claude code prompts"
aioTargetQueries:
  - "how to prompt claude"
  - "claude xml tags"
  - "claude prompt engineering"
  - "claude 3.7 sonnet prompting"
  - "anthropic prompt structure"
  - "claude extended thinking mode"
  - "claude code best practices"
contentCluster: "prompt-engineering"
pillarPost: false
parentPillar: "how-to-talk-to-ai-prompt-engineering-guide"
entityMentions:
  - "William Spurlock"
  - "Claude 3.7 Sonnet"
  - "Claude 3.5 Sonnet"
  - "Anthropic"
  - "Claude Code"
serviceTrack: "ai-automation"
---

# Prompting Claude: Anthropic's XML-Tag Playbook

## Table of Contents

- [Why Claude Responds Differently to Structure](#why-claude-responds-differently-to-structure)
- [The Foundation: XML Tags for Input Separation](#the-foundation-xml-tags-for-input-separation)
- [Claude 3.7 Sonnet: Hybrid Reasoning and Extended Thinking](#claude-37-sonnet-hybrid-reasoning-and-extended-thinking)
- [System Prompts and Role Conventions](#system-prompts-and-role-conventions)
- [Explicit Instructions: Telling Claude to Commit](#explicit-instructions-telling-claude-to-commit)
- [Prefilling the Assistant Turn](#prefilling-the-assistant-turn)
- [Long-Context Strategies for Claude's 200K Window](#long-context-strategies-for-claudes-200k-window)
- [Multishot Examples in XML Structure](#multishot-examples-in-xml-structure)
- [Claude Code and API Integration Patterns](#claude-code-and-api-integration-patterns)
- [The Do's and Don'ts of Claude Prompting](#the-dos-and-donts-of-claude-prompting)
- [Frequently Asked Questions](#frequently-asked-questions)

## Why Claude Responds Differently to Structure

**Anthropic trained Claude on a corpus that heavily emphasized structured, well-delimited text, which is why XML tags produce measurably better results than the same prompt written as plain paragraphs.** This isn't a quirk or a documentation suggestion — it's an architectural preference baked into how Claude processes context. The model pays disproportionate attention to text inside clear delimiters, treats tag boundaries as semantic separators, and uses the structure to resolve ambiguity about which parts are instructions versus data.

I've run the same prompts through GPT-4o, Gemini 2.5 Pro, and Claude 3.7 Sonnet hundreds of times. The pattern is consistent: GPT-4o is forgiving of loose formatting, Gemini 2.5 Pro handles massive context dumps gracefully, and Claude rewards structure with precision. When I wrap my inputs in `<document>` or `<article>` tags, Claude follows my output format instructions more reliably, hallucinates less on long-context tasks, and stays in character better when I've assigned a role.

The mechanism behind this preference traces back to Anthropic's training methodology. According to Anthropic's own research documentation, Claude was trained with extensive exposure to XML-structured conversations, tool-use patterns, and document formats. The model learned to treat angle-bracket delimiters as high-signal boundaries — when it sees `<instructions>`, it weights the content differently than unmarked text. This is why Anthropic's official API examples, documentation, and Claude Code's internal prompts all lean heavily on XML.

The payoff is immediate and substantial. A prompt structured with XML tags that took me 10 minutes to write produces output that I'd otherwise need three iterations to reach with an unstructured prompt. The upfront formatting investment pays for itself in reduced back-and-forth.

## The Foundation: XML Tags for Input Separation

**The core XML pattern for Claude prompting is simple: wrap every distinct input type in its own tag, and keep instructions outside those tags.** This separation lets Claude distinguish between what it should read (the data) and what it should do (the instructions). Without this separation, the model has to infer the boundary — and inference introduces variance.

Anthropic's API documentation recommends these standard tags, though the specific names matter less than being consistent:

| Tag | Purpose | Example Use |
|-----|---------|-------------|
| `<document>` | Long-form text to process | Articles, transcripts, reports |
| `<instructions>` | What Claude should do | Analysis tasks, transformation requests |
| `<example>` | Demonstration of desired output | Few-shot pattern setting |
| `<question>` | Query to answer | Q&A formatting |
| `<context>` | Background information | Situation setup, constraints |
| `<thinking>` | Reasoning scratchpad | Extended thinking mode (Claude 3.7) |

Here's a basic before-and-after that shows the difference:

**Without XML structure (weaker):**

```
Please analyze this contract and list the liability clauses. Also tell me if there's a termination clause and what the notice period is.

[paste 3 pages of legal text here]

Make sure to format as a table.
```

**With XML structure (stronger):**

```xml
<instructions>
Analyze the attached contract for two specific elements:
1. All liability clauses — extract the clause text and summarize the obligation
2. The termination clause — identify the notice period required

Return your findings as a markdown table with columns: Clause Type, Original Text, Summary
</instructions>

<document>
[paste 3 pages of legal text here]
</document>
```

The structured version removes ambiguity about which text is the contract versus the task. Claude doesn't need to guess where the instructions end and the document begins — the tags make it explicit.

For more complex prompts, nesting tags works well. A content transformation task might look like this:

```xml
<instructions>
Transform the following blog post into a LinkedIn carousel script.
</instructions>

<context>
Target audience: SaaS founders
Tone: Conversational but authoritative
Constraint: Maximum 10 slides
</context>

<document>
[full blog post here]
</document>

<example>
Slide 1: Hook — "Your churn isn't a product problem. It's an onboarding problem."
Slide 2: The pattern — [explanation]
</example>
```

The `<context>` tag isolates parameters from both the instructions and the source material, which helps Claude weigh them appropriately. The `<example>` tag primes the output format without polluting the instructions with demonstration text.

## Claude 3.7 Sonnet: Hybrid Reasoning and Extended Thinking

**Claude 3.7 Sonnet, released February 24, 2025, introduced a hybrid reasoning architecture that can switch between fast responses and extended thinking mode, plus user-controllable thinking budgets.** This is Anthropic's first reasoning model — it doesn't just generate tokens; it can allocate additional computation to work through complex problems before responding.

The extended thinking mode is the headline feature. When enabled via the API or Claude's interface, Claude 3.7 Sonnet produces a `<thinking>` block before its final answer. This scratchpad isn't shown to the user by default in consumer interfaces, but it's accessible in API responses and in Claude Code's verbose mode. The thinking block contains the model's step-by-step reasoning, alternative considerations, and self-correction before commitment.

Here's how to prompt for extended thinking effectively:

```xml
<instructions>
Solve the following math problem. Show your work inside <thinking> tags before giving your final answer.
</instructions>

<question>
A train leaves Station A traveling at 60 mph. Two hours later, a second train leaves Station A traveling at 90 mph on a parallel track. How many hours after the second train departs will it catch up to the first train?
</question>
```

The explicit request for `<thinking>` tags triggers Claude 3.7's reasoning behavior even in standard mode. In extended thinking mode (controlled via the API's `thinking` parameter or Claude Code's `--thinking` flag), this becomes mandatory and more elaborate.

Thinking budgets control how much computation Claude allocates to reasoning. Set via `budget_tokens` in the API, this lets you trade cost and latency for depth:

| Budget Level | Tokens | Best For |
|-------------|--------|----------|
| Minimal | 1,024 | Straightforward classification, extraction |
| Standard | 4,096 | Analysis, comparison, reasoning tasks |
| Deep | 16,000+ | Complex proofs, multi-step planning, research synthesis |

**When to enable extended thinking:**

- **Math and logic problems** — the explicit reasoning dramatically reduces arithmetic errors
- **Multi-step planning** — breaking down complex projects into phases benefits from visible reasoning
- **Analysis tasks with trade-offs** — thinking blocks show Claude weighing pros and cons explicitly
- **Code architecture decisions** — reasoning through API choices, database schemas, or library selections

**When to skip it:**

- **Simple extraction or classification** — wastes tokens on obvious outputs
- **Creative writing** — the reasoning constraint can make output feel mechanical
- **High-throughput automation** — latency and cost multiply unnecessarily

The API call to enable extended thinking with a budget looks like this:

```json
{
  "model": "claude-3-7-sonnet-20250224",
  "max_tokens": 4096,
  "thinking": {
    "type": "enabled",
    "budget_tokens": 2048
  },
  "messages": [
    {"role": "user", "content": "Your XML-structured prompt here"}
  ]
}
```

Note the `thinking` object nested alongside `messages` — this is the control surface Anthropic added for the hybrid reasoning capability. The `budget_tokens` value counts against your total token limit but doesn't appear in the final output unless you request it.

## System Prompts and Role Conventions

**Anthropic's API design treats system prompts differently than OpenAI's — there's a dedicated `system` parameter separate from the message array, and Claude weights this content heavily as persistent context across the conversation.** The system prompt in Claude's architecture isn't just another message with a `system` role; it's injected at a lower layer and influences how Claude interprets every subsequent turn.

The convention Anthropic recommends is putting persistent role definitions, global constraints, and high-level behavior instructions in the system prompt, then using the user message for task-specific XML-structured requests. This separation keeps the system prompt stable while the user message changes per interaction.

A production-grade system prompt for a code review agent might look like:

```
You are CodeReviewer, an expert software engineer with deep knowledge of TypeScript, React, and performance optimization. Your job is to review code for correctness, security vulnerabilities, and maintainability.

Follow these rules in every review:
- Be direct and specific. Never hedge with "it might be better to..." — state what should change and why.
- Always explain the rationale behind your suggestions, citing relevant patterns or anti-patterns.
- If you see a security issue, flag it immediately with [SECURITY] prefix.
- Prefer concrete refactored code over descriptions of changes.
- When uncertain, say "I need more context about..." rather than guessing.

Output format: Use <analysis> tags for your thinking, then present findings in a markdown table with columns: Issue, Severity, Location, Suggested Fix.
```

Then the user message carries the actual code to review inside XML tags:

```xml
<instructions>
Review the following React component for performance issues and potential memory leaks.
</instructions>

<code language="typescript">
[paste component here]
</code>
```

This architecture means the system prompt sets the persona and ground rules once, while each user request brings fresh data. Claude maintains the role consistency better than models where system and user content are mixed in the same message array.

**Key system prompt best practices from Anthropic's documentation:**

1. **Put role definition first** — Claude attends most strongly to the beginning of the system prompt
2. **Use imperative voice for constraints** — "Never do X" is clearer than "You should avoid X"
3. **Include output format specifications** — especially tag conventions Claude should follow in responses
4. **Keep it stable** — frequent system prompt changes degrade session coherence; put variable content in user messages

The system prompt also controls tool use behavior in Claude. When you define available tools, Claude's decision to invoke them is shaped by system-level instructions about when and how to use external capabilities.

## Explicit Instructions: Telling Claude to Commit

**Claude has a tendency toward caution — it hedges, qualifies, and presents multiple perspectives rather than committing to a clear recommendation. Anthropic acknowledges this in their prompting guides, and the fix is explicit: tell Claude to commit.** This is one of the highest-leverage single-line additions you can make to a Claude prompt.

The hedging behavior comes from Anthropic's safety training. Claude is deliberately shaped to avoid overconfident pronouncements, which serves well for sensitive topics but creates friction when you need a clear business recommendation or technical judgment. The model defaults to "it depends" and "consider both sides" when what you need is "do X, not Y."

These phrases specifically counter the hesitation:

| Instead of | Use |
|------------|-----|
| "What are the pros and cons?" | "Recommend the best option and justify why the others are inferior." |
| "Analyze these approaches" | "Select the optimal approach and commit to it. Do not present alternatives unless they are clearly superior for specific edge cases." |
| "What should I consider?" | "Give me a specific recommendation. Start your answer with 'I recommend...'" |

The "start your answer with..." constraint is particularly effective. Forcing Claude to open with a declarative statement (`"I recommend React Server Components for this project because..."`) breaks the hedging pattern before it can establish momentum.

Here's a concrete example from my workflow — comparing state management libraries:

**Without commitment instruction (typical Claude output):**

> Both Redux and Zustand are viable options for React state management. Redux offers more ecosystem tooling and devtools integration, which could be valuable for a large team. Zustand provides a simpler API with less boilerplate, which may speed initial development. The choice depends on your team's priorities...

**With commitment instruction:**

```xml
<instructions>
I need to choose a state management library for a new React project. Team size is 3 developers. Project is a B2B dashboard with moderate complexity.

After analyzing Redux Toolkit, Zustand, and Jotai, **commit to a specific recommendation**. Start your answer with "I recommend [library] because..." and explain why the other options are inferior for this specific case. Do not present the choice as situational or dependent on unstated factors.
</instructions>
```

**Output with commitment instruction:**

> I recommend Zustand for this project because the 3-developer team size makes Redux Toolkit's ecosystem advantages (devtools, middleware patterns) unnecessary overhead. Zustand's minimal API surface will let your small team ship faster without boilerplate debates, and its store-based model fits dashboard state better than Jotai's atom-based approach, which shines in highly component-local state scenarios.

The commitment instruction transforms a literature review into a decision. For automation workflows where downstream logic depends on a clear choice, this single prompt edit is often the difference between usable output and manual reprocessing.

## Prefilling the Assistant Turn

**Prefilling — starting Claude's response with specific text — is a technique Anthropic enables in their API that OpenAI doesn't offer, and it's the most reliable way to force output format adherence.** By providing the first few tokens of the assistant's response in your API call, you lock Claude into a pattern it must continue.

The API structure looks like this:

```json
{
  "model": "claude-3-7-sonnet-20250224",
  "max_tokens": 4096,
  "messages": [
    {"role": "user", "content": "<instructions>Classify the sentiment...</instructions>"},
    {"role": "assistant", "content": "{\"sentiment\": \""}
  ]
}
```

Notice the assistant message with partial JSON. Claude must continue from that opening, which forces valid JSON output that starts with the sentiment key. This is dramatically more reliable than instruction-only formatting requests.

**Common prefilling patterns:**

| Goal | Prefill Text | Result |
|------|--------------|--------|
| Force JSON | `{` or `{"` | Valid JSON object |
| Force XML | `<response>` | XML-structured output |
| Set tone | "Here's the straightforward answer:" | Direct, unhedged response |
| Start list | "1. " | Numbered list format |
| Commit to view | "I recommend [X] because..." | Definitive recommendation |

Prefilling shines in production pipelines where parseable output is mandatory. When I built a content tagging pipeline that fed into an n8n workflow, prefilling with `{"tags": [` guaranteed I could parse the response with a JSON node instead of string manipulation. Without prefilling, Claude occasionally wrapped the JSON in markdown code fences or added explanatory preamble that broke the parser.

The constraint, of course, is that prefilling only works via API — it's not available in the consumer Claude interface or Claude Code's interactive mode. For automation workflows and agent systems, this makes the API essential even if you use the consumer app for drafting.

## Long-Context Strategies for Claude's 200K Window

**Claude's 200,000-token context window (available on Claude 3.5 Sonnet and Claude 3.7 Sonnet) is one of the largest in production, but raw size is less valuable than placement strategy.** Anthropic's own research confirms the "lost in the middle" effect — models attend more strongly to information at the beginning and end of context than to content in the middle. Claude mitigates this better than most, but smart placement still matters.

The canonical pattern for long-document work, straight from Anthropic's documentation, is:

1. **Instructions at the bottom** — the final thing Claude sees before generating
2. **Questions or tasks at the bottom** — adjacent to instructions
3. **Long documents at the top** — reference material, out of the way but accessible
4. **Quoted excerpts at the bottom** — specific passages to focus on, near the task

This structure looks like:

```xml
<document>
[Full 50-page PDF pasted here]
</document>

<context>
You are analyzing quarterly earnings reports for investment research.
</context>

<quoted_excerpts>
> "Revenue grew 12% year-over-year, driven primarily by..."
> "Management anticipates headwinds in Q3 due to..."
</quoted_excerpts>

<instructions>
Based on the full document above and focusing especially on the quoted excerpts, answer: What are the three biggest risks mentioned for the coming quarter? Cite specific passages.
</instructions>
```

The `<quoted_excerpts>` section serves two purposes: it surfaces key content from potentially deep in the document, and it places that content near the instructions where Claude's attention is strongest. This "quote-then-answer" pattern is the recommended approach for document Q&A.

**Chunking strategy for very large documents:**

Even 200K tokens has limits. For documents that exceed the window, or when you need to process multiple large documents, Anthropic recommends:

| Approach | When to Use | Implementation |
|----------|-------------|----------------|
| Full document | Under ~150K tokens | Paste entire text, instructions at bottom |
| Chunked with retrieval | Multiple large docs | Pre-process to find relevant sections, include only those |
| Iterative analysis | Sequential processing | Process chunks separately, synthesize in final call |

For codebases specifically, Claude Code's implementation demonstrates the state of the art: it uses context summaries, file summaries, and selective full-text inclusion rather than dumping entire repositories. The 200K window fits substantial codebases, but curation still outperforms brute force.

The 200K window also enables new workflows that aren't viable with smaller contexts:

- **Full book analysis** — paste an entire technical book, ask specific questions
- **Multi-document legal review** — combine several contracts, compare terms
- **Long-form content transformation** — turn a 30,000-word report into a presentation deck
- **Extended conversation memory** — maintain 50+ turns of detailed technical discussion

Each of these benefits from the placement discipline: put the task last, the reference first, and specific excerpts adjacent to the task.

## Multishot Examples in XML Structure

**Few-shot prompting with Claude works best when examples are wrapped in clear XML tags and follow the exact output format you want repeated.** This is the technique covered in general terms in the [pillar prompt engineering guide](/blog/how-to-talk-to-ai-prompt-engineering-guide), but Claude's XML preference makes the implementation specific.

The pattern is consistent: wrap each example in its own tag, label input and output clearly, and keep the structure identical across examples. Claude picks up on the pattern faster when the container tags create visual separation.

**Classification task with three examples:**

```xml
<instructions>
Classify each support ticket by urgency (low, medium, high, critical).
</instructions>

<example>
<input>
Subject: How do I change my billing address?
Body: I moved recently and need to update where invoices are sent.
</input>
<output>low</output>
</example>

<example>
<input>
Subject: URGENT: Login not working
Body: I can't access my account and I have a client presentation in 30 minutes.
</input>
<output>high</output>
</example>

<example>
<input>
Subject: Data breach concern
Body: I think my account was compromised. I see logins from countries I've never visited.
</input>
<output>critical</output>
</example>

<input>
Subject: Feature request
Body: Would be great if you had dark mode for the dashboard.
</input>
```

The nested `<input>`/`<output>` structure within each `<example>` block makes the pattern explicit. Claude learns not just the classification logic but also the exact formatting — no explanation needed, no preamble requested.

**Key principles for multishot with Claude:**

1. **Use 2–5 examples** — One example often isn't enough for pattern recognition; more than five yields diminishing returns
2. **Cover the distribution** — Include edge cases and boundary examples, not just easy ones
3. **Keep structure identical** — If example 1 uses nested tags, all must; variance confuses pattern matching
4. **Label consistently** — `<input>` and `<output>` are conventional, but any clear labels work if consistent

For complex transformations where the output structure matters, showing the format via examples is more reliable than describing it. A prompt asking for JSON output with nested objects will misfire less often when preceded by two complete JSON examples in `<example>` blocks than when followed by a JSON schema description.

## Claude Code and API Integration Patterns

**Claude Code, Anthropic's terminal-native coding agent released in early 2025, uses the same XML-structured prompting internally that the API exposes — watching Claude Code's verbose mode reveals production-grade prompt patterns.** The tool accepts natural language commands but translates them into structured prompts with `<task>`, `<file_context>`, and `<environment>` tags before sending to the model.

When working with Claude Code directly, you can use the same XML patterns. A complex refactoring request benefits from structure:

```
$ claude "<instructions>Refactor the authentication middleware to use JWT instead of session cookies</instructions>

<context>
- This is an Express.js application
- Current implementation is in src/middleware/auth.js
- Must maintain backward compatibility for API keys during transition
</context>

<files>
<file path="src/middleware/auth.js">
[paste current code]
</file>
<file path="src/config/jwt.js">
[paste JWT config]
</file>
</files>"
```

Claude Code's context gathering automatically populates `<files>` tags with relevant code from your repository, demonstrating the production pattern: isolate task, context, and source materials in distinct XML blocks.

**API integration best practices:**

| Pattern | Implementation | Why It Works |
|---------|---------------|--------------|
| System + user separation | System for persona, user for XML-structured task | Stable role, variable data |
| Thinking budgets | `thinking: {type: "enabled", budget_tokens: 2048}` | Controlled reasoning depth |
| Tool definitions | Structured tool schemas in system prompt | Reliable function calling |
| Streaming | `stream: true` with partial chunk handling | Real-time UX |

For production API integrations, Anthropic's Python and TypeScript SDKs handle the XML structuring automatically when you use their message formatting helpers. But knowing the underlying pattern matters for debugging — when Claude behaves unexpectedly, inspecting the raw XML it received often reveals the issue.

The Claude Max plan ($100/$200 tiers) launched this quarter offers higher rate limits and priority access, making API-intensive workflows practical at scale. For automation pipelines processing hundreds of prompts per hour, the rate limit differential between standard and Max tiers is often the bottleneck.

## The Do's and Don'ts of Claude Prompting

**After months of production use across hundreds of Claude prompts, these are the patterns that consistently move the needle versus the ones that waste tokens.** This table synthesizes the Anthropic documentation recommendations with field-tested adjustments.

| Do | Don't | Why |
|----|-------|-----|
| Wrap inputs in `<document>`, `<article>`, `<code>` tags | Paste raw text without delimiters | Tags help Claude distinguish data from instructions |
| Put instructions at the end of long prompts | Bury instructions in the middle | "Lost in the middle" — Claude attends to start and end |
| Tell Claude explicitly to "commit to a recommendation" | Ask for "analysis" or "comparison" without direction | Claude defaults to hedging; force decisiveness |
| Use `<thinking>` tags for reasoning tasks (Claude 3.7) | Assume reasoning happens automatically | Extended thinking requires explicit enablement or tagging |
| Provide 2–5 examples in `<example>` blocks | Describe desired format without showing it | Claude learns patterns faster from demonstration |
| Use prefilling via API for parseable output | Rely on format instructions alone | Prefilling locks in structure mechanically |
| Keep system prompts stable, vary user messages | Change system prompts frequently | Claude maintains coherence better with stable personas |
| Quote relevant excerpts near the question | Reference "the document above" vaguely | Specific quotes focus attention |
| Set thinking budgets appropriately | Enable extended thinking for everything | Budget controls cost/latency tradeoff |
| Request XML-structured responses | Ask for "structured data" generically | Specificity removes parser ambiguity |

The single most common mistake I see is treating Claude like GPT-4o — writing loose, conversational prompts without structural discipline. Both models are frontier-capable, but GPT-4o is forgiving where Claude is strict. The payoff for structure with Claude is higher precision, less hallucination, and more predictable formatting. The cost is the extra typing to add tags.

A less obvious anti-pattern is over-constraining with negative instructions. "Don't be verbose" is less effective than "Answer in 1–2 sentences." Claude responds better to positive constraints (what to do) than negative ones (what to avoid). Frame constraints as targets, not prohibitions.

## Frequently Asked Questions

### Do I need to use XML tags for every Claude prompt?

**No, but structured prompts outperform unstructured ones on complex tasks.** Simple questions (`"What is the capital of France?"`) don't need tags. But for document analysis, transformation tasks, or any prompt with multiple input types, the separation XML provides measurably improves reliability. Anthropic's own API examples use XML pervasively — it's the documented best practice, not an optional add-on.

### What's the difference between Claude 3.5 Sonnet and Claude 3.7 Sonnet?

**Claude 3.7 Sonnet adds hybrid reasoning with extended thinking mode, launched February 24, 2025.** The 3.5 version remains excellent for most tasks and is more cost-effective. Claude 3.7 pulls ahead on math, logic puzzles, multi-step planning, and tasks where showing reasoning matters. For routine text transformation or classification, 3.5 Sonnet is still the right choice. For complex analysis or when you need transparent reasoning steps, 3.7 with extended thinking enabled is worth the premium.

### How do I enable extended thinking mode?

**Via the API, add a `thinking` object with `type: "enabled"` and a `budget_tokens` value; in Claude Code, use the `--thinking` flag.** The budget controls how many tokens Claude allocates to reasoning before generating the visible response. In Anthropic's consumer interface, extended thinking appears as a toggle in the model selection dropdown. The feature is only available on Claude 3.7 Sonnet — earlier models don't support it.

### Why does Claude refuse to commit to answers?

**Anthropic's safety training makes Claude cautious by default.** The model is deliberately shaped to present multiple perspectives and avoid definitive statements on uncertain topics. To override this, add explicit instructions like "commit to a specific recommendation" or "start your answer with 'I recommend...'" The prefilling technique also forces commitment by starting Claude's response with a declarative opening.

### What's the best way to handle very long documents with Claude?

**Place the full document in `<document>` tags at the top, put instructions and questions at the bottom, and quote relevant excerpts just above the instructions.** This placement puts the task where Claude's attention is strongest while keeping the full reference available. For documents exceeding the 200K window, pre-process to extract relevant sections or use iterative analysis rather than trying to fit everything.

### Can I use Claude's XML patterns with other models?

**Yes, though the benefit is strongest with Claude.** GPT-4o and Gemini 2.5 Pro both handle XML-structured prompts reasonably well, but Claude was specifically trained with XML-heavy data and shows the most dramatic improvement. If you're using multiple models, test your prompts on each — a structure that helps Claude may not transfer perfectly to other architectures.

### How does prefilling work and when should I use it?

**Prefilling lets you provide the first tokens of Claude's response in the API call, forcing it to continue from that point.** Use it whenever you need parseable output (JSON, XML) or when you want to force a specific opening tone. It's the most reliable way to guarantee output format — more consistent than format instructions alone. Prefilling only works via API, not in the consumer chat interface.

### What thinking budget should I set for extended thinking mode?

**Start with 1,024 tokens for simple reasoning tasks, 4,096 for standard analysis, and 16,000+ for complex proofs or research synthesis.** The budget trades cost and latency for depth. Anthropic charges for thinking tokens, so over-budgeting wastes money. Monitor whether the thinking block is actually adding value — if Claude's reasoning is redundant, reduce the budget.

### How is Claude Code different from using the Claude API directly?

**Claude Code is a terminal-native agent that wraps the API with context gathering, tool use, and session management.** It automatically collects relevant files from your codebase, structures them in XML tags, and manages multi-turn interactions. The prompting principles are identical — Claude Code uses XML-structured prompts internally — but the tool handles the formatting and context assembly for you. For automation workflows, use the API directly; for interactive coding assistance, Claude Code saves significant setup.

### Should I still use chain-of-thought prompts with Claude 3.7's extended thinking?

**With extended thinking enabled, you don't need to add "think step by step" — Claude 3.7 does this internally.** However, requesting `<thinking>` tags in standard mode (without extended thinking enabled) still helps on reasoning tasks. The two approaches differ: extended thinking is internal, budgeted, and not visible by default; explicit `<thinking>` tags produce visible scratchpad content. Use extended thinking for deep analysis where the reasoning matters; use explicit tags for tasks where you want to inspect or surface the reasoning chain.

---

**Ready to put these prompting patterns to work in your automation stack?** I build custom AI agents and n8n workflows that wire Claude's structured reasoning into production pipelines — from document analysis to code review automation. If you've got a process that needs reliable, structured AI output, [book an AI automation strategy call](/contact) and I'll show you what the implementation looks like.

**Keep exploring the prompt engineering cluster:**
- [How to Talk to AI: The Complete Prompt Engineering Guide](/blog/how-to-talk-to-ai-prompt-engineering-guide)
- [Prompting ChatGPT: OpenAI Best Practices](/blog/prompting-chatgpt-openai-best-practices)
- [Prompting Gemini: Google's Long-Context Playbook](/blog/prompting-gemini-google-long-context)
- [Structured Output Prompting: JSON, XML, and Schemas](/blog/structured-output-prompting-json-xml-schemas)
- [Prompt Engineering for Coding Agents](/blog/prompt-engineering-for-coding-agents)
