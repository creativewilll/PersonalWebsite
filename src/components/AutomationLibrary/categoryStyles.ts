import type { AutomationCategory } from '../../data/automationsData';
import { CATEGORY_META } from '../../data/automationsData';

export const CATEGORY_ORDER: AutomationCategory[] = [
  'marketing',
  'operations',
  'sales',
  'customer-service',
  'finance',
  'leadership',
  'hr',
];

export const CATEGORY_COLORS: Record<
  AutomationCategory,
  { bg: string; text: string; border: string; ring: string }
> = {
  marketing: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200',
    ring: 'ring-purple-300',
  },
  operations: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    ring: 'ring-blue-300',
  },
  sales: {
    bg: 'bg-amber-100',
    text: 'text-amber-900',
    border: 'border-amber-200',
    ring: 'ring-amber-300',
  },
  'customer-service': {
    bg: 'bg-teal-100',
    text: 'text-teal-800',
    border: 'border-teal-200',
    ring: 'ring-teal-300',
  },
  finance: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    ring: 'ring-emerald-300',
  },
  leadership: {
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    border: 'border-rose-200',
    ring: 'ring-rose-300',
  },
  hr: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    border: 'border-indigo-200',
    ring: 'ring-indigo-300',
  },
};

export const CATEGORY_DESCRIPTIONS: Record<AutomationCategory, string> = {
  marketing:
    'Content pipelines, SEO systems, social distribution, and campaign reporting that keep marketing teams shipping without manual glue work.',
  operations:
    'Route assignment, record-keeping, internal tooling, and cross-system sync for day-to-day ops.',
  sales:
    'Proposal generation, lead enrichment, estimation workflows, and CRM updates that shorten the path from inquiry to close.',
  'customer-service':
    'Ticket triage, FAQ bots, escalation routing, and follow-up sequences that keep response times tight.',
  finance:
    'Invoice flows, expense logging, reconciliation helpers, and finance reporting automations.',
  leadership:
    'Executive digests, KPI rollups, and decision-support workflows that surface what leadership needs without spreadsheet archaeology.',
  hr: 'Onboarding checklists, people ops notifications, and HR record updates that cut admin drag.',
};

export function categoryLabel(category: AutomationCategory): string {
  return CATEGORY_META[category].label;
}

/** Inclusive month span between YYYY-MM strings. */
export function monthsBuilding(firstBuilt: string, lastBuilt: string): number {
  const [fy, fm] = firstBuilt.split('-').map(Number);
  const [ly, lm] = lastBuilt.split('-').map(Number);
  if (!fy || !fm || !ly || !lm) return 0;
  return (ly - fy) * 12 + (lm - fm) + 1;
}

export function formatBuiltDate(built: string): string {
  const [year, month] = built.split('-').map(Number);
  if (!year || !month) return built;
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
