import { useState } from 'react'

const THEMES = [
  { name: 'violet', hsl: '262,83%,58%', hex: '#7c3aed' },
  { name: 'cyan',   hsl: '187,92%,45%', hex: '#09c4dc' },
  { name: 'green',  hsl: '142,71%,45%', hex: '#21c45d' },
  { name: 'rose',   hsl: '346,87%,55%', hex: '#f02857' },
]

export default function ThemeSwitcher() {
  const [active, setActive] = useState('violet')
  const [open, setOpen] = useState(false)

  function applyTheme(t) {
    setActive(t.name)
    const root = document.documentElement
    root.style.setProperty('--accent', `hsl(${t.hsl})`)
    root.style.setProperty('--accent-hsl', t.hsl)
    // Extract R,G,B from hex for rgba usage
    const r = parseInt(t.hex.slice(1, 3), 16)
    const g = parseInt(t.hex.slice(3, 5), 16)
    const b = parseInt(t.hex.slice(5, 7), 16)
    root.style.setProperty('--accent-rgb', `${r},${g},${b}`)
  }

  return (
    <div className={`theme-switcher ${open ? 'open' : ''}`}>
      <button
        className="theme-toggle-btn"
        onClick={() => setOpen(v => !v)}
        aria-label="Toggle theme switcher"
        title="Change accent color"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
        <span>ACCENT</span>
      </button>
      <div className="theme-colors">
        {THEMES.map(t => (
          <button
            key={t.name}
            className={`theme-dot ${active === t.name ? 'active' : ''}`}
            style={{ '--dot-color': t.hex }}
            onClick={() => applyTheme(t)}
            aria-label={`${t.name} theme`}
            title={t.name}
          />
        ))}
      </div>
    </div>
  )
}
