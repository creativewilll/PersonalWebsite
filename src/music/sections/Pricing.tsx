import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Table2, ArrowRight } from "lucide-react";
import { Eyebrow, Button } from "../components/ui";
import { useMusicActions } from "../lib/musicActions";
import { websiteBuildPlans, monthlyPlans, flatFeatureComparison } from "../data/pricingData";

const ComparisonCell = ({ value }: { value: string }) => {
  if (value === "✓") return <Check size={16} className="text-[var(--color-primary)] mx-auto" strokeWidth={3} />;
  if (value === "—") return <X size={16} className="text-[var(--color-text)] opacity-20 mx-auto" strokeWidth={3} />;
  return <span className="text-xs text-[var(--color-text)] text-center block">{value}</span>;
};

const FeatureComparisonModal = ({
  isOpen,
  onClose,
  isMonthly
}: {
  isOpen: boolean;
  onClose: () => void;
  isMonthly: boolean;
}) => {
  if (!isOpen) return null;

  const data = isMonthly ? flatFeatureComparison.monthlyPlans : flatFeatureComparison.websiteBuilds;
  const headers = isMonthly
    ? ["Feature", "Foundation", "Growth", "Insane"]
    : ["Feature", "Launchpad", "Baller", "Sovereign"];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[85vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 sm:p-6 border-b border-[var(--color-border)] flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-[var(--color-text)]">
                {isMonthly ? "Management Plans" : "Website Builds"} — Full Comparison
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--color-surface-2)] rounded-full transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-[var(--color-text-muted)]" />
            </button>
          </div>

          <div className="overflow-auto max-h-[calc(92vh-100px)] sm:max-h-[calc(85vh-100px)]">
            <table className="w-full min-w-[480px]">
              <thead className="sticky top-0 bg-[var(--color-surface)] z-10 border-b border-[var(--color-border)]">
                <tr>
                  {headers.map((header, i) => (
                    <th
                      key={i}
                      className={`p-3 sm:p-4 text-xs sm:text-sm font-bold whitespace-nowrap ${
                        i === 0 ? "text-left text-[var(--color-text)]" : "text-center text-[var(--color-primary)]"
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-[var(--color-border)]/40 ${i % 2 === 0 ? "bg-[var(--color-surface-dynamic)]/20" : ""}`}
                  >
                    <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-[var(--color-text)]">
                      {row.name}
                    </td>
                    {isMonthly ? (
                      <>
                        <td className="p-3 sm:p-4 text-center">
                          <ComparisonCell value={(row as any).foundation} />
                        </td>
                        <td className="p-3 sm:p-4 text-center bg-[var(--color-primary)]/5">
                          <ComparisonCell value={(row as any).growth} />
                        </td>
                        <td className="p-3 sm:p-4 text-center">
                          <ComparisonCell value={(row as any).insane} />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-3 sm:p-4 text-center">
                          <ComparisonCell value={(row as any).launchpad} />
                        </td>
                        <td className="p-3 sm:p-4 text-center bg-[var(--color-primary)]/5">
                          <ComparisonCell value={(row as any).baller} />
                        </td>
                        <td className="p-3 sm:p-4 text-center">
                          <ComparisonCell value={(row as any).sovereign} />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const PlanCard = ({ plan, isMonthly, onSelect }: { plan: any; isMonthly: boolean; onSelect: () => void }) => (
  <div
    className={`bg-[var(--color-surface-dynamic)] backdrop-blur-xl border rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col relative transition-all duration-300 hover:-translate-y-1 ${
      plan.featured
        ? "border-[var(--color-primary)]/40 shadow-[0_0_40px_rgba(0,229,255,0.1)] md:-translate-y-3"
        : "border-[var(--color-border)] hover:border-[var(--color-divider)] hover:shadow-lg"
    }`}
  >
    {plan.featured && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-[10px] uppercase tracking-widest font-bold px-5 py-1.5 rounded-full">
        {plan.badge}
      </div>
    )}

    <div className="mb-5">
      <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text)]">{plan.name}</h3>
      <p className="text-xs text-[var(--color-text-faint)] mt-0.5">{plan.subtitle}</p>
    </div>

    <div className="flex items-baseline gap-1 mb-4">
      <span className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text)]">{plan.price}</span>
      {plan.period && <span className="text-base text-[var(--color-text-faint)]">{plan.period}</span>}
      {plan.tag && <span className="text-xs text-[var(--color-text-faint)] ml-1">({plan.tag})</span>}
    </div>

    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">{plan.brief}</p>

    <ul className="space-y-2.5 mb-8 flex-1">
      {plan.highlights.map((item: string, idx: number) => (
        <li key={idx} className="flex items-start gap-2.5">
          <Check size={14} strokeWidth={3} className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
          <span className="text-sm text-[var(--color-text)] leading-snug">{item}</span>
        </li>
      ))}
    </ul>

    <Button onClick={onSelect} variant={plan.featured ? "primary" : "outline"} className="w-full h-12 sm:h-14 text-sm">
      Get Started <ArrowRight size={16} className="ml-2" />
    </Button>
  </div>
);

export const Pricing = () => {
  const { openContactForm } = useMusicActions();
  const [isMonthly, setIsMonthly] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const activePlans = isMonthly ? monthlyPlans : websiteBuildPlans;

  return (
    <>
      <section id="pricing" className="py-16 sm:py-24 lg:py-32 bg-[var(--color-bg)] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[var(--color-primary)]/6 via-transparent to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <Eyebrow>Transparent Pricing</Eyebrow>
            <h2 className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl leading-[1.1] text-[var(--color-text)] mb-4">
              Simple plans.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
                Serious results.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-lg mx-auto">
              Built for musicians. Optimized for AI search, fan capture, and revenue.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <div className="inline-flex bg-[var(--color-surface-dynamic)] border border-[var(--color-border)] rounded-full p-1 relative backdrop-blur-md shadow-lg">
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full transition-transform duration-300 ease-in-out ${
                  isMonthly ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
                }`}
              />
              <button
                onClick={() => setIsMonthly(false)}
                className={`relative z-10 px-5 sm:px-8 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-colors duration-300 ${
                  !isMonthly ? "text-white" : "text-[var(--color-text)] opacity-60"
                }`}
              >
                WEBSITE BUILDS
              </button>
              <button
                onClick={() => setIsMonthly(true)}
                className={`relative z-10 px-5 sm:px-8 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-colors duration-300 ${
                  isMonthly ? "text-white" : "text-[var(--color-text)] opacity-60"
                }`}
              >
                MONTHLY
              </button>
            </div>
          </div>

          {/* Plans */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isMonthly ? "monthly" : "setup"}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid gap-5 sm:gap-6 mx-auto items-start grid-cols-1 md:grid-cols-3 max-w-5xl"
            >
              {activePlans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} isMonthly={isMonthly} onSelect={openContactForm} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="text-center mt-10 sm:mt-14 space-y-3">
            <button
              onClick={() => setShowComparison(true)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors font-medium"
            >
              <Table2 size={15} />
              Compare all features side-by-side
            </button>
            <p className="text-xs text-[var(--color-text-faint)]">
              Custom scoping available for established artists.{" "}
              <button onClick={openContactForm} className="underline underline-offset-2 hover:text-[var(--color-primary)] transition-colors">
                Let's talk.
              </button>
            </p>
          </div>
        </div>
      </section>

      <FeatureComparisonModal isOpen={showComparison} onClose={() => setShowComparison(false)} isMonthly={isMonthly} />
    </>
  );
};
