import { useEffect } from 'react';

const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css';
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js';

/**
 * Injects Calendly widget scripts after the main thread is idle,
 * so they never block initial render or LCP.
 */
export function useCalendlyOnIdle() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const inject = () => {
      if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = CALENDLY_CSS;
        document.head.appendChild(link);
      }
      if (!document.querySelector(`script[src="${CALENDLY_JS}"]`)) {
        const script = document.createElement('script');
        script.src = CALENDLY_JS;
        script.async = true;
        document.head.appendChild(script);
      }
    };

    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(inject);
      return () => (window as any).cancelIdleCallback(id);
    }
    const timer = setTimeout(inject, 1500);
    return () => clearTimeout(timer);
  }, []);
}
