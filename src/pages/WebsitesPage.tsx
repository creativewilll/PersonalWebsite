import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShowcaseHero } from '../components/Showcase/ShowcaseHero';
import { IndustryFilter } from '../components/Showcase/IndustryFilter';
import { ShowcaseGrid } from '../components/Showcase/ShowcaseGrid';
import { StatsStrip } from '../components/Showcase/StatsStrip';
import { ShowcaseManager } from '../data/showcaseData/ShowcaseManager';
import { Industry } from '../data/showcaseData/showcase-sites';

const manager = new ShowcaseManager();

export function WebsitesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'all'>('all');

  const allSites = useMemo(() => manager.getAllSites(), []);
  const heroSites = useMemo(() => manager.getHeroSites(), []);
  const industryStats = useMemo(() => manager.getIndustryStats(), []);

  const filteredSites = useMemo(() => {
    if (selectedIndustry === 'all') return allSites;
    return manager.getSitesByIndustry(selectedIndustry);
  }, [selectedIndustry, allSites]);

  // JSON-LD structured data for CollectionPage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Premium Web Design Portfolio — Will Spurlock',
    description: 'Explore 18+ premium websites built for music artists, construction companies, cannabis brands, and more.',
    url: 'https://williamspurlock.com/websites',
    author: {
      '@type': 'Person',
      name: 'Will Spurlock',
      url: 'https://williamspurlock.com',
    },
    numberOfItems: manager.getTotalCount(),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allSites.slice(0, 10).map((site, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: site.name,
        url: `https://williamspurlock.com/websites/${site.slug}`,
        description: site.tagline,
      })),
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      <Helmet>
        <title>Websites — Premium Web Design by Will Spurlock</title>
        <meta name="description" content="Explore 18+ premium websites built for music artists, construction companies, cannabis brands, and more. $10K-quality design, every single time." />
        <meta property="og:title" content="Websites — Premium Web Design by Will Spurlock" />
        <meta property="og:description" content="Explore 18+ premium websites built for music artists, construction companies, cannabis brands, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://williamspurlock.com/projects/Professional%20Headshot%20Hero.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Websites — Premium Web Design by Will Spurlock" />
        <meta name="twitter:description" content="Explore 18+ premium websites built for music artists, construction companies, cannabis brands, and more. $10K-quality design." />
        <meta name="twitter:image" content="https://williamspurlock.com/projects/Professional%20Headshot%20Hero.jpeg" />
        <link rel="canonical" href="https://williamspurlock.com/websites" />
        <meta name="keywords" content="web design portfolio, premium websites, music artist websites, construction websites, cannabis websites, web developer, Will Spurlock" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main>
        {/* Hero */}
        <ShowcaseHero featuredSites={heroSites} totalCount={manager.getTotalCount()} />

        {/* The $20k Framework Process */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-24" aria-label="The $20K Website Framework">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight"
            >
              The $20K Website Framework
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-zinc-400 max-w-3xl mx-auto"
            >
              I don't build informational brochures. I build immersive digital experiences using a proprietary 3-step framework designed to convert visitors into die-hard fans and paying customers.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Vibe Engineering */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-colors"
            >
              <div className="w-14 h-14 bg-sky-500/20 text-sky-400 rounded-2xl flex items-center justify-center text-2xl font-black mb-8 shadow-[4px_4px_0px_#0f172a]">
                01
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Vibe Engineering & Immersion</h3>
              <p className="text-zinc-300 mb-6 leading-relaxed">
                We prioritize vibe over simple function. Using a hybrid of Neo-Brutalism and Glassmorphism, we map your brand's atmosphere into custom color palettes, tight typography, and perpetual micro-motion.
              </p>
              <ul className="space-y-3 text-sm text-zinc-400 font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-sky-500" /> AI-Generated Product Proofs</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Perpetual Motion & Floating Elements</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-sky-500" /> User-Led Journey Navigation</li>
              </ul>
            </motion.div>

            {/* Step 2: UI/UX Crack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-colors"
            >
              <div className="w-14 h-14 bg-fuchsia-500/20 text-fuchsia-400 rounded-2xl flex items-center justify-center text-2xl font-black mb-8 shadow-[4px_4px_0px_#0f172a]">
                02
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">The 6-D UI/UX Polish</h3>
              <p className="text-zinc-300 mb-6 leading-relaxed">
                Every page goes through a rigorous visual audit across six dimensions: Hero Impact, Micro-Interactions, Visual Hierarchy, Typography Craft, Section Flow, and Responsive Polish.
              </p>
              <ul className="space-y-3 text-sm text-zinc-400 font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" /> Cinematic Film-Burn Entries</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" /> RGB Glitch Text & Tape Labels</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" /> Zine-Photo Tilts & Textures</li>
              </ul>
            </motion.div>

            {/* Step 3: Semantic SEO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-colors"
            >
              <div className="w-14 h-14 bg-lime-500/20 text-lime-400 rounded-2xl flex items-center justify-center text-2xl font-black mb-8 shadow-[4px_4px_0px_#0f172a]">
                03
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Semantic SEO Architecture</h3>
              <p className="text-zinc-300 mb-6 leading-relaxed">
                Beautiful design is useless if it can't be found. We build for 10x visibility utilizing strict semantic HTML, comprehensive meta tagging, and robust accessibility standards.
              </p>
              <ul className="space-y-3 text-sm text-zinc-400 font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-lime-500" /> Strict Semantic DOM Nodes</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-lime-500" /> Deep OpenGraph Tagging</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-lime-500" /> WAI-ARIA Screen Reader Compliance</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="relative max-w-[1600px] mx-auto px-4 sm:px-6 pb-20" aria-label="Website portfolio gallery">
          {/* Industry filter */}
          <div className="mb-14">
            <IndustryFilter
              selected={selectedIndustry}
              onSelect={setSelectedIndustry}
              stats={industryStats}
              totalCount={manager.getTotalCount()}
            />
          </div>

          {/* Grid */}
          <ShowcaseGrid sites={filteredSites} />
        </section>

        {/* Stats strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <StatsStrip />
        </section>

        {/* Bottom CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-28 sm:pb-36 pt-8" aria-label="Call to action">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 p-10 sm:p-14 text-center text-white shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptMC04VjIwSDI0djJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready for a website that converts?</h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
                I build premium, hand-crafted websites that make your brand impossible to ignore. Let's make something amazing together.
              </p>
              <a href="/#contact">
                <motion.button
                  className="inline-flex items-center gap-2 px-10 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-white transition-all duration-300 shadow-xl text-lg
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book a Discovery Call →
                </motion.button>
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </motion.div>
  );
}
