"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Terminal, Layers, Cpu, ChevronRight, Search, 
  Github, Menu, X, Copy, Check, Hash, Lightbulb, Info, 
  ArrowLeft, Sparkles, Command, Globe
} from "lucide-react";
import Link from "next/link";

// --- Types ---
interface DocItem {
  id: string;
  title: string;
  description: string;
  content: string;
  code?: string;
  language?: string;
}

interface DocSection {
  category: string;
  icon: React.ReactNode;
  items: DocItem[];
}

// --- Premium Data Structure ---
const docsData: DocSection[] = [
  {
    category: "Dasar & Inisialisasi",
    icon: <Terminal size={18} className="text-blue-400" />,
    items: [
      { 
        id: "intro", 
        title: "Introduction", 
        description: "Visi arsitektur portofolio digital generasi masa depan.",
        content: "Proyek ini dirancang sebagai standar emas pengembangan portofolio modern. Menggabungkan kecepatan rendering Next.js 16 dengan estetika visual yang mendalam untuk menciptakan impresi profesional yang tak terlupakan.",
      },
      { 
        id: "tech-stack", 
        title: "Tech Stack", 
        description: "Ekosistem teknologi berperforma tinggi.",
        content: "Backbone utama menggunakan Next.js App Router, Tailwind CSS untuk atomic styling, dan Framer Motion sebagai orchestrator animasi. Performa dioptimasi oleh Turbopack untuk cold-start yang instan.",
        code: "npx create-next-app@latest my-portfolio --typescript --tailwind --app",
        language: "bash"
      },
    ]
  },
  {
    category: "Arsitektur Sistem",
    icon: <Layers size={18} className="text-purple-400" />,
    items: [
      { 
        id: "folder", 
        title: "Folder Structure", 
        description: "Organisasi file yang mendukung skalabilitas tim.",
        content: "Struktur folder menggunakan pola modular. Business logic dipisahkan ke dalam custom hooks, sedangkan komponen UI diklasifikasikan berdasarkan atomicity untuk penggunaan kembali yang maksimal.",
      },
      { 
        id: "styling", 
        title: "Styling System", 
        description: "Sistem desain adaptif dan variabel warna.",
        content: "Konfigurasi tailwind.config.ts menggunakan extended palette. Hal ini memungkinkan transisi tema yang halus dan penggunaan utility classes yang konsisten di seluruh aplikasi.",
        code: "export default {\n  theme: {\n    extend: {\n      colors: {\n        brand: { 500: '#3b82f6' },\n        surface: '#020617'\n      }\n    }\n  }\n}",
        language: "typescript"
      },
    ]
  },
  {
    category: "Fitur Interaktif",
    icon: <Cpu size={18} className="text-emerald-400" />,
    items: [
      { 
        id: "animations", 
        title: "Animations", 
        description: "Koordinasi gerak dan interaksi fluid.",
        content: "Setiap transisi halaman dikelola oleh AnimatePresence. Kami menggunakan spring physics untuk memberikan beban berat yang realistis pada setiap elemen yang bergerak.",
      },
      { 
        id: "threejs", 
        title: "3D Rendering", 
        description: "Imersi visual melalui dimensi ketiga.",
        content: "Integrasi React Three Fiber memungkinkan rendering model 3D yang ringan. Penggunaan GLTF Compression (Draco) memastikan load time tetap di bawah 2 detik.",
        code: "import { Canvas } from '@react-three/fiber';\n\nconst Scene = () => (\n  <Canvas camera={{ position: [0, 0, 5] }}>\n    <ambientLight intensity={0.5} />\n    <Box />\n  </Canvas>\n);",
        language: "tsx"
      },
    ]
  }
];

// --- Sub-Components ---

