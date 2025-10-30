import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ApolloWrapper } from '@/lib/apollo-client'
import { AuthProvider } from '@/lib/AuthContext'
import { PortfolioProvider } from '@/lib/PortfolioContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio Builder - Create Your Professional Portfolio',
  description: 'Build a stunning portfolio website in minutes with pre-built templates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <AuthProvider>
            <PortfolioProvider>
              {children}
            </PortfolioProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
