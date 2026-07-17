'use client'

import React, { useEffect, useRef, useState } from 'react'
import { initGSAP } from '@/lib/gsapConfig'
import SplitText from '@/components/ui/SplitText'
import { BUSINESS, WHATSAPP_URL } from '@/lib/constants'

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

      {/* Overlay para legibilidad del texto */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isMobile
            ? 'linear-gradient(to bottom, rgba(10,9,6,0.5) 0%, rgba(10,9,6,0.3) 40%, rgba(10,9,6,0.85) 100%)'
            : `
              linear-gradient(
                to right,
                rgba(10,9,6,0.85) 0%,
                rgba(10,9,6,0.6) 35%,
                rgba(10,9,6,0.15) 65%,
                rgba(10,9,6,0) 100%
              ),
              linear-gradient(
                to bottom,
                rgba(10,9,6,0.4) 0%,
                rgba(10,9,6,0) 25%,
                rgba(10,9,6,0) 60%,
                rgba(10,9,6,0.7) 100%
              )
            `,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center h-full pt-20">
        <div className="max-w-3xl space-y-5">
          {/* Número/Etiqueta en DM Mono dorado con espaciado amplio */}
          <div className="hero-label inline-block">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.62rem, 0.75vw, 0.78rem)',
                fontWeight: 500,
                color: 'var(--color-gold)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                textShadow: '0 2px 20px rgba(0,0,0,0.7)',
                opacity: 1,
                display: 'inline-block',
              }}
            >
              FÁBRICA DE MUEBLES · RÍO TERCERO, CÓRDOBA
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
            Diseñamos y fabricamos cocinas, vestidores y muebles para toda la casa. Cada proyecto es único.
          </p>
          
          <div className="hero-ctas flex flex-wrap gap-4 pt-4">
            <a 
              href="#portfolio" 
              className="hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center"
              style={{
                background: 'var(--color-gold)',
                color: 'var(--color-void)',
                border: 'none',
                padding: '0.85rem 2.2rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.95rem',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 300ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-ivory)'
                e.currentTarget.style.color = 'var(--color-void)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-gold)'
                e.currentTarget.style.color = 'var(--color-void)'
              }}
            >
              Ver nuestro trabajo
            </a>
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center"
              style={{
                background: 'transparent',
                color: 'var(--color-gold)',
                border: '1px solid var(--color-gold)',
                padding: '0.85rem 2.2rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: '0.95rem',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 300ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-ivory)'
                e.currentTarget.style.color = 'var(--color-ivory)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold)'
                e.currentTarget.style.color = 'var(--color-gold)'
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
