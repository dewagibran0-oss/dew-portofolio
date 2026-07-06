"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useLang } from "@/lib/i18n";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { t, lang, toggleLang } = useLang();

  const navLinks = [
    { name: t.nav.links.about, href: "#about" },
    { name: t.nav.links.services, href: "#services" },
    { name: t.nav.links.work, href: "#projects" },
    { name: t.nav.links.experience, href: "#experience" },
    { name: t.nav.links.contact, href: "#contact" },
  ];

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    setScrolled(latest > 50);
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  const isDark = theme === "dark";

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden && !isOpen ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-[102]"
        >
          <a
            href="#"
            className="group flex items-center gap-1 font-space text-2xl font-bold tracking-tighter"
          >
            <span className="text-white">DEWA</span>
            <span className="text-secondary group-hover:text-primary transition-colors duration-300">
              .G
            </span>
          </a>
        </motion.div>

        {/* DESKTOP NAV */}
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
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-[11px] font-mono tracking-[0.2em] text-gray-400 hover:text-white transition-colors group"
              >
                <span className="relative z-10">{link.name.toUpperCase()}</span>
                <motion.span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </a>
            ))}
          </motion.div>

          {/* Controls: Theme + Language */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? t.nav.themeToLight : t.nav.themeToDark}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:text-secondary hover:border-secondary/40 transition-colors"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={toggleLang}
              aria-label={t.nav.switchLang}
              className="h-10 px-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:text-secondary hover:border-secondary/40 transition-colors"
            >
              <Languages size={16} />
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase">
                {lang}
              </span>
            </button>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-secondary text-black text-[11px] font-bold rounded-full hover:bg-white transition-all tracking-[0.1em] magnetic"
          >
            {t.nav.startProject}
          </motion.a>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden relative z-[102] p-2 overflow-hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
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

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ clipPath: "circle(0% at 90% 5%)" }}
              animate={{ clipPath: "circle(150% at 90% 5%)" }}
              exit={{ clipPath: "circle(0% at 90% 5%)" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-[var(--bg)] flex flex-col items-center justify-center z-[101]"
            >
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" />

              {/* Mobile controls */}
              <div className="absolute top-8 left-6 flex items-center gap-3 z-[102]">
                <button
                  onClick={toggleTheme}
                  aria-label={isDark ? t.nav.themeToLight : t.nav.themeToDark}
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={toggleLang}
                  aria-label={t.nav.switchLang}
                  className="h-11 px-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] text-white/80"
                >
                  <Languages size={18} />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase">
                    {lang}
                  </span>
                </button>
              </div>

              <div className="flex flex-col items-center gap-6">
                {navLinks.map((link, i) => (
                  <div key={link.href} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      initial={{ y: 80 }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: 0.2 + i * 0.1,
                        duration: 0.8,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                      onClick={() => setIsOpen(false)}
                      className="text-5xl font-space font-bold text-white hover:text-secondary transition-colors block"
                    >
                      {link.name}
                    </motion.a>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-12 flex flex-col items-center gap-4"
              >
                <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">
                  {t.nav.getInTouch}
                </p>
                <a
                  href="mailto:dewagibran0@gmail.com"
                  className="text-white border-b border-secondary"
                >
                  dewagibran0@gmail.com
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
