Querying perplexity using sonar-pro for: Google AI Studio updates July 2024 Gemini 1.5 Pro API improvements context window with maxTokens: 8000
### Gemini 1.5 Pro Context Window and API Improvements (as of July 2024)

Based on the provided search results, here's a summary of key updates for **Google AI Studio** and **Gemini 1.5 Pro** around June-July 2024, focusing on context window expansions, API enhancements, and related features. No specific "July 2024" updates are detailed in the results, but June 27 announcements directly impacted availability in AI Studio, with some rollouts extending into July.

#### 1M to 2M Context Window Rollout
- **Initial Announcement (Feb 2024)**: Gemini 1.5 Pro launched with a standard **128k token context window**. A **1M token experimental preview** was made available to limited developers/enterprise via AI Studio and Vertex AI ([source 5]).
- **May 14, 2024**: **2M token context window** introduced for Gemini 1.5 Pro (initially waitlist-only) ([sources 3, 4]).
- **June 27, 2024**: **General availability (GA)** for the **2M context window** on Gemini 1.5 Pro, now accessible to **all developers** via the Gemini API and **Google AI Studio**. This is the longest context window among major models at the time (e.g., vs. GPT-4o's 128k) ([sources 1, 2, 3, 4]).
  - Enables processing massive inputs like 1+ hour of video, 11+ hours of audio, or 700k+ words/codebases.
  - **Context Caching** launched alongside for Gemini 1.5 Pro/Flash to reduce costs on repeated tokens across prompts ([sources 1, 2]).

#### Code Execution Capabilities
- **June 27, 2024**: **Code execution** enabled for Gemini 1.5 Pro and 1.5 Flash in the **Gemini API** and **Google AI Studio** (under "advanced settings").
  - Model generates/runs Python code iteratively in a secure, offline sandbox (pre-installed numerical libraries like NumPy).
  - Billed only on output tokens; improves math/data reasoning ([sources 1, 2, 3]).

#### Google AI Studio-Specific Updates
- **June 27, 2024**: 
  - **Gemma 2** added for experimentation.
  - Full access to 2M context, code execution, and context caching ([source 1]).
- **Text Tuning for Gemini 1.5 Flash**: Ready for red-teaming on June 27; **full rollout to all developers via API/AI Studio by mid-July 2024** for production robustness ([source 1]).
- Later 2024 AI Studio enhancements (post-July, for context):
  - Sep 13: **Compare mode** for testing models/prompts ([source 4]).
  - Sep 19: Feedback buttons (thumbs up/down) ([source 4]).

#### Timeline Summary Table
| Date          | Update | Availability |
|---------------|--------|--------------|
| Feb 2024     | 1M context preview (limited) | AI Studio/Vertex AI |
| May 14, 2024 | 2M context (waitlist) | API |
| **June 27, 2024** | **2M context GA + Context Caching + Code Execution + Gemma 2** | **API & AI Studio** |
| Mid-July 2024 | Gemini 1.5 Flash tuning GA | API & AI Studio |

These updates made Gemini 1.5 Pro highly competitive for long-context tasks. For the latest (post-2024), check official docs like [ai.google.dev/gemini-api](https://ai.google.dev/gemini-api) as features evolve (e.g., newer models like Gemini 3.x noted in [source 7, 4]). No major July-specific changes beyond the Flash tuning rollout.