import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { getStoragePublicUrl } from '../utils/supabaseStorage';
import type { CardRow } from '../types/supabase';
import type { CardProps } from '../types/types';
import { cards as fallbackCards } from '../config/cards';

async function fetchCards(): Promise<CardProps[]> {
  if (!isSupabaseConfigured) {
    return fallbackCards.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      img: c.img.startsWith('http') ? c.img : `/${c.img}`,
      buttonText: c.buttonText,
    }));
  }
  const { data, error } = await supabase.from('cards').select('*').order('id');
  if (error || !data?.length) {
    return fallbackCards.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      img: c.img.startsWith('http') ? c.img : `/${c.img}`,
      buttonText: c.buttonText,
    }));
  }
  return (data as CardRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    img: getStoragePublicUrl(row.image_path) || `/${row.image_path}`,
    buttonText: row.button_text,
  }));
}

export function useCards() {
  const q = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
    staleTime: 5 * 60 * 1000,
    placeholderData: fallbackCards.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      img: c.img.startsWith('http') ? c.img : `/${c.img}`,
      buttonText: c.buttonText,
    })),
  });
  const defaultCards = fallbackCards.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    img: c.img.startsWith('http') ? c.img : `/${c.img}`,
    buttonText: c.buttonText,
  }));
  return {
    cards: Array.isArray(q.data) && q.data.length > 0 ? q.data : defaultCards,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