const CodeBlock = ({ code, lang }: { code: string; lang: string }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 relative group">
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{lang}</span>
        <button 
          onClick={copyToClipboard}
          className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-blue-500/50 transition-all backdrop-blur-md"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-slate-400" />}
        </button>
      </div>
      <div className="rounded-2xl border border-white/5 bg-[#030712] overflow-hidden shadow-2xl">
        <div className="flex items-center gap-1.5 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        </div>
        <pre className="p-6 overflow-x-auto font-mono text-sm leading-relaxed text-blue-300/90 selection:bg-blue-500/30">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default function DocsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState("intro");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Flattening data for easy navigation
  const flatItems = useMemo(() => docsData.flatMap(section => section.items), []);
  const currentIndex = flatItems.findIndex(item => item.id === activeId);
  
  const activeContent = flatItems[currentIndex];
  const nextItem = flatItems[currentIndex + 1];
  const prevItem = flatItems[currentIndex - 1];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSidebarOpen(false);
  }, [activeId]);

  const filteredDocs = useMemo(() => {
    if (!searchQuery) return docsData;
    return docsData.map(section => ({
      ...section,
      items: section.items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.items.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Jika belum mounted, jangan render konten yang kompleks atau null-kan dulu
  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-blue-500/40 flex flex-col">
      
      {/* --- TOP HEADER --- */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/70 backdrop-blur-2xl px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2.5 hover:bg-white/5 rounded-xl border border-white/5 text-white active:scale-95 transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="font-bold text-white tracking-tighter text-2xl hidden sm:block">
              DEWA<span className="text-blue-500">.DOCS</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-2.5 w-80 group focus-within:border-blue-500/50 transition-all duration-300">
            <Search className="text-slate-500 group-focus-within:text-blue-400" size={16} />
            <input 
              type="text" 
              placeholder="Search components..."
              className="bg-transparent border-none text-sm focus:outline-none w-full text-white placeholder:text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-slate-500">
              <Command size={10} /> K
            </div>
          </div>
          <Link href="https://github.com" target="_blank" className="p-2.5 text-slate-400 hover:text-white transition-all border border-white/5 rounded-xl hover:bg-white/5 shadow-xl">
            <Github size={20} />
          </Link>
        </div>
      </header>

      <div className="flex flex-1 pt-[73px]">
        
        {/* --- SIDEBAR NAVIGATION --- */}
        <aside className={`fixed left-0 top-[73px] w-72 h-[calc(100vh-73px)] border-r border-white/5 bg-[#020617]/50 backdrop-blur-md z-40 transition-transform duration-500 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-8 h-full overflow-y-auto custom-scrollbar">
            <div className="space-y-12">
              {filteredDocs.map((section) => (
                <div key={section.category}>
                  <h4 className="text-[10px] uppercase tracking-[4px] font-bold text-slate-500 mb-6 flex items-center gap-3 opacity-80">
                    {section.icon} {section.category}
                  </h4>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button 
                          onClick={() => setActiveId(item.id)}
                          className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all relative flex items-center gap-3 group ${
                            activeId === item.id 
                            ? "bg-blue-500/10 text-blue-400 font-semibold" 
                            : "text-slate-500 hover:text-slate-200 hover:bg-white/[0.02]"
                          }`}
                        >
                          {activeId === item.id && (
                            <motion.div 
                              layoutId="activePill" 
                              className="absolute left-0 w-1 h-5 bg-blue-500 rounded-full" 
                            />
                          )}
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 md:ml-72 flex justify-center">
          <div className="w-full max-w-5xl px-6 md:px-16 lg:px-24 py-16 md:py-24">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Header Section */}
                <div className="flex items-center gap-2 text-blue-500/80 mb-8 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                  <Globe size={12} />
                  <span>Deployment</span>
                  <ChevronRight size={12} className="text-slate-700" />
                  <span className="text-slate-400">{activeContent?.title}</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
                  {activeContent?.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-400/80 font-light leading-relaxed mb-16 border-l-2 border-white/5 pl-8 italic">
                  {activeContent?.description}
                </p>

                {/* Content Body */}
                <div className="space-y-12">
                  <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 backdrop-blur-sm group overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Sparkles size={120} />
                    </div>
                    <div className="relative flex gap-6">
                      <div className="mt-1.5 p-2.5 rounded-2xl bg-blue-500/10 text-blue-500 h-fit shadow-inner">
                        <Info size={24} />
                      </div>
                      <p className="text-lg md:text-xl text-slate-300/90 leading-relaxed font-light">
                        {activeContent?.content}
                      </p>
                    </div>
                  </div>

                  {activeContent?.code && (
                    <CodeBlock code={activeContent.code} lang={activeContent.language || 'text'} />
                  )}

                  {/* Knowledge Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
                    <div className="p-8 rounded-[2.5rem] bg-[#030712] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group">
                      <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <Lightbulb size={28} />
                      </div>
                      <h4 className="text-white text-xl font-bold mb-4">Engineering Standard</h4>
                      <p className="text-slate-500 leading-relaxed">Gunakan prinsip DRY (Don't Repeat Yourself) dan pastikan setiap komponen memiliki dokumentasi prop-types yang jelas.</p>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-[#030712] border border-white/5 hover:border-purple-500/30 transition-all duration-500 group">
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                        <Hash size={28} />
                      </div>
                      <h4 className="text-white text-xl font-bold mb-4">Accessibility First</h4>
                      <p className="text-slate-500 leading-relaxed">Struktur dokumen ini telah mengikuti standar WAI-ARIA untuk memastikan navigasi keyboard berfungsi 100%.</p>
                    </div>
                  </div>
                </div>

                {/* --- SMART NAVIGATION FOOTER --- */}
                <div className="mt-32 pt-12 border-t border-white/5 flex flex-col sm:flex-row gap-6">
                  {prevItem ? (
                    <button 
                      onClick={() => setActiveId(prevItem.id)}
                      className="group flex flex-col items-start gap-4 p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.02] transition-all flex-1 text-left"
                    >
                      <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold flex items-center gap-2">
                        <ArrowLeft size={12} /> Previous Article
                      </span>
                      <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {prevItem.title}
                      </span>
                    </button>
                  ) : <div className="flex-1" />}

                  {nextItem ? (
                    <button 
                      onClick={() => setActiveId(nextItem.id)}
                      className="group flex flex-col items-end gap-4 p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.02] transition-all flex-1 text-right"
                    >
                      <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold flex items-center gap-2">
                        Next Chapter <ChevronRight size={12} />
                      </span>
                      <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {nextItem.title}
                      </span>
                    </button>
                  ) : <div className="flex-1" />}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </main>
      </div>

      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/5 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/5 blur-[160px] rounded-full" />
      </div>

      {/* --- CUSTOM SCROLLBAR STYLE --- */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(59, 130, 246, 0.1); 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: rgba(59, 130, 246, 0.4); 
        }
        body {
          scrollbar-color: rgba(59, 130, 246, 0.1) transparent;
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  );
}