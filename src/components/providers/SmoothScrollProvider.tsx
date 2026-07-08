'use client'
import React, { useEffect, useRef } from 'react'
import { initGSAP } from '@/lib/gsapConfig'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const { gsap, ScrollTrigger } = initGSAP()
    if (!gsap || !ScrollTrigger) return

    // Dynamically import Lenis only on client side
    const Lenis = require('lenis').default
    
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(raf)
    }
  }, [])

  return <>{children}</>
}
