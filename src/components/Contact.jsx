import useReveal from '../hooks/useReveal'

export default function Contact() {
  const [ref, visible] = useReveal()

  function handleSubmit(e) {
    e.preventDefault()
    const btn = e.target.querySelector('.contact-submit')
    btn.textContent = 'Message Sent! ✓'
    btn.style.background = 'hsl(142,71%,45%)'
    setTimeout(() => {
      btn.textContent = 'Send Message →'
      btn.style.background = ''
      e.target.reset()
    }, 3000)
  }

  return (
    <section id="contact" className={`contact-section reveal ${visible ? 'in' : ''}`} ref={ref}>
      <div className="section-header">
        <h2 className="section-title">Get In <span className="accent-text">Touch</span></h2>
        <p className="section-sub">
          Open to internships and fresher roles. Let's build something together — feel free to reach out.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left — Info */}
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <polyline points="3 7 12 13 21 7"/>
              </svg>
            </div>
            <div>
              <div className="contact-label">EMAIL ME</div>
              <a className="contact-value" href="mailto:limbanibhargavmaheshbhai@gmail.com">
                limbanibhargavmaheshbhai@gmail.com
              </a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>
              </svg>
            </div>
            <div>
              <div className="contact-label">CALL ME</div>
              <a className="contact-value" href="tel:+916355990290">+91 6355990290</a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <div>
              <div className="contact-label">LOCATION</div>
              <span className="contact-value">Gondal, Gujarat, India</span>
            </div>
          </div>

          <div className="contact-socials">
            <a href="https://www.linkedin.com/in/bhargav-limbani-111977286/" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                <circle cx="12" cy="12" r="9"/>
                <path d="M8 11v5M8 8v.01M12 16v-3.5a1.8 1.8 0 0 1 3.6 0V16"/>
              </svg>
            </a>
            <a href="https://github.com/bhargavlimbani" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                <path d="M12 3a9 9 0 0 0-2.8 17.5c.4.1.6-.2.6-.4v-1.6c-2.5.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.6.1-.5.1-.5.9 0 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2-.2-4.1-1-4.1-4.4 0-1 .3-1.7.9-2.4-.1-.2-.4-1.1.1-2.4 0 0 .8-.3 2.5 1a8.6 8.6 0 0 1 4.6 0c1.7-1.2 2.5-1 2.5-1 .5 1.3.2 2.2.1 2.4.6.7.9 1.5.9 2.4 0 3.4-2.1 4.2-4.1 4.4.3.3.6.8.6 1.7v2.5c0 .2.2.5.6.4A9 9 0 0 0 12 3z"/>
              </svg>
            </a>
          </div>

          <div className="available-for">
            <div className="contact-label" style={{ marginBottom: '12px' }}>AVAILABLE FOR</div>
            <div className="avail-tags">
              <span>Software Development Internships</span>
              <span>Full Stack Development Roles</span>
              <span>Flutter Development Projects</span>
              <span>ASP.NET / C# Projects</span>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input id="contact-name" className="form-input" type="text" placeholder="Full Name" required />
          </div>
          <div className="form-group">
            <input id="contact-email" className="form-input" type="email" placeholder="Email Address" required />
          </div>
          <div className="form-group">
            <textarea id="contact-message" className="form-input form-textarea" placeholder="Your Message" rows="6" required />
          </div>
          <button type="submit" className="contact-submit clickable">
            Send Message →
          </button>
        </form>
      </div>
    </section>
  )
}
