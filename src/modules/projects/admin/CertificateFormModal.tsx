import React, { useState, useEffect, useRef } from 'react';
import type { CertificateForm } from '../hooks/useAdminCertificates';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialForm: CertificateForm;
  editingId: string | null;
  onSave: (form: CertificateForm, editingId: string | null, imageFile: File | null, onSuccess: () => void) => Promise<void>;
  saving: boolean;
  error: string | null;
  setError: (err: string | null) => void;
}

export const CertificateFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialForm,
  editingId,
  onSave,
  saving,
  error,
  setError,
}) => {
  const [form, setForm] = useState<CertificateForm>(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(initialForm);
    setImageFile(null);
    setPreviewUrl(initialForm.imagePath);
    setError(null);
  }, [initialForm, isOpen, setError]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-3xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h3 className="text-xl font-bold text-white">
            {editingId ? 'Editar Certificado' : 'Nuevo Certificado'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Título del certificado</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="Ej: Google Cloud Associate..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Emisor</label>
                  <input
                    type="text"
                    value={form.issuer}
                    onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="Ej: Google Cloud"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Distribuidor</label>
                  <input
                    type="text"
                    value={form.provider}
                    onChange={(e) => setForm({ ...form, provider: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="Ej: Coursera"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Estado (Badge)</label>
                  <input
                    type="text"
                    value={form.statusBadge}
                    onChange={(e) => setForm({ ...form, statusBadge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="Ej: En Preparación"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Tipo (Badge)</label>
                  <input
                    type="text"
                    value={form.typeBadge}
                    onChange={(e) => setForm({ ...form, typeBadge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="Ej: Certificación"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Etiquetas (Tags, separadas por coma)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="GCP, Kubernetes, IAM"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Descripción</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all h-32 resize-none custom-scrollbar"
                  placeholder="Describe brevemente el certificado..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Imagen del Certificado
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 rounded-xl border-2 border-dashed border-white/20 bg-black/20
                           hover:bg-white/5 hover:border-blue-500/50 transition-all duration-300
                           flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  {previewUrl ? (
                    <>
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm font-medium">Cambiar imagen</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <svg className="w-8 h-8 mx-auto text-slate-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-slate-400">Clic o arrastra la imagen aquí</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-white/10 bg-black/20 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(form, editingId, imageFile, onClose)}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Guardando...
              </>
            ) : 'Guardar certificado'}
          </button>
        </div>
      </div>
    </div>
  );
};
