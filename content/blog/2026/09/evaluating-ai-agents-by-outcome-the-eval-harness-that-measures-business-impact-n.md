---
title: "Evaluating AI Agents by Outcome: The Eval Harness That Measures Business Impact, Not Token Math"
slug: "evaluating-ai-agents-by-outcome-the-eval-harness-that-measures-business-impact-n"
date: "2026-09-29"
lastModified: "2026-09-29"
author: "William Spurlock"
readingTime: 18
categories:
  - "AI Agents"
tags:
  - "AI agent eval"
  - "outcome eval"
  - "pass^k"
  - "business impact"
  - "scorecard"
  - "transcripts"
featured: false
draft: false
excerpt: "Evaluating AI agents by outcome means a second person can check the end state in the system of record. Token totals stay on the bill, off the pass line."
coverImage: "/images/blog/evaluating-ai-agents-by-outcome-the-eval-harness-that-measures-business-impact-n.png"
coverImageAlt: "Night desk, blank card, red stamp, blurred chart, AI agent outcome eval."
seoTitle: "Evaluate AI Agents by Outcome | William Spurlock"
seoDescription: "Evaluate AI agents by outcome: a done sentence in the system of record, three clean trials when the job must repeat, and tokens kept off the pass line."
seoKeywords:
  - "evaluating AI agents by outcome"
  - "AI agent outcome eval"
  - "pass^k vs pass@k"
  - "AI agent scorecard"
  - "business impact of an AI agent"
  - "read AI agent transcripts"
  - "token counts vs task success"
aioTargetQueries:
  - "What is an outcome eval for an AI agent?"
  - "Why does token math hide a broken AI agent?"
  - "How do I score an AI agent on a real business job?"
  - "How do I tell if an AI agent eval is lying?"
  - "What is the difference between pass@k and pass^k for an AI agent?"
  - "How many real tasks do I need before an AI agent eval is useful?"
  - "Should I grade the path an AI agent took or the end state?"
  - "What does a zero pass rate across many trials usually mean?"
  - "Where should token counts sit on an AI agent scorecard?"
  - "Who should write the done sentence for an AI agent?"
  - "How often should I read AI agent transcripts?"
  - "When should a capability eval become a regression eval?"
contentCluster: "ai-agents-mcp"
pillarPost: false
parentPillar: "mcp-architecture-guide"
entityMentions:
  - "William Spurlock"
  - "Spurlock Studios LLC"
  - "Spurlock Studios"
  - "Anthropic"
  - "SWE-bench Verified"
  - "CORE-Bench"
  - "tau-bench"
  - "n8n"
serviceTrack: "ai-automation"
---

An outcome eval for an AI agent comes down to one sentence a second person can check against the system of record. If the only figure on the page is a token total, that is not an eval. That is a utility bill.

I'm William Spurlock, AI Systems Architect and Fractional AI CTO at Spurlock Studios LLC. I've built 600+ automations, with 500+ live, and spent 20,000+ hours architecting agentic systems that have saved clients 35,000+ hours combined. None of those hours answer the only question that matters here: did this agent do this job. The job shows up as a row, a status, a file, or a balance. The chat window only gives you a transcript.

The go-live checklist sits in [how to deploy an AI agent without breaking the business](/blog/how-to-deploy-an-ai-agent-to-production-without-breaking-everything). The monthly bill sits in [what an AI agent actually costs each month](/blog/how-much-does-an-ai-agent-actually-cost-your-business-each-month). When the agent reaches your tools through the Model Context Protocol, the wiring is covered in [the MCP architecture guide](/blog/mcp-architecture-guide). This post covers the score itself. I won't hand you a public leaderboard number and pretend it describes your business.

## What is an outcome eval for an AI agent?

**An outcome eval checks the end state in the system of record, not the closing line the agent typed in chat.** On January 9, 2026, Anthropic's engineering note drew that line with a flight-booking example: the agent can claim the flight is booked, but the outcome is whether a reservation row actually exists in the environment's SQL database ([Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)).

Most owners stop one step short of this. They read the last message and treat it as proof. But the last message is a speech, and the outcome is the row in the database. When the two disagree, the speech loses every time.

