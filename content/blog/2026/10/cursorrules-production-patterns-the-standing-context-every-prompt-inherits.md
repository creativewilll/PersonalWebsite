---
title: ".cursorrules Production Patterns: The Standing Context Every Prompt Inherits"
slug: "cursorrules-production-patterns-the-standing-context-every-prompt-inherits"
date: "2026-10-03"
lastModified: "2026-10-03"
author: "William Spurlock"
readingTime: 16
categories:
  - "AI Automation"
tags:
  - "cursorrules"
  - "Cursor rules"
  - ".cursor/rules"
  - "AGENTS.md"
  - "standing context"
featured: false
draft: false
excerpt: "Cursorrules production patterns are the stack Cursor puts in front of every Agent prompt. Keep Always Apply short, scope the rest, and delete the legacy file."
coverImage: "/images/blog/cursorrules-production-patterns-the-standing-context-every-prompt-inherits.png"
coverImageAlt: "Four blank cards in front of a dark monitor, top card circled, for cursorrules production patterns"
seoTitle: "Cursorrules Production Patterns | William Spurlock"
seoDescription: "Ship cursorrules production patterns as .mdc rules, not one root file. Team rules beat project rules. Always Apply stays short. Confirm the type in Customize."
seoKeywords:
  - "cursorrules production patterns"
  - ".cursorrules migration"
  - "Cursor project rules"
  - ".cursor/rules mdc"
  - "Always Apply Cursor rule"
  - "Cursor Team Rules precedence"
  - "AGENTS.md vs project rules"
aioTargetQueries:
  - "cursorrules production patterns"
  - "What is the standing context a Cursor prompt inherits?"
  - "What breaks when .cursorrules, CLAUDE.md, and project rules disagree?"
  - "How do I migrate a root .cursorrules file into production rules?"
  - "When should a Cursor rule be Always Apply instead of a glob?"
  - "How do I check that Agent loaded the rule I wrote?"
  - "Why does Cursor ignore a plain markdown file inside .cursor/rules?"
  - "What happens when alwaysApply is true and a glob is also set?"
  - "Which Cursor rule wins when Team, Project, and User rules conflict?"
  - "Do User Rules apply to Inline Edit?"
  - "Do Cursor rules apply to Bugbot reviews?"
  - "Do account User Rules sync to a new machine?"
  - "Can a teammate turn off a Team Rule?"
  - "How do nested AGENTS.md files combine?"
  - "What should stay out of an Always Apply Cursor rule?"
contentCluster: "ai-coding-assistants"
pillarPost: false
parentPillar: "complete-ai-coding-assistant-showdown"
entityMentions:
  - "William Spurlock"
  - "Cursor"
  - "Anysphere"
  - "AGENTS.md"
  - "CLAUDE.md"
  - "Spurlock Studios LLC"
serviceTrack: "ai-automation"
---

# .cursorrules Production Patterns: The Standing Context Every Prompt Inherits

**Cursorrules production patterns are the stack Cursor places at the start of an Agent prompt before you type.** A root `.cursorrules` file used to be that whole stack. As of October 3, 2026, it is the legacy file you copy out of, not the file you keep feeding.

I am William Spurlock, AI Systems Architect and Fractional AI CTO at Spurlock Studios LLC. Cursor is the AI-first code editor from Anysphere. The [Composer refactor workflow](/blog/cursor-composer-multi-file-refactor-workflow) is where I used one rules file as a fence around a multi-file change. That fence is still the right idea. The single-file habit is not. The [daily driver seat card](/blog/the-cursor-claude-code-daily-driver-workflow-six-months-in) decides which tool owns the sentence. This page is what the sentence inherits inside Cursor. If you are still picking a vendor, start with the [coding assistant showdown](/blog/complete-ai-coding-assistant-showdown).

## What is the standing context a Cursor prompt inherits?

