# SVC Amoblamientos - Landing Page

Una landing page de lujo para **SVC Amoblamientos**, carpintería premium especializada en muebles a medida ubicada en Río Tercero, Córdoba.

## 🎯 Status

✅ **Completado:**
- Next.js 15 con TypeScript completo
- Sistema de diseño con Tailwind CSS v4
- 5 secciones principales implementadas
- GSAP 3.12 con ScrollTrigger para animaciones scroll
- Lenis para smooth scroll
- Build production exitoso

⏳ **Pendiente (Fácil integración):**
- Video hero (`/public/videos/hero.mp4`) - *Usuario debe descargar de Instagram*
- Imágenes de portfolio (`/public/images/portfolio/`) - *Necesita 6 imágenes JPG*
- 2 secciones finales: Testimonios + Contacto

❌ **Deshabilitado temporalmente:**
- Escena 3D (@react-three/fiber) - Error de inicialización con React; puede re-activarse

## 🚀 Arranque rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev
# → http://localhost:3001

# 3. Build production
npm run build
```

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx        # Layout raíz con SmoothScrollProvider
│   └── page.tsx          # Página principal (todas las secciones)
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx        # Hero con video + animaciones GSAP
│   │   ├── KitchenSceneClient.tsx # Placeholder 3D (deshabilitado)
│   │   ├── ServicesSection.tsx    # Scroll horizontal con 4 servicios
│   │   ├── PortfolioSection.tsx   # Grid masonry con imágenes
│   │   └── ProcessSection.tsx     # Timeline de 3 pasos
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx # Lenis + GSAP ticker sync
│   └── ui/
│       ├── SplitText.tsx
│       └── [...otros componentes]
├── lib/
│   ├── constants.ts      # Datos de negocio (SERVICES, BUSINESS)
│   └── gsapConfig.ts     # Lazy-loader para GSAP/ScrollTrigger
└── globals.css           # Tokens de diseño (colores, fuentes, etc)

public/
├── videos/
│   └── hero.mp4          # ← USUARIO DEBE DESCARGAR AQUÍ
└── images/
    └── portfolio/        # ← USUARIO DEBE AGREGAR IMÁGENES (6x JPG)
```

## 🎨 Diseño y animaciones

**Paleta de colores:**
- Oro primario: `#C9A84C` (CTA, acentos)
- Fondo oscuro: `#0A0906` (void)
- Texto crema: `#F5F1E8` (ivory)
- Gris oscuro: `#1A1815` (charcoal)

**Animaciones:**
- Hero: Scroll y word split con GSAP
- Services: Horizontal scroll pinned (300vh)
- Portfolio: Clip path reveal (inset 100% → 0%) con stagger 0.15s
- Process: Opacity + Y translate con stagger 0.2s
- Smooth scroll: Lenis deferred a useEffect

**Tipografía:**
- Display: Cormorant Garamond (italic, 2-3.5rem)
- Body: DM Sans (1rem, 1.125rem)
- Mono: DM Mono (labels, breadcrumbs)

## 📸 Cómo agregar el video hero

1. Visita: https://www.instagram.com/reel/DX9SA__CHki/
2. Descarga el video (usa herramienta como **yt-dlp** o **Instagram video downloader**)
3. Renombra a `hero.mp4`
4. Coloca en: `c:\Users\Daniela\Desktop\SVC\public\videos\hero.mp4`
5. Recarga el navegador en http://localhost:3001

```bash
# Opción: Descargar con yt-dlp (si lo tienes instalado)
yt-dlp -f best -o "hero.mp4" "https://www.instagram.com/reel/DX9SA__CHki/"
```

## 🖼️ Cómo agregar imágenes de portfolio

Necesitas 6 imágenes JPG en `public/images/portfolio/`:

```
cocina-1.jpg      (imagen grande, span 2 columnas)
detalle-1.jpg
comedor-1.jpg     (imagen grande, span 2 filas)
placar-1.jpg
baño-1.jpg
isla-1.jpg        (imagen grande, span 2 columnas)
```

Recomendación: Usar fotos de alta calidad (1200x1200px mínimo) de trabajos reales de SVC.

## 🔧 Personalización

### Cambiar datos de negocio

**`src/lib/constants.ts`:**
```typescript
export const BUSINESS = {
  name: 'SVC Amoblamientos',
  phone: '+5493571234567',  // ← Actualizar con número real
  email: 'contacto@...',
  instagram: '@svc_amoblamientos',
  ...
}
```

### Cambiar colores

**`src/globals.css`:**
```css
:root {
  --color-gold: #C9A84C;      /* ← Cambiar aquí */
  --color-void: #0A0906;
  ...
}
```

### Agregar secciones nuevas

1. Crear `src/components/sections/TuSeccion.tsx` como cliente (`'use client'`)
2. Importar en `src/app/page.tsx`
3. Renderizar en `<main>`

```tsx
'use client'
import { useEffect, useRef } from 'react'
import { initGSAP } from '@/lib/gsapConfig'

export default function TuSeccion() {
  const ref = useRef(null)
  
  useEffect(() => {
    const { gsap, ScrollTrigger } = initGSAP()
    // Agregar animaciones aquí
  }, [])
  
  return <section ref={ref}>{/* Tu contenido */}</section>
}
```

## ⚠️ Notas técnicas

- **SSR:** Página con `dynamic = 'force-dynamic'` porque Lenis/GSAP acceden al DOM
- **GSAP:** Se carga lazy en `useEffect` para evitar issues de contexto React
- **Three.js:** Deshabilitado por ahora (SceneContent causa error ReactCurrentOwner). Se puede re-habilitar después de aislar la inicialización en un componente separado con `ssr: false` en `next.config.js`

## 📋 Próximas características (backlog)

- [ ] **TestimonialsSection** - Carousel con reseñas de clientes (Framer Motion)
- [ ] **ContactSection** - Formulario + WhatsApp CTA (React Hook Form + Zod)
- [ ] **Re-enable 3D scene** - Escena interactiva (Three.js + r3f)
- [ ] **Mobile responsiveness** - Testing y refinamiento en tablets/móviles
- [ ] **Accessibility** - ARIA labels, keyboard nav, prefers-reduced-motion
- [ ] **SEO** - Meta tags, Open Graph, canonical URLs
- [ ] **Performance** - Image optimization, code splitting, analytics

## 🤝 Colaboración

Para actualizar contenido o agregar secciones:
1. Edita componentes en `src/components/sections/`
2. Ejecuta `npm run dev` para preview en tiempo real
3. El build está automatizado en `npm run build`

---

**Última actualización:** Enero 2025  
**Version:** 0.1.0 (Pre-lanzamiento)
