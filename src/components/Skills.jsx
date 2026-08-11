import useReveal from '../hooks/useReveal'

const GROUPS = [
  { title: 'Languages & Frameworks', chips: ['C', '.NET / C#', 'ASP.NET', 'Flutter / Dart', 'Java', 'JavaScript'] },
  { title: 'Frontend Development', chips: ['React.js', 'HTML', 'CSS'] },
  { title: 'Backend Development', chips: ['Node.js', 'Express.js', 'PHP'] },
  { title: 'Databases', chips: ['MySQL', 'MongoDB', 'Firebase'] },
  { title: 'Tools & Technologies', chips: ['Git & GitHub', 'REST API'] },
  { title: 'Soft Skills', chips: ['Teamwork', 'Multi-Tasking', 'Time Management', 'Communication'], soft: true },
]

export default function Skills() {
  const [ref, visible] = useReveal()
  return (
    <section id="skills" className={`reveal ${visible ? 'in' : ''}`} ref={ref}>
      <div className="tag">Skills</div>
      <h2>What I build with</h2>
      <div className="skills-grid">
        {GROUPS.map((g) => (
          <div className={`skill-card ${g.soft ? 'soft' : ''}`} key={g.title}>
            <h4>{g.title}</h4>
            <div className="chip-row">
              {g.chips.map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
