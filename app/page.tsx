'use client'

import { useEffect, useRef, useState } from 'react'

// ── Canvas background ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const dots: { x: number; y: number; vx: number; vy: number }[] = []
    const COUNT = 60

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < COUNT; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(129,140,248,0.25)'
        ctx.fill()
      })
      dots.forEach((a, i) => {
        dots.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(129,140,248,${0.06 * (1 - dist / 120)})`
            ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

// ── Typing terminal ────────────────────────────────────────────────────────────
const LINES = [
  '> whoami',
  'tarun sharma',
  '> cat role.txt',
  'EA by day. builder by night.',
  '> ls skills/',
  'next.js  supabase  claude-api  systems',
  '> echo $status',
  'open to work ✓',
]

function Terminal() {
  const [visible, setVisible] = useState<string[]>([])
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    let i = 0
    const tick = () => {
      if (i < LINES.length) {
        setVisible(v => [...v, LINES[i]])
        i++
        setTimeout(tick, i % 2 === 0 ? 180 : 600)
      }
    }
    setTimeout(tick, 400)
    const blink = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(blink)
  }, [])

  return (
    <div
      className="bento-card"
      style={{
        padding: '20px 24px',
        borderRadius: '12px',
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
        lineHeight: 1.8,
        minHeight: '220px',
      }}
    >
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
        {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
      </div>
      {visible.map((line, idx) => (
        <div
          key={idx}
          style={{
            color: line.startsWith('>') ? '#818cf8' : '#ededed',
            opacity: 0.9,
          }}
        >
          {line}
          {idx === visible.length - 1 && (
            <span style={{ opacity: cursor ? 1 : 0, color: '#818cf8' }}>█</span>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Reveal wrapper ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('active') },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    name: 'Relay',
    desc: 'A lightweight operating surface for handoffs, reminders, and clear executive follow-through.',
    stack: ['Next.js', 'Supabase', 'Vercel'],
    href: '#',
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

const TOOLS = [
  'Next.js', 'Supabase', 'Vercel', 'Claude API',
  'TypeScript', 'Tailwind CSS', 'Cursor', 'n8n', 'Notion', 'Linear',
]

const POSTS = [
  {
    date: '2026.04.22',
    category: 'Process',
    title: 'How I open an AI build session without losing the plot',
    excerpt: 'A compact ritual for turning messy intent into a clear first commit, with constraints visible from the start.',
    href: '#',
  },
  {
    date: '2026.03.28',
    category: 'Ops',
    title: 'Executive support is product thinking in a quieter room',
    excerpt: 'Notes on prioritisation, sharp communication, and why good assistants think in systems before software.',
    href: '#',
  },
]

const CAPABILITIES = [
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

// ── Nav ────────────────────────────────────────────────────────────────────────
function Nav() {
  const links = ['About', 'Work', 'Tools', 'Writing', 'Contact']

  return (
    <header
      className="glass-nav"
      style={{ position: 'sticky', top: 0, zIndex: 100, padding: '0 28px' }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
          gap: 18,
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 700,
            color: '#818cf8',
            letterSpacing: '0.06em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {'// TARUN'}
        </a>

        <nav style={{ display: 'flex', gap: 28 }}>
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(237,237,237,0.45)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ededed')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(237,237,237,0.45)')}
            >
              {l}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#818cf8',
            border: '1px solid rgba(129,140,248,0.3)',
            background: 'rgba(129,140,248,0.08)',
            padding: '7px 16px',
            borderRadius: 6,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Open to Work →
        </a>
      </div>
    </header>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Home() {
  const marqueeTools = [...TOOLS, ...TOOLS]

  return (
    <>
      <ParticleCanvas />
      <Nav />

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>

        {/* ── Hero ── */}
        <section id="hero" style={{ padding: '100px 0 80px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 360px',
              gap: 48,
              alignItems: 'start',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#818cf8',
                  border: '1px solid rgba(129,140,248,0.25)',
                  background: 'rgba(129,140,248,0.07)',
                  padding: '4px 12px',
                  borderRadius: 4,
                  marginBottom: 24,
                }}
              >
                Building in Public
              </div>

              <h1
                className="text-gradient"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(40px,6vw,72px)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  marginBottom: 28,
                }}
              >
                Executive<br />
                Assistant.<br />
                Builder.<br />
                Vibe-Coder.
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize: 16,
                  color: 'rgba(237,237,237,0.55)',
                  maxWidth: 480,
                  lineHeight: 1.75,
                  marginBottom: 36,
                }}
              >
                Tarun is an Executive Assistant by day and a solo builder by night,
                using AI with discipline across Next.js, Supabase, and Vercel. He
                builds in public with quiet systems, sharp prompts, and a craftsman&apos;s
                tolerance for detail.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a
                  href="#work"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#818cf8',
                    border: '1px solid rgba(129,140,248,0.35)',
                    background: 'rgba(129,140,248,0.1)',
                    padding: '10px 22px',
                    borderRadius: 6,
                    textDecoration: 'none',
                  }}
                >
                  See My Work →
                </a>
                <a
                  href="#writing"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(237,237,237,0.45)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'transparent',
                    padding: '10px 22px',
                    borderRadius: 6,
                    textDecoration: 'none',
                  }}
                >
                  Read Writing
                </a>
              </div>
            </div>

            <Terminal />
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" style={{ padding: '80px 0' }}>
          <Reveal>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#818cf8',
                border: '1px solid rgba(129,140,248,0.25)',
                background: 'rgba(129,140,248,0.07)',
                padding: '4px 12px',
                borderRadius: 4,
                marginBottom: 24,
              }}
            >
              What I Do
            </span>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64,
              alignItems: 'start',
              marginTop: 8,
            }}
          >
            <Reveal>
              <h2
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize: 'clamp(28px,3.5vw,44px)',
                  color: '#ededed',
                  lineHeight: 1.25,
                  marginBottom: 24,
                }}
              >
                Calm execution,<br />
                deliberate tools, and<br />
                systems that stay<br />
                useful.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize: 14,
                  color: 'rgba(237,237,237,0.5)',
                  lineHeight: 1.8,
                }}
              >
                Tarun sits at the overlap of executive operations and practical product building.
                The day job sharpens the instincts: prioritise clearly, write precisely, close loops.
                The night work turns those instincts into small software systems built with AI,
                Next.js, Supabase, and a bias for maintainable structure.
              </p>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CAPABILITIES.map((cap, i) => (
                <Reveal key={cap.badge} delay={i * 100}>
                  <div className="bento-card" style={{ padding: 22, borderRadius: 12 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#818cf8',
                        border: '1px solid rgba(129,140,248,0.25)',
                        background: 'rgba(129,140,248,0.07)',
                        padding: '3px 10px',
                        borderRadius: 4,
                        marginBottom: 12,
                      }}
                    >
                      {cap.badge}
                    </span>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#ededed',
                        marginBottom: 8,
                      }}
                    >
                      {cap.title}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 300,
                        fontSize: 13,
                        color: 'rgba(237,237,247,0.5)',
                        lineHeight: 1.7,
                      }}
                    >
                      {cap.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="work" style={{ padding: '80px 0' }}>
          <Reveal>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 40,
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#818cf8',
                    border: '1px solid rgba(129,140,248,0.25)',
                    background: 'rgba(129,140,248,0.07)',
                    padding: '4px 12px',
                    borderRadius: 4,
                    marginBottom: 12,
                  }}
                >
                  Selected Work
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#ededed',
                  }}
                >
                  {'// PROJECTS'}
                </h2>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize: 13,
                  color: 'rgba(237,237,237,0.45)',
                  maxWidth: 280,
                  lineHeight: 1.7,
                  textAlign: 'right',
                }}
              >
                Three compact systems designed to be small, legible, and useful
                before they&apos;re loud.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <a
                  href={p.href}
                  className="bento-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 24,
                    borderRadius: 12,
                    textDecoration: 'none',
                    minHeight: 200,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#ededed',
                      }}
                    >
                      {p.name}
                    </span>
                    <span style={{ color: '#818cf8', fontSize: 16 }}>→</span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 300,
                      fontSize: 13,
                      color: 'rgba(237,237,237,0.5)',
                      lineHeight: 1.7,
                      flex: 1,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
                    {p.stack.map(s => (
                      <span
                        key={s}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#818cf8',
                          border: '1px solid rgba(129,140,248,0.25)',
                          background: 'rgba(129,140,248,0.07)',
                          padding: '2px 8px',
                          borderRadius: 4,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Tools marquee ── */}
        <section id="tools" style={{ padding: '60px 0', overflow: 'hidden' }}>
          <Reveal>
            <div style={{ marginBottom: 24 }}>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#818cf8',
                  border: '1px solid rgba(129,140,248,0.25)',
                  background: 'rgba(129,140,248,0.07)',
                  padding: '4px 12px',
                  borderRadius: 4,
                  marginBottom: 12,
                }}
              >
                Daily Stack
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 32,
                  fontWeight: 700,
                  color: '#ededed',
                }}
              >
                {'// TOOLS'}
              </h2>
            </div>
          </Reveal>

          <div style={{ overflow: 'hidden', marginBottom: 12 }}>
            <div
              className="animate-marquee-left"
              style={{ display: 'flex', gap: 12, width: 'max-content' }}
            >
              {marqueeTools.map((t, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#818cf8',
                    border: '1px solid rgba(129,140,248,0.2)',
                    background: 'rgba(129,140,248,0.06)',
                    padding: '6px 16px',
                    borderRadius: 6,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <div
              className="animate-marquee-right"
              style={{ display: 'flex', gap: 12, width: 'max-content' }}
            >
              {[...marqueeTools].reverse().map((t, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(237,237,237,0.3)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '6px 16px',
                    borderRadius: 6,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Writing ── */}
        <section id="writing" style={{ padding: '80px 0' }}>
          <Reveal>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 32,
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#818cf8',
                    border: '1px solid rgba(129,140,248,0.25)',
                    background: 'rgba(129,140,248,0.07)',
                    padding: '4px 12px',
                    borderRadius: 4,
                    marginBottom: 12,
                  }}
                >
                  Notes
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#ededed',
                  }}
                >
                  {'// WRITING'}
                </h2>
              </div>
              <a
                href="#"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#818cf8',
                  textDecoration: 'none',
                }}
              >
                View All →
              </a>
            </div>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {POSTS.map((post, i) => (
              <Reveal key={post.title} delay={i * 80}>
                <a
                  href={post.href}
                  className="bento-card"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 80px 1fr',
                    gap: 24,
                    alignItems: 'start',
                    padding: '20px 24px',
                    borderRadius: 12,
                    textDecoration: 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'rgba(237,237,237,0.35)',
                      paddingTop: 2,
                    }}
                  >
                    {post.date}
                  </span>
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#818cf8',
                      border: '1px solid rgba(129,140,248,0.25)',
                      background: 'rgba(129,140,248,0.07)',
                      padding: '3px 10px',
                      borderRadius: 4,
                      alignSelf: 'start',
                    }}
                  >
                    {post.category}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#ededed',
                        marginBottom: 6,
                      }}
                    >
                      {post.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 300,
                        fontSize: 13,
                        color: 'rgba(237,237,237,0.45)',
                        lineHeight: 1.65,
                      }}
                    >
                      {post.excerpt}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Contact / Footer ── */}
        <section id="contact" style={{ padding: '80px 0 60px' }}>
          <Reveal>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#818cf8',
                border: '1px solid rgba(129,140,248,0.25)',
                background: 'rgba(129,140,248,0.07)',
                padding: '4px 12px',
                borderRadius: 4,
                marginBottom: 20,
              }}
            >
              Contact
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize: 'clamp(32px,5vw,60px)',
                color: '#ededed',
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Let&apos;s work together.
            </h2>
            <a
              href="mailto:mail2tarun.30@gmail.com"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 16,
                fontWeight: 600,
                color: '#818cf8',
                textDecoration: 'none',
                display: 'block',
                marginBottom: 40,
              }}
            >
              mail2tarun.30@gmail.com
            </a>

            <div style={{ display: 'flex', gap: 16, marginBottom: 60 }}>
              {[
                { label: 'X', href: 'https://x.com/' },
                { label: 'GH', href: 'https://github.com/Tarun2030' },
                { label: 'LI', href: 'https://linkedin.com/in/' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'rgba(237,237,237,0.4)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 6,
                    textDecoration: 'none',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#818cf8'
                    el.style.borderColor = 'rgba(129,140,248,0.4)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'rgba(237,237,237,0.4)'
                    el.style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: 24 }} />
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(237,237,237,0.25)',
              }}
            >
              Built by Tarun · Next.js · Deployed on Vercel
            </p>
          </Reveal>
        </section>

      </main>
    </>
  )
}
