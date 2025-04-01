import { LucideIcon } from 'lucide-react';

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

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
  };
  categories: string[];
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  priority: number;
  readingTime: number; // in minutes
  excerpt: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export type ProjectType = 'agent' | 'workflow' | 'fullstack' | 'misc' | 'blog' | 'all';

