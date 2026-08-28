import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "api.localhost",
        port: "80",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "admin.localhost",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
