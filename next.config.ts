import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // AVIF didahulukan (≈20-30% lebih kecil dari WebP) → payload gambar mobile
  // lebih ringan tanpa mengubah tampilan. minimumCacheTTL memperpanjang cache
  // hasil optimasi agar kunjungan berikutnya instan.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 hari
  },
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
