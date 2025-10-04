'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
}

export function GlitchText({ 
  text, 
  className = '',
  glitchIntensity = 'medium',
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const intensityDuration = {
      low: 5000,
      medium: 3000,
      high: 1500,
    };

    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, intensityDuration[glitchIntensity]);

    return () => clearInterval(interval);
  }, [glitchIntensity]);

  return (
    <span
      className={cn(
        'inline-block',
        isGlitching && 'animate-glitch',
        className
      )}
      data-text={text}
    >
      {text}
    </span>
  );
}
