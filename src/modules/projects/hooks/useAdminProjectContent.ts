"use client";

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
  const [syncedProjectId, setSyncedProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (syncedProjectId !== projectId) {
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
      setSyncedProjectId(projectId);
    }
  }, [blocks, isLoading, projectId, syncedProjectId]);

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
      setSyncedProjectId(null);
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
