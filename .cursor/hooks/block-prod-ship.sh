#!/usr/bin/env python3
"""Deny production ship commands. Cloud + local project hook."""
import json
import re
import sys

def main() -> int:
    try:
        data = json.load(sys.stdin)
    except json.JSONDecodeError:
        print(json.dumps({"permission": "allow"}))
        return 0

    command = data.get("command") or ""

    reason = None
    if re.search(r"\bgit\s+push\b", command) and re.search(
        r"(^|\s)(-f|--force|--force-with-lease)\b", command
    ):
        reason = "Force-push is blocked. Open a PR."
    elif re.search(r"\bgit\s+push\b", command) and re.search(
        r"\b(main|master)\b", command
    ):
        reason = "Push to main/master is blocked. Open a PR. William merges."
    elif re.search(r"\bwrangler\s+deploy\b", command):
        reason = "wrangler deploy is blocked. William pushes main; Cloudflare deploys."
    elif re.search(r"\bnpm\s+run\s+deploy:manual\b", command):
        reason = "deploy:manual is blocked. William pushes main; Cloudflare deploys."

    if reason:
        print(
            json.dumps(
                {
                    "permission": "deny",
                    "user_message": reason,
                    "agent_message": reason,
                }
            )
        )
        return 0

    print(json.dumps({"permission": "allow"}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
