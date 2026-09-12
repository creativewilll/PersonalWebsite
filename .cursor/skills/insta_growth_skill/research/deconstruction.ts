/**
 * Post Deconstruction Framework
 *
 * Deeply studying patterns from smaller channels (Kallaway) combined with
 * heyDominik's emphasis on hooks, retention mechanics, and CTA design.
 *
 * Each outlier post gets deconstructed into its component parts so you can
 * use the PATTERN as inspiration while applying your own unique proof/angle.
 */

import type { OutlierPost } from './outliers_log';

// ─── Types ───────────────────────────────────────────────────────────────────

export type StoryPattern =
  | 'case-study'
  | 'listicle'
  | 'confession'
  | 'before-after'
  | 'myth-bust'
  | 'contrarian-take'
  | 'tutorial'
  | 'receipt-flex'
  | 'prediction'
  | 'comparison';

export type CTAType =
  | 'comment-keyword'
  | 'dm-keyword'
  | 'save'
  | 'share'
  | 'click-link'
  | 'follow'
  | 'none';

export type RetentionMechanic =
  | 'open-loop'
  | 'unexpected-twist'
  | 'quick-cuts'
  | 'information-density'
  | 'visual-reveal'
  | 'countdown'
  | 'pattern-break'
  | 'curiosity-gap'
  | 'satisfying-completion';

export interface DeconstructedPost {
  outlierPostId: string;
  /** What you see in the very first frame (< 0.5s) */
  visualHook: string;
  /** First words spoken (< 1.5s) */
  spokenHook: string;
  /** On-screen text in first 1–3 seconds */
  onScreenText: string;
  /** The narrative structure used */
  storyPattern: StoryPattern;
  /** Who is speaking and from what angle */
  pov: string;
  /** Techniques used to keep viewers watching */
  retentionMechanics: RetentionMechanic[];
  /** How they ask for engagement */
  ctaType: CTAType;
  /** Specific CTA language used */
  ctaText: string;
  /** What makes this post work — your hypothesis */
  whyItWorks: string;
  /** How you could adapt this for your own content */
  adaptationIdea: string;
  /** Timestamp of major retention hooks within the video */
  retentionTimestamps?: { seconds: number; mechanic: RetentionMechanic; note: string }[];
}

// ─── Factory ─────────────────────────────────────────────────────────────────

/**
 * Creates a DeconstructedPost template from an OutlierPost.
 * Returns a structure with TODO placeholders — fill these by watching the clip
 * and analyzing each component deliberately.
 */
export function deconstructOutlier(outlier: OutlierPost): DeconstructedPost {
  return {
    outlierPostId: outlier.id,
    visualHook: '/* TODO: Describe what you see in frame 1. Is it a face? A screen? A prop? What draws the eye? */',
    spokenHook: '/* TODO: Write the exact first 1.5s of spoken audio. What promise or curiosity does it create? */',
    onScreenText: '/* TODO: What text appears on screen in first 1-3s? How many words? What font/style? */',
    storyPattern: 'case-study', // TODO: identify the actual pattern
    pov: '/* TODO: e.g., "Creator who replaced their team with AI" or "Skeptic who was proven wrong" */',
    retentionMechanics: [], // TODO: identify 2-3 mechanics used
    ctaType: 'none', // TODO: what action do they ask for?
    ctaText: '/* TODO: exact CTA language used */',
    whyItWorks: '/* TODO: Your hypothesis on why this post hit. Be specific — was it the topic, the hook, the proof, the timing? */',
    adaptationIdea: '/* TODO: How would you remake this with YOUR proof, YOUR angle, YOUR avatar? */',
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getDeconstructionsByPattern(
  deconstructions: DeconstructedPost[],
  pattern: StoryPattern
): DeconstructedPost[] {
  return deconstructions.filter(d => d.storyPattern === pattern);
}

export function getDeconstructionsByCTA(
  deconstructions: DeconstructedPost[],
  cta: CTAType
): DeconstructedPost[] {
  return deconstructions.filter(d => d.ctaType === cta);
}

export function getMostUsedRetentionMechanics(
  deconstructions: DeconstructedPost[]
): { mechanic: RetentionMechanic; count: number }[] {
  const counts = new Map<RetentionMechanic, number>();
  for (const d of deconstructions) {
    for (const m of d.retentionMechanics) {
      counts.set(m, (counts.get(m) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([mechanic, count]) => ({ mechanic, count }))
    .sort((a, b) => b.count - a.count);
}
