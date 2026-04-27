import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Tarun Sharma — EA & Builder',
  description:
    '4+ years of C-suite executive support meets full-stack engineering. Building quiet systems with Next.js, Supabase, and Claude.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}
    >
      <body className="antialiased font-sans relative">
        {children}
      </body>
    </html>
  )
}
