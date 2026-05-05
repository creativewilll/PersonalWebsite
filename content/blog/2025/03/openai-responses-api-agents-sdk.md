---
title: "OpenAI Responses API + Agents SDK: The Post-Assistants Era"
slug: "openai-responses-api-agents-sdk"
date: "2025-03-11"
lastModified: "2025-03-11"
author: "William Spurlock"
readingTime: 34
categories:
  - "AI Agents and Automations"
tags:
  - "OpenAI"
  - "Responses API"
  - "Agents SDK"
  - "Assistants API"
  - "AI agents"
  - "function calling"
featured: false
draft: false
excerpt: "OpenAI launches Responses API and Agents SDK on March 11, 2025, sunsetting Assistants API v2. A major architectural shift from managed-state to bring-your-own-state agent building."
coverImage: "/images/blog/openai-responses-api-agents-sdk.png"
seoTitle: "OpenAI Responses API + Agents SDK Launch | William Spurlock"
seoDescription: "OpenAI just launched the Responses API and Agents SDK, sunsetting Assistants API v2. Learn why this is the biggest shift in agent architecture since function calling."
seoKeywords:
  - "OpenAI Responses API"
  - "OpenAI Agents SDK"
  - "Assistants API replacement"
  - "AI agent framework"
aioTargetQueries:
  - "what is OpenAI Responses API"
  - "OpenAI Agents SDK vs LangChain"
  - "Assistants API vs Responses API"
  - "how to build AI agents with OpenAI SDK"
contentCluster: "ai-agents-mcp"
pillarPost: false
parentPillar: "ai-agent-architecture-guide"
entityMentions:
  - "William Spurlock"
  - "OpenAI"
  - "Responses API"
  - "Agents SDK"
  - "Assistants API"
  - "LangChain"
  - "CrewAI"
serviceTrack: "ai-automation"
---

OpenAI just shipped the **Responses API** and **Agents SDK**, and it's the most significant architectural shift since they introduced function calling in 2023. Today, March 11, 2025, the company is officially sunsetting the Assistants API v2 in favor of a stateless, bring-your-own-state architecture that puts OpenAI in direct competition with LangChain, CrewAI, and Anthropic's emerging patterns.

## What Exactly Is the Responses API?

**The Responses API is OpenAI's new stateless primitive for building agentic applications, combining the simplicity of Chat Completions with the tool-use power of the Assistants API.** It represents a fundamental architectural shift from managed conversation state to bring-your-own-state flexibility.

At its core, the Responses API is a single-turn primitive that handles complex multi-step agent loops within one request. Unlike the Assistants API, which managed threads, runs, and conversation state on OpenAI's servers, the Responses API gives developers full control over state management while providing structured outputs for every step of an agent's reasoning process.

The key innovation is the **item-based design**. Where Chat Completions returns an array of `messages` with multiple concerns glued together, the Responses API returns typed `items`—discrete units representing messages, function calls, function outputs, reasoning steps, and tool invocations. Each response has a unique `id` and can be chained using `previous_response_id` to maintain context across turns.

```javascript
// Responses API: Item-based structure
const response = await openai.responses.create({
  model: "gpt-4o",
  tools: [{ type: "web_search_preview" }],
  input: "What's the latest in AI?",
  store: true  // Maintain state for chaining
});

// Access output items directly
console.log(response.output);  // Typed array of items
console.log(response.output_text);  // SDK helper for text extraction
```

The API supports multiple input formats—strings, message lists, or structured instructions—making it adaptable to various integration patterns. Crucially, the Responses API is a superset of Chat Completions: any model that works with Chat Completions works with Responses, but Responses adds built-in tools, better reasoning model support, and native agentic loops.

**Key architectural differences:**

| Aspect | Chat Completions | Responses API |
|--------|-----------------|---------------|
| State management | Manual | Optional (`store: true`) |
| Return structure | `choices[].message` | `output[]` items |
| Built-in tools | None | Web search, file search, computer use |
| Reasoning models | Limited tool support | Full tool support |
| Conversation chaining | Manual message array | `previous_response_id` |
| Storage | Opt-in | Default (disable with `store: false`) |

The Responses API is available to all developers today at standard token rates—there's no separate API pricing. OpenAI explicitly recommends it for all new integrations, though Chat Completions remains supported for existing applications that don't require built-in tools.

## From Managed State to Stateless Primitives: The Architecture Breakdown

**OpenAI has abandoned the managed-state paradigm that defined the Assistants API in favor of a bring-your-own-state architecture that gives developers explicit control over conversation context, tool history, and reasoning chains.** This is the most significant philosophical shift in OpenAI's API design since the introduction of function calling.

The Assistants API v2 managed conversation state through three core abstractions: `Assistant` (configuration), `Thread` (conversation container), and `Run` (execution instance). When you sent a message, OpenAI stored it, maintained the full context window, and handled retrieval, file search, and code interpreter state internally. This seemed convenient—less code to write—but introduced three critical production problems.

First, **state opacity**. You couldn't see exactly what context the model was receiving without polling the API and reconstructing threads. For debugging complex agent loops, this was maddening. Second, **vendor lock-in**. Your conversation state lived on OpenAI's servers, making it difficult to migrate, audit, or integrate with external systems. Third, **latency and cost overhead**. Every tool invocation required round-trips to OpenAI's state management layer, adding unnecessary latency for applications that already had their own state infrastructure.

