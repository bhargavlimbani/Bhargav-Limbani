import useReveal from '../hooks/useReveal'

export default function About() {
  const [ref, visible] = useReveal()
  return (
    <section id="about" className={`about-section reveal ${visible ? 'in' : ''}`} ref={ref}>
      <div className="section-header">
        <h2 className="section-title">About <span className="accent-text">Me</span></h2>
        <p className="section-sub">
          B.Tech ICT Student at Marwadi University, passionate about building
          innovative software across web, mobile and desktop.
        </p>
      </div>

      <div className="about-grid">
        {/* Left — Bio */}
        <div className="about-bio">
          <p>
            I am a B.Tech Information and Communication Technology (ICT) student
            with hands-on experience in Full Stack Development, Mobile Application
            Development, and Desktop software. My journey includes building
            packaging management systems, real-time chat apps, career guidance
            platforms, and club portals.
          </p>
          <p>
            Through my internship at Script India and personal projects, I have
            gained practical experience with React, Node.js, Flutter, C# / ASP.NET,
            MySQL, MongoDB, and Firebase. I am passionate about creating clean,
            efficient software that solves real-world problems.
          </p>
          <p>
            As a fresher, I'm eager to gain industrial experience, deepen my
            technical depth, and contribute meaningfully to a team while shipping
            real products.
          </p>

          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-num">7+</span>
              <span className="about-stat-label">Projects Built</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-num">3+</span>
              <span className="about-stat-label">Tech Stacks</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-num">1</span>
              <span className="about-stat-label">Internship</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-num">2</span>
              <span className="about-stat-label">Certifications</span>
            </div>
          </div>
        </div>

        {/* Right — Education & Certs */}
        <div className="about-right">
          <div className="about-card">
            <div className="about-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div>
              <div className="about-card-tag">EDUCATION</div>
              <div className="about-card-title">Bachelor of Technology (B.Tech) in ICT</div>
              <div className="about-card-sub">Marwadi University, Rajkot</div>
              <div className="about-card-meta">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                2023 – 2027 · CGPA 6.37
              </div>
            </div>
          </div>

          <div className="about-card">
            <div className="about-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <circle cx="12" cy="8" r="4"/><path d="M8 16s0-4 4-4 4 4 4 4"/>
                <path d="M3 20a9 9 0 0 1 18 0"/>
              </svg>
            </div>
            <div>
              <div className="about-card-tag">CERTIFICATIONS</div>
              <div className="cert-item">
                <div className="cert-name">React &amp; Node.js Full Stack Development</div>
                <div className="cert-issuer">Udemy · March 2026</div>
              </div>
              <div className="cert-item" style={{ marginTop: '12px' }}>
                <div className="cert-name">Mastering Flutter: Basic to Advanced</div>
                <div className="cert-issuer">Udemy · Oct 2025</div>
              </div>
            </div>
          </div>

          <div className="about-card">
            <div className="about-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div>
              <div className="about-card-tag">LANGUAGES</div>
              <div className="about-langs">
                <span>English</span><span>Hindi</span><span>Gujarati (Native)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
