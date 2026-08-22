import React, { useMemo } from 'react';
import { MetaTags } from '../components/seo/MetaTags';
import { GraphNodes } from '../components/seo/SiteGraph';
import { ORG_ID, PERSON_ID } from '../components/seo/siteGraph';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Search, Layers, ChevronRight, Sparkles, Zap, Code2, TrendingUp, Palette, Shield, Eye, Bot } from 'lucide-react';
import { BlogGrid } from '../components/Blog';
import { NotFoundPage } from './NotFoundPage';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_CATEGORIES, migrateCategory } from '../data/blogData/categories';
import { BlogManager } from '../data/blogData/BlogManager';
import { BlogPost } from '../types';
import { siteUrl } from '../lib/siteUrl';

const blogManager = new BlogManager();

interface BlogPageProps {
  type?: 'all' | 'category' | 'tag';
}

// Category metadata: icons, descriptions, gradients for each bucket
const CATEGORY_META: Record<string, {
  icon: React.ElementType;
  description: string;
  gradient: string;
  accent: string;
}> = {
  'AI Models & Frontier News': {
    icon: Sparkles,
    description: 'This category files posts about frontier model releases, benchmark shifts, and the provider race among ChatGPT, Claude, Gemini, and DeepSeek that changes what a small team can ship. You will find launch recaps, reasoning-quality comparisons, and notes on when a new model is actually worth switching to. Will Spurlock writes from the operator side: what changed, what broke, and what to do this week. Coverage includes research that matters in production, open-weight surprises, and the cost or context-window changes that force an architecture decision. If you want a single shelf for model news tied to implementation, this is that shelf.',
    gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
    accent: '#8B5CF6',
  },
  'AI Agents & Automation': {
    icon: Zap,
    description: 'This category files posts about autonomous agents and the n8n workflows and MCP architecture that keep them useful once they leave a demo. You will find failure modes, guardrails, and the difference between a brittle trigger and an agent that can recover. Will Spurlock writes from systems he has shipped: how to scope the first agent, where humans stay in the loop, and how to measure hours returned. Coverage includes orchestration patterns, tool calling, self-healing jobs, and when a simple scheduled workflow is the better answer. If you want to know what lives in this bucket, it is the practical agent and automation shelf.',
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    accent: '#F59E0B',
  },
  'AI Coding & Dev Tools': {
    icon: Code2,
    description: 'This category files posts about AI-native editors and coding assistants — Cursor, Claude Code, Antigravity, and Codex — and the workflows that change how software gets written. You will find editor comparisons, prompting patterns for multi-file refactors, and notes on where an assistant still fails in a real repository. Will Spurlock writes as a builder who uses these tools on client work, not as a launch-day recap feed. Coverage includes skills and agent loops inside the editor, cost and context tradeoffs, and how to keep quality when generation is fast. If you want the coding-tools shelf on this blog, this is the category that holds it.',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20',
    accent: '#06B6D4',
  },
  'Growth & Operations': {
    icon: TrendingUp,
    description: 'This category files posts about running a studio or small company with fewer people by replacing repetitive work with n8n systems and AI agents. You will find hour-saving playbooks, cost cuts, lead-generation pipelines, and the operating cadence Will Spurlock uses to ship without adding headcount. Coverage includes programmatic publishing, reporting loops, and the difference between a vanity automation and one that returns a measurable week. The writing is operator-first: what to build first, what to ignore, and how to tell if the system is actually saving labor. If you want the growth and operations shelf, this is that collection.',
    gradient: 'from-emerald-500/20 via-green-500/10 to-teal-500/20',
    accent: '#10B981',
  },
  'Web Design & Digital Craft': {
    icon: Palette,
    description: 'This category files posts about custom-coded websites that still read as designed objects: motion, scroll storytelling, and frontend craft that holds up when ChatGPT and Perplexity parse the page. You will find build notes from artist and brand sites, semantic structure under expressive visuals, and the tension between a bold layout and machine-readable markup. Will Spurlock writes as the person who ships both the look and the extractable HTML, often directing Cursor on the build. Coverage includes prompt-to-production workflows, conversion-minded pages, and why craft is not the opposite of structured data. If you want the digital-craft shelf, start here.',
    gradient: 'from-pink-500/20 via-rose-500/10 to-red-500/20',
    accent: '#EC4899',
  },
  'AI Policy & Safety': {
    icon: Shield,
    description: 'This category files posts about the rules, research, and governance that change what teams are allowed to ship with ChatGPT-class models and autonomous agents. You will find explainers on regulation, executive orders, safety papers, and the practical ethics questions that show up in client work. Will Spurlock writes for operators who need the implication, not a legal digest: what changed, who it applies to, and what to do before a deadline. Coverage includes industry governance, classifier and safety-stack research, and how policy pressure lands on n8n agents and automations. If you want the policy and safety shelf on this blog, this is it.',
    gradient: 'from-slate-500/20 via-gray-500/10 to-zinc-500/20',
    accent: '#64748B',
  },
  'AI Visibility': {
    icon: Eye,
    description: 'This category files posts about getting a business named and cited when people ask ChatGPT, Perplexity, and Google AI Overviews for a recommendation. You will find playbooks for generative engine optimization, answer engine optimization, and AI optimization as three jobs, not three slogans. Will Spurlock writes the operator methods he uses on client sites: audits, extractable pages, citation tracking, and the content shapes models actually quote. Coverage includes local businesses, ecommerce catalogs, comparison articles, and author authority. If you want to know what is in this category, it is the AI visibility shelf for generated answers instead of ten blue links.',
    gradient: 'from-violet-500/20 via-fuchsia-500/10 to-amber-500/20',
    accent: '#9333EA',
  },
  'AI Automation': {
    icon: Zap,
    description: 'This category files posts about replacing repetitive business work with n8n, Make, and Zapier automations a small team can actually maintain. You will find cost and ROI breakdowns, the first workflows worth shipping, and the difference between a toy zap and a production job. Will Spurlock writes from stacks he has run: reporting, intake, follow-up, and the weekly admin that eats a part-time hire. Coverage includes workflow design, failure handling, and when to stop buying another seat. If you want to know what is filed here, it is the automation shelf with numbers attached, not a vendor tour.',
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    accent: '#F59E0B',
  },
  'AI Agents': {
    icon: Bot,
    description: 'This category files posts about autonomous agents that take a goal, call tools over MCP, and complete multi-step work in n8n or ChatGPT without a human clicking every stage. You will find operations, sales, and support agents, plus the guardrails that keep them from inventing answers. Will Spurlock writes from production setups: when an agent beats a plain automation, how to start read-only, and how to hand work back to a person. Coverage includes first-server setup, inbound lead handling, and overnight jobs that still need an audit trail. If you want the agents-only shelf, this is that collection.',
    gradient: 'from-cyan-500/20 via-amber-500/10 to-violet-500/20',
    accent: '#06B6D4',
  },
};

