'use client'
import React, { useEffect, useRef } from 'react'
import { SERVICES } from '@/lib/constants'
import { initGSAP } from '@/lib/gsapConfig'

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { gsap, ScrollTrigger } = initGSAP()
    if (!gsap || !ScrollTrigger || !sectionRef.current || !containerRef.current) return

    const container = containerRef.current
    const sectionHeight = container.scrollWidth
    
    // Pin section and animate horizontal scroll - más compacto (150vh en lugar de 300vh)
    gsap.to(container, {
      x: -sectionHeight + window.innerWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${sectionHeight * 0.6}`,
        scrub: 1,
        pin: true,
        markers: false,
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-24 md:py-32 lg:py-40 bg-void"
      style={{
        overflow: 'hidden',
      }}
    >
      {/* Contenedor principal para el scroll */}

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-8 md:gap-16 px-6 md:px-20 py-12 overflow-visible"
      >
        {/* Intro slide */}
        <div className="min-w-[85vw] lg:min-w-[60vw] flex items-center justify-center px-6">
          <div className="max-w-xl text-center md:text-left space-y-6">
            <span className="text-gold text-xs font-mono tracking-widest uppercase">
              Lo que ofrecemos
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light text-ivory leading-tight">
              Soluciones de <br />
              <span className="italic text-gold font-serif">carpintería a medida</span>
            </h2>
            <p className="text-grain/80 text-base md:text-lg leading-relaxed">
              Cada proyecto es una oportunidad para crear algo extraordinario. Diseñamos y construimos amoblamientos que se adaptan perfectamente a tu estilo de vida.
            </p>
          </div>
        </div>

        {/* Service cards */}
        {SERVICES.map((service, idx) => (
          <div
            key={service.id}
            className="min-w-[85vw] lg:min-w-[60vw] flex items-center justify-center px-6"
          >
            <div className="w-full max-w-2xl p-8 md:p-12 bg-charcoal/40 border border-gold/10 hover:border-gold/20 rounded-2xl backdrop-blur-md shadow-2xl transition-all duration-500 hover:shadow-[0_10px_40px_rgba(201,168,76,0.05)] group">
              {/* Icon/Number */}
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-muted rounded-xl flex items-center justify-center mb-8 font-display text-2xl font-bold text-void group-hover:scale-105 transition-transform duration-300">
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-display font-light text-ivory mb-4 group-hover:text-gold transition-colors duration-300">
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-grain/80 text-sm md:text-base leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Features */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature: string, fIdx: number) => (
                  <li
                    key={fIdx}
                    className="relative pl-6 text-sm text-gold/90 font-light flex items-center"
                  >
                    <span className="absolute left-0 text-gold text-lg">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
