'use client';

import { useMemo } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { PROGRAM_ID, RPC_ENDPOINT } from '@/lib/solana/constants';

// IDL will be imported after deployment
// import idl from '@/lib/solana/idl.json';

export function useProgram() {
  const { address, isConnected } = useAppKitAccount();
  
  const connection = useMemo(
    () => new Connection(RPC_ENDPOINT, 'confirmed'),
    []
  );

  const program = useMemo(() => {
    if (!isConnected || !address) return null;

    // Create mock wallet for read-only operations
    const wallet = {
      publicKey: new PublicKey(address),
      signTransaction: async (tx: any) => tx,
      signAllTransactions: async (txs: any[]) => txs,
    };

    const provider = new AnchorProvider(connection, wallet as any, {
      commitment: 'confirmed',
    });

    // In production, load actual IDL
    // return new Program(idl as any, PROGRAM_ID, provider);
    return null; // Placeholder
  }, [connection, isConnected, address]);

  return {
    program,
    connection,
    wallet: address ? new PublicKey(address) : null,
  };
}
