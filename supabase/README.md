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
