import { useEffect, useRef } from 'react'

export default function CircuitBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, nodes = []
    let raf

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const COUNT = Math.min(46, Math.floor(w / 40))
    nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }))

    function draw() {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#4ce0d2'
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (!reduce) {
          n.x += n.vx
          n.y += n.vy
        }
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]
          const dx = n.x - m.x, dy = n.y - m.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 150) {
            ctx.strokeStyle = `rgba(76,224,210,${0.12 * (1 - d / 150)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} id="circuit-canvas" />
}
