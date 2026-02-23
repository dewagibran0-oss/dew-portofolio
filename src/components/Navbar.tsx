"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  /**
   * Smart Scroll Logic: 
   * 1. Deteksi scroll untuk efek glassmorphism
   * 2. Sembunyikan navbar saat scroll ke bawah (untuk fokus konten)
   * 3. Munculkan navbar saat scroll ke atas (untuk navigasi cepat)
   */
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    
    // Efek Transparansi
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Efek Sembunyi/Muncul (Hidden/Show)
    if (latest > previous && latest > 150) {
      setHidden(true); // Scroll ke bawah
    } else {
      setHidden(false); // Scroll ke atas
    }

    lastScrollY.current = latest;
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden && !isOpen ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO: Menggunakan mask-shimmer effect */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-[102]"
        >
          <a href="#" className="group flex items-center gap-1 font-space text-2xl font-bold tracking-tighter">
            <span className="text-white">DEWA</span>
            <span className="text-secondary group-hover:text-primary transition-colors duration-300">.G</span>
          </a>
        </motion.div>

        {/* DESKTOP NAV: Pill style with glassmorphism */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-full border transition-all duration-500 ${
              scrolled 
              ? "bg-black/20 backdrop-blur-xl border-white/10 shadow-2xl" 
              : "bg-transparent border-transparent"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-5 py-2 text-[11px] font-mono tracking-[0.2em] text-gray-400 hover:text-white transition-colors group"
              >
                <span className="relative z-10">{link.name.toUpperCase()}</span>
                <motion.span 
                  className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" 
                />
              </a>
            ))}
          </motion.div>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-secondary text-black text-[11px] font-bold rounded-full hover:bg-white transition-all tracking-[0.1em] magnetic"
          >
            START A PROJECT
          </motion.a>
        </div>

        {/* MOBILE TOGGLE: Custom animated burger */}
        <button 
          className="md:hidden relative z-[102] p-2 overflow-hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-full h-[2px] bg-white block origin-center"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
              className="w-full h-[2px] bg-white block"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              className="w-full h-[2px] bg-white block origin-center"
            />
          </div>
        </button>

        {/* MOBILE MENU OVERLAY: Fullscreen cinematic scale */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ clipPath: "circle(0% at 90% 5%)" }}
              animate={{ clipPath: "circle(150% at 90% 5%)" }}
              exit={{ clipPath: "circle(0% at 90% 5%)" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center z-[101]"
            >
              {/* Background Glow for Mobile Menu */}
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" />
              
              <div className="flex flex-col items-center gap-6">
                {navLinks.map((link, i) => (
                  <div key={link.name} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      initial={{ y: 80 }}
                      animate={{ y: 0 }}
                      transition={{ 
                        delay: 0.2 + (i * 0.1), 
                        duration: 0.8, 
                        ease: [0.33, 1, 0.68, 1] 
                      }}
                      onClick={() => setIsOpen(false)}
                      className="text-5xl font-space font-bold text-white hover:text-secondary transition-colors block"
                    >
                      {link.name}
                    </motion.a>
                  </div>
                ))}
              </div>

              {/* Mobile Socials/Info */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-12 flex flex-col items-center gap-4"
              >
                <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">Get in touch</p>
                <a href="mailto:dewagibran0@gmail.com" className="text-white border-b border-secondary">dewagibran0@gmail.com</a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}