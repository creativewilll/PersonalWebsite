import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function AnimatedText({ text, className = '', delay = 0, style, ...rest }: AnimatedTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
      style={style}
      {...rest}
    >
      {text}
    </motion.span>
  );
}
