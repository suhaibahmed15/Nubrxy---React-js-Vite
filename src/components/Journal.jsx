import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'

const posts = [
  { n: '01', tag: 'Voice AI', title: 'Architecting receptionists with Vapi & n8n', meta: '8 min · Jul 08', color: '#ff5e00' },
  { n: '02', tag: 'Motion', title: 'Digital calligraphy: Fluid elegance in UI', meta: '5 min · Jun 30', color: '#ffb700' },
  { n: '03', tag: 'Engineering', title: 'Shipping cinematic React apps at 60fps', meta: '9 min · Jun 21', color: '#ffffff' },
  { n: '04', tag: 'Automation', title: 'Why agent memory is the next database', meta: '7 min · Jun 12', color: '#ff5e00' },
]

export default function Journal() {
  const [activeIndex, setActiveIndex] = useState(null)
  const activeColor = activeIndex !== null ? posts[activeIndex].color : '#140d05'

  return (
    <section id="journal" className="relative bg-ink border-t border-line/50 min-h-0 overflow-x-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Left Side: Sticky Header */}
        <div className="w-full md:w-5/12 md:h-screen md:sticky top-0 flex flex-col justify-center pb-16 md:pb-0 border-r border-line/30 pt-20 md:pt-0">
          <motion.div 
            className="absolute inset-0 z-0 pointer-events-none opacity-20"
            animate={{ background: `radial-gradient(circle at 30% 50%, ${activeColor} 0%, transparent 70%)` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <Reveal className="relative z-10 pointer-events-none hidden md:block">
            <span className="eyebrow text-[#ffb700] tracking-widest">/ 05 — Journal</span>
            <h2 className="font-display text-5xl lg:text-6xl mt-4 text-paper uppercase tracking-tighter">
              Signal, <br />
              <span className="text-paper/30">Not Noise.</span>
            </h2>
            <p className="mt-6 text-sm text-paper/40 max-w-xs border-l border-[#ffb700]/50 pl-4 font-light">
              Thoughts on rendering complex architectures, AI automation, and the pursuit of uncompromising design.
            </p>
          </Reveal>
        </div>

        {/* Right Side: Scrollable List */}
        <div className="w-full md:w-7/12 py-16 md:py-32 md:pl-12 lg:pl-20">
          <Reveal className="mb-12 md:hidden">
            <span className="eyebrow text-[#ffb700]">/ 05 — Journal</span>
            <h2 className="font-display text-4xl mt-4 text-paper uppercase tracking-tighter">Signal, Not Noise.</h2>
          </Reveal>

          <div className="flex flex-col">
            {posts.map((p, i) => (
              <motion.a
                key={p.n}
                href="#"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative py-10 md:py-14 border-b border-line/50 block ${
                  activeIndex !== null && activeIndex !== i ? 'opacity-30 blur-[1px]' : 'opacity-100'
                }`}
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8">
                  <div className="flex items-center md:flex-col md:items-start gap-4 md:gap-1 w-full md:w-32 shrink-0">
                    <span className="font-mono text-paper/30 text-sm">{p.n}</span>
                    <span className="eyebrow transition-colors duration-300" style={{ color: activeIndex === i ? p.color : '#ff5e00' }}>
                      {p.tag}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-3xl text-paper tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                      {p.title}
                    </h3>
                    <div className="mt-4 flex items-center justify-between text-paper/40 text-xs font-mono uppercase">
                      <span>{p.meta}</span>
                      <span className="text-paper font-medium" style={{ opacity: activeIndex === i ? 1 : 0 }}>Read Entry →</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <Reveal className="mt-16 text-center md:text-left">
             <a href="#" className="eyebrow text-paper/50 hover:text-[#ffb700] transition-colors">Access Full Archive ↗</a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}