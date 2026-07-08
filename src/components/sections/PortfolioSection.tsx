'use client'
import React, { useEffect, useRef } from 'react'
import { initGSAP } from '@/lib/gsapConfig'

interface PortfolioItem {
  id: string
  title: string
  category: string
  image: string
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: '1', title: 'Cocina Premium Roble', category: 'Cocinas', image: '/images/portfolio/cocina-1.jpg' },
  { id: '2', title: 'Detalles de Herrajes', category: 'Detalles', image: '/images/portfolio/detalle-1.jpg' },
  { id: '3', title: 'Comedor Moderno', category: 'Comedores', image: '/images/portfolio/comedor-1.jpg' },
  { id: '4', title: 'Placar Dormitorio', category: 'Dormitorios', image: '/images/portfolio/placar-1.jpg' },
  { id: '5', title: 'Mueble Baño', category: 'Baños', image: '/images/portfolio/bano-1.jpg' },
  { id: '6', title: 'Isla de Cocina', category: 'Cocinas', image: '/images/portfolio/isla-1.jpg' },
]

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { gsap, ScrollTrigger } = initGSAP()
    if (!gsap || !ScrollTrigger || !containerRef.current) return

    const items = gsap.utils.toArray('.portfolio-item') as HTMLElement[]
    items.forEach((item: HTMLElement) => {
      gsap.from(item, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.4,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          once: true,
        },
      })
    })
  }, [])

  return (
    <section id="portfolio" className="relative py-24 md:py-32 lg:py-40 bg-void">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className="text-gold text-xs font-mono tracking-widest uppercase">
            Nuestro Trabajo
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-display font-light text-ivory mb-6 leading-tight mt-4">
            Proyectos que Transforman
            <span className="block text-gold">Espacios</span>
          </h2>
          <p className="text-ivory/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Cada mueble es una obra de arte personalizada. Explorá nuestra galería de proyectos completados en hogares de toda la región.
          </p>
        </div>

        {/* Grid - 3 cols en lg, 2 en md, 1 en mobile */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20"
        >
          {PORTFOLIO_ITEMS.map((item) => (
            <div
              key={item.id}
              className="portfolio-item group relative overflow-hidden rounded-lg h-80 md:h-96 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <h3 className="text-xl md:text-2xl font-display font-light text-gold mb-2">
                  {item.title}
                </h3>
                <p className="text-ivory/80 text-sm">{item.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="px-8 py-4 bg-gold/10 hover:bg-gold/20 border border-gold/40 hover:border-gold/60 rounded text-gold font-display text-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]">
            Ver más proyectos →
          </button>
        </div>
      </div>
    </section>
  )
}
