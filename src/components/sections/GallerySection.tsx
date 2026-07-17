'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { GALLERY } from '@/lib/gallery'

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState(GALLERY[0].id)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const currentCategory = GALLERY.find((c) => c.id === activeCategory) || GALLERY[0]
  const images = currentCategory.images

  const openLightbox = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)
  const nextImage = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length))
  const prevImage = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length))

  return (
    <section id="portfolio" className="bg-void py-20 md:py-28 px-5 md:px-12">
      {/* Encabezado */}
      <div className="max-w-3xl mb-12">
        <p className="font-mono text-xs tracking-[0.22em] uppercase text-gold mb-4">
          Nuestros Trabajos
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-light text-ivory mb-4">
          Nuestros <span className="italic text-gold font-serif">trabajos</span>
        </h2>
        <p className="text-grain/80 text-base leading-relaxed">
          Explorá nuestros proyectos por categoría. Cada mueble está hecho
          a medida, con materiales de primera y terminaciones prolijas.
        </p>
      </div>

      {/* Filtros de categoría */}
      <div className="flex flex-wrap gap-3 mb-10">
        {GALLERY.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="px-5 py-2 rounded text-sm transition-all duration-300"
            style={{
              fontFamily: 'var(--font-body)',
              border: '1px solid',
              borderColor: activeCategory === cat.id ? 'var(--color-gold)' : 'rgba(201,168,76,0.25)',
              background: activeCategory === cat.id ? 'var(--color-gold)' : 'transparent',
              color: activeCategory === cat.id ? 'var(--color-void)' : 'var(--color-grain)',
              cursor: 'pointer',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx)}
            className="relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-void/0 group-hover:bg-void/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Mensaje si la categoría no tiene fotos aún */}
      {images.length === 0 && (
        <p className="text-grain/60 text-center py-12 font-body">
          Pronto vas a ver nuestros trabajos de esta categoría.
        </p>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-void/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Botón cerrar */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-ivory text-4xl hover:text-gold transition-colors cursor-pointer border-none bg-transparent"
            aria-label="Cerrar"
          >
            ×
          </button>

          {/* Flecha anterior */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            className="absolute left-4 md:left-8 text-ivory text-5xl hover:text-gold transition-colors z-10 cursor-pointer border-none bg-transparent"
            aria-label="Anterior"
          >
            ‹
          </button>

          {/* Imagen ampliada */}
          <div
            className="relative w-[90vw] h-[80vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          {/* Flecha siguiente */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            className="absolute right-4 md:right-8 text-ivory text-5xl hover:text-gold transition-colors z-10 cursor-pointer border-none bg-transparent"
            aria-label="Siguiente"
          >
            ›
          </button>

          {/* Contador */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-sm text-grain">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  )
}
