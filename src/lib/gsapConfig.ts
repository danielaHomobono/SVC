'use client'
let gsap: any = null
let ScrollTrigger: any = null
let ScrollToPlugin: any = null

const initGSAP = () => {
  if (gsap) return { gsap, ScrollTrigger, ScrollToPlugin }
  
  if (typeof window !== 'undefined') {
    gsap = require('gsap').gsap || require('gsap').default
    ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger || require('gsap/ScrollTrigger').default
    ScrollToPlugin = require('gsap/ScrollToPlugin').ScrollToPlugin || require('gsap/ScrollToPlugin').default
    
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
      gsap.defaults({ ease: 'power2.out' })
    }
  }
  
  return { gsap, ScrollTrigger, ScrollToPlugin }
}

export { initGSAP }
