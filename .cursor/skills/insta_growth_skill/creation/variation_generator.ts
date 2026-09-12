/**
 * Trial Reel Variation Generator
 *
 * Implements Kallaway's "make multiple variations and run trial reels" approach.
 * Create 3–5 variations of the same core idea, each changing ONE variable.
 * Post within 24h of each other, wait 48h, then push the winner.
 *
 * heyDominik extension: toggle spoken hook vs text-only, switch CTA from
 * "save" to "comment keyword" or DM automation.
 */

import type { CTAType } from '../research/deconstruction';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BaseIdea {
  id: string;
  contentPillarId: string;
  contentGameId: string;
  /** The core promise of this piece of content */
  corePromise: string;
  /** What proof/receipt backs up the promise */
  proofElement: string;
  /** Default CTA approach */
  ctaType: CTAType;
  /** DM keyword if using dm-keyword CTA */
  dmKeyword?: string;
  /** Target avatar ID from viewer_avatar.config.ts */
  targetAvatarId: string;
  /** AEO entity to mention (one specific tool name) */
  aeoEntity: string;
}

export interface Variation {
  id: string;
  baseIdeaId: string;
  variationNumber: number;
  /** What's different about this variation vs the base */
  hookVariantDescription: string;
  /** Specific changes made */
  changes: {
    hookType: 'spoken' | 'text-only' | 'visual-only';
    firstFrameChange?: string;
    ctaChange?: string;
    lengthChange?: string;
    audioChange?: string;
  };
  /** Priority for posting order (1 = post first) */
  postingPriority: number;
}

// ─── Generator ───────────────────────────────────────────────────────────────

/**
 * Generate 3–5 trial reel variations from a single BaseIdea.
 * Each variation changes exactly ONE primary variable (hook delivery,
 * first frame, CTA type, or audio approach) to isolate what drives performance.
 */
export function generateTrialReelVariations(baseIdea: BaseIdea): Variation[] {
  const variations: Variation[] = [
    {
      id: `${baseIdea.id}-var-A`,
      baseIdeaId: baseIdea.id,
      variationNumber: 1,
      hookVariantDescription: 'Standard: spoken hook + visual + on-screen text aligned (control)',
      changes: {
        hookType: 'spoken',
      },
      postingPriority: 1,
    },
    {
      id: `${baseIdea.id}-var-B`,
      baseIdeaId: baseIdea.id,
      variationNumber: 2,
      hookVariantDescription: 'Text-only hook: remove spoken audio for first 2s, rely on bold on-screen text + visual intrigue',
      changes: {
        hookType: 'text-only',
        audioChange: 'Trending sound or silence for first 2s, voiceover starts at 0:02',
      },
      postingPriority: 2,
    },
    {
      id: `${baseIdea.id}-var-C`,
      baseIdeaId: baseIdea.id,
      variationNumber: 3,
      hookVariantDescription: 'Different first frame: screen-record/tool UI instead of talking-head. Same script otherwise.',
      changes: {
        hookType: 'spoken',
        firstFrameChange: 'Open on screen recording of the tool/result instead of face. Cut to talking-head at 0:03.',
      },
      postingPriority: 3,
    },
    {
      id: `${baseIdea.id}-var-D`,
      baseIdeaId: baseIdea.id,
      variationNumber: 4,
      hookVariantDescription: 'CTA swap: change from save/share to DM-keyword automation',
      changes: {
        hookType: 'spoken',
        ctaChange: `Switch CTA to: "Comment '${baseIdea.dmKeyword ?? 'BUILD'}' and I'll DM you the template"`,
      },
      postingPriority: 4,
    },
    {
      id: `${baseIdea.id}-var-E`,
      baseIdeaId: baseIdea.id,
      variationNumber: 5,
      hookVariantDescription: 'Shorter cut: same content compressed to 15–20s (for watch-through rate test)',
      changes: {
        hookType: 'spoken',
        lengthChange: 'Compress to 15–20s by removing context beat and going hook → build → CTA directly',
      },
      postingPriority: 5,
    },
  ];

  return variations;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Select which variations to actually post as trial reels.
 * Recommendation: post 3 max to avoid signal dilution.
 */
export function selectTrialSet(
  variations: Variation[],
  maxTrials: number = 3
): Variation[] {
  return variations
    .sort((a, b) => a.postingPriority - b.postingPriority)
    .slice(0, maxTrials);
}

/**
 * After 48h, determine the winner from a trial group based on performance data.
 * Pass in actual metrics — this is a typed interface for when real data lands.
 */
export interface TrialResult {
  variationId: string;
  views: number;
  saves: number;
  shares: number;
  retentionPercent: number;
  followsGained: number;
}

export function pickWinner(results: TrialResult[]): TrialResult | null {
  if (results.length === 0) return null;

  // Score: weighted combination of saves (40%) + shares (30%) + retention (20%) + follows (10%)
  const scored = results.map(r => ({
    ...r,
    score:
      r.saves * 0.4 +
      r.shares * 0.3 +
      r.retentionPercent * 0.2 +
      r.followsGained * 0.1,
  }));

  return scored.sort((a, b) => b.score - a.score)[0];
}
