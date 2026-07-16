/**
 * @file useCards.ts
 * @description Hook para obtener la lista de proyectos/cards desde Supabase.
 * Proporciona datos unificados (título, descripción, imagen, URLs, orden) con fallback
 * a configuración local cuando Supabase no está disponible o no devuelve datos.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import type { CardRow } from '../../../types/supabase';
import type { CardProps } from '../../../types/types';
import { cards as fallbackCards } from '../config/cards';

/**
 * Convierte un elemento del fallback (config/cards) al formato CardProps usado en la app.
 * @param c - Card del fallback
 * @returns Card con URLs absolutas y campos extendidos (codeUrl, demoUrl, bgImage, order)
 * @internal
 */
function mapFallback(c: (typeof fallbackCards)[number]): CardProps {
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    img: c.img.startsWith('http') ? c.img : `/${c.img}`,
    problem_solved: '',
    architectural_doc: '',
    category: 'Full Stack',
    tags: [],
    buttonText: c.buttonText,
    codeUrl: c.codeUrl ?? '',
    demoUrl: c.demoUrl ?? '',
    bgImage: c.bgImage ?? '/images/bg-proyecto2.jpg',
    order: c.order ?? 0,
  };
}

/**
 * Obtiene las cards desde Supabase (tabla `cards`) o devuelve el fallback local.
 * Resuelve las rutas de imagen con getStoragePublicUrl para Storage de Supabase.
 * @returns Lista de proyectos ordenados por `order` e `id`
 * @internal
 */
async function fetchCards(): Promise<CardProps[]> {
  if (!isSupabaseConfigured) {
    return fallbackCards.map(mapFallback);
  }
  const { data, error } = await supabase.from('cards').select('*').order('order').order('id');
  if (error) {
    throw error;
  }
  if (!data?.length) {
    return fallbackCards.map(mapFallback);
  }
  return (data as CardRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    img: getStoragePublicUrl(row.image_path) || `/${row.image_path}`,
    buttonText: row.button_text,
    codeUrl: row.code_url,
    demoUrl: row.demo_url,
    bgImage: getStoragePublicUrl(row.bg_image_path) || row.bg_image_path || '/images/bg-proyecto2.jpg',
    order: row.order,
    problem_solved: row.problem_solved,
    architectural_doc: row.architectural_doc,
    category: row.category || 'Full Stack',
    tags: Array.isArray(row.tags) ? row.tags : [],
  }));
}

/**
 * Hook que expone la lista de proyectos (cards) para la grilla y páginas de detalle.
 * Usa TanStack Query con cache de 5 minutos y placeholder con datos del fallback.
 * @returns Objeto con la lista de cards, estado de carga, error y función para refrescar
 * @example
 * const { cards, isLoading, refetch } = useCards();
 * if (isLoading) return <Spinner />;
 * return cards.map(c => <Card key={c.id} {...c} />);
 */
export function useCards() {
  const defaults = fallbackCards.map(mapFallback);
  const q = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
    staleTime: 5 * 60 * 1000,
    placeholderData: defaults,
  });
  return {
    cards: Array.isArray(q.data) && q.data.length > 0 ? q.data : defaults,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
