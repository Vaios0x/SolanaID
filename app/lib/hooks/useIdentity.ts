'use client';

import { useQuery } from '@tanstack/react-query';
import { useProgram } from './useProgram';
import { PublicKey } from '@solana/web3.js';

export interface Identity {
  owner: PublicKey;
  platform: string;
  proofHash: Uint8Array;
  usernameHash: Uint8Array;
  metadata: string;
  verifiedAt: number;
  expiresAt: number;
  revoked: boolean;
  verificationCount: number;
}

export function useIdentity(owner: string | null, platform: string | null) {
  const { program } = useProgram();

  return useQuery({
    queryKey: ['identity', owner, platform],
    queryFn: async () => {
      if (!program || !owner || !platform) {
        throw new Error('Program not initialized or missing parameters');
      }

      const platformIndex = ['LinkedIn', 'GitHub', 'Twitter', 'Google'].indexOf(platform);
      if (platformIndex === -1) throw new Error('Invalid platform');

      const [identityPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('identity'),
          new PublicKey(owner).toBuffer(),
          Buffer.from([platformIndex]),
        ],
        new PublicKey('11111111111111111111111111111111') // Placeholder program ID
      );

      // In production, fetch actual account data
      // const account = await program.account.identity.fetch(identityPDA);
      
      // Placeholder return
      return null as Identity | null;
    },
    enabled: !!program && !!owner && !!platform,
    refetchInterval: 30000,
  });
}
