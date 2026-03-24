import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactStrictMode: true,
  // Reuse TCP connections for server-side fetch calls → saves 200-500ms per request
  httpAgentOptions: { keepAlive: true },
  allowedDevOrigins: ["http://localhost:5000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/proxy/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
