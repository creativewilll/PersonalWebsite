---
title: "The Cursor + Claude Code Daily Driver Workflow, Six Months In"
slug: "the-cursor-claude-code-daily-driver-workflow-six-months-in"
date: "2026-10-02"
lastModified: "2026-10-02"
author: "William Spurlock"
readingTime: 18
categories:
  - "AI Automation"
tags:
  - "Cursor"
  - "Claude Code"
  - "daily driver"
  - "Cursor rules"
  - "CLAUDE.md"
featured: false
draft: false
excerpt: "A Cursor and Claude Code daily driver is a seat card: one sentence, one owner. Cursor watches the diff. Claude Code runs the slash job you can leave alone."
coverImage: "/images/blog/the-cursor-claude-code-daily-driver-workflow-six-months-in.png"
coverImageAlt: "Two night-desk chairs and one index card for a Cursor Claude Code daily driver"
seoTitle: "Cursor + Claude Code Daily Driver | William Spurlock"
seoDescription: "The Cursor and Claude Code daily driver I kept is a four-line seat card. One task sentence gets one tool. The other stays closed until that sentence is done."
seoKeywords:
  - "Cursor and Claude Code daily driver"
  - "Cursor rules vs Claude Code skills"
  - "CLAUDE.md in Cursor"
  - "disable-model-invocation"
  - "Cursor Plan mode vs Agent"
  - ".cursor/rules mdc"
  - "when to use Claude Code"
aioTargetQueries:
  - "Cursor and Claude Code daily driver"
  - "What is a Cursor and Claude Code daily driver once both tools are installed?"
  - "What goes wrong when Cursor and Claude Code stay open on the same task?"
  - "How do I pick Cursor or Claude Code for the next task?"
  - "How do I stop Cursor rules and a Claude Code skill from saying different things?"
  - "How do I check that my Cursor and Claude Code daily driver is still the one I use?"
  - "Do Cursor project rules apply to Tab completion?"
  - "Does Cursor read a CLAUDE.md file?"
  - "Where do Claude Code skills live?"
  - "What does disable-model-invocation do on a Claude Code skill?"
  - "Is AGENTS.md enough to steer Cursor Agent?"
  - "When should I use Cursor Plan mode instead of Claude Code?"
  - "How long should CLAUDE.md stay for a Claude Code daily driver?"
  - "Do Cursor rules apply in Ask, Plan, and Debug?"
  - "What is the difference between a Cursor rule and a Claude Code skill?"
contentCluster: "ai-coding-assistants"
pillarPost: false
parentPillar: "complete-ai-coding-assistant-showdown"
entityMentions:
  - "William Spurlock"
  - "Cursor"
  - "Claude Code"
  - "Anysphere"
  - "Anthropic"
  - "CLAUDE.md"
  - "AGENTS.md"
serviceTrack: "ai-automation"
---

# The Cursor + Claude Code Daily Driver Workflow, Six Months In

**A Cursor and Claude Code daily driver is a four-line seat card: one task sentence, one owner, the other app closed.** The calendar title says six months in. I am not going to invent a diary or an hours-saved column for the habit. The [first-month map](/blog/cursor-claude-code-daily-workflow) already walks a day in both tools. What I kept is the card.

I am William Spurlock, AI Systems Architect and Fractional AI CTO at Spurlock Studios LLC. Cursor is the AI-first editor from Anysphere. Claude Code is Anthropic's terminal coding agent. The wider board still lives in the [coding assistant showdown](/blog/complete-ai-coding-assistant-showdown). This page is the rule I use before either window opens.

## What is a Cursor and Claude Code daily driver once both tools are installed?

**A Cursor and Claude Code daily driver is the card you fill before either tool opens: the change in one sentence, whether you will watch the diff, whether the job is a repeat you already wrote down, and whether a bad edit must roll back without a commit.** Installed is not driven. Two logins and an alt-tab habit is a tour.

