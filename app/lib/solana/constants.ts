import { PublicKey } from '@solana/web3.js';

export const PLATFORMS = [
  'LinkedIn',
  'GitHub',
  'Twitter',
  'Google',
] as const;

export type PlatformType = typeof PLATFORMS[number];

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || PublicKey.default.toString()
);

export const RPC_ENDPOINT = 
  process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com';

export const NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';

export const NOTARY_SERVERS = (
  process.env.NEXT_PUBLIC_NOTARY_SERVERS || 'http://localhost:7047'
).split(',');

export const VALIDITY_PERIOD = 365 * 24 * 60 * 60; // 1 year in seconds

export const PLATFORM_COLORS = {
  LinkedIn: '#0077B5',
  GitHub: '#181717',
  Twitter: '#1DA1F2',
  Google: '#4285F4',
} as const;

export const PLATFORM_ICONS = {
  LinkedIn: '💼',
  GitHub: '🐙',
  Twitter: '🐦',
  Google: '🔍',
} as const;
