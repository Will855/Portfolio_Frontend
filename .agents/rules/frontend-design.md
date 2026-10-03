---
description: "Reglas de Diseño y UI/UX Frontend (Minimalismo Dark, Glassmorphism y Animaciones con GSAP)"
---

# Reglas de Diseño Frontend (portfolio-next)

Cuando modifiques o crees nuevos componentes visuales en este proyecto, DEBES seguir estrictamente esta guía de estilos y patrones de diseño.

## 1. Identidad Visual: Dark Mode Puro
El proyecto utiliza un diseño "Dark Mode" por defecto, con alto contraste.
- **Fondos:** El fondo global de la página es negro puro (`bg-[#000000]`). No uses fondos blancos para las pantallas.
- **Texto:** El texto principal debe ser blanco roto o gris claro (`text-slate-50`, `text-slate-300`).
- **Tipografía:** Se usa **Montserrat** (configurada globalmente).

## 2. Patrón de Tarjetas: Glassmorphism
Las tarjetas, modales y secciones flotantes deben usar el efecto "vidrio esmerilado".
- Usa las siguientes clases de Tailwind para los contenedores tipo tarjeta: `backdrop-blur-lg bg-white/5 rounded-2xl shadow-xl`.
- En hover, si el elemento es interactivo, puedes intensificarlo: `hover:shadow-2xl hover:bg-white/10 transition-all duration-300`.
- **NUNCA** crees una tarjeta con un color de fondo sólido (ej. `bg-gray-800`), utiliza siempre fondos translúcidos y blur.

## 3. Animaciones e Interacciones: GSAP
Este proyecto evita en lo posible las animaciones complejas de CSS puro, y opta por animaciones controladas por hardware mediante GSAP.
- Usa **`@gsap/react`** (`useGSAP`) para revelar componentes en la carga inicial (ej. que suban suavemente con un `y: 30` a `y: 0` y un cambio de `opacity: 0` a `1`).
- **Easing:** Usa `ease: "power3.out"` o `elastic.out` para darle un look "Awwwards".
- **Interacciones físicas:** Para cosas como repeler el ratón, seguir el ratón o crear "botones magnéticos", realiza cálculos en `mousemove` apoyados en animaciones de interpolación (`gsap.utils.interpolate`).

## 4. Botones y Llamados a la Acción (CTA)
Para interacciones fuertes, puedes inspirarte en el patrón del `MagneticBtn`.
- Si necesitas un botón primario con alta interactividad, busca reutilizar botones existentes (como `MagneticBtn`) o utiliza utilidades interactivas (`hover:scale-105 transition-all`).

## 5. CSS Modules vs Clases Globales
- **NUNCA** agregues estilos arbitrarios al `globals.css` (ej. no agregues `.mi-boton`). 
- Prefiere el **uso de Tailwind en línea** dentro del JSX/TSX.
- Si un efecto es imposible con Tailwind (ej. un efecto "glitch" o animaciones de fotogramas clave muy complejos), colócalo en un archivo CSS aparte e impórtalo desde el componente (ej. `glitch.css`).
- Los estilos de Markdown (`.prose`, `.mermaid-wrapper`) están encapsulados exclusivamente en el `globals.css` para el renderizado seguro, pero no se deben polucionar con otras clases.

## 6. Iconografía
- Usa `@reacticons/ionicons` (los componentes como `<IonIcon />`). 
- Asigna clases como `text-2xl`, `text-3xl` usando Tailwind.
