'use client'

import React, { useEffect, useRef } from 'react'
import { initGSAP } from '@/lib/gsapConfig'

interface FeaturedWork {
  id: string
  title: string
  category: string
  description: string
  image: string
  highlight?: boolean
}

const featuredWorks: FeaturedWork[] = [
  {
    id: 'cocina-premium',
    title: 'Cocina Premium Moderna',
    category: 'Cocinas',
    description: 'Diseño contemporáneo con materiales de alta calidad',
    image: '/images/portfolio/cocina-1.jpg',
    highlight: true,
  },
  {
    id: 'detalle-carpinteria',
    title: 'Detalle de Mesada',
    category: 'Detalles',
    description: 'Terminación de mesadas y empalmes perfectos',
    image: '/images/portfolio/detalle-1.jpg',
  },
  {
    id: 'comedor-familias',
    title: 'Comedor para Familias',
    category: 'Comedores',
    description: 'Espacio acogedor y funcional',
    image: '/images/portfolio/comedor-1.jpg',
    highlight: true,
  },
  {
    id: 'placar-personalizado',
    title: 'Placar Personalizado',
    category: 'Almacenamiento',
    description: 'Organización y diseño a medida',
    image: '/images/portfolio/placar-1.jpg',
  },
]

export default function FeaturedGallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const { gsap, ScrollTrigger } = initGSAP()
    if (!gsap || !ScrollTrigger) return

    // Animate title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1,
            markers: false,
          },
        }
      )
    }

    // Animate items with stagger
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'top 45%',
              scrub: 1.5,
              markers: false,
            },
          }
        )

        // Hover effect
        const hoverTl = gsap.timeline({ paused: true })
        hoverTl.to(item, {
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out',
        })

        item.addEventListener('mouseenter', () => hoverTl.play())
        item.addEventListener('mouseleave', () => hoverTl.reverse())

        return () => {
          item.removeEventListener('mouseenter', () => hoverTl.play())
          item.removeEventListener('mouseleave', () => hoverTl.reverse())
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 lg:py-20 bg-void"
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div ref={titleRef} className="mb-8 px-6 md:px-12 lg:px-20">
          <div className="inline-block mb-6">
            <span className="text-gold text-xs font-mono tracking-widest uppercase">
              Nuestros Mejores Trabajos
            </span>
          </div>
          <h2 className="text-[clamp(2.2rem,6vw,4.5rem)] font-display font-light text-ivory mb-6 leading-tight">
            Galería de Trabajos
            <span className="block text-gold">Destacados</span>
          </h2>
          <p className="text-ivory/70 text-lg max-w-3xl leading-relaxed">
            Una selección de nuestros proyectos más emblemáticos, donde la precisión, el diseño
            y la calidad convergen en cada detalle.
          </p>
        </div>

        {/* Gallery Grid - 2 cols en todos, simple y limpio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 px-6 md:px-12 lg:px-20">
          {featuredWorks.map((work, index) => (
            <div
              key={work.id}
              ref={el => {
                if (el) itemsRef.current[index] = el
              }}
              className="group relative overflow-hidden rounded-xl cursor-pointer h-96"
            >
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gold/10 to-void">
                <div className="absolute inset-0 bg-gradient-to-br from-void via-transparent to-void opacity-40 z-10"></div>

                {/* SVG/Image */}
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col justify-end p-8">
                  <h3 className="text-2xl md:text-3xl font-display font-light text-gold mb-3">
                    {work.title}
                  </h3>
                  <p className="text-ivory/80 text-base mb-4">{work.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gold text-xs font-mono uppercase tracking-widest">
                      {work.category}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-gold to-transparent"></div>
                  </div>
                </div>

                {/* Highlight badge */}
                {work.highlight && (
                  <div className="absolute top-6 right-6 z-30">
                    <div className="bg-[#0a0906]/85 backdrop-blur-md border border-gold/30 rounded px-3 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                      <span className="text-gold text-[10px] font-mono uppercase tracking-widest font-semibold">
                        Destacado
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center px-6 md:px-12 lg:px-20">
          <p className="text-ivory/60 mb-8 text-lg">
            ¿Te interesa conocer todos nuestros proyectos?
          </p>
          <a
            href="#portfolio"
            className="inline-block px-10 py-4 bg-gold/10 hover:bg-gold/20 border border-gold/40 hover:border-gold/60 rounded text-gold font-display text-xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
          >
            Ver Portfolio Completo →
          </a>
        </div>
      </div>
    </section>
  )
}
