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
    ]
  },
  reactStrictMode: true,
  // output: 'export',
  // trailingSlash: true,
  // images: {
  //   unoptimized: true
  // }

};

export default nextConfig;
