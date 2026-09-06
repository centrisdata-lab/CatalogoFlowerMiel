# Flower Miel — Catálogo Digital

Landing page de e-commerce para un apiario/catálogo de productos naturales (miel, propóleo, cosmética, insumos apícolas). Sitio estático, sin build step: HTML + CSS + JS vanilla.

## Estructura

```
index.html              # Página principal (catálogo)
assets/
  css/styles.css        # Todo el CSS del sitio (un solo archivo, ~2200 líneas)
  js/main.js             # Render del grid de productos, filtros, buscador, modal de zoom
  js/cart.js              # Carrito de compras (localStorage) + modal de carrito
  js/purchase.js          # Modal de "comprar" (WhatsApp / Nequi / Bre-B)
  img/                     # Fotos de producto (jpg) + logos (png)
vendedores/index.html   # Variante del catálogo para vendedores (mismo sistema de diseño)
pendon/                 # Piezas gráficas sueltas (pendón de apiturismo), no forman parte del sitio
admin-flowermiel/       # App Node separada con su propia base de datos (Turso) — panel de administración de productos
```

El catálogo (`index.html` + `assets/`) es 100% estático y se despliega en Render con auto-deploy. `admin-flowermiel/` es un proyecto Node aparte que alimenta los datos de producto.

## Sistema de diseño

Ver `.claude/skills/design-system-extraction/` para la skill portable (jerarquía, layout y estilo, sin colores) que documenta el patrón visual de este sitio para poder reaplicarlo a otras marcas.

Resumen rápido de las decisiones de *esta* marca en concreto:

- **Tipografía:** Poppins (headings, weight 700-800) + Quicksand (body, weight 400-600)
- **Paleta:** ámbar/miel como primario (`#e8960c`), verde bosque como secundario (`#3f7d3a`), fondo crema cálido (`#fffaf1`), WhatsApp green (`#25d366`) como color de acción de conversión — ver la nota de contraste en *Decisiones de accesibilidad* antes de cambiarlo
- **Forma:** todo redondeado — pills (`border-radius: 999px`) en botones/chips/badges, `radius-lg: 24px` en cards y modales
- **Motivo recurrente:** emoji temático (🐝🍯🌿) como iconografía barata en vez de un set de íconos SVG custom

## El hero: cómo está construido y por qué

El hero es la pieza más delicada del sitio: la única que combina video, foto y texto encima. Se rompió tres veces por cambios que parecían inofensivos, así que conviene leer esto antes de tocarlo.

### Tres capas, en este orden

```html
<section class="hero">
  <div class="hero-bg"></div>        <!-- 1. foto de fondo (background-image en CSS) -->
  <video class="hero-bg-video">      <!-- 2. video encima de la foto -->
    <source ... type="video/webm">   <!--    WebM primero: lo usa Chrome -->
    <source ... type="video/mp4">    <!--    MP4 de respaldo: Safari -->
  </video>
  <div class="hero-overlay"></div>   <!-- 3. velo oscuro para legibilidad -->
  <div class="container hero-content">  <!-- texto, z-index: 1 -->
```

**La foto y el video son capas separadas, y tiene que seguir siendo así.** Antes el fondo era el propio `<video>` a través de su atributo `poster`. El problema: si el video no se reproduce por cualquier motivo, ocultarlo oculta también su poster y el hero queda **completamente vacío** — solo el velo café sobre nada. Con capas separadas, si el video falla queda la foto y nadie lo nota.

`initHeroMotion()` en [assets/js/main.js](assets/js/main.js) gestiona la capa de video: la oculta solo ante un error definitivo (nunca ante un `stalled`, que se dispara en cortes normales de red aunque el video siga bien), la restaura con el evento `playing`, y reintenta al primer gesto del usuario por si el navegador bloqueó el autoplay.

### El velo está calibrado, no elegido a ojo

`.hero-overlay` va de 0.82 a 0.62 de opacidad. Ese número **depende del video que haya detrás** y no es transferible:

- El video actual tiene luminancia media ~179 de 255 (es una imagen clara).
- El título llega al **73% del ancho** en escritorio y al **94% en móvil**, así que un velo lateral no sirve: no queda zona libre a la derecha. Tiene que ser parejo.
- Con esos valores, el contraste medido en el peor caso (el píxel más claro del video bajo cada texto) es: título blanco 6,3–7,5:1, título ámbar 3,6–4,3:1 (umbral 3:1 por ser texto grande), subtítulo 5,3–6,4:1.

**Si se cambia el video del hero, hay que recalibrar el velo.** Un video más oscuro permite bajarlo; uno más claro lo exige más alto. Medir sobre píxeles reales, no estimar: el error más caro de esta sesión fue asumir que el velo servía para cualquier fondo.

### Formato del video

`960x1066`, H.264 **perfil Main nivel 4.0**, más una versión WebM/VP9. Dos formatos a propósito, para que ningún decodificador se quede sin opción.

El original venía en `1364x1516` perfil **High 5.0** — dimensiones impares para codificación por hardware y nivel alto para un clip de 5s. Se sospechó que algunos decodificadores de escritorio lo rechazaban; resultó no ser la causa del problema reportado, pero la recodificación se mantuvo porque bajó el peso de 843 KB a 202 KB.

Comando de referencia para regenerarlo:

