import { supabase, isSupabaseConfigured } from '../config/supabase';
import { STORAGE_BUCKET } from '../types/supabase';

export function getStoragePublicUrl(path: string): string {
  if (!isSupabaseConfigured || !path) return '';
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function getStoragePublicUrlOrLocal(path: string, localFallback: string): string {
  if (isSupabaseConfigured && path) {
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }
  return localFallback.startsWith('http') ? localFallback : (localFallback.startsWith('/') ? localFallback : `/${localFallback}`);
}
