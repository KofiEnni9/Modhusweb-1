import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modhus - YouTube for AI Models',
  description: 'Discover, share, and deploy AI models. The user-facing Hugging Face platform for everyone.',
  keywords: ['AI', 'machine learning', 'AI models', 'Hugging Face', 'model sharing'],
  openGraph: {
    title: 'Modhus - YouTube for AI Models',
    description: 'Discover, share, and deploy AI models.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
