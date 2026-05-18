import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { Eyebrow } from "../components/ui";
import { useIsDesktop } from "../hooks/useIsDesktop";

type FeatureVal = boolean | "partial";

interface Feature {
  name: string;
  us: FeatureVal;
  d: FeatureVal;
  b: FeatureVal;
  s: FeatureVal;
  a: FeatureVal;
}

const features: Feature[] = [
  { name: "Custom Website Design", us: true, d: false, b: "partial", s: "partial", a: true },
  { name: "Merch Store Built-In", us: true, d: false, b: true, s: true, a: true },
  { name: "Original Merch Design", us: true, d: false, b: false, s: false, a: true },
  { name: "Print & Fulfillment", us: true, d: false, b: false, s: false, a: true },
  { name: "Stripe + PayPal", us: true, d: false, b: "partial", s: true, a: "partial" },
  { name: "Laylo Fan Drops", us: true, d: false, b: false, s: false, a: false },
  { name: "Artist Web Dashboard", us: true, d: false, b: false, s: false, a: false },
  { name: "AEO / AI Optimization", us: true, d: false, b: false, s: false, a: false },
  { name: "Technical SEO Setup", us: true, d: false, b: "partial", s: "partial", a: "partial" },
  { name: "Monthly SEO Management", us: true, d: false, b: false, s: false, a: "partial" },
  { name: "Done-For-You", us: true, d: false, b: false, s: false, a: true },
  { name: "US-Based Team", us: true, d: true, b: true, s: true, a: false },
  { name: "Music-First", us: true, d: true, b: true, s: false, a: true },
];

const RowIcon = ({ val }: { val: FeatureVal }) => {
  if (val === true) return <Check size={20} className="mx-auto text-[var(--color-primary)] drop-shadow-[0_0_5px_rgba(255,42,95,0.5)]" strokeWidth={3} />;
  if (val === false) return <X size={20} className="mx-auto text-[var(--color-text)] opacity-20" />;
  return <Minus size={20} className="mx-auto text-[var(--color-text-muted)]" />;
};

