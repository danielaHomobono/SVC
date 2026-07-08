'use client'

import React from 'react'
import ContactForm from '@/components/ui/ContactForm'
import { BUSINESS } from '@/lib/constants'

export default function ContactSection() {
  return (
    <section id="contacto" className="relative py-24 md:py-32 bg-charcoal/50 border-t border-gold/15 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Info Card (Left Column) */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="text-gold text-xs font-mono tracking-widest uppercase">
                Comenzar Proyecto
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-light text-ivory mt-4 leading-tight">
                Hagamos realidad <br />
                <span className="italic text-gold font-serif">tu diseño</span>
              </h2>
              <p className="text-grain/80 text-base md:text-lg mt-6 leading-relaxed max-w-md">
                Escribinos y contanos qué necesitás. Te asesoramos en el diseño, elección de materiales y presupuesto de forma personalizada.
              </p>
            </div>

            {/* Quick Info Grid */}
            <div className="space-y-6">
              {/* Phone Card */}
              <div className="flex gap-4 p-5 rounded-xl bg-void/30 border border-gold/5 hover:border-gold/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-gold/60 tracking-wider">WhatsApp</span>
                  <a href={`https://wa.me/${BUSINESS.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="block text-ivory hover:text-gold transition-colors duration-300 mt-1 font-medium">
                    {BUSINESS.phone}
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex gap-4 p-5 rounded-xl bg-void/30 border border-gold/5 hover:border-gold/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-gold/60 tracking-wider">Email</span>
                  <a href={`mailto:${BUSINESS.email}`} className="block text-ivory hover:text-gold transition-colors duration-300 mt-1 font-medium">
                    {BUSINESS.email}
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex gap-4 p-5 rounded-xl bg-void/30 border border-gold/5 hover:border-gold/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-gold/60 tracking-wider">Fábrica y Showroom</span>
                  <p className="text-ivory mt-1 font-medium">{BUSINESS.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card (Right Column) */}
          <div className="lg:col-span-7 bg-void/30 border border-gold/10 p-8 md:p-12 rounded-2xl backdrop-blur-md shadow-2xl">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  )
}
