import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["bigbullui"],
  },
};

export default nextConfig;
