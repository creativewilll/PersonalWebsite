import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import type { AutomationEntry } from '../../data/automationsData';
import {
  CATEGORY_COLORS,
  categoryLabel,
  formatBuiltDate,
} from './categoryStyles';

interface AutomationCardProps {
  automation: AutomationEntry;
  index: number;
  onOpen?: (slug: string) => void;
}

export function AutomationCard({ automation, index, onOpen }: AutomationCardProps) {
  const colors = CATEGORY_COLORS[automation.category];
  const visibleTags = automation.tags.slice(0, 3);
  const hours = automation.hoursSavedPerWeek;

  return (
    <motion.button
      type="button"
      onClick={() => onOpen?.(automation.slug)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        scale: 1.015,
        boxShadow: '0 16px 40px -12px rgba(126, 34, 206, 0.28)',
      }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.3) }}
      className="group flex flex-col h-full text-left p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm hover:border-purple-300/70 transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
      aria-label={`View workflow: ${automation.name}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-purple-900 transition-colors">
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

      <div className="flex items-center justify-between gap-2 mt-auto pt-1">
        <time
          dateTime={automation.built}
          className="text-xs font-medium text-gray-400"
        >
          Built {formatBuiltDate(automation.built)}
        </time>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 opacity-80 group-hover:opacity-100 transition-opacity">
          {typeof hours === 'number' && hours > 0 && (
            <span className="inline-flex items-center gap-1 text-purple-600">
              <Clock className="w-3 h-3" />
              ~{hours} hrs/wk
            </span>
          )}
          <span className="inline-flex items-center gap-0.5 text-purple-800">
            View
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
    </motion.button>
  );
}
