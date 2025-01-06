import React from 'react';

export function OpenAIIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* OpenAI stacked curves */}
      <path
        d="M6 8C6 8 9 5 12 5C15 5 18 8 18 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 11C4 11 8 8 12 8C16 8 20 11 20 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2 14C2 14 7 11 12 11C17 11 22 14 22 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2 17C2 17 7 14 12 14C17 14 22 17 22 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
