import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UpworkIcon } from './ui/UpworkIcon';
import { footerSocialLinks } from '../data/links';
import { BlogManager } from '../data/blogData/BlogManager';

const blogManager = new BlogManager();

export function Footer() {
  // Get top categories for the footer
  const topCategories = blogManager.getAllCategories().slice(0, 5);

  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold">WS</h3>
            <p className="text-sm sm:text-base text-gray-400 max-w-xs">
              Streamlining business processes with advanced AI agents and automations.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <a href="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Blog Categories</h4>
            <ul className="space-y-2">
              {topCategories.map(category => (
                <li key={category.name}>
                  <Link 
                    to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 md:justify-self-end">
            <h4 className="text-base sm:text-lg font-semibold">Connect</h4>
            <div className="flex gap-3 sm:gap-4">
              {footerSocialLinks.map(({ href, icon: Icon, label }) => (
                <a 
                  key={href}
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={label}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-white/10 text-center text-sm sm:text-base text-gray-400">
          <p>© {new Date().getFullYear()} Will Spurlock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
