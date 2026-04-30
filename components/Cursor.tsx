'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const mx = useRef<number | null>(null)
  const my = useRef<number | null>(null)
  const rx = useRef(0)
  const ry = useRef(0)
  const raf = useRef<number>()
  const rafStarted = useRef(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      // Initialize on first mousemove
      if (mx.current === null) {
        mx.current = e.clientX
        my.current = e.clientY
        document.documentElement.classList.add('cursor-active')

        // Start rAF loop only after first mousemove
        if (!rafStarted.current) {
          rafStarted.current = true
          const tick = () => {
            if (mx.current !== null && my.current !== null) {
              rx.current += (mx.current - rx.current) * 0.11
              ry.current += (my.current - ry.current) * 0.11

              document.documentElement.style.setProperty('--cursor-x', `${mx.current}px`)
              document.documentElement.style.setProperty('--cursor-y', `${my.current}px`)
              document.documentElement.style.setProperty('--cursor-rx', `${rx.current}px`)
              document.documentElement.style.setProperty('--cursor-ry', `${ry.current}px`)
            }
            raf.current = requestAnimationFrame(tick)
          }
          raf.current = requestAnimationFrame(tick)
        }
      }

      mx.current = e.clientX
      my.current = e.clientY
    }

    const leave = () => {
      document.documentElement.classList.remove('cursor-active')
    }

    const over = (e: PointerEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"]')) {
        ring.current?.setAttribute('data-hover', '')
      }
    }

    const out = (e: PointerEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"]')) {
        ring.current?.removeAttribute('data-hover')
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dot}  className="c-dot"  aria-hidden />
      <div ref={ring} className="c-ring" aria-hidden />
    </>
  )
}
