---
title: "Cursor Composer Deep Dive: The Multi-File Refactor Workflow That Actually Works"
slug: "cursor-composer-multi-file-refactor-workflow"
date: "2026-05-18"
lastModified: "2026-05-18"
author: "William Spurlock"
readingTime: 18
categories:
  - "Development Tools"
tags:
  - "cursor"
  - "cursor composer"
  - "ai refactoring"
  - "multi-file editing"
  - "cursorrules"
  - "ai coding assistant"
  - "code refactoring"
  - "anysphere"
featured: false
draft: false
excerpt: "The practical guide to Cursor's Composer and Agent mode for multi-file refactoring. When to use Composer vs tab completion, how to set up .cursorrules, and the exact workflow for large-scale codebase changes."
coverImage: "/images/blog/cursor-composer-deep-dive.png"
seoTitle: "Cursor Composer Multi-File Refactor Guide | William Spurlock"
seoDescription: "Master Cursor's Composer for multi-file refactoring. Real workflows, .cursorrules setup, Agent mode strategies, and when to switch to tab completion instead."
seoKeywords:
  - "cursor composer"
  - "cursor multi-file refactor"
  - "cursor agent mode"
  - "cursorrules setup"
  - "ai code refactoring"
  - "cursor composer vs tab"
  - "cursor background agents"
  - "anysphere cursor 2026"
aioTargetQueries:
  - "how to use cursor composer for refactoring"
  - "cursor composer vs agent mode"
  - "cursor multi-file editing workflow"
  - "cursorrules best practices 2026"
  - "when to use cursor composer vs tab completion"
  - "cursor agent mode tutorial"
contentCluster: "ai-coding-assistants"
pillarPost: false
parentPillar: "complete-ai-coding-assistant-showdown"
entityMentions:
  - "William Spurlock"
  - "Cursor"
  - "Anysphere"
  - "Composer"
  - "Claude Code"
  - "Anthropic"
  - "Claude 3.5 Sonnet"
  - "Claude Opus"
serviceTrack: "ai-automation"
---

# Cursor Composer Deep Dive: The Multi-File Refactor Workflow That Actually Works

## Introduction: Why Multi-File Refactoring Needs Special Handling

**The short answer:** Single-file edits with tab completion don't scale to real architectural changes. Cursor's Composer exists specifically for multi-file refactors that touch imports, types, tests, and call sites simultaneously—and using it wrong wastes credits and creates messy diffs.

I've spent the last eighteen months refactoring production codebases with AI assistance. Early on, I made every mistake: using Composer for one-line changes, using tab completion for architectural moves, prompting vaguely and hoping the model would figure it out. The results ranged from expensive (burning through $20 of credits on a single refactor) to dangerous (accepted diffs that broke type checking across fifteen files).

This post is the workflow I wish I'd had from day one. It's the exact method I use now for multi-file refactors in Cursor—when to reach for Composer versus Agent mode versus tab completion, how to structure `.cursorrules` so the AI respects your architecture, and the prompting patterns that generate clean, reviewable diffs.

**What you'll learn:**

- The decision matrix for choosing between tab completion, Composer, and Agent mode
- How to curate context so Composer understands cross-file relationships without drowning in noise
- Setting up `.cursorrules` that encode your project's constraints and prevent architectural drift
- Agent mode workflows for large-scale migrations and pattern propagation
- Background agents and parallel editing strategies for monorepos
- Pricing realities and credit management for heavy users

This is a spoke post in the [AI Coding Assistants cluster](/blog/2026/05/complete-ai-coding-assistant-showdown). For the full comparison of Cursor against Claude Code, Google Antigravity, and OpenAI Codex, see the pillar post. For my daily handoff workflow between Cursor and Claude Code, see [the May 3 workflow guide](/blog/2026/05/cursor-claude-code-daily-workflow).

---

## When Does Composer Win Over Tab Completion?

**Composer beats tab completion when the change spans multiple files or requires understanding cross-file relationships.** Here's the decision matrix I use every day.

