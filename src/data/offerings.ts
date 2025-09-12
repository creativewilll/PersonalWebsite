import { Linkedin, Users, Target, Phone, Building } from 'lucide-react';
import { Offering } from '../types';

export const offerings: Offering[] = [
  {
    icon: Linkedin,
    title: 'AI-Powered LinkedIn Outreach System',
    description: 'A full-funnel system that scrapes leads from LinkedIn, enriches their data, qualifies them against an Ideal Customer Profile using company website data, and executes automated, hyper-personalized outreach sequences to book calls.'
  },
  {
    icon: Users,
    title: 'Omni-Channel AI Sales Team',
    description: 'A multi-agent AI sales system deployed across platforms like WhatsApp, Facebook, and Instagram. It provides instant, 24/7 intelligent responses to inbound inquiries, qualifies leads, and books appointments directly into a sales team\'s calendar.'
  },
  {
    icon: Target,
    title: 'AI-Powered Meta Ad Automation',
    description: 'An ad creation system that researches products, generates ad angles with psychological triggers, creates high-converting UGC scripts, and tracks performance via the Facebook Graph API to create a self-improving advertising workflow.'
  },
  {
    icon: Phone,
    title: 'AI Voice Agent System',
    description: 'An AI voice agent that can call new leads within seconds of an inquiry. It conducts natural conversations, handles objections, and books appointments with real-time calendar integration.'
  },
  {
    icon: Building,
    title: 'Enterprise AI Consulting',
    description: 'Strategic consulting services focused on AI integration and optimization to facilitate large-scale business transformation for enterprise-level clients.'
  }
];
