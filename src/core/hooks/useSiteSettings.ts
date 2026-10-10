import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../shared/services/supabase/supabase';

export interface SiteSettings {
  email: string;
  phone: string;
  socialMedia: {
    github: { url: string };
    linkedin: { url: string };
    whatsapp: { url: string };
  };
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  email: 'Wilmer@parz7val.online',
  phone: '+58 4265940917',
  socialMedia: {
    github: { url: 'https://github.com/Will855' },
    linkedin: { url: 'https://www.linkedin.com/in/wilmer-lynch' },
    whatsapp: { url: 'https://wa.me/584265940917?text=Hola%20Wilmer,%20quiero%20trabajar%20contigo' }
  }
};

export function useSiteSettings() {
  const q = useQuery({
    queryKey: ['site_settings'],
    queryFn: async () => {
      if (!isSupabaseConfigured) return DEFAULT_SITE_SETTINGS;
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'contact_info')
        .single();
      
      if (error || !data) {
        console.warn('⚠️ No se pudieron cargar site_settings, usando fallback:', error?.message);
        return DEFAULT_SITE_SETTINGS;
      }
      return data.value as SiteSettings;
    },
    staleTime: 10 * 60 * 1000,
    placeholderData: DEFAULT_SITE_SETTINGS,
  });

  return {
    settings: q.data || DEFAULT_SITE_SETTINGS,
    isLoading: q.isLoading,
  };
}
