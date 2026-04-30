'use client'
import { useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'

function generateDripPath(
  w: number,
  h: number,
  phase: 'hidden' | 'covered'
): string {
  if (phase === 'hidden') {
    // Zero-height strip well above the viewport
    return `M 0,-40 L ${w},-40 L ${w},-40 L 0,-40 Z`
  }

  // Fills from top down with irregular drip teeth along the bottom edge.
  // Path: top-left → bottom-left → sweep L→R across bottom with Q curves → bottom-right → top-right → close
  const dripDepths = [24, 38, 18, 44, 28, 36, 20, 32]
  const numSegments = 8

  // Start top-left, go down left side to bottom-left
  let path = `M 0,-40 L 0,${h}`

  for (let i = 0; i < numSegments; i++) {
    const x     = (w * i)       / numSegments
    const nextX = (w * (i + 1)) / numSegments
    const cpx   = (x + nextX)   / 2
    const depth = dripDepths[i]
    path += ` Q ${cpx},${h + depth} ${nextX},${h}`
  }

  // Up the right side and close
  path += ` L ${w},-40 Z`
  return path
}

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const hasMountedRef = useRef(false)

  useEffect(() => {
    const handleNavBefore = (event: Event) => {
      const customEvent = event as CustomEvent<string>
      const href = customEvent.detail

      if (!overlayRef.current) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(href)
        return
      }

      const w = window.innerWidth
      const h = window.innerHeight

      const overlay = overlayRef.current
      overlay.style.clipPath = generateDripPath(w, h, 'hidden')
      overlay.style.pointerEvents = 'auto'

      const animation = overlay.animate(
        [
          { clipPath: generateDripPath(w, h, 'hidden') },
          { clipPath: generateDripPath(w, h, 'covered') }
        ],
        {
          duration: 350,
          easing: 'cubic-bezier(0.65,0,0.35,1)',
          fill: 'forwards'
        }
      )

      animation.finished.then(() => {
        router.push(href)
      })
    }

    window.addEventListener('nav:before', handleNavBefore)

    return () => {
      window.removeEventListener('nav:before', handleNavBefore)
    }
  }, [router])

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }

    if (!overlayRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const w = window.innerWidth
    const h = window.innerHeight

    const overlay = overlayRef.current

    const animation = overlay.animate(
      [
        { clipPath: generateDripPath(w, h, 'covered') },
        { clipPath: generateDripPath(w, h, 'hidden') }
      ],
      {
        duration: 450,
        easing: 'cubic-bezier(0.16,1,0.3,1)',
        fill: 'forwards'
      }
    )

    animation.finished.then(() => {
      overlay.style.pointerEvents = 'none'
    })
  }, [pathname])

  return (
    <div
      ref={overlayRef}
      className="page-transition"
      aria-hidden
      style={{
        clipPath: 'inset(0 0 100% 0)',
        pointerEvents: 'none'
      }}
    />
  )
}
