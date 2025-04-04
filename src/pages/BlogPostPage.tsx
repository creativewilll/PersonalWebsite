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
      <div className="relative w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="w-full">
          {/* Blog Post */}
          <BlogPost post={post} showFullContent={true} relatedPosts={relatedPosts} />
          
          {/* Additional Content Section */}
          <div className="mt-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Recent Posts */}
              <div className="bg-white/30 backdrop-blur-md shadow-xl rounded-xl overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-[#9333EA] mb-6">Recent Posts</h2>
                <BlogSidebar />
              </div>
              
              {/* Categories */}
              <div className="bg-white/30 backdrop-blur-md shadow-xl rounded-xl overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-[#9333EA] mb-6">Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.categories.map(category => (
                    <motion.div
                      key={category}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
                    >
                      <h3 className="text-lg font-semibold text-[#9333EA]">{category}</h3>
                      <p className="text-sm text-[#9333EA]/70 mt-1">
                        Explore more posts in this category
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 