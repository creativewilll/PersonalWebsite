import React from 'react';

export function LayeredTerminalIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top window */}
      <rect 
        x="4" y="4" width="16" height="4" 
        stroke="currentColor" 
        strokeWidth="2"
        fill="none"
      />
      <path 
        d="M6 6L14 6" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Middle window */}
      <rect 
        x="6" y="10" width="16" height="4" 
        stroke="currentColor" 
        strokeWidth="2"
        fill="none"
      />
      <path 
        d="M8 12L16 12" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Bottom window */}
      <rect 
        x="8" y="16" width="16" height="4" 
        stroke="currentColor" 
        strokeWidth="2"
        fill="none"
      />
      <path 
        d="M10 18L18 18" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
