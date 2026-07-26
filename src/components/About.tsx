"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView, 
  useSpring, 
  useMotionValue 
} from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  Mail,
  Zap,
  Shapes,
  FileText,
  CheckCircle2
} from "lucide-react";
import { useLang } from "@/lib/i18n";

// --- Types ---
interface StatCardProps {
  label: string;
  value: string;
  suffix: string;
  icon: React.ReactNode;
  delay: number;
}

// --- Sub-Component: Portrait melayang tanpa kotak (foto PNG transparan) ---
const Photo3D = ({ isInView }: { isInView: boolean }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Animasi idle tak-terbatas (float + pulse) hanya di desktop bertenaga.
  // Di mobile (khususnya iOS) me-repaint foto ber-drop-shadow besar tiap frame
  // → jank. Bayangan tetap tampil, hanya diam.
  const [idleMotion, setIdleMotion] = useState(false);
  useEffect(() => {
    setIdleMotion(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // Tilt 3D halus mengikuti kursor.
  const springConfig = { stiffness: 90, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), springConfig);
  // Parallax lembut: foto bergeser sedikit berlawanan arah aura → kesan kedalaman.
  const imgX = useSpring(useTransform(mouseX, [-300, 300], [-14, 14]), springConfig);
  const imgY = useSpring(useTransform(mouseY, [-300, 300], [-14, 14]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, perspective: 1600 }}
      className="relative lg:col-span-5 z-20 [transform-style:preserve-3d]"
    >
      <div className="relative aspect-[4/5] group">
        {/* Aura lembut maroon di belakang subjek (tanpa border/kartu) */}
        <motion.div
          aria-hidden
          animate={idleMotion ? { scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] } : undefined}
          transition={idleMotion ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(140,47,57,0.22) 0%, transparent 70%)",
          }}
        />
        {/* Cincin dekoratif tipis */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[70%] h-[70%] rounded-full border border-[var(--hairline)]" />
        </div>

        {/* FOTO: transparan, tanpa border, melayang + parallax + float idle */}
        <motion.div
          style={{ x: imgX, y: imgY }}
          className="absolute inset-0"
        >
          <motion.div
            animate={idleMotion ? { y: [0, -14, 0] } : undefined}
            transition={idleMotion ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined}
            className="relative w-full h-full"
          >
            <Image
              src="/propil.png"
              alt="Dewa Gibran — Digital Architect"
              fill
              sizes="(max-width: 1024px) 80vw, 40vw"
              priority
              className="object-contain object-bottom drop-shadow-[0_35px_60px_rgba(0,0,0,0.55)] transition-[filter] duration-700 grayscale-[0.15] group-hover:grayscale-0"
            />
          </motion.div>
        </motion.div>

        {/* Bayangan pijakan (ground shadow) biar tidak 'mengambang' aneh */}
        <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[55%] h-6 bg-black/25 blur-2xl rounded-[50%]" />

        {/* Chip nama minimalis */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[var(--bg-card)] border border-[var(--hairline)] shadow-sm">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--maroon)]" />
          <p className="text-white font-bold text-sm tracking-tight">Dewa Gibran</p>
          <span className="w-px h-4 bg-[var(--hairline)]" />
          <p className="text-zinc-400 text-[10px] font-medium uppercase tracking-widest">{t.about.base}</p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Sub-Component: Stat Card ---
const StatCard = ({ label, value, suffix, icon, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    className="relative p-8 rounded-[2rem] bg-[var(--bg-card)] border border-[var(--hairline)] group hover:border-[var(--maroon)]/40 transition-colors shadow-sm"
  >
    <div className="text-zinc-600 group-hover:text-[var(--maroon)] transition-colors mb-4">
      {icon}
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-4xl font-black text-white tracking-tighter">{value}</span>
      <span className="text-[var(--maroon)] font-bold text-xl">{suffix}</span>
    </div>
    <p className="text-zinc-500 text-[9px] font-medium uppercase tracking-[0.2em] mt-1">{label}</p>
  </motion.div>
);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const { t } = useLang();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulasi loading progress premium
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);
      // Logic download file asli:
      window.open('/cv_dewa.pdf', '_blank');
      setTimeout(() => setIsDownloaded(false), 3000);
    }, 2000);
  };

  const stats = [
    { label: t.about.stats.projects, value: "24", suffix: "+", icon: <Zap size={20} /> },
    { label: t.about.stats.systems, value: "15", suffix: "Pro", icon: <Shapes size={20} /> },
    { label: t.about.stats.accuracy, value: "100", suffix: "%", icon: <Sparkles size={20} /> },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-32 md:py-64 bg-[var(--bg-section)] overflow-hidden"
      id="about"
    >
      {/* Background Kinetic Text */}
      <motion.div 
        style={{ x: bgTextX }}
        className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none z-0"
      >
        <h2 className="text-[30vw] font-black leading-none uppercase tracking-tighter italic" style={{ color: "color-mix(in srgb, var(--color-white) 3%, transparent)" }}>
          ARCHITECT
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <Photo3D isInView={isInView} />

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[var(--maroon)]/10 border border-[var(--maroon)]/25">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--maroon)]" />
                  <span className="text-[var(--maroon)] text-[10px] uppercase tracking-[0.3em] font-semibold">{t.about.badge}</span>
                </div>

                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                  {t.about.titleTop} <br />
                  <span className="text-[var(--maroon)] italic">
                    {t.about.titleBottom}
                  </span>
                </h2>

                <p
                  className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-xl [&>b]:text-white [&>b]:font-medium [&>b]:italic"
                  dangerouslySetInnerHTML={{ __html: t.about.paragraph }}
                />
              </div>

              {/* Bento Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((s, i) => (
                  <StatCard key={i} {...s} delay={0.5 + i * 0.1} />
                ))}
              </div>

              {/* Enhanced Action Area */}
              <div className="flex flex-col sm:flex-row items-center gap-8 pt-6">
                {/* Download CV Button */}
                <motion.button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative overflow-hidden group flex items-center gap-4 px-10 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-500 ${
                    isDownloaded ? 'bg-emerald-600 text-white' : 'bg-[var(--maroon)] text-white'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isDownloading ? t.about.downloading : isDownloaded ? t.about.downloaded : t.about.download}
                    {isDownloaded ? <CheckCircle2 size={18} /> : <FileText size={18} className="group-hover:rotate-12 transition-transform" />}
                  </span>

                  {/* Progress Bar Background */}
                  {isDownloading && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="absolute inset-0 bg-white/15"
                    />
                  )}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-[var(--maroon-strong)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </motion.button>

                <div className="flex items-center gap-5 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full border border-[var(--hairline)] flex items-center justify-center group-hover:border-[var(--maroon)] transition-colors">
                    <Mail size={16} className="text-zinc-500 group-hover:text-[var(--maroon)]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-medium text-zinc-600 uppercase tracking-widest">{t.about.inquiry}</p>
                    <p className="text-white font-bold group-hover:text-[var(--maroon)] transition-colors">dewagibran0@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Finishing Texture Layer */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--hairline)]" />
    </section>
  );
}