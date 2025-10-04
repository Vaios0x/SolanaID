'use client';

import { useAppKit } from '@reown/appkit/react';
import { useAppKitAccount } from '@reown/appkit/react';
import { HolographicButton } from '@/components/ui/HolographicButton';
import { formatAddress } from '@/lib/utils';

export function ConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  if (isConnected && address) {
    return (
      <HolographicButton 
        onClick={() => open()} 
        variant="secondary"
        className="font-mono"
      >
        {formatAddress(address, 4)}
      </HolographicButton>
    );
  }

  return (
    <HolographicButton onClick={() => open()} variant="holographic">
      Connect Wallet
    </HolographicButton>
  );
}
