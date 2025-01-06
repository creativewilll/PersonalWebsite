import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen text-black relative">
      {/* Complex gradient background */}
      <div className="fixed inset-0 bg-pastel-gradient bg-blend-soft-light animate-[gradient_10s_ease-in-out_infinite]" />
      
      {/* Content */}
      <div className="relative">
        <Header className="bg-white/5 backdrop-blur-sm" />
        <main>
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
        <Footer className="bg-white/5 backdrop-blur-sm" />
      </div>
    </div>
  );
}
