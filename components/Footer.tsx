'use client'

export default function Footer() {
  return (
    <section id="contact" style={{ padding: '80px 0 60px' }}>
      <div className="badge" style={{ marginBottom: '20px' }}>Contact</div>
      <h2 style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 300,
        fontSize: 'clamp(32px, 5vw, 60px)',
        color: 'var(--text)',
        lineHeight: 1.1,
        marginBottom: '20px',
      }}>Let&apos;s work together.</h2>

      <a
        href="mailto:tarun@example.com" // TARUN: replace with real email
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--accent)',
          textDecoration: 'none',
          display: 'block',
          marginBottom: '40px',
        }}
      >tarun@example.com</a>

      {/* Social links — TARUN: replace hrefs with real profiles */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '60px' }}>
        {[
          { label: 'X', href: 'https://x.com/' },
          { label: 'GH', href: 'https://github.com/' },
          { label: 'LI', href: 'https://linkedin.com/in/' },
        ].map(s => (
          <a key={s.label} href={s.href} style={{
            width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--muted)',
            border: '1px solid var(--border-hi)',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = 'var(--accent)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-mid)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'var(--muted)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hi)'
          }}
          >{s.label}</a>
        ))}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '24px' }} />
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
      }}>Built by Tarun · Next.js 14 · Deployed on Vercel</p>
    </section>
  )
}
