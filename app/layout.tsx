import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Surf Chronicles',
  description: 'A modern surf blog showcasing destinations, gear reviews, and techniques from professional surfers and photographers.',
  keywords: 'surfing, surf blog, destinations, gear reviews, techniques, ocean, waves',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏄</text></svg>',
  },
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}