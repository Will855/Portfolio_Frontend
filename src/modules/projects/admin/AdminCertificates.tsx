'use client';

import React, { useState, useCallback } from 'react';
import { useAdminCertificates, emptyCertificateForm, CertificateForm } from '../hooks/useAdminCertificates';
import { CertificateFormModal } from './CertificateFormModal';

export const AdminCertificates: React.FC = () => {
  const {
    list,
    isLoading,
    saving,
    deletingId,
    error,
    setError,
    handleSave,
    handleDelete,
    moveCertificate,
  } = useAdminCertificates();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CertificateForm>(emptyCertificateForm);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const openCreate = useCallback(() => {
    setEditingId(null);
    setForm({ ...emptyCertificateForm, order: list.length + 1 });
    setError(null);
    setModalOpen(true);
  }, [list.length, setError]);

  const openEdit = useCallback((id: string) => {
    const cert = list.find((c) => c.id === id);
    if (!cert) return;
    setEditingId(id);
    setForm({
      title: cert.title,
      issuer: cert.issuer,
      provider: cert.provider,
      description: cert.description,
      statusBadge: cert.status_badge,
      typeBadge: cert.type_badge,
      tags: Array.isArray(cert.tags) ? cert.tags.join(', ') : '',
      imagePath: cert.img ?? '',
      order: cert.order ?? 0,
    });
    setError(null);
    setModalOpen(true);
  }, [list, setError]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyCertificateForm);
    setError(null);
  }, [setError]);

  const placeholderImg =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="80" fill="%23334155"%3E%3Crect width="120" height="80" rx="8"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="12"%3ESin imagen%3C/text%3E%3C/svg%3E';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Certificados</h2>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium
                     hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/20
                     active:scale-95 flex items-center gap-2 w-fit"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo certificado
        </button>
      </div>

      {/* Loading */}
      {isLoading && list.length === 0 && (
        <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400">Cargando certificados...</span>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && list.length === 0 && (
        <div className="text-center py-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-slate-400 text-lg">No hay certificados todavía</p>
          <p className="text-slate-500 text-sm mt-1">Crea tu primer certificado con el botón de arriba</p>
        </div>
      )}

      {/* Certificates grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...list]
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((cert, idx) => (
          <div
            key={cert.id}
            className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10
                       overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] flex flex-col"
          >
            {/* Card image */}
            <div className="relative h-40 overflow-hidden shrink-0">
              <img
                src={cert.img || placeholderImg}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).src = placeholderImg; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Order badge */}
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm
                               text-xs font-medium text-white/80 border border-white/10">
                #{cert.order ?? idx + 1}
              </span>

              {/* Reorder buttons */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => moveCertificate(cert.id, 'up')}
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
                  onClick={() => moveCertificate(cert.id, 'down')}
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
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex gap-2 mb-2">
                  {cert.type_badge && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded uppercase tracking-wider">
                      {cert.type_badge}
                    </span>
                  )}
                  {cert.status_badge && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded uppercase tracking-wider">
                      {cert.status_badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white leading-tight mb-1">{cert.title}</h3>
                <p className="text-xs text-slate-400 mb-2">{cert.issuer} • {cert.provider}</p>
                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-3">{cert.description}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-white/5 shrink-0">
                <button
                  onClick={() => openEdit(cert.id)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10
                             text-sm text-white/80 hover:bg-white/10 hover:text-white
                             transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </button>
                {confirmDeleteId === cert.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(cert.id, () => setConfirmDeleteId(null))}
                      disabled={deletingId === cert.id}
                      className="px-3 py-2 rounded-xl bg-red-500/20 border border-red-500/30
                                 text-sm text-red-400 hover:bg-red-500/30 transition-all duration-200
                                 disabled:opacity-50"
                    >
                      {deletingId === cert.id ? '...' : 'Sí'}
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
                    onClick={() => setConfirmDeleteId(cert.id)}
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

      <CertificateFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        initialForm={form}
        editingId={editingId}
        onSave={handleSave}
        saving={saving}
        error={error}
        setError={setError}
      />
    </div>
  );
};
