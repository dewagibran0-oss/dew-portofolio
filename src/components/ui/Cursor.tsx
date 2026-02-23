"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // 1. Koordinat Dasar (Performance optimized motion values)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);

  // 2. Spring Configs (Liquid Effect)
  const dotConfig = { stiffness: 800, damping: 50, mass: 0.2 };
  const ringConfig = { stiffness: 200, damping: 25, mass: 0.5 };

  const dotX = useSpring(mouseX, dotConfig);
  const dotY = useSpring(mouseY, dotConfig);
  const ringX = useSpring(mouseX, ringConfig);
  const ringY = useSpring(mouseY, ringConfig);

  // 3. Dynamic Transformations (Stretching & Rotation)
  const scaleX = useTransform(velocityX, [-3000, 0, 3000], [1.8, 1, 1.8]);
  const scaleY = useTransform(velocityY, [-3000, 0, 3000], [1.8, 1, 1.8]);
  
  const angle = useTransform([velocityX, velocityY], ([vx, vy]) => {
    return (Math.atan2(vy as number, vx as number) * 180) / Math.PI;
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY, movementX, movementY } = e;
    
    mouseX.set(clientX);
    mouseY.set(clientY);
    velocityX.set(movementX * 10);
    velocityY.set(movementY * 10);

    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, velocityX, velocityY, isVisible]);

  useEffect(() => {
    setMounted(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Deteksi elemen interaktif secara profesional
      const isInteractive = !!(
        ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || 
        target.closest(".magnetic") || 
        window.getComputedStyle(target).cursor === "pointer"
      );
      
      setIsHovered(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove]);

  // Mencegah Hydration Error
  if (!mounted) return null;

  return (
    <div 
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* LAYER 1: Aura Glow (Ambient Depth) */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 bg-secondary/5 blur-[80px] rounded-full"
        style={{ 
          x: ringX, 
          y: ringY, 
          translateX: "-50%", 
          translateY: "-50%", 
          scale: isHovered ? 2.5 : 1 
        }}
      />

      {/* LAYER 2: The Outer Liquid Ring (Dynamic Stretching) */}
      <motion.div
        className="fixed top-0 left-0 border border-secondary/40 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.1)]"
        animate={{
          width: isHovered ? 80 : 40,
          height: isHovered ? 80 : 40,
          backgroundColor: isHovered ? "rgba(34, 211, 238, 0.1)" : "rgba(34, 211, 238, 0)",
          borderColor: isHovered ? "rgba(34, 211, 238, 1)" : "rgba(34, 211, 238, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        style={{ 
          x: ringX, 
          y: ringY, 
          translateX: "-50%", 
          translateY: "-50%",
          scaleX,
          scaleY,
          rotate: angle
        }}
      >
        {isHovered && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full h-full rounded-full border border-secondary animate-ping opacity-20" 
          />
        )}
      </motion.div>

      {/* LAYER 3: The Sharp Core (Precision Dot) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"
        animate={{
          scale: isClicking ? 0.5 : isHovered ? 1.5 : 1,
        }}
        style={{ 
          x: dotX, 
          y: dotY, 
          translateX: "-50%", 
          translateY: "-50%",
          mixBlendMode: "difference"
        }}
      />

      {/* LAYER 4: Tail Trail (Subtle follow) */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-secondary/20 rounded-full"
        style={{ 
          x: ringX, 
          y: ringY, 
          translateX: "-50%", 
          translateY: "-50%",
        }}
      />
    </div>
  );
}