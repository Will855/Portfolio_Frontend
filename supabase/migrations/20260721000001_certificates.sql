-- Create certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    provider TEXT NOT NULL,
    description TEXT,
    status_badge TEXT,
    type_badge TEXT,
    tags TEXT[],
    image_path TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only)
CREATE POLICY "Allow public read access on certificates"
ON public.certificates
FOR SELECT
USING (true);

-- Create policies for authenticated access (all operations)
CREATE POLICY "Allow authenticated full access on certificates"
ON public.certificates
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Insert the default Google Cloud certificate (seeding the existing one)
INSERT INTO public.certificates (id, title, issuer, provider, description, status_badge, type_badge, tags, image_path, "order")
VALUES (
    gen_random_uuid(),
    'Google Cloud Associate Cloud Engineer',
    'Google Cloud',
    'Coursera',
    'Programa de preparación oficial centrado en la implementación, diseño, planificación y configuración de soluciones de infraestructura y servicios de almacenamiento, computación y red en Google Cloud Platform (GCP).',
    'En Preparación',
    'Certificación',
    ARRAY['GCP', 'Cloud Infrastructure', 'Kubernetes', 'IAM', 'VPC Networks', 'Compute Engine'],
    'assets/Certificado_GCP_1.png',
    1
);
