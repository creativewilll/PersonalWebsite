import React from "react";
import { motion } from "framer-motion";
import { Eyebrow } from "../components/ui";

export const Solution = () => {
  return (
    <section className="py-32 sm:py-48 bg-[var(--color-bg)] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--color-surface)] via-transparent to-[var(--color-surface)]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-primary)]/5 rounded-full blur-[60px] lg:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-secondary)]/5 rounded-full blur-[60px] lg:blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[800px] w-full flex flex-col lg:items-start lg:text-left items-center text-center">
        <Eyebrow>Introducing</Eyebrow>
        
        <h2 className="font-display font-black text-[clamp(2rem,1rem+3vw,3.5rem)] leading-[1.1] tracking-tight mb-8 text-[var(--color-text)] max-w-[800px]">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            What does one agency handle for independent artists?
          </motion.div>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-[55ch] mb-12 font-body"
        >
          While other artists are duct-taping together Shopify + Linktree + DistroKid + a random Fiverr SEO guy, you'll have a complete system designed specifically for music artists — built, managed, and grown by one team.
        </motion.p>

        <motion.a
          href="#pricing"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="group inline-flex items-center text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors border-b-2 border-transparent hover:border-[var(--color-primary)] pb-1"
        >
          Start the Conversation
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform text-2xl leading-none">→</span>
        </motion.a>
      </div>
    </section>
  );
};
