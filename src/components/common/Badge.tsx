import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  variant?: 'default' | 'maroon' | 'gold' | 'rose' | 'ivory';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className }) => {
  const variantStyles = {
    default: "bg-mova-ocean/5 text-mova-ocean border border-mova-ocean/10",
    maroon: "bg-mova-ocean-light text-mova-ocean border border-mova-ocean/20 font-semibold",
    gold: "bg-mova-orange-light text-mova-ocean border border-mova-orange/40 font-semibold",
    rose: "bg-mova-ice-soft text-mova-ocean border border-mova-ice/30",
    ivory: "bg-mova-ice-soft text-mova-ocean border border-mova-ice-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-medium select-none tracking-tight",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
