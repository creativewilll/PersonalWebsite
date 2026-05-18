import React from "react";
import { motion } from "framer-motion";
import { Monitor, ShoppingBag, Palette, Truck, Zap, LayoutDashboard, Search, RefreshCw, Sparkles, FileText } from "lucide-react";
import { Eyebrow } from "../components/ui";

const services = [
  {
    icon: Monitor,
    headline: "Custom Artist Website",
    body: "A bespoke, fully custom website that reflects your artist identity — not a template, not a page builder. Built to convert fans, impress labels, and dominate local + genre search. Mobile-first, blazing fast, structured data ready.",
    tag: "Core Service",
    size: "large",
    glow: "var(--color-primary)"
  },
  {
    icon: ShoppingBag,
    headline: "Merch Store + Stripe & PayPal",
    body: "Your official merch store, built into your website. Stripe and PayPal payment processing fully integrated. Inventory management, product pages with SEO-optimized descriptions, upsell flows, and abandoned cart logic.",
    tag: "Revenue Engine",
    size: "large",
    glow: "var(--color-secondary)"
  },
  {
    icon: Palette,
    headline: "Original Merch Design",
    body: "Graphic designers create merch that actually sells — from tees to limited drops. Your brand DNA, not generic fonts.",
    size: "small"
  },
  {
    icon: Truck,
    headline: "Print & Fulfillment",
    body: "Orders printed, packed, and shipped to your fans. You never touch inventory. I handle returns too.",
    size: "small"
  },
  {
    icon: Zap,
    headline: "Laylo Fan Drops",
    body: "Laylo integrated directly into your site. Build your fan list, drop music, merch, and ticket links with automated notifications.",
    size: "small"
  },
  {
    icon: LayoutDashboard,
    headline: "Artist Web Dashboard",
    body: "A clean, branded web dashboard built for you — see all your key metrics in one place. No more app-switching.",
    size: "small"
  },
  {
    icon: Search,
    headline: "AEO + AIO + SEO Growth Strategy",
    body: "I implement Answer Engine Optimization (AEO) so AI assistants surface your name. AI Overview Optimization (AIO) so you appear in Google's generative answers. And technical SEO to make you rank.",
    size: "medium"
  },
  {
    icon: RefreshCw,
    headline: "Ongoing Management & Updates",
    body: "Your website isn't a project — it's an asset. Monthly updates, new release pages, tour date management, SEO health audits, performance reports.",
    size: "medium"
  },
  {
    icon: Sparkles,
    headline: "Brand Identity Cohesion",
    body: "Logo, color system, typography — applied consistently across your website, store, and profiles.",
    size: "small"
  },
  {
    icon: FileText,
    headline: "Electronic Press Kit (EPK)",
    body: "A professional EPK built into your website — ready to send to labels, booking agents, and press.",
    size: "small"
  }
];

