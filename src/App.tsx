import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SectionSkeleton, CardGridSkeleton } from './components/ui/SkeletonLoaders';

// ── Below-the-fold home sections (lazy) ──
const HomeFeaturedWebsites = lazy(() =>
  import('./components/HomeFeaturedWebsites').then(m => ({ default: m.HomeFeaturedWebsites }))
);
const Projects = lazy(() =>
  import('./components/Projects').then(m => ({ default: m.Projects }))
);
const BlogPreview = lazy(() =>
  import('./components/Blog').then(m => ({ default: m.BlogPreview }))
);
const About = lazy(() =>
  import('./components/About').then(m => ({ default: m.About }))
);
const Contact = lazy(() =>
  import('./components/Contact').then(m => ({ default: m.Contact }))
);

// ── AI Visibility homepage sections (lazy) ──
const TheExtinctionEvent = lazy(() =>
  import('./components/AIVisibilitySections').then(m => ({ default: m.TheExtinctionEvent }))
);
const WhatIsAIVisibility = lazy(() =>
  import('./components/AIVisibilitySections').then(m => ({ default: m.WhatIsAIVisibility }))
);
const ThreePillars = lazy(() =>
  import('./components/AIVisibilitySections').then(m => ({ default: m.ThreePillars }))
);
const BrandFirstWebDesign = lazy(() =>
  import('./components/AIVisibilitySections').then(m => ({ default: m.BrandFirstWebDesign }))
);
const AIVisibilityVsSEO = lazy(() =>
  import('./components/AIVisibilitySections').then(m => ({ default: m.AIVisibilityVsSEO }))
);
const TheWindowIsClosing = lazy(() =>
  import('./components/AIVisibilitySections').then(m => ({ default: m.TheWindowIsClosing }))
);
const WhoThisIsFor = lazy(() =>
  import('./components/AIVisibilitySections').then(m => ({ default: m.WhoThisIsFor }))
);
const HomeFaq = lazy(() =>
  import('./components/HomeFaq').then(m => ({ default: m.HomeFaq }))
);
const AIVisibilityResults = lazy(() =>
  import('./components/AIVisibilitySections').then(m => ({ default: m.AIVisibilityResults }))
);

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then(m => ({ default: m.AboutPage }))
);

// ── Route-level pages (lazy) ──
const AllProjects = lazy(() =>
  import('./pages/AllProjects').then(m => ({ default: m.AllProjects }))
);
const ProjectDetailsPage = lazy(() =>
  import('./pages/ProjectDetailsPage').then(m => ({ default: m.ProjectDetailsPage }))
);
const BlogPage = lazy(() =>
  import('./pages/BlogPage').then(m => ({ default: m.BlogPage }))
);
const BlogPostPage = lazy(() =>
  import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage }))
);
const WebsitesPage = lazy(() =>
  import('./pages/WebsitesPage').then(m => ({ default: m.WebsitesPage }))
);
const WebsiteDetailPage = lazy(() =>
  import('./pages/WebsiteDetailPage').then(m => ({ default: m.WebsiteDetailPage }))
);
const MusicLandingPage = lazy(() =>
  import('./music/MusicLandingPage').then(m => ({ default: m.MusicLandingPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage }))
);

import { MetaTags } from './components/seo/MetaTags';
import { GraphNodes, SiteGraphProvider } from './components/seo/SiteGraph';
import { ORG_ID, PERSON_ID, WEBSITE_ID } from './components/seo/siteGraph';
import { HOME_FAQS } from './data/homeFaqs';
import { EngagementPopup } from './components/EngagementPopup';
import { offerings } from './data/offerings';
import { siteUrl } from './lib/siteUrl';

function offeringDescription(title: string) {
  const found = offerings.find((item) => item.title === title);
  return found?.description ?? '';
}

const HOME_SERVICE_OFFER = {
  '@type': 'Offer',
  url: 'https://spurlockstudios.com/visibility',
  name: '$500 AI Visibility Audit',
};

