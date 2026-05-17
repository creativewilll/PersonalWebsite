import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Eyebrow, Button } from "../components/ui";
import { useMusicActions } from "../lib/musicActions";

const setupPlans = [
  {
    name: "Foundation",
    price: "$1,497",
    subtitle: "For artists just launching",
    features: [
      "Custom single-page artist website",
      "Mobile-first, Core Web Vitals optimized",
      "Basic merch store setup (up to 5 products)",
      "Stripe + PayPal integration",
      "Basic SEO setup (on-page, schema, meta)",
      "Artist bio + press page",
      "30-day post-launch support"
    ],
    featured: false
  },
  {
    name: "Full Stack",
    price: "$2,997",
    subtitle: "The complete system",
    badge: "Most Popular",
    features: [
      "Everything in Foundation, PLUS:",
      "Multi-page custom website (up to 8 pages)",
      "Full merch store + product SEO descriptions",
      "Laylo integration + drop page setup",
      "Airtable artist dashboard (custom built)",
      "AEO + AIO + Technical SEO setup",
      "3 original merch design concepts",
      "EPK page",
      "60-day post-launch support + 1 strategy call"
    ],
    featured: true
  },
  {
    name: "Premium Growth",
    price: "$4,997",
    subtitle: "For serious artists ready to scale",
    features: [
      "Everything in Full Stack, PLUS:",
      "Full brand identity (logo, color system, typography)",
      "Full merch catalog design (up to 10 items)",
      "Print + fulfillment partner setup",
      "Paid ad audience setup (Laylo pixels → Meta + Google)",
      "3-month SEO management included",
      "Monthly strategy calls",
      "Priority support"
    ],
    featured: false
  }
];

const monthlyPlans = [
  {
    name: "Foundation Care",
    price: "$297/mo",
    subtitle: "Hosting support, minor updates, monthly SEO report",
    features: [
      "Managed premium hosting",
      "Uptime monitoring & security",
      "Content updates (1hr/mo)",
      "Basic monthly SEO reporting"
    ],
    featured: false
  },
  {
    name: "Full Stack Growth",
    price: "$597/mo",
    subtitle: "Active growth and management",
    badge: "Most Popular",
    features: [
      "Weekly content SEO & blog posts",
      "New release page creation",
      "Laylo drop management",
      "Airtable dashboard updates",
      "Monthly strategy call (45m)"
    ],
    featured: true
  },
  {
    name: "Premium Scale",
    price: "$997/mo",
    subtitle: "For established artists",
    features: [
      "Everything in Full Stack Growth, PLUS:",
      "Paid ads management",
      "Merch restocking coordination",
      "Quarterly comprehensive brand audits",
      "Priority VIP support line"
    ],
    featured: false
  }
];

export const Pricing = () => {
  const { openContactForm } = useMusicActions();
  const [isMonthly, setIsMonthly] = useState(false);

  const activePlans = isMonthly ? monthlyPlans : setupPlans;

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[var(--color-bg)] relative min-h-[900px] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-[var(--color-primary)]/10 via-transparent to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-secondary)]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Eyebrow>Transparent Pricing</Eyebrow>
          <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[var(--color-text)] mb-10">
            Choose your starting point.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">Scale as you grow.</span>
          </h2>

          {/* Toggle */}
          <div className="inline-flex bg-[var(--color-surface-dynamic)] border border-[var(--color-border)] rounded-full p-1.5 relative backdrop-blur-md shadow-xl">
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full transition-transform duration-300 ease-in-out shadow-[0_0_15px_rgba(255,42,95,0.3)] ${isMonthly ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'}`}
            />
            <button 
              onClick={() => setIsMonthly(false)}
              className={`relative z-10 px-8 py-3 text-sm font-bold rounded-full transition-colors duration-300 ${!isMonthly ? 'text-white' : 'text-[var(--color-text)] opacity-60 hover:text-[var(--color-text)]'}`}
            >
              SETUP
            </button>
            <button 
              onClick={() => setIsMonthly(true)}
              className={`relative z-10 px-8 py-3 text-sm font-bold rounded-full transition-colors duration-300 ${isMonthly ? 'text-white' : 'text-[var(--color-text)] opacity-60 hover:text-[var(--color-text)]'}`}
            >
              MANAGEMENT
            </button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={isMonthly ? 'monthly' : 'setup'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {activePlans.map((plan, i) => (
                <div 
                  key={i}
                  className={`bg-[var(--color-surface-dynamic)] backdrop-blur-xl border rounded-[2rem] p-8 flex flex-col relative transition-all duration-300 hover:-translate-y-2 group ${
                    plan.featured 
                      ? 'border-[var(--color-primary)]/50 shadow-[0_0_50px_rgba(0,229,255,0.15)] md:-translate-y-4' 
                      : 'border-[var(--color-border)] hover:border-[var(--color-divider)] hover:shadow-xl'
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-text)] text-[10px] uppercase tracking-widest font-bold px-6 py-2 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                      {plan.badge}
                    </div>
                  )}

                  <h3 className="text-2xl font-display font-bold text-[var(--color-text)] mb-2">{plan.name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-8">{plan.subtitle}</p>
                  <div className="font-display font-medium text-4xl text-[var(--color-text)] mb-8 group-hover:scale-105 transition-transform origin-left">
                    {plan.price.split('/')[0]}<span className="text-xl text-[var(--color-text-faint)]">{plan.price.includes('/') ? '/mo' : ''}</span>
                  </div>

                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 min-w-5 h-5 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-sm text-[var(--color-text)] leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button onClick={openContactForm} variant={plan.featured ? "primary" : "outline"} className="w-full h-14">
                    {isMonthly ? "Select Plan" : "Get Started"} <span className="ml-2">→</span>
                  </Button>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-[var(--color-text-faint)] text-sm mt-16 mb-16">
          All prices are starting rates. Custom scoping available for established artists with complex catalogs.
        </p>

      </div>
    </section>
  );
};
