"use client";

import React, { useEffect, useState, memo, useCallback } from "react";
import Link from "next/link";
import { 
  motion, 
  Variants, 
  useScroll, 
  useTransform,
  useSpring
} from "framer-motion";
import { 
  ArrowUp, Github, Linkedin, Twitter, Instagram, 
  Zap, Terminal, ArrowUpRight, 
  Server, ShieldCheck, Mail, 
  Cpu, LucideIcon
} from "lucide-react";

/**
 * --- 1. Types & Interfaces ---
 * Mendefinisikan tipe data agar TypeScript mengenali properti opsional.
 */
interface NavItem {
  label: string;
  href: string;
  badge?: string;    // Opsional: tidak semua punya badge
  external?: boolean; // Opsional: tidak semua link eksternal
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SocialItem {
  id: string;
  icon: LucideIcon;
  href: string;
  label: string;
  color: string;
}

interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

/**
 * --- 2. Configuration Data ---
 */
const FOOTER_CONFIG = {
  identity: {
    brand: "DEWA",
    dot: ".G",
    version: "PRO_CORE_v2.0.4",
    bio: "Membangun infrastruktur digital masa depan dengan presisi tingkat tinggi dan performa yang tidak kenal kompromi.",
  },
  links: [
    {
      title: "Navigation_Root",
      items: [
        { label: "Core_Interface", href: "/" },
        { label: "Laboratory", href: "/archive", badge: "New" },
        { label: "System_Log", href: "/changelog" },
        { label: "Knowledge_Base", href: "/docs" },
      ],
    } as NavGroup,
    {
      title: "Artifact_Archive",
      items: [
        { label: "Projects_2026", href: "/archive?year=2026" },
        { label: "Legacy_Vault", href: "/archive?status=archived" },
        { label: "Source_Index", href: "https://github.com", external: true },
        { label: "UI_Components", href: "/components" },
      ],
    } as NavGroup,
  ],
  socials: [
    { id: "gh", icon: Github, href: "https://github.com/dewagibran0-oss", label: "Github", color: "hover:bg-white hover:text-black" },
    { id: "li", icon: Linkedin, href: "https://www.linkedin.com/in/dewa-gibran-393b253b2/", label: "LinkedIn", color: "hover:bg-blue-600 hover:text-white" },
    { id: "tw", icon: Twitter, href: "#", label: "X_Corp", color: "hover:bg-zinc-800 hover:text-white" },
    { id: "ig", icon: Instagram, href: "https://www.instagram.com/dwaagbrnn/", label: "Instagram", color: "hover:bg-gradient-to-tr hover:from-yellow-500 hover:to-purple-500 hover:text-white" },
  ] as SocialItem[],
  stats: [
    { label: "System_Status", value: "Operational", icon: ShieldCheck, color: "text-emerald-500" },
    { label: "Server_Region", value: "ID-JKT-01", icon: Server, color: "text-cyan-500" },
    { label: "Active_Load", value: "0.002ms", icon: Zap, color: "text-amber-500" },
  ] as StatItem[]
};

// Penggunaan 'as const' untuk memperbaiki error Easing
const EASE_CUSTOM = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_CUSTOM } }
};

/**
 * --- 3. Sub-Components ---
 */
const SystemBadge = memo(({ label, value, icon: Icon, color }: StatItem) => (
  <div className="flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/[0.05] transition-colors group cursor-default">
    <Icon size={14} className={`${color} group-hover:scale-110 transition-transform`} />
    <div className="flex flex-col gap-0.5">
      <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">{label}</span>
      <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider">{value}</span>
    </div>
  </div>
));
SystemBadge.displayName = "SystemBadge";

