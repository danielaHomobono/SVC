'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { SERVICES } from '@/lib/constants'
import { initGSAP } from '@/lib/gsapConfig'

function ServiceCard({ service, idx, isMobile }: { service: any; idx: number; isMobile: boolean }) {
  return (
    <div
      className="bg-charcoal/40 border border-gold/10 hover:border-gold/30 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_10px_40px_rgba(201,168,76,0.08)] group"
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%',
        maxWidth: isMobile ? '32rem' : '58rem',
      }}
    >
      {/* Imagen */}
      <div
        className="relative overflow-hidden"
        style={{
          width: isMobile ? '100%' : '50%',
          height: isMobile ? '14rem' : '26rem',
          flexShrink: 0,
        }}
      >
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: isMobile
              ? 'linear-gradient(to bottom, rgba(10,9,6,0.1) 0%, rgba(20,18,16,0.9) 100%)'
              : 'linear-gradient(to right, rgba(10,9,6,0.1) 0%, rgba(20,18,16,0.6) 100%)',
          }}
        />
        {/* Número */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-gold/90 backdrop-blur rounded-lg flex items-center justify-center font-display text-xl font-bold text-void">
          {String(idx + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Texto */}
      <div
        className="flex flex-col justify-center"
        style={{
          width: isMobile ? '100%' : '50%',
          padding: isMobile ? '1.5rem' : '2.5rem',
        }}
      >
        <h3 className="text-2xl md:text-3xl font-display font-light text-ivory mb-3 group-hover:text-gold transition-colors duration-300">
          {service.name}
        </h3>
        <p className="text-grain/80 text-sm md:text-base leading-relaxed mb-5">
          {service.description}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {service.features.map((feature: string, fIdx: number) => (
            <li key={fIdx} className="relative pl-5 text-xs md:text-sm text-gold/90 font-light flex items-center">
              <span className="absolute left-0 text-gold">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { gsap, ScrollTrigger } = initGSAP()
    if (!gsap || !ScrollTrigger || !sectionRef.current || !containerRef.current) return

    const mm = gsap.matchMedia()
    const container = containerRef.current

    mm.add('(min-width: 768px)', () => {
      const sectionHeight = container.scrollWidth
      const anim = gsap.to(container, {
        x: -sectionHeight + window.innerWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${sectionHeight * 0.36}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        anim.kill()
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative bg-void overflow-hidden"
    >
      {/* RENDER MOBILE (hidden on desktop) */}
      <div className="md:hidden flex flex-col gap-6 px-4 py-12 w-full">
        {SERVICES.map((service, idx) => (
          <div key={service.id} className="w-full flex px-2 justify-center">
            <ServiceCard service={service} idx={idx} isMobile={true} />
          </div>
        ))}
      </div>

      {/* RENDER DESKTOP (hidden on mobile) */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          className="flex gap-12 px-20 items-center overflow-visible"
          style={{ height: '100vh' }}
        >
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="flex items-center justify-center"
              style={{
                minWidth: '70vw',
                flexShrink: 0,
              }}
            >
              <ServiceCard service={service} idx={idx} isMobile={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
