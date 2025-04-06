import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BlogPreview } from './components/Blog';
import { AllProjects } from './pages/AllProjects';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ScrollToTop } from './components/ScrollToTop';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen text-black relative">
        {/* Complex gradient background */}
        <div className="fixed inset-0 bg-pastel-gradient bg-blend-soft-light animate-[gradient_15s_ease_infinite]" style={{ backgroundSize: '200% 200%' }} />
        
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
                  <Projects />
                  <BlogPreview />
                  <About />
                  <Contact />
                </main>
              }
            />
            
            {/* Projects route */}
            <Route path="/projects" element={<AllProjects />} />
            
            {/* Blog Routes - Order matters! More specific routes first */}
            <Route path="/blog/category/:categorySlug" element={<BlogPage type="category" />} />
            <Route path="/blog/tag/:tagSlug" element={<BlogPage type="tag" />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/blog" element={<BlogPage type="all" />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
