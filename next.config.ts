import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
  }, // to fix prisma not reading env variable during deployment
};

export default nextConfig;
