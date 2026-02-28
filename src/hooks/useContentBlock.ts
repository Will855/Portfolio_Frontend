import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import type { ContentBlockRow } from '../types/supabase';

async function fetchContentBlock(key: string): Promise<ContentBlockRow | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('content_blocks')
    .select('*')
    .eq('key', key)
    .single();
  if (error || !data) return null;
  return data as ContentBlockRow;
}

export function useContentBlock(key: string | null) {
  const q = useQuery({
    queryKey: ['content_block', key],
    queryFn: () => fetchContentBlock(key!),
    enabled: Boolean(key),
    staleTime: 5 * 60 * 1000,
  });
  return {
    block: q.data ?? null,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}

export function useContentBlocks(keys: string[]) {
  const queries = keys.map((key) => useContentBlock(key));
  const blocks = Object.fromEntries(
    keys.map((key, i) => [key, queries[i].block])
  );
  const isLoading = queries.some((q) => q.isLoading);
  return { blocks, isLoading, queries };
}
