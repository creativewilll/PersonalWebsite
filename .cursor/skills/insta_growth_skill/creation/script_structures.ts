/**
 * Script Structures — 5 proven video script frameworks.
 *
 * Each structure is designed for a specific content game and maps to
 * Kallaway's "teach through stories" and heyDominik's retention-first
 * approach. Structures are format-agnostic frameworks, not rigid scripts.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ScriptStructure {
  id: string;
  label: string;
  /** What content game this pairs best with */
  bestForGame: string;
  /** Step-by-step beats in the script */
  steps: { beat: string; durationRange: string; notes: string }[];
  idealLengthSeconds: { min: number; max: number };
  /** Which creator's style this embodies */
  sourceInspiration: string;
}

// ─── Structures ──────────────────────────────────────────────────────────────

export const scriptStructures: ScriptStructure[] = [
  {
    id: 'story-teach',
    label: 'Story + Teach',
    bestForGame: 'story-teach',
    // Kallaway's "teach through stories" — hook with a personal anecdote,
    // then deliver the tactical lesson, then close with a rewatch-worthy insight.
    steps: [
      { beat: 'Hook (receipt/anecdote)', durationRange: '0:00–0:03', notes: 'Start with the result or moment of realization. Never start with "So today I want to talk about..."' },
      { beat: 'Context (the situation)', durationRange: '0:03–0:08', notes: 'Set the scene in 1–2 sentences. Who, what, when. Be specific.' },
      { beat: 'Tension (the problem)', durationRange: '0:08–0:12', notes: 'What was broken? What was at stake? Make the viewer feel the pain.' },
      { beat: 'Resolution (the build/fix)', durationRange: '0:12–0:30', notes: 'This is the meat. Show the solution. Screen record, explain the mechanism.' },
      { beat: 'Proof (the result)', durationRange: '0:30–0:38', notes: 'Numbers. Screenshots. Before/after. Receipts.' },
      { beat: 'CTA + loop', durationRange: '0:38–0:42', notes: 'Clear action + subtle callback to the hook that rewards rewatching.' },
    ],
    idealLengthSeconds: { min: 35, max: 45 },
    sourceInspiration: 'Kallaway "teach through stories" + Hormozi receipt-first',
  },
  {
    id: 'three-step-tutorial',
    label: '3-Step Tactical Tutorial',
    bestForGame: 'screen-demo',
    steps: [
      { beat: 'Hook (promise of simplicity)', durationRange: '0:00–0:03', notes: '"3 steps. 5 minutes. [Result]." Keep it impossibly simple-sounding.' },
      { beat: 'Step 1', durationRange: '0:03–0:12', notes: 'Show the first action. Screen record or talking-head demo. One clear instruction.' },
      { beat: 'Step 2', durationRange: '0:12–0:22', notes: 'Build on step 1. This is usually the "meat" — the non-obvious part.' },
      { beat: 'Step 3 + Result', durationRange: '0:22–0:32', notes: 'Final action + immediate payoff. Show the system WORKING.' },
      { beat: 'CTA', durationRange: '0:32–0:35', notes: '"Comment [KEYWORD] — I\'ll DM you the template." Direct, one verb.' },
    ],
    idealLengthSeconds: { min: 30, max: 40 },
    sourceInspiration: 'Nick Saraev / Jack energy — fast, tactical, no fluff',
  },
  {
    id: 'case-study-breakdown',
    label: 'Case Study Breakdown',
    bestForGame: 'tactical-receipt',
    steps: [
      { beat: 'Hook (the result)', durationRange: '0:00–0:03', notes: 'Lead with the number/outcome. "$X saved" or "Y hours eliminated" or "Z leads generated."' },
      { beat: 'Client situation', durationRange: '0:03–0:10', notes: 'Who was the client? What was their pain? (Anonymize if needed but keep it specific.)' },
      { beat: 'What we built', durationRange: '0:10–0:25', notes: 'The technical breakdown. Show the architecture. Name the tools. Be specific.' },
      { beat: 'Before → after metrics', durationRange: '0:25–0:35', notes: 'Hard numbers. Time saved, money saved, leads generated. Side-by-side if possible.' },
      { beat: 'Lesson / takeaway', durationRange: '0:35–0:40', notes: 'One transferable insight the viewer can apply to their business TODAY.' },
      { beat: 'CTA', durationRange: '0:40–0:45', notes: 'Book a call CTA or DM-keyword for the case study details.' },
    ],
    idealLengthSeconds: { min: 35, max: 50 },
    sourceInspiration: 'David Ondrej deep-dive + Hormozi "show the math" energy',
  },
  {
    id: 'contrarian-rant',
    label: 'Contrarian Rant',
    bestForGame: 'contrarian-take',
    steps: [
      { beat: 'Provocative claim', durationRange: '0:00–0:03', notes: '"Everyone\'s wrong about [X]." or "[Popular thing] is a waste of money." Go hard.' },
      { beat: 'Acknowledge the mainstream view', durationRange: '0:03–0:08', notes: 'Show you understand WHY people believe the wrong thing. Builds credibility.' },
      { beat: 'Your counter-argument', durationRange: '0:08–0:18', notes: 'The logical breakdown of why they\'re wrong. Use specific evidence.' },
      { beat: 'Proof / receipt', durationRange: '0:18–0:25', notes: 'Show your alternative working. Numbers, screenshots, results.' },
      { beat: 'Bridge to action', durationRange: '0:25–0:30', notes: '"Here\'s what to do instead..." — make it actionable, not just opinionated.' },
    ],
    idealLengthSeconds: { min: 20, max: 35 },
    sourceInspiration: 'Hormozi conviction + Kallaway "create share-worthy content that is easy to save and send"',
  },
  {
    id: 'screen-record-demo',
    label: 'Screen-Record Demo',
    bestForGame: 'screen-demo',
    steps: [
      { beat: 'Hook (outcome preview)', durationRange: '0:00–0:03', notes: 'Show the end result FIRST. The working system. Then rewind to build it.' },
      { beat: 'Context setup', durationRange: '0:03–0:08', notes: 'Briefly explain what this does and who it\'s for. 1–2 sentences max.' },
      { beat: 'Build walkthrough', durationRange: '0:08–0:40', notes: 'Screen recording of the actual build. Zoom into relevant parts. Voiceover explains each decision.' },
      { beat: 'Test / trigger', durationRange: '0:40–0:50', notes: 'Trigger the workflow live. Show the result in real-time. Satisfying completion.' },
      { beat: 'CTA', durationRange: '0:50–0:55', notes: '"Comment [KEYWORD] for the JSON/template." Quick and clean.' },
    ],
    idealLengthSeconds: { min: 45, max: 60 },
    sourceInspiration: 'Nate Herk build walkthroughs + Nick Saraev screen-record energy',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getStructureById(id: string): ScriptStructure | undefined {
  return scriptStructures.find(s => s.id === id);
}

export function getStructuresForGame(gameId: string): ScriptStructure[] {
  return scriptStructures.filter(s => s.bestForGame === gameId);
}
