# Documentación del portfolio

## 1. Propósito de la página

Este proyecto es un **portfolio personal** (SPA) que sirve como:

- **Presentación profesional**: Muestra el perfil del desarrollador (Wilmer Lynch), rol (Web Developer) y avatar.
- **Vitrina de proyectos**: Galería de proyectos con tarjetas interactivas, enlaces a código (GitHub) y demos en vivo.
- **Información y habilidades**: Sección “Información” con skills, frameworks, tecnologías y experiencia (composite pattern para agrupar datos).
- **Canal de contacto**: Formulario de contacto que persiste en **Firebase Firestore** y enlaces a redes (WhatsApp, Instagram, GitHub, etc.).
- **Analytics**: Integración con **Google Analytics 4** (vistas de página, navegación entre secciones, intentos de contacto).

Está orientado a captar oportunidades laborales o de colaboración y dar visibilidad al trabajo del desarrollador.

---

## 2. Arquitectura

### 2.1 Stack

| Capa        | Tecnología                          |
|------------|--------------------------------------|
| Framework  | React 18                             |
| Build      | Vite 6                               |
| Estilos    | Tailwind CSS                         |
| Animaciones| Framer Motion, GSAP, Three.js        |
| Enrutado   | React Router v6                      |
| Backend/DB | Firebase (Firestore)                 |
| Analytics  | react-ga4 (GA4)                      |
| Iconos     | @reacticons/ionicons                 |

### 2.2 Estructura de carpetas (src)

```
src/
├── App.tsx                 # Router, GA4, layout global (NavMenu, BackgroundStars, ResponsiveMenu)
├── main.jsx
├── pages/                  # Vistas por ruta
│   ├── home.jsx            # Hero + CircleProfile + Glitch + WordCloud + Footer
│   ├── information.tsx     # SkillSection + ExpAndTecnologies + Footer
│   ├── proyects.jsx        # Grid de cards + Footer
│   ├── contact.jsx         # ContactForm + Footer
│   ├── 404.jsx
│   └── demos.tsx           # Contenido dinámico por projectId
├── components/
│   ├── navbar/             # navMenu.tsx, menuResponsive.tsx
│   ├── footer/             # footer.tsx
│   ├── cards/              # components_Card, components_Grid, proyectPage (CardDetails)
│   ├── form.tsx            # Formulario de contacto (Firestore + validación)
│   ├── about/              # informationContent.tsx (SkillSection, ExpAndTecnologies)
│   ├── animations/         # glitchPresentation, WordCloud, StarsBackground, variants.ts
│   ├── buttons/            # magneticBtn.tsx
│   ├── demos/              # Componentes de demo por proyecto (ecomerce, barberia, etc.)
│   └── utils/              # cardAnimations, infoHandler, validation
├── config/                 # project.ts, cards.ts, firebase.js, webPlans.ts
├── hooks/                  # useAnalytics, useGsapAnimation
├── utils/                  # analytics.ts
└── types/                  # types.ts
```

### 2.3 Flujo de datos y rutas

- **Rutas**: `/`, `/inicio` → Home; `/informacion` → Information; `/proyectos` → Proyects; `/contacto` → Contact; `/page/:id` → detalle de proyecto (CardDetails); `/demos/:projectId` → demo embebida. No existe ruta `/planes` aunque el menú la muestra.
- **Datos**: Proyectos desde `config/project.ts` (id, content, bgProyect, codeUrl, demoUrl). Tarjetas de la galería desde `config/cards.ts`. Formulario → Firestore.
- **Analytics**: Inicialización GA4 en `App`; `trackPageView`, `trackSectionNavigation` y `trackContactAttempt` desde `utils/analytics.ts` y hook `useAnalytics`.

### 2.4 Patrones usados

- **Container/Presentational**: Grid (contenedor) + Card (presentacional).
- **Composición**: Páginas = secciones + Footer; Information = SkillSection + ExpAndTecnologies.
- **Data-driven**: Listas de nav, cards y proyectos desde config/arrays.
- **Variantes centralizadas**: `animations/variants.ts` para Framer Motion (CONTAINERCARDS, CARDS, INLINECARDS).

---

## 3. Propuestas de refactorización

### 3.1 Rutas y navegación

- **Ruta “Planes”**: El menú (navMenu y menuResponsive) incluye “Planes” pero no hay `<Route path="/planes" />` en `App.tsx`. Opciones: añadir la ruta y una página (por ejemplo con `config/webPlans.ts`) o quitar “Planes” del menú para evitar 404.

