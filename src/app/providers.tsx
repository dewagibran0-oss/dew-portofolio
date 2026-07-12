"use client";

import React, { useEffect, useState } from "react";
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
  // Hanya perangkat ber-mouse (desktop) yang me-mount Cursor. Di mobile/sentuh
  // chunk framer-motion + listener + loop spring TIDAK pernah diunduh/dijalankan
  // → nol beban main-thread (TBT) untuk efek yang memang tak terpakai di sana.
  const [pointerFine, setPointerFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setPointerFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider initialLang={initialLang}>
        {pointerFine && <Cursor />}
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
