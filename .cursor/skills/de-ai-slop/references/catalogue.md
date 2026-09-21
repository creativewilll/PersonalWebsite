# De-slop catalogue

Used by `scripts/deslop.py` and by the rewrite passes. Technical/code uses are exempt (`JSON.parse`, agent orchestration, "parse the CSV").

## 1. AI vocabulary

### Root matches (any inflection)

elevate, unlock, unleash, delve, leverage, empower, harness, streamline, utilize, facilitate, revolutionize, supercharge, game-chang, meticulously, holistic, tapestry, symphony, robust, seamless, cutting-edge, state-of-the-art, bleeding-edge, paradigm, transformative, unparalleled, groundbreaking, innovative (as filler), world-class (as filler)

### Exact-word marketing uses

journey, landscape, crafted, tapestry, symphony, synergy, vibrant, thriving, pivotal, crucial, paramount, utilize, facilitate

### William hard-ban phrases

- parse / parsing / parsed as "review / analyze"
- delve into
- leverage / leveraging (when "use" works)
- seamlessly / seamless / seamless integration
- cutting-edge / state-of-the-art / bleeding-edge
- game-changing / game-changer / revolutionary / revolutionize
- paradigm shift / sea change / watershed moment
- robust solution / robust system / robust as filler
- navigating the complexities/landscape of
- weave together / orchestrate (prose, not code)
- in today's fast-paced / rapidly evolving / ever-evolving / dynamic / digital world
- unlock the power / potential of / harness the power of
- it's worth noting / it's important to note / it should be noted
- in conclusion / to summarize / to wrap up
- imagine a world where / picture this
- dive deep into / take a deep dive
- empower / empowering

Fix: a plainer verb or a receipt (version, time, count). Not a thesaurus swap.

## 2. AI constructions

Shapes. Fill them with anything and they still read as a model.

- not just X, but Y / it's not just X, it's Y
- that's where X comes in / this is where X comes in
- say goodbye to
- whether you're X or Y / whether you are X or Y
- in this article we'll explore / this post will explore
- let's dive in / let's unpack
- at the end of the day
- the future of X is Y (empty)
- could potentially / might possibly / may potentially
- a rhetorical question the next sentence answers
- from X to Y and beyond
- more than just a (noun)
- designed to (vague purpose with no mechanism)

Fix: open with the fact or the take.

## 3. Punctuation cadence

- Two em dashes (`—` or `--`) inside a 220-character window.
- More than three semicolons per 1,000 words.

One dash in a paragraph is punctuation. Three is a tic.

## 4. Empty rule-of-three

Fires on three stacked adjectives or three empty praise words:

- `faster, smarter, and better`
- `trusted, reliable and built to last`

Does **not** fire on three real inventory items ("inspection, repair, and replacement").

## 5. Invented proof

Fail if a number sits next to a people-noun without a source in the same sentence or the Claims table:

- `10,000+ happy users`
- `trusted by 500 companies`
- star ratings you did not earn
- ROI or hours-saved figures that are not the locked receipts (600+ built / 500+ live, 20,000+ personal hours, 35,000+ client hours saved)

Hedged + dated + linked stats stay. `--allow-proof` only when every hit is already a Claims row.
