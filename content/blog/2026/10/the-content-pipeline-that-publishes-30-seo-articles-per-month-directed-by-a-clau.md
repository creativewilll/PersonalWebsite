---
title: "The Content Pipeline That Publishes 30 SEO Articles per Month — Directed by a Claude Code Skill"
slug: "the-content-pipeline-that-publishes-30-seo-articles-per-month-directed-by-a-clau"
date: "2026-10-01"
lastModified: "2026-10-01"
author: "William Spurlock"
readingTime: 17
categories:
  - "AI Automation"
tags:
  - "claude code skill"
  - "content pipeline"
  - "seo articles"
  - "SKILL.md"
  - "publishing workflow"
featured: false
draft: false
excerpt: "I direct every SEO article with a Claude Code skill for a content pipeline: one slug, a URL for every number, a human on the push, then the run stops cold."
coverImage: "/images/blog/the-content-pipeline-that-publishes-30-seo-articles-per-month-directed-by-a-clau.png"
coverImageAlt: "Night desk clipboard aimed at a queue of folders, one folder circled in red, for a content pipeline skill"
seoTitle: "Claude Code Skill for 30 SEO Posts | William Spurlock"
seoDescription: "A Claude Code skill for a content pipeline ships one SEO article per run. Keep the publish skill manual so a 30-article month cannot freelance the queue."
seoKeywords:
  - "Claude Code skill for a content pipeline"
  - "publish one SEO article per run"
  - "Claude Code SKILL.md publishing"
  - "disable-model-invocation"
  - "30 SEO articles a month"
  - "project skill vs personal skill"
  - "content pipeline shift card"
aioTargetQueries:
  - "Claude Code skill for a content pipeline"
  - "What is a Claude Code skill that directs a content pipeline?"
  - "Why keep a publish skill from running on its own?"
  - "How do I write a Claude Code skill that ships one SEO article per run?"
  - "What should a content skill hand to Airtable, git, and a human editor?"
  - "How do I check that a 30-article month stayed inside the skill?"
  - "Does a Claude Code skill replace an n8n content workflow?"
  - "Where should a content-pipeline skill live, in the home folder or the repo?"
  - "How is a Claude Code skill different from a CLAUDE.md publishing rule?"
  - "Can one skill invocation publish all 30 SEO articles?"
  - "What belongs in a Claude Code skill description for a publishing workflow?"
  - "Should the content skill generate the cover image?"
  - "How do I stop a content skill from inventing statistics?"
  - "Do cloud sessions see a skill stored only in the home directory?"
contentCluster: "growth-engineering"
pillarPost: false
parentPillar: "the-ai-content-pipeline-that-publishes-30-seo-articles-a-month-without-burning-out"
entityMentions:
  - "William Spurlock"
  - "Claude Code"
  - "Anthropic"
  - "Spurlock Studios LLC"
  - "Google Search"
  - "Airtable"
  - "n8n"
  - "SKILL.md"
serviceTrack: "ai-automation"
---

# The Content Pipeline That Publishes 30 SEO Articles per Month, Directed by a Claude Code Skill

**A Claude Code skill for a content pipeline is a shift card.** It tells Claude Code to finish one SEO article and stop. It does not build the factory, and it does not get to clear the month in a single sitting.

I'm William Spurlock, AI Systems Architect and Fractional AI CTO at Spurlock Studios LLC. The station map for briefs, drafts, and human gates already lives in [the AI content pipeline that publishes about 30 SEO articles a month](/blog/the-ai-content-pipeline-that-publishes-30-seo-articles-a-month-without-burning-out). The file anatomy lives in [the Claude Code skills authoring guide](/blog/claude-code-skills-authoring-guide). This page is the rule those two left open: the skill may not pick up a second slug.

I have spent 20,000+ hours architecting agentic systems. I have built 600+ automations, with 500+ of them live. That work has saved 35,000+ hours for clients. None of those receipts are a promise that your calendar will hit thirty articles. Thirty is a count of runs, and only if you invoke the skill thirty separate times and make each run stop.

## What is a Claude Code skill that directs a content pipeline?

