# Cards (Grid, Card, CardDetails)

## Ubicación

- `src/components/cards/components_Grid.tsx` (Grid)
- `src/components/cards/components_Card.tsx` (Card)
- `src/components/cards/proyectPage.tsx` (CardDetails)

## Propósito

- **Grid**: Contenedor que renderiza una grilla responsiva de tarjetas de proyectos a partir de `config/cards`.
- **Card**: Tarjeta interactiva con efecto parallax al mover el mouse y navegación a la demo del proyecto.
- **CardDetails**: Página de detalle de un proyecto por ID (`/page/:id`): cabecera con imagen de fondo, botones “Código” y “Ver Proyecto”, y contenido dinámico del proyecto.

## Uso

- En la página Proyects se renderiza `<Grid />`. Cada tarjeta está envuelta en `<Link to={`/page/${card.id}`}>`.
- CardDetails se usa como `<Route path="/page/:id" element={<CardDetails />} />` en `App.tsx`.

## Grid

- Importa `cards` desde `config/cards` y `Card` desde `components_Card`.
- Layout: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6`.
- No recibe props.

## Card

- **Props**: `id`, `img`, `title`, `description`, `buttonText` (tipados en `types/types.ts` como `CardProps`).
- **Comportamiento**: Efecto 3D/parallax con `handleMouseMove` y `resetCardPosition` de `utils/cardAnimations.ts` (sensibilidad 1.15). Al hacer click navega a `/demos/${id}` (vía `navigate`) y hace scroll suave al inicio.
- **Refs**: `cardRef`, `contentRef` para el DOM usado en los listeners.

## CardDetails (proyectPage)

- **Hooks**: `useParams<{ id: string }>()`, `useNavigate()`.
- **Datos**: Busca el proyecto en `projects` (config/project) por `id`. Si no existe, muestra mensaje “Proyecto no encontrado”.
- **Cabecera**: Imagen de fondo `project.bgProyect`, botones “Código” (abre `project.codeUrl`) y “Ver Proyecto” (abre `project.demoUrl`). Tooltips con `showInfo`/`hideInfo` (utils/infoHandler) usando `getElementById("infoCard")` y posicionamiento inline.
- **Contenido**: Renderiza `project.content` (componente de demo) dentro de un contenedor con estilos de ancho máximo.

## Dependencias

- React, useRef, useEffect (Card); useParams, useNavigate (CardDetails)
- react-router-dom (Link, useNavigate, useParams)
- types/types (CardProps)
- config/cards, config/project
- components/utils/cardAnimations, components/utils/infoHandler

## Mejoras sugeridas

- Renombrar archivos a `Grid.tsx` y `Card.tsx` para consistencia.
- En CardDetails, sustituir tooltips por DOM por un componente Tooltip/Popover accesible (estado + posición o portal).
- Unificar nombre de prop `img` vs `imgSrc` en tipos y usos.
