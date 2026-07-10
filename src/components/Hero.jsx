import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// --- TECH-FOCUSED 3D SCENE ---
function TechShape() {
  const meshRef = useRef(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
      meshRef.current.rotation.x += delta * 0.05
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 4]} />
        <meshStandardMaterial 
          color="#ff5e00" 
          wireframe={true} 
          wireframeLinewidth={2}
          emissive="#ff5e00"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffb700" />
      <TechShape />
      <ContactShadows position={[0, -3, 0]} opacity={0.3} scale={20} blur={2} far={4.5} color="#ff5e00" />
    </>
  )
}

// --- HERO COMPONENT ---
export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full bg-ink flex flex-col items-center overflow-hidden pt-24">  
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>

      {/* UI Overlay Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col flex-grow py-8 md:py-32 pointer-events-none">
        
        {/* Intro */}
        <div className="max-w-sm pointer-events-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-1 w-8 bg-[#ff5e00]" />
            <span className="eyebrow text-paper/60 uppercase tracking-[0.2em]">Nubrxy</span>
          </div>
          <p className="text-paper/70 text-sm leading-relaxed font-light border-l border-line pl-4">
            Forging intelligent digital architecture. We shape raw data and AI workflows into high-performance interfaces that refuse to be ignored.
          </p>
        </div>

        {/* Massive Typography - Responsive with Hover states restored */}
        <div className="w-full pointer-events-auto my-auto">
          <h1 className="font-display font-bold text-[16vw] md:text-[15vw] leading-[0.8] tracking-tighter text-paper uppercase">
            <span className="block transition-colors duration-500 cursor-default hover:text-[#ff5e00]">
              Digital
            </span>
            <span className="block text-right transition-colors duration-500 cursor-default hover:text-[#ffb700]">
              Matter.
            </span>
          </h1>
        </div>

        {/* Bottom Bar - Wraps on mobile */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pointer-events-auto border-t border-line/30 pt-6">
          <div className="flex flex-wrap gap-8 eyebrow text-paper/50">
            <div className="flex flex-col gap-1"><span className="text-paper">Stack</span> React / Motion / Three.js</div>
            <div className="flex flex-col gap-1"><span className="text-paper">Intelligence</span> Vapi / n8n / OpenAI</div>
          </div>

          <a href="#dialogue" className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-paper/20 rounded-full overflow-hidden transition-all hover:border-[#ff5e00]">
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#ff5e00] to-[#ffb700] transition-all duration-500 group-hover:w-full" />
            <span className="relative z-10 eyebrow text-paper group-hover:text-ink transition-colors duration-300 flex items-center gap-2">
              Initialize Project ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}