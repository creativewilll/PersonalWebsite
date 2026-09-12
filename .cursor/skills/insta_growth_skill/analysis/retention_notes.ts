/**
 * Retention Notes — Log drop-off patterns and iterate.
 *
 * Directly implements heyDominik's focus on retention graphs and pattern spotting:
 * "Look at where people click off and ask why; then test variations."
 *
 * Over 30 days, these notes become your personal retention playbook —
 * a data-driven understanding of what keeps YOUR audience watching.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RetentionNote {
  id: string;
  postId: string;
  /** Where in the video the drop-off or spike happens */
  timestampSeconds: number;
  /** What you observed (e.g., "big drop-off when switched to screen recording") */
  note: string;
  /** Your hypothesis for WHY this happened */
  hypothesis: string;
  /** What you'll test next time to improve this moment */
  action: string;
  /** Was the action tested? What was the result? */
  followUpResult?: string;
  loggedAt: string; // ISO date
}

export interface RetentionInsight {
  pattern: string;
  frequency: number;
  avgDropOffPercent?: number;
  recommendedAction: string;
}

// ─── Storage ─────────────────────────────────────────────────────────────────

let retentionNotes: RetentionNote[] = [];

// ─── Core Functions ──────────────────────────────────────────────────────────

export function addRetentionNote(note: RetentionNote): void {
  retentionNotes = [...retentionNotes, note];
}

export function getRetentionNotes(): RetentionNote[] {
  return retentionNotes;
}

export function getNotesForPost(postId: string): RetentionNote[] {
  return retentionNotes.filter(n => n.postId === postId);
}

export function getRecentNotes(days: number): RetentionNote[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return retentionNotes.filter(n => new Date(n.loggedAt) >= cutoff);
}

// ─── Pattern Analysis ────────────────────────────────────────────────────────

/**
 * Summarize retention insights from accumulated notes.
 * Groups notes by common patterns and surfaces recurring themes.
 */
export function summarizeRetentionInsights(notes: RetentionNote[]): RetentionInsight[] {
  if (notes.length === 0) return [];

  const patternMap = new Map<string, RetentionNote[]>();

  // Group by hypothesis keywords (simplified pattern detection)
  for (const note of notes) {
    const key = extractPatternKey(note.hypothesis);
    const existing = patternMap.get(key) ?? [];
    existing.push(note);
    patternMap.set(key, existing);
  }

  const insights: RetentionInsight[] = [];

  for (const [pattern, groupedNotes] of patternMap) {
    if (groupedNotes.length >= 2) {
      insights.push({
        pattern,
        frequency: groupedNotes.length,
        recommendedAction: groupedNotes[groupedNotes.length - 1].action,
      });
    }
  }

  return insights.sort((a, b) => b.frequency - a.frequency);
}

/**
 * Get notes clustered by timestamp range to identify common drop-off zones.
 */
export function getDropOffZones(notes: RetentionNote[]): {
  zone: string;
  count: number;
  commonHypotheses: string[];
}[] {
  const zones: Record<string, RetentionNote[]> = {
    'hook (0-3s)': [],
    'context (3-8s)': [],
    'early-body (8-15s)': [],
    'mid-body (15-25s)': [],
    'late-body (25-40s)': [],
    'ending (40s+)': [],
  };

  for (const note of notes) {
    if (note.timestampSeconds <= 3) zones['hook (0-3s)'].push(note);
    else if (note.timestampSeconds <= 8) zones['context (3-8s)'].push(note);
    else if (note.timestampSeconds <= 15) zones['early-body (8-15s)'].push(note);
    else if (note.timestampSeconds <= 25) zones['mid-body (15-25s)'].push(note);
    else if (note.timestampSeconds <= 40) zones['late-body (25-40s)'].push(note);
    else zones['ending (40s+)'].push(note);
  }

  return Object.entries(zones)
    .filter(([, zoneNotes]) => zoneNotes.length > 0)
    .map(([zone, zoneNotes]) => ({
      zone,
      count: zoneNotes.length,
      commonHypotheses: [...new Set(zoneNotes.map(n => n.hypothesis))].slice(0, 3),
    }))
    .sort((a, b) => b.count - a.count);
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function extractPatternKey(hypothesis: string): string {
  const lower = hypothesis.toLowerCase();

  if (lower.includes('hook') || lower.includes('first frame') || lower.includes('opening'))
    return 'weak hook / first frame';
  if (lower.includes('pace') || lower.includes('slow') || lower.includes('boring'))
    return 'pacing too slow';
  if (lower.includes('screen') || lower.includes('recording') || lower.includes('demo'))
    return 'screen recording engagement';
  if (lower.includes('cta') || lower.includes('call to action') || lower.includes('ending'))
    return 'CTA / ending issue';
  if (lower.includes('text') || lower.includes('overlay') || lower.includes('subtitle'))
    return 'text/overlay readability';
  if (lower.includes('transition') || lower.includes('cut') || lower.includes('jump'))
    return 'transition / cut timing';

  return 'other';
}
