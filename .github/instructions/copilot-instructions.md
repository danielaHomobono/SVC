# 🏗️ COPILOT INSTRUCTIONS — Landing Page Inmersiva | Carpintería Artesanal

> Estas instrucciones son el spec completo de ingeniería y diseño para construir una landing page
> de nivel Awwwards para una carpintería artesanal ubicada en Río Tercero, Córdoba, Argentina.
> Seguir **cada sección en orden**. No improvisar decisiones arquitectónicas no especificadas aquí.

---

## 1. DECISIÓN DE STACK — Por qué este y no otro

| Tecnología | Versión | Rol | Razón de elección |
|---|---|---|---|
| **Next.js** | 15 (App Router) | Framework principal | SSG para máximo rendimiento, RSC por defecto, ya es el stack del proyecto |
| **TypeScript** | 5.x | Tipado | Seguridad en todo el proyecto |
| **Tailwind CSS** | v4 | Estilos base | Velocidad de desarrollo, JIT |
| **GSAP + ScrollTrigger** | 3.12+ | Animaciones scroll-driven | Estándar de la industria para webs Awwwards; adquirido por Webflow en 2024, 100% free incluyendo comercial |
| **@gsap/react** | latest | Hook `useGSAP` | Cleanup automático en componentes React, evita memory leaks |
| **Lenis** | 1.3.x | Smooth scroll | Reemplaza locomotive-scroll; se integra con el ticker de GSAP directamente |
| **Three.js + @react-three/fiber** | r165 / latest | Escena 3D inmersiva | La experiencia "entrar a la cocina" requiere WebGL; R3F hace Three.js nativo en React |
| **@react-three/drei** | latest | Helpers R3F | PerspectiveCamera, useGLTF, Environment, shadows sin boilerplate |
| **Framer Motion** | 12.x | Transiciones de página y micro-interacciones | Complementa GSAP: FM para state-driven UI animations, GSAP para scroll timelines |
| **React Hook Form + Zod** | latest | Formulario de contacto | Validación sin re-renders innecesarios |
| **next/font** | built-in | Tipografía | Zero layout shift, auto-optimización |

**Por qué NO Astro**: El proyecto ya usa Next.js y necesita React para R3F y Framer Motion.
**Por qué Three.js y no solo CSS 3D**: La experiencia de "volar dentro de la cocina" con camera path es incompatible con CSS transforms. WebGL es obligatorio.
**Por qué Lenis y no CSS scroll-behavior**: Lenis provee `lerp` configurable y se sincroniza con `gsap.ticker` para que GSAP ScrollTrigger y el render loop de Three.js corran en el mismo frame — crítico para 60fps sin jitter.

---

## 2. INSTALACIÓN — Comandos exactos

```bash
# Dependencias de producción
npm install gsap @gsap/react lenis three @react-three/fiber @react-three/drei framer-motion react-hook-form zod @hookform/resolvers

# Tipos
npm install -D @types/three
```

---

## 3. ESTRUCTURA DE ARCHIVOS — Crear exactamente esta estructura

```
src/
├── app/
│   ├── layout.tsx                    # RootLayout con SmoothScrollProvider + fonts
│   ├── page.tsx                      # Página principal — orquesta todas las secciones
│   └── globals.css                   # Tokens CSS + reset + Tailwind
├── components/
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx  # Lenis + GSAP ticker sync
│   ├── layout/
│   │   ├── Navbar.tsx                # Nav fija, se oculta on scroll down
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx           # Hero full-screen con video/imagen + texto reveal
│   │   ├── KitchenScene.tsx          # WebGL Three.js — la experiencia inmersiva central
│   │   ├── ServicesSection.tsx       # Horizontal scroll pinned — 4 categorías
│   │   ├── PortfolioSection.tsx      # Grid masonry con hover effects
│   │   ├── ProcessSection.tsx        # 3 pasos con stagger animations
│   │   ├── TestimonialsSection.tsx   # Carrusel de testimonios
│   │   └── ContactSection.tsx        # Formulario + WhatsApp CTA
│   ├── ui/
│   │   ├── SplitText.tsx             # Componente para animar texto caracter a caracter
│   │   ├── MagneticButton.tsx        # Botón con efecto magnético en hover
│   │   ├── CustomCursor.tsx          # Cursor personalizado que cambia según contexto
│   │   ├── WhatsAppButton.tsx        # Botón flotante WhatsApp
│   │   └── ContactForm.tsx           # Form con RHF + Zod
│   └── three/
│       ├── KitchenModel.tsx          # El modelo 3D de la cocina
│       └── CameraRig.tsx             # Controla el path de cámara según scroll
├── lib/
│   ├── gsapConfig.ts                 # Registro centralizado de plugins GSAP
│   ├── animations/
│   │   ├── textReveal.ts             # Reutilizable: reveal de texto con stagger
│   │   ├── fadeInUp.ts               # Reutilizable: fade + translateY
│   │   └── horizontalScroll.ts      # Lógica del scroll horizontal
│   └── constants.ts                  # Número de WhatsApp, textos, datos del negocio
├── hooks/
│   ├── useScrollProgress.ts          # Retorna scroll progress 0–1
│   └── useReducedMotion.ts           # Respeta prefers-reduced-motion
└── types/
    └── index.ts                      # Tipos TypeScript del proyecto
```

