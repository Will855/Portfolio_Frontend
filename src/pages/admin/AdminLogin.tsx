import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { testSupabaseConnection, type ConnectionTestResult } from '../../utils/testSupabaseConnection';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [dbTest, setDbTest] = useState<ConnectionTestResult | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const { user, loading: authLoading, signIn, signUp, isConfigured } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConfigured) return;
    testSupabaseConnection().then(setDbTest);
  }, [isConfigured]);

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200 p-4">
        <p>Supabase no está configurado. Añade VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env</p>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200">
        <p>Cargando...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (mode === 'signup') {
      const { data, error: err } = await signUp(email, password);
      setLoading(false);
      if (err) {
        setError(err.message ?? 'Error al registrarse');
        return;
      }
      if (data?.user && !data.session) {
        setSignupSuccess(true);
        return;
      }
      if (data?.session) {
        navigate('/admin', { replace: true });
      }
      return;
    }
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err.message ?? 'Error al iniciar sesión');
      return;
    }
    navigate('/admin', { replace: true });
  };

  if (signupSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200 p-4">
        <div className="w-full max-w-sm space-y-4 rounded-xl bg-white/5 p-6 backdrop-blur border border-white/10">
          <h2 className="text-lg font-semibold text-green-400">Cuenta creada</h2>
          <p className="text-sm text-slate-300">
            Revisa tu correo y confirma el enlace si Supabase tiene confirmación activada.
          </p>
          <p className="text-sm text-slate-300">
            Para poder editar contenido, añade tu email como admin en Supabase:
          </p>
          <pre className="text-xs bg-slate-800 p-3 rounded overflow-x-auto">
            {`insert into public.admin_emails (email)\nvalues ('${email}');`}
          </pre>
          <p className="text-xs text-slate-400">
            Ejecuta ese SQL en el proyecto Supabase → SQL Editor. Luego inicia sesión aquí.
          </p>
          <button
            type="button"
            onClick={() => { setSignupSuccess(false); setMode('login'); }}
            className="w-full py-2 rounded bg-slate-600 hover:bg-slate-500 text-white text-sm"
          >
            Ir a iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200 p-4">
      <div className="w-full max-w-sm space-y-3">
        {dbTest && !dbTest.ok && (
          <div className="rounded-lg bg-red-900/30 border border-red-500/50 p-3 text-sm text-red-200">
            <strong>Base de datos:</strong> {dbTest.error}
            <p className="mt-1 text-xs">Comprueba que las migraciones estén aplicadas en Supabase (SQL Editor).</p>
          </div>
        )}
        {dbTest?.ok && (
          <p className="text-center text-xs text-green-400">Conexión a la base de datos correcta</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl bg-white/5 p-6 backdrop-blur border border-white/10"
        >
          <h1 className="text-xl font-semibold text-center">Admin</h1>
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`px-3 py-1.5 rounded text-sm ${mode === 'login' ? 'bg-slate-600' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); }}
              className={`px-3 py-1.5 rounded text-sm ${mode === 'signup' ? 'bg-slate-600' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              Registrarse
            </button>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-slate-800 text-slate-100 border border-slate-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm mb-1">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 rounded bg-slate-800 text-slate-100 border border-slate-600 focus:ring-2 focus:ring-blue-500"
            />
            {mode === 'signup' && <p className="text-xs text-slate-400 mt-1">Mínimo 6 caracteres</p>}
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium"
          >
            {loading ? (mode === 'signup' ? 'Creando cuenta...' : 'Entrando...') : mode === 'signup' ? 'Registrarse' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};
