# Daily Blog Auto-Publish Runbook

This documents the daily automation that writes and publishes every blog post scheduled for the current date in Airtable, then pushes the artifacts to GitHub so they go live.

## What it does

Once per day at **08:00 America/New_York (Eastern)**, a local Cursor Automation named **Daily Blog Auto-Publish** runs and:

1. Refreshes the Airtable cache (`node scripts/blog-sync.mjs pull`).
2. Finds every `Schedule` row whose `Date` == today (Eastern) whose linked `Post` is not already `Status=Published`.
3. For each due post, authors it per the v2 blog skill (`~/.cursor/skills/authoring-blog-posts-v2/SKILL.md`): research + claims validation, full markdown write, cover image, FAQ, service-track CTA.
4. Runs the quality gate (frontmatter + banned-word scan + cover-image-on-disk check).
5. Syncs status back to Airtable and pushes **only** the two artifacts per post to `main`.

If nothing is scheduled, it logs "Nothing scheduled today" and exits cleanly.

## Why it runs locally

It needs two things that only exist on William's Mac:

- The gitignored `.env` at the repo root (`AIRTABLE_PAT`, `AIRTABLE_BASE_ID`).
- An authenticated `git push` to `origin main`.

A cloud/headless runner would have to be handed both secrets; the local scheduled Cursor Automation avoids that.

## The moving parts

| File | Role |
|------|------|
| `scripts/publish-scheduled-posts.mjs` | Orchestrator. Subcommands: `find-due`, `gate`, `publish`. |
| `scripts/blog-sync.mjs` | Airtable sync. `pull`, `push --slug=<slug>` (now also flips linked Questions to Published + marks the Schedule row). |
| `scripts/validate-blog-frontmatter.mjs` | Quality gate. Validates camelCase frontmatter, closing `---`, `coverImage` on disk, and the banned-word scan. Exposes `validateFile()` for import. |
| `scripts/publish-logs/<date>.log` | Per-day run log (gitignored). |
| Cursor Automation "Daily Blog Auto-Publish" | The 08:00 ET scheduled trigger + runbook prompt. |

## Manual operation (the CLI surface)

Run all of these from the repo root.

```bash
# 1. See what's due today (Eastern). Refreshes the cache first.
node scripts/publish-scheduled-posts.mjs find-due

# Force a specific date instead of "today":
node scripts/publish-scheduled-posts.mjs find-due --date=2026-06-21

# 2. Quality-gate a written post (frontmatter + banned words + cover on disk):
node scripts/publish-scheduled-posts.mjs gate --slug=<slug>

# 3. Publish: re-gate, sync Airtable, stage the 2 artifacts, commit, push to main.
node scripts/publish-scheduled-posts.mjs publish --slug=<slug>

# Dry run: gate + cover check only, no Airtable writes, no git:
node scripts/publish-scheduled-posts.mjs publish --slug=<slug> --dry
```

## How to pause it

Open the Cursor Automations UI, find **Daily Blog Auto-Publish**, and disable/pause it. Re-enable when ready. No code change needed.

## How to re-run a date

The whole pipeline is idempotent, so you can safely re-run:

- `find-due --date=YYYY-MM-DD` lists what's due and **skips** posts already `Status=Published`.
- `gate`/`publish` require the markdown file to already exist; they will not duplicate it.
- `publish` only stages the specific `.md` + `.png` for that slug. If those files are already committed and unchanged, `git commit` is a no-op (nothing to commit) — no duplicate commit is created.
- `blog-sync push` updates the existing Post row (matched by `Slug`) rather than creating a second one.

To re-publish a specific past date's post, just run `gate` then `publish` with that slug again.

## Idempotency guarantees

- **No duplicate posts** — `blog-sync` matches by `Slug` and patches the existing row.
- **No duplicate files** — the authoring step writes to a deterministic path `content/blog/YYYY/MM/<slug>.md`; `find-due` flags when a file already exists for a non-published post.
- **No duplicate commits** — staging is explicit and per-artifact; an unchanged tree yields nothing to commit.
- **Already-published posts are skipped** at the `find-due` stage.

## Recovering from a partial failure

The pipeline is ordered so each step is safe to retry from where it stopped:

| Failure point | State | Safe recovery |
|---------------|-------|---------------|
| During research/writing | No `.md` written yet | Re-run the authoring flow for that slug; nothing to undo. |
| Markdown written, gate fails | `.md` on disk, Airtable still `Queued`, nothing staged | Fix the content, re-run `gate`, then `publish`. |
| `publish` failed after Airtable sync but before git push | Airtable says Published, no commit yet | Re-run `publish --slug=<slug>`. The Airtable push is idempotent; it will then stage, commit, and push. |
| Git push rejected (e.g. remote ahead) | Commit exists locally, not on remote | `git pull --rebase origin main`, then `git push origin main`. Do not force-push. |
| Multiple posts due, one failed | Earlier posts already pushed | Re-run `publish` only for the failed slug(s). Completed ones are skipped/no-op. |

After any partial run, check `scripts/publish-logs/<date>.log` — it records each successful publish with its slug, file paths, and commit SHA.

## Run-log format

Written to `scripts/publish-logs/<date>.log` (gitignored). One block appended per successful publish:

```
[2026-06-19T12:00:00.000Z] PUBLISHED SUCCESS
Date: 2026-06-19
Slug: the-overlap-between-seo-and-ai-visibility-and-where-they-split
Title: The Overlap Between SEO and AI Visibility, and Where They Split
Markdown file: content/blog/2026/06/the-overlap-between-seo-and-ai-visibility-and-where-they-split.md
Cover image: public/images/blog/the-overlap-between-seo-and-ai-visibility-and-where-they-split.png
Commit SHA: <sha>
----------------------------------------
```

## Failure notification

Per current setup: **none beyond the on-disk log**. No Slack/email/MCP outbound channel is wired in this workspace. Check the daily log file to confirm a run succeeded. (If you later want a notifier, add it as an extra step after `publish` — the run-log already has everything a notifier would need.)

## Hard safety rules baked in

- Stages only `content/blog/**/<slug>.md` and `public/images/blog/<slug>.png` via explicit `git add` per path. Never `git add -A`/`.`.
- Never stages `.env`, `scripts/**`, `scripts/airtable-cache/**`, working JSON, or `.gitignore`.
- Secrets stay in `.env` (gitignored) and are never printed to logs.
- Never modifies git config, never force-pushes, never skips hooks.
- The `git push` is the only outbound action.
