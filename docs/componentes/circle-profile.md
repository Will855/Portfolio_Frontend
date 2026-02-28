# CircleProfile

## Ubicación

`src/components/CircleProfile.tsx`

## Propósito

Avatar circular responsivo con imagen o fallback de iniciales si la imagen falla al cargar. Pensado para el hero del portfolio (foto de perfil).

## Uso

En la página Home:

```tsx
<CircleProfile
  src="/profile.jpeg"
  alt="Wilmer Lynch"
  size="xl"
  ring={false}
/>
```

## Props

| Prop    | Tipo                | Por defecto | Descripción                                              |
|---------|---------------------|-------------|----------------------------------------------------------|
| src     | string              | —           | URL de la imagen                                         |
| alt     | string              | —           | Texto alternativo y base para iniciales si falla la img  |
| size    | "xs" \| "sm" \| "md" \| "lg" \| "xl" | "lg"  | Tamaño base del avatar (con breakpoints responsivos)     |
| className | string (opcional)  | —           | Clases adicionales en el contenedor                      |
| ring    | boolean             | true        | Muestra un anillo alrededor del avatar (ring-2 ring-white/20) |

## Comportamiento

- **Tamaños**: Mapa de clases Tailwind por breakpoint (sm, md) para cada `size` (ej. xl: `w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48`).
- **Fallback**: Si la imagen dispara `onError`, se muestra un span con las iniciales derivadas de `alt` (primeras letras de las dos primeras palabras, mayúsculas).
- **Accesibilidad**: Contenedor con `role="img"` y `aria-label={alt}`. Imagen con `loading="lazy"`, `decoding="async"`, `draggable={false}`.

## Dependencias

- React, useMemo, useState
- Sin dependencias externas de librerías

## Mejoras sugeridas

- Opcional: soporte para `sizes` y `srcSet` si se quieren imágenes responsivas.
- Mantener tipado exportado (`CircleProfileProps`, `CircleProfileSize`) para uso en otros módulos.
