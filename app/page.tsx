'use client'

import { useEffect, useRef } from 'react'

// ── 3D tilt on mouse move ─────────────────────────────────────────────────────
function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width  - 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5
      el.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(8px)`
    }
    const onLeave = () => {
      el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])
  return ref
}

// ── Reveal ────────────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('in'); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────
const POSTS = [
  {
    date: "Apr '26",
    title: 'How I open an AI build session without losing the plot',
    excerpt: 'A compact ritual for turning messy intent into a clear first commit — constraints visible from the start.',
    href: '#',
  },
  {
    date: "Mar '26",
    title: 'Executive support is product thinking in a quieter room',
    excerpt: 'On prioritisation, sharp communication, and why good assistants think in systems before software.',
    href: '#',
  },
]

const PROJECTS = [
  {
    name: 'Relay',
    year: '2026',
    status: 'WIP' as const,
    desc: 'Operating surface for handoffs, reminders, and clear executive follow-through.',
    stack: ['Next.js', 'Supabase', 'Vercel'],
    href: '#',
  },
  {
    name: 'Portfolio OS',
    year: '2026',
    status: 'LIVE' as const,
    desc: 'Personal publishing system for notes, builds, and public experiments.',
    stack: ['TypeScript', 'Tailwind', 'Notion'],
    href: '#',
  },
  {
    name: 'Audit Arsenal',
    year: '2025',
    status: 'LIVE' as const,
    desc: 'Prompt-driven review kit for finding weak copy, brittle UI states, and unclear workflows.',
    stack: ['Claude API', 'n8n', 'Linear'],
    href: '#',
  },
]

const TOOLS = [
  ['Next.js', 'Supabase', 'Vercel', 'Claude API', 'TypeScript'],
  ['Tailwind CSS', 'Cursor', 'n8n', 'Notion', 'Linear'],
]

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const links = [
    { label: 'Writing', href: '#writing' },
    { label: 'Work',    href: '#work'    },
    { label: 'About',   href: '#about'   },
  ]
  return (
    <header className="nav">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52 }}>
        <a href="#hero" style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.02em' }}>
          Tarun Sharma
        </a>
        <nav style={{ display: 'flex', gap: 'var(--space-7)', alignItems: 'center' }}>
          {links.map(l => (
            <a key={l.label} href={l.href} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
            >{l.label}</a>
          ))}
          <a href="#contact" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent-border)', background: 'var(--accent-dim)', padding: '6px 14px', borderRadius: 5, textDecoration: 'none', transition: 'background 0.18s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'oklch(68% 0.110 55 / 0.16)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)')}
          >Open to work</a>
        </nav>
      </div>
    </header>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroTilt = useTilt(6)

  return (
    <>
      <Nav />
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '0 var(--space-6)' }}>

        {/* ── Hero ── */}
        <section id="hero" style={{ padding: 'var(--space-10) 0 var(--space-9)' }}>
          <Reveal>
            <p className="label" style={{ marginBottom: 'var(--space-6)' }}>
              Executive Assistant · Builder · Hyderabad
            </p>
          </Reveal>

          <Reveal delay={60}>
            {/* 3D tilt wrapper — perspective comes from useTilt */}
            <div
              ref={heroTilt}
              style={{
                display: 'inline-block',
                transition: 'transform 0.18s cubic-bezier(0.16,1,0.3,1)',
                willChange: 'transform',
                marginBottom: 'var(--space-7)',
              }}
            >
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(56px, 9vw, 104px)',
                fontWeight: 900,
                color: 'var(--text)',
                lineHeight: 0.95,
                letterSpacing: '-0.035em',
                maxWidth: '10ch',
              }}>
                The EA who ships code.
              </h1>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 18, color: 'var(--text-mid)', lineHeight: 1.8, maxWidth: '52ch', marginBottom: 'var(--space-6)' }}>
              Four years running operations for C-suite executives. Nights spent building software
              with Next.js, Supabase, and Claude. The instincts from one keep the other honest.
            </p>
          </Reveal>

          <Reveal delay={170}>
            <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'baseline', marginBottom: 'var(--space-8)' }}>
              <a href="#writing" style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--accent)', textDecoration: 'none', letterSpacing: '-0.01em', transition: 'color 0.15s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent-hi)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
              >Read the writing →</a>
              <a href="#work" style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '-0.01em', transition: 'color 0.15s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
              >See the work</a>
            </div>
          </Reveal>

          {/* Now strip */}
          <Reveal delay={210}>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--border)' }}>
              <span className="label" style={{ color: 'var(--text-muted)' }}>Now</span>
              <span style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: 14, color: 'var(--text-mid)' }}>
                Building Relay · Looking for EA roles · Open to collaboration
              </span>
            </div>
          </Reveal>
        </section>

        {/* ── Writing ── */}
        <section id="writing" style={{ paddingBottom: 'var(--space-9)' }}>
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1 }}>
                Writing
              </h2>
              <a href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
              >All posts →</a>
            </div>
          </Reveal>

          {POSTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 60}>
              <a href={post.href} className="post-row">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', paddingTop: 3 }}>
                  {post.date}
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 5 }}>
                    {post.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '55ch' }}>
                    {post.excerpt}
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--text-muted)', paddingTop: 1 }}>→</span>
              </a>
            </Reveal>
          ))}
        </section>

        {/* ── Work ── */}
        <section id="work" style={{ paddingBottom: 'var(--space-9)' }}>
          <Reveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 'var(--space-6)' }}>
              Work
            </h2>
          </Reveal>

          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <a href={p.href} className="project-entry">
                {/* Left */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
                      {p.name}
                    </span>
                    <span className={`badge badge-${p.status.toLowerCase()}`}>{p.status}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                      {p.year}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.65, maxWidth: '52ch', marginBottom: 10 }}>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.stack.map(s => (
                      <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', border: '1px solid var(--border-hi)', padding: '2px 7px', borderRadius: 3 }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Arrow */}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--text-muted)', paddingTop: 2 }}>→</span>
              </a>
            </Reveal>
          ))}
        </section>

        {/* ── About ── */}
        <section id="about" style={{ paddingBottom: 'var(--space-9)' }}>
          <Reveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 'var(--space-6)' }}>
              About
            </h2>
          </Reveal>

          <Reveal delay={60}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 'var(--space-8)', alignItems: 'start' }}>
              {/* Prose */}
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: 'var(--space-5)', maxWidth: '52ch' }}>
                  By day, Tarun manages calendars, correspondence, and operational follow-through
                  for senior executives — the kind of work where precision and discretion matter more
                  than speed.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.85, maxWidth: '52ch' }}>
                  By night, he turns those same instincts into software. The bias for maintainable
                  structure, clear communication, and closing loops translates surprisingly well
                  to Next.js, Supabase, and Claude.
                </p>
              </div>
              {/* Quick facts */}
              <div style={{ paddingTop: 4 }}>
                {[
                  ['Role',    'EA + Solo Builder'],
                  ['Stack',   'Next.js / Supabase'],
                  ['Based',   'Hyderabad, IN'],
                  ['Status',  'Open to work'],
                ].map(([k, v]) => (
                  <div key={k} style={{ paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 3 }}>{k}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Capabilities */}
          <Reveal delay={100} style={{ marginTop: 'var(--space-7)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)' }}>
              {[
                { label: 'Support', body: 'Calendar judgment, crisp comms, meeting flow. Signal over noise.' },
                { label: 'Build',   body: 'Next.js interfaces, Supabase backends, Claude-powered workflows.' },
                { label: 'Systems', body: 'Audit prompts, repeatable checklists, structured processes.' },
              ].map(c => (
                <div key={c.label} className="cap-col">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{c.label}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Tools ── */}
        <section id="tools" style={{ paddingBottom: 'var(--space-9)' }}>
          <Reveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 'var(--space-6)' }}>
              Tools
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2) var(--space-8)' }}>
              {TOOLS.flat().map((tool, i) => (
                <div key={tool} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, opacity: 0.7 }} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--text-mid)', letterSpacing: '-0.01em' }}>{tool}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Contact ── */}
        <section id="contact" style={{ paddingBottom: 'var(--space-10)' }}>
          <hr className="rule" style={{ marginBottom: 'var(--space-8)' }} />
          <Reveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.035em', lineHeight: 0.95, marginBottom: 'var(--space-6)', maxWidth: '10ch' }}>
              Let&apos;s work.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '44ch', marginBottom: 'var(--space-6)' }}>
              Open to EA roles, consulting, and collaboration on interesting systems.
              Always happy to talk shop.
            </p>
            <a href="mailto:mail2tarun.30@gmail.com" style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--accent)', textDecoration: 'none', letterSpacing: '-0.02em', display: 'inline-block', marginBottom: 'var(--space-7)', borderBottom: '1px solid var(--accent-border)', paddingBottom: 2, transition: 'color 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent-hi)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
            >
              mail2tarun.30@gmail.com
            </a>
            <div style={{ display: 'flex', gap: 'var(--space-7)', marginBottom: 'var(--space-8)' }}>
              {[
                { label: 'X / Twitter', href: 'https://x.com/' },
                { label: 'GitHub',      href: 'https://github.com/Tarun2030' },
                { label: 'LinkedIn',    href: 'https://linkedin.com/in/' },
              ].map(s => (
                <a key={s.label} href={s.href} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                >{s.label}</a>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', opacity: 0.5 }}>
              Built by Tarun · Next.js · Vercel · 2026
            </p>
          </Reveal>
        </section>

      </main>
    </>
  )
}
