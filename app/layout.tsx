import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
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
      </body>
    </html>
  )
}
