# 📚 ÍNDICE COMPLETO DE DOCUMENTACIÓN

## SVC Amoblamientos - Landing Page

---

## 🎯 Por dónde empezar

### Si quieres entender TODO en detalle:
👉 **[DESCRIPCION_COMPLETA.md](./DESCRIPCION_COMPLETA.md)** (20 minutos de lectura)
- Descripción extremadamente detallada de cada sección
- Estética y colores explicados
- Sistema de diseño completo
- Animaciones técnicas

### Si quieres una visión general rápida:
👉 **[RESUMEN_EJECUTIVO.md](./RESUMEN_EJECUTIVO.md)** (3 minutos de lectura)
- Lo que hemos construido en números
- Checklist de características
- Próximos pasos recomendados

### Si quieres VER cómo se ve todo:
👉 **[GUIA_VISUAL.md](./GUIA_VISUAL.md)** (15 minutos, con ASCII art)
- Descripción visual de cada sección
- Ejemplo de cómo lucen los elementos
- Paleta de colores en acción

---

## 🔧 Para trabajar en el proyecto

### Necesitas ayuda setup inicial:
👉 **[README.md](./README.md)**
- Instrucciones de npm install
- Cómo correr el dev server
- Estructura básica del proyecto

### Necesitas colocar archivos (video, imágenes):
👉 **[ARCHIVOS_Y_CARPETAS.md](./ARCHIVOS_Y_CARPETAS.md)**
- Dónde colocar cada archivo
- Cómo renombrar correctamente
- Instrucciones paso a paso con fotos

### Necesitas descargar el video del Instagram:
👉 **[public/videos/DESCARGAR_VIDEO.md](./public/videos/DESCARGAR_VIDEO.md)**
- 3 opciones para descargar
- Instrucciones con yt-dlp
- Alternativas manuales

---

## 📋 Para planificar próximos pasos

### Qué falta hacer:
👉 **[CHECKLIST.md](./CHECKLIST.md)**
- Status de cada sección (✅ ✓ ⏳)
- Bloqueadores actuales (2)
- Features pending
- Timeline estimado

### Próximas tareas en orden:
👉 **[PASOS_SIGUIENTES.md](./PASOS_SIGUIENTES.md)**
- Orden recomendado de trabajo
- Prioridades (🔴 🟡 🟢)
- Lo que está completo vs pendiente

### Status actual del video:
👉 **[VIDEO_CONFIRMADO.md](./VIDEO_CONFIRMADO.md)**
- Confirmación que el video funciona
- Dónde está ubicado
- Próximas características

---

## 🎬 Para entender cada sección

| Sección | Archivos | Descripción | Status |
|---------|----------|-------------|--------|
| **Hero** | `src/components/sections/HeroSection.tsx` | Video 4K + animaciones | ✅ Completa |
| **Services** | `src/components/sections/ServicesSection.tsx` | Scroll horizontal | ✅ Completa |
| **Portfolio** | `src/components/sections/PortfolioSection.tsx` | Grid masonry | ✅ Completa (SVG placeholder) |
| **Process** | `src/components/sections/ProcessSection.tsx` | Timeline | ✅ Completa |
| **Kitchen 3D** | `src/components/sections/KitchenScene.tsx` | Placeholder | ⚠️ Deshabilitada |

**Para editar una sección:**
1. Abre el archivo .tsx
2. Modifica el contenido/estilos
3. El navegador se recargará automáticamente (Hot reload)

---

## 🎨 Para personalizar estilos

### Cambiar colores (paleta):
📄 **[src/app/globals.css](./src/app/globals.css)**
```css
--color-gold: #C9A84C;    /* ← Cambiar aquí */
--color-void: #0A0906;
--color-ivory: #F5F1E8;
```

### Cambiar datos de negocio:
📄 **[src/lib/constants.ts](./src/lib/constants.ts)**
```typescript
export const BUSINESS = {
  name: 'SVC Amoblamientos',
  phone: '+5493571234567',  // ← Actualizar
  email: 'contacto@...',    // ← Actualizar
}
```

