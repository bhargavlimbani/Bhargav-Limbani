import { useEffect, useRef } from 'react'

const ORBIT_LABELS = ['React', 'Node.js', 'Flutter', 'C# / .NET', 'MySQL', 'MongoDB']
const ORBIT_POSITIONS = [
  { top: '8%', left: '2%' },
  { top: '2%', left: '62%' },
  { top: '40%', left: '-6%' },
  { top: '70%', left: '88%' },
  { top: '85%', left: '6%' },
  { top: '20%', left: '86%' },
]

export default function Hero() {
  const stageRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    const card = cardRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    function onMove(e) {
      const r = card.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      card.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg)`
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
    <div className="hero">
      <div className="stage" ref={stageRef}>
        <div className="card" ref={cardRef} id="tiltCard">
          <svg className="traces" viewBox="0 0 560 300" preserveAspectRatio="none">
            <path d="M0 40 H120 L140 60 H300" stroke="url(#g1)" strokeWidth="1" fill="none" />
            <path d="M560 260 H420 L400 240 H250" stroke="url(#g1)" strokeWidth="1" fill="none" />
            <circle cx="140" cy="60" r="3" fill="#4ce0d2" />
            <circle cx="400" cy="240" r="3" fill="#8b7fff" />
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#4ce0d2" stopOpacity="0.6" />
                <stop offset="1" stopColor="#8b7fff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="card-top">
            <div className="badge-photo">
              <img src="/photo.jpg" alt="Bhargav Limbani" />
              <span className="status"></span>
            </div>
            <div className="info">
              <div className="eyebrow"><span className="bar"></span> DEVELOPER ID · GONDAL, IN</div>
              <div className="name display">Bhargav Limbani</div>
              <div className="titles mono">
                <span>Full Stack Developer</span>
                <span>Flutter Developer</span>
                <span>ASP.NET Developer</span>
              </div>
            </div>
          </div>

          <p className="lede">
            B.Tech (ICT) student building across web, mobile and desktop stacks — from React and
            Node to Flutter and ASP.NET. Fresher, hungry to ship real products.
          </p>

          <div className="pins">
            <a className="pin resume-pin" href="/bhargav%20limbani%20master%20resume.pdf" download="Bhargav_Limbani_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span><span className="lbl">Resume</span><span className="val highlight">Download PDF</span></span>
            </a>
            <a className="pin" href="mailto:limbanibhargavmaheshbhai@gmail.com">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M4 4h16v16H4z" /><path d="M4 6l8 7 8-7" /></svg>
              <span><span className="lbl">Email</span><span className="val">limbanibhargavmaheshbhai@gmail.com</span></span>
            </a>
            <a className="pin" href="tel:6355990290">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
              <span><span className="lbl">Phone</span><span className="val">6355990290</span></span>
            </a>
            <a className="pin" href="https://www.linkedin.com/in/bhargav-limbani-111977286/" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M8 11v5M8 8v.01M12 16v-3.5a1.8 1.8 0 0 1 3.6 0V16" /></svg>
              <span><span className="lbl">LinkedIn</span><span className="val">bhargav-limbani</span></span>
            </a>
            <a className="pin" href="https://github.com/bhargavlimbani" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 3a9 9 0 0 0-2.8 17.5c.4.1.6-.2.6-.4v-1.6c-2.5.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.6.1-.5.1-.5.9 0 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2-.2-4.1-1-4.1-4.4 0-1 .3-1.7.9-2.4-.1-.2-.4-1.1.1-2.4 0 0 .8-.3 2.5 1a8.6 8.6 0 0 1 4.6 0c1.7-1.2 2.5-1 2.5-1 .5 1.3.2 2.2.1 2.4.6.7.9 1.5.9 2.4 0 3.4-2.1 4.2-4.1 4.4.3.3.6.8.6 1.7v2.5c0 .2.2.5.6.4A9 9 0 0 0 12 3z" /></svg>
              <span><span className="lbl">GitHub</span><span className="val">bhargavlimbani</span></span>
            </a>
          </div>
        </div>

        {ORBIT_LABELS.map((label, i) => (
          <div
            key={label}
            className="orbit-badge"
            style={{ ...ORBIT_POSITIONS[i], animationDelay: `${i * 0.7}s` }}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="scrolldown mono">SCROLL <div className="chevron"></div></div>
    </div>
  )
}
