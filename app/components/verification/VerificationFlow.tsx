'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { HolographicButton } from '@/components/ui/HolographicButton';
import { GlitchText } from '@/components/ui/GlitchText';

interface Step {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'complete' | 'error';
}

interface VerificationFlowProps {
  platform: string;
  onComplete: () => void;
}

export function VerificationFlow({ platform, onComplete }: VerificationFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: 'Install Extension',
      description: 'Install the SolanaID browser extension',
      status: 'active',
    },
    {
      id: 2,
      title: 'Login to Platform',
      description: `Login to your ${platform} account`,
      status: 'pending',
    },
    {
      id: 3,
      title: 'Generate Proof',
      description: 'TLSNotary generates zkTLS proof',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Notary Signature',
      description: 'Decentralized notary network signs proof',
      status: 'pending',
    },
    {
      id: 5,
      title: 'Submit to Solana',
      description: 'Register identity on-chain',
      status: 'pending',
    },
  ]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const newSteps = [...steps];
      newSteps[currentStep].status = 'complete';
      newSteps[currentStep + 1].status = 'active';
      setSteps(newSteps);
      setCurrentStep(currentStep + 1);
    } else {
      const newSteps = [...steps];
      newSteps[currentStep].status = 'complete';
      setSteps(newSteps);
      onComplete();
    }
  };

  return (
    <GlassCard className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        <GlitchText text={`Verify ${platform} Identity`} />
      </h2>

      {/* Steps Progress */}
      <div className="space-y-4 mb-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start space-x-4 p-4 rounded-xl transition-all ${
              step.status === 'active'
                ? 'bg-solana-purple/20 border border-solana-purple'
                : step.status === 'complete'
                ? 'bg-green-500/10 border border-green-500/30'
                : 'bg-white/5'
            }`}
          >
            {/* Step Number/Icon */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step.status === 'complete'
                  ? 'bg-green-500 text-white'
                  : step.status === 'active'
                  ? 'bg-solana-purple text-white animate-pulse'
                  : 'bg-white/10 text-white/50'
              }`}
            >
              {step.status === 'complete' ? '✓' : step.id}
            </div>

            {/* Step Content */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-white/60">{step.description}</p>
            </div>

            {/* Status Indicator */}
            {step.status === 'active' && (
              <div className="flex-shrink-0">
                <div className="w-3 h-3 bg-solana-purple rounded-full animate-pulse" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-white/60">
          Step {currentStep + 1} of {steps.length}
        </p>

        <HolographicButton
          onClick={handleNextStep}
          variant="primary"
          size="lg"
        >
          {currentStep === steps.length - 1 ? 'Complete Verification' : 'Next Step'}
        </HolographicButton>
      </div>
    </GlassCard>
  );
}
