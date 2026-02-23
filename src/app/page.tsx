"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Import Components
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/PremiumFooter";

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative bg-black selection:bg-secondary/30"
    >
      {/* NAVBAR: Kita letakkan di sini agar Home memiliki akses 
         langsung ke navigasi. Pastikan z-index Navbar tinggi.
      */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Tech Stack Marquee */}
        <Skills />
        
        {/* Wrapper Content: 
           Penting untuk memberikan ID yang sesuai dengan link di Navbar 
           (e.g., href="#about") agar fitur scroll berfungsi.
        */}
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

          <Footer/>
          
        </div>
      </main>
    </motion.div>
  );
}