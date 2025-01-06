import React, { useState } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollEffect } from '../hooks/useScrollEffect';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const isScrolled = useScrollEffect(50);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://github.com/BigRock12123', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/will_spurlock', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:creativelywill@gmail.com', icon: Mail, label: 'Email' },
  ];

  const textColorClass = isScrolled ? 'text-white/90 hover:text-white' : 'text-slate-800 hover:text-slate-900';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${className} ${
        isScrolled ? 'bg-slate-900/70 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#" 
            className="text-xl sm:text-2xl font-bold relative group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-300 to-orange-300 
                         group-hover:from-rose-200 group-hover:to-orange-200 transition-all duration-300">
              WS
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative ${textColorClass} transition-all duration-500 group`}
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${
                  isScrolled ? 'via-white/50' : 'via-slate-500/50'
                } to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${textColorClass} transition-all duration-500`}
                aria-label={label}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`p-1 -mr-1 md:hidden ${textColorClass} transition-all duration-500`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-3"
            >
              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-900/90 backdrop-blur-xl" />
                <div className="relative p-3 sm:p-4">
                  <div className="flex flex-col space-y-3">
                    {menuItems.map((item) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="text-white/90 hover:text-white transition-all duration-300 py-1.5"
                        whileHover={{ x: 4 }}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                    <div className="flex space-x-5 pt-3 mt-2 border-t border-white/10">
                      {socialLinks.map(({ href, icon: Icon, label }) => (
                        <motion.a
                          key={href}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/90 hover:text-white transition-all duration-300 p-1"
                          aria-label={label}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="w-6 h-6" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
