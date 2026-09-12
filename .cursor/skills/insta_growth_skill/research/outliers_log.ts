/**
 * Outlier Post Log — Track validated outlier posts from research sources.
 *
 * Implements the "validated outliers" concept from Kallaway: track what
 * overperforms relative to a creator's baseline. These become the raw
 * material for deconstruction and inspired content creation.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface OutlierPost {
  id: string;
  sourceHandle: string;
  platform: 'instagram' | 'youtube' | 'tiktok' | 'twitter';
  url: string;
  /** Approximate metrics at time of logging */
  views: number;
  likes: number;
  saves: number;
  shares: number;
  followsGained?: number;
  postedAt: string; // ISO date
  loggedAt: string; // ISO date
  /** What makes this an outlier (e.g., "5x their average views") */
  notes: string;
  /** Topic/angle of the post in one sentence */
  topicSummary: string;
  /** Format: reel, carousel, story, short, tweet */
  format: string;
}

// ─── Sample Data ─────────────────────────────────────────────────────────────

export const outlierPosts: OutlierPost[] = [
  {
    id: 'outlier-001',
    sourceHandle: '@nicksaraev',
    platform: 'youtube',
    url: 'https://youtube.com/example-outlier-1',
    views: 250_000,
    likes: 8_500,
    saves: 2_100,
    shares: 890,
    followsGained: 3_200,
    postedAt: '2026-05-10',
    loggedAt: '2026-05-15',
    notes: '5x his average views. Hook: "I made $47k in one month with n8n." Screen-record heavy.',
    topicSummary: 'Revenue proof from a single n8n automation build for a client',
    format: 'youtube-short',
  },
  {
    id: 'outlier-002',
    sourceHandle: '@heyDominik',
    platform: 'youtube',
    url: 'https://youtube.com/example-outlier-2',
    views: 180_000,
    likes: 6_200,
    saves: 3_400,
    shares: 1_200,
    postedAt: '2026-05-08',
    loggedAt: '2026-05-14',
    notes: '3x average, extremely high save rate. "The Instagram game changed. Here\'s the new playbook." List format.',
    topicSummary: 'Complete 2026 Instagram algorithm breakdown with actionable tactics',
    format: 'youtube-long',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function addOutlierPost(
  posts: OutlierPost[],
  newPost: OutlierPost
): OutlierPost[] {
  return [...posts, newPost];
}

export function getTopOutliersBySaves(
  posts: OutlierPost[],
  limit: number = 10
): OutlierPost[] {
  return [...posts]
    .sort((a, b) => b.saves - a.saves)
    .slice(0, limit);
}

export function getTopOutliersByShares(
  posts: OutlierPost[],
  limit: number = 10
): OutlierPost[] {
  return [...posts]
    .sort((a, b) => b.shares - a.shares)
    .slice(0, limit);
}

export function getRecentOutliers(
  posts: OutlierPost[],
  days: number
): OutlierPost[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return posts.filter(p => new Date(p.loggedAt) >= cutoff);
}

export function getOutliersBySource(
  posts: OutlierPost[],
  handle: string
): OutlierPost[] {
  return posts.filter(p => p.sourceHandle === handle);
}
