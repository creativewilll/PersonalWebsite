import {
  Linkedin,
  Mail,
  Twitter, // Represents X
  Facebook,
  Instagram,
  ShoppingBag, // Placeholder for Gumroad
  Github // Keep Github icon import if used elsewhere, otherwise remove
} from 'lucide-react';
import { UpworkIcon } from '../components/ui/UpworkIcon';

// Header Links
export const headerSocialLinks = [
  { href: 'https://www.linkedin.com/in/william-spurlock/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://x.com/creativewill02', icon: Twitter, label: 'X' },
  { href: 'https://www.facebook.com/profile.php?id=61573985754481', icon: Facebook, label: 'Facebook' },
  { href: 'https://willbuildsai.gumroad.com/', icon: ShoppingBag, label: 'Gumroad' }, // Using ShoppingBag for Gumroad
];

// Footer Links (Includes some from header + others)
export const footerSocialLinks = [
  { href: 'https://www.linkedin.com/in/william-spurlock/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.upwork.com/freelancers/~01e5f4af96d3c88817?mp_source=share', icon: UpworkIcon, label: 'Upwork' },
  { href: 'mailto:creativelywill@gmail.com', icon: Mail, label: 'Email' },
  { href: 'http://instagram.com/will.spurlock_', icon: Instagram, label: 'Instagram (Personal)' },
  { href: 'https://instagram.com/spurlocksolutions.a', icon: Instagram, label: 'Instagram (Business)' },
  { href: 'https://x.com/creativewill02', icon: Twitter, label: 'X' },
  { href: 'https://www.facebook.com/profile.php?id=61573985754481', icon: Facebook, label: 'Facebook' },
  // { href: 'https://github.com/BigRock12123', icon: Github, label: 'GitHub' }, // Removed GitHub
];

// Remove the old socialLinks export if it's not used elsewhere
/*
export const socialLinks = [
  { href: 'https://github.com/creativeWilll', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/william-spurlock/', icon: Linkedin, label: 'LinkedIN' },
  { href: 'mailto:creativelywill@gmail.com', icon: Mail, label: 'Email' },
];
*/

// NOTE: The GitHub and LinkedIn links seem different between Header and Footer in the original code.
// I've used the Footer versions here assuming they are the correct/current ones.
// Please verify these URLs. 