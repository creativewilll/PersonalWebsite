import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogManager } from '../../data/blogData/BlogManager';
import { Calendar, Hash, Clock } from 'lucide-react';

export function BlogSidebar() {
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-4">
        <h3 className="text-lg font-semibold text-[#9333EA] mb-3 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.map(post => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="flex items-start gap-3">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-sm font-medium text-[#9333EA] group-hover:text-[#FFB800] transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#9333EA]/70">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-4">
          <h3 className="text-lg font-semibold text-[#9333EA] mb-3 flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.name}>
                <Link 
                  to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between text-[#9333EA]/80 hover:text-[#FFB800] transition-colors"
                >
                  <span>{category.name}</span>
                  <span className="text-xs bg-[#9333EA]/10 text-[#9333EA] px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 