import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Capabilities from './components/Capabilities'
import Process from './components/Process'
import Testimonial from './components/Testimonial'
import Journal from './components/Journal'
import Dialogue from './components/Dialogue'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-ink text-paper font-body min-h-screen">
      <Navbar />
      <Hero />
      <Manifesto />
      <Capabilities />
      <Process />
      <Testimonial />
      <Journal />
      <Dialogue />
      <Footer />
    </div>
  )
}

export default App
