/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/interior_1',
  assetPrefix: '/interior_1/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // ESLintチェックを無効化
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScriptチェックを無効化
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;