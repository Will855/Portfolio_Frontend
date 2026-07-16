This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/modules/projects/**/*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  modules/
    projects/
      admin/
        AdminContentEditor.tsx
        AdminInfoSections.tsx
        AdminProjectsCRUD.tsx
        MarkdownEditor.tsx
        ProjectFormModal.tsx
      components/
        ExpAndTecnologies.tsx
        InformationContent.tsx
        ProjectCard.tsx
        ProjectGrid.tsx
        SkillSection.tsx
      config/
        cards.ts
        fallbacks.ts
        project.ts
      hooks/
        useAdminProjectContent.ts
        useAdminProjects.ts
        useCards.ts
        useInfoSections.ts
        useProjectContent.ts
        useProjectsMeta.ts
      pages/
        DemosRedirectPage.tsx
        ProjectDetailsPage.tsx
        ProjectsPage.tsx
      utils/
        markdown.ts
```

# Files

## File: src/modules/projects/admin/MarkdownEditor.tsx
````typescript
import React, { useRef, useCallback, useState } from 'react';
import DOMPurify from 'dompurify';
import { ALLOWED_HTML_TAGS, parseMarkdownToHtml } from '../utils/markdown';

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, placeholder }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const preview = previewRef.current;
    if (!textarea || !preview) return;

    const scrollPercentage = textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight);
    preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
  }, []);

  const insertMarkdown = useCallback((prefix: string, suffix: string, defaultText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || defaultText;

    const before = value.substring(0, start);
    const after = value.substring(end);

    const newValue = before + prefix + textToInsert + suffix + after;

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      const newStart = start + prefix.length;
      const newEnd = newStart + textToInsert.length;
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  }, [value, onChange]);

  const handleImportMarkdown = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.md')) {
      setError('Solo se admiten archivos Markdown (.md)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        onChange(text);
        setError(null);
      }
    };
    reader.onerror = () => {
      setError('Error al leer el archivo markdown.');
    };
    reader.readAsText(file);

    e.target.value = '';
  }, [onChange]);

  return (
    <div className="space-y-3">
      {error && (
        <div className="p-2 rounded bg-red-500/10 text-red-400 text-xs">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Editor Column */}
        <div className="flex flex-col space-y-2">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md min-h-[38px]">
            <button
              type="button"
              onClick={() => insertMarkdown('**', '**', 'Texto')}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
              title="Negrita"
            >
              Negrita
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('## ', '', 'Título')}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
              title="Título"
            >
              Título
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('```javascript\n', '\n```', '')}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
              title="Código"
            >
              Código
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('[', '](https://link.com)', 'Texto')}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
              title="Enlace"
            >
              Enlace
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('![', '](https://url-imagen.com)', 'Descripción')}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
              title="Imagen"
            >
              Imagen
            </button>
            
            <div className="h-4 w-px bg-white/10 mx-0.5" />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/40 text-[11px] font-semibold text-blue-400 transition-all flex items-center gap-1 active:scale-95"
              title="Importar archivo .md"
            >
              📥 Cargar .md
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportMarkdown}
              accept=".md"
              className="hidden"
            />
          </div>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            className="w-full h-[220px] md:h-[280px] px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                       text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                       focus:ring-1 focus:ring-blue-500/20 transition-all resize-none font-mono text-sm overflow-y-auto"
            placeholder={placeholder || "Escribe markdown..."}
          />
        </div>

        {/* Live Preview Column */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center px-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md h-[38px]">
            <span className="text-xs font-semibold text-slate-400">Previsualización en Vivo</span>
          </div>

          <div
            ref={previewRef}
            className="prose max-w-none text-slate-700 leading-relaxed font-sans bg-white p-4 rounded-xl border border-slate-200 overflow-y-auto h-[220px] md:h-[280px]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                parseMarkdownToHtml(value || '_Escribe en el editor o carga un archivo .md para previsualizar_'),
                { ALLOWED_TAGS: ALLOWED_HTML_TAGS }
              )
            }}
          />
        </div>
      </div>
    </div>
  );
};
````

## File: src/modules/projects/config/cards.ts
````typescript
export interface CardData {
    id: string;
    title: string;
    description: string;
    img: string;
    buttonText: string;
    codeUrl?: string;
    demoUrl?: string;
    bgImage?: string;
    order?: number;
}

export const cards: CardData[] = [
    {
        id: "1",
        title: "E-Commerce",
        description: "Aplicacion de React con Redux y FakeStore API para crea un E-commerce",
        img: "assets/web7.webp",
        buttonText: "Ver mas...",
        codeUrl: "https://github.com/Will855/fakeStore",
        demoUrl: "https://fakestore-edf2003.web.app/",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 1,
    },
    {
        id: "2",
        title: "FutureCart",
        description: "E-commerce de teclados gaming",
        img: "assets/web2.webp",
        buttonText: "Ver más...",
        codeUrl: "https://github.com/Will855/Carrito-de-Compras-JavaScript",
        demoUrl: "https://will855.github.io/Carrito-de-Compras-JavaScript/",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 2,
    },
    {
        id: "3",
        title: "Barberia",
        description: "Interfaz de reserva - Selección de servicios y barberos.",
        img: "assets/web3.webp",
        buttonText: "Ver más...",
        codeUrl: "https://github.com/Will855/Barberia--Agendado-de-citas-",
        demoUrl: "https://will855.github.io/Barberia--Agendado-de-citas-/#servicios",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 3,
    },
    {
        id: "4",
        title: "Formulario",
        description: "Sistema de autenticación con login y registro",
        img: "assets/web4.webp",
        buttonText: "Ver más...",
        codeUrl: "https://github.com/Will855/formulario",
        demoUrl: "https://will855.github.io/formulario/",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 4,
    },
    {
        id: "5",
        title: "Paleta de colores",
        description: "Aplicacion de react que genera 21 tonalidades de cualquier color",
        img: "assets/web5.webp",
        buttonText: "Ver mas...",
        codeUrl: "https://github.com/Will855/paleta-de-colores",
        demoUrl: "https://will855.github.io/paleta-de-colores/",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 5,
    },
    {
        id: "6",
        title: "CRUD/Rest API",
        description: "CRUD de NodeJS con rest API para login con seguridad hash y manejo de errores",
        img: "assets/web6.webp",
        buttonText: "Ver mas...",
        codeUrl: "https://github.com/Will855/CRUD-NodeJS",
        demoUrl: "/page/6",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 6,
    },
    {
        id: "7",
        title: "HP Headphones",
        description: "Landing Page de Auriculares",
        img: "assets/web1.webp",
        buttonText: "Ver más...",
        codeUrl: "https://github.com/Will855/HeadPhones",
        demoUrl: "https://will855.github.io/HeadPhones/",
        bgImage: "/images/bg-proyecto1.jpg",
        order: 7,
    },
];
````

## File: src/modules/projects/config/fallbacks.ts
````typescript
import type { SkillGroup, CareerGroup } from '../../../types/types';

export const FALLBACK_SKILLS: SkillGroup[] = [
  {
    id: 'fallback-skill-1',
    title: 'Frontend & 3D',
    color: 'blue',
    items: ['React 18', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'WebGL', 'GSAP']
  },
  {
    id: 'fallback-skill-2',
    title: 'Backend & Cloud',
    color: 'green',
    items: ['Node.js', 'Express', 'Supabase (RLS)', 'PostgreSQL', 'MongoDB', 'FastAPI', 'SQLAlchemy', 'REST APIs']
  },
  {
    id: 'fallback-skill-3',
    title: 'Automatización e IA',
    color: 'purple',
    items: ['n8n', 'Agentes de IA', 'Integración de APIs (Telegram, WhatsApp, Google Calendar)']
  },
  {
    id: 'fallback-skill-4',
    title: 'Herramientas y DevOps',
    color: 'blue',
    items: ['Git', 'GitHub Actions', 'Vite', 'Jest (Pruebas Unitarias y de Seguridad)', 'Vercel']
  }
];

export const FALLBACK_KNOWLEDGES: CareerGroup[] = [
  {
    id: 'fallback-career-1',
    title: 'Desarrollador Fullstack Freelance | Mercado Internacional (España)',
    color: 'blue',
    items: [
      {
        title: 'Marzo 2024 – Presente | Remoto',
        body: 'Desarrollo de soluciones de software escalables en modalidad freelance para clientes internacionales.'
      },
      {
        title: 'SSEMMA',
        body: 'Sistema integral de gestión de propiedades multi-empresa con arquitectura escalable, soportando múltiples clientes independientes con total aislamiento de datos mediante Row Level Security (RLS).'
      },
      {
        title: 'Rentally',
        body: 'Plataforma de gestión de pedidos de lencería y amenities para apartamentos turísticos, con módulos de catálogo, órdenes, contratos y pagos integrados.'
      },
      {
        title: 'Petfhans',
        body: 'Plataforma veterinaria SaaS multi-tenant con validación defensiva y cifrado de datos sensibles, soportando +5,000 registros de pacientes. Disponible para visualización en [petfhans.com](https://petfhans.com).'
      }
    ]
  },
  {
    id: 'fallback-career-2',
    title: 'Desarrollador Fullstack | Evolaris',
    color: 'purple',
    items: [
      {
        title: 'Enero 2022 – Febrero 2024 | Remoto',
        body: 'Desarrollo de aplicaciones web del lado del cliente y del servidor para sectores de Veterinaria, Inmobiliaria y E-commerce, gestionando el ciclo de vida completo del desarrollo (SDLC).'
      },
      {
        title: 'Programación Defensiva y Testing',
        body: 'Implementación de estándares de programación defensiva con Joi para validación de esquemas y Jest para pruebas de seguridad automatizadas, reduciendo vulnerabilidades en un 25%.'
      },
      {
        title: 'Arquitectura Multi-tenant',
        body: 'Diseño de arquitecturas multi-tenant con Supabase/PostgreSQL garantizando aislamiento total de datos mediante Row Level Security (RLS).'
      }
    ]
  }
];
````

## File: src/modules/projects/config/project.ts
````typescript
/**
 * IDs de proyectos (páginas /page/:id).
 * Los datos (título, descripción, URLs, imagen) vienen de Supabase (cards)
 * y el contenido editable de Supabase (project_content).
 */
export const projectIds: string[] = ['1', '2', '3', '4', '5', '6', '7'];

/** Fallback de metadata cuando Supabase no devuelve projects_meta (para useProjectsMeta). */
export const projectMetaFallback: Record<string, { codeUrl: string; demoUrl: string; bgProyect: string }> = {
  '1': { codeUrl: 'https://github.com/Will855/fakeStore', demoUrl: 'https://fakestore-edf2003.web.app/', bgProyect: '/images/bg-proyecto2.jpg' },
  '2': { codeUrl: 'https://github.com/Will855/Carrito-de-Compras-JavaScript', demoUrl: 'https://will855.github.io/Carrito-de-Compras-JavaScript/', bgProyect: '/images/bg-proyecto2.jpg' },
  '3': { codeUrl: 'https://github.com/Will855/Barberia--Agendado-de-citas-', demoUrl: 'https://will855.github.io/Barberia--Agendado-de-citas-/#servicios', bgProyect: '/images/bg-proyecto2.jpg' },
  '4': { codeUrl: 'https://github.com/Will855/formulario', demoUrl: 'https://will855.github.io/formulario/', bgProyect: '/images/bg-proyecto2.jpg' },
  '5': { codeUrl: 'https://github.com/Will855/paleta-de-colores', demoUrl: 'https://will855.github.io/paleta-de-colores/', bgProyect: '/images/bg-proyecto2.jpg' },
  '6': { codeUrl: 'https://github.com/Will855/CRUD-NodeJS', demoUrl: '/page/6', bgProyect: '/images/bg-proyecto2.jpg' },
  '7': { codeUrl: 'https://github.com/Will855/HeadPhones', demoUrl: 'https://will855.github.io/HeadPhones/', bgProyect: '/images/bg-proyecto1.jpg' },
};
````

## File: src/modules/projects/hooks/useAdminProjectContent.ts
````typescript
import { useState, useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../shared/services/supabase/supabase';
import { STORAGE_BUCKET } from '../../../types/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import { useProjectContent } from './useProjectContent';

export type BlockType = 'text' | 'image' | 'video';

export interface LocalBlock {
  id: string | null;
  type: BlockType;
  content: string;
  caption: string;
  order: number;
  file?: File | null;
  previewUrl?: string;
}

export function useAdminProjectContent(projectId: string) {
  const { blocks, isLoading } = useProjectContent(projectId);
  const queryClient = useQueryClient();
  const [localBlocks, setLocalBlocks] = useState<LocalBlock[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocalBlocks(
      blocks.map((b) => ({
        id: b.id,
        type: b.type,
        content: b.content,
        caption: b.caption,
        order: b.order,
        file: null,
        previewUrl: b.type !== 'text' ? (getStoragePublicUrl(b.content) || b.content) : undefined,
      }))
    );
  }, [blocks]);

  const addBlock = useCallback((type: BlockType) => {
    setLocalBlocks((prev) => [
      ...prev,
      {
        id: null,
        type,
        content: '',
        caption: '',
        order: prev.length,
        file: null,
      },
    ]);
  }, []);

  const removeBlock = useCallback((idx: number) => {
    setLocalBlocks((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const moveBlock = useCallback((idx: number, direction: 'up' | 'down') => {
    setLocalBlocks((prev) => {
      const arr = [...prev];
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= arr.length) return prev;
      [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
      return arr.map((b, i) => ({ ...b, order: i }));
    });
  }, []);

  const updateBlock = useCallback((idx: number, updates: Partial<LocalBlock>) => {
    setLocalBlocks((prev) =>
      prev.map((b, i) => (i === idx ? { ...b, ...updates } : b))
    );
  }, []);

  const handleFileChange = useCallback((idx: number, file: File | null) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    updateBlock(idx, { file, previewUrl });
  }, [updateBlock]);

  const saveAll = async () => {
    setSaving(true);
    setError(null);
    try {
      const existingIds = blocks.map((b) => b.id);
      const localIds = localBlocks.filter((b) => b.id).map((b) => b.id!);
      const toDelete = existingIds.filter((id) => !localIds.includes(id));

      if (toDelete.length > 0) {
        const { error: delErr } = await supabase
          .from('project_content')
          .delete()
          .in('id', toDelete);
        if (delErr) throw delErr;
      }

      for (let i = 0; i < localBlocks.length; i++) {
        const block = localBlocks[i];
        let contentValue = block.content;

        if (block.file && (block.type === 'image' || block.type === 'video')) {
          const ext = block.file.name.split('.').pop() || 'webp';
          const folder = block.type === 'image' ? 'project-images' : 'project-videos';
          const path = `${folder}/${projectId}-${i}-${Date.now()}.${ext}`;
          const { error: upErr } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(path, block.file, { upsert: true });
          if (upErr) throw upErr;
          contentValue = path;
        }

        if (block.type === 'text' && !contentValue.trim()) continue;
        if ((block.type === 'image' || block.type === 'video') && !contentValue && !block.file) continue;

        if (block.id) {
          const { error: updErr } = await supabase
            .from('project_content')
            .update({
              type: block.type,
              content: contentValue,
              caption: block.caption,
              order: i,
              updated_at: new Date().toISOString(),
            })
            .eq('id', block.id);
          if (updErr) throw updErr;
        } else {
          const { error: insErr } = await supabase
            .from('project_content')
            .insert({
              project_id: projectId,
              type: block.type,
              content: contentValue,
              caption: block.caption,
              order: i,
            });
          if (insErr) throw insErr;
        }
      }

      queryClient.invalidateQueries({ queryKey: ['project_content', projectId] });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  return {
    localBlocks,
    isLoading,
    saving,
    error,
    addBlock,
    removeBlock,
    moveBlock,
    updateBlock,
    handleFileChange,
    saveAll,
  };
}
````

## File: src/modules/projects/pages/DemosRedirectPage.tsx
````typescript
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { projectIds } from "../config/project";

/**
 * Redirige /demos/:projectId a /page/:id.
 * Los proyectos ya no tienen contenido embebido; el contenido viene de Supabase (project_content).
 */
const Demo: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  if (projectId && projectIds.includes(projectId)) {
    return <Navigate to={`/page/${projectId}`} replace />;
  }
  return <Navigate to="/proyectos" replace />;
};

export default Demo;
````

## File: src/modules/projects/admin/ProjectFormModal.tsx
````typescript
import React, { useState, useEffect } from 'react';
import { ProjectForm } from '../hooks/useAdminProjects';
import { MarkdownEditor } from './MarkdownEditor';
import { CardProps } from '../../../types/types';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialForm: ProjectForm;
  editingId: string | null;
  onSave: (
    form: ProjectForm,
    editingId: string | null,
    cardImage: File | null,
    bgImage: File | null,
    onSuccess: () => void
  ) => void;
  saving: boolean;
  error: string | null;
  setError: (err: string | null) => void;
  cards: CardProps[];
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
  initialForm,
  editingId,
  onSave,
  saving,
  error,
  setError,
  cards,
}) => {
  const [form, setForm] = useState<ProjectForm>(initialForm);
  const [cardImage, setCardImage] = useState<File | null>(null);
  const [bgImage, setBgImage] = useState<File | null>(null);

  useEffect(() => {
    setForm(initialForm);
    setCardImage(null);
    setBgImage(null);
    setError(null);
  }, [initialForm, isOpen, setError]);

  if (!isOpen) return null;

  const handleSaveClick = () => {
    onSave(form, editingId, cardImage, bgImage, () => {
      onClose();
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal content */}
      <div className="relative w-full max-w-2xl md:max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl
                      bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40">
        {/* Modal header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4
                        bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
          <h3 className="text-xl font-bold text-white">
            {editingId ? 'Editar proyecto' : 'Nuevo proyecto'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400
                       hover:text-white hover:bg-white/10 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">Título *</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                         text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                         focus:ring-1 focus:ring-blue-500/20 transition-all"
              placeholder="Nombre del proyecto"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">Descripción *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                         text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                         focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
              placeholder="Breve descripción del proyecto"
            />
          </div>

          {/* Category & Tags Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Categoría *</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/10
                           text-white focus:outline-none focus:border-blue-500/50
                           focus:ring-1 focus:ring-blue-500/20 transition-all cursor-pointer"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Automatizaciones AI">Automatizaciones AI</option>
                <option value="Full Stack">Full Stack</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Etiquetas (separadas por comas)</label>
              <input
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                           text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                           focus:ring-1 focus:ring-blue-500/20 transition-all"
                placeholder="react, typescript, supabase"
              />
            </div>
          </div>

          {/* Problem Solved */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">¿Qué problema resuelve? *</label>
            <textarea
              value={form.problemSolved}
              onChange={(e) => setForm((f) => ({ ...f, problemSolved: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                         text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                         focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
              placeholder="Explica qué problema específico resuelve este proyecto..."
            />
          </div>

          {/* Architectural Doc with extracted component */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Documentación Arquitectónica (Soporta Markdown) *</label>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                <strong>⚠️ Aviso de seguridad:</strong> No expongas contraseñas, claves de API, credenciales ni información sensible en este documento.
              </div>
            </div>
            <MarkdownEditor 
              value={form.architecturalDoc} 
              onChange={(val) => setForm((f) => ({ ...f, architecturalDoc: val }))}
              placeholder="### Arquitectura de la Solución..."
            />
          </div>

          {/* Button text */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">Texto del botón</label>
            <input
              value={form.buttonText}
              onChange={(e) => setForm((f) => ({ ...f, buttonText: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                         text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                         focus:ring-1 focus:ring-blue-500/20 transition-all"
              placeholder="Ver más..."
            />
          </div>

          {/* URLs row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">URL del código</label>
              <input
                value={form.codeUrl}
                onChange={(e) => setForm((f) => ({ ...f, codeUrl: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                           text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                           focus:ring-1 focus:ring-blue-500/20 transition-all"
                placeholder="https://github.com/..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">URL del demo</label>
              <input
                value={form.demoUrl}
                onChange={(e) => setForm((f) => ({ ...f, demoUrl: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                           text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                           focus:ring-1 focus:ring-blue-500/20 transition-all"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Images row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <label className="block text-sm font-medium text-slate-300">Imagen de card</label>
              <div className="space-y-1.5">
                <label className="block text-xs text-slate-400">Ruta o URL de imagen</label>
                <input
                  value={form.imagePath}
                  onChange={(e) => setForm((f) => ({ ...f, imagePath: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10
                             text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                             focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                  placeholder="Ej: cards/proyecto.webp o https://..."
                />
              </div>
              <div className="space-y-1.5 pt-1.5">
                <label className="block text-xs text-slate-400">O subir nuevo archivo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCardImage(e.target.files?.[0] ?? null)}
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3
                             file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                             file:font-medium file:cursor-pointer hover:file:bg-white/15
                             file:transition-all cursor-pointer"
                />
              </div>
              {cardImage && (
                <p className="text-xs text-emerald-400 truncate">{cardImage.name}</p>
              )}
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <label className="block text-sm font-medium text-slate-300">Imagen de fondo</label>
              <div className="space-y-1.5">
                <label className="block text-xs text-slate-400">Ruta o URL de fondo</label>
                <input
                  value={form.bgImagePath}
                  onChange={(e) => setForm((f) => ({ ...f, bgImagePath: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10
                             text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                             focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                  placeholder="Ej: projects-bg/fondo.jpg o https://..."
                />
              </div>
              <div className="space-y-1.5 pt-1.5">
                <label className="block text-xs text-slate-400">O subir nuevo archivo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBgImage(e.target.files?.[0] ?? null)}
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3
                             file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                             file:font-medium file:cursor-pointer hover:file:bg-white/15
                             file:transition-all cursor-pointer"
                />
              </div>
              {bgImage && (
                <p className="text-xs text-emerald-400 truncate">{bgImage.name}</p>
              )}
            </div>
          </div>

          {/* Order */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">Orden</label>
            <input
              type="number"
              min={0}
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))}
              className="w-32 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                         text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                         focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Preview */}
          {form.title && (
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Vista previa</label>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-transparent
                              p-6 backdrop-blur-xl h-48 border border-white/10">
                {(cardImage || form.imagePath) && (
                  <img
                    src={cardImage ? URL.createObjectURL(cardImage) : form.imagePath}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />
                )}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-white drop-shadow-lg">{form.title}</h4>
                    <p className="text-white/80 text-sm leading-relaxed line-clamp-2">{form.description}</p>
                  </div>
                  <span className="w-fit px-4 py-2 rounded-lg bg-white/5 backdrop-blur-lg border border-white/20
                                   text-white/90 text-sm font-medium">
                    {form.buttonText || 'Ver más...'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Footer actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-white/5">
            <button
              onClick={onClose}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white
                         hover:bg-white/10 transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveClick}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                         text-white font-medium hover:from-blue-500 hover:to-blue-400
                         transition-all shadow-lg shadow-blue-500/20 active:scale-95
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {saving ? 'Guardando...' : 'Guardar proyecto'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
````

## File: src/modules/projects/components/ExpAndTecnologies.tsx
````typescript
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useKnowledgeSections } from "../hooks/useInfoSections";
import type { CareerGroup, CareerItem } from "../../../types/types";
import DOMPurify from "dompurify";
import { ALLOWED_HTML_TAGS, parseMarkdownToHtml } from "../utils/markdown";

const COLOR_CONFIG = {
    blue: {
        bg: 'bg-blue-400',
        shadow: 'shadow-blue-400/50',
    },
    purple: {
        bg: 'bg-purple-400',
        shadow: 'shadow-purple-400/50',
    },
    green: {
        bg: 'bg-green-400',
        shadow: 'shadow-green-400/50',
    }
} as const;

const KnowledgeTimelineItem: React.FC<{ readonly item: CareerGroup; readonly index: number }> = ({ item, index }) => {
    const currentColor = COLOR_CONFIG[item.color] ?? COLOR_CONFIG.blue;
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLUListElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node | null;
            if (!containerRef.current || !target) return;
            if (!containerRef.current.contains(target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('touchstart', handlePointerDown);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('touchstart', handlePointerDown);
        };
    }, []);

    useEffect(() => {
        if (isOpen) containerRef.current?.focus();
    }, [isOpen]);

    useGSAP(() => {
        // Floating animation
        gsap.to(contentRef.current, {
            y: -1.5,
            duration: 5 + (index % 3) * 0.7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: containerRef });

    useGSAP(() => {
        if (isOpen && detailsRef.current) {
            gsap.fromTo(detailsRef.current, 
                { height: 0, opacity: 0 }, 
                { height: "auto", opacity: 1, duration: 0.25, ease: "power2.out" }
            );
        } else if (!isOpen && detailsRef.current) {
            gsap.to(detailsRef.current, { height: 0, opacity: 0, duration: 0.25, ease: "power2.out" });
        }
    }, [isOpen]);

    const handleMouseEnter = () => {
        gsap.to(containerRef.current, { y: -2, scale: 1.01, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
        gsap.to(containerRef.current, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    };

    return (
        <li className="knowledge-card opacity-0 translate-y-5 group relative animate-gpu">
            <div
                ref={containerRef}
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-blue-400/60 cursor-pointer"
            >
                <div className={`absolute -top-2 -left-2 w-3 h-3 rounded-full ${currentColor.bg} shadow-lg ${currentColor.shadow}`} />
                <div
                    ref={contentRef}
                    className="relative z-10 transform-gpu will-change-transform"
                >
                    <h3 className="text-sm sm:text-base font-semibold mb-2.5 text-white pr-4 leading-snug">
                        {item.title}
                    </h3>
                    
                    <ul
                        ref={detailsRef}
                        className={`space-y-3 mt-3 border-t border-white/5 pt-3 overflow-hidden ${!isOpen ? 'hidden' : ''}`}
                        aria-hidden={!isOpen}
                        style={{ display: isOpen ? 'block' : 'none' }}
                    >
                        {item.items.map((detail: CareerItem, idx: number) => (
                            <li
                                key={idx}
                                className="flex flex-col gap-1 text-xs sm:text-sm text-slate-300 group/item border-l-2 border-blue-500/30 pl-3 pb-3 last:pb-0"
                                onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 2, duration: 0.3, ease: "elastic.out(1, 0.3)" })}
                                onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" })}
                            >
                                <div className="flex items-center gap-1.5">
                                    <span className="text-blue-400 group-hover/item:text-blue-300 transition-colors">▸</span>
                                    <strong className="text-white group-hover/item:text-blue-300 transition-colors font-semibold">
                                        {detail.title}
                                    </strong>
                                </div>
                                {detail.body && (
                                    <p 
                                        className="text-slate-400 text-xs sm:text-sm pl-4 leading-relaxed whitespace-pre-wrap"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                parseMarkdownToHtml(detail.body),
                                                { 
                                                    ALLOWED_TAGS: ALLOWED_HTML_TAGS,
                                                    ALLOWED_ATTR: ['href', 'class', 'target', 'rel']
                                                }
                                            )
                                        }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    );
};

interface LightboxModalProps {
    readonly src: string;
    readonly onClose: () => void;
}

const LightboxModal: React.FC<LightboxModalProps> = ({ src, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Overlay fade in
        gsap.fromTo(modalRef.current, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        // Content scale and fade in
        gsap.fromTo(contentRef.current, 
            { scale: 0.9, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.5)" }
        );
    }, { scope: modalRef });

    const handleClose = () => {
        gsap.to(contentRef.current, { 
            scale: 0.9, 
            opacity: 0, 
            duration: 0.2, 
            ease: "power2.in" 
        });
        gsap.to(modalRef.current, { 
            opacity: 0, 
            duration: 0.25, 
            ease: "power2.in",
            onComplete: onClose 
        });
    };

    // ESC key and scroll lock
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        
        // Prevent scroll on body while open
        document.body.style.overflow = "hidden";
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div 
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 cursor-zoom-out"
            onClick={handleClose}
        >
            {/* Close Button */}
            <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 z-10"
                aria-label="Cerrar vista completa"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Image Wrapper */}
            <div 
                ref={contentRef}
                className="relative max-w-5xl w-full flex items-center justify-center p-2 cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <img 
                    src={src} 
                    alt="Certificado en pantalla completa" 
                    className="max-w-full max-h-[85vh] md:max-h-[88vh] object-contain rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.25)] border border-white/15"
                />
            </div>
        </div>
    );
};

const GcpCertificateWidget: React.FC = () => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);

    return (
        <div 
            ref={widgetRef}
            className="mt-8 relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden group"
        >
            {/* Background glowing gradients */}
            <div className="absolute -right-24 -bottom-24 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/15 transition-all duration-500" />
            <div className="absolute -left-24 -top-24 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/15 transition-all duration-500" />

            <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
                {/* Certificate info */}
                <div className="flex-1 space-y-4 text-left w-full">
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full uppercase tracking-wider">
                            Certificación
                        </span>
                        <span className="px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full uppercase tracking-wider">
                            En Preparación
                        </span>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-blue-300 transition-colors">
                            Google Cloud Associate Cloud Engineer
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 font-medium">
                            Avalado por <span className="text-white">Google Cloud</span> • Distribuido por <span className="text-white">Coursera</span>
                        </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Programa de preparación oficial centrado en la implementación, diseño, planificación y configuración de soluciones de infraestructura y servicios de almacenamiento, computación y red en Google Cloud Platform (GCP).
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                        {["GCP", "Cloud Infrastructure", "Kubernetes", "IAM", "VPC Networks", "Compute Engine"].map((badge, idx) => (
                            <span 
                                key={idx} 
                                className="text-[10px] sm:text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 hover:border-white/10 hover:bg-white/10 transition-colors"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Certificate Image Frame */}
                <div className="w-full max-w-sm md:max-w-none md:w-64 flex-shrink-0 mx-auto md:mx-0">
                    <button
                        onClick={() => setIsLightboxOpen(true)}
                        className="relative w-full rounded-xl border border-white/10 overflow-hidden shadow-lg group/img focus:outline-none focus:ring-2 focus:ring-blue-400/60 block cursor-zoom-in"
                        aria-label="Ampliar certificado de Google Cloud"
                    >
                        {/* Overlay hover effect */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-[1px]">
                            <div className="bg-white/10 backdrop-blur-md rounded-full p-2.5 border border-white/20 transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637zM10.5 7.5v6m3-3h-6" />
                                </svg>
                            </div>
                        </div>

                        <img 
                            src="/assets/Certificado_GCP_1.png" 
                            alt="Certificado Google Cloud Associate Cloud Engineer" 
                            className="w-full aspect-[4/3] object-cover object-top transform group-hover/img:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                    </button>
                </div>
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <LightboxModal 
                    src="/assets/Certificado_GCP_1.png" 
                    onClose={() => setIsLightboxOpen(false)} 
                />
            )}
        </div>
    );
};

export const ExpAndTecnologies: React.FC = () => {
    const { knowledges, isLoading } = useKnowledgeSections();
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!isLoading && knowledges.length > 0) {
            gsap.to(".knowledge-card", {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%"
                }
            });
        }
    }, [isLoading, knowledges]);

    return (
        <article ref={containerRef}>
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-4">
                Carrera y Experiencia
            </h2>
            {isLoading ? (
                <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    Cargando...
                </div>
            ) : (
                <>
                    <ul className="mt-4 grid gap-4 sm:gap-5 lg:grid-cols-2">
                        {knowledges.map((item, index) => (
                            <KnowledgeTimelineItem key={item.id} item={item} index={index} />
                        ))}
                    </ul>
                    <GcpCertificateWidget />
                </>
            )}
        </article>
    );
};
````

## File: src/modules/projects/components/SkillSection.tsx
````typescript
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSkillSections } from "../hooks/useInfoSections";
import type { SkillGroup } from "../../../types/types";

const COLOR_CONFIG = {
    blue: {
        bg: 'bg-blue-400',
        shadow: 'shadow-blue-400/50',
        gradient: 'from-blue-400 to-blue-300',
        textColor: 'text-blue-400',
        textHoverColor: 'group-hover/skill:text-blue-300'
    },
    purple: {
        bg: 'bg-purple-400',
        shadow: 'shadow-purple-400/50',
        gradient: 'from-purple-400 to-purple-300',
        textColor: 'text-purple-400',
        textHoverColor: 'group-hover/skill:text-purple-300'
    },
    green: {
        bg: 'bg-green-400',
        shadow: 'shadow-green-400/50',
        gradient: 'from-green-400 to-green-300',
        textColor: 'text-green-400',
        textHoverColor: 'group-hover/skill:text-green-300'
    }
} as const;

const SkillGroupCard: React.FC<{ readonly group: SkillGroup; readonly index: number }> = ({ group, index }) => {
    const currentColor = COLOR_CONFIG[group.color] ?? COLOR_CONFIG.blue;
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Floating animation
        gsap.to(contentRef.current, {
            y: -2,
            duration: 4.5 + (index % 3) * 0.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: cardRef });

    const handleMouseEnter = () => {
        gsap.to(cardRef.current, { y: -3, scale: 1.02, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    };

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="skill-card relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] min-w-0 break-words overflow-hidden opacity-0 translate-y-5"
        >
            <div className={`absolute -top-2 -right-2 w-3 h-3 rounded-full ${currentColor.bg} shadow-lg ${currentColor.shadow}`} />
            <div
                ref={contentRef}
                className="relative z-10 transform-gpu will-change-transform"
            >
                <h3 className={`font-semibold text-sm md:text-base mb-2.5 bg-gradient-to-r ${currentColor.gradient} bg-clip-text text-transparent`}>
                    {group.title}
                </h3>
                <ul className="space-y-1">
                    {group.items.map((item, idx) => (
                        <li
                            key={idx}
                            className="skill-item flex items-start gap-1.5 text-xs md:text-sm text-slate-300 group/skill cursor-default"
                            onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 2, duration: 0.3, ease: "elastic.out(1, 0.3)" })}
                            onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" })}
                        >
                            <span className={`mt-0.5 flex-shrink-0 transition-colors ${currentColor.textColor} ${currentColor.textHoverColor}`}>•</span>
                            <span className="group-hover/skill:text-white transition-colors">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export const SkillSection: React.FC = () => {
    const { skills, isLoading } = useSkillSections();
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!isLoading && skills.length > 0) {
            gsap.to(".skill-card", {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%"
                }
            });
        }
    }, [isLoading, skills]);

    return (
        <article ref={containerRef} className="w-full min-w-0">
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-3">
                Información
            </h2>
            <div className="space-y-3 text-base leading-relaxed">
                <p className="text-justify sm:text-left text-slate-200 text-sm sm:text-base">
                    Wilmer Lynch — Programador Full Stack.
                </p>
                {isLoading ? (
                    <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                        Cargando...
                    </div>
                ) : (
                    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {skills.map((group, index) => (
                            <SkillGroupCard key={group.id} group={group} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};
````

## File: src/modules/projects/hooks/useAdminProjects.ts
````typescript
import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../shared/services/supabase/supabase';
import { STORAGE_BUCKET } from '../../../types/supabase';
import { useCards } from './useCards';

export interface ProjectForm {
  title: string;
  description: string;
  buttonText: string;
  codeUrl: string;
  demoUrl: string;
  order: number;
  problemSolved: string;
  architecturalDoc: string;
  category: string;
  tags: string;
  imagePath: string;
  bgImagePath: string;
}

export const emptyForm: ProjectForm = {
  title: '',
  description: '',
  buttonText: 'Ver más...',
  codeUrl: '',
  demoUrl: '',
  order: 0,
  problemSolved: '',
  architecturalDoc: '',
  category: 'Full Stack',
  tags: '',
  imagePath: '',
  bgImagePath: '',
};

export function useAdminProjects() {
  const { cards, isLoading } = useCards();
  const queryClient = useQueryClient();

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const list = Array.isArray(cards) ? cards : [];

  const uploadFile = async (file: File, folder: string, id: string): Promise<string> => {
    const ext = file.name.split('.').pop() || 'webp';
    const path = `${folder}/${id}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: true });
    if (uploadError) throw uploadError;
    return path;
  };

  const handleSave = async (
    form: ProjectForm,
    editingId: string | null,
    cardImage: File | null,
    bgImage: File | null,
    onSuccess: () => void
  ) => {
    if (!form.title.trim() || !form.description.trim() || !form.problemSolved.trim() || !form.architecturalDoc.trim()) {
      setError('Título, descripción, problema resuelto y documentación arquitectónica son obligatorios.');
      return;
    }
    setSaving(true);
    setError(null);

    const processedTags = form.tags
      ? form.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    try {
      if (editingId) {
        const updates: Record<string, unknown> = {
          title: form.title.trim(),
          description: form.description.trim(),
          button_text: form.buttonText.trim() || 'Ver más...',
          code_url: form.codeUrl.trim(),
          demo_url: form.demoUrl.trim(),
          order: form.order,
          problem_solved: form.problemSolved.trim(),
          architectural_doc: form.architecturalDoc.trim(),
          category: form.category,
          tags: processedTags,
          image_path: form.imagePath.trim(),
          bg_image_path: form.bgImagePath.trim(),
          updated_at: new Date().toISOString(),
        };

        if (cardImage) {
          updates.image_path = await uploadFile(cardImage, 'cards', editingId);
        }
        if (bgImage) {
          updates.bg_image_path = await uploadFile(bgImage, 'projects-bg', editingId);
        }

        const { error: dbError } = await supabase
          .from('cards')
          .update(updates)
          .eq('id', editingId);
        if (dbError) throw dbError;
      } else {
        const nextId = String(
          Math.max(0, ...list.map((c) => Number(c.id) || 0)) + 1
        );

        let imagePath = form.imagePath.trim();
        let bgImagePath = form.bgImagePath.trim();

        if (cardImage) {
          imagePath = await uploadFile(cardImage, 'cards', nextId);
        }
        if (bgImage) {
          bgImagePath = await uploadFile(bgImage, 'projects-bg', nextId);
        }

        const { error: dbError } = await supabase.from('cards').insert({
          id: nextId,
          title: form.title.trim(),
          description: form.description.trim(),
          button_text: form.buttonText.trim() || 'Ver más...',
          image_path: imagePath,
          code_url: form.codeUrl.trim(),
          demo_url: form.demoUrl.trim(),
          bg_image_path: bgImagePath,
          order: form.order,
          problem_solved: form.problemSolved.trim(),
          architectural_doc: form.architecturalDoc.trim(),
          category: form.category,
          tags: processedTags,
        });
        if (dbError) throw dbError;
      }

      queryClient.invalidateQueries({ queryKey: ['cards'] });
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, onSettled: () => void) => {
    setDeletingId(id);
    try {
      const { error: dbError } = await supabase.from('cards').delete().eq('id', id);
      if (dbError) throw dbError;

      await supabase.storage.from(STORAGE_BUCKET).remove([`cards/${id}.webp`, `cards/${id}.jpg`, `cards/${id}.png`]);
      await supabase.storage.from(STORAGE_BUCKET).remove([`projects-bg/${id}.webp`, `projects-bg/${id}.jpg`, `projects-bg/${id}.png`]);

      queryClient.invalidateQueries({ queryKey: ['cards'] });
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeletingId(null);
      onSettled();
    }
  };

  const moveProject = async (id: string, direction: 'up' | 'down') => {
    const sorted = [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const idx = sorted.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const current = sorted[idx];
    const swap = sorted[swapIdx];

    await Promise.all([
      supabase.from('cards').update({ order: swap.order ?? swapIdx, updated_at: new Date().toISOString() }).eq('id', current.id),
      supabase.from('cards').update({ order: current.order ?? idx, updated_at: new Date().toISOString() }).eq('id', swap.id),
    ]);
    queryClient.invalidateQueries({ queryKey: ['cards'] });
  };

  return {
    list,
    isLoading,
    saving,
    deletingId,
    error,
    setError,
    handleSave,
    handleDelete,
    moveProject,
  };
}
````

## File: src/modules/projects/hooks/useCards.ts
````typescript
/**
 * @file useCards.ts
 * @description Hook para obtener la lista de proyectos/cards desde Supabase.
 * Proporciona datos unificados (título, descripción, imagen, URLs, orden) con fallback
 * a configuración local cuando Supabase no está disponible o no devuelve datos.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import type { CardRow } from '../../../types/supabase';
import type { CardProps } from '../../../types/types';
import { cards as fallbackCards } from '../config/cards';

/**
 * Convierte un elemento del fallback (config/cards) al formato CardProps usado en la app.
 * @param c - Card del fallback
 * @returns Card con URLs absolutas y campos extendidos (codeUrl, demoUrl, bgImage, order)
 * @internal
 */
function mapFallback(c: (typeof fallbackCards)[number]): CardProps {
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    img: c.img.startsWith('http') ? c.img : `/${c.img}`,
    problem_solved: '',
    architectural_doc: '',
    category: 'Full Stack',
    tags: [],
    buttonText: c.buttonText,
    codeUrl: c.codeUrl ?? '',
    demoUrl: c.demoUrl ?? '',
    bgImage: c.bgImage ?? '/images/bg-proyecto2.jpg',
    order: c.order ?? 0,
  };
}

