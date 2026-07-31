"use client";

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import type { ContactSubmissionRow } from '../../../types/supabase';

export const AdminMessages: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: messages, isLoading } = useQuery({
    queryKey: ['contact_submissions'],
    queryFn: async () => {
      const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as ContactSubmissionRow[];
    },
    enabled: isSupabaseConfigured,
  });

  const deleteMessage = async (id: string) => {
    await supabase.from('contact_submissions').delete().eq('id', id);
    queryClient.invalidateQueries({ queryKey: ['contact_submissions'] });
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <p className="text-slate-400">Supabase no configurado.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Mensajes de contacto</h2>
        <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400">Cargando mensajes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl font-bold text-white">Mensajes de contacto</h2>
        {messages && messages.length > 0 && (
          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400">
            {messages.length} mensaje{messages.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {!messages?.length ? (
        <div className="text-center py-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-slate-400 text-lg">No hay mensajes</p>
          <p className="text-slate-500 text-sm mt-1">Los mensajes del formulario de contacto aparecerán aquí</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className="group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10
                         p-4 sm:p-5 space-y-3 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.07]"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate">{m.name}</p>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-sm text-blue-400 hover:text-blue-300 truncate block transition-colors"
                  >
                    {m.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-500">
                    {new Date(m.created_at).toLocaleDateString('es', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </span>
                  <button
                    onClick={() => deleteMessage(m.id)}
                    className="p-1.5 rounded-lg text-slate-500 opacity-0 group-hover:opacity-100
                               hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Phone */}
              {m.phone && (
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {m.phone}
                </div>
              )}

              {/* Message */}
              <div className="pt-2 border-t border-white/5">
                <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{m.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
