import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/ipara-rf-knowledge-base',
  assetPrefix: '/ipara-rf-knowledge-base',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