---

## 4. DISEÑO — Tokens, Tipografía y Paleta

### 4.1 Paleta de colores (definir en `globals.css` como CSS custom properties)

```css
:root {
  /* Fondos — del más oscuro al más claro */
  --color-void:       #0a0906;  /* Negro cálido — fondo principal de secciones dark */
  --color-charcoal:   #141210;  /* Fondo cards y overlays */
  --color-surface:    #1e1a16;  /* Superficies elevadas */

  /* Maderas — la identidad visual */
  --color-oak-dark:   #6b4c2e;  /* Roble oscuro */
  --color-oak:        #9d6f42;  /* Roble medio — el tono principal */
  --color-oak-light:  #c4956a;  /* Roble claro — hover states, accents */
  --color-grain:      #e8d5b8;  /* Tono de veta de madera — texto secundario */

  /* Blancos cálidos */
  --color-cream:      #f5f0e8;  /* Texto principal sobre fondos dark */
  --color-ivory:      #faf7f2;  /* El más claro — solo para headings en hero */

  /* Acento dorado */
  --color-gold:       #c9a84c;  /* Dorado artesanal — CTAs, líneas decorativas */
  --color-gold-muted: #8a6f34;  /* Dorado apagado — bordes, separadores */

  /* Sistema */
  --color-error:      #d97b6e;
  --color-success:    #7eab8a;

  /* Gradientes de uso frecuente */
  --gradient-hero: linear-gradient(
    180deg,
    rgba(10, 9, 6, 0) 0%,
    rgba(10, 9, 6, 0.6) 60%,
    rgba(10, 9, 6, 0.97) 100%
  );
  --gradient-wood: linear-gradient(
    135deg,
    var(--color-oak-dark) 0%,
    var(--color-oak) 50%,
    var(--color-oak-light) 100%
  );
}
```

### 4.2 Tipografía

```tsx
// app/layout.tsx — Importar con next/font/google
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
})
```

**Reglas de uso tipográfico:**
- `--font-display` (Cormorant Garamond): Headings H1–H3, el nombre del negocio, taglines. Itálica para énfasis emocional.
- `--font-body` (DM Sans): Párrafos, labels, navegación, botones.
- `--font-mono` (DM Mono): Números de pasos (01, 02, 03), labels técnicos, precio.

**Escala tipográfica:**
```css
/* globals.css */
--text-xs:   clamp(0.7rem,  0.65rem + 0.25vw, 0.8rem);
--text-sm:   clamp(0.85rem, 0.8rem  + 0.25vw, 0.95rem);
--text-base: clamp(1rem,    0.95rem + 0.25vw, 1.1rem);
--text-lg:   clamp(1.15rem, 1.1rem  + 0.3vw,  1.35rem);
--text-xl:   clamp(1.4rem,  1.2rem  + 1vw,    2rem);
--text-2xl:  clamp(1.8rem,  1.4rem  + 2vw,    3rem);
--text-3xl:  clamp(2.5rem,  1.8rem  + 3.5vw,  5rem);
--text-hero: clamp(3.5rem,  2rem    + 7vw,    9rem);
```

### 4.3 Espaciado y radios

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 999px;

--ease-smooth:  cubic-bezier(0.16, 1, 0.3, 1);      /* ease out expo */
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);  /* spring suave */
--ease-cinematic: cubic-bezier(0.77, 0, 0.175, 1);  /* ease in-out severo */
```

---

## 5. CONFIGURACIÓN BASE — Archivos de infraestructura

### 5.1 `lib/gsapConfig.ts`

```typescript
'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Registrar una sola vez — nunca llamar registerPlugin en componentes individuales
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
  gsap.defaults({ ease: 'power2.out' })
}

export { gsap, ScrollTrigger }
```

### 5.2 `components/providers/SmoothScrollProvider.tsx`

**Este es el componente más crítico del proyecto. Leer completo.**

```typescript
'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from '@/lib/gsapConfig'
import { ScrollTrigger } from '@/lib/gsapConfig'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // CRÍTICO: Sincronizar Lenis con el ticker de GSAP
    // Esto asegura que ScrollTrigger y el render loop de Three.js
    // corran en el mismo frame que Lenis, evitando el jitter.
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0) // Evitar el "catch-up" de GSAP en tabs inactivas

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => { lenis.raf(time * 1000) })
    }
  }, [])

  return <>{children}</>
}
```

### 5.3 `lib/constants.ts`

```typescript
export const BUSINESS = {
  name: 'Nombre de la Carpintería',   // ← Reemplazar con el nombre real
  tagline: 'Muebles que cuentan historias',
  phone: '+5493571000000',            // ← Reemplazar con número real de WhatsApp
  email: 'contacto@carpinteria.com',  // ← Reemplazar
  city: 'Río Tercero, Córdoba',
  instagram: '@carpinteria',          // ← Reemplazar
  leadTime: '48 horas de anticipación para presupuestos',
}

