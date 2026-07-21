export interface FaqItem {
  question: string;
  answer: string;
}

export const AUTOMATION_LIBRARY_FAQS: FaqItem[] = [
  {
    question: 'How many automations has William Spurlock built?',
    answer:
      'This library catalogs 479 production n8n automations shipped for real clients between February 2025 and May 2026, spanning marketing, operations, sales, customer service, finance, leadership, and HR. Flagship case studies on this page go deeper on architecture and outcomes for selected builds.',
  },
  {
    question: 'What is an n8n automation library?',
    answer:
      'An n8n automation library is a portfolio of workflows that connect apps, APIs, databases, and AI models to run business processes without manual handoffs. Each entry here is a shipped workflow — not a template catalog — with a brief describing what it does, how it is categorized, and when it was built.',
  },
  {
    question: 'What kinds of business processes can be automated with n8n?',
    answer:
      'Common fits include lead capture and enrichment, proposal and estimate generation, content and SEO pipelines, CRM updates, ticket triage, invoice and expense flows, web scraping with enrichment, RAG knowledge assistants, multi-agent research chains, and webhook-driven integrations between the tools a team already uses.',
  },
  {
    question: 'How much does a custom n8n automation cost?',
    answer:
      'Engagements are scoped to complexity, integrations, and whether you need a single workflow or a connected system. Focused builds often land in the low-to-mid four figures; multi-workflow libraries, agent systems, and ongoing iteration typically move into five-figure project or retainer ranges. A short discovery call pins scope before any quote.',
  },
  {
    question: 'What stack do these automations run on?',
    answer:
      'Most workflows run on n8n (self-hosted or cloud) and connect to tools like Airtable, Google Workspace, OpenAI and other LLM APIs, CRMs, form providers, and custom webhooks. Many include RAG retrieval, multi-agent chains, scraping, or chatbot interfaces depending on the job.',
  },
  {
    question: 'How do I hire William Spurlock for automation work?',
    answer:
      'Start from the contact form on the home page or email creativelywill@gmail.com with the process you want automated, the tools involved, and any volume or SLA constraints. Share whether you need a one-off workflow, a multi-system library, or an ongoing automation partnership — that context shapes the first call.',
  },
];
