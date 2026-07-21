import React from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
}

/** Count-up when the stat enters view. Copied from Projects section pattern. */
export function AnimatedCounter({ target, suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = React.useState(target);
  const [hasHydrated, setHasHydrated] = React.useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  React.useEffect(() => {
    setHasHydrated(true);
    setCount(0);
  }, []);

  React.useEffect(() => {
    if (!inView || !hasHydrated) return;
    let start = 0;
    const duration = 1800;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
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
  }, [inView, hasHydrated, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
