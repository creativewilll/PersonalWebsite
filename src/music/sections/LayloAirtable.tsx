import React from "react";
import { motion } from "framer-motion";
import { Eyebrow } from "../components/ui";

export const LayloAirtable = () => {
  return (
    <section className="py-24 sm:py-32 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-16 text-center">
          <Eyebrow>Your Command Center</Eyebrow>
          <h2 className="font-display font-bold text-4xl sm:text-5xl leading-tight text-[var(--color-text)] mb-4">
            Fan engagement meets <br className="hidden sm:block" />
            <span className="text-[var(--color-primary)]">business intelligence.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Laylo Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[var(--color-surface-2)] p-8 sm:p-12 rounded-3xl border border-[var(--color-border)] relative overflow-hidden group"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="mb-8 w-12 h-12 flex items-center justify-center">
               <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-4">Drop Platform Integration</h3>
            <p className="text-[var(--color-text-muted)] text-base leading-relaxed mb-8">
              Laylo is the CRM and drop platform trusted by 175,000+ artists. We integrate it directly into your website — embedded signup forms, automated SMS + email drops when new music or merch releases, RSVP flows for shows, superfan detection, and retargeting pixel setup for Facebook, Google, and TikTok ads.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {["Fan RSVPs", "SMS Drops", "Email Automation", "Superfan CRM", "Retargeting Pixels", "Spotify Pre-Save"].map((pill, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 + (i * 0.05) }}
                  className="px-3 py-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] opacity-90 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
                >
                  {pill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Airtable Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[var(--color-surface-2)] p-8 sm:p-12 rounded-3xl border border-[var(--color-border)] relative overflow-hidden group"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00E5FF]/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
             
            <div className="mb-8 w-12 h-12 flex items-center justify-center">
              <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-blue-400">
                <title>Airtable</title>
                <path d="M14.472 8.79a1.056 1.056 0 100-2.112 1.056 1.056 0 000 2.113zm-2.062 1.25H6.28a.5.5 0 00-.5.5v3.31A3.208 3.208 0 008.988 17h3.42a.5.5 0 00.5-.5v-6.46zm1.25.04v6.42a.5.5 0 00.5.5h3.358A3.207 3.207 0 0020.72 13.8V10.54a.5.5 0 00-.5-.5h-6.56zM8.987 7A3.208 3.208 0 005.78 10.21V13h6.63V7.5a.5.5 0 00-.5-.5h-2.92zM15 17h2.511A3.208 3.208 0 0020.72 13.79V17h-.002A3.208 3.208 0 0117.51 20.21H15a.5.5 0 01-.5-.5v-2.21a.5.5 0 01.5-.5z"/>
              </svg>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-4">Your Artist Dashboard</h3>
            <p className="text-[var(--color-text-muted)] text-base leading-relaxed mb-8">
              We build you a clean, branded Airtable base that aggregates your most important business data. See website traffic, merch revenue, email list growth, SEO keyword rankings, and Laylo fan data — all in one interface. No more logging into 6 different platforms.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {["Unified Metrics", "Merch Sales Tracking", "Fan Growth Charts", "SEO Rankings", "Traffic Analytics", "Revenue Overview"].map((pill, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 + (i * 0.05) }}
                  className="px-3 py-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)]/90 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
                >
                  {pill}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
