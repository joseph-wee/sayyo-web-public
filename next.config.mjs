/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.sayyo.mobileto.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dev-static.sayyo.mobileto.io',
        port: '',
        pathname: '/**',
      },

    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    formats: ['image/webp'],
  },
  reactStrictMode: true,
  // output: 'export',
  // trailingSlash: true,
  // images: {
  //   unoptimized: true
  // }

};

export default nextConfig;
