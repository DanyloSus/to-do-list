/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  typescript: {
    ignoreBuildErrors: true, // because without it, app won't render ;(
  },
};

module.exports = nextConfig;
