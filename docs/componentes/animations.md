# Animations

## Ubicación

- `src/components/animations/glitchPresentation.tsx` (Glitch)
- `src/components/animations/WordCloud.tsx`
- `src/components/animations/backgrounds/StarsBackground.tsx`
- `src/components/animations/glitch.css`
- `src/components/animations/variants.ts`

## Propósito

- **Glitch**: Efecto visual de texto glitch (título y subtítulo) en el hero, animado con GSAP.
- **WordCloud**: Nube de iconos (tecnologías) que reaccionan al movimiento del mouse (alejarse y escalar) con GSAP.
- **StarsBackground**: Fondo de estrellas 3D con Three.js, fijo detrás del contenido.
- **variants**: Variantes de Framer Motion reutilizables (CONTAINERCARDS, CARDS, INLINECARDS, temas de timing).

## Uso

- Glitch y WordCloud: en `pages/home.jsx` (Hero + nube de palabras).
- StarsBackground: en `App.tsx` a nivel global (junto a NavMenu y ResponsiveMenu).
- variants: importados en `about/informationContent.tsx` y potencialmente en otros componentes que usen stagger/cards.

## Glitch

- **Props**: `title`, `subtitle` (strings, por defecto "Hi, I'm Wilmer", "Web Developer").
- **Implementación**: Ref al contenedor, GSAP con `repeat: -1`, `yoyo: true`, pequeño desplazamiento x/y. Estilos del efecto en `glitch.css` (data-text, pseudo-elementos).
- **Responsive**: `clamp` en fontSize y maxWidth.

## WordCloud

- Lista fija de iconos (IonIcon): JavaScript, GitHub, SQL, Laravel, SASS, Python, CSS3, HTML5.
- **Refs**: `wordsRef` (array de refs a cada icono).
- **Eventos**: `handleMouseMove` (mueve cada icono en dirección opuesta al cursor), `handleMouseEnter`/`handleMouseLeave` (escala 2.5 / 1.5). Al salir de la ventana se resetean posiciones con GSAP.
- Sin props.

## StarsBackground

- **Three.js**: Scene, PerspectiveCamera, WebGLRenderer (alpha, antialias), Points con BufferGeometry (p. ej. 500 estrellas), material con tamaño y opacidad.
- **Refs**: containerRef, scene, camera, renderer, stars. En useEffect: montaje del canvas, resize listener, loop de render, cleanup (removeEventListener, dispose).
- Sin props.

## variants.ts

- **atimationThemes**: Objetos `sub`, `Dramatic`, `Smooth` con `stagger`, `delay`, `ease`.
- **CONTAINERCARDS**: opacity 0→1, staggerChildren y delayChildren.
- **CARDS**: hidden (opacity, y, scale) → visible con spring.
- **INLINECARDS**: hidden (opacity, x, scale) → visible con spring.
- Nota: typo en export `atimationThemes` (animation).

## Dependencias

- Glitch: React, useRef, useEffect, gsap, glitch.css
- WordCloud: React, useRef, useEffect, gsap, @reacticons/ionicons
- StarsBackground: React, useRef, useEffect, three
- variants: solo exportaciones (sin deps externas)

## Mejoras sugeridas

- Corregir nombre `atimationThemes` → `animationThemes`.
- En StarsBackground, valorar reducir partículas o calidad en viewports pequeños para rendimiento en móviles.
- Documentar en variants.ts el uso esperado (ej. con `variants` y `initial`/`animate` de Framer Motion).
