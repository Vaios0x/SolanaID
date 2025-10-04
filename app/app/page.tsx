'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { HolographicButton } from '@/components/ui/HolographicButton';
import { GlitchText } from '@/components/ui/GlitchText';
import { PLATFORMS, PLATFORM_ICONS } from '@/lib/solana/constants';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [stats, setStats] = useState({
    totalVerifications: 0,
    activeUsers: 0,
    platforms: PLATFORMS.length,
  });

  useEffect(() => {
    // Animate stats on mount
    const animateStats = () => {
      setTimeout(() => setStats({
        totalVerifications: 1247,
        activeUsers: 342,
        platforms: PLATFORMS.length,
      }), 100);
    };
    animateStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 max-w-5xl mx-auto"
      >
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-solana-purple/20 border border-solana-purple/50 rounded-full text-sm font-semibold mb-8">
            Powered by TLSNotary + Solana
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="gradient-text">Prove Your Identity</span>
          <br />
          <GlitchText text="Without Revealing It" glitchIntensity="low" />
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
          First zkTLS identity verification on Solana. Verify your LinkedIn, GitHub, Twitter, 
          and Google accounts <span className="text-solana-green font-bold">without exposing personal data</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/verify">
            <HolographicButton variant="holographic" size="lg">
              Start Verification
            </HolographicButton>
          </Link>
          
          <Link href="/docs">
            <HolographicButton variant="secondary" size="lg">
              View Documentation
            </HolographicButton>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Privacy-First</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Decentralized</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Open Source</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Zero-Knowledge Proofs</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto"
      >
        <GlassCard neon="purple" className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <div className="text-5xl font-bold gradient-text mb-2">
              {stats.totalVerifications.toLocaleString()}+
            </div>
            <div className="text-white/60">Total Verifications</div>
          </motion.div>
        </GlassCard>
        
        <GlassCard neon="blue" className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            <div className="text-5xl font-bold gradient-text mb-2">
              {stats.activeUsers.toLocaleString()}+
            </div>
            <div className="text-white/60">Active Users</div>
          </motion.div>
        </GlassCard>
        
        <GlassCard neon="pink" className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: 'spring' }}
          >
            <div className="text-5xl font-bold gradient-text mb-2">
              {stats.platforms}
            </div>
            <div className="text-white/60">Supported Platforms</div>
          </motion.div>
        </GlassCard>
      </motion.div>

      {/* Features Grid */}
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="gradient-text">Why SolanaID?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard hover neon="purple">
              <div className="text-5xl mb-6">🔒</div>
              <h3 className="text-2xl font-bold mb-4">Privacy First</h3>
              <p className="text-white/70 leading-relaxed">
                Zero-knowledge proofs ensure your personal data never touches the blockchain. 
                Only cryptographic hashes are stored on-chain.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard hover neon="blue">
              <div className="text-5xl mb-6">⚡</div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-white/70 leading-relaxed">
                Powered by Solana's 400ms block time. Verify your identity and mint your 
                NFT in seconds, not minutes.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard hover neon="pink">
              <div className="text-5xl mb-6">🌐</div>
              <h3 className="text-2xl font-bold mb-4">Fully Decentralized</h3>
              <p className="text-white/70 leading-relaxed">
                TLSNotary notary network ensures no single point of failure. 
                Ethereum Foundation's battle-tested technology.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Supported Platforms */}
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="gradient-text">Supported Platforms</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {PLATFORMS.map((platform, index) => (
            <motion.div
              key={platform}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <GlassCard hover className="text-center">
                <div className="text-6xl mb-4 transform transition-transform hover:scale-110">
                  {PLATFORM_ICONS[platform]}
                </div>
                <h3 className="text-xl font-bold">{platform}</h3>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="gradient-text">How It Works</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {[
            {
              step: 1,
              title: 'Install Extension',
              description: 'Install the SolanaID browser extension (Chrome, Firefox, Brave)',
            },
            {
              step: 2,
              title: 'Select Platform',
              description: 'Choose which identity you want to verify (LinkedIn, GitHub, Twitter, Google)',
            },
            {
              step: 3,
              title: 'Generate zkProof',
              description: 'TLSNotary captures your TLS session and generates a zero-knowledge proof',
            },
            {
              step: 4,
              title: 'Notary Signature',
              description: 'Decentralized notary network verifies and signs your proof',
            },
            {
              step: 5,
              title: 'Mint NFT',
              description: 'Identity is registered on Solana and an NFT is minted to your wallet',
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <GlassCard className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-solana-purple to-cyber-blue flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <GlassCard neon="purple" className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            <GlitchText text="Ready to Get Verified?" />
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join hundreds of users who have already verified their identities on Solana
          </p>
          <Link href="/verify">
            <HolographicButton variant="holographic" size="lg">
              Start Verification Now
            </HolographicButton>
          </Link>
        </GlassCard>
      </motion.div>
    </div>
  );
}
