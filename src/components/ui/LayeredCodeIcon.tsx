import React from 'react';

export function LayeredCodeIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top layer */}
      <path 
        d="M8 6L4 10L8 14M16 6L20 10L16 14" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Middle layer */}
      <path 
        d="M8 9L4 13L8 17M16 9L20 13L16 17" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Bottom layer */}
      <path 
        d="M8 12L4 16L8 20M16 12L20 16L16 20" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
