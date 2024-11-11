import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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

export default withNextIntl(nextConfig);
