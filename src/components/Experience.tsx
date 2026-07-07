"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform,
  useReducedMotion,
  AnimatePresence
} from "framer-motion";
import {
  Briefcase, GraduationCap, Calendar,
  ChevronRight, X, CheckCircle2,
  Terminal, ExternalLink, Activity
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useModalBehavior } from "@/lib/useModalBehavior";

// --- Types & Data ---
interface Experience {
  id: string;
  type: "work" | "education";
  period: string;
  role: string;
  org: string;
  desc: string;
  fullLog: string;
  tags: string[];
  status?: string;
  achievements: string[];
}

// Meta netral-bahasa (periode/organisasi/tags/achievements). Teks role/desc/fullLog
// diambil dari dictionary via useLang.
type ExpMeta = Omit<Experience, "role" | "desc" | "fullLog">;
const EXP_META: ExpMeta[] = [
  {
    id: "01",
    type: "work",
    period: "2025 - PRESENT",
    org: "PT. Cladhist Utama Karya",
    achievements: ["Vendor Database Audit", "Digital Archive System", "Efficient Procurement"],
    tags: ["Procurement", "Digital Filing", "Inventory"],
    status: "ACTIVE_CONTRACT"
  },
  {
    id: "02",
    type: "work",
    period: "2024 - 2025",
    org: "PT. Sembilan Dua Delapan",
    achievements: ["Zero-Error Documentation", "DO System Optimization", "Export-Import Flow"],
    tags: ["Logistics Tech", "Data Validation", "Excel Expert"],
    status: "COMPLETED"
  },
  {
    id: "03",
    type: "work",
    period: "2023 — PRESENT",
    org: "PT. Tujuh Tunas Satu Samudera",
    achievements: ["Digital Workflow Migration", "99% Data Accuracy", "Internal IT Support"],
    tags: ["Digital Admin", "System Support", "Logistics"],
    status: "ACTIVE_CONTRACT"
  },
  {
    id: "04",
    type: "education",
    period: "2024 — NOW",
    org: "Universitas Bakrie",
    achievements: ["Dean's List Candidate", "Web Dev Projects", "Database Design"],
    tags: ["Computer Science", "Systems Design", "Fullstack Development"],
  },
  {
    id: "05",
    type: "education",
    period: "2021 — 2024",
    org: "SMK 17 Agustus 1945",
    achievements: ["Vocational Excellence", "Junior Programmer", "Software Logic"],
    tags: ["Software Engineering", "Coding Basics", "Logic"],
  }
];

// --- Sub-Component: Experience Modal ---
const ExperienceModal = ({ item, isOpen, onClose }: { item: Experience; isOpen: boolean; onClose: () => void }) => {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useModalBehavior(isOpen, onClose);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="experience-modal"
          role="dialog"
          aria-modal="true"
          aria-label={item.role}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 cursor-zoom-out"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Panel — capped height, only the body scrolls */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 24 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-full max-w-xl max-h-[85dvh] flex flex-col bg-[var(--bg-card)] border border-white/10 rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl cursor-default"
          >
            {/* Cyan scanline accent */}
            <div className="absolute top-0 left-0 w-full h-1 z-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-64 rounded-full bg-cyan-500/20 blur-[120px]" />

            {/* Header */}
            <div className="relative z-10 shrink-0 p-5 sm:p-8 pb-4 sm:pb-5 border-b border-white/5">
              <button
                type="button"
                onClick={onClose}
                aria-label={t.experience.close}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/5 text-zinc-400 hover:bg-white/15 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <X size={20} />
              </button>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-cyan-500 font-mono text-[10px] tracking-widest uppercase">
                <span className="inline-flex items-center gap-2"><Terminal size={14} /> LOG_FILE: {item.id}</span>
                {item.status && (
                  <span className="text-cyan-400 font-bold animate-pulse tracking-tighter">[{item.status}]</span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tighter pr-10">{item.role}</h3>
              <p className="text-zinc-500 text-sm sm:text-base flex flex-wrap items-center gap-x-2">
                {item.type === "work" ? <Briefcase size={15} /> : <GraduationCap size={15} />}
                <span>{item.org}</span>
                <span className="text-zinc-700">•</span>
                <span className="font-mono text-xs">{item.period}</span>
              </p>
            </div>

            {/* Body (only this scrolls) */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-8 py-6 space-y-8">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Activity size={14} className="text-cyan-500" /> {t.experience.summary}
                </h4>
                <p className="text-zinc-400 leading-relaxed font-light">{item.fullLog}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 italic">{t.experience.achievements}</h4>
                <div className="grid grid-cols-1 gap-3">
                  {item.achievements.map((acc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 size={14} className="shrink-0 text-cyan-500" />
                      {acc}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-mono text-zinc-400 uppercase tracking-widest"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 shrink-0 p-4 sm:p-6 pt-3 border-t border-white/5 bg-[var(--bg-card)]">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-4 bg-cyan-500 text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                {t.experience.close}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// --- Sub-Component: Timeline Item ---
function TimelineItem({ item, index }: { item: Experience, index: number }) {
  const { t } = useLang();
  const readLogLabel = t.experience.readLog;
  const [isOpen, setIsOpen] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center">
      {/* Connector Dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 items-center justify-center z-30">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,1)]" 
        />
      </div>

      {/* Info Section */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:order-last md:items-start md:text-left'}`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-500 font-mono text-[9px] mb-4">
          <Calendar size={12} className="text-cyan-500" />
          {item.period}
          {item.status && <span className="text-cyan-400 ml-2 font-bold animate-pulse tracking-tighter">[{item.status}]</span>}
        </div>
        <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2 italic uppercase">
          {item.role}
        </h3>
        <p className="text-zinc-500 flex items-center gap-2 font-medium">
          {item.type === "work" ? <Briefcase size={16} /> : <GraduationCap size={16} />}
          {item.org}
        </p>
      </motion.div>

      {/* Card Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="group relative"
      >
        <div 
          onClick={() => setIsOpen(true)}
          className="relative p-8 md:p-10 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 backdrop-blur-md cursor-pointer hover:bg-zinc-900/40 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          
          <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed mb-8">
            &quot;{item.desc}&quot;
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {item.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-cyan-500 transition-colors">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">
            <span>{readLogLabel}</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>

      <ExperienceModal item={item} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

// --- Main Section Component ---
export default function NeuralExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const data: Experience[] = EXP_META.map((m) => ({
    ...m,
    ...t.experience.items[m.id],
  }));
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[var(--bg-section)] py-40 md:py-60 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-40 space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-cyan-500" />
            <span className="text-cyan-500 font-mono text-xs uppercase tracking-[0.5em]">{t.experience.tag}</span>
          </motion.div>

          <motion.h2
            style={{ opacity }}
            className="text-7xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic"
          >
            {t.experience.titleTop} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-600">{t.experience.titleBottom}</span>
          </motion.h2>

          <div className="flex justify-end">
            <p className="max-w-xs text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-r-2 border-cyan-500 pr-6 text-right">
              {t.experience.intro}
            </p>
          </div>
        </header>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent"
            />
          </div>

          <div className="space-y-32 md:space-y-64">
            {data.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Cinematic Footer */}
        <footer className="mt-60 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-600 font-mono text-[10px] uppercase tracking-[0.3em]">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span>Neural_Node_Active_2026</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-white font-bold mb-1 italic">Dewa_Gibran</span>
              <span>{t.experience.role}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
              <ExternalLink size={18} />
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}