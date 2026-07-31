"use client";

import React, { useState, useEffect } from 'react';
import { useCards } from '../hooks/useCards';
import { useAdminProjectContent, BlockType, LocalBlock } from '../hooks/useAdminProjectContent';
import { TextBlock } from './components/TextBlock';
import { MediaBlock } from './components/MediaBlock';

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
  const {
    localBlocks,
    isLoading,
    saving,
    error,
    addBlock,
    removeBlock,
    moveBlock,
    updateBlock,
    handleFileChange,
    saveAll
  } = useAdminProjectContent(projectId);
  
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  const handleAddBlock = (type: BlockType) => {
    addBlock(type);
    setAddMenuOpen(false);
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
        {localBlocks.map((block, idx) => {
          if (block.type === 'text') {
            return (
              <TextBlock
                key={block.id ?? `new-${idx}`}
                block={block}
                index={idx}
                totalBlocks={localBlocks.length}
                updateBlock={updateBlock}
                moveBlock={moveBlock}
                removeBlock={removeBlock}
              />
            );
          }
          return (
            <MediaBlock
              key={block.id ?? `new-${idx}`}
              block={block}
              index={idx}
              totalBlocks={localBlocks.length}
              updateBlock={updateBlock}
              handleFileChange={handleFileChange}
              moveBlock={moveBlock}
              removeBlock={removeBlock}
            />
          );
        })}
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
                  onClick={() => handleAddBlock('text')}
                  className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10
                             flex items-center gap-2.5 transition-colors"
                >
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Texto
                </button>
                <button
                  onClick={() => handleAddBlock('image')}
                  className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10
                             flex items-center gap-2.5 transition-colors"
                >
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Imagen (.webp, .jpg, .png)
                </button>
                <button
                  onClick={() => handleAddBlock('video')}
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
