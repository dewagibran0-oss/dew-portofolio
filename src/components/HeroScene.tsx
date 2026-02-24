"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, AdaptiveDpr, PerspectiveCamera } from "@react-three/drei";

// --- Interface untuk Props agar tidak error ---
interface ParticleProps {
  count: number;
  radius: number;
  color: string;
  speed: number;
}

const vertexShader = `
  attribute vec3 color;      
  attribute float size;      
  varying vec3 vColor;
  varying float vOpacity;
  varying float vRainbow;    
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vColor = color;
    vec3 pos = position;
    pos.z += cos(uTime * 0.5 + pos.x) * 0.1;
    
    float dist = distance(pos.xy, uMouse * 2.0);
    float activeRange = 0.7;
    vRainbow = 0.0;

    if (dist < activeRange) {
      float power = pow(1.0 - dist / activeRange, 2.0);
      pos.z += power * 0.8;
      pos.xy += (pos.xy - uMouse) * power * 0.3;
      vRainbow = power;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (500.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vOpacity = smoothstep(-1.0, 2.0, gl_Position.z);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vOpacity;
  varying float vRainbow;
  uniform float uTime;

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    vec3 finalColor = vColor;
    if (vRainbow > 0.05) {
      float hue = fract(uTime * 0.3 + vRainbow);
      vec3 rainbowColor = hsv2rgb(vec3(hue, 0.8, 1.0));
      finalColor = mix(vColor, rainbowColor, vRainbow);
      finalColor *= (1.0 + vRainbow * 3.0); 
    }
    float mask = pow(1.0 - r * 2.0, 3.0);
    gl_FragColor = vec4(finalColor, mask * vOpacity);
  }
`;

function ProParticles({ count, radius, color, speed }: ParticleProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  
  const geoData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const clr = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.pow(Math.random(), 0.5);

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = (Math.random() - 0.5) * 1.5;

      colors[i3] = clr.r; 
      colors[i3 + 1] = clr.g; 
      colors[i3 + 2] = clr.b;
      
      sizes[i] = Math.random() * 0.03 + 0.012;
    }
    return { positions, colors, sizes };
  }, [count, radius, color]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) }
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.lerp(state.pointer, 0.1);
    pointsRef.current.rotation.y += 0.0004 * speed;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* FIX: Menambahkan properti args agar TypeScript tidak error */}
        <bufferAttribute
          attach="attributes-position"
          count={geoData.positions.length / 3}
          array={geoData.positions}
          itemSize={3}
          args={[geoData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={geoData.colors.length / 3}
          array={geoData.colors}
          itemSize={3}
          args={[geoData.colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={geoData.sizes.length}
          array={geoData.sizes}
          itemSize={1}
          args={[geoData.sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
      />
    </points>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="fixed inset-0 bg-[#020617]" />;

  return (
    <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden">
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <AdaptiveDpr pixelated />
        <PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={50} />
        <Suspense fallback={null}>
          <group>
            <ProParticles count={3000} radius={1.3} color="#22d3ee" speed={1} />
            <ProParticles count={1500} radius={2.8} color="#818cf8" speed={0.5} />
          </group>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
            <planeGeometry args={[30, 30, 40, 40]} />
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.04} />
          </mesh>
        </Suspense>
        <Preload all />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_10%,#020617_100%)]" />
    </div>
  );
}