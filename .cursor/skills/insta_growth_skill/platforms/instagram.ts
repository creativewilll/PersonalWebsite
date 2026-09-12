/**
 * Instagram Platform Guidelines
 *
 * Centralizes IG-specific rules: optimal lengths, trial reel best practices,
 * DM automation scheduling, and repost candidacy evaluation.
 *
 * Key principles:
 * - Start with a clean first frame and strong visual hook (Kallaway/heyDominik)
 * - Use trial reels and repost winners frequently (heyDominik)
 * - Test DM automation posts weekly (heyDominik)
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface InstagramGuidelines {
  reel: {
    optimalLengthSeconds: { min: number; max: number };
    maxLengthSeconds: number;
    firstFrameRules: string[];
    captionMaxChars: number;
    hashtagMax: number;
  };
  carousel: {
    optimalSlides: { min: number; max: number };
    maxSlides: number;
    coverSlideRules: string[];
    aspectRatio: string;
  };
  story: {
    maxSegments: number;
    ctaPlacement: string;
  };
  posting: {
    optimalTimesET: string[];
    trialReelSpacing: string;
    dmAutomationFrequency: string;
  };
}

// ─── Guidelines Export ───────────────────────────────────────────────────────

export const instagramGuidelines: InstagramGuidelines = {
  reel: {
    optimalLengthSeconds: { min: 15, max: 45 },
    maxLengthSeconds: 90,
    firstFrameRules: [
      'Clean single subject, no clutter',
      'High contrast between subject and background',
      '3–5 words of on-screen text (readable at phone size in 0.5s)',
      'No logos, watermarks, or branding',
      'Face visible OR compelling visual (tool UI, result screenshot)',
    ],
    captionMaxChars: 2200,
    hashtagMax: 5,
  },
  carousel: {
    optimalSlides: { min: 7, max: 10 },
    maxSlides: 20,
    coverSlideRules: [
      'Bold statement in large text',
      'Clean design, dark bg with brand colors (purple/yellow)',
      'No more than 7 words on cover',
      'Must work as a standalone scroll-stopper',
    ],
    aspectRatio: '4:5',
  },
  story: {
    maxSegments: 5,
    ctaPlacement: 'Final segment with swipe-up or DM prompt',
  },
  posting: {
    optimalTimesET: ['7:00 AM', '12:30 PM', '7:30 PM'],
    trialReelSpacing: 'Post variations within 24h of each other for fair comparison',
    dmAutomationFrequency: '1–2 dedicated DM-automation posts per week minimum',
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Suggest optimal Reel length based on content game.
 * Shorter = higher watch-through rate but less teaching depth.
 */
export function suggestReelLengthForGame(contentGameId: string): { min: number; max: number } {
  const lengthMap: Record<string, { min: number; max: number }> = {
    'tactical-receipt': { min: 30, max: 45 },
    'contrarian-take': { min: 15, max: 30 },
    'screen-demo': { min: 40, max: 60 },
    'story-teach': { min: 30, max: 45 },
    'listicle-carousel': { min: 0, max: 0 }, // not a reel
  };

  return lengthMap[contentGameId] ?? { min: 20, max: 40 };
}

/**
 * Evaluate whether a post is a good candidate for reposting.
 * Based on Kallaway's winner-reposting framework:
 * - Views ≥ 5x your median
 * - At least 7 days old (give it time to plateau)
 * - Not already reposted
 */
export function isGoodCandidateForRepost(performance: {
  views: number;
  saves: number;
  shares: number;
  ageDays: number;
  medianViews: number;
  alreadyReposted?: boolean;
}): boolean {
  if (performance.alreadyReposted) return false;
  if (performance.ageDays < 7) return false;
  if (performance.views < performance.medianViews * 5) return false;

  // Bonus check: engagement quality (not just views from algorithm push)
  const saveRate = performance.saves / Math.max(performance.views, 1);
  const shareRate = performance.shares / Math.max(performance.views, 1);

  return saveRate >= 0.02 || shareRate >= 0.01;
}

/**
 * Calculate the "virality score" for ranking candidates.
 */
export function calculateViralityScore(performance: {
  views: number;
  saves: number;
  shares: number;
  followsGained: number;
}): number {
  return (
    performance.saves * 4 +
    performance.shares * 3 +
    performance.followsGained * 2 +
    performance.views * 0.001
  );
}
