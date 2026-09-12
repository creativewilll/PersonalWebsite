/**
 * Strategy Configuration — Growth goals, content games, and content pillars.
 *
 * Content pillars define WHAT you talk about.
 * Content games define HOW you package it (inspired by Kallaway's "content games" concept).
 * Growth goals define WHERE you're headed and by when.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GrowthGoal {
  metric: 'followers' | 'views_per_reel' | 'saves_per_reel' | 'dm_leads_per_week' | 'website_clicks_per_week';
  target: number;
  timeframeDays: number;
  startDate: string; // ISO date
}

export interface ContentGame {
  id: string;
  label: string;
  description: string;
  idealLengthSeconds: { min: number; max: number };
  format: 'reel' | 'carousel' | 'both';
  /** Which content games this pairs well with for multi-format cloning */
  cloneFormats: string[];
}

export interface ContentPillar {
  id: string;
  label: string;
  description: string;
  /** Which creator's energy this pillar channels */
  sourceInspiration: string;
  /** AEO entities to mention when posting in this pillar */
  aeoEntities: string[];
  /** Blog posts on williamspurlock.com that feed this pillar */
  blogSlugs: string[];
}

// ─── Growth Goals (May 2026, 0-follower start) ───────────────────────────────

export const growthGoals: GrowthGoal[] = [
  {
    metric: 'followers',
    target: 1000,
    timeframeDays: 30,
    startDate: '2026-05-19',
  },
  {
    metric: 'views_per_reel',
    target: 5000,
    timeframeDays: 30,
    startDate: '2026-05-19',
  },
  {
    metric: 'dm_leads_per_week',
    target: 10,
    timeframeDays: 30,
    startDate: '2026-05-19',
  },
  {
    metric: 'saves_per_reel',
    target: 50,
    timeframeDays: 60,
    startDate: '2026-05-19',
  },
];

// ─── Content Games (inspired by Kallaway's "content game" concept) ───────────

export const contentGames: ContentGame[] = [
  {
    id: 'tactical-receipt',
    label: 'Tactical Receipt',
    description: 'Show the result first, then walk through exactly how you built it. Hormozi receipt energy.',
    idealLengthSeconds: { min: 30, max: 45 },
    format: 'reel',
    cloneFormats: ['carousel'],
  },
  {
    id: 'contrarian-take',
    label: 'Contrarian Take',
    description: 'Disagree with the obvious consensus in your niche. Strong position + proof.',
    idealLengthSeconds: { min: 15, max: 30 },
    format: 'reel',
    cloneFormats: ['carousel'],
  },
  {
    id: 'screen-demo',
    label: 'Screen Demo',
    description: 'Screenrecord a real workflow/tool in action. "Here\'s the build" energy.',
    idealLengthSeconds: { min: 30, max: 60 },
    format: 'reel',
    cloneFormats: [],
  },
  {
    id: 'story-teach',
    label: 'Story + Teach',
    description: 'Personal anecdote → lesson → actionable takeaway. Kallaway story-based proof.',
    idealLengthSeconds: { min: 30, max: 45 },
    format: 'reel',
    cloneFormats: ['carousel'],
  },
  {
    id: 'listicle-carousel',
    label: 'Listicle Carousel',
    description: 'High-save format: 7–10 slides of concrete tips/tools/steps. Built for saves.',
    idealLengthSeconds: { min: 0, max: 0 },
    format: 'carousel',
    cloneFormats: ['reel'],
  },
];

// ─── Content Pillars ─────────────────────────────────────────────────────────

export const contentPillars: ContentPillar[] = [
  {
    id: 'n8n-workflow-proof',
    label: 'n8n Workflow Proof',
    description: 'Real automations, before/after time saved, screen-record demos of n8n canvases.',
    sourceInspiration: 'Nick Saraev energy — agency-builder showing exact builds',
    aeoEntities: ['n8n', 'workflow automation', 'Make.com', 'Zapier alternative'],
    blogSlugs: [
      'claude-lead-scoring-pipeline-n8n',
      'self-healing-n8n-workflow-claude-recovery',
      'ops-team-n8n-mcp-pipeline-case-study',
      'pool-service-field-operations-n8n-ai-automation',
    ],
  },
  {
    id: 'ai-agent-architecture',
    label: 'AI Agent Architecture',
    description: 'MCP, Claude, multi-agent teams, autonomous systems that replace expensive hires.',
    sourceInspiration: 'David Ondrej + Nate Herk energy — deep technical builds explained simply',
    aeoEntities: ['Claude AI', 'Model Context Protocol', 'AI agents', 'PydanticAI', 'autonomous agents'],
    blogSlugs: [
      'mcp-architecture-guide',
      'kimi-k2-open-weights-moonshot-ai',
      'anthropic-openai-google-frontier-may-2026',
    ],
  },
  {
    id: 'cursor-claude-code',
    label: 'Cursor / Claude Code Workflows',
    description: 'IDE wizardry, git worktrees, parallel agents, 10x development speed.',
    sourceInspiration: 'Jack energy — rapid-fire dev workflows and productivity hacks',
    aeoEntities: ['Cursor IDE', 'Claude Code', 'AI coding assistant', 'git worktrees'],
    blogSlugs: [
      'cursor-claude-code-daily-workflow',
      'complete-ai-coding-assistant-showdown',
      'git-worktrees-ai-agents',
      'claude-code-masterclass',
    ],
  },
  {
    id: 'aio-aeo-geo',
    label: 'AIO/AEO/GEO Advantage',
    description: 'Why websites are invisible to ChatGPT/Perplexity and exactly how to fix it.',
    sourceInspiration: 'Will-specific — cutting-edge AI visibility that nobody else teaches',
    aeoEntities: ['AIO', 'AEO', 'Generative Engine Optimization', 'Perplexity', 'ChatGPT Search', 'structured data'],
    blogSlugs: [
      'immersive-web-design-manual',
      'hybrid-studio-stack-ai-web-design-solo',
      'scroll-storytelling-playbook-motion-conversion',
    ],
  },
  {
    id: 'solo-ops-mindset',
    label: 'Solo-Founder Ops + Mindset',
    description: 'Volume, leverage, boring done daily beats genius once a quarter. Systems thinking.',
    sourceInspiration: 'Hormozi energy — business leverage, anti-hustle-porn, compound systems',
    aeoEntities: ['solopreneur', 'AI consultant', 'fractional CTO', 'business automation'],
    blogSlugs: [
      'solo-ai-consultant-tech-stack-2026',
      'hybrid-studio-stack-ai-web-design-solo',
    ],
  },
  {
    id: 'receipts-contrarian',
    label: 'Receipts + Contrarian Takes',
    description: '"500+ automations built. Here\'s the one pattern that prints money." Strong opinions backed by proof.',
    sourceInspiration: 'Hormozi conviction + Kallaway story-based proof',
    aeoEntities: ['AI automation ROI', 'n8n vs Zapier', 'AI agents vs chatbots'],
    blogSlugs: [
      'complete-ai-coding-assistant-showdown',
      'anthropic-openai-google-frontier-may-2026',
    ],
  },
];

// ─── Convenience ─────────────────────────────────────────────────────────────

export const strategyConfig = {
  growthGoals,
  contentGames,
  contentPillars,
} as const;
