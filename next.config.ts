/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure standalone output for Amplify
  output: 'standalone',
  
  // Disable Turbopack if causing issues (use Webpack instead)
  experimental: {
    turbo: false, // Disable Turbopack
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Optimize images
  images: {
    domains: [],
  },
};

module.exports = nextConfig;