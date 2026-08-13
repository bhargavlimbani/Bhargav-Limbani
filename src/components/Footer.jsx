export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-brand-text">Bhargav Portfolio</span>
          <span className="footer-dot">.</span>
        </div>
        <p className="footer-copy">
          © {year} Bhargav Limbani · Gondal, Gujarat, India
        </p>
        <div className="footer-links">
          <a href="https://github.com/bhargavlimbani" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/bhargav-limbani-111977286/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:limbanibhargavmaheshbhai@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  )
}
