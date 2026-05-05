Querying perplexity using sonar-pro for: Anthropic Tool Use GA generally available May 30 2024 Claude API function calling schema format parallel tool use with maxTokens: 8000
### Anthropic Tool Use General Availability (GA)

Anthropic's **tool use** (also known as function calling) for Claude models reached **general availability (GA)** in **May 2024**, specifically announced around **May 30, 2024**. This is supported by historical context from Anthropic's announcements and integrations, though the provided search results reference more recent developments building on this foundation (e.g., [2] discusses GA on Anthropic API, Amazon Bedrock, and Google Vertex AI, with advanced features like streaming, forced use, and vision).

#### Key Details from Launch
- **Announcement Date**: May 30, 2024 – Tool use became GA in the Claude API, enabling Claude to intelligently select, orchestrate, and execute tools for complex, end-to-end tasks.
- **Platforms**: Immediately available on:
  - Anthropic API
  - Amazon Bedrock
  - Google Vertex AI
- **Core Capabilities**:
  - **Intelligent Tool Selection & Orchestration**: Claude decides which tools to use, passes correct parameters, and chains calls (e.g., for multi-step reasoning).
  - **Parallel Tool Use**: Supported from GA. Claude can invoke multiple tools simultaneously to reduce latency (e.g., running 100 sub-agents in parallel to process different book chapters, as in [2]).
  - **Streaming**: Real-time responses during tool execution.
  - **Forced Use**: Explicitly require tool calls.
  - **Vision Support**: Tools work with image inputs.

#### Function Calling Schema Format
Anthropic uses a **JSON-based schema** for defining tools, similar to OpenAI's format but optimized for Claude's reasoning. Here's the standard structure (unchanged since GA in 2024, per Anthropic docs):

```json
{
  "name": "string",  // Unique tool name (e.g., "get_weather")
  "description": "string",  // Natural language description for Claude to understand when/why to use it
  "inputSchema": {
    "type": "object",
    "properties": {
      // e.g.,
      "location": {
        "type": "string",
        "description": "City name, e.g., San Francisco"
      }
    },
    "required": ["location"]  // Required params
  }
}
```

- **Full Example Tool Definition** (array of tools passed to API):
  ```json
  {
    "tools": [
      {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "inputSchema": {
          "type": "object",
          "properties": {
            "location": { "type": "string" }
          },
          "required": ["location"]
        }
      }
    ]
  }
  ```
- **API Usage** (Python example with `anthropic` SDK):
  ```python
  import anthropic

  client = anthropic.Anthropic()
  response = client.messages.create(
      model="claude-3-5-sonnet-20240620",  # Or latest model
      max_tokens=1024,
      tools=[{...tool_schema...}],  # Pass tools here
      messages=[{"role": "user", "content": "What's the weather in SF?"}]
  )
  # Response includes tool_calls: list of dicts with name, input, id
  ```
- **Tool Response Handling**: Claude outputs `tool_calls` in `response`. You execute them server-side, then append `tool_result` back to the conversation:
  ```json
  {
    "role": "user",
    "content": [{"type": "tool_result", "tool_use_id": "call_id", "content": "Sunny, 72°F"}]
  }
  ```

#### Advanced Features (Post-GA Evolutions, per 2026 Updates)
From recent sources like [2], [6], and [7]:
- **Parallelization**: Native support for concurrent tool calls (e.g., 100+ sub-agents).
- **Tool Search Tool**: New in advanced tool use – Claude searches thousands of tools without bloating context (avoids 100K+ token overhead from large tool lists).
- **Specialization**: Use "tool suite experts" – dedicate agents to tool subsets (e.g., one for GitHub/Jira, another for databases).
- **Enterprise Scale**: Handles 100s–1000s of tools (e.g., IDE assistants with git, npm, testing; ops coordinators with Slack, Drive, etc.).
- **Self-Guided Course**: Anthropic offers a free course on tool use: [Anthropic Tool Use Course](https://www.anthropic.com/engineering/advanced-tool-use) (linked in [2]).

#### Recent Context (2026)
- Fully restored in U.S. federal use after injunction ([1]).
- Powers tools like **Claude Code** ([3], [4], [5]), with GA tool use enabling 80% self-generated code.
- Warnings on vulnerabilities in AI-generated code from tools like Claude Code ([5]).

For the absolute latest schema or API changes, check [Anthropic Docs](https://docs.anthropic.com/en/docs/tool-use) or their [Engineering Blog](https://www.anthropic.com/engineering/advanced-tool-use). If you need code samples or integration help, provide more details!