Tab completion (Cursor's "Tab" model) is optimized for flow state. It predicts the next 10–50 tokens based on cursor position, recent edits, and currently open files. It's blazing fast—under 100ms—and costs nearly nothing. But it's reactive: it predicts what you're about to type, not what you're trying to achieve architecturally.

Composer, by contrast, is proactive. You describe intent, and it plans edits across multiple files. It uses Cursor's proprietary Composer 2 model—optimized for coding at ~250 tokens per second—and can modify dozens of files in a single pass while respecting imports, types, and cross-file references.

| Factor | Tab Completion | Composer | Agent Mode |
|--------|---------------|----------|------------|
| **Best for** | Next-line prediction, single-statement completion | Multi-file edits, controlled refactors | Large migrations, exploratory changes |
| **Context window** | ~4K tokens (recent + open files) | ~100K tokens (configurable file set) | ~100K tokens + tool use (terminal, browser) |
| **Speed** | <100ms | 10–60 seconds | Minutes to hours |
| **Cost** | Negligible | Moderate (Pro credits) | Higher (planning + execution) |
| **Control level** | High (you type, it suggests) | Medium (you review diffs) | Lower (you supervise, it plans) |
| **Examples** | Completing a function body, adding a prop | Renaming across files, extracting components | Migrating libraries, finding all instances of a pattern |

**My rule of thumb:** If I can describe the change in a single sentence and it involves only the current file, use tab completion. If the change requires updating imports in three other files, use Composer. If I'm not sure which files need changing or the task spans more than ten files, use Agent mode.

**Specific Composer wins:**

- **Renaming symbols across modules:** "Rename `UserProfile` to `AccountProfile` and update all imports, types, and test mocks."
- **API changes with call site updates:** "Change the `createUser` function signature to accept an object instead of positional parameters, and update all 14 call sites."
- **Component extraction:** "Extract these three similar form handlers into a shared `useDebouncedSearch` hook, and replace the inline logic in each component."
- **Test generation:** "Generate unit tests for all exported functions in `utils/api.ts`, using the existing `vitest` patterns in the codebase."

**Specific tab completion wins:**

- Completing a single function implementation
- Adding a CSS property
- Writing a simple conditional
- Filling in a switch case

The cost difference matters. On Cursor Pro ($20/month with usage credits), a heavy Composer session might consume $1–3 of credits. A heavy Agent mode session with multiple iterations might hit $5–10. Tab completion is effectively free. Choose accordingly.

---

## Understanding Cursor's Three Editing Modes

**Cursor offers three distinct editing modes, and choosing the wrong one for your task type burns credits and time.** Each mode has a specific scope sweet spot.

### Mode 1: Tab Completion (The Flow State Engine)

Tab completion is Cursor's original innovation. It's powered by a proprietary model trained specifically to predict code continuation based on context. The model sees:

- Your cursor position
- The 50–100 lines surrounding the cursor
- Recently open files (within the current session)
- Recent edit history

**When to use it:** Any time you're in flow, writing or editing code line by line. Tab completion shines for:
- Function body completion
- Property access chains (`user.profile.settings.notifications`)
- Boilerplate reduction (React hooks, event handlers)
- Pattern continuation (you've written two similar blocks; it suggests the third)

**Limitations:** Tab completion doesn't plan. It predicts. If you need to update three files to maintain type consistency, tab completion will happily suggest changes that break your build. It's your responsibility to know the scope.

### Mode 2: Composer (The Multi-File Editor)

Composer is an explicit action: you open the Composer panel (Cmd/Ctrl+I), describe what you want, and optionally select context files. Composer uses a different model—Composer 2—optimized for multi-file edits and code generation at ~250 tokens per second.

**Key capabilities:**

- **Multi-file selection:** You explicitly add files to the context, or let Composer suggest relevant files based on symbols
- **Unified diff view:** All changes are presented in a single reviewable diff
- **Per-hunk acceptance:** Accept or reject changes file by file, or even hunk by hunk
- **Cross-language support:** Works across TypeScript, Python, Go, Rust—any language Cursor indexes

**The Composer interface has two modes:**

1. **Normal mode:** You write the prompt, Composer generates edits, you review and apply
2. **Agent mode:** Composer plans, executes, and iterates autonomously (see below)

### Mode 3: Agent Mode (The Autonomous Refactorer)

Agent mode adds autonomy to Composer. Instead of generating edits and waiting for your review, the agent:

1. Reads relevant files (using Cursor's codebase index)
2. Plans a set of steps
3. Executes edits
4. Runs commands (tests, linters)
5. Iterates based on results

Agent mode is designed for tasks where the "how" isn't obvious upfront. "Migrate from React Router v5 to v6" or "Find all uses of the deprecated `legacyAPI` and migrate to the new SDK" are classic Agent mode tasks.

**Agent mode observability:**

Cursor shows an Agent sidebar with:
- Current step ("Reading 12 files", "Running npm test", "Fixing 3 errors")
- Context pills showing which files are active
- Command output (terminal integration)
- Checkpointing (commit before the agent runs; review before merging)

**Critical safety practices for Agent mode:**

- Always commit before starting an agent session
- Use `.cursorrules` to constrain scope ("never touch `/legacy/` without confirmation")
- Review the full diff before applying; agents can touch more files than expected
- For large refactors, use background agents in isolated worktrees instead of your main working directory

---

## The Composer Workflow: From Prompt to Merged PR

**The effective Composer workflow follows five phases: context curation, scope definition, generation, diff review, and verification.** Skip any phase and you'll regenerate or fix conflicts later.

### Phase 1: Context Curation

Composer's effectiveness depends entirely on the context you provide. With 100K tokens available, you have room—but including irrelevant files dilutes signal and wastes credits.

**My context selection strategy:**

1. **Start with the target files:** The files you know need changing
2. **Add type definitions:** If refactoring touches shared types, include `types.ts` or your schema files
3. **Include representative call sites:** If you're changing a function signature, add 2–3 representative files that call it (not all 50)
4. **Add test patterns:** If you want tests generated or updated, include a well-written existing test as a pattern reference

**Pro tip:** Use Cursor's "@" syntax to reference symbols directly. "@UserProfile" pulls in the definition and usages of that symbol without you manually adding files.

### Phase 2: Scope Definition

Before generating, define what Composer should and shouldn't do. I use a template prompt structure:

```
Task: [One-line description]

Scope:
- Modify files: [list]
- Preserve: [specific behavior that must not change]
- Update: [specific changes to make]
- Tests: [whether to add/update tests]

Constraints:
- [Any architectural rules, e.g., "Keep all API calls in the /api directory"]
- [TypeScript strictness, e.g., "No implicit any"]
```

**Example prompt:**

```
Task: Extract a shared useDebounce hook from the three search components.

Scope:
- Modify files: SearchUsers.tsx, SearchProducts.tsx, SearchOrders.tsx
- Create new file: hooks/useDebounce.ts
- Preserve: All existing debounce timing (300ms) and behavior
- Update: Replace inline useState + useEffect debounce logic with the new hook
- Tests: Update existing tests to mock the new hook if needed

Constraints:
- Use TypeScript strict mode; explicit return types on the hook
- Keep the hook generic (accept any value type, not just strings)
- Follow the existing hook pattern in hooks/useLocalStorage.ts
```

This structure prevents the "please refactor" vagueness that generates messy results.

### Phase 3: Generation

Click "Submit" and let Composer work. Typical generation times:

- Simple multi-file edit (2–3 files): 10–20 seconds
- Medium refactor (5–10 files): 30–60 seconds
- Large refactor (15+ files): 1–3 minutes

**During generation:**
- Don't navigate away; Composer's context is tied to the current session
- If you realize you forgot context, you can add files mid-generation in some Cursor versions, but it's cleaner to cancel and restart

### Phase 4: Diff Review

Composer presents changes in a unified diff view. This is where you catch mistakes before they hit your codebase.

**What to review:**

1. **Import correctness:** Did Composer add the right imports? Remove unused ones?
2. **Type consistency:** Do function signatures match their usage? Are generics preserved?
3. **Test coverage:** Did tests get updated to reflect changes?
4. **Edge cases:** Did Composer handle null/undefined cases, error paths, loading states?

**Review tactics:**

- Use "View side-by-side" for complex changes
- Reject hunks that look suspicious; you can regenerate or manually fix
- If 80% looks good but 20% is wrong, accept the good hunks and iterate on the rest

### Phase 5: Verification

After applying changes, verify before moving on:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Tests (start with affected files)
npm test -- src/components/SearchUsers.test.tsx

# Full test suite (if confident)
npm test
```

**If verification fails:**
- Don't blindly accept Composer's "fix" suggestions
- Read the error, understand the root cause
- Either fix manually or craft a specific follow-up prompt

---

## Setting Up .cursorrules for Consistent Refactors

**A well-structured `.cursorrules` file is the difference between coherent multi-file refactors and scattered changes that violate your project's conventions.** Rules encode your architectural constraints so Composer doesn't guess.

Cursor reads `.cursorrules` (and `.cursor/rules/*.mdc` files) to understand project context. These rules guide both Composer and Agent mode, constraining what the AI will suggest and how it approaches changes.

### The 2026 `.cursorrules` Structure

I use a structured markdown format with clear sections. Here's a template I adapt for each project:

```markdown
# Meta Rules

- Be concise by default; explain reasoning only when asked.
- Before large changes (>3 files), summarize your plan and wait for confirmation.
- When unsure, ask clarifying questions rather than guessing.
- Prefer editing existing code over creating new files unless requested.
- Always respect project configs (ESLint, Prettier, TypeScript strict, tests).

# Project Context

- **Type:** Next.js 15 marketing site with blog
- **Users:** B2B SaaS prospects reading technical content
- **Key domains:**
  - Post: A blog article with MDX content
  - Page: A static or dynamic route
  - Component: A reusable React component
  - Hook: A custom React hook for shared logic

# Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **UI Library:** shadcn/ui components
- **Animation:** Framer Motion for UI, GSAP for scroll sections
- **CMS:** Sanity (content) + local MDX (blog)
- **Testing:** Vitest + React Testing Library

# Architecture Rules

- All new API routes go in `/app/api/[route]/route.ts`
- All business logic lives in `/lib/services/`, never in components
- All data fetching uses React Server Components by default
- Client components use the `"use client"` directive explicitly
- Shared types go in `/lib/types.ts`
- Utilities go in `/lib/utils.ts` or `/lib/helpers/[name].ts`

# Coding Style

- Use explicit TypeScript return types on exported functions
- Prefer `interface` over `type` for object shapes
- Use named exports for components, default exports for pages
- Handle errors explicitly; never swallow exceptions silently
- Use early returns to reduce nesting
- Follow existing file naming: kebab-case for utilities, PascalCase for components

# Refactoring Constraints

- Never modify files in `/legacy/` without explicit confirmation
- Preserve backwards compatibility for public APIs
- When renaming symbols, update all imports, types, and test mocks
- Run typecheck after refactors: `npm run typecheck`
- Prefer small, focused functions over monolithic ones

# Safety Rules

- Never hardcode secrets; use environment variables via `process.env`
- Never modify production database schemas without migration safety review
- Use existing auth patterns; don't invent new ones
- Ask before adding new dependencies
```

### Framework-Specific Patterns

**For React + Next.js projects:**

```markdown
# Framework: React + Next.js

- Use Server Components by default
- Client components need explicit "use client" directive
- Data fetching: prefer server actions or RSC fetch over useEffect
- Forms: use React Hook Form + Zod validation
- State management: use Zustand for global state, React Query for server state
```

**For Node.js + Express projects:**

```markdown
# Framework: Node.js + Express

- Routes go in `/src/routes/`, business logic in `/src/services/`
- Use dependency injection pattern from `/src/di/container.ts`
- All routes must have OpenAPI spec comments
- Error handling: use centralized error middleware
- Database: use repository pattern, never raw queries in route handlers
```

**For Python + FastAPI projects:**

```markdown
# Framework: Python + FastAPI

- Use Pydantic models for all request/response schemas in `schemas.py`
- Business logic lives in `services/` modules
- Database access: use SQLAlchemy repositories, not direct session use in routes
- Type hints required on all function parameters and returns
- Tests: use pytest with fixtures from `conftest.py`
```

### Rule Evolution

`.cursorrules` should evolve with your project. When Composer makes a mistake more than once, add or tighten a rule. Keep a comment log at the top:

```markdown
# Changelog
# 2026-05-10: Added "never modify /legacy/" rule after agent touched deprecated code
# 2026-05-08: Added TypeScript strict mode requirement after type regression
# 2026-05-01: Initial rules for Next.js 15 migration
```

### Global vs Project Rules

Cursor supports both global rules (in `~/cursor/rules/`) and project-specific rules (`.cursorrules` in repo root). I keep:

- **Global rules:** Personal preferences ("Prefer early returns", "Use explicit types")
- **Project rules:** Stack-specific constraints ("Never mix App Router and Pages Router patterns")

Project rules override global rules. This lets you maintain consistency across your personal workflow while respecting each project's unique architecture.

---

## Agent Mode: When to Let Cursor Drive

**Agent mode is for tasks where the path isn't obvious upfront—migrations, bug hunts, pattern propagation across a codebase.** It's Composer with planning autonomy, but that autonomy requires guardrails.

Agent mode represents Cursor's most powerful—and most dangerous—capability. Unlike Composer, where you explicitly select files and review before applying, Agent mode explores, plans, and executes with minimal supervision. This is exactly what you want for large-scale refactors, and exactly what can go sideways without proper constraints.

### When to Use Agent Mode

**Use Agent mode when:**

- You don't know exactly which files need changing ("Find all deprecated `foo()` usage")
- The task is too large to manually curate context ("Migrate from Material-UI to Tailwind")
- You need iterative fixing ("Make all tests pass" where the agent runs tests and fixes failures)
- The refactor requires command execution ("Migrate the database schema and update all queries")

**Don't use Agent mode when:**

- You know exactly which files to change (use Composer instead)
- The change is simple and contained (use tab completion or Composer)
- You're in a high-risk area (auth, payments, security-critical code)
- You haven't committed your work recently

### The Agent Mode Workflow

**Step 1: Planning Phase**

Always start with a planning prompt. Don't let the agent just start editing:

```
I want to migrate our authentication from JWT to session-based cookies.

First, create a plan:
1. Identify all files that import or use JWT logic
2. Identify the new session-based pattern we should follow
3. List each file that needs changes and what those changes are
4. Identify any risks or breaking changes

Do not execute any edits yet. Just give me the plan for review.
```

Review the plan. If it looks wrong or incomplete, refine the prompt. Only proceed when the plan is solid.

**Step 2: Execution Phase**

Once you approve the plan, let the agent execute:

```
Execute the plan you outlined above. Make changes incrementally:
1. Update the auth middleware first
2. Then update the login/logout routes
3. Then update the protected route wrappers
4. Run tests after each batch of changes

If tests fail, fix them before proceeding to the next batch.
```

**Step 3: Verification Phase**

After the agent finishes:

```bash
# Full verification
npm run typecheck
npm run lint
npm test

# Manual review of critical paths
# Open auth-related files and read the changes
```

### Agent Mode Observability

Cursor's Agent sidebar shows:

- **Current step:** "Reading auth middleware", "Updating 12 files", "Running tests"
- **Context pills:** Active files the agent is working with
- **Terminal output:** Results from commands the agent runs
- **Plan progress:** Checkmarks on completed steps

Use this visibility to catch scope creep early. If the agent starts touching files outside the plan, you can pause and redirect.

### Safety Practices for Agent Mode

**1. Commit before starting**

```bash
git add .
git commit -m "Pre-agent: before migrating auth system"
```

**2. Use .cursorrules constraints**

Add rules like:

```markdown
# Agent Constraints

- Never modify files in `/security/` without explicit confirmation
- Never change environment variable names used in production
- Always preserve backwards compatibility for public APIs during refactors
- Run tests after any batch of changes; stop if tests fail
```

**3. Checkpoints**

Cursor has checkpointing. Use it. Save before major agent runs, restore if things go wrong.

**4. Scope auditing**

Some developers use small MCP-based tools to compare the agent's declared scope (files it said it would touch) versus the actual diff. If they don't match, the agent overstepped.

---

## Background Agents and Parallel Editing

**Cursor's background agents let you run up to 8 parallel workstreams in isolated Git worktrees, each on its own branch.** This is how you refactor a monorepo without blocking your main editor session.

Background agents, introduced in Cursor 2.0, are cloud-based agents that clone your repo from GitHub into isolated Ubuntu VMs. They work asynchronously—you launch them from Cursor, they run in the cloud, and they open PRs when done. This lets you parallelize work that would otherwise block your local editor for hours.

### How Background Agents Work

**The workflow:**

1. Connect your repo to Cursor (GitHub integration required)
2. Launch a background agent with a specific task
3. The agent clones your repo into an isolated VM
4. It works on a new branch, making commits as it progresses
5. When done, it pushes the branch and optionally opens a PR
6. You review the PR in GitHub or pull it locally for final verification

**Key capabilities:**

- **Parallel execution:** Up to 8 background agents can run simultaneously
- **Isolated environments:** Each agent has its own VM and branch
- **Full tool access:** Agents can run tests, linters, and even browser-based verification
- **PR integration:** Automatic branch push and PR creation

### Use Cases for Background Agents

**Perfect for:**

- **Large-scale refactors:** "Migrate all 50 components from class components to hooks"
- **Multi-subsystem changes:** One agent handles frontend, another handles backend API changes
- **Competing implementations:** Spin up 3 agents with different approaches, compare results
- **Long-running tasks:** "Generate comprehensive tests for all untyped modules" (might take an hour)

**Not ideal for:**

- Quick tasks (the overhead of cloning and setup isn't worth it)
- Tasks requiring your local context (specific env vars, local dev server state)
- High-iteration work where you need tight feedback loops

### Git Worktrees and Conflict Avoidance

Background agents use Git worktrees—separate working directories attached to the same repo. This means:

- Each agent works on its own branch without affecting your local files
- Agents don't see each other's in-progress work (they clone from main, not from each other)
- Merge conflicts happen at PR time, not during agent execution

**Conflict mitigation strategies:**

1. **Scope agents to different subsystems**
   - Agent A: `src/frontend/components/`
   - Agent B: `src/backend/api/`
   - Agent C: `tests/`

2. **Stagger dependent tasks**
   - First agent: Update shared types
   - Wait for PR merge
   - Second agent: Update consumers of those types

3. **Use read-only analysis agents**
   - One agent implements the change
   - Another agent (read-only) reviews and reports issues
   - The review agent doesn't create conflicts because it doesn't edit

### Custom Subagents

Beyond background agents, Cursor supports custom subagents defined in `.cursor/agents/*.md` files. These are specialized agents with specific instructions, models, and behaviors.

**Example custom subagent:**

```markdown
---
name: security-auditor
description: "Audits code for security issues and reports them"
model: fast
read_only: true
background: true
---

You are a security auditor for this repository. Review changed files and look for:
- SQL injection vulnerabilities
- XSS risks in user-generated content handling
- Missing input validation
- Insecure secret handling
- Authentication/authorization gaps

Produce a structured report with severity ratings and specific file/line references.
```

**Subagent properties:**

| Property | Values | Effect |
|----------|--------|--------|
| `model` | `inherit`, `fast`, specific model ID | Which model the subagent uses |
| `read_only` | `true`, `false` | Whether the agent can edit files or just analyze |
| `background` | `true`, `false` | Whether the subagent runs asynchronously |

The main agent can spawn multiple subagents in parallel—one for security audit, one for test generation, one for documentation—each working in its own context window.

### Parallel Agent Orchestration Pattern

A sophisticated workflow using both background agents and subagents:

1. **Planning phase (local Agent mode)**
   - Main agent maps the refactor scope
   - Subagent (read-only, background): Security audit of files to be touched
   - Subagent (read-only, background): Test coverage analysis

2. **Implementation phase (background agents)**
   - Background Agent A: Implement frontend changes
   - Background Agent B: Implement backend changes
   - Background Agent C: Generate tests for both

3. **Review phase (local Agent mode)**
   - Review all three PRs
   - Local agent helps resolve any merge conflicts
   - Subagent (read-only): Final security review

This parallelization would take hours if run sequentially in your local editor. With background agents, it happens simultaneously.

---

## Prompting Patterns for Large Refactors

**The difference between a clean refactor and a mess often comes down to prompt structure.** Specific patterns trigger better planning and safer execution in Composer and Agent mode.

After hundreds of refactor sessions, I've identified specific prompt structures that work consistently. These aren't theoretical—they're patterns I use daily.

### Pattern 1: The Scope-First Prompt

Bad prompts describe the goal without constraints. Good prompts define scope explicitly.

**Bad:**
```
Refactor the auth system to use cookies instead of JWT.
```

**Good:**
```
Refactor authentication from JWT to session-based cookies.

SCOPE:
- Modify: /lib/auth.ts, /app/api/login/route.ts, /app/api/logout/route.ts, /middleware.ts
- Preserve: All public API routes must continue working without client changes
- Update: Token generation → session creation, token validation → session validation
- DO NOT TOUCH: /legacy/admin/ (still needs JWT for old clients)

CONSTRAINTS:
- Use iron-session for session management (already in package.json)
- Max session age: 7 days
- Keep the same error response format for 401s
- Run tests after each batch of changes
```

### Pattern 2: The Phased Refactor

For large refactors, don't ask for everything at once. Phase the work:

**Phase 1: Planning (read-only)**
```
I need to migrate from React Query to SWR for data fetching.

Please analyze the codebase and give me a plan:
1. List all files that import from @tanstack/react-query
2. For each file, note what React Query features it uses (useQuery, useMutation, etc.)
3. Identify which SWR features we'll need as replacements
4. List any custom React Query hooks in /hooks/ that need complete rewrites

Do not make any edits. Just give me the analysis.
```

**Phase 2: Implementation**
```
Execute the migration plan for the first 5 files in your analysis. Replace:
- useQuery → useSWR
- useMutation → useSWRMutation
- QueryClient interactions → mutate() calls

Preserve all existing TypeScript types. Run typecheck after each file.
```

**Phase 3: Verification**
```
Now migrate the custom hooks in /hooks/ that use React Query internally. Update their public APIs to match the old signatures so callers don't need to change.
```

This phased approach lets you catch problems early before they're replicated across 50 files.

### Pattern 3: The Pattern-Reference Prompt

When you want the AI to follow an existing pattern, point to a reference implementation:

```
Create a new API route for user preferences following the pattern in /app/api/user/profile/route.ts.

Specifically:
- Use the same authentication check
- Use the same error handling structure
- Use the same response format
- Add comprehensive tests following the pattern in /app/api/user/profile/route.test.ts

The new route should handle:
- GET /api/user/preferences - returns user preferences
- PUT /api/user/preferences - updates user preferences

Data structure:
interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
}
```

### Pattern 4: The Constraint-Heavy Prompt

For safety-critical refactors, load up on constraints:

```
Update all database queries to use the new connection pool.

MANDATORY CONSTRAINTS:
1. Never modify connection strings - they're in env vars
2. Preserve all SQL injection protections - use parameterized queries only
3. Keep transaction handling identical - no changes to begin/commit/rollback logic
4. Test files must still pass without modification (mock at the connection level)
5. If any query uses a database-specific feature (window functions, CTEs), flag it for manual review instead of auto-converting

PROHIBITED:
- No raw SQL changes (only connection acquisition changes)
- No schema changes
- No migration files

APPROACH:
1. First, show me the plan for the 3 files with the most queries
2. Wait for my approval before editing
3. Make changes in batches of 5 files
4. Run tests after each batch
```

### Pattern 5: The Example-Driven Prompt

For complex transformations, give before/after examples:

```
Refactor all class components to function components with hooks.

BEFORE (current pattern):
```tsx
class UserList extends React.Component {
  state = { users: [], loading: false };
  
  componentDidMount() {
    this.fetchUsers();
  }
  
  fetchUsers = async () => {
    this.setState({ loading: true });
    const users = await api.getUsers();
    this.setState({ users, loading: false });
  };
  
  render() {
    return <div>{/* ... */}</div>;
  }
}
```

AFTER (target pattern):
```tsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    setLoading(true);
    const users = await api.getUsers();
    setUsers(users);
    setLoading(false);
  };
  
  return <div>{/* ... */}</div>;
}
```

SCOPE: All files in /src/components/ that use class components

PRESERVE:
- All lifecycle logic (convert to useEffect with proper cleanup)
- All instance methods (convert to regular functions or useCallback)
- All state (convert to useState)
```

