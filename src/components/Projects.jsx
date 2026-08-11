import useReveal from '../hooks/useReveal'

const PROJECTS = [
  {
    title: 'Jay Jalaram Packaging Management System',
    desc: 'A web app for managing orders, inventory, billing and customer details, with efficient database handling and a responsive UI.',
    chips: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
    link: 'https://github.com/bhargavlimbani/Jay-Jalaram-Packaging-webapp.git',
  },
  {
    title: 'Jay Jalaram Packaging Management System App',
    desc:'Developed a full-stack packaging management application using Flutter, Node.js, Express.js, and MySQL with features including user authentication, product management, cart handling, order processing, payment integration, and role-based admin access.',
    chips:['Flutter','Node.js','Express.js','MySQL'],
    link: 'https://github.com/bhargavlimbani/Jay-Jalaram-Packaging-app.git',

  },
  {
    title: 'MU Career Path',  
    desc: 'Developed a Flutter-based career guidance application integrated with Firebase Authentication and Cloud Firestore, enabling students to explore company information, share placement experiences, manage profiles, and access placement-related resources with offline data support.',  
    chips: ['Flutter', 'Firebase Auth', 'Firestore'],
    link: 'https://github.com/bhargavlimbani/mu_career_path',
  },
  {
    title: 'Real-Time Chat Application',
    desc: 'Developed a real-time chat application using the MERN stack (MongoDB, Express.js, React.js, and Node.js) with secure JWT-based authentication, instant messaging, responsive user interface, and Socket.IO integration for seamless real-time communication between users. ',
    chips: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    link: 'https://github.com/bhargavlimbani/Chat-app-with-MERN-Stack',
  },
  {
    title: 'Contact Book',
    desc: 'A desktop contact management application for storing, searching and updating contact details with an interactive UI and efficient data handling.',
    chips: ['C#', '.NET'],
    link: 'https://github.com/bhargavlimbani/Contact-Book.git',
  },
  {
    title: 'Voice-Enabled Scientific Calculator',
    desc: 'An AI-powered scientific calculator with voice input and multilingual speech support (English, Hindi, Gujarati), covering trigonometric, logarithmic and arithmetic operations.',
    chips: ['Flutter', 'Dart'],
    link: 'https://github.com/bhargavlimbani/voice-scientific-calculator-app.git',
  },
  {
    title: 'Circuitology Club Portal',
    desc: 'A dynamic web portal for a college electronics club to streamline event announcements, member registrations and content updates.',
    chips: ['PHP', 'HTML/CSS', 'MySQL'],
    link: 'https://github.com/bhargavlimbani/Circuitology_club_portal',
  },
]

export default function Projects() {
  const [ref, visible] = useReveal()
  return (
    <section id="projects" className={`reveal ${visible ? 'in' : ''}`} ref={ref}>
      <div className="tag">Projects</div>
      <h2>Things I've shipped</h2>
      <div className="proj-grid">
        {PROJECTS.map((p) => (
          <div className="proj-card" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="chip-row">
              {p.chips.map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
            <a href={p.link} target="_blank" rel="noopener noreferrer">View on GitHub →</a>
          </div>
        ))}
      </div>
    </section>
  )
}
