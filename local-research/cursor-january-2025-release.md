Querying perplexity using sonar-pro for: Cursor IDE January 2025 update release notes 0.45 agent tab Composer improvements with maxTokens: 8000
### Cursor IDE 0.45 Update (January 2025) Release Notes Summary

The Cursor IDE version **0.45.0** was released around **January 23, 2025** (based on forum timestamps), with subsequent patches up to **0.45.11**. This update introduced significant improvements to the **Tab model**, **Composer**, and **Agent** features, alongside VS Code base updates and bug fixes. Below is a breakdown focused on your query (Agent, Tab, Composer), drawn from official changelogs, forum posts, and blog announcements.

#### Key New Features
- **Fusion Tab Model** (Primary highlight of 0.45.0):
  - New next-generation **Tab** model called **Fusion**, replacing the original March 2024 Tab model.
  - **Improvements**:
    | Aspect              | Original Model | Fusion Model    |
    |---------------------|----------------|-----------------|
    | Server Latency (p50)| 475ms         | **260ms**      |
    | Cursor Jumps        | None          | **Instant, accurate** |
    | Context Length      | 5,500 tokens  | **13,000 tokens** |
    | Edit Prediction     | Baseline      | **25% more difficult edits per line**; **10x longer change stretches** |
  - Trained on cleaner/higher-quality data, longer editor context, bigger edits, synthetic instruction data, and improved recipes.
  - **Goal**: Eliminate code editing tedium via in-flow "Next Action Prediction" (predicts edits near cursor + "jumps" to next locations).
  - Rolled out to all users in 0.45.0 client release.
  - Future plans: Better codebase context, tab-tab-tab sequences, Supermaven integration.

- **Agent Improvements**:
  - Fixes for **older agent conversations** (resolved in 0.45.1–0.45.7).
  - **MCP support** (likely Multi-Context Prompting or similar agent tooling) added in patches.
  - **Team-configurable blocklists** for agents.
  - Ties into broader agentic workflow enhancements (e.g., context usage breakdowns in later updates, though post-0.45).

- **Composer Improvements**:
  - **Latency fixes** for pasting code.
  - **Fixes for Composer stuck on "Generating"** (especially Windows builds; resolved in 0.45.1–0.45.7).
  - Some users reported temporary bugs in 0.45.5 (e.g., "It seems there was an issue applying the changes" – no "Accept" button), fixed by switching Composer modes (Pane ↔ Editor) or updating further.
  - Crash fixes for **long Composer sessions**.

#### Other Notable Changes in 0.45.x Patches (0.45.1–0.45.11)
- **Stability**: Indexing stability, downloading incorrect extension versions, missing Windows packages.
- **Update Method**: Use `Cmd/Ctrl+Shift+P` → "Cursor: Attempt Update".
- **VS Code Base**: Updated underlying VS Code version.

#### Sources & Context
- **Official Blog**: [Cursor Tab Update (Fusion)](https://cursor.com/blog/tab-update) – Details Fusion benchmarks and training.
- **Changelogs**: [Cursor Changelog](https://cursor.com/changelog/page/9) and [Forum 0.45.7](https://forum.cursor.com/t/changelog-for-0-45-7/46472) – Patch summaries.
- **Forum Discussions**: [0.45.0 Changes](https://forum.cursor.com/t/version-0-45-0-what-changes/42995), [0.45.5 Composer Bug](https://forum.cursor.com/t/update-to-0-45-5-and-composer-no-longer-working/46066).
- No major regressions noted post-patches; 0.45 praised as "amazing" for Tab/Agent flow.

This update positioned Cursor as more "agentic," emphasizing autonomous editing via Tab/Composer/Agents. For the absolute latest (post-0.45), check [cursor.com/changelog](https://cursor.com/changelog). If you need notes on a specific patch or comparison to prior versions, let me know!