/**
 * Obtiene las cards desde Supabase (tabla `cards`) o devuelve el fallback local.
 * Resuelve las rutas de imagen con getStoragePublicUrl para Storage de Supabase.
 * @returns Lista de proyectos ordenados por `order` e `id`
 * @internal
 */
async function fetchCards(): Promise<CardProps[]> {
  if (!isSupabaseConfigured) {
    return fallbackCards.map(mapFallback);
  }
  const { data, error } = await supabase.from('cards').select('*').order('order').order('id');
  if (error || !data?.length) {
    return fallbackCards.map(mapFallback);
  }
  return (data as CardRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    img: getStoragePublicUrl(row.image_path) || `/${row.image_path}`,
    buttonText: row.button_text,
    codeUrl: row.code_url,
    demoUrl: row.demo_url,
    bgImage: getStoragePublicUrl(row.bg_image_path) || row.bg_image_path || '/images/bg-proyecto2.jpg',
    order: row.order,
    problem_solved: row.problem_solved,
    architectural_doc: row.architectural_doc,
    category: row.category || 'Full Stack',
    tags: Array.isArray(row.tags) ? row.tags : [],
  }));
}

/**
 * Hook que expone la lista de proyectos (cards) para la grilla y páginas de detalle.
 * Usa TanStack Query con cache de 5 minutos y placeholder con datos del fallback.
 * @returns Objeto con la lista de cards, estado de carga, error y función para refrescar
 * @example
 * const { cards, isLoading, refetch } = useCards();
 * if (isLoading) return <Spinner />;
 * return cards.map(c => <Card key={c.id} {...c} />);
 */