**A Claude Code skill that directs a content pipeline is a `SKILL.md` file whose instructions cover one article and then say stop.** On the [Claude Code skills docs](https://code.claude.com/docs/en/skills) I read on October 1, 2026, Anthropic says Claude uses a skill when it is relevant, or you invoke it with a slash name such as `/skill-name`. There is no hidden "content factory" mode. You get a folder, a markdown file, and a command.

I name mine `publish-one-article`. It lives in the repo at `.claude/skills/publish-one-article/SKILL.md`. The folder name is the command. The description is how a listing decides the skill might apply. The body is the order of work for a single slug.

<table>
<thead>
<tr><th>Piece</th><th>Job on one run</th></tr>
</thead>
<tbody>
<tr><td>SKILL.md body</td><td>Step order and the stop line</td></tr>
<tr><td>description</td><td>First sentence kept inside the 1,536-character listing cap</td></tr>
<tr><td>Supporting files</td><td>Voice rules, claims rule, link rule, loaded only when a step names them</td></tr>
<tr><td>disable-model-invocation</td><td>A person starts the skill. The model does not.</td></tr>
<tr><td>Airtable row</td><td>The one slug, the questions, the claim URLs</td></tr>
<tr><td>n8n</td><td>Moves a row across days. Does not author the skill.</td></tr>
</tbody>
</table>

The file is allowed to know five things:

- The date the person named, and the one slug on that schedule row
- The question cluster already locked for that slug
- The claims rows, each with a URL and a source date
- The two paths it may create: the markdown file and the cover PNG
- The stop line: if either file is already on disk, quit and say so

It is not a license to invent:

- A client name you did not hand it
- A payback percent
- A second slug "while we are here"
- A rewrite of last month's post so the new one "matches"

Anthropic also draws a hard split with project memory. Unlike `CLAUDE.md` content, a skill body loads only when the skill is used, according to those same docs I read on October 1, 2026. I want the publishing procedure cold until someone types the command. I do not want it leaking into a refactor session at 4 p.m.

The older command-file path still works. A markdown file at `.claude/commands/publish-one-article.md` and a skill at `.claude/skills/publish-one-article/SKILL.md` both create `/publish-one-article`. The docs say to prefer a skill for new work, because a skill folder can hold supporting files. I follow that. Voice rules and the source list do not belong on the first screen.

Claude Code skills follow the [Agent Skills](https://code.claude.com/docs/en/skills) open standard. Claude Code adds invocation control, subagent execution, and a shell prefix that runs a command and inlines the output before the model reads the skill. I use the shell prefix for a read-only schedule check. I do not use it to push.

## Why keep a publish skill from running on its own?

**I set `disable-model-invocation` to true on any skill that can write a post, commit, or push.** Anthropic's docs use that flag for workflows with side effects. Their examples are `/commit`, `/deploy`, and `/send-slack-message`. The sentence I keep is plain: you do not want the model deciding to deploy because the work looks ready. I read that on the [skills page](https://code.claude.com/docs/en/skills) on October 1, 2026. Publishing is the same class of act. A tidy outline is not permission.

As of Claude Code v2.1.196, that flag also stops the skill from running when a scheduled task fires with the skill as its prompt. Read that if you want a clock to publish. A scheduled run is a side effect on a timer. If you lift the flag so the clock can fire, you still owe a person on the claims before anything is pushed. I do not lift the flag for a chat session. A person types `/publish-one-article`.

Google's stake sits next to Anthropic's flag, and it is the one that can demote the domain. On the [spam policies](https://developers.google.com/search/docs/essentials/spam-policies) page I read October 1, 2026, Google defines scaled content abuse as many pages generated for the primary purpose of manipulating search rankings and not helping users, no matter how the pages are created. The same page lists generative AI tools used to generate many pages without adding value for users as an example.

A 30-article month is not automatically that abuse. It becomes that abuse when the skill's success line is "30 URLs exist" instead of "30 pages a specific reader needed." The skill has to say which test it is grading, in writing, or the model will grade volume.

<table>
<thead>
<tr><th>Who starts the skill</th><th>What the docs say</th><th>What I allow for publish</th></tr>
</thead>
<tbody>
<tr><td>A person types the slash command</td><td>Full skill loads for that turn</td><td>Yes. This is the default.</td></tr>
<tr><td>The model decides the skill looks relevant</td><td>Blocked when disable-model-invocation is true</td><td>Never</td></tr>
<tr><td>A scheduled task uses the skill as its prompt</td><td>Also blocked as of v2.1.196 while the flag is true</td><td>Only after a person accepts the timer and still checks claims</td></tr>
<tr><td>A forked subagent</td><td>Does not see this conversation</td><td>Not for the publish skill</td></tr>
</tbody>
</table>

When the flag is off, I have watched models try four moves that are not in the file:

- They open a second slug because the first one "suggested a follow-up"
- They stick a percentage on the closer so the page feels finished
- They skip the cover because the markdown "is the article"
- They edit an older post so the new one has company

None of those moves are instructions. They show up when the model is allowed to decide that publishing is the task.

## How do I write a Claude Code skill that ships one SEO article per run?

**Write the first instruction as "one slug, then stop," and keep `SKILL.md` under 500 lines.** Anthropic's docs say to stay under that cap and move long reference into supporting files, because once a skill loads, its content stays in context across later turns. I read that limit on the [skills docs](https://code.claude.com/docs/en/skills) on October 1, 2026. Every extra paragraph in the body is rent you pay on each turn of the run.

The description has its own cut. The combined `description` and `when_to_use` text is truncated at 1,536 characters in the skill listing. Put the use case in the first sentence: "Publish exactly one scheduled SEO article. Use when a person types /publish-one-article." If the real rule sits past the cut, the listing never shows it.

I do not set `context: fork` on this skill. Fork starts a subagent that does not see the conversation. The skill content becomes that subagent's prompt. That shape fits a research pass. It does not fit a publish pass, because the last correction in the thread ("kill the second slug", "that number has no URL") has to remain visible. The docs are explicit that a forked skill does not receive the chat so far.

<table>
<thead>
<tr><th>Block in the skill</th><th>Instruction I write</th></tr>
</thead>
<tbody>
<tr><td>Scope</td><td>One slug from the named date. Ignore every other row.</td></tr>
<tr><td>Exists check</td><td>If the markdown or the PNG is already on disk, stop.</td></tr>
<tr><td>Claims</td><td>No number ships without a URL and a source date.</td></tr>
<tr><td>Draft</td><td>One heading at a time. The answer is the first sentences.</td></tr>
<tr><td>Human</td><td>Stop before git. A person reads the claims.</td></tr>
<tr><td>Cover</td><td>A new PNG for this slug, or stop.</td></tr>
<tr><td>Gate</td><td>Frontmatter check and link check. A failure means stop.</td></tr>
<tr><td>Exit</td><td>Do not open a second article in this run.</td></tr>
</tbody>
</table>

The run order I put under those blocks:

1. Read the schedule for the date the person named. If they named none, use today.
2. If more than one unpublished row is due, take the first and leave the rest.
3. If the markdown file or the cover PNG already exists, stop and report the path.
4. Confirm the cluster is 3 to 5 questions, and that every number you plan to print already has a claims row.
5. Draft one heading at a time. Lead each heading with the answer in the first sentences.
6. Stop and ask a person to read the claims before any git command.
7. Require a new cover PNG at the slug path. If the image step fails, stop. Do not copy another slug's file.
8. Run the repo's frontmatter check and the link check. If either fails, stop.
9. Do not open a second article. Print the slug you finished and exit.

A shell prefix is useful at step 1 and dangerous anywhere near a push. Anthropic's getting-started example runs a command and inlines the output before the model sees the skill. I use that for `git status` and for a read-only look at the schedule. I do not use it for `git push`. A push is a side effect. It sits behind the person, not inside a line the skill fires while it loads.

Supporting files I keep beside `SKILL.md`:

- `voice.md` for the phrases this brand does not use, and for the register of the post
- `claims.md` for the rule that a number without a URL does not ship
- `links.md` for the rule that an internal link must point at a markdown file already on disk

The skill names those files. They load when a step needs them, not on every turn. That is the split in the docs: `SKILL.md` stays the map, and the long pages stay next door, under the 500-line cap.

Here is the shape on a real date, with no invented outcome. On October 1, 2026 the queue has one due slug. The skill reads that row. It refuses to also rewrite the July factory post. It will not print the 1,536-character cap, the v2.1.196 flag, or Google's scaled-content definition unless those sentences already have claim rows and URLs. A person checks the Google sentence against the spam-policy page. The cover is a new PNG for this slug. Then the run stops, even if the model can see tomorrow's row.

## What should a content skill hand to Airtable, git, and a human editor?

**The skill may draft two files. A person still owns the claims, the cover judgment, and the push.** Airtable holds the queue. Git holds the artifact after a yes. The editor is the only seat that can call a sentence true.

<table>
<thead>
<tr><th>Hand-off</th><th>Skill</th><th>Human</th><th>System of record</th></tr>
</thead>
<tbody>
<tr><td>Queue row</td><td>Read the date and the slug</td><td>Lock the questions and the claims</td><td>Airtable</td></tr>
<tr><td>Markdown</td><td>Draft the file</td><td>Cut any sentence whose number has no URL</td><td>Git, after a yes</td></tr>
<tr><td>Cover</td><td>Write the prompt and save one PNG</td><td>Reject a generic image or a copy</td><td>The slug path under public images</td></tr>
<tr><td>Published status</td><td>Must not flip it</td><td>Confirms after the push</td><td>Airtable</td></tr>
<tr><td>Where the skill lives</td><td>Must not assume the home folder on a cloud run</td><td>Commits the project skill</td><td>Repo path .claude/skills</td></tr>
</tbody>
</table>

Cloud sessions change where the skill file has to live. Personal skills under `~/.claude/skills/` load across projects on that machine. Anthropic's docs, as I read them on October 1, 2026, say those home-folder skills do not load in Cowork or cloud sessions. Project skills under `.claude/skills/` load in sessions started in that repository. Cloud sessions load the project skills committed in the cloned repo. The page for that split is the [skills docs](https://code.claude.com/docs/en/skills).

If the daily run starts on a fresh cloud machine, a skill that exists only in your home folder is invisible. Commit the skill. Do not expect the home directory to show up on a machine that was born this morning.

The hand-off note I make the skill print before it stops:

- The slug it finished
- The markdown path it wrote
- The cover path it wrote
- The claims it used, each with a URL
- The questions it answered
- The paths it did not touch
- The exact next command it wants a person to run, which it has not run itself

n8n still has the conveyor job. The skill does not replace a workflow that moves a row from brief to draft to edit on a clock. n8n is the open-source workflow platform that can carry status. The skill is the written order for the drafting seat inside one run. If you need the station map, use the July factory post. This file will not redraw it.

## How do I check that a 30-article month stayed inside the skill?

**Count runs and files, not adjectives.** Thirty articles means thirty invocations that each stopped on one slug. A single run that touches two markdown files failed, even if both drafts sound fine.

[How often to publish for AI visibility](/blog/how-often-to-publish-for-ai-visibility-and-what-to-publish) answers the cadence question. This section answers a different one: did the director stay in its lane while you held that cadence.

<table>
<thead>
<tr><th>Check</th><th>Pass</th><th>Fail</th></tr>
</thead>
<tbody>
<tr><td>Commits in the month</td><td>One new markdown path each</td><td>A commit edits an older post</td></tr>
<tr><td>Files in the commit</td><td>The new markdown and its PNG</td><td>Any other path</td></tr>
<tr><td>Numbers</td><td>Each has a claims URL dated before the draft</td><td>A percent with no row</td></tr>
<tr><td>Flag</td><td>disable-model-invocation is still true</td><td>The model can start publish on its own</td></tr>
<tr><td>Description</td><td>The one-slug sentence sits inside 1,536 characters</td><td>The real rule is past the cut</td></tr>
<tr><td>Cover</td><td>A new file for this slug</td><td>A reused PNG from another slug</td></tr>
</tbody>
</table>

The weekly pass I actually run:

- `git log` for the month shows one new content path per publish commit
- No commit in that list edits an older post "for consistency"
- Every number in the new file has a claims row dated before the prose
- `disable-model-invocation` is still true
- The description's first sentence is still the one-slug rule, inside the 1,536-character cap
- The cover PNG for that slug exists and is not last week's file with a new name

If a run wants to fix yesterday's post, that is a different command, on a day a person asked for the fix. The publish skill does not grow a cleanup hobby.

The only math the skill is allowed to believe: one article per run, times thirty runs, is a thirty-article month. I am not reporting a client who hit that number. I am reporting the arithmetic the file is allowed to treat as success. Google's test, from the spam policy cited above, is still whether those pages help a user. The count does not answer that. The claims table and the human read do.

## Questions operators ask before they trust the skill

**The skill stays manual, lives in the repo, finishes one slug, and refuses a number with no claims row.** These are the questions I get when someone wants thirty articles and does not yet have a shift card.

- Manual invoke, or the model will treat a tidy outline as permission to publish
- One slug per run, or the month collapses into a single freelance draft
- Claims with URLs before prose, or the page invents a result
- A project skill committed in the repo, or a cloud run cannot see it

<table>
<thead>
<tr><th>Question</th><th>Rule it protects</th></tr>
</thead>
<tbody>
<tr><td>Skill versus n8n</td><td>The conveyor and the shift card are different seats</td></tr>
<tr><td>Home folder versus repo</td><td>Cloud runs do not read your home skills</td></tr>
<tr><td>Skill versus CLAUDE.md</td><td>Procedure loads on command. Facts can sit all session.</td></tr>
<tr><td>All 30 in one invoke</td><td>Volume is thirty stops, not one marathon</td></tr>
</tbody>
</table>

### Does a Claude Code skill replace an n8n content workflow?

**No. The skill directs one drafting run, and n8n still moves the row across stages on a clock.** I keep both. The skill file should not hold API keys, and it should not press publish by itself. Anthropic's side-effect note on the [skills docs](https://code.claude.com/docs/en/skills), which I read on October 1, 2026, is why the publish command stays manual.

### Where should a content-pipeline skill live, in the home folder or the repo?

**Put a publishing skill in the repo at `.claude/skills/` and commit it.** Personal skills in the home folder load on that machine and, per the [skills docs](https://code.claude.com/docs/en/skills) I read on October 1, 2026, do not load in cloud sessions. A fresh cloud run will miss the skill if you only saved it at home.

### How is a Claude Code skill different from a CLAUDE.md publishing rule?

**`CLAUDE.md` holds facts that sit in context for the session. A skill body loads only when you invoke it.** Anthropic states that split on the [skills page](https://code.claude.com/docs/en/skills). I keep house facts in `CLAUDE.md`. I keep the one-slug procedure in the skill so a refactor chat does not inherit a publish ritual.

### Can one skill invocation publish all 30 SEO articles?

**No. One invocation finishes one slug and stops.** A 30-article month is thirty runs. A skill that tries to clear the month in one sitting will invent bridges between posts and will edit files you did not name.

### What belongs in a Claude Code skill description for a publishing workflow?

**The first sentence states the one-slug job and the slash command that should trigger it.** The listing truncates `description` plus `when_to_use` at 1,536 characters, according to the [Claude Code skills docs](https://code.claude.com/docs/en/skills) I read on October 1, 2026. Anything past that cut is invisible when the model decides whether the skill applies.

### Should the content skill generate the cover image?

**Yes. Treat the PNG as a required step that stops the run when the file is missing.** The skill may write the prompt and save one new 16:9 image at the slug path. It may not copy another slug's file, and it may not ship markdown alone.

### How do I stop a content skill from inventing statistics?

**Make a claims row with a URL and a date a precondition for every number, and tell the skill to delete the sentence if the row is missing.** I do not let a hunch harden into a percent. Google's [scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies) examples, on the page I read October 1, 2026, include generative tools producing many pages that add no value. An invented stat is that failure in one sentence.

### Do cloud sessions see a skill stored only in the home directory?

**No. Cowork and cloud sessions do not read `~/.claude/skills/` on your machine.** Cloud sessions do load project skills committed under `.claude/skills/` in the cloned repository, per the [skills docs](https://code.claude.com/docs/en/skills) I read on October 1, 2026. If the run is born in the cloud, commit the skill or accept that the command will not be there.

### Does the old commands file still publish an article?

**A command file still creates the slash command, and a skill folder with the same name does too.** The [skills docs](https://code.claude.com/docs/en/skills) I read on October 1, 2026 say both paths work, and they prefer a skill for new work because the folder can hold supporting files. I do not keep two copies. The skill stays, and the command file goes, so the ritual is not edited in two places.

I am William Spurlock. I build this class of system at Spurlock Studios LLC. On an [AI automation strategy call](/contact), bring the skill file, or say you do not have one yet. I will tell you whether the first instruction is actually "one slug, then stop," whether publish is still manual, and whether the claims table exists. I will not invent a traffic number to make the month look finished.
