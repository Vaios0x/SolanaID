'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { HolographicButton } from '@/components/ui/HolographicButton';
import { useProgram } from '@/lib/hooks/useProgram';

interface NFTMinterProps {
  platform: string;
  proofHash: string;
  usernameHash: string;
}

export function NFTMinter({ platform, proofHash, usernameHash }: NFTMinterProps) {
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [nftAddress, setNftAddress] = useState<string | null>(null);
  const { program, wallet } = useProgram();

  const handleMint = async () => {
    if (!program || !wallet) {
      alert('Please connect your wallet');
      return;
    }

    setIsMinting(true);

    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // In production, call actual register_identity instruction
      const mockNftAddress = 'NFT' + Math.random().toString(36).substring(7);
      setNftAddress(mockNftAddress);
      setMintSuccess(true);
    } catch (error) {
      console.error('Minting failed:', error);
      alert('Minting failed. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  if (mintSuccess && nftAddress) {
    return (
      <GlassCard neon="purple" className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-3xl font-bold mb-4 gradient-text">
            Identity NFT Minted!
          </h3>
          <p className="text-white/70 mb-6">
            Your {platform} identity has been verified and minted as an NFT on Solana
          </p>

          <div className="p-4 bg-white/5 rounded-lg mb-6">
            <p className="text-sm text-white/60 mb-2">NFT Address</p>
            <p className="font-mono text-sm">{nftAddress}</p>
          </div>

          <HolographicButton
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/dashboard'}
          >
            View in Dashboard
          </HolographicButton>
        </motion.div>
      </GlassCard>
    );
  }

  return (
    <GlassCard neon="purple">
      <h3 className="text-2xl font-bold mb-6">Mint Identity NFT</h3>

      <div className="space-y-6 mb-8">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <span className="text-white/70">Platform</span>
          <span className="font-semibold">{platform}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <span className="text-white/70">Proof Hash</span>
          <span className="font-mono text-sm">{proofHash.slice(0, 8)}...</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <span className="text-white/70">Username Hash</span>
          <span className="font-mono text-sm">{usernameHash.slice(0, 8)}...</span>
        </div>
      </div>

      <div className="p-4 bg-solana-purple/10 border border-solana-purple/30 rounded-lg mb-6">
        <p className="text-sm text-white/80">
          <strong>Privacy Notice:</strong> Only proof hashes are stored on-chain. 
          Your personal information remains private and never touches the blockchain.
        </p>
      </div>

      <HolographicButton
        variant="holographic"
        size="lg"
        onClick={handleMint}
        disabled={isMinting}
        className="w-full"
      >
        {isMinting ? (
          <span className="flex items-center justify-center gap-2">
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Minting...
          </span>
        ) : (
          'Mint Identity NFT'
        )}
      </HolographicButton>
    </GlassCard>
  );
}
