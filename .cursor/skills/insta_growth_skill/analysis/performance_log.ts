/**
 * Performance Log — Track metrics and identify winners.
 *
 * Mirrors the "look at analytics, sort by views/engagement/follows, and
 * recreate/repost the best ones" workflow (Kallaway + heyDominik).
 *
 * Typed interfaces allow plugging in real metrics from Sheets, Notion, or API later.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PerformanceEntry {
  postId: string;
  platform: 'instagram';
  datePosted: string; // ISO date
  format: 'reel' | 'carousel';
  isTrialReel: boolean;
  trialGroupId?: string;
  variationId?: string;
  /** Raw metrics */
  views: number;
  likes: number;
  saves: number;
  shares: number;
  comments: number;
  followsGained: number;
  /** Retention percentage (what % watched to end) */
  retentionPercent?: number;
  /** Reach (unique accounts) */
  reach?: number;
  /** Profile visits driven by this post */
  profileVisits?: number;
  /** Link clicks (if applicable) */
  linkClicks?: number;
}

export interface TopPerformer {
  entry: PerformanceEntry;
  viralityScore: number;
  isRepostCandidate: boolean;
}

// ─── Storage ─────────────────────────────────────────────────────────────────

let performanceLog: PerformanceEntry[] = [];

// ─── Core Functions ──────────────────────────────────────────────────────────

export function logPerformance(entries: PerformanceEntry[]): void {
  performanceLog = [...performanceLog, ...entries];
}

export function getAllPerformance(): PerformanceEntry[] {
  return performanceLog;
}

export function getPerformanceForPost(postId: string): PerformanceEntry | undefined {
  return performanceLog.find(e => e.postId === postId);
}

// ─── Analytics ───────────────────────────────────────────────────────────────

/**
 * Get top performers from the last N days, sorted by virality score.
 * Score weights: saves (40%) + shares (30%) + follows (20%) + retention (10%)
 */
export function getTopPerformersSince(days: number, limit: number = 10): TopPerformer[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const recent = performanceLog.filter(e => new Date(e.datePosted) >= cutoff);
  const medianViews = getMedianViews(recent);

  return recent
    .map(entry => {
      const viralityScore =
        entry.saves * 4 +
        entry.shares * 3 +
        entry.followsGained * 2 +
        (entry.retentionPercent ?? 0) * 1;

      const isRepostCandidate =
        entry.views >= medianViews * 5 &&
        daysSince(entry.datePosted) >= 7;

      return { entry, viralityScore, isRepostCandidate };
    })
    .sort((a, b) => b.viralityScore - a.viralityScore)
    .slice(0, limit);
}

/**
 * Get the winning variation from a trial reel group.
 * Returns the variation with the highest combined saves + shares + retention.
 */
export function getTrialReelWinnerGroup(trialGroupId: string): PerformanceEntry | null {
  const groupEntries = performanceLog.filter(e => e.trialGroupId === trialGroupId);

  if (groupEntries.length === 0) return null;

  return groupEntries.reduce((best, current) => {
    const bestScore = best.saves * 0.4 + best.shares * 0.3 + (best.retentionPercent ?? 0) * 0.2 + best.followsGained * 0.1;
    const currentScore = current.saves * 0.4 + current.shares * 0.3 + (current.retentionPercent ?? 0) * 0.2 + current.followsGained * 0.1;
    return currentScore > bestScore ? current : best;
  });
}

/**
 * Get performance summary for the week — useful for Sunday review.
 */
export function getWeeklySummary(weekStartDate: string): {
  totalPosts: number;
  totalViews: number;
  totalFollows: number;
  avgSaveRate: number;
  avgShareRate: number;
  bestPost: PerformanceEntry | null;
  worstPost: PerformanceEntry | null;
} {
  const start = new Date(weekStartDate);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  const weekPosts = performanceLog.filter(e => {
    const d = new Date(e.datePosted);
    return d >= start && d < end;
  });

  if (weekPosts.length === 0) {
    return { totalPosts: 0, totalViews: 0, totalFollows: 0, avgSaveRate: 0, avgShareRate: 0, bestPost: null, worstPost: null };
  }

  const totalViews = weekPosts.reduce((sum, e) => sum + e.views, 0);
  const totalFollows = weekPosts.reduce((sum, e) => sum + e.followsGained, 0);
  const avgSaveRate = weekPosts.reduce((sum, e) => sum + (e.saves / Math.max(e.views, 1)), 0) / weekPosts.length;
  const avgShareRate = weekPosts.reduce((sum, e) => sum + (e.shares / Math.max(e.views, 1)), 0) / weekPosts.length;

  const sorted = [...weekPosts].sort((a, b) => b.views - a.views);

  return {
    totalPosts: weekPosts.length,
    totalViews,
    totalFollows,
    avgSaveRate,
    avgShareRate,
    bestPost: sorted[0],
    worstPost: sorted[sorted.length - 1],
  };
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function getMedianViews(entries: PerformanceEntry[]): number {
  if (entries.length === 0) return 0;
  const sorted = [...entries].map(e => e.views).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function daysSince(dateStr: string): number {
  const then = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}
