import { motion } from 'framer-motion'

// Wrap any block in <Reveal> to animate it as it enters the viewport.
// Added presets: 'fadeUp', 'blurUp', and 'scale' for cinematic entrances.
export default function Reveal({ 
  children, 
  delay = 0, 
  y = 30, 
  className = '',
  preset = 'blurUp', // Defaulting to blurUp for that premium agency feel
  duration = 0.8 
}) {
  
  // Define animation states based on the chosen preset
  const getVariants = () => {
    switch (preset) {
      case 'blurUp':
        return {
          hidden: { opacity: 0, y, filter: 'blur(12px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
        }
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.92, y: y / 2 },
          visible: { opacity: 1, scale: 1, y: 0 }
        }
      case 'fadeUp':
      default:
        return {
          hidden: { opacity: 0, y },
          visible: { opacity: 1, y: 0 }
        }
    }
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      // Added a slight negative margin so it triggers just before the element crosses the threshold
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
      // The [0.22, 1, 0.36, 1] easing is a custom cubic-bezier that creates a snappy but buttery smooth finish
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  )
}