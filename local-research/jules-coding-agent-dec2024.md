Querying perplexity using sonar-pro for: Google Jules AI coding agent December 2024 developer tools GitHub integration with maxTokens: 8000
# Google Jules AI Coding Agent: Complete Guide (as of 2026)

Google Jules is an **autonomous, asynchronous AI coding agent** launched by Google Labs in **December 2024**. Powered by **Gemini 3 Pro** (upgraded from Gemini 2.0 in initial release), it handles complex coding tasks like bug fixes, feature building, writing tests, and dependency updates—**without requiring constant human input**. It's now in **public beta/production** (post-September 2025 official release) and integrates natively with GitHub.

## 🎯 Key Features & Capabilities
| Feature | Description |
|---------|-------------|
| **Autonomous Operation** | Clones your full repo into a **secure Google Cloud VM**, analyzes codebase, dependencies, docs, and even custom `AGENTS.md` files. Executes multi-step tasks independently. |
| **Native GitHub Integration** | - Processes GitHub issues automatically<br>- Creates feature branches & PRs with diffs and detailed descriptions<br>- Supports private/public repos<br>- No extra tools needed—works in your existing workflow |
| **Visible Planning** | Generates a **detailed plan** with reasoning before changes. Edit/approve it for steerability. |
| **Task Types** | Bug fixes, writing tests, feature building, version bumps (e.g., Next.js to v15 + app dir migration), dependency updates, audio changelogs. |
| **Languages** | Primarily **Python** and **JavaScript** (as of initial launch; likely expanded by 2026). |
| **Additional Perks** | Audio summaries of commits, real-time updates, test running/creation. |

## 🚀 Timeline
| Date | Milestone |
|------|-----------|
| **Dec 2024** | Beta launch in Google Labs |
| **Dec 2024–Sep 2025** | Beta testing (140K+ public code improvements) |
| **Sep 2025** | Production release |
| **Q4 2025** | Gemini 3 Pro integration |

## 💰 Pricing & Access
- **Free Tier**: 5–20 tasks/day (varies by source; public beta is free with limits).
- **Paid Plans**: Scale to 300+ tasks/day for enterprises (post-beta pricing introduced).
- **Access**: Google account + GitHub OAuth. Available globally.

## 📋 Step-by-Step Setup & Workflow
1. **Sign Up**: Go to [jules.google](https://jules.google) → Connect GitHub account.
   - Authorize "Google Jules" OAuth app.
   - Select repos (all or specific) with permissions: read contents, write PRs/branches, read issues.
   - **Security**: Revoke anytime in GitHub Settings → Applications.

2. **Assign Task**:
   - Select repo/branch (e.g., `@kathy/flipdisc main`).
   - Write natural language prompt: *"Bump Next.js to v15, convert to app directory, update tests."*

3. **Review & Execute**:
   - Jules analyzes → Shows **plan** (edit if needed) → Approve.
   - Runs in isolated VM: Generates/refines code, runs tests, creates PR.
   - Monitor progress, give feedback mid-task.

4. **Merge & Done**:
   - Review PR diffs → Merge → Optional audio changelog.

## 🔗 Official Links
- **Homepage**: [jules.google](https://jules.google)
- **Google Blog**: [blog.google/.../jules](https://blog.google/innovation-and-ai/models-and-research/google-labs/jules/)
- **Guides**: [chandanadev.com/google-jules-ai-coding-agent](https://chandanadev.com/google-jules-ai-coding-agent)

Jules stands out from tools like GitHub Copilot by being **fully agentic**—it doesn't just autocomplete; it **owns the task end-to-end**. Ideal for async workflows where you delegate grunt work. For latest updates, check the official site as features/pricing evolve post-beta.