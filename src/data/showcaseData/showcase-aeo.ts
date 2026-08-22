import { siteUrl } from '../../lib/siteUrl';
import { ShowcaseSite } from './showcase-sites';

export function websiteDetailBreadcrumb(site: Pick<ShowcaseSite, 'name' | 'slug'>) {
  const pageUrl = siteUrl(`/websites/${site.slug}`);
  return [
    { name: 'Home', to: '/', url: siteUrl('/') },
    { name: 'Websites', to: '/websites', url: siteUrl('/websites') },
    { name: site.name, to: `/websites/${site.slug}`, url: pageUrl },
  ];
}
