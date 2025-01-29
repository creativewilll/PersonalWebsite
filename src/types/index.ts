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
  title: string;
  description: string;
  image: string;
  quickViewImage?: string; // Optional image for the detailed view
  video?: string; // Optional video/gif URL
  tags: string[];
  stack: string[]; // Technical stack used
  timeline: string; // Time spent on project
  features: string[]; // Key features/achievements
  challenges?: string[]; // Optional challenges faced
  githubUrl?: string;
  liveUrl?: string;
  type: 'agent' | 'workflow' | 'fullstack' | 'misc'; // To categorize projects
  quickViewEnabled: boolean; // Controls whether the project details popup can be opened
  featured: boolean; // Whether to show on home page
  priority?: number; // Optional display order (lower numbers shown first)
}

export type ProjectType = 'agent' | 'workflow' | 'fullstack' | 'misc' | 'all';
