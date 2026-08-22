import { siteUrl } from '../../lib/siteUrl';
import { ShowcaseSite, industryMeta } from './showcase-sites';

export function websiteDetailBreadcrumb(site: Pick<ShowcaseSite, 'name' | 'slug'>) {
  const pageUrl = siteUrl(`/websites/${site.slug}`);
  return [
    { name: 'Home', to: '/', url: siteUrl('/') },
    { name: 'Websites', to: '/websites', url: siteUrl('/websites') },
    { name: site.name, to: `/websites/${site.slug}`, url: pageUrl },
  ];
}

function audienceFor(site: ShowcaseSite): string {
  switch (site.industry) {
    case 'music':
      return `fans of ${site.name} who want music, tour, and merch in one place`;
    case 'construction':
      return `prospective customers comparing ${site.name} in ${industryMeta[site.industry].label.toLowerCase()}`;
    case 'cannabis':
      return `customers discovering the ${site.name} cannabis brand`;
    default:
      return `people looking for ${site.name}`;
  }
}

function shippedList(site: ShowcaseSite): string {
  if (site.features.length === 0) {
    return `a custom-coded ${site.year} website`;
  }
  if (site.features.length === 1) return site.features[0];
  if (site.features.length === 2) return `${site.features[0]} and ${site.features[1]}`;
  return `${site.features.slice(0, -1).join(', ')}, and ${site.features[site.features.length - 1]}`;
}

/** Visible FAQ and FAQPage JSON-LD must use these exact Q/A strings. */
export function websiteDetailFaqs(site: ShowcaseSite): { question: string; answer: string }[] {
  const audience = audienceFor(site);
  const shipped = shippedList(site);
  const costAnswer =
    site.slug === 'perti'
      ? `This case study does not publish a project fee or client revenue. The ${site.name} site, recorded ${site.uploadDate}, surfaces a ranking system for the collective's 38M+ streams already stated in the portfolio copy.`
      : `This case study does not publish a project fee or client revenue for the ${site.name} website. It is a ${site.year} custom-coded build; no earnings figure is on record.`;

  return [
    {
      question: `Who is the ${site.name} website for?`,
      answer: `The ${site.name} website is for ${audience}.`,
    },
    {
      question: `What shipped on the ${site.name} website?`,
      answer: `The ${site.year} ${site.name} site shipped ${shipped}.`,
    },
    {
      question: `What did the ${site.name} website cost or earn?`,
      answer: costAnswer,
    },
  ];
}
