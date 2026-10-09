-- Migration: Site Settings and updated Info Sections
-- Date: 2026-10-09

-- 1. Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admin write site_settings"
  ON public.site_settings FOR ALL
  USING (EXISTS (SELECT 1 FROM public.admin_emails WHERE email = auth.jwt() ->> 'email'));

-- Insert contact info into site_settings
INSERT INTO public.site_settings (key, value, description)
VALUES (
  'contact_info',
  '{
    "email": "Wilmer@parz7val.online",
    "phone": "+58 4265940917",
    "socialMedia": {
      "github": { "url": "https://github.com/Will855" },
      "linkedin": { "url": "https://www.linkedin.com/in/wilmer-lynch" },
      "whatsapp": { "url": "https://wa.me/584265940917?text=Hola%20Wilmer,%20quiero%20trabajar%20contigo" }
    }
  }'::jsonb,
  'Configuración de contacto y redes sociales'
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- 2. Update info_sections with the latest fallbacks.ts data
-- First, clear the old "seed" data
DELETE FROM public.info_sections;

-- Insert new SKILLS
INSERT INTO public.info_sections (id, section_type, title, color, items, "order")
VALUES 
  ('a1111111-1111-1111-1111-111111111111', 'skill', 'Frontend & 3D', 'blue', '["React 18", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "WebGL", "GSAP"]'::jsonb, 0),
  ('a2222222-2222-2222-2222-222222222222', 'skill', 'Backend & Cloud', 'green', '["Node.js", "Express", "Supabase (RLS)", "PostgreSQL", "MongoDB", "FastAPI", "SQLAlchemy", "REST APIs"]'::jsonb, 1),
  ('a3333333-3333-3333-3333-333333333333', 'skill', 'Automatización e IA', 'purple', '["n8n", "Agentes de IA", "Integración de APIs (Telegram, WhatsApp, Google Calendar)"]'::jsonb, 2),
  ('a4444444-4444-4444-4444-444444444444', 'skill', 'Herramientas y DevOps', 'blue', '["Git", "GitHub Actions", "Vite", "Jest (Pruebas Unitarias y de Seguridad)", "Vercel"]'::jsonb, 3);

-- Insert new KNOWLEDGES
INSERT INTO public.info_sections (id, section_type, title, color, items, "order")
VALUES 
  ('b1111111-1111-1111-1111-111111111111', 'knowledge', 'Desarrollador Fullstack Freelance | Mercado Internacional (España)', 'blue', 
   '[
      {"title": "Marzo 2024 – Presente | Remoto", "body": "Desarrollo de soluciones de software escalables en modalidad freelance para clientes internacionales."},
      {"title": "SSEMMA", "body": "Sistema integral de gestión de propiedades multi-empresa con arquitectura escalable, soportando múltiples clientes independientes con total aislamiento de datos mediante Row Level Security (RLS)."},
      {"title": "Rentally", "body": "Plataforma de gestión de pedidos de lencería y amenities para apartamentos turísticos, con módulos de catálogo, órdenes, contratos y pagos integrados."},
      {"title": "Petfhans", "body": "Plataforma veterinaria SaaS multi-tenant con validación defensiva y cifrado de datos sensibles, soportando +5,000 registros de pacientes. Disponible para visualización en [petfhans.com](https://petfhans.com)."}
    ]'::jsonb, 0),
    
  ('b2222222-2222-2222-2222-222222222222', 'knowledge', 'Desarrollador Fullstack | Evolaris', 'purple', 
   '[
      {"title": "Enero 2022 – Febrero 2024 | Remoto", "body": "Desarrollo de aplicaciones web del lado del cliente y del servidor para sectores de Veterinaria, Inmobiliaria y E-commerce, gestionando el ciclo de vida completo del desarrollo (SDLC)."},
      {"title": "Programación Defensiva y Testing", "body": "Implementación de estándares de programación defensiva con Joi para validación de esquemas y Jest para pruebas de seguridad automatizadas, reduciendo vulnerabilidades en un 25%."},
      {"title": "Arquitectura Multi-tenant", "body": "Diseño de arquitecturas multi-tenant con Supabase/PostgreSQL garantizando aislamiento total de datos mediante Row Level Security (RLS)."}
    ]'::jsonb, 1);
