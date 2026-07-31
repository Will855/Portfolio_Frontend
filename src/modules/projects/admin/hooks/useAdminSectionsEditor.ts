"use client";

import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../../shared/services/supabase/supabase';
import type { InfoSectionRow } from '../../../../types/supabase';

export type SectionType = 'skill' | 'knowledge';
export type ColorOption = 'blue' | 'purple' | 'green';
export type EditableSectionItem = string | { title: string; body: string };

export interface EditableSection {
  id: string | null;
  title: string;
  color: ColorOption;
  items: EditableSectionItem[];
  order: number;
}

export const useAdminSectionsEditor = (
  sectionType: SectionType, 
  sourceData: InfoSectionRow[] | undefined, 
  isLoading: boolean, 
  refetch: () => Promise<any>
) => {
  const queryClient = useQueryClient();
  const [sections, setSections] = useState<EditableSection[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setIsInitialized(false);
  }, [sectionType]);

  useEffect(() => {
    if (!isLoading && !isInitialized && sourceData) {
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
            color: s.color as ColorOption,
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
      if (!sourceData) return;
      
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
      await refetch();
      setIsInitialized(false);
      setSuccess('Guardado correctamente');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  return {
    sections,
    saving,
    error,
    success,
    addSection,
    removeSection,
    moveSection,
    updateSection,
    addItem,
    updateItem,
    removeItem,
    saveAll
  };
};
