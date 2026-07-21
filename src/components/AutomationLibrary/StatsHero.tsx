import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Layers, Calendar, Tags } from 'lucide-react';
import type { AutomationsSnapshot } from '../../data/automationsData';
import { AnimatedCounter } from './AnimatedCounter';
import { monthsBuilding } from './categoryStyles';

interface StatsHeroProps {
  snapshot: AutomationsSnapshot | null;
}

export function StatsHero({ snapshot }: StatsHeroProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categoryCount = snapshot ? Object.keys(snapshot.categories).length : 7;
  const months = snapshot
    ? monthsBuilding(snapshot.firstBuilt, snapshot.lastBuilt)
    : 0;
  const integrationCount = snapshot
    ? new Set(snapshot.automations.flatMap((a) => a.tags)).size
    : 0;
  const total = snapshot?.total ?? 0;

  const stats = [
    { value: total, suffix: '', label: 'Production Automations', icon: Zap },
    { value: categoryCount, suffix: '', label: 'Business Categories', icon: Layers },
    { value: months, suffix: '', label: 'Months Building', icon: Calendar },
    { value: integrationCount, suffix: '', label: 'Tags & Integrations', icon: Tags },
  ];

  return (
    <motion.header
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10 sm:mb-14 lg:mb-16 px-4"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/60 mb-6">
        <Zap className="w-4 h-4 text-purple-600" />
        <span className="text-sm font-semibold text-purple-700 tracking-wide uppercase">
          Production Portfolio
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-[1.1]">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500">
          The Automation Library
        </span>
      </h1>

      <p className="text-purple-900/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10">
        {snapshot
          ? `${snapshot.total} production automations architected and shipped since Feb 2025, for real clients across marketing, ops, sales, and finance.`
          : 'Production automations architected and shipped for real clients across marketing, ops, sales, and finance.'}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="text-center p-5 sm:p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Icon className="w-5 h-5 text-purple-500" />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-purple-700 to-yellow-500">
                  {snapshot ? (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  ) : (
                    '—'
                  )}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-500 tracking-wide">
                {stat.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.header>
  );
}
