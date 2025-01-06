import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`bg-black/30 backdrop-blur-lg rounded-2xl p-8 hover:transform hover:scale-105 transition-all border border-white/20 shadow-lg hover:shadow-xl hover:bg-black/40 ${className}`}
    >
      {children}
    </motion.div>
  );
}
