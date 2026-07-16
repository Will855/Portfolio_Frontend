import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import type { InfoSectionRow } from '../../../types/supabase';
import { FALLBACK_SKILLS, FALLBACK_KNOWLEDGES } from '../config/fallbacks';
import type { SkillGroup, CareerGroup } from '../../../types/types';

async function fetchInfoSections(sectionType: 'skill' | 'knowledge'): Promise<InfoSectionRow[] | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('info_sections')
    .select('*')
    .eq('section_type', sectionType)
    .order('order', { ascending: true });
  if (error) throw error;
  if (!data) return null;
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

  const skills: SkillGroup[] = q.data && q.data.length > 0
    ? q.data.map(r => ({
        id: r.id,
        title: r.title,
        color: r.color,
        items: r.items as string[]
      }))
    : FALLBACK_SKILLS;

  return {
    skills,
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

  const knowledges: CareerGroup[] = q.data && q.data.length > 0
    ? q.data.map(r => ({
        id: r.id,
        title: r.title,
        color: r.color,
        items: r.items as any[]
      }))
    : FALLBACK_KNOWLEDGES;

  return {
    knowledges,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
