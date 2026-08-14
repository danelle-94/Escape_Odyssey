import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md',
  className = '',
}) => {
  // Increased by 8 points (+8 Tailwind height units / +32px height)
  const heightClasses = {
    sm: 'h-20 sm:h-22',
    md: 'h-24 sm:h-28 xl:h-32',
    lg: 'h-36 sm:h-44',
  };

  return (
    <div className={`inline-flex items-center group cursor-pointer ${className}`}>
      {/* 100% Original Logo with Pristine Transparent Background & Original Navy/Gold Colors */}
      <img
        src="/logo-exact-original.png"
        alt="Escape Odyssey Travel & Tours Logo"
        className={`${heightClasses[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none`}
      />
    </div>
  );
};
