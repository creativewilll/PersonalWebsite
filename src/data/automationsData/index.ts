export type AutomationCategory =
  | 'marketing'
  | 'operations'
  | 'sales'
  | 'customer-service'
  | 'finance'
  | 'leadership'
  | 'hr';

export interface AutomationEntry {
  id: string;
  name: string;
  brief: string;
  category: AutomationCategory;
  tags: string[];
  built: string;
}

export interface AutomationsSnapshot {
  generatedAt: string;
  total: number;
  categories: Record<AutomationCategory, number>;
  topTags: { tag: string; count: number }[];
  firstBuilt: string;
  lastBuilt: string;
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

/** Dynamic import keeps the snapshot out of the main bundle until needed. */
export async function loadAutomationsSnapshot(): Promise<AutomationsSnapshot> {
  const mod = await import('./automations.json');
  return (mod.default ?? mod) as AutomationsSnapshot;
}
