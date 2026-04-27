export default function Hero() {
  return (
    <section id="about" style={{ padding: '100px 0 80px', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '600px', height: '600px',
        background: 'radial-gradient(circle at 0% 0%, rgba(0,229,160,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="portfolio-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '48px', alignItems: 'start', position: 'relative' }}>
        {/* Left */}
        <div>
          <div className="badge fade-up" style={{ marginBottom: '24px' }}>
            Building in Public
          </div>
          <h1 className="fade-up delay-1" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '28px',
          }}>
            Executive<br />
            Assistant.<br />
            Builder.<br />
            Vibe-Coder.
          </h1>
          <p className="fade-up delay-2" style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: '16px',
            color: 'var(--muted)',
            maxWidth: '480px',
            lineHeight: 1.7,
            marginBottom: '36px',
          }}>
            Tarun is an Executive Assistant by day and a solo builder by night,
            using AI with discipline across Next.js, Supabase, and Vercel. He
            builds in public with quiet systems, sharp prompts, and a craftsman&apos;s
            tolerance for detail.
            {/* TARUN: replace with your own bio */}
          </p>
          <div className="fade-up delay-3" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#work" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              border: '1px solid var(--accent-mid)',
              background: 'var(--accent-dim)',
              padding: '10px 20px',
              borderRadius: '3px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}>See My Work →</a>
            <a href="#writing" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              border: '1px solid var(--border-hi)',
              background: 'transparent',
              padding: '10px 20px',
              borderRadius: '3px',
              textDecoration: 'none',
              transition: 'color 0.2s, border-color 0.2s',
            }}>Read Writing</a>
          </div>
        </div>

        {/* Right — stat card */}
        <div className="glass fade-up delay-4" style={{ padding: '24px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '20px',
          }}>Current Role</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '24px',
          }}>EA / Builder</div>
          {[
            { label: 'Stack', value: 'Next.js + Supabase' },
            { label: 'Role', value: 'EA + Solo Builder' },
            { label: 'Based in', value: 'Hyderabad' },
          ].map(({ label, value }) => (
            <div key={label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '18px',
              padding: '12px 0',
              borderTop: '1px solid var(--border)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}>{label}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--text)',
                textAlign: 'right',
              }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
