---
title: "Why ChatGPT Recommends Your Competitor Instead of You"
slug: "why-chatgpt-recommends-your-competitor-instead-of-you"
date: "2026-09-25"
lastModified: "2026-09-25"
author: "William Spurlock"
readingTime: 19
categories:
  - "AI Visibility"
tags:
  - "ChatGPT search"
  - "competitor recommendations"
  - "OAI-SearchBot"
  - "Wikipedia notability"
  - "AI visibility"
featured: false
draft: false
excerpt: "Why does ChatGPT recommend my competitor instead of me? I log the browse result, the mention, and the Wikipedia gap before anyone rewrites the homepage."
coverImage: "/images/blog/why-chatgpt-recommends-your-competitor-instead-of-you.png"
coverImageAlt: "Rainy night street where a searchlight hits one glowing storefront and skips the dark shop beside it"
seoTitle: "Why ChatGPT Names Competitors | William Spurlock"
seoDescription: "Why does ChatGPT recommend my competitor instead of me? I walk through the live search, the mention check, and the Wikipedia test that decide the name."
seoKeywords:
  - "why does ChatGPT recommend my competitor instead of me"
  - "does ChatGPT browse the web in real time"
  - "how to check if ChatGPT mentions my business"
  - "Wikipedia page ChatGPT recommendation"
  - "OAI-SearchBot ChatGPT search"
  - "ChatGPT competitor shortlist"
aioTargetQueries:
  - "Why does ChatGPT recommend my competitor instead of me?"
  - "Does ChatGPT browse the web in real time and how does that affect me?"
  - "How do I check if ChatGPT mentions my business?"
  - "Does having a Wikipedia page help you get recommended by ChatGPT?"
  - "How does Claude decide what businesses or websites to recommend?"
  - "What is the best way to get Perplexity to link to my website?"
  - "Does Perplexity use Google's index to find sources?"
  - "How do I get my blog to show up as a source in Perplexity answers?"
  - "Does ChatGPT use Bing search results to find information?"
  - "Does ranking on Google page one get a brand named in ChatGPT?"
  - "How often should I recheck whether ChatGPT still names a competitor?"
  - "Does domain age affect how much AI systems trust and cite your website?"
contentCluster: "chatgpt-perplexity-visibility"
pillarPost: false
parentPillar: "how-to-get-chatgpt-and-perplexity-to-recommend-your-business"
entityMentions:
  - "William Spurlock"
  - "Spurlock Studios LLC"
  - "ChatGPT"
  - "OpenAI"
  - "OAI-SearchBot"
  - "GPTBot"
  - "ChatGPT-User"
  - "Perplexity"
  - "PerplexityBot"
  - "Wikipedia"
  - "Google AI Overviews"
serviceTrack: "ai-visibility"
---

# Why ChatGPT Recommends Your Competitor Instead of You

If you sent me a note that said, "Why does ChatGPT recommend my competitor instead of me?" I would look for the page ChatGPT can quote. I would not look at the slogan on your homepage. Your competitor made the shortlist because a search step, a pile of third-party mentions, or both back up their name. You are missing because the same check does not back up yours.

I am William Spurlock, AI Systems Architect and Fractional AI CTO at Spurlock Studios LLC. I have built 600+ automations, with 500+ live, spent 20,000+ hours architecting agentic systems, and saved clients 35,000+ hours. When an owner sends me a ChatGPT answer with another company's name in it, I do not start by rewriting the hero line. I open the Sources control and write down who got the link.

The full decision system is in [how ChatGPT and Perplexity decide which businesses to recommend](/blog/how-to-get-chatgpt-and-perplexity-to-recommend-your-business). [How to get Perplexity to cite your website](/blog/how-to-get-perplexity-to-cite-your-website-as-a-source) covers the engine that shows sources by default. Here, I stick to three checks: did ChatGPT search, did it mention you, and is a Wikipedia article speaking for the competitor. I break down the mechanism in [how ChatGPT and Perplexity actually decide](/blog/how-chatgpt-and-perplexity-actually-decide-which-businesses-to-recommend).

Here is my take before the steps. If the Sources list names them and skips you, another homepage rewrite is the wrong job. Fix the page the crawler can open.

## Does ChatGPT browse the web in real time and how does that affect me?

**ChatGPT does not keep a live camera on the web.** It searches when a question calls for current information, or when you turn search on, and then answers with links. Your competitor gets recommended when their URL lands in that set and yours does not.

