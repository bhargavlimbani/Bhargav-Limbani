import useReveal from '../hooks/useReveal'

export default function Education() {
  const [ref, visible] = useReveal()
  return (
    <section id="education" className={`reveal ${visible ? 'in' : ''}`} ref={ref}>
      <div className="tag">Education & Certifications</div>
      <h2>Background</h2>
      <div className="split">
        <div className="spec-card">
          <h3>Bachelor of Technology</h3>
          <div className="sub">Information & Communication Technology</div>
          <div className="meta">Marwadi University, Rajkot · 2023 – 2027 · CGPA 6.37</div>

          <ul className="cert-list">
            <li><b>React & Node.js Full Stack Development</b>Udemy · March 2026</li>
            <li><b>Mastering Flutter: Basic to Advanced</b>Udemy · Oct 2025</li>
          </ul>
        </div>
        <div className="spec-card">
          <h3>Languages</h3>
          <div className="misc">
            <span className="chip lang-chip">English</span>
            <span className="chip lang-chip">Hindi</span>
            <span className="chip lang-chip">Gujarati (Native)</span>
          </div>
          <h3 style={{ marginTop: 26 }}>Hobbies</h3>
          <div className="misc">
            <span className="chip">Cricket</span>
            <span className="chip">Kabaddi</span>
            <span className="chip">Traveling</span>
          </div>
        </div>
      </div>
    </section>
  )
}
