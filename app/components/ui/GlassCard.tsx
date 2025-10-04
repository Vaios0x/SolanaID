'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  neon?: 'blue' | 'pink' | 'purple' | 'none';
}

export function GlassCard({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  neon = 'none',
  ...props
}: GlassCardProps) {
  const neonClasses = {
    blue: 'shadow-neon hover:shadow-neon',
    pink: 'shadow-neon-pink hover:shadow-neon-pink',
    purple: 'shadow-neon-purple hover:shadow-neon-purple',
    none: '',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'glass-card p-6 rounded-2xl relative overflow-hidden',
        hover && 'glass-hover cursor-pointer transform transition-transform hover:scale-105',
        glow && 'animate-glow',
        neonClasses[neon],
        className
      )}
      {...props}
    >
      {/* Noise Overlay */}
      <div className="noise-overlay absolute inset-0" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
