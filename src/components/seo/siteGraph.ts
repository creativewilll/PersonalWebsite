export const SITE_ORIGIN = 'https://williamspurlock.com';
export const ORG_ID = `${SITE_ORIGIN}/#organization`;
export const PERSON_ID = `${SITE_ORIGIN}/#person`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export const SAME_AS = [
  'https://www.linkedin.com/in/william-spurlock/',
  'https://x.com/creativewill02',
  'https://www.upwork.com/freelancers/~01e5f4af96d3c88817',
];

export function organizationNode() {
  return {
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: 'Will Spurlock',
    legalName: 'Spurlock Studios LLC',
    alternateName: 'Spurlock Solutions AI',
    foundingDate: '2026',
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/og/logo-512.png`,
    description:
      'Will Spurlock builds premium, custom-coded websites engineered for AI Visibility — optimized to rank in ChatGPT, Perplexity, and Google AI Overviews. Backed by custom AI agents and automations.',
    telephone: '+1-248-824-3309',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Oakland County',
      addressRegion: 'MI',
      addressCountry: 'US',
    },
    founder: { '@id': PERSON_ID },
    knowsAbout: [
      'AI Visibility',
      'AI Optimization (AIO)',
      'Answer Engine Optimization (AEO)',
      'Generative Engine Optimization (GEO)',
      'Premium Brand Web Design',
      'AI Agents',
      'AI Automation',
      'Web Development',
    ],
    areaServed: 'Worldwide',
    priceRange: '$$',
  };
}

export function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Will Spurlock',
    url: SITE_ORIGIN,
    jobTitle: 'AI Visibility & Brand Design Engineer',
    email: 'william@spurlockstudios.com',
    sameAs: SAME_AS,
    worksFor: { '@id': ORG_ID },
  };
}

export function siteGraph(extra: Record<string, unknown>[] = []) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode(), personNode(), ...extra],
  };
}
