import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../config/supabase';
import type { ContactSubmissionRow } from '../../../types/supabase';

export const AdminMessages: React.FC = () => {
  const { data: messages, isLoading } = useQuery({
    queryKey: ['contact_submissions'],
    queryFn: async () => {
      const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as ContactSubmissionRow[];
    },
    enabled: isSupabaseConfigured,
  });

  if (!isSupabaseConfigured) return <p className="text-slate-400">Supabase no configurado.</p>;
  if (isLoading) return <p className="text-slate-400">Cargando mensajes...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Mensajes de contacto</h2>
      {!messages?.length ? (
        <p className="text-slate-400">No hay mensajes.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="rounded-lg border border-slate-700 p-4 space-y-1">
              <p className="text-sm text-slate-400">{new Date(m.created_at).toLocaleString()}</p>
              <p><strong>{m.name}</strong> — {m.email}</p>
              {m.phone && <p className="text-sm">Tel: {m.phone}</p>}
              <p className="text-slate-300 whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
