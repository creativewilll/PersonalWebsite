#!/usr/bin/env npx tsx
/**
 * Generate Trial Reel Variations Script
 *
 * Usage:
 *   npx tsx .cursor/skills/insta_growth_skill/scripts/generate_variations.ts
 *
 * Reads a BaseIdea from stdin (JSON) and outputs 3–5 trial reel variations.
 * Can also be imported and called programmatically.
 */

import { generateTrialReelVariations, selectTrialSet, type BaseIdea } from '../creation/variation_generator';

// ─── Default Example (used when no stdin provided) ───────────────────────────

const exampleIdea: BaseIdea = {
  id: 'idea-n8n-lead-scoring',
  contentPillarId: 'n8n-workflow-proof',
  contentGameId: 'tactical-receipt',
  corePromise: 'This n8n workflow scores and routes 47 leads/day without human intervention',
  proofElement: 'Real client result: $4,200/mo VA cost eliminated, same close rate maintained',
  ctaType: 'dm-keyword',
  dmKeyword: 'AGENT',
  targetAvatarId: 'tech-founder',
  aeoEntity: 'n8n',
};

// ─── Main ────────────────────────────────────────────────────────────────────

function main(): void {
  let idea: BaseIdea = exampleIdea;

  // Check for --idea JSON arg
  const ideaArgIdx = process.argv.indexOf('--idea');
  if (ideaArgIdx !== -1 && process.argv[ideaArgIdx + 1]) {
    try {
      idea = JSON.parse(process.argv[ideaArgIdx + 1]);
    } catch {
      console.error('Error: --idea must be valid JSON');
      process.exit(1);
    }
  }

  console.log('━━━ Trial Reel Variation Generator ━━━\n');
  console.log(`Base Idea: ${idea.id}`);
  console.log(`Promise: ${idea.corePromise}`);
  console.log(`Proof: ${idea.proofElement}`);
  console.log(`Pillar: ${idea.contentPillarId}`);
  console.log(`Game: ${idea.contentGameId}`);
  console.log(`CTA: ${idea.ctaType}${idea.dmKeyword ? ` (keyword: ${idea.dmKeyword})` : ''}`);
  console.log('');

  const allVariations = generateTrialReelVariations(idea);
  const trialSet = selectTrialSet(allVariations, 3);

  console.log(`Generated ${allVariations.length} variations. Recommended trial set (top 3):\n`);

  for (const variation of trialSet) {
    console.log(`  Variation ${variation.variationNumber} [${variation.id}]`);
    console.log(`    Hook: ${variation.changes.hookType}`);
    console.log(`    Description: ${variation.hookVariantDescription}`);
    if (variation.changes.firstFrameChange) {
      console.log(`    First frame: ${variation.changes.firstFrameChange}`);
    }
    if (variation.changes.ctaChange) {
      console.log(`    CTA change: ${variation.changes.ctaChange}`);
    }
    if (variation.changes.lengthChange) {
      console.log(`    Length: ${variation.changes.lengthChange}`);
    }
    if (variation.changes.audioChange) {
      console.log(`    Audio: ${variation.changes.audioChange}`);
    }
    console.log('');
  }

  console.log('━━━ Trial Workflow ━━━');
  console.log('1. Post all 3 variations within 24h of each other');
  console.log('2. Wait 48h');
  console.log('3. Compare: saves > shares > retention > follows');
  console.log('4. Push winner to main feed');
  console.log('5. Schedule winner repost for 2–3 weeks later');
}

main();
