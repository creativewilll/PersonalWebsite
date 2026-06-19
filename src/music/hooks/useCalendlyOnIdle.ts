import { useEffect } from 'react';

const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css';
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js';

function getCalendlyScript(): HTMLScriptElement | null {
  return document.querySelector(`script[src="${CALENDLY_JS}"]`);
}

function isCalendlyReady(): boolean {
  return typeof (window as any).Calendly?.initPopupWidget === 'function';
}

/**
 * Injects Calendly widget scripts after the main thread is idle,
 * so they never block initial render or LCP. Returns a promise that
 * resolves once Calendly is ready, or rejects on script error/timeout.
 */
export function loadCalendlyWidget(timeoutMs = 10000): Promise<void> {
  if (typeof document === 'undefined') return Promise.reject(new Error('No document'));
  if (isCalendlyReady()) return Promise.resolve();

  const existingScript = getCalendlyScript();
  if (existingScript) {
    return new Promise((resolve, reject) => {
      const onLoad = () => resolve();
      const onError = () => reject(new Error('Calendly script failed to load'));
      if ((existingScript as any).loaded) {
        // Script already fired load; wait for Calendly init if needed
        const check = setInterval(() => {
          if (isCalendlyReady()) {
            clearInterval(check);
            resolve();
          }
        }, 50);
        setTimeout(() => {
          clearInterval(check);
          reject(new Error('Calendly widget did not initialize in time'));
        }, timeoutMs);
        return;
      }
      existingScript.addEventListener('load', onLoad, { once: true });
      existingScript.addEventListener('error', onError, { once: true });
      setTimeout(() => reject(new Error('Calendly script load timed out')), timeoutMs);
    });
  }

  return new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CALENDLY_CSS;
      document.head.appendChild(link);
    }

    const script = document.createElement('script');
    script.src = CALENDLY_JS;
    script.async = true;

    const cleanup = () => {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
      clearTimeout(timer);
    };

    const onLoad = () => {
      (script as any).loaded = true;
      cleanup();
      // Calendly object attaches slightly after script load in some cases
      const check = setInterval(() => {
        if (isCalendlyReady()) {
          clearInterval(check);
          resolve();
        }
      }, 50);
      setTimeout(() => {
        clearInterval(check);
        reject(new Error('Calendly widget did not initialize in time'));
      }, timeoutMs);
    };

    const onError = () => {
      cleanup();
      reject(new Error('Calendly script failed to load'));
    };

    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('Calendly script load timed out'));
    }, timeoutMs);

    document.head.appendChild(script);
  });
}

/**
 * Hook: starts loading the Calendly widget in the background as soon as
 * the component mounts. The actual open handler should call
 * loadCalendlyWidget() to ensure readiness.
 */
export function useCalendlyOnIdle() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const inject = () => {
      if (getCalendlyScript() || isCalendlyReady()) return;
      if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = CALENDLY_CSS;
        document.head.appendChild(link);
      }
      const script = document.createElement('script');
      script.src = CALENDLY_JS;
      script.async = true;
      document.head.appendChild(script);
    };

    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(inject);
      return () => (window as any).cancelIdleCallback(id);
    }
    const timer = setTimeout(inject, 1500);
    return () => clearTimeout(timer);
  }, []);
}