function newestPublishedAt(posts: BlogPost[]): string | undefined {
  for (const post of posts) {
    const stamp = Date.parse(post.publishedAt);
    if (!Number.isNaN(stamp)) {
      return new Date(stamp).toISOString().slice(0, 10);
    }
  }
  return undefined;
}

function sourcedPostCountLabel(count: number, asOf?: string): string {
  if (asOf) {
    return `${count} posts as of ${asOf}, counted from content/blog frontmatter`;
  }
  return `${count} posts, counted from content/blog frontmatter`;
}

/** Visible FAQ and FAQPage JSON-LD must use these exact Q/A strings. */
function archiveFaqs(args: {
  termName: string;
  kind: 'category' | 'tag';
  intro: string;
  count: number;
  asOf?: string;
  firstPost?: BlogPost;
}): { question: string; answer: string }[] {
  const { termName, kind, intro, count, asOf, firstPost } = args;
  const kindLabel = kind === 'tag' ? 'tag' : 'category';
  const meaning =
    intro.trim() ||
    `${termName} is a ${kindLabel} on Will Spurlock's blog that groups related posts.`;
  const first = firstPost
    ? `Start with "${firstPost.title}". ${firstPost.excerpt || ''}`.trim()
    : `There are no published posts in ${termName} yet.`;

  return [
    {
      question: `What does ${termName} mean on this blog?`,
      answer: meaning,
    },
    {
      question: `How many posts are filed under ${termName}?`,
      answer: `${sourcedPostCountLabel(count, asOf)}.`,
    },
    {
      question: `What should I read first in ${termName}?`,
      answer: first,
    },
  ];
}

