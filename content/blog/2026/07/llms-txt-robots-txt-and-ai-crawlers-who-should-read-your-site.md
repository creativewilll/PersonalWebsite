---
title: "llms.txt, robots.txt, and AI Crawlers: Who Should Be Allowed to Read Your Site?"
slug: "llms-txt-robots-txt-and-ai-crawlers-who-should-read-your-site"
date: "2026-07-02"
lastModified: "2026-07-02"
author: "William Spurlock"
readingTime: 8
categories:
  - "AI Visibility"
tags: ["llms.txt", "ai crawlers", "robots.txt", "gptbot", "ai visibility"]
featured: false
draft: false
excerpt: "Blocking all AI crawlers out of panic is killing your brand's AI visibility. Learn how to configure robots.txt and llms.txt to block training bots while allowing search bots."
coverImage: "/images/blog/llms-txt-robots-txt-and-ai-crawlers-who-should-read-your-site.png"
seoTitle: "AI Crawlers & robots.txt: Who to Block in 2026 | William Spurlock"
seoDescription: "Stop blocking search bots. Learn how to configure robots.txt and llms.txt to block AI training crawlers while maximizing your visibility in ChatGPT and Perplexity."
seoKeywords: ["ai crawlers", "robots.txt ai bots", "llms.txt", "block gptbot", "ai visibility", "chatgpt search bot"]
aioTargetQueries:
  - "should I block GPTBot from my website"
  - "how to block AI training bots but allow search"
  - "what is llms.txt and how to use it"
  - "robots.txt configuration for AI search bots"
contentCluster: "ai-visibility-technical"
pillarPost: false
entityMentions: ["William Spurlock", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "llms.txt", "robots.txt"]
serviceTrack: "ai-visibility"
---

# llms.txt, robots.txt, and AI Crawlers: Who Should Be Allowed to Read Your Site?

## The Panic-Driven Block: Why Site Owners Are Killing Their AI Visibility

**Blocking all AI bots out of fear is a catastrophic mistake that renders your business invisible to the search engines of today. While protecting your IP is valid, blanket blocks destroy your ability to be recommended in ChatGPT, Claude, and Perplexity.**

I see it every single day. A business owner reads a sensational headline about AI companies scraping the web, panics, and immediately adds a blanket disallow rule to their robots.txt file. They think they are protecting their intellectual property. In reality, they are committing digital suicide. 

This panic is understandable but deeply misguided. The fear stems from two main concerns: first, that AI models will absorb your unique insights and display them without attribution; second, that conversational search will steal your organic traffic by answering questions directly on the search results page. While these are legitimate risks for media publishers and massive content farms, the math is entirely different for service businesses, SaaS platforms, and local brands. For these companies, the primary goal of a website is not to collect ad impressions on informational articles, but to convert high-intent buyers into scheduled calls and closed deals.

As an AI Solutions Architect who has shipped hundreds of production sites and 500+ automations, and who has been SEO-certified since 2021, I can tell you that the search landscape has shifted permanently. Traditional search traffic is declining, and users are increasingly turning to AI engines to find answers. If you block every bot with an "AI" label, you are voluntarily removing your business from the index of the very systems your buyers use to make purchasing decisions.

We are no longer in a world where search engines only display a list of ten blue links. Today, AI systems synthesize information and recommend specific service providers, software, and local businesses directly to users. If you want to understand how this shift impacts your overall marketing strategy, read my analysis on whether [SEO is dead and what still works in the AI era](/blog/is-seo-dead-what-still-works-and-what-doesn-t-in-the-ai-era).

When you implement a blanket block, you are not hurting the AI companies; you are hurting your own bottom line. The consequences of a blanket block are immediate and severe:

* **Zero AI Recommendations:** Your brand will never be suggested when a buyer asks ChatGPT or Claude for recommendations in your industry.
* **Broken Citations:** If an AI engine attempts to cite your site to back up an answer, the fetch will fail, and the engine will cite your competitor instead.
* **Invisible Local Presence:** Local AI searches will bypass your business entirely because the crawlers cannot verify your hours, services, or location.
* **Lost High-Intent Leads:** Buyers who use AI search to filter and compare vendors will never see your name, cutting off your most valuable acquisition channel.

