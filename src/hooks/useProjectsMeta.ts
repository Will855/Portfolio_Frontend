import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { getStoragePublicUrl } from '../utils/supabaseStorage';
import type { ProjectMetaRow } from '../types/supabase';
import { projects } from '../config/project';

export interface ProjectMeta {
  id: string;
  bgProyect: string;
  codeUrl: string;
  demoUrl: string;
  order: number;
}

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
      const p = projects.find((x) => x.id === id);
      return p
        ? { id: p.id, bgProyect: p.bgProyect, codeUrl: p.codeUrl, demoUrl: p.demoUrl, order: 0 }
        : { id, bgProyect: '/images/bg-proyecto2.jpg', codeUrl: '', demoUrl: '', order: 0 };
    },
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
