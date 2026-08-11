import useReveal from '../hooks/useReveal'

export default function Experience() {
  const [ref, visible] = useReveal()
  return (
    <section id="experience" className={`reveal ${visible ? 'in' : ''}`} ref={ref}>
      <div className="tag">Internship Exposure</div>
      <h2>Experience</h2>
      <div className="exp-item">
        <div style={{ flex: 1 }}>
          <div className="exp-head">
            <div>
              <h3>Web App Development Intern</h3>
              <div className="co">SCRIPT INDIA</div>
            </div>
            <div className="dates">Jul 2025 — Sep 2025</div>
          </div>
          <ul>
            <li>Completed a 3-month internship in web app development.</li>
            <li>Worked on real-world web application modules using frontend and backend technologies.</li>
            <li>Gained practical experience in database handling, API integration, and responsive UI development.</li>
            <li>Collaborated on development tasks and learned industry-level project workflows.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
