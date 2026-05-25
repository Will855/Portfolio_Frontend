import React, { useState, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { supabase } from '../../../shared/services/supabase/supabase';
import { useCards } from '../hooks/useCards';
import { STORAGE_BUCKET } from '../../../types/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import { ALLOWED_HTML_TAGS, parseMarkdownToHtml } from '../utils/markdown';

interface ProjectForm {
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
}

const emptyForm: ProjectForm = {
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
};

export const AdminProjects: React.FC = () => {
  const { cards, isLoading } = useCards();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [cardImage, setCardImage] = useState<File | null>(null);
  const [bgImage, setBgImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const list = Array.isArray(cards) ? cards : [];

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

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
    const currentValue = form.architecturalDoc;

    const selectedText = currentValue.substring(start, end);
    const textToInsert = selectedText || defaultText;

    const before = currentValue.substring(0, start);
    const after = currentValue.substring(end);

    const newValue = before + prefix + textToInsert + suffix + after;

    setForm((f) => ({ ...f, architecturalDoc: newValue }));

    // Refocus and set selection range
    setTimeout(() => {
      textarea.focus();
      const newStart = start + prefix.length;
      const newEnd = newStart + textToInsert.length;
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  }, [form.architecturalDoc]);

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
        setForm((f) => ({ ...f, architecturalDoc: text }));
      }
    };
    reader.onerror = () => {
      setError('Error al leer el archivo markdown.');
    };
    reader.readAsText(file);

    // Clear input value so same file can be reloaded if changed
    e.target.value = '';
  }, []);


  const openCreate = useCallback(() => {
    setEditingId(null);
    setForm({ ...emptyForm, order: list.length + 1 });
    setCardImage(null);
    setBgImage(null);
    setError(null);
    setModalOpen(true);
  }, [list.length]);

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
    });
    setCardImage(null);
    setBgImage(null);
    setError(null);
    setModalOpen(true);
  }, [list]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setCardImage(null);
    setBgImage(null);
    setError(null);
  }, []);

  const uploadFile = async (file: File, folder: string, id: string): Promise<string> => {
    const ext = file.name.split('.').pop() || 'webp';
    const path = `${folder}/${id}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: true });
    if (uploadError) throw uploadError;
    return path;
  };

  const handleSave = async () => {
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

        let imagePath = '';
        let bgImagePath = '';

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
      closeModal();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
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
      setConfirmDeleteId(null);
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
                      onClick={() => handleDelete(card.id)}
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

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
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
                onClick={closeModal}
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

              {/* Architectural Doc */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-300">Documentación Arquitectónica (Soporta Markdown) *</label>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                    <strong>⚠️ Aviso de seguridad:</strong> No expongas contraseñas, claves de API, credenciales ni información sensible en este documento.
                  </div>
                </div>

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
                      value={form.architecturalDoc}
                      onChange={(e) => setForm((f) => ({ ...f, architecturalDoc: e.target.value }))}
                      onScroll={handleScroll}
                      className="w-full h-[220px] md:h-[280px] px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                                 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                                 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none font-mono text-sm overflow-y-auto"
                      placeholder="### Arquitectura de la Solución..."
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
                          parseMarkdownToHtml(form.architecturalDoc || '_Escribe en el editor o carga un archivo .md para previsualizar_'),
                          { ALLOWED_TAGS: ALLOWED_HTML_TAGS }
                        )
                      }}
                    />
                  </div>
                </div>
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
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-300">Imagen de card</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCardImage(e.target.files?.[0] ?? null)}
                      className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                                 file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                                 file:font-medium file:cursor-pointer hover:file:bg-white/15
                                 file:transition-all cursor-pointer"
                    />
                  </div>
                  {cardImage && (
                    <p className="text-xs text-emerald-400 truncate">{cardImage.name}</p>
                  )}
                  {editingId && !cardImage && (
                    <p className="text-xs text-slate-500">Imagen actual se mantiene si no seleccionas otra</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-300">Imagen de fondo</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBgImage(e.target.files?.[0] ?? null)}
                      className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                                 file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                                 file:font-medium file:cursor-pointer hover:file:bg-white/15
                                 file:transition-all cursor-pointer"
                    />
                  </div>
                  {bgImage && (
                    <p className="text-xs text-emerald-400 truncate">{bgImage.name}</p>
                  )}
                  {editingId && !bgImage && (
                    <p className="text-xs text-slate-500">Fondo actual se mantiene si no seleccionas otro</p>
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
                    {(cardImage || (editingId && list.find((c) => c.id === editingId)?.img)) && (
                      <img
                        src={cardImage ? URL.createObjectURL(cardImage) : list.find((c) => c.id === editingId)?.img}
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
            </div>

            {/* Modal footer */}
            <div className="sticky bottom-0 flex justify-end gap-3 p-6 pt-4
                            bg-slate-900/80 backdrop-blur-xl border-t border-white/5">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10
                           text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                           text-white font-medium hover:from-blue-500 hover:to-blue-400
                           transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50
                           disabled:cursor-not-allowed active:scale-95 flex items-center gap-2"
              >
                {saving && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {saving ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear proyecto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
