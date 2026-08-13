import { useEffect, useState, useRef } from 'react'

const NAV_LINKS = [
  { href: '#home',         label: 'Home'         },
  { href: '#about',        label: 'About'        },
  { href: '#skills',       label: 'Skills'       },
  { href: '#experience',   label: 'Experience'   },
  { href: '#certificates', label: 'Certificates' },
  { href: '#projects',     label: 'Projects'     },
  { href: '#contact',      label: 'Contact'      },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const observerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection observer to track active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], div[id="home"]')
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => observerRef.current.observe(s))
    return () => observerRef.current?.disconnect()
  }, [])

  function closeMenu() { setMenuOpen(false) }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a className="nav-brand" href="#home" onClick={closeMenu}>
          <span className="nav-brand-text">Bhargav Portfolio</span>
          <span className="nav-brand-dot">.</span>
        </a>

        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <a
            className="nav-resume-btn clickable"
            href="/bhargav%20limbani%20master%20resume.pdf"
            download="Bhargav_Limbani_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </div>

        <button
          className={`hamburger clickable ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && <div className="mobile-overlay" onClick={closeMenu} />}

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="nav-brand-text">Bhargav Portfolio<span className="nav-brand-dot">.</span></span>
          <button className="mobile-close clickable" onClick={closeMenu} aria-label="Close menu">✕</button>
        </div>
        <div className="mobile-links">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`mobile-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            className="mobile-resume-btn clickable"
            href="/bhargav%20limbani%20master%20resume.pdf"
            download="Bhargav_Limbani_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Download CV
          </a>
        </div>
      </div>
    </>
  )
}
