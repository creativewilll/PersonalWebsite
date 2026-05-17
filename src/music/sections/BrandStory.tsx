import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Button } from "../components/ui";

export const BrandStory = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="py-24 sm:py-32 bg-[var(--color-surface)] border-t border-[var(--color-border)] overflow-hidden relative">
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[var(--color-secondary)]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col max-w-[600px]"
          >
            <Eyebrow>Why I Build Different</Eyebrow>
            <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[var(--color-text)] mb-8">
              Built by someone who <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] font-bold">actually listens to music.</span>
            </h2>

            <div className="space-y-6 text-[var(--color-text-muted)] text-lg leading-relaxed mb-10">
              <p>
                Most web agencies treat music artists like any other small business client — they hand you a generic template, set up your Shopify account, and call it a day. I don't.
              </p>
              <p>
                I'm based in Troy, Michigan, and I'm a musician, music fan, and digital strategist who understands what it means to build a career in music in 2025. I know that your website isn't just a business card — it's your stage online.
              </p>
              <p>
                I built this service specifically because I kept seeing talented artists with terrible digital presences. Great music. Broken websites. No SEO. No real fan engagement. I couldn't ignore it anymore.
              </p>
            </div>

            <motion.blockquote 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-display italic text-2xl sm:text-3xl text-[var(--color-text)] border-l-4 border-[var(--color-primary)] pl-6 py-2 mb-10 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent -z-10 blur-xl" />
              "Great music deserves a great digital home."
            </motion.blockquote>

            <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-12">
              When you work with me, you're not a ticket number. You get a partner who knows your music, cares about your brand, and treats your growth like it's my own. Because in a real sense — it is.
            </p>

            <div>
              <Button>Let's Build Your Stage <span className="ml-2 font-normal">→</span></Button>
            </div>
          </motion.div>

          <div className="relative h-[600px] w-full rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(255,42,95,0.15)] border border-[var(--color-border)] group">
             <motion.div 
               style={{ y: imgY }}
               className="absolute inset-[-20%] w-[140%] h-[140%] bg-cover bg-center"
             >
               {/* Generative placeholder mimicking a dark, cinematic studio worksapce */}
               <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-bg)] via-[var(--color-surface)] to-[var(--color-bg)]" />
               <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50 group-hover:opacity-70 transition-opacity duration-700" style={{ backgroundImage: 'url("https://picsum.photos/seed/studioworkspace/800/800")' }} />
               <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-80" />
               <div className="absolute inset-0 mix-blend-color opacity-30 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
