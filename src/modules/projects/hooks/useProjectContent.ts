/**
 * @file useProjectContent.ts
 * @description Hook para obtener los bloques de contenido (texto, imagen, video) de un proyecto
 * desde la tabla `project_content` de Supabase. Usado en el editor de contenido del admin
 * y en la página pública de detalle del proyecto.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import type { ProjectContentRow } from '../types/supabase';

/**
 * Representa un bloque de contenido editable de un proyecto.
 * @property id - UUID del bloque
 * @property projectId - ID del proyecto (FK a cards.id)
 * @property type - Tipo: 'text' | 'image' | 'video'
 * @property content - Contenido: HTML para texto, path en Storage para imagen/video
 * @property caption - Pie de imagen o video (opcional)
 * @property order - Orden de visualización
 */
export interface ProjectContentBlock {
  id: string;
  projectId: string;
  type: 'text' | 'image' | 'video';
  content: string;
  caption: string;
  order: number;
}

/**
 * Obtiene los bloques de contenido de un proyecto desde la tabla project_content.
 * @param projectId - ID del proyecto
 * @returns Lista de bloques ordenados por `order`
 * @internal
 */
async function fetchProjectContent(projectId: string): Promise<ProjectContentBlock[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('project_content')
    .select('*')
    .eq('project_id', projectId)
    .order('order');
  
  if (error) return [];
  if (!data?.length) return [];
  return (data as ProjectContentRow[]).map((row) => ({
    id: row.id,
    projectId: row.project_id,
    type: row.type,
    content: row.content,
    caption: row.caption ?? '',
    order: row.order,
  }));
}

/**
 * Hook que expone los bloques de contenido de un proyecto para edición (admin) o visualización (página pública).
 * La query solo se ejecuta cuando projectId está definido y Supabase está configurado.
 * @param projectId - ID del proyecto; si es undefined, la query no se ejecuta
 * @returns blocks, isLoading, error y refetch
 * @example
 * const { blocks, isLoading } = useProjectContent(id);
 * if (isLoading) return <Spinner />;
 * return blocks.map(b => <ContentBlock key={b.id} block={b} />);
 */
export function useProjectContent(projectId: string | undefined) {
  const q = useQuery({
    queryKey: ['project_content', projectId],
    queryFn: () => fetchProjectContent(projectId!),
    enabled: !!projectId && isSupabaseConfigured,
    staleTime: 5 * 60 * 1000,
  });
  return {
    blocks: q.data ?? [],
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