### 3.2 Consistencia de nombres y tipos

- **Nombres de archivos**: Unificar criterio (ej. `components_Card.tsx` → `Card.tsx`, `components_Grid.tsx` → `Grid.tsx`). Corregir typo `inpput.jsx` → `Input.jsx` (o `Input.tsx`).
- **Extensiones**: Mezcla de `.jsx` y `.tsx`. Ir migrando páginas y componentes a `.tsx` y tipado para mejor mantenimiento y DX.
- **CardProps**: En `types/types.ts` está `img`; en algunos usos se menciona `imgSrc`. Estandarizar un solo nombre en tipos y componentes.

### 3.3 Componentes y responsabilidades

- **Form (form.tsx)**: Archivo largo (~400 líneas) con variantes de animación, subcomponentes (AnimatedInput, AnimatedTextarea) y lógica de submit. Propuesta: extraer variantes a `animations/variants.ts` o a un archivo local de variantes del formulario; extraer `AnimatedInput` y `AnimatedTextarea` a componentes en `components/form/` o `components/inputs/`; dejar en `form.tsx` solo composición y submit.
- **informationContent.tsx**: Muy largo (skills + proyectos + secciones). Valorar dividir en `SkillSection.tsx`, `ExpAndTecnologies.tsx` y mover datos a `config/skills.ts` / `config/technologies.ts`.
- **CardDetails (proyectPage.tsx)**: Usa `showInfo`/`hideInfo` con `getElementById` y estilos inline. Valorar un componente Tooltip/Popover reactivo en lugar de manipulación directa del DOM.

### 3.4 Configuración y duplicación

- **Enlaces sociales**: Aparecen en `form.tsx` (SOCIAL_LINKS/SOCIAL_ITEMS) y en `footer.tsx` (CONTACT_INFO.socialMedia). Centralizar en algo como `config/social.ts` o `config/contact.ts` y reutilizar en ambos.
- **navItems**: Duplicado en `navMenu.tsx` y `menuResponsive.tsx`. Extraer a `config/nav.ts` o constante compartida y importar en ambos.

### 3.5 Accesibilidad y UX

- **Footer/Form**: Revisar contraste y focus visible en enlaces y botones.
- **CardDetails**: Los botones “Código” y “Ver Proyecto” usan tooltips con `showInfo`/`hideInfo`; asegurar que la información sea accesible por teclado y lectores de pantalla (por ejemplo con un tooltip accesible o `aria-describedby`).

### 3.6 Rendimiento y bundle

- **Demos**: Los componentes en `components/demos/` se cargan desde `config/project.ts`. Valorar `React.lazy` + `Suspense` por ruta `/demos/:projectId` para no cargar todos los demos en el bundle inicial.
- **Three.js (StarsBackground)**: Ya se usa ref y cleanup; revisar si el número de partículas (p. ej. 500) es adecuado en móviles y si conviene reducir o degradar en viewports pequeños.

### 3.7 Testing y calidad

- Añadir tests unitarios para: `utils/validation.js` (isValidEmail, etc.), `utils/analytics.ts` (mocks de GA4), y componentes críticos (Form, Card).
- Revisar reglas de ESLint y asegurar que no queden `console.log` o código comentado innecesario en producción.

---

## 4. Índice de documentación por componente

Cada componente tiene su propia ficha en esta carpeta:

| Documento | Componente(s) |
|-----------|----------------|
| [navbar.md](navbar.md) | NavMenu, menuResponsive |
| [footer.md](footer.md) | Footer |
| [cards.md](cards.md) | Card, Grid, CardDetails (proyectPage) |
| [form.md](form.md) | ContactForm, AnimatedInput, AnimatedTextarea |
| [animations.md](animations.md) | Glitch, WordCloud, StarsBackground, variants |
| [about.md](about.md) | informationContent (SkillSection, ExpAndTecnologies) |
| [circle-profile.md](circle-profile.md) | CircleProfile |
| [magnetic-btn.md](magnetic-btn.md) | MagneticBtn |
| [input.md](input.md) | Input (inpput.jsx) |
| [utils.md](utils.md) | cardAnimations, infoHandler, validation |
| [demos.md](demos.md) | Demos (crudNode, authSystem, ecomerce, etc.) |
