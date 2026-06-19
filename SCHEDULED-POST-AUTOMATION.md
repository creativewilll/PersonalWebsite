# Scheduled Post Publication Automation

This document describes the automated workflow for publishing scheduled blog posts from Airtable.

## Overview

The `scripts/publish-scheduled-posts.mjs` script automates the daily blog post publication process, running at **08:00 Eastern Time** each day via a GitHub Actions cron trigger (implemented through Cloud Agent automation).

### Daily Workflow

1. **Wake up & Check** → Run `find-due` to identify posts scheduled for today
2. **For each due post** → Follow the Blog Authoring v2 Skill to write/research
3. **Design & Research** → Resolve post spec, gather sources, populate Claims table
4. **Write the Post** → Generate markdown frontmatter and content
5. **Generate Cover Image** → Create cover image using GenerateImage tool
6. **Quality Gates** → Run `gate --slug=<slug>` and fix any issues
7. **Publish** → Run `publish --slug=<slug>` to sync, commit, and push

## Commands

### 1. find-due

Refresh the Airtable cache and search for posts due today (Eastern time).

```bash
node scripts/publish-scheduled-posts.mjs find-due
# or
npm run publish:find-due
```

**Output:**
- Syncs all Schedule, Posts, Questions tables to local cache
- Lists any posts scheduled for today
- Returns "Found 0 due scheduled post(s)" if nothing scheduled

**Exit behavior:**
- Exit code 0 on success
- Logs "Nothing scheduled today" if no due posts
- Continues normally (no forced exit)

### 2. gate

Validate a post's frontmatter and content quality before publication.

```bash
node scripts/publish-scheduled-posts.mjs gate --slug=my-post-slug
# or
npm run publish:gate -- --slug=my-post-slug
```

**Validates:**
- **Frontmatter presence**: title, slug, date, coverImage, seoTitle, seoDescription
- **Frontmatter values**: draft must be false
- **AIO targeting**: aioTargetQueries must be non-empty array
- **SEO keywords**: seoKeywords array with ≥ 5 items
- **Content**: ≥ 1500 words, ≥ 5 H2 sections
- **Cover image**: PNG file exists at `public/images/blog/{slug}.png`

**Output:**
- Exit code 0 on success
- Detailed error list on validation failure (exit code 1)
- Shows title, word count, H2 count, cover image path on success

### 3. publish

Execute the full publication workflow: update Airtable, commit, and push.

```bash
node scripts/publish-scheduled-posts.mjs publish --slug=my-post-slug
# or
npm run publish:run -- --slug=my-post-slug
```

**Performs:**
1. Updates post Status → "Published" in Airtable
2. Updates linked Questions → Status "Published"
3. Appends publication timestamp to Schedule record
4. Stages exactly: `content/blog/.../slug.md` and `public/images/blog/slug.png`
5. Commits: `publish scheduled post: [Title] (YYYY-MM-DD)`
6. Pushes to `origin main`

**Output:**
- Confirms each Airtable update
- Shows file staging and git operations
- Success message on completion

## Blog Post Frontmatter Contract

All published posts must include:

```yaml
---
# Core metadata (required)
title: "Post Title Here"
slug: "post-slug-in-kebab-case"
date: "2026-06-19"
draft: false

# Publishing
author: "William Spurlock"
readingTime: 12          # calculated as words/200
categories:
  - "Category Name"
tags:
  - "tag1"
  - "tag2"

# Cover and SEO
coverImage: "/images/blog/post-slug.png"
excerpt: "Short excerpt for social sharing"
seoTitle: "SEO Title (50-60 chars)"
seoDescription: "Meta description (150-160 chars)"
seoKeywords:  # minimum 5
  - "keyword1"
  - "keyword2"
  - "keyword3"

# AIO/Answer Engine Targeting
aioTargetQueries:  # non-empty array
  - "Question formatted as H2 heading?"
  - "Another question targeting users?"

# Optional metadata
featured: false
pillarPost: false
contentCluster: "cluster-name"
serviceTrack: "ai-visibility"
entityMentions:
  - "Entity Name"
  - "Company Name"
lastModified: "2026-06-19"
---
```

## File Structure

Posts must follow this directory structure:

```
content/blog/
└── YYYY/
    └── MM/
        └── post-slug.md
```

Example: `content/blog/2026/06/my-new-post.md`

Cover images go to: `public/images/blog/post-slug.png`

## Quality Gates Explained

### Content Minimums

| Requirement | Minimum | Notes |
|---|---|---|
| Word count | 1500 words | Excludes code blocks |
| H2 sections | 5 sections | Top-level headings only |
| SEO keywords | 5 keywords | In seoKeywords array |
| Reading time | Calculated | words ÷ 200, minimum 1 min |
| AIO queries | 1+ queries | For answer engine visibility |

### Frontmatter Requirements

All of these must be present and non-empty:
- `title` - The post headline
- `slug` - URL-safe identifier (kebab-case)
- `date` - Publication date (YYYY-MM-DD)
- `coverImage` - Relative path to PNG file
- `seoTitle` - For search result display
- `seoDescription` - For search result snippet
- `aioTargetQueries` - Questions the post answers
- `seoKeywords` - Array with ≥ 5 items

