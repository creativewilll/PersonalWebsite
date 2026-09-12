#!/usr/bin/env npx tsx
/**
 * Generate Calendar Script
 *
 * Usage:
 *   npx tsx .cursor/skills/insta_growth_skill/scripts/generate_calendar.ts --start 2026-05-19 --weeks 4 --postsPerWeek 8
 *
 * Output: content/instagram-calendars/{date}-{weeks}wk.md
 */

import { generate30DaySchedule, type PlannedPost } from '../calendar/scheduler';
import { contentPillars, contentGames } from '../config/strategy.config';
import * as fs from 'fs';
import * as path from 'path';

// ─── CLI Args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const getArg = (name: string, defaultVal: string): string => {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultVal;
};

const startDateStr = getArg('start', new Date().toISOString().split('T')[0]);
const weeks = parseInt(getArg('weeks', '4'), 10);
const postsPerWeek = parseInt(getArg('postsPerWeek', '8'), 10);

const startDate = new Date(startDateStr + 'T00:00:00');
const endDate = new Date(startDate);
endDate.setDate(endDate.getDate() + weeks * 7 - 1);

// ─── Generate ────────────────────────────────────────────────────────────────

const posts = generate30DaySchedule(startDate);

// ─── Build Markdown ──────────────────────────────────────────────────────────

function getPillarLabel(id: string): string {
  return contentPillars.find(p => p.id === id)?.label ?? id;
}

function getGameLabel(id: string): string {
  return contentGames.find(g => g.id === id)?.label ?? id;
}

function formatPost(post: PlannedPost): string {
  const lines: string[] = [];
  const typeLabel = post.type.replace(/_/g, ' ').toUpperCase();
  const trialInfo = post.trialGroupId ? ` · ${post.trialGroupId} · variation ${post.trialVariationNumber}` : '';

  lines.push(`### Post ${String(post.postNumber).padStart(2, '0')} — ${post.dayOfWeek} ${post.date} · ${post.time} ET · ${post.format.toUpperCase()} · ${typeLabel}${trialInfo}`);
  lines.push('');
  lines.push(`**Pillar**: ${getPillarLabel(post.contentPillarId)}  `);
  lines.push(`**Game**: ${getGameLabel(post.contentGameId)}  `);
  lines.push(`**Type**: ${post.type}  `);
  lines.push(`**AEO Entity**: ${post.aeoEntity ?? 'TBD'}  `);
  if (post.dmKeyword) {
    lines.push(`**DM Keyword**: ${post.dmKeyword}  `);
  }
  lines.push(`**Status**: ${post.status}`);
  lines.push('');
  lines.push('**Angle (idea + why)**  ');
  lines.push('<!-- TODO: 1–2 sentences describing the post claim, audience, and differentiation -->');
  lines.push('');
  lines.push('**On-screen text hook (3–5 words)**  ');
  lines.push('<!-- TODO: First-frame text overlay -->');
  lines.push('');

  if (post.format === 'reel') {
    lines.push('**Spoken hook (1.5s)**  ');
    lines.push('<!-- TODO: First words spoken -->');
    lines.push('');
    lines.push('**Script**  ');
    lines.push('<!-- TODO: Timestamped beat-by-beat script -->');
    lines.push('');
    lines.push('**Start frame prompt**  ');
    lines.push('<!-- TODO: Image generation prompt for first frame -->');
    lines.push('');
    lines.push('**End frame prompt**  ');
    lines.push('<!-- TODO: Image generation prompt for final frame -->');
    lines.push('');
  } else {
    lines.push('**Slide plan (7–10 slides)**  ');
    lines.push('<!-- TODO: Cover slide + interior slides + CTA slide -->');
    lines.push('');
  }

  lines.push('**Body (caption)**  ');
  lines.push('<!-- TODO: Full caption with hook line, body bullets, CTA, AEO entity -->');
  lines.push('');
  lines.push('**Media plan**  ');
  lines.push('<!-- TODO: Specific media assets needed (video clips, images, screen recordings) -->');
  lines.push('');
  lines.push('---');
  lines.push('');

  return lines.join('\n');
}

// ─── Assemble Document ───────────────────────────────────────────────────────

const header = `# 30-Day Instagram Content Calendar

> **Account**: @willspurly  
> **Start**: ${startDateStr}  
> **End**: ${endDate.toISOString().split('T')[0]}  
> **Cadence**: ~${postsPerWeek} posts/week (Reels + Carousels)  
> **Strategy**: Kallaway trial reels + heyDominik DM automation + Hormozi conviction  
> **Status**: 0-follower launch

## How to Use This Calendar

1. **Weeks 1–2**: All new content. Trial reel groups post 2–3 variations within 24h.
2. **After 48h**: Check trial reel performance. Push winner to main feed.
3. **Weeks 3–4**: Begin recycling winners (20–30% of content). Repost unchanged first, then repackage.
4. **DM automation posts**: Each has a keyword CTA. Set up ManyChat trigger BEFORE posting.
5. **Pillar rotation**: Never two same-pillar posts back-to-back.
6. **Sunday review**: Pull metrics, identify top 2 and bottom 2, adjust next week.

## Calendar Summary

| Week | Posts | Reels | Carousels | DM Posts | Trial Groups | Reposts |
|------|-------|-------|-----------|----------|--------------|---------|
`;

const weekSummaries: string[] = [];
for (let w = 1; w <= weeks + 1; w++) {
  const weekPosts = posts.filter(p => p.weekNumber === w);
  if (weekPosts.length === 0) continue;
  const reels = weekPosts.filter(p => p.format === 'reel').length;
  const carousels = weekPosts.filter(p => p.format === 'carousel').length;
  const dm = weekPosts.filter(p => p.type === 'dm_automation').length;
  const trials = weekPosts.filter(p => p.type === 'trial_reel_variation').length;
  const reposts = weekPosts.filter(p => p.type === 'winner_repost').length;
  weekSummaries.push(`| ${w} | ${weekPosts.length} | ${reels} | ${carousels} | ${dm} | ${trials} | ${reposts} |`);
}

const body = posts.map(formatPost).join('\n');

const fullDocument = header + weekSummaries.join('\n') + '\n\n---\n\n' + body;

// ─── Write to File ───────────────────────────────────────────────────────────

const outputDir = path.resolve(process.cwd(), 'content/instagram-calendars');
fs.mkdirSync(outputDir, { recursive: true });

const outputFile = path.join(outputDir, `${startDateStr}-${weeks}wk.md`);
fs.writeFileSync(outputFile, fullDocument, 'utf-8');

console.log(`✓ Calendar generated: ${outputFile}`);
console.log(`  Posts: ${posts.length}`);
console.log(`  Reels: ${posts.filter(p => p.format === 'reel').length}`);
console.log(`  Carousels: ${posts.filter(p => p.format === 'carousel').length}`);
console.log(`  DM-automation: ${posts.filter(p => p.type === 'dm_automation').length}`);
console.log(`  Trial variations: ${posts.filter(p => p.type === 'trial_reel_variation').length}`);
console.log(`  Winner reposts: ${posts.filter(p => p.type === 'winner_repost').length}`);
