import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getMeasurementConsent,
  MEASUREMENT_SETTINGS_EVENT,
  setMeasurementConsent,
  subscribeMeasurementConsent,
  type MeasurementConsent,
} from '../lib/consent';
import { loadAnalytics } from '../lib/loadAnalytics';

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const applyConsent = (value: MeasurementConsent | null) => {
      if (value === 'granted') {
        loadAnalytics();
        setVisible(false);
        return;
      }
      if (value === 'denied') {
        setVisible(false);
        return;
      }
      setVisible(true);
    };

    applyConsent(getMeasurementConsent());

    const unsubscribe = subscribeMeasurementConsent(applyConsent);
    const onSettings = () => setVisible(true);
    window.addEventListener(MEASUREMENT_SETTINGS_EVENT, onSettings);

    return () => {
      unsubscribe();
      window.removeEventListener(MEASUREMENT_SETTINGS_EVENT, onSettings);
    };
  }, []);

  const choose = (value: MeasurementConsent) => {
    setMeasurementConsent(value);
    if (value === 'granted') {
      loadAnalytics();
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Measurement consent"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white/95 text-gray-900 shadow-lg shadow-gray-900/10">
        <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-5 sm:py-5">
          <p className="text-sm sm:text-base leading-relaxed text-gray-700 flex-1">
            Measurement (Google Analytics 4) loads only if you accept.{' '}
            <Link to="/privacy" className="underline underline-offset-2 text-purple-700 hover:text-purple-800">
              Privacy
            </Link>
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => choose('denied')}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => choose('granted')}
              className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
