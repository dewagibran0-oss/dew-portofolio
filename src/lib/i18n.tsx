"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { dictionaries, type Lang, type Dictionary } from "./dictionary";

interface LangContextValue {
  lang: Lang;
  t: Dictionary;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

/**
 * Simpan bahasa di cookie (bukan hanya localStorage) agar server dapat
 * membacanya saat SSR — sumber kebenaran yang sama dipakai server & client,
 * sehingga tidak ada hydration-mismatch (termasuk komponen lazy/dynamic).
 */
function persistLang(l: Lang) {
  document.documentElement.setAttribute("lang", l);
  try {
    localStorage.setItem("lang", l);
  } catch {
    /* localStorage bisa diblokir; abaikan */
  }
  try {
    // 1 tahun, path root, aman untuk navigasi biasa.
    document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    /* abaikan */
  }
}

export function LanguageProvider({
  children,
  initialLang = "id",
}: {
  children: React.ReactNode;
  /** Bahasa yang sudah ditentukan server dari cookie — dipakai sebagai state awal. */
  initialLang?: Lang;
}) {
  // Inisialisasi dari nilai server agar render pertama client == HTML server.
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    persistLang(l);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "id" ? "en" : "id";
      persistLang(next);
      return next;
    });
  }, []);

  return (
    <LangContext.Provider
      value={{ lang, t: dictionaries[lang], setLang, toggleLang }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
