import useReveal from '../hooks/useReveal'

export default function About() {
  const [ref, visible] = useReveal()
  return (
    <section id="about" className={`objective reveal ${visible ? 'in' : ''}`} ref={ref}>
      <div className="tag">Objective</div>
      <h2>What I'm looking for</h2>
      <p>
        As a fresher, I look forward to gaining industrial experience while contributing with my
        knowledge and technical skills. During this time, I want to enhance my technical depth and
        gain the real-world exposure that only shipping software can teach.
      </p>
    </section>
  )
}
