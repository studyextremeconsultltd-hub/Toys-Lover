/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML for GoDaddy cPanel / public_html (no Node server, no Vercel, no Cloudflare)
  output: "export",
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    unoptimized: true,
    formats: ["image/webp"],
    deviceSizes: [640, 750, 1080],
    imageSizes: [40, 96, 160, 256],
    minimumCacheTTL: 60 * 60 * 24 * 14,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
  },
};

export default nextConfig;
