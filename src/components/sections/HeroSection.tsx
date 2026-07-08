'use client'

import React, { useEffect, useRef } from 'react'
import { initGSAP } from '@/lib/gsapConfig'
import SplitText from '@/components/ui/SplitText'
import { BUSINESS, WHATSAPP_URL } from '@/lib/constants'

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { gsap } = initGSAP()
    if (!gsap) return
    
    const ctx = gsap.context(() => {
      const label = rootRef.current?.querySelector('.hero-label')
      const h1 = rootRef.current?.querySelectorAll('.hero-title .word')
      const desc = rootRef.current?.querySelector('.hero-desc')
      const ctas = rootRef.current?.querySelector('.hero-ctas')
      
      const tl = gsap.timeline()
      if (label) tl.from(label, { y: 20, opacity: 0, duration: 0.6 })
      if (h1 && h1.length > 0) tl.from(h1, { y: 40, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      if (desc) tl.from(desc, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      if (ctas) tl.from(ctas, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    }, rootRef)

    return () => ctx?.revert()
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center bg-void" ref={rootRef}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover object-[30%_center] md:object-center z-0"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        {/* Fallback image if video doesn't load */}
        <img
          src="/images/hero-fallback.jpg"
          alt="Carpintería SVC"
          className="absolute top-0 left-0 w-full h-full object-cover object-[30%_center] md:object-center z-0"
        />
      </video>

      {/* Premium dark overlays to maximize text contrast and readability */}
      {/* 1. Responsive dark mask: Top-to-bottom on mobile, left-to-right on desktop */}
      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-void/95 via-void/80 md:via-void/50 to-void/70 md:to-transparent z-10" />
      {/* 2. Top-to-bottom header protection mask to shield the transparent navbar */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#0a0906]/85 via-[#0a0906]/40 to-transparent z-10 pointer-events-none" />
      {/* 3. Dedicated bottom cinematic fade to black to transition smoothly into the gallery */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0906] via-[#0a0906]/60 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center h-full pt-20">
        <div className="max-w-3xl space-y-6">
          <div className="hero-label inline-block">
            <span className="text-gold text-xs font-mono tracking-widest uppercase bg-gold/10 px-3 py-1.5 rounded-full border border-gold/20">
              Fábrica de Cocinas y Muebles · Río Tercero
            </span>
          </div>
          
          <h1 className="hero-title font-display font-light text-ivory text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-wide [text-shadow:_0_4px_16px_rgba(0,0,0,0.95)]">
            <SplitText text="Muebles a medida que transforman espacios" by="words" />
          </h1>
          
          <p className="hero-desc text-grain/90 text-base md:text-lg leading-relaxed max-w-xl font-light [text-shadow:_0_2px_8px_rgba(0,0,0,0.95)]">
            Diseño y fabricación artesanal de amoblamientos premium. Cada proyecto es único y adaptado a tu estilo de vida.
          </p>
          
          <div className="hero-ctas flex flex-wrap gap-4 pt-4">
            <a 
              href="#portfolio" 
              className="px-8 py-4 bg-gold hover:bg-gold-muted text-void font-display font-medium text-base rounded shadow-[0_4px_20px_rgba(201,168,76,0.25)] hover:shadow-[0_4px_25px_rgba(201,168,76,0.45)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Ver nuestro trabajo
            </a>
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border border-gold/50 hover:border-gold hover:bg-gold/5 text-gold font-display font-medium text-base rounded hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-grain/60 hover:text-gold transition-colors duration-300 select-none">
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border border-grain/30 rounded-full flex justify-center p-1.5">
          <div className="w-1 h-2 bg-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