The Responses API inverts this model entirely. Every call is stateless by default. You pass exactly the context you want—including previous response IDs if you want continuity—and you receive a complete, inspectable record of everything that happened: the model's reasoning, every tool call, every output, every intermediate step. Your application owns the state.

```javascript
// Assistants API: Opaque state management
const thread = await openai.beta.threads.create();
await openai.beta.threads.messages.create(thread.id, {
  role: "user",
  content: "Analyze this file and search the web for context"
});
const run = await openai.beta.threads.runs.create(thread.id, {
  assistant_id: assistant.id
});
// Poll for completion, state is invisible during execution

// Responses API: Explicit, inspectable state
const response = await openai.responses.create({
  model: "gpt-4o",
  tools: [
    { type: "file_search", vector_store_ids: ["vs_abc123"] },
    { type: "web_search_preview" }
  ],
  input: "Analyze this file and search the web for context",
  store: true
});
// Full visibility into every step
console.log(response.output);  // Every item is inspectable
```

This shift aligns OpenAI with how production agent systems are actually built. Serious applications—whether they're customer support bots, coding agents, or research assistants—already have databases, caches, and state management layers. They don't need OpenAI to store conversation history; they need clean primitives that integrate with their existing infrastructure.

**The architectural trade-offs are clear:**

| Concern | Assistants API (Managed State) | Responses API (Stateless) |
|---------|------------------------------|---------------------------|
| Setup complexity | Lower (OpenAI manages state) | Higher (you manage state) |
| Debugging visibility | Poor (opaque threads) | Excellent (explicit items) |
| Integration flexibility | Limited (tied to OpenAI) | Unlimited (bring your own) |
| Production control | Low | High |
| Latency for complex loops | Higher (state round-trips) | Lower (single request) |
| Migration portability | Difficult | Straightforward |

OpenAI's bet is that developers building production agents prefer control over convenience. Based on the community feedback that drove this redesign—complaints about thread debugging, state export limitations, and integration friction—that bet appears correct. The Responses API is what the Assistants API should have been from the start: a clean primitive that does one thing well, rather than a half-baked application framework.

## The Agents SDK: Python-First Orchestration Layer

**The Agents SDK is OpenAI's open-source Python framework for orchestrating multi-agent workflows, providing handoffs, guardrails, and built-in observability that transforms the Responses API from a primitive into a production agent architecture.** It's available today at `github.com/openai/openai-agents-python` and represents OpenAI's direct entry into the agent framework wars.

Unlike monolithic agent frameworks that try to handle everything from LLM calls to vector storage, the Agents SDK has a focused scope: orchestration. It assumes you're using the Responses API (or Chat Completions) for model interaction, and adds the control layer on top: agent definition, handoff routing, safety guardrails, and execution tracing.

The SDK's core abstraction is the `Agent`—a configured LLM with instructions, available tools, and handoff targets:

```python
from agents import Agent, Runner, WebSearchTool, function_tool

@function_tool
def submit_refund_request(item_id: str, reason: str) -> str:
    # Your business logic here
    return f"Refund submitted for item {item_id}"

# Define specialized agents
support_agent = Agent(
    name="Support & Returns",
    instructions="You handle customer support and refund requests. Be empathetic and efficient.",
    tools=[submit_refund_request],
)

shopping_agent = Agent(
    name="Shopping Assistant",
    instructions="You help customers find products. Use web search for current information.",
    tools=[WebSearchTool()],
)

# Triage agent routes to specialists
triage_agent = Agent(
    name="Triage Agent",
    instructions="Route the user to the correct specialist based on their request.",
    handoffs=[shopping_agent, support_agent],
)

# Execute
output = Runner.run_sync(
    starting_agent=triage_agent,
    input="I need to return these shoes I bought last week"
)
```

**Handoffs** are the SDK's signature feature. When an agent has `handoffs` configured, those destinations appear as tools to the LLM. The model decides when to transfer control based on the conversation context. Handoffs can be customized with `tool_name_override`, `tool_description_override`, and `on_handoff` callbacks for logging or state management.

**Guardrails** provide configurable safety checks at three boundaries:

| Guardrail Type | When It Runs | Purpose |
|---------------|--------------|---------|
| Input guardrails | Before first agent execution | Validate user input, check for prompt injection, filter PII |
| Output guardrails | After final agent output | Validate responses, check policy compliance |
| Tool guardrails | On every custom function call | Validate tool inputs, rate limit external APIs |

Input guardrails support two execution modes: parallel (default, lower latency) or blocking (prevents token consumption if triggered). This is critical for production safety—you can reject toxic or malformed inputs before spending money on model inference.

**Tracing and observability** are built in and enabled by default. Every agent run, LLM generation, tool call, handoff, and guardrail execution is captured as a trace with full context. Traces export automatically to OpenAI's platform for visualization, or you can disable them via environment variable (`OPENAI_AGENTS_DISABLE_TRACING=1`) for sensitive deployments.

```python
from agents import set_tracing_disabled

# Disable tracing for privacy-critical applications
set_tracing_disabled(True)

# Or configure per-run
output = Runner.run_sync(
    starting_agent=agent,
    input="Sensitive query",
    run_config=RunConfig(tracing_disabled=True)
)
```

