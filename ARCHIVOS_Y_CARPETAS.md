# 📂 Estructura de carpetas - Dónde colocar los archivos

## Árbol de directorios del proyecto

```
c:\Users\Daniela\Desktop\SVC
│
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 next.config.js
├── 📄 README.md
├── 📄 CHECKLIST.md
├── 📄 PASOS_SIGUIENTES.md
├── 📄 generate-placeholders.html
│
├── 📁 public/
│   ├── 📁 images/
│   │   └── 📁 portfolio/
│   │       ├── cocina-1.svg       ✓ Existe (SVG placeholder)
│   │       ├── detalle-1.svg      ✓ Existe (SVG placeholder)
│   │       ├── comedor-1.svg      ✓ Existe (SVG placeholder)
│   │       ├── placar-1.svg       ✓ Existe (SVG placeholder)
│   │       ├── bano-1.svg         ✓ Existe (SVG placeholder)
│   │       └── isla-1.svg         ✓ Existe (SVG placeholder)
│   │
│   └── 📁 videos/
│       ├── DESCARGAR_VIDEO.md     ✓ Instrucciones
│       └── hero.mp4               ❌ FALTA - Descargar aquí
│
├── 📁 src/
│   ├── 📁 app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── 📁 components/
│   │   ├── 📁 sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── PortfolioSection.tsx
│   │   │   ├── ProcessSection.tsx
│   │   │   ├── KitchenSceneClient.tsx
│   │   │   └── KitchenScene.tsx
│   │   │
│   │   ├── 📁 layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── 📁 providers/
│   │   │   └── SmoothScrollProvider.tsx
│   │   │
│   │   └── 📁 ui/
│   │       ├── SplitText.tsx
│   │       ├── ContactForm.tsx
│   │       └── WhatsAppButton.tsx
│   │
│   └── 📁 lib/
│       ├── constants.ts
│       └── gsapConfig.ts
│
└── 📁 .next/
    └── (Generado automáticamente por Next.js)
```

---

## ✏️ Cómo reemplazar las imágenes

### Paso 1: Prepara tus fotos

Toma 6 fotografías de trabajos reales de SVC:
- 1 foto de cocina (la mejor - será grande en el grid)
- 1 foto de detalle/herraje
- 1 foto de comedor (la mejor - será grande en el grid)
- 1 foto de placar/armario
- 1 foto de baño
- 1 foto de isla de cocina (la mejor - será grande en el grid)

**Requisitos:**
- Formato: JPG (ideal) o PNG
- Tamaño mínimo: 1200x1200px
- Peso: máximo 2 MB por archivo
- Calidad: Alta (Sin comprimir demasiado)

### Paso 2: Renombra los archivos

Según este patrón EXACTO:
```
cocina-1.jpg    (NO: cocina.jpg, NO: cocina_1.jpg)
detalle-1.jpg
comedor-1.jpg
placar-1.jpg
bano-1.jpg      (IMPORTANTE: Sin tilde)
isla-1.jpg
```

### Paso 3: Coloca en la carpeta

**Ubicación:** `c:\Users\Daniela\Desktop\SVC\public\images\portfolio\`

```powershell
# En PowerShell, puedes copiar así:
Copy-Item "C:\Mis Fotos\cocina.jpg" "c:\Users\Daniela\Desktop\SVC\public\images\portfolio\cocina-1.jpg"
```

O simplemente:
1. Abre el Explorador de Windows
2. Navega a: `c:\Users\Daniela\Desktop\SVC\public\images\portfolio\`
3. **Borra los archivos .svg** (cocina-1.svg, detalle-1.svg, etc)
4. **Copia tus JPG** con los nombres correctos en esa carpeta
5. ¡Listo!

### Paso 4: Verifica en el navegador

Recarga `http://localhost:3001` y deberías ver tus imágenes en lugar de los placeholders.

---

## 📹 Cómo agregar el video hero

### Paso 1: Descarga el video

**URL:** `https://www.instagram.com/reel/DX9SA__CHki/`

**Opción A - yt-dlp (Automático):**
```powershell
pip install yt-dlp
cd "c:\Users\Daniela\Desktop\SVC\public\videos"
yt-dlp -f best -o "hero.mp4" "https://www.instagram.com/reel/DX9SA__CHki/"
```

**Opción B - Manualmente:**
1. Usa un sitio como: https://www.savefrom.net/
2. Pega el URL del Instagram reel
3. Descarga el video
4. Renombra a: `hero.mp4`
5. Coloca en: `c:\Users\Daniela\Desktop\SVC\public\videos\`

### Paso 2: Verifica el tamaño

El archivo debe ser:
- **Nombre exacto:** `hero.mp4`
- **Ubicación exacta:** `c:\Users\Daniela\Desktop\SVC\public\videos\`
- **Tamaño:** Cualquiera (idealmente < 50 MB)
- **Formato:** MP4 (video/mp4)

### Paso 3: Recarga

Abre o recarga: `http://localhost:3001`

El video debería aparecer automáticamente en el hero section.

---

## 🔄 Verificación paso a paso

Después de agregar las imágenes:

```
✓ Paso 1: Renombra 6 archivos (cocina-1.jpg, etc)
✓ Paso 2: Coloca en c:\Users\Daniela\Desktop\SVC\public\images\portfolio\
✓ Paso 3: Borra los archivos .svg viejos
✓ Paso 4: Recarga http://localhost:3001
✓ Paso 5: ¿Ves las imágenes? ✅ ÉXITO
```

Después de agregar el video:

```
✓ Paso 1: Descarga hero.mp4 del Instagram reel
✓ Paso 2: Coloca en c:\Users\Daniela\Desktop\SVC\public\videos\
✓ Paso 3: Recarga http://localhost:3001
✓ Paso 4: ¿Ves el video en el hero? ✅ ÉXITO
```

---

## 🛠️ Si algo no funciona

**Problema:** Las imágenes no aparecen
- Verifica que el nombre sea **exacto** (sin tildes, con el `-1`)
- Verifica que estén en `public/images/portfolio/` (mayúsculas/minúsculas importa)
- Recarga la página (Ctrl+F5 para cache limpio)

**Problema:** El video no aparece
- Verifica que se llame **exactamente** `hero.mp4`
- Verifica que esté en `public/videos/` (mayúsculas/minúsculas importa)
- Recarga la página (Ctrl+F5)
- Comprueba en DevTools (F12) si aparece error 404 en la consola

**Problema:** El servidor se cuelga
- Cierra el servidor (Ctrl+C en PowerShell)
- Ejecuta: `npm run dev`
- Espera el mensaje: "✓ Ready in X.Xs"

---

## 📋 Checklist final

Antes de mostrar la web a SVC:

- [ ] 6 imágenes JPG en `public/images/portfolio/` (borra .svg)
- [ ] Video hero.mp4 en `public/videos/`
- [ ] Recargaste `http://localhost:3001` y ves imágenes + video
- [ ] Probaste scroll en todos los navegadores (Chrome, Firefox, Edge)
- [ ] Datos de contacto actualizados en `src/lib/constants.ts`
- [ ] Botones funcionan (ver si puedes hacer clic)

---

**¿Necesitas ayuda?**  
- Lee `PASOS_SIGUIENTES.md` para instrucciones detalladas
- Lee `README.md` para info general del proyecto
- Los archivos están bien organizados en `src/components/sections/`

¡Buena suerte! 🎨
