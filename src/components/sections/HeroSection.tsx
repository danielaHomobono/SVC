'use client'

import React, { useEffect, useRef } from 'react'
import { initGSAP } from '@/lib/gsapConfig'
import SplitText from '@/components/ui/SplitText'
import { BUSINESS, WHATSAPP_URL } from '@/lib/constants'

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    // Forzar silencio y reproducción del video en el cliente
    // (Bypass para el bug de hidratación del atributo HTML 'muted' en React)
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.play().catch((err) => {
        console.warn("La reproducción automática del video fue bloqueada:", err)
      })
    }

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
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-fallback.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover object-[30%_center] md:object-center z-0"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
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
        <div className="max-w-3xl space-y-5">
          {/* Número/Etiqueta en DM Mono dorado con espaciado amplio */}
          <div className="hero-label inline-block">
            <span className="text-gold text-[clamp(0.7rem,0.8vw,0.85rem)] font-mono tracking-[0.18em] uppercase opacity-85">
              Fábrica de Cocinas y Muebles · Río Tercero
            </span>
          </div>
          
          {/* Título principal en Cormorant Garamond itálico y ligero */}
          <h1 className="hero-title font-display font-light italic text-ivory text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.08] tracking-[-0.01em] [text-shadow:0_2px_60px_rgba(0,0,0,0.6),_0_1px_20px_rgba(0,0,0,0.4)]">
            <SplitText text="Muebles a medida que transforman espacios" by="words" />
          </h1>
          
          {/* Línea decorativa dorada ultra fina */}
          <div className="w-10 h-px bg-gold opacity-60 my-4" />
          
          {/* Subtítulo descriptivo en DM Sans ligero */}
          <p className="hero-desc font-body font-light text-grain text-[clamp(0.9rem,1.1vw,1.1rem)] leading-[1.55] max-w-xl [text-shadow:0_2px_8px_rgba(0,0,0,0.95)]">
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
    </section>
  )
}
