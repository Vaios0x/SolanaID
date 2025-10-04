'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HolographicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'holographic';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HolographicButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className,
}: HolographicButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    secondary: 'glass hover:bg-white/20 border-2 border-white/30',
    holographic: 'holographic text-black font-bold',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden btn-glow',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'shadow-lg hover:shadow-2xl',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {/* Shimmer Effect */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 shimmer"
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