The SDK requires Python 3.10+ and installs via `pip install openai-agents`. Notably, it works with other model providers as long as they expose a Chat Completions-style endpoint—OpenAI isn't forcing vendor lock-in at the orchestration layer. Node.js support is promised but not yet available.

**Comparison to Swarm:** The Agents SDK is the successor to Swarm, OpenAI's experimental multi-agent framework from 2024. The SDK adds production essentials Swarm lacked: guardrails, comprehensive tracing, and a cleaner agent configuration API. If you built on Swarm, migration is straightforward but not automatic—the core concepts translate, but the implementation differs.

## Built-in Tools: Web Search, File Search, Computer Use

**OpenAI's Responses API ships with three production-grade built-in tools—web search, file search, and computer use—that eliminate the need for external vendors or custom implementations for common agent capabilities.** Each tool is available today, though computer use remains in research preview with tiered access restrictions.

### Web Search

The web search tool gives agents real-time information access with inline citations. It's powered by the same model underlying ChatGPT search and achieves 90% accuracy on SimpleQA for GPT-4o and 88% for GPT-4o-mini—significantly outperforming previous approaches.

```javascript
const response = await openai.responses.create({
  model: "gpt-4o",
  tools: [{ type: "web_search_preview" }],
  input: "What was a positive news story that happened today?"
});

console.log(response.output_text);
// Returns: Summarized answer with [1], [2] citation markers
// Citations include source URLs for verification
```

Web search is available to all developers in preview. The tool can be combined with other tools or function calls in the same request, enabling agents that research and then act. Pricing starts at $30 per thousand queries for GPT-4o search and $25 for GPT-4o-mini search—competitive with dedicated search APIs when you factor in the elimination of infrastructure costs.

**Key capabilities:**
- Real-time web crawling with freshness guarantees
- Automatic citation generation with source links
- Query optimization (the model reformulates queries for better results)
- Integration with other tools (search, then call functions based on findings)

### File Search

The file search tool provides RAG (retrieval-augmented generation) over document collections without requiring external vector databases or embedding pipelines. It supports multiple file types, metadata filtering, custom reranking, and automatic query optimization.

```javascript
// Create a vector store
const productDocs = await openai.vectorStores.create({
  name: "Product Documentation",
  file_ids: [file1.id, file2.id, file3.id]
});

// Search within the Responses API
const response = await openai.responses.create({
  model: "gpt-4o-mini",
  tools: [{
    type: "file_search",
    vector_store_ids: [productDocs.id],
    max_num_results: 10
  }],
  input: "What's our refund policy for international orders?"
});
```

File search pricing is $2.50 per thousand queries with storage at $0.10/GB/day (first GB free). For many use cases—customer support agents, internal knowledge bases, legal document analysis—this eliminates the need for Pinecone, Weaviate, or custom Elasticsearch setups.

The tool includes sophisticated retrieval features:
- **Query optimization**: The LLM rewrites queries for better semantic matching
- **Metadata filtering**: Narrow searches by file type, date, author, or custom metadata
- **Custom reranking**: Configure how results are ordered before being sent to the model
- **Direct API access**: New Vector Store search endpoint for use outside the Responses API

### Computer Use

The computer use tool is the most ambitious—and most restricted—of the three. It provides agents with the ability to control a computer environment through mouse and keyboard actions, powered by the same Computer-Using Agent (CUA) model that drives OpenAI's Operator product.

**Benchmark performance (as of March 2025):**

| Benchmark | CUA Score | Previous SOTA | Human Baseline |
|-----------|-----------|---------------|----------------|
| OSWorld (full computer use) | 38.1% | 22.0% (Anthropic) | 72.4% |
| WebArena (browser automation) | 58.1% | 36.2% | 78.2% |
| WebVoyager (web interactions) | 87.0% | 56.0% | — |

The 38.1% OSWorld score is state-of-the-art for autonomous agents but clearly indicates this is research preview territory—human oversight is strongly recommended for production deployments.

```javascript
const response = await openai.responses.create({
  model: "computer-use-preview",
  tools: [{
    type: "computer_use_preview",
    display_width: 1024,
    display_height: 768,
    environment: "browser"  // or "mac", "windows", "ubuntu"
  }],
  truncation: "auto",
  input: "I'm looking for a new camera. Help me find the best one."
});

// The response includes mouse/keyboard actions to execute
console.log(response.output);
```

Computer use is currently restricted to usage tiers 3-5 with pricing at $3/1M input tokens and $12/1M output tokens. OpenAI has implemented safety mitigations including prompt injection detection, confirmation prompts for sensitive actions, and environment isolation tools—but the system card explicitly warns against unsupervised deployment.

**Tool comparison and selection guide:**

| Tool | Status | Best For | Pricing |
|------|--------|----------|---------|
| Web search | Preview | Research agents, shopping assistants, current events | $25-30/1K queries |
| File search | GA | Knowledge bases, document Q&A, support agents | $2.50/1K queries + storage |
| Computer use | Research preview | Browser automation, legacy system integration | $3/1M input, $12/1M output |

## Why OpenAI Is Killing the Assistants API

