import useReveal from '../hooks/useReveal'

const TIMELINE = [
  {
    role: 'Web App Development Intern',
    company: 'Script India',
    period: 'Jul 2025 — Sep 2025',
    type: 'Internship',
    bullets: [
      'Completed a 3-month internship in web application development.',
      'Worked on real-world web modules using frontend and backend technologies.',
      'Gained practical experience in database handling, API integration, and responsive UI development.',
      'Collaborated on development tasks and learned industry-level project workflows.',
    ],
  },
]

export default function Experience() {
  const [ref, visible] = useReveal()
  return (
    <section id="experience" className={`experience-section reveal ${visible ? 'in' : ''}`} ref={ref}>
      <div className="section-header">
        <h2 className="section-title">Work <span className="accent-text">Experience</span></h2>
        <p className="section-sub">
          Internship exposure and hands-on industry experience.
        </p>
      </div>

      <div className="timeline">
        {TIMELINE.map((item, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-node">
              <div className="timeline-dot" />
              <div className="timeline-line" />
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <div>
                  <div className="timeline-type">{item.type.toUpperCase()}</div>
                  <h3 className="timeline-role">{item.role}</h3>
                  <div className="timeline-company">{item.company}</div>
                </div>
                <div className="timeline-period">{item.period}</div>
              </div>
              <ul className="timeline-bullets">
                {item.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
