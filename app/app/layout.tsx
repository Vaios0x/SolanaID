import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AppKitProvider } from '@/components/providers/AppKitProvider';
import { ClientBackground } from '@/components/ui/ClientBackground';
import { CyberGrid } from '@/components/ui/CyberGrid';
import { ConnectButton } from '@/components/wallet/ConnectButton';
import { GlitchText } from '@/components/ui/GlitchText';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'SolanaID - zkTLS Identity Verification',
  description: 'Prove your LinkedIn, GitHub, Twitter, and Google identities on Solana without revealing personal data',
  keywords: ['Solana', 'zkTLS', 'Identity', 'Verification', 'Privacy', 'Web3'],
  authors: [{ name: 'SolanaID Team' }],
  openGraph: {
    title: 'SolanaID - zkTLS Identity Verification',
    description: 'Decentralized identity verification powered by TLSNotary',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolanaID',
    description: 'zkTLS Identity Verification on Solana',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${jetbrainsMono.variable} antialiased`}>
        <AppKitProvider>
          {/* Animated Backgrounds */}
          <ClientBackground />
          <CyberGrid />
          
          {/* Navigation */}
          <nav className="relative z-50 border-b border-white/10 backdrop-blur-xl bg-black/30">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="text-3xl transform transition-transform group-hover:scale-110">
                  🔐
                </div>
                <h1 className="text-2xl font-bold">
                  <GlitchText text="SolanaID" glitchIntensity="low" />
                </h1>
              </Link>
              
              {/* Nav Links */}
              <div className="hidden md:flex gap-8 items-center">
                <Link 
                  href="/verify" 
                  className="text-white/80 hover:text-white transition-colors font-semibold relative group"
                >
                  Verify
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-solana-purple to-cyber-blue group-hover:w-full transition-all duration-300" />
                </Link>
                
                <Link 
                  href="/dashboard" 
                  className="text-white/80 hover:text-white transition-colors font-semibold relative group"
                >
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-solana-purple to-cyber-blue group-hover:w-full transition-all duration-300" />
                </Link>
                
                <Link 
                  href="/explorer" 
                  className="text-white/80 hover:text-white transition-colors font-semibold relative group"
                >
                  Explorer
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-solana-purple to-cyber-blue group-hover:w-full transition-all duration-300" />
                </Link>
                
                <Link 
                  href="/docs" 
                  className="text-white/80 hover:text-white transition-colors font-semibold relative group"
                >
                  Docs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-solana-purple to-cyber-blue group-hover:w-full transition-all duration-300" />
                </Link>
                
                <ConnectButton />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <ConnectButton />
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="relative z-10 min-h-screen">
            {children}
          </main>

          {/* Footer */}
          <footer className="relative z-10 border-t border-white/10 backdrop-blur-xl bg-black/30 py-12 mt-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Brand */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🔐</span>
                    <h3 className="text-xl font-bold gradient-text">SolanaID</h3>
                  </div>
                  <p className="text-white/60 text-sm">
                    Privacy-preserving identity verification on Solana using zkTLS technology
                  </p>
                </div>

                {/* Product */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Product</h4>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li><Link href="/verify" className="hover:text-white transition-colors">Verify Identity</Link></li>
                    <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                    <li><Link href="/explorer" className="hover:text-white transition-colors">Explorer</Link></li>
                    <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                  </ul>
                </div>

                {/* Developers */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Developers</h4>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li><a href="https://github.com/solanaid" target="_blank" rel="noopener" className="hover:text-white transition-colors">GitHub</a></li>
                    <li><Link href="/docs/api" className="hover:text-white transition-colors">API Reference</Link></li>
                    <li><Link href="/docs/sdk" className="hover:text-white transition-colors">SDK</Link></li>
                    <li><a href="https://discord.gg/solanaid" target="_blank" rel="noopener" className="hover:text-white transition-colors">Discord</a></li>
                  </ul>
                </div>

                {/* Community */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Community</h4>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li><a href="https://twitter.com/solanaid" target="_blank" rel="noopener" className="hover:text-white transition-colors">Twitter</a></li>
                    <li><a href="https://discord.gg/solanaid" target="_blank" rel="noopener" className="hover:text-white transition-colors">Discord</a></li>
                    <li><a href="https://t.me/solanaid" target="_blank" rel="noopener" className="hover:text-white transition-colors">Telegram</a></li>
                    <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/60 text-sm">
                  © 2025 SolanaID. Built for Solana Cypherpunk Hackathon.
                </p>
                
                <div className="flex gap-4 text-sm text-white/60">
                  <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
              </div>
            </div>
          </footer>
        </AppKitProvider>
      </body>
    </html>
  );
}
