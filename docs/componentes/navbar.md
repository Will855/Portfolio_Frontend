# Navbar

## Ubicación

- `src/components/navbar/navMenu.tsx`
- `src/components/navbar/menuResponsive.tsx`
- `src/components/navbar/navMenu.css` (si se usa)

## Propósito

Proporcionar la navegación principal de la aplicación en dos variantes:

- **NavMenu**: Barra fija superior centrada, visible en viewports `sm` y mayores, con cambio de estilo al hacer scroll.
- **menuResponsive**: Menú tipo hamburguesa/sidebar para móviles, animado con GSAP.

## Uso

Ambos se renderizan a nivel global en `App.tsx` (dentro de `RouterWrapper`), no dentro de cada página.

```tsx
<NavMenu />
<ResponsiveMenu />
```

## NavMenu

- **Estado**: `isScrolled` (boolean) según `window.scrollY > 10`.
- **Comportamiento**: Fondo transparente por defecto; al hacer scroll pasa a `bg-gray-200/90 backdrop-blur-sm` y texto a `text-gray-800`.
- **Items**: Array local `navItems = ['Inicio', 'Informacion', 'Proyectos', 'Contacto', 'Planes']`. Rutas derivadas con `item.toLowerCase()` (ej. `/inicio`, `/informacion`).
- **Clases**: `fixed top-4 left-1/2 -translate-x-1/2 z-50`, `rounded-full`, `hidden sm:block`.

## menuResponsive

- **Estado**: `isOpen` para abrir/cerrar el panel.
- **Refs**: `sidebarRef` (contenedor), `animationRef` (timeline GSAP).
- **Animaciones**: GSAP timeline: al abrir, desplaza el panel a `x: 0` y hace stagger de `.nav-item`; al cerrar, invierte y al final vuelve a `x: '100%'`.
- **Items**: Mismo array `navItems` que NavMenu (duplicado). Cierra el menú al hacer click en un `NavLink`.
- **Icono**: IonIcon (menú / cerrar) según `isOpen`.

## Props

Ninguno; ambos componentes no reciben props.

## Dependencias

- React, useState, useEffect, useRef
- react-router-dom (NavLink)
- GSAP (solo menuResponsive)
- @reacticons/ionicons (solo menuResponsive)

## Mejoras sugeridas

- Extraer `navItems` a `config/nav.ts` (o similar) y importar en ambos para una sola fuente de verdad.
- Añadir ruta `/planes` en `App.tsx` o eliminar "Planes" del menú.
- Considerar `aria-expanded` y `aria-label` en el botón del menú responsivo para accesibilidad.
