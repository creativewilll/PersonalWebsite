import React from "react";
import { motion } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import { Eyebrow, Button } from "../components/ui";
import { useMusicActions } from "../lib/musicActions";

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

const LIVE_PREVIEW_URL = "https://jpfuller.netlify.app";

export const DeepDiveWebsite = () => {
  const { openContactForm } = useMusicActions();

  return (
    <section className="py-24 sm:py-32 bg-[var(--color-surface-2)] border-t border-[var(--color-border)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[var(--color-primary)]/5 rounded-full blur-[60px] lg:blur-[150px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 auto-rows-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 lg:order-1 relative perspective-1000"
          >
            <a
              href={LIVE_PREVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-[0_0_50px_rgba(255,42,95,0.15)] bg-[var(--color-surface-dynamic)] border border-[var(--color-border)] group cursor-pointer"
            >
              <img
                src="/music/jpfuller-preview.webp"
                alt="Fuller official music website preview: Los Angeles indie rock artist JP Welsh — hero with Listen Now and Tour Dates, navigation, and Lowlife album artwork (live site screenshot)."
                loading="lazy"
                decoding="async"
                width={1024}
                height={519}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold shadow-[0_0_20px_rgba(255,42,95,0.4)]">
                  <ExternalLink size={14} />
                  View Live Site
                </span>
              </div>
              <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg)]/80 backdrop-blur-md border border-[var(--color-border)] text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Preview
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-1 lg:order-2 flex flex-col"
          >
            <Eyebrow>The Centerpiece</Eyebrow>
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] text-[var(--color-text)] mb-10">
              A website built for music, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] font-bold">not borrowed from a clothing brand.</span>
            </h2>

            <ul className="space-y-3 sm:space-y-4 mb-10">
              {features.map((feature, i) => (
                <li 
                  key={i}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="mt-1 min-w-5 h-5 sm:min-w-6 sm:h-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <div>
              <Button onClick={openContactForm} className="w-full sm:w-auto">
                Get a Website Like This <span className="ml-2 font-normal text-xl leading-none">→</span>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
