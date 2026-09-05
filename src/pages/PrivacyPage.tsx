import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { siteUrl } from '../lib/siteUrl';
import { openMeasurementSettings } from '../lib/consent';

export function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <MetaTags
        title="Privacy Policy"
        description="How Spurlock Studios LLC measures this site: Google Analytics 4 (G-TQELD0FBE0) loads only after you accept. No Leadsy, no RB2B, no ad pixels."
        url={siteUrl('/privacy')}
        canonical={siteUrl('/privacy')}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="underline underline-offset-2 text-purple-700">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span aria-current="page">Privacy</span>
            </li>
          </ol>
        </nav>

        <article className="prose prose-lg prose-purple max-w-none">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">Reviewed September 5, 2026</p>

          <p>
            This site is operated by <strong>Spurlock Studios LLC</strong> (Will Spurlock). Contact:{' '}
            <a href="mailto:william@spurlockstudios.com">william@spurlockstudios.com</a>.
          </p>

          <h2>What we collect when you reach out</h2>
          <p>
            If you submit a form, book a call, or email us, we use the contact details you send so we
            can reply about websites, music services, and automations. We do not sell personal
            information. To request deletion, email william@spurlockstudios.com.
          </p>

          <h2>Measurement (Google Analytics 4)</h2>
          <p>
            Google Analytics 4 measurement ID <code>G-TQELD0FBE0</code> loads only after you click
            Accept on the consent banner. A first visit and Decline make no requests to
            googletagmanager.com or google-analytics.com. We do not use Google Consent Mode as a
            stand-in for loading the script early.
          </p>
          <p>After Accept, these events may fire:</p>
          <ul>
            <li>
              <code>page_view</code> — automatic GA4 page views
            </li>
            <li>
              <code>generate_lead</code> — contact form submit
            </li>
            <li>
              <code>click_calendly</code> — booking button click
            </li>
          </ul>
          <p>
            Withdraw later with{' '}
            <button
              type="button"
              onClick={openMeasurementSettings}
              className="underline underline-offset-2 text-purple-700 hover:text-purple-800 font-medium"
            >
              Cookie settings
            </button>{' '}
            in the footer, or by clearing this site’s data in your browser. Changing your mind to
            Decline after Accept stops new loads on the next visit; a tag already in memory is not
            unloaded mid-session.
          </p>

          <h2>Calendly</h2>
          <p>
            Calendly scripts load only when you use booking. The booking widget is not injected on
            every page view.
          </p>

          <h2>What we do not run</h2>
          <p>
            No Leadsy. No RB2B. No advertising pixels. Measurement is GA4 after Accept, and nothing
            else is queued behind that button.
          </p>

          <p className="mt-10">
            <Link to="/" className="underline underline-offset-2 text-purple-700">
              Back to home
            </Link>
          </p>
        </article>
      </div>
    </main>
  );
}
