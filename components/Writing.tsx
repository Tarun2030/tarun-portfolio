const posts = [
  {
    date: '2026.04.22',
    category: 'Process',
    title: 'How I open an AI build session without losing the plot',
    excerpt: 'A compact ritual for turning messy intent into a clear first commit, with constraints visible from the start.',
    href: '#', // TARUN: replace with real links
  },
  {
    date: '2026.03.28',
    category: 'Ops',
    title: 'Executive support is product thinking in a quieter room',
    excerpt: 'Notes on prioritisation, sharp communication, and why good assistants think in systems before software.',
    href: '#',
  },
]

export default function Writing() {
  return (
    <section id="writing" style={{ padding: '80px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <div className="badge" style={{ marginBottom: '12px' }}>Notes</div>
          <h2 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--text)',
          }}>{"// WRITING"}</h2>
        </div>
        <a href="#" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          textDecoration: 'none',
        }}>View All →</a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {posts.map(post => (
          <a key={post.title} href={post.href} className="glass card-accent portfolio-writing-card" style={{
            display: 'grid',
            gridTemplateColumns: '100px 80px 1fr',
            gap: '24px',
            alignItems: 'start',
            padding: '20px 24px',
            textDecoration: 'none',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--muted)',
              paddingTop: '2px',
            }}>{post.date}</span>
            <span className="badge" style={{ fontSize: '9px' }}>{post.category}</span>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '6px',
              }}>{post.title}</div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '13px',
                color: 'var(--muted)',
                lineHeight: 1.6,
              }}>{post.excerpt}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
