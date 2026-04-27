'use client'
import { useState } from 'react'
import Link from 'next/link'

const navLinks = ['About', 'Work', 'Tools', 'Writing', 'Contact']

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(8,8,8,0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-hi)',
      padding: '0 28px',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        gap: '18px',
      }}>
        {/* Logo */}
        <Link href="#about" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 700,
          color: 'var(--accent)',
          letterSpacing: '0.06em',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}>{"// TARUN"}</Link>

        {/* Nav — desktop */}
        <nav style={{ display: 'flex', gap: '28px' }} className="desktop-nav">
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="mobile-menu-button badge"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(current => !current)}
          style={{ cursor: 'pointer' }}
        >
          Menu
        </button>

        {/* CTA */}
        <a
          href="#contact"
          className="badge"
          style={{ textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          Open to Work →
        </a>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 0 16px',
            display: 'grid',
            gap: '10px',
          }}
        >
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                textDecoration: 'none',
              }}
            >
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
