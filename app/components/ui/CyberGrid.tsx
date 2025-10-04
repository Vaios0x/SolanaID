'use client';

import { motion } from 'framer-motion';

export function CyberGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Animated Grid Lines */}
      <div className="cyber-grid w-full h-full opacity-30" />
      
      {/* Scanning Line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent"
        animate={{
          top: ['-5%', '105%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-cyber-blue opacity-50" />
      <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-cyber-pink opacity-50" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-cyber-blue opacity-50" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-cyber-pink opacity-50" />

      {/* Radial Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-solana-purple/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
    </div>
  );
}