export const WHATSAPP_URL = `https://wa.me/${BUSINESS.phone.replace(/\D/g, '')}?text=Hola%2C%20me%20interesa%20un%20presupuesto%20para%20muebles`

export const SERVICES = [
  {
    id: 'cocinas',
    label: 'Cocinas',
    description: 'Diseño y fabricación de muebles de cocina a medida. Cada proyecto es único.',
    number: '01',
    color: '--color-oak',
  },
  {
    id: 'comedores',
    label: 'Comedores',
    description: 'Mesas, sillas y aparadores que transforman cada comida en una experiencia.',
    number: '02',
    color: '--color-oak-light',
  },
  {
    id: 'dormitorios',
    label: 'Dormitorios',
    description: 'Placares, cómodas y cabeceras que combinan funcionalidad y estética.',
    number: '03',
    color: '--color-grain',
  },
  {
    id: 'baños',
    label: 'Baños',
    description: 'Vanitorios y muebles de baño que resisten la humedad con elegancia.',
    number: '04',
    color: '--color-cream',
  },
]
```

### 5.4 `hooks/useReducedMotion.ts`

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

## 6. NAVBAR — `components/layout/Navbar.tsx`

**Comportamiento exacto:**
- Posición: `fixed top-0` con `z-index: 100`
- Fondo: Transparente en el hero; al hacer scroll > 80px → fondo `rgba(10, 9, 6, 0.92)` con `backdrop-filter: blur(12px)`, transición 400ms
- Logo: Nombre del negocio en Cormorant Garamond 500, cream, tamaño `--text-lg`
- Links: Anclas a secciones (`#servicios`, `#portfolio`, `#contacto`). DM Sans 300, color `--color-grain`. En hover → color `--color-cream`, underline animado con pseudo-elemento `::after` que se expande desde la izquierda.
- CTA en navbar: Botón "Presupuesto" → botón con borde `1px solid var(--color-gold)`, texto dorado, fondo transparente. En hover → fondo `--color-gold`, texto `--color-void`.
- Mobile: Hamburger menu. Al abrir → menú full-screen con fondo `--color-void`, links grandes con Cormorant Garamond italic. Animar con Framer Motion `AnimatePresence`.

**Animación de hide/show:**
```typescript
// Usar GSAP para ocultar navbar al scrollear hacia abajo, mostrar al subir
// Guardar lastScrollY en un ref, comparar en cada tick
```

---

## 7. HERO SECTION — `components/sections/HeroSection.tsx`

**Layout:** Full-viewport (`100dvh`). Stacking layers:
1. **Capa 0 (fondo):** `<video>` o imagen en `object-fit: cover` que ocupa el 100% — debe ser una cocina hermosa con iluminación cálida. Si no hay video disponible, usar un `<div>` con `background-image` a una imagen de alta calidad. `filter: brightness(0.45) saturate(1.1)`.
2. **Capa 1 (gradiente):** `position: absolute, inset: 0` con `background: var(--gradient-hero)`
3. **Capa 2 (contenido):** Centrado verticalmente con Flexbox, `padding: 0 clamp(1.5rem, 5vw, 6rem)`

**Contenido del hero:**
```
[label pequeño en DM Mono — ej: "Carpintería Artesanal · Río Tercero"]
[H1 en Cormorant Garamond — 2 líneas: "Muebles que" / "definen espacios"]
[Párrafo corto en DM Sans 300 — descripción de 1 línea]
[Dos botones: "Ver nuestro trabajo" (primario gold) | "WhatsApp" (ghost)]
[Scroll indicator animado abajo al centro]
```

**Animación de entrada (GSAP, se ejecuta una sola vez al montar):**
- El label: `y: 20 → 0, opacity: 0 → 1`, delay 0.3s, duration 0.8s
- H1 línea 1: cada palabra individual anima con stagger 0.1s, `y: 60 → 0, opacity: 0 → 1`
- H1 línea 2: ídem, delay adicional de 0.2s
- Párrafo: `y: 20 → 0, opacity: 0 → 1`, delay 0.9s
- Botones: stagger 0.15s, `y: 20 → 0, opacity: 0 → 1`
- Todo con `ease: 'power3.out'`, usando `gsap.context` y cleanup

**Efecto parallax en scroll:**
- El video/imagen de fondo: `y: 0 → 20%` conforme el usuario hace scroll desde el hero (GSAP ScrollTrigger scrub)
- El contenido del hero: `opacity: 1 → 0, y: 0 → -50px` al scrollear (ScrollTrigger scrub)

