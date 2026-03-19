import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
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

  },
  reactStrictMode: true,
  output: "standalone"
};

export default nextConfig;