### Pattern 6: The Question-First Prompt

When the scope is ambiguous, force clarification:

```
I want to improve error handling in the API layer.

Before implementing:
1. What specific error handling patterns do you see in the current code?
2. What's the current behavior for 500 errors? 404s? Validation errors?
3. Are there any places where errors are silently swallowed?
4. Should we standardize on a specific error format (RFC 7807 Problem Details)?
5. Should we add request IDs for tracing?

Please answer these questions before proposing any changes.
```

This pattern prevents the AI from assuming it knows what you want and charging ahead with the wrong solution.

### Pattern 7: The Rollback-Ready Prompt

For risky refactors, build in rollback points:

```
Migrate from CSS Modules to Tailwind.

APPROACH:
1. Start with a single simple component: Button.tsx
2. Convert its CSS Module classes to Tailwind utility classes
3. Verify visually that it looks identical
4. Commit that change
5. Then proceed to the next 5 components

IF SOMETHING LOOKS WRONG:
- Stop immediately
- Do not proceed to other components
- Flag the specific visual differences you notice

CONSTRAINTS:
- Preserve all responsive behavior
- Preserve all hover/focus/active states
- Preserve all animation keyframes (move to global CSS or Tailwind config)
```

---

## When NOT to Use Composer

**Composer is overkill for many editing tasks, and using it for everything wastes credits and slows you down.** Know when to switch to lighter tools.

