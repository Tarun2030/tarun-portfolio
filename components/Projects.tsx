const projects = [
  {
    name: 'Relay',
    desc: 'A lightweight operating surface for handoffs, reminders, and clear executive follow-through.',
    stack: ['Next.js', 'Supabase', 'Vercel'],
    href: '#', // TARUN: replace with real link
  },
  {
    name: 'Portfolio OS',
    desc: 'A personal publishing and proof-of-work system for notes, builds, and public experiments.',
    stack: ['TypeScript', 'Tailwind', 'Notion'],
    href: '#',
  },
  {
    name: 'Audit Arsenal',
    desc: 'A prompt-driven review kit for finding weak copy, brittle UI states, and unclear workflows.',
    stack: ['Claude API', 'n8n', 'Linear'],
    href: '#',
  },
]

export default function Projects() {
  return (
    <section id="work" style={{ padding: '80px 0' }}>
      <div className="portfolio-section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          <div className="badge" style={{ marginBottom: '12px' }}>Selected Work</div>
          <h2 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--text)',
          }}>{"// PROJECTS"}</h2>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          fontSize: '13px',
          color: 'var(--muted)',
          maxWidth: '280px',
          lineHeight: 1.65,
          textAlign: 'right',
        }}>
          Three compact systems Tarun can evolve from private workflow
          into public artifacts. Each one is designed to be small,
          legible, and useful before it is loud.
        </p>
      </div>

      <div className="portfolio-project-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
        {projects.map(p => (
          <a key={p.name} href={p.href} className="glass card-accent" style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            textDecoration: 'none',
            minHeight: '200px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--text)',
              }}>{p.name}</span>
              <span style={{ color: 'var(--accent)', fontSize: '16px' }}>→</span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '13px',
              color: 'var(--muted)',
              lineHeight: 1.65,
              flex: 1,
            }}>{p.desc}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
              {p.stack.map(s => (
                <span key={s} className="badge" style={{ fontSize: '9px', padding: '2px 8px' }}>{s}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
