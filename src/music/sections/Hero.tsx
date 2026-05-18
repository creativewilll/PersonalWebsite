import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../components/ui";
import { useMusicActions, scrollToSection } from "../lib/musicActions";

export const Hero = () => {
  const { openContactForm } = useMusicActions();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Background with animated gradient mesh */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 bg-[var(--color-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))]" />
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/music/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/40 via-transparent to-[var(--color-bg)]/80" />
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[var(--color-secondary)]/20 rounded-full blur-[120px] animate-pulse-border" style={{ animationDuration: "10s" }} />
        <div className="absolute bottom-10 right-1/4 w-[35vw] h-[35vw] bg-[var(--color-primary)]/15 rounded-full blur-[150px] animate-pulse-border" style={{ animationDuration: "15s" }} />
      </motion.div>
      
      <div className="noise-overlay" />

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center mt-6 sm:mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-8 border border-[var(--color-primary)]/30 px-6 py-2.5 rounded-full bg-[var(--color-primary)]/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,42,95,0.1)]"
        >
          <span className="relative flex h-2 w-2 inline-flex mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
          </span>
          Done-For-You • Full Stack • AEO/SEO/AIO Optimized
        </motion.div>

        <h1 className="font-display font-black text-[clamp(2rem,5.5vw,7.5rem)] leading-[0.95] tracking-tight mb-6 sm:mb-8 text-[var(--color-text)] relative z-10 w-full">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              Your Music Deserves
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              a Website That
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-4">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-tertiary)]"
            >
              Actually Works.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-base sm:text-lg lg:text-xl text-[var(--color-text-muted)] max-w-[70ch] mb-12 font-body"
        >
          Custom artist websites, merch stores with print & fulfillment, Stripe + PayPal checkout, Laylo fan drops, and AI-powered SEO that gets you cited by ChatGPT, Gemini, and Google AI Overviews — so you can focus on the <span className="text-[var(--color-text)] font-medium">music</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full justify-center"
        >
          <Button onClick={openContactForm} className="w-full sm:w-auto h-14 sm:h-auto whitespace-nowrap">Get My Full Stack Setup <span className="ml-2 font-normal text-xl leading-none">→</span></Button>
          <Button onClick={() => scrollToSection("whats-included")} variant="outline" className="w-full sm:w-auto h-14 sm:h-auto whitespace-nowrap border-[var(--color-border)] hover:border-[var(--color-primary)]">See What's Included <span className="ml-2 font-normal text-xl leading-none">↓</span></Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col items-center gap-2 mt-auto"
        >
          <div className="flex text-[var(--color-primary)] text-sm mb-1 gap-1 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
            Trusted by independent artists across hip-hop, pop, R&B, and indie<br/>
            <span className="text-[var(--color-text-faint)] normal-case tracking-normal font-normal mt-1 flex justify-center w-full">
              Built for artists who are done doing it themselves
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
