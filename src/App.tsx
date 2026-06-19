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

import { JsonLd } from './components/seo/JsonLd';
import { MetaTags } from './components/seo/MetaTags';
import { EngagementPopup } from './components/EngagementPopup';

export function App() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://williamspurlock.com/#organization",
    "name": "Will Spurlock",
    "alternateName": "William Spurlock",
    "url": "https://williamspurlock.com",
    "logo": "https://williamspurlock.com/projects/Professional%20Headshot%20Hero.jpeg",
    "description": "Will Spurlock builds premium, custom-coded websites engineered for AI Visibility — optimized to rank in ChatGPT, Perplexity, and Google AI Overviews. Backed by custom AI agents and automations.",
    "founder": {
      "@type": "Person",
      "name": "Will Spurlock",
      "url": "https://williamspurlock.com",
      "jobTitle": "AI Visibility & Brand Design Engineer"
    },
    "sameAs": [
      "https://www.linkedin.com/in/william-spurlock/",
      "https://x.com/creativewill02",
      "https://www.upwork.com/freelancers/~01e5f4af96d3c88817"
    ],
    "knowsAbout": [
      "AI Visibility",
      "AI Optimization (AIO)",
      "Answer Engine Optimization (AEO)",
      "Generative Engine Optimization (GEO)",
      "Premium Brand Web Design",
      "AI Agents",
      "AI Automation",
      "Web Development"
    ],
    "areaServed": "Worldwide",
    "priceRange": "$$"
  };

  const MainLayout = () => (
    <>
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
    </>
  );

  return (
    <BrowserRouter>
      <JsonLd data={organizationSchema} />
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
                    description="Will Spurlock builds premium, custom-coded websites engineered for AI Visibility — optimized to rank in ChatGPT, Perplexity, and Google AI Overviews. Backed by custom AI agents and automations."
                    url="https://williamspurlock.com"
                  />
                  <JsonLd data={{
                    "@context": "https://schema.org",
                    "@graph": [
                      {
                        "@type": "WebSite",
                        "@id": "https://williamspurlock.com/#website",
                        "url": "https://williamspurlock.com",
                        "name": "Will Spurlock | AI Visibility & Brand Design",
                        "potentialAction": {
                          "@type": "SearchAction",
                          "target": "https://williamspurlock.com/search?q={search_term_string}",
                          "query-input": "required name=search_term_string"
                        }
                      },
                      {
                        "@type": "Service",
                        "name": "AI Visibility Engineering (AIO/AEO/GEO)",
                        "provider": { "@id": "https://williamspurlock.com/#organization" }
                      },
                      {
                        "@type": "Service",
                        "name": "Premium Brand-First Web Design",
                        "provider": { "@id": "https://williamspurlock.com/#organization" }
                      },
                      {
                        "@type": "Service",
                        "name": "Fractional AI CTO Services",
                        "provider": { "@id": "https://williamspurlock.com/#organization" }
                      },
                      {
                        "@type": "Service",
                        "name": "Autonomous AI Agent Development",
                        "provider": { "@id": "https://williamspurlock.com/#organization" }
                      }
                    ]
                  }} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