**The Assistants API v2 is being deprecated with a target sunset date in mid-2026 because its managed-state architecture created unsustainable technical debt and developer friction that couldn't be resolved without a fundamental redesign.** OpenAI is providing 12 months of support for migration, but the direction is clear: the Responses API represents the future of agent development on OpenAI's platform.

The decision follows two years of feedback from developers building production applications on the Assistants API. The beta period revealed three architectural flaws that became increasingly problematic as agent use cases matured.

**First: The thread model was too opinionated.** The Assistants API forced a specific conversation structure—messages organized in threads with a rigid role system—that didn't map well to real-world agent architectures. Multi-agent systems, parallel tool execution, and non-linear conversation flows all required fighting against the thread abstraction rather than working with it. Developers frequently reported needing to create artificial thread structures or maintain parallel state systems to represent what was actually happening in their applications.

**Second: State opacity made debugging production issues nearly impossible.** When an Assistants API run failed or produced unexpected results, you couldn't inspect exactly what context the model saw. The thread's full state was hidden behind the API—you could poll for messages, but you couldn't see the complete prompt construction, tool results formatting, or system instruction assembly. For production debugging, this was unacceptable.

**Third: The Assistants API tried to be an application framework rather than a clean primitive.** It included opinionated implementations of retrieval (with file search), code execution (with Code Interpreter), and conversation management that overlapped with what developers already had in their stacks. Rather than providing composable building blocks, it offered a monolithic take-it-or-leave-it architecture.

The migration timeline gives developers until mid-2026 to move existing applications. OpenAI has committed to achieving feature parity between Assistants and Responses—including Assistant-like and Thread-like objects and Code Interpreter support—before formally announcing deprecation. Until that announcement, new models will continue shipping to the Assistants API.

**What's being preserved:**
- Vector stores and file search capabilities (migrating to Responses API)
- Code Interpreter functionality (coming to Responses API)
- Conversation continuity (via `previous_response_id` and Conversations API)

**What's being abandoned:**
- The thread/run/message abstraction
- Server-side conversation state management
- The "Assistant" as a persistent server-side configuration
- Opaque state that can't be inspected or exported

For teams currently running on Assistants API, the migration path is clear but not urgent. OpenAI's guidance is to build new features on the Responses API while maintaining existing Assistants API implementations until the formal deprecation announcement. When that announcement comes, a migration guide will provide pathways to preserve data and migrate applications without loss of functionality.

The decision to sunset Assistants API rather than maintain parallel APIs reflects OpenAI's broader strategy: provide clean, composable primitives and let developers build application frameworks on top. The Agents SDK is the template—open source, optional, and built on top of Responses rather than bundled with it.

## Comparing Agents SDK vs LangChain vs CrewAI

**OpenAI's Agents SDK enters a crowded agent framework landscape dominated by LangChain and CrewAI, with smaller players like LlamaIndex and AutoGen already established.** The choice between these frameworks now depends on your vendor preference, deployment environment, and whether you need the built-in tools OpenAI provides.

The Agents SDK differentiates itself through three design decisions: tight integration with OpenAI's built-in tools, minimal scope (orchestration only, not an application framework), and first-class observability. LangChain and CrewAI offer broader model support and more mature ecosystems, but carry the complexity of abstraction layers designed for a pre-built-in-tools era.

**Head-to-head comparison:**

| Capability | OpenAI Agents SDK | LangChain/LangGraph | CrewAI |
|-----------|-------------------|---------------------|--------|
| **Primary models** | OpenAI (others via compat) | Any LLM | Any LLM |
| **Built-in tools** | Native web/file/computer use | External integration only | External integration only |
| **Multi-agent orchestration** | Handoffs (model-driven) | LangGraph state machines | Crew-based workflows |
| **Guardrails** | Built-in input/output/tool | LangChain callbacks | Custom validation |
| **Observability** | Built-in tracing to OpenAI | LangSmith (paid) | Limited |
| **Language support** | Python (Node.js coming) | Python, JS/TS, Java | Python |
| **Scope** | Orchestration layer only | Full application framework | Full application framework |
| **Maturity** | New (March 2025) | Mature (3+ years) | Established (2+ years) |
| **Vendor lock-in** | Medium (OpenAI tools) | Low | Low |
| **Learning curve** | Low | High | Medium |

**When to choose the Agents SDK:**

The Agents SDK is the right choice when you're building on OpenAI models and want to leverage the built-in tools without managing external integrations. If your application needs web search, file search, or computer use (once it exits preview), the SDK provides these with zero configuration. The built-in tracing also makes it ideal for teams that want observability without adding LangSmith or another paid service.

The SDK's minimal scope is an advantage for teams that already have infrastructure for vector stores, databases, and deployment—they can adopt just the orchestration layer without buying into a full framework. Coinbase's AgentKit integration, completed in hours rather than days, exemplifies this pattern.

**When to choose LangChain/LangGraph:**

LangChain remains the better choice for multi-model applications or teams committed to model-agnostic architecture. If you need to switch between OpenAI, Anthropic, Google, and open-source models based on cost or capability, LangChain's abstractions pay off. LangGraph's state machine approach to multi-agent workflows is also more explicit than the Agents SDK's handoff model—better for complex flows where you need deterministic control over agent transitions.

LangChain's ecosystem maturity matters for production: integrations with dozens of vector stores, document loaders, and external tools are battle-tested and well-documented. The Agents SDK will need time to reach similar coverage.

