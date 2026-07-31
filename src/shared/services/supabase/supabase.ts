import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '';

const customFetch = async (url: RequestInfo | URL, options?: RequestInit) => {
  const endpoint = typeof url === 'string' ? url : url instanceof URL ? url.href : (url as Request).url;
  const method = options?.method ?? (url instanceof Request ? url.method : 'GET');

  console.group(`[Supabase] ${method} ${endpoint}`);
  console.log('→ Intentando conexión...');

  try {
    const response = await fetch(url, options);
    const cloned = response.clone();

    if (response.ok) {
      console.log(`✅ OK ${response.status} ${response.statusText}`);
    } else {
      const body = await cloned.text().catch(() => '(sin cuerpo)');
      console.warn(`⚠️ Error HTTP ${response.status} ${response.statusText}`, body);
    }

    console.groupEnd();
    return response;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(`❌ Fallo de red: ${reason}`);
    console.info('ℹ️ Causa probable: el proyecto Supabase está pausado o la URL es incorrecta.');
    console.info(`ℹ️ URL configurada: ${supabaseUrl}`);
    console.groupEnd();

    return new Response(
      JSON.stringify({ error: 'network_error', error_description: reason }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: customFetch,
  },
});

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
