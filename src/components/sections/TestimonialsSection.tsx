'use client'

import React from 'react'

const TESTIMONIALS = [
  {
    id: 1,
    text: 'Excelente atención, muebles de primera calidad y diseño exclusivo.',
    author: 'Anibal Collino',
    source: 'Google',
  },
  {
    id: 2,
    text: 'Definición de excelencia.',
    author: 'Vero Bordiga',
    source: 'Google',
  },
  {
    id: 3,
    text: 'Quedé feliz con mi cocina. Muebles, mesada, todo a medida y con una terminación impecable. Muy buena calidad.',
    author: 'Daniela Homobono',
    source: 'Google',
  },
]

export default function TestimonialsSection() {
  return (
    <section 
      id="testimonios" 
      className="relative py-24 md:py-32 bg-void overflow-hidden border-t border-gold/5"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-xs font-mono tracking-widest uppercase">
            Testimonios
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light text-ivory mt-4">
            Lo que dicen <span className="italic text-gold font-serif">nuestros clientes</span>
          </h2>
        </div>

        {/* Grid layout for 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-charcoal/40 backdrop-blur-md border border-gold/10 rounded-2xl p-8 md:p-10 shadow-2xl relative flex flex-col justify-between"
            >


              <div className="space-y-6 relative z-10 flex-grow flex flex-col justify-between">
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-gold mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-ivory/90 text-base md:text-lg font-light leading-relaxed italic mb-6">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="border-t border-gold/10 pt-4 mt-auto">
                  <h4 className="text-gold font-display font-medium text-lg leading-snug">
                    {testimonial.author}
                  </h4>
                  {/* Badge de fuente Google */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginTop: '0.35rem',
                  }}>
                    {/* Ícono de Google (G de colores, SVG inline) */}
                    <svg width="14" height="14" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--color-grain)',
                      opacity: 0.7,
                    }}>
                      Reseña de Google
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Ver todas las reseñas */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="https://search.google.com/local/reviews?placeid=ChIJ__UPFSFvzZURE_DAWqJoFqc"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.8rem 1.8rem',
              border: '1px solid rgba(201, 168, 76, 0.4)',
              borderRadius: '2px',
              color: 'var(--color-gold)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'all 300ms ease',
              backgroundColor: 'transparent',
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
            Ver todas nuestras reseñas en Google
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  )
}
