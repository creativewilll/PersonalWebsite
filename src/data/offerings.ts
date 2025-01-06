import { Code, Globe, Server, Rocket, Brain, Zap } from 'lucide-react';
import { Offering } from '../types';

export const offerings: Offering[] = [
  {
    icon: Globe,
    title: 'AI & Agentic Systems',
    description: 'Creating personalized, advanced agentic systems and workflows to fuel your efficiency and productivity.'
  },
  {
    icon: Server,
    title: 'UI/UX Design',
    description: 'Crafting aesthetic and practical user interfaces with meticulous attention to detail and user experience.'
  },
  {
    icon: Rocket,
    title: 'SEO & Digital Marketing',
    description: 'Boosting online visibility through strategic SEO optimization and digital marketing campaigns.'
  },
  {
    icon: Brain,
    title: 'Social Media & Branding',
    description: 'Building strong brand identities and managing social media presence for maximum engagement.'
  },
  {
    icon: Code,
    title: 'Full Stack Development',
    description: 'Developing robust web applications using modern technologies and best practices.'
  },
  {
    icon: Zap,
    title: 'AI Integration',
    description: 'Implementing cutting-edge AI solutions using Langflow, Langchain, and custom Python frameworks.'
  }
];