/** One paragraph from the tag name plus the three newest post excerpts. */
function tagIntroFromPosts(tagName: string, posts: BlogPost[]): string {
  const excerpts = posts
    .slice(0, 3)
    .map((post) => (post.excerpt || '').trim().replace(/\s+/g, ' '))
    .filter(Boolean);
  const lead = `Posts tagged ${tagName} collect Will Spurlock's writing on this topic.`;
  if (excerpts.length === 0) {
    return `${lead} This archive lists every published article that carries the ${tagName} tag so you can read the cluster in one place.`;
  }
  return `${lead} The three newest excerpts: ${excerpts.join(' ')}`;
}

// MetaTags appends ` | Will Spurlock` (16 chars). Prop must be 34–44 for a 50–60 title.
const TITLE_PROP_MIN = 34;
const TITLE_PROP_MAX = 44;
const DESC_MIN = 140;
const DESC_MAX = 160;

function fitBand(candidates: string[], min: number, max: number): string {
  const exact = candidates.find((value) => value.length >= min && value.length <= max);
  if (exact) return exact;
  return candidates.reduce((best, value) => {
    const overflow = (text: string) =>
      text.length < min ? min - text.length : text.length > max ? text.length - max : 0;
    return overflow(value) < overflow(best) ? value : best;
  });
}

function taxonomyTitle(name: string, kind: 'category' | 'tag'): string {
  if (kind === 'tag') {
    return fitBand(
      [
        `${name} articles`,
        `${name} blog posts`,
        `${name} tagged posts`,
        `Posts tagged ${name}`,
        `${name} tagged blog articles`,
        `${name} articles and guides`,
        `${name} tagged blog articles and guides`,
        `${name} tagged blog articles and field notes`,
      ],
      TITLE_PROP_MIN,
      TITLE_PROP_MAX
    );
  }
  return fitBand(
    [
      `${name} articles`,
      `${name} blog posts`,
      `${name} articles and guides`,
      `${name} blog articles and guides`,
      `Latest ${name} blog posts`,
      `${name} posts on the blog`,
    ],
    TITLE_PROP_MIN,
    TITLE_PROP_MAX
  );
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'AI Models & Frontier News':
    'Articles on model releases, benchmarks, provider competition, and frontier research. Will Spurlock tracks what changed and what builders should do next.',
  'AI Agents & Automation':
    'Guides to n8n workflows, MCP architecture, agent frameworks, and self-healing systems. Practical writing on building and running AI agents in production.',
  'AI Coding & Dev Tools':
    'Articles on Cursor, Claude Code, Antigravity, Codex, and the rest of the AI coding stack. How Will Spurlock uses these tools to ship production software.',
  'Growth & Operations':
    'Writing on saving hours each week, cutting busywork, and scaling operations without extra headcount. Growth systems Will Spurlock has put into production.',
  'Web Design & Digital Craft':
    'Articles on immersive sites, scroll storytelling, motion, and frontend craft. How Will Spurlock designs custom-coded pages that hold up in AI search.',
  'AI Policy & Safety':
    'Coverage of AI regulation, executive orders, safety research, ethics, and industry governance. What the rules mean for teams shipping agents and automations.',
  'AI Visibility':
    'Articles on ranking in ChatGPT, Perplexity, and Google AI Overviews. Will Spurlock writes the AEO, GEO, and AIO playbooks he uses on client sites.',
  'AI Automation':
    'Guides to n8n, Make, and Zapier workflows that remove repeat work. Will Spurlock covers cost, ROI, and the first automations a small business should ship.',
  'AI Agents':
    'Articles on autonomous AI agents for operations, sales, and support. Will Spurlock explains setup, guardrails, and when an agent beats a plain automation.',
};

function clampBand(text: string, min: number, max: number): string {
  if (text.length >= min && text.length <= max) return text;
  if (text.length > max) {
    const sliced = text.slice(0, max).replace(/\s+\S*$/, '').replace(/[.,;:]$/, '');
    return `${sliced}.`;
  }
  const pad = ' Read more posts in this archive.';
  let out = text.replace(/\.?$/, '');
  while (out.length < min) {
    const next = `${out}.${pad}`;
    if (next.length > max) break;
    out = next.replace(/\.?$/, '');
  }
  if (out.length < min) {
    out = `${out}. Read more.`;
  }
  return out.length > max ? clampBand(out, min, max) : out.endsWith('.') ? out : `${out}.`;
}

