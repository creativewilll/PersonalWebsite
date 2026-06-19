import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X } from 'lucide-react';
import { footerSocialLinks } from '../data/links';

export function EngagementPopup() {
  const [isVisible, setIsVisible] = useState(false);
  // 60 seconds delay
  const POPUP_DELAY_MS = 60000; 
  // 1 hour cooldown
  const COOLDOWN_MS = 3600000; 

  useEffect(() => {
    // Check if we should show the popup based on cooldown
    const lastShown = localStorage.getItem('lastEngagementPopupTime');
    const now = new Date().getTime();

    if (lastShown) {
      const timeSinceLastShown = now - parseInt(lastShown, 10);
      if (timeSinceLastShown < COOLDOWN_MS) {
        return; // Still in cooldown period
      }
    }

    // Set timeout to show popup
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem('lastEngagementPopupTime', new Date().getTime().toString());
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timeoutId);
  }, []);

  // Effect to handle page blur matching the site's existing aesthetic behavior
  useEffect(() => {
    const mainContent = document.getElementById('main-content-wrapper');
    if (isVisible && mainContent) {
      mainContent.classList.add('page-blurred');
    } else if (!isVisible && mainContent) {
      mainContent.classList.remove('page-blurred');
    }

    return () => {
      if (mainContent) {
        mainContent.classList.remove('page-blurred');
      }
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    // Update timestamp on close to restart the 1-hour timer from when they closed it
    localStorage.setItem('lastEngagementPopupTime', new Date().getTime().toString());
  };

  if (!isVisible) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 z-[100]"
        style={{ background: 'rgba(0, 0, 0, 0.4)' }}
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.15)] overflow-hidden border border-purple-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Gradient Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400" />
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
            aria-label="Close popup"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>

          <div className="p-8 sm:p-10 text-center">
            <div className="mx-auto w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <span className="text-3xl" role="img" aria-label="sparkles">✨</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
               Is AI Search Ignoring Your Brand?
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
               I design premium, custom-coded websites engineered to rank in ChatGPT, Perplexity, Google AI Overviews, and every AI engine that matters — backed by autonomous agents that scale your operations 24/7.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="https://calendly.com/spurlocksolutionsai/utilizing-ai"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                <Calendar className="w-5 h-5" />
                Book a Strategy Call
              </a>

              <div className="flex justify-center gap-8 my-5">
                {footerSocialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-purple-600 transition-colors duration-300 transform hover:scale-110"
                    aria-label={link.label}
                  >
                    <link.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>

              <button
                onClick={handleClose}
                className="mt-1 w-full py-3.5 text-slate-500 hover:text-slate-800 font-semibold text-lg hover:bg-slate-50 rounded-xl transition-all duration-200"
              >
                Do nothing
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
