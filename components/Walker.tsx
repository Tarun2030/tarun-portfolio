'use client'

import { useEffect, useRef, useState } from 'react'

type WalkerState = 'waving' | 'walking' | 'running' | 'idle'

export default function Walker() {
  const [state, setState] = useState<WalkerState>('waving')
  const [xPercent, setXPercent] = useState(2)
  const [facingRight, setFacingRight] = useState(true)

  const lastScrollY   = useRef(0)
  const lastScrollMs  = useRef(performance.now())
  const idleTimer     = useRef<ReturnType<typeof setTimeout>>()
  const wavingDone    = useRef(false)

  useEffect(() => {
    const waveTimer = setTimeout(() => {
      wavingDone.current = true
      setState('idle')
    }, 2200)

    const onScroll = () => {
      if (!wavingDone.current) return

      const now   = performance.now()
      const dy    = window.scrollY - lastScrollY.current
      const dt    = Math.max(now - lastScrollMs.current, 16)
      const vel   = Math.abs(dy) / dt

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress  = maxScroll > 0 ? window.scrollY / maxScroll : 0
      // clamp between 2vw and 90vw so character never clips the edge
      setXPercent(2 + progress * 88)

      if (dy > 0) setFacingRight(true)
      else if (dy < 0) setFacingRight(false)

      clearTimeout(idleTimer.current)

      if (vel > 0.9)      setState('running')
      else if (vel > 0.1) setState('walking')

      idleTimer.current = setTimeout(() => setState('idle'), 700)

      lastScrollY.current  = window.scrollY
      lastScrollMs.current = now
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(waveTimer)
      clearTimeout(idleTimer.current)
    }
  }, [])

  return (
    <div className="ground-strip" aria-hidden>
      <div className="ground-line" />
      <div
        className="walker-char"
        data-state={state}
        style={{
          left: `${xPercent}vw`,
          transform: `translateX(-50%) scaleX(${facingRight ? 1 : -1})`,
        }}
      >
        <WalkerSVG />
      </div>
    </div>
  )
}

function WalkerSVG() {
  return (
    <svg viewBox="0 0 32 50" width="36" height="50" style={{ overflow: 'visible', color: 'var(--ink)' }}>
      {/* Ground shadow */}
      <ellipse cx="16" cy="50" rx="10" ry="2.5" fill="var(--ink)" opacity="0.12" />

      {/* Left leg — pivots from top-center of leg */}
      <g className="walker-leg-l" style={{ transformOrigin: '13px 33px' }}>
        <rect x="10" y="33" width="6" height="14" rx="3" fill="var(--ink)" />
      </g>

      {/* Right leg */}
      <g className="walker-leg-r" style={{ transformOrigin: '19px 33px' }}>
        <rect x="16" y="33" width="6" height="14" rx="3" fill="var(--ink)" />
      </g>

      {/* Left arm — pivots from shoulder */}
      <g className="walker-arm-l" style={{ transformOrigin: '7px 20px' }}>
        <rect x="3" y="20" width="5" height="12" rx="2.5" fill="var(--ink)" />
      </g>

      {/* Right arm */}
      <g className="walker-arm-r" style={{ transformOrigin: '25px 20px' }}>
        <rect x="24" y="20" width="5" height="12" rx="2.5" fill="var(--ink)" />
      </g>

      {/* Torso */}
      <rect x="9" y="18" width="14" height="17" rx="4" fill="var(--ink)" />

      {/* Amber scarf */}
      <rect x="9" y="17" width="14" height="5" rx="2.5" fill="var(--amber)" />

      {/* Head */}
      <circle cx="16" cy="10" r="9" fill="var(--ink)" />

      {/* Eyes */}
      <circle cx="12.5" cy="9"  r="1.5" fill="var(--bg)" />
      <circle cx="19.5" cy="9"  r="1.5" fill="var(--bg)" />

      {/* Smile */}
      <path d="M 11 13 Q 16 17 21 13" stroke="var(--bg)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
