import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Brain, Code } from "lucide-react";
import { Eyebrow, Button } from "../components/ui";
import { useMusicActions } from "../lib/musicActions";

const columns = [
  {
    icon: MessageSquare,
    title: "AEO (Answer Engine Optimization)",
    subtitle: "What fans ask, you answer.",
    body: "We structure your content, FAQ pages, and artist bio specifically to appear in featured snippets and voice search results. When someone asks Siri, Alexa, or Google Assistant about artists in your genre, your name surfaces."
  },
  {
    icon: Brain,
    title: "AIO (AI Overview Optimization)",
    subtitle: "Own the AI answer box.",
    body: "Google's AI Overviews now answer fan queries directly in the search results. We optimize your schema markup, authority signals, and content architecture so your artist profile is the source Google's AI cites."
  },
  {
    icon: Code,
    title: "Technical SEO + Content SEO",
    subtitle: "Rank and stay ranked.",
    body: "Full technical audit and implementation: sitemap, robots.txt, canonical tags, page speed optimization, Core Web Vitals, backlink strategy, internal linking, genre-specific keyword targeting, and a monthly content calendar to keep you climbing."
  }
];

export const DeepDiveSEO = () => {
  const { openCalendly } = useMusicActions();
  return (
    <section className="py-32 relative bg-[var(--color-bg)] overflow-hidden">
      {/* Cinematic Gradient Background */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[var(--color-primary)]/15 to-transparent blur-[60px] lg:blur-[120px] opacity-60" />
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-[var(--color-secondary)]/10 to-transparent blur-[60px] lg:blur-[120px] opacity-60" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="text-center flex flex-col items-center mb-20">
          <Eyebrow>Your Biggest Unfair Advantage</Eyebrow>
          <h2 className="font-display font-bold text-[clamp(2.5rem,4vw,5rem)] leading-[1.1] text-[var(--color-text)] mb-8 text-center max-w-[900px]">
             While every other artist <br className="hidden sm:block" />
             is invisible to AI search, <br className="hidden sm:block" />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] font-black">
               yours will be everywhere.
             </span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-[65ch] text-center border-l-2 border-[var(--color-primary)] pl-6 text-left sm:text-center sm:border-l-0 sm:pl-0">
             In 2026, search has fundamentally changed. Fans don't just Google artists — they ask AI. "Who's the best indie rapper in Detroit?" "Find me an R&B artist from Atlanta dropping new music." If your site isn't optimized for Answer Engine Optimization (AEO) and AI Overview (AIO), you simply don't exist in those answers.
             <br/><br/>
             <strong className="text-[var(--color-text)] font-bold tracking-wide">We make sure you exist.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 w-full">
          {columns.map((col, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 40, scale: 0.95 }}
               whileInView={{ opacity: 1, y: 0, scale: 1 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
               className="bg-[var(--color-surface-dynamic)] backdrop-blur-md border border-[var(--color-border)] p-8 rounded-[2rem] flex flex-col relative overflow-hidden group hover:border-[var(--color-primary)]/50 transition-all duration-500 hover:shadow-[0_20px_40px_-20px_rgba(255,42,95,0.2)]"
             >
               <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               <div className="w-14 h-14 bg-[var(--color-surface-dynamic)] rounded-2xl border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] mb-8 relative z-10 shadow-[0_0_15px_rgba(0,229,255,0.15)] group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-300">
                 <col.icon size={26} strokeWidth={2.5} />
               </div>
               <h3 className="font-display font-bold text-2xl text-[var(--color-text)] mb-3 relative z-10 tracking-tight">{col.title}</h3>
               <p className="text-[var(--color-primary)] text-sm mb-4 tracking-widest font-bold uppercase relative z-10">{col.subtitle}</p>
               <p className="text-[var(--color-text-muted)] text-sm leading-relaxed relative z-10 mt-auto">
                 {col.body}
               </p>
             </motion.div>
          ))}
        </div>

        {/* AI Answer Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[800px] mb-20 bg-[var(--color-surface-2)]/80 backdrop-blur-md lg:backdrop-blur-xl border border-[var(--color-border)] rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-[var(--color-secondary)]/10 to-transparent blur-[40px] lg:blur-[80px]" />
          
          <div className="flex gap-4 items-center border-b border-[var(--color-border)] pb-6 mb-8 relative z-10">
             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--color-secondary)] to-[var(--color-primary)] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)]">
               <SparklesIcon className="w-6 h-6 text-white" />
             </div>
             <div>
               <p className="text-[10px] text-[var(--color-text-faint)] font-bold tracking-[0.2em] uppercase mb-1">AI Overview</p>
               <p className="text-base text-[var(--color-text)] font-medium">Find me the best upcoming R&B artist from Atlanta</p>
             </div>
          </div>
          <div className="space-y-4 relative z-10">
             <div className="text-[var(--color-text)] opacity-90 leading-relaxed text-lg">
               <TypewriterText text="One of the most highly anticipated upcoming R&B artists from Atlanta is " />
               <motion.span 
                 initial={{ opacity: 0, backgroundColor: "transparent" }}
                 whileInView={{ opacity: 1, backgroundColor: "rgba(255, 42, 95, 0.15)" }}
                 viewport={{ once: true }}
                 transition={{ delay: 2.5, duration: 0.5 }}
                 className="text-[var(--color-primary)] font-bold px-2 py-0.5 rounded-md border border-[var(--color-primary)]/40 inline-flex mx-1 whitespace-nowrap"
               >
                 [Your Artist Name]
               </motion.span>
               <TypewriterText text=". Their recent EP has gained significant traction, and according to their official site, they combine 90s nostalgia with modern trap soul." delay={3} />
             </div>
             <div className="flex gap-4 pt-6 mt-8 border-t border-[var(--color-border)] opacity-50">
               <div className="h-2 w-24 bg-[var(--color-surface-dynamic)] rounded-full" />
               <div className="h-2 w-32 bg-[var(--color-surface-dynamic)] rounded-full" />
             </div>
          </div>
        </motion.div>

        <Button onClick={openCalendly} variant="primary" className="h-14">See How We Rank Artists <span className="ml-2 font-normal text-xl leading-none">→</span></Button>

      </div>
    </section>
  );
};

const SparklesIcon = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
)

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <motion.span
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: text.length * 0.02, delay, ease: "linear" }}
      className="inline"
    >
      {text}
    </motion.span>
  );
};
