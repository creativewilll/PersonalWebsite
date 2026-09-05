import { getMeasurementConsent } from './consent';

const GA_MEASUREMENT_ID = 'G-TQELD0FBE0';

export function loadAnalytics(): void {
  if (typeof window === 'undefined') return;
  if (getMeasurementConsent() !== 'granted') return;
  if (typeof window.gtag === 'function') return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    // GA4 expects the Arguments object, not a rest array
    window.dataLayer!.push(arguments);
  }
  window.gtag = gtag;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}
