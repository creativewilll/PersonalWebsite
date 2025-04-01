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
  category?: string; // Category name
  tag?: string; // Tag name
  categorySlug?: string; // URL slug version
  tagSlug?: string; // URL slug version
  showPagination?: boolean;
  postsPerPage?: number;
  type?: 'all' | 'category' | 'tag'; // Pass through type from parent
}

// Animation variants for blog cards
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { 
    scale: 1.02,
    y: -5,
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
  tag,
  categorySlug,
  tagSlug,
  type = 'all',
  showPagination = false,
  postsPerPage = 9
}: BlogGridProps) {
  console.log("BlogGrid rendering with props:", { 
    showFeatured, limit, category, tag, categorySlug, tagSlug, type, showPagination, postsPerPage 
  });
  
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
    console.log("BlogGrid useEffect for fetching posts running");
    setIsLoading(true);
    
    try {
      let posts: BlogPost[] = [];
      
      // Get posts based on the provided props
      if (showFeatured) {
        posts = blogManager.getFeaturedBlogPosts();
        console.log("Fetched featured posts:", posts.length);
      } else if (category) {
        posts = blogManager.getBlogPostsByCategory(category);
        console.log(`Fetched posts for category '${category}':`, posts.length);
      } else if (tag) {
        posts = blogManager.getBlogPostsByTag(tag);
        console.log(`Fetched posts for tag '${tag}':`, posts.length);
      } else if (type === 'category' && categorySlug) {
        // If using type and categorySlug together (for URL-based filtering)
        const categoryName = categorySlug.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        posts = blogManager.getBlogPostsByCategory(categoryName);
        console.log(`Fetched posts for category slug '${categorySlug}' (${categoryName}):`, posts.length);
      } else if (type === 'tag' && tagSlug) {
        // If using type and tagSlug together (for URL-based filtering)
        const tagName = tagSlug.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        posts = blogManager.getBlogPostsByTag(tagName);
        console.log(`Fetched posts for tag slug '${tagSlug}' (${tagName}):`, posts.length);
      } else {
        posts = blogManager.getAllBlogPosts();
        console.log("Fetched all posts:", posts.length);
      }
      
      // Apply limit if specified and pagination is not enabled
      if (limit && limit > 0 && !showPagination) {
        posts = posts.slice(0, limit);
        console.log(`Applied limit ${limit}, new count:`, posts.length);
      }

      setAllPosts(posts);
      
      // Calculate total pages if pagination is enabled
      if (showPagination) {
        const pages = Math.max(1, Math.ceil(posts.length / postsPerPage));
        console.log(`Calculated total pages: ${pages} (${posts.length} posts / ${postsPerPage} per page)`);
        setTotalPages(pages);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading blog posts in BlogGrid:", error);
      setAllPosts([]);
      setIsLoading(false);
    }
  }, [showFeatured, limit, category, tag, type, categorySlug, tagSlug, showPagination, postsPerPage]);

  // Update displayed posts when currentPage changes or when allPosts changes
  useEffect(() => {
    console.log("BlogGrid useEffect for pagination running, currentPage:", currentPage);
    
    try {
      if (showPagination) {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        console.log(`Pagination: showing posts ${startIndex+1}-${endIndex} of ${allPosts.length}`);
        setDisplayedPosts(allPosts.slice(startIndex, endIndex));
        
        // If currentPage is invalid, navigate to page 1
        if (currentPage < 1 || (currentPage > totalPages && totalPages > 0)) {
          console.log("Invalid page number, redirecting to page 1");
          navigate(`${location.pathname}`, { replace: true });
        }
      } else {
        console.log("No pagination, showing all posts");
        setDisplayedPosts(allPosts);
      }
    } catch (error) {
      console.error("Error updating displayed posts:", error);
      setDisplayedPosts([]);
    }
  }, [currentPage, allPosts, showPagination, postsPerPage, totalPages, navigate, location.pathname]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Function to get dynamic classes for varied card sizes
  const getCardSizeClasses = (index: number, postId: string) => {
    // Create a deterministic pattern based on post ID and index
    const patternIndex = (parseInt(postId) + index) % 5;
    
    switch (patternIndex) {
      case 0: // Large card
        return "row-span-2 aspect-[3/4]";
      case 2: // Wide card
        return "col-span-2 aspect-[2/1]";
      case 4: // Tall card
        return "row-span-2 aspect-[3/4]";
      default: // Regular card
        return "aspect-[4/3]";
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index}
              className="animate-pulse rounded-xl overflow-hidden shadow-lg bg-white/40 h-64"
            >
              <div className="bg-purple-100 h-32 w-full"></div>
              <div className="p-4">
                <div className="h-4 bg-purple-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-purple-100 rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-purple-100 rounded w-full mb-3"></div>
                <div className="h-3 bg-purple-100 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If no posts found
  if (displayedPosts.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
        <h3 className="text-xl font-medium text-purple-800 mb-3">No blog posts found</h3>
        <p className="text-gray-600 mb-5">
          {category 
            ? `No posts found in the '${category}' category.`
            : tag 
              ? `No posts found with the '${tag}' tag.` 
              : categorySlug
                ? `No posts found in the ${categorySlug.replace(/-/g, ' ')} category.`
                : tagSlug
                  ? `No posts found with the #${tagSlug.replace(/-/g, ' ')} tag.`
                  : 'No blog posts have been published yet.'}
        </p>
        
        {/* Fallback samples to validate styling */}
        <div className="mt-6 max-w-md mx-auto p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-purple-700">Coming Soon</h4>
          <p className="text-gray-700 mt-2">
            We're working on adding new and insightful blog posts. 
            Check back soon for updates!
          </p>
        </div>
      </div>
    );
  }

  // Change pagination page via URL
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      console.log(`Changing page from ${currentPage} to ${newPage}`);
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

  console.log("BlogGrid rendering with", displayedPosts.length, "posts");

  return (
    <div className="w-full">
      {/* Blog Grid - Using CSS grid for a true masonry layout with varied sizes */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-6 px-4 sm:px-0"
      >
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
            className={`${getCardSizeClasses(index, post.id)} overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm border border-purple-100/60 group`}
          >
            <Link to={`/blog/${post.slug}`} className="block h-full flex flex-col">
              {/* Post Image */}
              <div className="relative overflow-hidden flex-shrink-0" style={{height: post.id === "1" ? "60%" : "50%"}}>
                <img
                  src={post.coverImage || '/blog/default-placeholder.jpg'} // Add fallback image
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loops
                    target.src = '/blog/default-placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                
                {/* Categories overlay */}
                <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                  {post.categories.slice(0, 2).map(category => (
                    <span 
                      key={category}
                      className="text-xs px-2 py-1 bg-purple-100/80 backdrop-blur-sm text-purple-800 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  {post.categories.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-gray-100/80 backdrop-blur-sm text-gray-800 rounded-full">
                      +{post.categories.length - 2} more
                    </span>
                  )}
                </div>
              </div>
              
              {/* Post Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-purple-900 line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors">
                  {post.title}
                </h3>
                
                {/* Meta Info */}
                <div className="flex items-center text-xs text-gray-600 mb-3 gap-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
                
                {/* Excerpt */}
                <p className="text-sm text-gray-600 line-clamp-3 mb-3 flex-grow">
                  {post.excerpt}
                </p>
                
                {/* Read More Link */}
                <div className="text-sm font-medium text-purple-600 group-hover:text-purple-800 transition-colors flex items-center gap-1 mt-auto">
                  Read more
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-center mt-12 space-x-2">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-purple-700 border border-purple-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 transition-all"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  currentPage === page
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white/80 backdrop-blur-sm text-purple-700 border border-purple-200 shadow-sm hover:bg-purple-50'
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-purple-700 border border-purple-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 transition-all"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
} 