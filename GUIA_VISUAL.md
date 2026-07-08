# 🎬 GUÍA VISUAL COMPLETA - SVC Amoblamientos Landing

## 📺 Lo que ves cuando abres http://localhost:3000

---

## 🎥 SECCIÓN 1: HERO (Primera pantalla)

### Vista completa:
```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  [VIDEO DEL INSTAGRAM REEL - 4K, loop infinito]         ║
║                                                           ║
║  ┌─────────────────────────────────────────────────┐    ║
║  │ Carpintería Artesanal · Río Tercero             │    ║
║  │                                                  │    ║
║  │ Muebles a medida que transforman espacios       │    ║
║  │                                                  │    ║
║  │ Diseño y fabricación artesanal de muebles       │    ║
║  │ premium. Cada proyecto es único.                │    ║
║  │                                                  │    ║
║  │ [Ver nuestro trabajo]  [WhatsApp]              │    ║
║  │                                                  │    ║
║  │ ↓↓↓ (scroll indicator bouncing)                 │    ║
║  └─────────────────────────────────────────────────┘    ║
║                                                           ║
║                      100vh altura                         ║
╚═══════════════════════════════════════════════════════════╝
```

### Colores en esta sección:
- **Video:** Colores naturales (muebles de madera real de SVC)
- **Overlay:** Gradiente oscuro (negro 25% → negro 70%)
- **Texto principal:** Crema (#F5F1E8)
- **Etiqueta:** Oro pequeño (#C9A84C)
- **Botones:** Oro fondo + texto oscuro, borde dorado

### Interacciones:
- El texto **aparece animado** cuando cargas la página
- El **video reproduce automáticamente** sin sonido
- Los botones **escalan** al pasar el mouse
- El **scroll indicator bota** continuamente

---

## 🏢 SECCIÓN 2: SERVICES (Scroll horizontal)

### Vista completa (user scrolls vertically, content moves horizontally):

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  Fondo: Gradiente negro → gris oscuro                    ║
║                                                           ║
║  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ║
║  ┃                                                 ┃    ║
║  ┃      Lo que ofrecemos                          ┃    ║
║  ┃      Soluciones de carpintería a medida        ┃    ║
║  ┃                                                 ┃    ║
║  ┃      [SLIDE 1 - INTRO - ancho: 85vw]          ┃    ║
║  ┃                                                 ┃    ║
║  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ║
║                                                           ║
║                    [Scroll down para ver más]            ║
║  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ║
║  ┃                                                 ┃    ║
║  ┃   ┌─────┐                                       ┃    ║
║  ┃   │ 01  │  Cocinas Premium                     ┃    ║
║  ┃   └─────┘                                       ┃    ║
║  ┃   Diseño y fabricación de muebles...           ┃    ║
║  ┃                                                 ┃    ║
║  ┃   ✓ Medidas personalizadas                     ┃    ║
║  ┃   ✓ Herrajes alemanes                          ┃    ║
║  ┃   ✓ Acabados a elección                        ┃    ║
║  ┃   ✓ Asesoramiento gratuito                     ┃    ║
║  ┃                                                 ┃    ║
║  ┃  [SLIDE 2 - SERVICE 1 - ancho: 85vw]         ┃    ║
║  ┃                                                 ┃    ║
║  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ║
║                                                           ║
║                    (continúa con más slides...)          ║
║  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ║
║  ┃   ┌─────┐                                       ┃    ║
║  ┃   │ 02  │  Comedores Elegantes                 ┃    ║
║  ┃   └─────┘                                       ┃    ║
║  ┃   Mesas, sillas y aparadores...                ┃    ║
║  ┃   ...                                           ┃    ║
║  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ║
║                                                           ║
║  [slides 3 y 4: Dormitorios + Baños]                   ║
║                                                           ║
║  Total: 5 slides (1 intro + 4 servicios)                ║
║  Scroll total: ~180vh (más corto que antes)            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Estilo de las cards:
```
┌──────────────────────────────────┐
│ Fondo: Semi-transparente oscuro  │  ← rgba(255,255,255,0.02)
│ Borde: Fino, oro muy débil       │  ← border-radius 16px
│ Efecto: Frosted glass (blur)     │
│                                  │
│      ┏━━━━━━━━━━┓                │
│      ┃   01    ┃ ← Círculo oro  │
│      ┗━━━━━━━━━━┛                │
│                                  │
│   Título en itálica grande       │
│                                  │
│   Descripción en gris claro      │
│   multiple líneas...             │
│                                  │
│   ✓ Feature 1 (en oro)          │
│   ✓ Feature 2                    │
│   ✓ Feature 3                    │
│   ✓ Feature 4                    │
└──────────────────────────────────┘
```

### Animación:
- **Efecto:** Smooth horizontal scroll (como carousel, pero con scroll vertical)
- **Velocidad:** Depende de tu scroll (scrub: 1)
- **La sección se fija** (pin: true) mientras scrolleas

---

## 🖼️ SECCIÓN 3: PORTFOLIO (Masonry Grid)

### Vista completa:

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  NUESTRO TRABAJO                                          ║
║  Proyectos que transforman espacios                       ║
║                                                           ║
║  Cada mueble es una obra de arte...                      ║
║                                                           ║
║  ┌─────────────────────────────┬──────────┐             ║
║  │                             │          │             ║
║  │  Cocina Premium Roble       │ Detalle  │             ║
║  │  (imagen grande - 2 cols)   │ Herrajes │             ║
║  │                             │          │             ║
║  │                             ├──────────┤             ║
║  │                             │  Placar  │             ║
║  │                             │          │             ║
║  │                             ├──────────┤             ║
║  │                             │  Baño    │             ║
║  │                             │          │             ║
║  └─────────────────────────────┤          │             ║
║  ┌─────────────────────────────┤          │             ║
║  │                             │          │             ║
║  │  Comedor Moderno            │          │             ║
║  │  (imagen grande - 2 filas)  │          │             ║
║  │                             │          │             ║
║  │                             │          │             ║
║  │                             │          │             ║
║  └─────────────────────────────┴──────────┘             ║
║  ┌──────────────────────────────────────────┐           ║
║  │                                          │           ║
║  │  Isla de Cocina (imagen grande - 2col) │           ║
║  │                                          │           ║
║  └──────────────────────────────────────────┘           ║
║                                                           ║
║  [Ver más proyectos]                                    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Detalle de cada imagen (on hover):

```
┌──────────────────────────┐
│  [Imagen]                │
│  ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁  │
│  [Gradient oscuro arriba]│
│                          │
│  COCINAS                 │  ← Label pequeño en oro
│  Cocina Premium Roble    │  ← Título
│  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │
└──────────────────────────┘
```

### Animación:
- **En scroll:**
  - Clip-path: La imagen se "revela" desde arriba (100% → 0%)
  - Duration: 1.4 segundos
  - Stagger: 0.15s entre cada imagen
- **En hover:**
  - Imagen escala 1.05x (zoom suave)
  - Overlay aparece (opacity 0→1)
  - Duración: 0.3-0.4s

---

## 📋 SECCIÓN 4: PROCESS (Timeline)

### Vista completa:

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  NUESTRO PROCESO                                          ║
║  De la idea a la realidad                                ║
║                                                           ║
║  Un proceso transparente y colaborativo...               ║
║                                                           ║
║                    ┌──────────┐                           ║
║                    │   01     │  ← Número en círculo    ║
║                    └──────────┘                           ║
║                         │                                 ║
║                    Línea oro animada                      ║
║                         │                                 ║
║              ┌──────────────────────────┐                ║
║              │ Consulta Inicial         │                ║
║              │                          │                ║
║              │ Nos reunimos contigo...  │                ║
║              │                          │                ║
║              │ Día 1                    │  ← Timeline    ║
║              └──────────────────────────┘                ║
║                         │                                 ║
║                    Línea oro                              ║
║                         │                                 ║
║                    ┌──────────┐                           ║
║                    │   02     │                           ║
║                    └──────────┘                           ║
║                         │                                 ║
║                    Línea oro                              ║
║                         │                                 ║
║              ┌──────────────────────────┐                ║
║              │ Diseño y Presupuesto     │                ║
║              │                          │                ║
║              │ Creamos planos 3D...     │                ║
║              │                          │                ║
║              │ 3-5 días                 │                ║
║              └──────────────────────────┘                ║
║                         │                                 ║
║                    Línea oro                              ║
║                         │                                 ║
║                    ┌──────────┐                           ║
║                    │   03     │                           ║
║                    └──────────┘                           ║
║                         │                                 ║
║                    Línea oro                              ║
║                         │                                 ║
║              ┌──────────────────────────┐                ║
║              │ Fabricación e Instalación│                ║
║              │                          │                ║
║              │ Construimos tu mueble... │                ║
║              │                          │                ║
║              │ 2-6 semanas              │                ║
║              └──────────────────────────┘                ║
║                                                           ║
║  ¿Listo para comenzar?                                  ║
║  [Solicitar presupuesto]                                ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Detalle de una card:

```
        ┌────────────────────┐
        │        01          │  ← Círculo 60px, borde oro
        └────────────────────┘
                  ▲
                  │ Se ve encima de la card
                  │
        ┌────────────────────────────┐
        │                            │
        │ Día 1 (etiqueta pequeña)  │  ← DM Mono, oro
        │                            │
        │ Consulta Inicial           │  ← Título itálica grande
        │ (Cormorant, #F5F1E8)      │
        │                            │
        │ Nos reunimos contigo para  │  ← Descripción en gris
        │ entender tu visión,        │  ← DM Sans, #A39B90
        │ necesidades, presupuesto   │
        │ y cronograma. Visitamos    │
        │ el espacio si es necesario.│
        │                            │
        └────────────────────────────┘
        Background: Semi-transparent dark
        Border: Línea fina oro
        BorderRadius: 16px
```

### Animación:
- **Números:** Aparecen con escala y opacity
- **Línea:** Se dibuja en Y (scaleY 0→1) al scrollear
- **Cards:** Fade in + slide up (y: 50px→0)
- **Stagger:** 0.2s entre cada elemento

---

## 🎨 PALETA DE COLORES EN ACCIÓN

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  #0A0906 (Void - Negro casi puro)                      │
│  ███████████████████████████████████████████████ 100%  │
│  ↑                                                      │
│  Fondo principal de todas las secciones               │
│                                                         │
│  #1A1815 (Charcoal - Gris muy oscuro)                 │
│  ███████████████████████████████████████░░░░░░ 90%   │
│  ↑                                                      │
│  Fondos secundarios, gradientes                       │
│                                                         │
│  #C9A84C (Gold - Oro premium)                         │
│  ░░░░░░░░░░░░████████████░░░░░░░░░░░░░░░░░░░░ 30%   │
│  ↑                                                      │
│  Botones, acentos, títulos pequeños                   │
│                                                         │
│  #F5F1E8 (Ivory - Crema/blanco cálido)                │
│  ░░░░░░░░░░░░░░░░░░░░░░░░████████████░░░░░░░░ 60%   │
│  ↑                                                      │
│  Títulos principales, texto importante                │
│                                                         │
│  #A39B90 (Grain - Gris claro)                         │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████ 40%   │
│  ↑                                                      │
│  Descripciones, texto secundario                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Ejemplo de composición:

```
╔═══════════════════════════════════╗
║ #0A0906 (Fondo oscuro)            ║
║  ┌─────────────────────────────┐  ║
║  │ #F5F1E8 (Título grande)     │  ║
║  │ en Cormorant itálica        │  ║
║  │                             │  ║
║  │ #A39B90 (Descripción)       │  ║
║  │ en DM Sans normal           │  ║
║  │                             │  ║
║  │ #C9A84C (Acento/botón)      │  ║
║  │ ═════════════════════════   │  ║
║  └─────────────────────────────┘  ║
║  Border: 1px #C9A84C               ║
╚═══════════════════════════════════╝
```

---

## 🎭 TIPOGRAFÍA EN ACCIÓN

### Hero title (Largest):
```
Muebles a medida que transforman espacios

Tipografía: Cormorant Garamond, italic, bold
Tamaño: clamp(2rem, 5vw, 5rem)  ← Fluida (responsive)
Color: #F5F1E8 (Ivory)
Line-height: 1
Efectos: Word split animation (cada palabra animada)
```

### Section titles (Large):
```
Lo que ofrecemos
Proyectos que transforman espacios

Tipografía: Cormorant Garamond, italic
Tamaño: clamp(2rem, 4vw, 3rem)
Color: #F5F1E8
```

### Card titles (Medium):
```
Cocinas Premium

Tipografía: Cormorant Garamond, italic
Tamaño: clamp(1.5rem, 2.5vw, 2rem)
Color: #F5F1E8
```

### Body text (Normal):
```
Diseño y fabricación de muebles de cocina a medida.
Aprovechamos cada espacio con soluciones inteligentes
y materiales de primera calidad.

Tipografía: DM Sans, regular
Tamaño: 1rem
Color: #A39B90 (Grain)
Line-height: 1.6
```

### Labels (Tiny):
```
COCINAS   NUESTRO TRABAJO   DÍA 1

Tipografía: DM Mono, regular, uppercase
Tamaño: 0.75rem - 0.875rem
Color: #C9A84C (Gold)
Letter-spacing: 0.05em - 0.1em
```

---

## ✨ EFECTOS ESPECIALES

### Backdrop Filter (Frosted Glass):
```
┌─────────────────────────────┐
│ Fondo: rgba(0,0,0,0.5)      │
│ Blur: 10px                  │
│                             │
│ Efecto: Parece un vidrio    │
│ desenfocado detrás          │
│                             │
│ Resultado: Elegancia        │
│ moderna y sofisticación     │
└─────────────────────────────┘
```

### Gradient Overlays:
```
Overlay hero:
  De: rgba(0,0,0,0.25)  (transparente)
  A: rgba(0,0,0,0.7)    (oscuro)
  Dirección: Top → Bottom
  Uso: Darken video para legibilidad

Círculo de servicio:
  De: #C9A84C (oro)
  A: rgba(201,168,76,0.5) (oro transparente)
  Dirección: 135deg diagonal
  Uso: Efecto 3D circular

Línea de proceso:
  De: #C9A84C (oro)
  A: rgba(201,168,76,0.2) (casi transparente)
  Dirección: Top → Bottom
  Uso: Desvanecimiento elegante
```

---

## 🎬 RESUMEN DE MOVIMIENTOS

| Sección | Tipo de Movimiento | Trigger | Duración |
|---------|-------------------|---------|----------|
| Hero Title | Word split fade/translate | Page load | 0.9s |
| Services | Horizontal scroll pinned | Vertical scroll | Variable |
| Portfolio | Clip-path reveal | On-view | 1.4s |
| Portfolio Hover | Image scale | Mouse hover | 0.4s |
| Process Line | Scale Y | On-view | 1.2s |
| Process Steps | Fade + translate Y | On-view | 1s |

---

## 🖥️ RESPONSIVE BEHAVIOR

### Desktop (1920px+):
- Grid portfolio: 3 columnas
- Services: Slides grandes (85vw)
- Texto: Tamaño máximo

### Tablet (768px - 1919px):
- Grid portfolio: 2 columnas
- Services: Slides igual (85vw)
- Texto: Tamaño medio

### Mobile (< 768px):
- Grid portfolio: 1 columna (stack vertical)
- Services: Puede necesitar ajuste
- Texto: Tamaño mínimo (clamp management)
- **Nota:** Actualmente está en lista de testing

---

## 🎯 CONCLUSIÓN VISUAL

La landing page de SVC Amoblamientos es:

✅ **Elegante** - Paleta de colores premium y tipografía sofisticada  
✅ **Fluida** - Animaciones smooth sin ser abrumadoras  
✅ **Clara** - Jerarquía visual clara, fácil de leer  
✅ **Profesional** - Comunica calidad y experiencia  
✅ **Moderna** - Uso de efectos contemporáneos (glassmorphism, gradients)  
✅ **Enfocada** - Cada sección tiene un propósito claro  

**El resultado final representa exactamente lo que SVC Amoblamientos es:**  
Una empresa de carpintería de **lujo, artesanal y personalizada**. 🌟

---

**Para ver en vivo:**  
http://localhost:3000

**Ultima actualización:** Mayo 2026
