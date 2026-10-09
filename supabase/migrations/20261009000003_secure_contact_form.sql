-- Migration: Secure contact submissions
-- Removes public insert access and adds length constraints

-- 1. Remove the public policy that allowed anyone to insert
DROP POLICY IF EXISTS "Anyone can insert contact_submissions" ON public.contact_submissions;

-- 2. Add constraints to prevent gigabyte-sized inputs and enforce basic sanity
ALTER TABLE public.contact_submissions
  ADD CONSTRAINT name_length_check CHECK (char_length(name) <= 100),
  ADD CONSTRAINT email_length_check CHECK (char_length(email) <= 150),
  ADD CONSTRAINT phone_length_check CHECK (phone IS NULL OR char_length(phone) <= 30),
  ADD CONSTRAINT message_length_check CHECK (char_length(message) <= 2000),
  -- Simple regex for email format
  ADD CONSTRAINT email_format_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
