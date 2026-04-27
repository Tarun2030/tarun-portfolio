import type { Metadata } from 'next'
import { Darker_Grotesque, Literata, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const darkerGrotesque = Darker_Grotesque({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
})

const literata = Literata({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Tarun Sharma — EA & Builder, Raipur',
  description:
    'EA at a manufacturing company in Raipur. Building tools I wish existed — with Next.js, Supabase, and Claude.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${darkerGrotesque.variable} ${literata.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
