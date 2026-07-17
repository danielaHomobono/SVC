'use client'

import React from 'react'
import { BUSINESS, WHATSAPP_URL } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="font-display font-semibold text-sm tracking-wider text-void bg-gold px-2.5 py-1 rounded border border-gold">
                SVC
              </div>
              <span className="font-display font-light text-lg tracking-widest text-ivory uppercase">
                Amoblamientos
              </span>
            </div>
            <p className="text-grain/80 text-sm leading-relaxed max-w-xs">
              Diseño y fabricación de muebles a medida en Río Tercero, Córdoba. Cocinas, vestidores y amoblamientos de alta calidad.
            </p>
            <p className="text-gold text-xs font-mono tracking-wider">
              RÍO TERCERO · CÓRDOBA
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-display font-light text-lg text-ivory mb-6 tracking-wide">
              Navegación
            </h4>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-widest text-grain/70">
              <li>
                <a href="#" className="hover:text-gold transition-colors duration-300">Inicio</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-gold transition-colors duration-300">Servicios</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-gold transition-colors duration-300">Portafolio</a>
              </li>
              <li>
                <a href="#proceso" className="hover:text-gold transition-colors duration-300">Nuestro Proceso</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display font-light text-lg text-ivory mb-6 tracking-wide">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm text-grain/80">
              <li className="flex flex-col">
                <span className="text-xs font-mono uppercase text-gold/60 tracking-wider">WhatsApp</span>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors duration-300 mt-1">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-mono uppercase text-gold/60 tracking-wider">Dirección</span>
                <span className="mt-1">{BUSINESS.address}</span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h4 className="font-display font-light text-lg text-ivory mb-6 tracking-wide">
              Horarios & Redes
            </h4>
            <ul className="space-y-4 text-sm text-grain/80">
              <li className="flex flex-col">
                <span className="text-xs font-mono uppercase text-gold/60 tracking-wider">Horarios de atención</span>
                <span className="mt-1">{BUSINESS.hours.weekdays}</span>
                <span className="mt-0.5">{BUSINESS.hours.saturday}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-mono uppercase text-gold/60 tracking-wider">Instagram</span>
                <a 
                  href={BUSINESS.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold transition-colors duration-300 mt-1 font-mono text-xs uppercase tracking-widest text-gold"
                >
                  {BUSINESS.instagramHandle} →
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-mono uppercase text-gold/60 tracking-wider">Facebook</span>
                <a 
                  href={BUSINESS.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold transition-colors duration-300 mt-1 font-mono text-xs uppercase tracking-widest text-gold"
                >
                  {BUSINESS.facebookHandle} →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-grain/50 text-center md:text-left">
            © {new Date().getFullYear()} {BUSINESS.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-grain/40 font-mono tracking-widest">
            HANDCRAFTED WITH PRECISION
          </p>
        </div>
      </div>
    </footer>
  )
}
