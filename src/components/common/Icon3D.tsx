import React, { useState } from 'react';
import { ICONS_3D, Icon3DKey } from '../../lib/icons3d';
import { cn } from '../../lib/utils';

interface Icon3DProps {
  name: Icon3DKey;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  alt?: string;
  fallbackText?: string;
}

export const Icon3D: React.FC<Icon3DProps> = ({
  name,
  size = 'md',
  className,
  alt,
  fallbackText,
}) => {
  const [hasError, setHasError] = useState(false);
  const src = ICONS_3D[name];

  const sizeClasses = {
    xs: 'w-4 h-4 min-w-[16px]',
    sm: 'w-6 h-6 min-w-[24px]',
    md: 'w-8 h-8 min-w-[32px]',
    lg: 'w-10 h-10 min-w-[40px]',
    xl: 'w-14 h-14 min-w-[56px]',
    '2xl': 'w-20 h-20 min-w-[80px]',
  };

  if (hasError || !src) {
    return <span className={cn("inline-block select-none", className)}>{fallbackText || '●'}</span>;
  }

  return (
    <img
      src={src}
      alt={alt || `${name} 3D icon`}
      loading="lazy"
      onError={() => setHasError(true)}
      className={cn(
        sizeClasses[size],
        "object-contain select-none filter drop-shadow-sm transition-transform duration-200 group-hover:scale-110 will-change-transform pointer-events-none",
        className
      )}
    />
  );
};
