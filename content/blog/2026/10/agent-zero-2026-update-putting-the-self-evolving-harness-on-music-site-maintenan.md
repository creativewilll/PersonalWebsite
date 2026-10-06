---
title: "Agent Zero Music Site Maintenance Is a Monday Report"
slug: "agent-zero-2026-update-putting-the-self-evolving-harness-on-music-site-maintenan"
date: "2026-10-06"
lastModified: "2026-10-06"
author: "William Spurlock"
readingTime: 19
categories:
  - "AI Agents and Automations"
tags:
  - "Agent Zero"
  - "music site maintenance"
  - "Spotify embeds"
  - "Bandsintown"
  - "Let's Encrypt"
  - "v2.13"
featured: false
draft: false
excerpt: "I run Agent Zero music site maintenance as a Monday report inside one artist project. One skill stays pinned. The live page changes only after I read the file."
coverImage: "/images/blog/agent-zero-2026-update-putting-the-self-evolving-harness-on-music-site-maintenan.png"
coverImageAlt: "Red-ringed spotlight over a closed laptop and blank checklist for Agent Zero music site maintenance"
seoTitle: "Agent Zero Music Site Maintenance | William Spurlock"
seoDescription: "Agent Zero music site maintenance is one project and one pinned skill. The Monday file checks shows, the Spotify embed, and the cert. You still edit live."
seoKeywords:
  - "Agent Zero music site maintenance"
  - "Agent Zero v2.13"
  - "music website upkeep"
  - "Spotify embed check"
  - "Bandsintown widget sync"
  - "Let's Encrypt 90 day certificate"
  - "Agent Zero projects"
aioTargetQueries:
  - "Agent Zero music site maintenance"
  - "What is Agent Zero in the v2.13 update?"
  - "What fails on a live music site when the Monday check is skipped?"
  - "How do I put Agent Zero on music site maintenance duty?"
  - "What is Agent Zero allowed to change on the live music site?"
  - "How do I tell the Monday maintenance run worked?"
  - "Does Agent Zero replace a music site rebuild?"
  - "Should one Agent Zero project cover two artists?"
  - "What is the difference between a skill and a project in Agent Zero?"
  - "Where should music-site memories live?"
  - "Can Agent Zero deploy a music site by itself?"
  - "How long is a default Let's Encrypt certificate in October 2026?"
  - "How do I check a Spotify embed without guessing?"
  - "How is music-site maintenance different from an Agent Zero sales install?"
  - "Does Agent Zero Time Travel replace Git for the artist site?"
contentCluster: "ai-agents-mcp"
pillarPost: false
parentPillar: "hermes-openclaw-agent-zero-decision-framework"
entityMentions:
  - "William Spurlock"
  - "Spurlock Studios LLC"
  - "Agent Zero"
  - "Spotify"
  - "Bandsintown"
  - "Let's Encrypt"
  - "Docker"
serviceTrack: "ai-automation"
---

# Agent Zero Music Site Maintenance Is a Monday Report

**Agent Zero music site maintenance is a Monday report in one artist project, with one skill pinned, and no live edit until a person reads the file.** I do not hand the public page to a desktop session and call that upkeep.

I'm William Spurlock, founder of Spurlock Studios LLC, an AI Systems Architect and Fractional AI CTO. I've built 600+ automations with 500+ still live, spent 20,000+ hours on agentic systems, and watched clients drop 35,000+ hours of busywork. A music site still needs a person on the edit that fans actually see.

This page is the week after the site is already up. It is not the seat choice in [Hermes vs OpenClaw vs Agent Zero](/blog/hermes-openclaw-agent-zero-decision-framework). It is not the terminal picture in [the Agent Zero masterclass](/blog/agent-zero-masterclass). It is not the build in [the brand-sync portfolio](/blog/a-music-artist-portfolio-that-books-brand-sync-deals-built-stitch-cursor-in-a-we). If the rights card is still blank, you are still building. If the page is live, the job is the Monday file.