export const Services = () => {
  return (
    <section id="whats-included" className="py-32 sm:py-48 bg-[var(--color-bg)] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[80px] lg:blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/5 rounded-full blur-[80px] lg:blur-[200px] pointer-events-none" />
      
      {/* Marquee Strip */}
      <div className="absolute top-0 left-0 w-full h-[48px] bg-[var(--color-primary)]/10 border-y border-[var(--color-primary)]/20 flex items-center z-10 marquee-container overflow-hidden backdrop-blur-md">
        <div className="marquee-content whitespace-nowrap text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] opacity-80">
          <span className="mx-4">WEBSITE • MERCH • SEO • AI DISCOVERY • AEO • AIO • LAYLO • DASHBOARD • STRIPE • WEBSITE • MERCH • SEO • AI DISCOVERY • AEO • AIO • LAYLO • DASHBOARD • STRIPE • WEBSITE • MERCH • SEO • AI DISCOVERY • AEO • AIO • LAYLO • DASHBOARD • STRIPE • </span>
          <span className="mx-4">WEBSITE • MERCH • SEO • AI DISCOVERY • AEO • AIO • LAYLO • DASHBOARD • STRIPE • WEBSITE • MERCH • SEO • AI DISCOVERY • AEO • AIO • LAYLO • DASHBOARD • STRIPE • WEBSITE • MERCH • SEO • AI DISCOVERY • AEO • AIO • LAYLO • DASHBOARD • STRIPE • </span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-16 relative z-10 lg:pl-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-start mb-24">
          <div className="flex-1 lg:max-w-[600px] xl:max-w-[700px] relative z-20">
            <Eyebrow>What's Included</Eyebrow>
            <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-7xl leading-[1.05] text-[var(--color-text)] mb-8">
              The Full Stack.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] font-bold tracking-tight">Nothing Left Out.</span>
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg sm:text-xl font-body leading-relaxed mb-8">
              Every tool, every system, every advantage — seamlessly integrated under one beautifully designed roof. I handle the entire technical and creative infrastructure so you can focus entirely on your music.
            </p>
            <ul className="space-y-4 mb-10 text-[var(--color-text)] font-medium">
                <li className="flex items-center gap-3"><Monitor className="text-[var(--color-primary)] w-5 h-5"/> Headless Performance</li>
                <li className="flex items-center gap-3"><ShoppingBag className="text-[var(--color-primary)] w-5 h-5"/> E-Commerce Ecosystem</li>
                <li className="flex items-center gap-3"><Search className="text-[var(--color-primary)] w-5 h-5"/> Generative Engine Optimization</li>
            </ul>
             <a href="#pricing" className="inline-flex items-center text-lg font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors border-b-2 border-transparent hover:border-[var(--color-primary)] pb-1 group">
                View Pricing Packages
                <span className="ml-2 transform group-hover:translate-x-2 transition-transform text-2xl leading-none">→</span>
            </a>
          </div>

           {/* Conceptual Visual Asset Area */}
          <div className="flex-1 w-full relative">
            <div className="w-full aspect-square md:aspect-video lg:aspect-square bg-[var(--color-surface)] rounded-[2rem] p-8 flex flex-col pt-16 shadow-2xl overflow-hidden group relative">
                {/* Abstract Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] mix-blend-overlay opacity-20" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-80" />
                
                {/* Layer 1: Merch Revenue Mockup */}
                <motion.div 
                  initial={{ opacity: 0, y: 20, rotate: -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-[10%] left-[5%] w-[60%] bg-[var(--color-surface-dynamic)] backdrop-blur-md rounded-2xl p-4 shadow-xl pointer-events-none group-hover:-rotate-1 group-hover:scale-105 transition-all duration-500"
                >
                    <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Total Fan Lifetime Value</div>
                    <div className="text-xl font-display font-medium text-[var(--color-text)]">$14,289.00</div>
                    <div className="mt-4 flex gap-2 items-end h-12">
                        <div className="flex-1 bg-[var(--color-surface-dynamic)] rounded-t-sm h-[30%]" />
                        <div className="flex-1 bg-[var(--color-surface-dynamic)] rounded-t-sm h-[50%]" />
                        <div className="flex-1 bg-[var(--color-surface-dynamic)] rounded-t-sm h-[40%]" />
                        <div className="flex-1 bg-[var(--color-primary)]/50 rounded-t-sm h-[70%] relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full shadow-[0_0_5px_rgba(255,42,95,1)]" />
                        </div>
                    </div>
                </motion.div>

                {/* Layer 2: SEO Ranking Mockup */}
                <motion.div 
                  initial={{ opacity: 0, x: 20, rotate: 3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-[40%] right-[5%] w-[65%] bg-[var(--color-surface-dynamic)] backdrop-blur-md lg:backdrop-blur-xl rounded-2xl p-4 shadow-xl pointer-events-none group-hover:rotate-1 group-hover:scale-105 transition-all duration-500 z-10"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                           <Search size={14} className="text-[var(--color-primary)]" />
                           <span className="text-xs text-[var(--color-text)]">Search Console</span>
                        </div>
                        <span className="text-[10px] text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 px-2 py-0.5 rounded-full">+420%</span>
                    </div>
                    <div className="bg-[var(--color-surface-dynamic)] rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                           <span className="text-[var(--color-text-muted)]">"indie rock detroit"</span>
                           <span className="text-[var(--color-text)] font-medium">Rank #1</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                           <span className="text-[var(--color-text-muted)]">"merch like the 1975"</span>
                           <span className="text-[var(--color-text)] font-medium">Rank #3</span>
                        </div>
                    </div>
                </motion.div>

                {/* Layer 3: Central Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[var(--color-primary)]/20 rounded-full blur-[40px] lg:blur-[80px] pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)] relative z-10">
          
          {/* Decorative lines spanning the grid */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)]/10 to-transparent pointer-events-none -z-10" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--color-secondary)]/10 to-transparent pointer-events-none -z-10" />

          {services.map((service, i) => {
            const spanClass = 
              service.size === "large" ? "md:col-span-2 lg:col-span-2 row-span-2" :
              service.size === "medium" ? "md:col-span-2 lg:col-span-2 row-span-1" :
              "col-span-1 row-span-1";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1, ease: "easeOut" }}
                className={`${spanClass} bg-[var(--color-surface-2)]/60 backdrop-blur-md lg:backdrop-blur-xl border border-[var(--color-border)] rounded-3xl p-8 flex flex-col hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface-2)] transition-all duration-300 relative group overflow-hidden shadow-2xl`}
              >
                {/* Glow effect on hover */}
                {service.glow && (
                  <div className={`absolute -inset-[100%] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[60px] bg-gradient-to-r ${service.glow === 'var(--color-primary)' ? 'from-[var(--color-primary)] to-transparent' : 'from-[var(--color-secondary)] to-transparent'}`} />
                )}

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-[var(--color-surface-dynamic)] flex items-center justify-center text-[var(--color-text)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]`}>
                    <service.icon size={26} strokeWidth={2.5} />
                  </div>
                  {service.tag && (
                    <span className="text-[10px] uppercase tracking-widest font-bold bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30 px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.1)]">
                      {service.tag}
                    </span>
                  )}
                </div>
                <h3 className={`font-display font-bold text-[var(--color-text)] mb-3 tracking-tight relative z-10 ${service.size === 'large' ? 'text-3xl' : 'text-xl'}`}>
                  {service.headline}
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mt-auto relative z-10">
                  {service.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