**When to choose CrewAI:**

CrewAI excels for process-oriented agent workflows where you want to define explicit roles, tasks, and collaboration patterns. The "crew" metaphor—agents with specific roles working together on defined tasks—maps well to business process automation. If you're building a research team simulation or a content creation pipeline with distinct roles (researcher, writer, editor), CrewAI's opinionated structure saves design decisions.

**The interoperability reality:**

These frameworks aren't mutually exclusive. The Agents SDK works with any Chat Completions-compatible endpoint, so you could use it for OpenAI-specific orchestration while using LangChain for other providers. Conversely, LangChain can call the Responses API through its OpenAI integration, though you'd lose some of the SDK's conveniences like `output_text` helpers.

The real competition isn't between frameworks—it's between architectural approaches. OpenAI is betting that built-in tools + clean primitives wins over abstraction layers that normalize across providers. LangChain and CrewAI are betting that model flexibility and ecosystem breadth matter more than tight vendor integration. Both bets have merit; the choice depends on whether you prioritize capability depth (Agents SDK) or architectural flexibility (LangChain/CrewAI).

## Migration Path: Moving from Assistants API to Responses

**Migrating from the Assistants API to the Responses API requires reconceptualizing how state is managed, but the actual code changes are straightforward once you understand the mapping between the two paradigms.** This section provides concrete migration patterns for common Assistants API usage patterns.

The core mental shift is from "OpenAI manages conversation state" to "I manage conversation state." Every Assistants API concept maps to a Responses API equivalent, but the responsibilities are redistributed.

**Concept mapping:**

| Assistants API | Responses API Equivalent | Key Difference |
|---------------|-------------------------|--------------|
| `Assistant` | Agent configuration object | Stored locally, not server-side |
| `Thread` | Array of messages or `previous_response_id` | You manage persistence |
| `Run` | Single `responses.create()` call | Synchronous or polled, no "run" object |
| `Message` | `input` string or message list | Direct parameter, not API object |
| `RunStep` | Items in `response.output` | Fully inspectable |
| File search | `file_search` tool in `tools` array | Vector stores still used |
| Code Interpreter | Coming soon to Responses | Not yet available |

**Migration pattern 1: Simple chatbot**

```javascript
// Assistants API pattern
const thread = await openai.beta.threads.create();

await openai.beta.threads.messages.create(thread.id, {
  role: "user",
  content: userMessage
});

const run = await openai.beta.threads.runs.create(thread.id, {
  assistant_id: assistantId
});

// Poll for completion
let completedRun = await pollForCompletion(thread.id, run.id);
const messages = await openai.beta.threads.messages.list(thread.id);
const response = messages.data[0].content[0].text.value;

// Responses API equivalent
const response = await openai.responses.create({
  model: "gpt-4o",
  instructions: "You are a helpful assistant.",
  input: userMessage,
  store: true
});

const text = response.output_text;
const responseId = response.id;  // Save for next turn

// Subsequent message with context
const followUp = await openai.responses.create({
  model: "gpt-4o",
  instructions: "You are a helpful assistant.",
  input: nextUserMessage,
  previous_response_id: responseId,  // Maintains context
  store: true
});
```

**Migration pattern 2: File search assistant**

```javascript
// Assistants API pattern
const assistant = await openai.beta.assistants.create({
  name: "Documentation Helper",
  instructions: "Answer questions using the provided documentation.",
  model: "gpt-4o",
  tools: [{ type: "file_search" }],
  tool_resources: {
    file_search: { vector_store_ids: [vectorStoreId] }
  }
});

const thread = await openai.beta.threads.create();
await openai.beta.threads.messages.create(thread.id, {
  role: "user",
  content: "How do I configure the API?"
});

const run = await openai.beta.threads.runs.create(thread.id, {
  assistant_id: assistant.id
});

// Responses API equivalent
const response = await openai.responses.create({
  model: "gpt-4o",
  instructions: "Answer questions using the provided documentation.",
  tools: [{
    type: "file_search",
    vector_store_ids: [vectorStoreId],
    max_num_results: 10
  }],
  input: "How do I configure the API?",
  store: true
});

// Full visibility into retrieved files
console.log(response.output);
// Contains: file_search_call item and message with citations
```

**Migration pattern 3: Multi-turn conversation with function calling**

```javascript
// Responses API with function calling
const tools = [
  {
    type: "function",
    function: {
      name: "get_order_status",
      description: "Get the status of a customer order",
      parameters: {
        type: "object",
        properties: {
          order_id: { type: "string" }
        },
        required: ["order_id"]
      }
    }
  }
];

const response = await openai.responses.create({
  model: "gpt-4o",
  tools: tools,
  input: "What's the status of order 12345?",
  store: true
});

// Check for function calls
const functionCall = response.output.find(
  item => item.type === "function_call"
);

if (functionCall) {
  // Execute your function
  const result = await getOrderStatus(
    JSON.parse(functionCall.arguments).order_id
  );
  
  // Continue the conversation with function result
  const finalResponse = await openai.responses.create({
    model: "gpt-4o",
    tools: tools,
    input: `The status of order 12345 is: ${result}`,
    previous_response_id: response.id,
    store: true
  });
}
```

**Breaking changes to handle:**

