import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BlogPost as BlogPostType } from '../../types';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPostProps {
  post: BlogPostType;
  showFullContent?: boolean;
}

export function BlogPost({ post, showFullContent = true }: BlogPostProps) {
  // Function to convert markdown to HTML (simple version - in a real app, use a proper markdown parser)
  const renderMarkdown = (markdown: string): string => {
    // This is a very basic implementation - use a library like marked or remark for production
    return markdown
      // Headers
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Lists
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/^\d\. (.*$)/gim, '<li>$1</li>')
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      // Paragraphs
      .replace(/^(?!<[h|l|p|u])(.*$)/gim, '<p>$1</p>')
      // Fix empty paragraphs
      .replace(/<p><\/p>/gim, '')
      // Line breaks
      .replace(/\n/gim, '');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <article className="max-w-4xl mx-auto bg-white/30 backdrop-blur-md shadow-xl rounded-xl overflow-hidden">
      {/* SEO Optimization */}
      <Helmet>
        <title>{post.seoTitle || post.title}</title>
        <meta name="description" content={post.seoDescription || post.excerpt} />
        {post.seoKeywords && (
          <meta name="keywords" content={post.seoKeywords.join(', ')} />
        )}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.coverImage} />
        <link rel="canonical" href={`https://williamspurlock.com/blog/${post.slug}`} />
      </Helmet>

      {/* Cover Image */}
      <div className="relative aspect-[21/9] overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Back button (when showing full post) */}
        {showFullContent && (
          <Link to="/blog">
            <motion.button
              className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 mb-4 transition-colors"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </motion.button>
          </Link>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-3">
          {showFullContent ? (
            post.title
          ) : (
            <Link 
              to={`/blog/${post.slug}`} 
              className="hover:text-purple-700 transition-colors"
            >
              {post.title}
            </Link>
          )}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.categories.map(category => (
            <Link 
              key={category} 
              to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs px-3 py-1 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Author info */}
        <div className="flex items-center gap-3 mb-6 p-3 bg-purple-50 rounded-lg">
          {post.author.avatar && (
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover" 
            />
          )}
          <div>
            <div className="font-medium text-purple-900">
              {post.author.name}
            </div>
            <div className="text-sm text-gray-600">
              Author
            </div>
          </div>
        </div>

        {/* Content */}
        {showFullContent ? (
          <div 
            className="prose prose-purple max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} 
          />
        ) : (
          <>
            <p className="text-gray-700 mb-4">{post.excerpt}</p>
            <Link 
              to={`/blog/${post.slug}`}
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Read More
            </Link>
          </>
        )}

        {/* Tags */}
        {showFullContent && (
          <div className="mt-8 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Tagged with:
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
} 