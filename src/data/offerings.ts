import { Code, Globe, Server, Rocket, Brain, Zap, Bus } from 'lucide-react';
import { Offering } from '../types';

export const offerings: Offering[] = [
  {
    icon: Globe,
    title: 'Brand-Aware Content Management',
    description: "Harness AI to generate engaging content for blogs, social media, and marketing campaigns—keeping your brand fresh and relevant without the creative hassle."
  },
  {
    icon: Server,
    title: 'Automated Email Outreach',
    description: 'Automate your email campaigns and follow-ups with an AI Assistant trained on your data that nurtures every lead, so you never miss an opportunity to connect.'
  },
  {
    icon: Rocket,
    title: 'AI Data Quality Assurance',
    description: 'Utilize AI to detect anomalies and inconsistencies in real time, reducing manual data cleansing and ensuring the integrity of your datasets.'
  },
  {
    icon: Bus,
    title: 'AI Secretary with a Cloned Voice',
    description: 'Transform your communication with a voice AI secretary that uses your own voice to intercept calls, screen inbound inquiries, and handle outbound follow-ups.'
  },
  {
    icon: Code,
    title: 'Agentic Inventory Manager',
    description: 'Streamline your operations with AI that monitors inventory levels, predicts demand fluctuations, and automates reordering and low-stock alerts, ensuring your supply chain runs efficiently and cost-effectively.'
  },
  {
    icon: Zap,
    title: 'Automatic Key Information Extraction',
    description: 'Let AI handle the heavy lifting by analyzing contracts, invoices, and other documents. It extracts requested details and flags issues automatically so you can make informed decisions quickly.'
  }
];
