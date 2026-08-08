import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import Preloader from '@/components/Preloader'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Adi Wijaya — Creative Developer',
  description:
    'Creative Developer yang membangun website interaktif dan modern dengan React, Next.js, GSAP, Lenis, Laravel, dan Flutter.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Preloader />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
