import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '../../types';
import { BlogManager } from '../../data/blogData/BlogManager';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const blogManager = new BlogManager();

interface BlogGridProps {
  showFeatured?: boolean;
  limit?: number;
  category?: string;
  categorySlug?: string;
  showPagination?: boolean;
  postsPerPage?: number;
  type?: 'all' | 'category';
}

// Animation variants for blog cards
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { 
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export function BlogGrid({ 
  showFeatured = false, 
  limit, 
  category,
  categorySlug,
  type = 'all',
  showPagination = false,
  postsPerPage = 9
}: BlogGridProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get the current page from URL query params
  const urlParams = new URLSearchParams(location.search);
  const pageParam = urlParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  // Get all relevant posts on component mount
  useEffect(() => {
    setIsLoading(true);
    
    try {
      let posts: BlogPost[] = [];
      
      // Get posts based on the provided props
      if (showFeatured) {
        posts = blogManager.getFeaturedBlogPosts();
      } else if (category) {
        posts = blogManager.getBlogPostsByCategory(category);
      } else if (type === 'category' && categorySlug) {
        // If using type and categorySlug together (for URL-based filtering)
        const categoryName = categorySlug.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        posts = blogManager.getBlogPostsByCategory(categoryName);
      } else {
        posts = blogManager.getAllBlogPosts();
      }
      
      // Apply limit if specified and pagination is not enabled
      if (limit && limit > 0 && !showPagination) {
        posts = posts.slice(0, limit);
      }

      setAllPosts(posts);
      
      // Calculate total pages if pagination is enabled
      if (showPagination) {
        const pages = Math.max(1, Math.ceil(posts.length / postsPerPage));
        setTotalPages(pages);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading blog posts in BlogGrid:", error);
      setAllPosts([]);
      setIsLoading(false);
    }
  }, [showFeatured, limit, category, type, categorySlug, showPagination, postsPerPage]);

  // Update displayed posts when currentPage changes or when allPosts changes
  useEffect(() => {
    try {
      if (showPagination) {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        setDisplayedPosts(allPosts.slice(startIndex, endIndex));
        
        // If currentPage is invalid, navigate to page 1
        if (currentPage < 1 || (currentPage > totalPages && totalPages > 0)) {
          navigate(`${location.pathname}`, { replace: true });
        }
      } else {
        setDisplayedPosts(allPosts);
      }
    } catch (error) {
      console.error("Error updating displayed posts:", error);
      setDisplayedPosts([]);
    }
  }, [currentPage, allPosts, showPagination, postsPerPage, totalPages, navigate, location.pathname]);

  // If no posts found
  if (displayedPosts.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <img 
              src="/images/Automated-Hiring-Pipeline.jpg" 
              alt="No posts found" 
              className="w-48 h-48 mx-auto rounded-lg object-cover shadow-lg"
            />
          </div>
          <h3 className="text-xl font-medium text-[#9333EA] mb-3">No blog posts found</h3>
          <p className="text-[#9333EA]/80 mb-5">
            {category 
              ? `No posts found in the '${category}' category.`
              : categorySlug
                ? `No posts found in the ${categorySlug.replace(/-/g, ' ')} category.`
                : 'No blog posts have been published yet.'}
          </p>
          
          <div className="mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-[#9333EA]">Coming Soon</h4>
            <p className="text-[#9333EA]/80 mt-2">
              We're working on adding new and insightful blog posts. 
              Check back soon for updates!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="relative h-48 bg-gradient-to-r from-[#9333EA]/20 to-[#FFB800]/20" />
            <div className="p-4">
              <div className="h-4 bg-gradient-to-r from-[#9333EA]/20 to-[#FFB800]/20 rounded w-3/4 mb-2" />
              <div className="flex gap-2 mb-3">
                <div className="h-3 bg-gradient-to-r from-[#9333EA]/20 to-[#FFB800]/20 rounded w-16" />
                <div className="h-3 bg-gradient-to-r from-[#9333EA]/20 to-[#FFB800]/20 rounded w-16" />
              </div>
              <div className="h-3 bg-gradient-to-r from-[#9333EA]/20 to-[#FFB800]/20 rounded w-full mb-2" />
              <div className="h-3 bg-gradient-to-r from-[#9333EA]/20 to-[#FFB800]/20 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Change pagination page via URL
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      // Use navigate instead of setting state directly
      if (newPage === 1) {
        // Remove the page parameter for page 1
        navigate(`${location.pathname}`);
      } else {
        navigate(`${location.pathname}?page=${newPage}`);
      }
      
      // Scroll to top of grid when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            custom={index}
            transition={{
              animate: {
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut"
              }
            }}
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              {/* Content Container */}
              <div className="flex flex-col flex-grow p-5 sm:p-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.slice(0, 2).map(category => (
                    <span
                      key={category}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-[#9333EA]/10 text-[#9333EA]"
                    >
                      {category}
                    </span>
                  ))}
                  {post.categories.length > 2 && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#9333EA]/5 text-[#9333EA]">
                      +{post.categories.length - 2}
                    </span>
                  )}
                </div>
                
                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#FFB800] group-hover:from-[#9333EA] group-hover:to-[#FFB800] transition-colors duration-300">
                    {post.title}
                  </span>
                </h3>
                
                {/* Excerpt */}
                <p className="text-[#9333EA]/80 text-sm sm:text-base mb-4 line-clamp-2 flex-grow">
                  {post.excerpt}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-[#9333EA]/70 pt-4 border-t border-[#9333EA]/10">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-center mt-12 space-x-1 sm:space-x-2">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm text-[#9333EA] border border-[#9333EA]/20 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#9333EA]/10 transition-all"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* First page */}
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium bg-white/80 backdrop-blur-sm text-[#9333EA] border border-[#9333EA]/20 shadow-sm hover:bg-[#9333EA]/10 transition-all"
                  aria-label="Page 1"
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="px-1 sm:px-2 text-[#9333EA]">...</span>
                )}
              </>
            )}
            
            {/* Current page and surrounding pages */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    page === currentPage
                      ? 'bg-gradient-to-r from-[#9333EA] to-[#FFB800] text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-sm text-[#9333EA] border border-[#9333EA]/20 shadow-sm hover:bg-[#9333EA]/10'
                  }`}
                  aria-label={`Page ${page}`}
                >
                  {page}
                </button>
              );
            })}
            
            {/* Last page */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="px-1 sm:px-2 text-[#9333EA]">...</span>
                )}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium bg-white/80 backdrop-blur-sm text-[#9333EA] border border-[#9333EA]/20 shadow-sm hover:bg-[#9333EA]/10 transition-all"
                  aria-label={`Page ${totalPages}`}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm text-[#9333EA] border border-[#9333EA]/20 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#9333EA]/10 transition-all"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      )}
    </div>
  );
} 