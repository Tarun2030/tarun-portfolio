'use client'

import { useEffect, useRef } from 'react'

// ── 3D tilt ───────────────────────────────────────────────────────────────────
function useTilt(strength = 10) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width  - 0.5
      const y = (e.clientY - r.top)  / r.height - 0.5
      el.style.transform = `perspective(900px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(10px)`
    }
    const onLeave = () => { el.style.transform = '' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [strength])
  return ref
}

// ── Reveal ────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); obs.disconnect() } }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</div>
}

// ── Data ──────────────────────────────────────────────────────────────────────
const POSTS = [
  {
    date: "Apr '26",
    cat: 'Process',
    title: 'How I open an AI build session without losing the plot',
    excerpt: 'A compact ritual for turning messy intent into a clear first commit — constraints visible from the start.',
    href: '#',
  },
  {
    date: "Mar '26",
    cat: 'Ops',
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
    desc: 'Prompt-driven kit for finding weak copy, brittle UI states, and unclear workflows.',
    stack: ['Claude API', 'n8n', 'Linear'],
    href: '#',
  },
]

const TOOLS = ['Next.js', 'Supabase', 'Vercel', 'Claude API', 'TypeScript', 'Tailwind CSS', 'Cursor', 'n8n', 'Notion', 'Linear']

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="nav">
      <a href="#hero" style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.02em', marginRight: 8 }}>
        TS
      </a>
      <span style={{ width: 1, height: 20, background: 'var(--glass-border-hi)', display: 'inline-block' }} />
      {['Writing', 'Work', 'About'].map(l => (
        <a key={l} href={`#${l.toLowerCase()}`}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
        >{l}</a>
      ))}
      <a href="#contact"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--accent)', padding: '7px 16px', borderRadius: 100, textDecoration: 'none', transition: 'opacity 0.15s' }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
      >Open to work</a>
    </nav>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroTilt = useTilt(7)

  return (
    <>
      {/* Background blobs */}
      <div className="bg-mesh" aria-hidden>
        <div className="bg-mesh-bottom" />
      </div>

      <Nav />

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '0 var(--space-6)' }}>

        {/* ── Hero ── */}
        <section id="hero" style={{ paddingTop: 'calc(var(--space-10) + 48px)', paddingBottom: 'var(--space-9)' }}>

          <Reveal>
            <p className="label" style={{ marginBottom: 'var(--space-5)' }}>
              Executive Assistant · Builder · Hyderabad
            </p>
          </Reveal>

          <Reveal delay={60}>
            <div
              ref={heroTilt}
              style={{ display: 'inline-block', transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1)', willChange: 'transform', marginBottom: 'var(--space-6)' }}
            >
              {/* Glow behind headline */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: '-20px -40px',
                  background: 'radial-gradient(ellipse, oklch(72% 0.18 280 / 0.14) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                  pointerEvents: 'none',
                }} />
                <h1 style={{
                  position: 'relative',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(54px, 9vw, 108px)',
                  fontWeight: 900,
                  color: 'var(--text)',
                  lineHeight: 0.93,
                  letterSpacing: '-0.04em',
                  maxWidth: '9ch',
                }}>
                  The EA who ships code.
                </h1>
              </div>
            </div>
          </Reveal>

          <Reveal delay={130}>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 18, color: 'var(--text-mid)', lineHeight: 1.8, maxWidth: '50ch', marginBottom: 'var(--space-6)' }}>
              Four years running operations for C-suite executives. Nights spent building
              software with Next.js, Supabase, and Claude. The instincts from one keep the other honest.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
              <a href="#writing" style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--bg)', background: 'var(--accent)', padding: '12px 26px', borderRadius: 100, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'opacity 0.15s, transform 0.15s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '0.88'; el.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '1'; el.style.transform = '' }}
              >Read the writing →</a>
              <a href="#work" style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', padding: '12px 26px', borderRadius: 100, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'background 0.18s, transform 0.15s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'oklch(72% 0.18 280 / 0.18)'; el.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--accent-dim)'; el.style.transform = '' }}
              >See the work</a>
            </div>
          </Reveal>

          {/* Now strip */}
          <Reveal delay={230}>
            <div className="glass-card" style={{ display: 'inline-flex', gap: 'var(--space-4)', alignItems: 'center', padding: '10px 20px', borderRadius: 100 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', flexShrink: 0 }} />
              <span className="label" style={{ color: 'var(--text-muted)' }}>Now</span>
              <span style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: 13, color: 'var(--text-mid)' }}>
                Building Relay · Looking for EA roles · Open to collaboration
              </span>
            </div>
          </Reveal>
        </section>

        {/* ── Writing ── */}
        <section id="writing" style={{ paddingBottom: 'var(--space-9)' }}>
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>Writing</h2>
              <a href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
              >All posts →</a>
            </div>
          </Reveal>

          {POSTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 70}>
              <a href={post.href} className="post-row">
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>{post.date}</div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent-border)', background: 'var(--accent-dim)', padding: '2px 7px', borderRadius: 4 }}>{post.cat}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 5 }}>{post.title}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '52ch' }}>{post.excerpt}</div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--text-muted)' }}>→</span>
              </a>
            </Reveal>
          ))}
        </section>

        {/* ── Work ── */}
        <section id="work" style={{ paddingBottom: 'var(--space-9)' }}>
          <Reveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 'var(--space-6)' }}>Work</h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <a href={p.href} className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-5)', textDecoration: 'none', minHeight: 200 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.025em', marginBottom: 3 }}>{p.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{p.year}</div>
                    </div>
                    <span className={`badge badge-${p.status.toLowerCase()}`}>{p.status}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.65, flex: 1, marginBottom: 16 }}>{p.desc}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.stack.map(s => (
                      <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', border: '1px solid var(--glass-border-hi)', padding: '2px 7px', borderRadius: 4 }}>{s}</span>
                    ))}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" style={{ paddingBottom: 'var(--space-9)' }}>
          <Reveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 'var(--space-6)' }}>About</h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 'var(--space-7)', alignItems: 'start' }}>
            <Reveal>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: 'var(--space-4)', maxWidth: '50ch' }}>
                By day, Tarun manages calendars, correspondence, and operational follow-through for senior executives — the kind of work where precision matters more than speed.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.85, maxWidth: '50ch' }}>
                By night, he turns those instincts into software. The bias for maintainable structure and closing loops translates well to Next.js, Supabase, and Claude.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
                {[
                  ['Role',   'EA + Solo Builder'],
                  ['Stack',  'Next.js / Supabase'],
                  ['Based',  'Hyderabad, IN'],
                  ['Status', 'Open to work'],
                ].map(([k, v], i, arr) => (
                  <div key={k} style={{ paddingBottom: i < arr.length - 1 ? 'var(--space-3)' : 0, marginBottom: i < arr.length - 1 ? 'var(--space-3)' : 0, borderBottom: i < arr.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 3 }}>{k}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} style={{ marginTop: 'var(--space-6)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { label: 'Support', body: 'Calendar judgment, crisp comms, meeting flow. Signal over noise.' },
                { label: 'Build',   body: 'Next.js, Supabase, Vercel, Claude-powered automation with intent.' },
                { label: 'Systems', body: 'Audit prompts, repeatable checklists, workflows that stay useful.' },
              ].map(c => (
                <div key={c.label} className="cap-col">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>{c.label}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Tools ── */}
        <section id="tools" style={{ paddingBottom: 'var(--space-9)' }}>
          <Reveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 'var(--space-6)' }}>Tools</h2>
          </Reveal>
          <Reveal delay={60}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {TOOLS.map(t => <span key={t} className="tool-pill">{t}</span>)}
            </div>
          </Reveal>
        </section>

        {/* ── Contact ── */}
        <section id="contact" style={{ paddingBottom: 'var(--space-10)' }}>
          <hr className="rule" style={{ marginBottom: 'var(--space-8)' }} />
          <Reveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.04em', lineHeight: 0.93, marginBottom: 'var(--space-6)', maxWidth: '9ch' }}>
              Let&apos;s work.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '42ch', marginBottom: 'var(--space-6)' }}>
              Open to EA roles, consulting, and collaboration on interesting systems. Always happy to talk shop.
            </p>
            <a href="mailto:mail2tarun.30@gmail.com"
              style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--accent)', textDecoration: 'none', letterSpacing: '-0.02em', display: 'inline-block', marginBottom: 'var(--space-7)', transition: 'color 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent-hi)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
            >mail2tarun.30@gmail.com</a>
            <div style={{ display: 'flex', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
              {[{ label: 'X / Twitter', href: 'https://x.com/' }, { label: 'GitHub', href: 'https://github.com/Tarun2030' }, { label: 'LinkedIn', href: 'https://linkedin.com/in/' }].map(s => (
                <a key={s.label} href={s.href}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                >{s.label}</a>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', opacity: 0.45 }}>
              Built by Tarun · Next.js · Vercel · 2026
            </p>
          </Reveal>
        </section>

      </main>
    </>
  )
}
