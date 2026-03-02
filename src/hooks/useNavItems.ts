/**
 * @file useNavItems.ts
 * @description Hook que devuelve los ítems de navegación del sitio.
 * Lee el bloque 'nav_items' desde content_blocks (JSON array de strings).
 * Si no existe o falla el parse, usa un array por defecto.
 */
import { useContentBlock } from './useContentBlock';

/** Ítems de navegación por defecto cuando no hay datos en Supabase o el JSON es inválido. */
const DEFAULT_NAV_ITEMS = ['Inicio', 'Informacion', 'Proyectos', 'Contacto', 'Planes'];

/**
 * Hook que expone la lista de etiquetas de navegación para el menú principal.
 * Obtiene el contenido del bloque 'nav_items' (tipo json) y lo parsea como array de strings.
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
    return Array.isArray(parsed) && parsed.every((x) => typeof x === 'string')
      ? parsed
      : DEFAULT_NAV_ITEMS;
  } catch {
    return DEFAULT_NAV_ITEMS;
  }
}
