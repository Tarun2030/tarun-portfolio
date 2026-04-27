'use client'

import { useEffect, useRef } from 'react'

// ── Scroll reveal ──────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('active')
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ── Constants ──────────────────────────────────────────────────────────────────
const ACCENT = '#c9956a'

const PROJECTS = [
  {
    name: 'Relay',
    year: '2026',
    status: 'WIP',
    desc: 'A lightweight operating surface for handoffs, reminders, and clear executive follow-through.',
    stack: ['Next.js', 'Supabase', 'Vercel'],
    href: '#',
  },
  {
    name: 'Portfolio OS',
    year: '2026',
    status: 'LIVE',
    desc: 'A personal publishing and proof-of-work system for notes, builds, and public experiments.',
    stack: ['TypeScript', 'Tailwind', 'Notion'],
    href: '#',
  },
  {
    name: 'Audit Arsenal',
    year: '2025',
    status: 'LIVE',
    desc: 'A prompt-driven review kit for finding weak copy, brittle UI states, and unclear workflows.',
    stack: ['Claude API', 'n8n', 'Linear'],
    href: '#',
  },
]

const POSTS = [
  {
    date: 'Apr 2026',
    category: 'Process',
    readTime: '4 min',
    title: 'How I open an AI build session without losing the plot',
    excerpt:
      'A compact ritual for turning messy intent into a clear first commit, with constraints visible from the start.',
    href: '#',
  },
  {
    date: 'Mar 2026',
    category: 'Ops',
    readTime: '6 min',
    title: 'Executive support is product thinking in a quieter room',
    excerpt:
      'Notes on prioritisation, sharp communication, and why good assistants think in systems before software.',
    href: '#',
  },
]

const TOOLS = [
  'Next.js', 'Supabase', 'Vercel', 'Claude API',
  'TypeScript', 'Tailwind CSS', 'Cursor', 'n8n', 'Notion', 'Linear',
]

const CAPABILITIES = [
  {
    label: 'Support',
    title: 'Executive Support',
    desc: 'Calendar judgment, crisp communication, meeting flow, and operational follow-through for leaders who need signal over noise.',
  },
  {
    label: 'Build',
    title: 'AI-Assisted Building',
    desc: 'Next.js interfaces, Supabase-backed tools, Vercel deployment paths, and Claude-powered workflows shaped with intent.',
  },
  {
    label: 'Systems',
    title: 'Systems Thinking',
    desc: 'Audit prompts, repeatable checklists, session openers, and structured workflows that make daily work easier to trust.',
  },
]

// ── Shared inline styles ───────────────────────────────────────────────────────
const TEXT_MUTED = 'rgba(228,224,216,0.45)'
const TEXT_DIM   = 'rgba(228,224,216,0.65)'
const TEXT_MAIN  = '#e4e0d8'

