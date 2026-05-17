import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "../components/ui";
import { useTheme } from "../hooks/useTheme";
import { useMusicActions } from "../lib/musicActions";

const navLinks = [
  { name: "How It Works", href: "#how-it-works" },
  { name: "What's Included", href: "#whats-included" },
  { name: "Results", href: "#results" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { openCalendly } = useMusicActions();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 sm:px-8 lg:px-16 flex items-center justify-between ${
        isScrolled
          ? "h-[56px] sm:h-[64px] bg-[var(--color-surface)]/80 backdrop-blur-md border-b border-[var(--color-border)] shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "h-[80px] bg-transparent"
      }`}
    >
      <div className="flex items-center gap-2">
        {/* SVG Logo Mark */}
        <div className="w-8 h-8 relative flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--color-text)] w-full h-full">
            <path d="M3 12h3l3 -9 6 18 3 -9h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="font-display font-bold text-lg hidden sm:block tracking-wide text-[var(--color-text)]">WS<span className="text-[var(--color-primary)]">.</span></span>
      </div>

      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-[var(--color-surface-dynamic)] text-[var(--color-text-faint)] hover:text-[var(--color-text)] transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <Button onClick={openCalendly} className="px-6 py-2.5 text-sm h-auto">Book a Free Call</Button>
      </div>

      <div className="lg:hidden flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-[var(--color-surface-dynamic)] text-[var(--color-text-faint)] hover:text-[var(--color-text)] transition-colors"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          className="p-2 text-[var(--color-text)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-[var(--color-surface)] border-b border-[var(--color-border)] p-6 lg:hidden flex flex-col gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                {link.name}
              </motion.a>
            ))}
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                openCalendly();
              }}
              className="w-full mt-4"
            >
              Book a Free Call
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
