import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { BlogManager } from '../data/blogData/BlogManager';
import { BlogPost, BlogSidebar } from '../components/Blog';

const blogManager = new BlogManager();

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
  
  return (
    <div className="min-h-screen pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-32 lg:pb-32">
      {/* SEO Optimization handled by the BlogPost component */}
      
      <div className="relative w-full sm:w-11/12 lg:w-[90%] max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="flex-1">
            {/* Blog Post */}
            <BlogPost post={post} showFullContent={true} />
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-12"
              >
                <h2 className="text-2xl font-bold text-purple-900 mb-6">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <motion.div
                      key={relatedPost.id}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <a href={`/blog/${relatedPost.slug}`} className="block">
                        <div className="aspect-[16/9] relative overflow-hidden">
                          <img 
                            src={relatedPost.coverImage} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-purple-900 line-clamp-2 hover:text-purple-700 transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Sidebar */}
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
} 