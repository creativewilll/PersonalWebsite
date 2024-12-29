import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen text-black bg-rose-50">
      <Header className="bg-white/5 backdrop-blur-sm" />
      <main>
        <Hero className="bg-rose-50" />
        <Projects className="bg-sky-50" />
        <About className="bg-violet-50" />
        <Contact />
      </main>
      <Footer className="bg-white/5 backdrop-blur-sm" />
    </div>
  );
}
