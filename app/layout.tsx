import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Tarun Sharma | Engineered Operations',
  description:
    'Merging 4+ years of C-suite executive support with full-stack engineering. Transitioning from manual, cross-border logistics to architecting platforms that automate the grind.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative">
        {children}
      </body>
    </html>
  )
}
