import type { NextConfig } from "next";
// import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
  // turbopack: {
  //   root: path.resolve(__dirname),
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
