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
