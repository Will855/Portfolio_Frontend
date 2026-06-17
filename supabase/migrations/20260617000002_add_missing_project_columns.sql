-- Migration to add missing columns to cards table if they are not already there
ALTER TABLE public.cards
  ADD COLUMN IF NOT EXISTS problem_solved text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS architectural_doc text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'Full Stack',
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}';
