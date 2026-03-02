# Instrucciones: Sistema de Contenido de Proyectos

## 1. Ejecutar la migración SQL

Primero, debes ejecutar la migración SQL en Supabase:

1. Ve a tu proyecto en [https://supabase.com](https://supabase.com)
2. Ve a **SQL Editor**
3. Copia y pega el contenido del archivo `supabase/migrations/20250228000004_project_content.sql`
4. Ejecuta el SQL

## 2. Cómo usar el editor de contenido

### Acceder al editor

1. Ve a `/admin/login` e inicia sesión
2. En el menú lateral, haz clic en **"Contenido"**
3. Selecciona un proyecto del dropdown

### Agregar contenido

1. Haz clic en **"Agregar bloque"**
2. Elige el tipo de bloque:
   - **Texto**: Para escribir descripciones, explicaciones (soporta HTML)
   - **Imagen**: Para subir imágenes (.webp, .jpg, .png)
   - **Video**: Para subir GIFs o videos (.gif, .mp4, .webm)

### Editar bloques

- **Texto**: Escribe directamente en el textarea (puedes usar HTML básico)
- **Imagen/Video**: 
  - Haz clic en "Choose File" para subir
  - Agrega un caption opcional (pie de foto/video)
- **Reordenar**: Usa las flechas ↑ ↓ en cada bloque
- **Eliminar**: Haz clic en el ícono de basura

### Guardar cambios

1. Haz clic en **"Guardar todo"** al final
2. Los archivos se suben a Supabase Storage
3. El contenido se guarda en la tabla `project_content`

## 3. Ver el contenido en la página pública

1. Ve a `/proyectos` en la página pública
2. Haz clic en cualquier proyecto
3. El contenido que agregaste en el admin se mostrará automáticamente

## 4. Flujo de datos

```
Admin → Agregar bloques → Guardar → Supabase (project_content + Storage)
                                              ↓
                                    Página pública (/page/:id)
                                              ↓
                                    Renderiza contenido dinámico
```

## 5. Fallback

Si un proyecto NO tiene contenido en la base de datos, se mostrará el componente React hardcodeado de `src/components/demos/` (comportamiento anterior).

## 6. Verificar que funciona

### En el admin:

1. Ve a `/admin/content`
2. Selecciona "E-Commerce" (proyecto 1)
3. Agrega un bloque de texto con: `<h2>Descripción del proyecto</h2><p>Este es un e-commerce...</p>`
4. Agrega un bloque de imagen
5. Haz clic en "Guardar todo"
6. Deberías ver la vista previa al final

### En la página pública:

1. Ve a `/proyectos`
2. Haz clic en "E-Commerce"
3. Deberías ver el contenido que agregaste en el admin

## 7. Troubleshooting

### "No se muestra el contenido"

1. Verifica que ejecutaste la migración SQL en Supabase
2. Abre las DevTools del navegador (F12)
3. Ve a la pestaña **Console**
4. Busca errores relacionados con `project_content`
5. Ve a la pestaña **Network** y busca la petición a `project_content`

### "Error al guardar"

1. Verifica que tu usuario está en la tabla `admin_emails` de Supabase
2. Verifica que el bucket `portfolio-assets` existe en Supabase Storage
3. Verifica que las políticas RLS están correctamente configuradas

### "Las imágenes no se ven"

1. Ve a Supabase → Storage → `portfolio-assets`
2. Verifica que existen las carpetas `project-images/` y `project-videos/`
3. Verifica que las políticas de Storage permiten lectura pública

## 8. Estructura de la base de datos

### Tabla `project_content`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | uuid | ID único del bloque |
| project_id | text | ID del proyecto (referencia a `cards.id`) |
| type | text | Tipo: 'text', 'image', 'video' |
| content | text | Contenido (texto HTML o path en storage) |
| caption | text | Pie de imagen/video (opcional) |
| order | smallint | Orden de visualización |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Fecha de actualización |

### Storage paths

- Imágenes de proyecto: `project-images/{project_id}-{index}-{timestamp}.{ext}`
- Videos de proyecto: `project-videos/{project_id}-{index}-{timestamp}.{ext}`