1. **No more server-side assistants**: Store your agent configurations (instructions, tools, model) in your own database or configuration files.

2. **No automatic thread persistence**: Use `store: true` for OpenAI-side storage of individual responses, or maintain your own conversation history.

3. **Different function calling shape**: The Responses API uses `response.output` with typed items instead of `choices[0].message.tool_calls`.

4. **Streaming differences**: The Responses API has its own streaming event format, distinct from Chat Completions' SSE format.

**Migration timeline recommendations:**

- **New projects**: Start on Responses API immediately
- **Active development**: Build new features on Responses API, maintain Assistants API for existing functionality
- **Production systems**: Wait for formal deprecation announcement (expected late 2025) before planning migration sprints
- **Legacy maintenance**: Continue using Assistants API until forced migration, but freeze new feature development

OpenAI has committed to providing a comprehensive migration guide with data preservation pathways before the mid-2026 sunset date. Until then, the dual-API approach is the pragmatic path.

## What This Means for Production Agent Builders

**The Responses API and Agents SDK fundamentally change how production agent systems should be architected, shifting responsibility for state management, observability, and error recovery from the platform to the application layer.** Teams building serious agent deployments need to adapt their patterns to leverage these new primitives effectively.

The most immediate production impact is the requirement for explicit state management. Where the Assistants API let you ignore conversation persistence—at the cost of opacity—the Responses API requires you to decide how and where state is stored. This is not merely a code change; it's an architectural decision with trade-offs.

**State management patterns for the Responses API:**

| Pattern | When to Use | Implementation |
|---------|-------------|----------------|
| **OpenAI-stored with `store: true`** | Simple applications, prototyping, low compliance requirements | Pass `store: true`, save `response.id` for `previous_response_id` |
| **Application-managed** | Production systems, compliance requirements, multi-provider setups | Store `response.output` items in your database |
| **Hybrid** | Audit requirements, cost optimization | Store in your DB, reference OpenAI storage for tracing |

For most production systems, I recommend application-managed state. It gives you full auditability, lets you implement custom retention policies, and enables conversation analysis without API calls. The trade-off is implementation complexity—you're responsible for context window management, token counting, and conversation pruning.

**New best practices for production agent architecture:**

1. **Implement response item logging**: Every response's `output` array contains valuable debugging information. Log these items to your observability platform (Datadog, Honeycomb, etc.) with structured formatting for analysis.

2. **Design for item-based context**: Instead of accumulating message arrays, accumulate item arrays. This preserves the full context of tool calls, reasoning steps, and intermediate outputs—not just the final messages.

3. **Leverage built-in tracing**: The Agents SDK's tracing exports to OpenAI's platform by default. For production monitoring, either integrate with their tracing API or disable it (`OPENAI_AGENTS_DISABLE_TRACING=1`) and use your own APM.

4. **Implement guardrail patterns**: Use input guardrails to reject expensive-to-process queries before token consumption. Design tool guardrails to prevent cascading failures when external APIs are down.

5. **Cache aggressively**: The Responses API improves cache utilization 40-80% over Chat Completions when used correctly. Structure your prompts with static prefixes and dynamic suffixes to maximize cache hits.

```javascript
// Cache-optimized prompt structure
const response = await openai.responses.create({
  model: "gpt-4o",
  instructions: SYSTEM_PROMPT,  // Static, cached
  input: [
    { role: "system", content: STATIC_CONTEXT },  // Cached
    { role: "user", content: dynamicQuery }  // Variable
  ],
  tools: tools,  // Tool definitions are cached
  store: true
});
```

**Production observability considerations:**

The shift from managed-state to bring-your-own-state requires new observability investments:

- **Conversation state monitoring**: Track context window utilization, token growth per conversation, and pruning effectiveness
- **Tool call tracing**: Log every tool invocation with latency, success/failure, and result size
- **Response item analysis**: Monitor the distribution of item types (messages vs. function calls vs. reasoning) to detect agent behavior changes
- **Cost attribution**: With state managed externally, you need explicit instrumentation to attribute costs to users, sessions, or features

**Error handling and recovery:**

The Responses API's stateless nature changes error handling patterns. Since there's no "run" object to poll, you handle failures directly:

```javascript
async function resilientAgentCall(input, previousResponseId = null) {
  const maxRetries = 3;
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      const response = await openai.responses.create({
        model: "gpt-4o",
        input: input,
        previous_response_id: previousResponseId,
        tools: agentTools,
        store: true
      });
      
      // Validate response structure
      if (!response.output || response.output.length === 0) {
        throw new Error("Empty response output");
      }
      
      return response;
    } catch (error) {
      attempt++;
      
      if (error.status === 429) {
        // Rate limit - exponential backoff
        await sleep(Math.pow(2, attempt) * 1000);
      } else if (error.status >= 500 && attempt < maxRetries) {
        // Server error - retry
        await sleep(1000);
      } else {
        throw error;  // Non-retryable or max retries exceeded
      }
    }
  }
}
```

**Compliance and data residency:**

The `store: false` option becomes critical for compliance-sensitive applications. When disabled, no conversation data is retained on OpenAI's servers beyond the immediate request processing. This simplifies GDPR, HIPAA, and SOC 2 compliance for the AI layer—though you're now responsible for securing the state you store yourself.

