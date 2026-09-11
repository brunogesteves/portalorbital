import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
      {
        source: "/images/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/images/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "80",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      // {
      //   protocol: "http",
      //   hostname: "api.localhost",
      //   pathname: "/**",
      // },
      {
        protocol: "http",
        hostname: "api",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
      {
        protocol: "https",
        hostname: "proofread-overstep-unvented.ngrok-free.dev",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
