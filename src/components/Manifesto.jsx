import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal'

export default function Manifesto() {
  const containerRef = useRef(null)
  
  // Create a smooth parallax scroll effect for the main manifesto text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // The text will slowly move down while the user scrolls past
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacityFade = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  return (
    <section 
      id="manifesto" 
      ref={containerRef}
      className="relative px-6 md:px-10 py-32 md:py-48 overflow-hidden bg-ink"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff5e00] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Section Header */}
        <Reveal className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line/50 pb-8">
          <div>
            <span className="eyebrow text-[#ff5e00] tracking-[0.2em]">/ 01 — Ethos</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 text-paper uppercase tracking-tighter">
              The Nubrxy <br />
              <span className="text-gradient">Manifesto</span>
            </h2>
          </div>
          <div className="text-paper/40 text-sm max-w-xs uppercase tracking-widest font-mono">
            Systems initialized. <br />
            Art meets architecture.
          </div>
        </Reveal>

        {/* Parallax Main Copy */}
        <div className="md:pl-24 lg:pl-40 relative">
          <motion.div 
            style={{ y: yParallax, opacity: opacityFade }}
            className="font-display text-3xl md:text-5xl lg:text-[4rem] leading-[1.15] text-paper font-medium tracking-tight"
          >
            We sit at the intersection of advanced front-end engineering and autonomous machine intelligence. 
            <br /><br />
            <span className="text-paper/40">
              We do not just write code; we craft digital motion. Every interface is a canvas, blending the structural precision of modern React architecture with the fluid, sweeping elegance of digital calligraphy.
            </span>
            <br /><br />
            <span className="text-gradient">
              We build systems that feel alive.
            </span>
          </motion.div>
        </div>

        {/* Studio Statistics / Pillars */}
        <div className="mt-32 md:mt-48 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-line pt-12">
          {[
            ['04', 'Core Directing Partners'],
            ['Vapi / n8n', 'Voice Architecture'],
            ['React / Motion', 'Front-End Stack'],
            ['00', 'Templates Used'],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={0.1 * i} y={20} className="relative group">
              {/* Hover glow effect for the stats */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#ff5e00] to-[#ffb700] opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 rounded-full" />
              
              <div className="font-display text-3xl md:text-4xl text-paper group-hover:text-[#ffb700] transition-colors duration-300">
                {n}
              </div>
              <div className="eyebrow text-paper/40 mt-3 group-hover:text-paper/80 transition-colors duration-300">
                {l}
              </div>
            </Reveal>
          ))}
        </div>
        
      </div>
    </section>
  )
}