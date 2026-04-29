import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShowcaseGrid } from './Showcase/ShowcaseGrid';
import { ShowcaseManager } from '../data/showcaseData/ShowcaseManager';

const manager = new ShowcaseManager();

export const HomeFeaturedWebsites = () => {
  // Get 4 top sites for the 2-column grid to maintain symmetry
  const featuredSites = useMemo(() => manager.getHeroSites().slice(0, 4), []);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto relative z-10" aria-label="Featured Websites">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight mb-6 uppercase"
        >
          Selected Works
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-700 text-xl md:text-2xl leading-relaxed font-medium"
        >
          I build beautiful digital experiences. Here is a curated selection of recent premium websites.
        </motion.p>
      </div>

      <ShowcaseGrid sites={featuredSites} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-16 flex justify-center"
      >
        <Link to="/websites">
          <button className="px-10 py-5 bg-black text-white font-bold rounded-full hover:bg-purple-600 hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 shadow-xl text-lg flex items-center gap-3 group">
            View All {manager.getTotalCount()}+ Websites
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </Link>
      </motion.div>
    </section>
  );
};
