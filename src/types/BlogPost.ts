import { z } from 'zod';

// Author schema
export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
  bio: z.string(),
  title: z.string(),
  social: z.record(z.string()).default({}),
});

// SEO schema
export const SEOSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  publishedTime: z.string().optional(),
  modifiedTime: z.string().optional(),
  section: z.string().optional(),
  authors: z.array(z.string()).optional(),
  canonicalUrl: z.string().optional(),
});

// Table of contents item schema
export const TOCItemSchema = z.object({
  level: z.number(),
  title: z.string(),
  slug: z.string(),
});

// Blog post schema
export const BlogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  coverImage: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  readingTime: z.number(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  categories: z.array(z.string()).default([]),
  author: AuthorSchema,
  seo: SEOSchema,
  tableOfContents: z.array(TOCItemSchema),
  relatedPosts: z.array(z.string()), // Array of post IDs
  series: z.object({
    id: z.string(),
    title: z.string(),
    order: z.number(),
  }).optional(),
  metadata: z.object({
    views: z.number().default(0),
    likes: z.number().default(0),
    shares: z.number().default(0),
    comments: z.number().default(0),
  }).default({}),
});

// Helper function to create a new blog post
export const createBlogPost = (data: Partial<BlogPost>): BlogPost => {
  const defaultPost: BlogPost = {
    id: '',
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    coverImage: '/images/default-blog-cover.jpg',
    publishedAt: new Date().toISOString(),
    readingTime: 0,
    featured: false,
    draft: true,
    categories: [],
    author: {
      id: '',
      name: '',
      avatar: '',
      bio: '',
      title: '',
      social: {},
    },
    seo: {
      title: '',
      description: '',
      keywords: [],
      ogImage: '',
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      section: 'Blog',
      authors: [],
    },
    tableOfContents: [],
    relatedPosts: [],
    metadata: {
      views: 0,
      likes: 0,
      shares: 0,
      comments: 0,
    },
  };

  return { ...defaultPost, ...data };
};

// Helper function to generate SEO metadata
export const generateSEOMetadata = (post: BlogPost): SEO => {
  return {
    title: `${post.title} | William Spurlock`,
    description: post.excerpt,
    keywords: [...post.categories],
    ogImage: post.coverImage,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt || post.publishedAt,
    section: post.categories[0] || 'Blog',
    authors: [post.author.name],
    canonicalUrl: `https://williamspurlock.com/blog/${post.slug}`,
  };
};

// Export types
export type Author = z.infer<typeof AuthorSchema>;
export type SEO = z.infer<typeof SEOSchema>;
export type TOCItem = z.infer<typeof TOCItemSchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>; 