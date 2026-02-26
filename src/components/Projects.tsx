"use client";

import React, { useRef, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowUpRight, Zap, Globe, 
  Code2, Cpu, Hash, Layers, Command, Workflow
} from "lucide-react";

/**
 * 1. Data & Types
 */
const PROJECTS = [
  {
    id: "01",
    title: "Diva Mobile Ecosystem",
    category: "Retail Tech",
    description: "Sistem manajemen inventaris dan POS smartphone untuk optimalisasi bisnis retail digital.",
    tags: ["Node.js", "Tailwind", "Three.Js"],
    image: "/divaphone.png",
    gridClass: "lg:col-span-3 lg:row-span-1",
    accent: "#6366f1",
    icon: Cpu 
  },
  {
    id: "02",
    title: "DFS Finance Tracker",
    category: "Financial Tool",
    description: "Aplikasi pengelolaan keuangan personal dengan fitur pelacakan arus kas.",
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
    description: "Simulasi sistem perbankan mikro yang menangani logika transaksi simpan pinjam.",
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
    description: "Platform pemesanan kantin digital dengan integrasi gateway pembayaran Midtrans.",
    tags: ["React.js", "MongoDB", "Midtrans"],
    image: "/kantinq.png",
    gridClass: "lg:col-span-3 lg:row-span-1",
    accent: "#06b6d4",
    icon: Code2
  }
];

/**
 * 2. Optimized Project Card
 */
const ProjectCard = memo(({ project }: { project: typeof PROJECTS[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = project.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      className={`${project.gridClass} group relative overflow-hidden rounded-[2rem] bg-[#0A0A0A] border border-white/5 will-change-transform`}
    >
      {/* Optimized Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient Overlay lebih ringan daripada filter blur */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent" />
        
        {/* Shine Effect - GPU Accelerated */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-contents"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${project.accent}15, transparent 40%)`
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white transition-transform group-hover:scale-110">
            <Icon size={22} />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">
            {project.category}
          </span>
        </div>

        <div className="mt-auto pt-10">
          <h4 className="text-2xl md:text-4xl font-bold text-white tracking-tighter leading-none mb-4">
            {project.title}
          </h4>
          
          <p className="text-xs md:text-sm text-zinc-500 line-clamp-2 mb-6">
            {project.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              {project.tags.slice(0, 2).map(tag => (
                <span key={tag} className="flex items-center gap-1 text-[8px] font-mono text-zinc-600 uppercase">
                  <Hash size={8} /> {tag}
                </span>
              ))}
            </div>
            
            <Link 
              href={`/projects/${project.id}`}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
ProjectCard.displayName = "ProjectCard";

/**
 * 3. Main Section
 */
export default function ProjectsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Kurangi intensitas parallax agar scroll tidak berat
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 px-6 bg-[#050505] overflow-hidden"
    >
      {/* Background Decor - Optimized with CSS purely where possible */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: yBg }} 
          className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-indigo-600/[0.03] blur-[120px] rounded-full" 
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6 opacity-50">
              <Command size={14} className="text-indigo-500" />
              <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.4em]">Project_Vault_2026</span>
            </div>

            <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
              REFINED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-700 italic">SYSTEMS.</span>
            </h2>
          </div>

          <div className="md:max-w-xs border-l border-white/10 pl-6 hidden md:block">
            <p className="text-zinc-500 text-sm leading-relaxed">
              Arsitektur digital dengan rekayasa performa tinggi dan estetika fungsional.
            </p>
          </div>
        </header>

        {/* Mosaic Grid - Optimized Auto-Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-fr">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Simplified Footer CTA */}
        <footer className="mt-32 flex flex-col items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-24" />
          
          <Link href="/archive" className="group flex items-center gap-6 pl-8 pr-2 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
            <span className="text-white text-[10px] font-mono font-bold uppercase tracking-widest">Explore Archive</span>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-12">
              <Layers size={18} />
            </div>
          </Link>
        </footer>
      </div>
    </section>
  );
}