```bash
ffmpeg -i entrada.mp4 -vf "scale=960:1066:flags=lanczos" \
  -c:v libx264 -profile:v main -level:v 4.0 -pix_fmt yuv420p \
  -preset slow -crf 27 -g 48 -movflags +faststart -an salida.mp4
ffmpeg -i salida.mp4 -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -cpu-used 4 -an salida.webm
```

El video es vertical y el hero apaisado, así que `object-fit: cover` recorta bastante arriba y abajo. Un video horizontal aprovecharía mejor el encuadre.

## Decisiones de accesibilidad (y sus excepciones)

### Contraste: qué se cumple y qué no

La referencia es WCAG AA: **4,5:1** para texto normal, **3:1** para texto grande (≥18,66px en negrita, o ≥24px). Casi todo el sitio cumple, con excepciones deliberadas:

| Elemento | Contraste | Estado |
|---|---|---|
| Textos del hero sobre el video | 3,6:1 a 7,5:1 | Cumple |
| **Botones de WhatsApp** (`#25d366` + texto blanco) | **1,98:1** | **No cumple — decisión de marca** |
| `.chip.active` (ámbar de marca) | 2,39:1 | No cumple — decisión de marca |

**Los botones de WhatsApp usan el verde de marca `#25d366` a pedido explícito**, para que coincidan con el ícono flotante. Se evaluaron alternativas que sí cumplían (`#0a8754` da 4,56:1; el mismo `#25d366` con texto oscuro da 7,46:1) y se eligió la coherencia visual. **No "corregir" esto por iniciativa propia** — está decidido. Si alguna vez se quiere revertir, la salida menos invasiva es mantener el verde y poner el texto oscuro.

### `prefers-reduced-motion`

El sitio respeta la preferencia del sistema anulando animaciones y transiciones, **salvo el video del hero**, que se reproduce siempre por decisión de diseño: es un plano lento y suave, sin destellos ni movimiento brusco.

Vale la pena conocer esta historia porque costó varias iteraciones: se reportó que el video "no se reproducía" en un equipo. Se persiguieron tres hipótesis equivocadas (códec incompatible, autoplay bloqueado, ahorro de energía) antes de descubrir que ese Windows tenía los efectos de animación desactivados y el sitio estaba respetando la preferencia. **Ante un problema que solo ocurre en un equipo concreto, medir ahí antes de teorizar**: una página temporal que vuelque `paused`, `readyState`, `video.error`, `currentSrc` y `matchMedia('(prefers-reduced-motion: reduce)').matches` resuelve en un minuto lo que las suposiciones no resuelven en una hora.

### Otras reglas vigentes

- **Áreas táctiles de 44px** mínimo (hamburguesa, botones de compra/compartir, cerrar modales, enlaces del pie).
- **`:focus-visible`** con contorno visible en todo elemento interactivo; sobre fondos oscuros usa `--color-primary-light`.
- **Catálogo en 2 columnas** desde 360px. El breakpoint es 360 y no 320 a propósito: a 320px la tarjeta queda en 129px y el botón "Comprar" no entra junto al del carrito.

## Trampas conocidas del CSS

- **Un solo archivo de ~2.200 líneas, sin capas ni metodología de nombres.** Al agregar una regla que pisa a otra, verificar que quede *después* en el archivo: con especificidad igual gana la última. Ya pasó una vez — se añadieron colores claros antes de las reglas originales oscuras y el texto quedó ilegible sobre fondo oscuro.
- **Grid con `min-width: auto`**: los hijos de `.rescate-inner` y `.apiturismo-inner` llevan `min-width: 0` para que no desborden en pantallas chicas.
- **Las fotos de galería tenían relleno blanco incrustado en el archivo** (lienzo 1000×1250 con la foto horizontal centrada). Se recortaron con ffmpeg. Si aparecen bandas blancas en una foto nueva, revisar el archivo antes de buscar el problema en el CSS.

## Historial de decisiones (para no repetir trabajo)

- **Los videos de fondo en Apiturismo y Rescate se probaron y se revirtieron.** Esas secciones vuelven a su diseño claro original. No reintroducirlos sin que se pidan.
- **Imagen Open Graph**: `assets/img/og-image.jpg`, 1200×630, solo la foto, sin logo ni texto encima (así se pidió).
- **Pendiente sin aprobar**: el botón flotante de WhatsApp se superpone al botón "Chatea por WhatsApp" del pie. Se propuso ocultarlo cuando el pie es visible; no fue aprobado.

## Convenciones de prueba

Flujo: implementar → probar en local → push → verificar en producción.

**Verificar midiendo, no mirando.** Las capturas engañan con fondos animados y contrastes límite. Lo que funcionó en esta sesión: leer el estado real del DOM con Playwright (`paused`, `readyState`, `getComputedStyle`), muestrear píxeles con canvas para medir contraste sobre el fondo compuesto, y comparar dos capturas separadas en el tiempo para confirmar que un video efectivamente anima (>2% de píxeles distintos).

Un solo login de Playwright por sesión de pruebas — el panel admin tiene un rate limiter de 5 intentos / 15 min.

## Notas operativas

- `git push` puede colgarse pidiendo login interactivo de Credential Manager en Windows — si pasa, reintentar o pedirle al usuario que haga el push manualmente.
- Turso (base de datos del admin) es compartida entre local y producción — cuidado al probar operaciones destructivas contra el admin en local.
