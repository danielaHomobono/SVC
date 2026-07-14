# INSTRUCCIONES PARA ANTIGRAVITY — Sección Invensiva Video Scrubbing
## SVC Amoblamientos — Landing Page

---

## CONTEXTO DEL PROYECTO

Estás trabajando en la landing page de **SVC Amoblamientos**, una carpintería
familiar de Río Tercero, Córdoba, Argentina. Fabrican muebles a medida modernos
y de alta calidad: cocinas (especialidad principal), vestidores, baños y otros ambientes.

El proyecto usa:
- Next.js 15 con App Router
- TypeScript
- Tailwind CSS v4
- GSAP 3.12 + ScrollTrigger (ya instalado y configurado en `lib/gsapConfig.ts`)
- Lenis para smooth scroll (ya configurado en `SmoothScrollProvider.tsx`)
- Framer Motion

La paleta ya definida:
```
--color-void:       #0a0906   ← fondo principal
--color-charcoal:   #141210
--color-surface:    #1e1a16
--color-oak:        #9d6f42
--color-oak-light:  #c4956a
--color-grain:      #a39b90   ← texto secundario
--color-cream:      #f5f0e8   ← texto principal
--color-ivory:      #faf7f2   ← headings hero
--color-gold:       #c9a84c   ← acento dorado
--color-gold-muted: #8a6f34
```

Las fuentes ya configuradas con next/font:
```
--font-display: Cormorant Garamond (italic, weights 300-600)
--font-body:    DM Sans (weights 300-500)
--font-mono:    DM Mono (weight 400)
```

---

## TAREA ESPECÍFICA

Crear la sección inmersiva de video scrubbing que va entre `<HeroSection />` y
`<ServicesSection />` en `app/page.tsx`.

Esta sección usa la misma técnica que Apple en sus páginas de iPhone:
el usuario scrollea verticalmente y el video avanza frame a frame como si
estuviera "entrando" a la cocina. Sin Three.js, sin WebGL. Solo GSAP +
un elemento HTML `<video>` nativo.

---

## ARCHIVOS A CREAR

### ARCHIVO 1: `src/components/sections/ImmersiveSection.tsx`

Crear este componente completo:

