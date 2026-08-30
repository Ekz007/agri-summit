import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb", // upload de foto de perfil
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "xjbqpipqxzcowwdwwoyq.supabase.co" },
    ],
  },
};

export default nextConfig;
