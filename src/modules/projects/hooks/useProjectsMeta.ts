/**
 * @file useProjectsMeta.ts
 * @description Hook para obtener metadata de proyectos (imagen de fondo, URLs de código y demo, orden)
 * desde la tabla projects_meta de Supabase. Proporciona getMeta y fallbackMeta.
 * Nota: Los datos principales están en cards (useCards); este hook puede usarse como respaldo.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import type { ProjectMetaRow } from '../../../types/supabase';
import { projectMetaFallback } from '../config/project';

export interface ProjectMeta extends Omit<ProjectMetaRow, 'bg_image_path' | 'code_url' | 'demo_url' | 'updated_at'> {
  bgProyect: string;
  codeUrl: string;
  demoUrl: string;
}

/**
 * Obtiene toda la metadata de proyectos desde la tabla projects_meta.
 * @returns Lista ordenada por `order` o null si no hay datos/error
 * @internal
 */
async function fetchProjectsMeta(): Promise<ProjectMeta[] | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('projects_meta')
    .select('*')
    .order('order');
  if (error || !data?.length) return null;
  return (data as ProjectMetaRow[]).map((row) => ({
    id: row.id,
    bgProyect: getStoragePublicUrl(row.bg_image_path) || `/images/bg-proyecto2.jpg`,
    codeUrl: row.code_url,
    demoUrl: row.demo_url,
    order: row.order,
  }));
}

/**
 * Hook que expone la metadata de todos los proyectos con helpers getMeta y fallbackMeta.
 * @returns projectsMeta, getMeta(id), fallbackMeta(id), isLoading, error y refetch
 * @example
 * const { getMeta, fallbackMeta } = useProjectsMeta();
 * const meta = getMeta(projectId) ?? fallbackMeta(projectId);
 * return <header style={{ backgroundImage: `url(${meta.bgProyect})` }} />;
 */
export function useProjectsMeta() {
  const q = useQuery({
    queryKey: ['projects_meta'],
    queryFn: fetchProjectsMeta,
    staleTime: 5 * 60 * 1000,
  });
  const metaMap = (q.data ?? []).reduce<Record<string, ProjectMeta>>((acc, m) => {
    acc[m.id] = m;
    return acc;
  }, {});
  return {
    projectsMeta: q.data ?? [],
    getMeta: (id: string): ProjectMeta | undefined => metaMap[id],
    fallbackMeta: (id: string): ProjectMeta => {
      const p = projectMetaFallback[id];
      return p
        ? { id, bgProyect: p.bgProyect, codeUrl: p.codeUrl, demoUrl: p.demoUrl, order: 0 }
        : { id, bgProyect: '/images/bg-proyecto2.jpg', codeUrl: '', demoUrl: '', order: 0 };
    },
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
