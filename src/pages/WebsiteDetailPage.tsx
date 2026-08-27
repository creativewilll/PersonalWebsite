import React from 'react';
import { useParams } from 'react-router-dom';
import { ShowcaseManager } from '../data/showcaseData/ShowcaseManager';
import { websiteDetailBreadcrumb, websiteDetailFaqs } from '../data/showcaseData/showcase-aeo';
import { ShowcaseDetail } from '../components/Showcase/ShowcaseDetail';
import { MetaTags } from '../components/seo/MetaTags';
import { GraphNodes } from '../components/seo/SiteGraph.tsx';
import { ORG_ID, PERSON_ID } from '../components/seo/siteGraph.ts';
import { siteUrl } from '../lib/siteUrl';
import { NotFoundPage } from './NotFoundPage';

const manager = new ShowcaseManager();

/** Title prop only — MetaTags appends ` | Will Spurlock` (16 chars) for a 50–60 served title. */
function websiteDetailTitle(name: string): string {
  const min = 34;
  const max = 44;
  const candidates = [
    `${name} website case study`,
    `${name} custom website case study`,
    `${name} custom artist website case study`,
  ];
  const fit = candidates.find((title) => title.length >= min && title.length <= max);
  if (fit) return fit;
  return candidates.reduce((best, title) => {
    const overflow = (value: string) =>
      value.length < min ? min - value.length : value.length > max ? value.length - max : 0;
    return overflow(title) < overflow(best) ? title : best;
  });
}

export function WebsiteDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const site = manager.getSiteBySlug(slug || '');
  const relatedSites = site ? manager.getRelatedSites(site.slug, 3) : [];

  if (!site) {
    return <NotFoundPage missingSlug={slug} />;
  }

  const pageUrl = siteUrl(`/websites/${site.slug}`);
  const aboutType = site.industry === 'music' ? 'MusicGroup' : 'Organization';
  const breadcrumb = websiteDetailBreadcrumb(site);
  const faqs = websiteDetailFaqs(site);

  return (
    <main className="min-h-screen pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-32 lg:pb-32">
      <MetaTags
        title={websiteDetailTitle(site.name)}
        description={site.description}
        image={`https://williamspurlock.com${site.thumbnail}`}
        url={pageUrl}
        canonical={pageUrl}
      />
      <GraphNodes
        id={`website-detail-${site.slug}`}
        nodes={[
          {
            '@type': 'WebPage',
            '@id': `${pageUrl}#webpage`,
            url: pageUrl,
            name: site.name,
            description: site.description,
            isPartOf: { '@id': ORG_ID },
            author: { '@id': PERSON_ID },
          },
          {
            '@type': 'CreativeWork',
            '@id': `${pageUrl}#work`,
            url: pageUrl,
            name: site.name,
            description: site.description,
            about: {
              '@type': aboutType,
              name: site.name,
              url: site.liveUrl,
            },
            creator: { '@id': PERSON_ID },
            author: { '@id': PERSON_ID },
            provider: { '@id': ORG_ID },
            isPartOf: { '@id': ORG_ID },
            dateCreated: `${site.year}-01-01`,
            dateModified: site.uploadDate,
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: breadcrumb.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              item: item.url,
            })),
          },
          {
            '@type': 'FAQPage',
            '@id': `${pageUrl}#faq`,
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          },
        ]}
      />
      <div className="relative w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseDetail site={site} relatedSites={relatedSites} />
      </div>
    </main>
  );
}
