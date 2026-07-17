# PROMPT GUARDADO — Sección "El Taller"
## SVC Amoblamientos
## (Usar cuando estén las fotos del taller)

Agregar una nueva sección "El Taller" que muestre el proceso de
fabricación y las máquinas. Esta sección genera muchísima confianza
porque muestra que hay una fábrica real detrás, no un revendedor.

---

## ANTES DE EMPEZAR — LAS FOTOS

### Cuántas fotos
Entre **4 y 6 fotos** del taller. Las mejores. Idealmente que muestren:
- Una vista general del taller / las máquinas
- Alguna máquina en primer plano (CNC, sierra, etc.)
- Piezas siendo trabajadas o cortadas
- Detalle de manos trabajando (transmite lo artesanal)
- El taller con muebles en proceso

No más de 6 — con menos se ve más curado y potente.

### Dónde ponerlas
Crear la carpeta `/public/images/taller/` y colocar las fotos:
```
/public/images/taller/
├── taller-1.jpg
├── taller-2.jpg
├── taller-3.jpg
├── taller-4.jpg
├── taller-5.jpg   (opcional)
└── taller-6.jpg   (opcional)
```

Optimizar cada foto para web (máximo ~800KB, 1600px de ancho máximo)
antes de subirlas.

### Dónde va la sección
Entre la Galería y el Proceso, o entre el Proceso y el Showroom.
Recomendación: DESPUÉS de la galería, ANTES del proceso — así el
flujo es: ves los trabajos → ves cómo/dónde los hacen → ves el
proceso de trabajo.

---

## DISEÑO DE LA SECCIÓN

Mantener el sistema de diseño del sitio:
- Fondo: `var(--color-void)` o `var(--color-charcoal)` para variar
- Título: Cormorant Garamond italic
- Label: DM Mono dorado
- Texto: Plus Jakarta Sans

### Concepto visual: mosaico asimétrico

En vez de un grid uniforme, un layout tipo mosaico donde una foto
es grande (destacada) y las demás la acompañan. Esto se ve más
editorial y premium que un grid parejo.

```
┌───────────────┬───────┐
│               │ foto2 │
│    foto1      ├───────┤
│   (grande)    │ foto3 │
│               ├───────┤
├───────┬───────┤ foto4 │
│ foto5 │ foto6 │       │
└───────┴───────┴───────┘
```

---

## ARCHIVO A CREAR

`src/components/sections/TallerSection.tsx`

```tsx
'use client'
import React from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsapConfig'
import { ScrollTrigger } from '@/lib/gsapConfig'
import { useGSAP } from '@gsap/react'

const TALLER_IMAGES = [
  { src: '/images/taller/taller-1.jpg', alt: 'Taller SVC Amoblamientos', span: 'large' },
  { src: '/images/taller/taller-2.jpg', alt: 'Fabricación a medida' },
  { src: '/images/taller/taller-3.jpg', alt: 'Corte de precisión' },
  { src: '/images/taller/taller-4.jpg', alt: 'Proceso de fabricación' },
  { src: '/images/taller/taller-5.jpg', alt: 'Detalle artesanal' },
  { src: '/images/taller/taller-6.jpg', alt: 'Maquinaria moderna' },
]

export default function TallerSection() {
  useGSAP(() => {
    gsap.from('.taller-header > *', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.taller-header', start: 'top 80%', once: true },
    })

    gsap.utils.toArray<HTMLElement>('.taller-img').forEach((img) => {
      gsap.from(img, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: img, start: 'top 88%', once: true },
      })
    })
  }, [])

  return (
    <section id="taller" className="bg-charcoal py-20 md:py-28 px-5 md:px-12">
      {/* Encabezado */}
      <div className="taller-header max-w-3xl mb-12">
        <p className="font-mono text-xs tracking-[0.22em] uppercase text-gold mb-4">
          Nuestra Fábrica
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-light text-ivory mb-4">
          Donde nacen <span className="italic">tus muebles</span>
        </h2>
        <p className="text-grain/80 text-base leading-relaxed">
          Maquinaria moderna y trabajo artesanal en cada pieza. Fabricamos
          con precisión para que cada mueble encaje perfecto en tu espacio.
        </p>
      </div>

      {/* Mosaico de fotos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
        {TALLER_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`taller-img relative overflow-hidden rounded-xl group ${
              img.span === 'large' ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-void/0 group-hover:bg-void/15 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Frase de cierre opcional */}
      <div className="mt-10 max-w-2xl">
        <p className="font-display italic text-xl md:text-2xl text-gold/90 font-light">
          "Cada mueble pasa por nuestras manos antes de llegar a tu casa."
        </p>
      </div>
    </section>
  )
}
```

---

## INTEGRAR EN page.tsx

```tsx
import TallerSection from '@/components/sections/TallerSection'

// En el JSX, después de la galería:
<GallerySection />
<TallerSection />      {/* ← NUEVA */}
<ProcessSection />
```

---

## AJUSTAR CANTIDAD DE FOTOS

Si tenés menos de 6 fotos, eliminar las líneas sobrantes del array
TALLER_IMAGES. El mosaico se adapta. Con 4 fotos también se ve bien.

Si la foto marcada como `span: 'large'` no es la mejor, mover ese
atributo a la foto que quieras destacar.

---

## VERIFICACIÓN

1. La sección muestra las fotos del taller en mosaico asimétrico
2. Una foto se ve grande (destacada) y las demás la acompañan
3. Las fotos hacen reveal al scrollear (efecto clip-path)
4. En mobile el mosaico se reordena bien en 2 columnas
5. El estilo coincide con el resto del sitio
6. La frase de cierre en dorado italic le da el toque humano

Mostrarme el resultado antes de correr.