**n8n** is an open-source workflow automation platform, and it can serve as the runner here. So can a script, a vendor agent, or a custom loop. None of that matters for scoring, though. The runner isn't the score. The score is the done sentence plus the place a human looks to check it.

Put these six pieces on one card before anyone opens a chart:

1. **Task.** One job pulled from a real queue. "Refund this order" qualifies. "Be helpful" does not.
2. **Done sentence.** A single line that a second person can mark pass or fail without asking what you meant by it.
3. **Look here.** The table, file, or balance that proves it happened. Not the chat log.
4. **Trial.** One full attempt starting from a clean workspace. Leftover files from a previous attempt don't count as the agent's skill.
5. **Grader.** Whatever checks the done sentence: a field match when the field is concrete, a human when the call is a judgment.
6. **Cost column.** Tokens, turns, and clock time, recorded after the pass or fail is decided. Never used to decide it.

<table>
  <thead>
    <tr>
      <th>Piece</th>
      <th>Plain meaning</th>
      <th>Write this</th>
      <th>Do not write this</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Task</td>
      <td>One job from the queue</td>
      <td>Refund order 1841 under the posted policy</td>
      <td>Improve support</td>
    </tr>
    <tr>
      <td>Done sentence</td>
      <td>The checkable end</td>
      <td>Refund row exists, status processed, amount equals the order total</td>
      <td>The agent was polite</td>
    </tr>
    <tr>
      <td>Look here</td>
      <td>System of record</td>
      <td>Refunds table, that order id</td>
      <td>Last chat bubble</td>
    </tr>
    <tr>
      <td>Trial</td>
      <td>One clean attempt</td>
      <td>Fresh workspace, same task</td>
      <td>A rerun that can see the last attempt's files</td>
    </tr>
    <tr>
      <td>Grader</td>
      <td>Who marks the sentence</td>
      <td>Field check, or a human on a judgment</td>
      <td>The same agent grading its own speech</td>
    </tr>
    <tr>
      <td>Cost column</td>
      <td>The bill, after the mark</td>
      <td>Tokens, turns, seconds</td>
      <td>A token cap used as the pass rule</td>
    </tr>
  </tbody>
</table>

Anthropic splits graders into three kinds in that same January 9, 2026 note, and I use the same split:

- **State and code checks**, for when the end state is a field, a file, or a test. Fast and repeatable, but brittle if you demand one exact wording of prose.
- **Model graders**, for when the end state is a judgment call, like tone or whether a memo hits three required facts. Without a human spot-checking them, they drift.
- **Human graders**, reviewing a sample of transcripts. Expensive, but this is how you find out the other two graders are marking the wrong thing.

