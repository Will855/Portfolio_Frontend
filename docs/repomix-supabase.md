This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: supabase/**/*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
supabase/
  .temp/
    cli-latest
  migrations/
    20250228000001_initial_schema.sql
    20250228000002_storage.sql
    20250228000003_unify_projects.sql
    20250228000004_project_content.sql
    20250228000005_info_sections.sql
    20260614000001_seed_cv_data.sql
    20260617000002_add_missing_project_columns.sql
    portfolio.code-workspace
  ejemplo_contenido.sql
  README.md
```

# Files

## File: supabase/migrations/portfolio.code-workspace
````
{
	"folders": [
		{
			"name": "portfolio",
			"path": "../.."
		}
	],
	"settings": {}
}
````

## File: supabase/.temp/cli-latest
````
v2.106.0
````

## File: supabase/migrations/20250228000002_storage.sql
````sql
-- Storage bucket and RLS for portfolio-assets
-- Create bucket in Dashboard if not exists: Storage -> New bucket -> id: portfolio-assets, Public: yes
-- Then run this to allow: public read, authenticated (admin) write

insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do update set public = true;

-- Anyone can read (public bucket)
create policy "Public read portfolio-assets"
  on storage.objects for select
  using (bucket_id = 'portfolio-assets');

-- Only authenticated users (admin list checked in app or add same admin_emails check via custom claim) can upload
-- Using authenticated role: any logged-in user can upload; restrict to admin in app by only allowing admin UI to call upload
create policy "Authenticated upload portfolio-assets"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');

create policy "Authenticated update portfolio-assets"
  on storage.objects for update
  using (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');

create policy "Authenticated delete portfolio-assets"
  on storage.objects for delete
  using (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');
````

## File: supabase/migrations/20250228000003_unify_projects.sql
````sql
-- Unify cards + projects_meta into a single "cards" table
-- Adds project metadata columns to cards so everything lives in one place.

ALTER TABLE public.cards
  ADD COLUMN IF NOT EXISTS code_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS demo_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS bg_image_path text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "order" smallint NOT NULL DEFAULT 0;

-- Migrate existing projects_meta data into cards
UPDATE public.cards c
SET
  code_url    = pm.code_url,
  demo_url    = pm.demo_url,
  bg_image_path = pm.bg_image_path,
  "order"     = pm."order"
FROM public.projects_meta pm
WHERE c.id = pm.id;
````

## File: supabase/migrations/20250228000004_project_content.sql
````sql
-- Project content blocks: text, images (.webp), videos (.gif) per project
create table if not exists public.project_content (
  id uuid primary key default gen_random_uuid(),
  project_id text not null references public.cards(id) on delete cascade,
  type text not null check (type in ('text', 'image', 'video')),
  content text not null,
  caption text default '',
  "order" smallint not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.project_content enable row level security;

create policy "Public read project_content"
  on public.project_content for select
  using (true);

create policy "Admin write project_content"
  on public.project_content for all
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

create index if not exists idx_project_content_project_id
  on public.project_content (project_id, "order");
````

## File: supabase/migrations/20250228000005_info_sections.sql
````sql
-- Info sections: editable skill groups and knowledge/technology cards
-- Replaces hardcoded SKILLS and PROJECTS arrays in informationContent.tsx

create table if not exists public.info_sections (
  id uuid primary key default gen_random_uuid(),
  section_type text not null check (section_type in ('skill', 'knowledge')),
  title text not null,
  color text not null default 'blue' check (color in ('blue', 'purple', 'green')),
  items jsonb not null default '[]'::jsonb,
  "order" smallint not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.info_sections enable row level security;

create policy "Public read info_sections"
  on public.info_sections for select
  using (true);

create policy "Admin write info_sections"
  on public.info_sections for all
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

-- Seed: current SKILLS data (section_type = 'skill')
insert into public.info_sections (section_type, title, color, items, "order") values
  ('skill', 'Información', 'blue', '["Wilmer Lynch - Programador Full Stack"]', 0),
  ('skill', 'Lenguajes', 'purple', '["JavaScript", "Python"]', 1),
  ('skill', 'Frameworks', 'green', '["React", "Django", "PHP", "Next.js"]', 2),
  ('skill', 'MERN de React', 'blue', '["MongoDB", "Express.js", "React", "Node.js"]', 3),
  ('skill', 'MERN de Django', 'blue', '["MongoDB + Express + React + Node.js", "Alternativa con Django: PostgreSQL + Django + React"]', 4);

-- Seed: current PROJECTS/knowledge data (section_type = 'knowledge')
insert into public.info_sections (section_type, title, color, items, "order") values
  ('knowledge', '📚 Librerías para React (4 años) — Estado y Gestión', 'blue', '["Redux — Gestión de estado predecible", "Zustand — Gestión de estado minimalista", "React Query / TanStack Query — Estado del servidor"]', 0),
  ('knowledge', '🧭 Ruteo', 'purple', '["React Router — Ruteo para SPA", "Next.js Router — Ruteo por file-system"]', 1),
  ('knowledge', '🎨 UI Components y Styling', 'blue', '["Material-UI (MUI)", "Ant Design", "Chakra UI", "Tailwind CSS", "Styled Components"]', 2),
  ('knowledge', '📝 Formularios', 'purple', '["React Hook Form", "Formik"]', 3),
  ('knowledge', '🧪 Testing', 'blue', '["Jest", "React Testing Library"]', 4),
  ('knowledge', '🧰 Utilidades', 'purple', '["Axios", "React Spring / Framer Motion", "React Icons", "date-fns"]', 5),
  ('knowledge', '⚙️ Librerías Django (4 años) — APIs REST', 'blue', '["Django REST Framework (DRF)"]', 6),
  ('knowledge', '🔐 Autenticación y Autorización', 'purple', '["Django Allauth", "DRF Simple JWT", "Django Cors Headers"]', 7),
  ('knowledge', '🗄️ Bases de Datos y ORM', 'blue', '["Django Debug Toolbar", "Django Extensions", "Django Filter"]', 8),
  ('knowledge', '📋 Formularios y UI', 'purple', '["Django Crispy Forms"]', 9),
  ('knowledge', '🛡️ Seguridad', 'blue', '["Django Guardian"]', 10),
  ('knowledge', '🚀 Desarrollo y Deployment', 'purple', '["Django Environ", "WhiteNoise", "Django Storages"]', 11),
  ('knowledge', '🧪 Testing (Django)', 'blue', '["pytest-django"]', 12),
  ('knowledge', '🔧 Otras Utilidades (Django)', 'purple', '["Celery", "Django Redis"]', 13),
  ('knowledge', '💼 ¿A qué me dedico?', 'purple', '["Creación de páginas web", "Administrador de servidores", "Creación de bots de Telegram", "Automatización de procesos (n8n)", "Integraciones: web + automatización + feedback por Telegram"]', 14),
  ('knowledge', '📖 ¿Cómo aprendí?', 'blue', '["Autodidacta: videos, libros y práctica", "Canales: HolaMundoDev, mouredev, ProgramadorX, soydalto, Platzi, FaztTech"]', 15),
  ('knowledge', '📚 Libros', 'purple', '["Patterns of Enterprise Application Architecture — Martin Fowler", "JavaScript: The Good Parts — Douglas Crockford", "Clean Architecture — Robert C. Martin", "The Clean Coder — Robert C. Martin", "Atomic Habits — James Clear", "The Linux Programming Interface — Michael Kerrisk", "Clean Code — Robert C. Martin"]', 16),
  ('knowledge', '✍️ ¿Cómo me gusta escribir el código?', 'blue', '["Entender primero el problema", "Definir los requisitos", "Planificar la solución", "Aplicar Principios SOLID y Clean Code", "Practicar patrones de diseño", "Manejo de errores robusto"]', 17),
  ('knowledge', '🎯 ¿A dónde quiero llegar? (Especialización)', 'purple', '["Creación de E-commerce", "Frameworks: React (conocimientos), Next.js (conocimientos)", "Frameworks: Vue.js + Nuxt.js (sin conocimientos)", "Frameworks: Angular (sin conocimientos)", "Frameworks: Svelte + SvelteKit (sin conocimientos)"]', 18),
  ('knowledge', '🛒 Librerías específicas e-commerce', 'blue', '["Shopify Storefront API (para React) — con conocimientos", "Commerce.js — sin conocimientos"]', 19);
````

## File: supabase/migrations/20260614000001_seed_cv_data.sql
````sql
-- Seed: Carga de información real desde el CV de Wilmer Lynch para la sección de Inicio
-- Reemplaza los datos anteriores en la tabla info_sections.

-- Limpiar registros existentes en info_sections
DELETE FROM public.info_sections;

-- Insertar habilidades reales (section_type = 'skill')
INSERT INTO public.info_sections (section_type, title, color, items, "order") VALUES
('skill', 'Frontend & 3D', 'blue', '["React 18", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "WebGL", "GSAP"]'::jsonb, 0),
('skill', 'Backend & Cloud', 'green', '["Node.js", "Express", "Supabase (RLS)", "PostgreSQL", "MongoDB", "FastAPI", "SQLAlchemy", "REST APIs"]'::jsonb, 1),
('skill', 'Automatización e IA', 'purple', '["n8n", "Agentes de IA", "Integración de APIs (Telegram, WhatsApp, Google Calendar)"]'::jsonb, 2),
('skill', 'Herramientas y DevOps', 'blue', '["Git", "GitHub Actions", "Vite", "Jest (Pruebas Unitarias y de Seguridad)", "Vercel"]'::jsonb, 3);

-- Insertar experiencias profesionales reales (section_type = 'knowledge')
INSERT INTO public.info_sections (section_type, title, color, items, "order") VALUES
('knowledge', 'Desarrollador Fullstack Freelance | Mercado Internacional (España)', 'blue', '[
  {
    "title": "Marzo 2024 – Presente | Remoto",
    "body": "Desarrollo de soluciones de software escalables en modalidad freelance para clientes internacionales."
  },
  {
    "title": "SSEMMA",
    "body": "Sistema integral de gestión de propiedades multi-empresa con arquitectura escalable, soportando múltiples clientes independientes con total aislamiento de datos mediante Row Level Security (RLS)."
  },
  {
    "title": "Rentally",
    "body": "Plataforma de gestión de pedidos de lencería y amenities para apartamentos turísticos, con módulos de catálogo, órdenes, contratos y pagos integrados."
  },
  {
    "title": "Petfhans",
    "body": "Plataforma veterinaria SaaS multi-tenant con validación defensiva y cifrado de datos sensibles, soportando +5,000 registros de pacientes. Disponible para visualización en [petfhans.com](https://petfhans.com)."
  }
]'::jsonb, 0),
('knowledge', 'Desarrollador Fullstack | Evolaris', 'purple', '[
  {
    "title": "Enero 2022 – Febrero 2024 | Remoto",
    "body": "Desarrollo de aplicaciones web del lado del cliente y del servidor para sectores de Veterinaria, Inmobiliaria y E-commerce, gestionando el ciclo de vida completo del desarrollo (SDLC)."
  },
  {
    "title": "Programación Defensiva y Testing",
    "body": "Implementación de estándares de programación defensiva con Joi para validación de esquemas y Jest para pruebas de seguridad automatizadas, reduciendo vulnerabilidades en un 25%."
  },
  {
    "title": "Arquitectura Multi-tenant",
    "body": "Diseño de arquitecturas multi-tenant con Supabase/PostgreSQL garantizando aislamiento total de datos mediante Row Level Security (RLS)."
  }
]'::jsonb, 1);
````

## File: supabase/migrations/20260617000002_add_missing_project_columns.sql
````sql
-- Migration to add missing columns to cards table if they are not already there
ALTER TABLE public.cards
  ADD COLUMN IF NOT EXISTS problem_solved text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS architectural_doc text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'Full Stack',
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}';
````

## File: supabase/ejemplo_contenido.sql
````sql
-- Ejemplo: Agregar contenido de prueba para el proyecto "E-Commerce" (id: 1)
-- Ejecuta esto en Supabase SQL Editor DESPUÉS de ejecutar la migración 20250228000004_project_content.sql

-- Bloque 1: Título y descripción
INSERT INTO public.project_content (project_id, type, content, caption, "order") VALUES
('1', 'text', '<h2 class="text-3xl font-bold mb-4">E-Commerce con React y Redux</h2><p class="text-lg text-gray-700 leading-relaxed">Este proyecto es una aplicación de comercio electrónico completa construida con React, Redux y la FakeStore API. Implementa gestión de estado global, carrito de compras persistente y una interfaz de usuario moderna y responsiva.</p>', '', 0);

-- Bloque 2: Características principales
INSERT INTO public.project_content (project_id, type, content, caption, "order") VALUES
('1', 'text', '<h3 class="text-2xl font-bold mb-3">Características principales</h3><ul class="list-disc list-inside space-y-2 text-gray-700"><li>Gestión de estado con Redux Toolkit</li><li>Carrito de compras con persistencia en localStorage</li><li>Integración con FakeStore API</li><li>Diseño responsivo con Tailwind CSS</li><li>Filtrado y búsqueda de productos</li></ul>', '', 1);

-- Bloque 3: Stack tecnológico
INSERT INTO public.project_content (project_id, type, content, caption, "order") VALUES
('1', 'text', '<h3 class="text-2xl font-bold mb-3">Stack Tecnológico</h3><div class="flex flex-wrap gap-2"><span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React 18</span><span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Redux Toolkit</span><span class="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">Tailwind CSS</span><span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">FakeStore API</span></div>', '', 2);

-- Nota: Para agregar imágenes o videos, debes subirlos desde el admin (/admin/content)
-- porque necesitan subirse a Supabase Storage primero.

-- Verifica que se insertaron correctamente:
SELECT * FROM public.project_content WHERE project_id = '1' ORDER BY "order";
````

## File: supabase/migrations/20250228000001_initial_schema.sql
````sql
-- Portfolio Supabase: schema + RLS
-- Run this in Supabase SQL Editor or via supabase db push

-- Admin: only users whose email is in this table can write
create table if not exists public.admin_emails (
  email text primary key,
  created_at timestamptz default now()
);

alter table public.admin_emails enable row level security;

create policy "Only existing admins can read admin_emails"
  on public.admin_emails for select
  using (auth.jwt() ->> 'email' = email);

-- Hero (single row, fixed id for upsert)
create table if not exists public.hero_content (
  id text primary key default 'default',
  title text not null default 'Wilmer Lynch',
  subtitle text not null default 'Web Developer',
  profile_image_path text not null default 'avatars/profile.jpeg',
  updated_at timestamptz default now()
);

alter table public.hero_content enable row level security;

create policy "Public read hero_content"
  on public.hero_content for select
  using (true);

create policy "Admin write hero_content"
  on public.hero_content for all
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

-- Cards (gallery)
create table if not exists public.cards (
  id text primary key,
  title text not null,
  description text not null,
  button_text text not null default 'Ver más...',
  image_path text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.cards enable row level security;

create policy "Public read cards"
  on public.cards for select
  using (true);

create policy "Admin write cards"
  on public.cards for all
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

-- Projects metadata (bg image, urls; React content stays in code)
create table if not exists public.projects_meta (
  id text primary key,
  bg_image_path text not null,
  code_url text not null,
  demo_url text not null,
  "order" smallint default 0,
  updated_at timestamptz default now()
);

alter table public.projects_meta enable row level security;

create policy "Public read projects_meta"
  on public.projects_meta for select
  using (true);

create policy "Admin write projects_meta"
  on public.projects_meta for all
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

-- Content blocks (about, footer, nav: html or json)
create table if not exists public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  content text not null,
  type text not null check (type in ('html', 'json')),
  updated_at timestamptz default now()
);

alter table public.content_blocks enable row level security;

create policy "Public read content_blocks"
  on public.content_blocks for select
  using (true);

create policy "Admin write content_blocks"
  on public.content_blocks for all
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

-- Contact form submissions (Option A: migrate from Firebase)
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz default now()
);

alter table public.contact_submissions enable row level security;

create policy "Anyone can insert contact_submissions"
  on public.contact_submissions for insert
  with check (true);

create policy "Admin read contact_submissions"
  on public.contact_submissions for select
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

create policy "Admin delete contact_submissions"
  on public.contact_submissions for delete
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

-- Seed single hero row
insert into public.hero_content (id, title, subtitle, profile_image_path)
values ('default', 'Wilmer Lynch', 'Web Developer', 'avatars/profile.jpeg')
on conflict (id) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  profile_image_path = excluded.profile_image_path,
  updated_at = now();

-- Seed cards (ids 1-7 to match existing routes)
insert into public.cards (id, title, description, button_text, image_path) values
  ('1', 'E-Commerce', 'Aplicacion de React con Redux y FakeStore API para crea un E-commerce', 'Ver mas...', 'cards/web7.webp'),
  ('2', 'FutureCart', 'E-commerce de teclados gaming', 'Ver más...', 'cards/web2.webp'),
  ('3', 'Barberia', 'Interfaz de reserva - Selección de servicios y barberos.', 'Ver más...', 'cards/web3.webp'),
  ('4', 'Formulario', 'Sistema de autenticación con login y registro', 'Ver más...', 'cards/web4.webp'),
  ('5', 'Paleta de colores', 'Aplicacion de react que genera 21 tonalidades de cualquier color', 'Ver mas...', 'cards/web5.webp'),
  ('6', 'CRUD/Rest API', 'CRUD de NodeJS con rest API para login con seguridad hash y manejo de errores', 'Ver mas...', 'cards/web6.webp'),
  ('7', 'HP Headphones', 'Landing Page de Auriculares', 'Ver más...', 'cards/web1.webp')
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  button_text = excluded.button_text,
  image_path = excluded.image_path,
  updated_at = now();

-- Seed projects_meta
insert into public.projects_meta (id, bg_image_path, code_url, demo_url, "order") values
  ('1', 'projects-bg/bg-proyecto2.jpg', 'https://github.com/Will855/fakeStore', 'https://fakestore-edf2003.web.app/', 1),
  ('2', 'projects-bg/bg-proyecto2.jpg', 'https://github.com/Will855/Carrito-de-Compras-JavaScript', 'https://will855.github.io/Carrito-de-Compras-JavaScript/', 2),
  ('3', 'projects-bg/bg-proyecto2.jpg', 'https://github.com/Will855/Barberia--Agendado-de-citas-', 'https://will855.github.io/Barberia--Agendado-de-citas-/#servicios', 3),
  ('4', 'projects-bg/bg-proyecto2.jpg', 'https://github.com/Will855/formulario', 'https://will855.github.io/formulario/', 4),
  ('5', 'projects-bg/bg-proyecto2.jpg', 'https://github.com/Will855/paleta-de-colores', 'https://will855.github.io/paleta-de-colores/', 5),
  ('6', 'projects-bg/bg-proyecto2.jpg', 'https://github.com/Will855/CRUD-NodeJS', '/page/6', 6),
  ('7', 'projects-bg/bg-proyecto1.jpg', 'https://github.com/Will855/HeadPhones', 'https://will855.github.io/HeadPhones/', 7)
on conflict (id) do update set
  bg_image_path = excluded.bg_image_path,
  code_url = excluded.code_url,
  demo_url = excluded.demo_url,
  "order" = excluded."order",
  updated_at = now();

-- Seed content_blocks: nav items (editable from admin)
insert into public.content_blocks (key, content, type) values
  ('nav_items', '["Inicio","Proyectos"]', 'json')
on conflict (key) do update set content = excluded.content, type = excluded.type, updated_at = now();
````

## File: supabase/README.md
````markdown
# Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. In Supabase SQL Editor, run the migrations in order:
   - `migrations/20250228000001_initial_schema.sql`
   - `migrations/20250228000002_storage.sql`
   - `migrations/20250228000003_unify_projects.sql` (añade code_url, demo_url, bg_image_path, order a cards)
   - `migrations/20250228000004_project_content.sql` (tabla de bloques de contenido por proyecto)
4. **Registro admin**: En la app ve a `/admin/login` y usa la pestaña "Registrarse" para crear tu cuenta. Si en Supabase está activada la confirmación de email, confirma el enlace que te llegue.
5. **Permisos de admin**: Tras registrarte, añade tu email a la tabla de admins en Supabase → SQL Editor:
   ```sql
   insert into public.admin_emails (email) values ('tu@email.com');
   ```
   (Sustituye por el email con el que te registraste.) Sin este paso podrás iniciar sesión pero no editar contenido (RLS bloquea escritura).
6. Opcional: en Authentication > Providers > Email puedes desactivar "Confirm email" para no tener que confirmar el correo al registrarte.
7. **Probar la base de datos**: En `/admin/login` la app hace una prueba de conexión (lectura de `hero_content`). Si falla, verás un mensaje en rojo: revisa que las migraciones se hayan ejecutado y que la URL y la anon key en `.env` sean correctas.

8. Storage: create bucket `portfolio-assets` as **Public** (Dashboard > Storage > New bucket). Then upload files:
   - `public/profile.jpeg` → `avatars/profile.jpeg`
   - `public/images/bg-proyecto1.jpg` → `projects-bg/bg-proyecto1.jpg`
   - `public/images/bg-proyecto2.jpg` → `projects-bg/bg-proyecto2.jpg`
   - `public/assets/web1.webp` … `web7.webp` → `cards/web1.webp` … `cards/web7.webp`
   - `public/assets/qrWhatsApp.webp` → `footer/qrWhatsApp.webp` (if you use it from content later)

Until uploads are done, the site falls back to local asset paths when Supabase URLs are missing.

**Probar peticiones a Supabase por proyecto:** En la web pública, entra en Proyectos y haz clic en una card: irás a `/page/:id`. Esa página lee `cards` (título, descripción, codeUrl, demoUrl, bgImage) y `project_content` (bloques de texto/imagen/video). Si no hay bloques, verás "Sin contenido para este proyecto. Añade bloques desde Admin → Contenido."

**Probar el CRUD de contenido en /admin:** Inicia sesión en `/admin/login`, ve a **Contenido**, elige un proyecto en el desplegable, pulsa "Agregar bloque" → Texto, escribe algo (p. ej. `<p>Hola</p>`), "Guardar todo". Abre en otra pestaña `/page/1` (o el id que elegiste): debe aparecer el bloque. Editar y eliminar bloques también se guarda en Supabase (`project_content`).
````
