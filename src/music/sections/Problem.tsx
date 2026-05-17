import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, Package, BarChart2 } from "lucide-react";
import { Eyebrow, RevealText } from "../components/ui";

const problems = [
  {
    icon: AlertCircle,
    headline: "Your Shopify store looks like everyone else's.",
    body: "You spent $500 on a Shopify theme and it still screams \"template.\" Fans can feel it. Promoters can feel it. It's costing you credibility."
  },
  {
    icon: TrendingDown,
    headline: "You're invisible on Google.",
    body: "Artists using DistroKid or Bandzoogle get zero real SEO support. Your page isn't indexed properly, your schema is wrong, and AI search engines don't even know you exist."
  },
  {
    icon: Package,
    headline: "Merch fulfillment is a part-time job you didn't sign up for.",
    body: "Packing orders at midnight, chasing tracking numbers, dealing with refunds — none of that is in your job description. It's eating your creative time."
  },
  {
    icon: BarChart2,
    headline: "You have no idea what's actually working.",
    body: "Without a real dashboard, you're guessing. Streaming numbers in one app, merch sales in another, email opens somewhere else. No unified picture, no strategy."
  }
];

export const Problem = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-[var(--color-bg)] overflow-hidden">
      {/* Accent line and glow */}
      <div className="absolute top-0 bottom-0 left-0 sm:left-auto sm:right-[calc(50%+320px)] w-[2px] bg-gradient-to-b from-transparent via-[var(--color-primary)] to-transparent opacity-20 hidden sm:block shadow-[0_0_20px_rgba(255,42,95,1)]" />
      <div className="absolute top-1/4 -right-[20%] w-[50vw] h-[50vw] bg-[var(--color-secondary)]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[700px] mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <Eyebrow>Sound Familiar?</Eyebrow>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="bg-[var(--color-surface-dynamic)] backdrop-blur-xl border border-[var(--color-border)] p-8 rounded-[2rem] flex flex-col items-start hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface-dynamic)] transition-all duration-300 group shadow-lg"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface-dynamic)] flex items-center justify-center mb-6 text-[var(--color-primary)] shadow-[0_4px_20px_rgba(0,229,255,0.15)] group-hover:scale-110 group-hover:text-[var(--color-text)] group-hover:bg-[var(--color-primary)] transition-all duration-300">
                <item.icon size={26} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold font-body mb-3 text-[var(--color-text)]">
                {item.headline}
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
