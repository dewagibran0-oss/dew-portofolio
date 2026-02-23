"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Copy, Check, Mail, 
  Linkedin, Github, Instagram, ArrowUpRight, 
  Terminal, ShieldCheck, Globe, Clock, Cpu
} from "lucide-react";

/**
 * Configuration Constants
 */
const EMAIL_DATA = {
  address: "dewagibran0@gmail.com",
  display: "DEWAGIBRAN0@GMAIL.COM"
};

const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/dewa-gibran-393b253b2/", icon: <Linkedin size={14} /> },
  { name: "Github", href: "https://github.com/dewagibran0-oss", icon: <Github size={14} /> },
  { name: "Instagram", href: "https://www.instagram.com/dwaagbrnn/", icon: <Instagram size={14} /> },
];

export default function ContactProduction() {
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

  if (!mounted) return <div className="min-h-[80vh] bg-[#030303]" />;

  return (
    <section className="relative py-32 md:py-48 px-6 bg-[#030303] overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/[0.03] blur-[120px] rounded-full" />
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
              className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em] font-semibold">Ready_to_Collaborate</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[0.85] mb-8 font-space">
                Elevate Your <br />
                <span className="text-zinc-800 italic font-light">Digital Core.</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed max-w-md">
                Menyatukan arsitektur teknis yang kuat dengan desain yang intuitif. 
                Mari diskusikan visi Anda menjadi kenyataan digital.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="flex items-center gap-3 px-5 py-2.5 bg-zinc-900/30 border border-zinc-800/50 rounded-xl text-zinc-400 font-mono text-[11px] uppercase tracking-widest transition-all"
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
              className="relative rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 shadow-2xl overflow-hidden"
            >
              {/* Terminal Title Bar */}
              <div className="bg-zinc-900/50 px-8 py-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                </div>
                <div className="flex items-center gap-2 text-zinc-600 font-mono text-[10px] tracking-widest">
                  <Terminal size={12} /> SESSION_ID: DG-7782-X
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-8 md:p-14 space-y-12">
                <div className="space-y-4">
                  <h3 className="text-zinc-400 font-mono text-sm uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="text-cyan-500">{">"}</span> Initialize_Inquiry
                  </h3>
                  <p className="text-zinc-600 font-mono text-xs leading-relaxed max-w-xl">
                    Sistem siap menerima instruksi. Tekan tombol salin atau klik tombol kirim 
                    untuk membuka protokol komunikasi langsung.
                  </p>
                </div>

                {/* Email Display Interaction */}
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 bg-zinc-900/40 border border-white/5 rounded-3xl gap-6">
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-black rounded-2xl text-cyan-500 shadow-inner">
                        <Mail size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-zinc-600 uppercase mb-1 tracking-widest">Master_Address</div>
                        <div className="text-white font-mono text-sm md:text-xl font-bold tracking-tight">{EMAIL_DATA.display}</div>
                      </div>
                    </div>

                    <motion.button 
                      onClick={copyToClipboard}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                            <Check size={16} /> DONE
                          </motion.span>
                        ) : (
                          <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                            <Copy size={16} /> COPY_UID
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-10 border-t border-white/5 gap-6">
                  <div className="flex items-center gap-3 text-zinc-600 font-mono text-[10px] uppercase">
                    <ShieldCheck size={14} className="text-emerald-500/50" />
                    Secure_SSL_V3
                  </div>
                  <motion.a 
                    href={`mailto:${EMAIL_DATA.address}`}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-cyan-500 font-mono text-[11px] font-bold uppercase tracking-[0.2em] group"
                  >
                    Open_In_Mail_App <Send size={14} className="group-hover:rotate-12 transition-transform" />
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
          <div className="p-6 bg-zinc-900/20 border border-white/5 rounded-2xl flex items-center gap-4">
            <Clock className="text-zinc-700" size={20} />
            <div>
              <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Current_Local_Time</p>
              <p className="text-xs font-mono text-zinc-400">{currentTime || "SYNCING..."} WIB</p>
            </div>
          </div>
          <div className="p-6 bg-zinc-900/20 border border-white/5 rounded-2xl flex items-center gap-4">
            <Globe className="text-zinc-700" size={20} />
            <div>
              <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Base_Location</p>
              <p className="text-xs font-mono text-zinc-400">JAKARTA, ID_SYS</p>
            </div>
          </div>
          <div className="p-6 bg-zinc-900/20 border border-white/5 rounded-2xl flex items-center gap-4">
            <Cpu className="text-zinc-700" size={20} />
            <div>
              <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Uptime_Status</p>
              <p className="text-xs font-mono text-zinc-400">99.9%_OPERATIONAL</p>
            </div>
          </div>
          <div className="p-6 bg-zinc-900/20 border border-white/5 rounded-2xl flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            <div>
              <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Global_Latency</p>
              <p className="text-xs font-mono text-zinc-400">STABLE_12MS</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}