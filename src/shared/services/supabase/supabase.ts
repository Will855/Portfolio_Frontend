import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

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
    console.warn(`⚠️ Fallo de red (fallback activado): ${reason}`);
    console.info('ℹ️ Causa probable: el proyecto Supabase está pausado o la URL es incorrecta.');
    console.info(`ℹ️ URL configurada: ${supabaseUrl}`);
    console.groupEnd();

    return new Response(
      JSON.stringify({ error: 'network_error', error_description: reason }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Lazy singleton — only instantiated when Supabase is actually configured,
// preventing "supabaseUrl is required" crashes during SSR/static generation.
let _client: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!isSupabaseConfigured) return null;
  if (!_client) {
    _client = createClient(supabaseUrl, supabaseAnonKey, {
      global: { fetch: customFetch },
    });
  }
  return _client;
}

// Backwards-compatible default export — safe to use in client components.
// Will be null when env vars are missing (build time / SSR without secrets).
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, { global: { fetch: customFetch } })
  : null as unknown as ReturnType<typeof createClient>;
