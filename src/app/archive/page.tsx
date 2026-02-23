"use client";

import React, { useState, useMemo, Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { 
  motion, 
  AnimatePresence, 
  LayoutGroup, 
  useScroll, 
  useSpring,
  useMotionValue, 
  useMotionTemplate 
} from "framer-motion";
import { 
  ArrowLeft, Search, Github, ExternalLink,
  Hash, Activity, Cpu, Globe, Monitor, 
  Smartphone, ShieldCheck, Zap, Layers,
  LayoutGrid, ListFilter, Command, Menu
} from "lucide-react";

// --- FOOTER IMPORT ---
import XSystemsFooterV2 from "@/components/PremiumFooter"; 

/**
 * 1. CORE DATA ENGINE
 */
interface Project {
  id: string;
  year: string;
  title: string;
  client: string;
  category: "Fullstack" | "E-Commerce" | "Fintech" | "Company" | "Financial Tool";
  tech: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  status: "Active" | "Beta" | "Archived";
  description: string;
}

const PROJECT_DATA: Project[] = [
  { id: "01", year: "2026", title: "My Portfolio", client: "Personal", category: "Fullstack", tech: ["Next.js 15", "Tailwind", "Framer"], image: "/my-porto.png", githubUrl: "https://github.com/dewa", liveUrl: "https://dewa-gibran.dev", status: "Active", description: "Advanced digital architecture featuring high-precision motion geometry and atomic design." },
  { id: "02", year: "2026", title: "KantinQ Smart", client: "Institutional", category: "Fullstack", tech: ["React", "MongoDB", "Midtrans"], image: "/kantinq.png", githubUrl: "https://github.com/dewa/kantinq", liveUrl: "https://kantinq.sembilanduadelapan.com/", status: "Beta", description: "Seamless point-of-sale infrastructure with integrated biometric-ready payment protocols." },
  { id: "03", year: "2025", title: "Diva Ecosystem", client: "Retail Business", category: "E-Commerce", tech: ["Laravel", "MySQL", "Inertia"], image: "/divaphone.png", githubUrl: "https://github.com/dewagibran0-oss/Diva-Phone", liveUrl: "https://diva-phone.vercel.app/", status: "Active", description: "High-traffic retail platform optimized for mobile-first consumer hardware distribution." },
  { id: "04", year: "2025", title: "DFS Tracker", client: "Self Project", category: "Financial Tool", tech: ["PHP", "PostgreSQL", "Tailwind"], image: "/dfs.png", githubUrl: "https://github.com/dewa/dfs-finance", liveUrl: "#", status: "Archived", description: "Internal fiscal intelligence tool designed for granular investment portfolio monitoring." },
  { id: "05", year: "2024", title: "MiniBank Core", client: "Educational", category: "Fintech", tech: ["PHP", "Laravel", "MySQL"], image: "/bankmini.png", githubUrl: "https://github.com/dewa/minibank", liveUrl: "#", status: "Archived", description: "Educational simulation of core banking ledgers and transaction synchronization." },
  { id: "06", year: "2024", title: "Esa Jaya Labdagati", client: "Mining Corp", category: "Company", tech: ["HTML", "CSS", "JS"], image: "/ejl.png", githubUrl: "https://github.com/dewa/esa-jaya", liveUrl: "https://esajayalabdagati.com/", status: "Active", description: "Professional corporate interface for heavy industrial mining and supply chain logistics." },
  { id: "07", year: "2024", title: "Sembilan Dua", client: "Trading House", category: "Company", tech: ["HTML", "CSS", "JS"], image: "/sdd.png", githubUrl: "https://github.com/dewa/928-trade", liveUrl: "https://sembilanduadelapan.com/", status: "Active", description: "Global trade portal facilitating multi-national shipping and currency integration." },
  { id: "08", year: "2023", title: "Pelayaran Tujuh", client: "Shipping Co", category: "Company", tech: ["HTML", "CSS", "JS"], image: "/pelayaran.jpg", githubUrl: "https://github.com/dewa/tujuh-tunas", liveUrl: "https://www.tujuhtunassatusamudera.com/", status: "Active", description: "Maritime enterprise solution for fleet management and cargo tracking identity." },
  { id: "09", year: "2023", title: "Octa Investama", client: "Trading", category: "Company", tech: ["HTML", "CSS", "JS"], image: "/octa.jpg", githubUrl: "https://github.com/dewa/tujuh-tunas", liveUrl: "#", status: "Archived", description: "Corporate digital asset for a financial trading house focusing on compliance." }
];

/**
 * 2. PREMIUM UI COMPONENTS
 */

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      className="group relative h-[520px] sm:h-[600px] w-full overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-zinc-950 border border-white/[0.05] hover:border-cyan-500/30 transition-all duration-500"
    >
      {/* Interactive Light FX (Desktop Only) */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block"
        style={{
          background: useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.12), transparent 80%)`,
        }}
      />

      {/* Media Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-40 group-hover:opacity-70 scale-[1.02] group-hover:scale-110 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
      </div>

      {/* Info Layer */}
      <div className="absolute inset-0 z-10 p-6 sm:p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
             <div className={`px-3 py-1 rounded-full border text-[9px] font-mono tracking-widest uppercase backdrop-blur-md ${
               project.status === 'Active' ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' : 'border-zinc-700 text-zinc-500 bg-zinc-900/50'
             }`}>
               {project.status}
             </div>
             <div className="text-[10px] font-mono text-zinc-600">ID_{project.id}</div>
          </div>
          
          <div className="flex gap-2">
            <Link href={project.githubUrl} target="_blank" className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/50 border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all">
              <Github size={18} />
            </Link>
            <Link href={project.liveUrl} target="_blank" className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-cyan-500 text-black shadow-xl hover:bg-white transition-all">
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2 sm:space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-cyan-500 font-bold uppercase tracking-[0.3em]">{project.year}</span>
              <div className="h-px w-8 bg-cyan-500/30" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">{project.category}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-none tracking-tighter uppercase transition-all group-hover:tracking-normal">
               {project.title}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-[300px] leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-4 sm:pt-6 border-t border-white/[0.05]">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="text-[8px] sm:text-[9px] font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                #{t}
              </span>
            ))}
            {project.tech.length > 3 && <span className="text-[9px] font-mono text-zinc-700">+{project.tech.length - 3}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * 3. MAIN ARCHIVE INTERFACE
 */
function ArchiveContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("category") || "All");
  const [search, setSearch] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const categories = ["All", "Fullstack", "E-Commerce", "Fintech", "Company"];

  const filtered = useMemo(() => {
    return PROJECT_DATA.filter(p => {
      const matchTab = activeTab === "All" || p.category === activeTab;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchTab && matchSearch;
    });
  }, [activeTab, search]);

  return (
    <div className="w-full space-y-12 sm:space-y-24">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6 sm:mb-10">
            <div className="w-10 sm:w-16 h-px bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,1)]" />
            <span className="text-[10px] font-mono text-cyan-500 tracking-[0.6em] uppercase font-black">Archive_v7.0</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(2.5rem,10vw,10rem)] font-black leading-[0.9] tracking-tighter uppercase mb-6"
          >
            Digital <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-500 to-zinc-900">Dynamics.</span>
          </motion.h1>
          <p className="text-zinc-500 text-sm sm:text-base font-medium max-w-xl leading-relaxed">
            A high-performance catalog of engineering solutions, architectural patterns, and full-stack ecosystems developed between 2023—2026.
          </p>
        </div>

        {/* Dynamic Counter HUD */}
        <div className="hidden lg:flex gap-12 border-l border-white/10 pl-12 h-24 items-center">
            <div className="text-center">
                <span className="block text-4xl font-black text-white">{PROJECT_DATA.length}</span>
                <span className="text-[9px] font-mono text-zinc-600 tracking-widest uppercase">Nodes</span>
            </div>
            <div className="text-center">
                <span className="block text-4xl font-black text-white">04</span>
                <span className="text-[9px] font-mono text-zinc-600 tracking-widest uppercase">Sectors</span>
            </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="sticky top-4 sm:top-8 z-50 flex flex-col xl:flex-row gap-4 p-2 sm:p-4 rounded-3xl bg-zinc-950/80 backdrop-blur-2xl border border-white/[0.05] shadow-2xl">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar snap-x touch-pan-x gap-2 p-1"
        >
          {categories.map((cat) => (
            <button
              key={cat} onClick={() => setActiveTab(cat)}
              className={`relative flex-shrink-0 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-[10px] font-mono uppercase tracking-widest font-black transition-all snap-start ${
                activeTab === cat ? "text-black" : "text-zinc-500 hover:text-white"
              }`}
            >
              {activeTab === cat && (
                <motion.div layoutId="tab-active" className="absolute inset-0 bg-cyan-400 rounded-2xl -z-10" />
              )}
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-cyan-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH_REPOSITORY..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/[0.03] rounded-2xl py-4 sm:py-5 pl-16 pr-6 text-[11px] font-mono tracking-widest text-white focus:outline-none focus:border-cyan-500/30 transition-all"
          />
        </div>
      </div>

      {/* Responsive Grid */}
      <LayoutGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-10 pb-40">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
}

/**
 * 4. ROOT LAYOUT ARCHITECTURE
 */
export default function ProjectArchiveV7() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-cyan-500/40 overflow-x-hidden">
      
      {/* Global Scroll HUD */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 via-cyan-400 to-blue-600 origin-left z-[200]" style={{ scaleX }} />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-full h-full bg-cyan-500/[0.02] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-full h-full bg-blue-600/[0.02] blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Main Navigation */}
      <header className="relative z-[100] px-6 sm:px-12 py-8 sm:py-12 max-w-[1800px] mx-auto flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-4 sm:gap-6">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/[0.08] group-hover:border-cyan-500/50 transition-all duration-500">
             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
             <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] font-mono tracking-[0.5em] text-zinc-600 uppercase">Core_System</span>
            <span className="text-base sm:text-xl font-black tracking-widest uppercase">ZENITH.ARC</span>
          </div>
        </Link>
        
        <div className="hidden sm:flex items-center gap-10">
          <div className="flex flex-col items-end">
             <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">Network_Stability</span>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]" />
                <span className="text-[10px] font-mono font-bold">NODE_01_CONNECTED</span>
             </div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="flex gap-3">
             <Zap size={16} className="text-zinc-700" />
             <Layers size={16} className="text-zinc-700" />
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          <Menu className="text-zinc-500" />
        </div>
      </header>

      {/* Content Entry */}
      <main className="relative z-10 px-6 sm:px-12 max-w-[1800px] mx-auto pt-10 sm:pt-20">
        <Suspense fallback={
          <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
            <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[1em] animate-pulse">Initializing_Archives</span>
          </div>
        }>
          <ArchiveContent />
        </Suspense>
      </main>

      {/* Static HUD Elements (Desktop Only) */}
      <aside className="fixed bottom-12 left-12 z-[100] hidden 2xl:flex flex-col items-center gap-10">
        <div className="h-32 w-px bg-gradient-to-t from-cyan-500/40 via-zinc-800 to-transparent" />
        <span className="text-[9px] font-mono text-cyan-500 [writing-mode:vertical-rl] uppercase tracking-[1em] font-black opacity-40">System_Flow</span>
      </aside>

      <div className="fixed bottom-12 right-12 z-[100] hidden xl:flex flex-col items-end gap-3">
        <div className="px-6 py-3 bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-6 shadow-2xl">
           <div className="flex items-center gap-3">
              <ShieldCheck size={14} className="text-cyan-500" />
              <span className="text-[9px] font-mono font-bold text-zinc-400">ENCRYPTED_V7</span>
           </div>
           <div className="w-px h-4 bg-zinc-800" />
           <div className="text-[9px] font-mono text-zinc-600">© 2026_BUILD</div>
        </div>
      </div>

      {/* Footer Interface */}
      <XSystemsFooterV2 />

      {/* Global CSS for Smooth Experience */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        body {
          scrollbar-color: #18181b #030303;
          scrollbar-width: thin;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        ::selection {
          background: rgba(6, 182, 212, 0.3);
          color: white;
        }

        /* Fluid Layout adjustments */
        @media (max-width: 640px) {
          .sticky { top: 1rem !important; }
        }
      `}} />
    </div>
  );
}