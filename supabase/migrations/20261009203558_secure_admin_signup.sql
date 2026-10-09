CREATE OR REPLACE FUNCTION public.check_admin_email_before_signup()
RETURNS trigger AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.admin_emails WHERE email = NEW.email) THEN
    RAISE EXCEPTION 'El correo % no está autorizado para registrarse.', NEW.email;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS ensure_admin_only_signup ON auth.users;
CREATE TRIGGER ensure_admin_only_signup
  BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.check_admin_email_before_signup();