**Scroll indicator:**
- SVG de flecha o línea animada con CSS `@keyframes` bounce-suave
- Al hacer clic → smooth scroll a `#experiencia` vía Lenis

---

## 8. KITCHEN SCENE — `components/sections/KitchenScene.tsx` ⭐ SECCIÓN CENTRAL

Esta es la pieza más compleja y el diferenciador del sitio. El usuario scrollea y la cámara "entra" a la cocina.

### 8.1 Arquitectura general

```
<section id="experiencia" style="height: 400vh"> {/* Alto scroll para el pin */}
  <div className="sticky top-0 h-screen w-full"> {/* Canvas pegado */}
    <Canvas> {/* R3F */}
      <CameraRig />
      <KitchenModel />
      <ambientLight />
      <Environment />
    </Canvas>
    <div className="overlay-text"> {/* Texto HTML sobre el canvas */}
      {/* Textos que aparecen en cada "escena" */}
    </div>
  </div>
</section>
```

### 8.2 `components/three/KitchenModel.tsx`

**Opción A — Modelo GLTF (preferida):** Si existe un archivo `/public/models/kitchen.glb`, cargarlo con `useGLTF('/models/kitchen.glb')`.

**Opción B — Escena procedural (implementar esto si no hay modelo):**

Construir la cocina con Three.js primitivos:

```typescript
// Construir con BoxGeometry, PlaneGeometry, etc.
// Medidas realistas en unidades Three.js donde 1 = 1 metro

// PISO: PlaneGeometry 4x6, rotado -Math.PI/2, MeshStandardMaterial color #8B6344, roughness 0.8
// PAREDES: 3 PlaneGeometry, color #F5EFE0
// ISLA DE COCINA: BoxGeometry 1.8 x 0.9 x 0.8, MeshStandardMaterial color #4a3728
// ALACENAS SUPERIORES: 3× BoxGeometry 0.6 x 0.7 x 0.35, color #5c4230
// ALACENAS INFERIORES: BoxGeometry 2.4 x 0.85 x 0.6, color #4a3728
// MESADA: BoxGeometry 2.4 x 0.06 x 0.65, MeshStandardMaterial color #c8bfb0 (mármol simulado), roughness 0.1, metalness 0.05
// CANILLAS: CylinderGeometry pequeños, color #8B8989, metalness 0.9, roughness 0.1
// TECHO CON CLARABOYA: rectángulo blanco arriba con RectAreaLight que simule luz natural

// Todos los materiales usan MeshStandardMaterial para PBR correcto
// shadowMap activado en el renderer
// castShadow: true en objetos que generan sombra
// receiveShadow: true en piso y paredes
```

**Iluminación de la escena:**
```typescript
// Luz ambiente muy tenue para que no quede plano
<ambientLight intensity={0.3} color="#fff5e0" />

// Luz principal: simula ventana lateral con luz cálida
<directionalLight
  position={[3, 4, 2]}
  intensity={2.5}
  color="#ffe8c0"
  castShadow
  shadow-mapSize={[2048, 2048]}
/>

// Luz de relleno fría desde el lado opuesto para dar profundidad
<directionalLight position={[-2, 2, -1]} intensity={0.4} color="#c0d8ff" />

// Environment map para reflexiones realistas en la mesada y canillas
<Environment preset="apartment" background={false} />
```

### 8.3 `components/three/CameraRig.tsx` — El corazón de la experiencia

```typescript
'use client'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { gsap } from '@/lib/gsapConfig'
import { ScrollTrigger } from '@/lib/gsapConfig'
import * as THREE from 'three'

// El camera path define 4 "escenas" o posiciones clave de cámara:
const CAMERA_KEYFRAMES = [
  // Escena 0 — Vista exterior/panorámica (inicio del scroll)
  {
    position: new THREE.Vector3(0, 2.5, 8),
    target:   new THREE.Vector3(0, 1.0, 0),
    label: 'Diseño que inspira',
    sublabel: 'Cada cocina es un proyecto único',
  },
  // Escena 1 — Entrando: acercamiento frontal (25% del scroll)
  {
    position: new THREE.Vector3(0, 1.8, 4),
    target:   new THREE.Vector3(0, 1.2, 0),
    label: 'Madera seleccionada',
    sublabel: 'Materiales nobles, trabajo artesanal',
  },
  // Escena 2 — Dentro: plano desde la isla (50% del scroll)
  {
    position: new THREE.Vector3(-1.5, 1.4, 1),
    target:   new THREE.Vector3(0.5, 1.0, -1),
    label: 'Funcionalidad perfecta',
    sublabel: 'Cada centímetro pensado para vos',
  },
  // Escena 3 — Detalle de mesada (75% del scroll)
  {
    position: new THREE.Vector3(0.5, 1.2, 0.2),
    target:   new THREE.Vector3(-0.5, 0.9, -1.5),
    label: 'Terminaciones de élite',
    sublabel: 'Encastres exactos, sin compromiso',
  },
]

export function CameraRig() {
  const { camera } = useThree()
  const progressRef = useRef(0)
  const currentPos = useRef(new THREE.Vector3())
  const currentTarget = useRef(new THREE.Vector3())

  useEffect(() => {
    // GSAP ScrollTrigger controla un objeto proxy con valor 0–1
    const proxy = { progress: 0 }

    const st = ScrollTrigger.create({
      trigger: '#experiencia',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2.5, // Delay de seguimiento suave
      onUpdate: (self) => {
        progressRef.current = self.progress
      },
    })

    return () => st.kill()
  }, [])

  useFrame(() => {
    const p = progressRef.current
    // p va de 0 a 1; hay 3 segmentos entre 4 keyframes
    const segment = Math.min(p * 3, 2.9999) // 0-3
    const idx = Math.floor(segment)
    const t = segment - idx // 0-1 dentro del segmento

    const from = CAMERA_KEYFRAMES[idx]
    const to   = CAMERA_KEYFRAMES[idx + 1]

    if (!from || !to) return

    // Interpolación suave con easing cúbico
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    currentPos.current.lerpVectors(from.position, to.position, ease)
    currentTarget.current.lerpVectors(from.target, to.target, ease)

    camera.position.copy(currentPos.current)
    camera.lookAt(currentTarget.current)
  })

  return null
}
```