The production impact of today's launch is that building agents on OpenAI now requires the same infrastructure discipline as building any other production service: explicit state management, comprehensive observability, and resilient error handling. The platform no longer abstracts these concerns away, but it provides cleaner primitives to implement them correctly.

## The SDK Wars Are Officially On

**Today's launch marks the formal beginning of the SDK wars—a competitive battle for developer mindshare in the agent orchestration space that will reshape how AI applications are built over the next two years.** OpenAI has fired a direct shot across the bow of LangChain, CrewAI, and the emerging multi-agent framework ecosystem.

The competitive dynamics are clear. OpenAI is leveraging its position as the underlying model provider to offer an orchestration layer that competitors can't match in one critical dimension: native integration with built-in tools. When web search, file search, and computer use work out-of-the-box with zero configuration, that's a compelling advantage over frameworks that require external integrations.

**The competitive landscape as of March 2025:**

| Player | Position | Strengths | Vulnerability |
|--------|----------|-----------|---------------|
| **OpenAI Agents SDK** | New entrant with platform advantage | Built-in tools, tracing, clean API | Vendor lock-in, limited model support |
| **LangChain/LangGraph** | Incumbent with ecosystem | Model agnostic, mature ecosystem, LangGraph state machines | Complexity, abstraction overhead |
| **CrewAI** | Process automation specialist | Role-based design, business process fit | Narrower use case, smaller ecosystem |
| **LlamaIndex** | RAG specialist | Advanced retrieval, data connectors | Not a general agent framework |
| **Vercel AI SDK** | Frontend/edge focused | Streaming, React integration, edge deployment | Limited orchestration features |

The strategic significance of today's launch extends beyond technical features. OpenAI is making a statement: they intend to own the full developer experience for agent building, not just provide raw models. This mirrors AWS's strategy of providing both primitives (EC2) and higher-level services (Lambda, ECS)—capture developers at every abstraction level.

**What to expect in the coming months:**

1. **LangChain's response**: Expect LangChain to deepen its OpenAI integrations while emphasizing model portability. They may also accelerate LangGraph's development to differentiate from the Agents SDK's simpler handoff model.

2. **Consolidation of smaller players**: Frameworks without clear differentiation—whether based on specific verticals, deployment targets, or methodology—will face pressure. The market wants either maximum flexibility (LangChain) or maximum convenience (OpenAI).

3. **Microsoft's move**: With OpenAI's tight Microsoft relationship, expect GitHub Copilot and Azure AI to integrate the Agents SDK deeply. This could create a two-tier market: OpenAI/Microsoft tooling versus platform-agnostic alternatives.

4. **Standardization attempts**: The Model Context Protocol (MCP) launched by Anthropic in November 2024 becomes more significant now. If MCP gains traction as an interoperability standard, it could blunt OpenAI's built-in tool advantage by making external tools as seamless as native ones.

**The fundamental strategic question:**

Builders now face a choice that will have long-term consequences. Adopt the Agents SDK and get superior integration with OpenAI's evolving tool ecosystem, or stick with platform-agnostic frameworks and maintain flexibility at the cost of configuration overhead.

The economics favor OpenAI for teams already committed to their models. When you factor in the cost of integrating external search APIs, vector databases, and browser automation tools—plus the maintenance burden as those integrations evolve—the Agents SDK's built-in tooling represents real cost savings.

However, the risk of vendor lock-in is genuine. If you build deeply on the Agents SDK today, you're betting that OpenAI will remain the best model provider for your use cases. If Anthropic's Claude, Google's Gemini, or open-source models become superior for your agents, migration becomes costly.

The pragmatic path for most teams is a hybrid: use the Agents SDK for OpenAI-specific workflows (especially those leveraging built-in tools), while maintaining platform-agnostic abstractions for model selection and critical business logic. This preserves optionality without sacrificing productivity.

Today's launch doesn't immediately obsolete existing frameworks. LangChain's ecosystem maturity, CrewAI's process modeling, and LlamaIndex's retrieval capabilities remain valuable. But the direction of travel is clear: model providers are expanding upstack, and framework builders must differentiate on dimensions other than basic orchestration.

The SDK wars will ultimately benefit developers. Competition drives innovation in observability, debugging tools, and deployment patterns. But it also means framework choices carry more strategic weight than ever. Picking a horse in this race isn't just a technical decision—it's a bet on which platform will dominate the next phase of AI application development.

## Frequently Asked Questions

### What is the difference between Responses API and Assistants API?

**The Responses API is a stateless primitive that you manage; the Assistants API was a managed-state service that OpenAI managed.** The Responses API gives you explicit control over conversation context, tool execution, and reasoning chains through typed `items` in the response. The Assistants API hid these details behind `threads` and `runs`, which made debugging difficult and locked you into OpenAI's state management. The Responses API is the future; the Assistants API is being deprecated with a sunset date in mid-2026.

### Does the Agents SDK support JavaScript/TypeScript?

**Not yet—Python only today, but Node.js support is coming.** The Agents SDK (`openai-agents` on PyPI) requires Python 3.10 or newer. OpenAI has committed to adding JavaScript/TypeScript support but hasn't announced a timeline. In the meantime, JavaScript developers can use the Responses API directly or continue using the `openai` Node.js SDK with manual orchestration.

### What happened to threads and runs in the Assistants API?

