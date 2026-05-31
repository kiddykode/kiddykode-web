import type { NextConfig } from "next";

const LOCALES = ['en', 'fr'];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  // Strip locale prefix from /verify routes so they always serve from app/verify/
  async redirects() {
    return LOCALES.flatMap(locale => [
      {
        source: `/${locale}/verify`,
        destination: '/verify',
        permanent: true,
      },
      {
        source: `/${locale}/verify/:token*`,
        destination: '/verify/:token*',
        permanent: true,
      },
    ]);
  },
};

export default nextConfig;
