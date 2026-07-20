/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [70, 75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'adaptsmedia.com', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.adaptsmedia.com', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;