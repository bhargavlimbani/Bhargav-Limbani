import { useEffect, useRef, useCallback } from 'react'

/*  ============================================================
    OGGY & THE COCKROACHES — Cursor Chase Effect
    
    • 3 cockroaches follow the cursor in a bouncy chain
    • Oggy (blue cat) chases behind the cockroaches
    • When cursor stops → cartoon fight cloud with stars & impacts
    ============================================================ */

export default function CursorEffect() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const mouseRef = useRef({ x: -200, y: -200 })
  const prevMouseRef = useRef({ x: -200, y: -200 })
  const idleTimerRef = useRef(0)
  const fightRef = useRef({
    active: false,
    x: 0, y: 0,
    cloudSize: 0,
    timer: 0,
    impacts: [],
    stars: [],
    phase: 0,
  })

  // Cockroaches state
  const roachesRef = useRef([
    { // Joey (leader, orange-brown)
      x: -200, y: -200, vx: 0, vy: 0,
      color: '#D4731A', bodyColor: '#C06510', legColor: '#8B4513',
      eyeColor: '#FFE', size: 16, speed: 0.20, name: 'Joey',
      rotation: 0, scaleX: 1, scaleY: 1,
      legPhase: 0, antPhase: 0,
    },
    { // Dee Dee (green)
      x: -200, y: -200, vx: 0, vy: 0,
      color: '#2ECC71', bodyColor: '#27AE60', legColor: '#1B7A3D',
      eyeColor: '#FFE', size: 14, speed: 0.15, name: 'DeeDee',
      rotation: 0, scaleX: 1, scaleY: 1,
      legPhase: Math.PI * 0.5, antPhase: Math.PI * 0.3,
    },
    { // Marky (grey/purple)
      x: -200, y: -200, vx: 0, vy: 0,
      color: '#8E8EA0', bodyColor: '#7B7B8E', legColor: '#5A5A6E',
      eyeColor: '#FFE', size: 13, speed: 0.11, name: 'Marky',
      rotation: 0, scaleX: 1, scaleY: 1,
      legPhase: Math.PI, antPhase: Math.PI * 0.7,
    },
  ])

  // Oggy (blue cat) state
  const oggyRef = useRef({
    x: -300, y: -300, vx: 0, vy: 0,
    size: 30, speed: 0.06,
    rotation: 0, scaleX: 1, scaleY: 1,
    mouthOpen: 0, expression: 'angry', // angry, surprised, happy
    blinkTimer: 200, isBlinking: false,
    runPhase: 0,
  })

  // ====== DRAW COCKROACH ======
  const drawCockroach = useCallback((ctx, roach, time) => {
    const { x, y, size, color, bodyColor, legColor, rotation, scaleX, scaleY, legPhase, antPhase } = roach
    const speed = Math.sqrt(roach.vx * roach.vx + roach.vy * roach.vy)
    const legAnim = Math.sin(time * 0.02 + legPhase) * (speed > 1 ? 0.5 : 0.15)
    const antAnim = Math.sin(time * 0.015 + antPhase) * 0.3

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    ctx.scale(scaleX, scaleY)

    // Glowing aura so character is always visible on any background
    ctx.shadowColor = lightenColor(color, 80)
    ctx.shadowBlur = size * 1.2
    ctx.fillStyle = 'rgba(255,255,255,0.01)'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0

    // Shadow
    ctx.save()
    ctx.scale(1, 0.25)
    ctx.translate(0, size * 3)
    const shG = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.8)
    shG.addColorStop(0, 'rgba(0,0,0,0.2)')
    shG.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = shG
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // === LEGS (3 pairs) ===
    ctx.strokeStyle = legColor
    ctx.lineWidth = 1.5
    ctx.lineCap = 'round'
    for (let side = -1; side <= 1; side += 2) {
      for (let pair = 0; pair < 3; pair++) {
        const lx = (pair - 1) * size * 0.35
        const angle = side * (0.6 + pair * 0.15 + legAnim * (pair === 1 ? -1 : 1))
        const legLen = size * 0.55
        ctx.beginPath()
        ctx.moveTo(lx, 0)
        const endX = lx + Math.cos(angle + side * 0.8) * legLen
        const endY = Math.sin(angle + side * 0.8) * legLen
        ctx.quadraticCurveTo(lx + side * size * 0.2, endY * 0.5, endX, endY)
        ctx.stroke()
      }
    }

    // === BODY (elongated oval) ===
    // Main body
    const bodyGrad = ctx.createRadialGradient(
      -size * 0.15, -size * 0.15, size * 0.05,
      0, 0, size * 0.75
    )
    bodyGrad.addColorStop(0, lightenColor(color, 40))
    bodyGrad.addColorStop(0.5, color)
    bodyGrad.addColorStop(1, darkenColor(color, 30))

    ctx.fillStyle = bodyGrad
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.7, size * 0.45, 0, 0, Math.PI * 2)
    ctx.fill()

    // Body outline
    ctx.strokeStyle = darkenColor(bodyColor, 40)
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.7, size * 0.45, 0, 0, Math.PI * 2)
    ctx.stroke()

    // Body segments (shell lines)
    ctx.strokeStyle = darkenColor(color, 20)
    ctx.lineWidth = 0.6
    for (let i = -1; i <= 1; i += 1) {
      ctx.beginPath()
      ctx.moveTo(i * size * 0.22, -size * 0.42)
      ctx.lineTo(i * size * 0.22, size * 0.42)
      ctx.stroke()
    }

    // Glossy highlight
    const hlG = ctx.createRadialGradient(
      -size * 0.2, -size * 0.2, 0,
      -size * 0.2, -size * 0.2, size * 0.4
    )
    hlG.addColorStop(0, 'rgba(255,255,255,0.45)')
    hlG.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = hlG
    ctx.beginPath()
    ctx.ellipse(-size * 0.1, -size * 0.15, size * 0.35, size * 0.2, -0.3, 0, Math.PI * 2)
    ctx.fill()

    // === HEAD ===
    const headX = -size * 0.65
    const headSize = size * 0.32
    const headGrad = ctx.createRadialGradient(
      headX - headSize * 0.2, -headSize * 0.2, 0,
      headX, 0, headSize
    )
    headGrad.addColorStop(0, lightenColor(bodyColor, 30))
    headGrad.addColorStop(1, darkenColor(bodyColor, 20))
    ctx.fillStyle = headGrad
    ctx.beginPath()
    ctx.arc(headX, 0, headSize, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = darkenColor(bodyColor, 40)
    ctx.lineWidth = 1
    ctx.stroke()

    // === ANTENNAE ===
    ctx.strokeStyle = darkenColor(color, 30)
    ctx.lineWidth = 1.2
    ctx.lineCap = 'round'
    for (let side = -1; side <= 1; side += 2) {
      const antBaseX = headX - headSize * 0.6
      const antBaseY = side * headSize * 0.3
      const antTipX = antBaseX - size * 0.5
      const antTipY = side * (size * 0.4 + antAnim * size * 0.15)
      const cpX = antBaseX - size * 0.3
      const cpY = side * (size * 0.15 + antAnim * size * 0.2)

      ctx.beginPath()
      ctx.moveTo(antBaseX, antBaseY)
      ctx.quadraticCurveTo(cpX, cpY, antTipX, antTipY)
      ctx.stroke()

      // Antenna tip ball
      ctx.fillStyle = darkenColor(color, 10)
      ctx.beginPath()
      ctx.arc(antTipX, antTipY, 2, 0, Math.PI * 2)
      ctx.fill()
    }

    // === EYES (on head) ===
    const eyeY = -headSize * 0.15
    const eyeSize = headSize * 0.42
    for (let side = -1; side <= 1; side += 2) {
      const ex = headX - headSize * 0.15
      const ey = eyeY + side * headSize * 0.22

      // White
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.ellipse(ex, ey, eyeSize, eyeSize * 0.85, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#333'
      ctx.lineWidth = 0.6
      ctx.stroke()

      // Pupil (looks toward movement)
      const lookDir = Math.atan2(roach.vy, roach.vx)
      const px = ex + Math.cos(lookDir) * eyeSize * 0.2
      const py = ey + Math.sin(lookDir) * eyeSize * 0.2
      ctx.fillStyle = '#111'
      ctx.beginPath()
      ctx.arc(px, py, eyeSize * 0.45, 0, Math.PI * 2)
      ctx.fill()

      // Highlight
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(px + eyeSize * 0.15, py - eyeSize * 0.15, eyeSize * 0.18, 0, Math.PI * 2)
      ctx.fill()
    }

    // Cheeky grin
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 0.8
    ctx.beginPath()
    ctx.arc(headX - headSize * 0.5, headSize * 0.05, headSize * 0.2, -0.3, Math.PI * 0.6)
    ctx.stroke()

    ctx.restore()
  }, [])

  // ====== DRAW OGGY (Blue Cat) ======
  const drawOggy = useCallback((ctx, oggy, time) => {
    const { x, y, size, rotation, scaleX, scaleY, expression, isBlinking, runPhase } = oggy
    const speed = Math.sqrt(oggy.vx * oggy.vx + oggy.vy * oggy.vy)
    const bounce = Math.sin(time * 0.015 + runPhase) * (speed > 2 ? 3 : 1)

    ctx.save()
    ctx.translate(x, y + bounce)
    ctx.rotate(rotation * 0.04)
    ctx.scale(scaleX, scaleY)

    // Glowing aura so Oggy is always visible on any background
    ctx.shadowColor = '#7EC8E3'
    ctx.shadowBlur = size * 1.5
    ctx.fillStyle = 'rgba(255,255,255,0.01)'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0

    // Shadow
    ctx.save()
    ctx.scale(1, 0.2)
    ctx.translate(0, size * 2.8 - bounce * 2)
    const shG = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.1)
    shG.addColorStop(0, 'rgba(0,0,0,0.18)')
    shG.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = shG
    ctx.beginPath()
    ctx.arc(0, 0, size * 1.1, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // === TAIL ===
    const tailPhase = Math.sin(time * 0.008) * 0.4
    ctx.strokeStyle = '#4A90D9'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(size * 0.7, size * 0.1)
    ctx.bezierCurveTo(
      size * 1.2, size * 0.3 + tailPhase * 8,
      size * 1.5, -size * 0.2 + tailPhase * 12,
      size * 1.6, -size * 0.5 + tailPhase * 10
    )
    ctx.stroke()
    // Tail tip
    ctx.fillStyle = '#4A90D9'
    ctx.beginPath()
    ctx.arc(size * 1.6, -size * 0.5 + tailPhase * 10, 3, 0, Math.PI * 2)
    ctx.fill()

    // === BODY ===
    const bodyGrad = ctx.createRadialGradient(
      -size * 0.15, -size * 0.2, size * 0.1,
      0, 0, size
    )
    bodyGrad.addColorStop(0, '#7EC8E3')
    bodyGrad.addColorStop(0.4, '#5DADE2')
    bodyGrad.addColorStop(0.85, '#3498DB')
    bodyGrad.addColorStop(1, '#2471A3')
    ctx.fillStyle = bodyGrad
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.85, size, 0, 0, Math.PI * 2)
    ctx.fill()

    // Body outline
    ctx.strokeStyle = '#1F618D'
    ctx.lineWidth = 1.8
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.85, size, 0, 0, Math.PI * 2)
    ctx.stroke()

    // Belly (lighter oval)
    const bellyGrad = ctx.createRadialGradient(0, size * 0.15, 0, 0, size * 0.15, size * 0.55)
    bellyGrad.addColorStop(0, '#D5EEF8')
    bellyGrad.addColorStop(1, '#A9D5EA')
    ctx.fillStyle = bellyGrad
    ctx.beginPath()
    ctx.ellipse(0, size * 0.15, size * 0.5, size * 0.55, 0, 0, Math.PI * 2)
    ctx.fill()

    // Glossy highlight
    const hlG = ctx.createRadialGradient(
      -size * 0.25, -size * 0.5, 0,
      -size * 0.25, -size * 0.5, size * 0.5
    )
    hlG.addColorStop(0, 'rgba(255,255,255,0.5)')
    hlG.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = hlG
    ctx.beginPath()
    ctx.ellipse(-size * 0.15, -size * 0.4, size * 0.4, size * 0.3, -0.3, 0, Math.PI * 2)
    ctx.fill()

    // === EARS ===
    for (let side = -1; side <= 1; side += 2) {
      const earX = side * size * 0.5
      const earY = -size * 0.85
      const earH = size * 0.45

      // Outer ear
      ctx.fillStyle = '#3498DB'
      ctx.beginPath()
      ctx.moveTo(earX - side * size * 0.15, earY + earH * 0.3)
      ctx.quadraticCurveTo(earX, earY - earH, earX + side * size * 0.3, earY + earH * 0.3)
      ctx.closePath()
      ctx.fill()
      ctx.strokeStyle = '#1F618D'
      ctx.lineWidth = 1.2
      ctx.stroke()

      // Inner ear
      ctx.fillStyle = '#F5B7B1'
      ctx.beginPath()
      ctx.moveTo(earX - side * size * 0.08, earY + earH * 0.3)
      ctx.quadraticCurveTo(earX + side * 0.02, earY - earH * 0.6, earX + side * size * 0.18, earY + earH * 0.3)
      ctx.closePath()
      ctx.fill()
    }

    // === ARMS (when running) ===
    const armSwing = Math.sin(time * 0.02) * (speed > 2 ? 0.6 : 0.15)
    ctx.strokeStyle = '#3498DB'
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    // Left arm
    ctx.beginPath()
    ctx.moveTo(-size * 0.7, -size * 0.1)
    ctx.quadraticCurveTo(
      -size * 1.1, -size * 0.3 + armSwing * 15,
      -size * 1.0, size * 0.1 + armSwing * 10
    )
    ctx.stroke()
    // Right arm
    ctx.beginPath()
    ctx.moveTo(size * 0.7, -size * 0.1)
    ctx.quadraticCurveTo(
      size * 1.1, -size * 0.3 - armSwing * 15,
      size * 1.0, size * 0.1 - armSwing * 10
    )
    ctx.stroke()

    // === FEET ===
    const footBob = Math.sin(time * 0.02) * (speed > 2 ? 4 : 1)
    ctx.fillStyle = '#3498DB'
    // Left foot
    ctx.beginPath()
    ctx.ellipse(-size * 0.35, size * 1.0 + footBob, size * 0.22, size * 0.12, 0.1, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#1F618D'
    ctx.lineWidth = 1
    ctx.stroke()
    // Right foot
    ctx.beginPath()
    ctx.ellipse(size * 0.35, size * 1.0 - footBob, size * 0.22, size * 0.12, -0.1, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // === FACE ===
    const eyeY = -size * 0.25
    const eyeSpacing = size * 0.28
    const eyeW = size * 0.26
    const eyeH = size * 0.3

    for (let side = -1; side <= 1; side += 2) {
      const ex = side * eyeSpacing
      const ey = eyeY

      if (isBlinking) {
        ctx.strokeStyle = '#1F618D'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(ex - eyeW, ey)
        ctx.lineTo(ex + eyeW, ey)
        ctx.stroke()
        continue
      }

      // Eye white
      const eyeGrad = ctx.createRadialGradient(ex - 2, ey - 2, 0, ex, ey, eyeW)
      eyeGrad.addColorStop(0, '#fff')
      eyeGrad.addColorStop(1, '#eee')
      ctx.fillStyle = eyeGrad
      ctx.beginPath()
      ctx.ellipse(ex, ey, eyeW, expression === 'angry' ? eyeH * 0.75 : eyeH, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#1F618D'
      ctx.lineWidth = 1.2
      ctx.stroke()

      // Angry eyebrows
      if (expression === 'angry') {
        ctx.strokeStyle = '#1F618D'
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.moveTo(ex - eyeW * 0.9, ey - eyeH * 0.9 + side * 3)
        ctx.lineTo(ex + eyeW * 0.9, ey - eyeH * 0.9 - side * 3)
        ctx.stroke()
      }

      // Pupil
      const lookDir = Math.atan2(oggy.vy, oggy.vx)
      const px = ex + Math.cos(lookDir) * eyeW * 0.25
      const py = ey + Math.sin(lookDir) * eyeH * 0.2
      ctx.fillStyle = '#111'
      ctx.beginPath()
      ctx.arc(px, py, eyeW * 0.4, 0, Math.PI * 2)
      ctx.fill()

      // Pupil highlights
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(px + 2, py - 2, eyeW * 0.15, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(px - 1, py + 1, eyeW * 0.08, 0, Math.PI * 2)
      ctx.fill()
    }

    // Nose
    ctx.fillStyle = '#2471A3'
    ctx.beginPath()
    ctx.ellipse(0, size * 0.02, size * 0.08, size * 0.06, 0, 0, Math.PI * 2)
    ctx.fill()

    // Mouth
    ctx.strokeStyle = '#1F618D'
    ctx.lineWidth = 1.5
    if (expression === 'angry') {
      // Angry frown
      ctx.beginPath()
      ctx.arc(0, size * 0.25, size * 0.18, Math.PI + 0.3, -0.3)
      ctx.stroke()
      // Teeth
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.moveTo(-size * 0.12, size * 0.12)
      ctx.lineTo(-size * 0.06, size * 0.2)
      ctx.lineTo(0, size * 0.12)
      ctx.lineTo(size * 0.06, size * 0.2)
      ctx.lineTo(size * 0.12, size * 0.12)
      ctx.fill()
      ctx.stroke()
    } else {
      // Normal/surprised mouth
      ctx.beginPath()
      ctx.arc(0, size * 0.1, size * 0.12, 0.2, Math.PI - 0.2)
      ctx.stroke()
    }

    // Whiskers
    ctx.strokeStyle = '#1F618D'
    ctx.lineWidth = 0.8
    for (let side = -1; side <= 1; side += 2) {
      for (let w = 0; w < 3; w++) {
        const wy = size * (-0.05 + w * 0.1)
        const wAngle = side * (0.15 + w * 0.12)
        ctx.beginPath()
        ctx.moveTo(side * size * 0.3, wy)
        ctx.lineTo(side * size * 0.75, wy + Math.sin(wAngle) * 5 - 3 + w * 3)
        ctx.stroke()
      }
    }

    ctx.restore()
  }, [])

  // ====== DRAW FIGHT CLOUD ======
  const drawFightCloud = useCallback((ctx, fight, time) => {
    if (!fight.active) return

    const { x, y, cloudSize, timer, impacts, stars, phase } = fight
    const pulse = Math.sin(time * 0.03) * 0.1 + 1

    ctx.save()
    ctx.translate(x, y)

    // === Dust cloud (irregular shape using multiple circles) ===
    const cloudAlpha = Math.min(cloudSize / 40, 0.85)
    ctx.globalAlpha = cloudAlpha

    // Cloud body
    const cs = cloudSize * pulse
    ctx.fillStyle = '#E8DABD'
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8 + time * 0.002
      const r = cs * (0.5 + Math.sin(i * 2.3 + time * 0.005) * 0.2)
      const cx = Math.cos(angle) * cs * 0.3
      const cy = Math.sin(angle) * cs * 0.3
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()
    }
    // Main center cloud
    ctx.fillStyle = '#F5E6CC'
    ctx.beginPath()
    ctx.arc(0, 0, cs * 0.6, 0, Math.PI * 2)
    ctx.fill()

    // Cloud outline puffs
    ctx.strokeStyle = '#BFA87A'
    ctx.lineWidth = 2
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 * i) / 10 + time * 0.003
      const r = cs * (0.55 + Math.sin(i * 1.7 + time * 0.004) * 0.15)
      const cx = Math.cos(angle) * cs * 0.35
      const cy = Math.sin(angle) * cs * 0.35
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2)
      ctx.stroke()
    }

    // === Comic action lines poking out ===
    ctx.globalAlpha = cloudAlpha * 0.7
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12 + Math.sin(time * 0.01 + i) * 0.3
      const innerR = cs * 0.6
      const outerR = cs * (0.9 + Math.sin(time * 0.02 + i * 1.5) * 0.3)
      ctx.strokeStyle = i % 3 === 0 ? '#FF6B6B' : i % 3 === 1 ? '#FFD93D' : '#5DADE2'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR)
      ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR)
      ctx.stroke()
    }

    // === Cartoon arms/legs poking out of cloud ===
    ctx.globalAlpha = cloudAlpha
    const limbColors = ['#5DADE2', '#D4731A', '#2ECC71', '#8E8EA0']
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI * 2 * i) / 4 + Math.sin(time * 0.012 + i * 2) * 0.5
      const dist = cs * 0.5
      const lx = Math.cos(angle) * dist
      const ly = Math.sin(angle) * dist
      ctx.strokeStyle = limbColors[i]
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(lx, ly)
      ctx.lineTo(
        lx + Math.cos(angle + Math.sin(time * 0.02 + i) * 0.8) * 15,
        ly + Math.sin(angle + Math.sin(time * 0.02 + i) * 0.8) * 15
      )
      ctx.stroke()
    }

    // === Impact stars ===
    ctx.globalAlpha = 1
    for (const star of stars) {
      if (star.life <= 0) continue
      ctx.save()
      ctx.globalAlpha = star.life
      ctx.translate(star.x, star.y)
      ctx.rotate(star.rot)
      ctx.fillStyle = star.color
      drawStar(ctx, 0, 0, star.size * star.life, star.points)
      ctx.restore()
    }

    // === Impact text ===
    if (phase % 40 < 20 && cloudSize > 30) {
      const texts = ['POW!', 'BAM!', 'WHAM!', 'BONK!', 'CRASH!']
      const textIdx = Math.floor(phase / 40) % texts.length
      ctx.globalAlpha = cloudAlpha
      ctx.font = `bold ${Math.floor(cs * 0.25)}px "Comic Sans MS", "Segoe UI", sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Text with outline
      const textAngle = Math.sin(time * 0.01) * 0.15
      ctx.save()
      ctx.rotate(textAngle)

      // Outline
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 3
      ctx.strokeText(texts[textIdx], 0, -cs * 0.1)
      // Fill
      ctx.fillStyle = '#FFD93D'
      ctx.fillText(texts[textIdx], 0, -cs * 0.1)
      ctx.restore()
    }

    ctx.restore()
  }, [])

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function onMouseMove(e) {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    let lastTime = performance.now()

    function animate(currentTime) {
      const dt = Math.min((currentTime - lastTime) / 16.67, 3)
      lastTime = currentTime
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const pmx = prevMouseRef.current.x
      const pmy = prevMouseRef.current.y

      const mouseVX = mx - pmx
      const mouseVY = my - pmy
      const mouseSpeed = Math.sqrt(mouseVX * mouseVX + mouseVY * mouseVY)

      prevMouseRef.current.x = mx
      prevMouseRef.current.y = my

      const fight = fightRef.current
      const roaches = roachesRef.current
      const oggy = oggyRef.current

      // === IDLE DETECTION → trigger fight ===
      if (mouseSpeed < 1.5) {
        idleTimerRef.current += dt
      } else {
        idleTimerRef.current = 0
        if (fight.active) {
          // Break up the fight — scatter!
          fight.active = false
          fight.cloudSize = 0
          fight.timer = 0
          fight.stars = []
          fight.phase = 0
        }
      }

      const shouldFight = idleTimerRef.current > 90 // ~1.5 seconds idle

      if (shouldFight && !fight.active) {
        // Start fight at cursor position
        fight.active = true
        fight.x = mx
        fight.y = my
        fight.cloudSize = 0
        fight.timer = 0
        fight.stars = []
        fight.phase = 0
      }

      // === UPDATE FIGHT ===
      if (fight.active) {
        fight.timer += dt
        fight.phase += dt
        fight.cloudSize = Math.min(fight.cloudSize + 1.5 * dt, 60)

        // Spawn stars periodically
        if (fight.timer % 8 < dt) {
          const angle = Math.random() * Math.PI * 2
          const dist = fight.cloudSize * 0.5 + Math.random() * 20
          fight.stars.push({
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            size: 5 + Math.random() * 10,
            life: 1,
            rot: Math.random() * Math.PI,
            color: ['#FFD93D', '#FF6B6B', '#5DADE2', '#fff'][Math.floor(Math.random() * 4)],
            points: Math.random() > 0.5 ? 4 : 5,
          })
        }

        // Update stars
        for (const star of fight.stars) {
          star.life -= 0.015 * dt
          star.rot += 0.03 * dt
        }
        fight.stars = fight.stars.filter(s => s.life > 0)

        // During fight, pull characters toward fight center
        for (const roach of roaches) {
          roach.vx += (fight.x - roach.x) * 0.08 * dt
          roach.vy += (fight.y - roach.y) * 0.08 * dt
          roach.vx *= 0.85
          roach.vy *= 0.85
          roach.x += roach.vx * dt
          roach.y += roach.vy * dt
        }
        oggy.vx += (fight.x - oggy.x) * 0.06 * dt
        oggy.vy += (fight.y - oggy.y) * 0.06 * dt
        oggy.vx *= 0.85
        oggy.vy *= 0.85
        oggy.x += oggy.vx * dt
        oggy.y += oggy.vy * dt
        oggy.expression = 'angry'

        // Draw the fight cloud (hides characters)
        drawFightCloud(ctx, fight, currentTime)

      } else {
        // === NORMAL CHASE MODE ===

        // Update cockroaches (chase the cursor in a chain)
        for (let i = 0; i < roaches.length; i++) {
          const r = roaches[i]
          const target = i === 0
            ? { x: mx, y: my }
            : { x: roaches[i - 1].x, y: roaches[i - 1].y }

          const dx = target.x - r.x
          const dy = target.y - r.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Spring with overshoot
          r.vx += dx * r.speed * dt
          r.vy += dy * r.speed * dt
          r.vx *= 0.86
          r.vy *= 0.86
          r.x += r.vx * dt
          r.y += r.vy * dt

          // Rotation toward movement
          const speed = Math.sqrt(r.vx * r.vx + r.vy * r.vy)
          if (speed > 1) {
            r.rotation = Math.atan2(r.vy, r.vx)
          }

          // Squash & stretch
          const stretch = Math.min(speed * 0.012, 0.35)
          if (speed > 1.5) {
            r.scaleX = 1 + stretch
            r.scaleY = 1 - stretch * 0.4
          } else {
            const idle = Math.sin(currentTime * 0.004 + i * 1.5) * 0.05
            r.scaleX = 1 + idle
            r.scaleY = 1 - idle
          }
        }

        // Update Oggy (chases the LAST cockroach)
        const lastRoach = roaches[roaches.length - 1]
        const spacing = 50 // keep some distance behind the last roach
        const targetX = lastRoach.x + Math.cos(lastRoach.rotation + Math.PI) * spacing
        const targetY = lastRoach.y + Math.sin(lastRoach.rotation + Math.PI) * spacing

        oggy.vx += (targetX - oggy.x) * oggy.speed * dt
        oggy.vy += (targetY - oggy.y) * oggy.speed * dt
        oggy.vx *= 0.88
        oggy.vy *= 0.88
        oggy.x += oggy.vx * dt
        oggy.y += oggy.vy * dt

        const oggySpeed = Math.sqrt(oggy.vx * oggy.vx + oggy.vy * oggy.vy)
        if (oggySpeed > 1) {
          oggy.rotation = Math.atan2(oggy.vy, oggy.vx)
        }

        // Squash & stretch for Oggy
        const oStretch = Math.min(oggySpeed * 0.008, 0.25)
        if (oggySpeed > 2) {
          oggy.scaleX = 1 + oStretch
          oggy.scaleY = 1 - oStretch * 0.4
          oggy.expression = 'angry'
        } else {
          const idle = Math.sin(currentTime * 0.003) * 0.04
          oggy.scaleX = 1 + idle
          oggy.scaleY = 1 - idle
          oggy.expression = 'angry'
        }

        // Blink timer
        oggy.blinkTimer -= dt
        if (oggy.blinkTimer <= 0) {
          oggy.isBlinking = true
          oggy.blinkTimer = 150 + Math.random() * 200
          setTimeout(() => { oggy.isBlinking = false }, 120)
        }

        // === DRAW MOTION LINES (speed lines behind leader roach) ===
        if (mouseSpeed > 5) {
          const leader = roaches[0]
          ctx.save()
          ctx.globalAlpha = Math.min(mouseSpeed * 0.015, 0.35)
          const mAngle = Math.atan2(-mouseVY, -mouseVX)
          for (let j = 0; j < 4; j++) {
            const offAngle = mAngle + (j - 1.5) * 0.25
            const lineLen = 8 + mouseSpeed * 0.6
            const sx = leader.x + Math.cos(offAngle) * (leader.size + 8)
            const sy = leader.y + Math.sin(offAngle) * (leader.size + 8)
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(sx, sy)
            ctx.lineTo(sx + Math.cos(offAngle) * lineLen, sy + Math.sin(offAngle) * lineLen)
            ctx.stroke()
          }
          ctx.restore()
        }

        // === DRAW chase trail (dotted line between characters) ===
        if (mouseSpeed > 2) {
          ctx.save()
          ctx.globalAlpha = Math.min(mouseSpeed * 0.02, 0.25)
          ctx.setLineDash([3, 5])
          ctx.lineWidth = 1.2
          // Between roaches
          for (let i = 0; i < roaches.length - 1; i++) {
            ctx.strokeStyle = roaches[i].color
            ctx.beginPath()
            ctx.moveTo(roaches[i].x, roaches[i].y)
            ctx.lineTo(roaches[i + 1].x, roaches[i + 1].y)
            ctx.stroke()
          }
          // From last roach to Oggy
          ctx.strokeStyle = '#FF6B6B'
          ctx.beginPath()
          ctx.moveTo(lastRoach.x, lastRoach.y)
          ctx.lineTo(oggy.x, oggy.y)
          ctx.stroke()
          ctx.setLineDash([])
          ctx.restore()
        }

        // === DRAW CHARACTERS (back-to-front: Oggy, then roaches) ===
        drawOggy(ctx, oggy, currentTime)
        for (let i = roaches.length - 1; i >= 0; i--) {
          drawCockroach(ctx, roaches[i], currentTime)
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    animRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [drawCockroach, drawOggy, drawFightCloud])

  return (
    <canvas
      ref={canvasRef}
      className="cursor-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}

// ===================== UTILITIES =====================

function drawStar(ctx, cx, cy, radius, points) {
  ctx.beginPath()
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? radius : radius * 0.4
    const angle = (Math.PI * i) / points - Math.PI / 2
    const sx = cx + r * Math.cos(angle)
    const sy = cy + r * Math.sin(angle)
    if (i === 0) ctx.moveTo(sx, sy)
    else ctx.lineTo(sx, sy)
  }
  ctx.closePath()
  ctx.fill()
}

function lightenColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, (num >> 16) + amount)
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amount)
  const b = Math.min(255, (num & 0x0000ff) + amount)
  return `rgb(${r},${g},${b})`
}

function darkenColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, (num >> 16) - amount)
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount)
  const b = Math.max(0, (num & 0x0000ff) - amount)
  return `rgb(${r},${g},${b})`
}
