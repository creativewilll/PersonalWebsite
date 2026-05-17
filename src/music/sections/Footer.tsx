import React from "react";
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[var(--color-bg)] pt-16 pb-8 border-t border-[var(--color-border)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50 shadow-[0_0_10px_rgba(255,42,95,0.8)]" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-8 mb-16 border-b border-[var(--color-border)] pb-16">
          
          <div className="md:col-span-5 flex flex-col items-start gap-4">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 relative flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--color-text)] w-full h-full">
                    <path d="M3 12h3l3 -9 6 18 3 -9h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-display font-medium text-xl tracking-wide text-[var(--color-text)]">Will Spurlock<span className="text-[var(--color-primary)]">.</span> Music</span>
             </div>
             <p className="text-[var(--color-text-muted)] text-sm leading-relaxed max-w-[300px]">
               Full-stack digital presence for independent music artists.<br/>
               Based in Troy, Michigan.
             </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-[var(--color-primary)] text-sm font-bold uppercase tracking-wider mb-2">Navigation</h4>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--color-text-muted)]">
              <a href="#services" className="hover:text-[var(--color-primary)] transition-colors">Services</a>
              <a href="#how-it-works" className="hover:text-[var(--color-primary)] transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-[var(--color-primary)] transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-[var(--color-primary)] transition-colors">FAQ</a>
              <a href="#book" className="hover:text-[var(--color-primary)] transition-colors text-[var(--color-text)] font-medium">Book a Call</a>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-[var(--color-primary)] text-sm font-bold uppercase tracking-wider mb-2">Contact</h4>
            <a href="mailto:hello@williamspurlock.com" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
              hello@williamspurlock.com
            </a>
            <p className="text-[var(--color-text-muted)] text-sm">Troy, MI</p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors drop-shadow-sm"><Instagram size={20} /></a>
              <a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors drop-shadow-sm"><Twitter size={20} /></a>
              <a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors drop-shadow-sm"><Linkedin size={20} /></a>
              <a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors drop-shadow-sm"><Youtube size={20} /></a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--color-text-muted)]/60">
          <p>© {new Date().getFullYear()} Will Spurlock. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--color-text)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-text)] transition-colors">Terms of Service</a>
          </div>
        </div>

        {/* Easter egg */}
        <div className="absolute bottom-6 right-6 group">
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]/30 group-hover:bg-[var(--color-primary)] transition-colors cursor-help group-hover:animate-ping" />
          <div className="absolute bottom-full right-full mr-2 mb-2 bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1.5 rounded text-[10px] text-[var(--color-text)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Built by Will Spurlock
          </div>
        </div>
      </div>
    </footer>
  );
};
