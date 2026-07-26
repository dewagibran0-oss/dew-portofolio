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

// Meta netral-bahasa (ikon/tech). Warna aksen seragam maroon via CSS var.
const SERVICE_META: { id: string; color: string; icon: LucideIcon; tech: string[] }[] = [
  { id: "01", color: "#8c2f39", icon: Cpu, tech: ["HTML", "CSS", "JavaScript"] },
  { id: "02", color: "#8c2f39", icon: Database, tech: ["SQL", "Advanced Excel", "Google Sheets"] },
  { id: "03", color: "#8c2f39", icon: Zap, tech: ["Windows/OS", "Hardware", "Networking"] },
  { id: "04", color: "#8c2f39", icon: Layers, tech: ["Office 365", "Workflow Design", "System Log"] },
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
            className="absolute inset-0 bg-black/60"
          />

          {/* Panel — capped height, only the body scrolls */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 24 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-full max-w-2xl max-h-[85dvh] flex flex-col bg-[var(--bg-panel)] border border-[var(--hairline)] rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl cursor-default"
          >
            {/* Accent top bar */}
            <div className="absolute top-0 left-0 w-full h-1 z-20 bg-[var(--maroon)]" />

            {/* Header */}
            <div className="relative z-10 shrink-0 flex items-start gap-4 p-5 sm:p-8 pb-4 sm:pb-6 border-b border-[var(--hairline)]">
              <div className="shrink-0 p-3 sm:p-4 rounded-2xl bg-[var(--bg-section)] border border-[var(--hairline)]">
                <service.icon size={26} className="text-[var(--maroon)]" />
              </div>
              <div className="min-w-0 pr-10">
                <span className="block text-[var(--maroon)] text-[10px] font-semibold tracking-[0.25em] uppercase truncate">
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
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-[var(--bg-section)] hover:bg-[var(--maroon)]/15 text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--maroon)]"
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
                    <Sparkles size={16} className="text-[var(--maroon)]" /> {t.services.capabilities}
                  </h4>
                  <div className="space-y-3">
                    {service.features.map(f => (
                      <div key={f} className="flex items-start gap-3 text-zinc-400 text-sm">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[var(--maroon)]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 italic">
                    <ZapIcon size={16} className="text-[var(--maroon)]" /> {t.services.impact}
                  </h4>
                  <div className="p-5 sm:p-6 rounded-3xl bg-[var(--bg-section)] border border-[var(--hairline)]">
                    <span className="text-4xl font-black text-white tracking-tighter">{service.stats}</span>
                    <p className="text-xs text-zinc-500 mt-2 uppercase tracking-widest">{t.services.perfIncrease}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.tech.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-[var(--bg-section)] border border-[var(--hairline)] text-[9px] font-medium text-zinc-400 uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 shrink-0 p-4 sm:p-6 pt-3 border-t border-[var(--hairline)] bg-[var(--bg-panel)]">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-4 sm:py-5 bg-[var(--maroon)] text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-[var(--maroon-strong)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--maroon)]"
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
        <div className="relative h-full w-full bg-[var(--bg-panel)] border border-[var(--hairline)] rounded-[3rem] p-10 overflow-hidden flex flex-col group-hover:border-[var(--maroon)]/40 transition-all duration-500 shadow-sm">
          <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />

          <div className="relative z-10 flex justify-between items-start mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--bg-section)] border border-[var(--hairline)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <service.icon size={24} className="text-white group-hover:text-[var(--maroon)]" />
            </div>
            <span className="text-[9px] text-zinc-500/50 font-medium tracking-[0.5em]">{service.id}</span>
          </div>

          <div className="relative z-10 space-y-4">
            <h4 className="text-[var(--maroon)] text-[9px] uppercase tracking-[0.4em] font-semibold">{service.subtitle}</h4>
            <h3 className="text-3xl font-bold text-white tracking-tighter leading-tight">{service.title}</h3>
            <p className="text-zinc-500 text-sm font-light line-clamp-3">{service.description}</p>
          </div>

          <div className="mt-auto relative z-10 flex items-center justify-between">
            <div
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 py-2 px-4 rounded-full bg-[var(--bg-section)] border border-[var(--hairline)] hover:border-[var(--maroon)]/50 transition-all cursor-pointer group/link"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover/link:text-white">{t.services.analyze}</span>
              <ArrowRight size={14} className="text-zinc-600 group-hover/link:text-[var(--maroon)] group-hover/link:translate-x-1 transition-all" />
            </div>
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
                <div className="h-[1px] w-12 bg-[var(--maroon)]" />
                <span className="text-[var(--maroon)] text-xs font-semibold tracking-[0.5em] uppercase">{t.services.label}</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase italic">
                {t.services.titleTop} <br /> <span className="text-[var(--maroon)]">{t.services.titleBottom}</span>
              </h2>
            </div>
            <div className="lg:max-w-sm">
              <p className="text-zinc-500 text-lg font-light leading-relaxed border-l-2 border-[var(--maroon)] pl-8">
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
          className="mt-40 p-1 bg-[var(--hairline)] rounded-[4rem]"
        >
          <div
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-[var(--bg-card)] rounded-[3.9rem] p-16 md:p-24 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 cursor-pointer transition-all hover:bg-[var(--bg-elevated)]"
          >
            <div className="relative z-10">
              <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4 whitespace-pre-line">{t.services.ctaTitle}</h3>
              <p className="text-zinc-500 text-xl font-light">{t.services.ctaSubtitle}</p>
            </div>

            <div className="relative z-10">
              <div className="w-40 h-40 rounded-full border border-[var(--hairline)] flex items-center justify-center group-hover:scale-110 group-hover:border-[var(--maroon)] transition-all duration-700">
                <div className="text-center group-hover:text-[var(--maroon)] transition-colors">
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