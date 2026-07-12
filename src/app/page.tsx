"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// 1. Navbar & Hero: WAJIB Statis (Above the Fold)
// Ini adalah konten pertama yang dilihat user (LCP), jangan di-lazy load.
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// 2. Dynamic Import (Below the Fold) — tetap SSR agar SEO & first paint terjaga.
const Skills = dynamic(() => import("@/components/Skills"), { ssr: true });
const About = dynamic(() => import("@/components/About"), { ssr: true });
const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: true });
const Experience = dynamic(() => import("@/components/Experience"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/PremiumFooter"), { ssr: true });

// Skeleton menjaga layout agar tidak bergeser (No CLS)
const SectionLoader = () => (
  <div className="h-[400px] w-full bg-[var(--bg-elevated)] animate-pulse" />
);

export default function Home() {
  return (
    <div className="relative bg-base selection:bg-secondary/30 overflow-x-hidden">
      <Navbar />

      <main>
        {/* Render langsung tanpa lazy load untuk LCP yang cepat */}
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <div>
            <Skills />
          </div>

          <div className="flex flex-col">
            <section id="about" className="scroll-mt-20">
              <About />
            </section>

            <section id="services" className="scroll-mt-20">
              <Services />
            </section>

            <section id="projects" className="scroll-mt-20">
              <Projects />
            </section>

            <section id="experience" className="scroll-mt-20">
              <Experience />
            </section>

            <section id="contact" className="scroll-mt-20">
              <Contact />
            </section>

            <Footer />
          </div>
        </Suspense>
      </main>
    </div>
  );
}
