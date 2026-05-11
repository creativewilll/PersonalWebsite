import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Layers, ChevronRight, Sparkles, Zap, Code2, TrendingUp, Palette, Shield } from 'lucide-react';
import { BlogGrid } from '../components/Blog';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_CATEGORIES, migrateCategory } from '../data/blogData/categories';
import { BlogManager } from '../data/blogData/BlogManager';

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
    description: 'Model releases, benchmarks, provider wars, and the cutting edge of AI research.',
    gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
    accent: '#8B5CF6',
  },
  'AI Agents & Automation': {
    icon: Zap,
    description: 'n8n workflows, MCP architecture, agent frameworks, and self-healing systems.',
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    accent: '#F59E0B',
  },
  'AI Coding & Dev Tools': {
    icon: Code2,
    description: 'Cursor, Claude Code, Antigravity, Codex — the tools reshaping how we build.',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20',
    accent: '#06B6D4',
  },
  'Growth & Operations': {
    icon: TrendingUp,
    description: 'Saving hundreds of hours weekly, eliminating costs, and scaling without headcount.',
    gradient: 'from-emerald-500/20 via-green-500/10 to-teal-500/20',
    accent: '#10B981',
  },
  'Web Design & Digital Craft': {
    icon: Palette,
    description: 'Immersive web experiences, scroll storytelling, motion design, and frontend craft.',
    gradient: 'from-pink-500/20 via-rose-500/10 to-red-500/20',
    accent: '#EC4899',
  },
  'AI Policy & Safety': {
    icon: Shield,
    description: 'Regulation, executive orders, safety research, ethics, and industry governance.',
    gradient: 'from-slate-500/20 via-gray-500/10 to-zinc-500/20',
    accent: '#64748B',
  },
};

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
  return titleCased; // best-effort fallback
};

export const BlogPage: React.FC<BlogPageProps> = ({ type = 'all' }) => {
  const { categorySlug, tagSlug } = useParams<{
    categorySlug?: string;
    tagSlug?: string;
  }>();
  const navigate = useNavigate();

  // Derive the active filter from the URL
  const routeCategory = useMemo(() => {
    if (type === 'category' && categorySlug) {
      return slugToCategoryName(categorySlug);
    }
    return null;
  }, [type, categorySlug]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(routeCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Get category counts for the badges
  const categoryCounts = useMemo(() => {
    const allCats = blogManager.getAllCategories();
    const map: Record<string, number> = {};
    allCats.forEach(c => { map[c.name] = c.count; });
    return map;
  }, []);

  // Handle category selection — navigate to the category page
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      navigate(`/blog/category/${categoryToSlug(category)}`);
    } else {
      navigate('/blog');
    }
  };

  // Determine page title based on context
  const activeCategory = selectedCategory || routeCategory;
  const activeMeta = activeCategory ? CATEGORY_META[activeCategory] : null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      {/* Background gradient */}
      <div className="fixed inset-0 bg-pastel-gradient bg-blend-soft-light animate-[gradient_15s_ease_infinite]" style={{ backgroundSize: '200% 200%' }} />
      
      <Helmet>
        <title>{activeCategory ? `${activeCategory} | Blog` : 'AI & Automation Blog'} | William Spurlock</title>
        <meta name="description" content={activeMeta?.description || 'Exploring the intersection of AI, automation, and business transformation through practical insights and real-world applications.'} />
        <meta property="og:title" content={activeCategory ? `${activeCategory} | Blog` : 'AI & Automation Blog | William Spurlock'} />
        <meta property="og:description" content={activeMeta?.description || 'Exploring the intersection of AI, automation, and business transformation through practical insights and real-world applications.'} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={activeCategory ? `https://williamspurlock.com/blog/category/${categoryToSlug(activeCategory)}` : 'https://williamspurlock.com/blog'} />
        <meta name="keywords" content="AI development, workflow automation, technology insights, business transformation, AI solutions, automation tools, digital innovation" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA] via-[#FFB800] to-[#FFB800] opacity-20" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#FFB800]">
                {activeCategory || 'Insights & Innovations'}
              </span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-[#9333EA]/80 max-w-3xl mx-auto mb-10 mt-5"
            >
              {activeMeta?.description || 'Exploring the future of technology through practical applications, real-world solutions, and innovative approaches to business transformation.'}
            </motion.p>
            
            {/* ── Category Pills ── */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mb-8 max-w-5xl mx-auto"
            >
              {/* All Topics pill */}
              <button
                onClick={() => handleCategorySelect(null)}
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
              </button>

              {INITIAL_CATEGORIES.map(category => {
                const meta = CATEGORY_META[category];
                const Icon = meta?.icon || Layers;
                const isActive = activeCategory === category;
                const count = categoryCounts[category] || 0;
                
                return (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(isActive ? null : category)}
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
                  </button>
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
                  <h2 className="text-2xl md:text-3xl font-bold text-[#9333EA] mb-2">
                    {activeCategory}
                  </h2>
                  <p className="text-[#9333EA]/70 text-base md:text-lg">
                    {activeMeta.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-[#9333EA]/60">
                    <span className="font-semibold text-[#9333EA]">{categoryCounts[activeCategory] || 0}</span> articles
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
              {activeCategory 
                ? `${activeCategory}`
                : 'Latest Articles'}
            </h2>
            {!activeCategory && (
              <p className="text-base text-[#9333EA]/70">
                Discover insights and strategies for leveraging technology in business
              </p>
            )}
          </div>
          
          <div className="w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 px-6 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-[#9333EA]/15 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/25 focus:border-[#9333EA]/40 transition-all duration-200 shadow-sm text-[#9333EA] placeholder:text-[#9333EA]/40"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9333EA]/40 w-5 h-5" />
            </div>
          </div>
        </div>

        <BlogGrid
          category={activeCategory || undefined}
          showPagination={true}
          postsPerPage={9}
        />

        {/* ── Explore Categories Grid (shown on "All Topics" view) ── */}
        {!activeCategory && (
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
    </motion.div>
  );
};