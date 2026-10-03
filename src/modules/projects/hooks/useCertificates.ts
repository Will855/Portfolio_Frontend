import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import type { CertificateRow } from '../../../types/supabase';
import type { CertificateProps } from '../../../types/types';

async function fetchCertificates(): Promise<CertificateProps[]> {
  if (!isSupabaseConfigured) {
    return [];
  }
  
  const { data, error } = await supabase.from('certificates').select('*').order('order').order('id');
  if (error) {
    console.warn('⚠️ Supabase error in fetchCertificates:', error.message);
    return [];
  }
  
  if (!data?.length) return [];
  
  return (data as CertificateRow[]).map((row) => ({
    ...row,
    img: getStoragePublicUrl(row.image_path) || `/${row.image_path}`
  }));
}

export function useCertificates() {
  const q = useQuery({
    queryKey: ['certificates'],
    queryFn: fetchCertificates,
    staleTime: 5 * 60 * 1000,
  });
  
  return {
    certificates: Array.isArray(q.data) ? q.data : [],
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
