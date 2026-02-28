# Demos

## Ubicación

- `src/components/demos/` (múltiples componentes)
- `src/config/project.ts` (mapeo id → componente y metadatos)
- Ruta en App: `/demos/:projectId` con `ContentHandler` que resuelve el proyecto y renderiza `project.content`

## Propósito

Cada demo es un componente React que representa un proyecto real (e-commerce, barbería, auth, paleta de colores, etc.). Se usan en dos contextos:

1. **Página de detalle** (`/page/:id`): CardDetails muestra cabecera con imagen y botones “Código” / “Ver Proyecto”, y debajo el contenido del proyecto (`project.content`). El `id` en la URL aquí es el de la tarjeta (page), no necesariamente el mismo que `projectId` de demos.
2. **Ruta de demo embebida** (`/demos/:projectId`): ContentHandler busca el proyecto por `projectId` y renderiza solo `project.content` o NotFound.

La relación entre `config/cards` (galería en Proyects) y `config/project` (lista de proyectos con content) puede ser por id: en Grid se enlaza a `/page/${card.id}`; los proyectos en project.ts tienen `id` ("1", "2", …) y un componente `content`.

## Componentes en demos/

| Archivo        | Descripción breve (inferida por nombre)     |
|----------------|----------------------------------------------|
| authSystem.tsx | Sistema de autenticación / formulario        |
| barberia.tsx   | Barbería / agendado de citas                 |
| colorPalette.tsx | Generador de paleta de colores            |
| crudNode.tsx   | CRUD o documentación con Node                |
| ecomerce.tsx   | Página de e-commerce                         |
| futureCart.tsx | Carrito de compras                           |
| headphones.tsx | Página de producto (auriculares)             |

Cada uno se importa en `config/project.ts` y se asigna al campo `content` de un proyecto.

## config/project.ts

- **Project**: interface con `id`, `content` (React.ComponentType), `bgProyect`, `codeUrl`, `demoUrl`.
- **projects**: array de proyectos. Cada elemento tiene un `id` único y un componente de demo asignado.
- ContentHandler en App hace: `const project = projects.find(p => p.id === projectId)`; si existe y tiene `content`, renderiza `<project.content />`, si no `<NotFound />`.

## Uso

- Desde la galería: el usuario hace click en una Card y navega a `/page/:id` (CardDetails). CardDetails usa `projects` por `id` para mostrar cabecera y contenido; el contenido es el mismo componente que en demos.
- Acceso directo a demo: `/demos/1`, `/demos/2`, etc., para ver solo el contenido del proyecto sin la cabecera de CardDetails.

## Dependencias

Cada demo puede tener sus propias dependencias (estilos, iconos, estado local). Los proyectos se cargan todos en el bundle al importar `config/project.ts` (no hay lazy loading por defecto).

## Mejoras sugeridas

- Usar `React.lazy()` para cada `content` y `<Suspense>` en ContentHandler y CardDetails para reducir el bundle inicial.
- Documentar cada demo en su propio archivo (por ejemplo en `docs/componentes/demos/`) con props, estado y propósito del proyecto.
- Unificar criterio de ids entre `cards` y `projects` para que un solo id sirva para página de detalle y demo embebida sin confusión.