function taxonomyDescription(name: string, kind: 'category' | 'tag', fallback?: string): string {
  if (kind === 'category') {
    const owned = CATEGORY_DESCRIPTIONS[name];
    if (owned) return clampBand(owned, DESC_MIN, DESC_MAX);
    if (fallback) return clampBand(fallback, DESC_MIN, DESC_MAX);
  }
  const templates = [
    `Articles tagged ${name} on Will Spurlock's blog: practical guides on AI visibility, automation, and agents, drawn from systems he has shipped for clients.`,
    `Posts tagged ${name} collect Will Spurlock's writing on this topic across AI visibility, n8n automation, agents, and real production systems.`,
    `Will Spurlock's ${name} archive collects practical articles on this topic for AI visibility, automation, and agent systems used in production work.`,
  ];
  return clampBand(fitBand(templates, DESC_MIN, DESC_MAX), DESC_MIN, DESC_MAX);
}

// Robust slug ↔ name conversion using INITIAL_CATEGORIES as the source of truth
const categoryToSlug = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

const slugToCategoryName = (slug: string): string | null => {
  // Try to match against known categories
  for (const cat of INITIAL_CATEGORIES) {
    if (categoryToSlug(cat) === slug) return cat;
  }
  // Fallback: also try migrating a title-cased version
  const titleCased = slug
    .replace(/-/g, ' ')
    .replace(/\band\b/g, '&')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const migrated = migrateCategory(titleCased);
  if (INITIAL_CATEGORIES.includes(migrated)) return migrated;
  return null;
};

