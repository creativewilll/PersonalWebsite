/**
 * Shared n8n workflow JSON parsing + value heuristics for automation sync/backfill.
 */

export const DEPARTMENT_OPTIONS = [
  'Marketing',
  'Sales',
  'Operations',
  'Customer Service',
  'Finance',
  'HR',
  'Leadership',
];

export const CATEGORY_TO_DEPARTMENT = {
  marketing: 'Marketing',
  sales: 'Sales',
  operations: 'Operations',
  'customer-service': 'Customer Service',
  finance: 'Finance',
  hr: 'HR',
  leadership: 'Leadership',
};

/** Map n8n node type → friendly integration label. Sticky notes / internals omitted. */
const NODE_INTEGRATION_MAP = [
  [/slack/i, 'Slack'],
  [/airtable/i, 'Airtable'],
  [/gmail|emailReadImap|emailSend|microsoftOutlook/i, 'Email'],
  [/googleSheets/i, 'Google Sheets'],
  [/googleDrive/i, 'Google Drive'],
  [/googleCalendar/i, 'Google Calendar'],
  [/googleDocs/i, 'Google Docs'],
  [/gmail/i, 'Gmail'],
  [/notion/i, 'Notion'],
  [/hubspot/i, 'HubSpot'],
  [/salesforce/i, 'Salesforce'],
  [/stripe/i, 'Stripe'],
  [/supabase/i, 'Supabase'],
  [/postgres|postgresChat/i, 'Postgres'],
  [/mysql/i, 'MySQL'],
  [/mongoDb/i, 'MongoDB'],
  [/redis/i, 'Redis'],
  [/httpRequest/i, 'HTTP'],
  [/webhook/i, 'Webhook'],
  [/scheduleTrigger|cron/i, 'Schedule'],
  [/openAi|lmChatOpenAi|embeddingsOpenAi/i, 'OpenAI'],
  [/lmChatGoogleGemini|googleGemini|embeddingsGoogleGemini/i, 'Google Gemini'],
  [/anthropic|lmChatAnthropic/i, 'Anthropic'],
  [/lmChatOllama|ollama/i, 'Ollama'],
  [/agent/i, 'AI Agent'],
  [/vectorStore|pinecone|qdrant|weaviate/i, 'Vector Store'],
  [/telegram/i, 'Telegram'],
  [/discord/i, 'Discord'],
  [/twilio/i, 'Twilio'],
  [/shopify/i, 'Shopify'],
  [/wordpress/i, 'WordPress'],
  [/linkedin/i, 'LinkedIn'],
  [/twitter|x\.com|tweet/i, 'X / Twitter'],
  [/clickUp/i, 'ClickUp'],
  [/asana/i, 'Asana'],
  [/jira/i, 'Jira'],
  [/zendesk/i, 'Zendesk'],
  [/intercom/i, 'Intercom'],
  [/calendly/i, 'Calendly'],
  [/typeform/i, 'Typeform'],
  [/dropbox/i, 'Dropbox'],
  [/box/i, 'Box'],
  [/s3|aws/i, 'AWS'],
  [/firebase/i, 'Firebase'],
  [/graphql/i, 'GraphQL'],
  [/rssFeedRead/i, 'RSS'],
  [/htmlExtract|cheerio/i, 'Web Scraping'],
  [/executeWorkflow/i, 'Sub-workflow'],
  [/code|function/i, 'Code'],
  [/spreadsheetFile/i, 'Spreadsheets'],
  [/pdf/i, 'PDF'],
  [/openai/i, 'OpenAI'],
];

const SKIP_NODE_TYPES = [
  /stickyNote/i,
  /^n8n-nodes-base\.noOp$/i,
  /^n8n-nodes-base\.manualTrigger$/i,
  /^n8n-nodes-base\.set$/i,
  /^n8n-nodes-base\.if$/i,
  /^n8n-nodes-base\.switch$/i,
  /^n8n-nodes-base\.merge$/i,
  /^n8n-nodes-base\.splitInBatches$/i,
  /^n8n-nodes-base\.splitOut$/i,
  /^n8n-nodes-base\.aggregate$/i,
  /^n8n-nodes-base\.filter$/i,
  /^n8n-nodes-base\.wait$/i,
  /^n8n-nodes-base\.limit$/i,
  /^n8n-nodes-base\.removeDuplicates$/i,
  /^n8n-nodes-base\.sort$/i,
  /^n8n-nodes-base\.dateTime$/i,
  /^n8n-nodes-base\.itemLists$/i,
  /^n8n-nodes-base\.respondToWebhook$/i,
  /^n8n-nodes-base\.executeWorkflowTrigger$/i,
];

const TRIGGER_PATTERNS = [
  { match: /chatTrigger|chat\.|webhook.*chat/i, type: 'chat' },
  { match: /webhook/i, type: 'webhook' },
  { match: /scheduleTrigger|cron/i, type: 'scheduled' },
  { match: /executeWorkflowTrigger/i, type: 'sub-workflow' },
  { match: /formTrigger|form\.io|typeformTrigger/i, type: 'webhook' },
  { match: /manualTrigger/i, type: 'manual' },
  { match: /emailReadImap|gmailTrigger|microsoftOutlookTrigger/i, type: 'webhook' },
];

export function slugifyName(name) {
  return String(name || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 80) || 'workflow';
}

