"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Copy, Check, Mail, 
  Linkedin, Github, Instagram, 
  Terminal, ShieldCheck, Globe, Clock, Cpu
} from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * Configuration Constants
 */
const EMAIL_DATA = {
  address: "dewagibran0@gmail.com",
  display: "dewagibran0@gmail.com"
};

const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/dewa-gibran-393b253b2/", icon: <Linkedin size={14} /> },
  { name: "Github", href: "https://github.com/dewagibran0-oss", icon: <Github size={14} /> },
  { name: "Instagram", href: "https://www.instagram.com/dwaagbrnn/", icon: <Instagram size={14} /> },
];

export default function ContactProduction() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Handle Hydration & Time
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_DATA.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  if (!mounted) return <div className="min-h-[80vh] bg-[var(--bg-deep)]" />;

  return (
    <section className="relative py-32 md:py-48 px-6 bg-[var(--bg-deep)] overflow-hidden">
      {/* Grid halus sebagai tekstur latar */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT CONTENT: Headline & Philosophy (5 Columns) */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-[var(--maroon)]/10 border border-[var(--maroon)]/25"
            >
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--maroon)]" />
              <span className="text-[var(--maroon)] text-[10px] uppercase tracking-[0.3em] font-semibold">{t.contact.badge}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[0.85] mb-8">
                {t.contact.titleTop} <br />
                <span className="text-[var(--maroon)] italic font-light">{t.contact.titleBottom}</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed max-w-md">
                {t.contact.paragraph}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-5 py-2.5 bg-[var(--bg-card)] border border-[var(--hairline)] rounded-xl text-zinc-400 text-[11px] font-medium uppercase tracking-widest transition-all hover:border-[var(--maroon)]/40 hover:text-[var(--maroon)]"
                >
                  {link.icon}
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT: The Terminal (7 Columns) */}
          <div className="lg:col-span-7 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] bg-[var(--bg-card)] border border-[var(--hairline)] shadow-xl overflow-hidden"
            >
              {/* Title Bar */}
              <div className="bg-[var(--bg-section)] px-8 py-5 border-b border-[var(--hairline)] flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                </div>
                <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-medium tracking-widest">
                  <Terminal size={12} /> {EMAIL_DATA.display}
                </div>
              </div>

              {/* Body */}
              <div className="p-8 md:p-14 space-y-12">
                <div className="space-y-4">
                  <h3 className="text-zinc-400 text-sm font-semibold uppercase tracking-[0.2em] flex items-center gap-2">
                    {t.contact.initInquiry}
                  </h3>
                  <p className="text-zinc-600 text-xs leading-relaxed max-w-xl">
                    {t.contact.terminalDesc}
                  </p>
                </div>

                {/* Email Display Interaction */}
                <div className="relative group cursor-pointer">
                  <div className="relative flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 bg-[var(--bg-section)] border border-[var(--hairline)] rounded-3xl gap-6">
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-[var(--maroon)]/10 rounded-2xl text-[var(--maroon)]">
                        <Mail size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-medium text-zinc-600 uppercase mb-1 tracking-widest">{t.contact.masterAddress}</div>
                        <div className="text-white text-sm md:text-xl font-bold tracking-tight">{EMAIL_DATA.display}</div>
                      </div>
                    </div>

                    <motion.button
                      onClick={copyToClipboard}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[var(--maroon)] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[var(--maroon-strong)] transition-all shadow-md"
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                            <Check size={16} /> {t.contact.copied}
                          </motion.span>
                        ) : (
                          <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                            <Copy size={16} /> {t.contact.copy}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-10 border-t border-[var(--hairline)] gap-6">
                  <div className="flex items-center gap-3 text-zinc-600 text-[10px] font-medium uppercase">
                    <ShieldCheck size={14} className="text-emerald-600/60" />
                    SSL
                  </div>
                  <motion.a
                    href={`mailto:${EMAIL_DATA.address}`}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-[var(--maroon)] text-[11px] font-bold uppercase tracking-[0.2em] group"
                  >
                    {t.contact.openMail} <Send size={14} className="group-hover:rotate-12 transition-transform" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SYSTEM STATUS FOOTER (Bento Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="p-6 bg-[var(--bg-card)] border border-[var(--hairline)] rounded-2xl flex items-center gap-4">
            <Clock className="text-zinc-700" size={20} />
            <div>
              <p className="text-[9px] font-medium text-zinc-700 uppercase tracking-widest">{t.contact.localTime}</p>
              <p className="text-xs text-zinc-400">{currentTime || "—"} WIB</p>
            </div>
          </div>
          <div className="p-6 bg-[var(--bg-card)] border border-[var(--hairline)] rounded-2xl flex items-center gap-4">
            <Globe className="text-zinc-700" size={20} />
            <div>
              <p className="text-[9px] font-medium text-zinc-700 uppercase tracking-widest">{t.contact.baseLocation}</p>
              <p className="text-xs text-zinc-400">Jakarta, Indonesia</p>
            </div>
          </div>
          <div className="p-6 bg-[var(--bg-card)] border border-[var(--hairline)] rounded-2xl flex items-center gap-4">
            <Cpu className="text-zinc-700" size={20} />
            <div>
              <p className="text-[9px] font-medium text-zinc-700 uppercase tracking-widest">{t.contact.uptime}</p>
              <p className="text-xs text-zinc-400">Senin — Sabtu</p>
            </div>
          </div>
          <div className="p-6 bg-[var(--bg-card)] border border-[var(--hairline)] rounded-2xl flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-600" />
            <div>
              <p className="text-[9px] font-medium text-zinc-700 uppercase tracking-widest">{t.contact.latency}</p>
              <p className="text-xs text-zinc-400">&lt; 24 jam</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}