I never let an agent grade its own transcript. Anthropic's March 24, 2026 note on long-running work says agents will praise their own output even when a person can see it's mediocre, and that a separate grader working from its own context is what fixes that ([that note](https://www.anthropic.com/engineering/h%61rness-design-long-running-apps)). The split matters: the worker doesn't mark its own homework.

## Why does token math hide a broken AI agent?

**A token total tells you what the run cost. It says nothing about whether the refund, the booking, or the lead actually exists.** Anthropic's sample tasks in the January 9, 2026 note log `n_total_tokens` right next to the graders. The token line is a metric. The grader decides pass or fail.

I think the chart stays popular because it moves every day while the row in the database might sit still. A moving chart feels like management is happening. A wrong refund is what actually happened. A cheap wrong refund still fails. An expensive correct refund passes, with a bill you can argue about separately in the [monthly cost post](/blog/how-much-does-an-ai-agent-actually-cost-your-business-each-month).

Here's the arithmetic I want on the table, taken from Anthropic's January 9, 2026 note as their example, not as a score from my studio. If an agent succeeds on 75% of trials and the job needs three clean trials in a row, the pass rate is 0.75 cubed, about 42%. The first-try rate and the "works every time" rate are two different numbers, and I won't let anyone quote the first while meaning the second.

Yao, Shinn, Razavi, and Narasimhan proved the same point with a benchmark instead of a slogan. Their June 2024 paper (arXiv:2406.12045) found function-calling pass^1 around 61% on the retail domain and around 35% on the airline domain, with pass^8 dropping to about 25% on retail ([tau-bench PDF](https://arxiv.org/pdf/2406.12045)). They scored the database at the end of the conversation against the goal state, which is a done sentence backed by a table. A decent first attempt still fell apart once the same task had to land eight times in a row.

<table>
  <thead>
    <tr>
      <th>Number people quote</th>
      <th>What it actually says</th>
      <th>What it hides</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Token total</td>
      <td>How much text the run spent</td>
      <td>Whether the row is right</td>
    </tr>
    <tr>
      <td>pass@1</td>
      <td>Share of tasks that worked on a single try</td>
      <td>The runs that miss when you repeat the job</td>
    </tr>
    <tr>
      <td>pass^k</td>
      <td>Share of tasks that worked on all k tries</td>
      <td>Nothing about cost. Read the bill separately</td>
    </tr>
    <tr>
      <td>A public benchmark percent</td>
      <td>How models did on someone else's task list</td>
      <td>Your refund policy and your queue</td>
    </tr>
    <tr>
      <td>Last chat sentence</td>
      <td>What the agent claimed</td>
      <td>The database, the file, the balance</td>
    </tr>
  </tbody>
</table>

That same January 9, 2026 page also notes that SWE-bench Verified scores opened the year around 30% and that frontier models were closing in on saturation above 80%. I read that as their dated observation, not a promise about your shop. A public coding benchmark filling up is a reason to stop borrowing its percentage. It's not a reason to skip writing your own 20 tasks.

Three lines I won't accept in place of a done sentence:

- "It used fewer tokens than last week." Cost moved. The job could still be wrong.
- "It passed once in ten tries." That's a search process, not a clerk. Fine, if search is actually the product, but say so.
- "The model is ahead on a public leaderboard." Their tasks aren't your order ids.

When a new model ships, Anthropic's note says teams without a fixed task list face weeks of testing, while teams with one can tune prompts and upgrade in days. I haven't clocked that gap myself; I'm citing their report. But the mechanism makes sense once the card exists: you rerun the same done sentences instead of building a fresh demo for the vendor call.

## How do I score an AI agent on a real business job?

**Write the done sentence from a real ticket, run it from a clean start, and mark the system of record.** Anthropic's January 9, 2026 roadmap puts 20 to 50 simple tasks drawn from real failures as a strong starting point, and says you don't need hundreds on day one. Early improvements tend to be large, so a short list still catches them.

I pull tasks from the bug list and the support queue, not from a whiteboard. A task list you invented in a meeting just trains the agent to satisfy the meeting.

Do the first five tasks in this order:

1. **Pull five failures from the last month.** Real order ids, real files, real complaints. Strip customer names before sharing the sheet.
2. **Write one done sentence per failure.** Name the field, the allowed value, and the place to check it.
3. **Have a second person mark a known-good example.** If they can't pass it, the sentence is still fog.
4. **Run three trials from a clean workspace.** Anthropic caught a model gaining an unfair edge by reading git history left behind from earlier trials. Wipe the workspace, or the trials aren't really separate.
5. **Record pass or fail first, then the cost column.** Tokens and seconds get logged after the mark, not before.

<table>
  <thead>
    <tr>
      <th>Job shape</th>
      <th>Done sentence you can steal and edit</th>
      <th>Where you look</th>
      <th>What does not count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Refund</td>
      <td>A refund row exists for this order, status is processed, amount equals the order total</td>
      <td>Refunds table</td>
      <td>"I have processed your refund"</td>
    </tr>
    <tr>
      <td>Booking change</td>
      <td>A reservation row matches this passenger and this flight, or the policy refusal is stored</td>
      <td>Reservations table</td>
      <td>A confident closing line</td>
    </tr>
    <tr>
      <td>Lead from a form</td>
      <td>One CRM row carries this form id and this email, with no second row</td>
      <td>CRM</td>
      <td>A chat line that says the lead was created</td>
    </tr>
    <tr>
      <td>File drop</td>
      <td>The file is in the named folder, the name matches the rule, the prior file is untouched</td>
      <td>The folder</td>
      <td>A summary of what the file "would" contain</td>
    </tr>
  </tbody>
</table>

These rows are templates, not client results. Swap in your own ids.

Two rules I will not bend:

- **Customer-facing jobs get pass^3, not the best of three.** Report whether all three trials landed, not your best result. Anthropic frames pass^k as the right metric when a person expects the behavior every single time, and pass@k as the right metric when one success is the product itself, like a coding search that proposes several patches.
- **Money fields stay binary.** Anthropic is right that partial credit has a place on a multi-part task. Identifying the issue and verifying the person is a different kind of failure than never opening the ticket at all, and the report should show that distinction. But the amount itself is still pass or fail. A refund above the order total fails no matter how good the tone was.

Grade the end state, not the path taken to get there. Anthropic says requiring a fixed sequence of tool calls is too brittle, since agents find valid routes the author never listed. I agree, with one exception: a field the policy forbids. "Amount is at most the order total" is an outcome. "Clicked tool A, then B, then C" is a script, and scripts punish routes that are perfectly valid.

Who writes the sentence: whoever would spot the wrong row on a Monday morning. Anthropic's bar is that two domain experts, given the same task, land on the same pass or fail. If they'd argue about it, the task isn't finished yet. Letting the person who wrote the prompt be the sole author is a mistake, because they'll grade the speech they were hoping to hear.

That same January note says every task needs a reference solution: a known-good output that passes the graders. That proves the task is solvable and that the grader actually works. I keep one known-good refund, booking, or file sitting next to the card. If that known-good case fails the check, I fix the grader before I blame the agent.

## How do I tell if an AI agent eval is lying?

**Read the transcripts. A score you haven't opened up is just a rumor.** Anthropic wrote on January 9, 2026 that they don't trust eval scores at face value until someone has read the transcripts, and that a failure should look fair: you should be able to say exactly what the agent got wrong.

The clearest example in that note is CORE-Bench. Opus 4.5 first scored 42% on it. Once a researcher found rigid grading that rejected "96.12" for wanting a longer decimal, plus ambiguous specs and a scaffold that boxed the model in, the score jumped to 95%. That one paragraph is worth more than another dashboard. A low number can mean the ruler is broken, not the agent.

A zero can lie the same way. Anthropic says a 0% pass rate across many trials (their example is 0% pass@100) is most often a broken task, not an agent that genuinely can't do the work. Before swapping models, confirm a human can pass the task using the exact instructions you gave the agent.

<table>
  <thead>
    <tr>
      <th>What you see</th>
      <th>What it often is</th>
      <th>What I do next</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0% across many trials</td>
      <td>A broken spec or a broken grader</td>
      <td>A human tries the task as written</td>
    </tr>
    <tr>
      <td>A score that jumps after the ruler changes</td>
      <td>The old ruler was marking the wrong thing</td>
      <td>Read the failures that flipped. Keep the new check only if it matches the done sentence</td>
    </tr>
    <tr>
      <td>100% and nothing left to learn</td>
      <td>Saturation. Anthropic says a full score only tracks breakage</td>
      <td>Move those tasks to a regression set. Add harder tasks from new failures</td>
    </tr>
    <tr>
      <td>A pass that used a loophole</td>
      <td>The policy text was thinner than the business rule</td>
      <td>Decide if the loophole is allowed. If not, write it into the done sentence</td>
    </tr>
    <tr>
      <td>Every trial fails the same way</td>
      <td>Shared mess: leftover files, a full disk, a stale cache</td>
      <td>Isolate the trial. Anthropic saw git history leak across runs</td>
    </tr>
  </tbody>
</table>

On the loophole point: Anthropic says Opus 4.5 "failed" a flight task on tau2-bench as written, yet still landed a better outcome for the user by exploiting a gap in the policy. I don't automatically punish that, and I don't automatically ship it either. A person decides whether that gap is a bug in the policy. From there, either the done sentence changes or the business rule does. The score alone doesn't get to make that call.

My weekly read, once the agent starts touching real records:

- Five failures and one pass from that week.
- One line per case: what the done sentence said, what the system of record showed, and whether the grader agreed with it.
- Any model swap, prompt edit, or tool change triggers this same read outside the weekly slot, not just on schedule.
- If I can't explain a failure in one sentence, the task is still fog, and the percentage attached to it is noise.

Capability tasks and regression tasks belong in separate piles. Anthropic says capability evals should start at a low pass rate, because they're the hill you're trying to climb. Regression evals should sit near a full pass rate, because they tell you when you broke something that used to work. Once a capability task gets easy, graduate it into the regression pile. A suite stuck at the ceiling makes real gains look tiny, the same saturation problem Anthropic describes with SWE-bench Verified.

Automated checks are only one layer. Anthropic's January 9, 2026 table also lists production monitoring, A/B tests, user complaints, transcript review, and structured human studies. I'm not claiming a 20-task card replaces a customer complaint. I am insisting that card exists before anyone calls a token chart an eval. The [deploy checklist](/blog/how-to-deploy-an-ai-agent-to-production-without-breaking-everything) covers the kill switch and staged rollout. This card is what you rerun before widening that rollout.

## Questions operators ask before they trust the percent

### What is the difference between pass@k and pass^k for an AI agent?

**pass@k asks whether at least one of k attempts worked. pass^k asks whether every single one of those k attempts worked.** Anthropic's January 9, 2026 note says the two numbers match at k=1 and diverge from there, telling opposite stories by k=10. Their arithmetic example shows a 75% per-trial rate dropping to about 42% once you require three clean trials in a row, since 0.75 cubed is roughly 0.42 ([source](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)). I report pass^k whenever someone has to trust the next run to behave the same way. I report pass@k only when a single working draft is the actual product.

### How many real tasks do I need before an AI agent eval is useful?

**Start with 20 to 50 tasks pulled from real failures, not a pile of hundreds.** That's Anthropic's January 9, 2026 guidance, and they note early improvements are large enough that a short list still catches them. Pull those tasks from the bug tracker and the support queue. A synthetic list of polite prompts only trains the agent to sound finished.

### Should I grade the path an AI agent took or the end state?

**Grade the end state in the system of record.** Anthropic says requiring a specific tool-call sequence is too brittle, since agents find valid routes the author never listed. That said, I still fail a field the policy forbids outright, such as a refund above the order total. That check is testing an outcome, not scripting a sequence of clicks.

### What does a zero pass rate across many trials usually mean?

**A zero across many trials usually points to a broken task or a broken grader, not an incapable agent.** Anthropic wrote on January 9, 2026 that 0% pass@100 is most often a bad spec. Have a human attempt the task exactly as written before swapping models. If the human can't pass it either, the agent was never the problem.

### Where should token counts sit on an AI agent scorecard?

**Token counts belong in the cost column, logged after pass or fail is decided.** Anthropic's sample tasks track `n_total_tokens` as a metric sitting next to the graders, never as the grader itself. A cheap wrong refund still fails. An expensive correct refund passes, with a bill that belongs in the [monthly agent cost breakdown](/blog/how-much-does-an-ai-agent-actually-cost-your-business-each-month).

### Who should write the done sentence for an AI agent?

**Whoever would spot a wrong row on Monday morning should write the done sentence.** Anthropic's bar is that two domain experts land on the same pass or fail for the same task. If they'd argue about it, the sentence isn't finished yet. The person who wrote the prompt makes a poor sole author, because they end up grading the speech they hoped to hear.

### How often should I read AI agent transcripts?

**Read transcripts every week, and again after any model swap.** Anthropic says you can't trust a grader you haven't checked against the transcript itself, and that a failure should read as fair. I go through five failures and one pass each time. If that pass turns out to be a policy loophole, I fix the sentence before treating the percentage as real.

### When should a capability eval become a regression eval?

**Move a task into the regression set once the agent already clears it and the only remaining question is whether it still does.** Anthropic says capability evals should start at a low pass rate, while regression evals should sit near a full pass rate. A suite stuck at the ceiling stops telling you what to improve. It only tells you what you broke.

I'm William Spurlock. I build these agents and the checks around them at Spurlock Studios LLC. Bring five done sentences from last month's queue to an [AI automation strategy call](/contact), or just tell me you only have the token chart. I'll tell you which sentences a second person can actually mark, which trials you need to run, and whether the agent is ready to touch the system of record. I won't invent a pass rate just to make the page feel finished.
