import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'

const testimonials = [
  {
    id: 1,
    quote: "Nexora rebuilt our entire intake pipeline. The AI booking system took our response time from hours to seconds, completely transforming our dispatch efficiency.",
    name: "Operations Director",
    company: "Blue Eagle Junk Removal",
    tag: "AI Architecture & Automation"
  },
  {
    id: 2,
    quote: "We needed a digital storefront that felt more like a cinematic experience than a standard website. The front-end architecture and fluid motion they delivered is world-class.",
    name: "Creative Director",
    company: "Maison Or",
    tag: "Cinematic UI & Motion"
  },
  {
    id: 3,
    quote: "The integration of their Vapi voice receptionist with our backend was flawless. It feels less like a software update and more like we hired a tireless, flawless front-desk team.",
    name: "Managing Partner",
    company: "Kestrel Capital",
    tag: "Voice Intelligence"
  }
]

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000) // Changes every 6 seconds
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleManualSelect = (index) => {
    setActiveIndex(index)
    setIsAutoPlaying(false) // Pause auto-play if user interacts
  }

  return (
    <section className="relative px-6 md:px-10 py-32 border-t border-line bg-ink overflow-hidden">
      
      {/* Ambient glowing orb in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#ff5e00] to-[#ffb700] opacity-[0.03] blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-16 md:gap-8">
        
        {/* Left Column: Context & Controls */}
        <div className="w-full md:w-1/3 flex flex-col justify-between">
          <Reveal preset="fadeUp">
            <span className="eyebrow text-[#ff5e00] tracking-widest">/ 04 — Voices</span>
            <h2 className="font-display text-4xl mt-4 text-paper uppercase tracking-tighter">
              Client <br />
              <span className="text-gradient">Transmissions.</span>
            </h2>
          </Reveal>

          {/* Navigation Indicators */}
          <div className="mt-12 md:mt-auto flex flex-col gap-4">
            {testimonials.map((t, index) => {
              const isActive = activeIndex === index
              return (
                <button
                  key={t.id}
                  onClick={() => handleManualSelect(index)}
                  className="group flex items-center gap-4 text-left focus:outline-none"
                >
                  {/* Progress Line */}
                  <div className="relative h-[2px] w-12 bg-line overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 bottom-0 bg-[#ff5e00]"
                      initial={{ width: "0%" }}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      transition={{ duration: isActive && isAutoPlaying ? 6 : 0.3, ease: "linear" }}
                    />
                  </div>
                  
                  {/* Client Info */}
                  <div>
                    <div className={`font-mono text-xs uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-[#ffb700]' : 'text-paper/30 group-hover:text-paper/60'}`}>
                      {t.company}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: The Active Quote */}
        <div className="w-full md:w-2/3 md:pl-16 md:border-l border-line/50 min-h-[300px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, filter: 'blur(10px)', x: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Decorative Quotation Mark */}
              <span className="absolute -top-12 -left-6 text-[8rem] font-display text-paper/5 leading-none pointer-events-none select-none">
                "
              </span>
              
              <p className="relative z-10 font-display text-2xl md:text-4xl lg:text-5xl leading-[1.2] text-paper font-medium tracking-tight">
                {testimonials[activeIndex].quote}
              </p>
              
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff5e00]/20 to-[#ffb700]/10 border border-[#ff5e00]/30 flex items-center justify-center">
                   {/* Generates initials (e.g., BE for Blue Eagle) */}
                  <span className="font-mono text-sm text-[#ffb700]">
                    {testimonials[activeIndex].company.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-paper text-sm font-medium uppercase tracking-wide">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="text-[#ff5e00] text-xs font-mono mt-1">
                    [ {testimonials[activeIndex].tag} ]
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}