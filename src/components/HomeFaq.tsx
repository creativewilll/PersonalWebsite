import React from 'react';
import { Link } from 'react-router-dom';

/** Visible FAQ and FAQPage JSON-LD must use these exact Q/A strings. */
export const HOME_FAQS: { question: string; answer: string }[] = [
  {
    question: 'What is AI Visibility?',
    answer:
      'AI Visibility is the discipline of engineering your digital presence so ChatGPT, Google AI Overviews, Perplexity, Claude, and Gemini can discover, understand, and recommend your brand.',
  },
  {
    question: 'How is AI Visibility different from traditional SEO?',
    answer:
      'Traditional SEO asked how to rank on page 1. AI Visibility asks how to become the answer AI gives. Read AI Visibility vs traditional SEO and AIO vs traditional SEO.',
  },
  {
    question: 'What are AIO, AEO, and GEO?',
    answer:
      'AIO (AI Optimization) structures a site so AI crawlers can parse and index it. AEO (Answer Engine Optimization) makes content the definitive answer AI cites. GEO (Generative Engine Optimization) optimizes for generative search engines. See FAQ schema for AEO.',
  },
  {
    question: 'Who should hire Will Spurlock for AI Visibility?',
    answer:
      'Small businesses, blue-collar trades, cannabis brands, music artists, and forward-thinking companies who want custom-coded React sites and AI agents so ChatGPT, Perplexity, and Google AI Overviews can cite their brand.',
  },
  {
    question: 'How do ChatGPT, Perplexity, and Google AI Overviews find a brand?',
    answer:
      'They find brands through structured schema, clean semantic HTML, and pre-rendered content. Sites without those are invisible to generative engines.',
  },
];

const FAQ_LINKS: { phrase: string; to: string }[] = [
  {
    phrase: 'AI Visibility vs traditional SEO',
    to: '/blog/ai-visibility-vs-traditional-seo-what-to-keep-drop-and-add-in-2026',
  },
  {
    phrase: 'AIO vs traditional SEO',
    to: '/blog/what-is-the-difference-between-aio-and-traditional-seo',
  },
  {
    phrase: 'FAQ schema for AEO',
    to: '/blog/faq-schema-and-aeo-the-highest-leverage-move-for-ai-citation',
  },
];

function LinkedAnswer({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliest = -1;
    let match: (typeof FAQ_LINKS)[number] | null = null;
    for (const link of FAQ_LINKS) {
      const idx = remaining.indexOf(link.phrase);
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx;
        match = link;
      }
    }
    if (!match || earliest === -1) {
      parts.push(remaining);
      break;
    }
    if (earliest > 0) {
      parts.push(remaining.slice(0, earliest));
    }
    parts.push(
      <Link
        key={key++}
        to={match.to}
        className="underline underline-offset-2 text-[#9333EA] hover:text-[#7e22ce]"
      >
        {match.phrase}
      </Link>
    );
    remaining = remaining.slice(earliest + match.phrase.length);
  }

  return <>{parts}</>;
}

export function HomeFaq() {
  return (
    <section
      id="home-faq"
      aria-label="Frequently asked questions"
      className="relative py-16 sm:py-24"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#FFB800] mb-6">
          What do people ask about AI Visibility?
        </h2>
        {HOME_FAQS.map((faq) => (
          <div key={faq.question} className="p-6 bg-white/50 rounded-xl border border-[#9333EA]/15">
            <h3 className="text-base font-bold text-[#9333EA] mb-2">{faq.question}</h3>
            <p className="text-[#9333EA]/80 text-sm md:text-base">
              <LinkedAnswer text={faq.answer} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
