"use client";

import React, { useEffect, useState, memo, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  Variants
} from "framer-motion";
import { 
  ArrowUp, Github, Linkedin, Twitter, Instagram, 
  Zap, Terminal, ArrowUpRight, 
  Server, ShieldCheck, Mail, 
  Cpu, LucideIcon
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";

type FooterKey = keyof Dictionary["footer"];

/**
 * --- 1. Types & Interfaces ---
 * Mendefinisikan tipe data agar TypeScript mengenali properti opsional.
 */
interface NavItem {
  labelKey: FooterKey;  // Kunci ke dictionary.footer, bukan teks mentah
  href: string;
  badge?: string;    // Opsional: tidak semua punya badge
  external?: boolean; // Opsional: tidak semua link eksternal
}

interface NavGroup {
  titleKey: FooterKey;
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
    version: "Portfolio 2026",
  },
  links: [
    {
      titleKey: "navRoot",
      items: [
        { labelKey: "coreInterface", href: "/" },
        { labelKey: "laboratory", href: "/archive", badge: "New" },
        { labelKey: "systemLog", href: "/changelog" },
        { labelKey: "knowledgeBase", href: "/docs" },
      ],
    } as NavGroup,
    {
      titleKey: "archiveGroup",
      items: [
        { labelKey: "projects2026", href: "/archive?year=2026" },
        { labelKey: "legacyVault", href: "/archive?status=archived" },
        { labelKey: "sourceIndex", href: "https://github.com", external: true },
        { labelKey: "uiComponents", href: "/components" },
      ],
    } as NavGroup,
  ],
  socials: [
    { id: "gh", icon: Github, href: "https://github.com/dewagibran0-oss", label: "Github", color: "hover:bg-white hover:text-black" },
    { id: "li", icon: Linkedin, href: "https://www.linkedin.com/in/dewa-gibran-393b253b2/", label: "LinkedIn", color: "hover:bg-blue-600 hover:text-white" },
    { id: "tw", icon: Twitter, href: "#", label: "X", color: "hover:bg-zinc-800 hover:text-white" },
    { id: "ig", icon: Instagram, href: "https://www.instagram.com/dwaagbrnn/", label: "Instagram", color: "hover:bg-gradient-to-tr hover:from-yellow-500 hover:to-purple-500 hover:text-white" },
  ] as SocialItem[],
  stats: [
    { label: "Status", value: "Tersedia", icon: ShieldCheck, color: "text-emerald-600" },
    { label: "Lokasi", value: "Jakarta, ID", icon: Server, color: "text-[var(--maroon)]" },
    { label: "Respons", value: "< 24 jam", icon: Zap, color: "text-amber-600" },
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
  <div className="flex items-center gap-3 px-4 py-2 bg-[var(--bg-card)] border border-[var(--hairline)] rounded-xl transition-colors group cursor-default">
    <Icon size={14} className={`${color} group-hover:scale-110 transition-transform`} />
    <div className="flex flex-col gap-0.5">
      <span className="text-[8px] font-medium text-zinc-600 uppercase tracking-widest">{label}</span>
      <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider">{value}</span>
    </div>
  </div>
));
SystemBadge.displayName = "SystemBadge";

export default function XSystemsFooterV2() {
  const { t } = useLang();
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

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
    <footer className="relative bg-[var(--bg-elevated)] pt-32 pb-12 px-8 overflow-hidden border-t border-[var(--hairline)]">

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
                    <span className="text-[var(--maroon)] group-hover:text-[var(--maroon-strong)] transition-colors duration-500">
                      {FOOTER_CONFIG.identity.dot}
                    </span>
                  </h2>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-px w-8 bg-[var(--maroon)]/50" />
                  <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-[0.5em]">
                    {FOOTER_CONFIG.identity.version}
                  </span>
                </div>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed font-light max-w-sm">
                {t.footer.bio}
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
                key={group.titleKey}
                className="space-y-8"
                initial="initial" whileInView="animate" variants={containerVariants} viewport={{ once: true }}
              >
                <motion.h4 variants={itemVariants} className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.4em]">
                  {t.footer[group.titleKey]}
                </motion.h4>
                <nav className="flex flex-col gap-5">
                  {group.items.map((item) => (
                    <motion.div key={item.labelKey} variants={itemVariants}>
                      <Link
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        className="group flex items-center justify-between text-zinc-500 hover:text-white transition-all text-[11px] font-medium tracking-widest"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-0 group-hover:w-3 h-[1px] bg-[var(--maroon)] transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                          {t.footer[item.labelKey]}
                        </span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded bg-[var(--maroon)]/10 text-[var(--maroon)] text-[8px]">
                            {item.badge}
                          </span>
                        )}
                        {item.external && <ArrowUpRight size={10} className="text-zinc-700 group-hover:text-[var(--maroon)]" />}
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
              <div className="relative p-10 rounded-[2rem] bg-[var(--bg-card)] border border-[var(--hairline)] space-y-8 overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4">
                  <Mail size={120} />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[var(--maroon)]">
                    <Terminal size={20} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em]">{t.footer.initContact}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{t.footer.ready}</h3>
                  <p className="text-zinc-500 text-sm font-light leading-relaxed">
                    {t.footer.readyDesc}
                  </p>
                </div>
                <Link
                  href="mailto:dewagibran0@gmail.com"
                  className="group flex items-center justify-center gap-3 w-full py-4 bg-[var(--maroon)] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-[var(--maroon-strong)] transition-all active:scale-95"
                >
                  {t.footer.startProtocol} <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
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
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-[var(--bg-card)] border border-[var(--hairline)] text-zinc-500 transition-all duration-300 ${social.color} hover:border-transparent hover:-translate-y-2`}
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
        <div className="pt-12 border-t border-[var(--hairline)] flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10">
            <div className="flex items-center gap-4">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--maroon)]" />
              <div className="flex flex-col items-start">
                <span className="text-[8px] font-medium text-zinc-600 uppercase tracking-[0.3em]">Waktu lokal</span>
                <span className="text-[12px] text-white tracking-widest tabular-nums">{time} (UTC+7)</span>
              </div>
            </div>
            <div className="hidden sm:block h-10 w-px bg-[var(--hairline)]" />
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[var(--bg-card)] rounded-lg border border-[var(--hairline)]">
                <Cpu size={14} className="text-zinc-600" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[8px] font-medium text-zinc-600 uppercase tracking-[0.3em]">Dibangun dengan</span>
                <span className="text-[12px] text-zinc-400 uppercase tracking-widest">Next.js</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-4">
            <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-[0.4em] leading-relaxed">
              © 2026 <span className="text-white font-bold">Dewa Ahmad Gibran</span>
            </p>
            <div className="flex items-center gap-8">
              <Link href="/privacy" className="text-[9px] font-medium text-zinc-700 hover:text-white transition-colors uppercase tracking-[0.3em]">{t.footer.privacy}</Link>
              <button
                onClick={handleBackToTop}
                className="group flex items-center gap-3 text-[10px] font-semibold text-[var(--maroon)] uppercase tracking-[0.3em] hover:text-white transition-colors"
              >
                {t.footer.backToTop} <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 h-px w-full bg-[var(--hairline)]" />
    </footer>
  );
}