import React from 'react';
import { motion } from 'framer-motion';
import { Industry, industryMeta } from '../../data/showcaseData/showcase-sites';

interface IndustryFilterProps {
  selected: Industry | 'all';
  onSelect: (industry: Industry | 'all') => void;
  stats: { industry: Industry; label: string; icon: string; count: number }[];
  totalCount: number;
}

export function IndustryFilter({ selected, onSelect, stats, totalCount }: IndustryFilterProps) {
  return (
    <nav aria-label="Filter by industry">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-3 sm:gap-4"
        role="group"
        aria-label="Industry filters"
      >
        {/* All button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onSelect('all')}
          aria-pressed={selected === 'all'}
          className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-[background-color,box-shadow,border-color,color] duration-300
                     flex items-center gap-2 border
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2
                     ${selected === 'all'
                       ? 'bg-white/90 text-purple-800 shadow-lg shadow-purple-500/10 border-white/50 hover:shadow-xl'
                       : 'bg-white/10 text-purple-200 hover:bg-white/20 border-white/10 hover:border-white/20'
                     }`}
        >
          {selected === 'all' && (
            <motion.div
              layoutId="activeFilterPill"
              className="absolute inset-0 bg-white/90 rounded-xl border border-white/50 shadow-lg shadow-purple-500/10"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              style={{ zIndex: -1 }}
            />
          )}
          <span>All</span>
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            selected === 'all' ? 'bg-purple-100 text-purple-700' : 'bg-white/10 text-purple-300'
          }`}>
            {totalCount}
          </span>
        </motion.button>

        {/* Industry buttons */}
        {stats.map((stat) => (
          <motion.button
            key={stat.industry}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(stat.industry)}
            aria-pressed={selected === stat.industry}
            aria-label={`Filter by ${stat.label} (${stat.count} sites)`}
            className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-[background-color,box-shadow,border-color,color] duration-300
                       flex items-center gap-2 border
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2
                       ${selected === stat.industry
                         ? 'bg-white/90 text-purple-800 shadow-lg shadow-purple-500/10 border-white/50 hover:shadow-xl'
                         : 'bg-white/10 text-purple-200 hover:bg-white/20 border-white/10 hover:border-white/20'
                       }`}
          >
            <span>{stat.icon}</span>
            <span className="hidden sm:inline">{stat.label}</span>
            <span className="sm:hidden">{stat.label.split(' ')[0]}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              selected === stat.industry ? 'bg-purple-100 text-purple-700' : 'bg-white/10 text-purple-300'
            }`}>
              {stat.count}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </nav>
  );
}
