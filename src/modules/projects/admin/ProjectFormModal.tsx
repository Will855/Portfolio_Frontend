'use client';

import React, { useState, useEffect } from 'react';
import { ProjectForm } from '../hooks/useAdminProjects';
import { MarkdownEditor } from './MarkdownEditor';
import { TagInput } from './TagInput';
import { CardProps } from '../../../types/types';
import { Input } from '../../../shared/components/Input';
import { Textarea } from '../../../shared/components/Textarea';

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
  const [sec3_1, setSec3_1] = useState('');
  const [sec3_2, setSec3_2] = useState('');
  const [sec4, setSec4] = useState('');
  const [sec5, setSec5] = useState('');
  const [sec6, setSec6] = useState('');

  useEffect(() => {
    setForm(initialForm);
    setCardImage(null);
    setBgImage(null);
    setError(null);

    // Parse architecturalDoc into individual sections
    const doc = initialForm.architecturalDoc || '';
    const h3_1 = '### 3.1 Patrones Arquitectónicos';
    const h3_2 = '### 3.2 Patrones de Diseño';
    const h4 = '## 4. Flujo de Datos y Componentes Principales';
    const h5 = '## 5. Consideraciones de Seguridad y Buenas Prácticas';
    const h6 = '## 6. Despliegue e Infraestructura CI/CD';

    const extract = (startH: string, endHList: string[]) => {
      const idx = doc.indexOf(startH);
      if (idx === -1) return '';
      const start = idx + startH.length;
      let minEnd = doc.length;
      for (const endH of endHList) {
        const eIdx = doc.indexOf(endH, start);
        if (eIdx !== -1 && eIdx < minEnd) minEnd = eIdx;
      }
      return doc.substring(start, minEnd).trim();
    };

    const allHeaders = [h3_1, h3_2, h4, h5, h6];
    const hasHeaders = allHeaders.some((h) => doc.includes(h));

    if (!hasHeaders && doc.trim()) {
      setSec3_1(doc.trim());
      setSec3_2('');
      setSec4('');
      setSec5('');
      setSec6('');
    } else {
      setSec3_1(extract(h3_1, [h3_2, h4, h5, h6]));
      setSec3_2(extract(h3_2, [h4, h5, h6]));
      setSec4(extract(h4, [h5, h6]));
      setSec5(extract(h5, [h6]));
      setSec6(extract(h6, []));
    }
  }, [initialForm, isOpen, setError]);

  const updateArchitecturalDoc = (
    s3_1: string,
    s3_2: string,
    s4: string,
    s5: string,
    s6: string
  ) => {
    const parts: string[] = [];
    if (s3_1.trim() || s3_2.trim()) {
      let p3 = `## 3. Patrones Arquitectónicos y de Diseño`;
      if (s3_1.trim()) p3 += `\n\n### 3.1 Patrones Arquitectónicos\n${s3_1.trim()}`;
      if (s3_2.trim()) p3 += `\n\n### 3.2 Patrones de Diseño\n${s3_2.trim()}`;
      parts.push(p3);
    }
    if (s4.trim()) parts.push(`## 4. Flujo de Datos y Componentes Principales\n\n${s4.trim()}`);
    if (s5.trim()) parts.push(`## 5. Consideraciones de Seguridad y Buenas Prácticas\n\n${s5.trim()}`);
    if (s6.trim()) parts.push(`## 6. Despliegue e Infraestructura CI/CD\n\n${s6.trim()}`);

    const combined = parts.join('\n\n');
    setForm((f) => ({ ...f, architecturalDoc: combined }));
  };

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
          <Input
            label="Título *"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Nombre del proyecto"
          />

          {/* Description */}
          <Textarea
            label="Descripción *"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={3}
            placeholder="Breve descripción del proyecto"
          />

          {/* Category & Tags Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block mb-2 font-medium transition-colors duration-300 origin-left text-slate-200">Categoría *</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10
                           text-white focus:outline-none focus:border-blue-400/50
                           transition-all cursor-pointer backdrop-blur-sm"
              >
                <option value="Frontend" className="bg-slate-900">Frontend</option>
                <option value="Backend" className="bg-slate-900">Backend</option>
                <option value="Automatizaciones AI" className="bg-slate-900">Automatizaciones AI</option>
                <option value="Full Stack" className="bg-slate-900">Full Stack</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block mb-2 font-medium transition-colors duration-300 origin-left text-slate-200">Etiquetas (separadas por comas)</label>
              <TagInput
                value={form.tags}
                onChange={(val) => setForm((f) => ({ ...f, tags: val }))}
                placeholder="react, typescript, supabase"
              />
            </div>
          </div>

          {/* Problem Solved */}
          <Textarea
            label="¿Qué problema resuelve? *"
            value={form.problemSolved}
            onChange={(e) => setForm((f) => ({ ...f, problemSolved: e.target.value }))}
            rows={3}
            placeholder="Explica qué problema específico resuelve este proyecto..."
          />

          {/* Documentación Arquitectónica Dividida por Secciones */}
          <div className="space-y-6 pt-2 border-t border-white/10">
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                Documentación Técnica de Arquitectura
              </h4>
              <p className="text-xs text-slate-400">
                Cada sección es opcional. Si la dejas vacía, no se mostrará en el portafolio público.
              </p>
            </div>

            {/* Sección 3.1 */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="block text-sm font-semibold text-blue-400">
                ### 3.1 Patrones Arquitectónicos
              </label>
              <MarkdownEditor
                value={sec3_1}
                onChange={(val) => {
                  setSec3_1(val);
                  updateArchitecturalDoc(val, sec3_2, sec4, sec5, sec6);
                }}
                placeholder="Ej: Monolito modular, microservicios, arquitectura limpia..."
              />
            </div>

            {/* Sección 3.2 */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="block text-sm font-semibold text-blue-400">
                ### 3.2 Patrones de Diseño
              </label>
              <MarkdownEditor
                value={sec3_2}
                onChange={(val) => {
                  setSec3_2(val);
                  updateArchitecturalDoc(sec3_1, val, sec4, sec5, sec6);
                }}
                placeholder="Ej: Singleton, Factory, Repository, Observer, Custom Hooks..."
              />
            </div>

            {/* Sección 4 */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="block text-sm font-semibold text-purple-400">
                ## 4. Flujo de Datos y Componentes Principales
              </label>
              <MarkdownEditor
                value={sec4}
                onChange={(val) => {
                  setSec4(val);
                  updateArchitecturalDoc(sec3_1, sec3_2, val, sec5, sec6);
                }}
                placeholder="Describe el flujo de la información, estado global, diagramas Mermaid o APIs..."
              />
            </div>

            {/* Sección 5 */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="block text-sm font-semibold text-emerald-400">
                ## 5. Consideraciones de Seguridad y Buenas Prácticas
              </label>
              <MarkdownEditor
                value={sec5}
                onChange={(val) => {
                  setSec5(val);
                  updateArchitecturalDoc(sec3_1, sec3_2, sec4, val, sec6);
                }}
                placeholder="Ej: Sanitización de entradas, Row Level Security (RLS), JWT/Cookies, HTTPS..."
              />
            </div>

            {/* Sección 6 */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="block text-sm font-semibold text-amber-400">
                ## 6. Despliegue e Infraestructura CI/CD
              </label>
              <MarkdownEditor
                value={sec6}
                onChange={(val) => {
                  setSec6(val);
                  updateArchitecturalDoc(sec3_1, sec3_2, sec4, sec5, val);
                }}
                placeholder="Ej: Vercel, Docker, GitHub Actions, Supabase Cloud..."
              />
            </div>
          </div>

          {/* Button text */}
          <Input
            label="Texto del botón"
            value={form.buttonText}
            onChange={(e) => setForm((f) => ({ ...f, buttonText: e.target.value }))}
            placeholder="Ver más..."
          />

          {/* URLs row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="URL del código"
              value={form.codeUrl}
              onChange={(e) => setForm((f) => ({ ...f, codeUrl: e.target.value }))}
              placeholder="https://github.com/..."
            />
            <Input
              label="URL del demo"
              value={form.demoUrl}
              onChange={(e) => setForm((f) => ({ ...f, demoUrl: e.target.value }))}
              placeholder="https://..."
            />
          </div>

          {/* Images row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <label className="block text-sm font-medium text-slate-300">Imagen de card</label>
              <Input
                label="Ruta o URL de imagen"
                value={form.imagePath}
                onChange={(e) => setForm((f) => ({ ...f, imagePath: e.target.value }))}
                placeholder="Ej: cards/proyecto.webp o https://..."
              />
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
              <Input
                label="Ruta o URL de fondo"
                value={form.bgImagePath}
                onChange={(e) => setForm((f) => ({ ...f, bgImagePath: e.target.value }))}
                placeholder="Ej: projects-bg/fondo.jpg o https://..."
              />
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
          <div className="w-1/2">
            <Input
              label="Orden"
              type="number"
              min={0}
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))}
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
