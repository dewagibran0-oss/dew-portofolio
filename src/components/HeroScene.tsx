"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Preload, Float } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

/**
 * 1. Shader-Based Particles
 * Menciptakan efek "Neon Glow" tanpa library post-processing tambahan.
 */
function GlowParticles({ count = 3000, radius = 1.5, color = "#22D3EE", size = 0.008 }) {
  const pointsRef = useRef<THREE.Points>(null!);
  
  // Membuat data posisi partikel yang stabil
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    random.inSphere(pos, { radius });
    for (let i = 0; i < pos.length; i++) if (isNaN(pos[i])) pos[i] = 0;
    return pos;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Animasi rotasi halus
    pointsRef.current.rotation.x -= delta / 15;
    pointsRef.current.rotation.y -= delta / 20;

    // Efek Interaksi Mouse: Partikel bergeser sedikit mengikuti kursor
    const targetX = state.mouse.x * 0.2;
    const targetY = state.mouse.y * 0.2;
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.05);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
        /**
         * CUSTOM SHADER PATCH:
         * Mengubah titik kotak standar menjadi lingkaran berpijar (Radial Gradient)
         * Ini memberikan efek "Glow" murni dari GPU.
         */
        onBeforeCompile={(shader) => {
          shader.fragmentShader = shader.fragmentShader.replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            `
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
            float r = dot(cxy, cxy);
            float delta = fwidth(r);
            // Menciptakan falloff cahaya (glow)
            float mask = 1.0 - smoothstep(0.0, 1.0, r);
            float glow = pow(mask, 3.5); // Intensitas cahaya
            
            if (r > 1.0) discard;
            vec4 diffuseColor = vec4( diffuse, opacity * glow );
            `
          );
        }}
      />
    </Points>
  );
}

/**
 * 2. Scene Logic & Environment
 * Mengatur kamera dan elemen pendukung dekoratif.
 */
function SceneContent() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5; // Deteksi responsivitas dalam unit Three.js

  return (
    <>
      {/* Fog native untuk kesan cinematic depth */}
      <fog attach="fog" args={["#020617", 0.5, 3.5]} />
      
      <ambientLight intensity={0.5} />
      
      <Suspense fallback={null}>
        <group rotation={[0, 0, Math.PI / 4]}>
          {/* Layer 1: Inti Cyan */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <GlowParticles count={isMobile ? 1500 : 3000} radius={1.2} color="#22D3EE" size={0.01} />
          </Float>

          {/* Layer 2: Aura Indigo yang lebih luas */}
          <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <GlowParticles count={isMobile ? 800 : 2000} radius={2.5} color="#818CF8" size={0.007} />
          </Float>
        </group>

        {/* Cyber Grid Lantai: Elemen Arsitektural */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
          <planeGeometry args={[20, 20, 50, 50]} />
          <meshBasicMaterial 
            color="#22D3EE" 
            wireframe 
            transparent 
            opacity={0.05} 
          />
        </mesh>
      </Suspense>
    </>
  );
}

/**
 * 3. Main Hero Component
 */
export default function HeroScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0 bg-[#020617]" />;

  return (
    <div className="absolute inset-0 z-0 bg-[#020617] overflow-hidden">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          // Penting untuk performa mobile
          stencil: false,
          depth: false 
        }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 1.8], fov: 60 }}
      >
        <color attach="background" args={["#020617"]} />
        <SceneContent />
        <Preload all />
      </Canvas>

      {/* 4. Overlay Cinematic: Finishing Touch */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vignette Gelap */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
        
        {/* Efek Garis Scanline (Digital Feel) */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
        
        {/* Grainy Texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Fade Bottom agar menyatu dengan section berikutnya */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#020617] to-transparent" />
      </div>
    </div>
  );
}