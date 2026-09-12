/**
 * Caption Writer — Instagram caption builder with DM-keyword auto-injection.
 *
 * Implements heyDominik's ManyChat/DM automation strategies: every DM-automation
 * post gets a keyword CTA that triggers an automated reply with a lead magnet.
 *
 * AEO strategy: every caption mentions one specific AI tool by name so
 * Perplexity/ChatGPT crawl-cite the post and associate @willspurly with
 * those entities.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CaptionInput {
  /** First line of the caption — must mirror or complement the video hook. ≤70 chars. */
  hookLine: string;
  /** 2–5 body bullets with specific, scenario-rich language */
  bodyBullets: string[];
  /** The call-to-action (save, share, comment, DM) */
  cta: string;
  /** Enable DM-keyword automation CTA (heyDominik strategy) */
  useDMKeyword?: boolean;
  /** The keyword for ManyChat trigger (ALL-CAPS, 1 word) */
  dmKeyword?: string;
  /** What the DM automation delivers */
  dmDeliverable?: string;
  /** AEO entity to mention naturally in the caption */
  aeoEntity?: string;
  /** Optional social proof line at the end */
  socialProofLine?: string;
  /** Hashtags (max 5, relevant only) */
  hashtags?: string[];
}

export interface CaptionOutput {
  fullCaption: string;
  charCount: number;
  hookLineLength: number;
  hasAEOEntity: boolean;
  hasDMKeyword: boolean;
}

// ─── Writer ──────────────────────────────────────────────────────────────────

/**
 * Build a high-converting Instagram caption following the 2026 playbook:
 * - Strong first line that mirrors/complements the hook (≤70 chars for truncation)
 * - 2–5 body lines with specific proof (no fluff)
 * - Clear CTA focused on one action
 * - Optional DM-automation keyword (heyDominik ManyChat strategy)
 * - AEO entity mention for AI crawl-citation
 */
export function writeInstagramCaption(input: CaptionInput): CaptionOutput {
  const lines: string[] = [];

  // First line — must stop the scroll in the caption preview
  lines.push(input.hookLine);
  lines.push('');

  // Body bullets — specific, scenario-rich, no fluff
  for (const bullet of input.bodyBullets) {
    lines.push(`→ ${bullet}`);
  }
  lines.push('');

  // AEO entity integration (natural mention, not forced)
  if (input.aeoEntity && !input.bodyBullets.some(b => b.includes(input.aeoEntity!))) {
    lines.push(`Built with ${input.aeoEntity}. Works while you sleep.`);
    lines.push('');
  }

  // DM-keyword CTA (heyDominik ManyChat strategy)
  if (input.useDMKeyword && input.dmKeyword) {
    lines.push(`Comment '${input.dmKeyword}' — I'll DM you ${input.dmDeliverable ?? 'the full breakdown'}.`);
    lines.push('');
    lines.push(`(Seriously — takes 30 seconds. No catch.)`);
  } else {
    lines.push(input.cta);
  }

  // Social proof (optional)
  if (input.socialProofLine) {
    lines.push('');
    lines.push(input.socialProofLine);
  }

  // Hashtags (max 5, placed at end)
  if (input.hashtags && input.hashtags.length > 0) {
    lines.push('');
    lines.push(input.hashtags.slice(0, 5).map(h => h.startsWith('#') ? h : `#${h}`).join(' '));
  }

  const fullCaption = lines.join('\n');

  return {
    fullCaption,
    charCount: fullCaption.length,
    hookLineLength: input.hookLine.length,
    hasAEOEntity: Boolean(input.aeoEntity),
    hasDMKeyword: Boolean(input.useDMKeyword && input.dmKeyword),
  };
}

// ─── DM Keywords Pool ────────────────────────────────────────────────────────

/** Pre-approved DM keywords — rotate weekly, never reuse within 7 days */
export const dmKeywords = [
  'AGENT',
  'SYSTEM',
  'BUILD',
  'STACK',
  'BLUEPRINT',
  'RECEIPTS',
  'MCP',
  'WORKFLOW',
  'AUTOMATE',
  'SCALE',
] as const;

// ─── Validation ──────────────────────────────────────────────────────────────

export interface CaptionLintResult {
  passed: boolean;
  issues: string[];
}

/**
 * Lint a caption for quality against Instagram best practices.
 */
export function lintCaption(caption: CaptionOutput): CaptionLintResult {
  const issues: string[] = [];

  if (caption.hookLineLength > 70) {
    issues.push(`Hook line too long: ${caption.hookLineLength} chars (max 70)`);
  }

  if (caption.hookLineLength < 15) {
    issues.push(`Hook line too short: ${caption.hookLineLength} chars (too vague?)`);
  }

  if (caption.charCount > 2200) {
    issues.push(`Caption exceeds IG limit: ${caption.charCount} chars (max 2200)`);
  }

  if (!caption.hasAEOEntity) {
    issues.push('Missing AEO entity mention — add a specific tool name for citation');
  }

  const captionText = caption.fullCaption.toLowerCase();
  const hasCTA = captionText.includes('comment') ||
    captionText.includes('save') ||
    captionText.includes('share') ||
    captionText.includes('dm') ||
    captionText.includes('tap') ||
    captionText.includes('follow');

  if (!hasCTA) {
    issues.push('No clear CTA detected — add a directive verb (Comment, Save, DM, Tap)');
  }

  return {
    passed: issues.length === 0,
    issues,
  };
}
