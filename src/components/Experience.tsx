"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  AnimatePresence,
  useInView
} from "framer-motion";
import { 
  Briefcase, GraduationCap, Calendar, 
  ChevronRight, Cpu, X, CheckCircle2, 
  Terminal, ExternalLink, Activity
} from "lucide-react";

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

const DATA: Experience[] = [
  // {
  //   id: "01",
  //   type: "work",
  //   period: "2025 - PRESENT", // Sesuaikan tahunnya
  //   role: "Procurement & System Support",
  //   org: "PT. Cladhist Utama Karya",
  //   desc: "Manajemen database pengadaan barang/jasa dan dokumentasi transaksi digital.",
  //   fullLog: "Bertanggung jawab atas akurasi database vendor dan aset perusahaan. Mengimplementasikan sistem pengarsipan digital untuk mempermudah audit pengadaan dan pelaporan aset.",
  //   achievements: ["Vendor Database Audit", "Digital Archive System", "Efficient Procurement"],
  //   tags: ["Procurement", "Digital Filing", "Inventory"],
  //   status: "ACTIVE_CONTRACT"
  // },
  {
    id: "01",
    type: "work",
    period: "2024 - 2025", // Sesuaikan tahunnya
    role: "Digital Administration Specialist",
    org: "PT. Sembilan Dua Delapan",
    desc: "Optimasi pengelolaan Delivery Order (DO) dan validasi data logistik ekspor-impor.",
    fullLog: "Mengelola siklus dokumen container dengan ketelitian tinggi. Menggunakan teknik pengolahan data digital untuk memastikan validitas manifest dan koordinasi logistik yang tanpa hambatan.",
    achievements: ["Zero-Error Documentation", "DO System Optimization", "Export-Import Flow"],
    tags: ["Logistics Tech", "Data Validation", "Excel Expert"],
    status: "COMPLETED"
  },
  {
    id: "02",
    type: "work",
    period: "2023 — PRESENT",
    role: "Administrative & IT Operations",
    org: "PT. Tujuh Tunas Satu Samudera",
    desc: "Digitalisasi sistem administrasi pelayaran dan pemeliharaan infrastruktur IT operasional.",
    fullLog: "Mengintegrasikan sistem manajemen dokumen kapal ke format digital untuk meningkatkan efisiensi akses data. Bertanggung jawab atas troubleshooting perangkat keras dan kelancaran sistem informasi internal perusahaan.",
    achievements: ["Digital Workflow Migration", "99% Data Accuracy", "Internal IT Support"],
    tags: ["Digital Admin", "System Support", "Logistics"],
    status: "ACTIVE_CONTRACT"
  },
  {
    id: "03",
    type: "education",
    period: "2024 — NOW",
    role: "S1 Informatika",
    org: "Universitas Bakrie",
    desc: "Fokus pada pengembangan sistem informasi, manajemen basis data, dan rekayasa web.",
    fullLog: "Mendalami struktur data, algoritma, dan arsitektur aplikasi modern. Aktif dalam pengembangan solusi teknologi yang relevan dengan kebutuhan efisiensi industri.",
    achievements: ["Dean's List Candidate", "Web Dev Projects", "Database Design"],
    tags: ["Computer Science", "Systems Design", "Fullstack Development"],
  },
  {
    id: "04",
    type: "education",
    period: "2021 — 2024",
    role: "Rekayasa Perangkat Lunak (RPL)",
    org: "SMK 17 Agustus 1945",
    desc: "Fondasi pemrograman, logika algoritma, dan siklus pengembangan perangkat lunak.",
    fullLog: "Mempelajari fundamental coding (HTML/CSS/JS/PHP) dan perancangan database sejak dini. Berhasil menyelesaikan berbagai proyek aplikasi web sederhana sebagai syarat kelulusan.",
    achievements: ["Vocational Excellence", "Junior Programmer", "Software Logic"],
    tags: ["Software Engineering", "Coding Basics", "Logic"],
  }
];

// --- Sub-Component: Experience Modal ---
const ExperienceModal = ({ item, isOpen, onClose }: { item: Experience; isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] cursor-zoom-out"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] bg-[#0A0A0B] border border-white/10 rounded-[2.5rem] z-[101] overflow-hidden shadow-2xl"
          >
            <div className="p-8 md:p-12 relative overflow-y-auto max-h-[85vh]">
              <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>

              <div className="flex items-center gap-3 mb-6 text-cyan-500 font-mono text-[10px] tracking-widest uppercase">
                <Terminal size={14} />
                <span>LOG_FILE: {item.id}</span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-2 tracking-tighter">{item.role}</h3>
              <p className="text-zinc-500 mb-8">{item.org} • {item.period}</p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Activity size={14} className="text-cyan-500" /> Executive_Summary
                  </h4>
                  <p className="text-zinc-400 leading-relaxed font-light">{item.fullLog}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 italic">Key_Achievements</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {item.achievements.map((acc, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-300">
                        <CheckCircle2 size={14} className="text-cyan-500" />
                        {acc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full mt-10 py-4 bg-cyan-500 text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-colors"
              >
                Close_Terminal
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Sub-Component: Timeline Item ---
function TimelineItem({ item, index }: { item: Experience, index: number }) {
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
            "{item.desc}"
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {item.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-cyan-500 transition-colors">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">
            <span>Read_Full_Log</span>
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#020202] py-40 md:py-60 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-40 space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-cyan-500" />
            <span className="text-cyan-500 font-mono text-xs uppercase tracking-[0.5em]">Career_Matrix_v4.0</span>
          </motion.div>
          
          <motion.h2 
            style={{ opacity }}
            className="text-7xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic"
          >
            History <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-600">Encoded.</span>
          </motion.h2>
          
          <div className="flex justify-end">
            <p className="max-w-xs text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-r-2 border-cyan-500 pr-6 text-right">
              Rekam jejak profesional dalam pengembangan sistem dan arsitektur infrastruktur digital tingkat lanjut.
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
            {DATA.map((item, index) => (
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
              <span>Lead_System_Architect</span>
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