import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import Reveal from './Reveal'

const items = [
  { n: '01', tag: 'Flagship', title: 'AI Agents', desc: 'Autonomous workflows that plan, act and report inside the tools your team already uses.' },
  { n: '02', tag: 'Engineering', title: 'Web Development', desc: 'Production React & TypeScript builds, measured against real performance budgets.' },
  { n: '03', tag: 'Conversational', title: 'AI Chatbots', desc: 'Assistants trained on your own knowledge base, tuned to your voice.' },
  { n: '04', tag: 'Voice', title: 'AI Receptionist', desc: 'A phone & chat front desk that books, qualifies and hands off cleanly, all day.' },
  { n: '05', tag: 'Interface', title: 'UI/UX Design', desc: 'Interfaces mapped, prototyped and shipped with flow as the north star.' },
  { n: '06', tag: 'Brand', title: 'Graphic Design', desc: 'Identity systems, decks and campaigns built with obsessive attention to detail.' },
  { n: '07', tag: 'Motion', title: 'Animation', desc: 'From micro-interactions to full 3D sequences — motion treated as a first-class material.' },
  { n: '08', tag: 'Growth', title: 'SEO', desc: 'Technical and editorial SEO systems that compound quarter over quarter.' },
  { n: '09', tag: 'Distribution', title: 'Social Media', desc: 'Content engines and community management built for founder-led brands.' },
]

// --- 3D SCENE COMPONENTS ---

function DynamicCore({ activeIndex }) {
  const meshRef = useRef()
  const innerRef = useRef()
  
  // Target values for smooth interpolation (lerping)
  const targetScale = activeIndex !== null ? 1.15 : 1
  const targetSpeed = activeIndex !== null ? 2 : 0.5

  useFrame((state, delta) => {
    if (meshRef.current && innerRef.current) {
      // Smoothly rotate the outer glass shell
      meshRef.current.rotation.x += delta * 0.1 * targetSpeed
      meshRef.current.rotation.y += delta * 0.15 * targetSpeed
      
      // Counter-rotate the inner core
      innerRef.current.rotation.x -= delta * 0.2 * targetSpeed
      innerRef.current.rotation.y -= delta * 0.1 * targetSpeed

      // Smoothly scale up when a user hovers over an item
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05)
    }
  })

  // Determine core color based on active state
  const coreColor = activeIndex !== null ? "#ffb700" : "#ff5e00"

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Outer Frosted Glass Shell - Size reduced */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.5, 2]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          transmission={1}
          roughness={0.2}
          color="#ffffff"
        />
      </mesh>

      {/* Inner Glowing Wireframe Core - Size reduced */}
      <mesh ref={innerRef} scale={0.8}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color={coreColor} wireframe />
      </mesh>
      
      {/* Dynamic particles that react to interaction - Scale restricted */}
      <Sparkles count={activeIndex !== null ? 100 : 40} scale={3.5} size={activeIndex !== null ? 4 : 1.5} speed={targetSpeed} color={coreColor} />
    </Float>
  )
}

function Scene({ activeIndex }) {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffb700" />
      
      <DynamicCore activeIndex={activeIndex} />
    </>
  )
}

// --- UI COMPONENT ---

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <section id="capabilities" className="relative min-h-screen border-t border-line bg-ink overflow-hidden flex flex-col md:flex-row">
      
      {/* Right Side: 3D Canvas Background */}
      <div className="absolute inset-0 md:relative md:w-1/2 h-[50vh] md:h-auto z-0 flex items-center justify-center bg-gradient-to-l from-ink via-ink/80 to-transparent">
        
        {/* Camera pulled back to Z:11 for more breathing room */}
        <Canvas camera={{ position: [0, 0, 11], fov: 45 }} className="pointer-events-none">
          <Scene activeIndex={activeIndex} />
        </Canvas>
        
        {/* Dynamic Detail Overlay inside the 3D space */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute bottom-10 right-10 max-w-sm text-right hidden lg:block"
            >
              <div className="eyebrow text-[#ff5e00] mb-3">System / {items[activeIndex].n}</div>
              <p className="text-paper/70 leading-relaxed font-light backdrop-blur-md bg-ink/20 p-6 rounded-2xl border border-paper/10">
                {items[activeIndex].desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Left Side: Interactive Editorial Index */}
      <div className="relative z-10 w-full md:w-1/2 px-6 md:px-16 py-24 md:py-32 flex flex-col justify-center border-r border-line/30 backdrop-blur-sm md:backdrop-blur-none bg-ink/70 md:bg-transparent">
        <Reveal preset="fadeUp" className="mb-16">
          <span className="eyebrow text-[#ff5e00]">/ 02 — Architecture</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-paper uppercase tracking-tighter">
            Nine Disciplines.
            <br /> <span className="text-gradient">One Engine.</span>
          </h2>
        </Reveal>

        <div className="flex flex-col border-t border-line/50">
          {items.map((it, i) => {
            const isActive = activeIndex === i
            const isHoveredAny = activeIndex !== null

            return (
              <div 
                key={it.n}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`group relative border-b border-line/50 py-6 md:py-8 cursor-pointer transition-all duration-500 ${
                  isHoveredAny && !isActive ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0'
                }`}
              >
                {/* Active highlight background sweep */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#ff5e00]/10 to-transparent transition-transform duration-500 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-baseline gap-6 md:gap-10">
                    <span className="font-mono text-sm md:text-base text-paper/40 group-hover:text-[#ffb700] transition-colors duration-300">
                      {it.n}
                    </span>
                    <h3 className="font-display text-2xl md:text-4xl lg:text-5xl text-paper group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ff5e00] group-hover:to-[#ffb700] transition-all duration-300 uppercase tracking-tight">
                      {it.title}
                    </h3>
                  </div>
                  
                  {/* Explore Arrow that pushes in on hover */}
                  <motion.span 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="hidden md:block text-[#ff5e00] text-2xl"
                  >
                    →
                  </motion.span>
                </div>
                
                {/* Mobile description reveal */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="md:hidden overflow-hidden"
                    >
                      <p className="mt-4 text-paper/60 text-sm pl-12 border-l border-[#ff5e00]/30 ml-2">
                        {it.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}