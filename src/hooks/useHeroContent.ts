import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { getStoragePublicUrl } from '../utils/supabaseStorage';
import type { HeroContent } from '../types/supabase';

const DEFAULT_HERO: HeroContent & { profile_image_url: string } = {
  id: 'default',
  title: 'Wilmer Lynch',
  subtitle: 'Web Developer',
  profile_image_path: 'avatars/profile.jpeg',
  updated_at: '',
  profile_image_url: '/profile.jpeg',
};

async function fetchHero(): Promise<HeroContent & { profile_image_url: string }> {
  if (!isSupabaseConfigured) return DEFAULT_HERO;
  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .eq('id', 'default')
    .single();
  if (error || !data) return DEFAULT_HERO;
  const row = data as HeroContent;
  return {
    ...row,
    profile_image_url: getStoragePublicUrl(row.profile_image_path) || '/profile.jpeg',
  };
}

export function useHeroContent() {
  const q = useQuery({
    queryKey: ['hero_content'],
    queryFn: fetchHero,
    staleTime: 5 * 60 * 1000,
    placeholderData: DEFAULT_HERO,
  });
  return {
    hero: q.data ?? DEFAULT_HERO,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
