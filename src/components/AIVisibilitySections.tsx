import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  AlertTriangle,
  Eye,
  Layers,
  Search,
  MessageSquare,
  Sparkles,
  Paintbrush,
  Zap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  Globe,
  TrendingUp,
  Users,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   Shared helpers
   ═══════════════════════════════════════════ */

function SectionWrapper({
  id,
  children,
  className = '',
  dark = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative py-20 sm:py-28 lg:py-36 overflow-hidden ${
        dark ? 'bg-gray-950 text-white' : ''
      } ${className}`}
    >
      {children}
    </section>
  );
}

/* Animated counter — re-used for stats */
function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
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

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════
   Section 1 — The Extinction Event
   ═══════════════════════════════════════════ */

export function TheExtinctionEvent() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper dark>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-red-900/20 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-orange-900/15 blur-[100px]" />
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400 tracking-wide uppercase">
              Urgent — Read This Carefully
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-[1.1]">
            <span className="block text-white">This Is the Biggest Shift</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
              Since the Internet Was Born
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
        >
          <p>
            When the internet arrived in the '90s, businesses that ignored it went bankrupt within a
            decade. But here's the terrifying part:{' '}
            <strong className="text-white">AI is moving 10x faster than the internet ever did.</strong>
          </p>

          <p>
            Google is actively replacing blue links with AI-generated answers. ChatGPT processes{' '}
            <strong className="text-white">1 billion+ queries per week.</strong> Perplexity is
            growing 40% month-over-month. Your customers are already asking AI where to spend their
            money — and{' '}
            <strong className="text-orange-300">
              if AI doesn't know your brand exists, you are already invisible.
            </strong>
          </p>

          <div className="relative my-10 p-6 sm:p-8 rounded-2xl bg-white/5 border border-red-500/20 backdrop-blur-sm">
            <p className="text-xl sm:text-2xl font-bold text-white mb-4">
              Ask yourself these questions:
            </p>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                What if Google removed traditional search results entirely next year and only kept AI
                Overviews?
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                What if ChatGPT became the default homepage on every browser?
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                What if your competitor optimized for AI search today and you didn't?
              </li>
            </ul>
            <p className="mt-6 text-orange-300 font-semibold">
              These aren't hypotheticals. This is the trajectory we are on right now.
            </p>
          </div>

          <p className="text-xl font-semibold text-white">
            The businesses that aggressively optimize for AI Visibility today will own their markets
            for the next decade. The ones that wait will join the graveyard of companies that thought
            the internet was "just a fad."
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   Section 2 — What Is AI Visibility?
   ═══════════════════════════════════════════ */

export function WhatIsAIVisibility() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-200/30 to-yellow-100/20 blur-3xl" />
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/60 mb-6">
            <Eye className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 tracking-wide uppercase">
              The New Standard
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-purple-600 to-yellow-500">
              AI Visibility:
            </span>
            <span className="block text-gray-900">
              The New Standard for Being Found Online
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 text-lg sm:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto"
        >
          <p>
            <strong className="text-gray-900">AI Visibility</strong> is the discipline of
            engineering your digital presence so that AI engines — ChatGPT, Google AI Overviews,
            Perplexity, Claude, Gemini — can{' '}
            <strong className="text-purple-700">discover, understand, and recommend</strong> your
            brand.
          </p>

          <p>
            Traditional SEO asked:{' '}
            <em className="text-gray-500">"How do I rank on page 1?"</em>{' '}
            AI Visibility asks:{' '}
            <strong className="text-purple-700">
              "How do I become the answer AI gives when someone asks about my industry?"
            </strong>
          </p>

          <div className="relative my-10 p-6 sm:p-8 rounded-2xl bg-white/60 backdrop-blur-md border border-purple-200/40 shadow-lg">
            <p className="text-lg font-bold text-gray-900 mb-4">
              I coined the term "AI Visibility" to unify three emerging disciplines under one roof:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <strong className="text-purple-700">AIO</strong>{' '}
                  <span className="text-gray-600">
                    (AI Optimization) — Structuring your site so AI crawlers can parse and index it
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <strong className="text-yellow-600">AEO</strong>{' '}
                  <span className="text-gray-600">
                    (Answer Engine Optimization) — Making your content the definitive answer AI cites
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <strong className="text-green-600">GEO</strong>{' '}
                  <span className="text-gray-600">
                    (Generative Engine Optimization) — Optimizing for generative search engines
                    specifically
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <p className="text-xl font-semibold text-gray-900">
            Most agencies are still running 2019 SEO playbooks.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500">
              I am engineering for 2027.
            </span>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   Section 3 — The Three Pillars
   ═══════════════════════════════════════════ */

const pillars = [
  {
    icon: Search,
    label: 'AIO',
    title: 'AI Optimization',
    color: 'purple',
    gradient: 'from-purple-500 to-purple-700',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200/50',
    iconColor: 'text-purple-600',
    description:
      "Structuring your website's code, schema markup, and semantic HTML so AI crawlers can actually read and understand your content. Most websites are invisible to AI because their code is a mess of templates and bloated plugins.",
  },
  {
    icon: MessageSquare,
    label: 'AEO',
    title: 'Answer Engine Optimization',
    color: 'yellow',
    gradient: 'from-yellow-500 to-orange-500',
    bgLight: 'bg-yellow-50',
    borderColor: 'border-yellow-200/50',
    iconColor: 'text-yellow-600',
    description:
      'Engineering your content to be the direct, definitive answer that AI engines cite. When someone asks ChatGPT "best HVAC company near me," your brand needs to be the response — not buried in a list AI will never surface.',
  },
  {
    icon: Sparkles,
    label: 'GEO',
    title: 'Generative Engine Optimization',
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-200/50',
    iconColor: 'text-green-600',
    description:
      "Optimizing specifically for generative search engines like Perplexity, Google AI Overviews, and AI Mode. These engines don't rank pages — they synthesize answers. Your content must be structured to be synthesized, not just indexed.",
  },
];

export function ThreePillars() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper>
      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/60 mb-6">
            <Layers className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 tracking-wide uppercase">
              The Framework
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-purple-600 to-yellow-500">
              The Three Pillars
            </span>
            <span className="block text-gray-900">of AI Visibility</span>
          </h2>

          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            AI Visibility isn't one thing — it's three interlocking disciplines that work together to make your brand the one AI recommends.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className="group relative"
              >
                {/* Animated gradient border */}
                <div className="absolute -inset-[1px] bg-gradient-to-br from-purple-300/60 via-yellow-200/40 to-purple-300/60 rounded-2xl blur group-hover:blur-md transition-all duration-300 opacity-60 group-hover:opacity-100" />

                <div
                  className={`relative bg-white/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 border ${pillar.borderColor} hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-xl h-full`}
                >
                  <div className="mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl ${pillar.bgLight} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-7 h-7 ${pillar.iconColor}`} />
                    </div>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${pillar.gradient} mb-3`}
                    >
                      {pillar.label}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{pillar.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   Section 4 — Brand-First Web Design
   ═══════════════════════════════════════════ */

export function BrandFirstWebDesign() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-yellow-200/25 to-purple-100/15 blur-3xl" />
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/60 mb-6">
            <Paintbrush className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 tracking-wide uppercase">
              Premium Brand Experiences
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-purple-600 to-yellow-500">
              Websites That Look Like $20K
            </span>
            <span className="block text-gray-900">and Rank Like a Machine</span>
          </h2>

          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            AI Visibility means nothing if your website looks like a $500 template.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed mb-14"
        >
          <p>
            When AI recommends your brand and a potential customer lands on your site, the design
            needs to instantly communicate{' '}
            <strong className="text-gray-900">authority, trust, and premium value.</strong>
          </p>
          <p>
            I custom-code every website from scratch —{' '}
            <strong className="text-purple-700">no WordPress, no Wix, no Webflow.</strong> Pure
            React-powered, pre-rendered architectures with hand-crafted design systems. The result?
            Sites that load in under 1 second, score 95+ on Core Web Vitals, and convert visitors at
            3–5x industry averages.
          </p>
        </motion.div>

        {/* Template vs Custom comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Template side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-2xl p-6 sm:p-8 bg-red-50/60 border border-red-200/40 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-bold text-red-800">Template Websites</h3>
            </div>
            <ul className="space-y-3 text-red-900/80">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                Bloated code AI crawlers can't parse
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                Generic designs that scream "cheap"
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                3–6 second load times
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                No structured data or schema graphs
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                Invisible to AI search engines
              </li>
            </ul>
          </motion.div>

          {/* Custom side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative rounded-2xl p-6 sm:p-8 bg-green-50/60 border border-green-200/40 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold text-green-800">Custom-Coded Brand Experiences</h3>
            </div>
            <ul className="space-y-3 text-green-900/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                Clean semantic HTML AI crawlers love
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                Premium designs that convert on sight
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                Sub-1-second load times
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                Custom JSON-LD schema graphs
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                Engineered for AI citation
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10 text-xl font-bold text-gray-900"
        >
          Beautiful design + AI-native architecture ={' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500">
            the ultimate competitive advantage.
          </span>
        </motion.p>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   Section 5 — AI Visibility vs Traditional SEO
   ═══════════════════════════════════════════ */

const comparisonRows = [
  { old: 'Optimize for keywords', new: 'Optimize for semantic understanding' },
  { old: 'Rank on page 1 of Google', new: 'Become the answer AI gives directly' },
  { old: 'Build backlinks', new: 'Build structured data graphs' },
  { old: 'Write for search crawlers', new: 'Write for LLM comprehension' },
  { old: 'Monthly SEO reports', new: 'Real-time AI citation monitoring' },
  { old: 'Template website builders', new: 'Custom-coded semantic architectures' },
  { old: 'Hope for a click', new: 'Guarantee a recommendation' },
];

export function AIVisibilityVsSEO() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper dark>
      <div ref={ref} className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400 tracking-wide uppercase">
              The Paradigm Shift
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            <span className="block text-white">Traditional SEO Is a</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
              Dead Man Walking
            </span>
          </h2>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm"
        >
          {/* Table header */}
          <div className="grid grid-cols-2 bg-white/5 border-b border-white/10">
            <div className="p-4 sm:p-5 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span className="font-bold text-red-400 text-sm sm:text-base">
                Traditional SEO (Dying)
              </span>
            </div>
            <div className="p-4 sm:p-5 flex items-center gap-2 border-l border-white/10">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="font-bold text-green-400 text-sm sm:text-base">
                AI Visibility (The Future)
              </span>
            </div>
          </div>

          {comparisonRows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className={`grid grid-cols-2 ${i < comparisonRows.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              <div className="p-4 sm:p-5 text-gray-400 text-sm sm:text-base line-through decoration-red-400/40">
                {row.old}
              </div>
              <div className="p-4 sm:p-5 text-white font-medium text-sm sm:text-base border-l border-white/10">
                {row.new}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Every dollar you spend on traditional SEO today is a dollar spent propping up a system
          that is being dismantled in real-time. The businesses adopting AI Visibility{' '}
          <strong className="text-white">NOW</strong> are the ones that will dominate for the next
          decade.{' '}
          <strong className="text-yellow-400">The window to be early is closing fast.</strong>
        </motion.p>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   Section 6 — The Window Is Closing
   ═══════════════════════════════════════════ */

export function TheWindowIsClosing() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-purple-200/20 to-yellow-100/10 blur-[120px]" />
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200/60 mb-6">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700 tracking-wide uppercase">
              Time-Sensitive
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            <span className="block text-gray-900">The First-Mover Advantage</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-red-500 to-purple-600">
              Won't Last Forever
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 text-lg sm:text-xl text-gray-700 leading-relaxed"
        >
          <p>
            Right now, AI Visibility is where SEO was in 2005. The businesses that invested in SEO
            early dominated their markets for 15 years. The ones that waited?{' '}
            <strong className="text-gray-900">
              They spent 10x more trying to catch up and most never did.
            </strong>
          </p>

          <p>
            <strong className="text-red-600">The AI transition is happening 10x faster.</strong> You
            don't have 5 years. You might not have 2. Google is already defaulting to AI Overviews
            for most queries. ChatGPT is processing over a billion queries a week. Perplexity just
            raised another $500M to accelerate.
          </p>

          <p>
            Every week you wait, your competitors are getting indexed, cited, and recommended. Every
            week you wait,{' '}
            <strong className="text-gray-900">
              the moat they're building around their brand gets deeper.
            </strong>
          </p>

          <div className="relative my-10 p-8 rounded-2xl bg-gradient-to-br from-purple-900 to-gray-900 text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20" />
            <p className="text-xl sm:text-2xl font-bold mb-4 relative z-10">
              The question isn't <em>whether</em> you'll invest in AI Visibility.
            </p>
            <p className="text-lg text-purple-200 relative z-10 mb-8">
              The question is whether you'll do it while it's still affordable — or after you've
              already lost your market position.
            </p>
            <a
              href="#contact"
              className="relative z-10 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-4 px-8 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Claim Your Free AI Visibility Audit
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   Section 7 — Who This Is For
   ═══════════════════════════════════════════ */

const qualifiers = [
  'Your business depends on customers finding you online',
  "You're spending money on SEO that isn't delivering results anymore",
  'You have a template website (WordPress, Wix, Squarespace, Webflow)',
  "You've noticed your organic traffic declining despite doing \"everything right\"",
  'You want to be the brand AI recommends — not your competitor',
  'You understand that the internet is shifting and you refuse to be left behind',
];

export function WhoThisIsFor() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper>
      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/60 mb-6">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 tracking-wide uppercase">
              Is This You?
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            <span className="block text-gray-900">Is Your Brand Ready</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-purple-600 to-yellow-500">
              for the AI Era?
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative p-6 sm:p-10 rounded-2xl bg-white/50 backdrop-blur-md border border-purple-200/30 shadow-lg"
        >
          <p className="text-lg sm:text-xl font-bold text-gray-900 mb-8">
            AI Visibility is critical for you if:
          </p>

          <ul className="space-y-4 mb-10">
            {qualifiers.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-3 text-gray-700 text-base sm:text-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            I work with small businesses, blue-collar trades, cannabis brands, music artists, and
            forward-thinking companies who want to{' '}
            <strong className="text-gray-900">own their market in the AI era</strong> — not rent it
            from a dying search engine.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════
   Section 8 — AI Visibility Results
   ═══════════════════════════════════════════ */

const visibilityStats = [
  { value: 100, suffix: '%', prefix: '', label: 'AI Crawler Indexation Rate', icon: Target },
  { value: 25, suffix: '+', prefix: '', label: 'Premium Brands Built & Positioned', icon: Globe },
  {
    value: 500,
    suffix: 'M+',
    prefix: '',
    label: 'Cross-Platform Impressions Generated',
    icon: TrendingUp,
  },
  { value: 1, suffix: 's', prefix: '<', label: 'Average Page Load Time', icon: Zap },
];

export function AIVisibilityResults() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper>
      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/60 mb-6">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 tracking-wide uppercase">
              Proven Results
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-purple-600 to-yellow-500">
              The Numbers Don't Lie
            </span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {visibilityStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group text-center p-5 sm:p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-xl hover:border-purple-200/60 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors" />
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-purple-700 to-yellow-500">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Every website I build is engineered from the ground up with pre-rendering pipelines,
          custom JSON-LD schema graphs, and semantic HTML so that AI crawlers — Perplexity, ChatGPT,
          Google AI Overviews —{' '}
          <strong className="text-gray-900">
            can read, understand, and cite your business before your competitors.
          </strong>
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
