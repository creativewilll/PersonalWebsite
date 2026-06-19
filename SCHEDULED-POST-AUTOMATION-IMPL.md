# Scheduled Post Publication Automation - Implementation Summary

## Automation Trigger Configuration

This automation is designed to run daily at **08:00 Eastern Time** via a GitHub Actions cron trigger, implemented through Cursor Cloud Agent.

### Cron Expression
```
0 12 * * *
```
(12:00 UTC = 08:00 EDT/07:00 EST, depending on daylight saving)

## Deliverables Completed

### 1. Main Script: `scripts/publish-scheduled-posts.mjs`

A Node.js CLI tool with three commands:

#### find-due
- **Purpose**: Wake up daily and check for scheduled posts
- **Operation**: Refresh Airtable cache, search Schedule table for today's date (Eastern time)
- **Output**: List of posts due today with slugs and titles
- **Exit**: Code 0, logs "Found N due scheduled post(s)" or "Found 0 due scheduled post(s)"

#### gate --slug=<slug>
- **Purpose**: Validate post before publication
- **Checks**: 
  - Frontmatter completeness (title, slug, date, coverImage, seoTitle, seoDescription, draft=false)
  - Content minimums (1500+ words, 5+ H2 sections)
  - SEO requirements (5+ seoKeywords, non-empty aioTargetQueries)
  - Asset existence (PNG cover image)
- **Exit**: Code 0 on pass, Code 1 on failure with detailed error list

#### publish --slug=<slug>
- **Purpose**: Execute full publication workflow
- **Steps**:
  1. Update post Status → "Published" in Airtable
  2. Update linked Questions → Status "Published"
  3. Append timestamp to Schedule.PublicationMarkers
  4. Stage only .md and .png files in git
  5. Commit: "publish scheduled post: [Title] (YYYY-MM-DD)"
  6. Push to origin main
- **Exit**: Code 0 on success, Code 1 on failure

### 2. Package Scripts: `package.json`

Added three convenience commands:

```json
{
  "scripts": {
    "publish:find-due": "node scripts/publish-scheduled-posts.mjs find-due",
    "publish:gate": "node scripts/publish-scheduled-posts.mjs gate",
    "publish:run": "node scripts/publish-scheduled-posts.mjs publish"
  }
}
```

Usage:
```bash
npm run publish:find-due
npm run publish:gate -- --slug=my-post-slug
npm run publish:run -- --slug=my-post-slug
```

### 3. Documentation: `SCHEDULED-POST-AUTOMATION.md`

Comprehensive guide including:
- Command reference and usage examples
- Blog post frontmatter contract (all required fields)
- Quality gates and validation rules
- File structure requirements
- Airtable table structure and fields
- Example workflow session
- Troubleshooting and error handling
- Cloud Agent setup instructions

## Daily Workflow (Automated)

```
08:00 AM Eastern Time (Daily)
  ↓
find-due command runs
  ↓
Refreshes Airtable cache (Schedule, Posts, Questions tables)
  ↓
Searches for posts scheduled for today
  ↓
If 0 posts: Log "Nothing scheduled today" → Exit
  ↓
If N posts: List slugs and titles
  ↓
[Manual: Follow Blog Authoring v2 Skill]
  ↓
For each post:
  1. Design & Research (resolve spec, gather sources)
  2. Write Post (markdown with proper frontmatter)
  3. Generate Cover Image (PNG to public/images/blog/{slug}.png)
  4. Run gate command (validate quality)
  5. Run publish command (sync, commit, push)
```

## Frontmatter Contract

Every published post must include:

```yaml
---
# Core metadata
title: "Post Title"
slug: "slug-in-kebab-case"
date: "2026-06-19"
draft: false
author: "William Spurlock"
readingTime: 12

# Cover & SEO
coverImage: "/images/blog/slug.png"
excerpt: "Short excerpt"
seoTitle: "SEO Title"
seoDescription: "Meta description"
seoKeywords:
  - "keyword1"
  - "keyword2"
  - "keyword3"
  - "keyword4"
  - "keyword5"  # minimum 5

# AIO/Answer Engine
aioTargetQueries:
  - "Question formatted as H2?"
  - "Another question?"

# Optional
categories:
  - "AI Visibility"
tags:
  - "tag1"
featured: false
pillarPost: false
contentCluster: "cluster-name"
serviceTrack: "ai-visibility"
entityMentions:
  - "Entity Name"
lastModified: "2026-06-19"
---
```

## Quality Gates Enforced

