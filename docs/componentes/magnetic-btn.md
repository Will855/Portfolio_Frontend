# MagneticBtn

## Ubicación

`src/components/buttons/magneticBtn.tsx`

## Propósito

Botón con efecto “magnético”: el cursor atrae ligeramente el botón (y su texto) mediante animaciones GSAP. Al hacer click navega a `/informacion` y registra el evento en analytics.

## Uso

Actualmente no se usa en la UI (en Home está comentado: `//import MagneticBtn`). Pensado para un CTA hacia la sección de información.

```tsx
<MagneticBtn iconName="link" subtitle="Ver más" />
```

## Props

| Prop      | Tipo        | Descripción                          |
|-----------|-------------|--------------------------------------|
| iconName  | "link"      | Nombre del icono IonIcon a mostrar   |
| subtitle  | string      | Texto debajo del icono                |

## Comportamiento

- **Refs**: `magneticBtnRef`, `magneticBtnTextRef`, `lastPosition`, `touchStartTime`, `touchStartPos` (para touch).
- **Efecto magnético**: En mousemove/touchmove calcula la distancia al centro del botón y aplica desplazamiento con GSAP (elastic.out). Al soltar o salir se llama `resetPosition()`.
- **Navegación**: `onClick` → `navigate('/informacion')` y `trackButtonClick` (utils/analytics).
- **Accesibilidad**: Incluye manejo de teclado (Enter/Space) y consideraciones para touch.

## Dependencias

- React, useRef, useEffect
- gsap
- react-router-dom (useNavigate)
- @reacticons/ionicons
- utils/analytics (trackButtonClick)

## Mejoras sugeridas

- Hacer `iconName` más genérico (union type de iconos permitidos) si se quieren más CTAs.
- Añadir prop opcional `to` para que la ruta sea configurable en lugar de fija `/informacion`.
- Si se reactiva en Home, asegurar que no duplique el mismo CTA que el menú.
