"use client";

import { usePathname } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";
import dynamic from "next/dynamic"; // Import dynamic untuk Lazy Loading
import "./globals.css";

// 1. Optimasi Font: Gunakan variable font dan preload secara efisien
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space",
  display: 'swap', // Mencegah invisible text saat loading
  adjustFontFallback: true, // Optimasi CLS
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
  adjustFontFallback: true,
});

// 2. Lazy Load Komponen Berat: Cursor biasanya menggunakan JS berat (Framer Motion/Canvas)
// Kita load hanya di sisi klien dan setelah LCP (Largest Contentful Paint)
const Cursor = dynamic(() => import("@/components/ui/Cursor"), { 
  ssr: false 
});

const Navbar = dynamic(() => import("@/components/Navbar"), { 
  ssr: true // Tetap SSR agar navigasi cepat, tapi dipisah dari bundle utama
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Gunakan useMemo jika daftar rute sangat panjang, namun untuk ini cukup begini
  const hideNavbarRoutes = ["/archive", "/changelog", "/docs", "/components"];
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} bg-[#020617] scroll-smooth`}>
      <body className="font-sans text-white antialiased selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
        
        {/* Cursor di-load secara dinamis agar tidak membebani loading awal */}
        <Cursor />

        {!shouldHideNavbar && <Navbar />}

        {/* 3. Optimasi Konten: Berikan Role aria dan pastikan min-h tidak menyebabkan pergeseran */}
        <main id="main-content" className="relative min-h-screen">
          {children}
        </main>

        <div id="modal-root" />
      </body>
    </html>
  );
}