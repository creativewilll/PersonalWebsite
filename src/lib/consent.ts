export type MeasurementConsent = 'granted' | 'denied';

const STORAGE_KEY = 'ws_measurement_consent';
const SETTINGS_EVENT = 'ws-measurement-settings';

interface StoredConsent {
  analytics: MeasurementConsent;
  ts: number;
}

const listeners = new Set<(value: MeasurementConsent | null) => void>();

let forceShowBanner = false;

function parseStored(raw: string | null): MeasurementConsent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (
      (parsed.analytics === 'granted' || parsed.analytics === 'denied') &&
      typeof parsed.ts === 'number' &&
      Number.isFinite(parsed.ts)
    ) {
      return parsed.analytics;
    }
    return null;
  } catch {
    return null;
  }
}

export function getMeasurementConsent(): MeasurementConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    return parseStored(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function setMeasurementConsent(value: MeasurementConsent): void {
  const payload: StoredConsent = { analytics: value, ts: Date.now() };
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }
  } catch {
    // private mode / quota — still notify in-memory listeners
  }
  listeners.forEach((cb) => cb(value));
}

export function subscribeMeasurementConsent(
  cb: (value: MeasurementConsent | null) => void
): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function openMeasurementSettings(): void {
  forceShowBanner = true;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(SETTINGS_EVENT, { detail: { forceShow: forceShowBanner } })
    );
  }
}

export const MEASUREMENT_SETTINGS_EVENT = SETTINGS_EVENT;
