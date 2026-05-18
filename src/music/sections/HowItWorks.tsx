import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "../components/ui";
import { Check, Sparkles, Server, Search, Paintbrush, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    tag: "Phase 01",
    title: "The Deep Dive Audit",
    body: "I start by analyzing your entire digital footprint. I don't just look at your current website — I analyze your Spotify streams, YouTube presence, social engagement, and competitor data to find the gaps in your market.",
    highlights: ["Brand identity mapping", "Technical SEO baseline analysis", "Conversion rate optimization audit"]
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    tag: "Phase 02",
    title: "AEO & AIO Strategy Blueprint",
    body: "Modern search isn't just Google anymore. Fans discover music through AI overviews (AIO), TikTok search, and ChatGPT recommendations (AEO - Answer Engine Optimization). I build a comprehensive taxonomy of your brand that trains these large language models precisely who you are, what you sound like, and who you sound similar to.",
    highlights: [
      "Entity extraction & knowledge graph mapping",
      "LLM targeting (ChatGPT, Perplexity, Gemini)",
      "Zero-click search optimization"
    ]
  },
  {
    icon: <Server className="w-6 h-6" />,
    tag: "Phase 03",
    title: "Technical Stack Architecture",
    body: "I implement robust full-stack infrastructure. This means connecting a blazingly fast front-end, Laylo for fan relationship management, and Shopify for merch drops — all feeding into your centralized artist web dashboard.",
    highlights: ["Headless CMS configuration", "API integrations (Shopify, Laylo, DistroKid)", "Global CDN setup for sub-second load times"]
  },
  {
    icon: <Check className="w-6 h-6" />,
    tag: "Phase 04",
    title: "Technical & On-Page SEO",
    body: "I write your site's copy for two audiences: your fans, and search bots. Every heading, image alt tag, schema markup, and meta description is meticulously crafted to ensure you rank #1 for your brand name and capture high-intent 'sounds like [Genre/Artist]' searches.",
    highlights: ["JSON-LD music schema markup", "Keyword gap analysis", "Dynamic routing for tour dates & discography"]
  },
  {
    icon: <Paintbrush className="w-6 h-6" />,
    tag: "Phase 05",
    title: "Design & Conversion Engineering",
    body: "I don't just make it look cool — I design tailored user journeys. If a user lands on your merch page from an Instagram ad, they get a frictionless checkout experience. If they land on an article about your new album, they are pushed to pre-save.",
    highlights: ["Mobile-first UX/UI", "A/B testing preparation", "Accessible contrast ratios"]
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    tag: "Phase 06",
    title: "Launch & The Handoff",
    body: "When I go live, I don't leave you in the dark. I schedule a 1-on-1 onboarding session where you learn how to manage your empire through your custom artist web dashboard. You maintain total ownership of your domain, your code, and your fan data.",
    highlights: ["Painless DNS migrations", "Custom video tutorials", "Dashboard walkthrough"]
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    tag: "Phase 07",
    title: "Ongoing AI & SEO Growth",
    body: "The internet moves fast, and LLM algorithms evolve weekly. I monitor your search console, analyze your traffic against your Laylo conversions, and run quarterly strategy refinements to ensure your digital presence is constantly compounding.",
    highlights: ["Monthly analytics reports", "Algorithm adaptation", "Quarterly growth planning"]
  }
];

export const HowItWorks = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" className="py-32 sm:py-48 bg-[var(--color-bg)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center mb-16 sm:mb-32 relative z-10">
        <Eyebrow>Zero Overwhelm. Maximum Impact.</Eyebrow>
        <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-7xl leading-[1.1] text-[var(--color-text)] mx-auto mb-8">
          The exact blueprint I use <br />
          to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">dominate search.</span>
        </h2>
        <p className="text-[var(--color-text-muted)] text-lg sm:text-xl font-body max-w-[60ch] mx-auto leading-relaxed">
          I don't just throw a template together. I engineer a scalable infrastructure designed to capture AEO (Answer Engine Optimization) & AIO (AI Overview) traffic, converting new listeners into lifelong fans.
        </p>
      </div>

      <div ref={containerRef} className="max-w-[1000px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Continuous Vertical Line Background */}
        <div className="absolute top-0 bottom-0 left-[40px] md:left-1/2 w-[2px] bg-[var(--color-surface-dynamic)] md:-translate-x-1/2 rounded-full overflow-hidden">
             {/* Animated Progress Line */}
            <motion.div 
               className="w-full bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] shadow-[0_0_15px_rgba(255,42,95,0.8)]"
               style={{ height: lineHeight }}
            />
        </div>

        <div className="flex flex-col gap-24 relative">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={i} 
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Number / Icon Node */}
                <div className="absolute left-[40px] md:left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg)] border border-[var(--color-divider)] shadow-xl z-20 transition-colors duration-500 hover:border-[var(--color-primary)] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                  <div className="text-[var(--color-primary)]">
                    {step.icon}
                  </div>
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}
                >
                  <div className={`p-8 sm:p-10 rounded-3xl bg-[var(--color-surface-dynamic)] backdrop-blur-xl border border-[var(--color-border)] shadow-2xl hover:bg-[var(--color-surface-dynamic)] transition-all duration-300 relative overflow-hidden group ${isEven ? 'text-left md:text-right' : 'text-left'}`}>
                    <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[var(--color-primary)]/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[var(--color-secondary)]/10 transition-colors duration-700 pointer-events-none" />
                    
                    <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold tracking-wider uppercase mb-6 shadow-[inset_0_0_10px_rgba(0,229,255,0.1)] border border-[var(--color-primary)]/20">
                      {step.tag}
                    </span>
                    
                    <h3 className="text-2xl sm:text-3xl font-display font-medium text-[var(--color-text)] mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-[var(--color-text-muted)] text-base sm:text-lg leading-relaxed mb-8">
                      {step.body}
                    </p>

                    <div className={`flex flex-col gap-3 ${isEven ? 'md:items-end' : 'items-start'}`}>
                      {step.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          {!isEven && <Check className="w-4 h-4 text-[var(--color-primary)]" />}
                          <span className="text-sm text-[var(--color-text)] font-medium">{highlight}</span>
                          {isEven && <Check className="w-4 h-4 text-[var(--color-primary)] hidden md:block" />}
                          {isEven && <Check className="w-4 h-4 text-[var(--color-primary)] md:hidden" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* Empty Space for the other side */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
