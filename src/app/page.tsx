import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedGallerySection from '@/components/sections/FeaturedGallerySection'
import ServicesSection from '@/components/sections/ServicesSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ProcessSection from '@/components/sections/ProcessSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

// Disable static generation — this page needs to be rendered on the server/client
export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedGallerySection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
