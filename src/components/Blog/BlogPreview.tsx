import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BlogManager } from '../../data/blogData/BlogManager';
import { BlogGrid } from './BlogGrid';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const blogManager = new BlogManager();

export function BlogPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get featured blog posts
  const featuredPosts = blogManager.getFeaturedBlogPosts().slice(0, 5);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-500 mb-4">
            Latest from the Blog
          </h2>
          <p className="text-lg text-purple-800 max-w-2xl mx-auto">
            Explore industry insights, tutorials, and thought leadership
          </p>
        </motion.div>
        
        {/* Custom Masonry Grid for Homepage */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12"
        >
          {featuredPosts.length > 0 && (
            <>
              {/* Large Featured Post */}
              <motion.div 
                variants={itemVariants}
                className="md:col-span-8 row-span-2 group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm border border-purple-100/60 relative"
              >
                <Link to={`/blog/${featuredPosts[0].slug}`} className="block h-full">
                  <div className="relative h-full">
                    <img 
                      src={featuredPosts[0].coverImage}
                      alt={featuredPosts[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {featuredPosts[0].categories.slice(0, 2).map(category => (
                          <span 
                            key={category}
                            className="text-xs px-2 py-1 bg-purple-100/80 backdrop-blur-sm text-purple-800 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-100 transition-colors">
                        {featuredPosts[0].title}
                      </h3>
                      
                      <p className="text-gray-200 text-sm sm:text-base mb-4 line-clamp-3">
                        {featuredPosts[0].excerpt}
                      </p>
                      
                      {/* Meta info */}
                      <div className="flex items-center text-xs text-gray-300 gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(featuredPosts[0].publishedAt)}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{featuredPosts[0].readingTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
              
              {/* Secondary Features - Right Column */}
              <div className="md:col-span-4 flex flex-col gap-6">
                {featuredPosts.slice(1, 3).map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm border border-purple-100/60"
                  >
                    <Link to={`/blog/${post.slug}`} className="block h-full flex flex-col">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                        
                        {/* Categories overlay */}
                        <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                          {post.categories.slice(0, 1).map(category => (
                            <span 
                              key={category}
                              className="text-xs px-2 py-1 bg-purple-100/80 backdrop-blur-sm text-purple-800 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Post Content */}
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-base font-semibold text-purple-900 line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors">
                          {post.title}
                        </h3>
                        
                        {/* Meta Info */}
                        <div className="flex items-center text-xs text-gray-600 mt-auto gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Bottom Row - Smaller Posts */}
              {featuredPosts.slice(3, 5).map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  className="md:col-span-6 group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm border border-purple-100/60"
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full flex md:flex-row flex-col">
                    <div className="relative md:w-2/5 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r md:from-transparent md:to-white/20 from-black/50 to-transparent" />
                    </div>
                    
                    {/* Post Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.categories.slice(0, 1).map(category => (
                          <span 
                            key={category}
                            className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-base font-semibold text-purple-900 line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {post.excerpt}
                      </p>
                      
                      {/* Meta Info */}
                      <div className="flex items-center text-xs text-gray-600 mt-auto gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
        
        {/* View All Link */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-10 text-center"
        >
          <Link to="/blog">
            <motion.button
              className="group inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Posts
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 