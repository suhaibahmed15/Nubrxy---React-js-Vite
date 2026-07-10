import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'

// A small, pulsing audio-wave component to simulate voice AI activity
const AudioWave = ({ active }) => (
  <div className="flex items-end gap-[2px] h-4 w-6">
    {[1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        animate={active ? { height: ['20%', '100%', '40%', '80%', '20%'] } : { height: '20%' }}
        transition={active ? { repeat: Infinity, duration: 0.8, delay: i * 0.1, ease: 'easeInOut' } : {}}
        className="w-1 bg-[#ff5e00] rounded-t-sm"
      />
    ))}
  </div>
)

export default function Dialogue() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Systems initialized. I'm Nova, Nexora's autonomous concierge. What kind of digital architecture are you looking to build?" },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const send = () => {
    if (!input.trim()) return
    
    // 1. Add User Message
    setMessages((prev) => [...prev, { from: 'user', text: input }])
    setInput('')
    setIsTyping(true)

    // 2. Simulate AI Processing & Pipeline Routing
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { 
          from: 'system', 
          text: "[ Webhook triggered. Syncing payload via n8n... ]" 
        },
        { 
          from: 'bot', 
          text: "Data captured. I'm routing this directly to the core engineering team. The directing partners will review your architecture requirements and be in touch within the hour." 
        },
      ])
    }, 1800)
  }

  return (
    <section id="dialogue" className="relative px-6 md:px-10 py-32 border-t border-line bg-ink overflow-hidden">
      
      {/* Subtle background flare */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ff5e00] opacity-[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Column: Context */}
        <Reveal>
          <span className="eyebrow text-[#ff5e00] tracking-widest">/ 06 — Initialize</span>
          <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[0.95] tracking-tighter text-paper uppercase">
            Bypass <br />
            <span className="text-gradient">The Inbox.</span>
          </h2>
          <p className="text-paper/60 mt-8 max-w-md leading-relaxed font-light text-lg">
            Speak directly with Nova. Outline your project requirements, and she will execute an automated pipeline to route your brief to our core engineering team immediately.
          </p>

          <div className="grid grid-cols-2 gap-8 mt-12 max-w-sm border-t border-line/50 pt-8">
            <div className="group">
              <div className="eyebrow text-paper/30 group-hover:text-[#ffb700] transition-colors">Protocol</div>
              <div className="text-sm mt-2 text-paper/80 font-mono">Vapi / n8n Sync</div>
            </div>
            <div className="group">
              <div className="eyebrow text-paper/30 group-hover:text-[#ffb700] transition-colors">Locations</div>
              <div className="text-sm mt-2 text-paper/80 font-mono">Pakistan</div>
            </div>
            <div className="group">
              <div className="eyebrow text-paper/30 group-hover:text-[#ffb700] transition-colors">Latency</div>
              <div className="text-sm mt-2 text-paper/80 font-mono">&lt; 1 Hour SLA</div>
            </div>
            <div className="group">
              <div className="eyebrow text-paper/30 group-hover:text-[#ffb700] transition-colors">Status</div>
              <div className="text-sm mt-2 flex items-center gap-2 text-paper/80 font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb700] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5e00]"></span>
                </span>
                Agent Online
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Glassmorphic Terminal */}
        <Reveal preset="blurUp" delay={0.2}>
          <div className="relative border border-paper/10 rounded-3xl bg-paper/[0.02] backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(255,94,0,0.05)] flex flex-col h-[500px]">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-paper/10 bg-ink/50">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#ff5e00]/20 to-transparent border border-[#ff5e00]/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#ffb700] animate-pulse" />
                </div>
                <div>
                  <div className="text-sm font-medium text-paper">Nova AI</div>
                  <div className="text-xs text-[#ff5e00] font-mono mt-0.5">Autonomous Concierge</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <AudioWave active={isTyping} />
                <span className="eyebrow text-paper/30 hidden sm:block">End-to-End Encrypted</span>
              </div>
            </div>

            {/* Chat History Area */}
            <div ref={scrollRef} className="p-6 space-y-6 flex-1 overflow-y-auto scroll-smooth">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.from === 'system' ? (
                      // System routing messages (n8n logs)
                      <div className="w-full text-center my-2">
                        <span className="font-mono text-[0.65rem] text-[#ffb700]/70 uppercase tracking-widest bg-[#ffb700]/10 px-3 py-1 rounded-full">
                          {m.text}
                        </span>
                      </div>
                    ) : (
                      // Standard chat bubbles
                      <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                        m.from === 'bot'
                          ? 'bg-ink/80 border border-paper/10 text-paper/80 rounded-tl-sm'
                          : 'bg-gradient-to-r from-[#ff5e00] to-[#ffb700] text-ink font-medium rounded-tr-sm shadow-lg'
                      }`}>
                        {m.text}
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex justify-start"
                  >
                    <div className="px-5 py-4 rounded-2xl rounded-tl-sm bg-ink/80 border border-paper/10 flex items-center gap-1.5">
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-[#ff5e00] rounded-full" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#ffb700] rounded-full" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-paper/50 rounded-full" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-paper/10 bg-ink/30 backdrop-blur-md">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Initialize project parameters..."
                  disabled={isTyping}
                  className="w-full bg-ink/50 border border-paper/10 focus:border-[#ff5e00]/50 outline-none text-sm text-paper placeholder:text-paper/30 px-5 py-4 rounded-full transition-colors disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={send}
                  disabled={isTyping || !input.trim()}
                  className="absolute right-2 w-10 h-10 rounded-full bg-gradient-to-r from-[#ff5e00] to-[#ffb700] text-ink flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Transmit"
                >
                  <span className="text-xl leading-none -mt-0.5">↗</span>
                </motion.button>
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  )
}