import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ShieldCheck } from "lucide-react";
import { useMusicActions } from "../lib/musicActions";

export const Guarantee = () => {
  const { openCalendly } = useMusicActions();
  return (
    <section className="py-24 sm:py-32 bg-[var(--color-surface)] border-y border-[var(--color-border)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)]/5 to-transparent pointer-events-none" />

      <div className="max-w-[700px] mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto w-24 h-24 mb-10 text-[var(--color-primary)] relative"
        >
          <div className="absolute inset-0 bg-[var(--color-primary)]/20 rounded-full blur-[20px]" />
          <ShieldCheck size={96} strokeWidth={1.5} className="relative z-10 drop-shadow-[0_0_15px_rgba(255,42,95,0.8)]" />
        </motion.div>

        <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[var(--color-text)] mb-8">
          My Promise to You.
        </h2>

        <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-12 font-body max-w-[600px] mx-auto">
          I don't believe in locking artists into services they're unhappy with. If you're not satisfied with your delivered website after your first revision round, I'll revise again — no questions, no fees, no drama.
          <br /><br />
          I'm not building disposable projects. I'm building long-term partnerships with artists who are serious about their digital career. My reputation lives and dies with your results.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-16">
          {["2 Revision Rounds Included", "Clear Scope — No Surprise Fees", "Real Humans, Not Tickets"].map((pill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[var(--color-surface-dynamic)] border border-[var(--color-border)] px-6 py-3 rounded-full text-[var(--color-text)] text-sm font-medium shadow-sm backdrop-blur-md"
            >
              {pill}
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={openCalendly}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-[var(--color-primary)] font-bold text-xl hover:text-[var(--color-primary-hover)] transition-colors group inline-flex items-center drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]"
        >
          I'm Ready — Let's Start 
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform text-2xl leading-none">→</span>
        </motion.button>
      </div>
    </section>
  );
};

const faqs = [
  {
    q: "I already have a Shopify store. Can you migrate it?",
    a: "Yes. I audit your current store, migrate your products, and rebuild the store inside a custom artist website. Your customers won't lose order history and your SEO equity won't be lost."
  },
  {
    q: "What's the difference between AEO, AIO, and SEO? Do I need all three?",
    a: "SEO (Search Engine Optimization) is about ranking on Google's traditional search results. AEO (Answer Engine Optimization) is about appearing in featured snippets, voice search answers, and being cited by ChatGPT and Perplexity. AIO (AI Overview Optimization) is about being cited by Google's AI-generated answer summaries at the top of results. In 2026, all three work together — and no other music website service optimizes for all three."
  },
  {
    q: "How long does the full build take?",
    a: "Foundation sites: 2–3 weeks. Full Stack builds: 4–6 weeks. Premium Growth: 6–8 weeks. These timelines assume you provide assets (photos, music, existing brand elements) within 3 business days of signing."
  },
  {
    q: "Do I need to know anything technical?",
    a: "Zero. I handle everything. You'll get a simple web dashboard that shows you your numbers, a brief Laylo walkthrough for dropping music yourself, and a plain-English monthly report. No coding required, ever."
  },
  {
    q: "Can I sell digital downloads as well as physical merch?",
    a: "Yes. Your store supports physical products (with fulfillment), digital downloads, and even tickets to live shows — all processed through Stripe or PayPal."
  },
  {
    q: "How does the Laylo integration actually work on my site?",
    a: "I embed a Laylo signup form on your website and set up automated drop campaigns. When you're ready to release new music, a merch drop, or announce a show, I help you trigger a Laylo notification to your fan list — SMS, email, or both. Fans sign up directly on your website and become yours, not a platform's."
  },
  {
    q: "What if I need to update my website after launch?",
    a: "That depends on your plan. All plans include a post-launch support window. Monthly management plans include ongoing updates as part of the retainer. One-time updates outside of your plan are billed at a flat hourly rate (no surprises — I send an estimate first)."
  },
  {
    q: "I'm not signed to a label — is this service for independent artists?",
    a: "This service was built for independent artists. You don't need a label, a manager, or a big budget. You need a great digital presence. That's what I build."
  },
  {
    q: "Do you help with music distribution (Spotify, Apple Music, etc.)?",
    a: "I don't replace DistroKid or TuneCore for music distribution — that's not my focus. What I do is optimize your website, bio, and schema data to ensure that when your music is found on streaming platforms, the search engine trail leads back to your owned digital home."
  },
  {
    q: "Can I see examples of your work before committing?",
    a: "Yes. Book a free discovery call and I'll walk you through a portfolio of recent artist builds — including before/after SEO data, site designs, and custom dashboards I've built."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[var(--color-bg)]">
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[var(--color-text)] mb-16 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-[var(--color-surface-dynamic)] backdrop-blur-sm border border-[var(--color-border)] rounded-2xl overflow-hidden hover:bg-[var(--color-surface-dynamic)] transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-body font-medium text-lg text-[var(--color-text)] pr-8">{faq.q}</span>
                  <div className={`text-[var(--color-primary)] transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    <Plus size={24} />
                  </div>
                </button>
                <div 
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <div className="p-6 sm:p-8 pt-0 text-[var(--color-text-muted)] leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
