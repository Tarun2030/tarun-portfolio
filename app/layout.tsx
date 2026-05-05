import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import Cursor from '@/components/Cursor'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mondwest-fallback',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tarun Sharma — EA & Builder, Raipur',
  description:
    'EA at a manufacturing company in Raipur. Building tools I wish existed — with Next.js, Supabase, and Claude.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfairDisplay.variable}>
      <body className="antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  )
}
