import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen text-black relative">
        {/* Complex gradient background */}
        <div className="fixed inset-0 bg-pastel-gradient bg-blend-soft-light animate-[gradient_15s_ease_infinite] gpu-layer" style={{ backgroundSize: '200% 200%' }} />
        
        {/* Content - Add ID here */}
        <div id="main-content-wrapper" className="relative">
          <Header className="bg-white/5 backdrop-blur-sm" />
          <Routes>
            {/* Home route */}
            <Route
              path="/"
              element={
                <main>
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
              <Suspense fallback={<CardGridSkeleton count={6} />}><WebsitesPage /></Suspense>
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
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
