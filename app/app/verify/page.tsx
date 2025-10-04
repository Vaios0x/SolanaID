'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppKitAccount } from '@reown/appkit/react';
import dynamicImport from 'next/dynamic';

// Dynamic imports to avoid SSR issues
const PlatformSelector = dynamicImport(() => import('@/components/verification/PlatformSelector').then(mod => ({ default: mod.PlatformSelector })), { ssr: false });
const VerificationFlow = dynamicImport(() => import('@/components/verification/VerificationFlow').then(mod => ({ default: mod.VerificationFlow })), { ssr: false });
const ProofDisplay = dynamicImport(() => import('@/components/verification/ProofDisplay').then(mod => ({ default: mod.ProofDisplay })), { ssr: false });
const NFTMinter = dynamicImport(() => import('@/components/verification/NFTMinter').then(mod => ({ default: mod.NFTMinter })), { ssr: false });
const GlassCard = dynamicImport(() => import('@/components/ui/GlassCard').then(mod => ({ default: mod.GlassCard })), { ssr: false });
const HolographicButton = dynamicImport(() => import('@/components/ui/HolographicButton').then(mod => ({ default: mod.HolographicButton })), { ssr: false });
const GlitchText = dynamicImport(() => import('@/components/ui/GlitchText').then(mod => ({ default: mod.GlitchText })), { ssr: false });
const ConnectButton = dynamicImport(() => import('@/components/wallet/ConnectButton').then(mod => ({ default: mod.ConnectButton })), { ssr: false });

type VerificationStep = 'select' | 'verify' | 'proof' | 'mint' | 'complete';

// Disable static generation for this page
export const dynamic = 'force-dynamic';

export default function VerifyPage() {
  const { isConnected } = useAppKitAccount();
  const [currentStep, setCurrentStep] = useState<VerificationStep>('select');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [proof, setProof] = useState<Uint8Array | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
    setCurrentStep('verify');
  };

  const handleVerificationComplete = () => {
    // Simulate proof generation
    const mockProof = new Uint8Array(32).fill(1);
    const mockSignature = '0x' + 'a'.repeat(128);
    
    setProof(mockProof);
    setSignature(mockSignature);
    setCurrentStep('proof');
  };

  const handleProofConfirm = () => {
    setCurrentStep('mint');
  };

  const handleMintComplete = () => {
    setCurrentStep('complete');
  };

  const resetFlow = () => {
    setCurrentStep('select');
    setSelectedPlatform(null);
    setProof(null);
    setSignature(null);
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-24">
        <GlassCard className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold mb-4">
            <GlitchText text="Connect Your Wallet" />
          </h2>
          <p className="text-white/70 mb-8">
            Please connect your Solana wallet to start the verification process
          </p>
          <ConnectButton />
        </GlassCard>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading...</div>}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Identity Verification</span>
          </h1>
          <p className="text-xl text-white/70">
            Prove your identity without revealing personal data
          </p>
        </motion.div>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex justify-between items-center">
          {['Select', 'Verify', 'Proof', 'Mint'].map((step, index) => {
            const stepKeys: VerificationStep[] = ['select', 'verify', 'proof', 'mint'];
            const currentIndex = stepKeys.indexOf(currentStep);
            const isActive = index === currentIndex;
            const isComplete = index < currentIndex;

            return (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      isComplete
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-solana-purple text-white animate-pulse'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {isComplete ? '✓' : index + 1}
                  </div>
                  <span className="text-sm mt-2 text-white/70">{step}</span>
                </div>
                
                {index < 3 && (
                  <div
                    className={`h-0.5 flex-1 transition-all duration-300 ${
                      isComplete ? 'bg-green-500' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {currentStep === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Select Platform</h2>
              <p className="text-white/70">Choose which identity you want to verify</p>
            </div>
            <PlatformSelector
              selectedPlatform={selectedPlatform}
              onSelectPlatform={handlePlatformSelect}
            />
          </motion.div>
        )}

        {currentStep === 'verify' && selectedPlatform && (
          <motion.div
            key="verify"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <VerificationFlow
              platform={selectedPlatform}
              onComplete={handleVerificationComplete}
            />
          </motion.div>
        )}

        {currentStep === 'proof' && proof && signature && selectedPlatform && (
          <motion.div
            key="proof"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ProofDisplay
              proof={proof}
              signature={signature}
              platform={selectedPlatform}
            />
            <div className="flex justify-center mt-8">
              <HolographicButton
                variant="primary"
                size="lg"
                onClick={handleProofConfirm}
              >
                Continue to Minting
              </HolographicButton>
            </div>
          </motion.div>
        )}

        {currentStep === 'mint' && proof && signature && selectedPlatform && (
          <motion.div
            key="mint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <NFTMinter
              platform={selectedPlatform}
              proofHash={Array.from(proof.slice(0, 32))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('')}
              usernameHash={Array.from(proof.slice(0, 32))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('')}
            />
          </motion.div>
        )}

        {currentStep === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <GlassCard neon="purple" className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.8 }}
              >
                <div className="text-8xl mb-6">🎉</div>
                <h2 className="text-4xl font-bold mb-4 gradient-text">
                  Verification Complete!
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Your identity has been successfully verified and registered on Solana
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <HolographicButton
                    variant="primary"
                    size="lg"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    View Dashboard
                  </HolographicButton>
                  
                  <HolographicButton
                    variant="secondary"
                    size="lg"
                    onClick={resetFlow}
                  >
                    Verify Another Platform
                  </HolographicButton>
                </div>
              </motion.div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </Suspense>
  );
}
