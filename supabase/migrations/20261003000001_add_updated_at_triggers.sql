-- Función genérica para actualizar la columna updated_at
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar el trigger a hero_content
DROP TRIGGER IF EXISTS set_hero_content_updated_at ON public.hero_content;
CREATE TRIGGER set_hero_content_updated_at
BEFORE UPDATE ON public.hero_content
FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- Aplicar el trigger a cards
DROP TRIGGER IF EXISTS set_cards_updated_at ON public.cards;
CREATE TRIGGER set_cards_updated_at
BEFORE UPDATE ON public.cards
FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- Aplicar el trigger a projects_meta
DROP TRIGGER IF EXISTS set_projects_meta_updated_at ON public.projects_meta;
CREATE TRIGGER set_projects_meta_updated_at
BEFORE UPDATE ON public.projects_meta
FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- Aplicar el trigger a content_blocks
DROP TRIGGER IF EXISTS set_content_blocks_updated_at ON public.content_blocks;
CREATE TRIGGER set_content_blocks_updated_at
BEFORE UPDATE ON public.content_blocks
FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- Aplicar el trigger a project_content
DROP TRIGGER IF EXISTS set_project_content_updated_at ON public.project_content;
CREATE TRIGGER set_project_content_updated_at
BEFORE UPDATE ON public.project_content
FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- Aplicar el trigger a info_sections
DROP TRIGGER IF EXISTS set_info_sections_updated_at ON public.info_sections;
CREATE TRIGGER set_info_sections_updated_at
BEFORE UPDATE ON public.info_sections
FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- Aplicar el trigger a certificates
DROP TRIGGER IF EXISTS set_certificates_updated_at ON public.certificates;
CREATE TRIGGER set_certificates_updated_at
BEFORE UPDATE ON public.certificates
FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