export const ComparisonTable = () => {
  const isDesktop = useIsDesktop();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rawLeftParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rawCardsParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rawColY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const leftParallax = isDesktop ? rawLeftParallax : 0;
  const cardsParallax = isDesktop ? rawCardsParallax : 0;
  const colY = isDesktop ? rawColY : 0;

  return (
    <section ref={containerRef} className="py-32 sm:py-48 bg-[var(--color-bg)] border-t border-[var(--color-border)] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[var(--color-primary)]/5 rounded-full blur-[60px] lg:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[var(--color-secondary)]/5 rounded-full blur-[60px] lg:blur-[150px] pointer-events-none" />
      
      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-12 items-start">
          
          {/* Column 1: Context & Copy */}
          <motion.div style={{ y: leftParallax }} className="w-full xl:w-[45%] pr-0 xl:pr-12 flex flex-col justify-center">
            <Eyebrow>The Only Honest Comparison</Eyebrow>
            <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[var(--color-text)] mb-8">
              Nobody else comes <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] font-bold">close to the full stack.</span>
            </h2>
            
            <div className="space-y-8 text-[var(--color-text-muted)] text-lg leading-relaxed font-body">
              <p>
                Piecing together your digital presence with five different subscriptions is a recipe for lost revenue and fractured fan data. When you drop a single link that sends fans to a generic landing page, you lose the ability to retarget them, measure their lifetime value, or capture their email directly into your own ecosystem.
              </p>
              
              <motion.div style={{ y: cardsParallax }} className="space-y-6">
                <div className="bg-[var(--color-surface-dynamic)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-500" />
                   <h4 className="text-[var(--color-text)] font-bold text-xl mb-3 font-display flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                     AEO & AIO Mastery
                   </h4>
                   <p className="text-sm">
                     A templated site won't teach ChatGPT or Gemini who you are. I implement strict <strong>Answer Engine Optimization (AEO)</strong> and structured Schema markup so when fans ask AI about your genre, you appear in the generative response. I own the full stack, meaning I write the exact semantic HTML that feeds these LLMs (Large Language Models) the entity data they crave.
                   </p>
                </div>

                <div className="bg-[var(--color-surface-dynamic)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                   <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-secondary)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-[var(--color-secondary)]/20 transition-colors duration-500" />
                   <h4 className="text-[var(--color-text)] font-bold text-xl mb-3 font-display flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse" />
                     Zero DIY. Total Ownership.
                   </h4>
                   <p className="text-sm">
                     Stop spending hours figuring out responsive web design and pixel tracking. I handle everything—from DNS management to custom headless Shopify integrations—so you can focus entirely on your music. You retain 100% ownership of your audience data and revenue without paying bloated platform fees.
                   </p>
                </div>
              </motion.div>

              <p>
                 You don't just need a website. You need a dedicated technical partner tracking your SEO rankings across Google and TikTok, running your Shopify inventory, keeping your dashboard synced with your Laylo drops, and building high-converting funnels for your next tour. 
              </p>
            </div>
            
            <div className="mt-12 flex gap-4 items-center">
               <div className="flex -space-x-4">
                 <div className="w-12 h-12 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-surface-2)] flex items-center justify-center p-2">
                   <svg viewBox="0 0 24 24" className="w-6 h-6 opacity-60" fill="currentColor" aria-label="Shopify"><path d="M15.337 3.178c-.034-.024-.07-.024-.104-.012-.034.012-1.094.336-1.094.336s-.724-.724-.817-.817c-.093-.093-.268-.07-.336-.047L12.614 2.8c-.047-.163-.127-.36-.244-.546-.372-.592-.92-.906-1.576-.906h-.07c-.21-.256-.478-.372-.712-.372-1.764 0-2.612 2.206-2.88 3.326-.686.21-1.18.36-1.237.384-.384.116-.396.128-.442.488C5.43 5.418 4.2 15.1 4.2 15.1l8.384 1.576 4.548-1.134S15.37 3.2 15.337 3.178zM11.34 4.48l-.012.006-.01 0v-.012l.044-1.52c.3.058.502.37.618.68-.186.058-.404.128-.64.21zm-1.12.36c.14-.488.418-1.02.74-1.344.126-.128.302-.27.5-.35.208.418.22.984.002 1.474l-1.242.384zm.918-2.158c.174 0 .302.058.418.174-.186.09-.372.244-.546.43-.476.498-.84 1.274-.996 2.018l-1.04.324C9.23 4.064 10.196 2.68 11.138 2.68z"/></svg>
                 </div>
                 <div className="w-12 h-12 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-surface-2)] flex items-center justify-center p-2">
                   <svg viewBox="0 0 24 24" className="w-6 h-6 opacity-60" fill="currentColor" aria-label="Stripe"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.918 3.757 7.038c0 4.72 2.89 6.058 6.022 7.174 2.098.742 2.776 1.31 2.776 2.268 0 .995-.738 1.573-2.143 1.573-1.88 0-4.867-.939-6.663-2.023l-.898 5.494C4.46 22.424 7.306 24 11.476 24c2.616 0 4.71-.685 6.117-1.943 1.538-1.372 2.407-3.327 2.407-5.724 0-4.867-2.943-6.118-6.024-7.183z"/></svg>
                 </div>
                 <div className="w-12 h-12 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-surface-2)] flex items-center justify-center p-2">
                   <svg viewBox="0 0 24 24" className="w-6 h-6 opacity-60" fill="currentColor" aria-label="PayPal"><path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 00-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 00.554.647h3.882c.46 0 .85-.334.922-.788l.038-.2.73-4.615.047-.253a.929.929 0 01.918-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.772-4.493z"/></svg>
                 </div>
               </div>
               <span className="text-sm font-medium text-[var(--color-text)] opacity-50">Fully integrated into<br/>one seamless platform.</span>
            </div>
          </motion.div>

          {/* Column 2: The Table */}
          <div className="w-full xl:w-[55%] relative">
            
            {/* Scroll indicators for mobile */}
            <div className="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-[var(--color-bg)] to-transparent pointer-events-none z-30 lg:hidden" />
            
            <div className="w-full overflow-x-auto pb-6 snap-x custom-scrollbar">
              <div className="min-w-[800px] w-full bg-[var(--color-surface)]/40 backdrop-blur-2xl rounded-[2rem] border border-[var(--color-border)] overflow-hidden shadow-2xl relative">
                
                {/* Header */}
                <div className="grid grid-cols-[minmax(180px,1.5fr)_repeat(5,minmax(100px,1fr))] border-b border-[var(--color-border)] bg-[var(--color-surface-dynamic)]">
                  <div className="p-4 sm:p-5 lg:p-6 font-bold text-[var(--color-text)] text-left sticky left-0 bg-[var(--color-surface)]/90 backdrop-blur-md border-r border-[var(--color-border)] z-20 shadow-[4px_0_10px_rgba(0,0,0,0.2)]">
                    Capabilities
                  </div>
                  <div className="p-4 sm:p-5 lg:p-6 text-center font-bold text-[var(--color-text-muted)] text-xs sm:text-sm">DistroKid</div>
                  <div className="p-4 sm:p-5 lg:p-6 text-center font-bold text-[var(--color-text-muted)] text-xs sm:text-sm">Bandzoogle</div>
                  <div className="p-4 sm:p-5 lg:p-6 text-center font-bold text-[var(--color-text-muted)] text-xs sm:text-sm">Shopify</div>
                  <div className="p-4 sm:p-5 lg:p-6 text-center font-bold text-[var(--color-text-muted)] text-xs sm:text-sm">Allotment</div>
                  <div className="p-4 sm:p-5 lg:p-6 text-center font-bold text-white text-sm sm:text-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] relative shadow-[0_0_30px_rgba(0,229,255,0.4)] transform hover:scale-[1.02] transition-transform origin-bottom overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-surface-dynamic)] animate-pulse" />
                    <motion.div style={{ y: colY }} className="absolute inset-0 bg-[var(--color-surface-dynamic)] rounded-full blur-xl mix-blend-overlay" />
                    <span className="drop-shadow-md tracking-tight relative z-10">Your Brand</span>
                  </div>
                </div>

                {/* Rows */}
                {features.map((f, i) => (
                  <div 
                    key={i}
                    className="grid grid-cols-[minmax(180px,1.5fr)_repeat(5,minmax(100px,1fr))] border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-dynamic)] transition-colors group"
                  >
                    <div className="p-4 sm:p-5 text-sm sm:text-base font-medium text-[var(--color-text)] sticky left-0 bg-[var(--color-surface)]/90 backdrop-blur-md border-r border-[var(--color-border)] z-10 shadow-[4px_0_10px_rgba(0,0,0,0.2)] group-hover:text-[var(--color-primary)] transition-colors">
                      {f.name}
                    </div>
                    <div className="p-4 sm:p-5 border-r border-[var(--color-border)] flex items-center justify-center"><RowIcon val={f.d} /></div>
                    <div className="p-4 sm:p-5 border-r border-[var(--color-border)] flex items-center justify-center"><RowIcon val={f.b} /></div>
                    <div className="p-4 sm:p-5 border-r border-[var(--color-border)] flex items-center justify-center"><RowIcon val={f.s} /></div>
                    <div className="p-4 sm:p-5 border-r border-[var(--color-border)] flex items-center justify-center"><RowIcon val={f.a} /></div>
                    <div className="p-4 sm:p-5 bg-[var(--color-primary)]/10 border-x border-[var(--color-primary)]/30 flex items-center justify-center relative group-hover:bg-[var(--color-primary)]/20 transition-all duration-300">
                      <RowIcon val={f.us} />
                    </div>
                  </div>
                ))}
                
                {/* Footer shadow to complete the column glow */}
                <div className="grid grid-cols-[minmax(180px,1.5fr)_repeat(5,minmax(100px,1fr))] h-4">
                   <div className="col-span-5" />
                   <div className="bg-gradient-to-b from-[var(--color-primary)]/30 to-transparent border-x border-[var(--color-primary)]/30 rounded-b-xl" />
                </div>

              </div>
            </div>
            
            <p className="text-xs text-[var(--color-text-muted)] text-center xl:hidden mt-2 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              Scroll to view full comparison
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
