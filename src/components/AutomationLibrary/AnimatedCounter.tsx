import { CrawlerSafeCounter } from '../seo/CrawlerSafeCounter';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
}

/** Crawler-safe stat: final value in first HTML; subtle pulse on enter view. */
export function AnimatedCounter({ target, suffix = '' }: AnimatedCounterProps) {
  return <CrawlerSafeCounter target={target} suffix={suffix} />;
}
