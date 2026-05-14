import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MetaTags } from '../components/seo/MetaTags';
import { ChevronRight, Sparkles, Zap, Code2, TrendingUp, Palette, Shield, Layers } from 'lucide-react';
import { BlogManager } from '../data/blogData/BlogManager';
import { BlogPost, BlogSidebar } from '../components/Blog';
import { migrateCategories, INITIAL_CATEGORIES } from '../data/blogData/categories';

const blogManager = new BlogManager();

// Same slug helper as BlogPage
const categoryToSlug = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

// Category icon map
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'AI Models & Frontier News': Sparkles,
  'AI Agents & Automation': Zap,
  'AI Coding & Dev Tools': Code2,
  'Growth & Operations': TrendingUp,
  'Web Design & Digital Craft': Palette,
  'AI Policy & Safety': Shield,
};

const CATEGORY_ACCENTS: Record<string, string> = {
  'AI Models & Frontier News': '#8B5CF6',
  'AI Agents & Automation': '#F59E0B',
  'AI Coding & Dev Tools': '#06B6D4',
  'Growth & Operations': '#10B981',
  'Web Design & Digital Craft': '#EC4899',
  'AI Policy & Safety': '#64748B',
};

import { JsonLd } from '../components/seo/JsonLd';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the blog post by slug
  const post = blogManager.getBlogPostBySlug(slug || '');
  
  // If no post is found, redirect to the blog page
  useEffect(() => {
    if (!post && slug) {
      navigate('/blog', { replace: true });
    }
  }, [post, slug, navigate]);
  
  // If the post is still loading or not found, show a loading state
  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-12 sm:pt-32 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-10 w-64 bg-purple-200 rounded-lg mb-4 mx-auto"></div>
          <div className="h-4 w-32 bg-purple-100 rounded-lg mx-auto"></div>
        </div>
      </div>
    );
  }
  
  // Get related posts
  const relatedPosts = blogManager.getRelatedBlogPosts(post, 3);

  // Get migrated categories for this post
  const postCategories = migrateCategories(post.categories);

  // Get all categories with counts for the sidebar
  const allCategories = blogManager.getAllCategories();
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://williamspurlock.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://williamspurlock.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://williamspurlock.com/blog/${slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-32 lg:pb-32">
      <MetaTags 
        title={post.title} 
        description={post.excerpt} 
        image={post.coverImage ? `https://williamspurlock.com${post.coverImage}` : undefined}
        url={`https://williamspurlock.com/blog/${slug}`}
        type="article"
      />
      <JsonLd data={breadcrumbSchema} />
      <div className="relative w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="w-full">
          {/* Blog Post */}
          <BlogPost post={post} showFullContent={true} relatedPosts={relatedPosts} />
          
          {/* Additional Content Section */}
          <div className="mt-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Recent Posts — wider column */}
              <div className="lg:col-span-3 bg-white/30 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-[#9333EA] mb-6">Recent Posts</h2>
                <BlogSidebar />
              </div>
              
              {/* Explore Categories — right column */}
              <div className="lg:col-span-2 bg-white/30 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-[#9333EA] mb-6">Explore Categories</h2>
                <div className="space-y-3">
                  {/* Current post's categories first (highlighted) */}
                  {postCategories.map(category => {
                    const Icon = CATEGORY_ICONS[category] || Layers;
                    const accent = CATEGORY_ACCENTS[category] || '#9333EA';
                    const count = allCategories.find(c => c.name === category)?.count || 0;

                    return (
                      <Link
                        key={category}
                        to={`/blog/category/${categoryToSlug(category)}`}
                      >
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="group flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md"
                          style={{ 
                            borderColor: `${accent}40`,
                            background: `${accent}08`,
                          }}
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${accent}15` }}>
                            <Icon className="w-5 h-5" style={{ color: accent }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-[#9333EA] group-hover:text-[#FFB800] transition-colors">
                              {category}
                            </h3>
                            <p className="text-xs text-[#9333EA]/60 mt-0.5">
                              {count} articles
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#9333EA]/40 group-hover:text-[#FFB800] transition-all group-hover:translate-x-0.5" />
                        </motion.div>
                      </Link>
                    );
                  })}

                  {/* Divider if we have other categories */}
                  {INITIAL_CATEGORIES.filter(c => !postCategories.includes(c)).length > 0 && postCategories.length > 0 && (
                    <div className="flex items-center gap-3 py-1">
                      <div className="flex-1 h-px bg-[#9333EA]/10" />
                      <span className="text-xs text-[#9333EA]/40 font-medium">More topics</span>
                      <div className="flex-1 h-px bg-[#9333EA]/10" />
                    </div>
                  )}

                  {/* Other categories */}
                  {INITIAL_CATEGORIES.filter(c => !postCategories.includes(c)).map(category => {
                    const Icon = CATEGORY_ICONS[category] || Layers;
                    const accent = CATEGORY_ACCENTS[category] || '#9333EA';
                    const count = allCategories.find(c => c.name === category)?.count || 0;

                    return (
                      <Link
                        key={category}
                        to={`/blog/category/${categoryToSlug(category)}`}
                      >
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="group flex items-center gap-4 p-3 rounded-xl border border-[#9333EA]/10 hover:border-[#9333EA]/20 bg-white/30 hover:bg-white/50 transition-all duration-200 hover:shadow-sm"
                        >
                          <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-[#9333EA]/5">
                            <Icon className="w-4 h-4" style={{ color: accent }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-[#9333EA]/80 group-hover:text-[#9333EA] transition-colors">
                              {category}
                            </h3>
                          </div>
                          <span className="text-xs text-[#9333EA]/50 font-medium">
                            {count}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#9333EA]/30 group-hover:text-[#FFB800] transition-all" />
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                {/* View all link */}
                <Link 
                  to="/blog" 
                  className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-[#9333EA] hover:text-[#FFB800] transition-colors py-3 rounded-xl bg-[#9333EA]/5 hover:bg-[#9333EA]/10"
                >
                  Browse all categories
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}