export function App() {
  const MainLayout = () => (
    <SiteGraphProvider>
      <EngagementPopup />
      <div className="min-h-screen text-black relative">
        {/* Complex gradient background */}
        <div className="fixed inset-0 bg-pastel-gradient bg-blend-soft-light animate-[gradient_15s_ease_infinite] gpu-layer" style={{ backgroundSize: '200% 200%' }} />

        {/* Content - Add ID here */}
        <div id="main-content-wrapper" className="relative">
          <Header className="bg-white/5 backdrop-blur-sm" />
          <Outlet />
          <Footer />
        </div>
      </div>
    </SiteGraphProvider>
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Music funnel — bare layout, no main chrome */}
        <Route
          path="/music"
          element={
            <Suspense fallback={<SectionSkeleton />}>
              <MusicLandingPage />
            </Suspense>
          }
        />
        {/* Main site routes share pastel + Header + Footer chrome */}
        <Route element={<MainLayout />}>
            {/* Home route */}
            <Route
              path="/"
              element={
                <main>
                  <MetaTags 
                    title="AI Visibility & Premium Brand Design"
                    description="Will Spurlock builds custom-coded websites for ChatGPT, Perplexity, and Google AI Overviews, plus n8n agents and automations that help brands get cited."
                    url={siteUrl('/')}
                    canonical={siteUrl('/')}
                  />
                  <GraphNodes
                    id="home"
                    nodes={[
                      {
                        "@type": "WebSite",
                        "@id": WEBSITE_ID,
                        "url": "https://williamspurlock.com/",
                        "name": "Will Spurlock | AI Visibility & Brand Design",
                        "publisher": { "@id": PERSON_ID }
                      },
                      {
                        "@type": "WebPage",
                        "@id": "https://williamspurlock.com/#webpage",
                        url: siteUrl('/'),
                        name: "AI Visibility & Premium Brand Design",
                        description: "Will Spurlock builds custom-coded websites for ChatGPT, Perplexity, and Google AI Overviews, plus n8n agents and automations that help brands get cited.",
                        isPartOf: { "@id": WEBSITE_ID },
                        about: { "@id": ORG_ID },
                        author: { "@id": PERSON_ID },
                        dateModified: "2026-08-21",
                      },
                      {
                        "@type": "Service",
                        "name": "AI Visibility Engineering (AIO/AEO/GEO)",
                        description: offeringDescription('AI Visibility Engineering'),
                        url: siteUrl('/'),
                        areaServed: "Worldwide",
                        "provider": { "@id": ORG_ID },
                        offers: HOME_SERVICE_OFFER,
                      },
                      {
                        "@type": "Service",
                        "name": "Premium Brand-First Web Design",
                        description: offeringDescription('Premium Brand + Web Design'),
                        url: siteUrl('/'),
                        areaServed: "Worldwide",
                        "provider": { "@id": ORG_ID },
                        offers: HOME_SERVICE_OFFER,
                      },
                      {
                        "@type": "Service",
                        "name": "Fractional AI CTO Services",
                        description: offeringDescription('Fractional AI CTO Services'),
                        url: siteUrl('/'),
                        areaServed: "Worldwide",
                        "provider": { "@id": ORG_ID },
                        offers: HOME_SERVICE_OFFER,
                      },
                      {
                        "@type": "Service",
                        "name": "Autonomous AI Agent Development",
                        description: offeringDescription('Autonomous AI Agent Teams'),
                        url: siteUrl('/'),
                        areaServed: "Worldwide",
                        "provider": { "@id": ORG_ID },
                        offers: HOME_SERVICE_OFFER,
                      },
                      {
                        "@type": "FAQPage",
                        "@id": `${siteUrl('/')}#faq`,
                        mainEntity: HOME_FAQS.map((faq) => ({
                          "@type": "Question",
                          name: faq.question,
                          acceptedAnswer: {
                            "@type": "Answer",
                            text: faq.answer,
                          },
                        })),
                      }
                    ]}
                  />
                  <Hero />
                  <Suspense fallback={<SectionSkeleton />}>
                    <TheExtinctionEvent />
                  </Suspense>
                  <Suspense fallback={<SectionSkeleton />}>
                    <WhatIsAIVisibility />
                  </Suspense>
                  <Suspense fallback={<SectionSkeleton />}>
                    <ThreePillars />
                  </Suspense>
                  <Suspense fallback={<SectionSkeleton />}>
                    <BrandFirstWebDesign />
                  </Suspense>
                  <Suspense fallback={<SectionSkeleton />}>
                    <AIVisibilityVsSEO />
                  </Suspense>
                  <Suspense fallback={<SectionSkeleton />}>
                    <TheWindowIsClosing />
                  </Suspense>
                  <Suspense fallback={<SectionSkeleton />}>
                    <WhoThisIsFor />
                  </Suspense>
                  <Suspense fallback={<SectionSkeleton />}>
                    <HomeFaq />
                  </Suspense>
                  <Suspense fallback={<SectionSkeleton />}>
                    <AIVisibilityResults />
                  </Suspense>
                  <Suspense fallback={<SectionSkeleton />}>
                    <HomeFeaturedWebsites />
                  </Suspense>
                  <Suspense fallback={<CardGridSkeleton count={6} />}>
                    <Projects />
                  </Suspense>
                  <Suspense fallback={<CardGridSkeleton count={3} />}>
                    <BlogPreview />
                  </Suspense>
                  <Suspense fallback={<SectionSkeleton />}>
                    <About />
                  </Suspense>
                  <Suspense fallback={<SectionSkeleton />}>
                    <Contact />
                  </Suspense>
                </main>
              }
            />
            
            {/* Projects route */}
            <Route path="/projects/:slug" element={
              <Suspense fallback={<SectionSkeleton />}><ProjectDetailsPage /></Suspense>
            } />
            <Route path="/projects" element={
              <Suspense fallback={<CardGridSkeleton count={9} />}><AllProjects /></Suspense>
            } />
            
            {/* Websites Showcase route */}
            <Route path="/websites/:slug" element={
              <Suspense fallback={<SectionSkeleton />}><WebsiteDetailPage /></Suspense>
            } />
            <Route path="/websites" element={
              <Suspense fallback={<CardGridSkeleton count={6} />}><WebsitesPage /></Suspense>
            } />
            
            {/* About route */}
            <Route path="/about" element={
              <Suspense fallback={<SectionSkeleton />}><AboutPage /></Suspense>
            } />
            
            {/* Blog Routes - Order matters! More specific routes first */}
            <Route path="/blog/category/:categorySlug" element={
              <Suspense fallback={<CardGridSkeleton count={6} />}><BlogPage type="category" /></Suspense>
            } />
            <Route path="/blog/tag/:tagSlug" element={
              <Suspense fallback={<CardGridSkeleton count={6} />}><BlogPage type="tag" /></Suspense>
            } />
            <Route path="/blog/:slug" element={
              <Suspense fallback={<SectionSkeleton />}><BlogPostPage /></Suspense>
            } />
            <Route path="/blog" element={
              <Suspense fallback={<CardGridSkeleton count={6} />}><BlogPage type="all" /></Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<SectionSkeleton />}><NotFoundPage /></Suspense>
            } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