## Training vs. Retrieval: The Two Types of AI Crawlers You Must Separate

**AI crawlers fall into two completely different categories: training bots that harvest data to build models, and search bots that fetch real-time data to cite sources. You should block the former to protect your content, but you must allow the latter to capture referral traffic.**

The core of the confusion lies in treating all AI bots as a single entity. They are not. A training crawler has a completely different purpose and business impact than a search or retrieval crawler. If you do not understand this distinction, you cannot write an effective access policy.

Training crawlers are designed to gather massive datasets to train foundation models. When GPT-4 or Claude 3.5 are being built, these bots scrape the web to feed the neural networks. They operate on a massive scale, downloading billions of pages to build the statistical weights of the model. This process does not send traffic to your website. Once the model is trained, it knows facts, but it does not link back to you when answering general questions. For most commercial sites, allowing training crawlers offers little to no immediate business return. Your content is simply absorbed into the collective intelligence of the model, and users can get your insights without ever visiting your domain.

Search and retrieval crawlers, on the other hand, are the lifeblood of modern AI visibility. These bots are used in Retrieval-Augmented Generation (RAG) pipelines. When a user asks ChatGPT Search or Perplexity a question, these bots crawl the web in real-time (or access a fresh search index) to find the most up-to-date answers. They synthesize the content and, specifically, provide direct links and citations back to your website. This is where your new referral traffic comes from. To learn more about how these systems select which sites to recommend, read my guide on [how ChatGPT and Perplexity decide which businesses to recommend](/blog/how-chatgpt-and-perplexity-actually-decide-which-businesses-to-recommend).

By separating these two types of bots, you can protect your intellectual property from being used to train general models while keeping your doors open for high-value search traffic.

| Crawler Category | Primary Purpose | How It Works | Business Impact | Recommended Action |
| :--- | :--- | :--- | :--- | :--- |
| **Training Crawlers** | Ingest web content to train foundation model weights. | Scrapes massive amounts of historical data to feed neural networks during training runs. | No direct referral traffic; content is absorbed into the model's general knowledge. | **Disallow / Block** (unless you want to contribute to model training) |
| **Search & Retrieval** | Index and fetch pages in real-time to answer user queries with citations. | Fetches fresh web pages on-demand or maintains a real-time index for active user searches. | Sends highly qualified referral traffic directly to your cited pages. | **Allow / Permit** (essential for AI search visibility) |
| **On-Demand User Bots** | Fetch a specific URL when a user explicitly requests it in a chat session. | Triggered directly by a user pasting a link into a chat and asking the AI to analyze it. | Direct user engagement; allows users to interact with your content via AI. | **Allow / Permit** (ensures smooth user experience) |

## The 2026 AI Crawler Directory: Who Is Knocking on Your Door?

**The AI crawler landscape is highly fragmented, with each major lab running separate bots for model training and real-time retrieval. Managing these bots requires targeting their specific user-agent strings rather than using generic wildcards.**

To manage your site's visibility, you need to know exactly who is crawling your site and why. The days of a single user-agent representing an entire company are gone. Today, OpenAI, Anthropic, and Google have split their crawlers into specialized agents.

For example, OpenAI uses `GPTBot` to collect training data, but uses `OAI-SearchBot` to index content for ChatGPT Search. If you block `GPTBot` but allow `OAI-SearchBot`, you protect your content from being used to train future models while ensuring you still appear in ChatGPT's real-time search results. Similarly, Anthropic uses `ClaudeBot` for training and `Claude-SearchBot` for search indexing.

Let's look at the specific roles of each major crawler knocking on your door:

