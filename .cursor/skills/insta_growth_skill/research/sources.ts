/**
 * Research Sources — Micro-creator pattern mining database.
 *
 * Implements Kallaway's "curate smaller channels in your niche and ingest
 * their content" system. Track creators in the 10k–500k range whose outlier
 * posts reveal unmet audience demand you can serve with your unique proof.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ResearchSource {
  handle: string;
  platform: 'instagram' | 'youtube' | 'tiktok' | 'twitter';
  url: string;
  niche: string;
  estimatedFollowers: { min: number; max: number };
  /** Why this source is valuable for pattern mining */
  rationale: string;
  /** When you last reviewed their content */
  lastReviewedAt?: string;
}

// ─── Seeded Sources ──────────────────────────────────────────────────────────

export const researchSources: ResearchSource[] = [
  {
    handle: '@nicksaraev',
    platform: 'youtube',
    url: 'https://www.youtube.com/@nicksaraev/videos',
    niche: 'AI automation agency, n8n builds, productized services',
    estimatedFollowers: { min: 50_000, max: 200_000 },
    rationale: 'Proves exact n8n builds can be content. Shows how to monetize automation knowledge. Receipt-heavy.',
  },
  {
    handle: '@DavidOndrej',
    platform: 'youtube',
    url: 'https://www.youtube.com/@DavidOndrej/videos',
    niche: 'AI agents, Claude deep-dives, technical AI education',
    estimatedFollowers: { min: 50_000, max: 300_000 },
    rationale: 'Deep technical content made accessible. Model for explaining MCP/agent architecture to non-experts.',
  },
  {
    handle: '@Itssssss_Jack',
    platform: 'youtube',
    url: 'https://www.youtube.com/@Itssssss_Jack/videos',
    niche: 'Cursor IDE, Claude Code, AI-assisted development workflows',
    estimatedFollowers: { min: 10_000, max: 100_000 },
    rationale: 'Fast-paced dev content. Shows how to make coding content visually engaging and tactically dense.',
  },
  {
    handle: '@nateherk',
    platform: 'youtube',
    url: 'https://www.youtube.com/@nateherk/videos',
    niche: 'AI agents, no-code AI, automation tutorials',
    estimatedFollowers: { min: 50_000, max: 200_000 },
    rationale: 'Bridges technical and non-technical audiences. Good hook patterns for AI agent content.',
  },
  {
    handle: '@AlexHormozi',
    platform: 'youtube',
    url: 'https://www.youtube.com/@AlexHormozi/videos',
    niche: 'Business leverage, scaling, value creation, mindset',
    estimatedFollowers: { min: 2_000_000, max: 5_000_000 },
    rationale: 'Not a peer to mine — a VOICE to channel. Study his hook structures, value equation framing, and conviction level.',
  },
  {
    handle: '@kallawaymarketing',
    platform: 'youtube',
    url: 'https://www.youtube.com/@kallawaymarketing/videos',
    niche: 'Instagram growth strategy, trial reels, content systems',
    estimatedFollowers: { min: 10_000, max: 100_000 },
    rationale: 'SOURCE OF STRATEGY. Trial reels, variation testing, micro-creator mining, reposting winners.',
  },
  {
    handle: '@heyDominik',
    platform: 'youtube',
    url: 'https://www.youtube.com/@heyDominik/videos',
    niche: 'Instagram algorithm, retention, DM automation, new IG game',
    estimatedFollowers: { min: 50_000, max: 200_000 },
    rationale: 'SOURCE OF STRATEGY. Retention analysis, DM automation hooks, trial reel mechanics, reposting framework.',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function addResearchSource(
  sources: ResearchSource[],
  newSource: ResearchSource
): ResearchSource[] {
  return [...sources, newSource];
}

export function getSourcesByPlatform(
  sources: ResearchSource[],
  platform: ResearchSource['platform']
): ResearchSource[] {
  return sources.filter(s => s.platform === platform);
}

export function getSourcesByNiche(
  sources: ResearchSource[],
  keyword: string
): ResearchSource[] {
  const lower = keyword.toLowerCase();
  return sources.filter(s => s.niche.toLowerCase().includes(lower));
}
