"use client";

import { motion, useScroll, useTransform, AnimatePresence, useSpring, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";
import Link from "next/link";
import HeroScene from "./HeroScene"; 

// 1. Background Layer dengan Optimal Re-rendering
const BackgroundLayer = memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none transform-gpu overflow-hidden">
    <HeroScene />
    
    {/* High-End Ambient Lighting */}
    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[140px] rounded-full mix-blend-screen opacity-40 animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full mix-blend-screen opacity-30" />
    
    {/* High-End Grainy Texture Overlay */}
    <div className="absolute inset-0 opacity-[0.2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light pointer-events-none" />
    
    {/* Cinematic Vignette & Bottom Masking */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-transparent to-[#020617]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,#020617_95%)]" />
  </div>
));
BackgroundLayer.displayName = "BackgroundLayer";

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
    window.open("https://wa.me/62881025020924", "_blank"); // Ganti dengan nomor Anda
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#020617] selection:bg-cyan-500/30"
    >
      <BackgroundLayer />

      <AnimatePresence>
        {isLoaded && (
          <motion.div 
            style={{ 
              y: shouldReduceMotion ? 0 : yContent, 
              scale,
              opacity,
              willChange: "transform, opacity" 
            }}
            className="relative z-10 w-full flex flex-col items-center justify-center px-6 py-20"
          >
            {/* 1. Floating Badge Status */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8 md:mb-14"
            >
              <div className="px-5 py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-2xl flex items-center gap-3 shadow-2xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-cyan-400 opacity-40"></span>
                  <span className="relative h-2 w-2 rounded-full bg-cyan-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                  Systems Architect // 2026.V1
                </span>
              </div>
            </motion.div>
            
            {/* 2. Headline - Extreme Mobile Typography */}
            <div className="relative text-center mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center"
              >
                {/* DEWA & GIBRAN dengan ukuran sama besar di mobile */}
                <h1 className="flex flex-col items-center leading-[0.8] tracking-[-0.07em]">
                  <span className="text-white text-[22vw] md:text-[11vw] font-black uppercase">
                    DEWA
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-cyan-500/50 text-[22vw] md:text-[11vw] font-black uppercase italic mt-1 pr-2">
                    GIBRAN
                  </span>
                </h1>
                
                {/* Decorative Aurora behind name */}
                <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] -z-10 rounded-full opacity-50 select-none" />
              </motion.div>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ delay: 1, duration: 1.5 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-10 md:mt-14 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              />
            </div>

            {/* 3. Description & Functional Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.2 }}
              className="max-w-2xl text-center space-y-12"
            >
              <p className="text-white/40 text-[11px] md:text-xl font-light leading-relaxed tracking-widest uppercase italic px-4">
                Redefining <span className="text-white font-medium">Digital Frontiers</span> through autonomous logic and elite aesthetic engineering.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-lg mx-auto">
                {/* Tombol ke /archive */}
                <Link href="/archive" className="w-full sm:w-1/2">
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-sm transition-all relative group overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-500">Launch Project</span>
                    <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </motion.button>
                </Link>

                {/* Tombol ke WhatsApp */}
                <motion.button
                  onClick={handleWhatsApp}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-1/2 py-5 border border-white/10 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-sm transition-all"
                >
                  Establish Link
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollHUD smoothProgress={smoothProgress} />
      <TechnicalFrame />
    </section>
  );
}

// Sub-Component: Right Side HUD
function ScrollHUD({ smoothProgress }: { smoothProgress: any }) {
  return (
    <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-10 z-20">
      <div className="h-40 w-[1px] bg-white/5 relative">
        <motion.div 
          style={{ scaleY: smoothProgress }}
          className="absolute top-0 w-full bg-cyan-500 origin-top h-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" 
        />
      </div>
      <span className="text-[8px] font-mono text-cyan-500 uppercase tracking-[0.5em] rotate-90 whitespace-nowrap opacity-50">
        Progress // Trace
      </span>
    </div>
  );
}

// Sub-Component: Frame Elements (Professional Technical Look)
function TechnicalFrame() {
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none p-6 md:p-10">
      {/* Corner Accents */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-white/10" />
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-white/10" />
      
      {/* Real-time Meta-data (Professional Look) */}
      <div className="absolute bottom-10 left-10 hidden md:flex flex-col gap-2">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-[7px] text-white/20 uppercase tracking-widest font-mono">Location</span>
            <span className="text-[9px] text-white/50 font-mono">IDN // JKTA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] text-white/20 uppercase tracking-widest font-mono">Status</span>
            <span className="text-[9px] text-cyan-500 font-mono animate-pulse">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}