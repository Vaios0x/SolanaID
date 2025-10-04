/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      util: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    };

    // Handle WASM files
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Ignore problematic modules
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('pino-pretty');
    }

    return config;
  },
  images: {
    domains: ['solanaid.app'],
  },
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'framer-motion'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  output: 'standalone', // Enable for Vercel deployment
  poweredByHeader: false,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  
  // Vercel optimizations
  compress: true,
  generateEtags: true,
  
  // PWA configuration for Vercel
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
