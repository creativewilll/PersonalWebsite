import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Eyebrow, Button } from "../components/ui";

const features = [
  "Custom design — zero templates",
  "Mobile-first, Core Web Vitals optimized (LCP < 2s)",
  "Built-in music player (stream your latest directly on-site)",
  "Tour dates + event listings",
  "Merch store with product photography guidelines",
  "Spotify pre-save + follow integration",
  "Press/EPK page built in",
  "Social media link hub (replaces Linktree)",
  "Artist bio optimized for AI search engines",
  "Schema.org structured data for music, person, and product",
  "Open Graph + Twitter Card meta tags",
  "SSL, fast hosting compatible (deploy-ready for Netlify or Vercel)"
];

export const DeepDiveWebsite = () => {
  return (
    <section className="py-24 sm:py-32 bg-[var(--color-surface-2)] border-t border-[var(--color-border)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[var(--color-primary)]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 auto-rows-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 lg:order-1 relative perspective-1000"
          >
            {/* Abstract laptop/phone mockup placeholder */}
            <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(255,42,95,0.15)] bg-[var(--color-surface-dynamic)] backdrop-blur-xl border border-[var(--color-border)] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-surface)] to-[var(--color-surface-2)] opacity-80" />
              <div 
                className="absolute inset-[2px] rounded-[2rem] bg-cover bg-center mix-blend-luminosity opacity-30 group-hover:opacity-40 transition-opacity duration-500" 
                style={{ backgroundImage: 'url("https://picsum.photos/seed/darkmockup/800/600")' }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-surface-2)] to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[70%] bg-[var(--color-surface)]/80 backdrop-blur-md border border-[var(--color-primary)]/20 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden transform -rotate-2 scale-100 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-105">
                  <div className="h-6 bg-[var(--color-surface-dynamic)] border-b border-[var(--color-border)] flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_5px_rgba(244,63,94,0.5)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-transparent to-[var(--color-primary)]/5 p-6 flex flex-col gap-4">
                    <div className="w-1/3 h-5 bg-[var(--color-surface-dynamic)] rounded-md" />
                    <div className="w-full h-32 bg-[var(--color-surface-dynamic)] rounded-lg mt-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-text)] opacity-40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-1 lg:order-2 flex flex-col"
          >
            <Eyebrow>The Centerpiece</Eyebrow>
            <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[var(--color-text)] mb-10">
              A website built for music, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] font-bold">not borrowed from a clothing brand.</span>
            </h2>

            <ul className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 min-w-6 h-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-[var(--color-text-muted)] text-base leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div>
              <Button variant="ghost" className="px-0 hover:bg-transparent text-[var(--color-text)] border-b-2 border-[var(--color-primary)] rounded-none h-auto pb-1 text-xl flex items-center gap-2 group hover:text-[var(--color-primary)]">
                See Sample Sites <span className="transform group-hover:translate-x-2 transition-transform">→</span>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
