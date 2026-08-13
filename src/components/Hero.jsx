import { useEffect, useRef, useState } from 'react'

const ROLES = ['Full Stack Developer', 'Flutter Developer', 'ASP.NET Developer', 'React Developer']
const TECH_BADGES = ['React.js', 'Node.js', 'Flutter', 'C# / .NET', 'MySQL', 'MongoDB']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const cardRef = useRef(null)
  const stageRef = useRef(null)

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex]
    let timeout

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex(i => (i + 1) % ROLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  // 3D tilt on profile card
  useEffect(() => {
    const stage = stageRef.current
    const card = cardRef.current
    if (!stage || !card) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    function onMove(e) {
      const r = card.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      card.style.transform = `rotateY(${px * 12}deg) rotateX(${-py * 12}deg)`
    }
    function onLeave() {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)'
    }
    stage.addEventListener('mousemove', onMove)
    stage.addEventListener('mouseleave', onLeave)
    return () => {
      stage.removeEventListener('mousemove', onMove)
      stage.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div id="home" className="hero-section">
      <div className="hero-inner">
        {/* Left column */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            B.TECH ICT STUDENT @ MARWADI UNIVERSITY
          </div>

          <h1 className="hero-heading">
            Hi, I'm <span className="hero-name-accent">Bhargav Limbani</span>
          </h1>

          <p className="hero-role">
            I am a{' '}
            <span className="hero-typing-text">
              {displayed}<span className="hero-cursor">|</span>
            </span>
          </p>

          <p className="hero-desc">
            A passionate Full Stack Developer, Flutter Developer building scalable
            web applications, mobile apps, and real-world products that solve
            actual problems.
          </p>

          <div className="hero-tech-badges">
            {TECH_BADGES.map(b => (
              <span key={b} className="hero-tech-badge">{b}</span>
            ))}
          </div>

          <div className="hero-ctas">
            <a href="#projects" className="cta-btn cta-primary clickable">
              Explore Projects →
            </a>
            <a
              href="/bhargav%20limbani%20master%20resume.pdf"
              download="Bhargav_Limbani_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-ghost clickable"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
            <a href="#contact" className="cta-btn cta-ghost clickable">Contact Me</a>
          </div>
        </div>

        {/* Right column — HUD profile card */}
        <div className="hero-right" ref={stageRef}>
          <div className="hud-card" ref={cardRef}>
            {/* Corner brackets */}
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />

            {/* HUD header bar */}
            <div className="hud-bar">
              <span className="hud-bar-label">SYS.PROFILE</span>
              <span className="hud-bar-status">
                <span className="hud-status-dot" />ONLINE
              </span>
            </div>

            {/* Photo */}
            <div className="hud-photo-wrap">
              <img src="/photo.jpg" alt="Bhargav Limbani" className="hud-photo" />
              <div className="hud-scan-line" />
            </div>

            {/* Info */}
            <div className="hud-info">
              <div className="hud-name">Bhargav Limbani</div>
              <div className="hud-role-label">Full Stack · Flutter · ASP.NET</div>
              <div className="hud-coords">
                <span>X: 21.3°N</span>
                <span>Y: 70.8°E</span>
                <span>Gondal, IN</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="hud-stats">
              <div className="hud-stat">
                <div className="hud-stat-val">7+</div>
                <div className="hud-stat-key">Projects</div>
              </div>
              <div className="hud-stat">
                <div className="hud-stat-val">3+</div>
                <div className="hud-stat-key">Stacks</div>
              </div>
              <div className="hud-stat">
                <div className="hud-stat-val">1</div>
                <div className="hud-stat-key">Internship</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-text">SCROLL</div>
        <div className="scroll-line">
          <div className="scroll-dot" />
        </div>
      </div>
    </div>
  )
}
