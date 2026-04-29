import React from 'react';

/* ─── Base shimmer animation ─── */
const shimmerClass = `
  relative overflow-hidden
  before:absolute before:inset-0
  before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent
  before:animate-[shimmer_1.5s_infinite]
  before:-translate-x-full
`;

/**
 * Full-width section skeleton — used for Hero-like or About-like sections.
 */
export function SectionSkeleton() {
  return (
    <div className="py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto animate-pulse" aria-busy="true" aria-label="Loading section">
      {/* Title bar */}
      <div className="flex flex-col items-center gap-4 mb-12">
        <div className="h-10 w-64 sm:w-96 rounded-lg bg-purple-200/40" />
        <div className="h-5 w-48 sm:w-72 rounded-md bg-purple-100/30" />
      </div>
      {/* Content block */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="h-4 w-full rounded bg-gray-200/50" />
        <div className="h-4 w-5/6 rounded bg-gray-200/50" />
        <div className="h-4 w-4/6 rounded bg-gray-200/50" />
      </div>
    </div>
  );
}

/**
 * Card grid skeleton — used for project cards, blog previews, etc.
 */
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto animate-pulse" aria-busy="true" aria-label="Loading cards">
      {/* Section title */}
      <div className="flex flex-col items-center gap-4 mb-12">
        <div className="h-8 w-56 sm:w-80 rounded-lg bg-purple-200/40" />
        <div className="h-4 w-40 sm:w-64 rounded-md bg-purple-100/30" />
      </div>
      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/30 bg-white/20 p-6 space-y-4">
            {/* Image placeholder */}
            <div className="h-40 w-full rounded-xl bg-gradient-to-br from-purple-100/50 to-yellow-50/50" />
            {/* Title */}
            <div className="h-5 w-3/4 rounded bg-gray-200/60" />
            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-gray-200/40" />
              <div className="h-3 w-5/6 rounded bg-gray-200/40" />
            </div>
            {/* Tag pills */}
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded-full bg-purple-100/40" />
              <div className="h-6 w-20 rounded-full bg-yellow-100/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
