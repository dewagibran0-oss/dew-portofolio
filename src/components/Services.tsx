"use client";

import React, { useRef, useMemo, useState } from "react";
import { 
  motion, 
  useInView, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate,
  AnimatePresence 
} from "framer-motion";
import { 
  Cpu, Layers, ArrowRight, Database, Zap, 
  ShieldCheck, MousePointer2, X, CheckCircle2,
  Sparkles, Globe, ZapIcon, LucideIcon
} from "lucide-react";

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
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] cursor-zoom-out"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[700px] md:h-auto max-h-[90vh] bg-[#0C0C0E] border border-white/10 rounded-[3rem] z-[101] overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: service.color }} />
            
            <div className="p-8 md:p-12 overflow-y-auto max-h-full">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <service.icon size={32} style={{ color: service.color }} />
                </div>
                <div>
                  <span className="text-secondary font-mono text-[10px] tracking-widest uppercase">{service.subtitle}</span>
                  <h3 className="text-3xl font-bold text-white tracking-tighter">{service.title}</h3>
                </div>
              </div>

              <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-light">
                {service.longDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 italic">
                    <Sparkles size={16} className="text-secondary" /> Key Capabilities
                  </h4>
                  {service.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-zinc-500 text-sm">
                      <CheckCircle2 size={14} style={{ color: service.color }} /> {f}
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 italic">
                    <ZapIcon size={16} className="text-secondary" /> Impact
                  </h4>
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                    <span className="text-4xl font-black text-white tracking-tighter">{service.stats}</span>
                    <p className="text-xs text-zinc-600 mt-2 uppercase tracking-widest">Performance Increase</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-secondary transition-colors"
              >
                Close Analysis
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Sub-Component: Service Card ---
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
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
        <div className="relative h-full w-full bg-[#09090B] border border-white/5 rounded-[3rem] p-10 overflow-hidden flex flex-col group-hover:border-white/20 transition-all duration-500">
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
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover/link:text-white">Analyze Case</span>
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

  const services: Service[] = useMemo(() => [
    {
      id: "01",
      title: "Web Ecosystem",
      subtitle: "Web Development",
      description: "Membangun sistem informasi berbasis web yang responsif dengan fokus pada efisiensi operasional.",
      longDescription: "Implementasi solusi web menggunakan HTML5, CSS3, Javascript, NodeJs, ReactJs, PHP, dan Laravel untuk digitalisasi alur kerja administrasi dan manajemen data.",
      features: ["Responsive Design", "Clean Code", "Optimized Loading"],
      tech: ["HTML", "CSS", "JavaScript"],
      color: "#3b82f6",
      icon: Cpu, // Menggambarkan kemampuan coding kamu
      stats: "SEO Friendly"
    },
    {
      id: "02",
      title: "Data Integrity",
      subtitle: "Digital Administration",
      description: "Manajemen dokumen dan database operasional dengan tingkat akurasi tinggi.",
      longDescription: "Pengelolaan dokumen Delivery Order (DO) dan logistik pelayaran menggunakan sistem digital untuk memastikan keamanan data aset perusahaan.",
      features: ["Database Management", "Zero-Error Entry", "Digital Filing"],
      tech: ["SQL", "Advanced Excel", "Google Sheets"],
      color: "#a855f7",
      icon: Database, // Menggambarkan fokus kamu di admin data
      stats: "100% Accuracy"
    },
    {
      id: "03",
      title: "Infra-Support",
      subtitle: "IT Support & Ops",
      description: "Maintenance infrastruktur IT internal dan troubleshooting perangkat keras/lunak.",
      longDescription: "Memastikan kelancaran operasional harian kantor melalui pemeliharaan sistem informasi dan dukungan teknis proaktif bagi pengguna.",
      features: ["Hardware Maintenance", "System Diagnostics", "User Support"],
      tech: ["Windows/OS", "Hardware", "Networking"],
      color: "#fbbf24",
      icon: Zap, // Menggambarkan kecepatan respon IT Support
      stats: "Fast Response"
    },
    {
      id: "04",
      title: "Workflow Logic",
      subtitle: "System Architecture",
      description: "Otomatisasi alur kerja administrasi konvensional menjadi digital (paperless).",
      longDescription: "Merancang logika sistem informasi sederhana yang mengintegrasikan pengadaan (procurement) dengan dokumentasi digital yang terpusat.",
      features: ["Paperless Flow", "Procurement Logic", "Task Automation"],
      tech: ["Office 365", "Workflow Design", "System Log"],
      color: "#10b981",
      icon: Layers, // Menggambarkan lapisan sistem yang kamu bangun
      stats: "Efficient Ops"
    }
  ], []);

  return (
    <section ref={sectionRef} id="services" className="relative py-40 bg-[#020202] overflow-hidden">
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
                <span className="text-secondary font-mono text-xs tracking-[0.5em] uppercase">Core Expertise</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase italic">
                Defined <br /> <span className="text-zinc-800">Future.</span>
              </h2>
            </div>
            <div className="lg:max-w-sm">
              <p className="text-zinc-500 text-lg font-light leading-relaxed border-l-2 border-secondary pl-8">
                Kami menggabungkan seni desain dengan presisi rekayasa untuk menciptakan solusi digital yang tak tertandingi.
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
            className="group relative bg-[#080808] rounded-[3.9rem] p-16 md:p-24 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 cursor-pointer transition-all hover:bg-black"
          >
            <div className="relative z-10">
              <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4">Mulai Proyek <br /> Impian Anda.</h3>
              <p className="text-zinc-500 text-xl font-light">Konsultasikan visi Anda secara gratis hari ini.</p>
            </div>
            
            <div className="relative z-10">
              <div className="w-40 h-40 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-secondary transition-all duration-700">
                <div className="text-center group-hover:text-secondary transition-colors">
                  <Globe className="mx-auto mb-2 animate-spin-slow" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Connect Now</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}