### 8.4 Textos superpuestos sobre la escena 3D

```typescript
// Fuera del Canvas, sobre él con position absolute
// Cada texto corresponde a una escena; se anima con GSAP según el scroll progress

// Estructura HTML:
<div className="scene-labels" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
  {CAMERA_KEYFRAMES.map((kf, i) => (
    <div
      key={i}
      className={`scene-label scene-label-${i}`}
      style={{
        position: 'absolute',
        bottom: '15%',
        left: 'clamp(1.5rem, 5vw, 6rem)',
        opacity: 0,
      }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', fontSize: 'var(--text-sm)' }}>
        0{i + 1} / 04
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-ivory)', fontStyle: 'italic' }}>
        {kf.label}
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--color-grain)' }}>
        {kf.sublabel}
      </p>
    </div>
  ))}
</div>

// GSAP para animar la opacidad según scroll progress:
// label[i] visible cuando progress ≈ i/3, fade in/out con threshold de 0.1
```

### 8.5 Performance de la escena 3D

- `<Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>`
- `frameloop="demand"` — solo re-render cuando hay cambio (ahorrar batería en mobile)
  - PERO: cuando hay scroll activo, forzar un render con `invalidate()` en el `useFrame`
- En mobile (`window.innerWidth < 768`): reducir `dpr` a `[1, 1.5]` y simplificar materiales
- Lazy load del componente con `dynamic(() => import('./KitchenScene'), { ssr: false })`
- Mostrar un `<div>` placeholder con imagen estática mientras Three.js carga
- `Suspense` wrapper con fallback de skeleton

---

## 9. SERVICES SECTION — `components/sections/ServicesSection.tsx`

**Concepto:** Scroll horizontal pinado — el usuario scrollea verticalmente pero el contenido se mueve horizontalmente (técnica clásica de sitios Awwwards).

**Estructura:**
```typescript
// La sección tiene height: 300vh para dar espacio al scroll horizontal
// El contenedor interno está pinado con GSAP ScrollTrigger pin: true
// El track horizontal se anima: x: 0 → -(totalWidth - viewportWidth)

<section id="servicios" style={{ height: '300vh' }}>
  <div ref={pinRef} style={{ height: '100vh', overflow: 'hidden' }}>
    {/* Header fijo arriba */}
    <div className="services-header">
      <span>[DM Mono] NUESTROS SERVICIOS</span>
      <h2>[Cormorant Garamond italic] Lo que hacemos</h2>
    </div>

    {/* Track horizontal */}
    <div ref={trackRef} className="services-track" style={{ display: 'flex', width: '400vw' }}>
      {SERVICES.map(service => <ServiceCard key={service.id} {...service} />)}
    </div>
  </div>
</section>
```

**Cada `ServiceCard`:**
- Ancho: `100vw`, alto: `100%`
- Fondo: imagen de fondo (cocina, comedor, dormitorio, baño) con overlay gradiente
- Número del servicio en DM Mono, tamaño `8rem`, color `var(--color-gold)`, `opacity: 0.15`, esquina superior derecha
- Título grande en Cormorant Garamond italic, tamaño `--text-3xl`, color `--color-ivory`
- Descripción en DM Sans 300, `--text-base`, color `--color-grain`
- Botón "Ver proyectos" → MagneticButton

