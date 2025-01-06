import React from 'react';

export function ClaudeIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Center core */}
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1" fill="none" />
      
      {/* Primary rays */}
      <path
        d="M12 3V7M12 17V21M21 12H17M7 12H3M18.4 5.6L15.7 8.3M8.3 15.7L5.6 18.4M18.4 18.4L15.7 15.7M8.3 8.3L5.6 5.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Secondary rays */}
      <path
        d="M15.5 4.5L14 7.5M9 16.5L7.5 19.5M19.5 15.5L16.5 14M7.5 9L4.5 7.5M19.5 8.5L16.5 10M7.5 15L4.5 16.5M15.5 19.5L14 16.5M9 7.5L7.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Tertiary rays */}
      <path
        d="M14 4L13 6.5M10 17.5L9 20M20 14L17.5 13M6.5 10L4 9M20 10L17.5 11M6.5 14L4 15M14 20L13 17.5M10 6.5L9 4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
    </svg>
  );
}
