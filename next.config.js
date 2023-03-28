/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    dirs: ['app'],
  },
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
};

module.exports = nextConfig;
