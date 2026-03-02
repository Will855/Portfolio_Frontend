-- Ejemplo: Agregar contenido de prueba para el proyecto "E-Commerce" (id: 1)
-- Ejecuta esto en Supabase SQL Editor DESPUÉS de ejecutar la migración 20250228000004_project_content.sql

-- Bloque 1: Título y descripción
INSERT INTO public.project_content (project_id, type, content, caption, "order") VALUES
('1', 'text', '<h2 class="text-3xl font-bold mb-4">E-Commerce con React y Redux</h2><p class="text-lg text-gray-700 leading-relaxed">Este proyecto es una aplicación de comercio electrónico completa construida con React, Redux y la FakeStore API. Implementa gestión de estado global, carrito de compras persistente y una interfaz de usuario moderna y responsiva.</p>', '', 0);

-- Bloque 2: Características principales
INSERT INTO public.project_content (project_id, type, content, caption, "order") VALUES
('1', 'text', '<h3 class="text-2xl font-bold mb-3">Características principales</h3><ul class="list-disc list-inside space-y-2 text-gray-700"><li>Gestión de estado con Redux Toolkit</li><li>Carrito de compras con persistencia en localStorage</li><li>Integración con FakeStore API</li><li>Diseño responsivo con Tailwind CSS</li><li>Filtrado y búsqueda de productos</li></ul>', '', 1);

-- Bloque 3: Stack tecnológico
INSERT INTO public.project_content (project_id, type, content, caption, "order") VALUES
('1', 'text', '<h3 class="text-2xl font-bold mb-3">Stack Tecnológico</h3><div class="flex flex-wrap gap-2"><span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React 18</span><span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Redux Toolkit</span><span class="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">Tailwind CSS</span><span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">FakeStore API</span></div>', '', 2);

-- Nota: Para agregar imágenes o videos, debes subirlos desde el admin (/admin/content)
-- porque necesitan subirse a Supabase Storage primero.

-- Verifica que se insertaron correctamente:
SELECT * FROM public.project_content WHERE project_id = '1' ORDER BY "order";
