"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  Copy, Check, Code2, Eye, Sparkles, Menu, X, ChevronLeft, Layout, 
  MousePointer2, Zap, Smartphone, Monitor, Github, Twitter, 
  ExternalLink, Command, Layers, Palette, Boxes, Cpu, 
  ShieldCheck, Rocket, Fingerprint, Share2, MessageSquare, ArrowRight,
  Search, Terminal, Globe, ZapOff, Play, Activity, Radio, Lock
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- Types & Schema Definition ---
type ComponentItem = {
  id: string;
  title: string;
  description: string;
  code: string;
  tag: string;
  features: string[];
  previewContent: React.ReactNode;
};

type RegistrySection = {
  category: string;
  icon: React.ReactNode;
  items: ComponentItem[];
};

// --- Enterprise Component Registry (The Content Engine) ---
// --- Enterprise Component Registry (Mega Expansion v5.0) ---
const componentRegistry: RegistrySection[] = [
  {
    category: "Neural & Security",
    icon: <Cpu size={14} />,
    items: [
      {
        id: "orbital-button",
        title: "Orbital Kinetic Button",
        tag: "Interaction",
        features: ["Magnetic Interaction", "GPU Layering", "Haptic Feedback"],
        description: "Tombol interaktif dengan sistem bayangan dinamis yang merespons posisi kursor secara real-time.",
        previewContent: (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[2rem] font-black tracking-tighter overflow-hidden shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <span className="relative z-10 flex items-center gap-3 italic">INITIALIZE CORE <Rocket size={20} className="group-hover:rotate-45 transition-transform duration-500"/></span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.button>
        ),
        code: `<motion.button whileHover={{ scale: 1.05 }}>...</motion.button>`,
      },
      {
        id: "biometric-scanner",
        title: "Bio-Scan Interface",
        tag: "Security",
        features: ["SVG Masking", "Neural Animation", "Glitch FX"],
        description: "Antarmuka otentikasi biometrik dengan laser pemindai sinkron.",
        previewContent: (
          <div className="relative p-12 bg-white/[0.03] rounded-[3rem] border border-white/10 overflow-hidden group flex flex-col items-center">
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-blue-500 shadow-[0_0_20px_#3b82f6] z-20"
            />
            <Fingerprint size={80} className="text-blue-500/40 group-hover:text-blue-400 transition-colors duration-500" />
            <span className="mt-4 text-[10px] font-black text-blue-500 tracking-[0.4em] uppercase">Authenticating...</span>
          </div>
        ),
        code: `<div className="scanner">...</div>`,
      },
      {
        id: "security-shield",
        title: "Shield Defense Node",
        tag: "Safety",
        features: ["Rotation Matrix", "Inner Glow", "State Toggle"],
        description: "Visualisasi perisai keamanan yang berputar untuk melindungi aset digital.",
        previewContent: (
          <div className="relative flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute w-40 h-40 border-2 border-dashed border-blue-500/30 rounded-full"
            />
            <div className="relative p-8 bg-blue-600 rounded-full shadow-[0_0_50px_rgba(37,99,235,0.5)]">
              <ShieldCheck size={40} className="text-white" />
            </div>
          </div>
        ),
        code: `<motion.div animate={{ rotate: 360 }}>...</motion.div>`,
      }
    ]
  },
  {
    category: "Quantum Command",
    icon: <Terminal size={14} />,
    items: [
      {
        id: "cyber-terminal",
        title: "Ghost Terminal",
        tag: "System",
        features: ["Typewriter FX", "Caret Pulse", "Monospace Aesthetic"],
        description: "Konsol perintah minimalis dengan efek pengetikan otomatis bergaya agen rahasia.",
        previewContent: (
          <div className="w-80 bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 font-mono text-sm shadow-2xl">
            <div className="flex gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <p className="text-blue-400">$ <span className="text-white">nexus --deploy --v5</span></p>
            <p className="text-slate-500 mt-2 italic">{">"} Injecting neural patterns...</p>
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-blue-500 ml-1"
            />
          </div>
        ),
        code: `<div className="terminal">...</div>`,
      },
      {
        id: "radar-sweep",
        title: "System Radar Sweep",
        tag: "Tracking",
        features: ["Conic Gradient", "Ping Animation", "Map Overlay"],
        description: "Pemindaian radar aktif untuk mendeteksi intrusi atau aktivitas jaringan.",
        previewContent: (
          <div className="relative w-48 h-48 rounded-full bg-blue-900/10 border border-blue-500/20 overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,rgba(59,130,246,0.4)_100%)]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-full h-[1px] bg-blue-500/20" />
               <div className="absolute h-full w-[1px] bg-blue-500/20" />
            </div>
            <motion.div 
              animate={{ scale: [0, 2], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full"
            />
          </div>
        ),
        code: `<div className="radar">...</div>`,
      }
    ]
  },
  {
    category: "Navigation Matrix",
    icon: <Layers size={14} />,
    items: [
      {
        id: "magnetic-dock",
        title: "Floating Nexus Dock",
        tag: "Navigation",
        features: ["Glassmorphism", "Hover Scaling", "Dynamic Blur"],
        description: "Navigasi bar premium yang melayang dengan efek perbesaran ikon.",
        previewContent: (
          <div className="flex gap-3 p-3 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl shadow-3xl">
            {[Globe, Terminal, Cpu, MessageSquare].map((Icon, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8, scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="p-4 rounded-2xl cursor-pointer text-blue-400 hover:text-white transition-colors"
              >
                <Icon size={20} />
              </motion.div>
            ))}
          </div>
        ),
        code: `<div className="nexus-dock">...</div>`,
      },
      {
        id: "liquid-tab",
        title: "Liquid Tab Switcher",
        tag: "Selection",
        features: ["Layout Projection", "Spring Physics", "Minimalist"],
        description: "Sistem navigasi tab dengan transisi latar belakang yang mulus seperti cairan.",
        previewContent: (
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
            {["DATA", "CORE", "SCAN"].map((text) => (
              <button key={text} className="px-6 py-2 text-[10px] font-black text-slate-400 hover:text-white transition-colors relative">
                {text}
                {text === "CORE" && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-[0_0_15px_#2563eb]" />
                )}
              </button>
            ))}
          </div>
        ),
        code: `<motion.div layoutId="activeTab" />`,
      }
    ]
  },
  {
    category: "Data Visualization",
    icon: <Activity size={14} />,
    items: [
      {
        id: "plasma-pulse",
        title: "Plasma Pulse Node",
        tag: "Activity",
        features: ["Ping FX", "Neon Glow", "Sync Status"],
        description: "Indikator detak jantung sistem untuk monitoring real-time.",
        previewContent: (
          <div className="flex items-center gap-6 p-8 bg-blue-950/20 rounded-[2.5rem] border border-blue-500/20">
            <div className="relative">
               <motion.div 
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 bg-blue-500 rounded-full"
               />
               <div className="relative w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6]" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black italic tracking-widest text-xs uppercase">Core Syncing</span>
              <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">98.2% Stability</span>
            </div>
          </div>
        ),
        code: `<div className="pulse">...</div>`,
      },
      {
        id: "dynamic-bars",
        title: "Neural Audio Visualizer",
        tag: "Creative",
        features: ["Auto-height", "Gradient Fill", "Staggered Delay"],
        description: "Visualisasi frekuensi audio atau data masukan yang sangat halus.",
        previewContent: (
          <div className="flex items-end gap-1.5 h-20">
            {[20, 50, 80, 40, 90, 60, 30, 70, 45, 85].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [`${h}%`, "10%", `${h}%`] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.05 }}
                className="w-2 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-full"
              />
            ))}
          </div>
        ),
        code: `<div className="visualizer">...</div>`,
      }
    ]
  }
];

