# Hooks del portfolio

Resumen de los hooks con JSDoc en cada archivo. Las importaciones principales de cada uno:

| Hook | Archivo | Importaciones principales | Descripción |
|------|---------|---------------------------|-------------|
| `useCards` | useCards.ts | `useQuery`, `supabase`, `getStoragePublicUrl`, `CardRow`, `CardProps`, `fallbackCards` | Lista de proyectos/cards desde Supabase con fallback local |
| `useAdminAuth` | useAdminAuth.ts | `useEffect`, `useState`, `supabase`, `User`, `Session` | Autenticación del panel admin (login, signUp, signOut) |
| `useProjectContent` | useProjectContent.ts | `useQuery`, `supabase`, `ProjectContentRow` | Bloques de contenido por proyecto (texto, imagen, video) |
| `useContentBlock` | useContentBlock.ts | `useQuery`, `supabase`, `ContentBlockRow` | Bloque de contenido por clave (nav_items, footer, etc.) |
| `useContentBlocks` | useContentBlock.ts | `useContentBlock` | Varios bloques en paralelo |
| `useNavItems` | useNavItems.ts | `useContentBlock` | Ítems del menú de navegación |
| `useProjectsMeta` | useProjectsMeta.ts | `useQuery`, `supabase`, `getStoragePublicUrl`, `ProjectMetaRow`, `projects` | Metadata de proyectos (fondo, URLs, orden) |
| `useHeroContent` | useHeroContent.ts | `useQuery`, `supabase`, `getStoragePublicUrl`, `HeroContent` | Contenido del Hero (título, subtítulo, foto) |
| `useAnalytics` | useAnalytics.ts | `useEffect`, `useRef`, `trackTimeOnPage`, `trackScrollDepth` | Tracking de tiempo y scroll para analytics |

Detalles de parámetros, retornos y ejemplos están en los JSDoc de cada archivo.
