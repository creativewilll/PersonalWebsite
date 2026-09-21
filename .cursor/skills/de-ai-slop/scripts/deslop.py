#!/usr/bin/env python3
"""Score prose for AI tells. Stdlib only. Exit 1 below 5/5."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT_WORDS = (
    "elevate",
    "unlock",
    "unleash",
    "delve",
    "leverage",
    "empower",
    "harness",
    "streamline",
    "utilize",
    "facilitate",
    "revolutionize",
    "supercharge",
    "game-chang",
    "meticulous",
    "holistic",
    "tapestry",
    "symphony",
    "robust",
    "seamless",
    "cutting-edge",
    "state-of-the-art",
    "bleeding-edge",
    "paradigm",
    "transformative",
    "unparalleled",
    "groundbreaking",
)

EXACT_WORDS = (
    "journey",
    "landscape",
    "crafted",
    "synergy",
    "vibrant",
    "thriving",
    "pivotal",
    "crucial",
    "paramount",
)

PHRASES = (
    r"navigating the (?:complexities|landscape) of",
    r"weave together",
    r"in today's (?:fast-paced|rapidly evolving|ever-evolving|dynamic|digital) world",
    r"rapidly evolving",
    r"ever-evolving",
    r"unlock the (?:power|potential) of",
    r"harness the power of",
    r"(?:it'?s|it is) worth noting",
    r"(?:it'?s|it is) important to note",
    r"it should be noted",
    r"\bin conclusion\b",
    r"to summarize",
    r"to wrap up",
    r"imagine a world where",
    r"picture this",
    r"dive deep into",
    r"take a deep dive",
    r"seamless integration",
    r"paradigm shift",
    r"sea change",
    r"watershed moment",
    r"game-changer",
    r"robust (?:solution|system)",
)

CONSTRUCTIONS = (
    r"not just\b.{0,80}\bbut\b",
    r"it'?s not just\b.{0,80}\bit'?s\b",
    r"(?:that'?s|this is) where .{0,60} comes in",
    r"say goodbye to",
    r"whether you(?:'re| are) .{0,80} or ",
    r"(?:in this article|this post) (?:we'?ll |will )?explore",
    r"let'?s (?:dive in|unpack)",
    r"at the end of the day",
    r"the future of .{0,40} is ",
    r"could potentially|might possibly|may potentially",
    r"from .{0,40} to .{0,40} and beyond",
    r"more than just a ",
    r"designed to (?:help|empower|unlock|transform|revolutionize)",
)

PEOPLE_NOUNS = (
    r"users?",
    r"customers?",
    r"clients?",
    r"companies",
    r"businesses",
    r"teams?",
    r"founders?",
    r"homeowners?",
    r"readers?",
    r"developers?",
    r"marketers?",
)

PARSE_METAPHOR = re.compile(
    r"\bpars(?:e|es|ed|ing)\b(?!\s+(?:json|csv|xml|yaml|the\s+(?:csv|json|xml|file|payload)))",
    re.I,
)

TRICOLON = re.compile(
    r"\b([A-Za-z]{3,}),\s+([A-Za-z]{3,}),?\s+and\s+([A-Za-z]{3,})\b"
)

EMPTY_ADJECTIVES = {
    "faster",
    "smarter",
    "better",
    "trusted",
    "reliable",
    "powerful",
    "innovative",
    "seamless",
    "robust",
    "scalable",
    "vibrant",
    "holistic",
    "comprehensive",
    "cutting",
}


def strip_exempt(text: str) -> str:
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            text = text[end + 4 :]
    text = re.sub(r"```[\s\S]*?```", " ", text)
    text = re.sub(r"`[^`\n]+`", " ", text)
    text = re.sub(r"~~.*?~~", " ", text)
    return text


def word_count(text: str) -> int:
    return len(re.findall(r"[A-Za-z0-9']+", text))


def find_vocab(text: str) -> list[str]:
    hits: list[str] = []
    lower = text.lower()
    for root in ROOT_WORDS:
        if re.search(rf"\b{re.escape(root)}[a-z-]*\b", lower):
            hits.append(root)
    for word in EXACT_WORDS:
        if re.search(rf"\b{re.escape(word)}\b", lower):
            hits.append(word)
    for pat in PHRASES:
        if re.search(pat, text, re.I):
            hits.append(pat)
    if PARSE_METAPHOR.search(text):
        hits.append("parse-as-metaphor")
    return hits


def find_constructions(text: str) -> list[str]:
    hits = []
    for pat in CONSTRUCTIONS:
        if re.search(pat, text, re.I | re.S):
            hits.append(pat)
    # Rhetorical question immediately answered
    if re.search(r"\?[^\n]{0,40}\n+[A-Z][^\n]{10,}", text):
        hits.append("self-answered-question")
    return hits


def find_punctuation(text: str) -> list[str]:
    hits = []
    window = 220
    dash_pat = re.compile(r"—|--")
    for i in range(0, max(len(text) - 1, 0)):
        chunk = text[i : i + window]
        if len(dash_pat.findall(chunk)) >= 2:
            hits.append("em-dash-cluster")
            break
    wc = max(word_count(text), 1)
    semis = text.count(";")
    if semis > max(3, wc / 1000 * 3):
        hits.append(f"semicolon-flood:{semis}")
    return hits


def find_tricolons(text: str) -> list[str]:
    hits = []
    for match in TRICOLON.finditer(text):
        words = [match.group(1).lower(), match.group(2).lower(), match.group(3).lower()]
        if sum(w in EMPTY_ADJECTIVES for w in words) >= 2:
            hits.append(match.group(0))
    return hits


def find_proof(text: str) -> list[str]:
    hits = []
    people = "|".join(PEOPLE_NOUNS)
    pat = re.compile(
        rf"(\d[\d,]*(?:\.\d+)?\+?)\s+(?:happy\s+)?({people})\b",
        re.I,
    )
    sourced = re.compile(r"https?://|\[\d{4}|as of |according to |source:", re.I)
    for match in pat.finditer(text):
        start = max(0, match.start() - 120)
        end = min(len(text), match.end() + 120)
        window = text[start:end]
        if sourced.search(window):
            continue
        hits.append(match.group(0))
    roi = re.compile(
        r"\b(?:\d+%|\d+x)\s+(?:roi|return|increase|boost|growth)\b",
        re.I,
    )
    for match in roi.finditer(text):
        start = max(0, match.start() - 120)
        end = min(len(text), match.end() + 80)
        if not sourced.search(text[start:end]):
            hits.append(match.group(0))
    return hits


def score(text: str, allow_proof: bool) -> tuple[int, dict[str, list[str]]]:
    prose = strip_exempt(text)
    groups = {
        "vocabulary": find_vocab(prose),
        "constructions": find_constructions(prose),
        "punctuation": find_punctuation(prose),
        "tricolon": find_tricolons(prose),
        "proof": find_proof(prose),
    }
    lost = 0
    for name, hits in groups.items():
        if hits and not (name == "proof" and allow_proof):
            lost += 1
    return 5 - lost, groups


def main() -> int:
    parser = argparse.ArgumentParser(description="Score copy for AI slop. Exit 1 below 5/5.")
    parser.add_argument("path", nargs="?", help="Markdown or text file")
    parser.add_argument("--text", help="Score a literal string")
    parser.add_argument(
        "--allow-proof",
        action="store_true",
        help="Downgrade invented-proof hits to warnings (Claims-backed numbers only)",
    )
    args = parser.parse_args()

    if args.text is not None:
        raw = args.text
        label = "--text"
    elif args.path:
        raw = Path(args.path).read_text(encoding="utf-8")
        label = args.path
    else:
        parser.print_help()
        return 2

    total, groups = score(raw, args.allow_proof)
    print(f"{label}: {total}/5")
    names = {
        "vocabulary": "1 vocabulary",
        "constructions": "2 constructions",
        "punctuation": "3 punctuation",
        "tricolon": "4 empty rule-of-three",
        "proof": "5 invented proof",
    }
    for key, hits in groups.items():
        if not hits:
            continue
        shown = hits[:8]
        extra = f" (+{len(hits) - 8} more)" if len(hits) > 8 else ""
        tag = "WARN" if key == "proof" and args.allow_proof else "FAIL"
        print(f"  [{tag}] {names[key]}: {', '.join(map(str, shown))}{extra}")
    if total < 5:
        print("below 5/5 — rewrite, cleanse with a rival model, then rescore")
        return 1
    print("PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
