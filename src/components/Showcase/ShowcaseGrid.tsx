import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ShowcaseSite } from '../../data/showcaseData/showcase-sites';
import { ShowcaseCard } from './ShowcaseCard';

interface ShowcaseGridProps {
  sites: ShowcaseSite[];
}

export function ShowcaseGrid({ sites }: ShowcaseGridProps) {
  return (
    <div className="relative w-full" role="list" aria-label="Website portfolio">
      {/* Removed motion.div with layout prop — eliminates expensive layout recalculations
          during scroll and filter changes. CSS Grid handles animations via browser paint. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 justify-items-center">
        <AnimatePresence mode="sync">
          {sites.map((site, index) => (
            <div key={site.id} className="w-full max-w-[95%]" role="listitem">
              <ShowcaseCard site={site} index={index} />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {sites.length === 0 && (
        <div className="text-center py-20">
          <p className="text-purple-400/60 text-lg">No websites in this category yet.</p>
        </div>
      )}
    </div>
  );
}