I read the Agent Zero README, the v2.13 release notes, the skills, projects, and memory guides, the Spotify embed docs, the Bandsintown widget notes, and the Let's Encrypt lifetime page on October 6, 2026. Dates and version numbers below are those pages.

---

## What is Agent Zero in the v2.13 update?

**Agent Zero v2.13, published September 23, 2026, is the open framework whose current README leads with a Dockerized Linux desktop, projects, skills, and a plugin catalog, not with a blank terminal that invents tools in silence.** The Monday job uses the project fence. It does not use the whole desktop.

The [v2.13 release](https://github.com/agent0ai/agent-zero/releases/tag/v2.13) is dated September 23, 2026. Two lines in those notes matter for a recurring check. Sidebar project folders group chats and tasks by project. Remote execution drops `runtime=input`. The replacement name is `input_remote`, and the notes say there is no compatibility alias. If an older note in your own files still says `runtime=input`, that note is stale. I would delete it before the first Monday run.

The [README on main](https://github.com/agent0ai/agent-zero/blob/main/README.md), as I read it on October 6, 2026, describes Agent Zero as an open agent framework for work that needs more than chat: a Dockerized Linux desktop, a browser with DOM annotation, live document cowork, projects, skills, plugins, and a bridge back to the host machine. The same page says the Plugin Hub covers currently more than 100 community plugins. It also links A0 Launcher v1.8 builds for macOS, Linux, and Windows. The direct Docker example is `docker run -p 80:80 -v a0_usr:/a0/usr agent0ai/agent-zero`. The headless quick start in that README uses port 5080.

That is a wide machine. Music site upkeep is a narrow job inside it. I want the project, the pinned skill, and a report file. I do not want the agent opening Blender, annotating a hero, or installing a plugin because the catalog is large. More than 100 plugins is a catalog fact. It is not a reason to install one on a Monday.

The [skills guide](https://github.com/agent0ai/agent-zero/blob/main/docs/guides/skills.md) splits three controls. I keep them apart on purpose.

<table>
  <thead>
    <tr>
      <th>Control</th>
      <th>What the guide says it changes</th>
      <th>What I use on Monday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Skills</td>
      <td>A specific procedure added to the Protocol part of the prompt</td>
      <td>One pinned skill, the Monday checklist</td>
    </tr>
    <tr>
      <td>Agent Profiles</td>
      <td>The broader role and behavior of the chat</td>
      <td>Left alone. I do not invent a new persona for a five-row report</td>
    </tr>
    <tr>
      <td>Projects</td>
      <td>Workspace, files, memory, secrets, and project instructions</td>
      <td>One project per artist site</td>
    </tr>
  </tbody>
</table>

Active skills are added to the Protocol, so Agent Zero sees them every turn while they are active. The same guide says to keep that list short and to let the agent load the rest only when it needs them. My opinion is stricter than the guide. For this job I pin one skill and I do not leave a second one checked "in case." A lighter prompt is easier to follow, and a public artist page is a bad place to discover that two procedures argued.

The README also lists scheduled operations as a use case: recurring checks with project-scoped context. That sentence is why this framework fits a Monday. It is not permission to skip the report file.

What I refuse to treat as the update:

- A new model name. The project can store its own model preset. The maintenance skill does not name one.
- A plugin install. The catalog size is not the checklist.
- A desktop session that clicks Publish on the host. The safety section says to review actions that touch production systems.

---

## What fails on a live music site when the Monday check is skipped?

**A live music page can keep a show list that no longer matches Bandsintown, an embed whose oEmbed response has no HTML, and a certificate that is still inside a 90-day life but close to the date you meant to renew.** Skipping Monday does not crash the design. It leaves last month's facts on a page fans still open.

I do not have a count of how often artist sites rot. I have five checks, and each one has a page I can cite for what "current" means.

<table>
  <thead>
    <tr>
      <th>Check</th>
      <th>What "current" means</th>
      <th>Source I quote in the report</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Show widget</td>
      <td>Published events on Bandsintown match the dates on the site</td>
      <td>Bandsintown help, August 7, 2025</td>
    </tr>
    <tr>
      <td>Old widget code</td>
      <td>No leftover Bandsintown snippet in the header from a previous install</td>
      <td>Bandsintown setup note, April 17, 2023</td>
    </tr>
    <tr>
      <td>Spotify embed</td>
      <td>oEmbed returns embed HTML and a title for the URL on the page</td>
      <td>Spotify oEmbed reference, read October 6, 2026</td>
    </tr>
    <tr>
      <td>Certificate</td>
      <td>notAfter sits inside the profile you actually issued</td>
      <td>Let's Encrypt lifetime page, updated July 22, 2026</td>
    </tr>
    <tr>
      <td>Merch or mailing URL</td>
      <td>The request returns a status I record. A 200 is not proof of stock</td>
      <td>The URL printed on the page, fetched that morning</td>
    </tr>
  </tbody>
</table>

[Bandsintown's August 7, 2025 article](https://help.artists.bandsintown.com/en/articles/7053470-sync-your-events-to-your-website) says the widget automatically syncs published events to any website it is embedded into. If the dates on the site and the dates in the artist account disagree, the widget is not doing that job, or the page is still showing a hard-coded list beside it. [The April 17, 2023 setup article](https://help.artists.bandsintown.com/en/articles/7053415-set-up-your-widget) says old widget code or an out-of-date plugin, including code left in the header, can cause the widget to break. That is the second row. I look for a second snippet before I blame the new one.

[Spotify's embeds overview](https://developer.spotify.com/documentation/embeds), as I read it on October 6, 2026, lists three ways to put an embed on a site you control: HTML copied from the Spotify client, the iFrame API, and the oEmbed API. The [oEmbed reference](https://developer.spotify.com/documentation/embeds/reference/oembed) says `GET /oembed` on `https://open.spotify.com` takes a URL-encoded Spotify URL for a podcast show, episode, artist, album, or track. The response includes HTML for an embed, plus a title when Spotify sends one. I do not guess from a screenshot. I record whether `html` is present.

[Let's Encrypt's lifetime page](https://letsencrypt.org/docs/cert-lifetimes/), last updated July 22, 2026, says the default lifetime is still 90 days, and that the vast majority of certificates they issue are 90 days. Six-day certificates are optional. Their [December 2, 2025 post](https://letsencrypt.org/2025/12/02/from-90-to-45) says the opt-in `tlsserver` profile switches to 45-day certificates on May 13, 2026, and the default classic profile moves to 64-day certificates on February 10, 2027. On October 6, 2026, a classic certificate is still a 90-day object unless someone opted into another profile. The Monday row names the profile. It does not renew the cert.

What I do not call a Monday failure:

- The hero type feels dated. That is a rebuild conversation, not this file.
- A fan wanted a different track in the embed. That is an edit you choose, after the oEmbed row shows the current title.
- The plugin catalog has something new. Catalog size is not a broken show date.

---

## How do I put Agent Zero on music site maintenance duty?

**Put Agent Zero on music site maintenance duty by creating one project for that artist, writing instructions that stop at the report file, and pinning one skill so the checklist sits in the Protocol every turn.** The Docker container stays the place the agent runs. The artist repo stays outside it until you decide otherwise.

The [projects guide](https://github.com/agent0ai/agent-zero/blob/main/docs/guides/projects.md) says a project can be a client, a codebase, a research topic, or a recurring workflow. It holds instructions, files, memory, secrets, and model choices. Description answers what the project is. Instructions answer how the agent should behave while the project is active. The guide's own example says to ask before using credentials, private data, or external accounts. I copy that rule into the artist project and I add one more: do not deploy.

I do this in order:

1. Create the project from the dashboard. Title it with the artist and the word Monday, so the v2.13 sidebar folder is obvious later.
2. Paste the Git URL only if this project is allowed to clone the site repo. If you are not ready for the agent to see the repo, leave Git empty and keep the URLs in the instructions.
3. Write the instructions below. Short. The guide says a project prompt does not need to be a constitution.
4. Save secrets in the project if a check needs a token. The guide says to refer to a secret by name and not to paste tokens into chat. Keep your own copy. Backups may not include every secret.
5. Open a chat, pick the project in the top-right picker, and confirm the project name is visible. The guide says a hidden picker means the chat is not using the project.
6. Pin the one skill from the chat input: plus button, then Skills. Active skills show at the top of that selector.
7. Ask for `MONDAY.md` in the project workspace. Read it before anyone touches the live site.

<table>
  <thead>
    <tr>
      <th>Project field</th>
      <th>What I put there</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Title</td>
      <td>Artist name plus Monday</td>
    </tr>
    <tr>
      <td>Instructions</td>
      <td>Write the report. Do not deploy. Ask before any credential</td>
    </tr>
    <tr>
      <td>Git repository</td>
      <td>Empty until I want the repo cloned into this workspace</td>
    </tr>
    <tr>
      <td>Secrets</td>
      <td>Named tokens only, if a check cannot be done on the public URL</td>
    </tr>
    <tr>
      <td>Model preset</td>
      <td>Whatever preset this project already uses. The skill does not switch it</td>
    </tr>
  </tbody>
</table>

The instructions I actually paste:

> You are on music site maintenance for this one artist. Write `MONDAY.md` in this project. Each row names the check, the URL, the status, and the title or sentence you got back. Checks: Bandsintown dates against the page, leftover widget code, Spotify oEmbed HTML, certificate notAfter against the issued profile, and the merch or mailing URL status. Do not edit the live site. Do not deploy. Do not push. Ask before using a secret. If a memory says a deploy already happened, quote that memory in the report and stop.

That file is mine. Agent Zero does not ship a skill by this name. I add it under the project because the skills guide says a pinned skill stays in the Protocol for the chat. On-demand loading is for procedures I might need once. Monday is the procedure I need every time I open this chat.

Install stays boring. On a personal machine I use A0 Launcher v1.8, because the README calls that the guided path and points at the v1.8 release. On a server I use the headless quick start, which the same README binds to port 5080. If Docker is already up, the documented one-liner publishes port 80 and mounts `a0_usr` at `/a0/usr`. The [safety section](https://github.com/agent0ai/agent-zero/blob/main/README.md) says to keep Agent Zero inside Docker or another isolated environment, not to mount an entire home directory unless you understand the risk, and to review actions that touch production systems. A music site is a production system. The mount is the Agent Zero data volume, not the artist's laptop home.

I do not point the A0 CLI at the live server "so it can fix the embed faster." The README describes that connector as a bridge to a host you trust, with read and write granted on purpose. Monday does not need write on the machine that serves the page.

---

## What is Agent Zero allowed to change on the live music site?

**Agent Zero is allowed to change nothing on the live music site during the Monday run.** It may write `MONDAY.md` in the project. A person edits the public page after reading that file.

I keep this boundary hard. A framework that can drive a browser and a desktop can also click the wrong Publish. The README says to review those actions. I turn the review into a hard stop: the agent does not hold the deploy button.

<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Monday agent</th>
      <th>Person, after the file</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Write MONDAY.md in the project</td>
      <td>Yes</td>
      <td>Reads every row</td>
    </tr>
    <tr>
      <td>Request the public page and the Spotify oEmbed URL</td>
      <td>Yes</td>
      <td>Uses the recorded title</td>
    </tr>
    <tr>
      <td>Open the site in the built-in browser</td>
      <td>Yes, to look</td>
      <td>Decides if a screenshot matches the file</td>
    </tr>
    <tr>
      <td>Edit the artist repository</td>
      <td>No</td>
      <td>Yes, if a row says the page is wrong</td>
    </tr>
    <tr>
      <td>Deploy or push</td>
      <td>No</td>
      <td>Yes, on the usual path for that host</td>
    </tr>
    <tr>
      <td>Delete a memory</td>
      <td>No. It quotes the bad row</td>
      <td>Deletes it in the Memory dashboard</td>
    </tr>
    <tr>
      <td>Pin a second skill</td>
      <td>No</td>
      <td>Only if next week's procedure is actually different</td>
    </tr>
  </tbody>
</table>

Memory is the other place a Monday run goes wrong. The [memory guide](https://github.com/agent0ai/agent-zero/blob/main/docs/guides/memory.md) says the dashboard can filter by area: `main`, `fragments`, `solutions`, and `skills`. You can edit or delete a row. It also says project-specific memories should stay in the project, because client rules and local commands should not leak into unrelated work. A show date is a project fact. It does not belong in global memory, where the next artist chat could treat it as a preference.

I delete, or I rewrite, a memory that says any of these:

- A test deploy already updated the live dates.
- An old port, path, or `runtime=input` flag still applies.
- Two artists share one set of embed URLs.
- A failed oEmbed call was saved as "Spotify is fine."

The guide's loop is search, read the full entry, edit what is almost right, delete what is wrong, then run the task again. I do the delete myself. I do not ask the Monday chat to clean the memory database and also write the report. Those are two jobs, and the second one can hide the first.

Time Travel is the wrong safety net for the public site. The README says Time Travel gives Agent Zero-owned `/a0/usr` workspaces snapshot history, diff, travel, and revert. It also says this is not a replacement for Git or backups. If the report file is wrong, revert the workspace file. If the artist site is wrong, that revert does not touch the host that fans are loading. I still want Git on the site repo, held by a person.

v2.13's project folders help here. Chats for this artist sit under one sidebar folder. A chat with no project is a different folder. If Monday's transcript is under "No project," the run does not count, even if the sentences look right.

---

## How do I tell the Monday maintenance run worked?

**The Monday maintenance run worked when `MONDAY.md` is in the project, five checks are filled with URLs and statuses, and the live site's Git commit is the same commit named at the top of the file.** A chat that only says "all good" is a miss.

I want the file to be boring. Boring is checkable.

<table>
  <thead>
    <tr>
      <th>Row in the file</th>
      <th>Pass</th>
      <th>Fail</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Header</td>
      <td>Date, artist, project name, Git commit of the site if you have one</td>
      <td>Missing date, or a commit the agent claims it pushed</td>
    </tr>
    <tr>
      <td>Shows</td>
      <td>Bandsintown account dates and the dates visible on the page, both quoted</td>
      <td>"Shows look fine" with no dates</td>
    </tr>
    <tr>
      <td>Widget leftovers</td>
      <td>Says whether a second Bandsintown snippet is in the header</td>
      <td>Skips the header because the new widget loaded</td>
    </tr>
    <tr>
      <td>Spotify</td>
      <td>oEmbed URL, whether HTML came back, and the title field</td>
      <td>A screenshot description with no response fields</td>
    </tr>
    <tr>
      <td>Certificate</td>
      <td>notAfter date and the profile name (classic 90-day, opt-in 45-day, or 6-day)</td>
      <td>"HTTPS works" with no date</td>
    </tr>
    <tr>
      <td>Merch or mailing URL</td>
      <td>URL and HTTP status</td>
      <td>A status treated as proof the shirt is in stock</td>
    </tr>
    <tr>
      <td>Live edit</td>
      <td>Explicit "no deploy"</td>
      <td>Any sentence that says the site was updated</td>
    </tr>
  </tbody>
</table>

The pass test I actually run:

1. Open the project picker and confirm this chat is on the artist project.
2. Open `MONDAY.md` from the project files, not from chat scrollback.
3. Count five checks. Each one has a URL and a status or a quoted title.
4. If a Git commit is in the header, compare it to the site repo. They match, or the file is explaining a difference it did not push.
5. Search project memory for the artist name and the word deploy. If a row claims a deploy you did not do, delete that row before next Monday.
6. Leave the live site alone when every row is clean. Edit it yourself when a row is not.

A clean file with a real mismatch is a success. The run's job was to show the mismatch. The edit is the next hour of your time, on the host you already use. I would rather see "oEmbed returned no html for this track URL" than a cheerful paragraph that rewrites the embed block inside the container and calls it fixed.

If the file is missing, I do not reprompt with a longer essay. I check the pinned skill and the project picker first. The skills guide says an old procedure stays in the chat until you remove it from Active skills. One extra pinned skill is enough to bury the checklist.

---

## FAQ

### Does Agent Zero replace a music site rebuild?

**No.** Agent Zero music site maintenance assumes the page is already live and checks five facts on a Monday. A new portfolio, a new type system, or a brand-sync layout is a different job. I wrote that build path separately. This file does not pick fonts, and it does not ship a new hero.

### Should one Agent Zero project cover two artists?

**No. One artist, one project.** The projects guide says to create a new project when the work belongs to a different client, codebase, or topic. Shared memory is how a show date from one page lands in another chat. v2.13's sidebar folders make the split visible. Two artists in one folder means I split the project before the next Monday.

### What is the difference between a skill and a project in Agent Zero?

**A skill is a procedure in the Protocol. A project is the workspace, the instructions, the files, the memory, and the secrets.** The skills guide draws that line directly. I pin one skill so the checklist is present every turn. I use the project so the checklist's notes stay with that artist. A profile, the third control, changes the broader behavior of the chat, and I do not need a new one for a report.

### Where should music-site memories live?

**In that artist's project memory, not in the global store.** The memory guide says client rules and local commands should not leak, and it lists areas you can filter: main, fragments, solutions, and skills. A bad memory is one you delete in the dashboard after the report quotes it. I do not keep "we already deployed the new dates" in global memory because a test chat said so.

### Can Agent Zero deploy a music site by itself?

**Not on this duty.** The Monday instructions say to write the report and stop. The README tells you to review actions that touch production systems, and a public artist site is one. Deploy stays on the path you already trust, after you have read `MONDAY.md`. If a transcript says the site was updated, that run failed even if the dates happen to be right.

### How long is a default Let's Encrypt certificate in October 2026?

**Ninety days, unless you opted into another profile.** The Let's Encrypt lifetime page, last updated July 22, 2026, says the default is still 90 days and that 6-day certificates are optional. The December 2, 2025 post puts 45-day certificates on the opt-in `tlsserver` profile as of May 13, 2026, and moves the default classic profile to 64 days on February 10, 2027. The Monday row should name the profile and the notAfter date. It should not renew anything.

### How do I check a Spotify embed without guessing?

**Call oEmbed and record whether HTML and a title came back.** Spotify's reference documents `GET /oembed` on `https://open.spotify.com` for a URL-encoded show, episode, artist, album, or track. The embeds overview also allows HTML copied from the client and the iFrame API. I still want the oEmbed fields in the report, because a screenshot does not tell me which URL the page is actually requesting.

### How is music-site maintenance different from an Agent Zero sales install?

**Maintenance starts when the site is already public. A sales install is the project that puts an agent into someone else's operation.** This page does not quote a setup fee, and it does not hand you a statement of work. The deliverable here is `MONDAY.md` plus your own edit. If you still need the site designed, you are in the build, not in this checklist.

### Does Agent Zero Time Travel replace Git for the artist site?

**No.** Time Travel snapshots the Agent Zero `/a0/usr` workspace so you can diff and revert files the agent wrote there. The README says it is not a replacement for Git or backups. Reverting `MONDAY.md` does not roll back the host fans are loading. Keep Git on the site repo, and let a person run it.

---

I am William Spurlock. I build this class of system at Spurlock Studios LLC. On an [AI automation strategy call](/contact), bring the artist URL and, if you have it, last Monday's file. I will tell you whether the project is actually one artist, whether the pinned skill stops at the report, and whether a memory is claiming a deploy you did not make. I will not invent a savings number to make the checklist look finished.