On October 31, 2024, OpenAI introduced ChatGPT search as fast answers with links to web sources. It said ChatGPT can decide to search based on your question, or you can click the web search icon ([Introducing ChatGPT search](https://openai.com/index/introducing-chatgpt-search/)). The same post says the product uses third-party search providers and content from partners. OpenAI does not publish the full provider list. A February 5, 2025 update on that page says ChatGPT search was available to everyone in regions where ChatGPT is available, with no signup required.

The Help Center article I reviewed on September 25, 2026 explains what happens next. ChatGPT search sometimes rewrites your prompt into one or more targeted queries, sends them to search providers, and may share a general location taken from your IP address. It does not share the IP itself or your ChatGPT account with those providers ([ChatGPT search help](https://help.openai.com/en/articles/9237897-chatgpt-search)). A nearby restaurant question can turn into a city query. A "best plumber" question can turn into a city-plus-service query you never typed. The competitor with a page that matches that rewritten query gets the citation. The page that only matches your brand slogan does not.

OpenAI also says nobody can guarantee top placement. Inclusion depends on allowing OAI-SearchBot and traffic from OpenAI's published IP ranges (same help article). For a business owner, that is the "browse" story. Real time means the request can go fetch a page. It does not mean every chat starts with a fresh crawl of your site.

### What each bot is allowed to do

I separate the bots because owners often block the wrong one and blame the model afterward.

<table>
  <thead>
    <tr>
      <th>Bot</th>
      <th>What OpenAI says it does</th>
      <th>What I do on a site I ship</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OAI-SearchBot</td>
      <td>Surfaces sites in ChatGPT search. Opt out and you are not shown in search answers, though a navigational link can still appear.</td>
      <td>Allow it on public pages you want quoted.</td>
    </tr>
    <tr>
      <td>GPTBot</td>
      <td>Crawls content that may be used to train foundation models. Independent of search.</td>
      <td>Disallow it if you do not want training use. Search can stay on.</td>
    </tr>
    <tr>
      <td>ChatGPT-User</td>
      <td>Visits a page when a person asks a question. robots.txt may not apply. Not used to decide Search inclusion.</td>
      <td>Do not treat a ChatGPT-User hit in your logs as proof you are in the index.</td>
    </tr>
  </tbody>
</table>

That split comes from OpenAI's crawler overview, which I reviewed on September 25, 2026 ([Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots)). The same page says a robots.txt change can take about 24 hours to apply. If you allowed the bot this morning, a test tonight can still reflect yesterday's block.

The publisher FAQ, which I also reviewed that day, explains the odd case. Summaries and snippets require an unblocked OAI-SearchBot. If OpenAI gets a disallowed URL from a third-party search provider, it may still show the link and page title. The control is a `noindex` meta tag, and the crawler must be allowed to read it. Referral URLs include `utm_source=chatgpt.com`, which lets analytics separate that traffic ([Publishers and developers FAQ](https://help.openai.com/en/articles/12627856)).

### How a browse miss shows up in the answer

When I run a buyer's question with search available, I check four things:

- A Sources control or inline citations. No citations means you may be looking at memory, not a live fetch.
- The rewritten topic. City, service, and constraint should match the buyer's words, not your internal product name.
- Whose URL is attached. The competitor's service page, a directory profile, or a news mention each mean a different fix.
- Whether your URL appears as a bare title with no quote. That is the disallowed-page case in the publisher FAQ, not a win.

<table>
  <thead>
    <tr>
      <th>What you see</th>
      <th>What it usually means</th>
      <th>First move</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Competitor cited, you absent</td>
      <td>Their page matched the rewritten query</td>
      <td>Publish a page that states the same buyer facts in the first sentences</td>
    </tr>
    <tr>
      <td>You cited, facts wrong</td>
      <td>The open page disagrees with your other profiles</td>
      <td>Make name, city, and offer match on the cited URL</td>
    </tr>
    <tr>
      <td>Neither cited, generic tips</td>
      <td>The query was too broad for a commercial page</td>
      <td>Narrow the prompt to city, service, and one constraint, then match that page</td>
    </tr>
    <tr>
      <td>Competitor named, no sources at all</td>
      <td>Search did not run, or the name is from earlier public mentions</td>
      <td>Force search and run the mention check in the next section</td>
    </tr>
    <tr>
      <td>Your link with title only</td>
      <td>Bot blocked, URL still passed in by a provider</td>
      <td>Allow OAI-SearchBot, then remove <code>noindex</code> only on pages you want quoted</td>
    </tr>
  </tbody>
</table>

Blocking GPTBot is not a search strategy. OpenAI's own example says the opposite: allow OAI-SearchBot so you can appear in search, and disallow GPTBot if you want to stay out of training. Mix up those two bots and your site can disappear from answers while your logs still show a blocked-bot event.

## How do I check if ChatGPT mentions my business?

**Ask the buyer's question twice, once with search on and once without, then write down every name and URL.** The difference between those answers shows if you lost the live fetch, the older public record, or both.

I use the same four prompts each time. Put in your service, city, and the competitor's public name. Keep the wording unchanged for a month so the log tells you something.

1. Who are strong [service] options in [city] for [one constraint the buyer actually has]?
2. Recommend a [service] company in [city] if I care about [proof you can show, such as licensing or years on one job type].
3. Compare [your public brand name] and [competitor public brand name] for [that same job].
4. Name a page worth reading before hiring [service] in [city].

For each prompt, write down only this:

- Did search run? Look for citations or a Sources control.
- Were you named in the prose?
- Was the competitor named in the prose?
- Which URLs were attached, and did the sentence next to the link match the page?
- Was your city or offer wrong?

<table>
  <thead>
    <tr>
      <th>Search</th>
      <th>You named</th>
      <th>Competitor named</th>
      <th>Read</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>On</td>
      <td>No</td>
      <td>Yes, with their URL</td>
      <td>Retrieval prefers their page. Fix that URL's facts and your matching page.</td>
    </tr>
    <tr>
      <td>On</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>You are in the set. Read the sentence. A wrong city is an entity problem.</td>
    </tr>
    <tr>
      <td>Off</td>
      <td>No</td>
      <td>Yes</td>
      <td>The name is coming from older public text, not this fetch.</td>
    </tr>
    <tr>
      <td>Off</td>
      <td>No</td>
      <td>No</td>
      <td>The model has no habit of naming either of you. Search-on is the whole game.</td>
    </tr>
    <tr>
      <td>On</td>
      <td>Yes, no URL</td>
      <td>Yes, with URL</td>
      <td>You are a memory. They are a source. Sources get requoted.</td>
    </tr>
  </tbody>
</table>

Run the test in a logged-in ChatGPT session with search available. OpenAI's February 5, 2025 note says search no longer requires a paid seat in supported regions, so a free account is a fair test as of that update. Check the label in your UI anyway. If search never runs, you measured memory and called it the web.

### A log you can keep for a month

I keep a sheet with one row for each prompt every week. I keep the columns plain on purpose:

- Date
- Prompt text, unchanged
- Search on or off
- Names in order
- Cited domains
- One wrong fact, if any

Four prompts in two modes once a week gives you eight rows. After four weeks, you can see if a robots.txt change moved you or if the change only felt productive. OpenAI's 24-hour note on robots.txt is why I do not call it a win the same afternoon I edit the file.

I will not ask "tell me your sources" and treat the model's answer as the log. The citations attached to the answer are the record. A follow-up that invents a bibliography is not the search step.

The decision post covers the wider measurement set and how the shortlist gets built. This check covers only the mention. It gives you a yes, a no, or a wrong fact. That is enough to choose the next edit.

## Does having a Wikipedia page help you get recommended by ChatGPT?

**A Wikipedia article helps only when it already rests on significant coverage from reliable sources that are independent of you.** You cannot buy it like a listing. Missing one is not, by itself, the reason your competitor got the ChatGPT mention.

English Wikipedia's general notability guideline says a topic is presumed suitable for a stand-alone article after significant coverage in reliable sources independent of the subject. Significant coverage means the source addresses the topic directly and in detail, beyond a trivial mention ([Wikipedia:Notability](https://en.wikipedia.org/wiki/Wikipedia:Notability), reviewed September 25, 2026). "Presumed" is Wikipedia's word. Editors can still reject that assumption. Paid writing, a press release issued only by you, and a directory blurb do not clear that bar.

Your competitor's Wikipedia page is a clue, not a spell. At some point, someone found enough independent coverage for the article to survive. ChatGPT can search for and cite that article the same way it cites a news page. On October 31, 2024, OpenAI said any website or publisher can choose to appear in ChatGPT search. That includes a public Wikipedia URL when search providers return it. The article does not get a private lane.

### What I compare before anyone says "we need a Wikipedia page"

<table>
  <thead>
    <tr>
      <th>Asset</th>
      <th>What it proves</th>
      <th>What I do with it</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Wikipedia article that stays up</td>
      <td>Independent sources were enough for editors</td>
      <td>Read the citations. Those outlets are the real asset.</td>
    </tr>
    <tr>
      <td>Wikipedia draft that keeps getting rejected</td>
      <td>The coverage is thin or too close to the company</td>
      <td>Stop paying for another draft. Earn a real source.</td>
    </tr>
    <tr>
      <td>Your About page</td>
      <td>Facts you control</td>
      <td>State legal name, city, offer, and who you serve in the first sentences.</td>
    </tr>
    <tr>
      <td>Directory or review profile</td>
      <td>A third party repeats the name</td>
      <td>Make the name and city match the About page word for word.</td>
    </tr>
    <tr>
      <td>A deleted article</td>
      <td>Editors did not accept the sourcing</td>
      <td>Do not recreate it. The deletion is public.</td>
    </tr>
  </tbody>
</table>

I have a hard rule here. Do not hire someone to "get you on Wikipedia" as a ChatGPT tactic. If the independent coverage exists, an editor can write the article without you pretending to be a stranger. If that coverage does not exist, the page will not hold. A shaky page is a bad source for a system that cites URLs.

When the article is real, use it to check the facts on your own site:

- Legal name and common name match.
- City and service area match.
- The offer described on Wikipedia is the offer on the page you want cited.
- The references are sources a buyer could open.

If you cannot get an article, publish the same facts on a URL you own and let OAI-SearchBot read them. That does not give your page Wikipedia's weight. It does give the model something besides your competitor's encyclopedia paragraph to quote.

## What should I change on the page ChatGPT actually retrieves?

**Change the page that appears in Sources, or publish the page that should have appeared.** Leave the homepage hero alone until the cited URL states the buyer facts in sentences a model can quote.

I sort every mention log into one of four jobs. Only one calls for a new page.

<table>
  <thead>
    <tr>
      <th>Log result</th>
      <th>Job</th>
      <th>Done when</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Search on, competitor URL cited, you absent</td>
      <td>Build or fix the page that answers that prompt</td>
      <td>A later test cites you or a fair third-party page about you</td>
    </tr>
    <tr>
      <td>Search on, you cited, wrong city or offer</td>
      <td>Edit the cited URL and the profiles that repeat it</td>
      <td>The next answer uses the corrected fact</td>
    </tr>
    <tr>
      <td>Search off names them, search on still names only them</td>
      <td>Earn a third-party mention a provider can retrieve</td>
      <td>A non-owned domain appears next to their name or yours</td>
    </tr>
    <tr>
      <td>Search on, neither of you, generic advice</td>
      <td>Narrow the prompt and match a page to that narrower ask</td>
      <td>The answer attaches a commercial URL at all</td>
    </tr>
  </tbody>
</table>

The order matters. Owners jump to a blog calendar because it feels productive. If OAI-SearchBot is blocked, none of those posts can enter the summary. The publisher FAQ says it plainly: snippets require an allowed search bot. I check `robots.txt` for `OAI-SearchBot` before I assign a writer.

### The edit I actually make on the cited page

Once I know which URL ChatGPT opened, I want these lines near the top in prose, not buried in a menu:

1. Public brand name, then the legal name if it differs.
2. City or service area in the same sentence as the offer.
3. Who the offer is for, in the buyer's words.
4. One proof a stranger could check: a license, a year, a published price range you are willing to stand behind, or a named method.
5. A short answer to the prompt you tested, in two or three sentences, before the brand story.

That is what I mean by extractability. The [decision post](/blog/how-chatgpt-and-perplexity-actually-decide-which-businesses-to-recommend) explains more about how both engines choose. Here, I am sticking to what I change the week the log shows a loss.

Here is what I do not change first:

- A new tagline with no city and no offer.
- A blog post that never answers the prompt you tested.
- A Wikipedia invoice.
- Blocking GPTBot and calling that a search fix.
- Buying a mention on a page you would not want a buyer to read.

After the edit, wait. Robots changes can take about 24 hours, and you cannot flip the search providers behind ChatGPT with a setting in the chat. I rerun the same four prompts the next week. A changed citation means the edit did something. If the names and URLs stay put, I did the wrong job and I say so.

Referral traffic gives you a second check. OpenAI says ChatGPT adds `utm_source=chatgpt.com` to those links. If analytics shows that parameter on the URL you fixed, someone clicked through from an answer. A click is not the same thing as a mention. It does show that ChatGPT could attach the URL. I still want the mention log because a citation with no click is still a recommendation.

## FAQ

### How does Claude decide what businesses or websites to recommend?

**Claude's public product is not ChatGPT search, and Anthropic does not publish a placement guarantee for business names.** When Claude recommends companies, I treat the answer like any model response that may or may not have fetched the web. I read the citations when they exist, and I do not assume a Claude chat shares an index with the ChatGPT Sources list. I run the mention log in Claude separately. A competitor named there is a second channel, not a copy of the OAI-SearchBot result. The site still needs the same kind of page, with the name, city, offer, and checkable proof in the first sentences.

### What is the best way to get Perplexity to link to my website?

**Allow PerplexityBot, then give it a page that puts the facts into sentences.** Perplexity's crawler docs, reviewed September 25, 2026, say PerplexityBot surfaces and links websites in Perplexity search results and does not crawl content for foundation models ([Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)). Perplexity-User may fetch a page because a person asked, and that fetch generally ignores robots.txt. A robots.txt change can take up to 24 hours. The full playbook is [how to get Perplexity to cite your website](/blog/how-to-get-perplexity-to-cite-your-website-as-a-source).

### Does Perplexity use Google's index to find sources?

**Perplexity does not say it uses Google's index.** Its help center, last modified September 11, 2026, says PerplexityBot will not index the full or partial text of a site that blocks it. It may still keep the domain, a headline, and a short factual summary. The same article says Perplexity works with third-party crawlers to build its search index, and those providers are expected to respect robots.txt, especially on news sites. It also says Perplexity does not build foundation models ([Perplexity robots.txt help](https://www.perplexity.ai/help-center/en/articles/10354969-how-does-perplexity-follow-robots-txt)). Google ranking is a different system. I do not count a Google position as a Perplexity citation.

### How do I get my blog to show up as a source in Perplexity answers?

**Publish the answer on a URL PerplexityBot can read, and answer the buyer's question in the opening sentences.** A blog post that buries the fact under a brand story will lose to a page that states it. Perplexity's September 11, 2026 help article says a robots.txt disallow stops full-text indexing by PerplexityBot. Check the bot first, then read the paragraph a citation would have to quote. If the only quotable line is a slogan, rewrite that paragraph before adding another post.

### Does ChatGPT use Bing search results to find information?

**OpenAI's October 31, 2024 launch post says third-party search providers and partner content, but it does not name one engine as the index.** The Help Center text I reviewed on September 25, 2026 describes query rewriting and general location shared with those providers. It still does not say that one named engine runs the whole system. I would not build a plan around "rank on Bing" and assume ChatGPT has to follow. Make the page retrievable by OAI-SearchBot and readable by the provider that returned your competitor.

### Does ranking on Google page one get a brand named in ChatGPT?

**A Google ranking is not a ChatGPT citation.** As OpenAI described it on October 31, 2024, ChatGPT search returns links from third-party search providers and partners. The help article I reviewed September 25, 2026 makes no promise of top placement. You can rank on Google and still miss the Sources list when the rewritten query favors another URL. Use the mention log. If search-on cites a different domain from the one you rank with, that cited domain is your assignment.

### How often should I recheck whether ChatGPT still names a competitor?

**Check once a week for four weeks after a real change, then once a month if the names hold.** Robots.txt can take about 24 hours, so a same-day check is too early to call the edit a failure. I keep the prompt text identical. Change the question every week and the log becomes useless. If the competitor's URL remains the only citation after a month, you edited a page ChatGPT was not retrieving.

### Does domain age affect how much AI systems trust and cite your website?

**OpenAI's search docs do not list domain age as a placement factor.** They do state relevance and reliability, tie inclusion to OAI-SearchBot access and published IP allowlists, and say top placement cannot be guaranteed (help article reviewed September 25, 2026). I have seen young domains cited when the page answered the query and the bot could read it. I have seen old domains skipped when the quotable facts sat on a competitor's URL. Domain age is not the check. The Sources list is.

### Should I buy ChatGPT ads or earn the citation first?

**Earn the citation before paying for a placement you do not control.** OpenAI's crawler docs describe OAI-AdsBot as a separate agent that checks landing pages submitted as ads. It does not put you in organic search answers. OAI-SearchBot handles that job. I would not buy ads to cover for a blocked search bot or a page that never states the offer. If you run an ad later, the landing page still has to open for the ads crawler. That is separate from being named in an unpaid answer.

### How do I track when ChatGPT or Perplexity mentions my brand?

**Keep the weekly prompt log, and watch `utm_source=chatgpt.com` for ChatGPT clicks.** The log catches a mention even when nobody clicks. The parameter, documented in OpenAI's publisher FAQ, catches the click. Perplexity does not provide the same parameter in the docs I used here, so I check it by hand with the same prompts and record the cited domains. Eight rows a week is enough. A dashboard that invents a "share of model" number is not.

## Get an AI-visibility-ready site

I build AI-visibility-ready sites for owners who are tired of seeing a competitor's name come back from ChatGPT. The work starts with a page the search step can quote, OAI-SearchBot allowed, buyer facts in the first sentences, and a mention log that shows if the name moved.

If you want that site, [get an AI-visibility-ready site built](/contact). Bring the four prompts and the latest answer that named someone else. That is all I need for the brief.
