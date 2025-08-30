/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: [
      "static.hopscotch.in",
      "images.unsplash.com",
      "dkc-media.s3.ap-south-1.amazonaws.com",
      "dkc-media.s3.amazonaws.com",
      "dkc-ai-media.s3.ap-south-1.amazonaws.com",
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
