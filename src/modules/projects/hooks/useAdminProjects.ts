'use client';

import { useState } from 'react';
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
