import { useEffect, useRef, useState } from 'react'

const CODE_LINES = [
  '> Initializing portfolio...',
  '> Loading Bhargav Limbani',
  '> import React from "react"',
  '> const stack = ["React","Node","Flutter"]',
  '> npm install --save-dev awesomeness',
  '> Building components... ✓',
  '> Connecting APIs... ✓',
  '> Compiling styles... ✓',
  '> Portfolio ready! 🚀',
]

const FLOAT_SYMBOLS = [
  '</>', '{}', '()', '=>', '[]', '/*',
  'npm', 'git', 'API', '===', '&&', '||',
  '#!', ';;', '**', '++', '::',
]

export default function LoadingScreen({ onComplete }) {
  const [lines, setLines] = useState([''])
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [done, setDone] = useState(false)
  const canvasRef = useRef(null)
  const timerRef = useRef(null)
  const lineIdxRef = useRef(0)
  const charIdxRef = useRef(0)
  const rafRef = useRef(null)

  // Typing effect for code lines
  useEffect(() => {
    let timeout
    function typeNext() {
      const li = lineIdxRef.current
      const ci = charIdxRef.current
      if (li >= CODE_LINES.length) return

      const target = CODE_LINES[li]
      if (ci <= target.length) {
        setLines(prev => {
          const copy = [...prev]
          copy[li] = target.slice(0, ci)
          return copy
        })
        charIdxRef.current = ci + 1
        timeout = setTimeout(typeNext, ci === 0 ? 180 : 28)
      } else {
        lineIdxRef.current = li + 1
        charIdxRef.current = 0
        if (li + 1 < CODE_LINES.length) {
          setLines(prev => [...prev, ''])
          timeout = setTimeout(typeNext, 220)
        }
      }
    }
    timeout = setTimeout(typeNext, 600)
    return () => clearTimeout(timeout)
  }, [])

  // Progress bar
  useEffect(() => {
    let v = 0
    const id = setInterval(() => {
      v += Math.random() * 4 + 1
      if (v >= 100) { v = 100; clearInterval(id) }
      setProgress(Math.floor(v))
    }, 55)
    return () => clearInterval(id)
  }, [])

  // Auto-exit after 5.5s
  useEffect(() => {
    timerRef.current = setTimeout(triggerExit, 5500)
    return () => clearTimeout(timerRef.current)
  }, [])

  function triggerExit() {
    if (exiting) return
    setExiting(true)
    setTimeout(() => {
      setDone(true)
      onComplete?.()
    }, 900)
  }

  // Floating particles canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight

    const particles = Array.from({ length: 38 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      symbol: FLOAT_SYMBOLS[i % FLOAT_SYMBOLS.length],
      size: Math.random() * 10 + 9,
      speedX: (Math.random() - 0.5) * 0.45,
      speedY: (Math.random() - 0.5) * 0.45,
      alpha: Math.random() * 0.35 + 0.07,
    }))

    function draw() {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < -40) p.x = W + 40
        if (p.x > W + 40) p.x = -40
        if (p.y < -40) p.y = H + 40
        if (p.y > H + 40) p.y = -40
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = '#a78bfa'
        ctx.font = `bold ${p.size}px 'JetBrains Mono', monospace`
        ctx.fillText(p.symbol, p.x, p.y)
        ctx.restore()
      })
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  if (done) return null

  return (
    <div
      className={`loader-screen ${exiting ? 'loader-exit' : ''}`}
      onClick={triggerExit}
      aria-label="Loading screen, tap to skip"
    >
      {/* Floating code particles */}
      <canvas ref={canvasRef} className="loader-canvas" />

      {/* Ambient glows */}
      <div className="loader-glow loader-glow-1" />
      <div className="loader-glow loader-glow-2" />

      {/* 3D Computer Scene */}
      <div className="loader-scene">
        <div className="computer-3d">

          {/* Monitor */}
          <div className="monitor">
            <div className="monitor-stand-arm" />
            <div className="monitor-bezel">
              {/* Power LED */}
              <div className="monitor-led" />
              {/* Screen */}
              <div className="monitor-screen">
                {/* Scan line overlay */}
                <div className="screen-scanlines" />
                {/* Code content */}
                <div className="screen-content" aria-live="polite">
                  {lines.map((line, i) => (
                    <div
                      key={i}
                      className={`code-line ${i === lines.length - 1 ? 'active-line' : 'done-line'}`}
                    >
                      <span className="code-prompt">
                        {line.startsWith('>') ? '' : '$ '}
                      </span>
                      {line}
                      {i === lines.length - 1 && (
                        <span className="code-blink-cursor" aria-hidden="true">█</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Monitor neck */}
            <div className="monitor-neck" />
            <div className="monitor-base" />
          </div>

          {/* Keyboard */}
          <div className="keyboard">
            <div className="keyboard-body">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="key"
                  style={{ animationDelay: `${(i * 0.12) % 2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="loader-hud">
        <div className="loader-name">
          <span className="loader-name-hi">BHARGAV</span>
          <span className="loader-name-accent"> LIMBANI</span>
        </div>
        <div className="loader-role">Full Stack · Flutter · ASP.NET Developer</div>

        {/* Progress bar */}
        <div className="loader-progress-wrap">
          <div className="loader-progress-bar">
            <div
              className="loader-progress-fill"
              style={{ width: `${progress}%` }}
            />
            <div
              className="loader-progress-glow"
              style={{ left: `${progress}%` }}
            />
          </div>
          <div className="loader-progress-pct">{progress}%</div>
        </div>

        <div className="loader-skip">
          {progress < 100
            ? 'Tap anywhere to skip'
            : 'Launching portfolio...'}
        </div>
      </div>
    </div>
  )
}