**GSAP para el scroll horizontal:**
```typescript
useGSAP(() => {
  const track = trackRef.current
  const pin = pinRef.current
  if (!track || !pin) return

  const totalWidth = track.scrollWidth - window.innerWidth

  gsap.to(track, {
    x: -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: pin,
      start: 'top top',
      end: () => `+=${totalWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })
}, [])
```

---

## 10. PORTFOLIO SECTION — `components/sections/PortfolioSection.tsx`

**Layout:** Grid irregular de 2 columnas (desktop) con heights alternadas para efecto masonry visual.

```
┌────────────┬────────────┐
│  Img tall  │  Img short │
│  (cocina)  │  (detalle) │
├────────────┼────────────┤
│  Img short │  Img tall  │
│  (comedor) │  (placard) │
└────────────┴────────────┘
```

**Efectos:**
- Al hacer hover sobre una imagen: `scale: 1.05` en la imagen (overflow hidden en el container)
- Custom cursor cambia a "Ver proyecto" al entrar en la sección
- Cada imagen hace reveal al entrar en viewport: `clipPath: 'inset(100% 0 0 0)' → 'inset(0% 0 0 0)'` con `ease: 'power4.inOut'`, duration 1.2s
- Stagger de 0.15s entre imágenes
- Número del proyecto en DM Mono aparece en hover con fadeIn

**GSAP reveal:**
```typescript
useGSAP(() => {
  const items = gsap.utils.toArray<HTMLElement>('.portfolio-item')
  items.forEach((item) => {
    const img = item.querySelector('img')
    gsap.from(img, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.4,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        once: true,
      },
    })
  })
}, [])
```

---

## 11. PROCESS SECTION — `components/sections/ProcessSection.tsx`

**Contenido: 3 pasos del proceso**
```
01 — Consulta gratuita
     "Nos reunimos para entender tu espacio, estilo y presupuesto."

02 — Diseño y presupuesto
     "Elaboramos planos 3D y un presupuesto detallado en 48 horas."

03 — Fabricación e instalación
     "Fabricamos en nuestro taller con maderas seleccionadas e instalamos en tu hogar."
```

**Layout:** 3 columnas en desktop, 1 columna en mobile.

**Animación:**
- La línea conectora entre pasos: un `<div>` o SVG `<line>` que se "dibuja" con scroll (scaleX: 0 → 1 para CSS, o strokeDashoffset para SVG)
- Cada card de paso: stagger de 0.2s, `y: 40 → 0, opacity: 0 → 1`
- El número grande (01, 02, 03) en DM Mono: se anima con Framer Motion contador o simplemente fade in

---

## 12. TESTIMONIALS SECTION — `components/sections/TestimonialsSection.tsx`

**3–4 testimonios de clientes.** Carrusel auto-avanzado con Framer Motion `AnimatePresence`.

**Card de testimonio:**
- Fondo: `var(--color-surface)`, borde `1px solid rgba(201, 168, 76, 0.2)`
- Avatar: círculo de iniciales con fondo `var(--color-oak-dark)`
- Texto: comillas decorativas en Cormorant Garamond, tamaño grande, color `var(--color-gold)`, opacity 0.4
- Texto del testimonio: Cormorant Garamond italic, tamaño `--text-lg`, color `--color-cream`
- Nombre en DM Mono, `--text-sm`, color `--color-grain`

**Animación de transición entre slides:**
```typescript
// Framer Motion AnimatePresence con variants:
const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 200 : -200, opacity: 0 }),
}
// transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
```

---

## 13. CONTACT SECTION — `components/sections/ContactSection.tsx`

**Layout:** Dos columnas en desktop:
- Izquierda: Información de contacto + botón WhatsApp grande
- Derecha: Formulario

### 13.1 Información izquierda

```
[H2 Cormorant Garamond italic] "Empecemos a crear juntos"
[p DM Sans 300] Texto breve invitando a contactar
[DM Mono] Río Tercero, Córdoba, Argentina

[Botón WhatsApp prominente]
→ Fondo #25D366, texto blanco, icono SVG de WhatsApp
→ Texto: "Escribinos por WhatsApp"
→ Link: WHATSAPP_URL de constants.ts
→ Se abre en nueva pestaña (target="_blank" rel="noopener noreferrer")
→ Al hover: escala ligeramente (1.03), sombra verde
→ MagneticButton wrapper

[Horarios]
[Instagram link]
```

### 13.2 Formulario — `components/ui/ContactForm.tsx`

```typescript
// Schema Zod:
const schema = z.object({
  nombre:   z.string().min(2, 'Ingresá tu nombre'),
  telefono: z.string().min(8, 'Ingresá un teléfono válido'),
  email:    z.string().email('Email inválido').optional().or(z.literal('')),
  servicio: z.enum(['cocinas', 'comedores', 'dormitorios', 'baños', 'otro']),
  mensaje:  z.string().min(10, 'Contanos un poco más').max(500),
})

// Campos:
// - Nombre completo (text)
// - Teléfono (tel) — importante para Argentina
// - Email (email, opcional)
// - Servicio de interés (select)
// - Mensaje (textarea, min-height 120px)
// - Botón "Enviar consulta"

