/**
 * IDs de proyectos (páginas /page/:id).
 * Los datos (título, descripción, URLs, imagen) vienen de Supabase (cards)
 * y el contenido editable de Supabase (project_content).
 */
export const projectIds: string[] = ['1', '2', '3', '4', '5', '6', '7'];

/** Fallback de metadata cuando Supabase no devuelve projects_meta (para useProjectsMeta). */
export const projectMetaFallback: Record<string, { codeUrl: string; demoUrl: string; bgProyect: string }> = {
  '1': { codeUrl: 'https://github.com/Will855/fakeStore', demoUrl: 'https://fakestore-edf2003.web.app/', bgProyect: '/images/bg-proyecto2.jpg' },
  '2': { codeUrl: 'https://github.com/Will855/Carrito-de-Compras-JavaScript', demoUrl: 'https://will855.github.io/Carrito-de-Compras-JavaScript/', bgProyect: '/images/bg-proyecto2.jpg' },
  '3': { codeUrl: 'https://github.com/Will855/Barberia--Agendado-de-citas-', demoUrl: 'https://will855.github.io/Barberia--Agendado-de-citas-/#servicios', bgProyect: '/images/bg-proyecto2.jpg' },
  '4': { codeUrl: 'https://github.com/Will855/formulario', demoUrl: 'https://will855.github.io/formulario/', bgProyect: '/images/bg-proyecto2.jpg' },
  '5': { codeUrl: 'https://github.com/Will855/paleta-de-colores', demoUrl: 'https://will855.github.io/paleta-de-colores/', bgProyect: '/images/bg-proyecto2.jpg' },
  '6': { codeUrl: 'https://github.com/Will855/CRUD-NodeJS', demoUrl: '/page/6', bgProyect: '/images/bg-proyecto2.jpg' },
  '7': { codeUrl: 'https://github.com/Will855/HeadPhones', demoUrl: 'https://will855.github.io/HeadPhones/', bgProyect: '/images/bg-proyecto1.jpg' },
};
