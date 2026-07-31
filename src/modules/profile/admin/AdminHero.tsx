"use client";

import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../shared/services/supabase/supabase';
import { useHeroContent } from '../hooks/useHeroContent';
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Hero</h2>

      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 sm:p-6 space-y-6">
        {/* Profile image */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <img
            src={imgSrc}
            alt=""
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover bg-slate-700 border-2 border-white/10 shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).src = '/profile.jpeg'; }}
          />
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <label className="block text-sm font-medium text-slate-300">Foto de perfil</label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              disabled={uploading}
              className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                         file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                         file:font-medium file:cursor-pointer hover:file:bg-white/15
                         file:transition-all cursor-pointer"
            />
            {uploading && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                Subiendo...
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300">Título</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                       text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                       focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300">Subtítulo</label>
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                       text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                       focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Save */}
        <button
          onClick={saveText}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                     text-white font-medium hover:from-blue-500 hover:to-blue-400
                     transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50
                     disabled:cursor-not-allowed active:scale-95 flex items-center gap-2"
        >
          {saving && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {saving ? 'Guardando...' : 'Guardar textos'}
        </button>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-slate-300">Vista previa</h3>
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 flex flex-col items-center gap-4">
          <img
            src={imgSrc}
            alt=""
            className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
            onError={(e) => { (e.target as HTMLImageElement).src = '/profile.jpeg'; }}
          />
          <div className="text-center">
            <h4 className="text-2xl sm:text-3xl font-bold text-white">{title || DEFAULT_TITLE}</h4>
            <p className="text-slate-400 mt-1">{subtitle || DEFAULT_SUBTITLE}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
