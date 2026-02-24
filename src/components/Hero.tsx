"use client";

import { motion, useScroll, useTransform, AnimatePresence, useSpring, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";
import HeroScene from "./HeroScene";

// Optimasi Rendering: Memoize background agar tidak re-render saat state parent berubah
const MemoizedScene = memo(() => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="absolute inset-0 z-0"
  >
    <HeroScene />
  </motion.div>
));

MemoizedScene.displayName = "MemoizedScene";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Spring yang dioptimasi (Damping tinggi = tidak goyang/jittery)
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 70, 
    damping: 30, 
    mass: 0.5
  });

  // Transformasi yang efisien (Menghindari Blur filter jika possible untuk performa)
  const yContent = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const opacityContent = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scaleContent = useTransform(smoothProgress, [0, 1], [1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#020617] selection:bg-cyan-500/30"
    >
      {/* 1. Performance Overlay (GPU Accelerated) */}
      <div className="absolute inset-0 z-[1] pointer-events-none transform-gpu">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />
      </div>

      {/* 2. Background Layer */}
      <MemoizedScene />

      {/* 3. Main UI Layer */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div 
            style={{ 
              y: shouldReduceMotion ? 0 : yContent, 
              opacity: opacityContent, 
              scale: scaleContent,
              willChange: "transform, opacity" // Hint untuk Browser GPU
            }}
            className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center"
          >
            {/* Minimalist Top Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="group cursor-pointer mb-6"
            >
              <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] transition-colors">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-100/60">
                  Available for new systems
                </span>
              </div>
            </motion.div>
            
            {/* Headline with High-End Typography */}
            <div className="relative mb-8 text-center overflow-visible">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-white text-[clamp(2.5rem,12vw,10rem)] font-bold leading-[0.85] tracking-[-0.04em] perspective-1000"
              >
                DEWA <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20">GIBRAN</span>
              </motion.h1>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 1.2, duration: 1.5 }}
                className="h-[2px] bg-cyan-500 mx-auto mt-8 rounded-full shadow-[0_0_20px_#06b6d4]"
              />
            </div>

            {/* Optimized Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="max-w-xl mx-auto text-gray-400 text-sm md:text-lg font-light leading-relaxed tracking-wide mb-12 text-center"
            >
              Architecting <span className="text-white">autonomous digital experiences</span> where aesthetic meets hyper-functional systems.
            </motion.p>

            {/* CTA Buttons - Premium Minimalist */}
            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: 'smooth' })}
                className="relative px-10 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] rounded-sm overflow-hidden group w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 transition-colors group-hover:text-white">Exploration</span>
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://wa.me/62881025020924')}
                className="px-10 py-4 border border-white/10 hover:border-white/40 backdrop-blur-sm text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-sm transition-all w-full sm:w-auto"
              >
                Initiate Contact
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements - Zero Interaction to save performance */}
      <SideIndicators smoothProgress={smoothProgress} />
    </section>
  );
}

// Sub-komponen terpisah agar Hero tidak re-render saat scroll progress update
function SideIndicators({ smoothProgress }: { smoothProgress: any }) {
  return (
    <>
      {/* Scroll Mouse Icon */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20">
        <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* Modern Vertical Progress */}
      <div className="absolute left-10 bottom-10 hidden xl:flex flex-col items-center gap-6">
        <span className="text-[10px] text-white/20 font-mono rotate-90 origin-left translate-x-3 uppercase tracking-[0.3em]">
          Phase 01
        </span>
        <div className="h-32 w-[1px] bg-white/5 relative overflow-hidden">
          <motion.div 
            style={{ scaleY: smoothProgress }}
            className="absolute top-0 w-full bg-cyan-500 origin-top h-full shadow-[0_0_10px_#22d3ee]" 
          />
        </div>
      </div>
    </>
  );
}