/**
 * @file useHeroContent.ts
 * @description Hook para obtener el contenido del Hero (título, subtítulo, imagen de perfil)
 * desde la tabla hero_content de Supabase. Hay una única fila con id 'default'.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import type { HeroContent } from '../../../types/supabase';

/** Hero por defecto cuando Supabase no está configurado o no hay datos. */
const DEFAULT_HERO: HeroContent & { profile_image_url: string } = {
  id: 'default',
  title: 'Wilmer Lynch',
  subtitle: 'Web Developer',
  profile_image_path: 'avatars/profile.jpeg',
  updated_at: '',
  profile_image_url: '/profile.jpeg',
};

/**
 * Obtiene el contenido del hero (fila id='default') y resuelve la URL de la imagen de perfil.
 * @returns Hero con profile_image_url absoluta
 * @internal
 */
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

/**
 * Hook que expone el contenido del Hero para la página de inicio.
 * @returns hero (título, subtítulo, profile_image_url), isLoading, error y refetch
 * @example
 * const { hero, isLoading } = useHeroContent();
 * return (
 *   <section>
 *     <img src={hero.profile_image_url} alt="" />
 *     <h1>{hero.title}</h1>
 *     <p>{hero.subtitle}</p>
 *   </section>
 * );
 */
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
