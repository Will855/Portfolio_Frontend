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
