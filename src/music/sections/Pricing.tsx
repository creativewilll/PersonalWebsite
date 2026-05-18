import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronDown, ChevronUp, Table2, ArrowRight } from "lucide-react";
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
  const data = isMonthly ? flatFeatureComparison.monthlyPlans : flatFeatureComparison.websiteBuilds;
  const headers = isMonthly
    ? ["Feature", "Essentials", "Growth", "Insane"]
    : ["Feature", "Essentials", "Fullstack"];

  return (
    <AnimatePresence>
      {isOpen && (
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
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-5xl max-h-[92vh] sm:max-h-[85vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[var(--color-border)] flex items-center justify-between bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10">
            <div>
              <h3 className="text-lg sm:text-2xl font-display font-bold text-[var(--color-text)]">
                Feature Comparison
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-0.5">
                {isMonthly ? "Monthly Management Plans" : "Website Build Packages"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--color-surface-2)] rounded-full transition-colors"
              aria-label="Close comparison"
            >
              <X size={22} className="text-[var(--color-text-muted)]" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-auto max-h-[calc(92vh-140px)] sm:max-h-[calc(85vh-140px)]">
            <table className="w-full min-w-[500px]">
              <thead className="sticky top-0 bg-[var(--color-surface)] z-10 border-b border-[var(--color-border)]">
                <tr>
                  {headers.map((header, i) => (
                    <th
                      key={i}
                      className={`p-3 sm:p-4 text-xs sm:text-sm font-bold whitespace-nowrap ${
                        i === 0
                          ? "text-left text-[var(--color-text)] w-[40%]"
                          : "text-center text-[var(--color-primary)]"
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
                    className={`border-b border-[var(--color-border)]/50 ${
                      i % 2 === 0 ? "bg-[var(--color-surface-dynamic)]/30" : ""
                    }`}
                  >
                    <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-[var(--color-text)]">
                      {row.name}
                    </td>
                    <td className="p-3 sm:p-4 text-center">
                      <ComparisonCell value={(row as any).essentials} />
                    </td>
                    {isMonthly ? (
                      <>
                        <td className="p-3 sm:p-4 text-center">
                          <ComparisonCell value={(row as any).growth} />
                        </td>
                        <td className="p-3 sm:p-4 text-center bg-[var(--color-primary)]/5">
                          <ComparisonCell value={(row as any).insane} />
                        </td>
                      </>
                    ) : (
                      <td className="p-3 sm:p-4 text-center bg-[var(--color-primary)]/5">
                        <ComparisonCell value={(row as any).fullstack} />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-3 sm:p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-dynamic)]">
            <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)] text-center">
              All plans include personal commitment to your success. Custom scoping available for established artists.
            </p>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

const PlanCard = ({
  plan,
  isMonthly,
  onSelect
}: {
  plan: any;
  isMonthly: boolean;
  onSelect: () => void;
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  React.useEffect(() => {
    if (plan.featured && plan.features) {
      setExpandedCategories(plan.features.slice(0, 2).map((f: any) => f.category));
    }
  }, [plan.featured, plan.features]);

  return (
    <div
      className={`bg-[var(--color-surface-dynamic)] backdrop-blur-md lg:backdrop-blur-xl border rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 flex flex-col relative transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 group ${
        plan.featured
          ? "border-[var(--color-primary)]/50 shadow-[0_0_40px_rgba(0,229,255,0.12)] md:-translate-y-4"
          : "border-[var(--color-border)] hover:border-[var(--color-divider)] hover:shadow-xl"
      }`}
    >
      {plan.featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-[10px] uppercase tracking-widest font-bold px-5 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)]">
          {plan.badge || "Most Popular"}
        </div>
      )}

      <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text)] mb-1">{plan.name}</h3>
      <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mb-4">{plan.subtitle}</p>

      <div className="font-display font-medium text-3xl sm:text-4xl text-[var(--color-text)] mb-2">
        {plan.price}
        {plan.period && <span className="text-lg sm:text-xl text-[var(--color-text-faint)]">{plan.period}</span>}
      </div>

      {!isMonthly && (
        <p className="text-[11px] text-[var(--color-text-faint)] mb-4">One-time payment</p>
      )}

      {plan.description && (
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mb-5 leading-relaxed">{plan.description}</p>
      )}

      {/* Feature Categories */}
      <div className="flex-1 space-y-2 mb-6">
        {plan.features?.map((category: any, idx: number) => (
          <div key={idx} className="border border-[var(--color-border)] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category.category)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between bg-[var(--color-surface-2)]/50 hover:bg-[var(--color-surface-2)] transition-colors text-left"
            >
              <span className="text-xs sm:text-sm font-semibold text-[var(--color-text)] leading-tight">{category.category}</span>
              <span className="ml-2 flex-shrink-0">
                {expandedCategories.includes(category.category) ? (
                  <ChevronUp size={14} className="text-[var(--color-primary)]" />
                ) : (
                  <ChevronDown size={14} className="text-[var(--color-text-muted)]" />
                )}
              </span>
            </button>

            <AnimatePresence>
              {expandedCategories.includes(category.category) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <ul className="px-3 sm:px-4 py-2.5 space-y-1.5">
                    {category.items.map((item: string, itemIdx: number) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <div className="mt-0.5 min-w-[14px] h-[14px] rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] flex-shrink-0">
                          <Check size={8} strokeWidth={3} />
                        </div>
                        <span className="text-[11px] sm:text-xs text-[var(--color-text-muted)] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <Button onClick={onSelect} variant={plan.featured ? "primary" : "outline"} className="w-full h-12 sm:h-14 text-sm">
        {isMonthly ? "Select Plan" : "Get Started"} <ArrowRight size={16} className="ml-2" />
      </Button>
    </div>
  );
};

export const Pricing = () => {
  const { openContactForm } = useMusicActions();
  const [isMonthly, setIsMonthly] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const activePlans = isMonthly ? monthlyPlans : websiteBuildPlans;

  return (
    <>
      <section id="pricing" className="py-16 sm:py-24 lg:py-32 bg-[var(--color-bg)] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[var(--color-primary)]/8 via-transparent to-transparent blur-[50px] lg:blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-secondary)]/8 rounded-full blur-[60px] lg:blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <Eyebrow>Transparent Pricing</Eyebrow>
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] text-[var(--color-text)] mb-4 sm:mb-6">
              Choose your starting point.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
                Scale as you grow.
              </span>
            </h2>
            <p className="text-sm sm:text-lg text-[var(--color-text-muted)] max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
              Every package is built specifically for musicians. No templates. No shortcuts. Just results.
            </p>

            {/* Toggle */}
            <div className="inline-flex bg-[var(--color-surface-dynamic)] border border-[var(--color-border)] rounded-full p-1 sm:p-1.5 relative backdrop-blur-md shadow-xl mb-6 sm:mb-8">
              <div
                className={`absolute top-1 sm:top-1.5 bottom-1 sm:bottom-1.5 w-[calc(50%-4px)] sm:w-[calc(50%-6px)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full transition-transform duration-300 ease-in-out shadow-[0_0_15px_rgba(255,42,95,0.3)] ${
                  isMonthly ? "translate-x-[calc(100%+4px)] sm:translate-x-[calc(100%+6px)]" : "translate-x-0"
                }`}
              />
              <button
                onClick={() => setIsMonthly(false)}
                className={`relative z-10 px-4 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-full transition-colors duration-300 ${
                  !isMonthly ? "text-white" : "text-[var(--color-text)] opacity-60"
                }`}
              >
                BUILDS
              </button>
              <button
                onClick={() => setIsMonthly(true)}
                className={`relative z-10 px-4 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-full transition-colors duration-300 ${
                  isMonthly ? "text-white" : "text-[var(--color-text)] opacity-60"
                }`}
              >
                MONTHLY
              </button>
            </div>

            <br />

            {/* Comparison link */}
            <button
              onClick={() => setShowComparison(true)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors font-medium mt-2"
            >
              <Table2 size={16} />
              View Full Feature Comparison
            </button>
          </div>

          {/* Plans Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isMonthly ? "monthly" : "setup"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className={`grid gap-5 sm:gap-6 lg:gap-8 mx-auto ${
                isMonthly
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl"
                  : "grid-cols-1 md:grid-cols-2 max-w-4xl"
              }`}
            >
              {activePlans.map((plan, i) => (
                <PlanCard key={plan.name} plan={plan} isMonthly={isMonthly} onSelect={openContactForm} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Custom CTA */}
          <div className="text-center mt-10 sm:mt-16">
            <p className="text-xs sm:text-sm text-[var(--color-text-faint)] mb-4">
              All prices are starting rates. Custom scoping available for established artists with complex needs.
            </p>
            <button
              onClick={openContactForm}
              className="text-xs sm:text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors font-medium underline underline-offset-4"
            >
              Need something custom? Let's talk.
            </button>
          </div>
        </div>
      </section>

      <FeatureComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        isMonthly={isMonthly}
      />
    </>
  );
};
