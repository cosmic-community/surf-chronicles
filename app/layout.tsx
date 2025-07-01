import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Surf Chronicles',
  description: 'A modern surf blog showcasing destinations, gear reviews, and techniques from professional surfers and photographers.',
  keywords: 'surfing, surf blog, destinations, gear reviews, techniques, ocean, waves',
  openGraph: {
    title: 'Surf Chronicles',
    description: 'A modern surf blog showcasing destinations, gear reviews, and techniques from professional surfers and photographers.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surf Chronicles',
    description: 'A modern surf blog showcasing destinations, gear reviews, and techniques from professional surfers and photographers.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}