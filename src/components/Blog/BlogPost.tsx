import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BlogPost as BlogPostType } from '../../types';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, MessageSquare, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { marked, Renderer } from 'marked';
import DOMPurify from 'dompurify';
import { INITIAL_CATEGORIES } from '../../data/blogData/categories';

interface BlogPostProps {
  post: BlogPostType;
  showFullContent?: boolean;
  relatedPosts?: BlogPostType[];
}

interface TOCItem {
  level: number;
  title: string;
  slug: string;
}

export function BlogPost({ post, showFullContent = true, relatedPosts = [] }: BlogPostProps) {
  // Configure marked for better markdown rendering
  marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert line breaks to <br>
  });

  // Function to generate a slug from text
  const generateSlug = (text: string): string => {
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Function to convert markdown to HTML with sanitization
  const renderMarkdown = (markdown: string): string => {
    const renderer = new Renderer();
    
    renderer.heading = ({ tokens, depth }) => {
      const text = tokens
        .map(token => {
          if ('text' in token) {
            return token.text;
          }
          return '';
        })
        .join('');
      const slug = generateSlug(text);
      return `<h${depth} id="${slug}" class="group flex items-center scroll-mt-32">
        <span>${text}</span>
        <a href="#${slug}" class="ml-2 opacity-0 group-hover:opacity-100 text-[#9333EA]/50 hover:text-[#FFB800] transition-all" aria-label="Link to this section">#</a>
      </h${depth}>`;
    };

    const html = marked(markdown, { renderer }) as string;
    return DOMPurify.sanitize(html, {
      ADD_ATTR: ['target', 'id'], // Allow id attributes for heading anchors
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Generate table of contents from markdown content
  const generateTableOfContents = (content: string): TOCItem[] => {
    return content.split('\n')
      .filter(line => /^#{2,4}\s/.test(line))
      .map(line => {
        const match = line.match(/^(#{2,4})\s+(.+)$/);
        if (!match) return null;
        const level = match[1].length;
        const title = match[2];
        const slug = generateSlug(title);
        return { level, title, slug };
      })
      .filter((item): item is TOCItem => item !== null);
  };

  const tableOfContents = showFullContent ? generateTableOfContents(post.content) : [];

  // Function to get the appropriate heading class based on level
  const getHeadingClass = (level: number): string => {
    switch (level) {
      case 2:
        return 'text-base font-medium';
      case 3:
        return 'text-sm ml-4';
      case 4:
        return 'text-xs ml-8';
      default:
        return 'text-base';
    }
  };

  return (
    <article className="w-full bg-white/30 backdrop-blur-md shadow-xl rounded-xl overflow-hidden">
      {/* SEO Optimization */}
      <Helmet>
        <title>{post.seo.title || post.title}</title>
        <meta name="description" content={post.seo.description || post.excerpt} />
        {post.seo.keywords && (
          <meta name="keywords" content={post.seo.keywords.join(', ')} />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back button (when showing full post) */}
        {showFullContent && (
          <Link to="/blog">
            <motion.button
              className="flex items-center gap-2 text-sm text-[#9333EA] hover:text-[#FFB800] mb-4 transition-colors"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </motion.button>
          </Link>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#FFB800] mb-6">
          {showFullContent ? (
            post.title
          ) : (
            <Link 
              to={`/blog/${post.slug}`} 
              className="hover:from-[#FFB800] hover:to-[#9333EA] transition-all duration-300"
            >
              {post.title}
            </Link>
          )}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-[#9333EA]/70">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedAt)}</span>
            {post.updatedAt && (
              <span className="text-[#9333EA]/50 ml-2">
                (Updated: {formatDate(post.updatedAt)})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>{post.metadata?.comments ?? 0} comments</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.categories.length > 0 ? (
            post.categories.map(category => (
              <Link 
                key={category} 
                to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm px-4 py-1 bg-[#9333EA]/10 text-[#9333EA] rounded-full hover:bg-[#9333EA]/20 transition-colors"
              >
                {category}
              </Link>
            ))
          ) : (
            <div className="flex items-center gap-2 text-sm text-[#9333EA]/70">
              <Info className="w-4 h-4" />
              <span>Categories will be automatically assigned based on content</span>
            </div>
          )}
        </div>

        {/* Author info */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-[#9333EA]/5 rounded-xl">
          {post.author.avatar && (
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#9333EA]/20" 
            />
          )}
          <div>
            <div className="font-medium text-[#9333EA]">
              {post.author.name}
            </div>
            <div className="text-sm text-[#9333EA]/70">
              {post.author.title ?? 'Author'}
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        {showFullContent && tableOfContents.length > 0 && (
          <div className="mb-8 p-6 bg-white/50 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#9333EA] mb-4">Table of Contents</h2>
            <nav className="space-y-2">
              {tableOfContents.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.slug}`}
                  className={`block text-[#9333EA]/70 hover:text-[#FFB800] transition-colors ${getHeadingClass(item.level)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.slug);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      // Update URL without triggering a scroll
                      window.history.pushState({}, '', `#${item.slug}`);
                    }
                  }}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        )}

        {/* Content */}
        {showFullContent ? (
          <div 
            className="prose prose-lg prose-purple max-w-none prose-headings:scroll-mt-32"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} 
          />
        ) : (
          <>
            <p className="text-[#9333EA]/80 mb-6">{post.excerpt}</p>
            <Link 
              to={`/blog/${post.slug}`}
              className="inline-block px-6 py-2 bg-[#9333EA] text-white rounded-lg hover:bg-[#FFB800] transition-colors"
            >
              Read More
            </Link>
          </>
        )}

        {/* Social Sharing */}
        {showFullContent && (
          <div className="mt-12 pt-6 border-t border-[#9333EA]/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-[#9333EA]/70 hover:text-[#FFB800] transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center gap-2 text-[#9333EA]/70 hover:text-[#FFB800] transition-colors">
                  <Bookmark className="w-5 h-5" />
                  <span>Save</span>
                </button>
                <button className="flex items-center gap-2 text-[#9333EA]/70 hover:text-[#FFB800] transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span>Comment</span>
                </button>
              </div>
              <div className="text-sm text-[#9333EA]/50">
                {post.metadata.views} views • {post.metadata.likes} likes
              </div>
            </div>
          </div>
        )}

        {/* Related Posts */}
        {showFullContent && relatedPosts.length > 0 && (
          <div className="mt-12 pt-6 border-t border-[#9333EA]/10">
            <h3 className="text-2xl font-bold text-[#9333EA] mb-6">
              Related Posts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <div className="bg-white/50 rounded-xl shadow-md hover:shadow-lg transition-all p-4">
                    <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4">
                      <img 
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-[#9333EA] group-hover:text-[#FFB800] transition-colors line-clamp-2 mb-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-[#9333EA]/70 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
} 