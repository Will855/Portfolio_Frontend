# About (informationContent)

## Ubicación

`src/components/about/informationContent.tsx`

## Propósito

Contenido de la sección “Información” del portfolio: habilidades (skills), lenguajes, frameworks y tecnologías/experiencia, organizados con un patrón tipo composite (grupos con título, color y items).

## Uso

Se usa en la página Information:

```tsx
<SkillSection />
<ExpAndTecnologies />
```

Ambos se exportan desde `informationContent.tsx` e importan variantes de `animations/variants.ts` (CONTAINERCARDS, CARDS, INLINECARDS).

## Datos internos

- **SKILLS**: Array de objetos con `title`, `color` ("blue" | "purple" | "green"), `items` (strings o objetos con name/experience). Incluye “Información”, “Lenguajes”, “Frameworks”, “MERN React”, “MERN Django”.
- **PROJECTS**: Array de objetos con `title`, `color` ("blue" | "purple"), `details` (array de strings). Incluye librerías React, ruteo, UI, formularios, testing, utilidades, etc.

## SkillSection

- Renderiza secciones basadas en SKILLS.
- Usa Framer Motion (motion.div con CONTAINERCARDS y CARDS o INLINECARDS para los ítems).
- Estilos según `color` (gradientes blue/purple/green).

## ExpAndTecnologies

- Similar estructura para PROJECTS: contenedor animado y tarjetas con `details`.
- Colores blue/purple.

## Tipos

- `ArrHabilities`: `{ name, experience? } | string`
- `Habilities`: `title`, `color`, `items`
- `Knowledges`: `title`, `color`, `details`
- Datos tipados con `as const satisfies readonly Habilities[]`.

## Props

Ninguno. Todo se deriva de las constantes SKILLS y PROJECTS dentro del archivo.

## Dependencias

- React, useEffect, useRef, useState (si se usa)
- framer-motion (delay, stagger, motion, AnimatePresence)
- ../animations/variants (CONTAINERCARDS, CARDS, INLINECARDS)

## Mejoras sugeridas

- Extraer SKILLS y PROJECTS a `config/skills.ts` y `config/technologies.ts` (o un solo config) para separar datos de presentación.
- Dividir en dos archivos: `SkillSection.tsx` y `ExpAndTecnologies.tsx`, importados desde `informationContent.tsx` o directamente en la página Information.
- Reducir tamaño del archivo para facilitar mantenimiento y pruebas.
