"use client";

import React, { useRef, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight, Zap,
  Code2, Cpu, Hash, Layers, Command, Workflow, LucideIcon
} from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * 1. Data & Types
 * Meta netral-bahasa (tags/gambar/layout/ikon). Teks (title/category/description)
 * diambil dari dictionary via useLang agar mengikuti pilihan bahasa.
 */
const PROJECT_META: {
  id: string;
  tags: string[];
  image: string;
  gridClass: string;
  accent: string;
  icon: LucideIcon;
}[] = [
  { id: "01", tags: ["Node.js", "Tailwind", "Three.Js"], image: "/divaphone.png", gridClass: "lg:col-span-3 lg:row-span-1", accent: "#6366f1", icon: Cpu },
  { id: "02", tags: ["PHP", "Laravel", "MySQL"], image: "/dfs.png", gridClass: "lg:col-span-2 lg:row-span-1", accent: "#ec4899", icon: Workflow },
  { id: "03", tags: ["PHP", "Laravel", "MySQL"], image: "/bankmini.png", gridClass: "lg:col-span-2 lg:row-span-1", accent: "#f59e0b", icon: Zap },
  { id: "04", tags: ["Dart", "Flutter"], image: "/ttss-mobile.png", gridClass: "lg:col-span-3 lg:row-span-1", accent: "#06b6d4", icon: Code2 },
];

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  gridClass: string;
  accent: string;
  icon: LucideIcon;
}

/**
 * 2. Optimized Project Card
 */
const ProjectCard = memo(({ project }: { project: ProjectItem }) => {
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
      className={`${project.gridClass} group relative overflow-hidden rounded-[2rem] bg-[var(--bg-card)] border border-white/5 will-change-transform`}
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
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/90 to-transparent" />
        
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
  const { t } = useLang();
  const projects: ProjectItem[] = PROJECT_META.map((m) => ({
    ...m,
    ...t.projects.items[m.id],
  }));
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Kurangi intensitas parallax agar scroll tidak berat
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 px-6 bg-[var(--bg-elevated)] overflow-hidden"
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
              <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.4em]">{t.projects.tag}</span>
            </div>

            <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
              {t.projects.titleTop} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-700 italic">{t.projects.titleBottom}</span>
            </h2>
          </div>

          <div className="md:max-w-xs border-l border-white/10 pl-6 hidden md:block">
            <p className="text-zinc-500 text-sm leading-relaxed">
              {t.projects.intro}
            </p>
          </div>
        </header>

        {/* Mosaic Grid - Optimized Auto-Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-fr">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Simplified Footer CTA */}
        <footer className="mt-32 flex flex-col items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-24" />
          
          <Link href="/archive" className="group flex items-center gap-6 pl-8 pr-2 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
            <span className="text-white text-[10px] font-mono font-bold uppercase tracking-widest">{t.projects.explore}</span>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-12">
              <Layers size={18} />
            </div>
          </Link>
        </footer>
      </div>
    </section>
  );
}