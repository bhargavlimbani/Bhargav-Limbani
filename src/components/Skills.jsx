import { useState } from 'react'
import useReveal from '../hooks/useReveal'

const CATEGORIES = ['Frontend', 'Backend', 'Mobile', 'Database', 'Tools', 'Languages']

const SKILLS = {
  Frontend: [
    { name: 'React.js',     pct: 85, status: 'Expert',      scope: 'SPA, hooks, context, REST integration' },
    { name: 'HTML5',        pct: 92, status: 'Expert',      scope: 'Semantic markup, accessibility, SEO' },
    { name: 'CSS3',         pct: 88, status: 'Expert',      scope: 'Flexbox, Grid, animations, responsive design' },
    { name: 'JavaScript',   pct: 82, status: 'Advanced',    scope: 'ES6+, async/await, DOM, event handling' },
  ],
  Backend: [
    { name: 'Node.js',      pct: 80, status: 'Advanced',    scope: 'REST APIs, middleware, file I/O' },
    { name: 'Express.js',   pct: 80, status: 'Advanced',    scope: 'Routing, auth, error handling' },
    { name: 'ASP.NET',      pct: 72, status: 'Proficient',  scope: 'MVC, C# controllers, EF Core' },
    { name: 'PHP',          pct: 65, status: 'Proficient',  scope: 'Dynamic pages, MySQL integration' },
  ],
  Mobile: [
    { name: 'Flutter',      pct: 85, status: 'Expert',      scope: 'Dart, state management, native APIs' },
    { name: 'Dart',         pct: 82, status: 'Advanced',    scope: 'OOP, async, streams, isolates' },
    { name: 'Firebase',     pct: 75, status: 'Proficient',  scope: 'Auth, Firestore, Storage, push' },
  ],
  Database: [
    { name: 'MySQL',        pct: 82, status: 'Advanced',    scope: 'Schema design, joins, stored procs' },
    { name: 'MongoDB',      pct: 75, status: 'Proficient',  scope: 'Aggregation, indexing, Atlas' },
    { name: 'Firebase',     pct: 75, status: 'Proficient',  scope: 'Realtime DB, Firestore, rules' },
  ],
  Tools: [
    { name: 'Git & GitHub', pct: 85, status: 'Advanced',    scope: 'Branching, PRs, CI workflows' },
    { name: 'REST API',     pct: 82, status: 'Advanced',    scope: 'Design, testing, versioning' },
    { name: 'VS Code',      pct: 90, status: 'Expert',      scope: 'Extensions, debugging, tasks' },
  ],
  Languages: [
    { name: 'C#',           pct: 75, status: 'Proficient',  scope: 'OOP, LINQ, .NET ecosystem' },
    { name: 'Java',         pct: 65, status: 'Proficient',  scope: 'OOP fundamentals, data structures' },
    { name: 'C',            pct: 70, status: 'Proficient',  scope: 'Systems basics, algorithms' },
    { name: 'JavaScript',   pct: 82, status: 'Advanced',    scope: 'Full stack, browser & Node' },
  ],
}

function ProgressArc({ pct }) {
  const r = 36, cx = 44, cy = 44
  const circ = 2 * Math.PI * r
  const dashLen = (pct / 100) * circ
  const gap = circ - dashLen
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" className="skill-arc-svg">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${dashLen} ${gap}`}
        strokeDashoffset={circ * 0.25}
        style={{ filter: 'drop-shadow(0 0 6px var(--accent))' }}
      />
    </svg>
  )
}

function SkillIcon({ name }) {
  const initials = name.split(/[\s./]/)[0].slice(0, 2).toUpperCase()
  return (
    <div className="skill-icon-wrap">
      <span className="skill-icon-text">{initials}</span>
    </div>
  )
}

export default function Skills() {
  const [ref, visible] = useReveal()
  const [activeCategory, setActiveCategory] = useState('Frontend')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(SKILLS['Frontend'][0])

  const displayedSkills = SKILLS[activeCategory]?.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  function handleCategoryChange(cat) {
    setActiveCategory(cat)
    setSelected(SKILLS[cat][0])
    setSearch('')
  }

  return (
    <section id="skills" className={`skills-section reveal ${visible ? 'in' : ''}`} ref={ref}>
      <div className="section-header">
        <h2 className="section-title">Technical <span className="accent-text">Skills</span></h2>
        <p className="section-sub">
          Advanced digital toolkit built through projects, internship, and coursework.
        </p>
      </div>

      {/* Search bar */}
      <div className="skills-toolbar">
        <div className="skills-search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            id="skills-search"
            className="skills-search"
            type="text"
            placeholder="Search tech stack..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="skills-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`skills-tab clickable ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="skills-body">
        {/* HUD Cards */}
        <div className="skills-grid-hud">
          {displayedSkills.map(skill => (
            <button
              key={skill.name}
              className={`hud-skill-card clickable ${selected?.name === skill.name ? 'active' : ''}`}
              onClick={() => setSelected(skill)}
            >
              <div className="hud-skill-arc-wrap">
                <ProgressArc pct={skill.pct} />
                <SkillIcon name={skill.name} />
              </div>
              <div className="hud-skill-name">{skill.name}</div>
              <div className="hud-skill-meta">
                <span className="hud-skill-pct">{skill.pct}%</span>
                <span className={`hud-skill-status status-${skill.status.toLowerCase()}`}>{skill.status}</span>
              </div>
            </button>
          ))}
          {displayedSkills.length === 0 && (
            <div className="skills-empty">No skills match "{search}"</div>
          )}
        </div>

        {/* Inspector Panel */}
        {selected && (
          <div className="skills-inspector">
            <div className="inspector-category">{activeCategory.toUpperCase()}</div>
            <div className="inspector-name">{selected.name}</div>

            <div className="inspector-row">
              <div className="inspector-block">
                <div className="inspector-label">PROFICIENCY</div>
                <div className="inspector-val accent">{selected.pct}%</div>
              </div>
              <div className="inspector-block">
                <div className="inspector-label">STATUS</div>
                <div className={`inspector-val status-${selected.status.toLowerCase()}`}>{selected.status}</div>
              </div>
            </div>

            <div className="inspector-scope-label">⚙ TECHNICAL SCOPE</div>
            <div className="inspector-scope">{selected.scope}</div>

            <div className="inspector-bar-wrap">
              <div className="inspector-bar">
                <div className="inspector-bar-fill" style={{ width: `${selected.pct}%` }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
