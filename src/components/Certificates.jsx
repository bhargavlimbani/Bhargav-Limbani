import { useState, useRef, useEffect } from 'react'
import useReveal from '../hooks/useReveal'

const CERTIFICATES = [
  {
    id: 'react-node',
    title: 'React & Node.js Full Stack Development',
    issuer: 'Udemy',
    category: 'Development',
    date: 'March 2026',
    file: '/react_node_fullstack.pdf',
    downloadName: 'Bhargav_Limbani_React_NodeJS_Certificate.pdf',
    isPdf: true,
    badge: 'FULL STACK',
    desc: 'Mastery in building full-stack web applications with React, Node.js, Express, and REST APIs.',
    iconColor: '#7c3aed',
  },
  {
    id: 'flutter',
    title: 'Mastering Flutter: Basic to Advanced',
    issuer: 'Udemy',
    category: 'Mobile & Cyber',
    date: 'October 2025',
    file: '/flutter_certificate.pdf',
    downloadName: 'Bhargav_Limbani_Flutter_Certificate.pdf',
    isPdf: true,
    badge: 'FLUTTER',
    desc: 'Advanced cross-platform mobile app development with Dart, Flutter widgets, state management & APIs.',
    iconColor: '#06b6d4',
  },
  {
    id: 'web-zero-hero',
    title: 'Web Development Zero to Hero by Creating Apps',
    issuer: 'Udemy',
    category: 'Development',
    date: '2025',
    file: '/web_dev_zero_to_hero.pdf',
    downloadName: 'Bhargav_Limbani_Web_Development_Zero_to_Hero.pdf',
    isPdf: true,
    badge: 'WEB DEV',
    desc: 'Comprehensive practical training in modern web app design, frontend architecture, and responsive layouts.',
    iconColor: '#10b981',
  },
  {
    id: 'advanced-java',
    title: 'Advanced Java - Learn by Hands-on',
    issuer: 'Udemy',
    category: 'Development',
    date: '2025',
    file: '/advanced_java.pdf',
    downloadName: 'Bhargav_Limbani_Advanced_Java_Certificate.pdf',
    isPdf: true,
    badge: 'JAVA',
    desc: 'Hands-on advanced Java programming, OOP concepts, data structures, and backend logic building.',
    iconColor: '#f59e0b',
  },
  {
    id: 'cybersecurity',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco / Networking Academy',
    category: 'Mobile & Cyber',
    date: '2025',
    file: '/cybersecurity_certificate.pdf',
    downloadName: 'Bhargav_Limbani_Cybersecurity_Certificate.pdf',
    isPdf: true,
    badge: 'SECURITY',
    desc: 'Core fundamentals of network security, cyber threat protection, encryption, and secure coding practices.',
    iconColor: '#ef4444',
  },
  {
    id: 'gfg-codejam',
    title: 'ICT x GFG CodeJam Achievement',
    issuer: 'Marwadi University & GeeksforGeeks',
    category: 'Competitions & Internship',
    date: '2025',
    file: '/gfg_codejam.jpg',
    downloadName: 'Bhargav_Limbani_GFG_CodeJam_Certificate.jpg',
    isPdf: false,
    badge: 'CODEJAM',
    desc: 'Competitive coding achievement certificate for technical problem solving in ICT x GFG CodeJam event.',
    iconColor: '#8b5cf6',
  },
  {
    id: 'internship-letter',
    title: 'Web Application Development Internship',
    issuer: 'Script India',
    category: 'Competitions & Internship',
    date: 'Sep 2025',
    file: '/internship_letter.pdf',
    downloadName: 'Bhargav_Limbani_Script_India_Internship_Certificate.pdf',
    isPdf: true,
    badge: 'INTERNSHIP',
    desc: 'Official internship completion certificate for full-stack web application engineering at Script India.',
    iconColor: '#ec4899',
  },
]

