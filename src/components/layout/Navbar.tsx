'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-void/95 backdrop-blur-md py-4 border-b border-gold/10 shadow-lg' 
            : 'bg-void/85 backdrop-blur-md border-b border-gold/5 py-4 md:bg-transparent md:border-transparent md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex justify-between items-center relative z-50">
          {/* Logo and Brand Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded bg-charcoal flex items-center justify-center p-1 border border-gold/20 group-hover:border-gold transition-all duration-300">
              <Image 
                src="/images/portfolio/logo.png" 
                alt="SVC Amoblamientos Logo" 
                width={40} 
                height={40} 
                className="object-contain w-full h-full"
              />
            </div>
            <span className="font-display font-light text-xl tracking-wider text-ivory group-hover:text-gold transition-colors duration-300">
              SVC <span className="font-semibold text-gold">Amoblamientos</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {['servicios', 'portfolio', 'proceso'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                className="font-mono text-xs uppercase tracking-widest text-grain hover:text-gold transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {item === 'servicios' ? 'Servicios' : item === 'portfolio' ? 'Portafolio' : 'Proceso'}
              </a>
            ))}
            <a 
              href="#contacto" 
              className="px-6 py-2.5 bg-transparent border border-gold hover:bg-gold hover:text-void text-gold text-xs font-mono uppercase tracking-widest rounded transition-all duration-300 hover:shadow-[0_0_15px_rgba(201,168,76,0.4)]"
            >
              Presupuesto
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden text-ivory hover:text-gold focus:outline-none z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay - Rendered outside of nav to escape backdrop-filter positioning context */}
      <div 
        className={`fixed inset-0 bg-[#0a0906] z-40 md:hidden flex flex-col justify-center items-center gap-8 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {['servicios', 'portfolio', 'proceso', 'contacto'].map((item) => (
          <a 
            key={item} 
            href={`#${item}`} 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-display font-light text-2xl text-ivory hover:text-gold transition-colors duration-300"
          >
            {item === 'servicios' ? 'Servicios' : item === 'portfolio' ? 'Portafolio' : item === 'proceso' ? 'Proceso' : 'Contacto'}
          </a>
        ))}
        <a 
          href="#contacto" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="mt-4 px-8 py-3 bg-gold text-void font-mono text-xs uppercase tracking-widest font-semibold rounded hover:bg-gold-muted hover:shadow-[0_0_20px_rgba(201,168,76,0.6)] transition-all duration-300"
        >
          Solicitar Presupuesto
        </a>
      </div>
    </>
  )
}
