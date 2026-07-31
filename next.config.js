/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // We might need this depending on deployment (e.g. static export) or if domains are external
  },
  // If they were using Vite SPA, they probably want simple static routing or standard SSR
};

export default nextConfig;
