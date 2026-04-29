import React from 'react';
import { motion } from 'framer-motion';

interface DeviceMockupProps {
  src: string;
  alt: string;
  type?: 'laptop' | 'phone';
  className?: string;
  onClick?: () => void;
}

export function DeviceMockup({ src, alt, type = 'laptop', className = '', onClick }: DeviceMockupProps) {
  if (type === 'phone') {
    return (
      <div className={`relative inline-block ${className}`} onClick={onClick}>
        {/* Phone bezel */}
        <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-2xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-xl z-10" />
          {/* Screen */}
          <div className="relative rounded-[1.5rem] overflow-hidden bg-gray-800 aspect-[9/19.5]">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    );
  }

  // Laptop mockup
  return (
    <div className={`relative inline-block ${className}`} onClick={onClick}>
      {/* Screen bezel */}
      <div className="relative bg-gray-900 rounded-t-xl p-2 shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 rounded-t-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <div className="flex-1 mx-3">
            <div className="h-4 bg-gray-700 rounded-md max-w-[60%]" />
          </div>
        </div>
        {/* Screen content */}
        <div className="relative overflow-hidden bg-gray-800 aspect-[16/10]">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>
      {/* Laptop base */}
      <div className="relative mx-auto">
        <div className="h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg mx-8" />
        <div className="h-1.5 bg-gray-800 rounded-b-2xl mx-4 shadow-lg" />
      </div>
    </div>
  );
}
