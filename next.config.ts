import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Tree-shake barrel imports → hanya export yang dipakai yang masuk bundle,
  // menekan JS bootup awal (pendorong utama LCP tersimulasi di mobile).
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
    ],
  },
};

export default nextConfig;
