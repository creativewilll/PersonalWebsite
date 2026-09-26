---
title: "How to Start With AI Automation When You Have Zero Technical Background"
slug: "how-to-start-with-ai-automation-when-you-have-zero-technical-background"
date: "2026-09-26"
lastModified: "2026-09-26"
author: "William Spurlock"
readingTime: 24
categories:
  - "AI Automation"
tags:
  - "ai automation"
  - "no-code"
  - "n8n"
  - "zapier"
  - "make"
  - "small business"
  - "getting started"
featured: false
draft: false
excerpt: "How do I implement AI automation in my business step by step if I do not code? I start owners on one retyped handoff, a visual canvas, and three clean tests."
coverImage: "/images/blog/how-to-start-with-ai-automation-when-you-have-zero-technical-background.png"
coverImageAlt: "Night kitchen pass with blank order tickets on a rail, a no-code AI automation handoff"
seoTitle: "Start AI Automation Without Code | William Spurlock"
seoDescription: "How do I implement AI automation in my business step by step if I do not code? Watch one retyped handoff for a week, then build that path on a visual canvas."
seoKeywords:
  - "how to implement AI automation without coding"
  - "start AI automation with no technical background"
  - "AI automation for small business beginners"
  - "Zapier Make n8n for non-coders"
  - "first automation workflow step by step"
  - "audit business processes for automation"
  - "custom GPT vs workflow automation"
aioTargetQueries:
  - "How do I implement AI automation in my business step by step if I do not code?"
  - "How do I implement AI automation in my business step by step?"
  - "Where do I start if I want to automate my business with AI?"
  - "What is the biggest mistake people make when starting with AI automation?"
  - "How do I audit my business processes to find automation opportunities?"
  - "What does a basic AI automation stack look like for a small business?"
  - "How do I build my first automated workflow in n8n or Make.com?"
  - "What skills do I need to learn to implement AI automation myself?"
contentCluster: "ai-automation-getting-started"
pillarPost: true
entityMentions:
  - "William Spurlock"
  - "Spurlock Studios"
  - "n8n"
  - "Zapier"
  - "Make.com"
  - "OpenAI"
  - "ChatGPT"
  - "Google Sheets"
serviceTrack: "ai-automation"
---

# How to Start With AI Automation When You Have Zero Technical Background

You can implement AI automation without writing code. Pick one handoff you repeat, put it on a visual canvas, and leave it turned off until three test runs come back clean. When an owner asks me how to start, I give them a 30-day order of operations. I do not send them shopping for five apps or tell them to build a chatbot.

I am William Spurlock, AI Systems Architect and Fractional AI CTO at Spurlock Studios LLC. I have built 600+ automations, with 500+ live. I have spent 20,000+ hours architecting agentic systems, and those systems have saved clients 35,000+ hours. Month one should feel almost boring. You already know how to do the work by hand. The canvas simply waits for those same fields to show up again.

This is my first-30-days plan for a non-technical owner. It does not choose the workflow for you. If you already know the handoff you want to build, read [the first AI automation every small business should build](/blog/the-first-ai-automation-every-small-business-should-build). If you have opened the tool and have no idea what to click, stay here.

## Where Do I Start If I Want to Automate My Business With AI?

**Start with the handoff you retype this week, in the tools you already pay for. Do not start with a chatbot, a new form product, or a self-hosted server.** If you cannot name the trigger in one sentence, you are not ready to click Publish.

A handoff has four parts. Something happens. You copy a few fields. Those fields go somewhere else. Then a person gets notified. "A lead fills the site form, I paste name and email into the sheet, I send a confirmation" is a handoff I can draw. "I want AI to run the company" gives me nothing to build.

For the first three days, I tell owners to carry a notebook instead of opening a trial account. Each time you copy, paste, forward, or retype something, write down what started the task, what you copied, where it went, and how often this happens. By the end of day three, you will have a small stack of notes. Start with the boring one that keeps showing up.

