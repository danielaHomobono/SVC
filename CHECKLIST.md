## 📋 Checklist de Implementación - SVC Amoblamientos Landing

**Fecha:** Enero 2025  
**Estado:** ✅ Pre-Lanzamiento (5 de 7 secciones completadas)

---

## ✅ Completado

### 1. **Infrastructure & Setup**
- ✅ Next.js 15 + TypeScript scaffold
- ✅ npm install (con legacy-peer-deps)
- ✅ Build pipeline (`npm run build`) exitoso
- ✅ Dev server (`npm run dev`) en puerto 3001
- ✅ SmoothScrollProvider (Lenis + GSAP sync)

### 2. **HeroSection** ✓
- ✅ Video background (`<video>` tag)
- ✅ Animaciones GSAP (word split, scroll triggers)
- ✅ SVC Amoblamientos branding
- ✅ 2 CTA buttons (Ver nuestro trabajo + WhatsApp)
- ✅ Scroll indicator con bounce animation
- ⏳ Necesita: Video en `/public/videos/hero.mp4`

### 3. **KitchenSceneClient / Escena 3D** ✓
- ✅ Placeholder renderizando (sin errores)
- ✅ Texto: "Escena 3D en desarrollo"
- ⚠️ Deshabilitado temporalmente (@react-three/fiber initialization issue)
- 🔵 Futuro: Re-activar con proper SSR handling

### 4. **ServicesSection** ✓
- ✅ Horizontal scroll (300vh pinned)
- ✅ Slide intro + 4 service cards
- ✅ Datos en `constants.ts` (Cocinas, Comedores, Dormitorios, Baños)
- ✅ Animaciones GSAP ScrollTrigger
- ✅ Features/bullets para cada servicio
- ✅ Responsive grid (mobile-first)

### 5. **PortfolioSection** ✓
- ✅ Masonry grid layout
- ✅ Clip-path reveal animations (stagger 0.15s)
- ✅ Hover scale effect (1.05)
- ✅ Variable grid spans (algunas imágenes 2-col, 2-row)
- ⏳ Necesita: 6 imágenes JPG en `/public/images/portfolio/`

### 6. **ProcessSection** ✓
- ✅ Timeline de 3 pasos (Consulta → Diseño → Fabricación)
- ✅ Números circulares (01, 02, 03)
- ✅ Connecting line con animación
- ✅ Stagger animations (0.2s)
- ✅ CTA: "Solicitar presupuesto"

### 7. **Design Tokens & Styling** ✓
- ✅ Paleta de colores (Oro, Void, Ivory, Charcoal)
- ✅ Tipografía (Cormorant Garamond, DM Sans, DM Mono)
- ✅ Spacing scale (clamp basado en vw)
- ✅ Border radius tokens
- ✅ Gradients (gold, fade-to-black)

---

## ⏳ Próximos Pasos (Prioridad)

### 🔴 **BLOQUEADOR 1: Video Hero**
**Status:** ⏳ Esperando usuario  
**Descripción:** Sin video, hero se ve vacío

**Acción requerida:**
```bash
# Descarga el video de Instagram:
# https://www.instagram.com/reel/DX9SA__CHki/

# Colócalo en:
# c:\Users\Daniela\Desktop\SVC\public\videos\hero.mp4

# Luego recarga: http://localhost:3001
```

**Alternativa (si tienes yt-dlp instalado):**
```bash
cd c:\Users\Daniela\Desktop\SVC\public\videos
yt-dlp -f best -o "hero.mp4" "https://www.instagram.com/reel/DX9SA__CHki/"
```

---

### 🔴 **BLOQUEADOR 2: Imágenes Portfolio**
**Status:** ⏳ Esperando usuario  
**Descripción:** Portfolio muestra placeholders 404

