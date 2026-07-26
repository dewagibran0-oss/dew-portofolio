"use client";

import React, { useState, useMemo, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Github, ExternalLink, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * 1. CORE DATA
 * Meta netral-bahasa (judul/tech/gambar/link/status). Deskripsi per-bahasa
 * diambil dari dictionary (t.archive.items) agar mengikuti pilihan bahasa.
 */
const PROJECT_DATA = [
  { id: "01", year: "2026", title: "My Portfolio", category: "Fullstack", tech: ["Next.js", "Tailwind", "Framer"], image: "/my-porto.png", githubUrl: "https://github.com/dewa", liveUrl: "https://dewa-gibran.dev", status: "Active" },
  { id: "02", year: "2026", title: "KantinQ Smart", category: "Fullstack", tech: ["React", "MongoDB", "Midtrans"], image: "/kantinq.png", githubUrl: "https://github.com/dewa/kantinq", liveUrl: "https://kantinq.sembilanduadelapan.com/", status: "Beta" },
  { id: "03", year: "2025", title: "Diva Ecosystem", category: "Fullstack", tech: ["Tailwind", "Next.js", "Inertia"], image: "/divaphone.png", githubUrl: "https://github.com/dewagibran0-oss/Diva-Phone", liveUrl: "https://diva-phone.vercel.app/", status: "Active" },
  { id: "04", year: "2025", title: "DFS Tracker", category: "Fintech", tech: ["PHP", "PostgreSQL", "Tailwind"], image: "/dfs.png", githubUrl: "https://github.com/dewa/dfs-finance", liveUrl: "#", status: "Archived" },
  { id: "05", year: "2024", title: "MiniBank Core", category: "Fintech", tech: ["PHP", "Laravel", "MySQL"], image: "/bankmini.png", githubUrl: "https://github.com/dewa/minibank", liveUrl: "#", status: "Archived" },
  { id: "06", year: "2024", title: "Esa Jaya Labdagati", category: "Company", tech: ["HTML", "CSS", "JS"], image: "/ejl.png", githubUrl: "https://github.com/dewa/esa-jaya", liveUrl: "https://esajayalabdagati.com/", status: "Active" },
  { id: "07", year: "2024", title: "Sembilan Dua", category: "Company", tech: ["HTML", "CSS", "JS"], image: "/sdd.png", githubUrl: "https://github.com/dewa/928-trade", liveUrl: "https://sembilanduadelapan.com/", status: "Active" },
  { id: "08", year: "2023", title: "Pelayaran Tujuh", category: "Company", tech: ["HTML", "CSS", "JS"], image: "/pelayaran.jpg", githubUrl: "https://github.com/dewa/tujuh-tunas", liveUrl: "https://www.tujuhtunassatusamudera.com/", status: "Active" },
  { id: "09", year: "2023", title: "E-Commerce", category: "E-Commerce", tech: ["PHP", "MySQL", "Midtrans"], image: "/octa.jpg", githubUrl: "https://github.com/dewa/tujuh-tunas", liveUrl: "#", status: "Archived" },
  { id: "10", year: "2026", title: "TTSS Mobile Application", category: "Mobile", tech: ["Flutter", "Dart"], image: "/ttss-mobile.png", githubUrl: "https://github.com/dewa/tujuh-tunas", liveUrl: "#", status: "Active" },
] as const;

const CATEGORIES = ["All", "Fullstack", "E-Commerce", "Fintech", "Company", "Mobile"] as const;

type Project = (typeof PROJECT_DATA)[number];

/**
 * 2. PROJECT CARD
 * Gambar jernih di plate atas (tanpa overlay gelap), info di bawah —
 * konsisten dengan gaya editorial section Work di halaman utama.
 */
const ProjectCard = memo(
  ({
    project,
    description,
    statusLabel,
    codeLabel,
    liveLabel,
  }: {
    project: Project;
    description: string;
    statusLabel: string;
    codeLabel: string;
    liveLabel: string;
  }) => {
    const hasLive = project.liveUrl !== "#";

    return (
      <motion.article
        layout="position"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="group flex flex-col overflow-hidden rounded-2xl md:rounded-3xl bg-[var(--bg-card)] border border-[var(--hairline)] shadow-sm hover:shadow-md hover:border-[var(--maroon)]/40 transition-[box-shadow,border-color] duration-300"
      >
        {/* Image plate */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-section)] border-b border-[var(--hairline)]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <span
            className={`absolute top-3 left-3 md:top-4 md:left-4 px-3 py-1 rounded-full border text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-none ${
              project.status === "Active"
                ? "bg-[var(--bg-card)]/95 border-[var(--maroon)]/40 text-[var(--maroon)]"
                : "bg-[var(--bg-card)]/95 border-[var(--hairline)] text-zinc-500"
            }`}
          >
            {statusLabel}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--maroon)]">
              {project.year}
            </span>
            <span className="h-px w-5 bg-[var(--hairline)]" />
            <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium">
              {project.category}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug mb-2">
            {project.title}
          </h3>

          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-5">
            {description}
          </p>

          <div className="mt-auto flex items-end justify-between gap-4 pt-4 border-t border-[var(--hairline)]">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full border border-[var(--hairline)] text-[9px] font-medium text-zinc-500"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-2 shrink-0">
              <Link
                href={project.githubUrl}
                target="_blank"
                aria-label={`${codeLabel}: ${project.title}`}
                className="p-2.5 rounded-xl border border-[var(--hairline)] text-zinc-500 hover:text-white hover:border-[var(--maroon)] transition-colors"
              >
                <Github size={16} />
              </Link>
              {hasLive && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  aria-label={`${liveLabel}: ${project.title}`}
                  className="p-2.5 rounded-xl bg-[var(--maroon)] text-white hover:bg-[var(--maroon-strong)] transition-colors"
                >
                  <ExternalLink size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

/**
 * 3. PAGE
 */
export default function ProjectArchive() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    return PROJECT_DATA.filter((p) => {
      const matchTab = activeTab === "All" || p.category === activeTab;
      if (!s) return matchTab;
      return (
        matchTab &&
        (p.title.toLowerCase().includes(s) ||
          p.tech.some((tech) => tech.toLowerCase().includes(s)) ||
          p.category.toLowerCase().includes(s))
      );
    });
  }, [activeTab, search]);

  const categoryCount = CATEGORIES.length - 1;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white">
      {/* Header */}
      <header className="px-6 md:px-12 py-8 md:py-10 max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-4">
          <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-[var(--bg-card)] border border-[var(--hairline)] group-hover:border-[var(--maroon)] transition-colors">
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
          </span>
          <span className="flex flex-col">
            <span className="text-[9px] tracking-[0.4em] text-zinc-500 uppercase font-semibold">
              {t.archive.back}
            </span>
            <span className="font-black text-xl md:text-2xl tracking-tight">
              DEWA<span className="text-[var(--maroon)]">.</span>G
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--maroon)]" />
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.2em]">
            {t.hero.live}
          </span>
        </div>
      </header>

      <main className="px-6 md:px-12 max-w-7xl mx-auto pb-24 md:pb-32">
        {/* Hero */}
        <section className="py-8 md:py-16 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[var(--maroon)]" />
              <span className="text-[10px] text-zinc-500 font-semibold tracking-[0.4em] uppercase">
                {t.archive.tag}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6">
              {t.archive.titleTop}{" "}
              <span className="text-[var(--maroon)] italic">{t.archive.titleBottom}</span>
            </h1>
            <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-xl">
              {t.archive.intro}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-10 lg:border-l lg:border-[var(--hairline)] lg:pl-10">
            <div>
              <span className="block text-4xl md:text-5xl font-black leading-none">
                {PROJECT_DATA.length}
              </span>
              <span className="text-[10px] text-[var(--maroon)] font-semibold uppercase tracking-[0.3em]">
                {t.archive.projectsCount}
              </span>
            </div>
            <div>
              <span className="block text-4xl md:text-5xl font-black leading-none">
                {String(categoryCount).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-[0.3em]">
                {t.archive.categoriesCount}
              </span>
            </div>
          </div>
        </section>

        {/* Filter bar */}
        <div className="sticky top-4 z-40 mt-4 mb-10 md:mb-14 flex flex-col lg:flex-row gap-3 p-2.5 rounded-2xl md:rounded-3xl bg-[var(--bg-card)] border border-[var(--hairline)] shadow-md">
          <div className="flex overflow-x-auto no-scrollbar gap-1 p-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative px-4 md:px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] transition-colors shrink-0 ${
                  activeTab === cat
                    ? "text-[#f5f0eb]"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {activeTab === cat && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-[var(--maroon)] rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                {cat === "All" ? t.archive.all : cat}
              </button>
            ))}
          </div>

          <div className="relative flex-1 min-w-0 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[var(--maroon)] transition-colors"
              size={16}
            />
            <input
              type="text"
              placeholder={t.archive.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--bg-section)] border border-[var(--hairline)] rounded-xl py-3 pl-11 pr-10 text-sm text-white focus:outline-none focus:border-[var(--maroon)]/60 transition-colors placeholder:text-zinc-500"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label={t.archive.clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  description={t.archive.items[project.id]?.description ?? ""}
                  statusLabel={t.archive.statuses[project.status] ?? project.status}
                  codeLabel={t.archive.code}
                  liveLabel={t.archive.live}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-28 md:py-36 text-center"
              >
                <span className="inline-flex p-6 rounded-full bg-[var(--bg-card)] border border-[var(--hairline)] mb-6">
                  <Search size={32} className="text-zinc-500" />
                </span>
                <p className="font-bold text-white text-sm uppercase tracking-[0.3em] mb-2">
                  {t.archive.noResults}
                </p>
                <p className="text-zinc-500 text-sm">{t.archive.noResultsHint}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--hairline)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-black text-lg tracking-tight">
            DEWA<span className="text-[var(--maroon)]">.</span>G
          </span>
          <p className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] text-center sm:text-right">
            © 2026 Dewa Gibran
          </p>
        </div>
      </footer>
    </div>
  );
}
