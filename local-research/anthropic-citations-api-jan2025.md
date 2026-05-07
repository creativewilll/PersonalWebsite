Querying perplexity using sonar-pro for: Anthropic Citations API launch January 2025 Claude source attribution feature documentation how it works with maxTokens: 21000
### Anthropic Citations API: Launch and Overview

Anthropic launched the **Citations API** in **January 2025** (announced around January 23-24, 2025), as an API-only feature for their Claude models. It's designed to improve reliability in Retrieval-Augmented Generation (RAG) systems by automatically extracting and including precise citations from provided source documents in Claude's responses. This reduces hallucinations by grounding answers in "exact sentences and passages" from sources like PDFs or plain text files. It's particularly useful for document summarization, Q&A, and customer support apps.

**Supported Models**: Available only on **Claude 3.5 Sonnet** (e.g., `claude-3-5-sonnet-20241022`) and **Claude 3.5 Haiku**. Also integrated with Google Vertex AI.

**Pricing**: Uses standard API pricing; not free. Example: A ~100-page doc costs ~$0.30 (Sonnet) or ~$0.08 (Haiku).

**Availability**: Live on Anthropic API and Vertex AI as of launch.

### How It Works
1. **Input Structure**: You provide source documents and enable citations in the API request. Documents are chunked into **sentences** automatically (or you can pre-chunk them).
2. **Processing**:
   - Chunked sentences + user context + query are fed to Claude.
   - Model analyzes the query and generates a response.
   - For claims derived from sources, Claude automatically inserts **citations** referencing the exact source chunks.
3. **Output**: Response includes structured citations (e.g., in JSON). Cited text links back to source documents, boosting trust and recall accuracy (up to 15% improvement per Anthropic evals; one user reported hallucination drop from 10% to 0%).

**Key Benefits** (from Anthropic and users):
- Handles hard parts of RAG citation extraction—no complex prompt engineering needed.
- Increases references per response (e.g., +20% in one financial research case).
- Minimizes errors in enterprise/dev workflows.

### Example Usage (Python with Anthropic SDK)
Updated SDK supports it (install via `pip install anthropic` or `uv`).

```python
import os
import json
from anthropic import Anthropic

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

text = "Your source document text here..."  # Or load PDF/plain text

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "document",
                    "source": {
                        "type": "text",
                        "media_type": "text/plain",
                        "data": text,
                    },
                    "title": "My Document",
                    "context": "This is a trustworthy document.",
                    "citations": {"enabled": True}
                },
                {
                    "type": "text",
                    "text": "What were the top trends?"
                }
            ]
        }
    ]
)

print(json.dumps(response.to_dict(), indent=2))
```

The response will include citations in its structure, e.g., referencing specific sentences from `text`.

### Sources
- [Simon Willison (Jan 24, 2025)](https://simonwillison.net/2025/Jan/24/anthropics-new-citations-api/): Detailed API example and RAG context.
- [TechCrunch (Jan 23, 2025)](https://techcrunch.com/2025/01/23/anthropics-new-citations-feature-aims-to-reduce-ai-errors/): Launch announcement, pricing, models.
- [Enterprise AI World](https://www.enterpriseaiworld.com/Articles/News/News/Anthropic-Grounds-Claude-Outputs-with-New-Seamless-Citations-Feature-167789.aspx): Chunking process, user testimonials, evals.
- [Anthropic/HN Discussion](https://news.ycombinator.com/item?id=42807173): Confirms sentence chunking and anti-hallucination focus.

For official docs, check Anthropic's API reference (post-launch updates likely in their developer console). This feature remains relevant for RAG builds as of 2026.