import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

export function MusicLandingPage() {
  return (
    <>
      <Helmet>
        <title>Music Services | Will Spurlock</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Music artist services by Will Spurlock." />
      </Helmet>

      <div
        data-music-theme
        data-theme="dark"
        className="bg-[#0a0a0a] text-[#e5e5e5] min-h-screen flex flex-col items-center justify-center px-6"
      >
        <main className="max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Music Artist Services
          </h1>
          <p className="text-lg text-[#a3a3a3] mb-8">
            This offer is not currently available.
          </p>
          <a
            href="https://williamspurlock.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                       bg-[#1a1a1a] border border-[#333]
                       text-sm font-semibold text-[#e5e5e5]
                       hover:border-[#555] hover:bg-[#222]
                       transition-all duration-300"
          >
            <ArrowLeft size={16} />
            <span>Back to main site</span>
          </a>
        </main>
      </div>
    </>
  );
}

export default MusicLandingPage;
