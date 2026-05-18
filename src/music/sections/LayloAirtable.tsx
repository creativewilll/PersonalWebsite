import React from "react";
import { motion } from "framer-motion";
import { Eyebrow } from "../components/ui";
import { LayoutDashboard } from "lucide-react";

export const LayloAirtable = () => {
  return (
    <section className="py-24 sm:py-32 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-16 text-center">
          <Eyebrow>Your Command Center</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight text-[var(--color-text)] mb-4">
            Fan engagement meets <br className="hidden sm:block" />
            <span className="text-[var(--color-primary)]">business intelligence.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Laylo Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[var(--color-surface-2)] p-6 sm:p-8 lg:p-12 rounded-3xl border border-[var(--color-border)] relative overflow-hidden group"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-[40px] lg:blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="mb-8 w-12 h-12 flex items-center justify-center">
               <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
            
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-text)] mb-4">Drop Platform Integration</h3>
            <p className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed mb-8">
              Laylo is the CRM and drop platform trusted by 175,000+ artists. We integrate it directly into your website — embedded signup forms, automated SMS + email drops when new music or merch releases, RSVP flows for shows, superfan detection, and retargeting pixel setup for Facebook, Google, and TikTok ads.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {["Fan RSVPs", "SMS Drops", "Email Automation", "Superfan CRM", "Retargeting Pixels", "Spotify Pre-Save"].map((pill, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] opacity-90 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Artist Web Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[var(--color-surface-2)] p-6 sm:p-8 lg:p-12 rounded-3xl border border-[var(--color-border)] relative overflow-hidden group"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00E5FF]/10 rounded-full blur-[40px] lg:blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
             
            <div className="mb-8 w-12 h-12 flex items-center justify-center text-[var(--color-text)] group-hover:text-[var(--color-secondary)] transition-colors">
              <LayoutDashboard size={40} strokeWidth={1.5} />
            </div>
            
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-text)] mb-4">Your Artist Web Dashboard</h3>
            <p className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed mb-8">
              We build you a clean, branded web dashboard that aggregates your most important business data. See website traffic, merch revenue, email list growth, SEO keyword rankings, and Laylo fan data — all in one interface. No more logging into 6 different platforms.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {["Unified Metrics", "Merch Sales Tracking", "Fan Growth Charts", "SEO Rankings", "Traffic Analytics", "Revenue Overview"].map((pill, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)]/90 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