```tsx
'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsapConfig'
import { ScrollTrigger } from '@/lib/gsapConfig'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// ─── ESCENAS ──────────────────────────────────────────────────────────────────
// Cada escena define en qué fracción del video aparece (0 a 1)
// y qué texto mostrar en ese momento.
// Estos valores se ajustan según el contenido real del video.
const SCENES = [
  {
    progress: 0,
    numero: '01 / 04',
    titulo: 'Cada mueble, una decisión para siempre',
    subtitulo: 'Diseño y fabricación a medida desde Río Tercero',
  },
  {
    progress: 0.28,
    numero: '02 / 04',
    titulo: 'Madera seleccionada',
    subtitulo: 'Materiales nobles trabajados con precisión industrial',
  },
  {
    progress: 0.55,
    numero: '03 / 04',
    titulo: 'Funcionalidad perfecta',
    subtitulo: 'Cada centímetro pensado para tu espacio',
  },
  {
    progress: 0.82,
    numero: '04 / 04',
    titulo: 'Terminaciones de élite',
    subtitulo: 'Encastres exactos. Sin compromiso.',
  },
]

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export function ImmersiveSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const labelsRef   = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    const labels  = labelsRef.current
    if (!video || !section || !labels) return

    // ── Mostrar solo el primer frame si el usuario prefiere sin animación ──
    if (reducedMotion) {
      video.currentTime = 0
      // Mostrar solo la primera escena
      const firstLabel = labels.querySelector('.scene-item[data-index="0"]') as HTMLElement
      if (firstLabel) firstLabel.style.opacity = '1'
      return
    }

    // ── Inicializar el scrub cuando el video tiene duración disponible ──
    const initScrub = () => {
      const duration = video.duration
      if (!duration || isNaN(duration)) return

      // El proxy es el objeto que GSAP anima internamente
      // Su valor "time" se mapea directamente a video.currentTime
      const proxy = { time: 0 }

      // Variable para saber qué escena está activa
      let activeSceneIndex = -1

      const scrubTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          const targetTime = self.progress * duration

          // Animar currentTime con interpolación suave
          // Esto evita el jitter entre frames
          gsap.to(proxy, {
            time: targetTime,
            duration: 0.25,
            ease: 'none',
            overwrite: true,
            onUpdate: () => {
              video.currentTime = proxy.time
            },
          })

          // ── Lógica de cambio de escena ──
          // Encontrar la escena activa según el progress actual
          let newActiveIndex = 0
          for (let i = SCENES.length - 1; i >= 0; i--) {
            if (self.progress >= SCENES[i].progress - 0.04) {
              newActiveIndex = i
              break
            }
          }

          // Solo animar si cambió la escena
          if (newActiveIndex !== activeSceneIndex) {
            activeSceneIndex = newActiveIndex

            const allItems = labels.querySelectorAll('.scene-item')

            allItems.forEach((el, i) => {
              if (i === newActiveIndex) {
                // Escena nueva: entra desde abajo
                gsap.to(el, {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: 'power3.out',
                })
              } else {
                // Escenas anteriores/siguientes: salen hacia arriba
                gsap.to(el, {
                  opacity: 0,
                  y: -16,
                  duration: 0.4,
                  ease: 'power2.in',
                })
              }
            })
          }
        },
      })

      return () => scrubTrigger.kill()
    }

    // Esperar a que el video tenga metadata (duración)
    if (video.readyState >= 1) {
      initScrub()
    } else {
      video.addEventListener('loadedmetadata', initScrub, { once: true })
    }

    return () => {
      video.removeEventListener('loadedmetadata', initScrub)
    }
  }, [reducedMotion])

  return (
    /*
      La sección tiene 500vh de altura total.
      Esto define cuánto tiempo el usuario "vive" dentro de la experiencia.
      500vh = la experiencia dura el equivalente a 5 pantallas de scroll.
      Se puede aumentar a 600vh si se quiere más tiempo por escena.
    */
    <section
      id="experiencia"
      ref={sectionRef}
      style={{ height: '500vh', position: 'relative' }}
      aria-label="Tour visual de nuestros trabajos"
    >
      {/*
        CONTENEDOR STICKY
        Se mantiene fijo en la pantalla mientras el usuario scrollea los 500vh.
        Todo lo que va adentro se ve como si fuera una pantalla fija.
      */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: 'var(--color-void)',
        }}
      >

        {/* ═══════════════════════════════════════════════════════
            CAPA 0: VIDEO
            muted + playsInline + preload="auto" son OBLIGATORIOS.
            Sin estos atributos el video no funciona en mobile.
            El video NO reproduce automáticamente — su currentTime
            es controlado manualmente por GSAP según el scroll.
        ════════════════════════════════════════════════════════ */}
        <video
          ref={videoRef}
          src="/videos/kitchen-scrub.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            // Ajuste visual: contraste suave + saturación cálida + oscurecimiento
            // para que el texto sea legible sobre cualquier frame
            filter: 'contrast(1.08) saturate(1.12) brightness(0.72)',
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            CAPA 1: FALLBACK (se muestra si el video no carga)
            Imagen estática de la cocina como respaldo.
        ════════════════════════════════════════════════════════ */}
        <div
          id="immersive-fallback"
          style={{
            display: 'none',
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/hero-kitchen.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.72) saturate(1.1)',
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            CAPA 2: GRADIENTES
            Tres gradientes superpuestos para máxima profundidad:
            - Arriba: oscurece para dar espacio a la nav
            - Izquierda: donde van los textos, más legible
            - Abajo: transición suave al fondo de la siguiente sección
        ════════════════════════════════════════════════════════ */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                to bottom,
                rgba(10,9,6,0.45) 0%,
                rgba(10,9,6,0) 20%,
                rgba(10,9,6,0) 65%,
                rgba(10,9,6,0.9) 100%
              ),
              linear-gradient(
                to right,
                rgba(10,9,6,0.65) 0%,
                rgba(10,9,6,0.2) 40%,
                rgba(10,9,6,0) 65%
              )
            `,
            pointerEvents: 'none',
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            CAPA 3: TEXTOS DE ESCENA
            Posicionados en la parte inferior izquierda.
            Cada .scene-item corresponde a una escena del array SCENES.
            Solo uno es visible a la vez — los demás tienen opacity: 0.
        ════════════════════════════════════════════════════════ */}
        <div
          ref={labelsRef}
          aria-live="polite"
          style={{
            position: 'absolute',
            bottom: 'clamp(4rem, 10vh, 7rem)',
            left: 'clamp(1.75rem, 5vw, 6rem)',
            maxWidth: '540px',
            pointerEvents: 'none',
          }}
        >
          {SCENES.map((scene, i) => (
            <div
              key={i}
              className="scene-item"
              data-index={i}
              style={{
                // El primero es visible, los demás invisibles
                // GSAP los anima con opacity y translateY
                position: i === 0 ? 'relative' : 'absolute',
                top: i === 0 ? 'auto' : 0,
                left: i === 0 ? 'auto' : 0,
                width: '100%',
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? 'translateY(0)' : 'translateY(-16px)',
              }}
            >
              {/* Número de escena — DM Mono, oro, espaciado generoso */}
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.65rem, 0.8vw, 0.8rem)',
                  color: 'var(--color-gold)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '0.85rem',
                  opacity: 0.85,
                }}
              >
                {scene.numero}
              </p>

              {/* Título principal — Cormorant Garamond italic */}
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--color-ivory)',
                  lineHeight: 1.08,
                  marginBottom: '1.1rem',
                  // Sombra larga para garantizar legibilidad en frames claros
                  textShadow: '0 2px 60px rgba(0,0,0,0.6), 0 1px 20px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.01em',
                }}
              >
                {scene.titulo}
              </h2>

              {/* Línea decorativa dorada */}
              <div
                style={{
                  width: '40px',
                  height: '1px',
                  background: 'var(--color-gold)',
                  marginBottom: '1rem',
                  opacity: 0.6,
                }}
              />

              {/* Subtítulo — DM Sans light */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)',
                  fontWeight: 300,
                  color: 'var(--color-grain)',
                  lineHeight: 1.55,
                  letterSpacing: '0.01em',
                }}
              >
                {scene.subtitulo}
              </p>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
            CAPA 4: BARRA DE PROGRESO
            Línea dorada en el fondo que crece con el scroll.
            Muestra al usuario dónde está dentro del tour.
        ════════════════════════════════════════════════════════ */}
        <ProgressBar sectionRef={sectionRef} />

        {/* ═══════════════════════════════════════════════════════
            CAPA 5: INDICADOR DE SCROLL
            Solo visible al inicio. Se desvanece al scrollear.
        ════════════════════════════════════════════════════════ */}
        <ScrollHint />

        {/* ═══════════════════════════════════════════════════════
            CAPA 6: LÍNEA VERTICAL DECORATIVA
            Elemento editorial en la derecha. Fino, dorado, centrado.
        ════════════════════════════════════════════════════════ */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 'clamp(1.75rem, 4vw, 4.5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '1px',
            height: '28vh',
            background: 'linear-gradient(to bottom, transparent 0%, var(--color-gold-muted) 50%, transparent 100%)',
            pointerEvents: 'none',
            opacity: 0.5,
          }}
        />

      </div>
    </section>
  )
}


