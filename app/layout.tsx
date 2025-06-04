import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Zeina Zahoori',
  description: 'Portfolio website showcasing my work and experience',
  icons: {
    icon: '/assets/zeina_logo.png',
    shortcut: '/assets/zeina_logo.png',
    apple: '/assets/zeina_logo.png',
  },
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-transparent">
      <body suppressHydrationWarning className="bg-transparent">
        <main className="relative">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
