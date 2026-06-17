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
