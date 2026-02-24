"use client"; // Kita tambahkan ini karena kita butuh hook navigasi

import { usePathname } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Components
import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space",
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Tentukan rute mana saja yang TIDAK ingin menampilkan navbar
const hideNavbarRoutes = ["/archive", "/changelog", "/docs" , "/components"];
const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <html lang="en" className="bg-[#020617] scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans text-white antialiased selection:bg-cyan-500/30 selection:text-white`}>
        
        <Cursor />

        {/* Render Navbar secara kondisional */}
        {!shouldHideNavbar && <Navbar />}

        <main className="relative min-h-screen">
          {children}
        </main>

        <div id="modal-root" />
      </body>
    </html>
  );
}