Composer is powerful but expensive in both credits and time. Here are the specific situations where I intentionally avoid it.

### Use Tab Completion Instead

**Single-statement completion:** If you're in flow and just need the next 10–20 tokens, tab completion is instant and free. Composer's 10–20 second generation time breaks flow unnecessarily.

**Simple property access:** `user.profile.settings.notifications`—tab completion handles chains like this perfectly as you type.

**Boilerplate within a pattern:** If you've written two similar handlers and need the third, tab completion will suggest it after you start typing the pattern.

**CSS/Tailwind classes:** Tab completion has seen your project's class patterns and will suggest the right utility combinations as you type.

### Use Manual Editing Instead

**High-risk security code:** For auth, encryption, payment handling, or any security-critical code, I don't use AI at all. I write it manually and have it reviewed. The risk of an AI-introduced vulnerability outweighs the speed benefit.

**Complex algorithmic logic:** If I'm implementing a custom sorting algorithm, a complex state machine, or intricate business rules, manual implementation with careful unit testing is safer than AI-generated code that might have edge case bugs.

**Performance-critical paths:** Hot paths where micro-optimizations matter. AI doesn't know your performance budget or the specific access patterns of your data.

### Use Claude Code Instead

**Architectural analysis:** When I need to understand a large codebase before refactoring, Claude Code's 1M token context window beats Cursor's 100K. I use Claude Code for the "what should we do?" phase, then switch to Cursor for the "do it" phase.