export default function XSystemsFooterV2() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  const yRange = useTransform(scrollYProgress, [0.8, 1], [0, -50]);
  const smoothY = useSpring(yRange, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!mounted) return null;

  return (
    <footer className="relative bg-[#050505] pt-32 pb-12 px-8 overflow-hidden border-t border-white/[0.05]">
      
      {/* Background Grid */}
      <motion.div style={{ y: smoothY }} className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </motion.div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          
          {/* Identity */}
          <motion.div 
            className="lg:col-span-4 space-y-10"
            initial="initial" whileInView="animate" variants={containerVariants} viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex flex-col gap-1">
                <Link href="/" className="inline-block group">
                  <h2 className="text-5xl font-black tracking-[-0.05em] text-white">
                    {FOOTER_CONFIG.identity.brand}
                    <span className="text-cyan-500 group-hover:text-purple-500 transition-colors duration-500">
                      {FOOTER_CONFIG.identity.dot}
                    </span>
                  </h2>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-px w-8 bg-cyan-500/50" />
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em]">
                    {FOOTER_CONFIG.identity.version}
                  </span>
                </div>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed font-light max-w-sm">
                {FOOTER_CONFIG.identity.bio}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              {FOOTER_CONFIG.stats.map((stat) => (
                <SystemBadge key={stat.label} {...stat} />
              ))}
            </motion.div>
          </motion.div>

          {/* Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {FOOTER_CONFIG.links.map((group) => (
              <motion.div 
                key={group.title}
                className="space-y-8"
                initial="initial" whileInView="animate" variants={containerVariants} viewport={{ once: true }}
              >
                <motion.h4 variants={itemVariants} className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-[0.4em]">
                  {group.title}
                </motion.h4>
                <nav className="flex flex-col gap-5">
                  {group.items.map((item) => (
                    <motion.div key={item.label} variants={itemVariants}>
                      <Link 
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        className="group flex items-center justify-between text-zinc-500 hover:text-white transition-all font-mono text-[11px] tracking-widest"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-0 group-hover:w-3 h-[1px] bg-cyan-500 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-500 text-[8px] animate-pulse">
                            {item.badge}
                          </span>
                        )}
                        {item.external && <ArrowUpRight size={10} className="text-zinc-700 group-hover:text-cyan-500" />}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            ))}
          </div>

          {/* Communication */}
          <motion.div 
            className="lg:col-span-4 flex flex-col items-start lg:items-end gap-10"
            initial="initial" whileInView="animate" variants={containerVariants} viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="w-full relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2.2rem]" />
              <div className="relative p-10 rounded-[2rem] bg-zinc-900/40 border border-white/[0.05] backdrop-blur-2xl space-y-8 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4">
                  <Mail size={120} />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-cyan-500">
                    <Terminal size={20} />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em]">Initialize_Contact</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Siap Untuk Deployment?</h3>
                  <p className="text-zinc-500 text-sm font-light leading-relaxed">
                    Buka protokol komunikasi dan mari kita bangun sesuatu yang revolusioner bersama.
                  </p>
                </div>
                <Link 
                  href="mailto:dewagibran0@gmail.com"
                  className="group flex items-center justify-center gap-3 w-full py-4 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-cyan-500 transition-all active:scale-95"
                >
                  Start_Protocol <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={itemVariants} className="flex gap-4">
              {FOOTER_CONFIG.socials.map((social) => {
                const Icon = social.icon; // Gunakan variabel kapital agar React tidak error
                return (
                  <Link 
                    key={social.id} 
                    href={social.href}
                    target="_blank"
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.08] text-zinc-500 transition-all duration-300 ${social.color} hover:border-transparent hover:-translate-y-2`}
                    aria-label={social.label}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </Link>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/[0.05] flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10">
            <div className="flex items-center gap-4">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-20"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.3em]">Temporal_Status</span>
                <span className="text-[12px] font-mono text-white tracking-widest tabular-nums">{time} (UTC+7)</span>
              </div>
            </div>
            <div className="hidden sm:block h-10 w-px bg-zinc-800/50" />
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                <Cpu size={14} className="text-zinc-600" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.3em]">Host_Architecture</span>
                <span className="text-[12px] font-mono text-zinc-400 uppercase tracking-widest">Next.js_v15_Stable</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-4">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] leading-relaxed">
              © 2026 <span className="text-white font-bold">DEWA_AHMAD_GIBRAN</span> // DESIGNED_AND_ENGINEERED
            </p>
            <div className="flex items-center gap-8">
              <Link href="/privacy" className="text-[9px] font-mono text-zinc-700 hover:text-white transition-colors uppercase tracking-[0.3em]">Privacy_Protocol</Link>
              <button 
                onClick={handleBackToTop}
                className="group flex items-center gap-3 text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em] hover:text-white transition-colors"
              >
                Back_to_Root <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 h-1 w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-20" />
    </footer>
  );
}