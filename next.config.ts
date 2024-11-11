import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/signin",
        destination: "/api/auth/signin",
      },
      {
        source: "/signout",
        destination: "/api/auth/signout",
      },
    ];
  },
};

export default nextConfig;
