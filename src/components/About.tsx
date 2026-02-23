"use client";

import React, { useRef, useMemo, useState } from "react";
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
  DownloadIcon, // Ganti ke Download icon
  Globe2, 
  Sparkles,
  Mail,
  Zap,
  Shapes,
  FileText,
  CheckCircle2
} from "lucide-react";

// --- Types ---
interface StatCardProps {
  label: string;
  value: string;
  suffix: string;
  icon: React.ReactNode;
  delay: number;
}

// --- Sub-Component: 3D Photo Architect ---
const Photo3D = ({ isInView }: { isInView: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, perspective: 1500 }}
      className="relative lg:col-span-5 z-20"
    >
      <div className="absolute -inset-2 bg-gradient-to-br from-secondary/30 via-transparent to-purple-500/20 rounded-[3rem] blur-2xl opacity-50" />
      
      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#0A0A0C] border border-white/10 group">
        <Image
          src="/profile.jpg" // Pastikan file ada di folder public
          alt="Dewa Gibran Digital Architect"
          fill
          className="object-cover transition-transform duration-1000 scale-110 group-hover:scale-105 filter grayscale-[0.2] group-hover:grayscale-0"
          priority
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent z-20"
        />

        <div className="absolute bottom-8 inset-x-8 p-6 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:rotate-[360deg] transition-transform duration-1000">
              <Globe2 size={22} className="text-secondary" />
            </div>
            <div>
              <p className="text-white font-bold text-base tracking-tight">Dewa Gibran</p>
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Base: Jakarta, IDN</p>
            </div>
          </div>
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
    className="relative p-8 rounded-[2rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 group hover:border-secondary/30 transition-colors"
  >
    <div className="text-zinc-600 group-hover:text-secondary transition-colors mb-4">
      {icon}
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-4xl font-black text-white tracking-tighter">{value}</span>
      <span className="text-secondary font-bold text-xl">{suffix}</span>
    </div>
    <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.2em] mt-1">{label}</p>
  </motion.div>
);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

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
    { label: "Elite Projects", value: "24", suffix: "+", icon: <Zap size={20} /> },
    { label: "Systems Built", value: "15", suffix: "Pro", icon: <Shapes size={20} /> },
    { label: "Design Accuracy", value: "100", suffix: "%", icon: <Sparkles size={20} /> },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-32 md:py-64 bg-[#020202] overflow-hidden"
      id="about"
    >
      {/* Background Kinetic Text */}
      <motion.div 
        style={{ x: bgTextX }}
        className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none z-0"
      >
        <h2 className="text-[30vw] font-black text-white/[0.02] leading-none uppercase tracking-tighter italic">
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
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-secondary font-mono text-[10px] uppercase tracking-[0.3em] font-bold">About Architect</span>
                </div>
                
                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                  Crafting <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">
                    Digital Soul.
                  </span>
                </h2>

                <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                  Bukan sekadar kode. Saya membangun <span className="text-white font-medium italic">ekosistem digital</span> yang menggabungkan presisi teknis dengan estetika premium yang tak lekang oleh waktu.
                </p>
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
                    isDownloaded ? 'bg-emerald-500 text-white' : 'bg-white text-black'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isDownloading ? "Analysing System..." : isDownloaded ? "CV Acquired" : "Download Resume"}
                    {isDownloaded ? <CheckCircle2 size={18} /> : <FileText size={18} className="group-hover:rotate-12 transition-transform" />}
                  </span>
                  
                  {/* Progress Bar Background */}
                  {isDownloading && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="absolute inset-0 bg-secondary/20"
                    />
                  )}
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </motion.button>

                <div className="flex items-center gap-5 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-secondary transition-colors">
                    <Mail size={16} className="text-zinc-500 group-hover:text-secondary" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Inquiry</p>
                    <p className="text-white font-bold group-hover:text-secondary transition-colors">dewagibran0@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Finishing Texture Layer */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}