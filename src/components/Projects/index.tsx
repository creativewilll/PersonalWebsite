import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ProjectsGrid } from './ProjectsGrid';
import { Zap, Bot, Workflow, Code2, ArrowRight, TrendingUp, Clock, Target, Sparkles } from 'lucide-react';

interface ProjectsProps {
  className?: string;
  showFeatured?: boolean;
}

/* ─── Animated counter for stat numbers ─── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = React.useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Category filter pills ─── */
const categories = [
  { key: 'all' as const, label: 'All Work', icon: Sparkles },
  { key: 'agent' as const, label: 'AI Agents', icon: Bot },
  { key: 'workflow' as const, label: 'Automations', icon: Workflow },
  { key: 'fullstack' as const, label: 'Full-Stack Apps', icon: Code2 },
];

/* ─── Stats that establish credibility ─── */
const stats = [
  { value: 50, suffix: '+', label: 'Automations Deployed', icon: Zap },
  { value: 10, suffix: 'K+', label: 'Hours Saved for Clients', icon: Clock },
  { value: 95, suffix: '%', label: 'Client Retention Rate', icon: Target },
  { value: 3, suffix: 'x', label: 'Average ROI Increase', icon: TrendingUp },
];

export function Projects({ className = '', showFeatured = true }: ProjectsProps) {
  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeFilter, setActiveFilter] = useState<'all' | 'agent' | 'workflow' | 'fullstack'>('all');

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative ${showFeatured ? 'py-24 sm:py-32 lg:py-40' : ''} overflow-hidden ${className}`}
      aria-label="AI automation and development project portfolio"
    >
      {/* ─── Decorative background accents ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-200/30 to-yellow-100/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-yellow-200/25 to-purple-100/15 blur-3xl" />
      </div>

      <div className="relative w-full sm:w-11/12 lg:w-[90%] mx-auto">
        {showFeatured && (
          <>
            {/* ═══════════ SECTION HEADER ═══════════ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-6 sm:mb-8 px-4"
            >
              {/* Eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/60 mb-6"
              >
                <Zap className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700 tracking-wide uppercase">
                  Real Results, Real Systems
                </span>
              </motion.div>

              {/* Main heading — H2 for SEO */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-[1.1]">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-purple-600 to-yellow-500">
                  AI Automations That
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-purple-600 to-purple-800">
                  Transform Businesses
                </span>
              </h2>

              {/* Rich descriptive copy — AIO/AEO optimized */}
              <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Every project below started with a bottleneck — manual data entry, missed leads,
                slow response times, or broken handoffs. I architect{' '}
                <strong className="text-gray-800">custom AI agents, n8n workflows, and full-stack applications</strong>{' '}
                that eliminate friction and compound revenue.
                Here's a curated selection of work that delivered measurable impact.
              </p>
            </motion.div>

            {/* ═══════════ IMPACT METRICS BAR ═══════════ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0 mb-10 sm:mb-14"
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="relative group text-center p-5 sm:p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-lg hover:border-purple-200/60 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors" />
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-purple-700 to-yellow-500">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-500 tracking-wide">
                      {stat.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ═══════════ CATEGORY FILTER PILLS ═══════════ */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14 px-4"
              role="tablist"
              aria-label="Filter projects by category"
            >
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeFilter === cat.key;
                return (
                  <motion.button
                    key={cat.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(cat.key)}
                    className={`
                      inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold
                      transition-all duration-300 border
                      ${isActive
                        ? 'bg-gradient-to-r from-purple-600 to-yellow-500 text-white border-transparent shadow-lg shadow-purple-500/20'
                        : 'bg-white/70 text-gray-600 border-gray-200/60 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50/50'
                      }
                    `}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}

        {/* ═══════════ PROJECT GRID ═══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectsGrid
                selectedType={activeFilter}
                showFeatured={showFeatured}
              />
            </motion.div>
          </AnimatePresence>

          {showFeatured && (
            <motion.div
              className="mt-14 sm:mt-16 flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* CTA Button */}
              <Link to="/projects">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 text-white rounded-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-500 hover:to-yellow-400 shadow-lg hover:shadow-[0_0_40px_rgba(147,51,234,0.35)] transition-all duration-300 font-semibold text-base sm:text-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore the Full Portfolio
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>

              {/* Trust micro-copy */}
              <p className="text-sm text-gray-400 max-w-lg text-center leading-relaxed">
                Every system is custom-built from scratch — no cookie-cutter templates.
                <br className="hidden sm:block" />
                Powered by OpenAI, Claude, n8n, Supabase, and modern web frameworks.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
