import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    OBJECTS_ENGINE_URL: process.env.OBJECTS_ENGINE_URL,
    API_BASE_URL: process.env.API_BASE_URL,
  },
  output: 'standalone',
};

export default nextConfig;
