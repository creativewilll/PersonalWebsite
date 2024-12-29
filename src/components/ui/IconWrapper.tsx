import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  Icon: LucideIcon;
  className?: string;
}

export function IconWrapper({ Icon, className = '' }: IconWrapperProps) {
  return (
    <div className={`w-16 h-16 mb-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform ${className}`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
  );
}