import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GEAR ADDICTION AI',
  description: 'STYLE WORKS GARAGE gear diagnosis AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
