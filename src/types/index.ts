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
  video?: string; // Optional video/gif URL
  tags: string[];
  stack: string[]; // Technical stack used
  timeline: string; // Time spent on project
  features: string[]; // Key features/achievements
  challenges?: string[]; // Optional challenges faced
  githubUrl?: string;
  liveUrl?: string;
  type: 'agent' | 'workflow' | 'fullstack'; // To categorize projects
  quickViewEnabled: boolean; // Controls whether the project details popup can be opened
}
