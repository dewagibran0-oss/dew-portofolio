"use client";

import React, { useRef, useMemo } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { IconType } from "react-icons";
import { 
  SiNextdotjs, SiTypescript, SiReact, SiTailwindcss, 
  SiNodedotjs, SiPostgresql, SiFlutter, SiDart, SiMysql, SiMongodb, SiDocker, 
  SiGit, SiVercel, SiFigma, SiThreedotjs, SiAdobephotoshop,
  SiAdobepremierepro, SiCanva, SiGo, SiGithub, SiPhp, SiLaravel, SiHtml5, SiCss3, SiJavascript
} from "react-icons/si";
import { RiFileWord2Fill, RiFileExcel2Fill, RiFilePpt2Fill } from "react-icons/ri";

// --- 1. Types & Data ---
interface Skill {
  name: string;
  icon: IconType;
  category: "frontend" | "backend" | "tools" | "creative" | "mobile"| "database";
  level: string;
  color: string;
}

const SKILLS_DATA: Skill[] = [
  { name: "HTML", icon: SiHtml5, category: "frontend", level: "Expert", color: "#E5532F" },
  { name: "CSS", icon: SiCss3, category: "frontend", level: "Expert", color: "#2D53E5" },
  { name: "Javascript", icon: SiJavascript, category: "backend", level: "Expert", color: "#F7E02A" },
  { name: "Next.js", icon: SiNextdotjs, category: "frontend", level: "Expert", color: "#ffffff" },
  { name: "TypeScript", icon: SiTypescript, category: "frontend", level: "Expert", color: "#3178c6" },
  { name: "React.js", icon: SiReact, category: "frontend", level: "Expert", color: "#61dafb" },
  { name: "Three.js", icon: SiThreedotjs, category: "frontend", level: "Advanced", color: "#ffffff" },
  { name: "Tailwind", icon: SiTailwindcss, category: "frontend", level: "Expert", color: "#38bdf8" },
  { name: "Node.js", icon: SiNodedotjs, category: "backend", level: "Advanced", color: "#339933" },
  { name: "PHP", icon: SiPhp, category: "backend", level: "Expert", color: "#7B7FB6" },
  { name: "Laravel", icon: SiLaravel, category: "backend", level: "Advanced", color: "#FF3629" },
  { name: "Go", icon: SiGo, category: "backend", level: "Intermediate", color: "#00add8" },
  { name: "Postgres", icon: SiPostgresql, category: "database", level: "Advanced", color: "#4169e1" },
  { name: "Flutter", icon: SiFlutter, category: "mobile", level: "Advanced", color: "#62C9F7" },
  { name: "Dart", icon: SiDart, category: "mobile", level: "Advanced", color: "#37B9F6" },
  { name: "Mysql", icon: SiMysql, category: "database", level: "Expert", color: "#136490" },
  { name: "MongoDB", icon: SiMongodb, category: "database", level: "Expert", color: "#146E50" },
  { name: "Docker", icon: SiDocker, category: "tools", level: "Intermediate", color: "#2496ed" },
  { name: "Git", icon: SiGit, category: "tools", level: "Expert", color: "#f05032" },
  { name: "Github", icon: SiGithub, category: "tools", level: "Expert", color: "" },
  { name: "Vercel", icon: SiVercel, category: "tools", level: "Expert", color: "#ffffff" },
  { name: "Figma", icon: SiFigma, category: "creative", level: "Expert", color: "#f24e1e" },
  { name: "Photoshop", icon: SiAdobephotoshop, category: "creative", level: "Advanced", color: "#31a8ff" },
  { name: "Premiere", icon: SiAdobepremierepro, category: "creative", level: "Advanced", color: "#ea77ff" },
  { name: "Canva", icon: SiCanva, category: "creative", level: "Expert", color: "#00c4cc" },
  { name: "Word", icon: RiFileWord2Fill, category: "creative", level: "Expert", color: "#325B9D" },
  { name: "Excel", icon: RiFileExcel2Fill, category: "creative", level: "Expert", color: "#277348" },
  { name: "PowerPoint", icon: RiFilePpt2Fill, category: "creative", level: "Expert", color: "#D14C2B" },
];

// --- 2. Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
};

// --- 3. Sub-Components ---

