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
import { ErrorBoundary } from './components/ErrorBoundary';

export function App() {
  // #region agent log
  fetch('http://127.0.0.1:7866/ingest/0558fb5f-4a5e-487e-a4e2-797280a236e6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'efe27c'},body:JSON.stringify({sessionId:'efe27c',location:'App.tsx:60',message:'App component rendering',data:{pathname:window.location.pathname},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://williamspurlock.com/#organization",
    "name": "Will Spurlock",
    "alternateName": "William Spurlock",
    "url": "https://williamspurlock.com",
    "logo": "https://williamspurlock.com/projects/Professional%20Headshot%20Hero.jpeg",
    "description": "Will Spurlock builds custom AI and automation solutions to radically scale operations, save time, and increase revenue for innovative businesses.",
    "founder": {
      "@type": "Person",
      "name": "Will Spurlock",
      "url": "https://williamspurlock.com",
      "jobTitle": "AI & Automation Consultant"
    },
    "sameAs": [
      "https://www.linkedin.com/in/william-spurlock/",
      "https://x.com/creativewill02",
      "https://www.instagram.com/willspurly/",
      "https://www.upwork.com/freelancers/~01e5f4af96d3c88817"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "AI Automation",
      "n8n Workflows",
      "Claude AI",
      "Model Context Protocol",
      "Web Development",
      "AI Consulting"
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
        <Route element={
          <ErrorBoundary>
            <MainLayout />
          </ErrorBoundary>
        }>
            {/* Home route */}
            <Route
              path="/"
              element={
                <main>
                  <MetaTags 
                    title="Custom AI & Automation Solutions"
                    description="Will Spurlock builds custom AI agents, n8n workflow automations, and premium websites to radically scale operations and revenue for innovative businesses."
                    url="https://williamspurlock.com"
                  />
                  <JsonLd data={{
                    "@context": "https://schema.org",
                    "@graph": [
                      {
                        "@type": "WebSite",
                        "@id": "https://williamspurlock.com/#website",
                        "url": "https://williamspurlock.com",
                        "name": "Will Spurlock | AI & Automation Consultant",
                        "potentialAction": {
                          "@type": "SearchAction",
                          "target": "https://williamspurlock.com/search?q={search_term_string}",
                          "query-input": "required name=search_term_string"
                        }
                      },
                      {
                        "@type": "Service",
                        "name": "Custom AI Agent Development",
                        "provider": { "@id": "https://williamspurlock.com/#organization" }
                      },
                      {
                        "@type": "Service",
                        "name": "n8n Workflow Automation",
                        "provider": { "@id": "https://williamspurlock.com/#organization" }
                      },
                      {
                        "@type": "Service",
                        "name": "MCP Architecture",
                        "provider": { "@id": "https://williamspurlock.com/#organization" }
                      },
                      {
                        "@type": "Service",
                        "name": "Premium AIO-Optimized Websites",
                        "provider": { "@id": "https://williamspurlock.com/#organization" }
                      }
                    ]
                  }} />
                  <Hero />
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
              <Suspense fallback={<CardGridSkeleton count={6} />}>
                {/* #region agent log */}
                {(() => {
                  fetch('http://127.0.0.1:7866/ingest/0558fb5f-4a5e-487e-a4e2-797280a236e6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'efe27c'},body:JSON.stringify({sessionId:'efe27c',location:'App.tsx:205',message:'Lazy WebsitesPage loaded and rendering',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'G'})}).catch(()=>{});
                  return null;
                })()}
                {/* #endregion */}
                <WebsitesPage />
              </Suspense>
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
