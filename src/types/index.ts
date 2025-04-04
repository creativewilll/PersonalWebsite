import { LucideIcon } from 'lucide-react';
import { z } from 'zod';

export interface Offering {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  description: string;
  image: string;
  quickViewEnabled: boolean;
  quickViewImage?: string;
  features: string[];
  timeline: string;
  featured: boolean;
  priority: number;
}

// Author schema
export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  title: z.string().optional(),
  social: z.record(z.string()).optional(),
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

// Table of Contents Item schema
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
  tags: z.array(z.string()).default([]),
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

export type BlogPost = z.infer<typeof BlogPostSchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type SEO = z.infer<typeof SEOSchema>;
export type TOCItem = z.infer<typeof TOCItemSchema>;

export type ProjectType = 'agent' | 'workflow' | 'fullstack' | 'misc' | 'blog' | 'all';

