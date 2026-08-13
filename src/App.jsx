import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import CircuitBackground from './components/CircuitBackground'
import CursorEffect from './components/CursorEffect'
import ThemeSwitcher from './components/ThemeSwitcher'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* 3D Intro Loading Screen */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Main Portfolio — fades in after loading */}
      <div className={`portfolio-wrapper ${loaded ? 'portfolio-visible' : ''}`}>
        <CursorEffect />
        <CircuitBackground />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <ThemeSwitcher />
      </div>
    </>
  )
}
