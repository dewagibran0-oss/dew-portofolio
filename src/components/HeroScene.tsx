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
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[var(--bg)]">
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[55%] bg-cyan-500/20 blur-[90px] rounded-full opacity-60" />
      <div className="absolute bottom-[5%] right-[5%] w-[45%] h-[45%] bg-indigo-500/15 blur-[90px] rounded-full opacity-50" />
      <div className="absolute top-[20%] left-[5%] w-[35%] h-[35%] bg-blue-600/10 blur-[90px] rounded-full opacity-40" />
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
