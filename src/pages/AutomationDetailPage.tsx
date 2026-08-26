import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { GraphNodes } from '../components/seo/SiteGraph';
import { ORG_ID, PERSON_ID } from '../components/seo/siteGraph';
import snapshot from '../data/automationsData/automations.json';
import type { AutomationEntry, AutomationsSnapshot } from '../data/automationsData';
import { categoryLabel } from '../components/AutomationLibrary/categoryStyles';
import { siteUrl } from '../lib/siteUrl';
import { NotFoundPage } from './NotFoundPage';

const catalog = snapshot as AutomationsSnapshot;

function titleFor(name: string): string {
  const raw = `${name} n8n automation`;
  if (raw.length <= 44) return raw;
  return `${name.slice(0, 28).trim()} n8n automation`;
}

export function AutomationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const automation = useMemo(
    () => catalog.automations.find((item) => item.slug === slug) as AutomationEntry | undefined,
    [slug]
  );

  if (!automation) {
    return <NotFoundPage missingSlug={slug} />;
  }

  const pageUrl = siteUrl(`/automations/${automation.slug}`);
  const related = automation.related
    .map((relatedSlug) => catalog.automations.find((item) => item.slug === relatedSlug))
    .filter((item): item is AutomationEntry => Boolean(item));

  return (
    <main className="min-h-screen pt-32 pb-20">
      <MetaTags
        title={titleFor(automation.name)}
        description={automation.brief.slice(0, 160)}
        url={pageUrl}
        canonical={pageUrl}
      />
      <GraphNodes
        id={`automation-${automation.slug}`}
        nodes={[
          {
            '@type': 'WebPage',
            '@id': `${pageUrl}#webpage`,
            url: pageUrl,
            name: automation.name,
            description: automation.brief,
            isPartOf: { '@id': ORG_ID },
            author: { '@id': PERSON_ID },
            dateModified: `${automation.built}-01`,
          },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="underline underline-offset-2 text-purple-700">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/projects" className="underline underline-offset-2 text-purple-700">Projects</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span aria-current="page">{automation.name}</span>
            </li>
          </ol>
        </nav>

        <p className="text-sm font-semibold uppercase tracking-widest text-purple-600 mb-3">
          {categoryLabel(automation.category)}
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight">
          {automation.name}
        </h1>
        <p className="text-lg text-gray-700 mb-6">{automation.brief}</p>
        <p className="text-sm text-gray-500 mb-8">
          Built <time dateTime={automation.built}>{automation.built}</time>
          {automation.hoursSavedPerWeek > 0
            ? ` · ~${automation.hoursSavedPerWeek} hours saved per week`
            : ''}
        </p>

        <div className="prose prose-purple max-w-none whitespace-pre-line text-gray-700 mb-10">
          {automation.overview}
        </div>

        {automation.tags.length > 0 && (
          <p className="text-sm text-gray-600 mb-4">
            Tags: {automation.tags.join(', ')}
          </p>
        )}
        {automation.integrations.length > 0 && (
          <p className="text-sm text-gray-600 mb-4">
            Integrations: {automation.integrations.join(', ')}
          </p>
        )}

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related automations</h2>
            <ul className="space-y-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/automations/${item.slug}`}
                    className="underline underline-offset-2 text-purple-700"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-12">
          <Link to="/projects" className="underline underline-offset-2 text-purple-700">
            Back to the Automation Library
          </Link>
        </p>
      </article>
    </main>
  );
}