// Estilos de inputs:
// - Fondo: transparent, border-bottom: 1px solid var(--color-oak-dark)
// - Sin border-radius, estilo editorial minimal
// - En focus: border-bottom cambia a var(--color-gold), transición 300ms
// - Label: se mueve hacia arriba con animación CSS (floating label) cuando el input tiene valor
// - Error: texto en --color-error debajo del campo con fadeIn

// onSubmit:
// - Mostrar loading state en el botón (spinner animado con Framer Motion)
// - En esta versión: console.log(data) + mostrar mensaje de éxito
// - TODO para el desarrollador: conectar a Resend/Nodemailer/WhatsApp Business API
```

---

## 14. FLOATING WHATSAPP BUTTON — `components/ui/WhatsAppButton.tsx`

```typescript
// Posición: fixed bottom-6 right-6, z-index: 200
// Siempre visible EXCEPTO cuando la ContactSection está en viewport
// (usar IntersectionObserver para ocultarlo cuando ya se muestra el form)

// Diseño:
// - Círculo 56px × 56px
// - Fondo #25D366 (verde WhatsApp oficial)
// - Icono SVG de WhatsApp en blanco, 28px
// - Sombra: 0 4px 20px rgba(37, 211, 102, 0.4)
// - Pulse animation CSS: antes del ícono hay un círculo que pulsa infinito (opacity 0→0.4, scale 1→1.4)

// Al hover: tooltip "¡Escribinos!" aparece a la izquierda del botón
// Animación de entrada: escala 0→1 con spring, delay 2s después del load de página
```

---

## 15. COMPONENTES UI REUTILIZABLES

### 15.1 `components/ui/MagneticButton.tsx`

Efecto donde el botón "sigue" al cursor magnéticamente en hover.

```typescript
// Usar useRef en el elemento, mousemove event listener
// Calcular la posición relativa del cursor respecto al centro del botón
// GSAP.to(buttonRef.current, { x: deltaX * 0.3, y: deltaY * 0.3, duration: 0.3 })
// En mouseleave: GSAP.to(buttonRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
// Solo activar en desktop (window.innerWidth > 768)
```

### 15.2 `components/ui/CustomCursor.tsx`

```typescript
// Cursor personalizado que reemplaza el cursor nativo en desktop
// Dos círculos: uno pequeño (8px) que sigue al cursor exacto, uno grande (40px) con lag (lerp 0.1)
// El círculo grande es el "trailer" que crea el efecto visual

// Estados:
// - Default: círculo outline blanco
// - Hover sobre imagen/card: círculo lleno, texto "Ver" en DM Mono dentro del círculo grande
// - Hover sobre enlace: círculo se agranda y mezcla con el color del link (mix-blend-mode: difference)
// - Sobre CTA: color dorado

// Implementación: usar mousemove en document, requestAnimationFrame para lerp del trailer
// IMPORTANTE: <body style="cursor: none"> — solo cuando el componente esté montado
// En mobile/tablet: no renderizar (detectar con navigator.maxTouchPoints)
```

### 15.3 `components/ui/SplitText.tsx`

```typescript
// Componente que toma un string y lo divide en <span> por palabras o caracteres
// Props: text, by: 'words' | 'chars', className
// Cada span tiene display: inline-block para que GSAP pueda animar y, x, rotation
// Útil para las animaciones del Hero y títulos de sección
```

---

## 16. FOOTER — `components/layout/Footer.tsx`

```
[Logo / Nombre grande en Cormorant Garamond, tamaño grande, color var(--color-oak) opacity 0.3]
[Grid 3 columnas:]
  Col 1: Navegación (anclas a secciones)
  Col 2: Contacto (teléfono, ciudad, email)
  Col 3: RRSS (Instagram link)
