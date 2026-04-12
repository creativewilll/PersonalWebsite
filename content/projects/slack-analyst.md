---
title: "Slack Mention Analyst + Inbox Declutter"
slug: "slack-analyst"
type: "workflow"
description: "An intelligent Slack companion that monitors mentions, synthesizes context, and transforms messy conversations into clear action items."
image: "/projects/slack-analyst.png"
timeline: "1 Week"
featured: true
priority: 4
tags: ["Slack Automation", "Productivity", "NLP", "Task Management"]
features:
  - "Contextual Analysis: Reviews surrounding messages to understand the 'Why'"
  - "Web Research: Performs brief research if a mention asks for external info"
  - "Task Breakdown: Sends a structured to-do list directly to your DMs"
  - "Inbox Declutter: Generates a prioritized summary of your unread messages"
---

# Taming the Chaos: Slack Mention Analyst

Slack is where work happens, but it's also where focus goes to die. The **Slack Mention Analyst** is designed to reclaim your time by acting as a filter between you and the endless stream of notifications.

## The Problem: The "Slack Vortex"
We've all been there: you get mentioned in a thread that's 50 messages deep. You spend 15 minutes scrolling back to understand what's being asked, only to realize it's a simple question you could have answered in seconds. Or worse, you miss a critical mention because it was buried in a busy channel.

## The Solution: Intelligent Synthesis
The Analyst doesn't just notify you; it **prepares** you.

### 1. Context Retrieval
When you are mentioned, the agent instantly:
-   **Scopes back**: Reads the last 20–50 messages in the thread.
-   **Identifies key players**: Notes who asked the question and what other stakeholders have said.
-   **Summarizes**: Crafts a 3-sentence summary: "Where we are," "What they need from you," and "Deadline (if mentioned)."

### 2. Autonomous Research Bridge
If a colleague asks, *"Hey [Name], do we know if [Competitor X] updated their pricing yet?"*, the agent:
-   **Recognizes the need**: Identifies that external data is required.
-   **Searches**: Performs a quick web search via Perplexity or Google Search API.
-   **Drafts the answer**: Sends you a DM: *"You were mentioned in #marketing. They asked about Competitor X. My research shows they updated pricing to $49/mo last Tuesday. Would you like me to post this response?"*

### 3. Inbox Declutter & Daily Brief
Every morning (or on-demand), the agent generates a "Declutter List":
-   **Categorizes**: Separates "FYIs" from "Action Items."
-   **Prioritizes**: Uses LLM logic to determine urgency based on keywords and sender.
-   **To-Do Integration**: Automatically syncs these items to your Todoist, Linear, or Notion workspace.

## Technical Implementation
-   **API**: Slack Web Client & Events API (Socket Mode).
-   **Intelligence**: GPT-4o-mini for rapid classification and summarization.
-   **Search**: Tavily / Serper for high-quality search results.
-   **Automation**: n8n for webhook handling and cross-app syncing.

## The Result
Users of the Slack Mention Analyst report a **60% reduction in time spent "catching up"** on Slack threads and a significantly lower stress level regarding unread messages. It's the ultimate tool for developers, project managers, and executives who need to stay informed without being overwhelmed.