// ─── SUBCOMPONENTE: BARRA DE PROGRESO ────────────────────────────────────────

function ProgressBar({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement>
}) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    const section = sectionRef.current
    if (!bar || !section) return

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.to(bar, {
          scaleX: self.progress,
          duration: 0.1,
          ease: 'none',
          overwrite: true,
        })
      },
    })

    return () => st.kill()
  }, [sectionRef])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'rgba(201, 168, 76, 0.12)',
      }}
    >
      <div
        ref={barRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, var(--color-gold-muted), var(--color-gold))',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          // Glow dorado
          boxShadow: '0 0 8px rgba(201, 168, 76, 0.6)',
        }}
      />
    </div>
  )
}


// ─── SUBCOMPONENTE: INDICADOR DE SCROLL ──────────────────────────────────────

function ScrollHint() {
  const hintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hint = hintRef.current
    if (!hint) return

    // Se desvanece cuando el usuario empieza a scrollear dentro de la sección
    const st = ScrollTrigger.create({
      trigger: '#experiencia',
      start: 'top top',
      end: 'top+=250 top',
      onUpdate: (self) => {
        const opacity = Math.max(0, 1 - self.progress * 2.5)
        gsap.to(hint, {
          opacity,
          duration: 0.15,
          overwrite: true,
        })
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div
      ref={hintRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 'clamp(4rem, 10vh, 7rem)',
        right: 'clamp(1.75rem, 4vw, 4.5rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        pointerEvents: 'none',
      }}
    >
      {/* Texto vertical "scroll" */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'var(--color-grain)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          opacity: 0.55,
        }}
      >
        scroll
      </span>

      {/* Línea animada que cae */}
      <div
        style={{
          width: '1px',
          height: '52px',
          background: 'linear-gradient(to bottom, var(--color-grain), transparent)',
          animation: 'scrollLineFall 2s ease-in-out infinite',
          opacity: 0.5,
        }}
      />

      {/* Keyframe de la animación — inyectado inline */}
      <style>{`
        @keyframes scrollLineFall {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 0; }
          40%  { transform: scaleY(1); transform-origin: top;    opacity: 0.5; }
          60%  { transform: scaleY(1); transform-origin: bottom; opacity: 0.5; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
```

---

### ARCHIVO 2: `src/hooks/useReducedMotion.ts`

Si este archivo no existe, crearlo:

```typescript
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
```

---

## MODIFICAR ARCHIVO EXISTENTE: `app/page.tsx`

Buscar la línea donde está el import de `KitchenScene` (o donde debería estar)
y reemplazarla. El orden final de las secciones tiene que quedar así:

```tsx
import { HeroSection }      from '@/components/sections/HeroSection'
import { ImmersiveSection } from '@/components/sections/ImmersiveSection'
import { ServicesSection }  from '@/components/sections/ServicesSection'
// ... resto de imports

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ImmersiveSection />    {/* ← NUEVA SECCIÓN */}
      <ServicesSection />
      {/* ... resto de secciones */}
    </main>
  )
}
```

Si existe algún import de `KitchenScene`, eliminarlo completamente.

---

## ARCHIVO DE VIDEO REQUERIDO

El componente espera este archivo:
```
/public/videos/kitchen-scrub.mp4
```

Si el archivo no existe todavía, el componente ya tiene un fallback
que muestra `/public/images/hero-kitchen.jpg` en su lugar.
La sección no va a romper — simplemente muestra la imagen estática
hasta que se agregue el video real.

Para activar el fallback manualmente mientras no hay video, agregar
este código al `useEffect` en `ImmersiveSection.tsx`, dentro del bloque
del `useEffect`, antes de `initScrub`:

```typescript
video.addEventListener('error', () => {
  const fallback = document.getElementById('immersive-fallback') as HTMLElement
  if (fallback) fallback.style.display = 'block'
  video.style.display = 'none'
}, { once: true })
```

---

## RESULTADO ESPERADO

```
╔═══════════════════════════════════════════════════════════════╗
║  [VIDEO: frame exacto según scroll — cocina real de SVC]     ║
║                                                               ║
║  Gradiente oscuro izquierda y fondo                          ║
║                                                               ║
║  ┌────────────────────────────────────┐                      ║
║  │ 01 / 04               [DM Mono]   │ ← oro, tracking alto ║
║  │                                    │                      ║
║  │ Cada mueble,          [Cormorant] │ ← italic, 4.5rem     ║
║  │ una decisión                       │                      ║
║  │ para siempre                       │                      ║
║  │                                    │                      ║
║  │ ──────                [línea fina]│ ← 40px, dorada       ║
║  │                                    │                      ║
║  │ Diseño y fabricación  [DM Sans]   │ ← light, gris cálido ║
║  │ a medida desde                     │                      ║
║  │ Río Tercero                        │                      ║
║  └────────────────────────────────────┘                      ║
║                                        │ scroll  [DM Mono]  ║
║                                        │ (línea animada)    ║
║  ══════════════════════════════════════════════════════════  ║
║  [Barra de progreso dorada, crece con el scroll]             ║
╚═══════════════════════════════════════════════════════════════╝
```

Conforme el usuario scrollea:
- El video avanza frame a frame (la cocina "se recorre")
- Los textos cambian de escena con fade + slide suave
- La barra dorada del fondo crece de izquierda a derecha
- El indicador "scroll" desaparece al empezar a scrollear

---

## NOTAS TÉCNICAS IMPORTANTES

1. **No tocar `scrub: 1.5`** — es el delay de seguimiento del scroll.
   Más alto = más cinematográfico pero más lag. 1.5 es el valor ideal.

2. **No agregar `autoPlay` al video** — el video no debe reproducirse solo.
   Su reproducción es 100% controlada por `currentTime` vía GSAP.

3. **El `preload="auto"` es obligatorio** — sin él, en mobile el video no
   tiene los frames disponibles hasta que el usuario llega a esa sección,
   causando saltos y frames en negro.

4. **Los valores `progress` en el array `SCENES`** deben ajustarse según
   el contenido real del video una vez que esté disponible.
   Para encontrar el valor correcto de cada escena:
   ```
   progress = momento_del_video_en_segundos / duracion_total_del_video
   ```
   Ejemplo: si el mejor plano de madera está en el segundo 4 de un video de 15s:
   `progress = 4 / 15 = 0.267`

5. **Responsive** — el componente funciona igual en mobile y desktop.
   En mobile `objectFit: cover` recorta los laterales del video
   manteniendo el centro en foco. No requiere CSS adicional.

6. **Performance** — el video no carga en el servidor (es un componente cliente).
   Si hay problemas de rendimiento, importar con:
   ```tsx
   const ImmersiveSection = dynamic(
     () => import('@/components/sections/ImmersiveSection').then(m => m.ImmersiveSection),
     { ssr: false }
   )
   ```

---

*Instrucciones para Antigravity — SVC Amoblamientos*
*Técnica: Video scrubbing con GSAP ScrollTrigger*
*Archivo generado: Julio 2026*
