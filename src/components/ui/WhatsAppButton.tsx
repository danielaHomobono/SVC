'use client'

import React, { useEffect, useState } from 'react'
import { WHATSAPP_URL } from '@/lib/constants'

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show after 2 seconds for a subtle slide-in effect
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed right-6 bottom-6 z-50 flex items-center group">
      {/* Hover Tooltip */}
      <span className="opacity-0 group-hover:opacity-100 mr-3 px-3 py-1.5 bg-charcoal border border-gold/20 text-gold text-xs font-mono uppercase tracking-wider rounded-lg shadow-xl pointer-events-none transition-all duration-300 translate-x-4 group-hover:translate-x-0">
        ¿Hablamos?
      </span>

      {/* Button */}
      <a 
        href={WHATSAPP_URL} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulsing ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping -z-10" />

        {/* WhatsApp Icon */}
        <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.488 2.028 14.028.989 11.43.989c-5.444 0-9.87 4.372-9.875 9.8.001 2.044.547 3.51 1.458 5.099L2.005 21.75l6.04-1.583-.005.006-.006.002z" />
        </svg>
      </a>
    </div>
  )
}