* **GPTBot (OpenAI):** This is the core training crawler for OpenAI. It harvests web data to train future GPT foundation models. It does not send referral traffic.
* **OAI-SearchBot (OpenAI):** This is the crawler that powers ChatGPT Search. It indexes your site so that ChatGPT can display your content in real-time search results with direct links.
* **ChatGPT-User (OpenAI):** This bot is triggered when a user explicitly pastes your URL into ChatGPT and asks the model to read or analyze the page. Blocking this ruins the user experience.
* **ClaudeBot (Anthropic):** Anthropic's training crawler. It collects data to train future Claude models.
* **Claude-SearchBot (Anthropic):** This bot indexes pages for Claude's real-time search features, allowing Claude to cite and link to your site.
* **Claude-User (Anthropic):** Triggered on-demand when a Claude.ai user asks the model to analyze a specific link.
* **Google-Extended (Google):** A policy-only user-agent token. Blocking this prevents Google from using your content to train its Gemini models, but does not affect your traditional Google Search indexing.
* **PerplexityBot (Perplexity):** The search indexer for Perplexity. It crawls pages to build Perplexity's citation database.
* **Perplexity-User (Perplexity):** Fetches pages in real-time to answer a specific user query in Perplexity.
* **Applebot-Extended (Apple):** A policy-only token that controls whether your content is used to train Apple Intelligence features. Blocking it does not affect Siri or Spotlight search.
* **Bytespider (ByteDance):** The training bot for ByteDance's Doubao model. It is notorious for aggressive scraping and ignoring robots.txt.
* **CCBot (Common Crawl):** An open-source crawler that builds a public web archive. This archive is used by dozens of smaller AI companies to train their models.
* **Meta-ExternalAgent (Meta):** Meta's training crawler used to gather data for Llama models.

Here is the complete directory of the major AI crawlers active today, including their exact user-agent strings and recommended actions:

| Crawler Name | Owner | Primary Purpose | User-Agent String | Recommended Action |
| :--- | :--- | :--- | :--- | :--- |
| **GPTBot** | OpenAI | Model training data collection | `GPTBot` | **Block** |
| **OAI-SearchBot** | OpenAI | Real-time search indexing | `OAI-SearchBot` | **Allow** |
| **ChatGPT-User** | OpenAI | On-demand user-requested fetches | `ChatGPT-User` | **Allow** |
| **ClaudeBot** | Anthropic | Model training data collection | `ClaudeBot` | **Block** |
| **Claude-SearchBot** | Anthropic | Real-time search indexing | `Claude-SearchBot` | **Allow** |
| **Claude-User** | Anthropic | On-demand user-requested fetches | `Claude-User` | **Allow** |
| **Google-Extended** | Google | Gemini model training (policy token) | `Google-Extended` | **Block** (does not affect search) |
| **PerplexityBot** | Perplexity | Real-time search indexing | `PerplexityBot` | **Allow** |
| **Perplexity-User** | Perplexity | On-demand user-requested fetches | `Perplexity-User` | **Allow** |
| **Applebot-Extended** | Apple | Apple Intelligence training (policy token) | `Applebot-Extended` | **Block** (does not affect search) |
| **Bytespider** | ByteDance | Model training data collection | `Bytespider` | **Block** (requires WAF block) |
| **CCBot** | Common Crawl | Open web training archive | `CCBot` | **Block** |
| **Meta-ExternalAgent** | Meta | Model training data collection | `Meta-ExternalAgent` | **Block** |

## Why Blocking Retrieval Bots is Business Suicide in 2026

**Blocking search and retrieval bots like OAI-SearchBot or PerplexityBot removes your business from the very search results that are replacing traditional Google queries. If these bots cannot read your site, you will never be recommended when buyers ask AI for solutions.**

If a buyer goes to ChatGPT Search or Perplexity today and asks, "What are the best AI automation consultants for mid-sized service businesses?" the AI engine does not guess the answer. It performs a real-time web search. It looks for high-quality, authoritative content that directly answers the buyer's query.

If you have blocked `OAI-SearchBot` or `PerplexityBot` in your robots.txt file, the AI engine cannot read your site. It cannot verify your services, your case studies, or your expertise. Because it cannot access your content, it will simply exclude you from the response. It will recommend your competitors who were smart enough to keep their doors open.

This is not a future threat; it is happening right now. Traditional organic search click-through rates are shrinking as Google's AI Overviews and conversational engines answer queries directly. If you want to understand how to diagnose and fix a drop in your traditional search traffic due to these changes, read my guide on [why your business isn't showing up in Google AI Overviews and how to fix it](/blog/why-your-business-isn-t-showing-up-in-google-ai-overviews-and-how-to-fix-it).

