import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import logo from '../assets/Nubrxy.png'

// --- CONTENT LIBRARY FOR MODALS ---
const legalDocuments = {
  'Data Privacy Architecture': {
    title: 'Data Privacy Architecture',
    updated: 'July 2026',
    body: (
      <div className="space-y-4 text-paper/70 text-sm leading-relaxed">
        <p>At Nexora Studio, data privacy is not an afterthought; it is engineered into the foundation of every digital space and autonomous agent we deploy.</p>
        <p><strong>1. Data Minimization:</strong> Our AI workflows and intake concierges are programmed to collect only the strictly necessary parameters required to execute a function. We do not harvest extraneous user telemetry.</p>
        <p><strong>2. Encryption Protocols:</strong> All data transmitted between client interfaces and our backend architectures (including n8n and Vapi) utilizes end-to-end TLS 1.3 encryption.</p>
        <p><strong>3. Autonomous Scrubbing:</strong> Session data utilized by our AI agents is temporarily held in volatile memory and is systematically scrubbed upon sequence completion unless explicitly authorized for persistent storage.</p>
      </div>
    )
  },
  'Terms of Engagement': {
    title: 'Terms of Engagement',
    updated: 'July 2026',
    body: (
      <div className="space-y-4 text-paper/70 text-sm leading-relaxed">
        <p>These terms govern the interaction between Nexora Studio and its digital partners.</p>
        <p><strong>1. Architectural Integrity:</strong> We deliver bespoke, zero-template systems. Upon final deployment and settlement, full architectural ownership and codebase rights are transferred to the partner.</p>
        <p><strong>2. Performance Budgets:</strong> We guarantee that all React and front-end builds will meet strict performance thresholds (Core Web Vitals) prior to launch.</p>
        <p><strong>3. Maintenance & SLA:</strong> Post-launch monitoring and AI agent fine-tuning are subject to specific retainer agreements. Standard emergency response latency is &lt; 1 Hour.</p>
      </div>
    )
  },
  'Session & Cookie Protocols': {
    title: 'Session & Cookie Protocols',
    updated: 'July 2026',
    body: (
      <div className="space-y-4 text-paper/70 text-sm leading-relaxed">
        <p>We utilize a minimal-footprint tracking architecture.</p>
        <p><strong>1. Essential Tokens:</strong> We deploy secure, HttpOnly tokens strictly for maintaining user sessions, securing API routes, and enabling rate-limiting on our intake concierges.</p>
        <p><strong>2. Analytics:</strong> We employ privacy-first, cookieless analytics to measure interface performance and scroll depth. No personally identifiable information (PII) is cross-referenced or sold to third-party ad networks.</p>
      </div>
    )
  },
  'Security Blueprint': {
    title: 'Security Blueprint',
    updated: 'July 2026',
    body: (
      <div className="space-y-4 text-paper/70 text-sm leading-relaxed">
        <p>Security is treated as a primary feature, not a patch.</p>
        <p><strong>1. Type-Safe Foundations:</strong> Our entire stack is built on strict TypeScript to eliminate runtime errors and memory vulnerabilities at the compilation stage.</p>
        <p><strong>2. AI Guardrails:</strong> Our conversational agents operate within strictly defined LLM guardrails, preventing prompt injection attacks and unauthorized data surfacing.</p>
        <p><strong>3. Infrastructure:</strong> We deploy on edge networks with built-in DDoS mitigation, automated vulnerability scanning, and isolated serverless environments.</p>
      </div>
    )
  },
  'Accessibility Standard': {
    title: 'Accessibility Standard',
    updated: 'July 2026',
    body: (
      <div className="space-y-4 text-paper/70 text-sm leading-relaxed">
        <p>High-end design must remain universally navigable.</p>
        <p><strong>1. WCAG 2.1 AA Compliance:</strong> We build cinematic interfaces that maintain strict contrast ratios, keyboard navigability, and screen-reader compatibility (ARIA roles).</p>
        <p><strong>2. Motion Tolerance:</strong> All complex 3D WebGL and Framer Motion animations respect the user's OS-level <code>prefers-reduced-motion</code> settings, defaulting to graceful static fallbacks when requested.</p>
      </div>
    )
  }
}