const SkillCard = ({ skill }: { skill: Skill }) => {
  const Icon = skill.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative h-full"
    >
      {/* Dynamic Glow Effect */}
      <div 
        className="absolute inset-0 blur-2xl rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" 
        style={{ backgroundColor: skill.color }}
      />
      
      {/* Card Content */}
      <div className="relative h-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl flex flex-col items-center md:items-start gap-5 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.06]">
        <div 
          className="p-3 rounded-xl bg-white/5 transition-all duration-500 group-hover:scale-110"
          style={{ color: skill.color }}
        >
          <Icon size={32} />
        </div>
        
        <div className="text-center md:text-left">
          <h3 className="text-white font-bold tracking-tight text-lg">
            {skill.name}
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-300 transition-colors">
              {skill.level}
            </p>
          </div>
        </div>

        <span className="absolute top-4 right-4 text-[7px] font-mono text-white/10 group-hover:text-white/30 uppercase tracking-tighter">
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
};

const MarqueeRow = ({ 
  items, 
  direction = "left", 
  speed = 50,
  outline = false 
}: { 
  items: Skill[]; 
  direction?: "left" | "right"; 
  speed?: number;
  outline?: boolean;
}) => (
  <div className="flex w-full overflow-hidden py-4 select-none border-y border-white/[0.05] bg-white/[0.01] -skew-y-3 md:-skew-y-2 translate-y-4">
    <motion.div 
      animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className="flex flex-nowrap gap-12 md:gap-20 items-center whitespace-nowrap will-change-transform"
    >
      {[...Array(2)].map((_, i) => (
        <div key={`marquee-group-${i}`} className="flex gap-12 md:gap-20 items-center">
          {items.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <div 
                key={`${skill.name}-${i}-${idx}`} 
                className="flex items-center gap-6 group cursor-default"
              >
                <Icon 
                  className="text-5xl md:text-8xl transition-all duration-500 opacity-40 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12" 
                  style={{ color: skill.color }} 
                />
                <span 
                  className={`text-5xl md:text-[11rem] font-black tracking-tighter uppercase italic transition-all duration-700 ${
                    outline 
                      ? "text-transparent stroke-white group-hover:text-white" 
                      : "text-white/10 group-hover:text-white group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  }`}
                  style={outline ? { WebkitTextStroke: "1.5px rgba(255,255,255,0.3)" } : {}}
                >
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </motion.div>
  </div>
);

// --- 4. Main Section ---

export default function Skills() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef, { once: true, margin: "-10% 0px" });

  const techSkills = useMemo(() => SKILLS_DATA.filter(s => s.category !== "creative"), []);
  const creativeSkills = useMemo(() => SKILLS_DATA.filter(s => s.category === "creative"), []);

  return (
    <section 
      id="skills" 
      ref={scrollRef}
      className="relative w-full py-32 md:py-48 overflow-hidden bg-[#020617]"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h2 className="text-7xl md:text-[10rem] font-black text-white tracking-[-0.06em] leading-[0.8] uppercase">
              Toolbox <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
                & Stack
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-5 border-l border-white/10 pl-8"
          >
            <p className="text-gray-400 text-sm md:text-lg max-w-xs leading-relaxed">
              Kombinasi antara presisi pemrograman dan kebebasan kreatif untuk membangun produk digital yang utuh.
            </p>
            <div className="flex gap-3">
              <span className="px-4 py-1.5 bg-cyan-500/10 text-cyan-400 text-[10px] font-mono rounded-full border border-cyan-500/20 uppercase tracking-widest font-bold">
                Engineering
              </span>
              <span className="px-4 py-1.5 bg-purple-500/10 text-purple-400 text-[10px] font-mono rounded-full border border-purple-500/20 uppercase tracking-widest font-bold">
                Design
              </span>
            </div>
          </motion.div>
        </div>

        {/* Skills Grid */}
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

      {/* Marquee Row Section */}
      {/* Extreme Marquee Section */}
<div className="mt-56 flex flex-col gap-4 md:gap-8 opacity-60 hover:opacity-100 transition-opacity duration-700">
  {/* Baris Atas: Solid/Glow */}
  <MarqueeRow items={techSkills} direction="left" speed={60} />
  {/* Baris Bawah: Outline/Miring */}
  <MarqueeRow items={creativeSkills} direction="right" speed={40} outline={true} />
</div>

      {/* Bottom Border Decor */}
      <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}