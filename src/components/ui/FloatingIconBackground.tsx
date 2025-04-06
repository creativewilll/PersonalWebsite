import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Code, Globe, Server, Rocket, Brain, Zap, Bus, Mail, CheckCircle } from 'lucide-react';
import { FloatingIcon } from './FloatingIcon';

// Define the icons to be used
const icons = [
  { Component: Code, size: 60 },
  { Component: Globe, size: 50 },
  { Component: Server, size: 70 },
  { Component: Rocket, size: 40 },
  { Component: Brain, size: 65 },
  { Component: Zap, size: 55 },
  { Component: Bus, size: 45 },
  { Component: Mail, size: 50 },
  { Component: CheckCircle, size: 60 },
];

// Memoize the component to prevent re-renders when the parent (ContactFormPopup) updates state
const FloatingIconBackgroundComponent: React.FC = () => {
  // Use createPortal to render this outside the normal DOM hierarchy
  return createPortal(
    <motion.div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {icons.map((icon, index) => (
        <FloatingIcon
          key={index}
          IconComponent={icon.Component}
          size={icon.size * (typeof window !== 'undefined' && window.innerWidth < 768 ? 0.7 : 1)}
          // Random positions and animation parameters
          initialX={`${Math.random() * 80 + 10}%`}
          initialY={`${Math.random() * 80 + 10}%`}
          durationRange={[20, 30]}
          delay={Math.random() * 8}
          floatIntensity={Math.random() * 10 + 10}
        />
      ))}
    </motion.div>,
    document.body
  );
};

export const FloatingIconBackground = React.memo(FloatingIconBackgroundComponent); 