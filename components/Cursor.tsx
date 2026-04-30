'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const mx   = useRef(-400)
  const my   = useRef(-400)
  const rx   = useRef(-400)
  const ry   = useRef(-400)
  const raf  = useRef<number>()

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.current = e.clientX
      my.current = e.clientY
    }

    const over = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button'))
        ring.current?.setAttribute('data-hover', '')
    }
    const out = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button'))
        ring.current?.removeAttribute('data-hover')
    }

    const tick = () => {
      rx.current += (mx.current - rx.current) * 0.11
      ry.current += (my.current - ry.current) * 0.11
      if (dot.current)
        dot.current.style.transform = `translate(${mx.current}px,${my.current}px)`
      if (ring.current)
        ring.current.style.transform = `translate(${rx.current}px,${ry.current}px)`
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout',  out)
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout',  out)
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
