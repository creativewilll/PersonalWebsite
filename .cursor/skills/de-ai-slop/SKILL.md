---
name: de-ai-slop
description: Scores and rewrites AI-written copy to 5/5 using a SlopMonster-style loop (score, rewrite, rival-model cleanse, rescore). Use after drafting williamspurlock.com posts, personal social copy, landing pages, or any prose a human will judge. Mandatory before publishing williamspurlock.com posts. Not for Divine Toke / Jamie — that uses divinetoke-deslop.
---

# De-AI-Slop

Turn drafted copy into something a person would ship. The scorer gets the first word and the last word. "Mostly clean" is how a page still smells like a model wrote it.

Read [references/catalogue.md](references/catalogue.md) and [references/principles.md](references/principles.md) before rewriting.

## When to use

- After assembling a williamspurlock.com post (v2 SOP step 5.5), before the Node validation gate.
- When de-slopping personal / Spurlock social captions, landing copy, or other non-DT prose.
- When the user says "de-slop", "slopmonster", or "this reads like AI" **and the brand is not Divine Toke**.

**Divine Toke / Jamie / `@divinetokecanna`:** stop. Use `~/.cursor/skills/divinetoke-deslop`. Generic 5/5 is not Jamie. Do not run this scorer on Jamie copy.

Do not run this on code, configs, or raw n8n/MCP JSON.

## The loop

```
1. SCORE     python3 scripts/deslop.py <file>
2. REWRITE   vocabulary → shapes → put a person back in
3. CLEANSE   rival model family (never the writer)
4. RESCORE   python3 scripts/deslop.py <file>   ship only at 5/5
```

Find `scripts/deslop.py` next to this file. Prefer the **repo** copy on Cloud:

```bash
python3 .cursor/skills/de-ai-slop/scripts/deslop.py path/to/draft.md
python3 .cursor/skills/de-ai-slop/scripts/deslop.py --text "It's not just a tool, it's a journey."
```

Local machines may also use `~/.cursor/skills/de-ai-slop/scripts/deslop.py`. Do not stop a Cloud run because `~/.cursor/skills` is missing if the repo copy exists. Exit code `1` means below 5/5. Do not publish.

`--allow-proof` turns invented-proof hits into warnings when every flagged number is already in the Airtable Claims table with a dated source. Default is fail.

The scorer skips YAML frontmatter, fenced code, inline code, and `~~struck~~` text.

## Rewrite passes

Do them in order. Do not jump to "make it sound nicer."

1. **Vocabulary.** Replace every catalogue hit with a plain word or a receipt. Not a posher synonym.
2. **Shapes.** Break `not just X but Y`, `that's where X comes in`, stacked hedges, and self-answered rhetorical questions. Lead with the fact.
3. **Person.** Read each paragraph out loud. If you would not say it to a founder at dinner, rewrite it. First person for William's blog. Strong opinion + one specific number or version.

What goes in the tells' place: [references/principles.md](references/principles.md). Specificity beats adjectives. Never invent proof.

## Rival-model cleanse

A model cannot hear its own accent. The cleanse must use a **different family** than the draft writer.

| Writer family | Cleanse via Task |
|---|---|
| Anthropic (Claude) | `gpt-5.4-mini-medium` or another listed GPT |
| OpenAI (GPT) | `cursor-grok-4.6-xhigh-fast` or a listed Claude |
| xAI (Grok) | `gpt-5.4-mini-medium` or a listed Claude |
| Google (Gemini) | `gpt-5.4-mini-medium` or `cursor-grok-4.6-xhigh-fast` |

If the parent model is unknown, treat it as the family you are running on and pick the other column.

Do **not** call `claude` or `codex` CLIs. They will not be on a Cloud Agent VM.

### Cleanse Task prompt

Give the subagent the file path, the scorer output, and this instruction:

> Rewrite only the prose. Keep every fact, URL, version, and claim. Do not add testimonials, client names, or numbers that are not already in the draft. Remove leftover AI vocabulary and constructions from the attached catalogue. Return the full markdown file.

After the cleanse, **you** re-run `deslop.py`. The cleanser does not get to mark its own homework.

## Score groups

One point each. A hit in a group costs that point. Details live in the catalogue.

1. **AI vocabulary** — root list (`elevate`, `unlock`, `delve`, …) plus exact marketing words (`journey`, `landscape`, `crafted` as filler). William hard bans included (`leverage`, `seamless`, `parse` as metaphor).
2. **AI constructions** — sentence shapes, not single words.
3. **Punctuation cadence** — two em dashes inside a 220-character window; semicolon flood (more than 3 per 1,000 words).
4. **Empty rule-of-three** — `faster, smarter, and better` style adjective stacks. Real three-item inventories (inspection, repair, replacement) stay clean.
5. **Invented proof** — a number glued to a people-noun (`10,000+ happy users`), unsourced ROI, fake ratings. Hedged + sourced stats stay. `--allow-proof` only when Claims rows exist.

## Blog gate

For williamspurlock.com, 5/5 is required before `node scripts/publish-scheduled-posts.mjs gate` / `publish`. The Node banned-word scan is a second tripwire, not a substitute.

If a rewrite would drop a sourced claim, keep the claim and change the sentence around it.

## Done when

- `deslop.py` prints `5/5` and exits 0.
- No new facts were invented.
- Length is within ~10% of the draft unless the draft was padding.
