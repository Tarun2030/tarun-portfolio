'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let rs = 36
    let hover = false
    let raf = 0

    let visible = false
    const move  = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (!visible) {
        visible = true
        rx = e.clientX; ry = e.clientY   // jump ring to mouse on first move
        if (dot.current)  dot.current.style.opacity  = '1'
        if (ring.current) ring.current.style.opacity = '1'
      }
    }
    const over  = (e: Event) => {
      hover = !!(e.target as Element).closest?.('a, button, [role="button"]')
    }
    const hide  = () => {
      if (dot.current)  dot.current.style.opacity  = '0'
      if (ring.current) ring.current.style.opacity = '0'
    }
    const show  = () => {
      if (visible) {
        if (dot.current)  dot.current.style.opacity  = '1'
        if (ring.current) ring.current.style.opacity = '1'
      }
    }

    const tick = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      rs += ((hover ? 60 : 36) - rs) * 0.18

      if (dot.current)
        dot.current.style.transform = `translate3d(${mx - 2.5}px,${my - 2.5}px,0)`

      if (ring.current) {
        ring.current.style.width     = `${rs}px`
        ring.current.style.height    = `${rs}px`
        ring.current.style.transform = `translate3d(${rx - rs / 2}px,${ry - rs / 2}px,0)`
      }
      raf = requestAnimationFrame(tick)
    }

    document.documentElement.classList.add('has-cursor')
    window.addEventListener('mousemove',   move,  { passive: true })
    window.addEventListener('mouseover',   over,  { passive: true })
    document.addEventListener('mouseenter', show)
    document.addEventListener('mouseleave', hide)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove',   move)
      window.removeEventListener('mouseover',   over)
      document.removeEventListener('mouseenter', show)
      document.removeEventListener('mouseleave', hide)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dot}  className="c-dot"  aria-hidden="true" />
      <div ref={ring} className="c-ring" aria-hidden="true" />
    </>
  )
}
