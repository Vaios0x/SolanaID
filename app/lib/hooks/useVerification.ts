'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProgram } from './useProgram';
import { PublicKey } from '@solana/web3.js';

interface VerifyIdentityParams {
  platform: string;
  proofHash: Uint8Array;
  usernameHash: Uint8Array;
  metadata: string;
}

export function useVerification() {
  const { program, wallet } = useProgram();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: VerifyIdentityParams) => {
      if (!program || !wallet) {
        throw new Error('Wallet not connected');
      }

      const platformIndex = ['LinkedIn', 'GitHub', 'Twitter', 'Google'].indexOf(params.platform);
      if (platformIndex === -1) throw new Error('Invalid platform');

      const [configPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from('config')],
        new PublicKey('11111111111111111111111111111111') // Placeholder program ID
      );

      const [identityPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('identity'),
          wallet.toBuffer(),
          Buffer.from([platformIndex]),
        ],
        new PublicKey('11111111111111111111111111111111') // Placeholder program ID
      );

      // In production, call register_identity instruction
      // const tx = await program.methods
      //   .registerIdentity(
      //     platformIndex,
      //     Array.from(params.proofHash),
      //     Array.from(params.usernameHash),
      //     params.metadata
      //   )
      //   .accounts({
      //     config: configPDA,
      //     identity: identityPDA,
      //     owner: wallet,
      //   })
      //   .rpc();

      // Placeholder return
      return { signature: 'mock_signature', identityPDA };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['identity'] });
    },
  });
}
