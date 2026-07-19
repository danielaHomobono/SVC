'use client'

import React, { useEffect, useRef, useState } from 'react'
import { initGSAP } from '@/lib/gsapConfig'
import { BUSINESS } from '@/lib/constants'

export default function ShowroomSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const { gsap, ScrollTrigger } = initGSAP()
    if (!gsap || !ScrollTrigger) return

    const ctx = gsap.context(() => {
      // Label y título — fade + slide up
      gsap.from('.showroom-text-content > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.showroom-text-content',
          start: 'top 80%',
          once: true,
        },
      })

      // Imagen superior — clip-path reveal de abajo hacia arriba
      gsap.from('.showroom-img-top', {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: '.showroom-img-top',
          start: 'top 85%',
          once: true,
        },
      })

      // Imagen inferior — mismo efecto con delay
      gsap.from('.showroom-img-bottom', {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.2,
        delay: 0.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: '.showroom-img-bottom',
          start: 'top 85%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="showroom"
      className="relative py-12 md:py-16 lg:py-20 bg-void border-t border-gold/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 min-h-[85vh] flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-16 items-stretch">
        
        {/* Columna de Fotos - Se muestra arriba en móvil (order-first) y a la derecha en desktop */}
        <div className="order-first md:order-last w-full flex flex-col justify-center">
          <div
            className="flex flex-col justify-center"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              height: isMobile ? 'auto' : '100%',
              minHeight: isMobile ? 'auto' : '500px',
            }}
          >
            {/* Imagen superior */}
            <div
              className="showroom-img-top"
              style={{
                flex: isMobile ? 'none' : 1,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px',
                minHeight: isMobile ? 'auto' : '220px',
                height: isMobile ? '220px' : undefined,
              }}
            >
              <img
                src="/images/showroom/showroom-exterior.jpg"
                alt="Showroom Exterior"
                className="transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 500ms ease',
                }}
              />
            </div>
            {/* Imagen inferior */}
            <div
              className="showroom-img-bottom"
              style={{
                flex: isMobile ? 'none' : 1,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px',
                minHeight: isMobile ? 'auto' : '220px',
                height: isMobile ? '220px' : undefined,
              }}
            >
              <img
                src="/images/showroom/showroom-entrada.jpg"
                alt="Showroom Entrada"
                className="transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 500ms ease',
                }}
              />
            </div>
          </div>
        </div>

        {/* Columna de Texto - Alineado verticalmente al centro con pr amplio en desktop */}
        <div className="showroom-text-content flex flex-col justify-center w-full pr-0 md:pr-8 lg:pr-16 space-y-6">
          <div>
            {/* Label superior */}
            <span className="text-gold text-xs font-mono tracking-[0.22em] uppercase opacity-85 mb-3 inline-block">
              Nuestro Showroom
            </span>
            
            {/* Título principal */}
            <h2 className="text-ivory font-display font-light italic text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-4">
              Vení a conocernos <br />
              en persona
            </h2>
            
            {/* Línea decorativa dorada */}
            <div className="w-10 h-px bg-gold opacity-60 my-4" />
          </div>

          {/* Descripción */}
          <p className="text-grain font-body font-light text-base md:text-lg leading-relaxed max-w-xl">
            En nuestro showroom podés ver, tocar y elegir los materiales para tu proyecto. Te asesoramos sin cargo y sin compromiso.
          </p>

          {/* Separador sutil */}
          <div className="border-t border-gold/15 my-8" />

          {/* Bloque de datos de contacto */}
          <div className="space-y-5">
            {/* Ubicación */}
            <div className="flex items-start gap-4 text-grain font-body font-light text-base">
              <span className="text-gold shrink-0 mt-0.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </span>
              <div>
                <p className="font-normal text-ivory">Ubicación</p>
                <p className="text-sm opacity-80">Independencia 58, Río Tercero, Córdoba</p>
              </div>
            </div>

            {/* Horarios */}
            <div className="flex items-start gap-4 text-grain font-body font-light text-base">
              <span className="text-gold shrink-0 mt-0.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </span>
              <div>
                <p className="font-normal text-ivory">Horarios de atención</p>
                <p className="text-sm opacity-80">{BUSINESS.hours.weekdays}</p>
                <p className="text-sm opacity-80">{BUSINESS.hours.saturday}</p>
              </div>
            </div>

            {/* Teléfono/WhatsApp */}
            <div className="flex items-start gap-4 text-grain font-body font-light text-base">
              <span className="text-gold shrink-0 mt-0.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.565 4.14 1.543 5.877L.057 23.5l5.773-1.486A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.389l-.361-.214-3.424.881.91-3.317-.235-.381A9.818 9.818 0 1112 21.818z"/>
                </svg>
              </span>
              <div>
                <p className="font-normal text-ivory">WhatsApp</p>
                <p className="text-sm opacity-80">+54 9 3571 69-2109</p>
              </div>
            </div>
          </div>

          {/* Botón CTA al final */}
          <div className="pt-4">
            <a
              href="https://www.google.com/maps/place/SVC+Amoblamientos/@-32.1764823,-64.1048062,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-all duration-300 cursor-pointer inline-flex items-center justify-center"
              style={{
                background: 'transparent',
                color: 'var(--color-gold)',
                border: '1px solid var(--color-gold)',
                padding: '0.85rem 2.2rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.95rem',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 300ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-gold)'
                e.currentTarget.style.color = 'var(--color-void)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--color-gold)'
              }}
            >
              Cómo llegar
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
