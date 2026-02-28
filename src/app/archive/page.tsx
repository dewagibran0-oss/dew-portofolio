"use client";

import React, { useState, useMemo, Suspense, memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring,
  useMotionValue, 
  useMotionTemplate 
} from "framer-motion";
import { 
  ArrowLeft, Search, Github, ExternalLink,
  ShieldCheck, Zap, Layers, Menu, Globe, Cpu, X
} from "lucide-react";

/**
 * 1. CORE DATA - Tetap menggunakan as const untuk Type Safety & Performance
 */
const PROJECT_DATA = [
  { id: "01", year: "2026", title: "My Portfolio", category: "Fullstack", tech: ["Next.js 15", "Tailwind", "Framer"], image: "/my-porto.png", githubUrl: "https://github.com/dewa", liveUrl: "https://dewa-gibran.dev", status: "Active", description: "Advanced digital architecture featuring high-precision motion geometry." },
  { id: "02", year: "2026", title: "KantinQ Smart", category: "Fullstack", tech: ["React", "MongoDB", "Midtrans"], image: "/kantinq.png", githubUrl: "https://github.com/dewa/kantinq", liveUrl: "https://kantinq.sembilanduadelapan.com/", status: "Beta", description: "Seamless point-of-sale infrastructure with biometric-ready payment protocols." },
  { id: "03", year: "2025", title: "Diva Ecosystem", category: "Fullstack", tech: ["Tailwind", "Next.Js", "Inertia"], image: "/divaphone.png", githubUrl: "https://github.com/dewagibran0-oss/Diva-Phone", liveUrl: "https://diva-phone.vercel.app/", status: "Active", description: "High-traffic retail platform optimized for mobile-first hardware distribution." },
  { id: "04", year: "2025", title: "DFS Tracker", category: "Fintech", tech: ["PHP", "PostgreSQL", "Tailwind"], image: "/dfs.png", githubUrl: "https://github.com/dewa/dfs-finance", liveUrl: "#", status: "Archived", description: "Internal fiscal intelligence tool for granular investment portfolio monitoring." },
  { id: "05", year: "2024", title: "MiniBank Core", category: "Fintech", tech: ["PHP", "Laravel", "MySQL"], image: "/bankmini.png", githubUrl: "https://github.com/dewa/minibank", liveUrl: "#", status: "Archived", description: "Educational simulation of core banking ledgers and transaction sync." },
  { id: "06", year: "2024", title: "Esa Jaya Labdagati", category: "Company", tech: ["HTML", "CSS", "JS"], image: "/ejl.png", githubUrl: "https://github.com/dewa/esa-jaya", liveUrl: "https://esajayalabdagati.com/", status: "Active", description: "Professional corporate interface for heavy industrial mining logistics." },
  { id: "07", year: "2024", title: "Sembilan Dua", category: "Company", tech: ["HTML", "CSS", "JS"], image: "/sdd.png", githubUrl: "https://github.com/dewa/928-trade", liveUrl: "https://sembilanduadelapan.com/", status: "Active", description: "Global trade portal facilitating multi-national shipping and currency." },
  { id: "08", year: "2023", title: "Pelayaran Tujuh", category: "Company", tech: ["HTML", "CSS", "JS"], image: "/pelayaran.jpg", githubUrl: "https://github.com/dewa/tujuh-tunas", liveUrl: "https://www.tujuhtunassatusamudera.com/", status: "Active", description: "Maritime enterprise solution for fleet management and cargo tracking." },
  { id: "09", year: "2023", title: "E-Commerce", category: "E-Commerce", tech: ["PHP", "MySQL", "Midtrans"], image: "/octa.jpg", githubUrl: "https://github.com/dewa/tujuh-tunas", liveUrl: "#", status: "Archived", description: "Full-scale E-commerce application with integrated payment gateway." },
  { id: "10", year: "2026", title: "TTSS Mobile Application", category: "Mobile", tech: ["Flutter", "Dart",], image: "/ttss-mobile.png", githubUrl: "https://github.com/dewa/tujuh-tunas", liveUrl: "#", status: "Active", description: "Maritime enterprise solution for fleet management and cargo tracking Mobile." }
] as const;

/**
 * 2. OPTIMIZED PROJECT CARD
 * Memisahkan interaksi hover berat ke level CSS/GPU untuk mencegah JS Main Thread Blocking.
 */
