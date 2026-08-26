import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CrawlerSafeCounter } from '../seo/CrawlerSafeCounter';

const stats = [
  {
    value: '25',
    numericValue: 25,
    suffix: '',
    label: 'Websites Delivered',
    source: '25 rows in src/data/showcaseData/showcase-sites.ts as of August 2026',
  },
  {
    value: '4',
    numericValue: 4,
    suffix: '',
    label: 'Industries Served',
    source: 'music, construction, cannabis, other in showcase-sites.ts as of August 2026',
  },
  {
    value: '2',
    numericValue: 2,
    suffix: '',
    label: 'Years in this book',
    source: 'year fields 2025–2026 on the 25 showcase-sites.ts rows',
  },
  {
    value: '25/25',
    numericValue: 25,
    suffix: '/25',
    label: 'Listed sites still published',
    source: '25 of 25 portfolio rows in showcase-sites.ts remain published client work as of August 2026',
  },
];

export function StatsStrip() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="relative py-20 sm:py-24" aria-label="Portfolio statistics">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-yellow-500/5 to-purple-600/5 rounded-3xl" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center relative"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-yellow-500 mb-2 tabular-nums">
                  <CrawlerSafeCounter target={stat.numericValue} suffix={stat.suffix} inView={inView} />
                </div>
                <div className="text-xs sm:text-sm text-purple-600/60 font-semibold uppercase tracking-widest">
                  {stat.label}
                </div>
                <p className="mt-2 text-[10px] sm:text-xs text-gray-500 leading-snug max-w-[14rem] mx-auto">
                  As of August 2026 · {stat.source}
                </p>

                {/* Glass divider — hidden on last item and on mobile */}
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-6 sm:-right-6 w-px h-12 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent" />
                )}
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
