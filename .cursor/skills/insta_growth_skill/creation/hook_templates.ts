/**
 * Hook Templates — 12 proven hook patterns for Instagram Reels.
 *
 * Spend 80% of creative energy on the first 1.5 seconds (Kallaway frame-1 rule).
 * Hooks should be ruthlessly simple and concrete. Visual + spoken + text must
 * all point at the same promise — misalignment = scroll.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type HookType =
  | 'pain'
  | 'promise'
  | 'pattern-interrupt'
  | 'myth-buster'
  | 'status'
  | 'contrarian'
  | 'receipt'
  | 'demo'
  | 'before-after'
  | 'frame1-visual'
  | 'callout'
  | 'stat';

export interface HookTemplate {
  id: string;
  type: HookType;
  /** The template with [PLACEHOLDER] slots */
  template: string;
  /** A concrete example using Will's niche */
  example: string;
  /** What makes this hook type work psychologically */
  whyItWorks: string;
}

// ─── Templates ───────────────────────────────────────────────────────────────

export const hookTemplates: HookTemplate[] = [
  {
    id: 'pain-agitate',
    type: 'pain',
    template: 'If you\'re still [PAINFUL ACTION], you\'re [CONSEQUENCE].',
    example: 'If you\'re still manually following up on leads, you\'re leaving $10k/mo on the table.',
    whyItWorks: 'Calls out a specific behavior the avatar is doing RIGHT NOW. Creates immediate self-identification.',
  },
  {
    id: 'promise-specific',
    type: 'promise',
    template: 'This [THING] [SPECIFIC RESULT] in [TIMEFRAME].',
    example: 'This one n8n workflow handles 47 leads/day without me touching it.',
    whyItWorks: 'Specific number + specific timeframe makes the promise feel achievable and real.',
  },
  {
    id: 'pattern-interrupt-action',
    type: 'pattern-interrupt',
    template: 'I [UNEXPECTED ACTION] and [SURPRISING RESULT].',
    example: 'I fired my VA last month and my leads actually went UP.',
    whyItWorks: 'Violates expectations. Brain needs to know HOW — creates an open loop.',
  },
  {
    id: 'myth-bust',
    type: 'myth-buster',
    template: '"[COMMON BELIEF]" — this is wrong. Here\'s why.',
    example: '"You need a team to scale past $500k." This is wrong. Here\'s why.',
    whyItWorks: 'Disagrees with something the viewer believes. Creates cognitive dissonance that demands resolution.',
  },
  {
    id: 'status-receipt',
    type: 'status',
    template: '[TIME PERIOD] ago I was [LOW STATUS]. Now I [HIGH STATUS RECEIPT].',
    example: '18 months ago I was charging $500 for websites. Now I turn down $15k projects.',
    whyItWorks: 'Aspirational transformation. Viewer imagines themselves in the "after" position.',
  },
  {
    id: 'contrarian-strong',
    type: 'contrarian',
    template: 'Everyone\'s [DOING X]. They\'re all wrong.',
    example: 'Everyone\'s building AI chatbots. They\'re all wrong.',
    whyItWorks: 'Strong disagreement with the crowd creates controversy (engagement) and positions you as a thinker.',
  },
  {
    id: 'receipt-number',
    type: 'receipt',
    template: '[SPECIFIC NUMBER] [METRIC] from [SPECIFIC SOURCE]. Here\'s how.',
    example: '$4,200/mo saved from one 12-minute n8n build. Here\'s how.',
    whyItWorks: 'Leads with proof, not promise. Hormozi receipt-first energy. Viewer trusts what follows.',
  },
  {
    id: 'demo-reveal',
    type: 'demo',
    template: 'Watch me [BUILD/DO THING] in [TIMEFRAME]. [It does X].',
    example: 'Watch me build a lead-scoring AI agent in 12 minutes. It replaces a $60k hire.',
    whyItWorks: 'Shows, doesn\'t tell. Viewer stays to see if the build actually works.',
  },
  {
    id: 'before-after-contrast',
    type: 'before-after',
    template: 'Before: [OLD WAY]. After: [NEW WAY]. [RESULT].',
    example: 'Before: 3 hours/day on lead follow-up. After: zero. Same close rate.',
    whyItWorks: 'Clear contrast creates immediate understanding of the value gap.',
  },
  {
    id: 'frame1-visual-only',
    type: 'frame1-visual',
    template: '[VISUAL DESCRIPTION — no speech for first 1.5s, text overlay only]',
    example: 'Close-up of n8n canvas with "47 leads handled today" counter overlay. No speech. Text: "I fired my VA."',
    whyItWorks: 'Pure visual curiosity. Silence in a sea of noise. Text-only hooks perform differently in trials.',
  },
  {
    id: 'callout-avatar',
    type: 'callout',
    template: '[AVATAR TYPE]: Stop [DOING X]. Do [THIS] instead.',
    example: 'Founders: Stop paying VAs to copy-paste. Build this instead.',
    whyItWorks: 'Direct address creates self-selection. Viewer feels spoken to directly.',
  },
  {
    id: 'stat-shock',
    type: 'stat',
    template: '[SHOCKING STAT]. Most [AVATAR] don\'t know this.',
    example: '73% of websites are invisible to AI search. Most founders don\'t know this.',
    whyItWorks: 'Data creates authority. "Most don\'t know" creates exclusivity — viewer feels like an insider.',
  },
];

// ─── On-Screen Text Generator ────────────────────────────────────────────────

/**
 * Generate punchy on-screen text hooks (3–5 words) from a topic.
 * These appear in the first frame to stop the scroll.
 *
 * Rule: Must be readable at phone-size in 0.5 seconds.
 * Rule: Clear first frame, no clutter, strong image (Kallaway/heyDominik).
 */
export function generateOnScreenTextHook(
  topic: string,
  desiredOutcome: string
): string[] {
  const topicWords = topic.toLowerCase();
  const outcomeWords = desiredOutcome.toLowerCase();

  const patterns = [
    // Pain-based (3-4 words)
    `Stop ${topicWords.split(' ').slice(0, 2).join(' ')} manually.`,
    // Result-based (3-5 words)
    `${desiredOutcome.split(' ').slice(0, 4).join(' ')}.`,
    // Action-based (3 words)
    `I automated ${topicWords.split(' ')[0]}.`,
    // Contrarian (3-4 words)
    `${topicWords.split(' ')[0]} is dead.`,
    // Receipt (4-5 words)
    `$0 spent. ${outcomeWords.split(' ').slice(0, 2).join(' ')} achieved.`,
  ];

  return patterns.map(p => p.charAt(0).toUpperCase() + p.slice(1));
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getHooksByType(type: HookType): HookTemplate[] {
  return hookTemplates.filter(h => h.type === type);
}

export function getRandomHook(): HookTemplate {
  return hookTemplates[Math.floor(Math.random() * hookTemplates.length)];
}
