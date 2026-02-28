import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../config/supabase';
import { useCards } from '../../../hooks/useCards';
import { STORAGE_BUCKET } from '../../../types/supabase';

export const AdminCards: React.FC = () => {
  const { cards, isLoading } = useCards();
  const queryClient = useQueryClient();
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Record<string, { title: string; description: string; buttonText: string }>>({});

  const list = Array.isArray(cards) ? cards : [];

  const startEdit = (id: string) => {
    const c = cards.find((x) => x.id === id);
    if (c) setEditing((s) => ({ ...s, [id]: { title: c.title, description: c.description, buttonText: c.buttonText ?? 'Ver más...' } }));
  };

  const saveCard = async (id: string) => {
    const e = editing[id];
    if (!e) return;
    await supabase.from('cards').update({
      title: e.title,
      description: e.description,
      button_text: e.buttonText,
      updated_at: new Date().toISOString(),
    }).eq('id', id);
    queryClient.invalidateQueries({ queryKey: ['cards'] });
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
    const ext = file.name.split('.').pop() || 'webp';
    const path = `cards/${id}.${ext}`;
    await supabase.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: true });
    await supabase.from('cards').update({ image_path: path, updated_at: new Date().toISOString() }).eq('id', id);
    queryClient.invalidateQueries({ queryKey: ['cards'] });
    setUploadingId(null);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Cards</h2>
      {isLoading && list.length === 0 ? (
        <p className="text-slate-400">Cargando cards...</p>
      ) : list.length === 0 ? (
        <p className="text-slate-400">No hay cards. Ejecuta las migraciones de Supabase y el seed.</p>
      ) : (
      <div className="grid gap-4 sm:grid-cols-2">
        {list.map((card) => (
          <div key={card.id} className="rounded-lg border border-slate-700 p-4 space-y-3">
            <div className="flex gap-3">
              <img
                src={card.img || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="%23334155"%3E%3Crect width="80" height="80"/%3E%3C/svg%3E'}
                alt=""
                className="w-20 h-20 rounded object-cover bg-slate-700 min-w-[5rem] min-h-[5rem]"
                onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="%23334155"%3E%3Crect width="80" height="80"/%3E%3C/svg%3E'; }}
              />
              <div className="flex-1 min-w-0">
                <label className="block text-xs text-slate-400">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFileChange(card.id, e)}
                  disabled={uploadingId === card.id}
                  className="text-sm"
                />
                {uploadingId === card.id && <p className="text-xs text-slate-400">Subiendo...</p>}
              </div>
            </div>
            {editing[card.id] ? (
              <>
                <input
                  value={editing[card.id].title}
                  onChange={(e) => setEditing((s) => ({ ...s, [card.id]: { ...s[card.id], title: e.target.value } }))}
                  className="w-full px-2 py-1 rounded bg-slate-800 text-sm"
                  placeholder="Título"
                />
                <textarea
                  value={editing[card.id].description}
                  onChange={(e) => setEditing((s) => ({ ...s, [card.id]: { ...s[card.id], description: e.target.value } }))}
                  className="w-full px-2 py-1 rounded bg-slate-800 text-sm min-h-[60px]"
                  placeholder="Descripción"
                />
                <input
                  value={editing[card.id].buttonText}
                  onChange={(e) => setEditing((s) => ({ ...s, [card.id]: { ...s[card.id], buttonText: e.target.value } }))}
                  className="w-full px-2 py-1 rounded bg-slate-800 text-sm"
                  placeholder="Botón"
                />
                <div className="flex gap-2">
                  <button onClick={() => saveCard(card.id)} className="px-3 py-1 rounded bg-blue-600 text-sm">Guardar</button>
                  <button onClick={() => setEditing((s) => ({ ...s, [card.id]: undefined }))} className="px-3 py-1 rounded bg-slate-600 text-sm">Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <p className="font-medium truncate">{card.title}</p>
                <p className="text-sm text-slate-400 line-clamp-2">{card.description}</p>
                <button onClick={() => startEdit(card.id)} className="text-sm text-blue-400 hover:underline">Editar textos</button>
              </>
            )}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};
