import { supabase } from '../../shared/services/supabase/supabase';

export type ConnectionTestResult =
  | { ok: true }
  | { ok: false; error: string };

export async function testSupabaseConnection(): Promise<ConnectionTestResult> {
  try {
    const { error } = await supabase.from('hero_content').select('id').limit(1).maybeSingle();
    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error desconocido';
    return { ok: false, error: message };
  }
}
