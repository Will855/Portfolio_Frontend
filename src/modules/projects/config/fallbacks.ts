import type { SkillGroup, CareerGroup } from '../../../types/types';

export const FALLBACK_SKILLS: SkillGroup[] = [
  {
    id: 'fallback-skill-1',
    title: 'Frontend & 3D',
    color: 'blue',
    items: ['React 18', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'WebGL', 'GSAP']
  },
  {
    id: 'fallback-skill-2',
    title: 'Backend & Cloud',
    color: 'green',
    items: ['Node.js', 'Express', 'Supabase (RLS)', 'PostgreSQL', 'MongoDB', 'FastAPI', 'SQLAlchemy', 'REST APIs']
  },
  {
    id: 'fallback-skill-3',
    title: 'Automatización e IA',
    color: 'purple',
    items: ['n8n', 'Agentes de IA', 'Integración de APIs (Telegram, WhatsApp, Google Calendar)']
  },
  {
    id: 'fallback-skill-4',
    title: 'Herramientas y DevOps',
    color: 'blue',
    items: ['Git', 'GitHub Actions', 'Vite', 'Jest (Pruebas Unitarias y de Seguridad)', 'Vercel']
  }
];

export const FALLBACK_KNOWLEDGES: CareerGroup[] = [
  {
    id: 'fallback-career-1',
    title: 'Desarrollador Fullstack Freelance | Mercado Internacional (España)',
    color: 'blue',
    items: [
      {
        title: 'Marzo 2024 – Presente | Remoto',
        body: 'Desarrollo de soluciones de software escalables en modalidad freelance para clientes internacionales.'
      },
      {
        title: 'SSEMMA',
        body: 'Sistema integral de gestión de propiedades multi-empresa con arquitectura escalable, soportando múltiples clientes independientes con total aislamiento de datos mediante Row Level Security (RLS).'
      },
      {
        title: 'Rentally',
        body: 'Plataforma de gestión de pedidos de lencería y amenities para apartamentos turísticos, con módulos de catálogo, órdenes, contratos y pagos integrados.'
      },
      {
        title: 'Petfhans',
        body: 'Plataforma veterinaria SaaS multi-tenant con validación defensiva y cifrado de datos sensibles, soportando +5,000 registros de pacientes. Disponible para visualización en [petfhans.com](https://petfhans.com).'
      }
    ]
  },
  {
    id: 'fallback-career-2',
    title: 'Desarrollador Fullstack | Evolaris',
    color: 'purple',
    items: [
      {
        title: 'Enero 2022 – Febrero 2024 | Remoto',
        body: 'Desarrollo de aplicaciones web del lado del cliente y del servidor para sectores de Veterinaria, Inmobiliaria y E-commerce, gestionando el ciclo de vida completo del desarrollo (SDLC).'
      },
      {
        title: 'Programación Defensiva y Testing',
        body: 'Implementación de estándares de programación defensiva con Joi para validación de esquemas y Jest para pruebas de seguridad automatizadas, reduciendo vulnerabilidades en un 25%.'
      },
      {
        title: 'Arquitectura Multi-tenant',
        body: 'Diseño de arquitecturas multi-tenant con Supabase/PostgreSQL garantizando aislamiento total de datos mediante Row Level Security (RLS).'
      }
    ]
  }
];
