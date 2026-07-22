export type AutomationCategory =
  | 'marketing'
  | 'operations'
  | 'sales'
  | 'customer-service'
  | 'finance'
  | 'leadership'
  | 'hr';

export type AutomationTriggerType =
  | 'webhook'
  | 'scheduled'
  | 'chat'
  | 'manual'
  | 'sub-workflow';

export type AutomationDepartment =
  | 'Marketing'
  | 'Sales'
  | 'Operations'
  | 'Customer Service'
  | 'Finance'
  | 'HR'
  | 'Leadership';

export interface AutomationEntry {
  id: string;
  name: string;
  brief: string;
  overview: string;
  category: AutomationCategory;
  tags: string[];
  built: string;
  slug: string;
  nodeCount: number | null;
  triggerType: AutomationTriggerType | null;
  integrations: string[];
  hoursSavedPerWeek: number;
  departments: AutomationDepartment[];
  related: string[];
}

export interface AutomationsSnapshot {
  generatedAt: string;
  total: number;
  categories: Record<AutomationCategory, number>;
  topTags: { tag: string; count: number }[];
  firstBuilt: string;
  lastBuilt: string;
  totalHoursPerWeek: number;
  automations: AutomationEntry[];
}

export const CATEGORY_META: Record<AutomationCategory, { label: string }> = {
  marketing: { label: 'Marketing' },
  operations: { label: 'Operations & Systems' },
  sales: { label: 'Sales & Estimation' },
  'customer-service': { label: 'Customer Service' },
  finance: { label: 'Accounting & Finance' },
  leadership: { label: 'Leadership' },
  hr: { label: 'People & HR' },
};

export const HOURLY_RATE_USD = 95;

export function yearlyValueUsd(hoursPerWeek: number, rate = HOURLY_RATE_USD): number {
  return Math.round(hoursPerWeek * 52 * rate);
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Dynamic import keeps the snapshot out of the main bundle until needed. */
export async function loadAutomationsSnapshot(): Promise<AutomationsSnapshot> {
  const mod = await import('./automations.json');
  return (mod.default ?? mod) as AutomationsSnapshot;
}

export type ScreenshotsManifest = Record<string, string>;

export async function loadScreenshotsManifest(): Promise<ScreenshotsManifest> {
  try {
    const mod = await import('./screenshots.json');
    return (mod.default ?? mod) as ScreenshotsManifest;
  } catch {
    return {};
  }
}