### Cover Image Requirements

- **Format**: PNG (no JPEG, WebP, or GIF)
- **Path**: `public/images/blog/{slug}.png`
- **Naming**: Must match the blog post slug
- **File must exist** before publication

If the cover image is generated via the GenerateImage tool, it will be placed at this path automatically.

## Environment Variables

Required in `.env` or Cloud Agent secrets:

```env
AIRTABLE_PAT=pat_xxxxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxxxx
```

### Cloud Agent Setup

To run this automation on a schedule, add these secrets to **Cursor Dashboard > Cloud Agents > Secrets**:

1. `AIRTABLE_PAT` - Your Airtable Personal Access Token
2. `AIRTABLE_BASE_ID` - Your Airtable base ID

These will be injected into the Cloud Agent environment when the automation runs.

## Airtable Integration

The script syncs with these Airtable tables:

### Schedule Table
- **Date** field - Publication date (compared against Eastern time)
- **Post** field - Link to Posts table
- **PublicationMarkers** field - Array of publication timestamps

### Posts Table
- **Slug** field - Unique post identifier
- **Title** field - Post title
- **Status** field - "Published" when done
- **FilePath** field - Relative path to markdown file
- **CoverImage** field - URL to cover image
- **WordCount** field - Synced word count
- **ReadingTime** field - Synced reading time
- **Excerpt** field - Post excerpt
- **Questions** field - Link to Questions table

### Questions Table
- **Status** field - Flipped to "Published" when post publishes

## Error Handling

### No Airtable credentials
```
Missing AIRTABLE_PAT or AIRTABLE_BASE_ID. Add them to .env at the repo root.
```
**Fix**: Add environment variables to `.env` or Cloud Agent secrets.

### Post not found in markdown
```
No markdown found for slug "my-post" under content/blog/
```
**Fix**: Ensure the markdown file exists at `content/blog/YYYY/MM/slug.md`

### Frontmatter validation failure
```
Validation failed:
  - Missing: title
  - Error: draft must be false
  - Missing cover image: public/images/blog/slug.png
```
**Fix**: Review the output and update the post frontmatter.

### Content below minimum
```
- Content too short: 1200 words (need ≥ 1500)
- Too few H2 sections: 3 (need ≥ 5)
```
**Fix**: Expand the post content and add more top-level sections.

### Git push fails
```
Git operation failed: ...
```
**Fix**: Check git configuration, network connectivity, and branch permissions.

## Example Workflow Session

```bash
# 1. Check what's due today (runs at 08:00 Eastern daily)
$ npm run publish:find-due
Refreshing Airtable cache...
  127 records in Posts
  342 records in Questions
  ...
Searching for posts due on 2026-06-19 (Eastern)...
Found 2 due scheduled post(s):
  - The Future of AI Agents (the-future-of-ai-agents)
  - RAG vs Fine-tuning Trade-offs (rag-vs-fine-tuning)

# 2. Follow Blog Authoring v2 Skill to write the posts
# ... (design, research, write, generate cover image)

# 3. Validate first post before publishing
$ npm run publish:gate -- --slug=the-future-of-ai-agents
Validating the-future-of-ai-agents...
✓ the-future-of-ai-agents passes all gates
  - Title: The Future of AI Agents
  - Word count: 2847
  - H2 sections: 9
  - Cover image: /images/blog/the-future-of-ai-agents.png

# 4. Publish the post
$ npm run publish:run -- --slug=the-future-of-ai-agents
Publishing the-future-of-ai-agents...
✓ Updated post in Airtable: rec123abc456def
✓ Updated 5 linked questions to Published
✓ Appended publication marker to schedule: rec789ghi012jkl
✓ Staged files: content/blog/2026/06/the-future-of-ai-agents.md, public/images/blog/the-future-of-ai-agents.png
✓ Committed: publish scheduled post: The Future of AI Agents (2026-06-19)
✓ Pushed to origin main
✓ Successfully published: the-future-of-ai-agents
```

## Troubleshooting

### Script not found
```bash
# Make sure you're in the repo root
cd /path/to/repo

# And using the correct command
node scripts/publish-scheduled-posts.mjs find-due
```

### gray-matter module not found
```bash
# Install dependencies
npm install
```

### No posts scheduled
This is normal! The automation logs "Found 0 due scheduled post(s)" and exits cleanly.
Check the Airtable Schedule table to ensure posts are scheduled for today.

### Git push fails
```bash
# Check your git configuration
git config user.name
git config user.email

# Ensure you have push permissions
git remote -v
```

## Implementation Notes

- **Timezone**: All scheduling uses **Eastern Time** (America/New_York)
- **Caching**: Airtable data cached locally in `scripts/airtable-cache/`
- **Idempotency**: Published posts can be published again safely (updates Status again)
- **Atomicity**: Git operations are atomic (commit + push)
- **Logging**: All operations logged to stdout for transparency

## See Also

- Blog Authoring v2 Skill: Details on writing and researching posts
- Blog Post Frontmatter Schema: Validation and required fields
- Airtable API docs: Understanding the base structure
