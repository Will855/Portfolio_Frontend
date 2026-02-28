import { useContentBlock } from './useContentBlock';

const DEFAULT_NAV_ITEMS = ['Inicio', 'Informacion', 'Proyectos', 'Contacto', 'Planes'];

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
