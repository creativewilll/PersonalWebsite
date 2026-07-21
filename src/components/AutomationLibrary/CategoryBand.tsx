import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { AutomationCategory, AutomationsSnapshot } from '../../data/automationsData';
import {
  CATEGORY_COLORS,
  CATEGORY_DESCRIPTIONS,
  CATEGORY_ORDER,
  categoryLabel,
} from './categoryStyles';

interface CategoryBandProps {
  snapshot: AutomationsSnapshot | null;
  activeCategory: AutomationCategory | 'all';
  onSelectCategory: (category: AutomationCategory) => void;
}

export function CategoryBand({
  snapshot,
  activeCategory,
  onSelectCategory,
}: CategoryBandProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="mb-12 sm:mb-16 lg:mb-20 px-4" aria-labelledby="category-breakdown-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="text-center mb-8"
      >
        <h2
          id="category-breakdown-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 mb-3"
        >
          Built Across the Business
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Seven categories of shipped workflows. Click a card to filter the full library below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CATEGORY_ORDER.map((category, i) => {
          const colors = CATEGORY_COLORS[category];
          const count = snapshot?.categories[category] ?? 0;
          const isActive = activeCategory === category;

          return (
            <motion.button
              key={category}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.05 + i * 0.05 }}
              onClick={() => onSelectCategory(category)}
              className={`text-left p-5 rounded-2xl bg-white/60 backdrop-blur-sm border shadow-sm transition-all duration-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isActive
                  ? `${colors.border} ring-2 ${colors.ring}`
                  : 'border-white/40 hover:border-purple-200/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}
                >
                  {categoryLabel(category)}
                </span>
                <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-br from-purple-700 to-yellow-500">
                  {snapshot ? count : '—'}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {CATEGORY_DESCRIPTIONS[category]}
              </p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
