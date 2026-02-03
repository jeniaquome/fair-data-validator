/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages deployment configuration
  basePath: '/fair-data-validator',
  assetPrefix: '/fair-data-validator/',
}

module.exports = nextConfig
