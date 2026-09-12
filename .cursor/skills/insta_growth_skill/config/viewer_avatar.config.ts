/**
 * Viewer Avatar Configuration
 *
 * Follows Kallaway's and heyDominik's emphasis on knowing your ideal viewer
 * deeply before optimizing tactics. Every hook, script, and caption should
 * speak directly to ONE of these avatars.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ViewerAvatar {
  id: string;
  label: string;
  identity: string;
  dailyReality: string;
  pains: string[];
  desires: string[];
  languageStyle: string[];
  platformsTheyLiveOn: string[];
  objections: string[];
  /** Exact phrases they'd use to describe their problem (use in hooks) */
  verbatimPhrases: string[];
}

// ─── Primary Avatar ──────────────────────────────────────────────────────────

export const primaryAvatar: ViewerAvatar = {
  id: 'tech-founder',
  label: 'Tech-Savvy Founder (25–40)',
  identity: 'Solo founder or small-team CEO running a $100k–$2M/yr service business who knows AI exists but hasn\'t operationalized it yet.',
  dailyReality: 'Drowning in manual tasks. Has 3+ SaaS subscriptions that don\'t talk to each other. Spends 2–4 hours/day on admin that should be automated. Knows they need AI but doesn\'t know where to start building.',
  pains: [
    'Manually copying data between tools every single day',
    'Paying $3k+/mo for a VA who still makes mistakes',
    'Website gets zero AI search citations while competitors show up in ChatGPT',
    'Tried Zapier but hit limits immediately; too expensive to scale',
    'Hired a dev once, got burned, now DIY-ing everything badly',
  ],
  desires: [
    'Systems that run 24/7 without human babysitting',
    'Get cited by Perplexity and ChatGPT when prospects search their niche',
    'Replace 2–3 manual roles with one intelligent automation pipeline',
    'Look like a $10M operation while running lean',
    'Free up 20+ hours/week to focus on strategy and sales',
  ],
  languageStyle: [
    'Direct, no-BS, values their time',
    'Skeptical of hype but open to proven systems',
    'Uses terms like "pipeline", "stack", "workflow", "ROI"',
    'Prefers seeing the BUILD over hearing the THEORY',
  ],
  platformsTheyLiveOn: ['Instagram', 'LinkedIn', 'Twitter/X', 'YouTube', 'Perplexity'],
  objections: [
    '"I\'m not technical enough to set this up"',
    '"Automation sounds great but my business is too custom"',
    '"I tried AI tools before and they hallucinated garbage"',
    '"I can\'t afford a $10k automation build right now"',
  ],
  verbatimPhrases: [
    'I\'m still doing this manually',
    'There has to be a better way',
    'I don\'t have time to learn another tool',
    'Just show me what it looks like when it\'s working',
    'How long until I see ROI?',
  ],
};

// ─── Secondary Avatar ────────────────────────────────────────────────────────

export const secondaryAvatar: ViewerAvatar = {
  id: 'blue-collar-owner',
  label: 'Blue-Collar Business Owner (30–55)',
  identity: 'Owns a roofing, HVAC, landscaping, or construction company doing $500k–$5M/yr. Runs operations from their truck. Knows they need a website and "AI stuff" but has zero bandwidth.',
  dailyReality: 'Phone rings constantly. Estimates are handwritten or in a spreadsheet. Misses follow-ups because there\'s no system. Website was built by a nephew in 2019 and looks terrible on mobile.',
  pains: [
    'Losing jobs because they forgot to follow up on estimates',
    'Website doesn\'t show up in Google, let alone AI search',
    'Competitors with worse work are winning on marketing',
    'No time to learn tech — needs someone to just handle it',
    'Paying for leads on Angi/HomeAdvisor that don\'t convert',
  ],
  desires: [
    'A website that actually generates calls without paid ads',
    'Automatic follow-up so no lead falls through the cracks',
    'Look professional online — match the quality of their actual work',
    'A "set it and forget it" system they don\'t have to manage',
    'Stop bleeding money on bad lead gen platforms',
  ],
  languageStyle: [
    'Blunt, working-class directness',
    'Skeptical of tech promises, trusts results',
    'Respects hustle and craftsmanship analogies',
    'Swears casually, hates corporate jargon',
  ],
  platformsTheyLiveOn: ['Instagram', 'Facebook', 'YouTube', 'Google Search'],
  objections: [
    '"I don\'t have time for social media"',
    '"My last web guy ghosted me"',
    '"I don\'t need fancy AI, I just need the phone to ring"',
    '"How much is this gonna cost me?"',
  ],
  verbatimPhrases: [
    'I just need the phone to ring',
    'My website looks like crap but I\'m too busy to fix it',
    'I\'m losing jobs to guys who do worse work than me',
    'Can you just handle it for me?',
  ],
};

// ─── Tertiary Avatar ─────────────────────────────────────────────────────────

export const tertiaryAvatar: ViewerAvatar = {
  id: 'aspiring-ai-builder',
  label: 'Aspiring AI Builder (20–35)',
  identity: 'Developer or tech-adjacent professional who wants to build an AI automation agency or freelance practice. Watches Nick Saraev, follows AI Twitter, but hasn\'t landed their first client yet.',
  dailyReality: 'Consuming content all day, building toy projects, but not shipping anything real. Has the skills but lacks the business framework and confidence to charge premium prices.',
  pains: [
    'Tutorial hell — knows the tools but can\'t package them into offers',
    'Undercharging because they can\'t articulate the value of automation',
    'No portfolio of real client work to reference',
    'Imposter syndrome when competing with established agencies',
    'Overwhelmed by the pace of AI releases',
  ],
  desires: [
    'Land their first $5k+ automation client',
    'Build a portfolio that attracts inbound leads',
    'Learn which automations actually make money vs are just cool',
    'Develop a repeatable system for scoping, building, and delivering',
    'Join the "AI consultant" identity with real receipts',
  ],
  languageStyle: [
    'Tech-native, comfortable with jargon',
    'Values efficiency and elegance in systems',
    'Motivated by financial freedom + creative expression',
    'Responds to "here\'s what I actually charge for this" content',
  ],
  platformsTheyLiveOn: ['Instagram', 'Twitter/X', 'YouTube', 'Discord', 'Reddit'],
  objections: [
    '"The market is too saturated now"',
    '"I\'m not experienced enough to charge real money"',
    '"What if the AI landscape changes and my skills become obsolete?"',
    '"I don\'t know how to find clients"',
  ],
  verbatimPhrases: [
    'How do I actually get clients for this?',
    'What should I charge?',
    'Is it too late to start an AI agency?',
    'Show me what a real project looks like',
  ],
};

// ─── All Avatars ─────────────────────────────────────────────────────────────

export const viewerAvatars: ViewerAvatar[] = [
  primaryAvatar,
  secondaryAvatar,
  tertiaryAvatar,
];
