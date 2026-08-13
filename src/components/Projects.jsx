import { useState } from 'react'
import useReveal from '../hooks/useReveal'

const PROJECTS = [
  {
    title: 'Jay Jalaram Packaging Management System',
    desc: 'A web app for managing orders, inventory, billing and customer details, with efficient database handling and a responsive UI.',
    chips: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
    link: 'https://github.com/bhargavlimbani/Jay-Jalaram-Packaging-webapp.git',
    type: 'Web Apps',
    path: '~/bhargav/jay-jalaram-web',
    eng: 'ENG: WEB',
  },
  {
    title: 'Jay Jalaram Packaging App',
    desc: 'Full-stack packaging management app with Flutter, featuring user authentication, product management, cart, order processing, payment integration, and role-based admin access.',
    chips: ['Flutter', 'Node.js', 'Express.js', 'MySQL'],
    link: 'https://github.com/bhargavlimbani/Jay-Jalaram-Packaging-app.git',
    type: 'Mobile Apps',
    path: '~/bhargav/jay-jalaram-app',
    eng: 'ENG: MOBILE',
  },
  {
    title: 'MU Career Path',
    desc: 'Flutter career guidance app integrated with Firebase Auth and Firestore, enabling students to explore companies, share placement experiences, manage profiles, and access resources with offline support.',
    chips: ['Flutter', 'Firebase Auth', 'Firestore'],
    link: 'https://github.com/bhargavlimbani/mu_career_path',
    type: 'Mobile Apps',
    path: '~/bhargav/mu-career-path',
    eng: 'ENG: MOBILE',
  },
  {
    title: 'Real-Time Chat Application',
    desc: 'MERN stack chat app with JWT-based auth, instant messaging, and Socket.IO for real-time communication between users.',
    chips: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    link: 'https://github.com/bhargavlimbani/Chat-app-with-MERN-Stack',
    type: 'Web Apps',
    path: '~/bhargav/realtime-chat',
    eng: 'ENG: WEB',
  },
  {
    title: 'Contact Book',
    desc: 'Desktop contact management application for storing, searching and updating contact details with an interactive UI and efficient data handling.',
    chips: ['C#', '.NET'],
    link: 'https://github.com/bhargavlimbani/Contact-Book.git',
    type: 'Desktop',
    path: '~/bhargav/contact-book',
    eng: 'ENG: DESKTOP',
  },
  {
    title: 'Voice-Enabled Scientific Calculator',
    desc: 'AI-powered scientific calculator with voice input and multilingual speech support (English, Hindi, Gujarati), covering trigonometric, logarithmic and arithmetic operations.',
    chips: ['Flutter', 'Dart'],
    link: 'https://github.com/bhargavlimbani/voice-scientific-calculator-app.git',
    type: 'Mobile Apps',
    path: '~/bhargav/voice-calc',
    eng: 'ENG: MOBILE',
  },
  {
    title: 'Circuitology Club Portal',
    desc: 'Dynamic web portal for a college electronics club to streamline event announcements, member registrations and content updates.',
    chips: ['PHP', 'HTML/CSS', 'MySQL'],
    link: 'https://github.com/bhargavlimbani/Circuitology_club_portal',
    type: 'Web Apps',
    path: '~/bhargav/circuitology',
    eng: 'ENG: WEB',
  },
]

const FILTERS = ['All Projects', 'Web Apps', 'Mobile Apps', 'Desktop']

export default function Projects() {
  const [ref, visible] = useReveal()
  const [filter, setFilter] = useState('All Projects')

  const filtered = filter === 'All Projects'
    ? PROJECTS
    : PROJECTS.filter(p => p.type === filter)

  return (
    <section id="projects" className={`projects-section reveal ${visible ? 'in' : ''}`} ref={ref}>
      <div className="section-header">
        <h2 className="section-title">Featured <span className="accent-text">Projects</span></h2>
        <p className="section-sub">
          Real-world applications built during internship and personal exploration.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="proj-filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`proj-filter clickable ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <div className="proj-grid">
        {filtered.map(p => (
          <div key={p.title} className="proj-card">
            {/* Terminal window chrome */}
            <div className="proj-terminal-bar">
              <div className="terminal-dots">
                <span className="tdot red" />
                <span className="tdot yellow" />
                <span className="tdot green" />
              </div>
              <span className="terminal-path">{p.path}</span>
              <span className="terminal-eng">{p.eng}</span>
            </div>

            {/* Laser scan effect */}
            <div className="proj-laser" />

            <div className="proj-body">
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-chips">
                {p.chips.map(c => (
                  <span key={c} className="proj-chip">{c}</span>
                ))}
              </div>
              <div className="proj-footer">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-link clickable"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M12 3a9 9 0 0 0-2.8 17.5c.4.1.6-.2.6-.4v-1.6c-2.5.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.6.1-.5.1-.5.9 0 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2-.2-4.1-1-4.1-4.4 0-1 .3-1.7.9-2.4-.1-.2-.4-1.1.1-2.4 0 0 .8-.3 2.5 1a8.6 8.6 0 0 1 4.6 0c1.7-1.2 2.5-1 2.5-1 .5 1.3.2 2.2.1 2.4.6.7.9 1.5.9 2.4 0 3.4-2.1 4.2-4.1 4.4.3.3.6.8.6 1.7v2.5c0 .2.2.5.6.4A9 9 0 0 0 12 3z"/>
                  </svg>
                  View on GitHub
                </a>
                <span className="proj-type-badge">{p.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
