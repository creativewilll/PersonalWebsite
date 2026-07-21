import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { AutomationsSnapshot } from '../../data/automationsData';

interface PatternsSectionProps {
  snapshot: AutomationsSnapshot | null;
}

function tagCount(snapshot: AutomationsSnapshot | null, tag: string): number {
  if (!snapshot) return 0;
  return snapshot.topTags.find((t) => t.tag === tag)?.count ?? 0;
}

export function PatternsSection({ snapshot }: PatternsSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const patterns = useMemo(() => {
    const rag = tagCount(snapshot, 'RAG');
    const multiAgent = tagCount(snapshot, 'Multi-Agent Chain');
    const scraping = tagCount(snapshot, 'Web Scraping');
    const webhook = tagCount(snapshot, 'Webhook Trigger');
    const chatbot = tagCount(snapshot, 'Chatbot');
    const dataXform = tagCount(snapshot, 'Data Transformation');

    return [
      {
        title: 'RAG pipelines',
        body: `${rag} workflows in this library are tagged RAG. They retrieve from a knowledge base, ground an LLM answer in your documents, then write the result back to a CRM, ticket, or chat. Use this when support, sales, or ops needs answers that match your actual policies — not generic model guesswork.`,
      },
      {
        title: 'Multi-agent chains',
        body: `${multiAgent} builds use multi-agent chains: one agent researches, another drafts, another validates or routes. That split keeps each step inspectable and reduces single-prompt failure modes. Reach for it when a task has clear sub-roles — research, writing, scoring — that should not live in one opaque call.`,
      },
      {
        title: 'Web scraping and enrichment',
        body: `${scraping} workflows scrape public pages or APIs, then enrich leads, competitor data, or content sources before landing in Airtable, Sheets, or a CRM. Businesses need this when growth depends on fresh external data and the team is stuck doing the same copy-paste ritual every week.`,
      },
      {
        title: 'Webhook-driven integrations',
        body: `${webhook} automations start from a webhook — form submit, Stripe event, CRM update, custom app ping — and fan out to the rest of the stack. This is the default when you want near-real-time handoffs between tools without polling or manual exports.`,
      },
      {
        title: 'Chatbots and assistants',
        body: `${chatbot} workflows are tagged Chatbot. They cover intake bots, internal assistants, and customer-facing Q&A that log context and escalate when confidence drops. Fit this when volume is high enough that humans should only touch exceptions.`,
      },
      {
        title: 'Data transformation layers',
        body: `${dataXform} workflows carry a Data Transformation tag — mapping fields, normalizing IDs, merging records, and shaping payloads between systems. Almost every reliable automation library needs this middle layer; without it, integrations break the first time a schema drifts.`,
      },
    ];
  }, [snapshot]);

  return (
    <section
      ref={ref}
      className="mb-14 sm:mb-20 px-4"
      aria-labelledby="patterns-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="text-center mb-8"
      >
        <h2
          id="patterns-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 mb-3"
        >
          How These Systems Are Built
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Recurring architecture patterns across the library — with tag counts from the live snapshot.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {patterns.map((pattern, i) => (
          <motion.article
            key={pattern.title}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08 + i * 0.06 }}
            className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              {pattern.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {pattern.body}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
