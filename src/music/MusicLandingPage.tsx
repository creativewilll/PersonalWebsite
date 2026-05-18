import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { JsonLd } from '../components/seo/JsonLd';
import { MusicActionsProvider, useMusicActions } from './lib/musicActions';
import { MusicContactForm } from './components/MusicContactForm';
import { LoadingScreen } from './components/LoadingScreen';

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

const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css';
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js';

function useCalendlyScript() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
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
  }, []);
}

function StickyMainSitePill() {
  return (
    <a
      href="https://williamspurlock.com"
      className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                 bg-[var(--color-surface)]/80 backdrop-blur-md border border-[var(--color-border)]
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
        name: 'Full-Stack Music Artist Websites & Growth Systems',
        provider: {
          '@type': 'ProfessionalService',
          '@id': 'https://williamspurlock.com/#organization',
          name: 'Will Spurlock',
          url: 'https://williamspurlock.com',
        },
        areaServed: 'Worldwide',
        serviceType: 'Music Artist Website Design, AEO/AIO/SEO Growth, Merch Store & Fulfillment',
        description:
          'Done-for-you websites, merch stores, print & fulfillment, Stripe + PayPal checkout, Laylo fan drops, custom artist web dashboards, and AEO/AIO/SEO growth for independent music artists.',
        url: 'https://music.williamspurlock.com/',
        offers: [
          { '@type': 'Offer', name: 'Foundation', price: '1497', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Full Stack', price: '2997', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Premium Growth', price: '4997', priceCurrency: 'USD' },
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
              text: 'Yes. The Full Stack tier includes end-to-end merch operations: store setup, Stripe + PayPal checkout, print partner integration, and shipping logistics so you never touch a label.',
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
        ],
      },
    ],
  };
}

export function MusicLandingPage() {
  useCalendlyScript();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <MusicActionsProvider>
      <MetaTags
        title="Full-Stack Websites for Music Artists | Custom Design, Merch, SEO & AEO"
        description="Done-for-you artist websites with merch stores, print & fulfillment, Stripe + PayPal, Laylo fan drops, custom dashboards, and relentless AEO/AIO/SEO growth — built by Will Spurlock for independent musicians."
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

        {!isLoading && (
          <>
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
          </>
        )}
      </div>
    </MusicActionsProvider>
  );
}

export default MusicLandingPage;
