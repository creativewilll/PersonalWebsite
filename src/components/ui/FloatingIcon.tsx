import React from 'react';
import { motion } from 'framer-motion';
import { LucideProps } from 'lucide-react';

interface FloatingIconProps {
  IconComponent: React.ComponentType<LucideProps>;
  className?: string;
  size?: number;
  initialX?: string; // e.g., '10%', '50vw'
  initialY?: string; // e.g., '80%', '20vh'
  durationRange?: [number, number]; // e.g., [15, 25]
  delay?: number;
  floatIntensity?: number; // Controls the range of movement
}

export function FloatingIcon({
  IconComponent,
  className = '',
  size = 48,
  initialX = '50%',
  initialY = '50%',
  durationRange = [15, 25], // Default duration range 15-25 seconds
  delay = 0,
  floatIntensity = 15, // Default float intensity
}: FloatingIconProps) {

  // Random duration within the specified range
  const duration = Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0];

  // Generate random offsets for the floating animation - using percentages for responsiveness
  const xOffset1 = (Math.random() - 0.5) * 2 * (floatIntensity / 10); // Convert pixel intensity to % roughly
  const yOffset1 = (Math.random() - 0.5) * 2 * (floatIntensity / 10);
  const xOffset2 = (Math.random() - 0.5) * 2 * (floatIntensity / 10);
  const yOffset2 = (Math.random() - 0.5) * 2 * (floatIntensity / 10);

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        left: initialX,
        top: initialY,
        width: size,
        height: size,
      }}
      initial={{ 
        opacity: 0, 
        scale: 0.8, // Start slightly smaller
        x: '-50%', // Center the icon based on its own width/height
        y: '-50%'
      }}
      animate={{
        opacity: 0.6, // Fade in and hold opacity
        scale: 1, // Scale up to full size
        x: [
          '-50%', // Start centered
          `calc(-50% + ${xOffset1}vw)`,
          `calc(-50% + ${xOffset2}vw)`,
          '-50%' // Return towards center
        ],
        y: [
          '-50%', // Start centered
          `calc(-50% + ${yOffset1}vh)`,
          `calc(-50% + ${yOffset2}vh)`,
          '-50%' // Return towards center
        ],
      }}
      transition={{
        delay,
        duration: duration, // Use randomized duration
        ease: "linear", // Use linear for a constant drift speed
        repeat: Infinity,
        repeatType: "mirror", // Smooth back and forth
        // Opacity and scale handled by initial/animate, not repeated
      }}
    >
      {/* Slightly more prominent icon color */}
      <IconComponent className="w-full h-full text-purple-400/40" /> 
    </motion.div>
  );
} 