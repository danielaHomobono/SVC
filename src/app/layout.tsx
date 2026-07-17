import '../globals.css'
import React from 'react'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { Cormorant_Garamond, Plus_Jakarta_Sans, DM_Mono } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata = {
  title: 'SVC Amoblamientos — Carpintería Premium & Muebles a Medida | Río Tercero',
  description: 'Fabricación artesanal de amoblamientos premium en Río Tercero, Córdoba. Cocinas, vestidores, baños y comedores diseñados a tu medida.',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${cormorant.variable} ${plusJakarta.variable} ${dmMono.variable}`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