const CATEGORIES = ['All', 'Development', 'Mobile & Cyber', 'Competitions & Internship']

function CertificateCard({ cert, onSelect }) {
  const cardRef = useRef(null)

  function handleMouseMove(e) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  function handleMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <div
      ref={cardRef}
      className="cert-3d-card clickable"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(cert)}
    >
      {/* HUD corner brackets */}
      <div className="cert-corner cert-corner-tl" />
      <div className="cert-corner cert-corner-tr" />
      <div className="cert-corner cert-corner-bl" />
      <div className="cert-corner cert-corner-br" />

      {/* Holographic glowing scan line */}
      <div className="cert-scan-glare" />

      {/* Card Header */}
      <div className="cert-card-header">
        <span className="cert-badge" style={{ borderColor: cert.iconColor, color: cert.iconColor }}>
          {cert.badge}
        </span>
        <span className="cert-date">{cert.date}</span>
      </div>

      {/* Icon & Title */}
      <div className="cert-card-body">
        <div className="cert-icon-box" style={{ background: `${cert.iconColor}18`, borderColor: `${cert.iconColor}40`, color: cert.iconColor }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
            <path d="M12 15l-2 5l-2 -2l-2 2l1 -5.5" />
            <circle cx="12" cy="9" r="6" />
          </svg>
        </div>
        <h3 className="cert-title">{cert.title}</h3>
        <div className="cert-issuer">Issued by: <span>{cert.issuer}</span></div>
        <p className="cert-desc">{cert.desc}</p>
      </div>

      {/* Action footer */}
      <div className="cert-card-footer">
        <span className="cert-action-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          View &amp; Download
        </span>
      </div>
    </div>
  )
}

export default function Certificates() {
  const [ref, visible] = useReveal()
  const [activeTab, setActiveTab] = useState('All')
  const [selectedCert, setSelectedCert] = useState(null)

  const filteredCerts = activeTab === 'All'
    ? CERTIFICATES
    : CERTIFICATES.filter(c => c.category === activeTab)

  // ESC key listener for modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setSelectedCert(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section id="certificates" className={`certificates-section reveal ${visible ? 'in' : ''}`} ref={ref}>
      <div className="section-header">
        <h2 className="section-title">Certifications &amp; <span className="accent-text">Achievements</span></h2>
        <p className="section-sub">
          Verified certifications, course completions, and competitive achievements. Click any card to inspect or download.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="skills-tabs" style={{ justifyContent: 'center', marginBottom: '40px' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`skills-tab clickable ${activeTab === cat ? 'active' : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Grid */}
      <div className="certs-grid">
        {filteredCerts.map(cert => (
          <CertificateCard key={cert.id} cert={cert} onSelect={setSelectedCert} />
        ))}
      </div>

      {/* 3D Interactive Modal Viewer */}
      {selectedCert && (
        <div className="cert-modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-content" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="cert-modal-header">
              <div>
                <div className="cert-modal-badge" style={{ color: selectedCert.iconColor }}>
                  {selectedCert.badge} CERTIFICATE
                </div>
                <h3 className="cert-modal-title">{selectedCert.title}</h3>
                <div className="cert-modal-issuer">{selectedCert.issuer} · {selectedCert.date}</div>
              </div>
              <button
                className="cert-modal-close clickable"
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body Preview */}
            <div className="cert-modal-preview">
              {selectedCert.isPdf ? (
                <iframe
                  src={`${selectedCert.file}#toolbar=0`}
                  title={selectedCert.title}
                  className="cert-pdf-iframe"
                />
              ) : (
                <img
                  src={selectedCert.file}
                  alt={selectedCert.title}
                  className="cert-img-preview"
                />
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="cert-modal-footer">
              <a
                href={selectedCert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-ghost clickable"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                View Full File 👁️
              </a>

              <a
                href={selectedCert.file}
                download={selectedCert.downloadName}
                className="cta-btn cta-primary clickable"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Certificate 📥
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