By blocking retrieval bots, you are actively choosing to be invisible. You are cutting off a high-intent traffic source that is growing at an exponential rate. The buyers coming from AI search are highly qualified because the AI has already vetted your site and determined that you are a match for their specific needs. Blocking these bots is not protection; it is self-sabotage.

## How to Configure robots.txt for Selective AI Access

**A modern robots.txt configuration must explicitly allow retrieval and search crawlers while blocking training bots. This selective approach protects your intellectual property without sacrificing your search visibility.**

To implement this selective access, you must construct your robots.txt file with precision. You cannot rely on a single wildcard rule like `Disallow: /` because that will block the search bots along with the training bots. Instead, you must explicitly allow the search and retrieval agents first, and then block the training agents.

Most web crawlers read robots.txt from top to bottom and apply the first matching rule, or they look for the most specific match. To ensure there is no ambiguity, list your allowed crawlers clearly at the top of the file, followed by your disallowed crawlers.

Here is a practical, production-ready robots.txt configuration block that implements this exact strategy:

```text
# ==========================================
# ALLOW AI SEARCH & RETRIEVAL CRAWLERS
# ==========================================

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# ==========================================
# BLOCK AI TRAINING CRAWLERS
# ==========================================

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: Bytespider
Disallow: /
```

By deploying this configuration, you establish a clear boundary. You are telling the AI companies that they are welcome to index your site to send you traffic, but they are not allowed to use your content to build their proprietary models.

## What is llms.txt and Does It Matter for Your Business Yet?

**The llms.txt file is a proposed Markdown standard that provides a curated, LLM-friendly index of your website's most important content. While it is not a formal W3C standard, it is rapidly becoming a key tool for AI agents and developer-focused search tools.**

While robots.txt is about access control (what bots can and cannot read), the newly proposed `llms.txt` standard is about curation (how bots should read your site). Proposed by Jeremy Howard, co-founder of fast.ai, on September 3, 2024, the `llms.txt` file is a plain-text Markdown file served at the root of your domain (`https://yourdomain.com/llms.txt`).

Think of it as a sitemap designed specifically for large language models and AI agents. Traditional sitemaps are written in XML, which is hard for LLMs to read efficiently within tight token limits. An `llms.txt` file uses clean, lightweight Markdown to provide a high-level summary of your site, followed by a curated list of absolute links to your most important pages, each annotated with a brief description.

Does it matter yet? Yes, and its importance is growing rapidly. In 2026, we are seeing major platforms integrate this standard into their core products. For example, Chrome Lighthouse now includes an `llms.txt` audit to measure a site's readiness for agentic browsing. Furthermore, Google's recent announcements regarding agentic search and grounding highlighted `llms.txt` as a key mechanism for helping AI systems understand site structure. Systems like Cursor, Claude Code, and various agentic browsing stacks are already designed to look for an `llms.txt` file when a user asks them to research a website or library. By providing this file, you make it incredibly easy for these tools to ingest your documentation, product details, or service offerings without wasting tokens on header navigation, footers, or sidebar noise.

It is important to understand that `llms.txt` is not an access control mechanism. It does not replace robots.txt, and training bots will not use it to opt out of training. It is an optimization tool for inference-time use cases, helping AI agents understand your site structure and find the exact information they need to answer user questions.

## How to Structure a Compliant llms.txt File

**A compliant llms.txt file must live at your site's root and follow a strict Markdown structure starting with a single H1 and a blockquote summary. Grouping your links into logical H2 sections allows AI models to quickly find the exact pages they need.**

To create a file that AI agents can parse without errors, you must follow the official specification. The grammar is simple but strict. It must be served as plain text (`text/plain` or `text/markdown`) and encoded in UTF-8.

The file contains five primary components:

1. **The Title:** A single H1 heading (`# Site Name`) on the very first line.
2. **The Summary:** A blockquote (`> description`) immediately following the H1, summarizing what your business or site does.
3. **The Body:** Optional brief paragraphs explaining how to navigate the files.
4. **The Sections:** H2 headings (`## Section Name`) that group your links.
5. **The Links:** An unordered list of absolute URLs formatted exactly as `- [Title](URL): Description`.