**Acción requerida:**  
Coloca 6 imágenes JPG en `c:\Users\Daniela\Desktop\SVC\public\images\portfolio\`:

```
cocina-1.jpg      ← Imagen grande (span 2 columnas)
detalle-1.jpg
comedor-1.jpg     ← Imagen grande (span 2 filas) 
placar-1.jpg
baño-1.jpg        ← Nombre correcto (sin tilde en archivo)
isla-1.jpg        ← Imagen grande (span 2 columnas)
```

**Recomendaciones:**
- Mínimo 1200x1200px de resolución
- Fotografías reales de trabajos de SVC
- Formatos: JPG, PNG o WebP

---

### 🟡 **FEATURE 1: TestimonialsSection** (Carousel)
**Componente:** `src/components/sections/TestimonialsSection.tsx`

**Requisitos:**
- Carousel con Framer Motion
- AnimatePresence para transiciones
- Auto-advance cada 6 segundos (con pausa en hover)
- Dots/bullets para navegación
- Contenido: 3-5 testimonios de clientes reales

**Datos necesarios:**
```typescript
// En constants.ts, agregar:
export const TESTIMONIALS = [
  { name: 'Juan Perez', city: 'Río Tercero', text: '...', rating: 5 },
  // ...
]
```

---

### 🟡 **FEATURE 2: ContactSection** (Formulario + WhatsApp)
**Componentes:**
- `src/components/sections/ContactSection.tsx`
- `src/components/ui/ContactForm.tsx` (ya creado, necesita wiring)

**Requisitos:**
- Dos columnas: Info (izq) + Formulario (der)
- Formulario con React Hook Form + Zod
- Campos: Nombre, Email, Teléfono, Mensaje, Servicio
- Botones: Enviar + WhatsApp CTA flotante
- Validación en tiempo real

**Datos necesarios:**
```typescript
// Actualizar en constants.ts:
export const BUSINESS = {
  name: 'SVC Amoblamientos',
  phone: '+5493571234567',     // ← Número real
  email: 'contacto@svc...',    // ← Email real
  address: 'Dirección completa',
  hours: '...',
  ...
}
```

---

### 🟢 **POLISH 1: Mobile Responsiveness**
**Status:** ⏳ Testing needed

**Checklist:**
- [ ] Hero: Responsive text sizes (clamp está bien, pero verificar en móvil)
- [ ] Services: Scrollable en mobile, no horizontal
- [ ] Portfolio: 1 columna en móvil, 2 en tablet, 3 en desktop
- [ ] Process: Stacked en móvil, centrado
- [ ] Navbar: Mobile menu (hamburger)
- [ ] Touchscreen: Mejorar hover states para touch

---

### 🟢 **POLISH 2: Accessibility & SEO**
**Status:** ⏳ Implementation needed

**A11y:**
- [ ] prefers-reduced-motion hook (deshabilitar GSAP)
- [ ] ARIA labels en botones/links
- [ ] Keyboard navigation completa
- [ ] Color contrast verified

**SEO:**
- [ ] Meta description, Open Graph
- [ ] Canonical URLs
- [ ] Structured data (Schema.org)
- [ ] Alt text en todas las imágenes

---

### 🟢 **POLISH 3: Re-enable 3D Scene** (Optional, Nice-to-Have)
**Status:** ⏳ Future enhancement

**Problema actual:**
- @react-three/fiber throws ReactCurrentOwner error
- SSR incompatible

**Solución propuesta:**
1. Crear `KitchenSceneLoader.tsx` (client-only wrapper)
2. Usar `dynamic()` de Next.js con `ssr: false`
3. Importar Canvas dentro de `useEffect` (after mount)
4. Implement CameraRig + KitchenModel

**Código template:**
```tsx
// KitchenSceneLoader.tsx
'use client'
import dynamic from 'next/dynamic'

const KitchenSceneContent = dynamic(
  () => import('./SceneContent'),
  { ssr: false, loading: () => <Placeholder /> }
)

export default function KitchenSceneLoader() {
  return <KitchenSceneContent />
}
```

---

## 📊 Summary

| Sección | Estado | % | Bloqueadores |
|---------|--------|-----|---------------|
| Hero | ✅ 95% | 95% | Video |
| Kitchen/3D | ⚠️ 50% | 50% | R3F init issue |
| Services | ✅ 100% | 100% | Ninguno |
| Portfolio | ✅ 90% | 90% | Imágenes |
| Process | ✅ 100% | 100% | Ninguno |
| Testimonials | ⏳ 0% | 0% | Diseño pendiente |
| Contact | ⏳ 20% | 20% | Integración pendiente |
| **Total** | **✅ 65%** | **65%** | **2 bloqueadores** |

---

## 🛠️ Comandos útiles

```bash
# Desarrollo
npm run dev                  # Servidor en http://localhost:3001

# Build & Deploy
npm run build              # Compilar para producción
npm start                  # Ejecutar build producción

# Linting & Checking
npm run lint               # ESLint (si está configurado)
npx tsc --noEmit          # TypeScript check

# Debugging
# En VSCode, F5 para debugger (si launch.json está configurado)
```

---

## 📞 Notas para el siguiente trabajo

1. **Video Hero:** Una vez descargado, la sección hero se verá completa
2. **Portfolio:** Reemplazar los 6 archivos JPG con fotos reales de SVC
3. **Contacto:** Actualizar email/teléfono real en `constants.ts`
4. **Testing:** Verificar en móvil, tablet, Firefox/Safari (no solo Chrome)
5. **Performance:** Usar Lighthouse (DevTools) para auditar después de agregar imágenes

---

**Última actualización:** Enero 2025  
**Próxima revisión:** Cuando se agreguen Video + Imágenes
