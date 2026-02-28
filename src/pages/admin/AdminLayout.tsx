import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const NAV = [
  { to: '/admin/hero', label: 'Hero' },
  { to: '/admin/cards', label: 'Cards' },
  { to: '/admin/projects', label: 'Proyectos' },
  { to: '/admin/content', label: 'Contenido' },
  { to: '/admin/messages', label: 'Mensajes' },
];

export const AdminLayout: React.FC = () => {
  const { user, loading, signOut, isConfigured } = useAdminAuth();
  const location = useLocation();

  if (!isConfigured) return <Navigate to="/admin/login" replace />;
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200">Cargando...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-200">
      <aside className="w-52 border-r border-slate-700 flex flex-col p-4">
        <Link to="/admin" className="font-semibold mb-4">Admin</Link>
        <nav className="flex flex-col gap-1">
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-2 rounded ${location.pathname === to ? 'bg-slate-700' : 'hover:bg-slate-800'}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-slate-700">
          <Link to="/" className="block py-1 text-sm text-slate-400 hover:text-slate-200">Ver sitio</Link>
          <button type="button" onClick={() => signOut()} className="block py-1 text-sm text-slate-400 hover:text-slate-200">
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};
