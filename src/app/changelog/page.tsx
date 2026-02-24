"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GitCommit, 
  Rocket, 
  Bug, 
  Zap, 
  Clock, 
  ChevronLeft,
  Search,
  Filter,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

// --- Types ---
type Category = "all" | "feature" | "fix" | "launch";

interface ChangelogItem {
  version: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
  type: Category;
  changes: string[];
}

// --- Data ---
const changelogData: ChangelogItem[] = [
  {
    version: "v1.2.0",
    date: "24 Feb 2026",
    title: "The 3D Overhaul",
    description: "Pembaruan besar pada visual utama dengan integrasi Three.js yang lebih smooth dan interaktif.",
    tags: ["Three.js", "Optimization"],
    type: "feature",
    changes: [
      "Integrasi @react-three/fiber untuk Hero Scene yang lebih imersif",
      "Sistem caching asset 3D untuk waktu muat 40% lebih cepat",
      "Perbaikan TypeScript strict mode pada komponen Skills",
      "Implementasi filter kategori pada halaman Changelog"
    ]
  },
  {
    version: "v1.1.5",
    date: "20 Feb 2026",
    title: "Performance Patch",
    description: "Optimalisasi Core Web Vitals untuk skor Lighthouse yang lebih baik.",
    tags: ["Speed"],
    type: "fix",
    changes: [
      "Lazy loading untuk gambar di bawah lipatan (below the fold)",
      "Reduksi ukuran bundle JS sebesar 15kb",
      "Fix CLS (Cumulative Layout Shift) pada navbar mobile"
    ]
  },
  {
    version: "v1.1.0",
    date: "15 Feb 2026",
    title: "Responsive Fixes",
    description: "Memastikan semua komponen tampil sempurna di layar iPhone dan Android layar kecil.",
    tags: ["UI/UX", "Mobile"],
    type: "fix",
    changes: [
      "Perbaikan horizontal overflow pada section About",
      "Pembaruan menu navigasi dengan animasi framer-motion yang lebih ringan",
      "Penyesuaian ukuran font pada layar < 360px"
    ]
  },
  {
    version: "v1.0.0",
    date: "01 Feb 2026",
    title: "Initial Launch",
    description: "Versi pertama portofolio resmi diluncurkan secara publik.",
    tags: ["Launch"],
    type: "launch",
    changes: [
      "Inisialisasi Project dengan Next.js 16 & Turbopack",
      "Konfigurasi Tailwind CSS & Theme Setup",
      "Deployment pipeline via Vercel"
    ]
  }
];

// --- Sub-Components ---
const BackgroundEffect = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
  </div>
);

export default function ChangelogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filteredData = useMemo(() => {
    return changelogData.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "all" || item.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/40 pb-20 font-sans">
      <BackgroundEffect />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50 origin-left"
        style={{ scaleX: useMemo(() => undefined, []) }} // Logic can be added with useScroll
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16">
        
        {/* Navigation */}
        <nav className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
        </nav>

        {/* Header Section */}
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
          >
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Updates</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl leading-relaxed"
          >
            Evolusi project dari baris kode pertama hingga rilis terbaru. Kami mencatat setiap detail perubahan untuk transparansi dan kualitas.
          </motion.p>
        </header>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between p-2 rounded-2xl bg-slate-900/30 border border-slate-800/50 backdrop-blur-md">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Cari perubahan..."
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-1 p-1 bg-slate-950/50 rounded-xl border border-slate-800 w-full md:w-auto">
            {(["all", "feature", "fix", "launch"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline List */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/50 via-slate-800 to-transparent" />

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, idx) => (
                <motion.div 
                  key={item.version}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative pl-12 md:pl-20"
                >
                  {/* Version Badge on Line */}
                  <div className="absolute left-[9px] md:left-[25px] top-2 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ring-4 ring-[#020617] ${
                      item.type === 'feature' ? 'bg-yellow-400' : 
                      item.type === 'fix' ? 'bg-red-400' : 'bg-green-400'
                    }`} />
                  </div>

                  {/* Date Label */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-xs font-mono font-bold py-1 px-3 rounded-full bg-slate-800 text-slate-300">
                      {item.version}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Clock size={12} />
                      {item.date}
                    </span>
                  </div>

                  {/* Main Card */}
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
                    <div className="relative bg-slate-900/80 border border-slate-800 p-6 md:p-8 rounded-3xl backdrop-blur-xl">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <ArrowUpRight size={20} className="text-slate-600 group-hover:text-white transition-all" />
                      </div>
                      
                      <p className="text-slate-400 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.changes.map((change, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/50">
                            <div className="mt-1 p-1 rounded-md bg-slate-800 text-blue-400">
                              <GitCommit size={12} />
                            </div>
                            <span className="text-sm text-slate-300 leading-snug">{change}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-slate-800/50 flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-slate-800/50 text-slate-400 border border-slate-700/50">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredData.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800"
              >
                <p className="text-slate-500">Tidak ada catatan yang ditemukan untuk "{searchQuery}"</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}