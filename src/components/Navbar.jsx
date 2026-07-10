import { useEffect, useState } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import logo from '../assets/Nubrxy.png'

const links = [
  { label: 'Work', href: '#capabilities' },
  { label: 'Studio', href: '#manifesto' },
  { label: 'Process', href: '#process' },
  { label: 'Journal', href: '#journal' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on("change", (latest) => setScrolled(latest > 50))
  }, [scrollY])

  return (
    <>
      <motion.header className="fixed top-0 w-full z-50 flex justify-center pt-6 px-4">
        <motion.nav
          animate={{
            width: scrolled ? "min(800px, 92vw)" : "min(75%, 92vw)",
            maxWidth: "1100px",
            borderRadius: scrolled ? "999px" : "0px",
            backgroundColor: scrolled ? "rgba(5, 3, 0, 0.8)" : "transparent",
            padding: scrolled ? "10px clamp(16px, 4vw, 30px)" : "16px clamp(16px, 4vw, 30px)",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between backdrop-blur-md border border-transparent hover:border-line/30"
        >
          {/* Logo - Linked to Hero */}
          <a href="#top" className="flex items-center">
            <img
              src={logo}
              alt="Nubrxy"
              className="h-14 md:h-28 w-auto object-contain transition-all duration-500"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 eyebrow text-sm text-paper/70">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-[#ff5e00] transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block bg-paper text-ink px-6 py-2 rounded-full font-medium text-sm hover:bg-[#ff5e00] hover:text-paper transition-all">
              Start a project
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-2 z-50"
            >
              <span className="block w-8 h-[2px] bg-paper" />
              <span className="block w-8 h-[2px] bg-paper" />
              <span className="block w-8 h-[2px] bg-paper" />
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Full-Screen Mobile Menu with Staggered Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center gap-8"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="absolute top-8 right-8 text-paper text-4xl hover:text-[#ff5e00] transition-colors"
            >
              ✕
            </button>
            
            {/* Staggered Links Container */}
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
              }}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center gap-6"
            >
              {links.map((l) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  variants={{
                    hidden: { y: 30, opacity: 0 },
                    show: { y: 0, opacity: 1 }
                  }}
                  className="text-5xl font-display font-medium text-paper hover:text-[#ff5e00] transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}