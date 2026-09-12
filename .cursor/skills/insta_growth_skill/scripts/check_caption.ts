#!/usr/bin/env npx tsx
/**
 * Caption Linter Script
 *
 * Usage:
 *   npx tsx .cursor/skills/insta_growth_skill/scripts/check_caption.ts --file <path-to-calendar.md>
 *
 * Parses the calendar markdown, extracts caption blocks, and lints each one
 * for Instagram best practices: hook length, CTA presence, AEO entity mention.
 */

import * as fs from 'fs';

// ─── CLI Args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const fileIdx = args.indexOf('--file');
const filePath = fileIdx !== -1 && args[fileIdx + 1] ? args[fileIdx + 1] : null;

if (!filePath) {
  console.log('Usage: npx tsx check_caption.ts --file <path-to-calendar.md>');
  console.log('');
  console.log('Or pass a single caption via --caption "your caption text"');
  const captionIdx = args.indexOf('--caption');
  if (captionIdx !== -1 && args[captionIdx + 1]) {
    lintSingleCaption(args[captionIdx + 1]);
  }
  if (!filePath && captionIdx === -1) process.exit(1);
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface LintResult {
  postNumber: string;
  issues: string[];
  passed: boolean;
}

// ─── AEO Entities ────────────────────────────────────────────────────────────

const AEO_ENTITIES = [
  'n8n', 'claude', 'cursor', 'mcp', 'perplexity', 'chatgpt', 'openai',
  'anthropic', 'make.com', 'zapier', 'pydanticai', 'ai agent', 'workflow',
  'automation', 'model context protocol', 'aio', 'aeo', 'geo',
];

// ─── CTA Verbs ───────────────────────────────────────────────────────────────

const CTA_VERBS = ['comment', 'save', 'share', 'dm', 'tap', 'follow', 'click', 'reply', 'book'];

// ─── Lint Logic ──────────────────────────────────────────────────────────────

function lintCaption(caption: string, postId: string): LintResult {
  const issues: string[] = [];
  const lines = caption.split('\n').filter(l => l.trim().length > 0);

  if (lines.length === 0) {
    return { postNumber: postId, issues: ['Caption is empty or only contains TODO placeholder'], passed: false };
  }

  // Check if it's still a placeholder
  if (caption.includes('<!-- TODO') || caption.includes('TODO:')) {
    return { postNumber: postId, issues: ['Caption still contains TODO placeholder'], passed: false };
  }

  // Hook line length (first non-empty line)
  const hookLine = lines[0];
  if (hookLine.length > 70) {
    issues.push(`Hook line too long: ${hookLine.length} chars (max 70). Line: "${hookLine.slice(0, 50)}..."`);
  }
  if (hookLine.length < 10) {
    issues.push(`Hook line suspiciously short: ${hookLine.length} chars`);
  }

  // Total caption length
  if (caption.length > 2200) {
    issues.push(`Caption exceeds IG limit: ${caption.length} chars (max 2200)`);
  }

  // AEO entity check
  const lowerCaption = caption.toLowerCase();
  const hasEntity = AEO_ENTITIES.some(e => lowerCaption.includes(e.toLowerCase()));
  if (!hasEntity) {
    issues.push('Missing AEO entity mention — include a specific tool name (n8n, Claude, Cursor, MCP, etc.)');
  }

  // CTA verb check
  const hasCTA = CTA_VERBS.some(v => lowerCaption.includes(v));
  if (!hasCTA) {
    issues.push('No CTA verb detected — add a directive (Comment, Save, DM, Tap, Share)');
  }

  // Hashtag count
  const hashtags = caption.match(/#\w+/g) ?? [];
  if (hashtags.length > 5) {
    issues.push(`Too many hashtags: ${hashtags.length} (max 5)`);
  }

  return {
    postNumber: postId,
    issues,
    passed: issues.length === 0,
  };
}

// ─── Parse Calendar ──────────────────────────────────────────────────────────

function parseCalendarCaptions(content: string): { postId: string; caption: string }[] {
  const results: { postId: string; caption: string }[] = [];

  // Match Post headers and their caption sections (handles both "### Post 01" and "### **Post 01**")
  const postBlocks = content.split(/^### (?:\*\*)?Post /gm).slice(1);

  for (const block of postBlocks) {
    const postIdMatch = block.match(/^(\d+)/);
    const postId = postIdMatch ? postIdMatch[1] : 'unknown';

    // Extract caption section (between **Body (caption)** and next **)
    const captionMatch = block.match(/\*\*Body \(caption\)\*\*\s*\n([\s\S]*?)(?=\n\*\*|\n---|\n###|$)/);
    if (captionMatch) {
      results.push({ postId, caption: captionMatch[1].trim() });
    }
  }

  return results;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main(): void {
  if (!filePath) return;

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const captions = parseCalendarCaptions(content);

  console.log(`━━━ Caption Linter ━━━`);
  console.log(`File: ${filePath}`);
  console.log(`Captions found: ${captions.length}\n`);

  let passCount = 0;
  let failCount = 0;
  let todoCount = 0;

  for (const { postId, caption } of captions) {
    const result = lintCaption(caption, postId);

    if (caption.includes('TODO')) {
      todoCount++;
      continue;
    }

    if (result.passed) {
      passCount++;
    } else {
      failCount++;
      console.log(`✗ Post ${postId}:`);
      for (const issue of result.issues) {
        console.log(`  - ${issue}`);
      }
      console.log('');
    }
  }

  console.log('━━━ Summary ━━━');
  console.log(`  ✓ Passed: ${passCount}`);
  console.log(`  ✗ Failed: ${failCount}`);
  console.log(`  ◯ TODO (unfilled): ${todoCount}`);
  console.log(`  Total: ${captions.length}`);

  if (failCount > 0) {
    process.exit(1);
  }
}

function lintSingleCaption(caption: string): void {
  console.log('━━━ Single Caption Lint ━━━\n');
  const result = lintCaption(caption, 'input');

  if (result.passed) {
    console.log('✓ Caption passes all checks');
  } else {
    console.log('✗ Issues found:');
    for (const issue of result.issues) {
      console.log(`  - ${issue}`);
    }
  }
  process.exit(result.passed ? 0 : 1);
}

main();
