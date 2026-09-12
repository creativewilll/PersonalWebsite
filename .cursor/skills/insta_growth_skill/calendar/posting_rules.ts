/**
 * Posting Rules — Cadence constraints for sustainable growth.
 *
 * Kallaway warning: don't "chop and change" strategy constantly.
 * Stay consistent at a sustainable pace, not maximum theoretical output.
 * Commit to 30 days minimum before evaluating and adjusting.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PostingConstraints {
  timezone: string;
  preferredPostTimes: string[];
  postsPerWeek: { min: number; max: number };
  maxPostsPerDay: number;
  /** Days when no posting happens (empty = post every day) */
  noPostDays: number[];
  /** Minimum DM-automation posts per week (heyDominik) */
  dmAutomationPostsPerWeek: { min: number; max: number };
  /** Percentage of content that should be winner reposts (weeks 3+) */
  repostPercentage: { min: number; max: number };
  /** Maximum trial reel groups running concurrently */
  maxConcurrentTrialGroups: number;
  /** How many variations per trial group */
  variationsPerTrial: number;
}

export interface WeeklyScheduleTemplate {
  dayOfWeek: number; // 0=Sunday, 6=Saturday
  slots: { time: string; format: 'reel' | 'carousel'; priority: 'primary' | 'secondary' }[];
}

// ─── Will's Defaults (0-follower start, 8 posts/week) ───────────────────────

export const postingConstraints: PostingConstraints = {
  timezone: 'America/New_York',
  preferredPostTimes: ['07:00', '12:30', '19:30'],
  postsPerWeek: { min: 7, max: 10 },
  maxPostsPerDay: 2,
  noPostDays: [], // Post every day for maximum data collection in month 1
  dmAutomationPostsPerWeek: { min: 1, max: 2 },
  repostPercentage: { min: 20, max: 30 },
  maxConcurrentTrialGroups: 2,
  variationsPerTrial: 3,
};

// ─── Weekly Template (default 8/week distribution) ───────────────────────────

export const weeklyScheduleTemplate: WeeklyScheduleTemplate[] = [
  { dayOfWeek: 0, slots: [{ time: '10:00', format: 'reel', priority: 'primary' }] }, // Sunday
  { dayOfWeek: 1, slots: [{ time: '07:00', format: 'reel', priority: 'primary' }] }, // Monday
  { dayOfWeek: 2, slots: [
    { time: '07:00', format: 'reel', priority: 'primary' },
    { time: '19:30', format: 'carousel', priority: 'secondary' },
  ]}, // Tuesday (double-post day)
  { dayOfWeek: 3, slots: [{ time: '12:30', format: 'reel', priority: 'primary' }] }, // Wednesday
  { dayOfWeek: 4, slots: [{ time: '07:00', format: 'reel', priority: 'primary' }] }, // Thursday
  { dayOfWeek: 5, slots: [
    { time: '07:00', format: 'reel', priority: 'primary' },
    { time: '19:30', format: 'carousel', priority: 'secondary' },
  ]}, // Friday (double-post day)
  { dayOfWeek: 6, slots: [{ time: '12:30', format: 'reel', priority: 'primary' }] }, // Saturday
];

// ─── Rules (encoded as constants for scheduler logic) ────────────────────────

export const schedulingRules = {
  /** No two same-pillar posts back-to-back */
  pillarRotation: true,
  /** DM-automation post never falls on a trial-reel test day */
  dmPostNotOnTrialDay: true,
  /** Trial reel variations posted within 24h of each other */
  trialVariationWindowHours: 24,
  /** Wait 48h after trial group before evaluating winner */
  trialEvaluationWaitHours: 48,
  /** Repost slots only appear in weeks 3+ (need data first) */
  repostStartWeek: 3,
  /** Minimum days between posting same pillar content */
  minDaysBetweenSamePillar: 1,
} as const;