<table>
  <thead>
    <tr>
      <th>If you feel like starting here</th>
      <th>What actually happens</th>
      <th>Start here instead</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A custom GPT that "knows the business"</td>
      <td>It talks when a person opens a chat. It does not watch the form.</td>
      <td>The form, the sheet, and one confirmation</td>
    </tr>
    <tr>
      <td>A new all-in-one platform</td>
      <td>You migrate data before you have a workflow</td>
      <td>The inbox and sheet you already open</td>
    </tr>
    <tr>
      <td>Self-hosted n8n on day one</td>
      <td>You learn servers before you learn triggers</td>
      <td>Zapier or Make on their cloud</td>
    </tr>
    <tr>
      <td>Five workflows in a weekend</td>
      <td>None of them get a real test record</td>
      <td>One path, three clean tests</td>
    </tr>
    <tr>
      <td>An AI employee job post</td>
      <td>You still retype the lead by Friday</td>
      <td>The retype itself</td>
    </tr>
  </tbody>
</table>


In week one, watch the work. In week two, build one canvas with two steps. Week three is for testing. In week four, add a failure ping. If the pipe has become boring, you can also add one language step that produces drafts only.

Rules I will not bend in month one:

- One trigger. One destination. One person who hears about failures (you).
- No new software unless the current tool cannot emit the trigger.
- No customer-facing send until you have watched three real submissions and liked all three.
- No API key pasted into a browser extension, a shared doc, or a chat.

Zapier, Make, and n8n can each draw that first path. Choosing among them is a week-two decision, not the first thing you need to solve. I explain the plain difference between an AI step and a rules step in [the difference between AI automation and regular automation](/blog/the-difference-between-ai-automation-and-regular-automation-and-why-it-matters).

## What Is the Biggest Mistake People Make When Starting With AI Automation?

**The biggest mistake is publishing a chat window and calling it an automation.** A chat answers whoever shows up. A workflow starts when a specific event happens, even if you are in the truck.

OpenAI's help center spells out the limit. GPTs are no-code assistants built and used inside ChatGPT. They do not embed ChatGPT in an outside website or application. An assistant built with the API is a separate, developer-built product ([OpenAI Help Center, GPTs in ChatGPT](https://help.openai.com/en/articles/8554407-gpts-in-chatgpt)). So if your plan is "I'll make a GPT and put it on the homepage," you still have not moved the form submission anywhere. The form is waiting for you.

I see the same miss in three costumes:

1. **The chatbot costume.** The site gets a bubble. Leads still sit in the inbox until someone copies them.
2. **The prompt-library costume.** You save 40 prompts in a doc. Nothing runs at 7 a.m. when the form lands.
3. **The platform costume.** You buy a suite, import contacts, and still send the confirmation by hand.

My fix is mechanical. Name the event that starts the work, then name the record that must exist when the work ends. Keep a human check on anything that spends money, signs a contract, or talks to an unhappy customer. I will use a language model to write a draft. I will not use one as the first trigger.

<table>
  <thead>
    <tr>
      <th>Costume</th>
      <th>What it watches</th>
      <th>What it ships</th>
      <th>Keep it?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Custom GPT in ChatGPT</td>
      <td>The person who opens the chat</td>
      <td>An answer in that chat</td>
      <td>Later, for internal Q&A</td>
    </tr>
    <tr>
      <td>Homepage chat bubble</td>
      <td>Visitors who click it</td>
      <td>A transcript, maybe</td>
      <td>After the handoff runs</td>
    </tr>
    <tr>
      <td>Zap, scenario, or n8n workflow</td>
      <td>A form, row, or email</td>
      <td>A record plus a message</td>
      <td>Yes, this is the start</td>
    </tr>
    <tr>
      <td>API-built assistant</td>
      <td>Whatever your app sends</td>
      <td>A product feature</td>
      <td>Not month one</td>
    </tr>
  </tbody>
</table>


The next mistake is turning on the workflow before the test record looks right. Zapier's help article, updated May 29, 2026, separates the work into Build, Test, and Publish. A published Zap processes only new data created after publication ([What is a Zap?](https://help.zapier.com/hc/en-us/articles/8496309697421-What-is-a-Zap)). Old rows will not suddenly move when you click Publish. If you wait for them, the tool can look broken even though it is following the documented behavior.

