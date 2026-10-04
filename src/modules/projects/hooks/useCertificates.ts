import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import type { CertificateRow } from '../../../types/supabase';
import type { CertificateProps } from '../../../types/types';
import { FALLBACK_CERTIFICATES } from '../config/fallbacks';

async function fetchCertificates(): Promise<CertificateProps[]> {
  if (!isSupabaseConfigured) {
    return FALLBACK_CERTIFICATES;
  }
  
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('order', { ascending: true })
      .order('id', { ascending: true });

    if (error) {
      console.warn('⚠️ Supabase error in fetchCertificates:', error.message);
      return FALLBACK_CERTIFICATES;
    }
    
    if (!data?.length) return FALLBACK_CERTIFICATES;
    
    return (data as CertificateRow[]).map((row) => ({
      ...row,
      img: getStoragePublicUrl(row.image_path) || (row.image_path.startsWith('/') ? row.image_path : `/${row.image_path}`)
    }));
  } catch (err) {
    console.warn('⚠️ Exception in fetchCertificates:', err);
    return FALLBACK_CERTIFICATES;
  }
}

export function useCertificates() {
  const q = useQuery({
    queryKey: ['certificates'],
    queryFn: fetchCertificates,
    staleTime: 5 * 60 * 1000,
  });
  
  const certificates: CertificateProps[] = (q.data && q.data.length > 0) ? q.data : FALLBACK_CERTIFICATES;

  return {
    certificates,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}

