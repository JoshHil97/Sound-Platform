import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: process.env.NEXT_FORCE_WASM === "1" ? { useWasmBinary: true } : undefined
};

export default nextConfig;