**Cross-service refactors:** If the refactor spans multiple repositories (frontend, backend API, shared types package), Claude Code can load all three repos simultaneously. Cursor is limited to one workspace.

**Long-horizon planning:** For refactors that will take weeks and need detailed migration plans, Claude Code's persistent sessions and project memory are superior to Cursor's session-scoped context.

### Avoid Composer/Agent Mode in These Situations

| Situation | Why to Avoid | What to Use Instead |
|-----------|--------------|---------------------|
| Emergency hotfix | AI might introduce new bugs; speed matters | Manual edit, targeted test |
| One-line typo fix | Massive overhead for tiny change | Tab completion or manual |
| No tests exist | AI will generate untested code confidently | Write tests first, then refactor |
| Unclear requirements | AI will guess; you don't know what "right" looks like | Clarify requirements first |
| Deprecation without replacement | Deleting code is dangerous without understanding callers | Manual analysis, gradual removal |

### The "Pause and Think" Checklist

Before opening Composer, I ask myself:

1. **Do I know exactly what needs to change?** If no, use Agent mode or plan manually first.
2. **Does this touch fewer than 3 files?** If yes, consider tab completion or manual.
3. **Is this security-critical?** If yes, manual only.
4. **Are there good tests covering the affected code?** If no, write tests first.
5. **Have I committed recently?** If no, commit first (safety net).

