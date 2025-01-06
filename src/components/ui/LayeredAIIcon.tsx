import React from 'react';

export function LayeredAIIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer hexagon */}
      <path
        d="M12 2L21 7V17L12 22L3 17V7L12 2Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      
      {/* Middle hexagon */}
      <path
        d="M12 4L18.5 8V16L12 20L5.5 16V8L12 4Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      
      {/* Inner hexagon */}
      <path
        d="M12 6L16 9V15L12 18L8 15V9L12 6Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      
      {/* Vertical lines */}
      <path
        d="M12 2V22M8 5V19M16 5V19"
        stroke="currentColor"
        strokeWidth="1"
      />
      
      {/* Diagonal lines left */}
      <path
        d="M3 7L12 12M5.5 16L12 19M5.5 8L12 5"
        stroke="currentColor"
        strokeWidth="1"
      />
      
      {/* Diagonal lines right */}
      <path
        d="M21 7L12 12M18.5 16L12 19M18.5 8L12 5"
        stroke="currentColor"
        strokeWidth="1"
      />
      
      {/* Cross lines */}
      <path
        d="M8 9L16 15M8 15L16 9"
        stroke="currentColor"
        strokeWidth="1"
      />
      
      {/* Additional detail lines */}
      <path
        d="M10 8L14 8M10 16L14 16"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
