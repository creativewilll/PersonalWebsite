import {
  Linkedin,
  Mail,
  Twitter, // Represents X
  ShoppingBag, // Placeholder for Gumroad
} from 'lucide-react';
import { UpworkIcon } from '../components/ui/UpworkIcon';

// Header Links
export const headerSocialLinks = [
  { href: 'https://www.linkedin.com/in/william-spurlock/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://x.com/creativewill02', icon: Twitter, label: 'X' },
  { href: 'https://willbuildsai.gumroad.com/', icon: ShoppingBag, label: 'Gumroad' },
];

// Footer Links (Includes some from header + others)
export const footerSocialLinks = [
  { href: 'https://www.linkedin.com/in/william-spurlock/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.upwork.com/freelancers/~01e5f4af96d3c88817?mp_source=share', icon: UpworkIcon, label: 'Upwork' },
  { href: 'mailto:creativelywill@gmail.com', icon: Mail, label: 'Email' },
  { href: 'https://x.com/creativewill02', icon: Twitter, label: 'X' },
];
