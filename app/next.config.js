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
  // output: 'standalone', // Disabled due to Windows symlink issues
  poweredByHeader: false,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
