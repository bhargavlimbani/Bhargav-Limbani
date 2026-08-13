import { useEffect, useRef } from 'react'

export default function CursorEffect() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only on pointer-fine devices (mouse/trackpad)
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100
    let rafId

    function onMouseMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function onMouseDown() {
      dot.classList.add('clicking')
      ring.classList.add('clicking')
    }
    function onMouseUp() {
      dot.classList.remove('clicking')
      ring.classList.remove('clicking')
    }

    function updateHover(e) {
      const el = e.target
      const isClickable = el.closest('a, button, [role="button"], input, textarea, select, label, .clickable')
      const isText = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'
      if (isText) {
        dot.classList.add('text-cursor')
        ring.classList.add('text-cursor')
      } else {
        dot.classList.remove('text-cursor')
        ring.classList.remove('text-cursor')
      }
      if (isClickable) {
        ring.classList.add('hovering')
      } else {
        ring.classList.remove('hovering')
      }
    }

    function loop() {
      // Dot follows immediately
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      // Ring lerps smoothly
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      rafId = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousemove', updateHover)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    loop()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousemove', updateHover)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
