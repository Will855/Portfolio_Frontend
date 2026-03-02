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
