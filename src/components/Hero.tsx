"use client";

import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import HeroScene from "./HeroScene";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mencegah hydration error di Next.js
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Spring smooth scroll values untuk motion yang mewah
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  // Parallax & Cinematic Transformations
  const yContent = useTransform(smoothProgress, [0, 1], [0, 400]);
  const opacityContent = useTransform(smoothProgress, [0, 0.8], [1, 0]);
  const scaleContent = useTransform(smoothProgress, [0, 1], [1, 0.85]);
  const blurContent = useTransform(smoothProgress, [0, 0.4], ["blur(0px)", "blur(12px)"]);

  // --- Handlers ---
  
  // 1. Launch Projects: Scroll ke section Projects
  const handleLaunchProjects = () => {
    const projectSection = document.getElementById("projects-section");
    if (projectSection) {
      projectSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback jika ID belum ada, scroll ke bawah 100vh
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  // 2. Get In Touch: Redirect ke Email/WhatsApp
  const handleContact = () => {
    // Bisa diganti dengan link WhatsApp: https://wa.me/nomoranda
    window.location.href = "https://wa.me/62881025020924";
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#020617] cursor-default"
      aria-label="Hero Section"
    >
      {/* 1. Texture Layer: Grain & Shimmer */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 opacity-30" />
      </div>

      {/* 2. WebGL Background Layer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
      >
        <HeroScene />
      </motion.div>

      {/* 3. Adaptive Content Layer */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div 
            style={{ y: yContent, opacity: opacityContent, scale: scaleContent, filter: blurContent }}
            className="relative z-10 text-center px-6 max-w-7xl mx-auto flex flex-col items-center"
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mb-8"
            >
              <span className="relative px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-cyan-400 font-mono tracking-[0.4em] text-[9px] md:text-[11px] uppercase overflow-hidden group inline-block">
                <span className="relative z-10">Digital & System Designer</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </span>
            </motion.div>
            
            {/* Headline */}
            <div className="relative mb-10 select-none">
              <div className="overflow-hidden py-2">
                <motion.h1 
                  initial={{ y: "110%", skewY: 7 }}
                  animate={{ y: 0, skewY: 0 }}
                  transition={{ delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(3rem,14vw,9.5rem)] font-bold leading-[0.8] tracking-[-0.06em] text-white"
                >
                  DEWA GIBRAN
                </motion.h1>
              </div>
              
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.8, duration: 1.2, ease: "circOut" }}
                className="h-[1px] w-40 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-6"
              />
            </div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="max-w-2xl mx-auto text-gray-400 text-base md:text-xl font-light leading-relaxed tracking-tight mb-14 px-4"
            >
              Building high-performance <span className="text-white font-medium italic">digital ecosystems</span> 
              <br className="hidden md:block" /> with surgical precision and immersive interactivity.
            </motion.p>

            {/* CTA: High-End Button System */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto">
              <motion.button
                onClick={handleLaunchProjects}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-64 py-5 bg-white text-black font-bold text-[10px] uppercase tracking-[0.3em] rounded-full overflow-hidden transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-10">Launch Projects</span>
                <motion.div 
                  className="absolute inset-0 bg-cyan-500"
                  initial={{ x: "-101%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                />
              </motion.button>
              
              <motion.button
                onClick={handleContact}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-64 py-5 border border-white/10 backdrop-blur-xl rounded-full font-bold text-white text-[10px] uppercase tracking-[0.3em] transition-all"
              >
                Get In Touch
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Scroll Visualizers */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 pointer-events-none"
      >
        <span className="text-[9px] font-mono tracking-[0.8em] uppercase text-gray-500">Discover</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" 
        />
      </motion.div>

      {/* Left Vertical Indicator */}
      <div className="absolute left-8 bottom-12 hidden lg:flex flex-col items-start gap-4 h-40">
        <div className="w-[1px] flex-1 bg-white/5 relative">
          <motion.div 
            style={{ scaleY: smoothProgress }}
            className="absolute top-0 w-full bg-cyan-500 origin-top h-full shadow-[0_0_15px_#22d3ee]" 
          />
        </div>
        <span className="text-[9px] font-mono text-cyan-500 vertical-text rotate-180 uppercase tracking-widest">
          Scroll Progress
        </span>
      </div>
    </section>
  );
}