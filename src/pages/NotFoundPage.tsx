import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';

export function NotFoundPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <MetaTags
        title="Page not found"
        description="This page does not exist on williamspurlock.com."
        url="https://williamspurlock.com/404"
        canonical="https://williamspurlock.com/404"
        robots="noindex, follow"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-600 mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Page not found
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          That URL is not on this site. Check the address or head back to the homepage.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
