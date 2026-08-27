import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { JsonLd } from '../components/seo/JsonLd';
import { WEBSITE_ID } from '../components/seo/siteGraph';
import { siteUrl } from '../lib/siteUrl';

export function PrivacyPage() {
  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://williamspurlock.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Privacy Policy',
        item: siteUrl('/privacy'),
      },
    ],
  };

  return (
    <main className="min-h-screen pt-32 pb-20">
      <MetaTags
        title="Privacy Policy"
        description="How Spurlock Studios LLC (Will Spurlock) collects and uses contact details from forms, Calendly, and email. We do not sell personal information."
        url={siteUrl('/privacy')}
        canonical={siteUrl('/privacy')}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbSchema,
            {
              '@type': 'WebPage',
              '@id': 'https://williamspurlock.com/privacy/#webpage',
              url: siteUrl('/privacy'),
              name: 'Privacy Policy',
              description:
                'How Spurlock Studios LLC (Will Spurlock) collects and uses contact details from forms, Calendly, and email.',
              isPartOf: { '@id': WEBSITE_ID },
              dateModified: '2026-08-21',
            },
          ],
        }}
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
              <span aria-current="page">Privacy Policy</span>
            </li>
          </ol>
        </nav>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">Reviewed August 21, 2026</p>
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            Spurlock Studios LLC (Will Spurlock) collects contact details you submit through forms,
            Calendly, or email so we can reply about websites, music services, and automations.
          </p>
          <p>
            We do not sell personal information. Analytics may include Google Analytics 4. To request
            deletion, email{' '}
            <a
              href="mailto:william@spurlockstudios.com"
              className="underline underline-offset-2 text-purple-700"
            >
              william@spurlockstudios.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
