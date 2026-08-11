export default function Navbar() {
  return (
    <nav>
      <div className="brand">
        <span className="dot"></span> BHARGAV<span style={{ color: 'var(--muted)' }}>LIMBANI</span>
      </div>
      <div className="links">
        <a href="#about">Objective</a>
        <a href="#skills">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#education">Education</a>
        <a className="nav-resume-btn" href="/bhargav%20limbani%20master%20resume.pdf" download="Bhargav_Limbani_Resume.pdf" target="_blank" rel="noopener noreferrer">
          Download CV
        </a>
      </div>
    </nav>
  )
}
