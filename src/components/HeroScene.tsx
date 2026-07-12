"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Chunk WebGL berat (Three.js ~880KB) hanya diunduh saat benar-benar dipakai
// (desktop bertenaga, non-reduced-motion, mode gelap). Mobile TIDAK memuatnya.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/**
 * Fallback ringan (tanpa WebGL) untuk mobile / reduced-motion / mode terang.
 * Nuansa sinematik dipertahankan lewat gradient + aurora blur, tapi
 * NOL beban GPU/main-thread → aman untuk skor Performance mobile.
 */
function StaticAurora() {
  // Glow dibuat dari radial-gradient (BUKAN filter blur). Layer ini `fixed`
  // dan selalu terlihat di belakang semua section; memakai `blur()` di sini
  // membuat WebKit iOS me-rasterisasi ulang tiap frame scroll → lag global.
  // Radial-gradient memberi nuansa aurora yang sama dengan nol biaya filter.
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[var(--bg)]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 45% at 50% 12%, rgba(34,211,238,0.20), transparent 60%)," +
            "radial-gradient(48% 42% at 88% 90%, rgba(99,102,241,0.14), transparent 60%)," +
            "radial-gradient(42% 38% at 8% 30%, rgba(37,99,235,0.12), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,var(--bg)_100%)]" />
    </div>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const [heavy, setHeavy] = useState(false); // true → render Canvas WebGL
  const [active, setActive] = useState(true); // pause render-loop saat offscreen
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const decide = () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const finePointer = window.matchMedia("(hover: hover)").matches;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const theme = document.documentElement.getAttribute("data-theme");
      // Partikel berat hanya untuk desktop bertenaga, non-reduced-motion, mode gelap.
      setHeavy(desktop && finePointer && !reduce && theme !== "light");
    };

    decide();
    window.addEventListener("resize", decide);

    // Amati perubahan tema (toggle) untuk switch canvas <-> aurora.
    const mo = new MutationObserver(decide);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("resize", decide);
      mo.disconnect();
    };
  }, []);

  // Hentikan render-loop ketika hero keluar viewport → hemat TBT & baterai.
  useEffect(() => {
    if (!heavy || !wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [heavy]);

  if (!mounted) return <div className="fixed inset-0 bg-[var(--bg)]" />;

  if (!heavy) {
    return (
      <div ref={wrapRef} className="fixed inset-0 z-0">
        <StaticAurora />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="fixed inset-0 z-0">
      <HeroCanvas active={active} />
    </div>
  );
}
