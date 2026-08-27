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
  if (site.slug === 'eminem-shady-97') {
    return 'people who want an unofficial Eminem digital museum — catalog, essays, videos, gallery, and Notify Me merch — and who need to know this is not eminem.com';
  }
  if (site.slug === 'neon-trees') {
    return 'fans of Neon Trees who want Sink Your Teeth, tour dates, merch, and press on a custom-coded artist site';
  }
  if (site.slug === 'friday-pilots-club') {
    return 'fans of Friday Pilots Club who want Nowhere, live dates, lore, shop, and the Passengers community in one place';
  }
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

export function websiteDetailHeadings(name: string) {
  return {
    h1: `What did Will Spurlock build for ${name}?`,
    challenge: `What problem did ${name} have?`,
    approach: `How was the ${name} website built?`,
    result: `What changed after the ${name} site launched?`,
    lighthouse: 'What were the first-launch Lighthouse scores?',
    visibility: 'What are the top factors for performance and AI visibility?',
  };
}

/** Visible FAQ and FAQPage JSON-LD must use these exact Q/A strings. */
export function websiteDetailFaqs(site: ShowcaseSite): { question: string; answer: string }[] {
  const audience = audienceFor(site);
  const shipped = shippedList(site);
  const costAnswer =
    site.slug === 'perti'
      ? `This case study does not publish a project fee or client revenue. The ${site.name} site, recorded ${site.uploadDate}, surfaces a ranking system for the collective's 38M+ streams already stated in the portfolio copy.`
      : `This case study does not publish a project fee or client revenue for the ${site.name} website. It is a ${site.year} custom-coded build; no earnings figure is on record.`;

  const faqs = [
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

  if (site.slug === 'eminem-shady-97') {
    faqs.push(
      {
        question: 'Is the SHADY 97 website official?',
        answer:
          'No. SHADY 97 is an unofficial concept site by Will Spurlock. It is not eminem.com and is not affiliated with Eminem, Aftermath, Interscope, or Universal Music Group. Official merch is shop.eminem.com.',
      },
      {
        question: 'What were the first-launch Lighthouse scores for SHADY 97?',
        answer:
          'As of 2026-08-27, operator Lighthouse reported desktop Performance 97 (LCP 1.0s, TBT 0 ms, CLS 0) and mobile Performance 91 (LCP 2.9s, TBT 0 ms, CLS 0). Accessibility was 94, Best Practices 81, SEO 100, and PWA 2/2 on both. No project fee is published.',
      },
      {
        question: 'Who built SHADY 97?',
        answer:
          'Will Spurlock built SHADY 97 as a custom-coded React artist museum using the same 30-point SEO, UI/UX, and AEO audit — eight routes, 240 items — he runs on other artist websites.',
      },
    );
  }

  return faqs;
}
