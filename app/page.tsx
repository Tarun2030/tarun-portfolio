'use client'

import { useEffect, useRef, useState } from 'react'
import Walker from '@/components/Walker'

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────

function useScrollParallax(factor = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf: number
    const tick = () => {
      if (ref.current) ref.current.style.transform = `translateY(${window.scrollY * factor}px)`
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [factor])
  return ref
}

function useHeroScroll() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf: number
    const tick = () => {
      if (!ref.current) return
      const p = Math.min(window.scrollY / 520, 1)
      ref.current.style.opacity = String(1 - p * 0.6)
      ref.current.style.transform = `translateY(${p * -36}px)`
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])
  return ref
}

function useTilt(strength = 10) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
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

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
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
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</div>
}

// Count-up: animates from 0 to `to` when scrolled into view
function CountUp({ to, suffix = '', prefix = '', duration = 1600 }: { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 4)
        setVal(Math.round(ease * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration])
  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

// Section heading — Darker Grotesque 900, with amber level-load bar on entry
function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  const ref    = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el  = ref.current
    const bar = barRef.current
    if (!el || !bar) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in')
          bar.classList.add('loaded')
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="reveal" style={{ position: 'relative', paddingBottom: 8, marginBottom: 'var(--space-6)' }}>
      <h2 id={id} className="t-heading" style={{ fontSize: 'clamp(28px,4vw,42px)' }}>
        {children}
      </h2>
      <div ref={barRef} className="level-load-bar" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 4,  suffix: ' yrs', label: 'as executive assistant' },
  { value: 3,  suffix: '',     label: 'tools shipped' },
  { value: 2,  suffix: '',     label: 'companies run ops for' },
  { value: 100, suffix: '%',   label: 'built from real friction' },
]

const PROCESS = [
  {
    n: '01',
    title: 'Find the friction',
    body: "I run operations for a living. Every week I hit something broken — a handoff that slips, a follow-up that dies, a decision that can't be traced. I don't log it. I build around it.",
  },
  {
    n: '02',
    title: 'Build the smallest useful thing',
    body: "No roadmap. No user stories. Start with what I'd actually use tomorrow. Relay started as a single follow-up tracker. It became a tool because I used it every day and kept adding what I needed.",
  },
  {
    n: '03',
    title: 'Ship it and work with it',
    body: "I don't build for hypothetical users. I build for me. When it's live and I'm using it at work — that's when the real design work starts. The gap between v1 and useful is just usage.",
  },
]

const PROJECTS = [
  {
    name: 'Relay',
    year: '2026',
    status: 'LIVE' as const,
    desc: "An EA tool I built for myself first. Live at myrelay.space — handoffs, reminders, follow-through for everything that falls between other tools.",
    stack: ['Next.js', 'Supabase', 'Vercel'],
    href: 'https://myrelay.space',
  },
  {
    name: 'Portfolio OS',
    year: '2026',
    status: 'LIVE' as const,
    desc: "Where I document what I'm building and thinking. You're looking at it.",
    stack: ['TypeScript', 'Tailwind', 'Notion'],
    href: '#',
  },
  {
    name: 'Audit Arsenal',
    year: '2025',
    status: 'LIVE' as const,
    desc: "A prompt kit for reviewing copy and UI the way an operator would — from the outside, looking for what breaks.",
    stack: ['Claude API', 'n8n', 'Linear'],
    href: '#',
  },
]

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

const HARD_SKILLS = ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Vercel', 'Claude API', 'n8n']
const SOFT_SKILLS = ['Executive Support', 'Ops Design', 'Stakeholder Management', 'Process Systems', 'Cross-functional Coordination']