### Cambiar animaciones GSAP:
📄 **[src/lib/gsapConfig.ts](./src/lib/gsapConfig.ts)**
- Configuración centralizada
- Timing, easing, triggers

---

## 📂 Estructura de carpetas

```
c:\Users\Daniela\Desktop\SVC\
│
├── 📄 README.md                    ← Setup e instrucciones
├── 📄 CHECKLIST.md                 ← Status y tareas
├── 📄 PASOS_SIGUIENTES.md          ← Próximos pasos
├── 📄 ARCHIVOS_Y_CARPETAS.md       ← Dónde colocar archivos
├── 📄 DESCRIPCION_COMPLETA.md      ← Descripción detallada
├── 📄 GUIA_VISUAL.md               ← ASCII art + visuals
├── 📄 VIDEO_CONFIRMADO.md          ← Status del video
├── 📄 RESUMEN_EJECUTIVO.md         ← Resumen rápido
├── 📄 INDICE_DOCUMENTACION.md      ← Este archivo
│
├── 📁 src/
│   ├── 📁 app/
│   │   ├── layout.tsx              ← Root layout
│   │   ├── page.tsx                ← Main page
│   │   └── globals.css             ← Design tokens
│   │
│   ├── 📁 components/sections/
│   │   ├── HeroSection.tsx         ← Video + animaciones
│   │   ├── ServicesSection.tsx     ← Scroll horizontal
│   │   ├── PortfolioSection.tsx    ← Grid masonry
│   │   └── ProcessSection.tsx      ← Timeline
│   │
│   └── 📁 lib/
│       ├── constants.ts            ← Datos de negocio
│       └── gsapConfig.ts           ← GSAP setup
│
├── 📁 public/
│   ├── 📁 videos/
│   │   └── hero.mp4                ← Video hero (28 MB)
│   │
│   └── 📁 images/portfolio/
│       ├── cocina-1.svg            ← Placeholder SVG
│       ├── detalle-1.svg
│       ├── comedor-1.svg
│       ├── placar-1.svg
│       ├── bano-1.svg
│       └── isla-1.svg
│
└── 📄 package.json
    tsconfig.json
    next.config.js
```

---

## 🚀 Comandos útiles

```powershell
# Ver la web en desarrollo
npm run dev                         # → http://localhost:3000

# Build para producción
npm run build

# Verificar tipos TypeScript
npx tsc --noEmit

# Ver qué cambió
git status
git diff src/
```

---

## 🎯 Guía rápida por tarea

### "Quiero agregar mis fotos de trabajos"
1. Lee: `ARCHIVOS_Y_CARPETAS.md` (Sección "Cómo agregar imágenes")
2. Coloca 6 JPG en: `public/images/portfolio/`
3. Borra los .svg viejos
4. ¡Listo!

### "Quiero cambiar los colores"
1. Abre: `src/app/globals.css`
2. Busca: `--color-gold: #C9A84C;`
3. Cambía a tu color
4. Recarga página

### "Quiero cambiar datos de negocio"
1. Abre: `src/lib/constants.ts`
2. Actualiza: BUSINESS.phone, BUSINESS.email, etc
3. Recarga página

### "Quiero deshabilitar una sección"
1. Abre: `src/app/page.tsx`
2. Comenta la línea de importación: `// import ServicesSection from ...`
3. Comenta el renderizado: `{/* <ServicesSection /> */}`
4. Recarga página

### "Quiero agregar una sección nueva"
1. Crea: `src/components/sections/NuevaSeccion.tsx`
2. Agrega en `page.tsx`: 
   ```tsx
   import NuevaSeccion from '@/components/sections/NuevaSeccion'
   ```
3. Renderiza:
   ```tsx
   <main>
     ...otras secciones...
     <NuevaSeccion />
   </main>
   ```

---

## ✨ Documentos por tipo de contenido

### 📖 Documentación técnica:
- `README.md` - Setup y estructura
- `DESCRIPCION_COMPLETA.md` - Detalle técnico