Here is a complete, compliant `llms.txt` configuration block that you can adapt for your business:

```markdown
# William Spurlock | AI Solutions & Web Studio

> I build high-performance AI automations and premium full-stack websites for service businesses looking to scale.

This file serves as a directory of key resources for AI search engines, agents, and crawlers.

## Core Services

- [AI Automation Services](https://williamspurlock.com/services/ai-automation): Custom n8n workflows, agentic systems, and AI integrations.
- [Web Design & Development](https://williamspurlock.com/services/web-design): Immersive, high-performance React and Next.js websites.
- [AI Visibility Audit](https://williamspurlock.com/contact): Technical analysis of your site's AI search readiness and crawler access.

## Case Studies

- [Fractional CTO Case Study](https://williamspurlock.com/portfolio/fractional-cto): How we saved 10,000+ hours for a service-business client using custom agents.
- [Enterprise n8n Pipeline](https://williamspurlock.com/portfolio/n8n-pipeline): Building a self-healing lead generation stack.

## Optional

- [Blog Archive](https://williamspurlock.com/blog): Our full library of articles on AI visibility, development, and automation.
- [About William Spurlock](https://williamspurlock.com/about): Background, certifications, and brand history.
```

The `## Optional` section has a special meaning in the specification. If included, it signals to AI systems that the URLs listed under it can be skipped if a shorter context is needed. This is perfect for secondary information like blog archives, career pages, or brand assets that are useful but not essential for a core understanding of your business.

If you have a large site with extensive documentation, you can also create a companion file at `/llms-full.txt`. While `llms.txt` acts as an index of links, `llms-full.txt` contains the actual full-text Markdown content of those linked pages concatenated together. This allows an AI agent to read your entire core site in a single fetch. You can automate the generation of both files using CLI tools like `llms_txt2ctx`, which scan your site structure and compile your Markdown files into a compliant format.

## The Cloudflare and WAF Gotcha: Why robots.txt Isn't Enough

**A robots.txt file is only a polite request, and some aggressive scrapers will ignore it entirely. To truly secure your site, you must combine robots.txt directives with edge-layer firewall rules in your CDN or WAF.**

It is a common misconception that robots.txt is a security barrier. It is not. It is a text file that polite web crawlers choose to respect. While reputable companies like OpenAI, Anthropic, and Google strictly follow robots.txt directives, other actors do not.

Aggressive training crawlers like ByteDance's `Bytespider` or various rogue scrapers frequently ignore robots.txt rules. If these bots find valuable content on your site, they will scrape it anyway, consuming your server bandwidth and harvesting your data without permission.

To enforce your access rules, you must implement blocks at the network edge using a Web Application Firewall (WAF) or a Content Delivery Network (CDN) like Cloudflare. By configuring edge-layer rules, you can intercept requests from unauthorized user-agents and block them before they ever reach your web server. This saves your server resources and guarantees that your content remains protected.

For example, you can write a Cloudflare WAF rule that blocks aggressive bots while allowing search bots. Here is a sample expression that you can deploy in your Cloudflare dashboard:

```text
(http.user_agent contains "Bytespider") or 
(http.user_agent contains "CCBot") or 
(http.user_agent contains "Meta-ExternalAgent")
```

When this rule is active, any request from these user-agents is immediately blocked at the Cloudflare edge, returning a 403 Forbidden status code.

A strong edge-security strategy includes:

* **User-Agent Blocking:** Create a WAF rule that matches known aggressive bots (like `Bytespider` or `CCBot`) and returns a 403 Forbidden response.
* **Rate Limiting:** Implement rate limits to prevent any single IP or user-agent from making hundreds of requests per minute, which is a clear sign of automated scraping.
* **Managed Challenge:** Use Cloudflare's Managed Challenge (CAPTCHA) for suspicious traffic, allowing legitimate users and polite search bots through while stopping automated scrapers in their tracks.
* **Log Auditing:** Regularly review your firewall logs to verify that allowed search bots (like `OAI-SearchBot`) are not accidentally caught in your security filters.

