import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollEffect } from '../hooks/useScrollEffect';
import { Link, useLocation } from 'react-router-dom';
import { headerSocialLinks } from '../data/links';

interface HeaderProps {
  className?: string;
}

const announcements = [
  <span>
    ✨ Offering No-Obligation (FREE) AI Consulting Meetings Daily! Book a Meeting{''}
    <a 
      href="https://calendly.com/spurlocksolutionsai/implementing-intelligence"
      target="_blank" 
      rel="noopener noreferrer"
      className="hover:underline font-semibold ml-1"
    >
      Here (click me)
    </a> ✨
  </span>,
  "🚀 2500+ AI Agents and Automations Built Using ZERO Code 🚀"
];

export function Header({ className = '' }: HeaderProps) {
  const isScrolled = useScrollEffect(50);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Effect to cycle announcements every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) =>
        (prevIndex + 1) % announcements.length
      );
    }, 5000); // Change announcement every 5000ms (5 seconds)

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const menuItems = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'All Projects' },
    { to: '/blog', label: 'Blog' },
    { to: isHome ? '#contact' : '/#contact', label: 'Contact' },
  ];

  const textColorClass = isScrolled ? 'text-white/90 hover:text-white' : 'text-slate-800 hover:text-slate-900';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(to);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 ${className}`}
    >
      {/* Updated Fading/Sliding Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-white text-sm font-medium h-8 sm:h-10 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentAnnouncementIndex}
            initial={{ opacity: 0, y: 10 }} // Start slightly below and faded out
            animate={{ opacity: 1, y: 0 }} // Fade in and slide up
            exit={{ opacity: 0, y: -10 }} // Fade out and slide up
            transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
            className="text-center px-4" // Center text and add padding
          >
            {announcements[currentAnnouncementIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-6">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#" 
            className="text-xl sm:text-2xl font-bold relative group pl-1 sm:pl-0"
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
              <motion.div key={item.to}>
                {item.to.startsWith('#') || item.to.includes('/#') ? (
                  <motion.a
                    href={item.to}
                    onClick={(e) => handleNavClick(e, item.to)}
                    className={`relative ${textColorClass} transition-all duration-500 group`}
                    whileHover={{ y: -2 }}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${
                      isScrolled ? 'via-white/50' : 'via-slate-500/50'
                    } to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                  </motion.a>
                ) : (
                  <Link to={item.to}>
                    <motion.span
                      className={`relative ${textColorClass} transition-all duration-500 group cursor-pointer`}
                      whileHover={{ y: -2 }}
                    >
                      {item.label}
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${
                        isScrolled ? 'via-white/50' : 'via-slate-500/50'
                      } to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                    </motion.span>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {headerSocialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ y: -2 }}
                className={`p-2 rounded-full transition-colors duration-300 ${isScrolled ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
              >
                <link.icon className="w-5 h-5" />
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
                      <motion.div key={item.to}>
                        {item.to.startsWith('#') || item.to.includes('/#') ? (
                          <motion.a
                            href={item.to}
                            onClick={(e) => handleNavClick(e, item.to)}
                            className="text-white/90 hover:text-white transition-all duration-300 py-1.5"
                            whileHover={{ x: 4 }}
                          >
                            {item.label}
                          </motion.a>
                        ) : (
                          <Link to={item.to}>
                            <motion.span
                              className="text-white/90 hover:text-white transition-all duration-300 py-1.5 block"
                              whileHover={{ x: 4 }}
                            >
                              {item.label}
                            </motion.span>
                          </Link>
                        )}
                      </motion.div>
                    ))}
                    <div className="mt-8 flex justify-center space-x-6">
                      {headerSocialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          className="text-gray-300 hover:text-white"
                        >
                          <link.icon className="w-6 h-6" />
                        </a>
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