export const BlogPage: React.FC<BlogPageProps> = ({ type = 'all' }) => {
  const { categorySlug, tagSlug } = useParams<{
    categorySlug?: string;
    tagSlug?: string;
  }>();
  // Derive the active filter from the URL
  const routeCategory = useMemo(() => {
    if (type === 'category' && categorySlug) {
      return slugToCategoryName(categorySlug);
    }
    return null;
  }, [type, categorySlug]);

  const routeTag = useMemo(() => {
    if (type === 'tag' && tagSlug) return tagSlug;
    return null;
  }, [type, tagSlug]);

  const tagMeta = useMemo(() => {
    if (!routeTag) return null;
    return blogManager.getAllTags().find((t) => t.slug === routeTag) || null;
  }, [routeTag]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParam = searchParams.get('q') || '';
  const hubPage = Number.parseInt(searchParams.get('page') || '1', 10);
  const isPaginatedHub =
    type === 'all' && Number.isFinite(hubPage) && hubPage > 1;

  // Get category counts for the badges
  const categoryCounts = useMemo(() => {
    const allCats = blogManager.getAllCategories();
    const map: Record<string, number> = {};
    allCats.forEach(c => { map[c.name] = c.count; });
    return map;
  }, []);

  const activeCategory = routeCategory;
  const activeMeta = activeCategory ? CATEGORY_META[activeCategory] : null;

  const taxonomyPosts = useMemo(() => {
    if (tagMeta) return blogManager.getBlogPostsByTag(tagMeta.slug);
    if (activeCategory) return blogManager.getBlogPostsByCategory(activeCategory);
    return [];
  }, [tagMeta, activeCategory]);

  const hubPosts = useMemo(
    () => (type === 'all' ? blogManager.getAllBlogPosts() : []),
    [type]
  );

  const dateModified = useMemo(() => {
    const posts = type === 'all' ? hubPosts : taxonomyPosts;
    let newest = 0;
    for (const post of posts) {
      const stamp = Date.parse(post.updatedAt || post.publishedAt);
      if (!Number.isNaN(stamp) && stamp > newest) newest = stamp;
    }
    return newest ? new Date(newest).toISOString().slice(0, 10) : undefined;
  }, [type, hubPosts, taxonomyPosts]);

  const collectionUrl = tagMeta
    ? siteUrl(`/blog/tag/${tagMeta.slug}`)
    : activeCategory
      ? siteUrl(`/blog/category/${categoryToSlug(activeCategory)}`)
      : null;

  const isArchive = type === 'category' || type === 'tag';
  const archiveName = tagMeta?.name || activeCategory || '';
  const archiveIntro = useMemo(() => {
    if (type === 'tag' && tagMeta) return tagIntroFromPosts(tagMeta.name, taxonomyPosts);
    if (type === 'category' && activeCategory) {
      return (
        CATEGORY_META[activeCategory]?.description ||
        `This category files posts under ${activeCategory}. Will Spurlock collects the articles that belong on this shelf so you can see what is in the bucket before you open a post.`
      );
    }
    return '';
  }, [type, tagMeta, activeCategory, taxonomyPosts]);
  const archiveFaqsList = useMemo(() => {
    if (!isArchive || !archiveName) return [];
    return archiveFaqs({
      termName: archiveName,
      kind: tagMeta ? 'tag' : 'category',
      intro: archiveIntro,
      count: taxonomyPosts.length,
      asOf: newestPublishedAt(taxonomyPosts),
      firstPost: taxonomyPosts[0],
    });
  }, [isArchive, archiveName, tagMeta, archiveIntro, taxonomyPosts]);

  if (type === 'category' && categorySlug && !routeCategory) {
    return <NotFoundPage missingSlug={categorySlug} />;
  }
  if (type === 'tag' && tagSlug && !tagMeta) {
    return <NotFoundPage missingSlug={tagSlug} />;
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      {/* Background gradient */}
      <div className="fixed inset-0 bg-pastel-gradient bg-blend-soft-light animate-[gradient_15s_ease_infinite]" style={{ backgroundSize: '200% 200%' }} />
      
      <MetaTags 
        title={
          tagMeta
            ? taxonomyTitle(tagMeta.name, 'tag')
            : activeCategory
              ? taxonomyTitle(activeCategory, 'category')
              : 'AI visibility, automation, and agents blog'
        }
        description={
          tagMeta
            ? taxonomyDescription(tagMeta.name, 'tag')
            : activeCategory
              ? taxonomyDescription(activeCategory, 'category', activeMeta?.description)
              : 'Weekly writing on AI visibility, n8n automation, and AI agents. Practical posts from systems Will Spurlock ships for operators and small teams.'
        }
        url={
          tagMeta
            ? siteUrl(`/blog/tag/${tagMeta.slug}`)
            : activeCategory
              ? siteUrl(`/blog/category/${categoryToSlug(activeCategory)}`)
              : siteUrl('/blog')
        }
        canonical={
          tagMeta
            ? siteUrl(`/blog/tag/${tagMeta.slug}`)
            : activeCategory
              ? siteUrl(`/blog/category/${categoryToSlug(activeCategory)}`)
              : siteUrl('/blog')
        }
        robots={
          isPaginatedHub || (tagMeta && taxonomyPosts.length < 3)
            ? 'noindex, follow'
            : undefined
        }
      />
      <GraphNodes
        id="blog-breadcrumb"
        nodes={[{
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://williamspurlock.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://williamspurlock.com/blog/"
            }
          ].concat(
            activeCategory ? [{
              "@type": "ListItem",
              "position": 3,
              "name": activeCategory,
              "item": `https://williamspurlock.com/blog/category/${categoryToSlug(activeCategory)}/`
            }] : tagMeta ? [{
              "@type": "ListItem",
              "position": 3,
              "name": tagMeta.name,
              "item": `https://williamspurlock.com/blog/tag/${tagMeta.slug}/`
            }] : []
          )
        }]}
      />
      {type === 'all' && (
        <GraphNodes
          id="hub-collection"
          nodes={[{
            '@type': 'CollectionPage',
            '@id': `${siteUrl('/blog')}#collection`,
            url: siteUrl('/blog'),
            ...(dateModified ? { dateModified } : {}),
          }]}
        />
      )}
      {collectionUrl && (
        <GraphNodes
          id="taxonomy-collection"
          nodes={[{
            '@type': 'CollectionPage',
            '@id': `${collectionUrl}#collection`,
            url: collectionUrl,
            name: archiveName ? `What is filed under ${archiveName}?` : undefined,
            description: archiveIntro || undefined,
            ...(dateModified ? { dateModified } : {}),
            isPartOf: { '@id': ORG_ID },
            publisher: { '@id': ORG_ID },
            author: { '@id': PERSON_ID },
            creator: { '@id': PERSON_ID },
            mainEntity: {
              '@type': 'ItemList',
              '@id': `${collectionUrl}#itemlist`,
              numberOfItems: taxonomyPosts.length,
              itemListElement: taxonomyPosts.map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: siteUrl(`/blog/${post.slug}`),
                name: post.title,
              })),
            },
          }]}
        />
      )}
      {collectionUrl && archiveFaqsList.length > 0 && (
        <GraphNodes
          id="taxonomy-faq"
          nodes={[{
            '@type': 'FAQPage',
            '@id': `${collectionUrl}#faq`,
            mainEntity: archiveFaqsList.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }]}
        />
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA] via-[#FFB800] to-[#FFB800] opacity-20" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            {isArchive && archiveName && (
              <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#9333EA]/70">
                <ol className="flex flex-wrap items-center justify-center gap-1.5">
                  <li className="flex items-center gap-1.5">
                    <Link to="/" className="hover:text-[#9333EA] hover:underline underline-offset-2">Home</Link>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span aria-hidden="true">/</span>
                    <Link to="/blog" className="hover:text-[#9333EA] hover:underline underline-offset-2">Blog</Link>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span aria-hidden="true">/</span>
                    <span aria-current="page" className="font-medium text-[#9333EA]">{archiveName}</span>
                  </li>
                </ol>
              </nav>
            )}
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#FFB800]">
                {isArchive && (tagMeta?.name || activeCategory)
                  ? `What is filed under ${tagMeta?.name || activeCategory}?`
                  : 'Insights & Innovations'}
              </span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-[#9333EA]/80 mx-auto mb-10 mt-5 ${
                isArchive && archiveIntro
                  ? 'text-base md:text-lg max-w-3xl text-left sm:text-center'
                  : 'text-lg md:text-xl max-w-3xl'
              }`}
            >
              {isArchive && archiveIntro
                ? archiveIntro
                : 'Exploring the future of technology through practical applications, real-world solutions, and innovative approaches to business transformation.'}
            </motion.p>
            {isArchive && (
              <p className="text-sm text-[#9333EA]/70 max-w-3xl mx-auto -mt-6 mb-10">
                {sourcedPostCountLabel(taxonomyPosts.length, newestPublishedAt(taxonomyPosts))}
              </p>
            )}
            
            {/* ── Category Pills ── */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mb-8 max-w-5xl mx-auto"
            >
              {/* All Topics pill */}
              <Link
                to="/blog"
                className={`group relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  !activeCategory
                    ? 'bg-[#9333EA] text-white shadow-lg shadow-[#9333EA]/30 scale-105'
                    : 'bg-white/60 backdrop-blur-sm text-[#9333EA]/80 border border-[#9333EA]/15 hover:bg-white/80 hover:border-[#9333EA]/30 hover:text-[#9333EA]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  All Topics
                  {!activeCategory && (
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
                    </span>
                  )}
                </span>
              </Link>

              {INITIAL_CATEGORIES.map(category => {
                const meta = CATEGORY_META[category];
                const Icon = meta?.icon || Layers;
                const isActive = activeCategory === category;
                const count = categoryCounts[category] || 0;
                
                return (
                  <Link
                    key={category}
                    to={isActive ? '/blog' : `/blog/category/${categoryToSlug(category)}`}
                    className={`group relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-[#9333EA] text-white shadow-lg shadow-[#9333EA]/30 scale-105'
                        : 'bg-white/60 backdrop-blur-sm text-[#9333EA]/80 border border-[#9333EA]/15 hover:bg-white/80 hover:border-[#9333EA]/30 hover:text-[#9333EA]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {category}
                      {count > 0 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20' : 'bg-[#9333EA]/10'
                        }`}>
                          {count}
                        </span>
                      )}
                    </span>
                  </Link>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Category Hero Card (shown when a specific category is selected) ── */}
      <AnimatePresence mode="wait">
        {activeCategory && activeMeta && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-8"
          >
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${activeMeta.gradient} border border-white/30 backdrop-blur-xl p-6 md:p-8 shadow-xl`}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: activeMeta.accent }} />
              <div className="relative flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `${activeMeta.accent}20`, border: `1px solid ${activeMeta.accent}30` }}>
                  <activeMeta.icon className="w-7 h-7" style={{ color: activeMeta.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-2xl md:text-3xl font-bold text-[#9333EA] mb-2">
                    {activeCategory}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-[#9333EA]/60">
                    <span className="font-semibold text-[#9333EA]">
                      {sourcedPostCountLabel(taxonomyPosts.length, newestPublishedAt(taxonomyPosts))}
                    </span>
                    <span className="mx-1">·</span>
                    <Link to="/blog" className="hover:text-[#FFB800] transition-colors flex items-center gap-1">
                      All categories <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#FFB800] mb-2">
              {tagMeta
                ? `Tagged: ${tagMeta.name}`
                : activeCategory 
                ? `${activeCategory}`
                : 'Latest Articles'}
            </h2>
            {!activeCategory && (
              <p className="text-base text-[#9333EA]/70">
                Discover insights and strategies for leveraging technology in business
              </p>
            )}
          </div>
          
          {type === 'all' && (
            <div className="w-full sm:w-auto">
              <form method="get" action="/blog/" role="search" className="relative">
                <label htmlFor="blog-search" className="sr-only">Search articles</label>
                <input
                  id="blog-search"
                  type="search"
                  name="q"
                  key={searchParam}
                  defaultValue={searchParam}
                  placeholder="Search articles..."
                  className="w-full sm:w-80 px-6 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-[#9333EA]/15 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/25 focus:border-[#9333EA]/40 transition-all duration-200 shadow-sm text-[#9333EA] placeholder:text-[#9333EA]/40"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9333EA]/40 hover:text-[#9333EA]"
                  aria-label="Search articles"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
        </div>

        {type === 'all' && hubPosts.length > 0 && (
          <nav aria-label="Recent answers" className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#9333EA]/70 mb-3">
              Recent answers
            </p>
            <ol className="space-y-2">
              {hubPosts.slice(0, 10).map((post, index) => (
                <li key={post.slug} className="text-[#9333EA]">
                  <Link
                    to={`/blog/${post.slug}/`}
                    className="text-sm sm:text-base hover:text-[#FFB800] hover:underline underline-offset-2"
                  >
                    <span className="text-[#9333EA]/50 mr-2">{index + 1}.</span>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <BlogGrid
          category={activeCategory || undefined}
          tag={tagMeta?.slug}
          type={type}
          showPagination={true}
          postsPerPage={9}
        />

        {isArchive && archiveFaqsList.length > 0 && (
          <section aria-label="Frequently asked questions" className="mt-16 max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#FFB800] mb-6">
              Frequently asked questions
            </h2>
            {archiveFaqsList.map((faq) => (
              <div key={faq.question} className="p-6 bg-white/50 rounded-xl border border-[#9333EA]/15">
                <h3 className="text-base font-bold text-[#9333EA] mb-2">{faq.question}</h3>
                <p className="text-[#9333EA]/80 text-sm md:text-base">{faq.answer}</p>
              </div>
            ))}
          </section>
        )}

        {/* ── Explore Categories Grid (shown on "All Topics" view) ── */}
        {!activeCategory && !tagMeta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#FFB800] mb-8 text-center">
              Explore by Category
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {INITIAL_CATEGORIES.map((category, index) => {
                const meta = CATEGORY_META[category];
                if (!meta) return null;
                const Icon = meta.icon;
                const count = categoryCounts[category] || 0;

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      to={`/blog/category/${categoryToSlug(category)}`}
                      className={`group relative block overflow-hidden rounded-2xl bg-gradient-to-br ${meta.gradient} border border-white/30 backdrop-blur-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ background: meta.accent }} />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md" style={{ background: `${meta.accent}15`, border: `1px solid ${meta.accent}25` }}>
                            <Icon className="w-6 h-6" style={{ color: meta.accent }} />
                          </div>
                          <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: `${meta.accent}15`, color: meta.accent }}>
                            {count} posts
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-[#9333EA] mb-2 group-hover:text-[#FFB800] transition-colors">
                          {category}
                        </h4>
                        <p className="text-sm text-[#9333EA]/60 line-clamp-2 mb-4">
                          {meta.description}
                        </p>
                        <div className="flex items-center text-sm font-medium text-[#9333EA]/70 group-hover:text-[#FFB800] transition-colors">
                          Browse articles
                          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
};