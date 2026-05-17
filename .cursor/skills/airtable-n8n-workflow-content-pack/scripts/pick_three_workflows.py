#!/usr/bin/env python3
"""Pick N random rows from the n8n Automations Airtable CSV export.

Usage:
  python pick_three_workflows.py [--csv PATH] [--n 3] [--seed SEED]

Default CSV: ~/Downloads/n8n Automations Airtable.csv
Override: env N8N_AIRTABLE_CSV
"""
from __future__ import annotations

import argparse
import csv
import os
import random
import sys
from pathlib import Path


def default_csv_path() -> Path:
    env = os.environ.get("N8N_AIRTABLE_CSV")
    if env:
        return Path(env).expanduser()
    return Path.home() / "Downloads" / "n8n Automations Airtable.csv"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--csv", type=Path, default=None, help="Path to CSV export")
    ap.add_argument("--n", type=int, default=3, help="How many workflows to sample")
    ap.add_argument("--seed", type=int, default=None, help="RNG seed (reproducible picks)")
    args = ap.parse_args()

    path = (args.csv or default_csv_path()).expanduser()
    if not path.is_file():
        print(f"ERROR: CSV not found: {path}", file=sys.stderr)
        return 1

    if args.seed is not None:
        random.seed(args.seed)

    with path.open(newline="", encoding="utf-8-sig", errors="replace") as f:
        rows = list(csv.DictReader(f))

    # Skip completely empty names
    named = [r for r in rows if (r.get("Workflow Name") or "").strip()]
    if not named:
        print("ERROR: No rows with Workflow Name", file=sys.stderr)
        return 1

    k = min(args.n, len(named))
    picks = random.sample(named, k)

    print(f"# Source: {path}")
    print(f"# Rows with name: {len(named)} | Picking: {k}\n")
    for i, row in enumerate(picks, 1):
        name = row.get("Workflow Name", "").strip()
        brief = (row.get("Brief") or "").replace("\n", " ").strip()
        if len(brief) > 220:
            brief = brief[:217] + "..."
        print(f"## Option {i}: {name}")
        print(f"{brief}\n")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
