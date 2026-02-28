import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../config/supabase';
import { useProjectsMeta } from '../../../hooks/useProjectsMeta';
import { STORAGE_BUCKET } from '../../../types/supabase';
import { projects } from '../../../config/project';

export const AdminProjects: React.FC = () => {
  const { projectsMeta, isLoading } = useProjectsMeta();
  const queryClient = useQueryClient();
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Record<string, { codeUrl: string; demoUrl: string }>>({});

  const metaList = Array.isArray(projectsMeta) && projectsMeta.length > 0
    ? projectsMeta
    : projects.map((p, i) => ({
        id: p.id,
        bgProyect: p.bgProyect || '/images/bg-proyecto2.jpg',
        codeUrl: p.codeUrl,
        demoUrl: p.demoUrl,
        order: i,
      }));

  const startEdit = (id: string) => {
    const m = metaList.find((x) => x.id === id);
    if (m) setEditing((s) => ({ ...s, [id]: { codeUrl: m.codeUrl, demoUrl: m.demoUrl } }));
  };

  const saveProject = async (id: string) => {
    const e = editing[id];
    if (!e) return;
    await supabase.from('projects_meta').upsert({
      id,
      code_url: e.codeUrl,
      demo_url: e.demoUrl,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });
    queryClient.invalidateQueries({ queryKey: ['projects_meta'] });
    setEditing((s) => {
      const next = { ...s };
      delete next[id];
      return next;
    });
  };

  const onFileChange = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId(id);
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `projects-bg/${id}.${ext}`;
    await supabase.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: true });
    await supabase.from('projects_meta').upsert({
      id,
      bg_image_path: path,
      code_url: metaList.find((m) => m.id === id)?.codeUrl ?? '',
      demo_url: metaList.find((m) => m.id === id)?.demoUrl ?? '',
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });
    queryClient.invalidateQueries({ queryKey: ['projects_meta'] });
    setUploadingId(null);
    e.target.value = '';
  };

  const placeholderImg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="80" fill="%23334155"%3E%3Crect width="128" height="80"/%3E%3C/svg%3E';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Proyectos</h2>
      {isLoading && metaList.length === 0 ? (
        <p className="text-slate-400">Cargando proyectos...</p>
      ) : metaList.length === 0 ? (
        <p className="text-slate-400">No hay proyectos. Revisa config/project.ts y el seed de projects_meta.</p>
      ) : (
      <div className="space-y-4">
        {metaList.map((m) => (
          <div key={m.id} className="rounded-lg border border-slate-700 p-4 flex flex-wrap gap-4 items-start">
            <div className="flex flex-col gap-1">
              <img
                src={m.bgProyect || placeholderImg}
                alt=""
                className="w-32 h-20 rounded object-cover bg-slate-700"
                onError={(e) => { (e.target as HTMLImageElement).src = placeholderImg; }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onFileChange(m.id, e)}
                disabled={uploadingId === m.id}
                className="text-sm"
              />
              {uploadingId === m.id && <span className="text-xs text-slate-400">Subiendo...</span>}
            </div>
            {editing[m.id] ? (
              <div className="flex-1 min-w-[200px] space-y-2">
                <input
                  value={editing[m.id].codeUrl}
                  onChange={(e) => setEditing((s) => ({ ...s, [m.id]: { ...s[m.id], codeUrl: e.target.value } }))}
                  className="w-full px-2 py-1 rounded bg-slate-800 text-sm"
                  placeholder="URL código"
                />
                <input
                  value={editing[m.id].demoUrl}
                  onChange={(e) => setEditing((s) => ({ ...s, [m.id]: { ...s[m.id], demoUrl: e.target.value } }))}
                  className="w-full px-2 py-1 rounded bg-slate-800 text-sm"
                  placeholder="URL demo"
                />
                <div className="flex gap-2">
                  <button onClick={() => saveProject(m.id)} className="px-3 py-1 rounded bg-blue-600 text-sm">Guardar</button>
                  <button onClick={() => setEditing((s) => ({ ...s, [m.id]: undefined }))} className="px-3 py-1 rounded bg-slate-600 text-sm">Cancelar</button>
                </div>
              </div>
            ) : (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Proyecto {m.id}</p>
                <p className="text-xs text-slate-400 truncate">{m.codeUrl}</p>
                <p className="text-xs text-slate-400 truncate">{m.demoUrl}</p>
                <button onClick={() => startEdit(m.id)} className="text-sm text-blue-400 hover:underline mt-1">Editar URLs</button>
              </div>
            )}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};
