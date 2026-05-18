import React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui";
import { useMusicActions } from "../lib/musicActions";

export const FinalCTA = () => {
  const { openCalendly } = useMusicActions();
  return (
    <section id="book" className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)] py-20">
      {/* Background  */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[100dvh] bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg)] opacity-90 z-10" />
        {/* Spotlight effect */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80dvw] h-[150dvh] bg-gradient-to-b from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 rounded-[100%] blur-[60px] lg:blur-[120px] mix-blend-screen opacity-60 spotlight-pan" />
      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes spotlight-pan {
          0%, 100% { transform: translateX(-50%) rotate(-5deg); }
          50% { transform: translateX(-50%) rotate(5deg); }
        }
        .spotlight-pan { animation: spotlight-pan 15s ease-in-out infinite; transform-origin: top center; }
        @media (max-width: 1023px) {
          .spotlight-pan { animation: none; transform: translateX(-50%); }
        }
      `}}/>

      <div className="relative z-20 max-w-[800px] mx-auto px-4 sm:px-6 text-center flex flex-col items-center h-full justify-center mt-6 sm:mt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-8 px-6 py-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,42,95,0.15)] inline-block"
        >
          Your Next Move
        </motion.div>
        
        <h2 className="font-display font-black text-[clamp(2.5rem,5vw,6rem)] leading-[0.95] tracking-tight mb-8 text-[var(--color-text)] w-full">
          <motion.div initial={{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{once: true}} transition={{duration: 0.6}}>Stop watching</motion.div>
          <motion.div initial={{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{once: true}} transition={{duration: 0.6, delay: 0.1}}>other artists</motion.div>
          <motion.div initial={{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{once: true}} transition={{duration: 0.6, delay: 0.2}} className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] pb-2">get discovered first.</motion.div>
        </h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-[var(--color-text-muted)] max-w-[55ch] mb-12"
        >
          The artists who win online aren't necessarily the most talented. They're the ones with a website that works, a store that converts, and an SEO strategy that makes them impossible to ignore.
          <br /><br />
          <span className="text-[var(--color-text)] font-bold">That could be you. Starting this week.</span>
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.6 }}
           className="w-full flex justify-center flex-col items-center"
        >
          <Button onClick={openCalendly} className="h-16 px-10 text-lg w-full max-w-[400px] mb-6 animate-pulse-border text-white shadow-[0_0_30px_rgba(0,229,255,0.3)]">
            Book My Free Strategy Call <span className="ml-2 font-normal text-2xl leading-none">→</span>
          </Button>
          <p className="text-sm text-[var(--color-text-faint)] transition-colors cursor-pointer hover:text-[var(--color-text)]">
            No commitment. 45 minutes. Walk away with a custom roadmap.
          </p>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 1 }}
           className="mt-16 sm:mt-auto pt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-[var(--color-text-muted)] font-medium"
        >
          <span className="flex items-center gap-2"><span className="text-[var(--color-primary)]">🔒</span> No contract required for initial call</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span className="flex items-center gap-2"><span className="text-[var(--color-primary)]">📍</span> Based in Detroit, MI</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span className="flex items-center gap-2"><span className="text-[var(--color-primary)]">⭐</span> Trusted by independent artists nationwide</span>
        </motion.div>
      </div>
    </section>
  );
};
