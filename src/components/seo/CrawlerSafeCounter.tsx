import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CrawlerSafeCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  /** When provided, skip internal observer and animate when this becomes true. */
  inView?: boolean;
}

/**
 * Renders the final formatted stat in the first HTML paint (SSR / prerender / no-JS).
 * Sighted users get a brief scale pulse when the stat enters view — the text node
 * never drops to 0, so crawlers and Playwright prerender keep real numbers.
 */
export function CrawlerSafeCounter({
  target,
  suffix = '',
  prefix = '',
  className = '',
  inView: inViewProp,
}: CrawlerSafeCounterProps) {
  const [ref, observedInView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const inView = inViewProp ?? observedInView;
  const formatted = String(target);

  return (
    <motion.span
      ref={inViewProp === undefined ? ref : undefined}
      className={className}
      initial={false}
      animate={inView ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ display: 'inline-block' }}
    >
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  );
}
