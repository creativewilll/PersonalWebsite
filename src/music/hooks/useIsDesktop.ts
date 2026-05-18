import { useEffect, useState } from 'react';

const QUERY = '(min-width: 1024px)';

/**
 * Returns true when the viewport is >= 1024px (lg breakpoint).
 * Defaults to `true` during SSR / first render to avoid hydration mismatch
 * on a desktop-majority audience — mobile users get a single repaint
 * when the effect fires.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    setIsDesktop(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}
