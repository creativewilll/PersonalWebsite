import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { JsonLd } from '../components/seo/JsonLd';
import { PERSON_ID, WEBSITE_ID } from '../components/seo/siteGraph';
import { Contact } from '../components/Contact';
import { siteUrl } from '../lib/siteUrl';

export function ContactPage() {
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
        name: 'Contact',
        item: siteUrl('/contact'),
      },
    ],
  };

  return (
    <main className="min-h-screen pt-32 pb-8">
      <MetaTags
        title="How do I contact Will Spurlock?"
        description="Email Will Spurlock, send a project note, or book a 15-minute call about AI Visibility websites, n8n automations, and custom agents."
        url={siteUrl('/contact')}
        canonical={siteUrl('/contact')}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbSchema,
            {
              '@type': 'ContactPage',
              '@id': 'https://williamspurlock.com/contact/#webpage',
              url: siteUrl('/contact'),
              name: 'How do I contact Will Spurlock?',
              description:
                'Email Will Spurlock, send a project note, or book a 15-minute call about AI Visibility websites, n8n automations, and custom agents.',
              isPartOf: { '@id': WEBSITE_ID },
              about: { '@id': PERSON_ID },
              dateModified: '2026-08-27',
            },
          ],
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="underline underline-offset-2 text-purple-700">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span aria-current="page">Contact</span>
            </li>
          </ol>
        </nav>
      </div>
      <Contact headingAs="h1" />
    </main>
  );
}
