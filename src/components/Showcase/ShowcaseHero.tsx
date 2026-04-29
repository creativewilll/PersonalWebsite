import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShowcaseSite, industryMeta } from '../../data/showcaseData/showcase-sites';

interface ShowcaseHeroProps {
  featuredSites: ShowcaseSite[];
  totalCount: number;
}

export function ShowcaseHero({ featuredSites, totalCount }: ShowcaseHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sites = featuredSites;
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((idx: number, dir: number) => {
    clearInterval(intervalRef.current);
    setDirection(dir);
    setCurrentIndex(idx);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % sites.length);
    }, 5000);
  }, [sites.length]);

  const next = useCallback(() => {
    goTo((currentIndex + 1) % sites.length, 1);
  }, [currentIndex, goTo, sites.length]);

  const prev = useCallback(() => {
    goTo((currentIndex - 1 + sites.length) % sites.length, -1);
  }, [currentIndex, goTo, sites.length]);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % sites.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [sites.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  if (sites.length === 0) return null;

  const site = sites[currentIndex];
  const meta = industryMeta[site.industry];

  // Calculate positions for 3D carousel
  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff + sites.length) % sites.length);
    const effectiveDiff = normalizedDiff > sites.length / 2 ? normalizedDiff - sites.length : normalizedDiff;

    if (effectiveDiff === 0) {
      // Active card — front and center
      return {
        transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1)',
      };
    } else if (effectiveDiff === 1 || effectiveDiff === -1) {
      // Adjacent cards
      const side = effectiveDiff > 0 ? 1 : -1;
      return {
        transform: `translateX(${side * 55}%) translateZ(-120px) rotateY(${-side * 35}deg) scale(0.78)`,
        zIndex: 20,
        opacity: 0.7,
        filter: 'brightness(0.6)',
      };
    } else if (effectiveDiff === 2 || effectiveDiff === -2) {
      // Second-adjacent cards
      const side = effectiveDiff > 0 ? 1 : -1;
      return {
        transform: `translateX(${side * 90}%) translateZ(-240px) rotateY(${-side * 50}deg) scale(0.6)`,
        zIndex: 10,
        opacity: 0.35,
        filter: 'brightness(0.35)',
      };
    } else {
      // Hidden cards
      const side = effectiveDiff > 0 ? 1 : -1;
      return {
        transform: `translateX(${side * 120}%) translateZ(-350px) rotateY(${-side * 60}deg) scale(0.45)`,
        zIndex: 1,
        opacity: 0,
        filter: 'brightness(0.2)',
      };
    }
  };

  return (
    <section className="relative w-full overflow-hidden" aria-label="Featured websites showcase">
      {/* ── Header section ── */}
      <div className="relative z-40 max-w-[1600px] mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-500 to-yellow-500 mb-4 tracking-tight">
            Websites I've Built
          </h1>
          <p className="text-purple-700/60 text-lg sm:text-xl max-w-2xl mx-auto mb-2">
            {totalCount} premium, hand-crafted websites. No templates. No shortcuts.
          </p>
        </motion.div>
      </div>

      {/* ── 3D Carousel ── */}
      <div
        ref={containerRef}
        className="relative w-full mx-auto"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 45%' }}
      >
        {/* Carousel track */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{ height: 'clamp(360px, 50vw, 560px)', transformStyle: 'preserve-3d' }}
        >
          {sites.map((s, i) => {
            const style = getCardStyle(i);
            const isActive = i === currentIndex;

            return (
              <div
                key={s.slug}
                className="absolute cursor-pointer"
                style={{
                  width: 'clamp(300px, 52vw, 720px)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  ...style,
                }}
                onClick={() => {
                  if (isActive) return;
                  const diff = i - currentIndex;
                  const normalizedDiff = ((diff + sites.length) % sites.length);
                  const effectiveDiff = normalizedDiff > sites.length / 2 ? normalizedDiff - sites.length : normalizedDiff;
                  goTo(i, effectiveDiff > 0 ? 1 : -1);
                }}
              >
                {/* Card frame */}
                <div className={`relative rounded-2xl overflow-hidden shadow-2xl border
                               transition-all duration-700
                               ${isActive
                                 ? 'border-purple-400/40 shadow-[0_30px_80px_rgba(147,51,234,0.35)]'
                                 : 'border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)]'}`}>
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-gray-900/95 border-b border-white/5">
                    <div className="w-2 h-2 rounded-full bg-red-500/70" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                    <div className="w-2 h-2 rounded-full bg-green-500/70" />
                    <div className="flex-1 mx-2">
                      <div className="flex items-center gap-1.5 h-5 bg-gray-800/80 rounded px-2 max-w-[60%]">
                        <Globe className="w-2.5 h-2.5 text-gray-500" />
                        <span className="text-[9px] text-gray-500 truncate font-mono">
                          {s.liveUrl?.replace('https://', '') || s.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Screenshot */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                    <img
                      src={s.thumbnail}
                      alt={`${s.name} website preview`}
                      className={`w-full h-full object-cover object-top transition-transform duration-[1.2s]
                                 ${isActive ? 'scale-100' : 'scale-[1.05]'}`}
                      loading={Math.abs(i - currentIndex) <= 2 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    {/* Active glow overlay */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    )}
                  </div>
                </div>

                {/* Info below active card */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mt-6 text-center"
                  >
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold border mb-3 ${meta.bgLight}`}>
                      {meta.icon} {meta.label}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-purple-900 tracking-tight mb-1">
                      {site.name}
                    </h2>
                    <p className="text-purple-700/60 text-sm italic mb-4">{site.tagline}</p>
                    <div className="flex items-center justify-center gap-3">
                      <Link to={`/websites/${site.slug}`}>
                        <motion.button
                          className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg text-sm
                                     shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30
                                     transition-shadow duration-300
                                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Project
                        </motion.button>
                      </Link>
                      {site.liveUrl && (
                        <motion.a
                          href={site.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2 bg-white/80 border border-purple-200
                                     text-purple-700 font-bold rounded-lg text-sm
                                     shadow-sm hover:shadow-md hover:bg-white
                                     transition-[box-shadow,background-color] duration-300
                                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Live Site <ExternalLink className="w-3.5 h-3.5" />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <motion.button
          onClick={prev}
          className="absolute left-4 sm:left-8 top-[38%] -translate-y-1/2 z-40 p-3 rounded-full
                     bg-white/90 border border-purple-200 text-purple-700
                     shadow-lg hover:shadow-xl hover:bg-white
                     transition-[box-shadow,background-color] duration-300
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous website"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={next}
          className="absolute right-4 sm:right-8 top-[38%] -translate-y-1/2 z-40 p-3 rounded-full
                     bg-white/90 border border-purple-200 text-purple-700
                     shadow-lg hover:shadow-xl hover:bg-white
                     transition-[box-shadow,background-color] duration-300
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next website"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center gap-2 mt-4 pb-10" role="tablist" aria-label="Carousel navigation">
        {sites.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
            className={`rounded-full transition-all duration-500
                       ${i === currentIndex
                         ? 'w-8 h-2 bg-gradient-to-r from-purple-600 to-yellow-500'
                         : 'w-2 h-2 bg-purple-300/30 hover:bg-purple-300/60'}`}
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Go to ${s.name}`}
          />
        ))}
      </div>
    </section>
  );
}
