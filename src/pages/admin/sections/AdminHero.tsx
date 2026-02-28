import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../config/supabase';
import { useHeroContent } from '../../../hooks/useHeroContent';
import { STORAGE_BUCKET } from '../../../types/supabase';

const DEFAULT_TITLE = 'Wilmer Lynch';
const DEFAULT_SUBTITLE = 'Web Developer';

export const AdminHero: React.FC = () => {
  const { hero } = useHeroContent();
  const safeHero = hero ?? { title: DEFAULT_TITLE, subtitle: DEFAULT_SUBTITLE, profile_image_url: '/profile.jpeg' };
  const [title, setTitle] = useState(safeHero.title);
  const [subtitle, setSubtitle] = useState(safeHero.subtitle);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setTitle(safeHero.title);
    setSubtitle(safeHero.subtitle);
  }, [safeHero.title, safeHero.subtitle]);

  const saveText = async () => {
    setSaving(true);
    await supabase.from('hero_content').update({ title, subtitle, updated_at: new Date().toISOString() }).eq('id', 'default');
    queryClient.invalidateQueries({ queryKey: ['hero_content'] });
    setSaving(false);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `avatars/profile.${file.name.split('.').pop() || 'jpeg'}`;
    await supabase.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: true });
    await supabase.from('hero_content').update({ profile_image_path: path, updated_at: new Date().toISOString() }).eq('id', 'default');
    queryClient.invalidateQueries({ queryKey: ['hero_content'] });
    setUploading(false);
    e.target.value = '';
  };

  const imgSrc = safeHero.profile_image_url?.startsWith('http') || safeHero.profile_image_url?.startsWith('/')
    ? safeHero.profile_image_url
    : '/profile.jpeg';

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-semibold">Hero</h2>
      <div className="rounded-lg border border-slate-700 p-4 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={imgSrc}
            alt=""
            className="w-24 h-24 rounded-full object-cover bg-slate-700"
            onError={(e) => { (e.target as HTMLImageElement).src = '/profile.jpeg'; }}
          />
          <div>
            <label className="block text-sm mb-1">Foto de perfil</label>
            <input type="file" accept="image/*" onChange={onFileChange} disabled={uploading} className="text-sm" />
            {uploading && <p className="text-sm text-slate-400">Subiendo...</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Título</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Subtítulo</label>
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600"
          />
        </div>
        <button onClick={saveText} disabled={saving} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50">
          {saving ? 'Guardando...' : 'Guardar textos'}
        </button>
      </div>
    </div>
  );
};