**They don't exist in the Responses API.** The `Thread` abstraction is replaced by either passing `previous_response_id` to chain responses, or by managing your own message array. The `Run` object is replaced by a direct call to `responses.create()` that returns immediately with the full result (or streams if you enable streaming). You no longer poll for completion—it's synchronous by default.

### Is the Computer Use tool production-ready?

**No—it's a research preview requiring human oversight.** Computer use is currently restricted to usage tiers 3-5, and OpenAI's own benchmarks show 38.1% success on OSWorld tasks (compared to 72.4% human baseline). The tool is powerful for browser automation and legacy system integration, but the system card explicitly warns against unsupervised deployment. Use it for pilot projects with human-in-the-loop workflows, not autonomous production agents.

### How does the Responses API handle conversation history?

**Three options: OpenAI-stored via `store: true`, application-managed, or hybrid.** With `store: true`, OpenAI persists each response and you reference it via `previous_response_id` for the next turn. For production applications, I recommend application-managed state: store the `response.output` items in your own database, then pass them as the `input` for subsequent calls. This gives you full auditability and control.

### Will LangChain and CrewAI become obsolete?

**No, but their positioning changes.** LangChain remains valuable for multi-model applications and teams requiring model-agnostic architecture. CrewAI still excels for process-oriented workflows with explicit roles. However, for teams building on OpenAI models who want built-in tools without external integrations, the Agents SDK is now the most efficient path. Expect these frameworks to differentiate more sharply: LangChain on flexibility, CrewAI on process modeling, Agents SDK on OpenAI-native tooling.

### What is the pricing for the Responses API?

**Standard token rates—no separate API pricing.** You pay for input and output tokens at the same rates as Chat Completions. Built-in tools have additional per-use costs: web search is $25-30 per thousand queries, file search is $2.50 per thousand queries plus $0.10/GB/day for storage, and computer use is $3/1M input tokens and $12/1M output tokens. There are no base fees or subscription requirements.

### Can I mix the Responses API with custom orchestration?

**Absolutely—it's designed for this.** The Responses API is a primitive, not a framework. You can call it from your own orchestration code, use it alongside LangChain or CrewAI (they can call it as an LLM provider), or integrate it with workflow engines like n8n or Temporal. The Agents SDK is optional; many production teams will use the Responses API directly within their existing infrastructure.

### What models work with the Agents SDK?

**Primarily OpenAI models, with beta support for other providers.** The SDK works with GPT-4o, GPT-4o-mini, o1, o3-mini, and other OpenAI models through the Responses API or Chat Completions API. It can also work with other providers that expose a Chat Completions-compatible endpoint, though this is less tested. Built-in tools (web search, file search, computer use) only work with OpenAI models.

### How do guardrails work in the Agents SDK?

**Three types at different boundaries: input, output, and tool guardrails.** Input guardrails validate user messages before any LLM tokens are consumed, with parallel or blocking execution modes. Output guardrails check the final agent response. Tool guardrails validate every custom function call. They're configured as decorators or parameters when defining agents, and can trigger callbacks, raise exceptions, or modify outputs depending on your configuration.

### Should I migrate existing Assistants API projects today?

**Not urgently—new features on Responses, maintain Assistants for existing code.** OpenAI hasn't formally announced the deprecation yet, and new models will continue shipping to Assistants API until that announcement. The recommended approach: build new features on Responses API, keep existing Assistants API code running, and plan a migration sprint after the formal deprecation announcement when OpenAI releases their migration guide with data preservation pathways.

### What's next for OpenAI's agent ecosystem?

**Deeper integrations, more built-in tools, and enhanced observability.** OpenAI has stated they plan to release additional tools and capabilities over the coming months. Expect improvements to the computer use tool (general availability), additional built-in integrations, and possibly higher-level abstractions on top of the Responses API. The Agents SDK will also evolve—Node.js support is coming, and community contributions are expected as the open-source project matures.

---

## Building Agent Systems That Actually Ship

**Today's launch marks more than a product update—it signals OpenAI's commitment to owning the full agent development stack.** The Responses API and Agents SDK remove the friction that slowed production deployments: opaque state management, missing observability, and the patchwork of external tools required to make agents useful.

For teams I've worked with, the shift to stateless primitives with built-in tools changes the economics of agent deployment. Projects that needed weeks of integration work for search, retrieval, and browser automation now ship in days. The key is designing your state architecture up front—conversation persistence, context window management, and audit logging—rather than relying on the platform to handle it opaquely.

The SDK wars are just beginning. Whether you choose OpenAI's native tooling, stick with LangChain's flexibility, or mix both approaches, the imperative is the same: move from prototype to production with systems you can debug, monitor, and iterate on.

**Related reading:**
- [Anthropic MCP Launch: The Protocol Connecting AI to Everything](/blog/anthropic-mcp-launch-model-context-protocol) — How the Model Context Protocol creates interoperability between agents and external tools
- [OpenAI Operator and the $500B Stargate Project](/blog/openai-operator-stargate-launch) — The computer use foundation that powers both Operator and the new API tool

---

**Need help architecting your agent system?** I build custom AI automation and growth systems for teams who need agents that actually work in production—reliable, observable, and integrated with your existing infrastructure. [Book an AI automation strategy call](/contact) to discuss your use case.
