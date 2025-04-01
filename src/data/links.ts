import { Github, Linkedin, Mail } from 'lucide-react';
import { UpworkIcon } from '../components/ui/UpworkIcon'; // Adjust path if needed

export const socialLinks = [
  { href: 'https://github.com/creativeWilll', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/william-spurlock/', icon: Linkedin, label: 'LinkedIN' },
  { href: 'mailto:creativelywill@gmail.com', icon: Mail, label: 'Email' },
];

export const footerSocialLinks = [
  ...socialLinks.filter(link => link.label !== 'Email'), // Exclude email icon if mailto link is separate
  { href: 'https://github.com/BigRock12123', icon: Github, label: 'GitHub' }, // Correct GitHub link for footer
  { href: 'https://linkedin.com/in/will_spurlock', icon: Linkedin, label: 'LinkedIN' }, // Correct LinkedIn link for footer
  { href: 'https://www.upwork.com/freelancers/~01e5f4af96d3c88817?mp_source=share', icon: UpworkIcon, label: 'Upwork' },
  { href: 'mailto:creativelywill@gmail.com', icon: Mail, label: 'Email' }, // Keep Mail icon here
];


// NOTE: The GitHub and LinkedIn links seem different between Header and Footer in the original code.
// I've used the Footer versions here assuming they are the correct/current ones.
// Please verify these URLs. 