If all five pass, Composer is the right tool.

---

## Pricing Reality: Credits, Models, and Cost Control

**Cursor's $20/month Pro plan uses a usage-credit model where premium models (Claude 3.5 Sonnet, Opus) consume more credits per request.** Heavy Composer and Agent mode usage can burn through your monthly pool fast.

As of May 2026, Cursor's pricing structure works like this:

| Plan | Price | Credits | Best For |
|------|-------|---------|----------|
| **Hobby (Free)** | $0 | ~50 premium requests/month | Trying Cursor, light usage |
| **Pro** | $20/month | ~$20 credit pool/month | Regular developers, moderate premium model usage |
| **Pro+** | $60/month | Larger credit pool | Heavy individual usage |
| **Ultra** | $200/month | Very large credit pool | Power users, contractors |
| **Business** | $40/user/month | Shared pool + team features | Teams standardizing on Cursor |

### How Credits Work

Your $20 Pro plan becomes a $20 pool of credits. Different models cost different amounts:

- **Fast models** (Cursor's proprietary models): Cheapest, good for most tasks
- **Premium models** (Claude 3.5 Sonnet, Claude Opus 4.7, GPT-4 class): 2–5x more expensive per token
- **Agent mode overhead**: Planning + execution + tool use adds up

**Typical credit consumption:**

| Task | Model | Estimated Cost |
|------|-------|----------------|
| Simple tab completion | Fast | ~$0.001 |
| Composer edit (3 files, fast model) | Fast | ~$0.02 |
| Composer edit (5 files, Sonnet) | Premium | ~$0.10 |
| Agent mode refactor (15 files, iterations) | Premium | ~$0.50–$2.00 |
| Background agent (large refactor, 1 hour) | Premium | ~$1.00–$5.00 |

### Cost Control Strategies

**1. Default to fast models**

Only switch to premium models when you specifically need the extra capability. Most refactoring tasks work fine with Cursor's proprietary models.

**2. Scope your requests**

Vague prompts cause the AI to over-search and over-generate. Be specific about which files and what changes.

**3. Use the right tool for the job**

Don't use Agent mode for 2-file changes. Don't use Composer for single-line edits. Match the tool to the scope.

**4. Batch similar tasks**

"Update these 5 components" is cheaper than 5 separate "update this component" requests because the context is loaded once.

**5. Monitor your usage**

Cursor shows credits remaining in the UI. Check it weekly. If you're burning through Pro credits, upgrade to Pro+ rather than rationing.

**6. Use background agents strategically**

Background agents run in the cloud and cost the same credits, but they don't block your local session. Use them for long tasks while you do other work.

### When to Upgrade

**Upgrade to Pro+ ($60) if:**
- You hit the Pro credit ceiling before month-end more than once
- You use premium models daily for complex refactors
- You're a contractor billing clients for AI-assisted work

**Upgrade to Ultra ($200) if:**
- You're doing enterprise-scale refactors daily
- You run multiple background agents in parallel routinely
- The $60 plan constrains your workflow

**Upgrade to Business ($40/user) if:**
- You're on a team sharing context and automations
- You need centralized billing and admin
- Multiple developers need consistent shared context

### The ROI Calculation

Even at $60/month, Cursor is cheap compared to engineering time. A refactor that takes 4 hours manually might take 1 hour with Composer. At $100/hour consulting rates, that's $300 saved per significant refactor. Use Cursor heavily for a week and measure the time saved—if it's meaningful, the higher tier pays for itself.

---

## FAQ: Cursor Composer and Multi-File Refactoring

### Q: What is the difference between Cursor Composer and Agent mode?

**A:** Composer is a reactive multi-file editor where you define the scope and it generates changes. Agent mode is proactive—it plans, explores, and executes autonomously. **Use Composer when you know exactly which files need changing; use Agent mode when you need the AI to figure out the scope.** Composer presents a diff for review before applying; Agent mode can run commands and iterate but requires closer supervision.

### Q: When should I use tab completion instead of Composer?

**A:** Tab completion wins for single-file, single-statement changes where you're already in flow. **Use tab completion for completing function bodies, property chains, and simple boilerplate.** Composer is for changes that span multiple files, require cross-file understanding, or need imports updated. Tab completion costs effectively nothing and responds in <100ms; Composer takes 10–60 seconds and consumes credits.

### Q: How do I set up .cursorrules for my project?

**A:** Create a `.cursorrules` file in your repo root with structured sections: Meta Rules, Project Context, Tech Stack, Architecture Rules, Coding Style, and Safety Constraints. **Focus on constraints that prevent common AI mistakes**—like "never modify /legacy/ without confirmation" or "preserve API signatures during refactors." Start small with 10–15 high-impact rules rather than hundreds of lines. Update the file as you discover new failure modes.

### Q: Can Composer handle refactors across different programming languages?

**A:** Yes, Composer works across mixed-language codebases. **It uses Cursor's symbol index to understand cross-language relationships**—for example, TypeScript types consumed by Python backend code, or Go structs serialized to JSON and consumed by JavaScript. The key is ensuring both languages are indexed (Cursor supports TypeScript, Python, Go, Rust, and more). Composer can update type definitions in one language and their consumers in another.

### Q: What are background agents in Cursor and when should I use them?

**A:** Background agents are cloud-based agents that clone your repo into isolated VMs and work asynchronously. **Use them for long-running refactors (30+ minutes), parallel workstreams, or tasks that would block your local editor.** You can run up to 8 background agents simultaneously, each on its own branch. They push PRs when done, letting you review changes without disrupting your local workflow.

### Q: How many files can Composer edit at once?

**A:** Composer can theoretically edit dozens of files in a single request, but **the practical limit for maintainable refactors is 10–20 files at once.** Beyond that, the diff becomes unwieldy and review quality drops. For larger refactors, use a phased approach: 5–10 files per batch, with verification between batches. Agent mode can handle larger scopes by iterating, but still benefits from being scoped to specific subsystems.

### Q: Does Composer preserve my code formatting and linting rules?

**A:** Composer attempts to match existing code style, but it's not perfect. **The best practice is running your formatter and linter after applying Composer changes.** Add explicit rules to `.cursorrules` like "Respect project Prettier/ESLint config" and "Do not manually adjust spacing that the formatter will handle." Always verify with `npm run lint` or equivalent after large refactors.

### Q: How do I review and accept multi-file changes safely?

**A:** Use Composer's unified diff view to review changes file-by-file or hunk-by-hunk. **Never blindly accept all changes—review imports, type signatures, and edge case handling specifically.** Accept changes in batches: first the core logic, then the call sites, then tests. Run typecheck and tests after each acceptance. If 80% looks good but 20% is wrong, accept the good hunks and iterate on the rest rather than regenerating everything.

### Q: Can I use Composer with my own API keys instead of Cursor's credits?

**A:** **No—Composer uses Cursor's proprietary Composer 2 model, which is not available through standard API endpoints.** You must use Cursor's credit system. However, for terminal-based work, you can use Claude Code with your own Anthropic API key, which gives you direct billing control. Some developers use Claude Code for planning and Cursor Composer for execution to optimize costs.

### Q: What's the best way to handle merge conflicts from parallel agents?

**A:** **The key is preventing conflicts through careful scope assignment.** Assign different agents to disjoint subsystems (e.g., one agent for frontend components, another for API routes). Use read-only agents for analysis while only one agent edits. When conflicts do occur, resolve them manually rather than letting agents guess—AI isn't good at conflict resolution because it lacks the context of which change is "correct."

### Q: How does Composer compare to Claude Code for large refactors?

**A:** **Composer wins for IDE-native, code-level refactors with immediate feedback; Claude Code wins for long-horizon architectural analysis and planning.** Composer has better diff review and faster iteration within the editor. Claude Code has a larger context window (~1M tokens vs 100K) and better handles cross-repository refactors. Many developers use both: Claude Code for planning and understanding, Composer for execution.

### Q: Is Cursor Pro ($20/month) enough for heavy Composer usage?

**A:** **For most developers doing 2–3 significant multi-file refactors per day, Pro is sufficient.** The $20 credit pool covers moderate usage of premium models. However, if you use Agent mode heavily, run background agents frequently, or rely on Claude Opus for complex refactors, you'll hit the ceiling. Monitor your usage in Cursor's settings. If you consistently run out before month-end, upgrade to Pro+ ($60) rather than rationing usage.

### Q: Can I constrain Agent mode to prevent it from touching certain files?

**A:** **Yes—use `.cursorrules` with explicit safety constraints and the `.cursorignore` file.** Add rules like "Never modify files in /security/, /auth/, or /payment/ without explicit confirmation" and "Never delete migrations or environment files." The `.cursorignore` file (similar to `.gitignore`) excludes directories from agent consideration entirely. For high-risk areas, use `read_only: true` subagents that analyze but don't edit.

### Q: How do I write effective prompts for multi-file refactors?

**A:** **Structure prompts with explicit scope, constraints, and examples.** Start with a one-line task description, then define: what files to modify, what to preserve, what to update, and specific constraints. Use the phased approach for large refactors—plan first, then execute. Include before/after examples when the target pattern isn't obvious. Reference existing well-written files as patterns to follow. Never write vague prompts like "refactor this" without defining what "refactor" means.

### Q: What's the difference between custom subagents and background agents?

**A:** **Subagents are specialized agents defined in `.cursor/agents/*.md` files that the main agent can spawn for specific tasks.** They run in parallel with the main agent and can be read-only (for analysis) or editing. **Background agents are cloud-based, long-running agents that work in isolated VMs on their own branches.** Use subagents for parallel analysis during a local session; use background agents for long-running work that would block your editor.

---

## Conclusion and Next Steps

**Cursor Composer and Agent mode represent a genuine leap in AI-assisted refactoring—but only when you match the tool to the task and constrain it with proper rules.**

The developers who get the most from Cursor follow a consistent pattern: they use tab completion for flow-state coding, Composer for controlled multi-file changes, and Agent mode for exploration and large-scale migrations. They invest time in `.cursorrules` that encode their architecture, and they review diffs carefully rather than accepting blindly.

The workflows in this post—context curation, phased refactoring, safety-first prompting—aren't theoretical. They're the patterns I've developed over eighteen months of shipping production code with AI assistance, after making every expensive mistake so you don't have to.

**Your next steps:**

1. **Audit your current Cursor usage:** Are you using Composer for single-line changes? Stop. Are you using tab completion for multi-file refactors? Switch.

2. **Set up `.cursorrules` for your main project:** Start with the template in this post, adapt it to your stack, and refine it as you discover new failure modes.

3. **Try a phased refactor:** Pick a contained refactor (5–10 files), use the planning → execution → verification workflow, and measure the difference in quality and speed.

4. **Explore background agents:** For your next large refactor, spin up a background agent and let it work while you handle other tasks. Review the PR when it's ready.

This post is part of the AI Coding Assistants cluster. For the complete comparison of Cursor, Claude Code, Google Antigravity, and OpenAI Codex, see [the pillar comparison post](/blog/2026/05/complete-ai-coding-assistant-showdown). For my actual daily workflow combining Cursor and Claude Code, see [the daily driver guide](/blog/2026/05/cursor-claude-code-daily-workflow).

---

**Ready to implement AI-native workflows in your team?** I build custom AI automation systems using the exact tools and patterns covered in this post—n8n pipelines, MCP integrations, and multi-agent orchestration that actually ships. [Book a 30-minute AI automation strategy call](/contact) and let's discuss your workflow bottlenecks.

---

*Written by William Spurlock, AI automation engineer and custom web designer. Building production AI workflows and immersive digital experiences for ambitious brands.*
