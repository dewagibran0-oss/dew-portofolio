"use client";

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * 1. Data & Types
 * Meta netral-bahasa (tags/gambar/tahun). Teks (title/category/description)
 * diambil dari dictionary via useLang agar mengikuti pilihan bahasa.
 */
const PROJECT_META: {
  id: string;
  year: string;
  tags: string[];
  image: string;
}[] = [
  { id: "01", year: "2025", tags: ["Next.js", "Tailwind", "Inertia"], image: "/divaphone.png" },
  { id: "02", year: "2025", tags: ["PHP", "PostgreSQL", "Tailwind"], image: "/dfs.png" },
  { id: "03", year: "2024", tags: ["PHP", "Laravel", "MySQL"], image: "/bankmini.png" },
  { id: "04", year: "2026", tags: ["Flutter", "Dart"], image: "/ttss-mobile.png" },
];

interface ProjectItem {
  id: string;
  year: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
}

/**
 * 2. Editorial Case Row
 * Gambar tampil penuh & jelas di "plate" ber-border (bukan background redup),
 * teks di kolom sebelahnya. Arah bergantian kiri/kanan tiap baris; di mobile
 * otomatis menumpuk (gambar dulu, teks di bawah).
 */
const ProjectRow = memo(
  ({ project, flip, viewLabel }: { project: ProjectItem; flip: boolean; viewLabel: string }) => {
    return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center"
      >
        {/* Image plate */}
        <Link
          href="/archive"
          aria-label={project.title}
          className={`relative block overflow-hidden rounded-2xl md:rounded-3xl border border-[var(--hairline)] bg-[var(--bg-section)] aspect-[16/10] lg:col-span-7 ${
            flip ? "lg:order-2" : ""
          }`}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {/* Year chip di pojok plate */}
          <span className="absolute top-4 left-4 md:top-5 md:left-5 px-3 py-1 rounded-full bg-[var(--bg-card)]/90 border border-[var(--hairline)] text-[10px] font-semibold tracking-[0.2em] text-zinc-500">
            {project.year}
          </span>
        </Link>

        {/* Text column */}
        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <div className="flex items-center gap-3 mb-4 md:mb-5">
            <span className="h-px w-8 bg-[var(--maroon)]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
              {project.category}
            </span>
          </div>

          <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            {project.title}
          </h3>

          <p className="text-sm md:text-base text-zinc-500 leading-relaxed mb-6 max-w-md">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-7 md:mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-[var(--hairline)] bg-[var(--bg-card)] text-[10px] font-medium text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href="/archive"
            className="inline-flex items-center gap-2 text-[var(--maroon)] text-xs font-bold uppercase tracking-[0.2em] group/link"
          >
            {viewLabel}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </Link>
        </div>
      </motion.article>
    );
  }
);
ProjectRow.displayName = "ProjectRow";

/**
 * 3. Main Section
 */
export default function ProjectsSection() {
  const { t } = useLang();
  const projects: ProjectItem[] = PROJECT_META.map((m) => ({
    ...m,
    ...t.projects.items[m.id],
  }));

  return (
    <section className="relative w-full py-24 md:py-32 px-6 bg-[var(--bg-elevated)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[var(--maroon)]" />
              <span className="text-zinc-500 text-[10px] font-semibold uppercase tracking-[0.4em]">
                {t.projects.tag}
              </span>
            </div>

            <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.95] tracking-tight">
              {t.projects.titleTop}{" "}
              <span className="text-[var(--maroon)] italic">{t.projects.titleBottom}</span>
            </h2>
          </div>

          <p className="text-zinc-500 text-sm leading-relaxed md:max-w-xs md:border-l md:border-[var(--hairline)] md:pl-6">
            {t.projects.intro}
          </p>
        </header>

        {/* Editorial rows */}
        <div className="flex flex-col gap-16 md:gap-28">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              flip={i % 2 === 1}
              viewLabel={t.projects.view}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <footer className="mt-20 md:mt-32 pt-12 md:pt-16 border-t border-[var(--hairline)] flex justify-center">
          <Link
            href="/archive"
            className="group inline-flex items-center gap-4 px-7 py-4 rounded-full border border-[var(--hairline)] bg-[var(--bg-card)] hover:border-[var(--maroon)] transition-colors"
          >
            <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">
              {t.projects.explore}
            </span>
            <ArrowRight
              size={16}
              className="text-[var(--maroon)] transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </footer>
      </div>
    </section>
  );
}
