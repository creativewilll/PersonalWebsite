import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BlogGrid, BlogSidebar } from '../components/Blog';
import { BlogManager } from '../data/blogData/BlogManager';
import { BlogPost } from '../types';

interface BlogPageProps {
  type?: 'all' | 'category' | 'tag';
  limit?: number;
}

export function BlogPage({ type = 'all', limit }: BlogPageProps) {
  console.log("BlogPage rendering with params:", { type, limit });
  
  const { categorySlug, tagSlug } = useParams<{ categorySlug?: string; tagSlug?: string }>();
  const location = useLocation();
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const blogManager = new BlogManager();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Get the URL query params for page number
  const urlParams = new URLSearchParams(location.search);
  const pageParam = urlParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  
  // Convert slug back to original name
  const deSlugify = (slug?: string) => {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get total post count for this view (for schema.org data)
  useEffect(() => {
    console.log("BlogPage useEffect running with params:", { categorySlug, tagSlug, type });
    
    try {
      setIsLoading(true);
      setHasError(false);
      
      let count = 0;
      if (type === 'category' && categorySlug) {
        count = blogManager.getBlogPostsByCategory(deSlugify(categorySlug)).length;
        console.log(`Found ${count} posts in category: ${deSlugify(categorySlug)}`);
      } else if (type === 'tag' && tagSlug) {
        count = blogManager.getBlogPostsByTag(deSlugify(tagSlug)).length;
        console.log(`Found ${count} posts with tag: ${deSlugify(tagSlug)}`);
      } else {
        count = blogManager.getAllBlogPosts().length;
        console.log(`Found ${count} total posts`);
      }
      
      console.log(`Blog page: Found ${count} posts for ${type} view`);
      setTotalPosts(count);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading blog posts:", error);
      setHasError(true);
      setIsLoading(false);
    }
  }, [type, categorySlug, tagSlug]);
  
  // Determine the correct title based on the page type
  const getPageTitle = () => {
    try {
      if (type === 'category' && categorySlug) {
        return `${categorySlug} Articles`;
      } else if (type === 'tag' && tagSlug) {
        return `Posts Tagged #${tagSlug}`;
      }
      return 'Blog';
    } catch (error) {
      console.error("Error getting page title:", error);
      return 'Blog';
    }
  };
  
  // Determine the proper description for SEO
  const getPageDescription = () => {
    try {
      if (type === 'category' && categorySlug) {
        return `Browse all articles in the ${categorySlug} category.`;
      } else if (type === 'tag' && tagSlug) {
        return `Explore all content tagged with #${tagSlug}.`;
      }
      return 'Explore my latest thoughts, tutorials, and insights on technology, development, and design.';
    } catch (error) {
      console.error("Error getting page description:", error);
      return 'Explore my latest articles and insights';
    }
  };

  // Get canonical URL
  const getCanonicalUrl = () => {
    const baseUrl = 'https://williamspurlock.com';
    let path = '';
    
    if (type === 'all') {
      path = '/blog';
    } else if (type === 'category') {
      path = `/blog/category/${categorySlug}`;
    } else if (type === 'tag') {
      path = `/blog/tag/${tagSlug}`;
    }
    
    // Add page parameter to canonical URL if not the first page
    if (currentPage > 1) {
      return `${baseUrl}${path}?page=${currentPage}`;
    }
    
    return `${baseUrl}${path}`;
  };

  // Get structured data for SEO
  const getStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": getCanonicalUrl()
      },
      "name": getPageTitle(),
      "description": getPageDescription(),
      "url": getCanonicalUrl(),
      "isPartOf": {
        "@type": "WebSite",
        "name": "William Spurlock",
        "url": "https://williamspurlock.com"
      },
      "numberOfItems": totalPosts
    };
  };

  // Animation variants for the page content
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Fallback UI for loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-purple-200 rounded mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-purple-100 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback UI for error state
  if (hasError) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Unable to load blog posts</h2>
          <p className="text-gray-600 mb-6">We're having trouble loading the blog content. Please try again later.</p>
          <Link 
            to="/"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Fallback for empty blog (with a sample post UI)
  if (totalPosts === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-32 lg:pb-32">
        <Helmet>
          <title>{getPageTitle()} | William Spurlock</title>
          <meta name="description" content={getPageDescription()} />
        </Helmet>
        
        <div className="relative w-full sm:w-11/12 lg:w-[90%] max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                         from-purple-700 to-indigo-500 mb-2 sm:mb-4 px-4">
              {type === 'all' ? 'Blog' : type === 'category' ? `${deSlugify(categorySlug)}` : `#${deSlugify(tagSlug)}`}
            </h1>
            <p className="text-purple-800 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Our blog is coming soon! Check back later for insightful content.
            </p>
          </motion.div>
          
          {/* Sample post UI to show styling */}
          <div className="max-w-4xl mx-auto bg-white/30 backdrop-blur-md shadow-xl rounded-xl overflow-hidden p-6">
            <h2 className="text-xl font-bold text-purple-900 mb-3">Welcome to our blog</h2>
            <p className="text-gray-700">
              We're currently working on some amazing content for you. Our blog will feature in-depth articles
              about AI, workflow automation, and technology strategies.
            </p>
          </div>
        </div>
      </div>
    );
  }

  console.log("BlogPage rendering with title:", getPageTitle());

  return (
    <motion.div 
      className="py-10 md:py-16"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>{getPageTitle()} | William Spurlock</title>
        <meta name="description" content={getPageDescription()} />
        <meta property="og:title" content={`${getPageTitle()} | William Spurlock`} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={getCanonicalUrl()} />
        
        {/* Add pagination rel links for SEO */}
        {currentPage > 1 && (
          <link 
            rel="prev" 
            href={currentPage === 2 
              ? getCanonicalUrl().replace(/\?page=2$/, '') 
              : getCanonicalUrl().replace(/page=\d+/, `page=${currentPage - 1}`)} 
          />
        )}
        
        {totalPosts > currentPage * 9 && (
          <link 
            rel="next" 
            href={getCanonicalUrl().includes('?page=') 
              ? getCanonicalUrl().replace(/page=\d+/, `page=${currentPage + 1}`)
              : `${getCanonicalUrl()}?page=${currentPage + 1}`}
          />
        )}
        
        <meta 
          name="keywords" 
          content="AI, workflow automation, technology, business strategy, productivity, AI agents, digital transformation" 
        />
        
        {/* Structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify(getStructuredData())}
        </script>
      </Helmet>
      
      {/* Back button (only show on category and tag pages) */}
      {type !== 'all' && (
        <Link to="/blog">
          <motion.button
            className="fixed left-4 top-24 sm:left-8 sm:top-32 z-10 flex items-center gap-2 px-4 py-2 text-sm 
                     bg-white/80 hover:bg-white/90 text-purple-800 rounded-full shadow-lg hover:shadow-xl 
                     transition-all duration-300 backdrop-blur-sm"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Posts
          </motion.button>
        </Link>
      )}
      
      <div className="relative w-full sm:w-11/12 lg:w-[90%] max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          ref={ref}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                       from-purple-700 to-indigo-500 mb-2 sm:mb-4 px-4">
            {type === 'all' ? 'Blog' : type === 'category' ? `${deSlugify(categorySlug)}` : `#${deSlugify(tagSlug)}`}
          </h1>
          <p className="text-purple-800 text-base sm:text-lg max-w-2xl mx-auto px-4">
            {type === 'all' 
              ? 'Explore insights, tutorials, and thought leadership'
              : type === 'category'
                ? `Explore all posts in the ${deSlugify(categorySlug)} category`
                : `Browse all posts tagged with ${deSlugify(tagSlug)}`
            }
          </p>
          
          {currentPage > 1 && (
            <div className="mt-2 text-sm text-purple-600">
              Page {currentPage}
            </div>
          )}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <BlogGrid 
              type={type}
              categorySlug={categorySlug}
              tagSlug={tagSlug}
              showPagination={true}
              postsPerPage={9}
            />
          </div>
          
          {/* Sidebar */}
          <BlogSidebar />
        </div>
      </div>
    </motion.div>
  );
}

// Helper function to get blog statistics
function getBlogStats() {
  try {
    const blogManager = new BlogManager();
    const allPosts = blogManager.getAllBlogPosts();
    
    // Get unique categories
    const uniqueCategories = new Set<string>();
    allPosts.forEach(post => {
      post.categories.forEach(category => uniqueCategories.add(category));
    });
    
    // Get unique tags
    const uniqueTags = new Set<string>();
    allPosts.forEach(post => {
      post.tags.forEach(tag => uniqueTags.add(tag));
    });
    
    console.log("Blog stats:", {
      totalPosts: allPosts.length,
      categories: uniqueCategories.size,
      tags: uniqueTags.size
    });
    
    return {
      totalPosts: allPosts.length,
      categories: uniqueCategories.size,
      tags: uniqueTags.size
    };
  } catch (error) {
    console.error("Error calculating blog stats:", error);
    return {
      totalPosts: 0,
      categories: 0,
      tags: 0
    };
  }
} 