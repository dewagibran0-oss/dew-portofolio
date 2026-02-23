"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  LucideIcon,
  ArrowUpRight, Zap, Globe, 
  Code2, Cpu, Rocket, Terminal,
  Workflow, Hash, Layers, Command
} from "lucide-react";

/**
 * 1. Data Structures & Types
 */
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  gridClass: string;
  accent: string;
  icon: LucideIcon; // 👈 Ubah ini
}

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Diva Mobile Ecosystem",
    category: "Retail Tech",
    description: "Sistem manajemen inventaris dan Point of Sales (POS) smartphone untuk optimalisasi bisnis retail digital.",
    tags: ["Node.js", "Tailwind", "Three.Js"],
    image: "/divaphone.png",
    gridClass: "lg:col-span-3 lg:row-span-2",
    accent: "#6366f1",
    icon: Cpu 
  },
  {
    id: "02",
    title: "DFS Finance Tracker",
    category: "Financial Tool",
    description: "Aplikasi pengelolaan keuangan personal dengan fitur pelacakan arus kas dan visualisasi data pengeluaran.",
    tags: ["PHP", "Laravel", "MySQL"],
    image: "/dfs.png",
    gridClass: "lg:col-span-2 lg:row-span-1",
    accent: "#ec4899",
    icon: Workflow
  },
  {
    id: "03",
    title: "MiniBank Core System",
    category: "Fintech",
    description: "Simulasi sistem perbankan mikro yang menangani logika transaksi simpan pinjam dengan integritas data tinggi.",
    tags: ["PHP", "Laravel", "MySQL"],
    image: "/bankmini.png",
    gridClass: "lg:col-span-2 lg:row-span-1",
    accent: "#f59e0b",
    icon: Zap
  },
  {
    id: "04",
    title: "KantinQ Smart Order",
    category: "SaaS",
    description: "Platform pemesanan kantin digital dengan integrasi gateway pembayaran Midtrans untuk transaksi non-tunai.",
    tags: ["React.js", "MongoDB", "Midtrans"],
    image: "/kantinq.png",
    gridClass: "lg:col-span-2 lg:row-span-2",
    accent: "#06b6d4",
    icon: Code2
  },
{
    id: "05",
    title: "My Portfolio",
    category: "Personal Brand",
    description: "Web portofolio interaktif yang dirancang untuk merepresentasikan identitas digital, keahlian teknis, dan proyek profesional secara dinamis.",
    tags: ["Node.js", "Tailwind CSS", "Framer Motion"],
    image: "/my-porto.png", // Sesuaikan dengan path gambar portfolio kamu
    gridClass: "lg:col-span-3 lg:row-span-2",
    accent: "#10b981",
    icon: Globe
  }
];

/**
 * 2. Component: ProjectCard
 */
const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = project.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`${project.gridClass} group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] border border-white/[0.05] p-1 transition-all duration-700 hover:border-white/20`}
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          className="object-cover transition-all duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        
        {/* Cursor Shine Layer */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${project.accent}20, transparent 40%)`
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full p-8 md:p-10">
        <div className="flex items-start justify-between">
          <div 
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black"
            style={{ boxShadow: `0 0 20px ${project.accent}20` }}>
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 group-hover:text-indigo-400 transition-colors">
              {project.category}
            </span>
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <h4 className="text-3xl md:text-5xl font-bold text-white font-space leading-[0.8] tracking-tighter">
            {project.title}
          </h4>
          
          <p className="max-w-md text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-200 transition-colors duration-500 line-clamp-2">
            {project.description}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex flex-wrap gap-3">
              {project.tags.slice(0, 3).map(tag => (
                <span key={tag} className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                  <Hash size={10} className="text-indigo-500/50" />
                  {tag}
                </span>
              ))}
            </div>
            
            <Link 
              href={`/projects/${project.id}`}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-500 group-hover:rotate-45"
            >
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * 3. Main Section
 */
export default function ProjectsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-48 px-6 bg-[#050505] selection:bg-indigo-500/30 overflow-hidden"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ y: y1 }} className="absolute top-20 left-[10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full" />
        <motion.div style={{ y: y2 }} className="absolute bottom-20 right-[10%] w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://res.cloudinary.com/dvhndpbun/image/upload/v1633512750/noise_vstf3v.png')]" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header Infrastructure */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <Command size={16} className="text-indigo-500 animate-pulse" />
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em]">Inventory_Log_2026</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-7xl md:text-[10rem] font-bold text-white leading-[0.85] tracking-tighter uppercase"
            >
              Refined <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-800 italic">Systems.</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-4 pb-4">
            <div className="space-y-6 border-l border-white/10 pl-8">
              <p className="text-zinc-400 font-inter text-xl leading-relaxed max-w-sm">
                Kurasi eksklusif arsitektur digital di mana rekayasa performa tinggi bertemu dengan estetika brutalist yang fungsional.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Global Partners</span>
              </div>
            </div>
          </div>
        </header>

        {/* Professional Bento Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 auto-rows-[450px]">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Industrial Footer CTA */}
        <footer className="mt-48 flex flex-col items-center">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
          
          <div className="mt-24 text-center space-y-12">
            <div className="space-y-4">
              <h3 className="text-white font-space text-3xl font-bold">Siap membangun sistem masa depan?</h3>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Available for elite partnerships starting Q3 2026</p>
            </div>

            <Link href="/archive" className="group relative inline-flex items-center gap-8 pl-12 pr-4 py-4 rounded-full bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 transition-all duration-700">
              <span className="text-white text-xs font-bold font-mono uppercase tracking-[0.4em]">Explore_Archive</span>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 group-hover:scale-110">
                <Layers size={20} />
              </div>
              <div className="absolute -inset-px rounded-full bg-indigo-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}