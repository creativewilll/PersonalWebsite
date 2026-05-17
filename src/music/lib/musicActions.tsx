import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const CALENDLY_URL = 'https://calendly.com/spurlocksolutionsai/utilizing-ai';

interface MusicActions {
  openCalendly: () => void;
  openContactForm: () => void;
  closeContactForm: () => void;
  isContactFormOpen: boolean;
}

const MusicActionsContext = createContext<MusicActions | null>(null);

export function MusicActionsProvider({ children }: { children: React.ReactNode }) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openCalendly = useCallback(() => {
    const w = window as any;
    if (w.Calendly && typeof w.Calendly.initPopupWidget === 'function') {
      w.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const openContactForm = useCallback(() => setIsContactFormOpen(true), []);
  const closeContactForm = useCallback(() => setIsContactFormOpen(false), []);

  const value = useMemo<MusicActions>(
    () => ({ openCalendly, openContactForm, closeContactForm, isContactFormOpen }),
    [openCalendly, openContactForm, closeContactForm, isContactFormOpen]
  );

  return <MusicActionsContext.Provider value={value}>{children}</MusicActionsContext.Provider>;
}

export function useMusicActions(): MusicActions {
  const ctx = useContext(MusicActionsContext);
  if (!ctx) {
    return {
      openCalendly: () => window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer'),
      openContactForm: () => {},
      closeContactForm: () => {},
      isContactFormOpen: false,
    };
  }
  return ctx;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.location.hash = `#${id}`;
  }
}
