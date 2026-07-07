"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  motion, 
  useInView, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate,
  useReducedMotion,
  AnimatePresence
} from "framer-motion";
import {
  Cpu, Layers, ArrowRight, Database, Zap,
  X, CheckCircle2,
  Sparkles, Globe, ZapIcon, LucideIcon
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useModalBehavior } from "@/lib/useModalBehavior";

// Meta netral-bahasa (warna/ikon/tech). Teks diambil dari dictionary via useLang.
const SERVICE_META: { id: string; color: string; icon: LucideIcon; tech: string[] }[] = [
  { id: "01", color: "#3b82f6", icon: Cpu, tech: ["HTML", "CSS", "JavaScript"] },
  { id: "02", color: "#a855f7", icon: Database, tech: ["SQL", "Advanced Excel", "Google Sheets"] },
  { id: "03", color: "#fbbf24", icon: Zap, tech: ["Windows/OS", "Hardware", "Networking"] },
  { id: "04", color: "#10b981", icon: Layers, tech: ["Office 365", "Workflow Design", "System Log"] },
];

// --- Types ---
interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  features: string[];
  tech: string[];
  color: string;
  icon: LucideIcon; // 👈 Ubah dari React.ElementType ke LucideIcon
  stats: string;
}
// --- Animation Constants ---
const EASE_CUSTOM = [0.16, 1, 0.3, 1] as const;

// --- Sub-Component: Detail Modal ---
const ServiceModal = ({ service, isOpen, onClose }: { service: Service; isOpen: boolean; onClose: () => void }) => {
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
          key="service-modal"
          role="dialog"
          aria-modal="true"
          aria-label={service.title}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 cursor-zoom-out"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Panel — capped height, only the body scrolls */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 24 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-full max-w-2xl max-h-[85dvh] flex flex-col bg-[var(--bg-card)] border border-white/10 rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl cursor-default"
          >
            {/* Accent glow + top bar */}
            <div className="absolute top-0 left-0 w-full h-1 z-20" style={{ backgroundColor: service.color }} />
            <div
              className="pointer-events-none absolute -top-24 -right-16 w-64 h-64 rounded-full blur-[120px] opacity-40"
              style={{ backgroundColor: service.color }}
            />

            {/* Header */}
            <div className="relative z-10 shrink-0 flex items-start gap-4 p-5 sm:p-8 pb-4 sm:pb-6 border-b border-white/5">
              <div
                className="shrink-0 p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10"
                style={{ boxShadow: `0 0 30px -12px ${service.color}` }}
              >
                <service.icon size={26} style={{ color: service.color }} />
              </div>
              <div className="min-w-0 pr-10">
                <span className="block text-secondary font-mono text-[10px] tracking-[0.25em] uppercase truncate">
                  {service.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tighter leading-tight">
                  {service.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.services.close}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body (only this scrolls) */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-8 py-6 space-y-8">
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
                {service.longDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 italic">
                    <Sparkles size={16} className="text-secondary" /> {t.services.capabilities}
                  </h4>
                  <div className="space-y-3">
                    {service.features.map(f => (
                      <div key={f} className="flex items-start gap-3 text-zinc-400 text-sm">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: service.color }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 italic">
                    <ZapIcon size={16} className="text-secondary" /> {t.services.impact}
                  </h4>
                  <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                    <span className="text-4xl font-black text-white tracking-tighter">{service.stats}</span>
                    <p className="text-xs text-zinc-500 mt-2 uppercase tracking-widest">{t.services.perfIncrease}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.tech.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-mono text-zinc-400 uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 shrink-0 p-4 sm:p-6 pt-3 border-t border-white/5 bg-[var(--bg-card)]">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-4 sm:py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              >
                {t.services.close}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// --- Sub-Component: Service Card ---
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const { t } = useLang();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const rotateX = useSpring(0, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rotateX.set((e.clientY - (rect.top + rect.height / 2)) / -25);
    rotateY.set((e.clientX - (rect.left + rect.width / 2)) / 25);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${service.color}15, transparent 80%)`;

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: EASE_CUSTOM }}
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="group relative h-[500px] cursor-none"
      >
        <div className="relative h-full w-full bg-[var(--bg-panel)] border border-white/5 rounded-[3rem] p-10 overflow-hidden flex flex-col group-hover:border-white/20 transition-all duration-500">
          <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />
          
          <div className="relative z-10 flex justify-between items-start mb-10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <service.icon size={24} className="text-white group-hover:text-secondary" />
            </div>
            <span className="font-mono text-[9px] text-white/20 tracking-[0.5em]">SVR_{service.id}</span>
          </div>

          <div className="relative z-10 space-y-4">
            <h4 className="text-secondary font-mono text-[9px] uppercase tracking-[0.4em] font-bold">{service.subtitle}</h4>
            <h3 className="text-3xl font-bold text-white tracking-tighter leading-tight">{service.title}</h3>
            <p className="text-zinc-500 text-sm font-light line-clamp-3">{service.description}</p>
          </div>

          <div className="mt-auto relative z-10 flex items-center justify-between">
            <div 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 py-2 px-4 rounded-full bg-white/5 border border-white/5 hover:border-secondary/50 hover:bg-white/10 transition-all cursor-pointer group/link"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover/link:text-white">{t.services.analyze}</span>
              <ArrowRight size={14} className="text-zinc-600 group-hover/link:text-secondary group-hover/link:translate-x-1 transition-all" />
            </div>
          </div>

          {/* Magnetic Cursor Follower (CSS Only for Perf) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none flex items-center justify-center transition-opacity">
            <div className="w-4 h-4 bg-secondary rounded-full blur-sm animate-ping" />
          </div>
        </div>
      </motion.div>

      <ServiceModal service={service} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

// --- Main Section ---
export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const { t } = useLang();

  const services: Service[] = useMemo(
    () =>
      SERVICE_META.map((m) => {
        const d = t.services.items[m.id];
        return {
          id: m.id,
          color: m.color,
          icon: m.icon,
          tech: m.tech,
          title: d.title,
          subtitle: d.subtitle,
          description: d.description,
          longDescription: d.longDescription,
          features: d.features,
          stats: d.stats,
        };
      }),
    [t]
  );

  return (
    <section ref={sectionRef} id="services" className="relative py-40 bg-[var(--bg-section)] overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_CUSTOM }}
            className="flex flex-col lg:flex-row items-end justify-between gap-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-12 bg-secondary" />
                <span className="text-secondary font-mono text-xs tracking-[0.5em] uppercase">{t.services.label}</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase italic">
                {t.services.titleTop} <br /> <span className="text-zinc-800">{t.services.titleBottom}</span>
              </h2>
            </div>
            <div className="lg:max-w-sm">
              <p className="text-zinc-500 text-lg font-light leading-relaxed border-l-2 border-secondary pl-8">
                {t.services.intro}
              </p>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        {/* Dynamic Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 p-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-[4rem]"
        >
          <div 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-[var(--bg-card)] rounded-[3.9rem] p-16 md:p-24 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 cursor-pointer transition-all hover:bg-black"
          >
            <div className="relative z-10">
              <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4 whitespace-pre-line">{t.services.ctaTitle}</h3>
              <p className="text-zinc-500 text-xl font-light">{t.services.ctaSubtitle}</p>
            </div>
            
            <div className="relative z-10">
              <div className="w-40 h-40 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-secondary transition-all duration-700">
                <div className="text-center group-hover:text-secondary transition-colors">
                  <Globe className="mx-auto mb-2 animate-spin-slow" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{t.services.connect}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}