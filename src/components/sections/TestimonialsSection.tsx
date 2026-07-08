'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TESTIMONIALS } from '@/lib/constants'

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for prev, 1 for next
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }

  const startAutoPlay = () => {
    stopAutoPlay()
    autoPlayRef.current = setInterval(() => {
      handleNext()
    }, 6000)
  }

  useEffect(() => {
    if (!isHovered) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
    return () => stopAutoPlay()
  }, [activeIndex, isHovered])

  const handleNext = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  // Slide variants for Framer Motion
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { duration: 0.3 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  }

  const currentTestimonial = TESTIMONIALS[activeIndex]

  return (
    <section 
      id="testimonios" 
      className="relative py-24 md:py-32 bg-void overflow-hidden border-t border-gold/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-xs font-mono tracking-widest uppercase">
            Testimonios
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light text-ivory mt-4">
            Lo que dicen <span className="italic text-gold font-serif">nuestros clientes</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[380px] md:min-h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full bg-charcoal/40 backdrop-blur-md border border-gold/10 rounded-2xl p-8 md:p-12 shadow-2xl relative flex flex-col justify-between"
            >
              {/* Quote Mark */}
              <div className="absolute top-6 left-8 text-gold/10 font-serif text-8xl leading-none select-none pointer-events-none">
                “
              </div>

              <div className="space-y-6 relative z-10">
                {/* Rating Stars */}
                <div className="flex gap-1 text-gold">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-ivory/90 text-lg md:text-xl font-light leading-relaxed italic">
                  "{currentTestimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between border-t border-gold/10 pt-6">
                  <div>
                    <h4 className="text-gold font-display font-medium text-lg leading-snug">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-grain/60 text-xs mt-0.5">
                      {currentTestimonial.role}
                    </p>
                  </div>
                  <span className="text-gold/80 text-xs font-mono uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full">
                    {currentTestimonial.city}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between mt-10">
          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-gold/20 hover:border-gold/60 text-gold flex items-center justify-center transition-all duration-300 hover:bg-gold/5"
              aria-label="Testimonio anterior"
            >
              <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-gold/20 hover:border-gold/60 text-gold flex items-center justify-center transition-all duration-300 hover:bg-gold/5"
              aria-label="Siguiente testimonio"
            >
              <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots/Pagination */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'w-8 bg-gold' : 'w-2 bg-gold/30 hover:bg-gold/60'
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
