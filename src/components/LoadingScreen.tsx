import React from 'react';

/**
 * Pantalla de carga full-screen hasta que los datos de Supabase estén listos.
 * Evita parpadeos y renderizado dinámico incompleto.
 */
export const LoadingScreen: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-slate-200"
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      <div className="flex flex-col items-center gap-6">
        <div
          className="w-12 h-12 border-3 border-slate-600 border-t-blue-400 rounded-full animate-spin"
          style={{ borderWidth: '3px' }}
        />
        <p className="text-sm font-medium text-slate-400">Cargando...</p>
      </div>
    </div>
  );
};
