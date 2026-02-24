"use client";

import React, { useRef, useMemo } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { IconType } from "react-icons";
import { 
  SiNextdotjs, SiTypescript, SiReact, SiTailwindcss, 
  SiNodedotjs, SiPostgresql, SiPrisma, SiDocker, 
  SiGit, SiVercel, SiFigma, SiThreedotjs, SiAdobephotoshop,
  SiAdobepremierepro, SiCanva, SiGo
} from "react-icons/si";

// --- 1. Types & Data ---
interface Skill {
  name: string;
  icon: IconType;
  category: "frontend" | "backend" | "tools" | "creative";
  level: string;
  color: string;
}

const SKILLS_DATA: Skill[] = [
  { name: "Next.js", icon: SiNextdotjs, category: "frontend", level: "Expert", color: "#ffffff" },
  { name: "TypeScript", icon: SiTypescript, category: "frontend", level: "Expert", color: "#3178c6" },
  { name: "React", icon: SiReact, category: "frontend", level: "Expert", color: "#61dafb" },
  { name: "Three.js", icon: SiThreedotjs, category: "frontend", level: "Advanced", color: "#ffffff" },
  { name: "Tailwind", icon: SiTailwindcss, category: "frontend", level: "Expert", color: "#38bdf8" },
  { name: "Node.js", icon: SiNodedotjs, category: "backend", level: "Advanced", color: "#339933" },
  { name: "Go", icon: SiGo, category: "backend", level: "Intermediate", color: "#00add8" },
  { name: "Postgres", icon: SiPostgresql, category: "backend", level: "Advanced", color: "#4169e1" },
  { name: "Prisma", icon: SiPrisma, category: "backend", level: "Advanced", color: "#2d3748" },
  { name: "Docker", icon: SiDocker, category: "tools", level: "Intermediate", color: "#2496ed" },
  { name: "Git", icon: SiGit, category: "tools", level: "Expert", color: "#f05032" },
  { name: "Vercel", icon: SiVercel, category: "tools", level: "Expert", color: "#ffffff" },
  { name: "Figma", icon: SiFigma, category: "creative", level: "Expert", color: "#f24e1e" },
  { name: "Photoshop", icon: SiAdobephotoshop, category: "creative", level: "Advanced", color: "#31a8ff" },
  { name: "Premiere", icon: SiAdobepremierepro, category: "creative", level: "Advanced", color: "#ea77ff" },
  { name: "Canva", icon: SiCanva, category: "creative", level: "Expert", color: "#00c4cc" },
];

// --- 2. Optimized Variants ---
// Gunakan transform (y, scale) daripada properti layout untuk performa GPU
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};

// --- 3. Optimized Sub-Components ---

// Gunakan React.memo untuk mencegah re-render kartu yang tidak perlu
const SkillCard = React.memo(({ skill }: { skill: Skill }) => {
  const Icon = skill.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      // will-change memberitahu browser untuk menyiapkan GPU layer
      className="group relative h-full will-change-transform"
    >
      <div 
        className="absolute inset-0 blur-2xl rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" 
        style={{ backgroundColor: skill.color }}
      />
      
      <div className="relative h-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col items-center md:items-start gap-5 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/[0.06]">
        <div 
          className="p-3 rounded-xl bg-white/5 transition-transform duration-500 group-hover:scale-110"
          style={{ color: skill.color }}
        >
          <Icon size={32} />
        </div>
        
        <div className="text-center md:text-left">
          <h3 className="text-white font-bold tracking-tight text-lg leading-none">
            {skill.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
              {skill.level}
            </p>
          </div>
        </div>

        <span className="absolute top-4 right-4 text-[7px] font-mono text-white/10 uppercase tracking-tighter">
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
});

SkillCard.displayName = "SkillCard";

const MarqueeRow = React.memo(({ items, direction = "left", speed = 60 }: { items: Skill[], direction?: "left" | "right", speed?: number }) => (
  <div className="flex w-full overflow-hidden py-8 select-none border-y border-white/[0.02] relative">
    <motion.div 
      // Menggunakan x persentase jauh lebih ringan daripada pixel
      animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ 
        duration: speed, 
        repeat: Infinity, 
        ease: "linear",
      }}
      className="flex flex-nowrap gap-16 items-center will-change-transform"
    >
      {/* Cukup 2 iterasi untuk loop marquee yang sempurna (mengurangi jumlah DOM nodes) */}
      {[0, 1].map((i) => (
        <div key={`marquee-group-${i}`} className="flex gap-16 items-center">
          {items.map((skill, idx) => (
            <div 
              key={`${skill.name}-${i}-${idx}`} 
              className="flex items-center gap-4 opacity-20 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              <skill.icon className="text-4xl md:text-6xl" style={{ color: skill.color }} />
              <span className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  </div>
));

MarqueeRow.displayName = "MarqueeRow";

// --- 4. Main Section ---

export default function Skills() {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Pemicu animasi hanya jika benar-benar terlihat
  const isInView = useInView(scrollRef, { once: true, margin: "-10% 0px" });

  const techSkills = useMemo(() => SKILLS_DATA.filter(s => s.category !== "creative"), []);
  const creativeSkills = useMemo(() => SKILLS_DATA.filter(s => s.category === "creative"), []);

  return (
    <section 
      id="skills" 
      ref={scrollRef}
      className="relative w-full py-24 overflow-hidden bg-[#020617]"
    >
      {/* Background Orbs dioptimalkan dengan opacity rendah agar tidak berat saat scrolling */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-20">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-[-0.06em] leading-[0.85] uppercase">
              Toolbox <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
                & Stack
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4 border-l border-white/10 pl-6"
          >
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Kombinasi antara presisi pemrograman dan kebebasan kreatif.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/5 text-white/50 text-[10px] font-mono rounded-full border border-white/10">Engineering</span>
              <span className="px-3 py-1 bg-white/5 text-white/50 text-[10px] font-mono rounded-full border border-white/10">Design</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {SKILLS_DATA.map((skill) => (
            <SkillCard key={`grid-${skill.name}`} skill={skill} />
          ))}
        </motion.div>
      </div>

      {/* Marquee Section */}
      <div className="mt-32 flex flex-col gap-0 opacity-30 hover:opacity-100 transition-opacity duration-500">
        <MarqueeRow items={techSkills} direction="left" speed={100} />
        <MarqueeRow items={creativeSkills} direction="right" speed={80} />
      </div>
    </section>
  );
}