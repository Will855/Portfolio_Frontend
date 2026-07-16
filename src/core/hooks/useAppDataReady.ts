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
export interface AppDataReadyStatus {
  isReady: boolean;
  hasError: boolean;
}

export function useAppDataReady(): AppDataReadyStatus {
  const { isLoading: navLoading, error: navError } = useContentBlock('nav_items');
  const { isLoading: heroLoading, error: heroError } = useHeroContent();
  const { isLoading: cardsLoading, error: cardsError } = useCards();
  const { isLoading: metaLoading, error: metaError } = useProjectsMeta();
  const { isLoading: skillsLoading, error: skillsError } = useSkillSections();
  const { isLoading: knowledgesLoading, error: knowledgesError } = useKnowledgeSections();

  if (!isSupabaseConfigured) {
    return { isReady: true, hasError: false };
  }

  const hasError = Boolean(
    navError ||
    heroError ||
    cardsError ||
    metaError ||
    skillsError ||
    knowledgesError
  );

  const isReady = !(
    navLoading ||
    heroLoading ||
    cardsLoading ||
    metaLoading ||
    skillsLoading ||
    knowledgesLoading
  );

  return { isReady, hasError };
}
