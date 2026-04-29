import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Layers, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShowcaseSite, industryMeta } from '../../data/showcaseData/showcase-sites';

interface ShowcaseDetailProps {
  site: ShowcaseSite;
  relatedSites: ShowcaseSite[];
}

export function ShowcaseDetail({ site, relatedSites }: ShowcaseDetailProps) {
  const meta = industryMeta[site.industry];
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hoveredRelated, setHoveredRelated] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const allMedia = site.media.filter(Boolean);

  return (
    <article className="w-full">
      <Helmet>
        <title>{site.name} — Website by Will Spurlock</title>
        <meta name="description" content={site.description} />
        <meta property="og:title" content={`${site.name} — Website by Will Spurlock`} />
        <meta property="og:description" content={site.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://williamspurlock.com${site.thumbnail}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${site.name} — Website by Will Spurlock`} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content={`https://williamspurlock.com${site.thumbnail}`} />
        <link rel="canonical" href={`https://williamspurlock.com/websites/${site.slug}`} />
      </Helmet>

      <div className="relative rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.05)] border border-white/10 shadow-2xl">
        {/* Navigation bar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-900/90 border-b border-white/5" aria-label="Case study navigation">
          <Link to="/websites">
            <motion.button
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/80 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-[background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}
              aria-label="Back to all websites"
            >
              <ArrowLeft className="w-4 h-4" /> All Websites
            </motion.button>
          </Link>
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${meta.bgLight}`} aria-label={`Industry: ${meta.label}`}>
            {meta.icon} {meta.label}
          </span>
        </nav>

        {/* FULL-WIDTH LIVE IFRAME PREVIEW — always active */}
        {site.liveUrl && (
          <div className="relative">
            <div className="relative w-full overflow-hidden aspect-[16/9]">
              {/* Loading overlay — shows until iframe loads */}
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
                  {/* Show thumbnail as loading background */}
                  {site.thumbnail && (
                    <img
                      src={site.thumbnail}
                      alt={`${site.name} loading`}
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mb-3" />
                    <span className="text-white/50 text-sm">Loading {site.name}...</span>
                    <span className="text-white/30 text-xs mt-1">This may take a moment</span>
                  </div>
                </div>
              )}

              {/* Always-live iframe */}
              <iframe
                src={site.liveUrl}
                title={`${site.name} — live preview`}
                className={`absolute top-0 left-0 w-full h-full border-none transition-opacity duration-700
                           ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ pointerEvents: 'none' }}
                sandbox="allow-scripts allow-same-origin"
                onLoad={() => setIframeLoaded(true)}
              />

              {/* Live indicator badge */}
              {iframeLoaded && (
                <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-black/70 rounded-full z-20">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                  <span className="text-[10px] text-green-300 font-semibold uppercase tracking-wider">Live Preview</span>
                </div>
              )}

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />
            </div>

            {/* Visit live site CTA */}
            <div className="text-center py-5 bg-gradient-to-b from-gray-900/40 to-transparent">
              <motion.a href={site.liveUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-yellow-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                aria-label={`Visit ${site.name} live (opens in new tab)`}
              >
                Visit Live Site <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        )}

        {/* Content area */}
        <div className="p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1" aria-label="Project details">
              <div className="bg-purple-600/5 p-6 rounded-xl border border-purple-600/10">
                <h3 className="text-lg font-bold text-purple-700 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-purple-700/80">
                    <Calendar className="w-4 h-4 shrink-0 text-purple-500" aria-hidden="true" /><span>Built in {site.year}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-purple-700/80">
                    <Layers className="w-4 h-4 shrink-0 text-purple-500" aria-hidden="true" /><span>{meta.label}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/50 p-6 rounded-xl shadow-sm border border-white/20">
                <h3 className="text-lg font-bold text-purple-700 mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {site.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full border border-purple-200">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white/50 p-6 rounded-xl shadow-sm border border-white/20">
                <h3 className="text-lg font-bold text-purple-700 mb-4">Key Features</h3>
                <ul className="space-y-2.5">
                  {site.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-purple-700/80">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" /><span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {site.liveUrl && (
                <motion.a href={site.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  aria-label={`Visit ${site.name} live (opens in new tab)`}
                >
                  Visit Live Site <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
            </aside>

            {/* Main content */}
            <main className="lg:col-span-8 order-1 lg:order-2 space-y-8">
              <div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 mb-3"
                >{site.name}</motion.h1>
                <p className="text-lg text-purple-700/70 italic">{site.tagline}</p>
              </div>
              <p className="text-base sm:text-lg text-purple-900/80 leading-relaxed">{site.description}</p>

              {site.challenge && (
                <div className="space-y-6">
                  {[
                    { title: 'The Challenge', content: site.challenge, color: 'purple', bg: 'from-purple-50' },
                    { title: 'The Approach', content: site.approach, color: 'yellow', bg: 'from-yellow-50' },
                    { title: 'The Result', content: site.result, color: 'green', bg: 'from-green-50' },
                  ].map((block, i) => (
                    <motion.div key={block.title}
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`p-6 bg-gradient-to-br ${block.bg} to-white rounded-xl border border-${block.color}-100`}
                    >
                      <h3 className={`text-sm font-bold text-${block.color}-${block.color === 'yellow' ? '600' : '500'} uppercase tracking-wider mb-2`}>{block.title}</h3>
                      <p className="text-purple-900/80">{block.content}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {allMedia.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500">Page Showcase</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-200 to-transparent" />
                    <span className="text-xs text-purple-400 font-medium">{allMedia.length} pages</span>
                  </div>

                  {/* Masonry-style grid — images only */}
                  <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                    {allMedia.map((src, i) => (
                      <motion.div
                        key={src}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.4) }}
                        className="break-inside-avoid group relative rounded-xl overflow-hidden
                                   border border-white/10 hover:border-purple-400/30
                                   shadow-lg hover:shadow-[0_12px_40px_rgba(147,51,234,0.2)]
                                   transition-[box-shadow,border-color] duration-500 cursor-pointer"
                        style={{ contain: 'layout style paint' }}
                        onClick={() => setLightbox(src)}
                      >
                        <img
                          src={src}
                          alt={`${site.name} — page ${i + 1}`}
                          className="w-full block transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-white/90 text-xs font-semibold uppercase tracking-wider">Click to expand</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lightbox */}
              <AnimatePresence>
                {lightbox && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setLightbox(null)}
                  >
                    <motion.img
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      src={lightbox}
                      alt="Expanded view"
                      className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
                    />
                    <button className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light" aria-label="Close">✕</button>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="p-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white shadow-2xl"
              >
                <h3 className="text-2xl font-bold mb-3">Want a website like this?</h3>
                <p className="text-white/80 mb-6 max-w-xl">I build premium, $10K-quality websites for every industry. Let's talk about bringing your vision to life.</p>
                <a href="/#contact">
                  <motion.button className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-white transition-[background-color] flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Start a Project <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </a>
              </motion.div>
            </main>
          </div>

          {/* Related websites */}
          {relatedSites.length > 0 && (
            <section className="mt-16 pt-10 border-t border-purple-200/30" aria-label="Related websites">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 mb-8">More {meta.label} Websites</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedSites.map((related) => (
                  <Link key={related.id} to={`/websites/${related.slug}`}>
                    <motion.div whileHover={{ y: -4, scale: 1.02 }}
                      onHoverStart={() => setHoveredRelated(related.id)}
                      onHoverEnd={() => setHoveredRelated(null)}
                      className="group rounded-xl overflow-hidden bg-white/10 border border-white/10 hover:border-purple-300/30 shadow-md hover:shadow-xl transition-[box-shadow,border-color] duration-300"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-purple-900/60 via-gray-900 to-gray-800">
                        {related.thumbnail ? (
                          <img
                            src={related.thumbnail}
                            alt={`${related.name} preview`}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl mb-2">{industryMeta[related.industry].icon}</span>
                            <span className="text-white/70 text-sm font-medium">{related.name}</span>
                            <span className="text-white/40 text-xs mt-1">Click to explore →</span>
                          </div>
                        )}
                        <div className={`absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent transition-opacity duration-300 ${hoveredRelated === related.id ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-purple-800 group-hover:text-purple-600 transition-colors">{related.name}</h4>
                        <p className="text-xs text-purple-500/60 italic">{related.tagline}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
