/**
 * @file useContentBlock.ts
 * @description Hooks para leer bloques de contenido genérico (content_blocks) desde Supabase.
 * Los bloques se identifican por una clave (key) y pueden ser tipo 'html' o 'json'.
 * Usado para ítems de navegación, secciones about, footer, etc.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../shared/services/supabase/supabase';
import type { ContentBlockRow } from '../../types/supabase';

/**
 * Obtiene un único bloque de contenido por su clave desde la tabla content_blocks.
 * @param key - Clave única del bloque (ej: 'nav_items', 'footer_contact')
 * @returns Fila del bloque o null si no existe o hay error
 * @internal
 */
async function fetchContentBlock(key: string): Promise<ContentBlockRow | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('content_blocks')
    .select('*')
    .eq('key', key)
    .single();
  if (error || !data) return null;
  return data as ContentBlockRow;
}

/**
 * Hook que expone un bloque de contenido por clave.
 * Útil para contenido editable desde el admin (nav, about, footer).
 * @param key - Clave del bloque; si es null, la query no se ejecuta
 * @returns block, isLoading, error y refetch
 * @example
 * const { block, isLoading } = useContentBlock('nav_items');
 * const items = block?.type === 'json' ? JSON.parse(block.content) : [];
 */
export function useContentBlock(key: string | null) {
  const q = useQuery({
    queryKey: ['content_block', key],
    queryFn: () => fetchContentBlock(key!),
    enabled: Boolean(key),
    staleTime: 5 * 60 * 1000,
  });
  return {
    block: q.data ?? null,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}

/**
 * Hook que obtiene varios bloques de contenido en paralelo por sus claves.
 * @param keys - Lista de claves de bloques
 * @returns blocks (mapa clave -> bloque), isLoading y queries
 * @example
 * const { blocks, isLoading } = useContentBlocks(['nav_items', 'footer_contact']);
 */
export function useContentBlocks(keys: string[]) {
  const queries = keys.map((key) => useContentBlock(key));
  const blocks = Object.fromEntries(
    keys.map((key, i) => [key, queries[i].block])
  );
  const isLoading = queries.some((q) => q.isLoading);
  return { blocks, isLoading, queries };
}
