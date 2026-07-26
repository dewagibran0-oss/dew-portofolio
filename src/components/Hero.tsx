"use client";

import { motion, useScroll, useTransform, useSpring, useReducedMotion, type MotionValue } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

// 1. Background Layer — bersih: warna dasar ivory/hitam + vignette lembut.
//    (Partikel WebGL & aurora blur dihapus pada redesign ivory/maroon.)
const BackgroundLayer = memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[var(--bg)]">
    {/* Grainy Texture Overlay — tekstur kertas halus, di-host lokal */}
    <div className="absolute inset-0 opacity-[0.15] bg-[url('/noise.svg')] pointer-events-none" />

    {/* Gradasi tepi sangat lembut agar konten menyatu dengan section berikut */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-section)]" />
  </div>
));
BackgroundLayer.displayName = "BackgroundLayer";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLang();

  // Efek parallax/opacity terikat-scroll HANYA di desktop bertenaga.
  // Di mobile (khususnya iOS: 100svh + toolbar dinamis membuat pengukuran
  // scroll tak stabil → opacity bisa melompat ke 0 → seluruh Hero "hilang"),
  // konten dibuat statis & selalu terlihat. Default `false` (statis) agar
  // SSR/first-paint aman di iOS; diaktifkan hanya setelah mount di desktop.
  const [parallax, setParallax] = useState(false);
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setParallax(finePointer && !shouldReduceMotion);
  }, [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    restDelta: 0.001
  });

  // Multilayered Parallax & Transform
  const yContent = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  // WhatsApp Handler
  const handleWhatsApp = () => {
    window.open("https://wa.me/62881025020924", "_blank");
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[var(--bg)]"
    >
      <BackgroundLayer />

      <motion.div
        style={
          parallax
            ? { y: yContent, scale, opacity, willChange: "transform, opacity" }
            : { opacity: 1 }
        }
        className="relative z-10 w-full flex flex-col items-center justify-center px-6 py-20"
      >
            {/* 1. Badge Status — titik maroon statis, tanpa ping */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8 md:mb-14"
            >
              <div className="px-5 py-2 rounded-full border border-[var(--hairline)] bg-[var(--bg-card)] flex items-center gap-3 shadow-sm">
                <span className="relative h-2 w-2 rounded-full bg-[var(--maroon)]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-zinc-500">
                  {t.hero.badge}
                </span>
              </div>
            </motion.div>

            {/* 2. Headline — serif editorial */}
            {/* Elemen LCP: render terlihat sejak paint pertama (tanpa opacity-0 awal)
                agar LCP tidak menunggu hydration/animasi. */}
            <div className="relative text-center mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center"
              >
                {/* DEWA & GIBRAN dengan ukuran sama besar di mobile */}
                <h1 className="flex flex-col items-center leading-[0.9] tracking-[-0.03em]">
                  <span className="text-[var(--color-white)] text-[20vw] md:text-[10vw] font-semibold">
                    Dewa
                  </span>
                  <span className="text-[var(--maroon)] text-[20vw] md:text-[10vw] font-semibold italic mt-1 pr-2">
                    Gibran
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ delay: 1, duration: 1.5 }}
                className="h-[2px] bg-[var(--maroon)] mx-auto mt-10 md:mt-14 rounded-full"
              />
            </div>

            {/* 3. Description & Functional Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.2 }}
              className="max-w-2xl text-center space-y-12"
            >
              <p
                className="text-zinc-500 text-sm md:text-lg font-light leading-relaxed tracking-wide px-4 [&>b]:text-[var(--color-white)] [&>b]:font-medium"
                dangerouslySetInnerHTML={{ __html: t.hero.description }}
              />

              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-lg mx-auto">
                {/* Tombol ke /archive */}
                <Link href="/archive" className="w-full sm:w-1/2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-5 bg-[var(--maroon)] text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-sm transition-all relative group overflow-hidden"
                  >
                    <span className="relative z-10">{t.hero.launch}</span>
                    <div className="absolute inset-0 bg-[var(--maroon-strong)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </motion.button>
                </Link>

                {/* Tombol ke WhatsApp */}
                <motion.button
                  onClick={handleWhatsApp}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-1/2 py-5 border border-[var(--hairline)] bg-[var(--bg-card)] text-[var(--color-white)] text-[11px] font-bold uppercase tracking-[0.3em] rounded-sm transition-colors hover:border-[var(--maroon)] hover:text-[var(--maroon)]"
                >
                  {t.hero.link}
                </motion.button>
              </div>
            </motion.div>
      </motion.div>

      <ScrollHUD smoothProgress={smoothProgress} />
      <TechnicalFrame />
    </section>
  );
}

// Sub-Component: Right Side scroll indicator
function ScrollHUD({ smoothProgress }: { smoothProgress: MotionValue<number> }) {
  const { t } = useLang();
  return (
    <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-10 z-20">
      <div className="h-40 w-[1px] bg-[var(--hairline)] relative">
        <motion.div
          style={{ scaleY: smoothProgress }}
          className="absolute top-0 w-full bg-[var(--maroon)] origin-top h-full"
        />
      </div>
      <span className="text-[9px] text-zinc-500 uppercase tracking-[0.5em] rotate-90 whitespace-nowrap">
        {t.hero.hud}
      </span>
    </div>
  );
}

// Sub-Component: Frame Elements — aksen sudut tipis, meta ringkas
function TechnicalFrame() {
  const { t } = useLang();
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none p-6 md:p-10">
      {/* Corner Accents */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-[var(--hairline)]" />
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-[var(--hairline)]" />

      {/* Meta ringkas */}
      <div className="absolute bottom-10 left-10 hidden md:flex flex-col gap-2">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-[8px] text-zinc-500 uppercase tracking-widest">{t.hero.location}</span>
            <span className="text-[10px] text-zinc-400">Jakarta, ID</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-zinc-500 uppercase tracking-widest">{t.hero.status}</span>
            <span className="text-[10px] text-[var(--maroon)]">{t.hero.live}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
