import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ 
  id, 
  title, 
  subtitle, 
  children, 
  className = ''
}: SectionProps) {
  const isDarkBg = className.includes('from-blue-600') || className.includes('bg-gray-900');
  
  return (
    <section id={id} className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 relative z-10">
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${isDarkBg ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <p className={`text-base max-w-2xl mx-auto ${isDarkBg ? 'text-gray-200' : 'text-gray-600'}`}>
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