// ─────────────────────────────────────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="nav">
      <a href="#hero" className="t-heading" style={{ fontSize: 16, color: 'var(--text)', textDecoration: 'none', marginRight: 8 }}>
        TS
      </a>
      <span className="nav-divider" style={{ width: 1, height: 20, background: 'var(--glass-border-hi)', display: 'inline-block' }} />
      {['Writing', 'Work', 'About'].map(l => (
        <a key={l} href={`#${l.toLowerCase()}`} className="nav-links t-label"
          style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
        >{l}</a>
      ))}
      <a href="#contact" className="t-label"
        style={{ color: 'var(--bg)', background: 'var(--accent)', padding: '7px 16px', borderRadius: 100, textDecoration: 'none', transition: 'opacity 0.15s' }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
      >Get in touch</a>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const heroTilt      = useTilt(7)
  const photoParallax = useScrollParallax(0.12)
  const heroFade      = useHeroScroll()

  return (
    <>
      <div className="scroll-progress" aria-hidden />
      <div className="bg-mesh" aria-hidden><div className="bg-mesh-bottom" /></div>
      <Nav />
      <Walker />

      <main className="main-wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '0 var(--space-6)', paddingBottom: 100 }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section id="hero" style={{ paddingTop: 'calc(var(--space-10) + 48px)', paddingBottom: '128px', position: 'relative' }}>

          {/* Photo */}
          <div ref={photoParallax} className="hero-photo" style={{
            position: 'absolute', top: 'calc(var(--space-10) + 20px)', right: '-40px',
            width: 'clamp(240px, 36vw, 420px)', height: 'clamp(300px, 48vw, 560px)',
            pointerEvents: 'none', zIndex: 0,
          }}>
            <img src="/tarun.jpg" alt="" style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block',
              filter: 'grayscale(12%) contrast(1.04) brightness(1.0)',
              maskImage: 'linear-gradient(to left, transparent 0%, black 35%), linear-gradient(to top, transparent 0%, black 28%)',
              WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 35%), linear-gradient(to top, transparent 0%, black 28%)',
              maskComposite: 'intersect', WebkitMaskComposite: 'source-in',
              animation: 'hero-float 5s ease-in-out infinite',
            }} />
          </div>

          {/* Text */}
          <div ref={heroFade} style={{ position: 'relative', zIndex: 1, willChange: 'transform, opacity' }}>
            <Reveal>
              <p className="t-label" style={{ marginBottom: 'var(--space-5)', color: 'var(--amber)' }}>
                EA · Builder · Raipur, C.G.
              </p>
            </Reveal>

            <Reveal delay={60}>
              <div ref={heroTilt} style={{ display: 'inline-block', transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1)', willChange: 'transform', marginBottom: 'var(--space-6)' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', inset: '-20px -40px',
                    background: 'radial-gradient(ellipse, oklch(58% 0.16 65 / 0.18) 0%, transparent 70%)',
                    filter: 'blur(24px)', pointerEvents: 'none',
                  }} />
                  <h1 className="t-display" style={{ position: 'relative', fontSize: 'clamp(68px, 11vw, 144px)', maxWidth: '13ch' }}>
                    I build what I wish existed.
                  </h1>
                </div>
              </div>
            </Reveal>

            <Reveal delay={130}>
              <p className="t-body" style={{ fontSize: 18, color: 'var(--text-mid)', maxWidth: '42ch', marginBottom: 'var(--space-6)' }}>
                EA by day, builder by night. I run operations at a manufacturing company in Raipur — and I ship tools that fix the gaps I find at work.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
                <a href="#work" className="btn-primary">See the work</a>
                <a href="#writing" className="btn-ghost">Read the writing →</a>
              </div>
            </Reveal>

            {/* Now strip */}
            <Reveal delay={230}>
              <div className="now-strip">
                <span className="now-dot" />
                <span className="t-label" style={{ color: 'var(--text-muted)' }}>Now</span>
                <span className="t-body" style={{ fontStyle: 'italic', fontSize: 13, color: 'var(--text-mid)' }}>
                  Building Relay — Live at myrelay.space · Raipur → wherever the work is
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <section style={{ paddingBottom: '128px' }}>
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="stat-block">
                  <div className="t-display stat-num">
                    <CountUp to={s.value} suffix={s.suffix} duration={1800} />
                  </div>
                  <div className="t-label stat-label">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Work ─────────────────────────────────────────────────────────── */}
        <section id="work" style={{ paddingBottom: '128px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-6)' }}>
            <SectionHeading>Work</SectionHeading>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, alignItems: 'stretch' }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80} style={{ display: 'flex' }}>
                <a href={p.href} className="project-card" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div className="t-heading" style={{ fontSize: 20, marginBottom: 3 }}>{p.name}</div>
                      <div className="t-label" style={{ color: 'var(--text-muted)' }}>{p.year}</div>
                    </div>
                    <span className={`badge badge-${p.status.toLowerCase()}`}>{p.status}</span>
                  </div>
                  <p className="t-body" style={{ fontSize: 13, color: 'var(--text-mid)', flex: 1, marginBottom: 16 }}>{p.desc}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.stack.map(s => (
                      <span key={s} className="t-label stack-tag">{s}</span>
                    ))}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── How I work ───────────────────────────────────────────────────── */}
        <section id="process" style={{ paddingBottom: '128px' }}>
          <SectionHeading>How I work</SectionHeading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {PROCESS.map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <div className="process-step">
                  <div className="process-n t-label">{step.n}</div>
                  <div className="process-body">
                    <h3 className="t-heading process-title">{step.title}</h3>
                    <p className="t-body process-text">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Writing ──────────────────────────────────────────────────────── */}
        <section id="writing" style={{ paddingBottom: '128px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-6)' }}>
            <SectionHeading>Writing</SectionHeading>
            <a href="#" className="t-label" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
            >All posts →</a>
          </div>

          {POSTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 70}>
              <a href={post.href} className="post-row">
                <div>
                  <div className="t-label" style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{post.date}</div>
                  <span className="t-label" style={{ color: 'var(--accent)', border: '1px solid var(--accent-border)', background: 'var(--accent-dim)', padding: '2px 7px', borderRadius: 4 }}>{post.cat}</span>
                </div>
                <div>
                  <div className="t-heading" style={{ fontSize: 17, marginBottom: 5 }}>{post.title}</div>
                  <div className="t-body" style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: '52ch' }}>{post.excerpt}</div>
                </div>
                <span className="t-body" style={{ fontSize: 18, color: 'var(--text-muted)' }}>→</span>
              </a>
            </Reveal>
          ))}
        </section>

        {/* ── Experience ───────────────────────────────────────────────────── */}
        <section id="experience" style={{ paddingBottom: '128px' }}>
          <SectionHeading>Experience</SectionHeading>
          <div className="exp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, alignItems: 'stretch' }}>
            {[
              { role: 'Executive Assistant', org: 'Shivalik Engineering Industries Ltd', period: '2024 – Present', note: 'Manufacturing & export. Calendar, execution, nothing slips.' },
              { role: 'Operations Head', org: 'Inseive Overseas', period: '2022 – 2024', note: 'Freelance. Built the ops layer from scratch — process, vendor, team.' },
            ].map((e, i) => (
              <Reveal key={e.org} delay={i * 70} style={{ display: 'flex' }}>
                <div className="project-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div className="t-label" style={{ color: 'var(--text-muted)' }}>{e.period}</div>
                  <div className="t-heading" style={{ fontSize: 18, lineHeight: 1.15 }}>{e.role}</div>
                  <div className="t-body" style={{ fontSize: 13, color: 'var(--accent)' }}>{e.org}</div>
                  <p className="t-body" style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 'auto' }}>{e.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── About ────────────────────────────────────────────────────────── */}
        <section id="about" style={{ paddingBottom: '128px' }}>
          <SectionHeading>About</SectionHeading>

          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 'var(--space-7)', alignItems: 'start' }}>
            <Reveal>
              <p className="t-body" style={{ fontSize: 16, color: 'var(--text-mid)', marginBottom: 'var(--space-4)', maxWidth: '50ch' }}>
                I&apos;m an EA at a manufacturing and export company in Raipur. The job is precise by necessity — if something&apos;s unclear, it costs someone time or money. Four years of that teaches you to think in systems before you reach for tools.
              </p>
              <p className="t-body" style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: '50ch' }}>
                I&apos;m not a trained engineer. I build what I need and learn what I don&apos;t know. Mostly at night. Mostly alone. Everything here started as a real problem I ran into at work.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="sidebar-card about-sidebar">
                {[
                  ['Role',  'EA + Solo Builder'],
                  ['Stack', 'Next.js / Supabase'],
                  ['Based', 'Raipur, C.G.'],
                ].map(([k, v], i, arr) => (
                  <div key={k} style={{ paddingBottom: i < arr.length - 1 ? 'var(--space-3)' : 0, marginBottom: i < arr.length - 1 ? 'var(--space-3)' : 0, borderBottom: i < arr.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                    <div className="t-label" style={{ color: 'var(--text-muted)', marginBottom: 3 }}>{k}</div>
                    <div className="t-heading" style={{ fontSize: 13 }}>{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} style={{ marginTop: 'var(--space-6)' }}>
            <div className="cap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { label: 'Operations', body: "Making things run smoothly for people who can't afford rough edges. That's the whole job." },
                { label: 'Building',   body: 'Small, useful software built from real operational friction — not hypothetical user stories.' },
                { label: 'Systems',    body: 'Thinking in checklists and repeatable flows before reaching for code. That order matters.' },
              ].map(c => (
                <div key={c.label} className="cap-col">
                  <div className="t-label" style={{ color: 'var(--accent)', marginBottom: 10 }}>{c.label}</div>
                  <p className="t-body" style={{ fontSize: 13, color: 'var(--text-muted)' }}>{c.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Tools ────────────────────────────────────────────────────────── */}
        <section id="tools" style={{ paddingBottom: '128px' }}>
          <SectionHeading>Tools</SectionHeading>
          <Reveal delay={60}>
            <div style={{ marginBottom: 16 }}>
              <div className="t-label" style={{ color: 'var(--text-muted)', marginBottom: 12 }}>Hard Skills</div>
              <div className="marquee-overflow">
                <div className="marquee-track">
                  {[...HARD_SKILLS, ...HARD_SKILLS].map((t, i) => (
                    <span key={i} className="tool-pill" style={{ marginRight: 8, flexShrink: 0 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div className="t-label" style={{ color: 'var(--text-muted)', marginBottom: 12 }}>Soft Skills</div>
              <div className="marquee-overflow">
                <div className="marquee-track-rev">
                  {[...SOFT_SKILLS, ...SOFT_SKILLS].map((t, i) => (
                    <span key={i} className="tool-pill" style={{ marginRight: 8, flexShrink: 0 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────────── */}
        <section id="contact" style={{ paddingBottom: 'var(--space-10)' }}>
          <hr className="rule" style={{ marginBottom: 'var(--space-8)' }} />
          <Reveal>
            <h2 className="t-display" style={{ fontSize: 'clamp(56px, 9vw, 120px)', marginBottom: 'var(--space-6)', maxWidth: '10ch' }}>
              Let&apos;s work.
            </h2>
            <p className="t-body" style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: '42ch', marginBottom: 'var(--space-6)' }}>
              If you need someone who can run your operations <em>and</em> think about your next tool — or if you just want to talk about what you&apos;re building — I&apos;m easy to reach.
            </p>
            <a href="mailto:mail2tarun.30@gmail.com" className="t-heading"
              style={{ fontSize: 22, color: 'var(--accent)', textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--space-7)', transition: 'color 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent-hi)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
            >mail2tarun.30@gmail.com</a>
            <div style={{ display: 'flex', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
              {[{ label: 'X / Twitter', href: 'https://x.com/' }, { label: 'GitHub', href: 'https://github.com/Tarun2030' }, { label: 'LinkedIn', href: 'https://linkedin.com/in/' }].map(s => (
                <a key={s.label} href={s.href} className="t-label"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                >{s.label}</a>
              ))}
            </div>
            <p className="t-label" style={{ color: 'var(--text-muted)', opacity: 0.45 }}>
              Built by me · Next.js · Vercel · 2026
            </p>
          </Reveal>
        </section>

      </main>
    </>
  )
}