const ProjectCard = memo(({ project, index }: { project: typeof PROJECT_DATA[number]; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    // Only track mouse on large screens to save mobile CPU/Battery
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      className="group relative h-[480px] sm:h-[580px] w-full overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 will-change-transform transform-gpu"
    >
      {/* Dynamic Spotlight Effect - GPU Driven */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block"
        style={{
          background: useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.15), transparent 80%)`,
        }}
      />

      {/* Image Layer - Optimized with content-visibility */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index < 2}
          loading={index < 2 ? "eager" : "lazy"}
          className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.33, 1, 0.68, 1)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      <div className="absolute inset-0 z-10 p-7 sm:p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className={`px-4 py-1.5 rounded-full border text-[10px] font-mono font-bold uppercase backdrop-blur-xl transition-colors ${
            project.status === 'Active' ? 'border-cyan-500/30 text-cyan-400 bg-cyan-950/30' : 'border-zinc-700 text-zinc-500 bg-black/20'
          }`}>
            {project.status}
          </div>
          <div className="flex gap-3">
            <Link href={project.githubUrl} target="_blank" className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300">
              <Github size={18} />
            </Link>
            <Link href={project.liveUrl} target="_blank" className="p-3.5 rounded-2xl bg-cyan-500 text-black hover:scale-110 active:scale-95 transition-all duration-300">
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-cyan-500 font-bold tracking-[0.2em]">{project.year}</span>
              <div className="h-px w-6 bg-white/10" />
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">{project.category}</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed line-clamp-2 mt-4 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-5 border-t border-white/5">
            {project.tech.map((t) => (
              <span key={t} className="text-[9px] font-mono text-zinc-500 bg-white/[0.03] px-3 py-1 rounded-lg border border-white/5 uppercase">#{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
ProjectCard.displayName = "ProjectCard";

/**
 * 3. MAIN ARCHIVE INTERFACE
 */
function ArchiveContent() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const categories = ["All", "Fullstack", "E-Commerce", "Fintech", "Company", "Mobile"];

  // Memoized filter logic for zero-lag searching
  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    return PROJECT_DATA.filter(p => {
      const matchTab = activeTab === "All" || p.category === activeTab;
      if (!s) return matchTab;
      return matchTab && (
        p.title.toLowerCase().includes(s) || 
        p.tech.some(t => t.toLowerCase().includes(s)) ||
        p.category.toLowerCase().includes(s)
      );
    });
  }, [activeTab, search]);

  return (
    <div className="w-full space-y-12 sm:space-y-24">
      {/* Hero Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12">
        <div className="max-w-4xl space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-5">
            <div className="w-16 h-[2px] bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
            <span className="text-[12px] font-mono text-cyan-400 tracking-[0.6em] uppercase font-black">Archive.OS_v7.4</span>
          </motion.div>
          <h1 className="text-[clamp(3rem,12vw,9rem)] font-extrabold leading-[0.8] tracking-[ -0.05em] uppercase italic">
            DIGITAL <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-800">ASSETS.</span>
          </h1>
          <p className="text-zinc-500 text-base sm:text-xl max-w-2xl leading-relaxed font-medium">
            A curated ecosystem of high-performance infrastructures, fintech solutions, and corporate-grade systems engineered for the 2023—2026 digital era.
          </p>
        </div>
        
        {/* Stats Display */}
        <div className="hidden lg:flex gap-12 border-l border-white/10 pl-12 h-24 items-center">
            <div className="space-y-1">
                <span className="block text-5xl font-black text-white leading-none">{PROJECT_DATA.length}</span>
                <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em] font-bold">Deployments</span>
            </div>
            <div className="space-y-1">
                <span className="block text-5xl font-black text-white leading-none">04</span>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] font-bold">Verticals</span>
            </div>
        </div>
      </div>

      {/* STICKY FILTER BAR - Tuned for LCP and Layout stability */}
      <div className="sticky top-6 z-[150] flex flex-col lg:flex-row gap-4 p-3 rounded-[2rem] sm:rounded-[3rem] bg-zinc-950/90 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-1">
          {categories.map((cat) => (
            <button
              key={cat} onClick={() => setActiveTab(cat)}
              className={`relative px-7 sm:px-10 py-4 rounded-[1.5rem] text-[11px] font-mono uppercase tracking-widest font-black transition-all shrink-0 ${
                activeTab === cat ? "text-black" : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {activeTab === cat && (
                <motion.div layoutId="tab-pill" className="absolute inset-0 bg-cyan-400 rounded-[1.5rem] -z-10 shadow-[0_0_20px_rgba(34,211,238,0.4)]" transition={{ type: "spring", bounce: 0.25, duration: 0.5 }} />
              )}
              {cat}
            </button>
          ))}
        </div>
        <div className="relative flex-1 group">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-400 transition-colors duration-300" size={20} />
          <input 
            type="text" 
            placeholder="ACCESS_DATABASE_BY_TITLE_OR_STACK..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] sm:rounded-[2rem] py-5 sm:py-6 pl-16 pr-8 text-[11px] font-mono text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all placeholder:text-zinc-800"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Results Grid - Optimized for fast painting */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 pb-40">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.length > 0 ? (
            filtered.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="col-span-full py-40 text-center space-y-6"
            >
              <div className="inline-flex p-8 rounded-full bg-zinc-900 border border-white/5">
                <Search size={48} className="text-zinc-800 animate-pulse" />
              </div>
              <p className="font-mono text-zinc-600 text-sm tracking-[0.5em] uppercase">No_Matches_In_Current_Node</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * 4. ROOT ARCHITECTURE
 */
export default function ProjectArchiveV7() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-cyan-500/40 overflow-x-hidden font-sans antialiased">
      {/* Main Thread Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-600 via-cyan-400 to-blue-600 origin-left z-[300]" style={{ scaleX }} />
      
      {/* Ambient Background - Static (Better for GPU) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-cyan-600/[0.04] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/[0.04] blur-[150px] rounded-full" />
        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-100" />
      </div>

      <header className="relative z-[200] px-6 sm:px-16 py-10 sm:py-16 max-w-[1920px] mx-auto flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-5 sm:gap-7">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-[1.5rem] bg-zinc-900 border border-white/10 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
            <ArrowLeft size={22} className="group-hover:-translate-x-1.5 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-[0.5em] text-zinc-600 uppercase font-black">Node.Access</span>
            <span className="font-black text-2xl sm:text-3xl tracking-tighter">ZENITH<span className="text-cyan-500">.</span>ARC</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
            <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.3em] font-bold">Security_Protocol</span>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_12px_#06b6d4]" />
                    <span className="text-[12px] font-mono font-black text-white uppercase tracking-widest">SSL_ENCRYPTED</span>
                </div>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="flex gap-5 text-zinc-600">
                <Zap size={20} className="hover:text-cyan-400 transition-colors cursor-help" />
                <Cpu size={20} className="hover:text-cyan-400 transition-colors cursor-help" />
                <Globe size={20} className="hover:text-cyan-400 transition-colors cursor-help" />
            </div>
        </div>

        <button className="md:hidden p-4 rounded-2xl bg-zinc-900 border border-white/5">
            <Menu className="text-zinc-500" />
        </button>
      </header>

      <main className="relative z-10 px-6 sm:px-16 max-w-[1920px] mx-auto">
        <Suspense fallback={
            <div className="h-[70vh] flex flex-col items-center justify-center gap-8">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-cyan-500/10 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin" />
                </div>
                <div className="space-y-2 text-center">
                    <span className="block text-[11px] font-mono text-cyan-400 uppercase tracking-[1.5em] animate-pulse">Synchronizing</span>
                    <span className="block text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Fetching data from main server...</span>
                </div>
            </div>
        }>
          <ArchiveContent />
        </Suspense>
      </main>

      <footer className="relative z-[100] border-t border-white/5 mt-20 bg-zinc-950/50 backdrop-blur-xl">
          <div className="max-w-[1920px] mx-auto px-6 sm:px-16 py-14 flex flex-col lg:flex-row justify-between items-center gap-10">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <ShieldCheck size={16} className="text-cyan-500" />
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold">Encrypted_Vault</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <Zap size={16} className="text-amber-500" />
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold">Vercel_Edge_Global</span>
                  </div>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed">
                    © 2026 Developed by <span className="text-white font-bold">Dewa Gibran</span> <br />
                    <span className="text-zinc-700">Proprietary Architecture — All Rights Reserved</span>
                </p>
              </div>
          </div>
      </footer>

      {/* Global Optimization Styles */}
      <style jsx global>{`
        /* Kill all potential scroll jank */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        * {
          -webkit-tap-highlight-color: transparent;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        body { 
          -webkit-font-smoothing: antialiased; 
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          scrollbar-gutter: stable;
        }

        /* Image loading optimization */
        img { 
          content-visibility: auto; 
          image-rendering: -webkit-optimize-contrast;
        }
        
        /* Smooth scale for framer motion */
        .transform-gpu {
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </div>
  );
}