As of October 2, 2026, [Cursor's Agent docs](https://cursor.com/docs/agent/overview) say Agent can complete complex coding tasks, run terminal commands, and edit code. You open that side pane with Cmd+I on a Mac, or Ctrl+I on Windows and Linux. The same page says an agent is instructions, tools, and the model you pick, and that there is no limit on the number of tool calls during a task. That last line is why a watched session can wander. The card is the fence.

Claude Code is the other seat. As of October 2, 2026, [Anthropic's extension guide](https://code.claude.com/docs/en/features-overview) says `CLAUDE.md` loads in full at session start, and a skill loads on demand. By default the description is visible when the session starts and the body loads when the skill is used. That is the terminal job you can leave.

<table>
<thead>
<tr><th>Line on the card</th><th>What you write</th><th>Seat it points at</th></tr>
</thead>
<tbody>
<tr><td>The change</td><td>One sentence a teammate could repeat</td><td>One owner. The other app stays closed.</td></tr>
<tr><td>Watch the diff</td><td>Yes or no</td><td>Yes means Cursor Agent</td></tr>
<tr><td>Already written down</td><td>A slash name, or blank</td><td>A slash name means Claude Code</td></tr>
<tr><td>Rollback without a commit</td><td>Yes or no</td><td>Yes means a Cursor checkpoint, then Git if it must stick</td></tr>
</tbody>
</table>

I fill those four lines in the notes app I already have open. I do not install a fifth tool to choose between two.

- If I cannot write the sentence, I do not have a task. I have a mood.
- If two sentences show up, I split them. Two sentences are two runs.
- The card is not a prompt. It picks which file is allowed to speak.
- A blank slash name plus "watch the diff: yes" is Cursor. I do not open Claude Code to supervise it.

A rename inside one component folder is a Cursor sentence: I want the diff on screen. A "what changed in this working tree" pass is the kind of job Anthropic uses as the skills getting-started example, `/summarize-changes`, on the [skills doc](https://code.claude.com/docs/en/skills) I read October 2, 2026. If I have already saved that skill, the card says Claude Code, and Cursor stays closed. I am not claiming I ran that example for a client. I am using the doc's own example as the shape.

## What goes wrong when Cursor and Claude Code stay open on the same task?

**Two owners on one sentence produce two diffs, and the checkpoint button will not save you from the edit you forgot to commit.** I think the second window is usually comfort. It feels like a review. It is a second author.

Three failures show up on real afternoons. None of them need a made-up client to be true. They follow from the docs.

<table>
<thead>
<tr><th>Failure</th><th>What you see</th><th>What the docs actually say</th></tr>
</thead>
<tbody>
<tr><td>Tab "should have known"</td><td>You accept a completion that ignores the standing rule</td><td>Rules do not apply to Tab, Inline Edit, or Bugbot</td></tr>
<tr><td>A skill wakes up</td><td>A publish or deploy run starts because the description matched</td><td>Hide side-effect skills until you type the slash command</td></tr>
<tr><td>Checkpoint as backup</td><td>The timeline dot looks like a commit</td><td>Checkpoints are local, separate from Git, and restore files only</td></tr>
</tbody>
</table>

Rules do not ride along with Tab. As of October 2, 2026, [Cursor's rules help](https://cursor.com/help/customization/rules) says rules do not apply to Tab completion, Inline Edit, or Bugbot pull-request reviews. If you accept a Tab suggestion and expect the seat card to police it, you are wrong. The card binds the chat modes. [Cursor's agent help](https://cursor.com/help/ai-features/agent) says project rules, user rules, and team rules apply in Agent, Ask, Plan, and Debug.

A skill description can fire because the words matched. Anthropic's extension guide says the description is in context at session start unless you hide it. If the skill publishes, deploys, or sends, that is a side effect. The same guide says to set `disable-model-invocation: true` so nothing from that skill loads until you invoke it. I want that flag on any skill I would not want started by a nearby sentence. When the file itself is the subject, I use the [Claude Code skills guide](/blog/claude-code-skills-authoring-guide). Here I only care that the flag exists and that I set it on purpose.

Checkpoints are not Git. [Cursor's Agent overview](https://cursor.com/docs/agent/overview), as of October 2, 2026, says checkpoints are stored locally, separate from Git, and restoring one reverts files only. It does not remove the chat. If the work must survive a different machine, I commit. I do not treat the timeline dot as a backup.

When the card has an owner, I close the other seat:

- Claude Code, if I am watching a Cursor diff
- Cursor Agent, if I typed a slash skill and left the terminal
- A side chat on the same sentence, even though Cursor offers one

That side-chat line is my opinion sitting on a real feature. The Agent overview says you can open a side chat with `/side` or `/btw` to chase a tangent without interrupting the main thread. A tangent is a new sentence. It waits until the first sentence has an owner and a result. I do not run it as a shadow review of the edit in progress.

There is no tool-call cap to save you if both stay open. Cursor's Agent docs say there is no limit on the number of tool calls during a task. Two unlimited sessions on one sentence is how a small rename becomes a branch you do not recognize.

## How do I pick Cursor or Claude Code for the next task?

**I pick Cursor when I will watch the diff in the editor, and I pick Claude Code when the job already has a slash name and I can leave the terminal.** I do not pick by which logo feels sharper that morning.

1. Write the sentence on the card. If it has an "and" in the middle that hides a second job, split it before you open anything.
2. If you will watch every edit, open Cursor Agent with Cmd+I (Ctrl+I on Windows and Linux). Use Ask if you only want a read. [Cursor's agent help](https://cursor.com/help/ai-features/agent) says Ask mode is read-only.
3. If the change crosses files and you want the approach on screen before any edit, use Plan. The same help page says Plan can edit files after you approve the plan. Shift+Tab cycles modes, and each mode starts a fresh context window. Do not flip modes mid-sentence and expect the old chat to come along.
4. If the sentence matches a skill you already saved, open Claude Code and type the slash command. As of October 2, 2026, the [skills doc](https://code.claude.com/docs/en/skills) says a file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy`. I do not keep both files for the same name. New work goes in the skill folder, because that folder can hold the extra notes the command file cannot.
5. If a bad edit must disappear before any commit, stay in Cursor and use the checkpoint. Then commit the version you mean to keep. Claude Code does not get that sentence.
6. Close the other app. Minimized is not closed. You will click it.

<table>
<thead>
<tr><th>Card answer</th><th>Seat</th><th>Fact I am using, read October 2, 2026</th></tr>
</thead>
<tbody>
<tr><td>Watch the diff</td><td>Cursor Agent</td><td>Cmd+I or Ctrl+I, edits land in the diff view</td></tr>
<tr><td>Read only</td><td>Cursor Ask</td><td>Ask does not edit files</td></tr>
<tr><td>Review the approach first</td><td>Cursor Plan</td><td>Edits start after you approve the plan</td></tr>
<tr><td>Repeat with a slash name</td><td>Claude Code skill</td><td>The body loads when you use the skill</td></tr>
<tr><td>Publish, deploy, or send</td><td>Claude Code, typed by you</td><td>`disable-model-invocation: true`</td></tr>
<tr><td>Undo before a commit</td><td>Cursor checkpoint, then Git</td><td>A checkpoint is local, not a commit</td></tr>
</tbody>
</table>

I do not send the same sentence to Claude Code "to be sure" after Cursor has already edited. That is a second patch on top of a patch you have not finished reading. If the Cursor result is wrong, restore the checkpoint or revert the commit, rewrite the sentence, and run once.

Plan mode is not a polite name for Claude Code. Plan stays in the editor, on the files you can see, and it waits for your approval. Claude Code is the run you can leave because the procedure already lives in `SKILL.md`. If you do not have the procedure written down, you do not have a Claude Code task yet. You have a Cursor task, or you have homework: write the skill first, on a different sentence.

## How do I stop Cursor rules and a Claude Code skill from saying different things?

**One shared sentence lives in `CLAUDE.md`, because Cursor always applies that file and Claude Code loads it every session.** Conditional editor behavior stays in `.cursor/rules`. A repeat procedure stays in a skill. Copies drift. I delete the copy.

As of October 2, 2026, [Cursor's rules help](https://cursor.com/help/customization/rules) says Cursor reads `CLAUDE.md` the same way it reads `AGENTS.md`, and `CLAUDE.md` is always applied to every conversation, regardless of any `alwaysApply` frontmatter. That is the bridge. I do not keep a second "always" sentence in a Cursor rule and hope I remember both on a Friday.

Cursor project rules are `.mdc` files in `.cursor/rules`. [The rules reference](https://cursor.com/docs/rules) says a plain `.md` file in that folder is ignored because it has no frontmatter for `description`, `globs`, and `alwaysApply`. If I want plain markdown, I use `AGENTS.md`. The same page says `AGENTS.md` works in the project root and in subdirectories. Nested files combine with parents, and the more specific file takes precedence.

The four application types on that page:

- Always Apply: `alwaysApply` true. Globs and description are ignored. The rule is in every chat session.
- Apply Intelligently: `alwaysApply` false, a description is set, globs are omitted. Agent pulls the rule when the description matches.
- Apply to Specific Files: globs are set and `alwaysApply` is false. The rule attaches when a matching file is in context.
- Apply Manually: no description and no globs. You `@`-mention the rule.

When guidance conflicts, Cursor applies Team Rules, then Project Rules, then User Rules. Earlier sources win. I do not fight a team rule with a louder project rule. I change the team rule, or I live with it.

Line caps, both from pages I read on October 2, 2026:

- [Cursor's rules reference](https://cursor.com/docs/rules) says keep rules under 500 lines, and split a large rule into smaller ones.
- [Anthropic's extension guide](https://code.claude.com/docs/en/features-overview) says keep `CLAUDE.md` under 200 lines and move reference material into skills.

The legacy `.cursorrules` file in the project root will be deprecated. Cursor's help says to create a new rule, paste the old text, set the type to Always Apply, and delete `.cursorrules`. If a repo still has that file, it is a leftover, not the daily driver.

Skill paths, from the [skills doc](https://code.claude.com/docs/en/skills) the same day:

- Personal: `~/.claude/skills/<name>/SKILL.md`, all projects on that machine
- Project: `.claude/skills/<name>/SKILL.md`, this repo

The directory name is the command you type. I put the shared sentence in the project `CLAUDE.md` so a teammate gets it with the repo. A personal skill stays in the home folder only when it is mine alone. A checkout that does not have that home folder does not have that skill. I do not put a repo rule there and call it shared.

Once a week I do this and nothing fancier:

1. Read the shared sentence in `CLAUDE.md` out loud. If it takes two breaths, it is two sentences. Split it.
2. Search `.cursor/rules` for the same instruction. If a rule repeats it, delete the repeat.
3. If `CLAUDE.md` grew a procedure, move the steps into `.claude/skills/<name>/SKILL.md` and leave the fact behind.
4. If a rule file is pushing 500 lines, split it. If `CLAUDE.md` is pushing 200, move the reference out the same day.

<table>
<thead>
<tr><th>File</th><th>Who reads it</th><th>When it loads</th><th>Cap I respect</th></tr>
</thead>
<tbody>
<tr><td><code>CLAUDE.md</code></td><td>Cursor and Claude Code</td><td>Cursor: every conversation. Claude Code: full text at session start</td><td>200 lines</td></tr>
<tr><td><code>AGENTS.md</code></td><td>Cursor</td><td>Root and nested directories. The closer file wins</td><td>Plain markdown, no frontmatter</td></tr>
<tr><td><code>.cursor/rules/*.mdc</code></td><td>Cursor Agent, Ask, Plan, Debug</td><td>By alwaysApply, description, or globs</td><td>500 lines</td></tr>
<tr><td><code>.claude/skills/&lt;name&gt;/SKILL.md</code></td><td>Claude Code</td><td>Description at start unless hidden. Body when used</td><td>One procedure</td></tr>
<tr><td><code>~/.claude/skills/&lt;name&gt;/SKILL.md</code></td><td>Claude Code on that machine</td><td>Same load, every project on that machine</td><td>Not a repo rule</td></tr>
</tbody>
</table>

User rules in Cursor settings are a different drawer. The rules reference says they are global preferences for Agent chat, and the help page says they do not apply to Inline Edit. I keep tone there ("short replies"). I do not keep the seat card there. A tone preference is not a project fact, and it will not travel with the repo.

## How do I check that my Cursor and Claude Code daily driver is still the one I use?

**For one week I log three columns, task sentence, seat opened, and whether the other tool opened anyway, and I do not turn that log into a percentage.** A percentage would be a costume. The pass test is binary: one owner per sentence, or the card is a poster.

<table>
<thead>
<tr><th>Column</th><th>What I write</th><th>Fail</th></tr>
</thead>
<tbody>
<tr><td>Sentence</td><td>The one line from the card</td><td>Two jobs hiding behind "and"</td></tr>
<tr><td>Seat</td><td>Cursor Agent, Ask, Plan, or a slash name</td><td>Blank, or both names</td></tr>
<tr><td>Other tool</td><td>Closed, or the minute I opened it</td><td>Opened before the sentence was done</td></tr>
</tbody>
</table>

Seven rows is the whole test. I do not backfill from memory on Friday.

- If the other-tool column is not "closed" on most rows, the card is decoration. I rewrite the sentence shape, not the slogan.
- I do not add an hours-saved column. I do not have a meter on this habit, and I will not invent one.
- A row that needed both tools means the sentence was two jobs. Next time I split it before either app opens.
- A row that used Tab for the real change does not count as Cursor Agent. Tab never saw the rules. I mark the seat "Tab" and I treat it as a miss if the standing sentence mattered.

I keep the log in the repo only if the team wants the same test. Otherwise it stays in a private note. The point is the miss, not a dashboard.

The first-month writeup is still the right tour if you have not installed both tools or you have never written a rule file. Start there, then come back and cut the day down to this card. The showdown is the right page if you are still choosing a vendor. This page assumes the pair is already on the machine.

## FAQ

### Do Cursor project rules apply to Tab completion?

**No.** As of October 2, 2026, [Cursor's rules help](https://cursor.com/help/customization/rules) says rules do not apply to Tab completion, Inline Edit, or Bugbot pull-request reviews. The seat card binds Agent, Ask, Plan, and Debug. A Tab accept is still your keystroke, and it will not consult `.cursor/rules`.

### Does Cursor read a CLAUDE.md file?

**Yes.** The same rules help says Cursor reads `CLAUDE.md` the same way it reads `AGENTS.md`, and that `CLAUDE.md` is always applied, ignoring `alwaysApply` frontmatter. That is why the one shared sentence in my daily driver lives in `CLAUDE.md` and not in a second always-on rule.

### Where do Claude Code skills live?

**Personal skills live at `~/.claude/skills/<name>/SKILL.md`, and project skills live at `.claude/skills/<name>/SKILL.md`.** Anthropic's [skills doc](https://code.claude.com/docs/en/skills), as of October 2, 2026, says the personal path applies to all your projects and the project path applies to that repo. The directory name is the slash command.

### What does disable-model-invocation do on a Claude Code skill?

**It hides the skill until you invoke it.** [Anthropic's extension guide](https://code.claude.com/docs/en/features-overview) says nothing from that skill loads beforehand, and it tells you to set the flag on skills with side effects. I set it on anything that publishes, deploys, or sends. A description match is not a good reason to ship.

### Is AGENTS.md enough to steer Cursor Agent?

**For a short plain-markdown brief, yes.** [Cursor's rules reference](https://cursor.com/docs/rules) says `AGENTS.md` is the alternative to `.cursor/rules` when you do not want frontmatter. Nested files combine, and the closer file wins. I still use `.mdc` when I need globs or a manual `@`-mention. A plain `.md` file dropped into `.cursor/rules` is ignored.

### When should I use Cursor Plan mode instead of Claude Code?

**Use Plan when you are staying in the editor and you want the approach approved before files change.** [Cursor's agent help](https://cursor.com/help/ai-features/agent) says Plan can edit after you approve, and Ask cannot edit. I use Claude Code when the job is already a slash skill I can leave. I do not run Plan and a skill on the same sentence.

### How long should CLAUDE.md stay for a Claude Code daily driver?

**Under 200 lines.** Anthropic's extension guide says keep `CLAUDE.md` under 200 lines and move reference material into skills, which load on demand. Cursor's cap for a rule file is 500 lines. I treat 200 as the shared-file cap because both tools read `CLAUDE.md`.

### Do Cursor rules apply in Ask, Plan, and Debug?

**Yes.** Cursor's agent help says project, user, and team rules apply in Agent, Ask, Plan, and Debug. Shift+Tab cycles the modes, and switching starts a fresh context window. Tab and Inline Edit sit outside that list, on the rules help page.

### What is the difference between a Cursor rule and a Claude Code skill?

**A Cursor rule is included from frontmatter while you are in Agent, Ask, Plan, or Debug. A Claude Code skill is a `SKILL.md` whose body loads when you use it.** Rules do not become slash commands. A skill can. If both would say the same always-on sentence, I keep that sentence in `CLAUDE.md` and delete the twin.

I am William Spurlock, AI Systems Architect and Fractional AI CTO at Spurlock Studios LLC. The counts I will stand behind are separate from this habit: 600+ automations built and 500+ live, 20,000+ hours architecting agentic systems, and 35,000+ hours saved for clients. None of those figures are a Cursor score. They are why I refuse a second owner on one sentence.

If both tools are open and there is no card, bring one task sentence to an [AI automation strategy call](/contact). I will tell you which seat gets it, which file should hold the standing sentence, and which skill needs the manual flag. I will not invent an hours-saved number to make the habit look finished.