export function useCards() {
  const defaults = fallbackCards.map(mapFallback);
  const q = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
    staleTime: 5 * 60 * 1000,
    placeholderData: defaults,
  });
  return {
    cards: Array.isArray(q.data) && q.data.length > 0 ? q.data : defaults,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
````

## File: src/modules/projects/pages/ProjectsPage.tsx
````typescript
import React from "react";
import Grid from "../components/ProjectGrid";
import Footer from "../../../core/components/footer/Footer";

export const Proyects: React.FC = () => {
    return (
        <>
            <div className="p-8 pt-32">
                <Grid />
                <Footer />
            </div>
        </>
    );
};
````

## File: src/modules/projects/utils/markdown.ts
````typescript
/**
 * @file markdown.ts
 * @description Utilidades de procesamiento de Markdown a HTML para Casos de Estudio.
 */

export const ALLOWED_HTML_TAGS = ['pre', 'code', 'h2', 'h3', 'p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'span'];

export function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';

  // Basic markdown parser
  let html = markdown
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    // Headers (h3, h2, h1)
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Bullet points
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    // Links [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">$1</a>')
    // Line breaks
    .replace(/\n/g, '<br />');

  // Wrap bullet points in ul
  html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');

  return html;
}
````

## File: src/modules/projects/admin/AdminContentEditor.tsx
````typescript
import React, { useState, useEffect } from 'react';
import { useCards } from '../hooks/useCards';
import { useAdminProjectContent, BlockType, LocalBlock } from '../hooks/useAdminProjectContent';

export const AdminContent: React.FC = () => {
  const { cards } = useCards();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const list = Array.isArray(cards) ? cards : [];

  useEffect(() => {
    if (!selectedProjectId && list.length > 0) {
      setSelectedProjectId(list[0].id);
    }
  }, [list, selectedProjectId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white">Contenido de proyectos</h2>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-300">
            <strong>💡 Cómo funciona:</strong> Selecciona un proyecto y agrega bloques de texto, imágenes (.webp, .jpg, .png) o videos (.gif, .mp4). 
            El contenido se mostrará en la página pública del proyecto (<code className="text-blue-200">/page/:id</code>).
          </p>
        </div>
      </div>

      {/* Project selector */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-300">Seleccionar proyecto</label>
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                     text-white focus:outline-none focus:border-blue-500/50
                     focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled className="bg-slate-900">-- Elige un proyecto --</option>
          {list.map((c) => (
            <option key={c.id} value={c.id} className="bg-slate-900">
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {selectedProjectId && (
        <ProjectContentEditor key={selectedProjectId} projectId={selectedProjectId} />
      )}
    </div>
  );
};

const ProjectContentEditor: React.FC<{ projectId: string }> = ({ projectId }) => {
  const {
    localBlocks,
    isLoading,
    saving,
    error,
    addBlock,
    removeBlock,
    moveBlock,
    updateBlock,
    handleFileChange,
    saveAll
  } = useAdminProjectContent(projectId);
  
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  const handleAddBlock = (type: BlockType) => {
    addBlock(type);
    setAddMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-slate-400">Cargando contenido...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Blocks list */}
      {localBlocks.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <svg className="w-12 h-12 mx-auto text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-slate-400">Sin contenido para este proyecto</p>
          <p className="text-slate-500 text-sm mt-1">Agrega bloques de texto, imágenes o videos</p>
        </div>
      )}

      <div className="space-y-3">
        {localBlocks.map((block, idx) => (
          <div
            key={block.id ?? `new-${idx}`}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            {/* Block header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                block.type === 'text'
                  ? 'bg-blue-500/20 text-blue-300'
                  : block.type === 'image'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-purple-500/20 text-purple-300'
              }`}>
                {block.type === 'text' ? 'Texto' : block.type === 'image' ? 'Imagen' : 'Video'}
              </span>
              <span className="text-xs text-slate-500">#{idx + 1}</span>
              <div className="ml-auto flex items-center gap-1">
                <button
                  onClick={() => moveBlock(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10
                             disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Subir"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveBlock(idx, 'down')}
                  disabled={idx === localBlocks.length - 1}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10
                             disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Bajar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => removeBlock(idx)}
                  className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Eliminar bloque"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Block body */}
            <div className="p-4 space-y-3">
              {block.type === 'text' && (
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(idx, { content: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                             focus:ring-1 focus:ring-blue-500/20 transition-all resize-y font-mono text-sm"
                  placeholder="Escribe el contenido del bloque (soporta HTML)..."
                />
              )}

              {block.type === 'image' && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept=".webp,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(idx, e.target.files?.[0] ?? null)}
                        className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                                   file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                                   file:font-medium file:cursor-pointer hover:file:bg-white/15
                                   file:transition-all cursor-pointer"
                      />
                      <p className="text-xs text-slate-500 mt-1">Formatos: .webp, .jpg, .png</p>
                    </div>
                    {block.previewUrl && (
                      <img
                        src={block.previewUrl}
                        alt="Preview"
                        className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl object-cover border border-white/10"
                      />
                    )}
                  </div>
                  <input
                    value={block.caption}
                    onChange={(e) => updateBlock(idx, { caption: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10
                               text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                               focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                    placeholder="Pie de imagen (opcional)"
                  />
                </div>
              )}

              {block.type === 'video' && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept=".gif,.mp4,.webm"
                        onChange={(e) => handleFileChange(idx, e.target.files?.[0] ?? null)}
                        className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                                   file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                                   file:font-medium file:cursor-pointer hover:file:bg-white/15
                                   file:transition-all cursor-pointer"
                      />
                      <p className="text-xs text-slate-500 mt-1">Formatos: .gif, .mp4, .webm</p>
                    </div>
                    {block.previewUrl && (
                      block.previewUrl.endsWith('.gif') || block.file?.name.endsWith('.gif') ? (
                        <img
                          src={block.previewUrl}
                          alt="Preview GIF"
                          className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl object-cover border border-white/10"
                        />
                      ) : (
                        <video
                          src={block.previewUrl}
                          className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl object-cover border border-white/10"
                          muted
                          loop
                          autoPlay
                          playsInline
                        />
                      )
                    )}
                  </div>
                  <input
                    value={block.caption}
                    onChange={(e) => updateBlock(idx, { caption: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10
                               text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                               focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                    placeholder="Pie de video (opcional)"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add block + Save */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <button
            onClick={() => setAddMenuOpen(!addMenuOpen)}
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10
                       text-white/80 hover:bg-white/10 hover:text-white transition-all
                       flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Agregar bloque
          </button>
          {addMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setAddMenuOpen(false)} />
              <div className="absolute bottom-full left-0 mb-2 z-20 rounded-xl bg-slate-800/95 backdrop-blur-xl
                              border border-white/10 shadow-xl overflow-hidden min-w-[180px]">
                <button
                  onClick={() => handleAddBlock('text')}
                  className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10
                             flex items-center gap-2.5 transition-colors"
                >
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Texto
                </button>
                <button
                  onClick={() => handleAddBlock('image')}
                  className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10
                             flex items-center gap-2.5 transition-colors"
                >
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Imagen (.webp, .jpg, .png)
                </button>
                <button
                  onClick={() => handleAddBlock('video')}
                  className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10
                             flex items-center gap-2.5 transition-colors"
                >
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Video (.gif, .mp4)
                </button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={saveAll}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                     text-white font-medium hover:from-blue-500 hover:to-blue-400
                     transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50
                     disabled:cursor-not-allowed active:scale-95 flex items-center gap-2 w-fit"
        >
          {saving && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {saving ? 'Guardando...' : 'Guardar todo'}
        </button>
      </div>

      {/* Preview */}
      {localBlocks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-300">Vista previa</h3>
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-6 space-y-4">
            {localBlocks.map((block, idx) => (
              <div key={block.id ?? `preview-${idx}`}>
                {block.type === 'text' && block.content && (
                  <div
                    className="text-slate-200 text-sm leading-relaxed prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                )}
                {block.type === 'image' && block.previewUrl && (
                  <figure className="space-y-2">
                    <img
                      src={block.previewUrl}
                      alt={block.caption || ''}
                      className="w-full max-h-96 object-contain rounded-xl"
                    />
                    {block.caption && (
                      <figcaption className="text-xs text-slate-400 text-center">{block.caption}</figcaption>
                    )}
                  </figure>
                )}
                {block.type === 'video' && block.previewUrl && (
                  <figure className="space-y-2">
                    {block.previewUrl.endsWith('.gif') || block.file?.name.endsWith('.gif') ? (
                      <img
                        src={block.previewUrl}
                        alt={block.caption || ''}
                        className="w-full max-h-96 object-contain rounded-xl"
                      />
                    ) : (
                      <video
                        src={block.previewUrl}
                        className="w-full max-h-96 rounded-xl"
                        controls
                        muted
                        loop
                        playsInline
                      />
                    )}
                    {block.caption && (
                      <figcaption className="text-xs text-slate-400 text-center">{block.caption}</figcaption>
                    )}
                  </figure>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
````

## File: src/modules/projects/admin/AdminInfoSections.tsx
````typescript
import React, { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../shared/services/supabase/supabase';
import { useSkillSections, useKnowledgeSections } from '../hooks/useInfoSections';
import type { InfoSectionRow } from '../../../types/supabase';
import DOMPurify from 'dompurify';
import { ALLOWED_HTML_TAGS, parseMarkdownToHtml } from '../utils/markdown';

type SectionType = 'skill' | 'knowledge';
type ColorOption = 'blue' | 'purple' | 'green';

type EditableSectionItem = string | { title: string; body: string };

interface EditableSection {
  id: string | null;
  title: string;
  color: ColorOption;
  items: EditableSectionItem[];
  order: number;
}

const COLOR_OPTIONS: { value: ColorOption; label: string; cls: string }[] = [
  { value: 'blue', label: 'Azul', cls: 'bg-blue-400' },
  { value: 'purple', label: 'Morado', cls: 'bg-purple-400' },
  { value: 'green', label: 'Verde', cls: 'bg-green-400' },
];

export const AdminInfoSections: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SectionType>('skill');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white">Secciones de información</h2>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-300">
            <strong>Habilidades:</strong> Tarjetas compactas que se muestran en la sección "Información" del home.
            <br />
            <strong>Carrera y Experiencia:</strong> Trayectorias o hitos de tu carrera profesional en "Carrera y Experiencia".
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('skill')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'skill'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          Habilidades
        </button>
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'knowledge'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          Carrera y Experiencia
        </button>
      </div>

      <SectionEditor key={activeTab} sectionType={activeTab} />
    </div>
  );
};

const SectionEditor: React.FC<{ sectionType: SectionType }> = ({ sectionType }) => {
  const { skills, isLoading: skillsLoading, refetch: refetchSkills } = useSkillSections();
  const { knowledges, isLoading: knowledgesLoading, refetch: refetchKnowledges } = useKnowledgeSections();
  const queryClient = useQueryClient();

  const sourceData = sectionType === 'skill' ? skills : knowledges;
  const isLoading = sectionType === 'skill' ? skillsLoading : knowledgesLoading;

  const [sections, setSections] = useState<EditableSection[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setIsInitialized(false);
  }, [sectionType]);

  useEffect(() => {
    if (!isLoading && !isInitialized) {
      setSections(
        sourceData.map((s: InfoSectionRow) => {
          const mappedItems = s.items.map(it => {
            if (sectionType === 'knowledge') {
              if (typeof it === 'string') {
                return { title: it, body: '' };
              }
              return {
                title: (it as any)?.title || '',
                body: (it as any)?.body || '',
              };
            }
            return typeof it === 'string' ? it : (it as any)?.title || '';
          });
          return {
            id: s.id,
            title: s.title,
            color: s.color,
            items: mappedItems,
            order: s.order,
          };
        })
      );
      setIsInitialized(true);
    }
  }, [sourceData, isLoading, isInitialized, sectionType]);

  const addSection = useCallback(() => {
    setSections(prev => [
      ...prev,
      {
        id: null,
        title: '',
        color: sectionType === 'skill' ? 'blue' : 'purple',
        items: sectionType === 'skill' ? [''] : [{ title: '', body: '' }],
        order: prev.length,
      },
    ]);
  }, [sectionType]);

  const removeSection = useCallback((idx: number) => {
    setSections(prev => prev.filter((_, i) => i !== idx).map((s, i) => ({ ...s, order: i })));
  }, []);

  const moveSection = useCallback((idx: number, direction: 'up' | 'down') => {
    setSections(prev => {
      const arr = [...prev];
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= arr.length) return prev;
      [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
      return arr.map((s, i) => ({ ...s, order: i }));
    });
  }, []);

  const updateSection = useCallback((idx: number, updates: Partial<EditableSection>) => {
    setSections(prev => prev.map((s, i) => (i === idx ? { ...s, ...updates } : s)));
  }, []);

  const addItem = useCallback((sectionIdx: number) => {
    setSections(prev =>
      prev.map((s, i) =>
        i === sectionIdx
          ? {
              ...s,
              items:
                sectionType === 'skill'
                  ? [...s.items, '']
                  : [...s.items, { title: '', body: '' }],
            }
          : s
      )
    );
  }, [sectionType]);

  const updateItem = useCallback((sectionIdx: number, itemIdx: number, value: EditableSectionItem) => {
    setSections(prev =>
      prev.map((s, i) =>
        i === sectionIdx
          ? { ...s, items: s.items.map((it, j) => (j === itemIdx ? value : it)) }
          : s
      )
    );
  }, []);

  const removeItem = useCallback((sectionIdx: number, itemIdx: number) => {
    setSections(prev =>
      prev.map((s, i) =>
        i === sectionIdx ? { ...s, items: s.items.filter((_, j) => j !== itemIdx) } : s
      )
    );
  }, []);

  const saveAll = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const existingIds = sourceData.map((s: InfoSectionRow) => s.id);
      const localIds = sections.filter(s => s.id).map(s => s.id!);
      const toDelete = existingIds.filter(id => !localIds.includes(id));

      if (toDelete.length > 0) {
        const { error: delErr } = await supabase
          .from('info_sections')
          .delete()
          .in('id', toDelete);
        if (delErr) throw delErr;
      }

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        // Filter empty items based on sectionType
        const filteredItems = section.items.filter(it => {
          if (typeof it === 'string') {
            return it.trim() !== '';
          }
          return (it?.title || '').trim() !== '' || (it?.body || '').trim() !== '';
        });

        if (!section.title.trim()) continue;

        if (section.id) {
          const { error: updErr } = await supabase
            .from('info_sections')
            .update({
              title: section.title,
              color: section.color,
              items: filteredItems,
              order: i,
              updated_at: new Date().toISOString(),
            })
            .eq('id', section.id);
          if (updErr) throw updErr;
        } else {
          const { error: insErr } = await supabase
            .from('info_sections')
            .insert({
              section_type: sectionType,
              title: section.title,
              color: section.color,
              items: filteredItems,
              order: i,
            });
          if (insErr) throw insErr;
        }
      }

      queryClient.invalidateQueries({ queryKey: ['info_sections', sectionType] });
      if (sectionType === 'skill') refetchSkills();
      else refetchKnowledges();
      setIsInitialized(false);
      setSuccess('Guardado correctamente');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-slate-400">Cargando secciones...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}
      {success && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">{success}</div>
      )}

      {sections.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <p className="text-slate-400">No hay secciones de este tipo</p>
          <p className="text-slate-500 text-sm mt-1">Crea una nueva sección para empezar</p>
        </div>
      )}

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div
            key={section.id ?? `new-${idx}`}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            {/* Section header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <div className={`w-3 h-3 rounded-full ${COLOR_OPTIONS.find(c => c.value === section.color)?.cls ?? 'bg-blue-400'}`} />
              <span className="text-sm font-medium text-white truncate flex-1">
                {section.title || '(sin título)'}
              </span>
              <span className="text-xs text-slate-500">#{idx + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveSection(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Subir"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveSection(idx, 'down')}
                  disabled={idx === sections.length - 1}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Bajar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => removeSection(idx)}
                  className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Eliminar sección"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Section body */}
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-400">Título</label>
                  <input
                    value={section.title}
                    onChange={(e) => updateSection(idx, { title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                    placeholder="Título de la sección"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-400">Color</label>
                  <div className="flex gap-2">
                    {COLOR_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateSection(idx, { color: opt.value })}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          section.color === opt.value
                            ? 'bg-white/15 text-white border border-white/20'
                            : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full ${opt.cls}`} />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Items list */}
              <div className="space-y-3">
                <label className="block text-xs font-medium text-slate-400">
                  {sectionType === 'skill' ? 'Habilidades (Elementos)' : 'Carrera y Experiencia (Hitos)'}
                </label>
                
                {sectionType === 'skill' ? (
                  <div className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex gap-2 items-center">
                        <span className="text-xs text-slate-500 w-5 text-right shrink-0">{itemIdx + 1}.</span>
                        <input
                          value={item as string}
                          onChange={(e) => updateItem(idx, itemIdx, e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                          placeholder={`Habilidad ${itemIdx + 1}`}
                        />
                        <button
                          onClick={() => removeItem(idx, itemIdx)}
                          disabled={section.items.length <= 1}
                          className="p-1 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
                          title="Eliminar elemento"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(section.items as { title: string; body: string }[]).map((item, itemIdx) => (
                      <div key={itemIdx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 relative group/item">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400 font-semibold">Hito / Puesto #{itemIdx + 1}</span>
                          <button
                            onClick={() => removeItem(idx, itemIdx)}
                            disabled={section.items.length <= 1}
                            className="p-1 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
                            title="Eliminar elemento"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-medium text-slate-400">Puesto / Título *</label>
                          <input
                            value={(item as { title: string; body: string }).title || ''}
                            onChange={(e) => updateItem(idx, itemIdx, { ...item, title: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                            placeholder="Ej: Programador Senior, Certificación AWS, etc."
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-medium text-slate-400">Cuerpo / Descripción de Logros *</label>
                          <textarea
                            value={(item as { title: string; body: string }).body || ''}
                            onChange={(e) => updateItem(idx, itemIdx, { ...item, body: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm resize-none"
                            placeholder="Logros clave, tecnologías usadas, responsabilidades..."
                          />
                          {(item as { title: string; body: string }).body && (
                            <div className="mt-1.5 p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300">
                              <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Vista Previa (Markdown)</span>
                              <div
                                className="prose prose-invert prose-xs max-w-none font-sans"
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    parseMarkdownToHtml((item as { title: string; body: string }).body),
                                    { ALLOWED_TAGS: ALLOWED_HTML_TAGS }
                                  )
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <button
                  onClick={() => addItem(idx)}
                  className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  {sectionType === 'skill' ? 'Agregar habilidad' : 'Agregar experiencia'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={addSection}
          className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nueva sección
        </button>
        <button
          onClick={saveAll}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center gap-2 w-fit"
        >
          {saving && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {saving ? 'Guardando...' : 'Guardar todo'}
        </button>
      </div>
    </div>
  );
};
````

## File: src/modules/projects/components/InformationContent.tsx
````typescript
import React from "react";
import { SkillSection } from "./SkillSection";
import { ExpAndTecnologies } from "./ExpAndTecnologies";

export const InformationContent: React.FC = () => {
    return (
        <div className="space-y-12">
            <SkillSection />
            <ExpAndTecnologies />
        </div>
    );
};

export { SkillSection, ExpAndTecnologies };
````

## File: src/modules/projects/components/ProjectGrid.tsx
````typescript
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "./ProjectCard";
import { useCards } from "../hooks/useCards";
import { trackSearchExecution } from "../../../core/utils/analytics";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Grid: React.FC = () => {
  const { cards } = useCards();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce de 1000ms para rastrear las búsquedas del usuario en n8n
  useEffect(() => {
    if (!searchQuery.trim()) return;

    const timer = setTimeout(() => {
      trackSearchExecution(searchQuery, selectedCategory);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  const categories = ["Todos", "Frontend", "Backend", "Automatizaciones AI", "Full Stack"];

  // Filter logic
  const filteredCards = cards.filter((card) => {
    const matchesCategory = selectedCategory === "Todos" || card.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesTitle = card.title?.toLowerCase().includes(query);
    const matchesDescription = card.description?.toLowerCase().includes(query);
    const matchesTags = Array.isArray(card.tags) && card.tags.some(tag => tag.toLowerCase().includes(query));

    return matchesCategory && (matchesTitle || matchesDescription || matchesTags);
  });

  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.5)", clearProps: "all" }
      );
    }
  }, [filteredCards]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col gap-6 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/10">
        
        {/* Search Input (Glassmorphic) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título, descripción o etiquetas..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400
                       focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Categories Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300
                         active:scale-95 border ${
                           selectedCategory === cat
                             ? "bg-gradient-to-r from-blue-600 to-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25"
                             : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/10"
                         }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredCards.length === 0 && (
        <div className="text-center py-16 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all">
          <svg className="w-16 h-16 mx-auto text-slate-500 mb-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-slate-400 text-lg font-medium">No se encontraron proyectos</p>
          <p className="text-slate-500 text-sm mt-1">Prueba con otra búsqueda o selecciona una categoría diferente.</p>
        </div>
      )}

      {/* Grid of Projects */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
      >
        {filteredCards.map((card) => (
          <div key={card.id}>
            <Link to={`/page/${card.id}`}>
              <Card
                id={card.id}
                title={card.title}
                description={card.description}
                img={card.img}
                buttonText={card.buttonText}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
````

## File: src/modules/projects/hooks/useInfoSections.ts
````typescript
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import type { InfoSectionRow } from '../../../types/supabase';
import { FALLBACK_SKILLS, FALLBACK_KNOWLEDGES } from '../config/fallbacks';
import type { SkillGroup, CareerGroup } from '../../../types/types';

async function fetchInfoSections(sectionType: 'skill' | 'knowledge'): Promise<InfoSectionRow[] | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('info_sections')
    .select('*')
    .eq('section_type', sectionType)
    .order('order', { ascending: true });
  if (error || !data) return null;
  return data.map((row: Record<string, unknown>) => ({
    ...row,
    items: Array.isArray(row.items) ? row.items : JSON.parse(String(row.items || '[]')),
  })) as InfoSectionRow[];
}

export function useSkillSections() {
  const q = useQuery({
    queryKey: ['info_sections', 'skill'],
    queryFn: () => fetchInfoSections('skill'),
    staleTime: 5 * 60 * 1000,
  });

  const skills: SkillGroup[] = q.data && q.data.length > 0
    ? q.data.map(r => ({
        id: r.id,
        title: r.title,
        color: r.color,
        items: r.items as string[]
      }))
    : FALLBACK_SKILLS;

  return {
    skills,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}

export function useKnowledgeSections() {
  const q = useQuery({
    queryKey: ['info_sections', 'knowledge'],
    queryFn: () => fetchInfoSections('knowledge'),
    staleTime: 5 * 60 * 1000,
  });

  const knowledges: CareerGroup[] = q.data && q.data.length > 0
    ? q.data.map(r => ({
        id: r.id,
        title: r.title,
        color: r.color,
        items: r.items as any[]
      }))
    : FALLBACK_KNOWLEDGES;

  return {
    knowledges,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
````

## File: src/modules/projects/hooks/useProjectContent.ts
````typescript
/**
 * @file useProjectContent.ts
 * @description Hook para obtener los bloques de contenido (texto, imagen, video) de un proyecto
 * desde la tabla `project_content` de Supabase. Usado en el editor de contenido del admin
 * y en la página pública de detalle del proyecto.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import type { ProjectContentRow } from '../../../types/supabase';

export interface ProjectContentBlock extends Omit<ProjectContentRow, 'project_id' | 'created_at' | 'updated_at'> {
  projectId: string;
}

/**
 * Obtiene los bloques de contenido de un proyecto desde la tabla project_content.
 * @param projectId - ID del proyecto
 * @returns Lista de bloques ordenados por `order`
 * @internal
 */
async function fetchProjectContent(projectId: string): Promise<ProjectContentBlock[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('project_content')
    .select('*')
    .eq('project_id', projectId)
    .order('order');
  
  if (error) return [];
  if (!data?.length) return [];
  return (data as ProjectContentRow[]).map((row) => ({
    id: row.id,
    projectId: row.project_id,
    type: row.type,
    content: row.content,
    caption: row.caption ?? '',
    order: row.order,
  }));
}

/**
 * Hook que expone los bloques de contenido de un proyecto para edición (admin) o visualización (página pública).
 * La query solo se ejecuta cuando projectId está definido y Supabase está configurado.
 * @param projectId - ID del proyecto; si es undefined, la query no se ejecuta
 * @returns blocks, isLoading, error y refetch
 * @example
 * const { blocks, isLoading } = useProjectContent(id);
 * if (isLoading) return <Spinner />;
 * return blocks.map(b => <ContentBlock key={b.id} block={b} />);
 */
export function useProjectContent(projectId: string | undefined) {
  const q = useQuery({
    queryKey: ['project_content', projectId],
    queryFn: () => fetchProjectContent(projectId!),
    enabled: !!projectId && isSupabaseConfigured,
    staleTime: 5 * 60 * 1000,
  });
  return {
    blocks: q.data ?? [],
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
````

## File: src/modules/projects/hooks/useProjectsMeta.ts
````typescript
/**
 * @file useProjectsMeta.ts
 * @description Hook para obtener metadata de proyectos (imagen de fondo, URLs de código y demo, orden)
 * desde la tabla projects_meta de Supabase. Proporciona getMeta y fallbackMeta.
 * Nota: Los datos principales están en cards (useCards); este hook puede usarse como respaldo.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import type { ProjectMetaRow } from '../../../types/supabase';
import { projectMetaFallback } from '../config/project';

export interface ProjectMeta extends Omit<ProjectMetaRow, 'bg_image_path' | 'code_url' | 'demo_url' | 'updated_at'> {
  bgProyect: string;
  codeUrl: string;
  demoUrl: string;
}

/**
 * Obtiene toda la metadata de proyectos desde la tabla projects_meta.
 * @returns Lista ordenada por `order` o null si no hay datos/error
 * @internal
 */
async function fetchProjectsMeta(): Promise<ProjectMeta[] | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('projects_meta')
    .select('*')
    .order('order');
  if (error || !data?.length) return null;
  return (data as ProjectMetaRow[]).map((row) => ({
    id: row.id,
    bgProyect: getStoragePublicUrl(row.bg_image_path) || `/images/bg-proyecto2.jpg`,
    codeUrl: row.code_url,
    demoUrl: row.demo_url,
    order: row.order,
  }));
}

/**
 * Hook que expone la metadata de todos los proyectos con helpers getMeta y fallbackMeta.
 * @returns projectsMeta, getMeta(id), fallbackMeta(id), isLoading, error y refetch
 * @example
 * const { getMeta, fallbackMeta } = useProjectsMeta();
 * const meta = getMeta(projectId) ?? fallbackMeta(projectId);
 * return <header style={{ backgroundImage: `url(${meta.bgProyect})` }} />;
 */
export function useProjectsMeta() {
  const q = useQuery({
    queryKey: ['projects_meta'],
    queryFn: fetchProjectsMeta,
    staleTime: 5 * 60 * 1000,
  });
  const metaMap = (q.data ?? []).reduce<Record<string, ProjectMeta>>((acc, m) => {
    acc[m.id] = m;
    return acc;
  }, {});
  return {
    projectsMeta: q.data ?? [],
    getMeta: (id: string): ProjectMeta | undefined => metaMap[id],
    fallbackMeta: (id: string): ProjectMeta => {
      const p = projectMetaFallback[id];
      return p
        ? { id, bgProyect: p.bgProyect, codeUrl: p.codeUrl, demoUrl: p.demoUrl, order: 0 }
        : { id, bgProyect: '/images/bg-proyecto2.jpg', codeUrl: '', demoUrl: '', order: 0 };
    },
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
````

## File: src/modules/projects/pages/ProjectDetailsPage.tsx
````typescript
import React from "react";
import { useParams } from "react-router-dom";
import { showInfo, hideInfo } from "../../../shared/utils/infoHandler";
import { useCards } from "../hooks/useCards";
import { useProjectContent, type ProjectContentBlock } from "../hooks/useProjectContent";
import { getStoragePublicUrl } from "../../../shared/services/supabase/supabaseStorage";
import DOMPurify from "dompurify";

import { ALLOWED_HTML_TAGS, parseMarkdownToHtml } from "../utils/markdown";

const DynamicContent: React.FC<{ blocks: ProjectContentBlock[] }> = ({ blocks }) => (
    <div className="bg-gray-50 p-4 sm:p-6 md:p-12 space-y-6">
        {blocks.map((block) => {
            if (block.type === 'text' && block.content) {
                const sanitized = DOMPurify.sanitize(block.content, { ALLOWED_TAGS: ALLOWED_HTML_TAGS });
                return (
                    <div
                        key={block.id}
                        className="prose max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: sanitized }}
                    />
                );
            }
            if (block.type === 'image') {
                const src = getStoragePublicUrl(block.content) || block.content;
                return (
                    <figure key={block.id} className="space-y-2">
                        <img
                            src={src}
                            alt={block.caption || ''}
                            className="w-full max-h-[600px] object-contain rounded-xl"
                            loading="lazy"
                        />
                        {block.caption && (
                            <figcaption className="text-sm text-gray-500 text-center">{block.caption}</figcaption>
                        )}
                    </figure>
                );
            }
            if (block.type === 'video') {
                const src = getStoragePublicUrl(block.content) || block.content;
                const isGif = block.content.endsWith('.gif');
                return (
                    <figure key={block.id} className="space-y-2">
                        {isGif ? (
                            <img
                                src={src}
                                alt={block.caption || ''}
                                className="w-full max-h-[600px] object-contain rounded-xl"
                                loading="lazy"
                            />
                        ) : (
                            <video
                                src={src}
                                className="w-full max-h-[600px] rounded-xl"
                                controls
                                muted
                                loop
                                playsInline
                            />
                        )}
                        {block.caption && (
                            <figcaption className="text-sm text-gray-500 text-center">{block.caption}</figcaption>
                        )}
                    </figure>
                );
            }
            return null;
        })}
    </div>
);

const CardDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { cards } = useCards();
    const { blocks, isLoading: contentLoading } = useProjectContent(id);
    const card = cards.find((c) => c.id === id);

    if (!id || !card) {
        return (
            <div className="error-message text-red-500 text-center p-8">
                Caso de Estudio no encontrado
            </div>
        );
    }

    const bgImage = card.bgImage || '/images/bg-proyecto2.jpg';
    const codeUrl = card.codeUrl ?? '';
    const demoUrl = card.demoUrl ?? '';
    const hasDynamicContent = blocks.length > 0;

    return (
        <>
            <header
                className="header h-[80vh] bg-slate-950 bg-opacity-85 flex justify-center items-center relative text-white bg-cover bg-center brightness-75"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="button flex gap-4">
                    <button
                        className="info-btn border-2 px-6 py-2 font-bold relative hover:bg-white hover:text-black transition-colors"
                        onMouseOver={(e) => showInfo(e.currentTarget, "Este botón te lleva al código del proyecto.")}
                        onMouseOut={hideInfo}
                        onClick={() => codeUrl && window.open(codeUrl, "_blank")}
                    >
                        Código
                    </button>
                    <button
                        className="info-btn border-2 border-white px-6 py-2 font-bold relative hover:bg-white hover:text-black transition-colors"
                        onMouseOver={(e) => showInfo(e.currentTarget, "Este botón te lleva a la vista del proyecto.")}
                        onMouseOut={hideInfo}
                        onClick={() => demoUrl && (demoUrl.startsWith('http') ? window.open(demoUrl, "_blank") : window.location.href = demoUrl)}
                    >
                        Ver Proyecto
                    </button>
                </div>
            </header>

            <div className="bg-slate-300 md:mx-6 pb-12">
                <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 pt-8">
                    {/* Caso de Estudio Fixed Narratives */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
                        <section className="space-y-3">
                            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 border-slate-200">
                                Contexto
                            </h2>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                                {card.description}
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 border-slate-200">
                                El Reto
                            </h2>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                                {card.problem_solved || "No especificado."}
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 border-slate-200">
                                Documentación de Arquitectura
                            </h2>
                            <div 
                                className="prose max-w-none text-slate-600 leading-relaxed font-sans"
                                dangerouslySetInnerHTML={{ 
                                    __html: DOMPurify.sanitize(
                                        parseMarkdownToHtml(card.architectural_doc || "No especificada."), 
                                        { ALLOWED_TAGS: ALLOWED_HTML_TAGS }
                                    ) 
                                }}
                            />
                        </section>
                    </div>

                    {/* Dynamic implementation content blocks */}
                    {hasDynamicContent && (
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10">
                            <h2 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200 mb-6">
                                Detalles de la Implementación
                            </h2>
                            <DynamicContent blocks={blocks} />
                        </div>
                    )}

                    {contentLoading && (
                        <div className="flex items-center justify-center py-16">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CardDetails;
````

## File: src/modules/projects/admin/AdminProjectsCRUD.tsx
````typescript
import React, { useState, useCallback } from 'react';
import { useAdminProjects, emptyForm, ProjectForm } from '../hooks/useAdminProjects';
import { ProjectFormModal } from './ProjectFormModal';

export const AdminProjects: React.FC = () => {
  const {
    list,
    isLoading,
    saving,
    deletingId,
    error,
    setError,
    handleSave,
    handleDelete,
    moveProject,
  } = useAdminProjects();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const openCreate = useCallback(() => {
    setEditingId(null);
    setForm({ ...emptyForm, order: list.length + 1 });
    setError(null);
    setModalOpen(true);
  }, [list.length, setError]);

  const openEdit = useCallback((id: string) => {
    const card = list.find((c) => c.id === id);
    if (!card) return;
    setEditingId(id);
    setForm({
      title: card.title,
      description: card.description,
      buttonText: card.buttonText ?? 'Ver más...',
      codeUrl: card.codeUrl ?? '',
      demoUrl: card.demoUrl ?? '',
      order: card.order ?? 0,
      problemSolved: card.problem_solved ?? '',
      architecturalDoc: card.architectural_doc ?? '',
      category: card.category ?? 'Full Stack',
      tags: Array.isArray(card.tags) ? card.tags.join(', ') : '',
      imagePath: card.img ?? '',
      bgImagePath: card.bgImage ?? '',
    });
    setError(null);
    setModalOpen(true);
  }, [list, setError]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  }, [setError]);

  const placeholderImg =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="80" fill="%23334155"%3E%3Crect width="120" height="80" rx="8"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="12"%3ESin imagen%3C/text%3E%3C/svg%3E';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Proyectos</h2>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium
                     hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/20
                     active:scale-95 flex items-center gap-2 w-fit"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo proyecto
        </button>
      </div>

      {/* Loading */}
      {isLoading && list.length === 0 && (
        <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400">Cargando proyectos...</span>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && list.length === 0 && (
        <div className="text-center py-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-slate-400 text-lg">No hay proyectos todavía</p>
          <p className="text-slate-500 text-sm mt-1">Crea tu primer proyecto con el botón de arriba</p>
        </div>
      )}

      {/* Project grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...list]
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((card, idx) => (
          <div
            key={card.id}
            className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10
                       overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
          >
            {/* Card image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={card.img || placeholderImg}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).src = placeholderImg; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Order badge */}
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm
                               text-xs font-medium text-white/80 border border-white/10">
                #{card.order ?? idx + 1}
              </span>

              {/* Reorder buttons */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => moveProject(card.id, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10
                             text-white/70 hover:text-white hover:bg-black/60 disabled:opacity-30
                             disabled:cursor-not-allowed transition-all"
                  title="Subir"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveProject(card.id, 'down')}
                  disabled={idx === list.length - 1}
                  className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10
                             text-white/70 hover:text-white hover:bg-black/60 disabled:opacity-30
                             disabled:cursor-not-allowed transition-all"
                  title="Bajar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Card content */}
            <div className="p-4 space-y-3">
              <h3 className="text-lg font-semibold text-white truncate">{card.title}</h3>
              <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{card.description}</p>

              {/* URLs */}
              <div className="space-y-1">
                {card.codeUrl && (
                  <a
                    href={card.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 truncate transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    {card.codeUrl}
                  </a>
                )}
                {card.demoUrl && (
                  <a
                    href={card.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 truncate transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {card.demoUrl}
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => openEdit(card.id)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10
                             text-sm text-white/80 hover:bg-white/10 hover:text-white
                             transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </button>
                {confirmDeleteId === card.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(card.id, () => setConfirmDeleteId(null))}
                      disabled={deletingId === card.id}
                      className="px-3 py-2 rounded-xl bg-red-500/20 border border-red-500/30
                                 text-sm text-red-400 hover:bg-red-500/30 transition-all duration-200
                                 disabled:opacity-50"
                    >
                      {deletingId === card.id ? '...' : 'Sí'}
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-3 py-2 rounded-xl bg-white/5 border border-white/10
                                 text-sm text-slate-400 hover:bg-white/10 transition-all duration-200"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(card.id)}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/10
                               text-sm text-red-400/70 hover:bg-red-500/10 hover:text-red-400
                               hover:border-red-500/20 transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        initialForm={form}
        editingId={editingId}
        onSave={handleSave}
        saving={saving}
        error={error}
        setError={setError}
        cards={list}
      />
    </div>
  );
};
````

## File: src/modules/projects/components/ProjectCard.tsx
````typescript
import React, { useRef, useEffect } from "react";
import { CardProps } from "../../../types/types";
import { handleMouseMove, resetCardPosition } from "../../../shared/utils/cardAnimations";
import { useNavigate } from "react-router-dom";

/**
 * Componente de tarjeta interactiva con efectos de movimiento y navegación
 * @component
 * @param {CardProps} props - Propiedades del componente
 * @param {string} props.id - Identificador único del proyecto
 * @param {string} props.img - URL de la imagen de fondo
 * @param {string} props.title - Título de la tarjeta
 * @param {string} props.description - Descripción corta del proyecto
 * @param {string} props.buttonText - Texto del botón de acción
 * @returns {JSX.Element} Tarjeta interactiva con efecto parallax y navegación
 * 
 * @example
 * <Card
 *   id="proyecto-1"
 *   img="/imagen.jpg"
 *   title="Mi Proyecto"
 *   description="Descripción detallada"
 *   buttonText="Ver demo"
 * />
 */
const Card: React.FC<CardProps> = ({ id, img, title, description, buttonText }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  /**
   * Efecto para configurar interacciones de movimiento
   * @effect
   * @description Configura los listeners de eventos para las animaciones
   * - Movimiento del mouse: Aplica efecto parallax
   * - Salida del mouse: Restablece posición
   * - Limpieza automática al desmontar el componente
   */
  const handleMouseMoveEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    // ponytail: usamos e.nativeEvent porque handleMouseMove espera MouseEvent nativo
    if (cardRef.current && contentRef.current) {
      handleMouseMove(e.nativeEvent, cardRef.current, contentRef.current, 1.15);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && contentRef.current) {
      resetCardPosition(cardRef.current, contentRef.current);
    }
  };

  /**
   * Maneja la navegación a la página de demo
   * @function handleNavigation
   * @description Navega a la ruta del proyecto y hace scroll suave al inicio
   */
  const handleNavigation = () => {
    navigate(`/page/${id}`);
    window.scrollTo({ 
      top: -80, // Scroll al inicio de la página
      behavior: "smooth" // Efecto de scroll suave
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMoveEvent}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-xl transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl h-72 cursor-pointer group"
      role="article"
      aria-label={`Tarjeta del proyecto: ${title}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform" // Optimización para animaciones
      }}
    >
      {/* Imagen con efecto de profundidad */}
      {img && (
        <img
          src={img}
          alt={`Visualización del proyecto ${title}`}
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
          loading="lazy" 
          decoding="async" 
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}

      {/* Contenido con efecto de flotación */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-between transform-gpu"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            {title}
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Botón con feedback interactivo */}
        <button
          onClick={handleNavigation}
          className="w-fit px-6 py-3 rounded-lg bg-white/5 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl text-white/90 font-medium transition-all duration-300 flex items-center gap-2 hover:bg-white/10 hover:border-white/30 hover:text-white active:scale-95"
          aria-label={`Ver demo del proyecto: ${title}`}
        >
          <span>{buttonText}</span>
          <span className="opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-transform">
            →
          </span>
        </button>
      </div>
    </div>
  );
};

export default Card;

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT que implementa una tarjeta interactiva
// con efectos de parallax y navegación. Es un ejemplo perfecto de cómo crear
// componentes reutilizables con animaciones avanzadas y buena documentación.
// Te explico paso a paso qué hace cada parte:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente de tarjeta que muestra información de proyectos con
// efectos visuales interactivos. Combina parallax, navegación, y optimizaciones
// de rendimiento para crear una experiencia de usuario atractiva.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-4):
//    - React: useRef, useEffect para manejo de estado y referencias
//    - CardProps: Interface TypeScript importada desde types
//    - cardAnimations: Funciones utilitarias para animaciones
//    - useNavigate: Hook de React Router para navegación
//    - ¿Por qué esta estructura? Separación clara de responsabilidades
//
// 2. DOCUMENTACIÓN JSDOC (líneas 6-25):
//    - @component: Marca el componente
//    - @param: Documenta cada prop con tipo y descripción
//    - @returns: Describe el elemento JSX retornado
//    - @example: Ejemplo de uso del componente
//    - ¿Por qué JSDoc? Mejora la experiencia de desarrollo y documentación
//
// 3. COMPONENTE PRINCIPAL (líneas 26-29):
//    - Card: Componente funcional tipado con CardProps
//    - Destructuring: Extrae todas las props necesarias
//    - Refs: cardRef y contentRef para animaciones
//    - navigate: Hook para navegación programática
//    - ¿Por qué destructuring? Código más limpio y legible
//
// 4. CONFIGURACIÓN DE ANIMACIONES (líneas 39-59):
//    - useEffect: Configura event listeners al montar
//    - Verificación: if (!card || !content) return para seguridad
//    - sensitivity: 1.15 para controlar la intensidad del efecto
//    - optimizedMouseMove: Función optimizada para el evento
//    - Event listeners: mousemove y mouseleave
//    - Cleanup: Remueve listeners al desmontar
//    - ¿Por qué cleanup? Previene memory leaks
//
// 5. FUNCIÓN DE NAVEGACIÓN (líneas 66-69):
//    - handleNavigation: Función para navegar a la página del proyecto
//    - navigate(`/page/${id}`): Navegación a la página del proyecto
//    - window.scrollTo(): Scroll suave al inicio de la página
//    - ¿Por qué scroll? Mejora la experiencia de usuario
//
// 6. RENDER PRINCIPAL (líneas 71-118):
//    - div contenedor: Elemento principal con ref y estilos
//    - Imagen: Fondo con efecto de profundidad
//    - Contenido: Título, descripción y botón
//    - Botón: Con feedback interactivo y navegación
//
// 🎨 CONCEPTOS DE DISEÑO:
//
// 1. PARALLAX EFFECT:
//    - handleMouseMove: Función externa para efecto parallax
//    - sensitivity: Controla la intensidad del movimiento
//    - resetCardPosition: Restablece la posición al salir
//    - ¿Por qué parallax? Crea sensación de profundidad
//
// 2. VISUAL LAYERING:
//    - Imagen: Fondo con opacity 40%, aumenta a 50% en hover
//    - Contenido: z-10 para estar sobre la imagen
//    - Botón: Feedback visual con hover y active states
//    - ¿Por qué capas? Crea profundidad visual
//
// 3. INTERACTIVE FEEDBACK:
//    - hover:scale-[1.02]: Escala sutil en hover
//    - hover:shadow-2xl: Sombra más intensa
//    - active:scale-95: Feedback al hacer click
//    - ¿Por qué feedback? Mejora la experiencia de usuario
//
// ⚡ OPTIMIZACIONES DE RENDIMIENTO:
//
// 1. CSS OPTIMIZATIONS:
//    - transformStyle: "preserve-3d": Optimiza transformaciones 3D
//    - willChange: "transform": Indica al navegador que optimice
//    - transform-gpu: Fuerza aceleración por hardware
//    - ¿Por qué optimizaciones? Mejor rendimiento en animaciones
//
// 2. IMAGE OPTIMIZATION:
//    - loading="lazy": Carga diferida de imágenes
//    - decoding="async": Decodificación asíncrona
//    - object-cover: Mantiene proporciones
//    - ¿Por qué lazy loading? Mejora el tiempo de carga inicial
//
// 3. EVENT OPTIMIZATION:
//    - optimizedMouseMove: Función optimizada
//    - Cleanup automático: Previene memory leaks
//    - Event delegation: Un solo listener por evento
//    - ¿Por qué optimización? Mejor rendimiento general
//
// 🎯 PATRONES APLICADOS:
//
// 1. COMPONENT COMPOSITION:
//    - Props tipadas: CardProps interface
//    - Reutilización: Componente genérico para cualquier proyecto
//    - Separación: Lógica de animación en utils
//    - ¿Por qué composición? Mejor mantenibilidad
//
// 2. ACCESSIBILITY:
//    - role="article": Indica que es un artículo
//    - aria-label: Descripción para lectores de pantalla
//    - alt text: Descripción de la imagen
//    - ¿Por qué accesibilidad? Inclusión para todos los usuarios
//
// 3. RESPONSIVE DESIGN:
//    - Tailwind classes: Responsive por defecto
//    - h-72: Altura fija para consistencia
//    - flex layout: Adaptable a diferentes contenidos
//    - ¿Por qué responsive? Funciona en todos los dispositivos
//
// 🚀 FLUJO DE INTERACCIÓN:
// 1. Usuario mueve el mouse sobre la tarjeta
// 2. handleMouseMove aplica efecto parallax
// 3. La imagen y contenido se mueven independientemente
// 4. Al salir del mouse, resetCardPosition restablece la posición
// 5. Al hacer click en el botón, handleNavigation navega a la página
// 6. window.scrollTo hace scroll suave al inicio
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Component composition patterns
// - Parallax effects con JavaScript
// - Performance optimization
// - Accessibility patterns
// - Event handling y cleanup
// - TypeScript interfaces
// - JSDoc documentation
// - Responsive design
//
// ¡Es un ejemplo excelente de cómo crear componentes reutilizables y bien documentados!
// ===========================================
````
