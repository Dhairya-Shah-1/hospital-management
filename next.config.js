const path = require('path');

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  }
};

module.exports = nextConfig;