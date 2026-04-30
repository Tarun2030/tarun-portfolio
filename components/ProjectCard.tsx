'use client'

import { useRef } from 'react'

interface Project {
  name: string
  year: string
  href: string
  status: 'LIVE' | 'WIP' | 'ARCH'
  desc: string
  stack: string[]
}

export default function ProjectCard({ p }: { p: Project }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const rafId = useRef<number>()
  const rect = useRef<DOMRect | null>(null)

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return

        rect.current = el.getBoundingClientRect()
        const { left, top, width, height } = rect.current

        // Normalized cursor position within card (-1 to 1)
        const nx = ((e.clientX - left) / width) * 2 - 1
        const ny = ((e.clientY - top) / height) * 2 - 1

        // Apply tilt to card
        el.style.transform = `rotateX(${(-ny * 2.5).toFixed(2)}deg) rotateY(${(nx * 3).toFixed(2)}deg)`

        // Apply parallax to each depth child
        el.querySelectorAll('[data-depth]').forEach((child) => {
          const d = parseFloat((child as HTMLElement).dataset.depth || '0')
          ;(child as HTMLElement).style.transform = `translate3d(${(nx * d * 6).toFixed(2)}px, ${(ny * d * 6).toFixed(2)}px, 0)`
        })

        rafId.current = undefined
      })
    }
  }

  const onLeave = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
      rafId.current = undefined
    }

    const el = ref.current
    if (el) {
      el.style.transform = ''
      el.querySelectorAll('[data-depth]').forEach((child) => {
        ;(child as HTMLElement).style.transform = ''
      })
    }
  }

  return (
    <a
      ref={ref}
      href={p.href}
      className="project-card project-card--tilt"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ willChange: 'transform' }}
    >
      {/* Header with name, year, arrow, badge */}
      <div data-depth="1.4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div className="t-heading" style={{ fontSize: 21, marginBottom: 3 }}>{p.name}</div>
          <div className="t-label" style={{ color: 'var(--text-muted)' }}>{p.year}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="card-arrow t-body" style={{ fontSize: 18 }}>→</span>
          <span className={`badge badge-${p.status.toLowerCase()}`}>{p.status}</span>
        </div>
      </div>

      {/* Description */}
      <p
        data-depth="0.6"
        className="t-body"
        style={{ fontSize: 13, color: 'var(--text-mid)', flex: 1, marginBottom: 16 }}
      >
        {p.desc}
      </p>

      {/* Stack tags */}
      <div data-depth="1.0" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {p.stack.map((s) => (
          <span key={s} className="t-label stack-tag">
            {s}
          </span>
        ))}
      </div>
    </a>
  )
}