n8n works the same way. Its docs define a workflow as nodes on a canvas, say new workflows are unpublished by default, and explain that a trigger workflow runs by itself only after you click Publish ([Create and run workflows](https://docs.n8n.io/build/understand-workflows/create-and-run-workflows)). Execute is where I test. Publish is where I commit.

## How Do I Implement AI Automation in My Business Step by Step?

**Use 30 days and six moves: watch, score, draw, build two steps, test three records, then add a failure ping.** Do not add a model until the two-step path has survived a week of real events.

This is the order I give owners who do not write code. Follow the calendar. You do not need to decide whether you are "technical enough."

<table>
  <thead>
    <tr>
      <th>Days</th>
      <th>Move</th>
      <th>Done when</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1 to 3</td>
      <td>Write every retype on a card</td>
      <td>You have at least eight cards, or you truly retype less than that</td>
    </tr>
    <tr>
      <td>4 to 5</td>
      <td>Score the cards</td>
      <td>One card wins on frequency, boredom, and a clear destination</td>
    </tr>
    <tr>
      <td>6 to 7</td>
      <td>Draw trigger, fields, destination, alert</td>
      <td>A stranger could follow the drawing</td>
    </tr>
    <tr>
      <td>8 to 14</td>
      <td>Build trigger plus one action on Zapier or Make</td>
      <td>A test record lands in the right place</td>
    </tr>
    <tr>
      <td>15 to 21</td>
      <td>Run three clean tests, then publish</td>
      <td>You can point at three good records and one alert</td>
    </tr>
    <tr>
      <td>22 to 30</td>
      <td>Add an error ping. Add a draft-only AI step only if the pipe is dull</td>
      <td>Failures hit you. Customers still get text you approved</td>
    </tr>
  </tbody>
</table>


Here are the six moves I use, in order:

1. **Watch.** For three working days, do the job the way you do it now. Cards only. No new logins.
2. **Score.** Give each card 1 to 5 on how often it happens, how boring it is, and how obvious the destination is. The winner is high on all three. A rare, emotional email loses on purpose.
3. **Draw.** Four boxes on paper: trigger, fields you copy, destination, who gets told. If a box says "use judgment," that box stays with you.
4. **Build two steps.** Trigger, then one action. Confirmation to you, or a new row, not both plus a novel. Zapier's editor is built for this without code. Make's help, updated May 18, 2026, defines a scenario as a series of modules that transfer and transform data between apps ([Create your first scenario](https://help.make.com/create-your-first-scenario)).
5. **Test three records you control.** Use a fake name you will recognize. Check every field. Then publish. Remember the Zapier rule: only new data after publish.
6. **Teach it to complain.** Email or Slack to you when a run fails. Spend the last week watching live volume before you let it talk to customers.

Week four is the first point when I consider adding a model. I keep the instruction short and store it in the workflow as plain text:

- Use only the fields on this record.
- Do not invent prices, dates, or promises.
- Write the draft to me. Do not send it to the customer.

For a closer look at rules steps and language steps, read [AI automation vs regular automation](/blog/the-difference-between-ai-automation-and-regular-automation-and-why-it-matters) alongside this calendar. This page gives you the order. That one gives you the definitions.

I do not spend this month setting up a VPS. Self-hosting is a real n8n advantage, but it is a separate project. Take that on with the [n8n production playbook](/blog/n8n-production-playbook-self-hosting) after your first path has been published and boring for a week.

## How Do I Audit My Business Processes to Find Automation Opportunities?

**Audit by sitting next to the work for a week and marking every copy, paste, and "I'll send that in a minute."** A workshop with sticky notes and no timestamps produces a poster. The cards produce a winner.

Do not map the whole company. I want one path that already has a trigger and a destination. Score only the work you actually touched.

<table>
  <thead>
    <tr>
      <th>Signal on the card</th>
      <th>Score it high when</th>
      <th>Leave it human when</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Frequency</td>
      <td>It happened at least a few times this week</td>
      <td>It happened once this quarter</td>
    </tr>
    <tr>
      <td>Boredom</td>
      <td>You could do it while half asleep</td>
      <td>The wording changes with the relationship</td>
    </tr>
    <tr>
      <td>Destination</td>
      <td>The row, folder, or thread already exists</td>
      <td>You still invent the destination each time</td>
    </tr>
    <tr>
      <td>Risk</td>
      <td>A bad send is annoying and easy to undo</td>
      <td>A bad send spends money or admits fault</td>
    </tr>
    <tr>
      <td>Inputs</td>
      <td>The fields are already in the trigger</td>
      <td>You have to go find the facts in your head</td>
    </tr>
  </tbody>
</table>


Five checks before a card is allowed to become a workflow:

- You can name the trigger as an event in an app you already use ("new row," "new form response," "new labeled email").
- You can list the fields without inventing any.
- You know which system is the record of truth after the run.
- A wrong run is visible the same day.
- You can describe the failure alert in one line ("email me the error").

If a card fails one of those checks, leave it on the table. It may become a workflow later. It is not the one you are building this month.

I see two traps in these audits. First, someone chooses the task they hate most, even though it happens once a month and requires judgment. Second, they choose a task that depends on software they do not own. Pay for the canvas if you need it. Do not buy a new source of truth during the same week you are learning what a trigger is.

Treat this audit like a scorecard, not a company-wide mapping exercise. You need one winner, not a wall covered with every role and process in the business.

## What Does a Basic AI Automation Stack Look Like for a Small Business?

**A basic stack is four seats: the app that notices the event, the canvas that moves fields, the place the record lives, and the ping you get when a run fails.** A model is a fifth seat, and it sits down last.

For a non-technical owner in month one, this is the entire stack I want.

<table>
  <thead>
    <tr>
      <th>Seat</th>
      <th>Month-one pick</th>
      <th>Why this pick</th>
      <th>Official constraint worth knowing</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Trigger app</td>
      <td>The form, inbox, or sheet you already use</td>
      <td>No migration</td>
      <td>The trigger event must be a "new" event the tool can see</td>
    </tr>
    <tr>
      <td>Canvas</td>
      <td>Zapier or Make cloud</td>
      <td>No server, no terminal</td>
      <td>Zapier help, May 29, 2026: 9,000+ apps, Build then Test then Publish</td>
    </tr>
    <tr>
      <td>Record</td>
      <td>Google Sheets or the CRM you already open</td>
      <td>One home for the row</td>
      <td>Do not add a second database this month</td>
    </tr>
    <tr>
      <td>Alert</td>
      <td>Email to you, or a Slack DM to yourself</td>
      <td>You hear silence and failure</td>
      <td>n8n can point a failed execution at an Error Trigger workflow</td>
    </tr>
    <tr>
      <td>Model</td>
      <td>Off until the two-step path is dull</td>
      <td>Language is the easy part to fake</td>
      <td>Draft to you only</td>
    </tr>
  </tbody>
</table>


This is how I choose among Zapier, Make, and n8n for a first build:

- **Zapier** when you want the shortest path from a form to a row and you will live inside their editor. Their help article says you connect apps without code, and a Zap is one trigger plus one or more actions.
- **Make** when the path has a couple of branches and you like a picture of modules. Their help center says each team can create up to 100 scenarios per day and each scenario has a 2 MB size limit, as of the May 18, 2026 update. You will not hit either limit on workflow number one.
- **n8n** when the first workflow has already lived a week and you want error workflows, a canvas you can later put on your own machine, or both. The docs describe the canvas as the place you add and connect nodes. Publish is a separate click from Execute.

If you have never opened a terminal, I would choose Zapier or Make on day one. n8n is more likely to win in month two than on your first afternoon. I put the full comparison in [n8n vs Make vs Zapier in 2026](/blog/n8n-vs-make-vs-zapier-in-2026-which-automation-tool-is-right-for-your-business). Once you are past week one, the [solo consultant stack](/blog/solo-ai-consultant-tech-stack-2026) has the longer tool list.

Leave these off the stack until the first path is published:

- A second automation tool "just in case."
- A vector database, a custom agent framework, or an API key in the browser.
- A homepage chatbot.
- A self-hosted box.
- A rewrite of your CRM.

Even if you do not touch the API this month, remember OpenAI's warning about keys. A key exposed in a browser or mobile app lets someone else make requests on your behalf. Those requests should pass through a backend you control ([API key safety](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety)). Close any no-code template that asks you to paste a secret into a public page.

## What Skills Do I Need to Learn to Implement AI Automation Myself?

**You need four skills: name a trigger, map a field, read an error, and tell a test record from a live one.** You do not need JavaScript, Python, Git, or a computer science class to ship the first path.

This is the month-one skill list. I tell people to ignore everything in the last column until the first workflow has been running for seven days.

<table>
  <thead>
    <tr>
      <th>Skill</th>
      <th>What "good" looks like on day 14</th>
      <th>Skip for now</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name the trigger</td>
      <td>You can say "new form response" or "new row" without hedging</td>
      <td>Building your own webhook server</td>
    </tr>
    <tr>
      <td>Map a field</td>
      <td>The test row shows the same email that was on the form</td>
      <td>Writing a script to reshape JSON</td>
    </tr>
    <tr>
      <td>Read the error</td>
      <td>You can say which step went red and which field was empty</td>
      <td>Designing a retry architecture</td>
    </tr>
    <tr>
      <td>Test vs live</td>
      <td>You know publish only sees new events after that moment</td>
      <td>Backfilling a year of old rows by hand inside the live Zap</td>
    </tr>
    <tr>
      <td>Draft rules</td>
      <td>The model is told to use only the record and to write to you</td>
      <td>Letting the model email the customer</td>
    </tr>
  </tbody>
</table>


Practice on purpose:

1. Create a form or a sheet with five fields you invent: name, email, service, date, note.
2. Submit yourself three times with obvious fake names (`Test One`, `Test Two`, `Test Three`).
3. Build trigger to row, or trigger to an email that only you receive.
4. Break it once on purpose. Remove a required field. Read the red step. Fix the field. Run again.
5. Only then publish, and submit `Test Four` so you can see the live path separate from the samples you used while building.

Most beginners miss the difference in that last step. Zapier says test records are sample data that may differ from live runs, and a published Zap processes new data created after publication. n8n describes the same split another way. Execute is manual. Publish lets a trigger run on its own. That pair is worth remembering.

n8n's error tools belong in month two, not hour two. Create a workflow with the Error Trigger as its first node, then select that workflow in the settings of your other workflow. It runs when an execution fails. The docs say you cannot test this error workflow with a manual run. The Error Trigger fires only when an automatic workflow errors ([Handle errors gracefully](https://docs.n8n.io/build/flow-logic/handle-errors-gracefully), [Error Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger)). That detail explains why the alert stays quiet when you click Execute.

Keeping a person in the loop forever is fine. The goal is not to stop looking at the workflow. I want you looking at failures and drafts instead of checking every successful row.

## Sources Behind the Steps

**Every hard constraint above comes from the vendor's own documentation.** I checked each one for this piece.

<table>
  <thead>
    <tr>
      <th>Claim</th>
      <th>Source</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A Zap is a trigger plus actions. Build, Test, Publish. Only new data after publish. 9,000+ apps.</td>
      <td>[Zapier help: What is a Zap?](https://help.zapier.com/hc/en-us/articles/8496309697421-What-is-a-Zap)</td>
      <td>Updated May 29, 2026</td>
    </tr>
    <tr>
      <td>A scenario is modules that move data. Up to 100 scenarios per day per team. 2 MB per scenario.</td>
      <td>[Make help: Create your first scenario](https://help.make.com/create-your-first-scenario)</td>
      <td>Updated May 18, 2026</td>
    </tr>
    <tr>
      <td>n8n workflows are nodes on a canvas. Unpublished by default. Publish to run a trigger automatically.</td>
      <td>[n8n: Create and run workflows](https://docs.n8n.io/build/understand-workflows/create-and-run-workflows)</td>
      <td>Docs page checked Sep 26, 2026</td>
    </tr>
    <tr>
      <td>Error workflow starts with the Error Trigger and runs when an execution fails. Manual runs do not fire it.</td>
      <td>[n8n: Handle errors](https://docs.n8n.io/build/flow-logic/handle-errors-gracefully) and [Error Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger)</td>
      <td>Docs pages checked Sep 26, 2026</td>
    </tr>
    <tr>
      <td>Custom GPTs stay inside ChatGPT. They are not how you embed a bot on your site.</td>
      <td>[OpenAI Help: GPTs in ChatGPT](https://help.openai.com/en/articles/8554407-gpts-in-chatgpt)</td>
      <td>Help page checked Sep 26, 2026</td>
    </tr>
    <tr>
      <td>Do not put an OpenAI API key in browser or mobile client code.</td>
      <td>[OpenAI Help: API key safety](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety)</td>
      <td>Help page checked Sep 26, 2026</td>
    </tr>
  </tbody>
</table>


## FAQ

**These are the questions I hear from owners building their first workflow.** The answers stay inside the same 30-day plan.

### How do I build my first automated workflow in n8n or Make.com?

**Build one trigger and one action, run a record you can recognize, then turn it on.** In Make, that picture is a scenario: modules that pass data between apps, as their May 18, 2026 help page describes. In n8n, you add a trigger with "Add first step," connect one node, choose Execute Workflow, and click Publish only when the test looks right. Their docs say unpublished workflows do not run on their own. Do not start by self-hosting. Do not add a model on the first canvas.

### Is a custom GPT the same thing as business AI automation?

**No. A custom GPT talks inside ChatGPT. A business automation starts when an event happens in another app.** OpenAI's help center says GPTs are no-code assistants used inside ChatGPT and are not a way to put ChatGPT on your website. Your form, sheet, and inbox still need a Zap, a Make scenario, or an n8n workflow. Use the GPT later as a place you ask questions. Do not call it the system that files the lead.

### Should a beginner use Zapier, Make, or n8n?

**Use Zapier or Make for the first published path. Move to n8n when you want error workflows or your own machine.** Zapier's May 29, 2026 help article is aimed at people connecting apps without code, and it documents Build, Test, and Publish. Make is the better picture if you already know the path has a branch. n8n is the tool I pick once the first workflow is boring and you care where it runs. The longer split is in [n8n vs Make vs Zapier](/blog/n8n-vs-make-vs-zapier-in-2026-which-automation-tool-is-right-for-your-business).

### What should I leave alone during the first 30 days?

**Leave alone anything that spends money, signs a contract, or emails a customer without you.** Also leave alone a CRM migration, a second database, a homepage chat bubble, and a self-hosted server. The 30-day job is one handoff you already retype. If a card needs judgment, it stays a card. You can add a draft-only model step in week four if the two-step path has been dull for several real submissions.

### How do I test an automation before I let it touch live customers?

**Run three records you created, with names you can spot, and send every message to yourself.** Zapier treats test data as sample data and says a published Zap only processes new data after publish. n8n wants Execute before Publish. Check every field on the destination row. Break one field on purpose so you can see the red step. Customers enter the path only after those three records look like the form you submitted.

### What happens when an AI automation breaks or produces wrong outputs?

**A broken run should ping you, and a wrong sentence should have gone to you as a draft first.** In n8n you can attach an error workflow that starts with the Error Trigger. The docs say it runs when an automatic execution fails, and it does not run when you click Execute by hand. For wrong words, keep the model on a draft-to-you step until you have liked a week of drafts. If the workflow already wrote a bad customer message, fix the record by hand, then add the check you skipped.

### Do I need an API key on day one?

**No. A form-to-sheet Zap or Make scenario does not need an OpenAI API key.** You need the login for the form and the login for the sheet. Add a model later, inside the canvas, with the key stored in that product's credential screen. OpenAI's own note says a key in a browser or mobile app can be taken and used to run requests on your account. If a template tells you to paste the key into a public page, do not.

### When should I hire help instead of building the first workflow myself?

**Hire when the trigger is clear and the week-two canvas is still red, or when the handoff touches money, contracts, or a system you are afraid to break.** You should still do days 1 to 7 yourself. The cards and the drawing are the job. A builder is expensive when you hand them a sentence like "automate the business" and cheap when you hand them one trigger, one destination, and the fields. I take that second kind of call. I do not take the first kind until the cards exist.

### Will a new Zap or scenario rewrite my old rows?

**No. A published Zap processes new data created after you publish it, per Zapier's May 29, 2026 help article.** Old rows stay where they are unless you build a separate one-time import, which is not the first workflow. Submit one fresh test after you publish if you want proof the live path works. Do not "replay the whole sheet" on day one. That is how a confirmation email goes out to last year's leads.

### How is this different from choosing the first workflow to build?

**This piece is the 30-day order for someone who does not code. The other piece picks the workflow: intake and onboarding.** If your cards already say the pain is kickoff paperwork, go build that path in [the first AI automation a small business should ship](/blog/the-first-ai-automation-every-small-business-should-build). If your cards say the pain is something else, keep this calendar and point it at the winner. Same skills. Different first card.

## Book an AI Automation Strategy Call

**Bring your cards, or bring the blank notebook.** I will meet you where the work actually is. On an [AI automation strategy call](/contact), I will pick the one handoff worth putting on a canvas, tell you whether Zapier, Make, or n8n fits it, and give you a test plan you can run without writing code.

If the first path is obvious and you want it built against your real form and sheet, say so in the note. If you are still on day one, tell me that instead. Either is a useful conversation. A chatbot demo is not.
