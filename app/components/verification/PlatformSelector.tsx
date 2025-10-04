'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { PLATFORMS, PLATFORM_COLORS, PLATFORM_ICONS } from '@/lib/solana/constants';

interface PlatformSelectorProps {
  selectedPlatform: string | null;
  onSelectPlatform: (platform: string) => void;
}

export function PlatformSelector({ 
  selectedPlatform, 
  onSelectPlatform 
}: PlatformSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PLATFORMS.map((platform, index) => {
        const isSelected = selectedPlatform === platform;
        
        return (
          <motion.div
            key={platform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard
              hover
              neon={isSelected ? 'purple' : 'none'}
              className={`cursor-pointer transition-all duration-300 ${
                isSelected ? 'ring-4 ring-solana-purple' : ''
              }`}
              onClick={() => onSelectPlatform(platform)}
            >
              <div className="text-center">
                <div className="text-6xl mb-4 transform transition-transform hover:scale-110">
                  {PLATFORM_ICONS[platform]}
                </div>
                <h3 className="text-xl font-bold mb-2">{platform}</h3>
                <div
                  className="h-1 w-full rounded-full"
                  style={{ backgroundColor: PLATFORM_COLORS[platform] }}
                />
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