// ── Nav ────────────────────────────────────────────────────────────────────────
function Nav() {
  const links = [
    { label: 'Writing', href: '#writing' },
    { label: 'Work',    href: '#work'    },
    { label: 'About',   href: '#about'   },
    { label: 'Tools',   href: '#tools'   },
  ]

  return (
    <header className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '0 32px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <a
          href="#hero"
          style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, color: TEXT_MAIN, textDecoration: 'none', letterSpacing: '-0.01em' }}
        >
          Tarun Sharma
        </a>

        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: TEXT_MUTED, textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = TEXT_MAIN)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = TEXT_MUTED)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: ACCENT, border: `1px solid rgba(201,149,106,0.3)`, background: 'rgba(201,149,106,0.07)', padding: '7px 18px', borderRadius: 6, textDecoration: 'none', transition: 'background 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,149,106,0.13)'; el.style.borderColor = 'rgba(201,149,106,0.5)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,149,106,0.07)'; el.style.borderColor = 'rgba(201,149,106,0.3)' }}
          >
            Open to Work →
          </a>
        </nav>
      </div>
    </header>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Home() {
  const marqueeTools = [...TOOLS, ...TOOLS, ...TOOLS]

  return (
    <>
      <Nav />

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px' }}>

        {/* ── Hero ── */}
        <section id="hero" style={{ padding: '96px 0 80px' }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: TEXT_MUTED, marginBottom: 28 }}>
              Executive Assistant · Builder · Hyderabad
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(52px, 7vw, 88px)', fontWeight: 700, color: TEXT_MAIN, lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 32, maxWidth: 760 }}>
              The EA who ships code.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 18, color: TEXT_DIM, maxWidth: 560, lineHeight: 1.75, marginBottom: 40 }}>
              Tarun Sharma spends his days running operations for C-suite executives and his nights building software with Next.js, Supabase, and Claude.
              Four years of instinct about what actually matters — compressed into systems that work quietly.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href="#writing"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: ACCENT, border: '1px solid rgba(201,149,106,0.35)', background: 'rgba(201,149,106,0.09)', padding: '11px 24px', borderRadius: 6, textDecoration: 'none', transition: 'background 0.2s' }}
              >
                Read the writing →
              </a>
              <a
                href="#work"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: TEXT_DIM, border: '1px solid rgba(255,255,255,0.09)', background: 'transparent', padding: '11px 24px', borderRadius: 6, textDecoration: 'none', transition: 'color 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = TEXT_MAIN; el.style.borderColor = 'rgba(255,255,255,0.2)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = TEXT_DIM; el.style.borderColor = 'rgba(255,255,255,0.09)' }}
              >
                See the work
              </a>
            </div>
          </Reveal>

          {/* Thin divider */}
          <hr className="section-rule" style={{ marginTop: 80 }} />
        </section>

        {/* ── Writing (promoted) ── */}
        <section id="writing" style={{ padding: '72px 0' }}>
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
              <div>
                <span className="tag" style={{ marginBottom: 14, display: 'inline-block' }}>Notes</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 600, color: TEXT_MAIN, lineHeight: 1.15, letterSpacing: '-0.015em' }}>
                  Writing
                </h2>
              </div>
              <a
                href="#"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: ACCENT, textDecoration: 'none' }}
              >
                All posts →
              </a>
            </div>
          </Reveal>

          <div>
            {POSTS.map((post, i) => (
              <Reveal key={post.title} delay={i * 80}>
                <a
                  href={post.href}
                  className="writing-row"
                  style={{ display: 'grid', gridTemplateColumns: '90px 76px 1fr 28px', gap: 24, alignItems: 'center', padding: '22px 0', textDecoration: 'none' }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: TEXT_MUTED }}>
                    {post.date}
                  </span>
                  <span className="tag">{post.category}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: TEXT_MAIN, marginBottom: 5, letterSpacing: '-0.01em' }}>
                      {post.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 13, color: TEXT_MUTED, lineHeight: 1.6 }}>
                      {post.excerpt}
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: TEXT_MUTED, justifySelf: 'end', transition: 'color 0.15s' }}>
                    →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <hr className="section-rule" style={{ marginTop: 72 }} />
        </section>

        {/* ── Projects ── */}
        <section id="work" style={{ padding: '72px 0' }}>
          <Reveal>
            <div style={{ marginBottom: 40 }}>
              <span className="tag" style={{ marginBottom: 14, display: 'inline-block' }}>Selected Work</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,3.5vw,40px)', fontWeight: 600, color: TEXT_MAIN, lineHeight: 1.15, letterSpacing: '-0.015em' }}>
                Projects
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 70}>
                <a
                  href={p.href}
                  className="bento-card"
                  style={{ display: 'flex', flexDirection: 'column', padding: 24, borderRadius: 10, textDecoration: 'none', minHeight: 220 }}
                >
                  {/* Header row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, color: TEXT_MAIN, letterSpacing: '-0.01em' }}>
                        {p.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: TEXT_MUTED, marginTop: 3, letterSpacing: '0.06em' }}>
                        {p.year}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: p.status === 'LIVE' ? '#6ec97a' : p.status === 'WIP' ? ACCENT : TEXT_MUTED,
                        border: `1px solid ${p.status === 'LIVE' ? 'rgba(110,201,122,0.25)' : p.status === 'WIP' ? 'rgba(201,149,106,0.25)' : 'rgba(255,255,255,0.1)'}`,
                        background: p.status === 'LIVE' ? 'rgba(110,201,122,0.07)' : p.status === 'WIP' ? 'rgba(201,149,106,0.07)' : 'rgba(255,255,255,0.04)',
                        padding: '3px 8px',
                        borderRadius: 4,
                      }}
                    >
                      {p.status}
                    </span>
                  </div>

                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 13, color: TEXT_MUTED, lineHeight: 1.7, flex: 1 }}>
                    {p.desc}
                  </p>

                  {/* Stack */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 18 }}>
                    {p.stack.map(s => (
                      <span
                        key={s}
                        style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: TEXT_MUTED, border: '1px solid rgba(255,255,255,0.08)', padding: '2px 7px', borderRadius: 3 }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <hr className="section-rule" style={{ marginTop: 72 }} />
        </section>

        {/* ── About ── */}
        <section id="about" style={{ padding: '72px 0' }}>
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <span className="tag" style={{ marginBottom: 14, display: 'inline-block' }}>What I Do</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,3.5vw,40px)', fontWeight: 600, color: TEXT_MAIN, lineHeight: 1.15, letterSpacing: '-0.015em' }}>
                Calm execution,<br />deliberate tools.
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <Reveal>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 15, color: TEXT_DIM, lineHeight: 1.85, marginBottom: 24 }}>
                Tarun sits at the overlap of executive operations and practical product building.
                The day job sharpens the instincts: prioritise clearly, write precisely, close loops without drama.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 15, color: TEXT_MUTED, lineHeight: 1.85 }}>
                The night work turns those instincts into small software systems — built with AI,
                Next.js, Supabase, and a bias for maintainable structure over flashy complexity.
              </p>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CAPABILITIES.map((cap, i) => (
                <Reveal key={cap.label} delay={i * 80}>
                  <div className="bento-card" style={{ padding: '20px 22px', borderRadius: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <span className="tag">{cap.label}</span>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: TEXT_MAIN, letterSpacing: '-0.01em' }}>
                        {cap.title}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 13, color: TEXT_MUTED, lineHeight: 1.7 }}>
                      {cap.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <hr className="section-rule" style={{ marginTop: 72 }} />
        </section>

        {/* ── Tools marquee ── */}
        <section id="tools" style={{ padding: '64px 0' }}>
          <Reveal>
            <div style={{ marginBottom: 28 }}>
              <span className="tag" style={{ marginBottom: 14, display: 'inline-block' }}>Daily Stack</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: TEXT_MAIN, lineHeight: 1.15, letterSpacing: '-0.015em' }}>
                Tools
              </h2>
            </div>
          </Reveal>

          <div style={{ overflow: 'hidden' }}>
            <div
              className="animate-marquee-left"
              style={{ display: 'flex', gap: 10, width: 'max-content' }}
            >
              {marqueeTools.map((t, i) => (
                <span
                  key={i}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', padding: '8px 18px', borderRadius: 6, whiteSpace: 'nowrap' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <hr className="section-rule" style={{ marginTop: 64 }} />
        </section>

        {/* ── Contact ── */}
        <section id="contact" style={{ padding: '72px 0 96px' }}>
          <Reveal>
            <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>Contact</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, color: TEXT_MAIN, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
              Let&apos;s work together.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 16, color: TEXT_MUTED, marginBottom: 36, maxWidth: 440, lineHeight: 1.7 }}>
              Open to EA roles, consulting, and collaboration on interesting systems. Always happy to talk shop.
            </p>
            <a
              href="mailto:mail2tarun.30@gmail.com"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 600, color: ACCENT, textDecoration: 'none', letterSpacing: '-0.01em', display: 'inline-block', marginBottom: 48, borderBottom: `1px solid rgba(201,149,106,0.3)`, paddingBottom: 2 }}
            >
              mail2tarun.30@gmail.com
            </a>

            <div style={{ display: 'flex', gap: 24, marginBottom: 64 }}>
              {[
                { label: 'X / Twitter', href: 'https://x.com/' },
                { label: 'GitHub', href: 'https://github.com/Tarun2030' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: TEXT_MUTED, textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = ACCENT)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = TEXT_MUTED)}
                >
                  {s.label} →
                </a>
              ))}
            </div>

            <hr className="section-rule" style={{ marginBottom: 24 }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(228,224,216,0.2)' }}>
              Built by Tarun · Next.js · Vercel · 2026
            </p>
          </Reveal>
        </section>

      </main>
    </>
  )
}
