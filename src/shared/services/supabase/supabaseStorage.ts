import { supabase, isSupabaseConfigured } from './supabase';
import { STORAGE_BUCKET } from '../../../types/supabase';

export function getStoragePublicUrl(path: string): string {
  if (!isSupabaseConfigured || !path) return '';
  
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('assets/') || path.startsWith('images/')) return `/${path}`;
  if (path.startsWith('/')) return path;

  // Fix for legacy data in Supabase that points to missing bucket files instead of local assets
  if (path.startsWith('cards/web')) return path.replace('cards/web', '/assets/web');
  if (path.startsWith('projects-bg/bg-proyecto')) return path.replace('projects-bg/bg-proyecto', '/images/bg-proyecto');

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function getStoragePublicUrlOrLocal(path: string, localFallback: string): string {
  if (isSupabaseConfigured && path) {
    // getStoragePublicUrl ya maneja paths locales o absolutos internamente
    return getStoragePublicUrl(path);
  }
  return localFallback.startsWith('http') ? localFallback : (localFallback.startsWith('/') ? localFallback : `/${localFallback}`);
}
