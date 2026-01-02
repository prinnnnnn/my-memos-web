import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    OBJECTS_ENGINE_URL: process.env.OBJECTS_ENGINE_URL,
  },
};

export default nextConfig;
