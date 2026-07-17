'use client'
import React, { useEffect, useRef, useState } from 'react'
import { SERVICES } from '@/lib/constants'
import { initGSAP } from '@/lib/gsapConfig'

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const { gsap, ScrollTrigger } = initGSAP()
    if (!gsap || !ScrollTrigger || !sectionRef.current || !containerRef.current) return

    const container = containerRef.current
    const sectionHeight = container.scrollWidth
    
    // Pin section and animate horizontal scroll - más compacto (150vh en lugar de 300vh)
    const anim = gsap.to(container, {
      x: -sectionHeight + window.innerWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${sectionHeight * 0.36}`,
        scrub: 1,
        pin: true,
        markers: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      anim.kill()
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-24 md:py-32 lg:py-40 bg-void"
      style={{
        overflow: 'hidden',
        height: isMobile ? 'auto' : undefined,
        paddingBottom: isMobile ? '3rem' : undefined
      }}
    >
      {/* Contenedor principal para el scroll */}

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-8 md:gap-16 px-6 md:px-20 py-12 overflow-visible"
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        {/* Service cards */}
        {SERVICES.map((service, idx) => (
          <div
            key={service.id}
            className="min-w-[85vw] lg:min-w-[60vw] flex items-center justify-center px-6"
            style={{
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? '0' : undefined,
              flexShrink: 0,
              height: isMobile ? 'auto' : '100vh',
              minHeight: isMobile ? 'auto' : '100vh',
              padding: isMobile ? '2.5rem 1.5rem' : undefined,
            }}
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
