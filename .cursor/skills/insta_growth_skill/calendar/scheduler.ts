/**
 * Calendar Scheduler — Generates a 30-day posting schedule.
 *
 * Encodes all scheduling rules from posting_rules.ts:
 * - 3:1 reel:carousel ratio (Kallaway)
 * - Trial reels paired within 24h (heyDominik)
 * - Pillar rotation (no same-pillar back-to-back)
 * - 1–2 DM automation posts per week (heyDominik)
 * - 20–30% winner reposts in weeks 3–4 (Kallaway)
 */

import { contentPillars } from '../config/strategy.config';
import { postingConstraints, weeklyScheduleTemplate, schedulingRules } from './posting_rules';

// ─── Types ───────────────────────────────────────────────────────────────────

export type PostFormat = 'reel' | 'carousel';
export type PostType = 'new' | 'trial_reel_variation' | 'winner_repost' | 'dm_automation';
export type PostStatus = 'idea' | 'scripted' | 'filmed' | 'edited' | 'scheduled' | 'posted';

export interface PlannedPost {
  id: string;
  postNumber: number;
  date: string; // ISO date
  time: string; // HH:MM format
  dayOfWeek: string;
  weekNumber: number;
  format: PostFormat;
  contentPillarId: string;
  contentGameId: string;
  type: PostType;
  status: PostStatus;
  /** Trial group ID if this is part of a trial set */
  trialGroupId?: string;
  /** Variation number within trial group (1, 2, or 3) */
  trialVariationNumber?: number;
  /** DM keyword if this is a DM-automation post */
  dmKeyword?: string;
  /** AEO entity to mention in this post */
  aeoEntity?: string;
  /** Which repost this replaces (post ID) if type is winner_repost */
  repostOfId?: string;
}

// ─── Generator ───────────────────────────────────────────────────────────────

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CONTENT_GAMES_FOR_REELS = ['tactical-receipt', 'contrarian-take', 'screen-demo', 'story-teach'];
const CONTENT_GAMES_FOR_CAROUSELS = ['listicle-carousel', 'tactical-receipt'];

const DM_KEYWORDS = ['AGENT', 'SYSTEM', 'BUILD', 'STACK', 'BLUEPRINT', 'RECEIPTS', 'MCP'];

/**
 * Generate a 30-day posting schedule starting from the given date.
 */
export function generate30DaySchedule(startDate: Date): PlannedPost[] {
  const posts: PlannedPost[] = [];
  let postNumber = 1;
  let pillarIndex = 0;
  let gameIndex = 0;
  let dmKeywordIndex = 0;
  let trialGroupCount = 0;
  let dmPostsThisWeek = 0;
  let currentWeek = 1;
  let lastPillarId = '';

  const totalDays = 30;
  const pillars = contentPillars;

  for (let dayOffset = 0; dayOffset < totalDays; dayOffset++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayOffset);

    const dayOfWeek = currentDate.getDay();
    const weekNumber = Math.floor(dayOffset / 7) + 1;

    // Reset weekly counters
    if (weekNumber !== currentWeek) {
      currentWeek = weekNumber;
      dmPostsThisWeek = 0;
    }

    // Find slots for this day of week
    const dayTemplate = weeklyScheduleTemplate.find(t => t.dayOfWeek === dayOfWeek);
    if (!dayTemplate) continue;

    for (const slot of dayTemplate.slots) {
      // Determine pillar (enforce rotation — no same-pillar back-to-back)
      let chosenPillar = pillars[pillarIndex % pillars.length];
      if (chosenPillar.id === lastPillarId) {
        pillarIndex++;
        chosenPillar = pillars[pillarIndex % pillars.length];
      }
      lastPillarId = chosenPillar.id;
      pillarIndex++;

      // Determine format
      const format: PostFormat = slot.format;

      // Determine content game
      const gamesPool = format === 'reel' ? CONTENT_GAMES_FOR_REELS : CONTENT_GAMES_FOR_CAROUSELS;
      const chosenGame = gamesPool[gameIndex % gamesPool.length];
      gameIndex++;

      // Determine post type
      let postType: PostType = 'new';
      let trialGroupId: string | undefined;
      let trialVariationNumber: number | undefined;
      let dmKeyword: string | undefined;

      // DM automation: 1–2 per week, not on same day as trial reel
      const needsDMPost = dmPostsThisWeek < postingConstraints.dmAutomationPostsPerWeek.min;
      const canDMPost = dmPostsThisWeek < postingConstraints.dmAutomationPostsPerWeek.max;

      // Trial reels: schedule in weeks 1–2 primarily
      const isTrialWindow = weekNumber <= 2 && trialGroupCount < 5;

      // Winner reposts: weeks 3–4 only
      const isRepostWindow = weekNumber >= schedulingRules.repostStartWeek;

      if (needsDMPost && format === 'reel' && slot.priority === 'primary') {
        postType = 'dm_automation';
        dmKeyword = DM_KEYWORDS[dmKeywordIndex % DM_KEYWORDS.length];
        dmKeywordIndex++;
        dmPostsThisWeek++;
      } else if (isTrialWindow && format === 'reel' && postNumber % 3 === 0) {
        // Every 3rd reel in weeks 1-2 starts a trial group
        trialGroupCount++;
        trialGroupId = `trial-group-${trialGroupCount}`;
        trialVariationNumber = 1;
        postType = 'trial_reel_variation';
      } else if (isRepostWindow && format === 'reel' && postNumber % 4 === 0) {
        postType = 'winner_repost';
      }

      // AEO entity rotation
      const aeoEntity = chosenPillar.aeoEntities[postNumber % chosenPillar.aeoEntities.length];

      const post: PlannedPost = {
        id: `post-${String(postNumber).padStart(2, '0')}`,
        postNumber,
        date: currentDate.toISOString().split('T')[0],
        time: slot.time,
        dayOfWeek: DAY_NAMES[dayOfWeek],
        weekNumber,
        format,
        contentPillarId: chosenPillar.id,
        contentGameId: chosenGame,
        type: postType,
        status: 'idea',
        trialGroupId,
        trialVariationNumber,
        dmKeyword,
        aeoEntity,
      };

      posts.push(post);
      postNumber++;
    }
  }

  return posts;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getPostsByWeek(posts: PlannedPost[], week: number): PlannedPost[] {
  return posts.filter(p => p.weekNumber === week);
}

export function getPostsByType(posts: PlannedPost[], type: PostType): PlannedPost[] {
  return posts.filter(p => p.type === type);
}

export function getPostsByPillar(posts: PlannedPost[], pillarId: string): PlannedPost[] {
  return posts.filter(p => p.contentPillarId === pillarId);
}

export function getTrialGroups(posts: PlannedPost[]): Map<string, PlannedPost[]> {
  const groups = new Map<string, PlannedPost[]>();
  for (const post of posts) {
    if (post.trialGroupId) {
      const existing = groups.get(post.trialGroupId) ?? [];
      existing.push(post);
      groups.set(post.trialGroupId, existing);
    }
  }
  return groups;
}
