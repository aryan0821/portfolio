import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Aryan Nair',
  description: 'Machine Learning Engineer portfolio showcasing AI systems and technical expertise',
  icons: {
    icon: '/assets/aryan_logo.png',
    shortcut: '/assets/aryan_logo.png',
    apple: '/assets/aryan_logo.png',
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
