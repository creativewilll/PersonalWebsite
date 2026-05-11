import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BlogManager } from '../../data/blogData/BlogManager';
import { Calendar, Hash, Clock, ChevronRight, Sparkles, Zap, Code2, TrendingUp, Palette, Shield, Layers } from 'lucide-react';

// Category icon + accent map
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

const categoryToSlug = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

export function BlogSidebar() {
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    try {
      setIsLoading(true);
      
      const blogManager = new BlogManager();
      
      // Get categories
      const cats = blogManager.getAllCategories();
      setCategories(cats);
      
      // Get recent posts
      const posts = blogManager.getRecentBlogPosts(5);
      setRecentPosts(posts);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading sidebar data:", error);
      setIsLoading(false);
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-4 animate-pulse">
            <div className="h-6 bg-gradient-to-r from-[#9333EA]/20 to-[#FFB800]/20 rounded w-1/3 mb-4" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gradient-to-r from-[#9333EA]/20 to-[#FFB800]/20 rounded w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Recent Posts */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-5">
        <h3 className="text-lg font-bold text-[#9333EA] mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#FFB800]" />
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#9333EA]/5 transition-colors duration-200">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#9333EA] group-hover:text-[#FFB800] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-[#9333EA]/60">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </div>
              {index < recentPosts.length - 1 && (
                <div className="border-b border-[#9333EA]/5 mt-3" />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-5">
          <h3 className="text-lg font-bold text-[#9333EA] mb-4 flex items-center gap-2">
            <Hash className="h-5 w-5 text-[#FFB800]" />
            Categories
          </h3>
          <div className="space-y-1.5">
            {categories.map(category => {
              const Icon = CATEGORY_ICONS[category.name] || Layers;
              const accent = CATEGORY_ACCENTS[category.name] || '#9333EA';
              const slug = categoryToSlug(category.name);
              const isActive = location.pathname === `/blog/category/${slug}`;

              return (
                <Link 
                  key={category.name}
                  to={`/blog/category/${slug}`}
                  className={`group flex items-center gap-3 py-2.5 px-3 -mx-1 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#9333EA]/10 shadow-sm'
                      : 'hover:bg-[#9333EA]/5'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
                  <span className={`text-sm font-medium flex-1 ${
                    isActive ? 'text-[#9333EA]' : 'text-[#9333EA]/75 group-hover:text-[#9333EA]'
                  } transition-colors`}>
                    {category.name}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? 'bg-[#9333EA]/15 text-[#9333EA]'
                      : 'bg-[#9333EA]/8 text-[#9333EA]/60 group-hover:bg-[#9333EA]/12 group-hover:text-[#9333EA]/80'
                  }`}>
                    {category.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}