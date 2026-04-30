'use client'

import { useEffect, useRef } from 'react'

const DOT_SIZE   = 6
const RING_BASE  = 38
const RING_HOVER = 66

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  // Mouse position (instant)
  const mx = useRef(0)
  const my = useRef(0)
  // Ring position (lerped)
  const rx = useRef(0)
  const ry = useRef(0)
  // Ring size (lerped for smooth hover expand)
  const rs = useRef(RING_BASE)

  const isHover   = useRef(false)
  const activated = useRef(false)
  const raf       = useRef<number>()

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.current = e.clientX
      my.current = e.clientY

      if (!activated.current) {
        activated.current = true
        // Jump ring to mouse immediately so it doesn't sweep from (0,0)
        rx.current = e.clientX
        ry.current = e.clientY
        document.documentElement.classList.add('cursor-active')
      }
    }

    const leave = () =>
      document.documentElement.classList.remove('cursor-active')

    const over = (e: PointerEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"]'))
        isHover.current = true
    }
    const out = (e: PointerEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"]'))
        isHover.current = false
    }

    const tick = () => {
      // Lerp ring position
      rx.current += (mx.current - rx.current) * 0.11
      ry.current += (my.current - ry.current) * 0.11

      // Lerp ring size (smooth expand/contract on hover)
      const targetSize = isHover.current ? RING_HOVER : RING_BASE
      rs.current += (targetSize - rs.current) * 0.15

      const halfDot  = DOT_SIZE / 2
      const halfRing = rs.current / 2

      if (dot.current)
        dot.current.style.transform =
          `translate(${mx.current - halfDot}px, ${my.current - halfDot}px)`

      if (ring.current) {
        ring.current.style.width     = `${rs.current}px`
        ring.current.style.height    = `${rs.current}px`
        ring.current.style.transform =
          `translate(${rx.current - halfRing}px, ${ry.current - halfRing}px)`
        ring.current.style.opacity   = isHover.current ? '0.15' : '0.38'
      }

      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('pointerover', over as EventListener)
    document.addEventListener('pointerout',  out  as EventListener)
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('pointerover', over as EventListener)
      document.removeEventListener('pointerout',  out  as EventListener)
      cancelAnimationFrame(raf.current!)
    }
  }, [])

  return (
    <>
      <div ref={dot}  className="c-dot"  aria-hidden />
      <div ref={ring} className="c-ring" aria-hidden />
    </>
  )
}
