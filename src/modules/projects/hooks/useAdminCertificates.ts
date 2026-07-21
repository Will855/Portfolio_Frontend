import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../shared/services/supabase/supabase';
import { STORAGE_BUCKET } from '../../../types/supabase';
import { useCertificates } from './useCertificates';

export interface CertificateForm {
  title: string;
  issuer: string;
  provider: string;
  description: string;
  statusBadge: string;
  typeBadge: string;
  tags: string;
  imagePath: string;
  order: number;
}

export const emptyCertificateForm: CertificateForm = {
  title: '',
  issuer: '',
  provider: '',
  description: '',
  statusBadge: '',
  typeBadge: '',
  tags: '',
  imagePath: '',
  order: 0,
};

export function useAdminCertificates() {
  const { certificates, isLoading } = useCertificates();
  const queryClient = useQueryClient();

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const list = Array.isArray(certificates) ? certificates : [];

  const uploadFile = async (file: File, folder: string, id: string): Promise<string> => {
    const ext = file.name.split('.').pop() || 'png';
    const path = `${folder}/${id}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: true });
    if (uploadError) throw uploadError;
    return path;
  };

  const handleSave = async (
    form: CertificateForm,
    editingId: string | null,
    certificateImage: File | null,
    onSuccess: () => void
  ) => {
    if (!form.title.trim() || !form.issuer.trim() || !form.description.trim()) {
      setError('Título, emisor y descripción son obligatorios.');
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
          issuer: form.issuer.trim(),
          provider: form.provider.trim(),
          description: form.description.trim(),
          status_badge: form.statusBadge.trim(),
          type_badge: form.typeBadge.trim(),
          tags: processedTags,
          order: form.order,
          image_path: form.imagePath.trim(),
          updated_at: new Date().toISOString(),
        };

        if (certificateImage) {
          updates.image_path = await uploadFile(certificateImage, 'certificates', editingId);
        }

        const { error: dbError } = await supabase
          .from('certificates')
          .update(updates)
          .eq('id', editingId);
        if (dbError) throw dbError;
      } else {
        const nextId = crypto.randomUUID();

        let imagePath = form.imagePath.trim();

        if (certificateImage) {
          imagePath = await uploadFile(certificateImage, 'certificates', nextId);
        }

        const { error: dbError } = await supabase.from('certificates').insert({
          id: nextId,
          title: form.title.trim(),
          issuer: form.issuer.trim(),
          provider: form.provider.trim(),
          description: form.description.trim(),
          status_badge: form.statusBadge.trim(),
          type_badge: form.typeBadge.trim(),
          tags: processedTags,
          order: form.order,
          image_path: imagePath,
        });
        if (dbError) throw dbError;
      }

      queryClient.invalidateQueries({ queryKey: ['certificates'] });
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
      const { error: dbError } = await supabase.from('certificates').delete().eq('id', id);
      if (dbError) throw dbError;

      // Intentar borrar extensiones comunes
      await supabase.storage.from(STORAGE_BUCKET).remove([
        `certificates/${id}.png`,
        `certificates/${id}.jpg`,
        `certificates/${id}.jpeg`,
        `certificates/${id}.webp`,
      ]);

      queryClient.invalidateQueries({ queryKey: ['certificates'] });
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeletingId(null);
      onSettled();
    }
  };

  const moveCertificate = async (id: string, direction: 'up' | 'down') => {
    const sorted = [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const idx = sorted.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const current = sorted[idx];
    const swap = sorted[swapIdx];

    await Promise.all([
      supabase.from('certificates').update({ order: swap.order ?? swapIdx, updated_at: new Date().toISOString() }).eq('id', current.id),
      supabase.from('certificates').update({ order: current.order ?? idx, updated_at: new Date().toISOString() }).eq('id', swap.id),
    ]);
    queryClient.invalidateQueries({ queryKey: ['certificates'] });
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
    moveCertificate,
  };
}