export function parseWorkflowJson(raw) {
  if (!raw || typeof raw !== 'string') {
    return { ok: false, nodeCount: 0, triggerType: null, integrations: [] };
  }
  let wf;
  try {
    wf = JSON.parse(raw);
  } catch {
    return { ok: false, nodeCount: 0, triggerType: null, integrations: [] };
  }
  const nodes = Array.isArray(wf?.nodes) ? wf.nodes : [];
  const countable = nodes.filter((n) => {
    const t = String(n?.type || '');
    return t && !SKIP_NODE_TYPES.some((re) => re.test(t));
  });

  let triggerType = null;
  for (const n of nodes) {
    const t = String(n?.type || '');
    for (const { match, type } of TRIGGER_PATTERNS) {
      if (match.test(t)) {
        triggerType = type;
        break;
      }
    }
    if (triggerType) break;
  }
  if (!triggerType && nodes.length) triggerType = 'manual';

  const integrations = [];
  const seen = new Set();
  for (const n of nodes) {
    const t = String(n?.type || '');
    if (!t || SKIP_NODE_TYPES.some((re) => re.test(t))) continue;
    for (const [re, label] of NODE_INTEGRATION_MAP) {
      if (re.test(t)) {
        const key = label.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          integrations.push(label);
        }
        break;
      }
    }
  }

  // Cap integrations for bundle size / UI
  return {
    ok: true,
    nodeCount: countable.length,
    triggerType,
    integrations: integrations.slice(0, 12),
  };
}

const CATEGORY_HOUR_BASE = {
  marketing: 3.5,
  operations: 4,
  sales: 3,
  'customer-service': 4.5,
  finance: 3.5,
  leadership: 2,
  hr: 2.5,
};

const TRIGGER_MULTIPLIER = {
  scheduled: 1.35,
  webhook: 1.25,
  chat: 1.2,
  'sub-workflow': 0.85,
  manual: 0.7,
};

/**
 * Conservative hours-saved-per-week estimate.
 * Deterministic from category + parsed workflow shape.
 */
export function estimateHoursPerWeek({ category, nodeCount, integrations, triggerType, tags }) {
  const base = CATEGORY_HOUR_BASE[category] ?? 3;
  const nodes = Number(nodeCount) || 0;
  const integ = Array.isArray(integrations) ? integrations.length : 0;
  const nodeBoost = Math.min(nodes / 8, 4); // +0–4 hrs
  const integBoost = Math.min(integ * 0.35, 2.5);
  const tagBoost = Array.isArray(tags) && tags.some((t) => /rag|agent|ai|chatbot/i.test(t))
    ? 0.75
    : 0;
  const mult = TRIGGER_MULTIPLIER[triggerType] ?? 1;
  const raw = (base + nodeBoost + integBoost + tagBoost) * mult;
  // Clamp to a credible business range; round to 0.5
  const clamped = Math.min(18, Math.max(1, raw));
  return Math.round(clamped * 2) / 2;
}

export function estimateDepartments({ category, tags }) {
  const depts = new Set();
  const primary = CATEGORY_TO_DEPARTMENT[category];
  if (primary) depts.add(primary);

  const tagStr = (Array.isArray(tags) ? tags : []).join(' ').toLowerCase();
  if (/crm|lead|sales|proposal|estimat|pipeline|hubspot|salesforce/.test(tagStr)) {
    depts.add('Sales');
  }
  if (/content|seo|social|linkedin|marketing|campaign|newsletter/.test(tagStr)) {
    depts.add('Marketing');
  }
  if (/ticket|support|customer|faq|zendesk|intercom|chatbot/.test(tagStr)) {
    depts.add('Customer Service');
  }
  if (/invoice|expense|accounting|finance|stripe|payroll/.test(tagStr)) {
    depts.add('Finance');
  }
  if (/hr|onboard|people|recruit|employee/.test(tagStr)) {
    depts.add('HR');
  }
  if (/kpi|executive|digest|leadership|report/.test(tagStr)) {
    depts.add('Leadership');
  }
  if (/ops|sync|airtable|notion|slack|internal/.test(tagStr)) {
    depts.add('Operations');
  }

  // Keep 1–3 departments max for credibility
  const ordered = DEPARTMENT_OPTIONS.filter((d) => depts.has(d));
  if (ordered.length === 0) return primary ? [primary] : ['Operations'];
  return ordered.slice(0, 3);
}

/**
 * Score related workflows: shared integrations + tags + same category.
 */
export function scoreRelated(a, b) {
  if (a.slug === b.slug) return -1;
  let score = 0;
  if (a.category === b.category) score += 3;
  const aTags = new Set((a.tags || []).map((t) => t.toLowerCase()));
  for (const t of b.tags || []) {
    if (aTags.has(String(t).toLowerCase())) score += 2;
  }
  const aInt = new Set((a.integrations || []).map((t) => t.toLowerCase()));
  for (const t of b.integrations || []) {
    if (aInt.has(String(t).toLowerCase())) score += 2.5;
  }
  if (a.triggerType && a.triggerType === b.triggerType) score += 1;
  return score;
}

export function pickRelated(entry, all, limit = 4) {
  return all
    .map((other) => ({ other, score: scoreRelated(entry, other) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.other.name.localeCompare(b.other.name))
    .slice(0, limit)
    .map((x) => x.other.slug);
}
