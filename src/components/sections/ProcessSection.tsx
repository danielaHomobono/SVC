'use client'
import React, { useEffect, useRef } from 'react'
import { initGSAP } from '@/lib/gsapConfig'

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Consulta Inicial',
    description: 'Nos reunimos contigo para entender tu visión, necesidades, presupuesto y cronograma. Visitamos el espacio si es necesario.',
    timeline: 'Día 1',
  },
  {
    number: '02',
    title: 'Diseño y Presupuesto',
    description: 'Creamos planos detallados y 3D de tu proyecto. Presentamos opciones de materiales, acabados y un presupuesto sin compromiso.',
    timeline: '3-5 días',
  },
  {
    number: '03',
    title: 'Fabricación e Instalación',
    description: 'Construimos tu mueble con la máxima precisión. Una vez listo, realizamos la instalación profesional en tu hogar.',
    timeline: '2-6 semanas',
  },
]

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const lineRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { gsap, ScrollTrigger } = initGSAP()
    if (!gsap || !ScrollTrigger || !containerRef.current) return

    const steps = gsap.utils.toArray('.process-step') as HTMLElement[]
    steps.forEach((step, idx) => {
      gsap.from(step, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 80%',
          once: true,
        },
        delay: idx * 0.2,
      })
    })

    // Animate connecting line
    if (lineRef.current) {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="proceso"
      className="relative py-12 md:py-16 lg:py-20 bg-void"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-10">
          <span className="text-gold text-xs font-mono tracking-widest uppercase">
            Nuestro Proceso
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-display font-light text-ivory mb-6 leading-tight mt-4">
            De la Idea a la
            <span className="block text-gold">Realidad</span>
          </h2>
          <p className="text-ivory/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Un proceso transparente y colaborativo que garantiza que tu proyecto supere tus expectativas.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-gold/20 transform -translate-x-1/2 -z-10 hidden md:block"
          />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="process-step relative">
                {/* Number circle */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center mb-3 mx-auto md:mx-0">
                  <span className="text-void font-display text-2xl font-bold">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-display font-light text-ivory mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-ivory/70 text-base leading-relaxed mb-2">
                    {step.description}
                  </p>
                  <div className="inline-block md:block">
                    <span className="text-gold text-xs font-mono uppercase tracking-widest bg-gold/10 px-3 py-1 rounded">
                      {step.timeline}
                    </span>
                  </div>
                </div>

                {/* Connector dots on desktop */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-16 top-8 w-8 h-0.5 bg-gold/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