### 🎨 Documentación de diseño:
- `GUIA_VISUAL.md` - Lo que ves (ASCII art)
- `globals.css` - Tokens de diseño

### 📋 Documentación de tareas:
- `CHECKLIST.md` - Status de todo
- `PASOS_SIGUIENTES.md` - Qué hacer ahora
- `ARCHIVOS_Y_CARPETAS.md` - Dónde colocar cosas

### 📊 Documentación ejecutiva:
- `RESUMEN_EJECUTIVO.md` - Overview rápido
- `VIDEO_CONFIRMADO.md` - Status multimedia

---

## 🎓 Documentación por audiencia

### Si eres DESARROLLADOR:
- Lee: `README.md` (setup)
- Lee: `DESCRIPCION_COMPLETA.md` (detalle)
- Modifica: archivos en `src/`
- Usa: comandos en "Comandos útiles"

### Si eres CLIENTE/DUEÑO:
- Lee: `RESUMEN_EJECUTIVO.md` (qué hicimos)
- Ve: `GUIA_VISUAL.md` (cómo se ve)
- Sigue: `ARCHIVOS_Y_CARPETAS.md` (para agregar tus fotos)

### Si eres PROJECT MANAGER:
- Usa: `CHECKLIST.md` (tracking)
- Sigue: `PASOS_SIGUIENTES.md` (orden)
- Verifica: status en cada documento

---

## 🔍 Índice de palabras clave

**Busca en los documentos:**

- "Hero" → `DESCRIPCION_COMPLETA.md`, `GUIA_VISUAL.md`
- "Services" → `DESCRIPCION_COMPLETA.md`, `GUIA_VISUAL.md`
- "Portfolio" → `ARCHIVOS_Y_CARPETAS.md`, `GUIA_VISUAL.md`
- "Animaciones" → `DESCRIPCION_COMPLETA.md`
- "Colores" → `GUIA_VISUAL.md`, `globals.css`
- "Video" → `VIDEO_CONFIRMADO.md`, `ARCHIVOS_Y_CARPETAS.md`
- "Próximos pasos" → `CHECKLIST.md`, `PASOS_SIGUIENTES.md`

---

## 📞 ¿No encuentras lo que buscas?

| Pregunta | Documento |
|----------|-----------|
| ¿Cómo instalo? | `README.md` |
| ¿Cómo veo la página? | `README.md` |
| ¿Cómo agrego mis fotos? | `ARCHIVOS_Y_CARPETAS.md` |
| ¿Dónde está el video? | `VIDEO_CONFIRMADO.md` |
| ¿Cómo edito el contenido? | `DESCRIPCION_COMPLETA.md` |
| ¿Qué colores uses? | `GUIA_VISUAL.md` |
| ¿Qué falta hacer? | `CHECKLIST.md` |
| ¿Cuál es el próximo paso? | `PASOS_SIGUIENTES.md` |
| ¿Cómo se ve todo? | `GUIA_VISUAL.md` |

---

## ✅ Checklist de lectura recomendada

- [ ] **3 min:** `RESUMEN_EJECUTIVO.md` - Visión general
- [ ] **10 min:** `GUIA_VISUAL.md` - Cómo se ve
- [ ] **5 min:** `ARCHIVOS_Y_CARPETAS.md` - Dónde colocar archivos
- [ ] **20 min:** `DESCRIPCION_COMPLETA.md` - Detalle técnico
- [ ] **3 min:** `PASOS_SIGUIENTES.md` - Qué hacer ahora

**Tiempo total:** ~40 minutos para estar 100% al día ⏱️

---

**¡Bienvenido a la documentación de SVC Amoblamientos Landing Page! 🚀**

Cualquier pregunta, consulta el documento correspondiente arriba. Si aún así no encuentras respuesta, probablemente haya un error en la documentación - ¡avísanos! 😄

---

**Última actualización:** Mayo 2026  
**Documentación versión:** 1.0  
**Status:** Completa y actualizada
