import { ShowcaseSite, Industry, showcaseSites, industryMeta } from './showcase-sites';

export class ShowcaseManager {
  private sites: ShowcaseSite[];

  constructor() {
    this.sites = [...showcaseSites];
  }

  getAllSites(): ShowcaseSite[] {
    return [...this.sites].sort((a, b) => a.priority - b.priority);
  }

  getFeaturedSites(): ShowcaseSite[] {
    return this.sites
      .filter(site => site.featured)
      .sort((a, b) => a.priority - b.priority);
  }

  /** Returns the exact hero carousel sites in a curated order */
  getHeroSites(): ShowcaseSite[] {
    const heroSlugs = [
      'superduperkyle',
      'winyah',
      'people-r-ugly',
      'suicideboys',
      'arizona-zervas',
      'oliver-malcolm',
      'jp-fuller',
    ];
    return heroSlugs
      .map(slug => this.sites.find(s => s.slug === slug))
      .filter((s): s is ShowcaseSite => s !== undefined);
  }

  getSiteBySlug(slug: string): ShowcaseSite | undefined {
    return this.sites.find(s => s.slug === slug);
  }

  getSitesByIndustry(industry: Industry): ShowcaseSite[] {
    return this.sites
      .filter(s => s.industry === industry)
      .sort((a, b) => a.priority - b.priority);
  }

  getIndustryStats(): { industry: Industry; label: string; icon: string; count: number; color: string; gradient: string }[] {
    const industries: Industry[] = ['music', 'construction', 'cannabis', 'saas', 'other'];
    return industries
      .map(industry => ({
        industry,
        ...industryMeta[industry],
        count: this.sites.filter(s => s.industry === industry).length,
      }))
      .filter(stat => stat.count > 0);
  }

  getTotalCount(): number {
    return this.sites.length;
  }

  getRelatedSites(slug: string, limit = 3): ShowcaseSite[] {
    const current = this.getSiteBySlug(slug);
    if (!current) return [];
    
    return this.sites
      .filter(s => s.slug !== slug && s.industry === current.industry)
      .sort((a, b) => a.priority - b.priority)
      .slice(0, limit);
  }
}