**Standing context is the rule text Cursor includes at the start of the model context when a rule applies.** As of October 3, 2026, [Cursor's rules reference](https://cursor.com/docs/rules) says large language models do not retain memory between completions, and rules are the persistent context at the prompt level. When a rule applies, its contents go in at the start. Your sentence comes after that.

The same page names four types. I treat those four, plus `CLAUDE.md` when the repo has one, as the inheritance card.

<table>
<thead>
<tr><th>Slot</th><th>Where it lives</th><th>What it covers</th></tr>
</thead>
<tbody>
<tr><td>Project Rules</td><td><code>.cursor/rules/*.mdc</code>, in git</td><td>This repo. Scoped by type, glob, description, or an @ mention.</td></tr>
<tr><td>User Rules</td><td>Customize, then Rules. Stored on the Cursor account.</td><td>Agent chat on every project. Communication habits and personal conventions.</td></tr>
<tr><td>Team Rules</td><td>The team dashboard. Team and Enterprise plans.</td><td>Every repo for that team. Free-form text, optional glob.</td></tr>
<tr><td>AGENTS.md</td><td>Project root, and nested folders.</td><td>Plain markdown. No frontmatter. Closer file wins.</td></tr>
<tr><td>CLAUDE.md</td><td>Project root, same idea as AGENTS.md.</td><td>Always on for every conversation. Frontmatter does not turn it off.</td></tr>
</tbody>
</table>

That last row is not a fifth type in the reference. [Cursor's rules help](https://cursor.com/help/customization/rules) says Cursor reads `CLAUDE.md` the same way it reads `AGENTS.md`, and that `CLAUDE.md` is always applied even if someone set `alwaysApply` in frontmatter. I put it on the card because it still occupies the window.

Standing context is not the whole product:

- It is not Cursor Tab. The rules reference FAQ says rules do not impact Tab.
- It is not Inline Edit. The same FAQ says User Rules are not applied to Cmd/Ctrl+K.
- It is not Bugbot. The rules help says rules do not apply to Bugbot pull-request reviews.
- It is not yesterday's chat. A new Agent conversation does not inherit the previous transcript unless you are still in that thread.

[Cursor's agent help](https://cursor.com/help/ai-features/agent) says project rules, user rules, and team rules apply in Agent, Ask, Plan, and Debug. You open that panel with Cmd+I on a Mac, or Ctrl+I on Windows and Linux. I write rules for those four modes. I do not write them hoping Tab will obey.

## What breaks when .cursorrules, CLAUDE.md, and project rules disagree?

**Cursor does not hold a vote. When the lines conflict, Team Rules win, then Project Rules, then User Rules.** As of October 3, 2026, the [rules reference](https://cursor.com/docs/rules) says applicable rules are merged and the earlier source takes precedence. A personal User Rule cannot overturn a team line. A project rule cannot overturn the team either.

The legacy file is the other trap. The [rules help](https://cursor.com/help/customization/rules) says the root `.cursorrules` file will be deprecated. The migration is to copy it into a new rule, set Always Apply, and delete the old file. I do not keep growing a file the docs already called legacy.

<table>
<thead>
<tr><th>Disagreement</th><th>What the docs say</th><th>What I do</th></tr>
</thead>
<tbody>
<tr><td>Team line vs project line</td><td>Team wins.</td><td>I change the project file so it stops repeating the losing line.</td></tr>
<tr><td>Project line vs User Rule</td><td>Project wins.</td><td>I take personal taste out of the repo file.</td></tr>
<tr><td>CLAUDE.md vs a conditional .mdc</td><td>CLAUDE.md is always applied.</td><td>The shared sentence lives in CLAUDE.md once. The .mdc does not repeat it.</td></tr>
<tr><td>Root .cursorrules vs a new .mdc</td><td>The root file is legacy. Migrate and delete it.</td><td>I do not maintain both.</td></tr>
</tbody>
</table>

The failure I actually care about is three copies of one instruction. The daily driver post already put the sentence both tools should share into `CLAUDE.md`. If I also paste it into Always Apply, and a teammate still has it in User Rules, the model is reading the same order three times and a contradiction the moment any copy drifts.

I keep one owner per sentence:

1. A team compliance line stays a Team Rule. I do not shadow it in the repo.
2. A repo refusal stays one project rule. I do not also park it in User Rules.
3. A sentence Claude Code must see stays in `CLAUDE.md`. The Cursor rule points at the behavior only when Cursor needs a glob the markdown file cannot express.
4. The root `.cursorrules` file goes away after the copy. Two sources for one refusal is how the card rots.

Precedence is not a reason to write longer rules. It is a reason to delete the loser.

## How do I migrate a root .cursorrules file into production rules?

**Copy the lines you still mean into a new `.mdc` file, set Always Apply, and delete `.cursorrules`.** That is the sequence on [Cursor's rules help](https://cursor.com/help/customization/rules), as of October 3, 2026. Always Apply is the old behavior, where one file rode along on every chat. It is not a reason to paste the whole history of the repo into the new file.

I do it in this order:

1. Open the command palette and run New Cursor Rule, or type `/create-rule` in Agent. The [rules reference](https://cursor.com/docs/rules) says `/create-rule` writes the file under `.cursor/rules`.
2. Paste only the lines that are still true. If I would not say the line out loud to a teammate, it does not survive the copy.
3. Set the type to Always Apply for the lines that must hit every Agent, Ask, Plan, and Debug chat.
4. Move folder-specific lines out of that file before you save. They want `alwaysApply: false` and a glob. Leaving them on Always Apply makes every chat pay for a rule about a folder you are not in.
5. Confirm the file ends in `.mdc`. A plain `.md` file in `.cursor/rules` is ignored.
6. Delete the root `.cursorrules` file in the same change. The help page's last step is the delete. I do not leave the legacy file "just in case."

<table>
<thead>
<tr><th>Line in the old file</th><th>Where it goes now</th></tr>
</thead>
<tbody>
<tr><td>A refusal that is true on every chat</td><td>One Always Apply <code>.mdc</code></td></tr>
<tr><td>A rule about one directory or extension</td><td><code>alwaysApply: false</code> plus a glob</td></tr>
<tr><td>A procedure I want only when I name it</td><td>No description, no globs. I @ mention it.</td></tr>
<tr><td>Prettier, lint, or "write clean code"</td><td>The linter. Not the rule.</td></tr>
<tr><td>A pasted source file</td><td>An <code>@filename</code> reference, so the copy cannot go stale</td></tr>
</tbody>
</table>

The reference is blunt about what to leave out. It says not to copy an entire style guide, because Agent already knows common style and a linter should own the rest. It says not to document every common command. It says to reference a file instead of pasting it, so the rule stays short when the code moves. It also says to keep a rule under 500 lines and to split anything larger. I treat 500 as the ceiling Cursor wrote down, not as a target. A rule that needs 500 lines is several rules wearing a trench coat.

The Composer post's fence still matters for a refactor: name the directories the agent may not touch, and name the signatures it must keep. That content moves into the `.mdc` files. It does not stay in a root file the help page already told you to delete.

## When should a Cursor rule be Always Apply instead of a glob?

**Always Apply is for lines that must be true on every Agent chat, and it ignores any glob or description on that file.** As of October 3, 2026, the [rules reference](https://cursor.com/docs/rules) spells the matrix out. I use Always Apply for refusals. I use a glob when the line is about a file type. I use a description when Agent should pull the rule only if the task matches. I use a manual @ mention when the rule should stay out until I name it.

<table>
<thead>
<tr><th>alwaysApply</th><th>description</th><th>globs</th><th>Behavior</th></tr>
</thead>
<tbody>
<tr><td>true</td><td>Ignored</td><td>Ignored</td><td>Included in every chat.</td></tr>
<tr><td>false</td><td>Empty</td><td>Set</td><td>Auto-attached when a matching file is in context.</td></tr>
<tr><td>false</td><td>Set</td><td>Omitted</td><td>Agent reads the description and pulls the rule when it looks relevant.</td></tr>
<tr><td>false</td><td>Omitted</td><td>Omitted</td><td>Included only when you @ mention the rule.</td></tr>
</tbody>
</table>

The glob syntax is the usual set. The reference lists `*` for one path segment, `**` for any depth, `**/*.ts` for TypeScript anywhere, and comma-separated patterns when you need more than one. Team Rules can carry a glob too. Without one, a Team Rule applies to every conversation. With `**/*.py`, it waits until a matching file is in context.

My cut, on repos I maintain:

- Always Apply gets the refusals I would repeat at dinner. "Do not edit `dist/`." "Do not invent a client name in a post." "One sentence owns one file."
- A glob gets the local dialect. React files, migration files, the blog folder. Those lines are noise in a chat about a worker.
- A description gets a procedure Agent should notice on its own, such as "when adding a service, follow the RPC shape." The description has to say that. An empty description never qualifies as Apply Intelligently.
- A manual rule gets the rare runbook. Incident notes. A release checklist. I do not want those in the window while I am renaming a component.

[The agent help](https://cursor.com/help/ai-features/agent) says those rules apply in Agent, Ask, Plan, and Debug. Switching modes starts a fresh context window. Always Apply still means every one of those chats, not "the chat I happen to be in." That is a bigger bill than people assume when they tick the dropdown.

Team Rules sit in front of this choice. They are free-form text, not `.mdc` files, and they take precedence. An enforced Team Rule cannot be turned off in Customize. If the team already forbids a pattern, I do not spend an Always Apply file restating it in a weaker voice.

## How do I check that Agent loaded the rule I wrote?

**Open Customize, read the rule type, then start a new chat in the mode you will actually use and give it a task the rule forbids.** As of October 3, 2026, [Cursor's rules help](https://cursor.com/help/customization/rules) says a missing description is why Apply Intelligently never fires, and a glob that does not match the files in context is why a file-scoped rule stays quiet. The product does not owe you a hidden debug dump. The check is the type on screen, then a fresh chat that should bounce off the rule.

<table>
<thead>
<tr><th>What you see</th><th>What I check first</th></tr>
</thead>
<tbody>
<tr><td>The file never shows up in Customize</td><td>It is <code>.md</code> inside <code>.cursor/rules</code>. The reference says that file is ignored. Rename it to <code>.mdc</code> or move the words to <code>AGENTS.md</code>.</td></tr>
<tr><td>Apply Intelligently never joins the chat</td><td>The description is empty or it does not say when the rule matters.</td></tr>
<tr><td>The glob rule never joins</td><td>No matching file is in context. Quoting the pattern in chat is not the same as having the file open or attached.</td></tr>
<tr><td>It worked in Ask and vanished in Agent</td><td>A mode switch starts a fresh context window. Run the check again in Agent.</td></tr>
<tr><td>Tab or Inline Edit ignored it</td><td>Expected. Those surfaces do not load rules.</td></tr>
<tr><td>Bugbot ignored it</td><td>Expected. Bugbot reviews are outside the rules help's list.</td></tr>
</tbody>
</table>

The order I use:

1. Customize, Rules. Confirm the file is listed and the type matches the job. Always Apply, Apply Intelligently, Apply to Specific Files, or Apply Manually.
2. Start a new chat in the mode the work will use. Do not reuse a thread from another mode. The [agent help](https://cursor.com/help/ai-features/agent) says each mode has its own context.
3. Ask for the thing the rule forbids. A small, obvious violation. If the diff still does it, the rule did not bind that chat.
4. If the rule is a glob, put a matching file in context first. Then repeat the forbidden ask.
5. If the rule is manual, @ mention it in that same new chat. A manual rule that "should have been obvious" will not load. That is the setting.

I do not count a Tab accept as evidence. Tab never saw the file. I do not count a Bugbot comment as evidence either. The rules help leaves both of those out.

When the check fails twice on a file I just migrated, I look for the leftover root `.cursorrules` and for a second copy in `CLAUDE.md` before I rewrite the `.mdc`. The usual bug is two owners, not a shy model.

## FAQ

### Why does Cursor ignore a plain markdown file inside .cursor/rules?

**A plain `.md` file in `.cursor/rules` has no frontmatter, so the rules system skips it.** As of October 3, 2026, [Cursor's rules reference](https://cursor.com/docs/rules) says project rules must use the `.mdc` extension. Plain markdown belongs in `AGENTS.md`. Dropping a `.md` note into the rules folder feels like it should work. It does not.

### What happens when alwaysApply is true and a glob is also set?

**The glob is ignored, and so is the description.** The rules reference says `alwaysApply: true` includes the rule every time, and the other two fields do not change that. If the glob was the point, set `alwaysApply` to false and keep the pattern. Leaving both set is how a folder rule becomes a tax on every chat.

### Which Cursor rule wins when Team, Project, and User rules conflict?

**Team Rules win, then Project Rules, then User Rules.** The rules reference says the rules merge, and the earlier source wins on a conflict. A User Rule is the weakest of the three. I do not put a repo policy in User Rules and hope it outranks the project.

### Do User Rules apply to Inline Edit?

**No.** The rules reference FAQ says User Rules are not applied to Inline Edit (Cmd/Ctrl+K). They are used by Agent (Chat). The [rules help](https://cursor.com/help/customization/rules) puts Inline Edit with Tab and Bugbot, outside the surfaces that load rules. A style preference in Customize will not steer a Cmd+K edit.

### Do Cursor rules apply to Bugbot reviews?

**No.** The rules help says rules do not apply to Bugbot pull-request reviews. Bugbot is a separate review pass. A project rule that says "never touch auth" does not bind that bot. If the review has to enforce the line, the check belongs in CI or in the review tool's own configuration, not only in `.cursor/rules`.

### Do account User Rules sync to a new machine?

**Rules you save in Customize sync with the Cursor account. Files in `~/.cursor/rules` stay on that machine.** The rules help draws that split. Signing in on a new laptop brings the account rules. It does not bring the home-directory files, and those files are not in a profile export either. I keep repo policy in git so a new machine is not part of the design.

### Can a teammate turn off a Team Rule?

**Only when the rule is not enforced.** The rules reference says an enforced Team Rule is required and cannot be disabled in Customize. A rule that is on but not enforced can be toggled off under Team Rules. A draft saved with immediate enable left unchecked does not apply until someone turns it on. I read that toggle before I blame the model.

### How do nested AGENTS.md files combine?

**They stack, and the closer file wins.** The rules reference says you can put `AGENTS.md` in the project root and in subdirectories. Instructions combine with parent folders, and the more specific file takes precedence. That is folder scope without `.mdc` fields. I still use `.mdc` when I need a glob or a manual @ mention. Nested `AGENTS.md` cannot express those two.

### What should stay out of an Always Apply Cursor rule?

**Style guides, catalogs of common commands, and rare edge cases.** The rules reference says Agent already knows common style and common tools, and it says to point at a file with `@filename` instead of pasting it. The same page caps a rule at under 500 lines. I keep Always Apply to the refusals that are true on every Agent, Ask, Plan, and Debug chat. Everything else gets a glob, a description, or an @ mention.

I am William Spurlock, AI Systems Architect and Fractional AI CTO at Spurlock Studios LLC. The counts I will stand behind are separate from this card: 600+ automations built and 500+ live, 20,000+ hours architecting agentic systems, and 35,000+ hours saved for clients. None of those figures measure a rules file. They are why I refuse a second copy of the same sentence.

If the root file, `CLAUDE.md`, and an Always Apply rule are still arguing, bring the three files to an [AI automation strategy call](/contact). I will tell you which sentence keeps one owner and which lines move to a glob. I will not invent a speedup number for the cleanup.
