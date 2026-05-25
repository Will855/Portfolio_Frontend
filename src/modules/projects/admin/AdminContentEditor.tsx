import React, { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../shared/services/supabase/supabase';
import { useCards } from '../hooks/useCards';
import { useProjectContent } from '../hooks/useProjectContent';
import { STORAGE_BUCKET } from '../../../types/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';

type BlockType = 'text' | 'image' | 'video';

interface LocalBlock {
  id: string | null;
  type: BlockType;
  content: string;
  caption: string;
  order: number;
  file?: File | null;
  previewUrl?: string;
}

export const AdminContent: React.FC = () => {
  const { cards } = useCards();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const list = Array.isArray(cards) ? cards : [];

  useEffect(() => {
    if (!selectedProjectId && list.length > 0) {
      setSelectedProjectId(list[0].id);
    }
  }, [list, selectedProjectId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white">Contenido de proyectos</h2>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-300">
            <strong>💡 Cómo funciona:</strong> Selecciona un proyecto y agrega bloques de texto, imágenes (.webp, .jpg, .png) o videos (.gif, .mp4). 
            El contenido se mostrará en la página pública del proyecto (<code className="text-blue-200">/page/:id</code>).
          </p>
        </div>
      </div>

      {/* Project selector */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-300">Seleccionar proyecto</label>
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                     text-white focus:outline-none focus:border-blue-500/50
                     focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled className="bg-slate-900">-- Elige un proyecto --</option>
          {list.map((c) => (
            <option key={c.id} value={c.id} className="bg-slate-900">
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {selectedProjectId && (
        <ProjectContentEditor key={selectedProjectId} projectId={selectedProjectId} />
      )}
    </div>
  );
};

const ProjectContentEditor: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { blocks, isLoading } = useProjectContent(projectId);
  const queryClient = useQueryClient();
  const [localBlocks, setLocalBlocks] = useState<LocalBlock[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  useEffect(() => {
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
  }, [blocks]);

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
    setAddMenuOpen(false);
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-slate-400">Cargando contenido...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Blocks list */}
      {localBlocks.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <svg className="w-12 h-12 mx-auto text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-slate-400">Sin contenido para este proyecto</p>
          <p className="text-slate-500 text-sm mt-1">Agrega bloques de texto, imágenes o videos</p>
        </div>
      )}

      <div className="space-y-3">
        {localBlocks.map((block, idx) => (
          <div
            key={block.id ?? `new-${idx}`}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            {/* Block header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                block.type === 'text'
                  ? 'bg-blue-500/20 text-blue-300'
                  : block.type === 'image'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-purple-500/20 text-purple-300'
              }`}>
                {block.type === 'text' ? 'Texto' : block.type === 'image' ? 'Imagen' : 'Video'}
              </span>
              <span className="text-xs text-slate-500">#{idx + 1}</span>
              <div className="ml-auto flex items-center gap-1">
                <button
                  onClick={() => moveBlock(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10
                             disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Subir"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveBlock(idx, 'down')}
                  disabled={idx === localBlocks.length - 1}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10
                             disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Bajar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => removeBlock(idx)}
                  className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Eliminar bloque"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Block body */}
            <div className="p-4 space-y-3">
              {block.type === 'text' && (
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(idx, { content: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                             focus:ring-1 focus:ring-blue-500/20 transition-all resize-y font-mono text-sm"
                  placeholder="Escribe el contenido del bloque (soporta HTML)..."
                />
              )}

              {block.type === 'image' && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept=".webp,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(idx, e.target.files?.[0] ?? null)}
                        className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                                   file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                                   file:font-medium file:cursor-pointer hover:file:bg-white/15
                                   file:transition-all cursor-pointer"
                      />
                      <p className="text-xs text-slate-500 mt-1">Formatos: .webp, .jpg, .png</p>
                    </div>
                    {block.previewUrl && (
                      <img
                        src={block.previewUrl}
                        alt="Preview"
                        className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl object-cover border border-white/10"
                      />
                    )}
                  </div>
                  <input
                    value={block.caption}
                    onChange={(e) => updateBlock(idx, { caption: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10
                               text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                               focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                    placeholder="Pie de imagen (opcional)"
                  />
                </div>
              )}

              {block.type === 'video' && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept=".gif,.mp4,.webm"
                        onChange={(e) => handleFileChange(idx, e.target.files?.[0] ?? null)}
                        className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                                   file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                                   file:font-medium file:cursor-pointer hover:file:bg-white/15
                                   file:transition-all cursor-pointer"
                      />
                      <p className="text-xs text-slate-500 mt-1">Formatos: .gif, .mp4, .webm</p>
                    </div>
                    {block.previewUrl && (
                      block.previewUrl.endsWith('.gif') || block.file?.name.endsWith('.gif') ? (
                        <img
                          src={block.previewUrl}
                          alt="Preview GIF"
                          className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl object-cover border border-white/10"
                        />
                      ) : (
                        <video
                          src={block.previewUrl}
                          className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl object-cover border border-white/10"
                          muted
                          loop
                          autoPlay
                          playsInline
                        />
                      )
                    )}
                  </div>
                  <input
                    value={block.caption}
                    onChange={(e) => updateBlock(idx, { caption: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10
                               text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                               focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                    placeholder="Pie de video (opcional)"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add block + Save */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <button
            onClick={() => setAddMenuOpen(!addMenuOpen)}
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10
                       text-white/80 hover:bg-white/10 hover:text-white transition-all
                       flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Agregar bloque
          </button>
          {addMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setAddMenuOpen(false)} />
              <div className="absolute bottom-full left-0 mb-2 z-20 rounded-xl bg-slate-800/95 backdrop-blur-xl
                              border border-white/10 shadow-xl overflow-hidden min-w-[180px]">
                <button
                  onClick={() => addBlock('text')}
                  className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10
                             flex items-center gap-2.5 transition-colors"
                >
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Texto
                </button>
                <button
                  onClick={() => addBlock('image')}
                  className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10
                             flex items-center gap-2.5 transition-colors"
                >
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Imagen (.webp, .jpg, .png)
                </button>
                <button
                  onClick={() => addBlock('video')}
                  className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10
                             flex items-center gap-2.5 transition-colors"
                >
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Video (.gif, .mp4)
                </button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={saveAll}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                     text-white font-medium hover:from-blue-500 hover:to-blue-400
                     transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50
                     disabled:cursor-not-allowed active:scale-95 flex items-center gap-2 w-fit"
        >
          {saving && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {saving ? 'Guardando...' : 'Guardar todo'}
        </button>
      </div>

      {/* Preview */}
      {localBlocks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-300">Vista previa</h3>
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-6 space-y-4">
            {localBlocks.map((block, idx) => (
              <div key={block.id ?? `preview-${idx}`}>
                {block.type === 'text' && block.content && (
                  <div
                    className="text-slate-200 text-sm leading-relaxed prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                )}
                {block.type === 'image' && block.previewUrl && (
                  <figure className="space-y-2">
                    <img
                      src={block.previewUrl}
                      alt={block.caption || ''}
                      className="w-full max-h-96 object-contain rounded-xl"
                    />
                    {block.caption && (
                      <figcaption className="text-xs text-slate-400 text-center">{block.caption}</figcaption>
                    )}
                  </figure>
                )}
                {block.type === 'video' && block.previewUrl && (
                  <figure className="space-y-2">
                    {block.previewUrl.endsWith('.gif') || block.file?.name.endsWith('.gif') ? (
                      <img
                        src={block.previewUrl}
                        alt={block.caption || ''}
                        className="w-full max-h-96 object-contain rounded-xl"
                      />
                    ) : (
                      <video
                        src={block.previewUrl}
                        className="w-full max-h-96 rounded-xl"
                        controls
                        muted
                        loop
                        playsInline
                      />
                    )}
                    {block.caption && (
                      <figcaption className="text-xs text-slate-400 text-center">{block.caption}</figcaption>
                    )}
                  </figure>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
