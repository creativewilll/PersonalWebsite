import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { JsonLd } from '../components/seo/JsonLd';
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
import { Guarantee, FAQ } from './sections/FAQAndGuarantee';
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
      href="https://williamspurlock.com"
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
        '@id': 'https://music.williamspurlock.com/#service',
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
        url: 'https://music.williamspurlock.com/',
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
        '@id': 'https://music.williamspurlock.com/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How long does a full-stack artist website take to build?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most artist sites launch in 3–5 weeks: discovery week 1, build weeks 2–3, merch + integrations week 4, AEO/SEO polish + launch week 5.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you handle merch fulfillment and shipping?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The Baller and Sovereign tiers include end-to-end merch operations: store setup, Stripe + PayPal checkout, print partner integration, and shipping logistics so you never touch a label.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is AEO and why do music artists need it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Answer Engine Optimization (AEO) gets your artist cited by ChatGPT, Perplexity, Google AI Overviews, and Gemini when fans ask "who sounds like…" questions. It is now as important as Spotify SEO for new fan discovery.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the artist web dashboard?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Your custom-built web dashboard aggregates all your key metrics — website traffic, merch revenue, email list growth, SEO keyword rankings, and fan data — into one clean interface so you never have to log into 6 different platforms again.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does blockchain copyright protection work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every track is fingerprinted at save-time and locked to an immutable on-chain record. This provides instant IP protection without traditional copyright filing paperwork or waiting periods. Available on all build tiers.',
            },
          },
          {
            '@type': 'Question',
            name: 'What AI composition tools are included?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Baller Build and Growth/Insane retainers include access to our composition assistant featuring 5-part AI harmonization from a single signal input plus live effects. This neuroscience-informed tool is accessible as a progressive web app.',
            },
          },
        ],
      },
    ],
  };
}

export function MusicLandingPage() {
  useCalendlyOnIdle();
  const [isLoading, setIsLoading] = useState(true);
  useScrollLock(isLoading);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <MusicActionsProvider>
      <MetaTags
        title="The Sovereign Artist Platform | AI-Native Websites, Copyright, Royalties & Growth"
        description="Done-for-you artist websites with merch stores, print & fulfillment, Stripe + PayPal, Laylo fan drops, blockchain-backed copyright, unified royalty dashboards, AI composition tools, custom dashboards, and relentless AEO/AIO/SEO growth — built by Will Spurlock for independent musicians."
        url="https://music.williamspurlock.com/"
      />
      <JsonLd data={buildJsonLd()} />
      <link rel="canonical" href="https://music.williamspurlock.com/" />

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
