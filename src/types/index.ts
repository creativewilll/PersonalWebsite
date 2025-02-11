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
  features: string[];
  timeline: string;
  featured: boolean;
  priority: number;
}

export type ProjectType = 'agent' | 'workflow' | 'fullstack' | 'misc' | 'all';

