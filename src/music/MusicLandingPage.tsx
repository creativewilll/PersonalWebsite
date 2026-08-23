import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { JsonLd } from '../components/seo/JsonLd';
import { siteUrl } from '../lib/siteUrl';
import { MusicActionsProvider, useMusicActions } from './lib/musicActions';
import { MusicContactForm } from './components/MusicContactForm';
import { LoadingScreen } from './components/LoadingScreen';
import { useCalendlyOnIdle } from './hooks/useCalendlyOnIdle';

import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Problem } from './sections/Problem';
import { Solution } from './sections/Solution';
import { Services } from './sections/Services';
import { DeepDiveWebsite } from './sections/DeepDiveWebsite';
import { DeepDiveSEO } from './sections/DeepDiveSEO';
import { LayloAirtable } from './sections/LayloAirtable';
import { HowItWorks } from './sections/HowItWorks';
import { ComparisonTable } from './sections/ComparisonTable';
import { Results } from './sections/Results';
import { BrandStory } from './sections/BrandStory';
import { Pricing } from './sections/Pricing';
import { Guarantee, FAQ, musicFaqs } from './sections/FAQAndGuarantee';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';

function useScrollLock(locked: boolean) {
  useEffect(() => {
    const html = document.documentElement;
    if (!locked) {
      // Defensively clear any inline overflow that the prerender snapshot
      // may have baked in while the LoadingScreen was visible.
      if (html.style.overflow === 'hidden') html.style.overflow = '';
      return;
    }
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = ''; };
  }, [locked]);
}

function StickyMainSitePill() {
  return (
    <a
      href="/"
      className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                 bg-[var(--color-surface)]/80 lg:backdrop-blur-md border border-[var(--color-border)]
                 text-xs font-semibold tracking-wide text-[var(--color-text-muted)]
                 hover:text-[var(--color-text)] hover:border-[var(--color-primary)]
                 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,42,95,0.25)]"
      aria-label="Back to Will Spurlock main site"
    >
      <ArrowLeft size={14} />
      <span>View main site</span>
    </a>
  );
}

function ContactFormPortalHost() {
  const { isContactFormOpen, closeContactForm } = useMusicActions();
  return <MusicContactForm isOpen={isContactFormOpen} onClose={closeContactForm} />;
}

function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://williamspurlock.com/music/#service',
        name: 'The Sovereign Artist Platform — AI-Native Music Career Infrastructure',
        provider: {
          '@type': 'ProfessionalService',
          '@id': 'https://williamspurlock.com/#organization',
          name: 'Will Spurlock',
          url: 'https://williamspurlock.com',
        },
        areaServed: 'Worldwide',
        serviceType: 'Music Artist Website Design, AEO/AIO/SEO Growth, Merch Store & Fulfillment, Copyright & Royalty Infrastructure, AI Composition',
        description:
          'Done-for-you websites, merch stores, print & fulfillment, Stripe + PayPal checkout, Laylo fan drops, blockchain-backed copyright protection, unified royalty dashboards, AI composition tools, custom artist web dashboards, and AEO/AIO/SEO growth for independent music artists.',
        url: 'https://williamspurlock.com/music/',
        offers: [
          { '@type': 'Offer', name: 'Launchpad Build', price: '3500', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Baller Build', price: '12500', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Sovereign Build', price: '35000', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Foundation Monthly', price: '1500', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Growth Monthly', price: '6500', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Insane Monthly', price: '15000', priceCurrency: 'USD' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://williamspurlock.com/music/#faq',
        mainEntity: musicFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };
}

function isPrerenderSnapshot() {
  if (typeof navigator !== 'undefined' && navigator.webdriver) return true;
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search).has('prerender');
  }
  return false;
}

export function MusicLandingPage() {
  useCalendlyOnIdle();
  const [isLoading, setIsLoading] = useState(() => !isPrerenderSnapshot());
  useScrollLock(isLoading && !isPrerenderSnapshot());

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <MusicActionsProvider>
      <MetaTags
        title="Artist websites with merch and AEO"
        description="Will Spurlock builds artist websites with merch, copyright, and AEO from $3,500 so ChatGPT and Google AI Overviews can cite independent musicians."
        url={siteUrl('/music')}
        canonical={siteUrl('/music')}
        image="https://williamspurlock.com/og/music-1200x630.webp"
        imageWidth={1200}
        imageHeight={630}
        imageAlt="Artist websites with merch and AEO"
      />
      <JsonLd data={buildJsonLd()} />

      <div
        data-music-theme
        data-theme="dark"
        className="bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-primary)] selection:text-white min-h-screen"
      >
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
        </AnimatePresence>

        <Navigation />
        <main>
          <Hero />
          <Problem />
          <Solution />
          <Services />
          <DeepDiveWebsite />
          <DeepDiveSEO />
          <LayloAirtable />
          <HowItWorks />
          <ComparisonTable />
          <Results />
          <BrandStory />
          <Pricing />
          <Guarantee />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
        <StickyMainSitePill />
        <ContactFormPortalHost />
      </div>
    </MusicActionsProvider>
  );
}

export default MusicLandingPage;
