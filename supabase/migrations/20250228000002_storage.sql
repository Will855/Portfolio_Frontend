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
