/**
 * @file useAppDataReady.ts
 * @description Hook que indica si todos los datos solicitados a la base de datos
 * (hero, nav, cards, projects_meta, secciones de información) han llegado.
 * Usado para mostrar una pantalla de carga hasta que la app pueda renderizar sin parpadeos.
 */
import { useContentBlock } from './useContentBlock';
import { useHeroContent } from '../../modules/profile/hooks/useHeroContent';
import { useCards } from '../../modules/projects/hooks/useCards';
import { useProjectsMeta } from '../../modules/projects/hooks/useProjectsMeta';
import { useSkillSections, useKnowledgeSections } from '../../modules/projects/hooks/useInfoSections';
import { isSupabaseConfigured } from '../../shared/services/supabase/supabase';

/**
 * Indica si los datos críticos del sitio público están listos.
 * Cuando Supabase no está configurado, devuelve true para no bloquear la app.
 */
export function useAppDataReady(): boolean {
  const { isLoading: navLoading } = useContentBlock('nav_items');
  const { isLoading: heroLoading } = useHeroContent();
  const { isLoading: cardsLoading } = useCards();
  const { isLoading: metaLoading } = useProjectsMeta();
  const { isLoading: skillsLoading } = useSkillSections();
  const { isLoading: knowledgesLoading } = useKnowledgeSections();

  if (!isSupabaseConfigured) return true;

  return !(
    navLoading ||
    heroLoading ||
    cardsLoading ||
    metaLoading ||
    skillsLoading ||
    knowledgesLoading
  );
}