const columns = [
  {
    title: 'Architecture',
    links: [
      { name: 'Web Development', href: '#capabilities' },
      { name: 'AI Agents', href: '#capabilities' },
      { name: 'AI Chatbots', href: '#capabilities' },
      { name: 'AI Receptionist', href: '#capabilities' },
      { name: 'Cinematic Design', href: '#capabilities' },
      { name: 'Technical SEO', href: '#capabilities' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { name: 'Manifesto', href: '#manifesto' },
      { name: 'Process', href: '#process' },
      { name: 'Careers', href: '#careers' },
      { name: 'Journal', href: '#journal' },
    ],
  },
  {
    title: 'Legal & Compliance',
    links: [
      { name: 'Data Privacy Architecture', href: '#legal' },
      { name: 'Terms of Engagement', href: '#legal' },
      { name: 'Session & Cookie Protocols', href: '#legal' },
      { name: 'Security Blueprint', href: '#legal' },
      { name: 'Accessibility Standard', href: '#legal' },
    ],
  },
]

// 3D Magnetic Brand Component
function TiltBrand() {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative p-6 -m-6 rounded-2xl border border-transparent hover:border-[#ff5e00]/10 transition-colors duration-500 cursor-default"
    >
      <div style={{ transform: "translateZ(40px)" }} className="flex items-center gap-3 mb-2 transition-transform duration-300">
        <img src={logo} alt="Nubrxy" className="h-15 w-auto" />
      </div>
      <p style={{ transform: "translateZ(25px)" }} className="text-paper/60 max-w-sm text-sm leading-relaxed transition-transform duration-300">
        A digital & AI studio building premium experiences for founders
        and enterprises who refuse to be average.
      </p>
      <div style={{ transform: "translateZ(15px)" }} className="flex items-center gap-2 mt-8 text-xs text-[#ffb700] transition-transform duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ffb700]" />
        All systems operational
      </div>
    </motion.div>
  )
}

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null)

  useEffect(() => {
    if (activeModal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [activeModal])

  const handleLinkClick = (e, linkName, category) => {
    if (category === 'Legal & Compliance') {
      e.preventDefault()
      setActiveModal(linkName)
    }
  }

  return (
    <>
      <footer className="border-t border-line relative overflow-hidden bg-ink pt-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-[#ff5e00]/5 to-transparent pointer-events-none" />

        <div className="overflow-hidden py-10 border-b border-line mb-16 relative" style={{ perspective: "1000px" }}>
          <motion.div
            initial={{ rotateX: 20, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="whitespace-nowrap animate-[marquee_30s_linear_infinite] text-4xl md:text-6xl font-display font-bold tracking-tight opacity-40 mix-blend-color-dodge"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mx-8 text-gradient">
                NUXBRY<span className="text-[#ffb700]">  </span>
              </span>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16 grid md:grid-cols-2 gap-16 relative z-10">
          <div style={{ perspective: "1000px" }}>
            <TiltBrand />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {columns.map((c, colIndex) => (
              <div key={c.title}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: colIndex * 0.1 }}
                  className="eyebrow mb-6 text-[#ff5e00]"
                >
                  {c.title}
                </motion.div>
                <ul className="space-y-4">
                  {c.links.map((l, linkIndex) => (
                    <motion.li
                      key={l.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (colIndex * 0.1) + (linkIndex * 0.05) }}
                    >
                      <a
                        href={l.href}
                        onClick={(e) => handleLinkClick(e, l.name, c.title)}
                        className="link-draw text-sm text-paper/70 hover:text-paper cursor-pointer"
                      >
                        {l.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-paper/40">
          <span>© {new Date().getFullYear()} Nubrxy · Built with intent</span>
          <div className="flex gap-6">
            {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((s) => (
              <a key={s} href="#" className="hover:text-[#ffb700] transition-colors duration-300">
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeModal && legalDocuments[activeModal] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-ink/80 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] bg-[#111113] border border-paper/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between px-8 py-6 border-b border-paper/10 bg-ink/50">
                <div>
                  <div className="eyebrow text-[#ff5e00] mb-2">Legal System</div>
                  <h3 className="font-display text-2xl text-paper tracking-tight">
                    {legalDocuments[activeModal].title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-10 h-10 rounded-full bg-paper/5 hover:bg-[#ff5e00] text-paper flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 overflow-y-auto scrollbar-thin">
                <div className="font-mono text-xs text-[#ffb700] mb-6">
                  LAST COMPILED: {legalDocuments[activeModal].updated}
                </div>
                {legalDocuments[activeModal].body}
              </div>

              <div className="px-8 py-6 border-t border-paper/10 bg-ink/30 text-xs text-paper/30 flex justify-between font-mono">
                <span>SYSTEM: NOMINAL</span>
                <span>END OF DOCUMENT</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}