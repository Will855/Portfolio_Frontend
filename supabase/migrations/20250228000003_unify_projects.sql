-- Unify cards + projects_meta into a single "cards" table
-- Adds project metadata columns to cards so everything lives in one place.

ALTER TABLE public.cards
  ADD COLUMN IF NOT EXISTS code_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS demo_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS bg_image_path text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "order" smallint NOT NULL DEFAULT 0;

-- Migrate existing projects_meta data into cards
UPDATE public.cards c
SET
  code_url    = pm.code_url,
  demo_url    = pm.demo_url,
  bg_image_path = pm.bg_image_path,
  "order"     = pm."order"
FROM public.projects_meta pm
WHERE c.id = pm.id;
