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
  ('nav_items', '["Inicio","Informacion","Proyectos","Contacto","Planes"]', 'json')
on conflict (key) do update set content = excluded.content, type = excluded.type, updated_at = now();
