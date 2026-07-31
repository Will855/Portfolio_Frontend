'use client';

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
