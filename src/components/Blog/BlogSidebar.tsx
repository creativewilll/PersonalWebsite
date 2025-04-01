import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogManager } from '../../data/blogData/BlogManager';
import { Calendar, Tag, Hash, Clock } from 'lucide-react';

export function BlogSidebar() {
  console.log("BlogSidebar rendering");
  
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [tags, setTags] = useState<{ name: string; count: number }[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      console.log("BlogSidebar useEffect running");
      setIsLoading(true);
      
      const blogManager = new BlogManager();
      
      // Get categories
      const cats = blogManager.getAllCategories();
      console.log("Loaded categories:", cats);
      setCategories(cats);
      
      // Get tags
      const tagList = blogManager.getAllTags();
      console.log("Loaded tags:", tagList);
      setTags(tagList);
      
      // Get recent posts
      const posts = blogManager.getRecentBlogPosts(5);
      console.log("Loaded recent posts:", posts.length);
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
  
  // Loading skeleton
  if (isLoading) {
    return (
      <aside className="w-full lg:w-80 space-y-8">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-4 animate-pulse">
          <div className="h-5 bg-purple-200 rounded w-1/3 mb-3"></div>
          <div className="h-8 bg-purple-100 rounded w-full mb-2"></div>
          <div className="h-8 bg-purple-100 rounded w-full"></div>
        </div>
        
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-4 animate-pulse">
          <div className="h-5 bg-purple-200 rounded w-1/3 mb-3"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 bg-purple-100 rounded w-16"></div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* Search */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-4">
        <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search blog posts..." 
            className="w-full px-4 py-2 pr-10 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-4">
          <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Posts
          </h3>
          <ul className="space-y-3">
            {recentPosts.map(post => (
              <li key={post.id} className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                <Link 
                  to={`/blog/${post.slug}`}
                  className="hover:text-purple-700 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-16 h-12 flex-shrink-0">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-full object-cover rounded" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/blog/default-placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{post.title}</h4>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt)}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-4">
          <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.name}>
                <Link 
                  to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between text-gray-700 hover:text-purple-700 transition-colors"
                >
                  <span>{category.name}</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Tags */}
      {tags.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-4">
          <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Link 
                key={tag.name} 
                to={`/blog/tag/${tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
              >
                <span>{tag.name}</span>
                <span className="text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-md p-4 text-white">
        <h3 className="text-lg font-semibold mb-2">Subscribe to Newsletter</h3>
        <p className="text-sm text-purple-100 mb-3">Get the latest blog posts delivered directly to your inbox.</p>
        <form className="space-y-2">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
            required
          />
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
} 