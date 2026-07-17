'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { WHATSAPP_URL } from '@/lib/constants'

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled 
            ? 'bg-[#0a0906]/90 backdrop-blur-md py-4 border-b border-gold/10 shadow-lg' 
            : 'bg-transparent border-b border-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex justify-between items-center relative z-50">
          {/* Logo and Brand Name */}
          <a 
            href="#" 
            className="flex items-center gap-3 group"
            style={{
              textShadow: !isScrolled ? '0 2px 12px rgba(0,0,0,0.6)' : 'none',
            }}
          >
            <div className="font-display font-semibold text-sm tracking-wider text-void bg-gold px-2.5 py-1 rounded border border-gold group-hover:bg-transparent group-hover:text-gold transition-all duration-300">
              SVC
            </div>
            <span className="font-display font-light text-lg tracking-widest text-ivory group-hover:text-gold transition-colors duration-300 uppercase [text-shadow:_0_1px_3px_rgba(0,0,0,0.5)]">
              Amoblamientos
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {['servicios', 'portfolio', 'proceso'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                className="font-mono text-xs uppercase tracking-widest text-grain hover:text-gold transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full [text-shadow:_0_1px_3px_rgba(0,0,0,0.5)]"
              >
                {item === 'servicios' ? 'Servicios' : item === 'portfolio' ? 'Portafolio' : 'Proceso'}
              </a>
            ))}
            <a 
              href="#contacto" 
              className="px-6 py-2.5 bg-transparent border border-gold hover:bg-gold hover:text-void text-gold text-xs font-mono uppercase tracking-widest rounded transition-all duration-300 hover:shadow-[0_0_15px_rgba(201,168,76,0.4)] [text-shadow:_0_1px_3px_rgba(0,0,0,0.5)]"
            >
              Presupuesto
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden text-ivory hover:text-gold focus:outline-none z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              filter: !isScrolled ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))' : 'none',
            }}
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
            className="font-display font-light text-2xl text-ivory hover:text-gold transition-colors duration-300 [text-shadow:_0_1px_3px_rgba(0,0,0,0.5)]"
          >
            {item === 'servicios' ? 'Servicios' : item === 'portfolio' ? 'Portafolio' : item === 'proceso' ? 'Proceso' : 'Contacto'}
          </a>
        ))}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMobileMenuOpen(false)}
          className="font-mono text-xs uppercase tracking-widest font-semibold [text-shadow:_0_1px_3px_rgba(0,0,0,0.5)]"
          style={{
            marginTop: '2.5rem',
            padding: '1rem 2.5rem',
            background: 'var(--color-gold)',
            color: 'var(--color-void)',
            borderRadius: '999px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'all 300ms ease',
            boxShadow: '0 4px 20px rgba(201, 168, 76, 0.25)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 28px rgba(201, 168, 76, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(201, 168, 76, 0.25)'
          }}
        >
          SOLICITAR PRESUPUESTO
        </a>
      </div>
    </>
  )
}
