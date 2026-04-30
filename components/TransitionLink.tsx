'use client'
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'

interface TransitionLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
}

export default function TransitionLink({
  href,
  children,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return
    }

    if (href.startsWith('http') || href.startsWith('https')) {
      return
    }

    if (href.startsWith('#')) {
      return
    }

    e.preventDefault()
    window.dispatchEvent(
      new CustomEvent('nav:before', { detail: href })
    )
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
