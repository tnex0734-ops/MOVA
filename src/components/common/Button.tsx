import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'rose' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-pill transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variantStyles = {
      primary: "bg-mova-ocean text-white hover:bg-mova-ocean-hover active:bg-mova-ocean-active shadow-sm",
      secondary: "bg-mova-ice-soft text-mova-ocean border border-mova-ice-border hover:bg-mova-ice/60 active:bg-mova-ice",
      gold: "bg-mova-orange text-mova-ocean hover:bg-mova-orange-hover font-semibold",
      rose: "bg-mova-ice text-mova-ocean hover:bg-mova-ice-border font-semibold",
      ghost: "bg-transparent text-mova-ocean hover:bg-mova-ice-soft active:bg-mova-ice/40",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5 min-h-[36px]",
      md: "text-sm px-5 py-2.5 gap-2 min-h-[44px]",
      lg: "text-base px-7 py-3.5 gap-2.5 font-semibold min-h-[48px]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
