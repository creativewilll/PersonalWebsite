import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, X } from 'lucide-react';
import type {
  AutomationCategory,
  AutomationsSnapshot,
} from '../../data/automationsData';
import { AutomationCard } from './AutomationCard';
import {
  CATEGORY_COLORS,
  CATEGORY_ORDER,
  categoryLabel,
} from './categoryStyles';

const PAGE_SIZE = 30;
const TOP_TAG_COUNT = 12;

interface LibraryBrowserProps {
  snapshot: AutomationsSnapshot | null;
  loading: boolean;
  selectedCategory: AutomationCategory | 'all';
  onCategoryChange: (category: AutomationCategory | 'all') => void;
  onOpenWorkflow: (slug: string) => void;
  /** When set, ensure this slug's card is in the visible window (for deep links). */
  ensureVisibleSlug?: string | null;
}

export function LibraryBrowser({
  snapshot,
  loading,
  selectedCategory,
  onCategoryChange,
  onOpenWorkflow,
  ensureVisibleSlug,
}: LibraryBrowserProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const topTags = useMemo(
    () => snapshot?.topTags.slice(0, TOP_TAG_COUNT) ?? [],
    [snapshot]
  );

  const filtered = useMemo(() => {
    if (!snapshot) return [];
    const q = search.trim().toLowerCase();
    return snapshot.automations.filter((a) => {
      if (selectedCategory !== 'all' && a.category !== selectedCategory) return false;
      if (selectedTag && !a.tags.includes(selectedTag)) return false;
      if (!q) return true;
      const haystack = `${a.name} ${a.brief} ${a.tags.join(' ')}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [snapshot, search, selectedCategory, selectedTag]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, selectedCategory, selectedTag]);

  // Expand pagination so a deep-linked workflow is in the rendered set
  useEffect(() => {
    if (!ensureVisibleSlug || !snapshot) return;
    const idx = filtered.findIndex((a) => a.slug === ensureVisibleSlug);
    if (idx >= 0 && idx >= visibleCount) {
      setVisibleCount(Math.ceil((idx + 1) / PAGE_SIZE) * PAGE_SIZE);
    }
  }, [ensureVisibleSlug, filtered, snapshot, visibleCount]);

  const visible = filtered.slice(0, visibleCount);
  const total = snapshot?.total ?? 0;

  return (
    <section
      id="automation-library"
      ref={ref}
      className="mb-14 sm:mb-20 scroll-mt-28 px-4"
      aria-labelledby="library-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="text-center mb-8"
      >
        <h2
          id="library-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 mb-3"
        >
          Browse All {loading ? '…' : total} Automations
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Search by name, brief, or tag. Click any card for the full workflow overview —
          hours saved, stack, and related builds.
        </p>
      </motion.div>

      <div className="mb-6 space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search automations…"
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
            aria-label="Search automations"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <FilterPill
            label={`All (${total || '…'})`}
            active={selectedCategory === 'all'}
            onClick={() => onCategoryChange('all')}
          />
          {CATEGORY_ORDER.map((cat) => (
            <FilterPill
              key={cat}
              label={`${categoryLabel(cat)} (${snapshot?.categories[cat] ?? '…'})`}
              active={selectedCategory === cat}
              onClick={() => onCategoryChange(cat)}
              className={
                selectedCategory === cat
                  ? `${CATEGORY_COLORS[cat].bg} ${CATEGORY_COLORS[cat].text} border-transparent`
                  : undefined
              }
            />
          ))}
        </div>

        {topTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {topTags.map(({ tag, count }) => (
              <FilterPill
                key={tag}
                label={`${tag} (${count})`}
                active={selectedTag === tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              />
            ))}
          </div>
        )}
      </div>

      {loading && <SkeletonGrid />}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12 text-sm sm:text-base">
          No automations match those filters. Try a broader search or clear a tag.
        </p>
      )}

      {!loading && filtered.length > 0 && (
        <>
          <p className="text-center text-sm text-gray-500 mb-4">
            Showing {visible.length} of {filtered.length}
            {filtered.length !== total ? ` (filtered from ${total})` : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((automation, i) => (
              <div key={automation.id} id={`workflow-${automation.slug}`}>
                <AutomationCard
                  automation={automation}
                  index={i}
                  onOpen={onOpenWorkflow}
                />
              </div>
            ))}
          </div>
          {visibleCount < filtered.length && (
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="px-6 py-3 rounded-full bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold shadow-md transition-colors"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function FilterPill({
  label,
  active,
  onClick,
  className,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
        className ||
        (active
          ? 'bg-purple-100 text-purple-800 border-purple-200'
          : 'bg-white/60 text-gray-600 border-white/40 hover:border-purple-200')
      }`}
    >
      {label}
    </button>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-44 rounded-2xl bg-white/40 border border-white/30 animate-pulse"
        />
      ))}
    </div>
  );
}
