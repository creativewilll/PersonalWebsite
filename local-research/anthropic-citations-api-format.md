Querying perplexity using sonar-pro for: Anthropic Citations API JSON response format citations structure source document reference index with maxTokens: 21000
## Anthropic Citations API JSON Response Format

The Anthropic Citations API returns citations embedded within the `content` blocks of the API response. Here's the exact structure based on official documentation and examples:

### Core Response Structure
```json
{
  "id": "msg_01ABC...",
  "type": "message",
  "role": "assistant",
  "model": "claude-3-5-sonnet-20241022",
  "content": [
    {
      "type": "text",
      "text": "The grass is green and the sky is blue.[1][2]",
      "citations": [
        {
          "start_index": 16,
          "end_index": 21,
          "content_index": 0,  // References which document block (0-indexed)
          "quoted_content": "The grass is green.\n",
          "document_title": "My Document"
        },
        {
          "start_index": 36,
          "end_index": 45,
          "content_index": 0,
          "quoted_content": "The sky is blue.",
          "document_title": "My Document"
        }
      ]
    }
  ],
  "stop_reason": "end_turn",
  "usage": { ... }
}
```

### Key Citation Fields

| Field | Type | Description |
|-------|------|-------------|
| `start_index` | integer | Starting character index in the `text` where citation applies |
| `end_index` | integer | Ending character index in the `text` where citation applies |
| `content_index` | integer | Index of the document in `messages.content[]` array |
| `quoted_content` | string | Exact text snippet from source document used as citation |
| `document_title` | string | Title of the source document (from input) |

### How to Enable Citations

**Input format** (in `messages.content`):
```python
messages=[
  {
    "role": "user",
    "content": [
      {
        "type": "document",
        "source": {
          "type": "text",
          "media_type": "text/plain",
          "data": "The grass is green.\nThe sky is blue."
        },
        "title": "My Document",
        "context": "This is a trustworthy document.",
        "citations": {"enabled": True}  // Required
      },
      {
        "type": "text",
        "text": "What color is the grass and sky?"
      }
    ]
  }
]
```

### Rendering Citations (Common Pattern)

```python
def render_citations_with_text(content_block):
    """Convert Claude's citation format to human-readable with superscripts"""
    if content_block.get("type") != "text":
        return content_block["text"]
    
    text = content_block["text"]
    citations = content_block.get("citations", [])
    
    # Sort citations by start_index
    citations.sort(key=lambda c: c["start_index"])
    
    result = []
    last_end = 0
    
    for citation in citations:
        # Add text before citation
        result.append(text[last_end:citation["start_index"]])
        
        # Add citation marker [1]
        cited_text = citation["quoted_content"].strip()
        doc_title = citation["document_title"]
        result.append(f"<sup>[{citations.index(citation)+1}]</sup>")
        
        # Add text after citation marker
        last_end = citation["end_index"]
    
    # Add remaining text
    result.append(text[last_end:])
    
    return "".join(result) + "\n\n" + format_citation_list(citations)

def format_citation_list(citations):
    """Create footnote list"""
    footnotes = []
    seen = {}
    for i, citation in enumerate(citations, 1):
        key = (citation["content_index"], citation["start_index"])
        if key not in seen:
            seen[key] = len(footnotes) + 1
            footnotes.append({
                "id": len(footnotes) + 1,
                "text": citation["quoted_content"].strip(),
                "doc": citation["document_title"]
            })
    
    return "<ol>" + "".join(
        f"<li>{f['text']} <i>({f['doc']})</i></li>" 
        for f in footnotes
    ) + "</ol>"
```

### Multiple Documents Example
```json
"content": [
  {
    "type": "text",
    "text": "Trends from 2024[1] and 2025[2][3] show...",
    "citations": [
      {"content_index": 0, "quoted_content": "2024 trend data...", "document_title": "2024_Report"},
      {"content_index": 1, "quoted_content": "2025 prediction...", "document_title": "2025_Report"},
      {"content_index": 1, "quoted_content": "Another 2025 stat...", "document_title": "2025_Report"}
    ]
  }
]
```

**Key Benefits:**
- Precise character-level citation positioning
- Multiple citations per sentence possible
- Supports document caching (`cache_control: {"type": "ephemeral"}`)
- `quoted_content` shows exact source text used

This format enables building professional RAG applications with verifiable citations directly from Claude's API responses.