const capabilities = [
  {
    badge: 'Support',
    title: 'Executive Support',
    desc: 'Calendar judgment, crisp communication, meeting flow, and operational follow-through for leaders who need signal over noise.',
  },
  {
    badge: 'Build',
    title: 'AI-Assisted Building',
    desc: 'Next.js interfaces, Supabase-backed tools, Vercel deployment paths, and Claude-powered workflows shaped with intent.',
  },
  {
    badge: 'Systems',
    title: 'Systems Thinking',
    desc: 'Audit prompts, repeatable checklists, session openers, and structured workflows that make daily work easier to trust.',
  },
]

export default function About() {
  return (
    <section id="about-detail" style={{ padding: '80px 0' }}>
      <div style={{ marginBottom: '12px' }} className="badge">What I Do</div>
      <div className="portfolio-about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start', marginTop: '24px' }}>
        {/* Left */}
        <div>
          <h2 style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: 'var(--text)',
            lineHeight: 1.2,
            marginBottom: '24px',
          }}>
            Calm execution,<br />
            deliberate tools, and<br />
            systems that stay<br />
            useful.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: '14px',
            color: 'var(--muted)',
            lineHeight: 1.75,
          }}>
            Tarun sits at the overlap of executive operations and practical product building.
            The day job sharpens the instincts: prioritise clearly, write precisely, close loops.
            The night work turns those instincts into small software systems built with AI,
            Next.js, Supabase, and a bias for maintainable structure.
            {/* TARUN: rewrite in your own words */}
          </p>
        </div>

        {/* Right — capability cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {capabilities.map(cap => (
            <div key={cap.badge} className="glass card-accent" style={{ padding: '22px' }}>
              <div className="badge" style={{ marginBottom: '12px' }}>{cap.badge}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '8px',
              }}>{cap.title}</div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '13px',
                color: 'var(--muted)',
                lineHeight: 1.65,
              }}>{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
