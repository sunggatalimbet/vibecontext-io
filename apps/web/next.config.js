/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds, not for development
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
}

module.exports = nextConfig
