'use client';

import { createAppKit } from '@reown/appkit/react';
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '';

if (!projectId) {
  console.warn('NEXT_PUBLIC_REOWN_PROJECT_ID is not set');
}

const metadata = {
  name: 'SolanaID',
  description: 'zkTLS Identity Verification on Solana',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://solanaid.app',
  icons: ['/logo.png']
};

const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ]
} as any);

createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks: [solana, solanaDevnet, solanaTestnet],
  metadata,
  projectId,
  features: {
    analytics: true,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#9945FF',
    '--w3m-border-radius-master': '16px',
    '--w3m-font-family': 'Inter, sans-serif',
  }
});

export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
