'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { HolographicButton } from '@/components/ui/HolographicButton';

interface ProofDisplayProps {
  proof: Uint8Array;
  signature: string;
  platform: string;
}

export function ProofDisplay({ proof, signature, platform }: ProofDisplayProps) {
  const [showFullProof, setShowFullProof] = useState(false);

  const proofHash = Array.from(proof.slice(0, 32))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <GlassCard neon="purple">
      <h3 className="text-2xl font-bold mb-6">zkTLS Proof Generated ✓</h3>

      <div className="space-y-6">
        {/* Platform */}
        <div>
          <label className="block text-sm text-white/60 mb-2">Platform</label>
          <div className="px-4 py-3 bg-white/5 rounded-lg font-mono text-sm">
            {platform}
          </div>
        </div>

        {/* Proof Hash */}
        <div>
          <label className="block text-sm text-white/60 mb-2">Proof Hash</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 bg-white/5 rounded-lg font-mono text-sm overflow-x-auto">
              {proofHash}
            </div>
            <HolographicButton
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(proofHash)}
            >
              Copy
            </HolographicButton>
          </div>
        </div>

        {/* Signature */}
        <div>
          <label className="block text-sm text-white/60 mb-2">Notary Signature</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 bg-white/5 rounded-lg font-mono text-sm overflow-x-auto">
              {signature.slice(0, 32)}...{signature.slice(-32)}
            </div>
            <HolographicButton
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(signature)}
            >
              Copy
            </HolographicButton>
          </div>
        </div>

        {/* Full Proof (Expandable) */}
        <div>
          <button
            onClick={() => setShowFullProof(!showFullProof)}
            className="text-sm text-solana-purple hover:text-solana-blue transition-colors"
          >
            {showFullProof ? 'Hide' : 'Show'} Full Proof Data
          </button>

          {showFullProof && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 px-4 py-3 bg-white/5 rounded-lg font-mono text-xs overflow-x-auto max-h-64 overflow-y-auto"
            >
              {Array.from(proof)
                .map(b => b.toString(16).padStart(2, '0'))
                .join(' ')}
            </motion.div>
          )}
        </div>

        {/* Verification Status */}
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-400 font-semibold">
              Proof verified by decentralized notary network
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
