import React from 'react';
import { motion } from 'framer-motion';
import type { AutomationEntry } from '../../data/automationsData';
import {
  CATEGORY_COLORS,
  categoryLabel,
  formatBuiltDate,
} from './categoryStyles';

interface AutomationCardProps {
  automation: AutomationEntry;
  index: number;
}

export function AutomationCard({ automation, index }: AutomationCardProps) {
  const colors = CATEGORY_COLORS[automation.category];
  const visibleTags = automation.tags.slice(0, 3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.3) }}
      className="flex flex-col h-full p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-md hover:border-purple-200/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-semibold text-gray-900 leading-snug">
          {automation.name}
        </h3>
        <span
          className={`shrink-0 inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${colors.bg} ${colors.text}`}
        >
          {categoryLabel(automation.category)}
        </span>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-1">
        {automation.brief}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-100"
          >
            {tag}
          </span>
        ))}
      </div>

      <time
        dateTime={automation.built}
        className="text-xs font-medium text-gray-400"
      >
        Built {formatBuiltDate(automation.built)}
      </time>
    </motion.article>
  );
}
