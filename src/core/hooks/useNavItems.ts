/**
 * @file useNavItems.ts
 * @description Hook que devuelve los ítems de navegación del sitio.
 * Lee el bloque 'nav_items' desde content_blocks (JSON array de strings).
 * Si no existe o falla el parse, usa un array por defecto.
 */
import { useContentBlock } from './useContentBlock';

/** Ítems de navegación por defecto cuando no hay datos en Supabase o el JSON es inválido. */
const DEFAULT_NAV_ITEMS = ['Inicio', 'Proyectos'];

/** Ítems que no deben mostrarse en el navbar (páginas eliminadas o unificadas en Home). */
const EXCLUDED_NAV_ITEMS = ['Informacion', 'Contacto', 'Planes'];

function filterNavItems(items: string[]): string[] {
  return items.filter((label) => !EXCLUDED_NAV_ITEMS.includes(label));
}

/**
 * Hook que expone la lista de etiquetas de navegación para el menú principal.
 * Obtiene el contenido del bloque 'nav_items' (tipo json) y lo parsea como array de strings.
 * Excluye Información, Contacto y Planes para que no aparezcan en el navbar.
 * @returns Array de etiquetas para los enlaces del nav
 * @example
 * const navItems = useNavItems();
 * return <nav>{navItems.map(label => <Link key={label}>{label}</Link>)}</nav>;
 */
export function useNavItems(): string[] {
  const { block } = useContentBlock('nav_items');
  if (!block || block.type !== 'json') return DEFAULT_NAV_ITEMS;
  try {
    const parsed = JSON.parse(block.content) as unknown;
    const items = Array.isArray(parsed) && parsed.every((x) => typeof x === 'string')
      ? (parsed as string[])
      : DEFAULT_NAV_ITEMS;
    const filtered = filterNavItems(items);
    return filtered.length > 0 ? filtered : DEFAULT_NAV_ITEMS;
  } catch {
    return DEFAULT_NAV_ITEMS;
  }
}
