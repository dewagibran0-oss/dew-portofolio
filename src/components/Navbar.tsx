"use client";

import { useState, useRef, useEffect } from "react";
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

  // Kunci scroll body saat menu terbuka → tak ada scroll latar yang janky
  // + memberi rasa "fokus" yang lebih premium. Dibersihkan saat menu tutup.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

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
                ? "bg-[var(--bg-card)] border-[var(--hairline)] shadow-lg"
                : "bg-transparent border-transparent"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-[11px] font-medium tracking-[0.2em] text-gray-400 hover:text-white transition-colors group"
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
              <span className="text-[11px] font-bold tracking-widest uppercase">
                {lang}
              </span>
            </button>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-[var(--maroon)] text-white text-[11px] font-bold rounded-full hover:bg-[var(--maroon-strong)] transition-all tracking-[0.1em] magnetic"
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

        {/* MOBILE MENU OVERLAY
            Reveal via transform+opacity murni (di-composite GPU, nol repaint)
            dengan transform-origin kanan-atas → tetap terasa "mekar" dari tombol
            menu seperti sebelumnya, tapi mulus di HP kelas apa pun. */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "90% 5%", willChange: "transform, opacity" }}
              className="fixed inset-0 bg-[var(--bg)] flex flex-col items-center z-[101] transform-gpu pt-24 pb-10"
            >
              {/* Tint maroon sangat lembut — radial statis (nol beban GPU) */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_88%_8%,rgba(140,47,57,0.08),transparent_60%)]" />

              {/* Links — stagger slide-up (transform+opacity, ringan) */}
              <motion.nav
                initial="hidden"
                animate="show"
                variants={{
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                }}
                className="flex-1 flex flex-col items-center justify-center gap-5"
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    variants={{
                      hidden: { opacity: 0, y: 26 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                    className="group flex items-baseline gap-3 text-5xl font-space font-bold text-white transition-colors"
                  >
                    <span className="text-sm font-medium text-secondary/50 tracking-widest">
                      0{i + 1}
                    </span>
                    <span className="transition-colors duration-300 group-hover:text-secondary">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </motion.nav>

              {/* Footer cluster: kontrol theme/bahasa + kontak (rapi, tak menabrak logo) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="shrink-0 flex flex-col items-center gap-6"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleTheme}
                    aria-label={isDark ? t.nav.themeToLight : t.nav.themeToDark}
                    className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 hover:text-secondary hover:border-secondary/40 transition-colors"
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                  <button
                    onClick={toggleLang}
                    aria-label={t.nav.switchLang}
                    className="h-11 px-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] text-white/80 hover:text-secondary hover:border-secondary/40 transition-colors"
                  >
                    <Languages size={18} />
                    <span className="text-xs font-bold tracking-widest uppercase">
                      {lang}
                    </span>
                  </button>
                </div>

                <div className="h-px w-24 bg-white/10" />

                <div className="flex flex-col items-center gap-2">
                  <p className="text-gray-500 text-[10px] font-medium tracking-widest uppercase">
                    {t.nav.getInTouch}
                  </p>
                  <a
                    href="mailto:dewagibran0@gmail.com"
                    className="text-white border-b border-secondary/60 hover:border-secondary transition-colors"
                  >
                    dewagibran0@gmail.com
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