// --- Sub-Components ---
const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-[2rem] ${className}`}>
    {children}
  </div>
);

const NavItem = ({ active, onClick, item }: { active: boolean; onClick: () => void; item: ComponentItem }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-5 py-4 rounded-xl text-sm transition-all relative group overflow-hidden ${
      active ? "text-white font-bold" : "text-slate-500 hover:text-slate-300"
    }`}
  >
    {active && (
      <motion.div layoutId="navActive" className="absolute inset-0 bg-blue-600/10 border border-blue-500/20 rounded-xl" />
    )}
    <span className="relative z-10 flex items-center justify-between">
      {item.title}
      <ArrowRight size={14} className={`${active ? 'opacity-100' : 'opacity-0'} transition-all`} />
    </span>
  </button>
);

// --- Main Engine ---
export default function UIComponentsEngine() {
  const router = useRouter();
  const [activeId, setActiveId] = useState("kinetic-button");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const activeItem = useMemo(() => 
    componentRegistry.flatMap(s => s.items).find(i => i.id === activeId), 
  [activeId]);

  const handleCopy = useCallback(() => {
    if (!activeItem) return;
    navigator.clipboard.writeText(activeItem.code);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  }, [activeItem]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-400 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-blue-600 z-[100] origin-left shadow-[0_0_15px_#2563eb]" style={{ scaleX }} />

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full" />
      </div>

      {/* Header Section */}
      <header className="h-20 border-b border-white/5 flex items-center px-6 lg:px-12 sticky top-0 bg-[#020617]/80 backdrop-blur-xl z-[60] justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col">
             <h1 className="text-white font-black tracking-tighter text-xl italic uppercase">
               DEWA<span className="text-blue-500">.</span>LAB
             </h1>
             <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em]">ENGINEERING DESIGN v6.0</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
    <div className="flex flex-col items-end">
        <span className="text-[9px] font-black text-blue-500 tracking-widest uppercase">Available for projects</span>
        <span className="text-xs font-bold text-green-500 flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> READY_TO_HIRE
        </span>
    </div>
    
    <a 
        href="https://wa.me/62881025020924" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2 px-6 py-2.5 bg-white text-black text-xs font-black rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
    >
        <MessageSquare size={14} className="group-hover:rotate-12 transition-transform" />
        HIRE ME
        <div className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </div>
    </a>
</div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-white">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-20 z-50 w-72 h-[calc(100vh-80px)] 
          bg-[#020617] lg:bg-transparent border-r border-white/5 
          transition-transform duration-500
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-8 h-full overflow-y-auto custom-scrollbar">
            {componentRegistry.map((section) => (
              <div key={section.category} className="mb-10">
                <div className="flex items-center gap-3 mb-6 px-2">
                  <div className="p-1.5 bg-blue-500/10 rounded text-blue-500">{section.icon}</div>
                  <h4 className="text-[10px] uppercase tracking-[3px] font-black text-slate-500">{section.category}</h4>
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <NavItem 
                      key={item.id} 
                      item={item} 
                      active={activeId === item.id} 
                      onClick={() => { setActiveId(item.id); setIsSidebarOpen(false); }} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 bg-[#010410]/50 p-6 lg:p-12">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 xl:grid-cols-12 gap-8"
              >
                {/* Left Column: Info */}
                <div className="xl:col-span-4 space-y-8">
                  <div>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-black rounded-full border border-blue-500/20 uppercase tracking-widest">
                      {activeItem?.tag}
                    </span>
                    <h2 className="text-5xl lg:text-7xl font-black text-white mt-4 tracking-tighter italic uppercase leading-none">
                      {activeItem?.title.split(' ')[0]}<br/>
                      <span className="text-blue-500 not-italic">{activeItem?.title.split(' ')[1]}</span>
                    </h2>
                  </div>

                  <p className="text-lg text-slate-500 leading-relaxed border-l-2 border-blue-600 pl-6 italic">
                    {activeItem?.description}
                  </p>

                  <div className="space-y-3">
                    {activeItem?.features.map(f => (
                      <div key={f} className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                        <Zap size={14} className="text-blue-500" /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Preview & Code */}
                <div className="xl:col-span-8 space-y-8">
                  {/* Preview Stage */}
                  <GlassCard className="p-1 overflow-hidden relative group">
                    <div className="bg-black/40 p-4 border-b border-white/5 flex justify-between items-center">
                       <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" /> LIVE_PREVIEW
                       </div>
                       <div className="flex bg-white/5 p-1 rounded-xl">
                          <button onClick={() => setViewMode("desktop")} className={`p-2 rounded-lg ${viewMode === "desktop" ? "bg-blue-600 text-white" : ""}`}><Monitor size={14}/></button>
                          <button onClick={() => setViewMode("mobile")} className={`p-2 rounded-lg ${viewMode === "mobile" ? "bg-blue-600 text-white" : ""}`}><Smartphone size={14}/></button>
                       </div>
                    </div>
                    <motion.div 
                      animate={{ width: viewMode === "mobile" ? 360 : "100%" }}
                      className="h-[450px] mx-auto flex items-center justify-center relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden"
                    >
                      <div className="relative z-10 scale-125">
                         {activeItem?.previewContent}
                      </div>
                    </motion.div>
                  </GlassCard>

                  {/* Code Editor */}
                  <div className="rounded-[2rem] bg-black/60 border border-white/10 overflow-hidden">
                    <div className="px-8 py-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 tracking-[3px] uppercase">
                          <Terminal size={14} /> SOURCE_MANIFEST
                       </div>
                       <button onClick={handleCopy} className="text-[10px] font-black hover:text-white transition-colors flex items-center gap-2">
                          {copyStatus ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                          {copyStatus ? "SYNCED" : "CLONE SOURCE"}
                       </button>
                    </div>
                    <pre className="p-8 font-mono text-sm text-blue-400/70 overflow-x-auto custom-scrollbar italic leading-relaxed">
                      <code>{activeItem?.code}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Global CSS for Smoothness */}
    </div>
  );
}