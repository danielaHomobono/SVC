// @ts-nocheck
'use client'
import React from 'react'

export default function KitchenScene() {
  // Temporarily disabled 3D scene — will be re-enabled after fixing r3f initialization
  // For now, render a placeholder section
  return (
    <section id="experiencia" style={{ height: '100vh', background: '#0a0906', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: 'var(--color-grain)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-ivory)', marginBottom: 12 }}>
          Escena 3D en desarrollo
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}>
          Próximamente: Tour virtual interactivo de nuestro taller
        </p>
      </div>
    </section>
  )
}
