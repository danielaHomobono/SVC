## 📹 Cómo descargar el video del Instagram reel

### Opción 1: Usar yt-dlp (Recomendado - Una línea)

Si tienes Python instalado, ejecuta en PowerShell:

```powershell
pip install yt-dlp
cd "c:\Users\Daniela\Desktop\SVC\public\videos"
yt-dlp -f best -o "hero.mp4" "https://www.instagram.com/reel/DX9SA__CHki/"
```

El video se descargará automáticamente como `hero.mp4`.

---

### Opción 2: Usar un sitio web online

1. Visita: https://www.savefrom.net/ o https://www.instadownloader.io/
2. Pega el link: `https://www.instagram.com/reel/DX9SA__CHki/`
3. Descarga el video
4. Renombra a `hero.mp4`
5. Colócalo en: `c:\Users\Daniela\Desktop\SVC\public\videos\hero.mp4`

---

### Opción 3: Descargar manualmente desde Instagram

1. Abre el reel en Instagram: https://www.instagram.com/reel/DX9SA__CHki/
2. Click derecho en el video → "Inspeccionar" (o F12)
3. En la consola, ejecuta:
```javascript
document.querySelector('video')?.src
```
4. Copia el URL que aparece
5. Abre el URL en una pestaña nueva y descarga
6. Renombra a `hero.mp4`
7. Coloca en: `c:\Users\Daniela\Desktop\SVC\public\videos\hero.mp4`

---

### Una vez descargado:

Recarga el navegador en http://localhost:3001 y el video deberá aparecer en el hero section.

El archivo debe estar exactamente en: **`c:\Users\Daniela\Desktop\SVC\public\videos\hero.mp4`**
