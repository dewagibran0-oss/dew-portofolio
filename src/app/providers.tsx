"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/i18n";
import type { Lang } from "@/lib/dictionary";

// Cursor di-load dinamis (client-only) agar tidak membebani bundle awal / LCP.
const Cursor = dynamic(() => import("@/components/ui/Cursor"), { ssr: false });

export default function Providers({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Lang;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider initialLang={initialLang}>
        <Cursor />
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
