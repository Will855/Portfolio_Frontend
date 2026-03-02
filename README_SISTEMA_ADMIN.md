# Sistema Administrativo - Portfolio

## Resumen de mejoras implementadas

### 1. Sistema CRUD de Proyectos
- **Crear, editar y eliminar** proyectos desde `/admin/projects`
- **Reordenar** proyectos con flechas arriba/abajo
- **Upload** de imágenes de card e imágenes de fondo
- **Vista previa** en tiempo real
- UI con **glassmorphism** consistente

### 2. Editor de Contenido por Proyecto
- **Bloques editables** de texto, imágenes (.webp, .jpg, .png) y videos (.gif, .mp4)
- **Reordenar bloques** con flechas
- **Captions** opcionales para imágenes y videos
- **Vista previa** del contenido completo
- Contenido se renderiza en la página pública del proyecto

### 3. Panel Admin Responsivo
- **Sidebar colapsable** en móvil con botón hamburger
- **Glassmorphism** en todas las secciones
- **Layout adaptativo** para todas las pantallas

## Pasos para usar el sistema

### Paso 1: Ejecutar migraciones SQL

Ve a [Supabase SQL Editor](https://supabase.com) y ejecuta estos archivos en orden:

1. `supabase/migrations/20250228000001_initial_schema.sql` (si no lo hiciste)
2. `supabase/migrations/20250228000002_storage.sql` (si no lo hiciste)
3. `supabase/migrations/20250228000003_unify_projects.sql` ✅ **NUEVO**
4. `supabase/migrations/20250228000004_project_content.sql` ✅ **NUEVO**

### Paso 2: Configurar admin

1. Crea una cuenta en `/admin/login` (modo "Registrarse")
2. En Supabase SQL Editor, ejecuta:
   ```sql
   INSERT INTO public.admin_emails (email) VALUES ('tu@email.com');
   ```
3. Inicia sesión en `/admin/login`

### Paso 3: Gestionar proyectos

#### Crear proyecto nuevo
1. Ve a `/admin/projects`
2. Clic en **"Nuevo proyecto"**
3. Rellena el formulario:
   - Título (requerido)
   - Descripción (requerido)
   - Texto del botón (default: "Ver más...")
   - Imagen de card (opcional)
   - Imagen de fondo (opcional)
   - URL del código (GitHub, etc.)
   - URL del demo
   - Orden (número)
4. Clic en **"Crear proyecto"**

#### Editar proyecto existente
1. Ve a `/admin/projects`
2. Clic en **"Editar"** en cualquier card
3. Modifica los campos
4. Clic en **"Actualizar"**

#### Eliminar proyecto
1. Ve a `/admin/projects`
2. Clic en el ícono de **basura**
3. Confirma con **"Sí"**

#### Reordenar proyectos
1. Usa las **flechas ↑ ↓** en cada card (aparecen al hacer hover)
2. El orden se guarda automáticamente

### Paso 4: Agregar contenido a proyectos

#### Acceder al editor
1. Ve a `/admin/content`
2. Selecciona un proyecto del dropdown

#### Agregar bloques

**Bloque de texto:**
1. Clic en **"Agregar bloque"** → **"Texto"**
2. Escribe en el textarea (soporta HTML)
3. Ejemplo:
   ```html
   <h2>Título de sección</h2>
   <p>Descripción del proyecto...</p>
   <ul>
     <li>Característica 1</li>
     <li>Característica 2</li>
   </ul>
   ```

**Bloque de imagen:**
1. Clic en **"Agregar bloque"** → **"Imagen"**
2. Clic en **"Choose File"** y selecciona una imagen
3. (Opcional) Agrega un caption
4. La imagen se sube a Supabase Storage automáticamente

**Bloque de video:**
1. Clic en **"Agregar bloque"** → **"Video"**
2. Clic en **"Choose File"** y selecciona un .gif o .mp4
3. (Opcional) Agrega un caption
4. El video se sube a Supabase Storage automáticamente

#### Reordenar y eliminar
- **Reordenar**: Usa las flechas ↑ ↓ en cada bloque
- **Eliminar**: Clic en el ícono de basura

#### Guardar cambios
1. Clic en **"Guardar todo"** al final
2. Espera a que termine de subir los archivos
3. Verifica en la **vista previa** al final

### Paso 5: Ver el resultado

1. Ve a `/proyectos` en la página pública
2. Clic en cualquier proyecto
3. El contenido que agregaste se mostrará automáticamente

## Estructura de archivos

```
portfolio/
├── supabase/
│   └── migrations/
│       ├── 20250228000003_unify_projects.sql      ← Unifica cards + projects_meta
│       ├── 20250228000004_project_content.sql     ← Tabla de contenido por proyecto
│       └── ejemplo_contenido.sql                  ← Datos de ejemplo
├── src/
│   ├── pages/admin/
│   │   ├── AdminLayout.tsx                        ← Layout responsivo con sidebar
│   │   ├── AdminLogin.tsx                         ← Login con glassmorphism
│   │   └── sections/
│   │       ├── AdminProjects.tsx                  ← CRUD de proyectos
│   │       ├── AdminContent.tsx                   ← Editor de contenido
│   │       ├── AdminHero.tsx                      ← Editor de hero
│   │       └── AdminMessages.tsx                  ← Mensajes de contacto
│   ├── hooks/
│   │   ├── useCards.ts                            ← Hook de proyectos (extendido)
│   │   └── useProjectContent.ts                   ← Hook de contenido por proyecto
│   ├── components/cards/
│   │   └── proyectPage.tsx                        ← Página de proyecto (renderiza contenido dinámico)
│   └── types/
│       └── supabase.ts                            ← Tipos extendidos
├── INSTRUCCIONES_ADMIN_CONTENIDO.md               ← Guía detallada
└── README_SISTEMA_ADMIN.md                        ← Este archivo
```

## Tablas de Supabase

### `cards` (proyectos unificados)
- `id`, `title`, `description`, `button_text`, `image_path`
- `code_url`, `demo_url`, `bg_image_path`, `order` ← **NUEVOS**
- `created_at`, `updated_at`

### `project_content` (contenido por proyecto)
- `id`, `project_id` (FK a `cards.id`)
- `type` ('text' | 'image' | 'video')
- `content` (texto HTML o path en storage)
- `caption` (opcional)
- `order` (para ordenar bloques)
- `created_at`, `updated_at`

## Storage en Supabase

Bucket: `portfolio-assets`

Carpetas:
- `cards/` - Imágenes de cards de proyectos
- `projects-bg/` - Imágenes de fondo de proyectos
- `project-images/` - Imágenes del contenido de proyectos
- `project-videos/` - Videos/GIFs del contenido de proyectos
- `avatars/` - Foto de perfil del hero

## Troubleshooting

### "No veo el contenido en la página pública"

1. Verifica que ejecutaste la migración `20250228000004_project_content.sql`
2. Abre DevTools (F12) → Console y busca logs de `[useProjectContent]`
3. Verifica que guardaste los bloques con "Guardar todo"
4. Verifica en Supabase → Table Editor → `project_content` que hay datos

### "Error al subir imágenes"

1. Verifica que el bucket `portfolio-assets` existe en Supabase Storage
2. Verifica que las políticas de Storage permiten:
   - Lectura pública
   - Escritura para usuarios autenticados

### "No puedo editar nada"

1. Verifica que tu email está en la tabla `admin_emails`
2. Ejecuta en SQL Editor:
   ```sql
   SELECT * FROM public.admin_emails;
   ```
3. Si no está, agrégalo:
   ```sql
   INSERT INTO public.admin_emails (email) VALUES ('tu@email.com');
   ```

## Características técnicas

- **React 18** con TypeScript
- **Supabase** para backend (PostgreSQL + Storage + Auth)
- **TanStack Query** para cache y sincronización
- **Tailwind CSS** para estilos
- **Glassmorphism** (`bg-white/5 backdrop-blur-xl border border-white/10`)
- **Responsive design** (mobile-first)
- **RLS (Row Level Security)** para seguridad
- **Cascade delete** (al eliminar proyecto, se elimina su contenido)

## Próximas mejoras sugeridas

- [ ] Editor WYSIWYG para bloques de texto (TipTap, Quill)
- [ ] Drag & drop para reordenar bloques
- [ ] Previsualización en tiempo real del proyecto público
- [ ] Versionado de contenido
- [ ] Importar/exportar proyectos
- [ ] Búsqueda y filtrado de proyectos
- [ ] Estadísticas de visualizaciones