Relying solely on robots.txt is like locking your front door but leaving the windows wide open. Use robots.txt to guide the polite search bots, and use your WAF to block the bad actors.

## Frequently Asked Questions About AI Crawlers and robots.txt

**Managing AI crawlers involves balancing intellectual property protection with search visibility. Here are the direct answers to the most common questions business owners ask about robots.txt and llms.txt in 2026.**

### Should I block GPTBot from my website?

**Yes, you should block GPTBot if you do not want OpenAI to use your content for training its foundation models.** GPTBot is strictly a training crawler, meaning it does not send referral traffic or citations back to your website. Blocking GPTBot protects your intellectual property while allowing you to keep search-focused bots active.

### Will blocking Google-Extended hurt my Google Search rankings?

**No, blocking Google-Extended will not impact your traditional Google Search rankings or organic visibility.** Google-Extended is a policy-only token that controls whether your content is used to train Gemini models and AI Overviews, whereas standard web indexing is handled by Googlebot. This separation allows you to opt out of AI training without losing your search engine presence.

### What is the difference between GPTBot and OAI-SearchBot?

**GPTBot is OpenAI's training crawler, whereas OAI-SearchBot is their search and retrieval crawler used to build the ChatGPT Search index.** Blocking GPTBot prevents your data from being absorbed into model weights, while allowing OAI-SearchBot ensures your business can be cited and linked in ChatGPT Search results. Keeping OAI-SearchBot allowed is essential for capturing modern referral traffic.

### Does Perplexity respect robots.txt?

**Yes, Perplexity officially respects robots.txt directives targeting PerplexityBot, though their compliance has faced public scrutiny.** Cloudflare and other network providers have documented instances where Perplexity accessed sites using undeclared browser-based fetches when PerplexityBot was blocked. To ensure complete exclusion, you must combine robots.txt rules with edge-layer firewall blocks.

### How do I verify if AI crawlers are accessing my site?

**You can verify AI crawler access by analyzing your raw web server access logs or CDN traffic reports for specific user-agent strings.** Look for entries containing strings like `OAI-SearchBot` or `Claude-SearchBot` returning a 200 OK status code. If you see these user-agents returning 403 Forbidden errors, your firewall or hosting provider is blocking them.

### Is llms.txt a formal web standard?

**No, llms.txt is a proposed web convention published by Jeremy Howard on September 3, 2024, rather than a formal W3C or IETF standard.** Despite its informal status, it has gained rapid adoption among developer-focused AI tools like Cursor and Claude Code. Providing this file is an excellent way to optimize your site for agentic search and inference-time queries.

### What is the purpose of the llms-full.txt file?

**The llms-full.txt file is an optional companion file that contains the complete concatenated Markdown text of all key pages listed in your llms.txt file.** While llms.txt acts as a lightweight index of links, llms-full.txt allows an AI agent or crawler to ingest your entire core content in a single HTTP request. This drastically reduces the number of network roundtrips the agent needs to make.

### Can I block Bytespider using robots.txt?

**Yes, you can add a Disallow rule for Bytespider in your robots.txt, but this crawler is notorious for ignoring these directives.** Because ByteDance's training bot frequently bypasses robots.txt, you should enforce this block at the network level. Implementing a WAF rule in Cloudflare to block the `Bytespider` user-agent is the only way to guarantee it is stopped.

## Book an AI Visibility Audit to Claim Your Share of AI Traffic

**If you are unsure whether your site is blocking the wrong bots or missing out on AI recommendations, you need a technical audit. Claim your share of AI search traffic today by optimizing your crawler access and content structure.**

The transition from traditional search engines to AI-driven recommendation systems is the most significant shift in digital marketing since the mobile web. If your business is still relying on outdated robots.txt files or blanket blocking policies, you are actively hiding from your future customers.

As an AI Solutions Architect, I help businesses navigate this transition. I analyze your current technical setup, identify which crawlers are accessing your site, and build a custom access policy that protects your proprietary data while maximizing your visibility in ChatGPT, Claude, and Perplexity.

Stop guessing which bots to block and start claiming your share of AI traffic. [Book an AI visibility audit](/contact) today to ensure your business is recommended when your buyers ask AI for solutions.