| Gate | Requirement | Description |
|------|---|---|
| Title | Required | Must exist and be non-empty |
| Slug | Required | URL-safe identifier, kebab-case |
| Date | Required | Publication date (YYYY-MM-DD) |
| Draft | false | Must be explicitly false |
| Cover Image | Required | PNG file must exist at exact path |
| SEO Title | Required | Search result display text |
| SEO Description | Required | Search result snippet text |
| SEO Keywords | ≥ 5 items | Keyword targeting array |
| AIO Queries | ≥ 1 query | Answer engine targeting array |
| Word Count | ≥ 1500 words | Minimum content length |
| H2 Sections | ≥ 5 sections | Minimum content structure |
| Cover Image | PNG exists | File at `public/images/blog/{slug}.png` |

## Environment Variables

Required to run automation:

```env
AIRTABLE_PAT=pat_xxxxxxxxxxxxx          # Airtable Personal Access Token
AIRTABLE_BASE_ID=appxxxxxxxxxxxx        # Airtable Base ID
```

### Cloud Agent Setup

Add to **Cursor Dashboard > Cloud Agents > Secrets**:

1. **AIRTABLE_PAT** - Personal Access Token from Airtable account settings
2. **AIRTABLE_BASE_ID** - Base ID from Airtable base URL (appXXXXXXXX)

These will be automatically injected into the Cloud Agent environment when automation runs.

## Airtable Integration

### Tables Used

**Schedule Table**
- Date field → Compared against today (Eastern time)
- Post field → Link to Posts table
- PublicationMarkers field → Array of publication timestamps

**Posts Table**
- Slug field → Unique post identifier
- Title field → Post title for display
- Status field → Flipped to "Published" on success
- FilePath field → Relative path to markdown file
- CoverImage field → URL to cover image
- WordCount field → Synced word count
- ReadingTime field → Synced reading time (words ÷ 200)
- Excerpt field → Post excerpt
- Questions field → Link to Questions table

**Questions Table**
- Status field → Flipped to "Published" when linked post publishes

## Git Workflow

### Commits Made

1. **64fde0f** - feat: create publish-scheduled-posts automation script
   - Main script with all three commands
   
2. **08e6b74** - add npm scripts for scheduled post publication workflow
   - Convenience npm scripts added to package.json
   
3. **ce612f8** - docs: add comprehensive scheduled post automation guide
   - Complete SCHEDULED-POST-AUTOMATION.md documentation
   
4. **06630d3** - improve: show usage help before checking credentials
   - Better error handling and user experience

### Push to Feature Branch

All commits pushed to: `cursor/scheduled-post-publication-a07e`

Branches up-to-date:
- Feature branch: 4 commits ahead of main
- PR ready: https://github.com/creativewilll/PersonalWebsite/pull/1

## Testing & Validation

### Syntax Validation
✅ Script passes Node.js syntax check: `node -c scripts/publish-scheduled-posts.mjs`

### Help Message
✅ Shows usage when called with no arguments
✅ Shows usage when called with invalid command

### Dependency Check
✅ gray-matter installed (npm install completed)
✅ All required dependencies available

### Code Structure
✅ Follows existing patterns from `blog-sync.mjs`
✅ Proper error handling and user feedback
✅ Clear command structure and separation of concerns

## Known Limitations & Blockers

### Critical Blocker
- **Airtable credentials not configured** - Script will fail to run without AIRTABLE_PAT and AIRTABLE_BASE_ID in Cloud Agent secrets

### Design Choices
- Uses **Eastern Time** for scheduling (aligns with user timezone)
- Caches Airtable tables locally (improves performance)
- Only stages .md and .png files (no other changes included)
- Requires explicit `draft: false` (safety measure)

## Next Steps for Deployment

1. ✅ Code complete and committed
2. ✅ Documentation complete
3. ✅ PR created (awaiting review/merge)
4. ⏳ **Add Airtable secrets to Cloud Agent**
5. ⏳ **Enable cron trigger for daily execution**
6. ⏳ Monitor first run and adjust as needed

## File Manifest

```
scripts/
  └── publish-scheduled-posts.mjs    (331 lines) ← Main automation script
package.json                         (Updated)  ← Added npm scripts
SCHEDULED-POST-AUTOMATION.md         (341 lines) ← User documentation
SCHEDULED-POST-AUTOMATION-IMPL.md    (This file) ← Implementation summary
```

## References

- Blog Authoring v2 Skill: For writing and researching post content
- Existing `blog-sync.mjs`: Pattern source for Airtable integration
- Existing blog posts: Frontmatter and structure examples
- GitHub PR #1: Review implementation details
