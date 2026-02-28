# Utils (componentes)

## Ubicación

- `src/components/utils/cardAnimations.ts`
- `src/components/utils/infoHandler.ts`
- `src/components/utils/validation.js`

## Propósito

Funciones auxiliares usadas por componentes: animaciones 3D de tarjetas, tooltips por DOM en CardDetails, y validación de formularios.

---

## cardAnimations.ts

### handleMouseMove

Aplica efecto parallax/3D a una tarjeta según la posición del mouse.

- **Parámetros**: `e: MouseEvent`, `card: HTMLDivElement`, `content: HTMLDivElement`, `sensitivity: number = 1`.
- **Lógica**: Calcula posición relativa del mouse respecto al centro de la tarjeta; aplica `rotateX`, `rotateY` y desplazamiento al contenido. Sensibilidad normalizada entre 0.1 y 3.
- **Uso**: En `components_Card.tsx` con sensibilidad 1.15, en listeners `mousemove`/`mouseleave`.

### resetCardPosition

Vuelve la tarjeta y el contenido a la transformación inicial (sin rotación ni desplazamiento).

- **Parámetros**: `card: HTMLDivElement`, `content: HTMLDivElement`.
- **Uso**: En el listener `mouseleave` de Card.

**Dependencias**: gsap (para `gsap.to`).

---

## infoHandler.ts

### showInfo(button, info)

Muestra un tooltip con texto `info` encima del elemento `button`.

- Busca en el DOM `getElementById("infoCard")` y `getElementById("infoText")`.
- Asigna `infoText.textContent = info`, posiciona `infoCard` según `button.getBoundingClientRect()` y pone `display: "block"`.
- **Limitación**: Depende de que existan elementos con esos ids en el DOM (probablemente en CardDetails o layout). No es un componente React.

### hideInfo()

Oculta el tooltip poniendo `infoCard.style.display = "none"`.

**Dependencias**: Ninguna (DOM puro).

**Mejora sugerida**: Sustituir por un componente Tooltip/Popover con estado y portal para no depender de ids globales y mejorar accesibilidad.

---

## validation.js

### isValidEmail

Valida formato de email (expresión regular o lógica equivalente).

- **Uso**: En `form.tsx` antes de enviar el formulario.
- **Export**: Función que recibe un string y devuelve boolean.

**Dependencias**: Ninguna (o dependencia mínima).

**Mejora sugerida**: Migrar a `validation.ts` y añadir tests unitarios; documentar el formato aceptado (ej. RFC 5322 simplificado).
