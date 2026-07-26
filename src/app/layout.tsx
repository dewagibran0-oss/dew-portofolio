import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Fraunces } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Providers from "./providers";
import type { Lang } from "@/lib/dictionary";

// --- Font (self-hosted via next/font, display swap utk cegah invisible text / CLS) ---
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

// Serif editorial untuk judul (h1-h3) — kesan premium/elegan.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const SITE_URL = "https://dewagibran.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dewa Gibran — Digital Architect & Web Developer",
    template: "%s | Dewa Gibran",
  },
  description:
    "Portofolio Dewa Gibran — Web Developer & Digital System Architect asal Jakarta. Membangun ekosistem digital dengan Next.js, React, Laravel, dan desain premium berperforma tinggi.",
  keywords: [
    "Dewa Gibran",
    "Web Developer",
    "Digital Architect",
    "Portfolio",
    "Next.js",
    "React",
    "Laravel",
    "Frontend Developer",
    "Jakarta",
    "System Support",
  ],
  authors: [{ name: "Dewa Ahmad Gibran" }],
  creator: "Dewa Ahmad Gibran",
  applicationName: "Dewa Gibran Portfolio",
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Dewa Gibran Portfolio",
    title: "Dewa Gibran — Digital Architect & Web Developer",
    description:
      "Membangun ekosistem digital dengan presisi teknis dan estetika premium. Next.js · React · Laravel.",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Dewa Gibran — Digital Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dewa Gibran — Digital Architect & Web Developer",
    description:
      "Membangun ekosistem digital dengan presisi teknis dan estetika premium.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
  ],
};

/**
 * Inline script anti-FOUC untuk TEMA: mengeset data-theme dari localStorage
 * SEBELUM paint pertama agar tidak ada kedipan tema.
 * Bahasa TIDAK di sini — ditentukan server via cookie (lihat RootLayout) agar
 * SSR & client konsisten dan tidak memicu hydration-mismatch.
 */
const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'light' && t !== 'dark') t = 'light';
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.colorScheme = t;
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Baca bahasa dari cookie di server → render <html lang> yang benar
  // sehingga HTML SSR cocok dengan render pertama client.
  const cookieStore = await cookies();
  const lang: Lang = cookieStore.get("lang")?.value === "en" ? "en" : "id";

  return (
    <html
      lang={lang}
      data-theme="light"
      className={`${spaceGrotesk.variable} ${inter.variable} ${fraunces.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className="font-sans antialiased overflow-x-hidden bg-base"
        suppressHydrationWarning
      >
        <Providers initialLang={lang}>
          <main id="main-content" className="relative min-h-screen">
            {children}
          </main>
          <div id="modal-root" />
        </Providers>
      </body>
    </html>
  );
}
