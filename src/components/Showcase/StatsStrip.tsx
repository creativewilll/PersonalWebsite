import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: '18+', numericValue: 18, suffix: '+', label: 'Websites Delivered' },
  { value: '4', numericValue: 4, suffix: '', label: 'Industries Served' },
  { value: '3+', numericValue: 3, suffix: '+', label: 'Years Building' },
  { value: '100%', numericValue: 100, suffix: '%', label: 'Client Satisfaction' },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1200; // ms
    const steps = 40;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * target);
      setCount(current);

      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{inView ? `${count}${suffix}` : `0${suffix}`}</>;
}

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
                  <AnimatedCounter target={stat.numericValue} suffix={stat.suffix} inView={inView} />
                </div>
                <div className="text-xs sm:text-sm text-purple-600/60 font-semibold uppercase tracking-widest">
                  {stat.label}
                </div>

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
