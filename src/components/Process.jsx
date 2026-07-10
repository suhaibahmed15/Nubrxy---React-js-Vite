import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import Reveal from './Reveal'

const steps = [
  { n: '01', title: 'Discover', desc: 'We map your stack, audience and ambitions — a working brief, not a slide deck.' },
  { n: '02', title: 'Architect', desc: 'Systems thinking first: data flows, agent graphs, page architecture.' },
  { n: '03', title: 'Design', desc: 'A bespoke visual system where every pixel has to earn its place.' },
  { n: '04', title: 'Build', desc: 'Type-safe engineering with weekly demos, production-ready from day one.' },
  { n: '05', title: 'Launch', desc: 'We measure, iterate and compound results long after ship day.' },
]

// --- NEW 3D SCROLL-DRIVEN COMPONENT (5-Ring Gyroscope) ---

function ProcessRings({ scrollProgress }) {
  const groupRef = useRef(null)
  const ringsRef = useRef([])

  // Har frame par scroll progress ke hisaab se rotation update hogi
  useFrame(() => {
    const progress = scrollProgress.get()
    
    if (groupRef.current) {
      // Pura group dhire dhire ghumega
      groupRef.current.rotation.y = progress * Math.PI * 1.5
    }
    
    // Har individual ring alag speed aur axis par rotate karegi
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x = progress * Math.PI * (i + 1) * 0.5
        ring.rotation.z = progress * Math.PI * (5 - i) * 0.3
      }
    })
  })

  return (
    // X-axis par 1.8 shift kiya hai taake text overlap na kare
    <group ref={groupRef} position={[1.8, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        
        {/* 5 Concentric Rings representing the 5 steps */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} ref={(el) => (ringsRef.current[i] = el)}>
            {/* Ander wali rings ka size chota hota jayega */}
            <torusGeometry args={[1.8 - i * 0.3, 0.015, 16, 100]} />
            <meshBasicMaterial 
              color={i % 2 === 0 ? "#ff5e00" : "#ffb700"} 
              transparent 
              opacity={0.3 + (i * 0.15)} 
            />
          </mesh>
        ))}
        
        {/* Glowing Center Core */}
        <mesh>
          <octahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial color="#ffb700" wireframe />
        </mesh>

      </Float>
    </group>
  )
}

function Scene({ scrollProgress }) {
  return (
    <>
      <Environment preset="city" />
      <ProcessRings scrollProgress={scrollProgress} />
    </>
  )
}

// --- UI COMPONENT ---

export default function Process() {
  const containerRef = useRef(null)
  
  // Track scroll progress strictly within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <section 
      id="process" 
      ref={containerRef}
      className="relative bg-ink border-t border-line/50 overflow-x-hidden"
    >
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Left Side: Sticky 3D Blueprint & Header */}
        <div className="w-full md:w-1/2 md:h-screen md:sticky top-0 pt-32 pb-16 md:py-0 flex flex-col justify-center relative z-10 border-r border-line/30">
          
          {/* Canvas ab poori width le raha hai, aur object andar shift ho chuka hai */}
          <div className="absolute inset-0 w-full h-[600px] z-0 pointer-events-none mix-blend-screen opacity-70">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <Scene scrollProgress={scrollYProgress} />
            </Canvas>
          </div>

          <div className="relative z-10 max-w-md">
            <Reveal preset="fadeUp">
              <span className="eyebrow text-[#ff5e00] tracking-widest">/ 03 — Process</span>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mt-6 text-paper uppercase tracking-tighter leading-[0.9]">
                Five <br />
                <span className="text-gradient">Movements.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2} preset="fadeUp" className="mt-8 max-w-xs">
              <p className="text-paper/50 text-sm leading-relaxed border-l border-[#ff5e00]/50 pl-4">
                A highly disciplined, mechanical sequence. We do not guess. We architect, assemble, and launch with precision.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Right Side: Scrolling Steps */}
        <div className="w-full md:w-1/2 relative z-20 pb-32 md:pb-[40vh]">
          {/* Spacer to push the first item down on desktop so it starts in the middle */}
          <div className="hidden md:block h-[40vh]" />
          
          <div className="flex flex-col">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, filter: 'blur(10px)', x: 40 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                viewport={{ margin: "-40% 0px -40% 0px" }} // Triggers only when dead center of screen
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group py-16 md:py-24 border-b border-line/30 flex flex-col md:pl-16 relative"
              >
                {/* Active glowing indicator that sweeps in from the left border */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff5e00] to-[#ffb700] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                
                <div className="font-mono text-[#ffb700] text-xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  {s.n}
                </div>
                
                <h3 className="font-display text-4xl md:text-5xl text-paper mb-6 uppercase tracking-tight group-hover:text-gradient transition-all duration-300">
                  {s.title}
                </h3>
                
                <p className="text-paper/60 text-lg leading-relaxed max-w-md">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}