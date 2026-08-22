import React from 'react';
import { useParams } from 'react-router-dom';
import { ShowcaseManager } from '../data/showcaseData/ShowcaseManager';
import { ShowcaseDetail } from '../components/Showcase/ShowcaseDetail';
import { MetaTags } from '../components/seo/MetaTags';
import { siteUrl } from '../lib/siteUrl';
import { NotFoundPage } from './NotFoundPage';

const manager = new ShowcaseManager();

export function WebsiteDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const site = manager.getSiteBySlug(slug || '');
  const relatedSites = site ? manager.getRelatedSites(site.slug, 3) : [];

  if (!site) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-32 lg:pb-32">
      <MetaTags
        title={`${site.name} — Website by Will Spurlock`}
        description={site.description}
        image={`https://williamspurlock.com${site.thumbnail}`}
        url={siteUrl(`/websites/${site.slug}`)}
        canonical={siteUrl(`/websites/${site.slug}`)}
      />
      <div className="relative w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseDetail site={site} relatedSites={relatedSites} />
      </div>
    </div>
  );
}