[Línea separadora: 1px solid var(--color-gold-muted)]
[Copyright: DM Mono, --text-xs, color var(--color-grain) opacity 0.6]
```

---

## 17. PERFORMANCE Y SEO

### 17.1 Metadata en `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Nombre Carpintería — Muebles de Cocina a Medida | Río Tercero',
  description: 'Carpintería artesanal en Río Tercero, Córdoba. Diseñamos y fabricamos muebles de cocina, comedor, dormitorios y baños a medida. Consultá sin cargo.',
  keywords: ['carpintería', 'muebles cocina', 'Río Tercero', 'Córdoba', 'muebles a medida'],
  openGraph: {
    title: 'Nombre Carpintería',
    description: 'Muebles artesanales a medida en Río Tercero, Córdoba',
    type: 'website',
    locale: 'es_AR',
  },
}
```

### 17.2 Reglas obligatorias de performance

1. **Three.js es SSR-incompatible:** El componente `KitchenScene` DEBE importarse con `dynamic(..., { ssr: false })`.
2. **Images:** Usar `next/image` en TODOS los `<img>`. Siempre `priority` en la imagen del hero. Tamaños con `sizes` apropiados.
3. **GSAP cleanup:** Cada `useGSAP` debe retornar la función de cleanup o usar el contexto automático.
4. **Three.js dispose:** Al desmontar el canvas, llamar `renderer.dispose()` y `gl.getExtension('WEBGL_lose_context')?.loseContext()`.
5. **prefers-reduced-motion:** En todos los componentes que usan `useGSAP`, llamar `useReducedMotion()` y si es `true`, no inicializar animaciones.
6. **Fonts:** Solo cargar los pesos de fuente especificados. No cargar todos los pesos.
7. **Lenis en mobile:** `touchMultiplier: 2` para mejor responsiveness táctil.

### 17.3 Responsive breakpoints

```
Mobile:  < 640px  — Single column, sin custom cursor, Three.js con menor complejidad
Tablet:  640–1024px
Desktop: > 1024px — Experiencia completa
```

---

## 18. ANIMACIONES — Guía de timing unificada

| Efecto | Duration | Ease | Delay |
|---|---|---|---|
| Entrada de página | 0.8s | power3.out | stagger 0.1s |
| Reveal de texto (palabras) | 0.9s | power3.out | stagger 0.08s |
| Reveal de imágenes (clipPath) | 1.4s | power4.inOut | — |
| Fade in genérico | 0.7s | power2.out | — |
| Hover button | 0.25s | power2.out | — |
| Hover imagen scale | 0.4s | power2.out | — |
| Magnetic button | 0.3s (in) / 0.5s (out) | out / elastic.out | — |
| Cursor trailer | lerp 0.1 | — | — |
| Camera scrub | scrub: 2.5 | — | — |
| Horizontal scroll | scrub: 1 | none | — |
| Page transition (Framer) | 0.6s | [0.16, 1, 0.3, 1] | — |

---

## 19. CHECKLIST DE IMPLEMENTACIÓN — Orden de trabajo

- [ ] `npm install` con todas las dependencias listadas
- [ ] Configurar `globals.css` con TODOS los tokens CSS
- [ ] Crear `lib/gsapConfig.ts`
- [ ] Crear `hooks/useReducedMotion.ts`
- [ ] Crear `lib/constants.ts` con datos reales del negocio
- [ ] Crear `SmoothScrollProvider.tsx` e integrarlo en `app/layout.tsx`
- [ ] Crear `CustomCursor.tsx`
- [ ] Crear `Navbar.tsx`
- [ ] Crear `HeroSection.tsx` con animaciones de entrada
- [ ] Crear `KitchenModel.tsx` con geometría procedural
- [ ] Crear `CameraRig.tsx` con el path de cámara
- [ ] Crear `KitchenScene.tsx` como contenedor R3F con `dynamic` SSR false
- [ ] Crear `ServicesSection.tsx` con scroll horizontal
- [ ] Crear `PortfolioSection.tsx` con reveals
- [ ] Crear `ProcessSection.tsx`
- [ ] Crear `TestimonialsSection.tsx`
- [ ] Crear `ContactForm.tsx` con validación Zod
- [ ] Crear `ContactSection.tsx`
- [ ] Crear `WhatsAppButton.tsx` flotante
- [ ] Crear `Footer.tsx`
- [ ] Armar `app/page.tsx` con el orden de secciones
- [ ] Probar performance: Lighthouse > 80 en mobile
- [ ] Verificar prefers-reduced-motion en todas las secciones
- [ ] Verificar links de WhatsApp con número real
- [ ] Test en Chrome, Firefox, Safari
- [ ] Verificar que Three.js no rompe con SSR

---

## 20. VARIABLES DE ENTORNO Y REFERENCIAS FINALES

```env
# .env.local
NEXT_PUBLIC_WHATSAPP_NUMBER=5493571000000
NEXT_PUBLIC_BUSINESS_NAME="Nombre de la Carpintería"
# Para cuando se conecte el formulario a un servicio de email:
# RESEND_API_KEY=re_...
```

**Referencias visuales de inspiración (para el diseño):**
- **Bulthaup.com** — Paleta oscura, tipografía editorial, espaciado generoso
- **Poliform.it** — Grid de portafolio con imágenes de alta calidad
- **madewithgsap.com** — Scroll animations de referencia
- **Awwwards SOTD con Three.js** — JReyes MC portfolio (navegación con scroll por escena 3D)
- **Arclinea.it** — Fotografía de cocinas, color y textura de materiales

**El criterio rector de cada decisión de diseño:**
> "¿Esto hace que el usuario sienta que está viendo el trabajo de un maestro artesano que vale confiar?"
> Si la respuesta es sí → implementarlo. Si no → simplificar.

---

*Spec generado para proyecto de carpintería artesanal, Río Tercero, Córdoba, Argentina.*
*Stack: Next.js 15 · Three.js / R3F · GSAP 3.12 · Lenis · Framer Motion · Tailwind CSS v4*