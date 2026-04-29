import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShowcaseSite, industryMeta } from '../../data/showcaseData/showcase-sites';

interface ShowcaseCardProps {
  site: ShowcaseSite;
  index: number;
}

export function ShowcaseCard({ site, index }: ShowcaseCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const meta = industryMeta[site.industry];
  const hasLiveUrl = Boolean(site.liveUrl);

  const handleNavigate = useCallback(() => {
    navigate(`/websites/${site.slug}`);
  }, [navigate, site.slug]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigate();
    }
  }, [handleNavigate]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer
                 bg-[rgba(255,255,255,0.05)] border border-white/10
                 shadow-lg
                 hover:shadow-[0_20px_60px_rgba(147,51,234,0.25)]
                 hover:border-purple-400/30
                 hover:-translate-y-2
                 transition-[transform,box-shadow,border-color] duration-500
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                 will-change-[transform]"
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '0 400px',
        contain: 'layout style paint',
      }}
      onClick={handleNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIframeLoaded(false); }}
      tabIndex={0}
      role="link"
      aria-label={`View ${site.name} case study`}
      onKeyDown={handleKeyDown}
    >
      {/* Browser chrome header */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-900/95 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-red-500/70" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <div className="w-2 h-2 rounded-full bg-green-500/70" />
        <div className="flex-1 mx-2">
          <div className="flex items-center gap-1.5 h-5 bg-gray-800/80 rounded px-2 max-w-[70%]">
            <span className="text-[9px] text-gray-500 truncate font-mono">
              {site.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'}
            </span>
          </div>
        </div>
      </div>

      {/* Content area — image with iframe on hover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
        {/* Live iframe — loads on hover */}
        {isHovered && hasLiveUrl && (
          <iframe
            src={site.liveUrl}
            title={`${site.name} live preview`}
            className={`absolute inset-0 w-full h-full border-none z-10 transition-opacity duration-500
                       ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ pointerEvents: 'none' }}
            sandbox="allow-scripts allow-same-origin"
            onLoad={() => setIframeLoaded(true)}
          />
        )}

        {/* Loading spinner while iframe loads on hover */}
        {isHovered && hasLiveUrl && !iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Live badge on hover */}
        {isHovered && iframeLoaded && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-black/70 rounded-full z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] text-green-300 font-semibold uppercase tracking-wider">Live</span>
          </div>
        )}

        {/* Thumbnail image — always present, fades out when iframe loads */}
        {site.thumbnail && (
          <img
            src={site.thumbnail}
            alt={`${site.name} preview`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500
                       ${isHovered && iframeLoaded ? 'opacity-0' : 'opacity-100'}`}
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Gradient placeholder (visible until thumbnail loads) */}
        {!site.thumbnail && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/60 via-gray-900 to-gray-800">
            <span className="text-4xl mb-3">{meta.icon}</span>
            <span className="text-white/60 text-sm font-medium">{site.name}</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
                       transition-opacity duration-500 pointer-events-none z-10
                       ${isHovered && iframeLoaded ? 'opacity-0' : 'opacity-40 group-hover:opacity-20'}`} />

        {/* Industry badge */}
        <div
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold border z-20
                     ${meta.bgLight} shadow-sm`}
          aria-label={`Industry: ${meta.label}`}
        >
          {meta.icon} {meta.label}
        </div>

        {/* External link */}
        {hasLiveUrl && (
          <motion.a
            href={site.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/15 border border-white/20
                       text-white/70 hover:text-white hover:bg-white/25 transition-[color,background-color] duration-300
                       opacity-0 group-hover:opacity-100 z-20
                       focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Visit ${site.name} live site (opens in new tab)`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
        )}
      </div>

      {/* Info panel */}
      <div className="relative p-4 bg-gray-900/95 border-t border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <h3 className="text-lg font-extrabold text-white mb-1 line-clamp-1 group-hover:text-purple-300 transition-colors duration-300 tracking-tight">
          {site.name}
        </h3>
        <p className="text-xs text-white/50 line-clamp-1 italic tracking-wide">
          {site.tagline}
        </p>
        <div className="flex items-center gap-1 mt-3 text-[10px] font-medium text-purple-400/60
                       group-hover:text-purple-300 transition-colors duration-300">
          <span className="uppercase tracking-wider">View Case Study</span>
          <span className="inline-block animate-[nudge_1.5s_ease-in-out_infinite]">→</span>
        </div>
      </div>
    </motion.article>
  );
}
