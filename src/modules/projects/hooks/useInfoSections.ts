import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import type { InfoSectionRow } from '../../../types/supabase';

async function fetchInfoSections(sectionType: 'skill' | 'knowledge'): Promise<InfoSectionRow[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('info_sections')
    .select('*')
    .eq('section_type', sectionType)
    .order('order', { ascending: true });
  if (error || !data) return [];
  return data.map((row: Record<string, unknown>) => ({
    ...row,
    items: Array.isArray(row.items) ? row.items : JSON.parse(String(row.items || '[]')),
  })) as InfoSectionRow[];
}

export function useSkillSections() {
  const q = useQuery({
    queryKey: ['info_sections', 'skill'],
    queryFn: () => fetchInfoSections('skill'),
    staleTime: 5 * 60 * 1000,
  });
  return {
    skills: q.data ?? [],
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}

export function useKnowledgeSections() {
  const q = useQuery({
    queryKey: ['info_sections', 'knowledge'],
    queryFn: () => fetchInfoSections('knowledge'),
    staleTime: 5 * 60 * 1000,
  });
  return {
    knowledges: q.data ?? [],
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
